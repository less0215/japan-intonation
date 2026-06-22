import datetime
import io
import json
import os
import re
import uuid

import requests
from bs4 import BeautifulSoup
import time
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import StreamingResponse
from google import genai
from google.api_core.client_options import ClientOptions
from google.cloud import texttospeech
from pydantic import BaseModel
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine, text as sa_text
from sqlalchemy.exc import IntegrityError
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
# 응답 압축 — 분해/번역 JSON 전송 시간 단축 (특히 모바일)
app.add_middleware(GZipMiddleware, minimum_size=600)

# 동시 처리량 확대 — 동기 핸들러는 스레드풀에서 실행되므로,
# Gemini 호출(수백 ms~1초)이 몰려도 줄서지 않도록 풀 크기를 키운다.
@app.on_event("startup")
async def _tune_concurrency():
    try:
        import anyio
        anyio.to_thread.current_default_thread_limiter().total_tokens = 200
        print("[startup] thread limiter → 200")
    except Exception as e:
        print("[startup] thread limiter skip:", e)

# 처리 시간 측정 — 응답 헤더 X-Process-Time-ms + 핵심 엔드포인트 로그
@app.middleware("http")
async def _timing(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    ms = (time.perf_counter() - start) * 1000
    response.headers["X-Process-Time-ms"] = f"{ms:.0f}"
    if request.url.path in ("/analyze", "/breakdown"):
        print(f"[{request.method} {request.url.path}] {ms:.0f}ms")
    return response

# ──────────────────────────────────────────────
# 상수
# ──────────────────────────────────────────────

# 번역 모델 2종
# - basic(기본): 2.5 flash-lite (무제한)
# - fast(빠른) : 3.1 flash-lite (차세대 저지연, 일일 제한)
BASIC_MODEL = "gemini-2.5-flash-lite"
FAST_MODEL  = "gemini-3.1-flash-lite"
GEMINI_MODEL = BASIC_MODEL   # 분해/악센트 등 기본 호출용

def resolve_model(key: str) -> str:
    return FAST_MODEL if key == "fast" else BASIC_MODEL

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
- "japanese": natural Japanese translation using kanji where appropriate.
  Match the SPEECH LEVEL (politeness) of the Korean input EXACTLY:
    • Polite Korean (해요체/합니다체) → polite Japanese (です・ます / 敬体)
    • Casual/plain Korean (반말, 해체/한다체) → casual Japanese (常体 / タメ口, plain form)
  Do NOT default everything to polite form — mirror the input's register faithfully.
  If the input is a single word or its register is genuinely ambiguous, default to polite (です・ます).
- "furigana": FULL reading in hiragana only (no kanji, no spaces) — concatenation of ALL morae in order
- "korean_pronunciation": how the JAPANESE translation (the "japanese" field) SOUNDS,
  transcribed phonetically using KOREAN Hangul characters (한글).
  This is NOT katakana and NOT the original Korean input — it is the Japanese reading written in Hangul.
  CRITICAL: Convert the "furigana" (hiragana) mora-by-mora into Hangul, accurately and consistently.
  Map each kana to its standard Hangul sound. Common correct mappings (follow EXACTLY):
    あ=아 い=이 う=우 え=에 お=오 / か=카 き=키 く=쿠 け=케 こ=코 /
    さ=사 し=시 す=스 せ=세 そ=소 / た=타 ち=치 つ=츠 て=테 と=토 /
    な=나 に=니 ぬ=누 ね=네 の=노 / は=하 ひ=히 ふ=후 へ=헤 ほ=호 /
    ま=마 み=미 む=무 め=메 も=모 / や=야 ゆ=유 よ=요 / ら=라 り=리 る=루 れ=레 ろ=로 / わ=와 を=오 ん=ㄴ받침
  Examples (MUST match): いや→이야, 愛してる(あいしてる)→아이시테루, ありがとう→아리가토-, 日本語(にほんご)→니혼고.
  Double-check: the first kana い ALWAYS starts with 이 (never 미). あ ALWAYS 아 (never 마).
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

# 한국 표준시(KST) — created_at을 KST 벽시계 기준으로 저장
KST = datetime.timezone(datetime.timedelta(hours=9))
def now_kst():
    return datetime.datetime.now(KST).replace(tzinfo=None)

class User(Base):
    __tablename__ = "users"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(100), nullable=False)
    phone      = Column(String(20), unique=True, nullable=False, index=True)
    platform   = Column(String(10), nullable=True)   # 가입 경로 'app' | 'web'
    created_at = Column(DateTime, default=now_kst)

class SavedResult(Base):
    __tablename__ = "saved_results"
    # 데일리 체크 우선순위 순서 (좌→우): 시각·입력·결과·구분·누구·원본
    id           = Column(Integer, primary_key=True, index=True)
    created_at   = Column(DateTime, default=now_kst)        # 언제 (KST)
    input_text   = Column(String(500), nullable=False)      # 한국어 입력
    japanese     = Column(String(500), nullable=True)       # 일본어 결과 (한눈에)
    source       = Column(String(10), default='manual')     # 'auto'=번역시 자동기록 / 'manual'=사용자 저장
    platform     = Column(String(10), nullable=True)        # 'app' | 'web' (요청 출처)
    user_id      = Column(Integer, nullable=True, index=True)
    anonymous_id = Column(String(36), nullable=True, index=True)
    result_json  = Column(Text, nullable=True)              # 전체 결과(저장 복원용, auto는 비움)

class AndroidWaitlist(Base):
    """안드로이드 출시 알림 신청자 — 출시 시 이 회원들에게만 알림 팝업 노출"""
    __tablename__ = "android_waitlist"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, unique=True, nullable=False, index=True)
    notified   = Column(Integer, default=0)   # 0=대기, 1=알림 본 상태(중복 방지용)
    created_at = Column(DateTime, default=now_kst)

class FastUsage(Base):
    """빠른 번역(3.1) 사용량 — 회원당 1행, 5시간 롤링 윈도우(클로드 방식).
    첫 사용 시점에 윈도우 시작 → 5시간 뒤 카운트 리셋.
    User/SavedResult 스키마는 건드리지 않는 별도 테이블."""
    __tablename__ = "fast_usage"
    user_id      = Column(Integer, primary_key=True, index=True)  # 회원당 1행
    window_start = Column(DateTime, nullable=True)                # 현재 윈도우 시작 시각 (KST naive)
    count        = Column(Integer, default=0)
    updated_at   = Column(DateTime, default=now_kst, onupdate=now_kst)


# SQLite는 check_same_thread 필요, PostgreSQL은 불필요
_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine       = create_engine(DATABASE_URL, connect_args=_connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base.metadata.create_all(bind=engine)


def run_migrations():
    """기존 saved_results 테이블에 신규 열 추가·백필 (PostgreSQL, 멱등)."""
    if DATABASE_URL.startswith("sqlite"):
        return
    try:
        with engine.begin() as conn:
            conn.execute(sa_text("ALTER TABLE saved_results ADD COLUMN IF NOT EXISTS source VARCHAR(10) DEFAULT 'manual'"))
            conn.execute(sa_text("ALTER TABLE saved_results ADD COLUMN IF NOT EXISTS japanese VARCHAR(500)"))
            conn.execute(sa_text("ALTER TABLE saved_results ADD COLUMN IF NOT EXISTS platform VARCHAR(10)"))
            conn.execute(sa_text("ALTER TABLE users ADD COLUMN IF NOT EXISTS platform VARCHAR(10)"))
            conn.execute(sa_text("ALTER TABLE saved_results ALTER COLUMN result_json DROP NOT NULL"))
    except Exception as e:
        print("[migration] add columns skipped:", e)
    # 기존 행 japanese 백필 (result_json에서 추출)
    try:
        with engine.begin() as conn:
            conn.execute(sa_text(
                "UPDATE saved_results SET japanese = (result_json::json->>'japanese') "
                "WHERE japanese IS NULL AND result_json IS NOT NULL"
            ))
    except Exception as e:
        print("[migration] japanese backfill skipped:", e)
    # fast_usage: 일일(date_kst) → 5시간 윈도우(window_start)로 전환
    try:
        with engine.begin() as conn:
            conn.execute(sa_text("ALTER TABLE fast_usage ADD COLUMN IF NOT EXISTS window_start TIMESTAMP"))
            conn.execute(sa_text("ALTER TABLE fast_usage ALTER COLUMN date_kst DROP NOT NULL"))
    except Exception as e:
        print("[migration] fast_usage window_start skipped:", e)
    # 데일리 체크용 뷰 (우선순위 열 순서) — platform 추가 위해 재생성
    try:
        with engine.begin() as conn:
            conn.execute(sa_text("DROP VIEW IF EXISTS saved_glance"))
            conn.execute(sa_text(
                "CREATE VIEW saved_glance AS "
                "SELECT created_at, input_text, japanese, source, platform, user_id, anonymous_id, id "
                "FROM saved_results ORDER BY created_at DESC"
            ))
    except Exception as e:
        print("[migration] view skipped:", e)

run_migrations()

# ──────────────────────────────────────────────
# Pydantic 스키마
# ──────────────────────────────────────────────

class AnalyzeRequest(BaseModel):
    text: str
    user_id: int | None = None       # 로그인 사용자 (선택)
    anonymous_id: str | None = None  # 비로그인 식별자 (선택)
    model: str = "basic"             # 'basic'(2.5) | 'fast'(3.1)
    platform: str | None = None      # 'app' | 'web' (요청 출처)

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
    platform: str | None = None      # 'app' | 'web' (가입 경로)

class SignupResponse(BaseModel):
    user_id: int
    name: str
    is_new: bool   # True=신규, False=기존 사용자 로그인
    fast_unlimited: bool = False   # 빠른 번역 무제한 화이트리스트 여부

# 빠른 번역(3.1) 사용량 제한 없이 쓸 수 있는 휴대폰 번호 화이트리스트.
# (후기 작성 인증 회원 등 — 숫자만, 하이픈/공백 무시)
FAST_UNLIMITED_PHONES = {
    "01033530215",
    "01048414546",
    "01098504859",
    "01020222092",
    "01038017404",
    "01046880625",
    "01056321669",
    "01071316408",
    "01045300374",
    "01025953459",
    "01075837418",
    "01055044769",
    "01026802463",
    "01053020716",
    "01094263986",
    "01022413008",
    "01087411889",
    "01068562204",
    "01057854480",
    "01057294480",
    "01082879771",
    "01088117127",
    "01099263819",
    "01055513370",
    "01089029436",
    "01028518105",
    "01097184123",
    "01032795524",
    "01055722147",
    "01055001537",
    "01049850242",
    "01037459331",
    "01030173354",
    "01049365563",
    "01042178214",
    "01064722514",
    "01043418158",
    "01067083310",
    "01032427433",
    "01039557828",
}

def _norm_phone(phone: str) -> str:
    """휴대폰 번호에서 숫자만 추출 (하이픈/공백 표기 차이 무시)."""
    return "".join(c for c in (phone or "") if c.isdigit())

def is_fast_unlimited(phone: str) -> bool:
    return _norm_phone(phone) in FAST_UNLIMITED_PHONES

# 빠른 번역 한도 — 5시간 롤링 윈도우(클로드 방식)
FAST_WINDOW_LIMIT = 20            # 윈도우당 횟수
FAST_WINDOW_SEC   = 5 * 3600      # 윈도우 길이(초)

def _is_unlimited_user(db, user_id: int) -> bool:
    u = db.query(User).filter(User.id == user_id).first()
    return bool(u and is_fast_unlimited(u.phone))

def _reset_in_sec(window_start) -> int:
    """현재 윈도우 종료까지 남은 초. 윈도우 없으면 0."""
    if not window_start:
        return 0
    elapsed = (now_kst() - window_start).total_seconds()
    return max(0, int(FAST_WINDOW_SEC - elapsed))

def get_fast_usage(user_id: int) -> dict:
    """회원의 빠른 번역 사용량 조회 (5시간 윈도우 리셋 반영)."""
    db = SessionLocal()
    try:
        if _is_unlimited_user(db, user_id):
            return {"unlimited": True, "used": 0, "limit": FAST_WINDOW_LIMIT, "pct": 0,
                    "remaining": FAST_WINDOW_LIMIT, "reset_in_sec": 0}
        row = db.query(FastUsage).filter(FastUsage.user_id == user_id).first()
        # 윈도우가 만료됐으면 0으로 간주
        if not row or not row.window_start or _reset_in_sec(row.window_start) <= 0:
            return {"unlimited": False, "used": 0, "limit": FAST_WINDOW_LIMIT, "pct": 0,
                    "remaining": FAST_WINDOW_LIMIT, "reset_in_sec": 0}
        used = row.count
        pct = min(100, round(used / FAST_WINDOW_LIMIT * 100))
        return {"unlimited": False, "used": used, "limit": FAST_WINDOW_LIMIT, "pct": pct,
                "remaining": max(0, FAST_WINDOW_LIMIT - used), "reset_in_sec": _reset_in_sec(row.window_start)}
    finally:
        db.close()

def consume_fast_usage(user_id: int) -> dict:
    """빠른 번역 1회 차감 시도(5시간 윈도우). 가능하면 count+1 후 allowed=True, 초과면 allowed=False.
    무제한 회원은 차감 없이 항상 allowed=True."""
    db = SessionLocal()
    try:
        if _is_unlimited_user(db, user_id):
            return {"allowed": True, "unlimited": True, "pct": 0,
                    "remaining": FAST_WINDOW_LIMIT, "reset_in_sec": 0}
        now = now_kst()
        row = db.query(FastUsage).filter(FastUsage.user_id == user_id).first()
        if row is None:
            row = FastUsage(user_id=user_id, window_start=now, count=0)
            db.add(row)
        # 윈도우 없음/만료 → 새 윈도우 시작
        if not row.window_start or (now - row.window_start).total_seconds() >= FAST_WINDOW_SEC:
            row.window_start = now
            row.count = 0
        if row.count >= FAST_WINDOW_LIMIT:
            db.commit()
            return {"allowed": False, "unlimited": False, "pct": 100, "remaining": 0,
                    "reset_in_sec": _reset_in_sec(row.window_start)}
        row.count += 1
        db.commit()
        pct = min(100, round(row.count / FAST_WINDOW_LIMIT * 100))
        return {"allowed": True, "unlimited": False, "pct": pct,
                "remaining": max(0, FAST_WINDOW_LIMIT - row.count),
                "reset_in_sec": _reset_in_sec(row.window_start)}
    finally:
        db.close()

class SaveRequest(BaseModel):
    user_id: int | None = None
    anonymous_id: str | None = None
    input_text: str
    result: dict
    platform: str | None = None      # 'app' | 'web' (요청 출처)


class AnalyzeResponse(BaseModel):
    japanese: str
    furigana: str
    korean_pronunciation: str
    furigana_html: str          # 예: 日本語(にほんご)を勉強(べんきょう)しています
    accent_data: list[AccentEntry]
    breakdown: list[BreakdownEntry]
    # 빠른 번역 사용량 (요청별로 채움, 캐시값은 무시하고 덮어씀)
    model_used: str = "basic"        # 실제 사용 모델 'basic' | 'fast'
    fast_limited: bool = False        # 한도 초과로 기본 번역 폴백됨
    fast_used_pct: int | None = None  # 빠른 번역 사용량 %
    fast_unlimited: bool = False      # 무제한 회원
    fast_reset_sec: int | None = None # 윈도우 리셋까지 남은 초

# ──────────────────────────────────────────────
# 번역 로직 — Gemini API
# ──────────────────────────────────────────────

# 응답 속도 최적화 설정 (번역/분해 공통):
# - thinking_budget=0 : 추론 단계 생략
# - response_mime_type="application/json" : JSON 출력 강제 → 마크다운 래핑·파싱 실패 경로 제거
_GEN_CONFIG = genai.types.GenerateContentConfig(
    thinking_config=genai.types.ThinkingConfig(thinking_budget=0),
    response_mime_type="application/json",
    temperature=0,   # 출력 일관성 ↑ (한글 독음 등 간헐 오류 완화)
)


def _call_gemini_json(prompt: str, model: str = None) -> dict:
    """Gemini에 프롬프트를 보내고 JSON 응답을 파싱해 dict로 반환한다 (공통 호출 로직)."""
    client = get_gemini_client()
    model = model or GEMINI_MODEL

    for attempt in range(2):  # 최대 1회 재시도 (서버 부하 방지)
        try:
            _t0 = time.perf_counter()
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=_GEN_CONFIG,
            )
            print(f"[Gemini {model}] {(time.perf_counter() - _t0) * 1000:.0f}ms")
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


def translate_korean_to_japanese(korean_text: str, model: str = None) -> dict:
    """한국어 문장을 Gemini API로 번역해 번역문·발음·악센트를 반환한다 (문장 분해 제외)."""
    result = _call_gemini_json(f"{TRANSLATION_PROMPT}\n\nKorean input: {korean_text}", model=model)

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

def log_translation(input_text, japanese, user_id=None, anonymous_id=None, platform=None):
    """번역 시도를 saved_results에 자동 기록 (source='auto'). 실패해도 번역에 영향 없음."""
    db = SessionLocal()
    try:
        row = SavedResult(
            input_text=(input_text or "")[:500],
            japanese=(japanese or "")[:500],
            source='auto',
            platform=platform,
            user_id=user_id,
            anonymous_id=anonymous_id,
            result_json=None,
        )
        db.add(row)
        db.commit()
    except Exception as e:
        db.rollback()
        print("[log_translation] skipped:", e)
    finally:
        db.close()


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

    # ── 빠른 번역 한도 판정 (서버에서 차감·리셋) ──
    # 빠른 번역은 로그인 회원만. 한도 초과/비회원이면 기본 번역으로 폴백.
    want_fast = (req.model == "fast")
    usage_fields = {"model_used": "basic", "fast_limited": False,
                    "fast_used_pct": None, "fast_unlimited": False, "fast_reset_sec": None}
    if want_fast and req.user_id:
        u = consume_fast_usage(req.user_id)
        usage_fields["fast_unlimited"] = u.get("unlimited", False)
        usage_fields["fast_used_pct"] = u.get("pct")
        usage_fields["fast_reset_sec"] = u.get("reset_in_sec")
        if u["allowed"]:
            usage_fields["model_used"] = "fast"
        else:
            usage_fields["fast_limited"] = True   # 한도 초과 → 기본 번역으로 폴백
    elif want_fast and not req.user_id:
        # 비로그인: 보상형 광고 시청 후 세션 한정 빠른 번역 (서버 사용량 추적 없음)
        usage_fields["model_used"] = "fast"
    model_key = usage_fields["model_used"]   # 'fast' or 'basic'

    def _with_usage(resp: AnalyzeResponse) -> AnalyzeResponse:
        for k, v in usage_fields.items():
            setattr(resp, k, v)
        return resp

    cache_key = f"{model_key}:{text}"

    # ── 캐시 조회 ──────────────────────────────
    if cache_key in _analyze_cache:
        print(f"[Analyze 캐시 HIT] {cache_key[:46]!r}")
        cached = _analyze_cache[cache_key]
        log_translation(text, cached.get("japanese"), req.user_id, req.anonymous_id, req.platform)
        return _with_usage(AnalyzeResponse(**cached))
    # ───────────────────────────────────────────

    # 한국어 → 일본어 번역 + 억양 데이터 (선택 모델)
    translation = translate_korean_to_japanese(text, model=resolve_model(model_key))

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
    if len(_analyze_cache) >= 2000:
        oldest_key = next(iter(_analyze_cache))
        del _analyze_cache[oldest_key]
    _analyze_cache[cache_key] = result.model_dump()
    print(f"[Analyze 캐시 저장] {cache_key[:46]!r}")

    # 번역 시도 자동 기록 (웹·앱 공통, source='auto')
    log_translation(text, result.japanese, req.user_id, req.anonymous_id, req.platform)

    return _with_usage(result)


@app.get("/fast-usage/{user_id}")
def fast_usage(user_id: int):
    """회원의 오늘 빠른 번역 사용량 (%, 무제한 여부) — 로그인/진입 시 표시용."""
    return get_fast_usage(user_id)


@app.post("/fast-usage/{user_id}/reset")
def fast_usage_reset(user_id: int):
    """보상형 광고 시청 보상: 5시간 윈도우를 즉시 초기화(count=0, 새 윈도우 시작).
    앱에서 '소진 시 광고 보고 지금 바로 켜기' 보상으로 호출한다.
    (주의: 현재는 클라이언트 호출 기반. 추후 AdMob 서버 사이드 검증(SSV)으로 강화 예정.)"""
    db = SessionLocal()
    try:
        now = now_kst()
        row = db.query(FastUsage).filter(FastUsage.user_id == user_id).first()
        if row is None:
            row = FastUsage(user_id=user_id, window_start=now, count=0)
            db.add(row)
        else:
            row.window_start = now
            row.count = 0
        db.commit()
        return {"ok": True, "pct": 0, "remaining": FAST_WINDOW_LIMIT, "reset_in_sec": FAST_WINDOW_SEC}
    finally:
        db.close()


# 무제한 회원 조회용 관리 토큰 (개인정보 노출 방지)
FAST_ADMIN_KEY = "tickjapan-admin-9f3a2b"

@app.get("/fast-unlimited")
def fast_unlimited_list(key: str = ""):
    """무제한 화이트리스트 번호를 DB 가입정보(이름)와 자동 대조해 보여준다.
    개인정보(이름·번호) 노출 방지를 위해 ?key=관리토큰 필요."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다. ?key=... 를 붙여주세요.")
    db = SessionLocal()
    try:
        by_norm = {_norm_phone(u.phone): u for u in db.query(User).all()}
        members = []
        for p in sorted(FAST_UNLIMITED_PHONES):
            u = by_norm.get(_norm_phone(p))
            members.append({
                "phone": p,
                "name": u.name if u else None,
                "registered": bool(u),      # 실제 가입 여부
                "platform": u.platform if u else None,
                "created_at": u.created_at.isoformat() if (u and u.created_at) else None,
            })
        registered = sum(1 for m in members if m["registered"])
        return {"total": len(members), "registered": registered, "members": members}
    finally:
        db.close()


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
    if len(_breakdown_cache) >= 2000:
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

    if len(_accent_cache) >= 2000:
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
            # 번호는 고유 식별자. 이름이 일치하면 본인 → 로그인,
            # 다르면 이미 다른 사람이 가입한 번호이므로 차단.
            if existing.name == req.name.strip():
                return SignupResponse(user_id=existing.id, name=existing.name, is_new=False,
                                      fast_unlimited=is_fast_unlimited(existing.phone))
            raise HTTPException(
                status_code=409,
                detail="이미 가입된 휴대폰 번호입니다. 가입 시 사용한 이름을 입력해 주세요.",
            )
        # 신규 사용자 생성
        new_user = User(name=req.name.strip(), phone=req.phone.strip(), platform=req.platform)
        db.add(new_user)
        try:
            db.commit()
        except IntegrityError:
            # 동시 가입 등으로 같은 번호가 먼저 생성된 경우
            db.rollback()
            raise HTTPException(
                status_code=409,
                detail="이미 가입된 휴대폰 번호입니다. 가입 시 사용한 이름을 입력해 주세요.",
            )
        db.refresh(new_user)
        return SignupResponse(user_id=new_user.id, name=new_user.name, is_new=True,
                              fast_unlimited=is_fast_unlimited(new_user.phone))
    finally:
        db.close()


# ──────────────────────────────────────────────
# 안드로이드 출시 알림 신청
# ──────────────────────────────────────────────

class AndroidInterestRequest(BaseModel):
    user_id: int

@app.post("/android-interest")
def android_interest(req: AndroidInterestRequest):
    """안드로이드 출시 알림 신청 (로그인 회원만). 중복 신청은 무시."""
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.id == req.user_id).first():
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        exists = db.query(AndroidWaitlist).filter(AndroidWaitlist.user_id == req.user_id).first()
        if exists:
            return {"ok": True, "already": True}
        db.add(AndroidWaitlist(user_id=req.user_id))
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
        return {"ok": True, "already": False}
    finally:
        db.close()

@app.get("/android-interest/{user_id}")
def android_interest_status(user_id: int):
    """이 회원이 안드로이드 알림 신청했는지 + 아직 알림 안 봤는지 (출시 팝업 노출 판단용)."""
    db = SessionLocal()
    try:
        row = db.query(AndroidWaitlist).filter(AndroidWaitlist.user_id == user_id).first()
        return {"opted_in": bool(row), "notified": bool(row and row.notified)}
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
            japanese=(req.result.get("japanese") if isinstance(req.result, dict) else None),
            source='manual',   # 사용자가 직접 저장
            platform=req.platform,
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
            .filter(SavedResult.source != 'auto')   # 자동 기록 제외, 사용자가 저장한 것만
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


@app.delete("/auth/user/{user_id}")
def delete_user(user_id: int):
    """회원 탈퇴: 저장된 번역 결과 및 계정을 삭제한다."""
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        # 저장된 번역 결과 먼저 삭제
        db.query(SavedResult).filter(SavedResult.user_id == user_id).delete()
        db.delete(user)
        db.commit()
        return {"message": "계정이 삭제되었습니다."}
    finally:
        db.close()


