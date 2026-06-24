import base64
import datetime
import hashlib
import io
import json
import os
import re
import uuid

import requests
import time
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import StreamingResponse
from google import genai
from google.api_core.client_options import ClientOptions
from google.cloud import texttospeech
from pydantic import BaseModel
from sqlalchemy import Boolean, Column, DateTime, Integer, LargeBinary, String, Text, create_engine, text as sa_text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# ──────────────────────────────────────────────
# FastAPI 앱 초기화
# ──────────────────────────────────────────────
app = FastAPI(
    title="Korean → Japanese Accent Analyzer",
    description="한국어 문장을 일본어로 번역하고 Gemini 기반 악센트 배열을 반환하는 API",
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

# (악센트는 Gemini가 /analyze에서 직접 생성 — 구 OJAD 스크래핑은 타임아웃 잦아 폐기)

# 성별에 따른 Google TTS Wavenet 음성 매핑
TTS_VOICE_MAP = {
    "female": "ja-JP-Wavenet-A",
    "male":   "ja-JP-Wavenet-D",
}


# 아래 3개는 L1(인메모리) 캐시. 서버 재시작 시 비워지지만,
# CacheEntry 테이블(L2 영구 캐시)이 뒤를 받쳐 재시작 후에도 결과가 복원된다.
# TTS 메모리 캐시 — 키: "{text}_{gender}", 값: mp3 바이너리
_tts_cache: dict[str, bytes] = {}

# 번역 결과 캐시 — 키: "{model}:{한국어 원문}", 값: AnalyzeResponse dict
_analyze_cache: dict[str, dict] = {}

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

class AppSetting(Base):
    """운영 설정 key/value — 앱 출시 없이 서버에서 바꾸는 값(예: 강제 업데이트 최소버전)"""
    __tablename__ = "app_setting"
    key        = Column(String(40), primary_key=True)
    value      = Column(String(200), nullable=False)
    updated_at = Column(DateTime, default=now_kst, onupdate=now_kst)


class PaymentWaitlist(Base):
    """결제(구독) 출시 알림 신청자 — 정식 오픈 시 이 회원들에게 메시지 발송용"""
    __tablename__ = "payment_waitlist"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, unique=True, nullable=False, index=True)
    notified   = Column(Integer, default=0)
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


class Subscription(Base):
    """유료 구독(웹 결제, 토스페이먼츠 자동결제). User/SavedResult 스키마와 무관한 별도 테이블.
    plan: 'plus' | 'pro' / period: 'monthly' | 'yearly' / status: 'active' | 'canceled' | 'expired'"""
    __tablename__ = "subscription"
    id          = Column(Integer, primary_key=True, autoincrement=True)
    user_id     = Column(Integer, index=True, nullable=False)
    plan        = Column(String(10), nullable=False)     # plus | pro
    period      = Column(String(10), nullable=False)     # monthly | yearly
    status      = Column(String(12), default='active', index=True)
    billing_key = Column(Text, nullable=True)            # 토스 빌링키(자동결제용)
    customer_key= Column(String(64), nullable=True)
    started_at  = Column(DateTime, default=now_kst)
    expires_at  = Column(DateTime, nullable=True, index=True)  # 이 시각까지 유효
    last_paid_at= Column(DateTime, nullable=True)
    updated_at  = Column(DateTime, default=now_kst, onupdate=now_kst)


class Message(Base):
    """운영자 → 회원 메시지(메시지함). User/SavedResult 스키마와 무관한 별도 테이블.
    audience: 'all'(전체 공지) 또는 특정 user_id 문자열. 읽음 여부는 클라이언트(localStorage)에서 관리."""
    __tablename__ = "message"
    id         = Column(Integer, primary_key=True, autoincrement=True)
    audience   = Column(String(32), default='all', index=True)  # 'all' | '<user_id>'
    title      = Column(String(120), nullable=False)
    body       = Column(Text, nullable=False)
    active     = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=now_kst, index=True)


class MrtProduct(Base):
    """마이리얼트립 큐레이션 상품 카탈로그 — 배치가 주기적으로 갱신, 프론트는 이 캐시만 노출.
    User/SavedResult 스키마와 무관한 별도 테이블."""
    __tablename__ = "mrt_product"
    id           = Column(Integer, primary_key=True, autoincrement=True)
    cat          = Column(String, index=True)   # 내부 카테고리: esim/pass/experience/park/food/general
    gid          = Column(String, index=True)   # MRT 상품 식별자(gid/itemId)
    title        = Column(String)
    sale_price   = Column(Integer, default=0)   # 원화 정수(노출용 최저가)
    image_url    = Column(Text)
    product_url  = Column(Text)                 # MRT 원본 productUrl (마이링크 targetUrl)
    mylink_url   = Column(Text)                 # 발급된 단축 추적링크 (myrealt.rip)
    mylink_id    = Column(String)
    city         = Column(String)
    keywords     = Column(Text)                 # 맥락 매칭용 키워드(CSV)
    active       = Column(Integer, default=1)   # 1=노출
    sort_order   = Column(Integer, default=0)
    updated_at   = Column(DateTime, default=now_kst, onupdate=now_kst)


class MrtRevenue(Base):
    """마이리얼트립 수익/예약 — 매일 동기화 누적. utm_content로 우리 배치(home_banner/result_popup) 매핑."""
    __tablename__ = "mrt_revenue"
    id              = Column(Integer, primary_key=True, autoincrement=True)
    reservation_no  = Column(String, index=True)   # 예약번호(업서트 키)
    link_id         = Column(String, index=True)
    gid             = Column(String)
    product_title   = Column(Text)
    sale_price      = Column(Integer, default=0)
    commission      = Column(Integer, default=0)   # VAT 포함, 환불 시 음수
    commission_rate = Column(String)
    utm_content     = Column(String, index=True)
    placement       = Column(String, index=True)   # utm_content의 '__' 앞부분 (배치)
    status          = Column(String)
    status_kor      = Column(String)
    revenue_date    = Column(String)               # API 제공 날짜(문자열)
    updated_at      = Column(DateTime, default=now_kst, onupdate=now_kst)


class LearningEvent(Base):
    """집단 지성 — 사용자 학습 행동 신호를 서버에 적재(틱재팬 고유 차별 데이터 자산).
    경쟁사 UI엔 없는 표면(피치악센트·뉘앙스·문장분해)에서 '한국 화자가 어디서 막히고
    무엇을 골랐나'를 누적 → 난이도 맵/의도 분포/추천에 환류.
    event_type: 'tts_replay'(발음 다시듣기) | 'pitch_expand'(악센트 그래프) |
                'nuance_choice'(뜻 고르기) | 'breakdown_expand'(문장분해) | 'pattern_expand'(문법패턴)
    key: 집계 단위(단어/문법패턴/입력) — 이 키로 '무엇이 자주 헷갈리나'를 집계
    value_json: 이벤트별 상세(JSON)"""
    __tablename__ = "learning_event"
    id           = Column(Integer, primary_key=True, index=True)
    created_at   = Column(DateTime, default=now_kst, index=True)
    event_type   = Column(String(24), nullable=False, index=True)
    key          = Column(String(200), nullable=True, index=True)
    value_json   = Column(Text, nullable=True)
    user_id      = Column(Integer, nullable=True, index=True)
    anonymous_id = Column(String(36), nullable=True, index=True)
    platform     = Column(String(10), nullable=True)


class PronunciationAttempt(Base):
    """발음 연습 전용 적재 — 시도 1건 = 1행. 베타 채점 정확도 개선의 정답 라벨.
    사용자 피드백(verdict/reason)이 나중에 같은 행에 갱신된다."""
    __tablename__ = "pronunciation_attempt"
    id           = Column(Integer, primary_key=True, index=True)
    created_at   = Column(DateTime, default=now_kst, index=True)
    user_id      = Column(Integer, nullable=True, index=True)
    anonymous_id = Column(String(36), nullable=True, index=True)
    japanese     = Column(String(300), nullable=True, index=True)   # 연습 문장/단어
    reading      = Column(String(300), nullable=True)               # 한글 발음 표기
    target_json  = Column(Text, nullable=True)                      # 정답 0/1 모라 패턴
    mine_json    = Column(Text, nullable=True)                      # 추출된 내 발음 0/1 패턴
    score        = Column(Integer, nullable=True, index=True)
    down_target  = Column(Integer, nullable=True)                   # 정답 다운스텝 위치
    down_mine    = Column(Integer, nullable=True)                   # 내 다운스텝 위치
    flat         = Column(Boolean, nullable=True)                   # 내 발음이 평탄했나
    fb_verdict   = Column(String(8), nullable=True, index=True)     # 'up' | 'down'
    fb_reason    = Column(String(24), nullable=True, index=True)    # 아쉬운 이유 코드
    platform     = Column(String(10), nullable=True)


class CacheEntry(Base):
    """영구 캐시(L2) — 번역/분해/TTS 결과를 DB에 저장해 서버 재시작 후에도 유지.
    인메모리 캐시(L1)가 비어도 여기서 복원 → 같은 요청은 Gemini·TTS 재호출(=비용) 없이 응답.
    k_hash: sha256(ns + key). v_text: JSON(번역·분해). v_blob: mp3 바이트(TTS)."""
    __tablename__ = "cache_entries"
    id         = Column(Integer, primary_key=True, index=True)
    k_hash     = Column(String(64), unique=True, index=True)  # ns+key 해시(길이 무관)
    ns         = Column(String(16), index=True)               # 'analyze' | 'breakdown' | 'tts'
    v_text     = Column(Text, nullable=True)                  # JSON 페이로드
    v_blob     = Column(LargeBinary, nullable=True)           # mp3 바이너리
    created_at = Column(DateTime, default=now_kst)


# SQLite는 check_same_thread 필요, PostgreSQL은 불필요
_connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine       = create_engine(DATABASE_URL, connect_args=_connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base.metadata.create_all(bind=engine)


# ──────────────────────────────────────────────
# 영구 캐시(L2) 헬퍼 — 인메모리(L1) 뒤에서 DB로 결과를 영속화한다.
# 재배포/재시작 후에도 캐시가 살아남아 Gemini·TTS 재호출(=비용)을 줄인다.
# L1 적중 시 DB 접근 없음. L1 미스일 때만 DB 조회/저장.
# ──────────────────────────────────────────────

def _pcache_hash(ns: str, key: str) -> str:
    return hashlib.sha256(f"{ns}\x1f{key}".encode("utf-8")).hexdigest()

def _l1_put(cache: dict, key, value, cap: int = 2000) -> None:
    """인메모리 L1 캐시 저장 — cap 초과 시 가장 오래된 항목(FIFO) 제거."""
    if key not in cache and len(cache) >= cap:
        del cache[next(iter(cache))]
    cache[key] = value

def pcache_get_text(ns: str, key: str):
    """영구 캐시에서 JSON(dict/list) 조회 — 없으면 None."""
    db = SessionLocal()
    try:
        row = db.query(CacheEntry).filter(CacheEntry.k_hash == _pcache_hash(ns, key)).first()
        if row is not None and row.v_text is not None:
            try:
                return json.loads(row.v_text)
            except Exception:
                return None
        return None
    except Exception as e:
        print("[pcache get_text] skip:", e)
        return None
    finally:
        db.close()

def pcache_put_text(ns: str, key: str, value) -> None:
    """영구 캐시에 JSON 저장 (이미 있으면 무시 — 결과는 불변)."""
    db = SessionLocal()
    try:
        h = _pcache_hash(ns, key)
        if db.query(CacheEntry.id).filter(CacheEntry.k_hash == h).first():
            return
        db.add(CacheEntry(k_hash=h, ns=ns, v_text=json.dumps(value, ensure_ascii=False)))
        db.commit()
    except IntegrityError:
        db.rollback()  # 동시 삽입 경쟁 — 이미 저장됨
    except Exception as e:
        db.rollback()
        print("[pcache put_text] skip:", e)
    finally:
        db.close()

def pcache_get_blob(ns: str, key: str):
    """영구 캐시에서 바이너리(mp3) 조회 — 없으면 None."""
    db = SessionLocal()
    try:
        row = db.query(CacheEntry).filter(CacheEntry.k_hash == _pcache_hash(ns, key)).first()
        return bytes(row.v_blob) if (row is not None and row.v_blob is not None) else None
    except Exception as e:
        print("[pcache get_blob] skip:", e)
        return None
    finally:
        db.close()

def pcache_put_blob(ns: str, key: str, value: bytes) -> None:
    """영구 캐시에 바이너리(mp3) 저장 (이미 있으면 무시)."""
    db = SessionLocal()
    try:
        h = _pcache_hash(ns, key)
        if db.query(CacheEntry.id).filter(CacheEntry.k_hash == h).first():
            return
        db.add(CacheEntry(k_hash=h, ns=ns, v_blob=value))
        db.commit()
    except IntegrityError:
        db.rollback()
    except Exception as e:
        db.rollback()
        print("[pcache put_blob] skip:", e)
    finally:
        db.close()


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
    # 구독·결제대기·안드로이드대기 점검용 뷰 — user_id에 이름/전화 조인(테스트 계정 구분용)
    try:
        with engine.begin() as conn:
            conn.execute(sa_text("DROP VIEW IF EXISTS subscription_glance"))
            conn.execute(sa_text(
                "CREATE VIEW subscription_glance AS "
                "SELECT s.started_at, u.name, u.phone, s.plan, s.period, s.status, "
                "s.expires_at, s.last_paid_at, s.customer_key, s.user_id, s.id "
                "FROM subscription s LEFT JOIN users u ON u.id = s.user_id "
                "ORDER BY s.started_at DESC"
            ))
            conn.execute(sa_text("DROP VIEW IF EXISTS payment_waitlist_glance"))
            conn.execute(sa_text(
                "CREATE VIEW payment_waitlist_glance AS "
                "SELECT w.created_at, u.name, u.phone, w.notified, w.user_id, w.id "
                "FROM payment_waitlist w LEFT JOIN users u ON u.id = w.user_id "
                "ORDER BY w.created_at DESC"
            ))
            conn.execute(sa_text("DROP VIEW IF EXISTS android_waitlist_glance"))
            conn.execute(sa_text(
                "CREATE VIEW android_waitlist_glance AS "
                "SELECT w.created_at, u.name, u.phone, w.notified, w.user_id, w.id "
                "FROM android_waitlist w LEFT JOIN users u ON u.id = w.user_id "
                "ORDER BY w.created_at DESC"
            ))
    except Exception as e:
        print("[migration] member views skipped:", e)

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
    edit_session_id: str | None = None  # 정착 세션 — 같은 편집의 중간 호출은 한도 1회로 묶음

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
    is_admin: bool = False         # 관리자 계정 여부 (수익 대시보드 노출용)

# 빠른 번역(3.1) 사용량 제한 없이 쓸 수 있는 휴대폰 번호 화이트리스트.
# (후기 작성 인증 회원 등 — 숫자만, 하이픈/공백 무시)
FAST_UNLIMITED_PHONES = {
    "01049108715",
    "01084099491",
    "01040700658",
    "01062276799",
    "01041300927",
    "01022642623",
    "07012437491",
    "01039999757",
    "01056953510",
    "01055022469",
    "01055169813",
    "01082205908",
    "01089612881",
    "01056623909",
    "01099088164",
    "01020471947",
    "01091665469",
    "01084105336",
    "01049976967",
    "01089160096",
    "01089223212",
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
    "01096745488",
    "01040738283",
    "01030608475",
    "01034500517",
    "01076287738",
    "01096064263",
}

def _norm_phone(phone: str) -> str:
    """휴대폰 번호에서 숫자만 추출 (하이픈/공백 표기 차이 무시)."""
    return "".join(c for c in (phone or "") if c.isdigit())

# 기존 '빠른 번역 무제한 이벤트' 회원(화이트리스트) → '플러스'로 전환됨.
# 이 명단의 플러스 혜택은 2026-08-01(KST) 자정까지 유효 → 이후 자동으로 무료 전환.
# (신규 리뷰 이벤트 회원은 /admin/grant-sub 로 적용 시점부터 1개월짜리 구독을 따로 받음 → 이 만료와 무관)
WHITELIST_PLUS_EXPIRES = datetime.datetime(2026, 8, 1)   # now_kst()와 같은 KST naive 기준

def is_fast_unlimited(phone: str) -> bool:
    if _norm_phone(phone) not in FAST_UNLIMITED_PHONES:
        return False
    return now_kst() < WHITELIST_PLUS_EXPIRES

# 관리자 계정(휴대폰 번호) — 수익 대시보드 등 관리 기능 접근 권한
ADMIN_PHONES = {"01033530215"}

def is_admin_phone(phone: str) -> bool:
    return _norm_phone(phone) in {_norm_phone(p) for p in ADMIN_PHONES}

# 빠른 번역 한도 — 5시간 롤링 윈도우(클로드 방식)
FAST_WINDOW_LIMIT = 15            # 윈도우당 횟수
FAST_WINDOW_SEC   = 5 * 3600      # 윈도우 길이(초)

# ── 토스페이먼츠 자동결제(웹 구독) ──────────────────────────
TOSS_SECRET_KEY = os.getenv("TOSS_SECRET_KEY", "")   # 라이브/테스트 시크릿키 (Railway 환경변수)
TOSS_API = "https://api.tosspayments.com/v1"
# 플랜·주기별 금액(원)·기간(일)
SUB_PRICES = {
    ("plus", "monthly"): (8900,  30),
    ("plus", "yearly"):  (89000, 365),
    ("pro",  "monthly"): (19900, 30),
    ("pro",  "yearly"):  (199000, 365),
}

def get_active_subscription(db, user_id: int):
    """현재 유효한 구독 1건 반환(만료 안 됨). 없으면 None."""
    if not user_id:
        return None
    s = (db.query(Subscription)
           .filter(Subscription.user_id == user_id, Subscription.status == 'active')
           .order_by(Subscription.expires_at.desc())
           .first())
    if s and (not s.expires_at or s.expires_at > now_kst()):
        return s
    return None

def _is_unlimited_user(db, user_id: int) -> bool:
    u = db.query(User).filter(User.id == user_id).first()
    # 화이트리스트 무제한 OR 관리자(모든 제약 해제) OR 유효 구독자(플러스·프로)
    if u and (is_fast_unlimited(u.phone) or is_admin_phone(u.phone)):
        return True
    return bool(get_active_subscription(db, user_id))


def _is_admin_user(user_id) -> bool:
    """user_id가 관리자 계정인지 (빠른번역 웹 허용 등 제약 해제용)."""
    if not user_id:
        return False
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.id == user_id).first()
        return bool(u and is_admin_phone(u.phone))
    finally:
        db.close()

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


# 번역 톤(스타일)별 추가 지시문. 'natural'이 기본.
TONE_INSTRUCTIONS = {
    "natural": (
        "\n\nTONE: Produce the most NATURAL, idiomatic SPOKEN Japanese a native speaker would "
        "actually say in everyday conversation (会話体). Avoid stiff word-for-word renderings. "
        "CRITICAL — mirror the Korean speech level EXACTLY, do NOT default to polite: "
        "반말/해체 input → casual plain Japanese (タメ口・常体, e.g. 〜だよ/〜じゃない/行く), "
        "존댓말/해요체·합니다체 input → polite Japanese (です・ます). "
        "Casual input must stay casual — never upgrade 반말 to です・ます."
    ),
    "business": (
        "\n\nTONE: Translate in polite Japanese BUSINESS style (ビジネス敬語). Use 丁寧語 "
        "(です・ます) and natural 尊敬語/謙譲語 where appropriate (e.g. 〜ております, いたします, "
        "ご〜). Keep it natural for a work email or formal setting."
    ),
    "literal": (
        "\n\nTONE: Translate as LITERALLY (직역) as possible — preserve the Korean sentence "
        "structure and each element one-to-one so a learner can see the direct correspondence, "
        "even if the result is slightly unnatural. Still keep it grammatically valid Japanese."
    ),
}


def translate_korean_to_japanese(korean_text: str, model: str = None, tone: str = "natural") -> dict:
    """한국어 문장을 Gemini API로 번역해 번역문·발음·악센트를 반환한다 (문장 분해 제외)."""
    tone_instr = TONE_INSTRUCTIONS.get(tone, "")
    result = _call_gemini_json(f"{TRANSLATION_PROMPT}{tone_instr}\n\nKorean input: {korean_text}", model=model)

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


# ──────────────────────────────────────────────
# 레이트리밋 (남용·봇 차단) — 인메모리. 키: 회원=user_id / 비회원=IP
#   · 분당/시간당 호출 상한(정상 사용자엔 무영향, 자동화 트래픽만 차단)
#   · 비회원은 일일 번역 상한(초과 시 로그인/앱 유도) — /analyze 에서만 카운트
# ──────────────────────────────────────────────
from collections import deque as _deque

RATE_PER_MIN  = 40     # 분당 LLM 호출 상한(번역+분해+톤+TTS 합산)
RATE_PER_HOUR = 600    # 시간당 상한
GUEST_PER_DAY = 300    # 비회원 IP당 일일 번역(analyze) 상한

_rate_buckets: dict[str, "_deque"] = {}   # key → 최근 1시간 타임스탬프
_guest_daily: dict[str, list] = {}        # ip → [date_kst, count]
_fast_session_seen: dict[str, tuple] = {} # "user:edit_session" → (ts, usage결과) 정착 묶음


def _client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for") if request else None
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if (request and request.client) else "unknown"


def rate_guard(request: Request, user_id: int | None = None, count_daily: bool = False):
    """분당/시간당 호출 상한 + (비회원·count_daily) 일일 상한. 초과 시 429."""
    now = time.time()
    is_guest = not user_id
    key = f"u:{user_id}" if user_id else f"ip:{_client_ip(request)}"

    dq = _rate_buckets.setdefault(key, _deque())
    while dq and now - dq[0] > 3600:
        dq.popleft()
    if len(dq) >= RATE_PER_HOUR:
        raise HTTPException(status_code=429, detail="요청이 너무 많아요. 잠시 후 다시 시도해 주세요.")
    if sum(1 for t in dq if now - t <= 60) >= RATE_PER_MIN:
        raise HTTPException(status_code=429, detail="잠깐만요, 너무 빠르게 요청했어요. 잠시 후 다시 시도해 주세요.")

    # 비회원 일일 번역 상한 (KST 기준 자정 리셋)
    if is_guest and count_daily:
        today = time.strftime("%Y-%m-%d", time.gmtime(now + 9 * 3600))
        d = _guest_daily.get(key)
        if not d or d[0] != today:
            d = [today, 0]
            _guest_daily[key] = d
        if d[1] >= GUEST_PER_DAY:
            raise HTTPException(status_code=429,
                detail="오늘 무료 번역을 많이 사용했어요. 로그인하거나 앱에서 이어서 이용해 주세요.")
        d[1] += 1

    dq.append(now)
    # 메모리 방어 — 키가 과도하게 쌓이면 비움(드문 재시작 수준 영향)
    if len(_rate_buckets) > 50000:
        _rate_buckets.clear()
    if len(_guest_daily) > 50000:
        _guest_daily.clear()


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest, request: Request):
    rate_guard(request, req.user_id, count_daily=True)
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
    # ⚠️ 비용 방어: 빠른 번역(비싼 모델)은 보상형 광고가 가능한 '앱'에서만 허용.
    #    웹 등 그 외 요청은 무조건 basic으로 강제(빠른 모델 호출·한도차감 자체 차단).
    want_fast = (req.model == "fast") and (req.platform == "app")
    # 관리자는 모든 제약 해제 — 웹에서도 빠른 번역 허용
    if (req.model == "fast") and not want_fast and _is_admin_user(req.user_id):
        want_fast = True
    usage_fields = {"model_used": "basic", "fast_limited": False,
                    "fast_used_pct": None, "fast_unlimited": False, "fast_reset_sec": None}
    if want_fast and req.user_id:
        # 정착 세션 — 같은 편집(edit_session_id)의 중간 호출은 한도 1회로 묶음(20초 TTL).
        # 디바운스 자동번역이 한 문장에서 여러 번 호출돼도 한도는 한 번만 차감.
        skey = f"{req.user_id}:{req.edit_session_id}" if req.edit_session_id else None
        cached = _fast_session_seen.get(skey) if skey else None
        if cached and time.time() - cached[0] < 20:
            u = cached[1]                    # 같은 세션 → 재차감 없이 이전 판정 재사용
        else:
            u = consume_fast_usage(req.user_id)
            if skey:
                _fast_session_seen[skey] = (time.time(), u)
                if len(_fast_session_seen) > 50000:
                    _fast_session_seen.clear()
        usage_fields["fast_unlimited"] = u.get("unlimited", False)
        usage_fields["fast_used_pct"] = u.get("pct")
        usage_fields["fast_reset_sec"] = u.get("reset_in_sec")
        if u["allowed"]:
            usage_fields["model_used"] = "fast"
        else:
            usage_fields["fast_limited"] = True   # 한도 초과 → 기본 번역으로 폴백
    model_key = usage_fields["model_used"]   # 'fast' or 'basic'

    def _with_usage(resp: AnalyzeResponse) -> AnalyzeResponse:
        for k, v in usage_fields.items():
            setattr(resp, k, v)
        return resp

    cache_key = f"{model_key}:{text}"

    # ── 캐시 조회: L1(메모리) → L2(영구 DB) ───────
    if cache_key in _analyze_cache:
        print(f"[Analyze L1 HIT] {cache_key[:46]!r}")
        cached = _analyze_cache[cache_key]
        log_translation(text, cached.get("japanese"), req.user_id, req.anonymous_id, req.platform)
        return _with_usage(AnalyzeResponse(**cached))

    persisted = pcache_get_text("analyze", cache_key)
    if persisted is not None:
        print(f"[Analyze L2 HIT] {cache_key[:46]!r}")
        _l1_put(_analyze_cache, cache_key, persisted)
        log_translation(text, persisted.get("japanese"), req.user_id, req.anonymous_id, req.platform)
        return _with_usage(AnalyzeResponse(**persisted))
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

    # 결과를 L1(메모리) + L2(영구 DB)에 저장
    payload = result.model_dump()
    _l1_put(_analyze_cache, cache_key, payload)
    pcache_put_text("analyze", cache_key, payload)
    print(f"[Analyze 캐시 저장] {cache_key[:46]!r}")

    # 번역 시도 자동 기록 (웹·앱 공통, source='auto')
    log_translation(text, result.japanese, req.user_id, req.anonymous_id, req.platform)

    return _with_usage(result)


class ToneRequest(BaseModel):
    text: str
    tone: str = "business"   # 'natural' | 'business' | 'literal'


# 톤 번역 캐시 — 키: "tone:text"
_tone_cache: dict[str, dict] = {}


@app.post("/translate-tone")
def translate_tone(req: ToneRequest, request: Request):
    """칩(자연스럽게/비즈니스/직역) 탭 시 해당 톤으로 재번역 — 번역문·발음·악센트만 반환.
    빠른 번역 한도와 무관하며 basic 모델 사용(저렴). 결과 카드 본문만 교체하는 용도."""
    rate_guard(request)
    text = req.text.strip()
    tone = req.tone if req.tone in TONE_INSTRUCTIONS else "natural"
    if not text:
        raise HTTPException(status_code=400, detail="입력 텍스트가 비어 있습니다.")

    cache_key = f"{tone}:{text}"
    if cache_key in _tone_cache:
        return _tone_cache[cache_key]

    translation = translate_korean_to_japanese(text, model=resolve_model("basic"), tone=tone)
    raw_accent = translation.get("accent_data", [])
    try:
        accent_data = [AccentEntry(**e).model_dump() for e in raw_accent]
    except Exception:
        accent_data = []

    payload = {
        "japanese": translation["japanese"],
        "furigana": translation["furigana"],
        "korean_pronunciation": translation["korean_pronunciation"],
        "furigana_html": translation["furigana_html"],
        "accent_data": accent_data,
        "tone": tone,
    }
    if len(_tone_cache) >= 2000:
        del _tone_cache[next(iter(_tone_cache))]
    _tone_cache[cache_key] = payload
    return payload


# ── 맥락 기반 '다른 뜻/뉘앙스' 제안 ──────────────────────────
# 한국어 입력이 '의미상 중의적'일 때만 (정중도/직역 차이가 아니라 뜻 자체가 갈릴 때)
# 다른 해석과 그 일본어 번역을 1~2개 제안한다. 아니면 빈 배열.
NUANCE_PROMPT = """You are a Korean→Japanese translation assistant.
The user typed a Korean sentence. Decide whether it is SEMANTICALLY AMBIGUOUS —
i.e. it could mean genuinely DIFFERENT things (different meaning/intent), so that a
Japanese translation would change depending on the intended meaning.

IMPORTANT:
- This is about MEANING ambiguity, NOT politeness or literal-vs-natural style.
- Most everyday sentences are NOT ambiguous → return an empty list. Be conservative.
- Only flag when there are real, distinct readings a learner could confuse.
  e.g. "위치해 있습니다" → could mean "물리적으로 ~에 있다" vs "(어떤 상태/입장에) 놓여 있다".

Respond with ONLY valid JSON, no extra text:
{"alternatives": [
  {"label": "<그 해석을 가리키는 짧은 한국어 설명, 12자 이내>",
   "japanese": "<그 의미일 때의 자연스러운 일본어 번역, 한자 사용>",
   "reading": "<일본어 전체를 히라가나만으로 연결>"}
]}
Return at most 2 alternatives. If not ambiguous, return {"alternatives": []}.
"""

_nuance_cache: dict[str, list] = {}


class NuanceRequest(BaseModel):
    text: str


@app.post("/nuances")
def nuances(req: NuanceRequest, request: Request):
    """입력이 중의적일 때만 다른 해석+일본어를 제안 (결과 카드 '이런 뜻일 수도' 카드용).
    basic 모델·서버 캐시 사용. 중의적이지 않으면 빈 배열."""
    rate_guard(request)
    text = (req.text or "").strip()
    if not text or len(text) > 200:
        return {"alternatives": []}
    if text in _nuance_cache:
        return {"alternatives": _nuance_cache[text]}

    try:
        result = _call_gemini_json(f"{NUANCE_PROMPT}\n\nKorean input: {text}",
                                   model=resolve_model("basic"))
    except HTTPException:
        return {"alternatives": []}   # 제안 기능은 실패해도 조용히 숨김
    raw = result.get("alternatives", [])
    alts = []
    if isinstance(raw, list):
        for a in raw[:2]:
            if isinstance(a, dict) and a.get("label") and a.get("japanese"):
                alts.append({"label": str(a["label"])[:20],
                             "japanese": str(a["japanese"]),
                             "reading": str(a.get("reading", ""))})

    if len(_nuance_cache) >= 2000:
        del _nuance_cache[next(iter(_nuance_cache))]
    _nuance_cache[text] = alts
    return {"alternatives": alts}


@app.get("/fast-usage/{user_id}")
def fast_usage(user_id: int):
    """회원의 오늘 빠른 번역 사용량 (%, 무제한 여부) — 로그인/진입 시 표시용."""
    return get_fast_usage(user_id)


# ── 웹 구독 결제 (토스페이먼츠 자동결제) ──────────────────────
class BillingConfirmRequest(BaseModel):
    authKey: str
    customerKey: str
    user_id: int
    plan: str      # plus | pro
    period: str    # monthly | yearly


@app.post("/billing/confirm")
def billing_confirm(req: BillingConfirmRequest):
    """결제창에서 받은 authKey로 빌링키 발급 → 즉시 1회 결제 → 구독 저장.
    토스 시크릿키는 환경변수(TOSS_SECRET_KEY)에서 읽음 — 미설정 시 503."""
    if not TOSS_SECRET_KEY:
        raise HTTPException(status_code=503, detail="결제가 아직 준비 중이에요. 잠시 후 다시 시도해 주세요.")
    price = SUB_PRICES.get((req.plan, req.period))
    if not price:
        raise HTTPException(status_code=400, detail="잘못된 플랜입니다.")
    amount, days = price
    auth = base64.b64encode(f"{TOSS_SECRET_KEY}:".encode()).decode()
    headers = {"Authorization": f"Basic {auth}", "Content-Type": "application/json"}

    # 1) 빌링키 발급
    r = requests.post(f"{TOSS_API}/billing/authorizations/issue",
                      json={"authKey": req.authKey, "customerKey": req.customerKey},
                      headers=headers, timeout=15)
    if not r.ok:
        print("[billing] issue 실패", r.status_code, r.text[:200])
        raise HTTPException(status_code=502, detail="카드 등록(빌링키 발급)에 실패했어요.")
    billing_key = r.json().get("billingKey")

    # 2) 즉시 1회 결제(첫 결제)
    order_id = f"tj_{req.user_id}_{req.plan}_{int(time.time())}"
    plan_kr = "프로" if req.plan == "pro" else "플러스"
    period_kr = "연간" if req.period == "yearly" else "월간"
    r2 = requests.post(f"{TOSS_API}/billing/{billing_key}",
                       json={"customerKey": req.customerKey, "amount": amount,
                             "orderId": order_id, "orderName": f"틱재팬 {plan_kr} ({period_kr})"},
                       headers=headers, timeout=15)
    if not r2.ok:
        print("[billing] charge 실패", r2.status_code, r2.text[:200])
        raise HTTPException(status_code=502, detail="결제 승인에 실패했어요. 카드를 확인해 주세요.")

    # 3) 구독 저장(기존 active는 만료 처리)
    db = SessionLocal()
    try:
        db.query(Subscription).filter(Subscription.user_id == req.user_id,
                                       Subscription.status == 'active').update({"status": "expired"})
        sub = Subscription(user_id=req.user_id, plan=req.plan, period=req.period, status='active',
                           billing_key=billing_key, customer_key=req.customerKey,
                           started_at=now_kst(), expires_at=now_kst() + datetime.timedelta(days=days),
                           last_paid_at=now_kst())
        db.add(sub)
        db.commit()
        return {"ok": True, "plan": req.plan, "period": req.period,
                "expires_at": sub.expires_at.isoformat()}
    finally:
        db.close()


@app.get("/subscription/{user_id}")
def subscription_status(user_id: int):
    """구독 상태 — 앱/웹이 이걸로 광고제거·한도 적용. 관리자·무제한 회원도 ad_free."""
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.id == user_id).first()
        privileged = bool(u and (is_fast_unlimited(u.phone) or is_admin_phone(u.phone)))
        s = get_active_subscription(db, user_id)
        if s:
            return {"active": True, "plan": s.plan, "period": s.period,
                    "expires_at": s.expires_at.isoformat() if s.expires_at else None,
                    "ad_free": True, "fast_unlimited": True}
        if privileged:
            # 무제한 화이트리스트(리뷰 이벤트 등)·관리자 → '플러스'로 표기(광고 제거 + 빠른 번역 무제한)
            return {"active": True, "plan": "plus", "period": None, "expires_at": None,
                    "ad_free": True, "fast_unlimited": True}
        return {"active": False, "ad_free": False, "fast_unlimited": False}
    finally:
        db.close()


class GrantSubRequest(BaseModel):
    admin_phone: str
    user_id: int | None = None    # user_id 또는 phone 중 하나로 지정
    phone: str | None = None      # 리뷰 이벤트: 번호로 바로 지급(가입자 자동 조회)
    plan: str = "plus"            # plus | pro
    period: str = "monthly"        # monthly | yearly  (리뷰 보상 = plus/monthly = 플러스 1개월)

@app.post("/admin/grant-sub")
def admin_grant_sub(req: GrantSubRequest):
    """관리자 전용 — 특정 회원에게 무상으로 플러스/프로 구독을 지급(또는 테스트).
    토스 결제 없이 Subscription 행을 직접 생성한다. billing_key 없음(자동갱신 X).
    리뷰 이벤트: phone + plan=plus + period=monthly 로 '플러스 1개월' 지급."""
    if not is_admin_phone(req.admin_phone):
        raise HTTPException(status_code=403, detail="관리자만 사용할 수 있어요.")
    if req.plan not in ("plus", "pro"):
        raise HTTPException(status_code=400, detail="plan은 plus 또는 pro여야 해요.")
    price = SUB_PRICES.get((req.plan, req.period))
    if not price:
        raise HTTPException(status_code=400, detail="잘못된 플랜/주기입니다.")
    days = price[1]
    db = SessionLocal()
    try:
        # user_id 우선, 없으면 phone(숫자만 정규화)으로 가입자 조회
        if req.user_id:
            u = db.query(User).filter(User.id == req.user_id).first()
        elif req.phone:
            target = _norm_phone(req.phone)
            u = next((x for x in db.query(User).all() if _norm_phone(x.phone) == target), None)
        else:
            raise HTTPException(status_code=400, detail="user_id 또는 phone이 필요해요.")
        if not u:
            raise HTTPException(status_code=404, detail="해당 회원을 찾을 수 없어요(아직 미가입일 수 있어요).")
        db.query(Subscription).filter(Subscription.user_id == u.id,
                                      Subscription.status == 'active').update({"status": "expired"})
        sub = Subscription(user_id=u.id, plan=req.plan, period=req.period, status='active',
                           billing_key=None, customer_key=f"comp_{u.id}",
                           started_at=now_kst(), expires_at=now_kst() + datetime.timedelta(days=days),
                           last_paid_at=now_kst())
        db.add(sub)
        db.commit()
        return {"ok": True, "user_id": u.id, "name": u.name, "plan": req.plan, "period": req.period,
                "expires_at": sub.expires_at.isoformat()}
    finally:
        db.close()


@app.get("/messages/{user_id}")
def get_messages(user_id: int):
    """회원의 메시지함 — 전체 공지('all') + 본인 대상 메시지를 최신순으로."""
    db = SessionLocal()
    try:
        rows = (db.query(Message)
                  .filter(Message.active == True,
                          Message.audience.in_(["all", str(user_id)]))
                  .order_by(Message.created_at.desc())
                  .all())
        return [{"id": m.id, "title": m.title, "body": m.body,
                 "created_at": m.created_at.isoformat() if m.created_at else None}
                for m in rows]
    finally:
        db.close()


class SendMessageRequest(BaseModel):
    admin_phone: str
    title: str
    body: str
    audience: str = "all"   # 'all' 또는 특정 user_id

@app.post("/admin/send-message")
def admin_send_message(req: SendMessageRequest):
    """관리자 전용 — 메시지함에 메시지 발송(전체 공지 또는 특정 회원)."""
    if not is_admin_phone(req.admin_phone):
        raise HTTPException(status_code=403, detail="관리자만 사용할 수 있어요.")
    if not req.title.strip() or not req.body.strip():
        raise HTTPException(status_code=400, detail="제목과 내용을 입력해 주세요.")
    db = SessionLocal()
    try:
        m = Message(audience=req.audience.strip() or "all",
                    title=req.title.strip(), body=req.body.strip(), active=True)
        db.add(m)
        db.commit()
        db.refresh(m)
        return {"ok": True, "id": m.id, "audience": m.audience}
    finally:
        db.close()


class DeleteMessageRequest(BaseModel):
    admin_phone: str
    message_id: int

@app.post("/admin/delete-message")
def admin_delete_message(req: DeleteMessageRequest):
    """관리자 전용 — 메시지 비활성화(회수). 전체 회원 메시지함에서 사라짐."""
    if not is_admin_phone(req.admin_phone):
        raise HTTPException(status_code=403, detail="관리자만 사용할 수 있어요.")
    db = SessionLocal()
    try:
        m = db.query(Message).filter(Message.id == req.message_id).first()
        if not m:
            raise HTTPException(status_code=404, detail="메시지를 찾을 수 없습니다.")
        m.active = False
        db.commit()
        return {"ok": True, "message_id": req.message_id}
    finally:
        db.close()


class DeleteUserRequest(BaseModel):
    admin_phone: str
    user_id: int

@app.post("/admin/delete-user")
def admin_delete_user(req: DeleteUserRequest):
    """관리자 전용 — 특정 계정과 연관 데이터(구독·저장)를 삭제. 테스트 계정 정리용."""
    if not is_admin_phone(req.admin_phone):
        raise HTTPException(status_code=403, detail="관리자만 사용할 수 있어요.")
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.id == req.user_id).first()
        if not u:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        name = u.name
        db.query(Subscription).filter(Subscription.user_id == req.user_id).delete()
        db.query(SavedResult).filter(SavedResult.user_id == req.user_id).delete()
        db.delete(u)
        db.commit()
        return {"ok": True, "deleted_user_id": req.user_id, "name": name}
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


# ── 집단 지성: 학습 행동 신호 적재 ──────────────────────────
ALLOWED_LEARNING_EVENTS = {"tts_replay", "pitch_expand", "nuance_choice", "breakdown_expand", "pattern_expand", "pitch_attempt", "pitch_feedback"}

class LearningEventRequest(BaseModel):
    event_type: str
    key: str | None = None
    value: dict | None = None
    user_id: int | None = None
    anonymous_id: str | None = None
    platform: str | None = None

@app.post("/learning-event")
def learning_event(req: LearningEventRequest):
    """학습 행동 신호(발음 다시듣기·뜻 고르기·문법 펼침 등)를 서버에 적재(fire-and-forget).
    실패해도 사용자 경험에 영향 없음. 스팸 방지를 위해 허용된 이벤트만 저장."""
    et = (req.event_type or "").strip()
    if et not in ALLOWED_LEARNING_EVENTS:
        return {"ok": False}
    db = SessionLocal()
    try:
        row = LearningEvent(
            event_type=et,
            key=((req.key or "").strip()[:200] or None),
            value_json=(json.dumps(req.value, ensure_ascii=False)[:2000] if req.value else None),
            user_id=req.user_id,
            anonymous_id=(req.anonymous_id if not req.user_id else None),
            platform=req.platform,
        )
        db.add(row)
        db.commit()
        return {"ok": True}
    except Exception as e:
        print("[learning-event] 실패", str(e)[:120])
        return {"ok": False}
    finally:
        db.close()

@app.get("/admin/learning-summary")
def learning_summary(key: str = "", event_type: str = "", limit: int = 30):
    """관리자 — '한국인이 무엇을 자주 헷갈리나'를 집계해 보여준다(집단 지성 가시화).
    ?key=관리토큰 필요. event_type으로 필터, key별 빈도 상위 N."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다. ?key=... 를 붙여주세요.")
    from sqlalchemy import func
    db = SessionLocal()
    try:
        total = db.query(func.count(LearningEvent.id)).scalar() or 0
        by_type = dict(db.query(LearningEvent.event_type, func.count(LearningEvent.id))
                         .group_by(LearningEvent.event_type).all())
        q = (db.query(LearningEvent.event_type, LearningEvent.key, func.count(LearningEvent.id).label("n"))
               .filter(LearningEvent.key.isnot(None)))
        if event_type:
            q = q.filter(LearningEvent.event_type == event_type)
        rows = (q.group_by(LearningEvent.event_type, LearningEvent.key)
                  .order_by(func.count(LearningEvent.id).desc()).limit(min(limit, 100)).all())
        return {
            "total_events": total,
            "by_type": {k: v for k, v in by_type.items()},
            "top": [{"event_type": r[0], "key": r[1], "count": r[2]} for r in rows],
        }
    finally:
        db.close()

@app.post("/admin/learning-purge")
def learning_purge(key: str = "", anonymous_ids: str = ""):
    """관리자 — 테스트/오염 데이터 정리. anonymous_ids(콤마 구분)에 해당하는 행만 삭제(실데이터 보존)."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    ids = [s.strip() for s in (anonymous_ids or "").split(",") if s.strip()]
    if not ids:
        raise HTTPException(status_code=400, detail="anonymous_ids(콤마 구분)가 필요합니다.")
    db = SessionLocal()
    try:
        n = db.query(LearningEvent).filter(LearningEvent.anonymous_id.in_(ids)).delete(synchronize_session=False)
        db.commit()
        return {"ok": True, "deleted": n}
    finally:
        db.close()


# ── 발음 연습 전용 적재/피드백/통계 ──────────────────────────
class PronAttemptReq(BaseModel):
    user_id: int | None = None
    anonymous_id: str | None = None
    japanese: str | None = None
    reading: str | None = None
    target: list | None = None
    mine: list | None = None
    score: int | None = None
    down_target: int | None = None
    down_mine: int | None = None
    flat: bool | None = None
    platform: str | None = None

@app.post("/pronunciation/attempt")
def pronunciation_attempt(req: PronAttemptReq):
    """발음 연습 시도 1건 적재 → 행 id 반환(이후 피드백이 이 id로 갱신). 실패해도 영향 없음."""
    db = SessionLocal()
    try:
        row = PronunciationAttempt(
            user_id=req.user_id, anonymous_id=(req.anonymous_id if not req.user_id else None),
            japanese=(req.japanese or "")[:300] or None, reading=(req.reading or "")[:300] or None,
            target_json=json.dumps(req.target, ensure_ascii=False)[:500] if req.target is not None else None,
            mine_json=json.dumps(req.mine, ensure_ascii=False)[:500] if req.mine is not None else None,
            score=req.score, down_target=req.down_target, down_mine=req.down_mine,
            flat=req.flat, platform=req.platform,
        )
        db.add(row); db.commit()
        return {"ok": True, "id": row.id}
    except Exception as e:
        print("[pron-attempt] 실패", str(e)[:120]); return {"ok": False}
    finally:
        db.close()

class PronFeedbackReq(BaseModel):
    id: int
    verdict: str          # 'up' | 'down'
    reason: str | None = None

@app.post("/pronunciation/feedback")
def pronunciation_feedback(req: PronFeedbackReq):
    """발음 채점에 대한 사용자 피드백을 해당 시도 행에 갱신(베타 정확도 개선 라벨)."""
    if req.verdict not in ("up", "down"):
        return {"ok": False}
    db = SessionLocal()
    try:
        row = db.query(PronunciationAttempt).filter(PronunciationAttempt.id == req.id).first()
        if not row:
            return {"ok": False}
        row.fb_verdict = req.verdict
        row.fb_reason = (req.reason or None) and req.reason[:24]
        db.commit()
        return {"ok": True}
    except Exception as e:
        print("[pron-feedback] 실패", str(e)[:120]); return {"ok": False}
    finally:
        db.close()

@app.get("/admin/pronunciation-stats")
def pronunciation_stats(key: str = "", limit: int = 20):
    """관리자 — 발음 연습 통계(시도수·평균점수·피드백 분포·아쉬운 이유·어려운 단어)."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    from sqlalchemy import func
    db = SessionLocal()
    try:
        P = PronunciationAttempt
        total = db.query(func.count(P.id)).scalar() or 0
        avg_score = db.query(func.avg(P.score)).scalar()
        fb = dict(db.query(P.fb_verdict, func.count(P.id)).filter(P.fb_verdict.isnot(None)).group_by(P.fb_verdict).all())
        reasons = dict(db.query(P.fb_reason, func.count(P.id)).filter(P.fb_reason.isnot(None)).group_by(P.fb_reason).all())
        # 아쉬운(down) 피드백이 많은 단어/문장 상위
        hard = (db.query(P.japanese, func.count(P.id).label("n"))
                  .filter(P.fb_verdict == 'down', P.japanese.isnot(None))
                  .group_by(P.japanese).order_by(func.count(P.id).desc()).limit(min(limit, 50)).all())
        return {
            "total_attempts": total,
            "avg_score": round(float(avg_score), 1) if avg_score is not None else None,
            "feedback": {k: v for k, v in fb.items()},
            "down_reasons": {k: v for k, v in reasons.items()},
            "hardest": [{"japanese": j, "down_count": n} for j, n in hard],
        }
    finally:
        db.close()


# ──────────────────────────────────────────────
# 마이리얼트립(MyRealTrip) 마케팅파트너 API — 여행 상품 제휴 (Phase 1)
# - API 키는 서버 사이드 전용(MRT_API_KEY, Railway 환경변수). 프론트엔드 노출 금지.
# - 큐레이션+캐싱 방식: 배치가 검색→마이링크→DB 저장, 프론트는 /travel/products 캐시만 노출.
# ──────────────────────────────────────────────
MRT_BASE = "https://partner-ext-api.myrealtrip.com"

# 큐레이션 타깃 — 내부 카테고리별로 어떤 상품을 모을지 정의 (필요 시 자유롭게 수정)
# cat_hint: tna/categories 응답에서 적합한 category value를 고르기 위한 라벨 힌트
MRT_TARGETS = [
    {"cat": "experience", "city": "도쿄",   "keyword": "일본 기모노 체험",            "cat_hint": ["ticket", "투어", "티켓", "액티비티"], "keywords": "기모노,유카타,전통,사진,체험"},
    {"cat": "experience", "city": "도쿄",   "keyword": "도쿄 스시 만들기 체험",        "cat_hint": ["ticket", "투어", "티켓", "액티비티"], "keywords": "스시,초밥,요리,쿠킹,만들기,체험"},
    {"cat": "park",       "city": "오사카", "keyword": "오사카 유니버설 스튜디오 재팬", "cat_hint": ["ticket", "티켓", "입장권"],         "keywords": "유니버설,유니버셜,usj,놀이공원,입장권,테마파크"},
    {"cat": "pass",       "city": "오사카", "keyword": "일본 JR 패스",               "cat_hint": ["ticket", "교통", "패스", "티켓"],     "keywords": "jr,신칸센,패스,전철,지하철,기차,교통,역까지"},
    {"cat": "general",    "city": "오사카", "keyword": "오사카 교토 투어",            "cat_hint": ["tour", "투어"],                      "keywords": "오사카,도쿄,교토,후지,여행,관광,투어,일정"},
]

# 비(非)일본 상품 혼입 방지 — 제목에 아래 지명이 있으면 제외 (검색이 글로벌 결과를 섞어줄 때 가드)
MRT_EXCLUDE_TITLE = ["베이징", "싱가포르", "리스보아", "리스본", "타이베이", "방콕", "홍콩", "마카오", "상하이", "베트남", "다낭", "세부", "발리", "괌", "하와이"]

# 이미지 없는 상품용 디자인 썸네일 — 자체 생성 SVG(데이터 URI). 외부 의존·저작권 0.
def _svg_thumb(svg: str) -> str:
    return "data:image/svg+xml;base64," + base64.b64encode(svg.strip().encode("utf-8")).decode("ascii")

_THUMB_TEAMLAB = _svg_thumb(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">'
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
    '<stop offset="0" stop-color="#7b6cf0"/><stop offset="1" stop-color="#a99bf7"/></linearGradient></defs>'
    '<rect width="400" height="225" fill="url(#g)"/>'
    '<path d="M200 58 l13 33 33 13 -33 13 -13 33 -13 -33 -33 -13 33 -13 z" fill="#fff" opacity="0.96"/>'
    '<circle cx="138" cy="150" r="6" fill="#fff" opacity="0.85"/>'
    '<circle cx="270" cy="68" r="4.5" fill="#fff" opacity="0.8"/>'
    '<text x="200" y="200" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="19" opacity="0.95">teamLab</text>'
    '</svg>'
)
_THUMB_SKYTREE = _svg_thumb(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">'
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">'
    '<stop offset="0" stop-color="#4aa3d8"/><stop offset="1" stop-color="#8fd0ee"/></linearGradient></defs>'
    '<rect width="400" height="225" fill="url(#g)"/>'
    '<path d="M200 52 L217 150 L183 150 Z" fill="#fff" opacity="0.92"/>'
    '<line x1="200" y1="34" x2="200" y2="52" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'
    '<circle cx="200" cy="104" r="12" fill="#62b5e0"/>'
    '<rect x="176" y="147" width="48" height="7" rx="3" fill="#fff" opacity="0.92"/>'
    '<text x="200" y="196" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="19" opacity="0.95">전망대</text>'
    '</svg>'
)

# 세시간전(3ha.in) 정적 제휴 링크 — API 없음. /travel/products에서 MRT 카탈로그와 합쳐 노출.
# partner=3hours: 클릭은 GA4로만 집계(수익은 세시간전 자체 대시보드). utm_content 미부착.
STATIC_TRAVEL_PRODUCTS = [
    {"gid": "3ha-507661", "cat": "esim", "city": "전국", "title": "일본 eSIM (도코모/소프트뱅크)", "price": 500,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/ghnf5uishypet3i2v23q/일본eSIM-DOCOMO.jpg",
     "url": "https://3ha.in/r/507661", "keywords": "이심,esim,유심,심,sim,데이터,로밍,인터넷,와이파이"},
    {"gid": "3ha-507658", "cat": "esim", "city": "전국", "title": "유심사 일본 유심/eSIM", "price": 0,
     "image": "",
     "url": "https://3ha.in/r/507658", "keywords": "이심,esim,유심,심,sim,데이터,로밍,인터넷,와이파이"},
    {"gid": "3ha-507665", "cat": "park", "city": "도쿄", "title": "도쿄 디즈니랜드 & 디즈니씨 티켓", "price": 71100,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/hoo92psxybodfjagbdhu/도쿄디즈니랜드도쿄디즈니씨티켓.jpg",
     "url": "https://3ha.in/r/507665", "keywords": "디즈니,디즈니랜드,디즈니씨,놀이공원,테마파크,입장권"},
    {"gid": "3ha-507670", "cat": "park", "city": "오사카", "title": "오사카 유니버설 스튜디오 재팬(USJ) 입장권", "price": 83700,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/tfutvhekax4sl8ryt5u2/오사카유니버설스튜디오재팬입장권.jpg",
     "url": "https://3ha.in/r/507670", "keywords": "유니버설,유니버셜,usj,놀이공원,테마파크,닌텐도,입장권"},
    {"gid": "3ha-507666", "cat": "pass", "city": "도쿄", "title": "나리타 공항 스카이라이너 티켓", "price": 19800,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/gh6jbhvciql6webjdmwg/나리타공항스카이라이너티켓.jpg",
     "url": "https://3ha.in/r/507666", "keywords": "나리타,공항,스카이라이너,전철,우에노,닛포리,교통,역까지"},
    {"gid": "3ha-507673", "cat": "pass", "city": "도쿄", "title": "게이세이 스카이라이너 티켓(나리타→우에노)", "price": 21877,
     "image": "https://image.kkday.com/v2/image/get/s1.kkday.com/product_18566/20180430104240_XHgkl/jpg",
     "url": "https://3ha.in/r/507673", "keywords": "나리타,공항,스카이라이너,게이세이,우에노,전철,교통,역까지"},
    {"gid": "3ha-507677", "cat": "pass", "city": "오사카", "title": "오사카 라피트 특급(간사이공항↔난바)", "price": 49000,
     "image": "https://image.kkday.com/v2/image/get/s1.kkday.com/product_29003/20241008010030_lcvE4/jpg",
     "url": "https://3ha.in/r/507677", "keywords": "간사이,공항,라피트,난바,오사카,전철,교통,역까지"},
    {"gid": "3ha-507668", "cat": "pass", "city": "도쿄", "title": "도쿄 지하철 티켓(도쿄 메트로)", "price": 9100,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/cdeua5hww0ladox5bp7v/도쿄지하철티켓.jpg",
     "url": "https://3ha.in/r/507668", "keywords": "지하철,메트로,전철,도쿄,교통,역까지,패스"},
    {"gid": "3ha-507682", "cat": "park", "city": "도쿄", "title": "도쿄 팀랩 플래닛(teamLab Planets) 입장권", "price": 30800,
     "image": _THUMB_TEAMLAB,
     "url": "https://3ha.in/r/507682", "keywords": "팀랩,teamlab,플래닛,전시,미술,입장권,체험"},
    {"gid": "3ha-507684", "cat": "park", "city": "도쿄", "title": "도쿄 스카이트리 입장권", "price": 19600,
     "image": _THUMB_SKYTREE,
     "url": "https://3ha.in/r/507684", "keywords": "스카이트리,전망대,타워,도쿄,입장권"},
    {"gid": "3ha-507700", "cat": "general", "city": "후지·하코네", "title": "후지산·하코네 일일 투어(도쿄 출발)", "price": 55600,
     "image": "https://res.klook.com/images/w_1200,h_630,c_fill,q_65/activities/z0pgbdeyzw3p0rfq8v2n/하코네후지하코네1일투어.jpg",
     "url": "https://3ha.in/r/507700", "keywords": "후지산,후지,하코네,투어,온천,당일,도쿄"},
    {"gid": "3ha-507708", "cat": "general", "city": "교토", "title": "교토·나라 일일 투어(아라시야마·후시미이나리)", "price": 0,
     "image": "",
     "url": "https://3ha.in/r/507708", "keywords": "교토,나라,아라시야마,후시미이나리,투어,여행"},
    {"gid": "3ha-507724", "cat": "hotel", "city": "도쿄", "title": "도쿄 호텔·숙소(라쿠텐트래블)", "price": 0,
     "image": "",
     "url": "https://3ha.in/r/507724", "keywords": "호텔,숙소,숙박,료칸,도쿄,여행"},
]

def _to_int(x) -> int:
    """가격 등 정수화 — 문자열/콤마/None 안전 처리."""
    try:
        if x is None:
            return 0
        if isinstance(x, (int, float)):
            return int(x)
        return int(re.sub(r"[^0-9]", "", str(x)) or 0)
    except Exception:
        return 0

def mrt_request(method: str, path: str, json_body=None, params=None, retries: int = 3):
    """MRT 공통 클라이언트 — Bearer 주입 + 지수 백오프(429/500/503) + 4xx 즉시 실패."""
    key = os.environ.get("MRT_API_KEY")
    if not key:
        raise HTTPException(status_code=503, detail="MRT_API_KEY 환경변수가 설정되지 않았습니다.")
    url = MRT_BASE + path
    headers = {"Authorization": f"Bearer {key}"}
    if json_body is not None:
        headers["Content-Type"] = "application/json"
    delay = 1.0
    for attempt in range(retries + 1):
        try:
            resp = requests.request(method, url, headers=headers, json=json_body, params=params, timeout=20)
        except requests.RequestException as e:
            if attempt < retries:
                time.sleep(delay); delay *= 2; continue
            raise HTTPException(status_code=502, detail=f"MRT 요청 실패: {e}")
        # 429/500/503 → 백오프 재시도
        if resp.status_code in (429, 500, 503) and attempt < retries:
            time.sleep(delay); delay *= 2; continue
        # 4xx(400/401/403/404 등) → 재시도 없이 즉시 실패
        if resp.status_code >= 400:
            print(f"[MRT] {resp.status_code} {path}: {resp.text[:300]}")
            raise HTTPException(status_code=resp.status_code, detail=f"MRT {resp.status_code}: {resp.text[:200]}")
        try:
            return resp.json()
        except Exception:
            raise HTTPException(status_code=502, detail="MRT 응답 파싱 실패")

def mrt_create_mylink(target_url: str):
    """productUrl로 단축 추적링크 발급 → (mylink_url, mylink_id). 실패 시 (None, None)."""
    try:
        body = mrt_request("POST", "/v1/mylink", json_body={"targetUrl": target_url})
        data = body.get("data") or {}
        return data.get("mylink"), data.get("mylinkId")
    except HTTPException:
        return None, None

def _mrt_data_list(resp, key):
    """MRT 응답 data에서 목록 추출 — data가 {key:[...]} 든 [...] 든 안전 처리."""
    data = resp.get("data")
    if isinstance(data, dict):
        v = data.get(key)
        return v if isinstance(v, list) else []
    if isinstance(data, list):
        return data
    return []

def refresh_mrt_catalog():
    """큐레이션 배치 — 타깃별로 카테고리 조회→상품 검색→마이링크 발급→DB 갱신. 관리자가 트리거."""
    db = SessionLocal()
    summary = []
    try:
        # 시작 시 전체 비활성화 1회 (같은 cat에 타깃 여러 개 허용)
        db.query(MrtProduct).update({"active": 0})
        db.commit()
        for t in MRT_TARGETS:
            try:
                # 1) 카테고리 조회 (도시마다 value 다름 → 하드코딩 금지)
                cresp = mrt_request("POST", "/v1/products/tna/categories", json_body={"city": t["city"]})
                cats = _mrt_data_list(cresp, "categories")
                catval = None
                for c in cats:
                    if not isinstance(c, dict):
                        continue
                    label = f"{c.get('label') or c.get('name') or ''} {c.get('value') or ''}"
                    if any(h.lower() in label.lower() for h in t["cat_hint"]):
                        catval = c.get("value"); break
                if catval is None and cats and isinstance(cats[0], dict):
                    catval = cats[0].get("value")
                time.sleep(1)

                # 2) 상품 검색 (투어는 page 1-based)
                sbody = {"keyword": t["keyword"], "sort": "review_score_desc", "page": 1, "size": 8}
                if catval:
                    sbody["category"] = catval
                sresp = mrt_request("POST", "/v1/products/tna/search", json_body=sbody)
                items = _mrt_data_list(sresp, "items")

                # 3) 신규 저장(+마이링크). 비일본 상품은 제외.
                saved = 0
                for idx, it in enumerate(items[:8]):
                    if not isinstance(it, dict):
                        continue
                    title = it.get("itemName") or it.get("title") or ""
                    if any(x in title for x in MRT_EXCLUDE_TITLE):
                        continue
                    gid = str(it.get("gid") or it.get("itemId") or "")
                    purl = it.get("productUrl") or (f"https://www.myrealtrip.com/offers/{gid}" if gid else None)
                    if not purl:
                        continue
                    if saved >= 6:
                        break
                    mylink, mylink_id = mrt_create_mylink(purl)
                    db.add(MrtProduct(
                        cat=t["cat"], gid=gid, title=title,
                        sale_price=_to_int(it.get("salePrice")),
                        image_url=it.get("imageUrl") or "",
                        product_url=purl, mylink_url=mylink, mylink_id=mylink_id,
                        city=t["city"], keywords=t["keywords"], active=1, sort_order=idx,
                    ))
                    saved += 1
                    time.sleep(1)  # 레이트리밋 권장 간격
                db.commit()
                summary.append({"cat": t["cat"], "keyword": t["keyword"], "saved": saved})
            except HTTPException as e:
                db.rollback()
                summary.append({"cat": t["cat"], "keyword": t["keyword"], "error": f"http: {e.detail}"})
            except Exception as e:
                db.rollback()
                summary.append({"cat": t["cat"], "keyword": t["keyword"], "error": f"{type(e).__name__}: {e}"})
        return {"ok": True, "summary": summary}
    finally:
        db.close()


@app.get("/travel/products")
def travel_products():
    """프론트 노출용 — 큐레이션된 활성 상품(캐시). 비밀정보 없음(공개)."""
    db = SessionLocal()
    try:
        rows = (db.query(MrtProduct)
                  .filter(MrtProduct.active == 1)
                  .order_by(MrtProduct.cat, MrtProduct.sort_order).all())
        mrt = [{
            "id": f"mrt-{r.id}", "partner": "myrealtrip", "cat": r.cat, "gid": r.gid,
            "title": r.title, "price": r.sale_price, "image": r.image_url,
            "url": r.mylink_url or r.product_url, "city": r.city,
            "keywords": [k for k in (r.keywords or "").split(",") if k],
        } for r in rows]
        # 세시간전 정적 상품 합치기 (utm 미부착, GA4 클릭만)
        static = [{
            "id": s["gid"], "partner": "3hours", "cat": s["cat"], "gid": s["gid"],
            "title": s["title"], "price": s["price"], "image": s["image"],
            "url": s["url"], "city": s["city"],
            "keywords": [k for k in s["keywords"].split(",") if k],
        } for s in STATIC_TRAVEL_PRODUCTS]
        # 이미지도 없고 가격도 없는(회색 빈 카드) 항목은 노출 제외
        products = [p for p in (static + mrt) if p["image"] or (p["price"] or 0) > 0]
        return {"products": products}
    finally:
        db.close()


@app.post("/mrt/refresh")
def mrt_refresh(key: str = ""):
    """큐레이션 배치 수동 트리거 (관리 토큰 필요). 추후 cron으로 자동화 예정."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다. ?key=... 를 붙여주세요.")
    return refresh_mrt_catalog()


# ── Phase 2: 수익/예약 동기화 (utm_content → 배치 매핑) ──
def _placement_of(utm):
    """utm_content('home_banner__12345')에서 배치명만 추출."""
    if not utm:
        return None
    return utm.split("__")[0] if "__" in utm else utm

def sync_mrt_revenues(days: int = 35, date_type: str = "SETTLEMENT"):
    """최근 N일 수익현황을 가져와 DB에 업서트(멱등). 환불·상태변경 반영 위해 넓게 조회."""
    end = now_kst().date()
    start = end - datetime.timedelta(days=days)
    resp = mrt_request("GET", "/v1/revenues", params={
        "startDate": start.isoformat(), "endDate": end.isoformat(), "dateSearchType": date_type,
    })
    records = _mrt_data_list(resp, "revenues")
    if not records:  # data 구조 변형 대비 — 흔한 키들 추가 탐색
        data = resp.get("data")
        if isinstance(data, dict):
            for k in ("list", "items", "content"):
                if isinstance(data.get(k), list):
                    records = data[k]; break
    db = SessionLocal()
    saved = 0
    try:
        for r in records:
            if not isinstance(r, dict):
                continue
            rno = str(r.get("reservationNo") or "")
            if not rno:
                continue
            utm = r.get("utmContent")
            row = db.query(MrtRevenue).filter(MrtRevenue.reservation_no == rno).first()
            if not row:
                row = MrtRevenue(reservation_no=rno); db.add(row)
            row.link_id        = str(r.get("linkId") or "")
            row.gid            = str(r.get("gid") or "")
            row.product_title  = r.get("productTitle") or ""
            row.sale_price     = _to_int(r.get("salePrice"))
            row.commission     = _to_int(r.get("commission"))
            row.commission_rate = str(r.get("commissionRate") or "")
            row.utm_content    = utm
            row.placement      = _placement_of(utm)
            row.status         = r.get("status") or ""
            row.status_kor     = r.get("statusKor") or ""
            row.revenue_date   = str(r.get("settlementDate") or r.get("paymentDate") or r.get("date") or "")
            saved += 1
        db.commit()
        return {"ok": True, "fetched": len(records), "saved": saved}
    finally:
        db.close()


@app.post("/mrt/sync-revenues")
def mrt_sync_revenues(key: str = "", days: int = 35):
    """수익 동기화 수동 트리거 (관리 토큰). 매일 자동으로도 실행됨."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    return sync_mrt_revenues(days=days)


def _revenue_summary():
    """수익 요약 계산 — 총액 + 배치별(home_banner/result_popup) + 상품별 TOP."""
    db = SessionLocal()
    try:
        rows = db.query(MrtRevenue).all()
        by_place, by_prod = {}, {}
        for r in rows:
            p = r.placement or "(미상)"
            bp = by_place.setdefault(p, {"reservations": 0, "sales": 0, "commission": 0})
            bp["reservations"] += 1; bp["sales"] += r.sale_price or 0; bp["commission"] += r.commission or 0
            t = r.product_title or r.gid or "(?)"
            pr = by_prod.setdefault(t, {"reservations": 0, "commission": 0})
            pr["reservations"] += 1; pr["commission"] += r.commission or 0
        top = sorted(by_prod.items(), key=lambda x: -x[1]["commission"])[:15]
        return {
            "total_reservations": len(rows),
            "total_sales": sum(r.sale_price or 0 for r in rows),
            "total_commission": sum(r.commission or 0 for r in rows),
            "by_placement": by_place,
            "top_products": [{"title": t, **v} for t, v in top],
        }
    finally:
        db.close()


@app.get("/mrt/revenue-summary")
def mrt_revenue_summary(key: str = ""):
    """수익 요약 (관리 토큰 — 내부/curl용)."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    return _revenue_summary()


@app.post("/admin/rename-user")
def admin_rename_user(key: str = "", phone: str = "", new_name: str = ""):
    """회원 이름 변경 (관리 토큰). 보안상 노출된 이름과 다른 비공개 이름으로 교체할 때 사용."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    if not phone or not new_name.strip():
        raise HTTPException(status_code=400, detail="phone, new_name 이 필요합니다.")
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.phone == phone.strip()).first()
        if not u:
            # 하이픈 표기 차이 대비 — 정규화 비교
            u = next((x for x in db.query(User).all() if _norm_phone(x.phone) == _norm_phone(phone)), None)
        if not u:
            raise HTTPException(status_code=404, detail="해당 번호의 회원을 찾을 수 없습니다.")
        old = u.name
        u.name = new_name.strip()
        db.commit()
        return {"ok": True, "phone": u.phone, "old_name": old, "new_name": u.name}
    finally:
        db.close()


@app.on_event("startup")
async def _mrt_revenue_scheduler():
    """매일 KST 07:30에 수익 자동 동기화 (정산 06시 이후). 키 없으면 미동작."""
    if not os.environ.get("MRT_API_KEY"):
        return
    import threading
    def loop():
        while True:
            try:
                now = now_kst()
                target = now.replace(hour=7, minute=30, second=0, microsecond=0)
                if target <= now:
                    target += datetime.timedelta(days=1)
                time.sleep(max(60, (target - now).total_seconds()))
                sync_mrt_revenues(days=35)
                print("[mrt] 일일 수익 동기화 완료")
            except Exception as e:
                print("[mrt] 수익 동기화 루프 오류:", e)
                time.sleep(3600)
    threading.Thread(target=loop, daemon=True).start()


class BreakdownRequest(BaseModel):
    japanese: str

class BreakdownResponse(BaseModel):
    breakdown: list[BreakdownEntry]

@app.post("/breakdown", response_model=BreakdownResponse)
def breakdown(req: BreakdownRequest, request: Request):
    rate_guard(request)
    """
    이미 번역된 일본어 문장을 받아 단어별 문장 분해를 반환한다.

    /analyze가 반환한 일본어 문장을 그대로 받으므로 재번역 없이 일관성 유지.
    무거운 분해 생성을 임계 경로에서 분리해 번역 응답 속도를 높이기 위한 엔드포인트.
    """
    text = req.japanese.strip()
    if not text:
        raise HTTPException(status_code=400, detail="입력 텍스트가 비어 있습니다.")

    # ── 캐시 조회: L1(메모리) → L2(영구 DB) ───────
    if text in _breakdown_cache:
        print(f"[Breakdown L1 HIT] {text[:40]!r}")
        return BreakdownResponse(breakdown=_breakdown_cache[text])

    persisted = pcache_get_text("breakdown", text)
    if persisted is not None:
        print(f"[Breakdown L2 HIT] {text[:40]!r}")
        _l1_put(_breakdown_cache, text, persisted)
        return BreakdownResponse(breakdown=persisted)
    # ───────────────────────────────────────────

    raw_breakdown = generate_breakdown(text)
    try:
        entries = [BreakdownEntry(**e) for e in raw_breakdown]
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"분해 데이터 형식 오류: {e}")

    result = BreakdownResponse(breakdown=entries)

    # L1(메모리) + L2(영구 DB)에 저장
    payload = [e.model_dump() for e in entries]
    _l1_put(_breakdown_cache, text, payload)
    pcache_put_text("breakdown", text, payload)
    print(f"[Breakdown 캐시 저장] {text[:40]!r}")

    return result


# (구 /accent 엔드포인트 제거 — OJAD 기반이었고 프론트 미사용. 악센트는 /analyze의 Gemini 출력 사용)


@app.post("/tts")
def tts(req: TTSRequest, request: Request):
    rate_guard(request)
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

    # ── 캐시 조회: L1(메모리) → L2(영구 DB) ───────
    cache_key = f"{req.text}_{req.gender}"

    if cache_key in _tts_cache:
        print(f"[TTS L1 HIT] key={cache_key!r}")
        return StreamingResponse(
            io.BytesIO(_tts_cache[cache_key]),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "inline; filename=speech.mp3"},
        )

    persisted = pcache_get_blob("tts", cache_key)
    if persisted is not None:
        print(f"[TTS L2 HIT] key={cache_key!r}")
        _l1_put(_tts_cache, cache_key, persisted, cap=1000)
        return StreamingResponse(
            io.BytesIO(persisted),
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

    # 결과를 L1(메모리) + L2(영구 DB)에 저장
    _l1_put(_tts_cache, cache_key, tts_response.audio_content, cap=1000)
    pcache_put_blob("tts", cache_key, tts_response.audio_content)
    print(f"[TTS 캐시 저장] key={cache_key!r} ({len(tts_response.audio_content):,} bytes)")

    # MP3 바이트를 스트리밍 응답으로 반환
    return StreamingResponse(
        io.BytesIO(tts_response.audio_content),
        media_type="audio/mpeg",
        headers={"Content-Disposition": "inline; filename=speech.mp3"},
    )


class WarmTTSRequest(BaseModel):
    key: str = ""
    gender: str = "female"
    texts: list[str] = []

@app.post("/admin/warm-tts")
def admin_warm_tts(req: WarmTTSRequest):
    """관리자 — 라이브러리 음성 사전 생성(워밍업).
    주어진 일본어 문자열들을 TTS로 합성해 영구 캐시(CacheEntry)에 저장한다.
    한 번 채워두면 이후 동일 문자열 재생은 전부 캐시 적중 → TTS 비용 0원.
    rate_guard 없이 한 클라이언트로 배치 처리하고, 이미 캐시에 있으면 건너뛴다(멱등).
    캐시 키는 /tts와 동일한 '{text}_{gender}' 형식이라 프론트 재생과 정확히 일치한다."""
    if req.key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    api_key = os.environ.get("GOOGLE_TTS_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GOOGLE_TTS_API_KEY 미설정")

    gender = req.gender if req.gender in TTS_VOICE_MAP else "female"
    voice = texttospeech.VoiceSelectionParams(language_code="ja-JP", name=TTS_VOICE_MAP[gender])
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    client = texttospeech.TextToSpeechClient(client_options=ClientOptions(api_key=api_key))

    generated = already = errors = skipped = 0
    seen: set[str] = set()
    for raw in req.texts:
        t = (raw or "").strip()
        if not t or t in seen:
            skipped += 1
            continue
        seen.add(t)
        ck = f"{t}_{gender}"
        if pcache_get_blob("tts", ck) is not None:
            already += 1
            continue
        try:
            r = client.synthesize_speech(
                input=texttospeech.SynthesisInput(text=t), voice=voice, audio_config=audio_config)
            pcache_put_blob("tts", ck, r.audio_content)
            generated += 1
        except Exception as e:
            errors += 1
            print("[warm-tts] err:", t[:30], str(e)[:80])
    return {"ok": True, "gender": gender, "requested": len(req.texts),
            "generated": generated, "already_cached": already,
            "errors": errors, "skipped_dupe_empty": skipped}


@app.get("/admin/cache-stats")
def admin_cache_stats(key: str = ""):
    """관리자 — 영구 캐시(L2) 현황: 네임스페이스별 행 수, TTS 저장 용량, L1 크기."""
    if key != FAST_ADMIN_KEY:
        raise HTTPException(status_code=403, detail="관리 토큰이 필요합니다.")
    from sqlalchemy import func
    db = SessionLocal()
    try:
        by_ns = dict(db.query(CacheEntry.ns, func.count(CacheEntry.id))
                       .group_by(CacheEntry.ns).all())
        try:
            tts_bytes = db.query(func.coalesce(func.sum(func.length(CacheEntry.v_blob)), 0)) \
                          .filter(CacheEntry.ns == "tts").scalar() or 0
        except Exception:
            tts_bytes = None
        return {
            "rows_by_ns": {k: v for k, v in by_ns.items()},
            "l1_sizes": {"analyze": len(_analyze_cache),
                         "breakdown": len(_breakdown_cache),
                         "tts": len(_tts_cache)},
            "tts_blob_mb": round(tts_bytes / 1048576, 1) if tts_bytes else tts_bytes,
        }
    finally:
        db.close()


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
                                      fast_unlimited=is_fast_unlimited(existing.phone),
                                      is_admin=is_admin_phone(existing.phone))
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
                              fast_unlimited=is_fast_unlimited(new_user.phone),
                              is_admin=is_admin_phone(new_user.phone))
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


# ── 강제 업데이트 게이트 ──
# DEFAULT_MIN_APP_VERSION 이상이 아니면 앱에서 '업데이트' 강제 팝업.
# 평소엔 현재 출시버전과 같게 둬서 아무도 안 막힘. 새 버전 필수 반영 시 /admin/set-min-version으로 올림.
DEFAULT_MIN_APP_VERSION = "1.6"
LATEST_APP_VERSION = "1.6"
APP_STORE_URL = "https://apps.apple.com/app/id6781296261"

def _get_setting(db, key, default):
    row = db.query(AppSetting).filter(AppSetting.key == key).first()
    return row.value if row else default

@app.get("/app-version")
def app_version():
    """앱이 실행 시 호출 — 설치버전이 min_required 미만이면 강제 업데이트."""
    db = SessionLocal()
    try:
        return {
            "min_required": _get_setting(db, "min_app_version", DEFAULT_MIN_APP_VERSION),
            "latest": _get_setting(db, "latest_app_version", LATEST_APP_VERSION),
            "ios_url": APP_STORE_URL,
        }
    finally:
        db.close()

class SetMinVersionRequest(BaseModel):
    admin_phone: str
    min_required: str

@app.post("/admin/set-min-version")
def set_min_version(req: SetMinVersionRequest):
    """관리자 전용 — 강제 업데이트 최소버전 변경(앱 출시 없이 서버에서 즉시 적용)."""
    if not is_admin_phone(req.admin_phone):
        raise HTTPException(status_code=403, detail="관리자만 사용할 수 있어요.")
    v = req.min_required.strip()
    db = SessionLocal()
    try:
        row = db.query(AppSetting).filter(AppSetting.key == "min_app_version").first()
        if row:
            row.value = v
        else:
            db.add(AppSetting(key="min_app_version", value=v))
        db.commit()
        return {"ok": True, "min_required": v}
    finally:
        db.close()


class PaymentInterestRequest(BaseModel):
    user_id: int

@app.post("/payment-interest")
def payment_interest(req: PaymentInterestRequest):
    """결제(구독) 출시 알림 신청 (로그인 회원만). 중복 신청은 무시."""
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.id == req.user_id).first():
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
        exists = db.query(PaymentWaitlist).filter(PaymentWaitlist.user_id == req.user_id).first()
        if exists:
            return {"ok": True, "already": True}
        db.add(PaymentWaitlist(user_id=req.user_id))
        try:
            db.commit()
        except IntegrityError:
            db.rollback()
        return {"ok": True, "already": False}
    finally:
        db.close()

@app.get("/payment-interest/{user_id}")
def payment_interest_status(user_id: int):
    """이 회원이 결제 출시 알림을 신청했는지."""
    db = SessionLocal()
    try:
        row = db.query(PaymentWaitlist).filter(PaymentWaitlist.user_id == user_id).first()
        return {"opted_in": bool(row)}
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


