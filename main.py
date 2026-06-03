import datetime
import io
import json
import os
import re

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from google import genai
from google.api_core.client_options import ClientOptions
from google.cloud import texttospeech
from pydantic import BaseModel
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# ──────────────────────────────────────────────
# FastAPI 앱 초기화
# ──────────────────────────────────────────────
app = FastAPI(
    title="Korean → Japanese Accent Analyzer",
    description="한국어 문장을 일본어로 번역하고 OJAD 악센트 배열을 반환하는 API",
    version="2.0.0",
)

# CORS 설정 — 모든 출처 허용 (public API, 인증 불필요)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# 상수
# ──────────────────────────────────────────────

GEMINI_MODEL = "gemini-2.5-flash"

# Gemini에게 전달할 번역 프롬프트
# — 순수 JSON만 반환하도록 명시 (마크다운 코드블록 금지)
TRANSLATION_PROMPT = """You are a Korean-to-Japanese translation expert.

When given a Korean sentence, respond with ONLY a valid JSON object.
Do NOT wrap it in markdown code blocks (no ```json). No explanation. No extra text. Pure JSON only.

Use this exact structure:
{
  "japanese": "日本語を勉強しています",
  "furigana": "にほんごをべんきょうしています",
  "korean_pronunciation": "니혼고오 벤쿄-시테이마스",
  "ojad_input": "日本語を勉強しています",
  "furigana_html": "日本語(にほんご)を勉強(べんきょう)しています",
  "breakdown": [
    {
      "unit": "日本語",
      "hiragana": "にほんご",
      "korean_pronunciation": "니혼고",
      "part_of_speech": "명사"
    },
    {
      "unit": "を",
      "hiragana": "を",
      "korean_pronunciation": "오",
      "part_of_speech": "조사"
    },
    {
      "unit": "勉強",
      "hiragana": "べんきょう",
      "korean_pronunciation": "벤쿄-",
      "part_of_speech": "명사"
    },
    {
      "unit": "しています",
      "hiragana": "しています",
      "korean_pronunciation": "시테이마스",
      "part_of_speech": "동사"
    }
  ]
}

Rules:
- "japanese": natural Japanese translation using kanji where appropriate
- "furigana": FULL reading in hiragana only (no kanji) — used for pitch graph mora labels
- "korean_pronunciation": full sentence pronunciation in Korean characters
- "ojad_input": same as "japanese" (no furigana markup)
- "furigana_html": annotate only kanji with (reading) in parentheses; leave hiragana/katakana as-is
  Example: 日本語(にほんご)を勉強(べんきょう)しています
- "breakdown": every character of the sentence split into grammatical units, no gaps or overlaps.
  "part_of_speech" must be one of: 명사/동사/형용사/부사/조사/조동사/접속사/감탄사/기타
"""

OJAD_URL = "https://www.gavo.t.u-tokyo.ac.jp/ojad/phrasing/index"
OJAD_HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Referer": "https://www.gavo.t.u-tokyo.ac.jp/ojad/phrasing/index",
}

# set_accent_curve_phrase 호출 파싱용 정규식
ACCENT_PATTERN = re.compile(
    r"set_accent_curve_phrase\(\s*'#([\w]+)'\s*,\s*(\d+)\s*,\s*(\[[^\]]+\])"
)

# 성별에 따른 Google TTS Wavenet 음성 매핑
TTS_VOICE_MAP = {
    "female": "ja-JP-Wavenet-A",
    "male":   "ja-JP-Wavenet-D",
}

# TTS 메모리 캐시 — 키: "{text}_{gender}", 값: mp3 바이너리
# 서버 재시작 시 초기화됨
_tts_cache: dict[str, bytes] = {}

# ──────────────────────────────────────────────
# DB 설정 (SQLite)
# ──────────────────────────────────────────────

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./tickjapan.db")

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(100), nullable=False)
    phone      = Column(String(20), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SavedResult(Base):
    __tablename__ = "saved_results"
    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, nullable=False, index=True)
    input_text  = Column(String(500), nullable=False)
    result_json = Column(Text, nullable=False)
    created_at  = Column(DateTime, default=datetime.datetime.utcnow)

# SQLite는 check_same_thread 필요, PostgreSQL은 불필요
_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine       = create_engine(DATABASE_URL, connect_args=_connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base.metadata.create_all(bind=engine)

# ──────────────────────────────────────────────
# Pydantic 스키마
# ──────────────────────────────────────────────

class AnalyzeRequest(BaseModel):
    text: str

class AccentEntry(BaseModel):
    phrase_id: str
    mora_count: int
    accent: list[int]

class BreakdownEntry(BaseModel):
    unit: str
    hiragana: str
    korean_pronunciation: str
    part_of_speech: str

class TTSRequest(BaseModel):
    text: str
    gender: str  # "female" | "male"

class SignupRequest(BaseModel):
    name: str
    phone: str

class SignupResponse(BaseModel):
    user_id: int
    name: str
    is_new: bool   # True=신규, False=기존 사용자 로그인

class SaveRequest(BaseModel):
    user_id: int
    input_text: str
    result: dict

class AnalyzeResponse(BaseModel):
    japanese: str
    furigana: str
    korean_pronunciation: str
    furigana_html: str          # 예: 日本語(にほんご)を勉強(べんきょう)しています
    accent_data: list[AccentEntry]
    breakdown: list[BreakdownEntry]

# ──────────────────────────────────────────────
# 번역 로직 — Gemini API
# ──────────────────────────────────────────────

def translate_korean_to_japanese(korean_text: str) -> dict:
    """한국어 문장을 Gemini API로 번역하여 구조화된 데이터를 반환한다."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")

    # Gemini 클라이언트 초기화
    client = genai.Client(api_key=api_key)

    # 시스템 프롬프트 + 사용자 입력을 하나의 메시지로 조합
    full_prompt = f"{TRANSLATION_PROMPT}\n\nKorean input: {korean_text}"

    # 503 등 일시적 오류 시 최대 3회 재시도 (1초 간격)
    import time
    last_error = None
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=full_prompt,
            )
            break  # 성공 시 루프 탈출
        except Exception as e:
            last_error = e
            err_str = str(e)
            # 일시적 서버 오류(503/429)면 재시도, 그 외엔 즉시 실패
            if "503" in err_str or "429" in err_str or "UNAVAILABLE" in err_str:
                print(f"[Gemini 재시도 {attempt + 1}/3] {err_str[:80]}")
                time.sleep(1)
            else:
                raise HTTPException(status_code=502, detail=f"Gemini API 오류: {err_str}")
    else:
        raise HTTPException(status_code=503, detail=f"Gemini 서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.")

    # 응답 텍스트 추출
    raw = response.text.strip() if response.text else ""
    if not raw:
        raise HTTPException(status_code=502, detail="Gemini 응답이 비어 있습니다.")

    # 혹시 마크다운 코드블록으로 감싸진 경우 제거
    if raw.startswith("```"):
        # ```json ... ``` 또는 ``` ... ``` 형태 제거
        raw = re.sub(r"^```[a-zA-Z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw.strip())

    # JSON 파싱
    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini 응답을 JSON으로 파싱할 수 없습니다: {raw[:300]}"
        )

    # 필수 키 검증
    required_keys = {"japanese", "furigana", "korean_pronunciation", "ojad_input", "furigana_html", "breakdown"}
    missing = required_keys - result.keys()
    if missing:
        raise HTTPException(status_code=502, detail=f"Gemini 응답에 누락된 키: {missing}")

    return result

# ──────────────────────────────────────────────
# OJAD 악센트 파싱 로직
# ──────────────────────────────────────────────

def fetch_accent_data(japanese_text: str) -> list[dict]:
    """일본어 텍스트를 OJAD 스즈키쿤에 POST 요청하여 악센트 데이터를 반환한다."""
    payload = {
        "_method": "POST",
        "data[Phrasing][text]": japanese_text,
        "data[Phrasing][curve]": "advanced",
        "data[Phrasing][accent]": "advanced",
        "data[Phrasing][accent_mark]": "all",
        "data[Phrasing][estimation]": "crf",
        "data[Phrasing][analyze]": "true",
        "data[Phrasing][phrase_component]": "invisible",
        "data[Phrasing][param]": "invisible",
        "data[Phrasing][subscript]": "visible",
        "data[Phrasing][jeita]": "invisible",
    }

    try:
        response = requests.post(OJAD_URL, data=payload, headers=OJAD_HEADERS, timeout=15)
        response.raise_for_status()
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="OJAD 서버 요청 시간이 초과되었습니다 (15초).")
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="OJAD 서버에 연결할 수 없습니다.")
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"OJAD HTTP 오류: {e}")

    return parse_accent_data(response.text)


def parse_accent_data(html: str) -> list[dict]:
    """응답 HTML에서 set_accent_curve_phrase 호출을 파싱하여 악센트 데이터를 추출한다."""
    soup = BeautifulSoup(html, "html.parser")
    scripts = [tag.string for tag in soup.find_all("script") if tag.string]

    results = []
    for script in scripts:
        for match in ACCENT_PATTERN.finditer(script):
            phrase_id  = match.group(1)
            mora_count = int(match.group(2))
            accent_raw = match.group(3)
            accent_list = [int(x) for x in re.findall(r"\d+", accent_raw)]
            results.append({
                "phrase_id":  phrase_id,
                "mora_count": mora_count,
                "accent":     accent_list,
            })

    if not results:
        raise HTTPException(status_code=502, detail="OJAD에서 악센트 데이터를 파싱하지 못했습니다.")

    return results

# ──────────────────────────────────────────────
# 엔드포인트
# ──────────────────────────────────────────────

@app.get("/health")
def health_check():
    """서버 상태 확인용 엔드포인트."""
    return {"status": "ok"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    """
    한국어 문장을 받아 일본어 번역 + OJAD 악센트 배열을 반환한다.

    1. Gemini API로 한국어 → 일본어 번역 + breakdown 생성
    2. 번역 결과를 OJAD에 보내 악센트 배열 파싱
    """
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="입력 텍스트가 비어 있습니다.")

    # 1단계: 한국어 → 일본어 번역 (Gemini)
    translation = translate_korean_to_japanese(req.text)

    # 2단계: OJAD 악센트 파싱
    accent_data = fetch_accent_data(translation["ojad_input"])

    return AnalyzeResponse(
        japanese=translation["japanese"],
        furigana=translation["furigana"],
        korean_pronunciation=translation["korean_pronunciation"],
        furigana_html=translation["furigana_html"],
        accent_data=[AccentEntry(**entry) for entry in accent_data],
        breakdown=[BreakdownEntry(**entry) for entry in translation["breakdown"]],
    )


@app.post("/tts")
def tts(req: TTSRequest):
    """
    일본어 텍스트를 받아 Google Cloud TTS로 MP3 오디오를 반환한다.
    - female: ja-JP-Wavenet-A
    - male:   ja-JP-Wavenet-D
    """
    api_key = os.environ.get("GOOGLE_TTS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GOOGLE_TTS_API_KEY 환경변수가 설정되지 않았습니다.")

    if not req.text.strip():
        raise HTTPException(status_code=400, detail="TTS 입력 텍스트가 비어 있습니다.")

    # ── 캐시 조회 ──────────────────────────────
    cache_key = f"{req.text}_{req.gender}"

    if cache_key in _tts_cache:
        print(f"[TTS 캐시 HIT] key={cache_key!r}")
        return StreamingResponse(
            io.BytesIO(_tts_cache[cache_key]),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "inline; filename=speech.mp3"},
        )

    print(f"[TTS 캐시 MISS] key={cache_key!r} — Google TTS API 호출")
    # ───────────────────────────────────────────

    voice_name = TTS_VOICE_MAP.get(req.gender, "ja-JP-Wavenet-A")

    try:
        # API 키 인증으로 TTS 클라이언트 초기화
        client = texttospeech.TextToSpeechClient(
            client_options=ClientOptions(api_key=api_key)
        )

        synthesis_input = texttospeech.SynthesisInput(text=req.text)
        voice = texttospeech.VoiceSelectionParams(
            language_code="ja-JP",
            name=voice_name,
        )
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        # TTS 합성 요청
        tts_response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config,
        )

    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Google TTS 오류: {str(e)}")

    # 결과를 캐시에 저장
    _tts_cache[cache_key] = tts_response.audio_content
    print(f"[TTS 캐시 저장] key={cache_key!r} ({len(tts_response.audio_content):,} bytes)")

    # MP3 바이트를 스트리밍 응답으로 반환
    return StreamingResponse(
        io.BytesIO(tts_response.audio_content),
        media_type="audio/mpeg",
        headers={"Content-Disposition": "inline; filename=speech.mp3"},
    )


# ──────────────────────────────────────────────
# 회원가입 / 로그인 (이름 + 휴대폰)
# ──────────────────────────────────────────────

@app.post("/auth/signup", response_model=SignupResponse)
def signup(req: SignupRequest):
    """이름 + 휴대폰으로 가입. 이미 존재하면 로그인 처리."""
    if not req.name.strip() or not req.phone.strip():
        raise HTTPException(status_code=400, detail="이름과 휴대폰 번호를 입력해 주세요.")

    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.phone == req.phone).first()
        if existing:
            # 기존 사용자 → 로그인
            return SignupResponse(user_id=existing.id, name=existing.name, is_new=False)
        # 신규 사용자 생성
        new_user = User(name=req.name.strip(), phone=req.phone.strip())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return SignupResponse(user_id=new_user.id, name=new_user.name, is_new=True)
    finally:
        db.close()


# ──────────────────────────────────────────────
# 결과 저장 / 조회 / 삭제
# ──────────────────────────────────────────────

@app.post("/saves")
def save_result(req: SaveRequest):
    """변환 결과를 저장한다."""
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == req.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        saved = SavedResult(
            user_id=req.user_id,
            input_text=req.input_text,
            result_json=json.dumps(req.result, ensure_ascii=False),
        )
        db.add(saved)
        db.commit()
        db.refresh(saved)
        return {"id": saved.id}
    finally:
        db.close()


@app.get("/saves/{user_id}")
def get_saves(user_id: int):
    """저장된 결과 목록을 반환한다."""
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        rows = (
            db.query(SavedResult)
            .filter(SavedResult.user_id == user_id)
            .order_by(SavedResult.created_at.desc())
            .all()
        )
        return [
            {
                "id": r.id,
                "input_text": r.input_text,
                "japanese": json.loads(r.result_json).get("japanese", ""),
                "result": json.loads(r.result_json),
                "created_at": r.created_at.isoformat(),
            }
            for r in rows
        ]
    finally:
        db.close()


@app.delete("/saves/{save_id}")
def delete_save(save_id: int, user_id: int):
    """저장된 결과를 삭제한다."""
    db = SessionLocal()
    try:
        row = db.query(SavedResult).filter(
            SavedResult.id == save_id,
            SavedResult.user_id == user_id,
        ).first()
        if not row:
            raise HTTPException(status_code=404, detail="항목을 찾을 수 없습니다.")
        db.delete(row)
        db.commit()
        return {"message": "삭제되었습니다."}
    finally:
        db.close()
