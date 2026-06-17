import { useState, useMemo } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import SkeletonCard from './components/SkeletonCard'
import CategoryBars from './components/CategoryBars'
import SignupModal from './components/SignupModal'
import HistoryDrawer from './components/HistoryDrawer'
import TranslationHistoryDrawer from './components/TranslationHistoryDrawer'
import VerbLibrary from './components/VerbLibrary'
import VerbDetailPage from './components/VerbDetailPage'
import WordLibrary from './components/WordLibrary'
import WordDetailPage from './components/WordDetailPage'
import ParticleLibrary from './components/ParticleLibrary'
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

const menuItemStyle = {
  display: 'block', width: '100%', padding: '11px 16px',
  background: 'none', border: 'none', textAlign: 'left',
  fontSize: 13.5, fontWeight: 500, color: '#333',
  cursor: 'pointer', fontFamily: 'inherit',
}

/* GA4 이벤트 전송 헬퍼 */
export function track(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
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
        background: 'linear-gradient(135deg, #f0faf500 0%, #e8f7f000 100%)',
        background: `linear-gradient(135deg, ${'#5CA9CE'}10 0%, ${'#5CA9CE'}05 100%)`,
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
          fontSize: 28, fontWeight: 700, color: '#111',
        }}>
          {grammar.pattern}
        </span>
        <span style={{ fontSize: 13, color: PRIMARY, fontWeight: 600 }}>
          {grammar.reading}
        </span>
      </div>

      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#666', lineHeight: 1.5 }}>
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
        background: `linear-gradient(135deg, ${PRIMARY}18 0%, ${PRIMARY}08 100%)`,
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
          fontSize: 32, fontWeight: 600, color: '#111',
          letterSpacing: '-0.5px',
        }}>
          {verb.verb}
        </span>
        <span style={{ fontSize: 14, color: PRIMARY, fontWeight: 600 }}>
          {verb.reading}
        </span>
        <span style={{ fontSize: 14, color: '#666' }}>
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
            : 'translate'

  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [breakdownLoading, setBreakdownLoading] = useState(false)
  const [typing, setTyping]           = useState(false)
  const [inputText, setInputText]     = useState('')
  const [error, setError]             = useState(null)
  const [saved, setSaved]             = useState(false)
  const [showSignup, setShowSignup]   = useState(false)
  const [signupMode, setSignupMode]   = useState('save') // 'save' | 'login' | 'translate_limit'
  const [showHistory, setShowHistory]         = useState(false)
  const [showTranslationHistory, setShowTranslationHistory] = useState(false)
  const [menuOpen, setMenuOpen]               = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)

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

  async function handleAnalyze(text) {
    setLoading(true)
    setError(null)
    setResult(null)
    setSaved(false)
    setInputText(text)

    const fetchAnalyze = () =>
      fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

    try {
      let res
      try { res = await fetchAnalyze() }
      catch {
        await new Promise(r => setTimeout(r, 2000))
        res = await fetchAnalyze()
      }

      if (!res.ok) {
        if (res.status === 503 || res.status === 429)
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
      // 2단계: 무거운 문장 분해는 백그라운드로 채움 → 저장은 분해 병합 후 수행
      fetchBreakdown(data, text)
    } catch (err) {
      const isFetchError = err.name === 'TypeError' || err.message.includes('fetch') || err.message.includes('network')
      setError(isFetchError ? '서버가 시작되는 중입니다. 잠시 후 다시 시도해 주세요.' : err.message)
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
  }

  // 입력을 모두 지웠을 때 — 이전 결과/상태 초기화
  function handleClear() {
    setResult(null)
    setError(null)
    setTyping(false)
    setBreakdownLoading(false)
    setInputText('')
    setSaved(false)
  }

  // 홈으로 — 번역기 화면으로 이동 + 결과 초기화
  function handleHome() {
    navigate('/')
    handleClear()
  }

  function handleSelectSaved(savedResult, savedInput) {
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
    navigate('/')
    /* 저장 당시 breakdown 누락 시 재요청 */
    if (!savedResult.breakdown?.length) {
      fetchBreakdown(savedResult, savedInput, true)
    } else {
      setBreakdownLoading(false)
    }
  }

  const hasContent = loading || error || result || typing
  const isWordTab = tab !== 'translate'
  /* 문법 상세 페이지 여부 — 이 경우 '← 번역기' 버튼 숨김 */
  const isGrammarDetail = /^\/grammar\/.+/.test(location.pathname)

  return (
    <div className={`${hasContent || isWordTab ? 'page' : 'page page--center'}${isApp ? ' is-app' : ''}`}>
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
            <span style={{ fontWeight: 400, color: '#888888', fontSize: '14px' }}>
              일본어 번역기
            </span>
          </h1>

          {user ? (
            /* 로그인 상태: 이름 버튼 + 드롭다운 메뉴 */
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="login-btn"
                style={{ background: 'transparent', color: '#555', borderColor: '#e0e0e0', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                {user.name}님
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {menuOpen && (
                <>
                  {/* 바깥 클릭 시 닫힘 */}
                  <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 50,
                    minWidth: 150, background: '#fff', border: '1px solid #eee',
                    borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    overflow: 'hidden', padding: '4px 0',
                  }}>
                    <button style={menuItemStyle} onClick={() => { setMenuOpen(false); track('translation_history_open', { logged_in: true }); setShowTranslationHistory(true) }}>
                      번역 기록
                    </button>
                    <button style={menuItemStyle} onClick={() => { setMenuOpen(false); track('saved_list_open', { logged_in: true }); setShowHistory(true) }}>
                      저장 목록
                    </button>
                    <div style={{ height: 1, background: '#f0f0f0', margin: '4px 0' }} />
                    <button style={{ ...menuItemStyle, color: '#aaa' }} onClick={() => { setMenuOpen(false); handleLogout() }}>
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* 비로그인: 저장 목록 버튼 + 로그인 버튼 */
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', marginLeft: 'auto' }}>
              <button onClick={() => { track('translation_history_open', { logged_in: false }); setShowTranslationHistory(true) }} className="login-btn" style={{ background: 'transparent', color: '#888', borderColor: '#e0e0e0' }}>
                번역 기록
              </button>
              <button onClick={() => { track('saved_list_open', { logged_in: false }); setShowHistory(true) }} className="login-btn" style={{ background: 'transparent', color: '#5CA9CE', borderColor: '#5CA9CE' }}>
                저장 목록
              </button>
              <button onClick={handleLoginClick} className="login-btn">
                로그인
              </button>
            </div>
          )}
        </div>

        {/* 탭 네비게이션 */}
        <div className="tab-nav">
          {/* 번역기 탭 */}
          <button
            onClick={() => navigate('/')}
            className="tab-btn tab-btn--dark"
            data-active={tab === 'translate'}
          >
            번역기
          </button>

          {/* 품사 탭 (핵심 문법 맨 앞) */}
          {[
            { key: 'grammar',   path: '/grammar',   label: '핵심 문법' },
            { key: 'verbs',     path: '/verbs',     label: '동사 TOP100' },
            { key: 'adj-i',     path: '/adj-i',     label: 'い형용사 TOP100' },
            { key: 'adj-na',    path: '/adj-na',    label: 'な형용사 TOP100' },
            { key: 'noun',      path: '/noun',      label: '명사 TOP100' },
            { key: 'particles', path: '/particles', label: '조사 TOP10' },
          ].map(({ key, path, label }) => (
            <button
              key={key}
              onClick={() => { track('tab_view', { tab: key }); navigate(path) }}
              className="tab-btn tab-btn--primary"
              data-active={tab === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 품사 단어 목록 화면일 때 — 상단에 번역기로 돌아가기 + 카테고리 전환 바 */}
        {/* 문법 페이지는 자체 카테고리 탭이 있으므로 CategoryBars 숨김 */}
        {isWordTab && !isGrammarDetail && (
          <>
            <button onClick={() => navigate('/')} className="back-to-translate">
              ← 번역기
            </button>
            {tab !== 'grammar' && <CategoryBars current={tab} onNavigate={navigate} />}
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
          <Route path="*" element={
            <>
              <PageSEO
                title="일본어 번역기 - 파파고 대신 쓰는 무료 번역기"
                description="파파고 대신 써보세요. 틱재팬은 무료 한국어-일본어 번역기로 히라가나 독음과 피치악센트를 한 번에 확인할 수 있습니다."
                path="/"
              />
              <SearchBar onAnalyze={handleAnalyze} loading={loading} onTyping={setTyping} onClear={handleClear} />

              {/* 동사 감지 시 인스타 강의 CTA — 번역 버튼 아래, 결과 카드 위 */}
              {result?.breakdown && (() => {
                const verbRow = result.breakdown.find(r => r.part_of_speech?.includes('동사'))
                if (!verbRow) return null
                // 활용형 의미(가서, 먹어서 등)는 어색하므로 일본어 기본형(사전형) 우선 사용
                const baseStep = verbRow.conjugation_steps?.find(s => s.label?.includes('기본형') || s.label?.includes('사전형'))
                const baseForm = baseStep?.form || verbRow.unit
                return (
                  <a
                    href="https://www.instagram.com/p/DZVF2naN7QW/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
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

              {error && <div className="error-box">{error}</div>}
              {/* 입력 즉시 "번역 중" 점 표시 (디바운스 대기 단계) */}
              {typing && !loading && !result && (
                <div className="translating-dots" aria-label="번역 준비 중">
                  <span /><span /><span />
                </div>
              )}
              {loading && <SkeletonCard inputText={inputText} />}
              {result && (
                <ResultCard
                  data={result}
                  onSave={handleSave}
                  saved={saved}
                  inputText={inputText}
                  breakdownLoading={breakdownLoading}
                />
              )}

              {/* 결과/입력 전 홈 화면 — 앱 사용 안내 + 품사 단어 목록 바 + 오늘의 단어 */}
              {!hasContent && (
                <>
                  <a
                    className="app-guide-btn"
                    href="https://www.donga.com/news/It/article/all/20250725/132074003/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={isApp ? { display: 'none' } : undefined}
                  >
                    앱처럼 이용하려면 이렇게!
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                  <CategoryBars current={tab} onNavigate={navigate} />
                  {dailyVerb    && <DailyVerbCard    verb={dailyVerb}       onNavigate={navigate} />}
                  {dailyGrammar && <DailyGrammarCard grammar={dailyGrammar} onNavigate={navigate} />}
                </>
              )}
            </>
          } />
        </Routes>

      </div>

      {/* 푸터 — 개인정보처리방침·이용약관 (앱·웹 공통 표시, 심사 필수) */}
      <footer style={{
        marginTop: 40,
        paddingBottom: isApp ? 32 : 24,
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
      }}>
        <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#aaa', fontFamily: 'inherit', padding: 0 }}>개인정보처리방침</button>
        <button onClick={() => navigate('/terms')}   style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#aaa', fontFamily: 'inherit', padding: 0 }}>이용약관</button>
      </footer>


      {showSignup && (
        <SignupModal
          mode={signupMode}
          onSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
        />
      )}
      {showHistory && (
        <HistoryDrawer
          user={user}
          onClose={() => setShowHistory(false)}
          onSelect={handleSelectSaved}
          onDeleteAccount={() => setShowDeleteAccount(true)}
        />
      )}
      {showTranslationHistory && (
        <TranslationHistoryDrawer
          onClose={() => setShowTranslationHistory(false)}
          onSelect={handleSelectSaved}
        />
      )}
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
