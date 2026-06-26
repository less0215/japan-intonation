import { useState, useMemo, useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import PhotoStudy from './components/PhotoStudy'
import TranslatingCard from './components/TranslatingCard'
import CategoryBars from './components/CategoryBars'
import SignupModal from './components/SignupModal'
import AttPrePrompt from './components/AttPrePrompt'
import DownloadPage from './components/DownloadPage'
import AppDownloadPromo from './components/AppDownloadPromo'
import AndroidLaunchPopup from './components/AndroidLaunchPopup'
import AdSenseUnit from './components/AdSenseUnit'
import TravelAffiliate from './components/TravelAffiliate'
import TravelResultAffiliate from './components/TravelResultAffiliate'
import BottomNav from './components/BottomNav'
import SiteFooter from './components/SiteFooter'
import SavesPage from './components/SavesPage'
import ProfilePage from './components/ProfilePage'
import VerbLibrary from './components/VerbLibrary'
import VerbDetailPage from './components/VerbDetailPage'
import WordLibrary from './components/WordLibrary'
import WordDetailPage from './components/WordDetailPage'
import ParticleLibrary from './components/ParticleLibrary'
import OnomatopeLibrary from './components/OnomatopeLibrary'
import OnomatopeDetailPage from './components/OnomatopeDetailPage'
import LiveCamLibrary from './components/LiveCamLibrary'
import LiveCamDetailPage from './components/LiveCamDetailPage'
import { LIVECAMS } from './data/livecams'
import AdConsentPopup from './components/AdConsentPopup'
import FastUpsellPopup from './components/FastUpsellPopup'
import SubscriptionPage from './components/SubscriptionPage'
import MessageInbox, { getReadIds, getHiddenIds } from './components/MessageInbox'
import UpdateGate from './components/UpdateGate'
import ReviewEventPopup from './components/ReviewEventPopup'
import { showRewardedAd, showInterstitialAd, showAppBanner, hideAppBanner } from './ads'
import { adsCfg } from './config'   // 광고 빈도(백엔드 제어)
import { iapLogin, iapLogout, getEntitlements } from './iap'
import ParticleDetailPage from './components/ParticleDetailPage'
import GrammarDetailPage from './components/GrammarDetailPage'
import GrammarLibrary from './components/GrammarLibrary'
import LegalPage from './components/LegalPage'
import DeleteAccountModal from './components/DeleteAccountModal'
import { useUser } from './context/UserContext'
import PageSEO from './components/PageSEO'
import { VERBS } from './data/verbs'
import { ADJ_I, getRankTabs as getAdjITabs } from './data/adjI'
import { ADJ_NA, getRankTabs as getAdjNaTabs } from './data/adjNa'
import { NOUNS, getRankTabs as getNounTabs } from './data/nouns'
import { PARTICLES } from './data/particles'
import { GRAMMAR } from './data/grammar'

const API_URL   = 'https://japan-intonation-production.up.railway.app'
const PRIMARY   = '#5CA9CE'
// 웹 사업자정보 푸터 공개 스위치 — 통신판매업 신고번호+고객센터 전화 확정 후 true
const FOOTER_LIVE = false

/* 내부 이벤트명 → AppsFlyer 인앱 이벤트명 매핑 (핵심 전환만) */
const AF_EVENTS = {
  analyze:            'af_translate',              // 번역 시도
  signup_complete:    'af_complete_registration',  // 가입 완료(신규만)
  result_save:        'af_save_translation',       // 번역 저장
  example_save:       'af_save_example',           // 예문 저장
  word_save:          'af_save_word',              // 단어 저장
  word_detail_view:   'af_content_view',           // 콘텐츠(단어/문법) 조회
  subscribe_success:  'af_subscribe',              // 구독 결제 완료(매출 핵심전환, value/currency)
  subscribe_waitlist: 'af_subscribe_waitlist',     // 결제 미오픈 대기 수요
  review_prompt_cta:  'af_review_cta',             // 리뷰 보상 루프 CTA(ASO/리텐션)
}

/* 내부 이벤트명 → Meta Pixel 표준 이벤트명 매핑 (웹 전용 핵심 전환) */
const META_EVENTS = {
  signup_complete:    'CompleteRegistration',  // 가입 완료(신규만)
  download_page_view: 'ViewContent',           // 다운로드 페이지 도달 (퍼널 중간)
  download_click:     'Lead',                  // 실제 App Store 다운로드 클릭
  subscribe_success:  'Purchase',              // 웹 결제 전환 (value+currency:'KRW' → ROAS 입찰)
}

/* 자체 DB 적재 대상 — 결제·업셀 전환 퍼널 핵심 이벤트 (백엔드 ALLOWED_CONVERSION_EVENTS와 동기화) */
const SERVER_CONVERSION_EVENTS = new Set([
  'plans_view', 'subscribe_cta', 'subscribe_success', 'subscribe_cancel', 'subscribe_fail',
  'subscribe_abandon', 'subscribe_restore', 'fast_upsell_shown', 'fast_upsell_cta',
  'fast_upsell_dismiss', 'fast_limit_reached', 'review_prompt_shown', 'review_prompt_cta',
  'review_prompt_dismiss', 'download_page_view', 'download_click', 'download_cta_click', 'signup_complete',
])

/* 전환 이벤트를 '우리 서버'(/track-event)에 적재 — fire-and-forget. user/anon은 localStorage에서 읽음.
 * GA4로 휘발시키지 않고 유저 단위로 누적 → 업셀→결제·유입경로별 전환·매출 분석. */
function trackServer(eventName, params = {}) {
  try {
    let user_id = null, anonymous_id = null
    try { user_id = JSON.parse(localStorage.getItem('tickjapan_user') || 'null')?.user_id ?? null } catch {}
    try { anonymous_id = localStorage.getItem('tickjapan_anon_id') } catch {}
    const platform = (window.Capacitor?.isNativePlatform?.() ?? false) ? 'app' : 'web'
    const { plan = null, period = null, currency = null } = params
    const source = params.source ?? params.from ?? null
    const value = (params.value != null && !Number.isNaN(Number(params.value))) ? Math.round(Number(params.value)) : null
    const skip = new Set(['plan', 'period', 'value', 'currency', 'source', 'from', 'is_logged_in', 'is_app'])
    const props = Object.fromEntries(Object.entries(params).filter(([k]) => !skip.has(k)))
    fetch(`${API_URL}/track-event`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
      body: JSON.stringify({ event_name: eventName, user_id, anonymous_id, platform,
        plan, period, source, value, currency, props: Object.keys(props).length ? props : null }),
    }).catch(() => {})
  } catch {}
}

/* 이벤트 전송 헬퍼 — GA4 + (앱) AppsFlyer + (웹) Meta Pixel + (핵심 전환) 자체 DB */
export function track(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
  // AppsFlyer 인앱 이벤트 (앱 환경에서만, 핵심 전환에 한해)
  const afName = AF_EVENTS[eventName]
  if (afName && typeof window.__afLog === 'function') {
    // 금액성 이벤트는 AppsFlyer 표준 매출 키(af_revenue/af_currency)로 변환 → ROAS 집계
    if (params && params.value != null) {
      const { value, currency, ...rest } = params
      window.__afLog(afName, { ...rest, af_revenue: value, af_currency: currency || 'KRW' })
    } else {
      window.__afLog(afName, params)
    }
  }
  // Meta Pixel 표준 이벤트 (fbq는 웹에서만 로드됨 → 앱에선 자동 skip)
  const metaName = META_EVENTS[eventName]
  if (metaName && typeof window.fbq === 'function') {
    // Purchase 등 금액성 이벤트는 value/currency를 함께 전달 (ROAS 측정용)
    if (params && params.value != null) window.fbq('track', metaName, { value: params.value, currency: params.currency || 'KRW' })
    else window.fbq('track', metaName)
  }
  // 자체 DB 적재 — 결제·업셀 전환 퍼널만 (유저 단위 누적 → 업셀→결제·유입경로·매출 분석)
  if (SERVER_CONVERSION_EVENTS.has(eventName)) trackServer(eventName, params)
}

/* 집단 지성 — 학습 행동 신호를 '우리 서버'에 적재(GA4로 휘발시키지 않고 누적).
 * fire-and-forget: 실패해도 사용자 경험에 영향 없음. user/anon은 localStorage에서 읽음.
 * eventType: 'tts_replay' | 'pitch_expand' | 'nuance_choice' | 'breakdown_expand' | 'pattern_expand' */
export function logLearning(eventType, key, value) {
  try {
    let user_id = null
    try { user_id = JSON.parse(localStorage.getItem('tickjapan_user') || 'null')?.user_id ?? null } catch {}
    let anonymous_id = null
    try { anonymous_id = localStorage.getItem('tickjapan_anon_id') } catch {}
    const platform = (window.Capacitor?.isNativePlatform?.() ?? false) ? 'app' : 'web'
    fetch(`${API_URL}/learning-event`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
      body: JSON.stringify({ event_type: eventType, key: key ?? null, value: value ?? null, user_id, anonymous_id, platform }),
    }).catch(() => {})
  } catch {}
}

/* 사진 번역 — 업로드 전 클라이언트에서 리사이즈(긴 변 maxPx) + JPEG 압축.
 * 비용·전송량을 줄이고(토큰↓) OCR 정확도는 유지(1280px·q0.8 권장). data URL 반환. */
function resizeImage(file, maxPx = 1280, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      const scale = Math.min(1, maxPx / Math.max(width, height))
      width = Math.round(width * scale)
      height = Math.round(height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('이미지를 불러올 수 없어요.')) }
    img.src = url
  })
}

/* ── 날짜 기반 시드 — 하루 동안 같은 항목 유지 */
function dateSeed() {
  const d = new Date()
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
}

/* ── 오늘의 단어: 날짜 시드로 VERBS에서 1개 선택 */
function pickDailyVerb(verbs) {
  const pool = verbs.filter(v => v.conjugations)
  return pool[dateSeed() % pool.length]
}

/* ── 오늘의 문법: 날짜 시드로 GRAMMAR에서 1개 선택 */
function pickDailyGrammar(grammar) {
  return grammar[(dateSeed() + 7) % grammar.length]
}

/* ── 오늘의 문법 카드 */
function DailyGrammarCard({ grammar, onNavigate }) {
  return (
    <div
      onClick={() => onNavigate(`/grammar/${grammar.id}`)}
      style={{
        background: 'var(--accent-soft, #eef6fb)',
        border: `1.5px solid ${'#5CA9CE'}33`,
        borderRadius: 14,
        padding: '16px 18px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: '0.5px' }}>
          ✦ 오늘의 문법
        </span>
        <span style={{
          fontSize: 10, color: PRIMARY, background: `${PRIMARY}18`,
          borderRadius: 8, padding: '2px 8px', fontWeight: 600,
        }}>
          {grammar.meanings[0]}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 28, fontWeight: 700, color: 'var(--text-strong, #111)',
        }}>
          {grammar.pattern}
        </span>
        <span style={{ fontSize: 13, color: PRIMARY, fontWeight: 600 }}>
          {grammar.reading}
        </span>
      </div>

      <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2, #666)', lineHeight: 1.5 }}>
        {grammar.explanation.length > 60 ? grammar.explanation.slice(0, 60) + '…' : grammar.explanation}
      </p>

      <div style={{ marginTop: 10, fontSize: 12, color: PRIMARY, fontWeight: 600 }}>
        예문 · 접속 규칙 보기 →
      </div>
    </div>
  )
}

/* ── 오늘의 단어 카드 */
function DailyVerbCard({ verb, onNavigate }) {
  return (
    <div
      onClick={() => onNavigate(`/verbs/${verb.id}`)}
      style={{
        background: 'var(--accent-soft, #eef6fb)',
        border: `1.5px solid ${PRIMARY}33`,
        borderRadius: 14,
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s',
        userSelect: 'none',
      }}
    >
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: '0.5px' }}>
          ✦ 오늘의 단어
        </span>
        <span style={{
          fontSize: 10, color: PRIMARY, background: `${PRIMARY}18`,
          borderRadius: 8, padding: '2px 8px', fontWeight: 600,
        }}>
          #{verb.rank}위
        </span>
      </div>

      {/* 단어 */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 32, fontWeight: 600, color: 'var(--text-strong, #111)',
          letterSpacing: '-0.5px',
        }}>
          {verb.verb}
        </span>
        <span style={{ fontSize: 14, color: PRIMARY, fontWeight: 600 }}>
          {verb.reading}
        </span>
        <span style={{ fontSize: 14, color: 'var(--text-2, #666)' }}>
          {verb.meaning}
        </span>
      </div>

      {/* 자세히 보기 링크 */}
      <div style={{ marginTop: 10, fontSize: 12, color: PRIMARY, fontWeight: 600 }}>
        활용표 · 예문 보기 →
      </div>
    </div>
  )
}

/* 네이티브 앱 환경 여부 */
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

/* 빠른 번역 충전 완료 로컬 알림 예약 (앱 전용)
 * - 한도 소진 시 호출 → resetSec(초) 뒤에 "다시 사용 가능" 알림
 * - 권한이 없거나 웹이면 조용히 무시 */
async function scheduleFastResetNotification(resetSec) {
  if (!isApp || !resetSec || resetSec < 60) return
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications')
    const perm = await LocalNotifications.checkPermissions()
    if (perm.display !== 'granted') {
      const req = await LocalNotifications.requestPermissions()
      if (req.display !== 'granted') return
    }
    const id = 7001 // 빠른 번역 충전 알림 고정 ID (재예약 시 덮어씀)
    await LocalNotifications.cancel({ notifications: [{ id }] })
    await LocalNotifications.schedule({
      notifications: [{
        id,
        title: '빠른 번역이 충전됐어요 ⚡',
        body: '지금 다시 더 빠르고 똑똑한 번역을 사용할 수 있어요.',
        schedule: { at: new Date(Date.now() + resetSec * 1000) },
      }],
    })
  } catch { /* 플러그인 미설치/권한거부 등은 무시 */ }
}

export default function App() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, setUser, saveResult, addToHistory } = useUser()

  const tab = location.pathname.startsWith('/grammar')   ? 'grammar'
            : location.pathname.startsWith('/verbs')     ? 'verbs'
            : location.pathname.startsWith('/adj-i')     ? 'adj-i'
            : location.pathname.startsWith('/adj-na')    ? 'adj-na'
            : location.pathname.startsWith('/noun')      ? 'noun'
            : location.pathname.startsWith('/particles') ? 'particles'
            : location.pathname.startsWith('/onomatope') ? 'onomatope'
            : location.pathname.startsWith('/live')      ? 'live'
            : 'translate'

  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [breakdownLoading, setBreakdownLoading] = useState(false)
  const [breakdownExpanded, setBreakdownExpanded] = useState(false)   // 여행 팝업 트리거: 분해 펼침 여부
  const [typing, setTyping]           = useState(false)
  const [inputText, setInputText]     = useState('')
  const [error, setError]             = useState(null)
  const [saved, setSaved]             = useState(false)
  const [showSignup, setShowSignup]   = useState(false)
  const [signupMode, setSignupMode]   = useState('save') // 'save' | 'login' | 'translate_limit'
  const [showAttPrompt, setShowAttPrompt] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

  // 빠른 번역(3.1) 토글 — 사용량은 서버(DB)에서 관리, 5시간 롤링 윈도우 리셋
  const [selectedModel, setSelectedModel] = useState('basic')
  const [pendingFast, setPendingFast] = useState(false)   // 로그인 후 빠른 번역 자동 활성화
  // 앱 보상형 광고: 팝업 상태({mode}) + 이번 세션 광고 시청 완료 여부(앱 재시작 시 초기화)
  const [adPopup, setAdPopup] = useState(null)
  const [adNotice, setAdNotice] = useState(false)   // 일반 번역 일정 횟수마다 전면 광고 사전 팝업
  const [showReviewPrompt, setShowReviewPrompt] = useState(false)   // 리뷰 이벤트 팝업(앱·로그인·누적 8회쯤 1회)
  const [webFastNotice, setWebFastNotice] = useState(false)   // 웹에서 빠른 번역 시도 → 앱 안내
  const [subAdFree, setSubAdFree] = useState(false)           // 유료 구독(백엔드) OR 인앱구매(RevenueCat) → 광고 제거
  const [subInfo, setSubInfo] = useState(null)                // /subscription 응답 { plan, expires_at, fast_unlimited, ad_free }
  const [iapActive, setIapActive] = useState(false)           // 인앱 결제(RevenueCat) 활성 권한(plus/pro)
  const iapActiveRef = useRef(false)                          // /subscription effect에서 현재값 참조용
  function applyIap(active) { iapActiveRef.current = active; setIapActive(active); if (active) setSubAdFree(true) }
  // 앱 하단 고정 배너 — 목록·상세·라이브캠 '브라우징/학습' 화면에서만 노출(번역 결과·홈·결제·다운로드·프로필 제외).
  // 웹은 인피드 AdSense가 담당하므로 이 배너는 앱(AdMob) 전용. 광고제거(subAdFree) 회원은 미노출.
  useEffect(() => {
    if (!isApp) return
    const p = location.pathname
    const onBannerScreen = /^\/(verbs|adj-i|adj-na|noun|particles|grammar|onomatope|live)(\/|$)/.test(p)
    if (!subAdFree && onBannerScreen) showAppBanner()
    else hideAppBanner()
  }, [location.pathname, subAdFree])
  const [photoStudy, setPhotoStudy] = useState(null)          // 사진 학습 전체화면 { result, imageUrl } (관리자 베타)
  const [msgUnread, setMsgUnread] = useState(0)               // 메시지함 안 읽은 개수(헤더 빨간 점)
  // 정착(settled) 번역 세션 — 디바운스 중간 호출을 한 번역으로 묶어 한도·광고 카운트
  const editSessionRef = useRef({ text: '', time: 0, sid: '' })
  const lastBasicSidRef = useRef('')
  // 다크모드 (헤더 우측 토글)
  const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark')
  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    try { localStorage.setItem('tickjapan_theme', next ? 'dark' : 'light') } catch {}
    track('theme_toggle', { mode: next ? 'dark' : 'light' })
  }
  const [sessionFastUnlocked, setSessionFastUnlocked] = useState(false)
  // 서버에서 받은 사용량 상태
  const [fastUsedPct, setFastUsedPct] = useState(0)
  const [fastLocked, setFastLocked] = useState(false)        // 현재 윈도우 한도 소진
  const [fastUpsell, setFastUpsell] = useState(false)        // 빠른 번역 한도 도달 → 플러스 업셀 팝업
  const [fastResetSec, setFastResetSec] = useState(0)        // 리셋까지 남은 초
  // 화이트리스트(전 무제한) 회원 OR 유효 구독(플러스/프로·지급분 포함) → 플러스 혜택
  const fastUnlimited = !!user?.fast_unlimited || !!subInfo?.fast_unlimited || iapActive
  // 프로필/사용량에 보여줄 플러스 만료 문구 — 구독 만료일 우선, 없으면 화이트리스트(8.1)
  const plusPlanLabel = (() => {
    if (!fastUnlimited) return null
    if (user?.is_admin) return '플러스 이용 중'
    if (subInfo?.expires_at) {
      const d = new Date(subInfo.expires_at)
      if (!isNaN(d)) return `플러스 · ${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}까지`
    }
    return '플러스 · 2026.8.1까지'   // 전 무제한 화이트리스트 일괄 만료일
  })()

  // 빠른 번역(비싼 모델)은 보상형 광고가 가능한 '앱 전용'.
  // 웹은 자동 ON 하지 않음 — 무제한 회원도 웹에서는 일반 번역(비용 누수 방지).

  // 빠른 번역 사용량 조회 (진입·로그인 시). 비회원은 로컬 5시간 윈도우로 추적
  useEffect(() => {
    if (!user?.user_id) {
      const g = readGuestFast()
      setFastUsedPct(guestFastPct(g.count))
      setFastLocked(g.count >= FAST_GUEST_LIMIT)
      setFastResetSec(g.start ? guestFastResetSec(g.start) : 0)
      return
    }
    fetch(`${API_URL}/fast-usage/${user.user_id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) return
        setFastUsedPct(d.unlimited ? 0 : (d.pct ?? 0))
        setFastLocked(!d.unlimited && (d.remaining ?? 1) <= 0)
        setFastResetSec(d.reset_in_sec ?? 0)
      })
      .catch(() => {})
  }, [user?.user_id])

  // 구독/관리자/무제한 → 광고 제거 여부 조회 (백엔드. IAP 권한은 별도로 OR)
  useEffect(() => {
    if (!user?.user_id) { setSubAdFree(iapActiveRef.current); setSubInfo(null); try { localStorage.setItem('tickjapan_ad_free', iapActiveRef.current ? '1' : '') } catch {}; return }
    fetch(`${API_URL}/subscription/${user.user_id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d) {
          const adFree = !!d.ad_free || iapActiveRef.current   // 백엔드 구독 OR 인앱 결제
          setSubAdFree(adFree); setSubInfo(d)
          // 구독 미접근 컴포넌트(라이브캠 등)에서 광고 차단에 쓰도록 공유
          try { localStorage.setItem('tickjapan_ad_free', adFree ? '1' : '') } catch {}
        }
      })
      .catch(() => {})
  }, [user?.user_id])

  // 인앱 결제(RevenueCat) — 로그인 사용자 연결 + 활성 권한 조회 (앱 전용). 구매 후 이벤트로 재확인.
  useEffect(() => {
    if (!isApp) return
    let alive = true
    ;(async () => {
      if (user?.user_id) await iapLogin(user.user_id); else await iapLogout()
      const e = await getEntitlements()
      if (alive) applyIap(e.anyActive)
    })()
    const onUpdated = async () => { const e = await getEntitlements(); applyIap(e.anyActive) }
    window.addEventListener('tickjapan:iap-updated', onUpdated)
    return () => { alive = false; window.removeEventListener('tickjapan:iap-updated', onUpdated) }
  }, [user?.user_id])

  // 메시지함 안 읽은 개수 조회 (로그인 시) — 헤더 빨간 점
  useEffect(() => {
    if (!user?.user_id) { setMsgUnread(0); return }
    fetch(`${API_URL}/messages/${user.user_id}`)
      .then(r => r.ok ? r.json() : [])
      .then(list => {
        const read = getReadIds(); const hidden = getHiddenIds()
        setMsgUnread((Array.isArray(list) ? list : []).filter(m => !read.has(m.id) && !hidden.has(m.id)).length)
      })
      .catch(() => {})
  }, [user?.user_id, location.pathname])

  // '빠른 번역' 토글. 앱: 세션 첫 켜기 시 보상형 광고. 웹: 비회원이면 로그인 모달
  function handleFastToggle() {
    if (selectedModel === 'fast') { setSelectedModel('basic'); return }   // 끄기
    if (isApp) {
      // 광고 제거 회원(플러스/프로·무제한·관리자)은 광고 없이 바로 빠른 번역 켜짐
      if (fastUnlimited || subAdFree) {
        setSelectedModel('fast')
        track('fast_enabled', { adfree: true })
        return
      }
      // 일반 회원/비회원: 세션당 보상형 광고 1회 후 켜짐
      if (!sessionFastUnlocked) {
        setAdPopup({ mode: 'enable' })
        track('fast_ad_prompt', { mode: 'enable', guest: !user })
        return
      }
      setSelectedModel('fast')
      track('fast_enabled', { guest: !user })
      return
    }
    // 웹: 빠른 번역은 앱 전용 — 비용 누수 방지. 앱 다운로드 안내
    setWebFastNotice(true)
    track('fast_web_blocked')
  }

  // 보상형 광고 시청 → 빠른 번역 켜기 (앱 전용)
  async function watchAdEnable() {
    const ok = await showRewardedAd()
    track('rewarded_ad_result', { placement: 'fast_enable', result: ok ? 'rewarded' : 'no_fill_or_dismiss', guest: !user })
    if (!ok) return
    setSessionFastUnlocked(true)
    setAdPopup(null)
    setSelectedModel('fast')
    track('fast_enabled', { via: 'ad' })
  }

  // 보상형 광고 시청 → 5시간 한도 즉시 해제 후 빠른 번역 켜기 (앱 전용)
  async function watchAdUnlock5h() {
    const ok = await showRewardedAd()
    track('rewarded_ad_result', { placement: 'unlock5h', result: ok ? 'rewarded' : 'no_fill_or_dismiss', guest: !user })
    if (!ok) return
    try {
      if (user?.user_id) await fetch(`${API_URL}/fast-usage/${user.user_id}/reset`, { method: 'POST' })
      else resetGuestFast()
    } catch {}
    setFastLocked(false)
    setFastUsedPct(0)
    setFastResetSec(0)
    setSessionFastUnlocked(true)
    setAdPopup(null)
    setSelectedModel('fast')
    track('fast_5h_unlocked', { via: 'ad' })
  }

  // 사용량 소진 상태에서 사용자가 직접 '제한 풀기'를 눌렀을 때 → 플러스 업셀(+광고) 팝업
  function handleUnlockFast() {
    // 광고 제거 회원은 광고 없이 바로 켜짐(한도 자체가 없지만 방어)
    if (fastUnlimited || subAdFree) { setSelectedModel('fast'); return }
    setFastUpsell(true)
    track('fast_upsell_shown', { trigger: 'chip' })
  }

  // 비회원 빠른 번역 사용량 — user_id가 없어 localStorage 5시간 윈도우로 추적 (회원과 동일 20회)
  const FAST_GUEST_LIMIT = 15
  const FAST_GUEST_WINDOW_MS = 5 * 3600 * 1000
  function readGuestFast() {
    try {
      const r = JSON.parse(localStorage.getItem('tickjapan_guest_fast') || '{}')
      if (!r.start || Date.now() - r.start >= FAST_GUEST_WINDOW_MS) return { start: 0, count: 0 }
      return { start: r.start, count: r.count || 0 }
    } catch { return { start: 0, count: 0 } }
  }
  function guestFastResetSec(start) {
    return Math.max(0, Math.round((start + FAST_GUEST_WINDOW_MS - Date.now()) / 1000))
  }
  function guestFastPct(count) { return Math.min(100, Math.round(count / FAST_GUEST_LIMIT * 100)) }
  function consumeGuestFast() {
    let { start, count } = readGuestFast()
    if (!start) start = Date.now()
    if (count >= FAST_GUEST_LIMIT) return { allowed: false, pct: 100, resetSec: guestFastResetSec(start) }
    count += 1
    try { localStorage.setItem('tickjapan_guest_fast', JSON.stringify({ start, count })) } catch {}
    return { allowed: true, pct: guestFastPct(count), resetSec: guestFastResetSec(start) }
  }
  function resetGuestFast() {
    try { localStorage.setItem('tickjapan_guest_fast', JSON.stringify({ start: Date.now(), count: 0 })) } catch {}
  }

  // 비로그인 번역 횟수 — localStorage 기반, 3회 초과 시 로그인 유도
  const TRANSLATE_LIMIT = 2
  function getGuestCount() { return parseInt(localStorage.getItem('tickjapan_translate_count') || '0', 10) }
  function incrementGuestCount() {
    const next = getGuestCount() + 1
    localStorage.setItem('tickjapan_translate_count', String(next))
    return next
  }

  // 날짜 기반 오늘의 단어·문법 (당일 고정)
  const dailyVerb    = useMemo(() => pickDailyVerb(VERBS), [])
  const dailyGrammar = useMemo(() => pickDailyGrammar(GRAMMAR), [])

  // SPA 가상 페이지뷰 — 라우트 변경마다 GA4 page_view 전송 (경로·퍼널 분석용)
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      })
    }
  }, [location.pathname])

  // 사진학습 오버레이가 열려 있으면 전역 뒤로가기 스와이프는 건너뜀(PhotoStudy가 자체 닫기 처리 → 이중 동작 방지)
  const photoStudyOpenRef = useRef(false)
  photoStudyOpenRef.current = !!photoStudy

  // 좌→우 가장자리 스와이프 = 뒤로가기 (iOS 제스처 대응)
  useEffect(() => {
    let startX = 0, startY = 0, startT = 0, armed = false
    function onStart(e) {
      const t = e.touches[0]
      // 화면 왼쪽 가장자리(24px 이내)에서 시작한 터치만 인식 → 가로 스크롤과 충돌 방지
      armed = t.clientX <= 24
      startX = t.clientX; startY = t.clientY; startT = Date.now()
    }
    function onEnd(e) {
      if (!armed) return
      armed = false
      const t = e.changedTouches[0]
      const dx = t.clientX - startX
      const dy = Math.abs(t.clientY - startY)
      const dt = Date.now() - startT
      if (dx > 70 && dy < 50 && dt < 600 && !photoStudyOpenRef.current) navigate(-1)
    }
    document.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchend', onEnd)
    }
  }, [navigate])

  async function handleAnalyze(text) {
    setLoading(true)
    setError(null)
    setResult(null)
    setBreakdownExpanded(false)
    setSaved(false)
    setInputText(text)

    // 빠른 번역: 로그인 회원(서버 한도) OR 광고로 잠금해제한 비로그인 세션(로컬 한도)
    const wantFast = selectedModel === 'fast' && (user || sessionFastUnlocked)
    let guestFastBlocked = false
    if (wantFast && !user) {
      // 비회원: localStorage 5시간 윈도우로 사용량 차감
      const g = consumeGuestFast()
      setFastUsedPct(g.pct)
      setFastResetSec(g.resetSec)
      if (g.allowed) {
        setFastLocked(false)
      } else {
        // 소진 → 기본 번역 폴백. 자동 팝업 없이 locked 표시만(사용자가 '제한 풀기' 누를 때 광고)
        guestFastBlocked = true
        setFastLocked(true)
        setSelectedModel('basic')
        track('fast_limit_reached', { guest: true })
        scheduleFastResetNotification(g.resetSec)
      }
    }
    // 빠른 번역 여부만 서버에 전달 — 회원 한도 차감·리셋·폴백은 서버가 판정
    const useModel = (wantFast && !guestFastBlocked) ? 'fast' : 'basic'

    // 정착 세션 판정 — 직전 번역의 연장/수정(prefix)이고 12초 이내면 같은 세션(한 번역으로 묶음)
    const editSid = (() => {
      const now = Date.now()
      const p = editSessionRef.current
      const cont = p.sid && (now - p.time < 12000) && (text.startsWith(p.text) || p.text.startsWith(text))
      const sid = cont ? p.sid : (crypto.randomUUID?.() || `${now}-${Math.round(now % 1e6)}`)
      editSessionRef.current = { text, time: now, sid }
      return sid
    })()

    const fetchAnalyze = () =>
      fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model: useModel,
          platform: isApp ? 'app' : 'web',
          user_id: user?.user_id ?? null,
          anonymous_id: (() => { try { return localStorage.getItem('tickjapan_anon_id') } catch { return null } })(),
          edit_session_id: editSid,
        }),
      })

    try {
      let res
      try { res = await fetchAnalyze() }
      catch {
        await new Promise(r => setTimeout(r, 2000))
        res = await fetchAnalyze()
      }

      if (!res.ok) {
        if (res.status === 429) {
          // 레이트리밋·일일 한도 — 서버가 보낸 친절한 메시지 그대로 노출
          let msg = '잠시 후 다시 시도해 주세요.'
          try { const j = await res.json(); if (j?.detail) msg = j.detail } catch {}
          throw new Error(msg)
        } else if (res.status === 503)
          throw new Error('서버가 혼잡합니다. 잠시 후 다시 시도해 주세요.')
        else if (res.status >= 500)
          throw new Error('일시적인 오류가 발생했습니다. 다시 시도해 주세요.')
        else
          throw new Error('요청을 처리할 수 없습니다. 다시 시도해 주세요.')
      }
      const data = await res.json()
      // 1단계: 번역 + 그래프를 먼저 표시 (분해는 비어 있음)
      setResult(data)
      setLoading(false)

      // 일반(basic) 번역 전면 광고 — 무료 회원(앱 전용). 광고 전 사전 팝업.
      // 빈도: 3번째에 첫 광고(짧게 쓰고 이탈하는 사용자도 1회는 노출) → 이후 5회마다.
      //   (기존 30회는 너무 드물어 대부분 이탈 전까지 광고가 안 떠 비용만 나갔음)
      // 정착 기준: 같은 편집 세션의 중간 호출은 세지 않고, 새 번역(새 세션)일 때만 1 카운트
      const usedModel = data.model_used || useModel
      if (isApp && !subAdFree && !fastUnlimited && usedModel === 'basic' && editSid !== lastBasicSidRef.current) {
        lastBasicSidRef.current = editSid
        try {
          const n = (parseInt(localStorage.getItem('tickjapan_basic_count') || '0', 10) || 0) + 1
          localStorage.setItem('tickjapan_basic_count', String(n))
          const ac = adsCfg()   // first번째 → 이후 every회마다 (백엔드 제어)
          if (ac.enabled && (n === ac.first || (n > ac.first && (n - ac.first) % ac.every === 0))) {
            setAdNotice(true); track('interstitial_prompt', { count: n })
          }
        } catch {}
      }

      // 리뷰 이벤트 팝업 — 앱+로그인+(아직 플러스 아님) 무료 회원에게 1회만 노출.
      // 트리거 ① 누적 번역 8회쯤  OR  ② 빠른 번역(잠금 해제 후 실제 빠른 번역) 3회
      if (isApp && user?.user_id && !fastUnlimited && !localStorage.getItem('tickjapan_review_prompt_done')) {
        try {
          let trigger = ''
          const tot = (parseInt(localStorage.getItem('tickjapan_total_translations') || '0', 10) || 0) + 1
          localStorage.setItem('tickjapan_total_translations', String(tot))
          if (tot >= 8) trigger = 'total8'
          if (data.model_used === 'fast') {   // 실제로 빠른 번역이 수행된 경우만(폴백 제외)
            const fu = (parseInt(localStorage.getItem('tickjapan_fast_uses') || '0', 10) || 0) + 1
            localStorage.setItem('tickjapan_fast_uses', String(fu))
            if (fu >= 3) trigger = 'fast3'
          }
          if (trigger) {
            localStorage.setItem('tickjapan_review_prompt_done', '1')
            setTimeout(() => setShowReviewPrompt(trigger), 900)   // 결과를 잠깐 본 뒤 자연스럽게(값=트리거)
            track('review_prompt_shown', { trigger, total: tot })
          }
        } catch {}
      }

      // 빠른 번역 사용량 갱신 (서버 판정 결과 반영)
      if (selectedModel === 'fast' && user) {
        if (typeof data.fast_used_pct === 'number') setFastUsedPct(data.fast_unlimited ? 0 : data.fast_used_pct)
        if (typeof data.fast_reset_sec === 'number') setFastResetSec(data.fast_reset_sec)
        if (data.fast_limited) {
          // 한도 초과 → 기본 번역 폴백 + 충전 시점 로컬 알림 예약
          setFastLocked(true)
          setSelectedModel('basic')
          track('fast_limit_reached')
          scheduleFastResetNotification(data.fast_reset_sec)
          // 플러스 업셀 — 무료 회원에게 하루 1회 자동(가장 전환 잘 되는 순간). 그 외엔 '제한 풀기' 칩으로 진입
          if (!subAdFree && !fastUnlimited) {
            try {
              const today = new Date().toISOString().slice(0, 10)
              if (localStorage.getItem('tickjapan_fast_upsell_date') !== today) {
                localStorage.setItem('tickjapan_fast_upsell_date', today)
                setFastUpsell(true)
                track('fast_upsell_shown', { trigger: 'auto' })
              }
            } catch {}
          }
        }
      }
      // GA4 커스텀 이벤트 전송
      track('analyze', {
        input_length: text.length,
        japanese: data.japanese,
        is_logged_in: !!user,
      })
      // 비로그인 번역 횟수 카운트 → 5회 초과 시 로그인 유도 모달
      if (!user) {
        const count = incrementGuestCount()
        // 6회째 최초 노출, 이후 3회 간격마다 재노출 (6, 9, 12, ...)
        if (count > TRANSLATE_LIMIT && (count - TRANSLATE_LIMIT) % 3 === 1) {
          track('signup_start', { trigger: 'translate_limit', translate_count: count, modal_impression: Math.floor((count - TRANSLATE_LIMIT - 1) / 3) + 1 })
          setSignupMode('translate_limit')
          setShowSignup(true)
        }
      }
      // 문장 분해는 기본 접힘 — 사용자가 펼칠 때만 호출(서버 부하 절감).
      // 번역 기록은 즉시 보관(분해 없이), 분해는 펼치면 병합 저장됨.
      addToHistory(text, data)
      // 번역 1회 후 ATT 사전 안내 시트 (앱·미요청 상태에서만)
      maybeShowAttPrompt()
    } catch (err) {
      const isFetchError = err.name === 'TypeError' || err.message.includes('fetch') || err.message.includes('network')
      setError(isFetchError ? '서버가 시작되는 중입니다. 잠시 후 다시 시도해 주세요.' : err.message)
      setLoading(false)
      track('analyze_error', { type: isFetchError ? 'network' : 'server', input_length: text.length })
    }
  }

  // 사진 번역 (관리자 베타) — 사진 → 클라 리사이즈 → /analyze-image → 기존 결과 카드 그대로 표시.
  // 인쇄물 유형(도서 세로쓰기·만화·메뉴판 등)은 서버가 자동 분류해 유형별 읽기 순서로 인식.
  async function handlePhoto(file) {
    setLoading(true)
    setError(null)
    setResult(null)
    setInputText('')
    track('photo_translate_start')
    try {
      const dataUrl = await resizeImage(file, 1600, 0.85)   // 빽빽한 책 글자 OCR 위해 해상도 상향
      const res = await fetch(`${API_URL}/analyze-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_b64: dataUrl,
          user_id: user?.user_id ?? null,
          anonymous_id: (() => { try { return localStorage.getItem('tickjapan_anon_id') } catch { return null } })(),
          doc_type: 'auto',
        }),
      })
      if (!res.ok) {
        let msg = '사진을 번역할 수 없어요. 다시 시도해 주세요.'
        try { const j = await res.json(); if (j?.detail) msg = j.detail } catch {}
        throw new Error(msg)
      }
      const data = await res.json()
      setPhotoStudy({ result: data, imageUrl: dataUrl })   // 전체화면 '사진 학습' 열기
      track('photo_translate', { doc_type: data.doc_type, chunks: data.chunks?.length })
      // 집단지성(서버 적재): 무엇을 찍나(유형) + 실세계로 마주친 일본어 텍스트
      logLearning('photo_extract', data.doc_type, { chunks: data.chunks?.length || 0 })
      ;(data.chunks || []).slice(0, 20).forEach(c => { if (c.japanese) logLearning('photo_chunk', c.japanese) })
    } catch (err) {
      setError(err.message || '사진 번역 중 오류가 발생했어요.')
      track('photo_translate_error')
    } finally {
      setLoading(false)
    }
  }

  // 문장 분해를 별도 호출로 가져와 결과에 병합한다. 실패해도 번역 결과는 유지.
  // skipSave: 저장된 항목 불러오기 시 재저장 방지
  async function fetchBreakdown(translationData, text, skipSave = false) {
    setBreakdownLoading(true)
    try {
      const res = await fetch(`${API_URL}/breakdown`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ japanese: translationData.japanese }),
      })
      if (!res.ok) throw new Error()
      const { breakdown } = await res.json()
      const merged = { ...translationData, breakdown }
      setResult(merged)
      // 번역 기록에 자동 누적 (능동 '저장'과는 별개, 로컬 보관)
      if (!skipSave) addToHistory(text, merged)
    } catch {
      if (!skipSave) addToHistory(text, translationData)
    } finally {
      setBreakdownLoading(false)
    }
  }

  function handleSave() {
    if (!user) {
      track('signup_start', { trigger: 'save_button' })
      setSignupMode('save'); setShowSignup(true)
    } else {
      doSave(user, inputText, result)
    }
  }

  function handleLoginClick() {
    track('signup_start', { trigger: 'header_login' })
    setSignupMode('login')
    setShowSignup(true)
  }

  function handleLogout() {
    setUser(null)
  }

  // ATT 사전 안내 시트 표시 여부 판단 (앱 + 아직 안 물음 + notDetermined)
  async function maybeShowAttPrompt() {
    if (!isApp) return
    if (localStorage.getItem('tickjapan_att_asked') === 'true') return
    try {
      const { AppTrackingTransparency } = await import('@capgo/capacitor-app-tracking-transparency')
      const { status } = await AppTrackingTransparency.getStatus()
      if (status === 'notDetermined') setShowAttPrompt(true)
      else localStorage.setItem('tickjapan_att_asked', 'true')
    } catch { /* ATT 미지원 환경 무시 */ }
  }

  // '다음 화면' 클릭 → 시스템 ATT 팝업 호출
  async function handleAttProceed() {
    setShowAttPrompt(false)
    localStorage.setItem('tickjapan_att_asked', 'true')
    try {
      const { AppTrackingTransparency } = await import('@capgo/capacitor-app-tracking-transparency')
      await AppTrackingTransparency.requestPermission()
    } catch { /* 무시 */ }
  }

  // ⭐ 앱 실행 직후 ATT 사전안내를 띄운다(번역 성공 게이트와 무관) — 리뷰/iPad에서 권한 프롬프트가
  // 확실히 보이도록. 신규 설치+notDetermined일 때만 1회. (이전: 번역 1회 성공해야만 떠서 리뷰어가 못 봄)
  useEffect(() => {
    if (!isApp) return
    const t = setTimeout(() => { maybeShowAttPrompt() }, 1500)
    return () => clearTimeout(t)
  }, [])

  async function doSave(currentUser, text, data) {
    try {
      await saveResult(currentUser ?? null, text ?? inputText, data ?? result)
      setSaved(true)
      track('result_save', { is_logged_in: !!(currentUser ?? user) })
    } catch { /* 실패 시 무시 */ }
  }

  function handleSignupSuccess(newUser) {
    setUser(newUser)
    setShowSignup(false)
    localStorage.removeItem('tickjapan_translate_count')
    // 저장 모드일 때만 자동 저장
    if (signupMode === 'save' && result) doSave(newUser, inputText, result)
    // 빠른 번역 로그인 흐름 → 로그인 후 바로 활성화
    if (pendingFast) { setSelectedModel('fast'); setPendingFast(false); track('fast_enabled') }
  }

  // 입력을 모두 지웠을 때 — 이전 결과/상태 초기화
  function handleClear() {
    setResult(null)
    setBreakdownExpanded(false)
    setError(null)
    setTyping(false)
    setBreakdownLoading(false)
    setInputText('')
    setSaved(false)
  }

  // 홈으로 — 번역기 화면으로 이동 + 결과 초기화 + 맨 위로 스크롤
  function handleHome() {
    navigate('/')
    handleClear()
    try { window.scrollTo({ top: 0, behavior: 'auto' }) } catch { window.scrollTo(0, 0) }
  }

  function handleSelectSaved(savedResult, savedInput) {
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
    setBreakdownLoading(false)
    navigate('/')
    // 분해는 기본 접힘 — 저장 당시 누락됐어도 사용자가 펼칠 때 온디맨드 호출
  }

  const hasContent = loading || error || result || typing
  const isWordTab = tab !== 'translate'
  /* 문법 상세 페이지 여부 — 이 경우 '← 번역기' 버튼 숨김 */
  const isGrammarDetail = /^\/grammar\/.+/.test(location.pathname)
  /* 다운로드 페이지 — 탭 네비게이션 숨김(깔끔한 랜딩) */
  const isDownload = location.pathname.startsWith('/download')

  return (
    <div className={`${hasContent || isWordTab ? 'page' : 'page page--center'}${isApp ? ' is-app' : ''}`}>
      <UpdateGate />
      {showReviewPrompt && <ReviewEventPopup trigger={showReviewPrompt} onClose={() => setShowReviewPrompt(false)} />}
      <div className="container">

        {/* 앱 헤더 */}
        <div className="app-header">
          <h1 className="app-title" onClick={handleHome} style={{ cursor: 'pointer' }}>
            <img
              src="/logo.svg"
              alt=""
              width="30"
              height="30"
              style={{ verticalAlign: '-8px', marginRight: '6px' }}
            />
            틱재팬{' '}
            <span style={{ fontWeight: 400, color: 'var(--text-3)', fontSize: '14px' }}>
              일본어 번역기
            </span>
          </h1>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            {user && (
              /* 로그인: 메시지함 (벨 + 안 읽은 빨간 점) */
              <button
                onClick={() => { setMsgUnread(0); navigate('/messages') }}
                aria-label="메시지함"
                style={{ position: 'relative', width: 36, height: 36, borderRadius: '50%', background: 'var(--surface-2,#f0f3f5)', border: '1px solid var(--bd,#e6eaee)', color: 'var(--text-2,#5f6b73)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
                {msgUnread > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -2, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8, background: '#e84c5a', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #fff' }}>{msgUnread > 9 ? '9+' : msgUnread}</span>
                )}
              </button>
            )}
            {user && (
              /* 로그인: 프로필 아바타 (탭 → 프로필) */
              <button
                onClick={() => navigate('/profile')}
                aria-label="프로필"
                style={{ position: 'relative', width: 36, height: 36, borderRadius: '50%', background: '#5CA9CE', color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                {user.name?.[0] ?? '회'}
                {fastUnlimited && (
                  <span style={{ position: 'absolute', bottom: -2, right: -2, width: 15, height: 15, borderRadius: '50%', background: 'linear-gradient(145deg, #ffd97a 0%, #f0a500 100%)', border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                  </span>
                )}
              </button>
            )}
            {/* 다크모드 토글 — 헤더 오른쪽 끝(오른손 엄지 접근 용이) */}
            <button onClick={toggleTheme} aria-label="다크모드 전환" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface-2,#f0f3f5)', border: '1px solid var(--bd,#e6eaee)', color: 'var(--text-2,#5f6b73)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
              {dark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2 M12 20v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M2 12h2 M20 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* 품사 단어 목록 화면일 때 — 상단에 학습으로 돌아가기 + 카테고리 전환 바 */}
        {/* 문법 페이지는 자체 카테고리 탭이 있으므로 CategoryBars 숨김 */}
        {isWordTab && !isGrammarDetail && tab !== 'onomatope' && tab !== 'live' && (
          <>
            <button onClick={() => navigate('/study')} className="back-to-translate">
              ← 학습
            </button>
            <CategoryBars current={tab} onNavigate={navigate} />
          </>
        )}

        {/* 라우트 */}
        <Routes>
          <Route path="/verbs/:id" element={<VerbDetailPage />} />
          <Route path="/verbs"     element={<>
            <PageSEO
              title="일본인이 많이 쓰는 동사 TOP100 - 활용표 포함"
              description="일본어 동사 빈도수 TOP100과 전체 활용표를 무료로 확인하세요. する·いる·ある 등 필수 동사 100개 수록."
              path="/verbs"
            />
            <VerbLibrary />
          </>} />
          <Route path="/adj-i/:id" element={<WordDetailPage wordType="adj-i" />} />
          <Route path="/adj-i"     element={<>
            <PageSEO
              title="일본인이 많이 쓰는 い형용사 TOP100 - 활용표 포함"
              description="일본어 い형용사 빈도수 TOP100과 활용표를 무료로 확인하세요. 多い·高い·大きい 등 필수 い형용사 100개 수록."
              path="/adj-i"
            />
            <WordLibrary
              items={ADJ_I}
              wordType="adj-i"
              getRankTabs={getAdjITabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 い형용사입니다."
            />
          </>} />
          <Route path="/adj-na/:id" element={<WordDetailPage wordType="adj-na" />} />
          <Route path="/adj-na"     element={<>
            <PageSEO
              title="일본인이 많이 쓰는 な형용사 TOP100 - 활용표 포함"
              description="일본어 な형용사 빈도수 TOP100과 활용표를 무료로 확인하세요. 可能·好き·重要 등 필수 な형용사 100개 수록."
              path="/adj-na"
            />
            <WordLibrary
              items={ADJ_NA}
              wordType="adj-na"
              getRankTabs={getAdjNaTabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 な형용사입니다."
            />
          </>} />
          <Route path="/noun/:id" element={<WordDetailPage wordType="noun" />} />
          <Route path="/noun"     element={<>
            <PageSEO
              title="일본인이 많이 쓰는 명사 TOP100"
              description="일본어 명사 빈도수 TOP100을 무료로 확인하세요. こと·人·自分 등 일본인이 가장 많이 쓰는 명사 100개 수록."
              path="/noun"
            />
            <WordLibrary
              items={NOUNS}
              wordType="noun"
              getRankTabs={getNounTabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 명사입니다."
            />
          </>} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms"   element={<LegalPage type="terms" />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/study"   element={<Navigate to="/verbs" replace />} />
          <Route path="/saves"   element={<SavesPage onSelectHistory={handleSelectSaved} />} />
          <Route path="/profile" element={
            <ProfilePage
              user={user}
              fastUnlimited={fastUnlimited}
              planLabel={plusPlanLabel}
              isApp={isApp}
              onLogout={handleLogout}
              onDeleteAccount={() => setShowDeleteAccount(true)}
              onLogin={handleLoginClick}
            />
          } />
          <Route path="/grammar" element={<>
            <PageSEO
              title="일본어 문법 패턴 정리 - 접속·예문·피치 악센트"
              description="일본어 핵심 문법 패턴을 접속 규칙, 예문, 피치 악센트와 함께 정리했습니다. て형, 수수 표현, 추측, 이유, こと 표현 수록."
              path="/grammar"
            />
            <GrammarLibrary />
          </>} />
          <Route path="/grammar/:id" element={<GrammarDetailPage />} />
          <Route path="/particles/:id" element={<ParticleDetailPage />} />
          <Route path="/particles"    element={<>
            <PageSEO
              title="일본인이 많이 쓰는 조사 TOP10 - 기본·응용 용법"
              description="한국어와 다르게 쓰이는 일본어 조사 핵심 10개를 기본·응용 용법으로 정리했습니다. が·は·を·に·へ·で·から·まで·も·の 수록."
              path="/particles"
            />
            <ParticleLibrary items={PARTICLES} />
          </>} />
          <Route path="/onomatope"     element={<OnomatopeLibrary />} />
          <Route path="/onomatope/:id" element={<OnomatopeDetailPage />} />
          <Route path="/live"        element={<LiveCamLibrary />} />
          <Route path="/live/:city"  element={<LiveCamDetailPage />} />
          <Route path="/plans"       element={<SubscriptionPage />} />
          <Route path="/messages"    element={<MessageInbox />} />
          <Route path="*" element={
            <>
              <PageSEO
                title="일본어 번역기 - 파파고 대신 쓰는 무료 번역기"
                description="파파고 대신 써보세요. 틱재팬은 무료 한국어-일본어 번역기로 히라가나 독음과 피치악센트를 한 번에 확인할 수 있습니다."
                path="/"
              />
              <SearchBar
                onAnalyze={handleAnalyze}
                loading={loading}
                onTyping={setTyping}
                onClear={handleClear}
                showCamera={true}
                onCamera={handlePhoto}
                fast={{
                  active: selectedModel === 'fast',
                  locked: fastLocked,
                  usedPct: fastUsedPct,
                  unlimited: fastUnlimited,
                  resetSec: fastResetSec,
                  onToggle: handleFastToggle,
                  onUnlock: isApp ? handleUnlockFast : null,
                  unlimitedLabel: plusPlanLabel,
                }}
              />

              {/* 맥락 제휴 — 번역 버튼 바로 밑 인라인 (여행 맥락+적합도 충족 시, 웹·앱). 스크롤 흐름에 자연스럽게 노출 */}
              {result && <TravelResultAffiliate input={inputText} japanese={result.japanese} />}

              {error && <div className="error-box">{error}</div>}
              {/* 입력 즉시 "번역 중" 점 표시 (디바운스 대기 단계) */}
              {typing && !loading && !result && (
                <div className="translating-dots" aria-label="번역 준비 중">
                  <span /><span /><span />
                </div>
              )}
              {loading && <TranslatingCard inputText={inputText} />}
              {result && (
                <ResultCard
                  data={result}
                  onSave={handleSave}
                  saved={saved}
                  inputText={inputText}
                  breakdownLoading={breakdownLoading}
                  onRequestBreakdown={() => fetchBreakdown(result, inputText)}
                  onBreakdownExpanded={() => setBreakdownExpanded(true)}
                />
              )}
              {/* 문장분해 팝업 제거 — 번역 버튼 밑 인라인 카드가 이미 동일 적합도로 노출되므로 중복 방지 */}
              {/* 동사 감지 시 인스타 강의 CTA — 결과 카드 아래 */}
              {result?.breakdown && (() => {
                const verbRow = result.breakdown.find(r => r.part_of_speech?.includes('동사'))
                if (!verbRow) return null
                // 활용형 의미(가서, 먹어서 등)는 어색하므로 일본어 기본형(사전형) 우선 사용
                const baseStep = verbRow.conjugation_steps?.find(s => s.label?.includes('기본형') || s.label?.includes('사전형'))
                const baseForm = baseStep?.form || verbRow.unit
                return (
                  <a
                    href="https://www.instagram.com/p/DZ6TPrATN4l/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      marginTop: 8,
                      padding: '12px 14px',
                      background: 'linear-gradient(135deg, #fdf0f8 0%, #fff5fb 100%)',
                      border: '1.5px solid #f0c0de',
                      borderRadius: 10,
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <defs>
                        <linearGradient id="igcta" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f09433"/>
                          <stop offset="50%" stopColor="#dc2743"/>
                          <stop offset="100%" stopColor="#bc1888"/>
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igcta)"/>
                      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                    </svg>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#c0306a' }}>
                        '{baseForm}' 표현 확장 무료 강의 보러가기
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 11, color: '#b06090' }}>
                        동사 활용 완벽 정복 · 인스타그램에서 보기
                      </p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M9 18l6-6-6-6" stroke="#c0306a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )
              })()}
              {/* 번역 결과 카드 아래 광고 (웹 전용) — 핵심 가치 소비 직후 */}
              {result && !subAdFree && <AdSenseUnit slot="1147239321" style={{ marginTop: 4 }} />}

              {/* 결과/입력 전 홈 화면 — 앱 사용 안내 + 품사 단어 목록 바 + 오늘의 단어 */}
              {!hasContent && (
                <>
                  {!isApp && (
                    <button
                      className="app-guide-btn"
                      style={{ marginTop: -10 }}
                      onClick={() => { track('download_cta_click', { from: 'home' }); navigate('/download?from=home_cta') }}
                    >
                      틱재팬 앱 다운로드
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v12" />
                        <polyline points="7 10 12 15 17 10" />
                        <path d="M5 21h14" />
                      </svg>
                    </button>
                  )}
                  {/* 지금 일본 날씨는? — 도시별 라이브캠 (앱 다운로드 바로 아래) */}
                  <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '0 2px 9px' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-1,#8a9197)' }}>지금 일본 날씨는?</span>
                    <button onClick={() => navigate('/live')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#5CA9CE', cursor: 'pointer', fontFamily: 'inherit' }}>전체 ›</button>
                  </div>
                  {/* 우→좌 자동 흐름 마퀴 (호버 시 일시정지) */}
                  <div style={{ overflow: 'hidden', margin: '0 -2px', paddingBottom: 2 }}>
                    <div className="lc-marquee" style={{ display: 'flex', gap: 9, width: 'max-content' }}>
                      {[...LIVECAMS, ...LIVECAMS].map((c, i) => (
                        <button key={`${c.id}-${i}`} onClick={() => navigate(`/live/${c.id}`)} style={{ flex: '0 0 230px', textAlign: 'left', background: 'var(--card-bg,#fff)', border: '1px solid var(--card-bd,#eef1f3)', borderRadius: 15, padding: 0, cursor: 'pointer', fontFamily: 'inherit', overflow: 'hidden' }}>
                          <div style={{ width: '100%', height: 128, backgroundColor: '#11161b', backgroundImage: `url('https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="9 7 9 17 17 12" /></svg>
                            </span>
                            <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, fontWeight: 700, color: '#fff', background: '#e24b4a', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.3px' }}>LIVE</span>
                          </div>
                          <div style={{ padding: '10px 12px 12px' }}>
                            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-1,#3a4250)' }}>{c.city} <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3,#9aa0a6)' }}>{c.cityJp}</span></p>
                            <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--text-3,#9aa0a6)' }}>{c.spot}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <style>{`@keyframes lcflow{from{transform:translateX(0)}to{transform:translateX(-50%)}}.lc-marquee{animation:lcflow 120s linear infinite}.lc-marquee:hover{animation-play-state:paused}@media (prefers-reduced-motion:reduce){.lc-marquee{animation:none}}`}</style>
                  </div>
                  {/* 학습 콘텐츠 — 가로 스크롤 카드 (전체는 학습 탭) */}
                  <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '0 2px 9px' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-1,#8a9197)' }}>학습 콘텐츠</span>
                    <button onClick={() => navigate('/verbs')} style={{ background: 'none', border: 'none', fontSize: 12, color: '#5CA9CE', cursor: 'pointer', fontFamily: 'inherit' }}>전체 ›</button>
                  </div>
                  <div style={{ display: 'flex', gap: 9, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2, margin: '0 -2px' }}>
                    {[
                      { jp: '法', label: '핵심 문법', sub: '패턴 모아보기', path: '/grammar' },
                      { jp: '動', label: '동사',      sub: 'TOP 100',     path: '/verbs' },
                      { jp: 'い', label: 'い형용사',  sub: 'TOP 100',     path: '/adj-i' },
                      { jp: 'な', label: 'な형용사',  sub: 'TOP 100',     path: '/adj-na' },
                      { jp: '名', label: '명사',      sub: 'TOP 100',     path: '/noun' },
                      { jp: '助', label: '조사',      sub: 'TOP 10',      path: '/particles' },
                      { jp: '音', label: '의성어·의태어', sub: 'JLPT별', path: '/onomatope' },
                    ].map(c => (
                      <button key={c.path} onClick={() => navigate(c.path)} style={{ flex: '0 0 112px', textAlign: 'left', background: 'var(--surface,#fff)', border: '1px solid var(--bd,#eef1f3)', borderRadius: 13, padding: 11, cursor: 'pointer', fontFamily: 'inherit' }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent-soft,#f0f6fa)', color: '#5CA9CE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>{c.jp}</div>
                        <p style={{ margin: '8px 0 0', fontSize: 12, fontWeight: 600, color: 'var(--text-1,#4b5563)' }}>{c.label}</p>
                        <p style={{ margin: '1px 0 0', fontSize: 10.5, color: 'var(--text-3,#9aa0a6)' }}>{c.sub}</p>
                      </button>
                    ))}
                  </div>
                  </div>

                  {/* 오늘의 학습 */}
                  <div>
                  <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'var(--text-1,#8a9197)', margin: '0 2px 9px' }}>오늘의 학습</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {dailyVerb    && <DailyVerbCard    verb={dailyVerb}       onNavigate={navigate} />}
                    {dailyGrammar && <DailyGrammarCard grammar={dailyGrammar} onNavigate={navigate} />}
                  </div>
                  </div>
                  {/* 학습 콘텐츠 영역 하단 광고 (웹 전용) */}
                  {!subAdFree && <AdSenseUnit slot="2450758307" style={{ marginTop: 4 }} />}
                </>
              )}
            </>
          } />
        </Routes>

        {/* 웹 전역 푸터 — 전자상거래법 사업자 정보(웹 전용). 앱은 비노출(인앱결제는 Apple이 판매자).
            ★ 통신판매업 신고번호 + 고객센터 전화번호 확정 후 FOOTER_LIVE=true 로 공개 */}
        {FOOTER_LIVE && !isApp && <SiteFooter />}

      </div>

      {/* 하단 탭 네비게이션 (다운로드 페이지 제외) */}
      {!isDownload && <BottomNav onHome={handleHome} />}


      {showSignup && (
        <SignupModal
          mode={signupMode}
          onSuccess={handleSignupSuccess}
          onClose={() => { track('signup_abandon', { mode: signupMode }); setShowSignup(false); setPendingFast(false) }}
          {...(signupMode === 'fast' ? {
            title: '⚡ 빠른 번역은 로그인 후 이용해요',
            subtitle: '이름과 휴대폰 번호만 입력하면 바로 빠른 번역을 쓸 수 있어요.',
            submitLabel: '로그인하고 빠른 번역 켜기',
          } : {})}
        />
      )}
      {showAttPrompt && <AttPrePrompt onProceed={handleAttProceed} />}
      {/* 사진 학습 전체화면 (관리자 베타) — 구간을 펼치면 ResultCard 그대로 재사용 */}
      {photoStudy && (
        <PhotoStudy
          result={photoStudy.result}
          imageUrl={photoStudy.imageUrl}
          onSaveChunk={(chunk) => {
            const key = chunk.korean_meaning || chunk.japanese || '(사진)'
            addToHistory(key, chunk)                                  // 저장 탭 '번역 기록'에 표시(탭하면 결과 카드로 열림)
            if (user) saveResult(user, key, chunk).catch(() => {})    // 로그인 시 서버에도 보관(기기 간)
          }}
          onClose={() => {
            setPhotoStudy(null)
            // 사진 번역은 멀티모달이라 가장 비싼 기능 → 무료 회원은 학습을 닫을 때(가치 소비 후) 전면 광고 1회.
            // 결과를 가리지 않도록 '닫기' 시점에만, 최소 간격 가드로 일반 광고와 연속 노출 방지.
            const ac = adsCfg()
            if (isApp && !subAdFree && !fastUnlimited && ac.enabled && ac.photo) {
              showInterstitialAd().then(ok => track('interstitial_result', { from: 'photo_close', result: ok ? 'shown' : 'skip_or_fail' }))
            }
          }}
        />
      )}
      {/* 보상형 광고 양해 팝업 (앱 전용) */}
      {adPopup && (
        <AdConsentPopup
          mode={adPopup.mode}
          onWatch={adPopup.mode === 'unlock5h' ? watchAdUnlock5h : watchAdEnable}
          onClose={() => { setAdPopup(null); track('fast_ad_dismissed', { mode: adPopup.mode }) }}
        />
      )}
      {/* 빠른 번역 한도 도달 → 플러스 업셀(앱은 광고 옵션 포함, 웹은 플러스만) */}
      {fastUpsell && (
        <FastUpsellPopup
          onPlus={() => { setFastUpsell(false); track('fast_upsell_cta', { target: 'plus' }); navigate('/plans?from=fast_limit') }}
          onWatchAd={isApp ? () => { setFastUpsell(false); watchAdUnlock5h() } : null}
          onClose={() => { setFastUpsell(false); track('fast_upsell_dismiss') }}
        />
      )}
      {/* 웹에서 빠른 번역 시도 → 앱 전용 안내 */}
      {webFastNotice && (
        <div onClick={() => setWebFastNotice(false)} style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(20,30,40,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 300, maxWidth: '90vw', background: 'var(--surface)', borderRadius: 18, padding: '22px 20px 16px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: '#eef7fc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#5CA9CE"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>빠른 번역은 앱에서 만나요</p>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>더 빠르고 자연스러운 <b>빠른 번역</b>은<br />틱재팬 앱에서 무료로 이용할 수 있어요.</p>
            <button onClick={() => { setWebFastNotice(false); track('download_cta_click', { from: 'web_fast' }); navigate('/download?from=web_fast') }} style={{ width: '100%', height: 48, border: 'none', borderRadius: 13, background: '#5CA9CE', color: '#fff', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>앱 다운로드</button>
            <button onClick={() => setWebFastNotice(false)} style={{ width: '100%', height: 38, marginTop: 4, background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>그냥 일반 번역 쓸게요</button>
          </div>
        </div>
      )}
      {/* 일반 번역 일정 횟수마다 전면 광고 사전 팝업 (앱 전용) */}
      {adNotice && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(20,30,40,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ width: 300, maxWidth: '90vw', background: 'var(--surface)', borderRadius: 18, padding: '22px 20px 16px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.18)' }}>
            <p style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>잠시 광고가 표시돼요</p>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>틱재팬을 계속 <b>무료</b>로 운영하기 위해<br />짧은 광고를 보여드려요. 양해 부탁드려요.</p>
            <button onClick={async () => { setAdNotice(false); const n = parseInt(localStorage.getItem('tickjapan_basic_count') || '0', 10) || 0; const ok = await showInterstitialAd(); track('interstitial_result', { count: n, result: ok ? 'shown' : 'no_fill_or_fail' }) }} style={{ width: '100%', height: 48, border: 'none', borderRadius: 13, background: '#5CA9CE', color: '#fff', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>확인</button>
          </div>
        </div>
      )}
      {/* 첫 방문 앱 다운로드 유도 — 웹 + 다운로드 페이지 아님 */}
      {!isApp && !isDownload && <AppDownloadPromo onDownload={() => navigate('/download')} />}
      {/* 안드로이드 출시 시 알림 신청 회원에게 노출 (현재 플래그 OFF) */}
      <AndroidLaunchPopup />
      {showDeleteAccount && user && (
        <DeleteAccountModal
          user={user}
          onClose={() => setShowDeleteAccount(false)}
          onDeleted={() => { setShowDeleteAccount(false); handleLogout() }}
        />
      )}
    </div>
  )
}
