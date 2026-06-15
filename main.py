import datetime
import io
import json
import os
import re
import uuid

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

# 번역 모델 — flash-lite는 2.5 계열 중 최저 지연(latency) 모델로 번역 응답 속도가 빠름.
# 악센트 품질이 떨어진다고 판단되면 "gemini-2.5-flash"로 되돌리면 됨.
GEMINI_MODEL = "gemini-2.5-flash-lite"

# Gemini 클라이언트 — 요청마다 재생성하지 않고 앱 시작 시 1회 초기화
_gemini_client: genai.Client | None = None

def get_gemini_client() -> genai.Client:
    global _gemini_client
    if _gemini_client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
        _gemini_client = genai.Client(api_key=api_key)
    return _gemini_client

# 1단계 번역 프롬프트 — 번역 + 발음 + 악센트만 생성 (문장 분해 제외).
# breakdown(가장 무거운 출력)을 분리해 임계 경로 출력 토큰을 대폭 줄임 → 응답 속도 향상.
TRANSLATION_PROMPT = """You are a Korean-to-Japanese translation expert with deep knowledge of Tokyo Japanese pitch accent.

When given a Korean sentence, respond with ONLY a valid JSON object. No explanation. No extra text.

Use this exact structure:
{
  "japanese": "毎日、日本語を勉強しています",
  "furigana": "まいにちにほんごをべんきょうしています",
  "korean_pronunciation": "마이니치, 니혼고오 벤쿄-시테이마스",
  "furigana_html": "毎日(まいにち)、日本語(にほんご)を勉強(べんきょう)しています",
  "accent_data": [
    {"phrase_id": "0", "mora_count": 4, "accent": [0, 1, 1, 1]},
    {"phrase_id": "1", "mora_count": 5, "accent": [0, 1, 1, 1, 1]},
    {"phrase_id": "2", "mora_count": 9, "accent": [1, 0, 0, 0, 0, 1, 1, 1, 1]}
  ]
}

Korean Slang Dictionary (참고용 — 직역 금지, 문맥에 맞게 자연스럽게 번역):
- 혼술: 혼자 술 마시기
- 혼밥: 혼자 밥 먹기
- 혼코노: 혼자 코인노래방
- 간맥: 간단히 맥주 한잔
- 옛통: 옛날통닭(옛날식 후라이드)
- 알잘딱깔센: 알아서 잘 딱 깔끔하고 센스있게
- 중꺾마: 중요한 건 꺾이지 않는 마음
- 갓생: 부지런하고 모범적인 인생
- 오운완: 오늘 운동 완료
- 보배: 보조배터리
- 군싹: 군침이 싹 도네
- 텅장: 통장이 텅텅 빔
- 갑통알: 갑자기 통장보니 알바해야겠다
- 빼박: 빼도 박도 못함
- 이왜진: 이게 왜 진짜임?
- 홀리몰리: 감탄사 (Holy moly)
- 머선129: 뭐하는 짓이야 (경상도 사투리 변형)
- 킹받네: 열받네 (King+열받네)
- 킹정: 인정 (King+인정)
- 갑분싸: 갑자기 분위기 싸해짐
- 현타: 현실 자각 타임
- 케바케: 상황마다 다름 (Case by case)
- 사바사: 사람마다 다름
- 삼귀자: 썸과 연애 사이
- 인싸: 잘 어울리는 사람
- 아싸: 소외된 사람
- 손민수: 따라쟁이 (따라 사는 사람)
- 좋댓구알: 좋아요·댓글·구독·알림설정
- 핑프: 검색 안 하고 묻는 사람
- 텍스트힙: 독서가 멋진 행위가 된 현상
- 헬시플레저: 즐기면서 건강관리하는 라이프스타일
- 이모카세: 노포 한식당 추천코스 (이모+오마카세)
- 미코노미: 나를 위한 소비
- 슬세권: 슬리퍼 신고 다닐 수 있는 가까운 동네
- 럭키비키: 모든 상황을 행운으로 해석하는 사고법
- 영포티: 40대인데 30대 같은 라이프스타일
- 아우라 파밍: 자기 분위기/카리스마 가꾸기
- 아자스: 아리가또 고자이마스의 축약
- 밤티: 못생겼다/별로다의 우회 표현
- 중티: 과잉의 미학, 키치한 매력
- 야르: 앗싸/오예 같은 감탄사
- 샤갈(쌰갈): 열 받거나 당황스러울 때 쓰는 감탄사

Rules:
- "japanese": natural Japanese translation using kanji where appropriate
- "furigana": FULL reading in hiragana only (no kanji, no spaces) — concatenation of ALL morae in order
- "korean_pronunciation": how the JAPANESE translation (the "japanese" field) SOUNDS,
  transcribed phonetically using KOREAN Hangul characters (한글).
  This is NOT katakana and NOT the original Korean input — it is the Japanese reading written in Hangul.
  Example: japanese "退勤後に何をしますか" → korean_pronunciation "타이킨고니 나니오 시마스카?"
- "furigana_html": annotate only kanji with (reading) in parentheses; leave hiragana/katakana as-is
- "accent_data": Tokyo Japanese pitch accent per phrase/word group.
  Split the sentence into natural accent phrases (usually 2–5 morae each).
  Each phrase: {"phrase_id": "<index as string>", "mora_count": <int>, "accent": [0 or 1, ...]}.
  accent array length MUST equal mora_count. 0 = Low pitch, 1 = High pitch.
  The sum of all mora_count values MUST equal the total mora count of "furigana".
  Use accurate Tokyo-dialect pitch accent patterns:
    - 平板型 (type 0): [0,1,1,1,...] — rises after 1st mora, stays high
    - 頭高型 (type 1): [1,0,0,0,...] — high on 1st mora, drops immediately
    - 中高型 / 尾高型: place downstep at the correct position
"""

# 2단계 문장 분해 프롬프트 — 의미 덩어리(청크) 단위로 분해해 학습 포인트 중심으로 설명.
BREAKDOWN_PROMPT = """You are a Japanese grammar expert who explains Japanese to Korean learners.

You are given a Japanese sentence. Break it into MEANINGFUL CHUNKS (not individual morphemes).
Respond with ONLY a valid JSON object. No explanation. No extra text.

Chunking rules:
- Group a noun/verb/adjective TOGETHER with its attached particles or auxiliary verbs into one chunk.
  e.g. 日本語を → one chunk (noun + particle), ことができます → one chunk (grammar pattern)
- Grammar patterns like 〜ことができる, 〜てみる, 〜てしまう, 〜ようにする must be one chunk.
- Aim for 3–7 chunks per sentence. Never split a grammar pattern across chunks.
- Conjugated verb/adjective chunks should have conjugation_steps.

Example — 日本語を話すことができますか？:
{
  "breakdown": [
    {
      "unit": "日本語を",
      "hiragana": "にほんごを",
      "korean_pronunciation": "니혼고오",
      "korean_meaning": "일본어를",
      "part_of_speech": "명사+조사",
      "conjugation_steps": null
    },
    {
      "unit": "話す",
      "hiragana": "はなす",
      "korean_pronunciation": "하나스",
      "korean_meaning": "말하다",
      "part_of_speech": "동사",
      "conjugation_steps": [
        {"step": 1, "form": "話す", "label": "기본형 (사전형)", "note": "5단 활용 동사"}
      ]
    },
    {
      "unit": "ことができますか",
      "hiragana": "ことができますか",
      "korean_pronunciation": "코토가데키마스카",
      "korean_meaning": "~할 수 있습니까?",
      "part_of_speech": "문법 패턴",
      "conjugation_steps": [
        {"step": 1, "form": "できる", "label": "기본형", "note": "가능·잠재를 나타내는 이단 동사"},
        {"step": 2, "form": "できます", "label": "ます형 (정중체)", "note": "できる → できます"},
        {"step": 3, "form": "できますか", "label": "의문형", "note": "か를 붙여 정중한 의문문 형성"}
      ]
    }
  ]
}

Fields:
- "unit": surface form as it appears in the sentence (kanji where used)
- "hiragana": reading in hiragana
- "korean_pronunciation": Korean-character pronunciation
- "korean_meaning": Korean meaning of this chunk
- "part_of_speech": e.g. 명사/동사/형용사/부사/조사/조동사/문법 패턴/명사+조사/동사+보조동사/기타
- "conjugation_steps": null for uninflected chunks; array for conjugated/pattern chunks
  Each step: {"step": <int>, "form": <Japanese>, "label": <Korean label>, "note": <Korean explanation>}
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

# 번역 결과 캐시 — 키: 한국어 원문, 값: AnalyzeResponse dict
_analyze_cache: dict[str, dict] = {}

# 억양 전용 캐시 — 키: 일본어 원문, 값: accent_data list
_accent_cache: dict[str, list] = {}

# 문장 분해 캐시 — 키: 일본어 원문, 값: breakdown list
_breakdown_cache: dict[str, list] = {}

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
    id           = Column(Integer, primary_key=True, index=True)
    user_id      = Column(Integer, nullable=True, index=True)
    anonymous_id = Column(String(36), nullable=True, index=True)
    input_text   = Column(String(500), nullable=False)
    result_json  = Column(Text, nullable=False)
    created_at   = Column(DateTime, default=datetime.datetime.utcnow)


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

class ConjugationStep(BaseModel):
    step: int
    form: str
    label: str
    note: str

class BreakdownEntry(BaseModel):
    unit: str
    hiragana: str
    korean_pronunciation: str
    korean_meaning: str = ""
    part_of_speech: str
    conjugation_steps: list[ConjugationStep] | None = None

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
    user_id: int | None = None
    anonymous_id: str | None = None
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

# 응답 속도 최적화 설정 (번역/분해 공통):
# - thinking_budget=0 : 추론 단계 생략
# - response_mime_type="application/json" : JSON 출력 강제 → 마크다운 래핑·파싱 실패 경로 제거
_GEN_CONFIG = genai.types.GenerateContentConfig(
    thinking_config=genai.types.ThinkingConfig(thinking_budget=0),
    response_mime_type="application/json",
)


def _call_gemini_json(prompt: str) -> dict:
    """Gemini에 프롬프트를 보내고 JSON 응답을 파싱해 dict로 반환한다 (공통 호출 로직)."""
    import time

    client = get_gemini_client()

    for attempt in range(2):  # 최대 1회 재시도 (서버 부하 방지)
        try:
            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config=_GEN_CONFIG,
            )
            break
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "RESOURCE_EXHAUSTED" in err_str:
                # 쿼터 초과 — 재시도 없이 즉시 안내
                raise HTTPException(status_code=429, detail="번역 서버가 혼잡합니다. 잠시 후 다시 시도해 주세요.")
            elif "503" in err_str or "UNAVAILABLE" in err_str:
                print(f"[Gemini 재시도 {attempt + 1}/2] {err_str[:80]}")
                time.sleep(1)
            else:
                raise HTTPException(status_code=502, detail=f"Gemini API 오류: {err_str}")
    else:
        raise HTTPException(status_code=503, detail="Gemini 서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.")

    raw = response.text.strip() if response.text else ""
    if not raw:
        raise HTTPException(status_code=502, detail="Gemini 응답이 비어 있습니다.")

    # 혹시 마크다운 코드블록으로 감싸진 경우 제거 (방어적 처리)
    if raw.startswith("```"):
        raw = re.sub(r"^```[a-zA-Z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw.strip())

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini 응답을 JSON으로 파싱할 수 없습니다: {raw[:300]}"
        )


def translate_korean_to_japanese(korean_text: str) -> dict:
    """한국어 문장을 Gemini API로 번역해 번역문·발음·악센트를 반환한다 (문장 분해 제외)."""
    result = _call_gemini_json(f"{TRANSLATION_PROMPT}\n\nKorean input: {korean_text}")

    required_keys = {"japanese", "furigana", "korean_pronunciation", "furigana_html", "accent_data"}
    missing = required_keys - result.keys()
    if missing:
        raise HTTPException(status_code=502, detail=f"Gemini 응답에 누락된 키: {missing}")

    return result


def generate_breakdown(japanese_text: str) -> list[dict]:
    """이미 번역된 일본어 문장을 단어별로 분해해 breakdown 리스트를 반환한다."""
    result = _call_gemini_json(f"{BREAKDOWN_PROMPT}\n\nJapanese sentence: {japanese_text}")

    breakdown = result.get("breakdown")
    if not isinstance(breakdown, list):
        raise HTTPException(status_code=502, detail="Gemini 분해 응답에 breakdown 배열이 없습니다.")

    return breakdown

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
        response = requests.post(OJAD_URL, data=payload, headers=OJAD_HEADERS, timeout=8)
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
    한국어 문장을 받아 일본어 번역 + 악센트 배열을 빠르게 반환한다 (문장 분해 제외).

    문장 분해(breakdown)는 가장 무거운 출력이라 별도 /breakdown 엔드포인트로 분리.
    프론트는 이 응답으로 번역+그래프를 먼저 그리고, 분해는 뒤이어 비동기로 채운다.

    1. 캐시 조회 — 동일 문장은 즉시 반환
    2. Gemini API로 한국어 → 일본어 번역 + 억양 데이터 생성 (thinking 비활성화)
    """
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="입력 텍스트가 비어 있습니다.")

    # ── 캐시 조회 ──────────────────────────────
    if text in _analyze_cache:
        print(f"[Analyze 캐시 HIT] {text[:40]!r}")
        cached = _analyze_cache[text]
        return AnalyzeResponse(**cached)
    # ───────────────────────────────────────────

    # 한국어 → 일본어 번역 + 억양 데이터
    translation = translate_korean_to_japanese(text)

    # Gemini가 직접 제공한 억양 데이터 사용
    raw_accent = translation.get("accent_data", [])
    try:
        accent_data = [AccentEntry(**e) for e in raw_accent]
    except Exception:
        accent_data = []

    result = AnalyzeResponse(
        japanese=translation["japanese"],
        furigana=translation["furigana"],
        korean_pronunciation=translation["korean_pronunciation"],
        furigana_html=translation["furigana_html"],
        accent_data=accent_data,
        breakdown=[],  # 분해는 /breakdown에서 별도 생성
    )

    # 결과를 캐시에 저장 (최대 500개, 초과 시 오래된 항목 제거)
    if len(_analyze_cache) >= 500:
        oldest_key = next(iter(_analyze_cache))
        del _analyze_cache[oldest_key]
    _analyze_cache[text] = result.model_dump()
    print(f"[Analyze 캐시 저장] {text[:40]!r}")

    return result


class BreakdownRequest(BaseModel):
    japanese: str

class BreakdownResponse(BaseModel):
    breakdown: list[BreakdownEntry]

@app.post("/breakdown", response_model=BreakdownResponse)
def breakdown(req: BreakdownRequest):
    """
    이미 번역된 일본어 문장을 받아 단어별 문장 분해를 반환한다.

    /analyze가 반환한 일본어 문장을 그대로 받으므로 재번역 없이 일관성 유지.
    무거운 분해 생성을 임계 경로에서 분리해 번역 응답 속도를 높이기 위한 엔드포인트.
    """
    text = req.japanese.strip()
    if not text:
        raise HTTPException(status_code=400, detail="입력 텍스트가 비어 있습니다.")

    # ── 캐시 조회 ──────────────────────────────
    if text in _breakdown_cache:
        print(f"[Breakdown 캐시 HIT] {text[:40]!r}")
        return BreakdownResponse(breakdown=_breakdown_cache[text])
    # ───────────────────────────────────────────

    raw_breakdown = generate_breakdown(text)
    try:
        entries = [BreakdownEntry(**e) for e in raw_breakdown]
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"분해 데이터 형식 오류: {e}")

    result = BreakdownResponse(breakdown=entries)

    # 캐시에 저장 (최대 500개)
    if len(_breakdown_cache) >= 500:
        del _breakdown_cache[next(iter(_breakdown_cache))]
    _breakdown_cache[text] = [e.model_dump() for e in entries]
    print(f"[Breakdown 캐시 저장] {text[:40]!r}")

    return result


class AccentRequest(BaseModel):
    japanese: str

@app.post("/accent")
def get_accent(req: AccentRequest):
    """일본어 텍스트를 받아 OJAD 억양 데이터를 반환한다. (동사 활용형 억양 표시용)"""
    text = req.japanese.strip()
    if not text:
        raise HTTPException(status_code=400, detail="입력이 비어 있습니다.")

    if text in _accent_cache:
        return {"accent_data": _accent_cache[text]}

    accent_data = fetch_accent_data(text)

    if len(_accent_cache) >= 500:
        oldest = next(iter(_accent_cache))
        del _accent_cache[oldest]
    _accent_cache[text] = accent_data

    return {"accent_data": [AccentEntry(**e) for e in accent_data]}


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
    """변환 결과를 저장한다. 로그인 사용자는 user_id, 비로그인은 anonymous_id로 저장."""
    if not req.user_id and not req.anonymous_id:
        raise HTTPException(status_code=400, detail="user_id 또는 anonymous_id가 필요합니다.")

    db = SessionLocal()
    try:
        if req.user_id:
            user = db.query(User).filter(User.id == req.user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        saved = SavedResult(
            user_id=req.user_id,
            anonymous_id=req.anonymous_id if not req.user_id else None,
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


