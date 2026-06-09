import { useState, useMemo } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import SkeletonCard from './components/SkeletonCard'
import CategoryBars from './components/CategoryBars'
import SignupModal from './components/SignupModal'
import HistoryDrawer from './components/HistoryDrawer'
import VerbLibrary from './components/VerbLibrary'
import VerbDetailPage from './components/VerbDetailPage'
import WordLibrary from './components/WordLibrary'
import WordDetailPage from './components/WordDetailPage'
import { useUser } from './context/UserContext'
import { VERBS } from './data/verbs'
import { ADJ_I, getRankTabs as getAdjITabs } from './data/adjI'
import { ADJ_NA, getRankTabs as getAdjNaTabs } from './data/adjNa'
import { NOUNS, getRankTabs as getNounTabs } from './data/nouns'

const API_URL   = 'https://japan-intonation-production.up.railway.app'
const PRIMARY   = '#5CA9CE'

/* GA4 이벤트 전송 헬퍼 */
export function track(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

/* ── 오늘의 단어: 앱 실행 시 VERBS에서 랜덤 1개 선택 */
function pickDailyVerb(verbs) {
  const pool = verbs.filter(v => v.conjugations) // 데이터 있는 동사만
  return pool[Math.floor(Math.random() * pool.length)]
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

export default function App() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, setUser, saveResult } = useUser()

  const tab = location.pathname.startsWith('/verbs')   ? 'verbs'
            : location.pathname.startsWith('/adj-i')   ? 'adj-i'
            : location.pathname.startsWith('/adj-na')  ? 'adj-na'
            : location.pathname.startsWith('/noun')    ? 'noun'
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
  const [showHistory, setShowHistory] = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)

  // 비로그인 번역 횟수 — localStorage 기반, 5회 초과 시 로그인 유도
  const TRANSLATE_LIMIT = 5
  function getGuestCount() { return parseInt(localStorage.getItem('tickjapan_translate_count') || '0', 10) }
  function incrementGuestCount() {
    const next = getGuestCount() + 1
    localStorage.setItem('tickjapan_translate_count', String(next))
    return next
  }

  // 앱 실행 시 1회 랜덤 선택 (useMemo로 리렌더 시 고정)
  const dailyVerb = useMemo(() => pickDailyVerb(VERBS), [])

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
          track('signup_start', { trigger: 'translate_limit', translate_count: count })
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
  async function fetchBreakdown(translationData, text) {
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
      if (user) doSave(user, text, merged)        // 로그인 상태일 때만 자동 저장
    } catch {
      if (user) doSave(user, text, translationData) // 로그인 상태일 때만 자동 저장
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
    setBreakdownLoading(false)   // 저장된 결과는 분해가 이미 포함됨
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
  }

  const hasContent = loading || error || result || typing
  const isWordTab = tab !== 'translate'

  return (
    <div className={hasContent || isWordTab ? 'page' : 'page page--center'}>
      <div className="container">

        {/* 앱 헤더 */}
        <div className="app-header">
          <h1 className="app-title" onClick={handleHome} style={{ cursor: 'pointer' }}>
            틱재팬{' '}
            <span style={{ fontWeight: 400, color: '#888888', fontSize: '14px' }}>
              일본어 번역기
            </span>
          </h1>

          {user ? (
            /* 로그인 상태: 계정 아이콘 + 드롭다운 메뉴 (저장 목록 / 로그아웃) */
            <div className="header-menu">
              <button
                className="account-btn"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="계정 메뉴"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {menuOpen && (
                <>
                  <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
                  <div className="menu-dropdown">
                    <div className="menu-user">{user.name}님</div>
                    <button className="menu-item" onClick={() => { setShowHistory(true); setMenuOpen(false) }}>
                      저장 목록
                    </button>
                    <button className="menu-item menu-item--muted" onClick={() => { handleLogout(); setMenuOpen(false) }}>
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* 비로그인: 로그인 버튼 */
            <button onClick={handleLoginClick} className="login-btn">
              로그인
            </button>
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

          {/* 품사 탭 */}
          {[
            { key: 'verbs',  path: '/verbs',  label: '동사 TOP100' },
            { key: 'adj-i',  path: '/adj-i',  label: 'い형용사 TOP100' },
            { key: 'adj-na', path: '/adj-na', label: 'な형용사 TOP100' },
            { key: 'noun',   path: '/noun',   label: '명사 TOP100' },
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
        {isWordTab && (
          <>
            <button onClick={() => navigate('/')} className="back-to-translate">
              ← 번역기
            </button>
            <CategoryBars current={tab} onNavigate={navigate} />
          </>
        )}

        {/* 라우트 */}
        <Routes>
          <Route path="/verbs/:id" element={<VerbDetailPage />} />
          <Route path="/verbs"     element={<VerbLibrary />} />
          <Route path="/adj-i/:id" element={<WordDetailPage wordType="adj-i" />} />
          <Route path="/adj-i"     element={
            <WordLibrary
              items={ADJ_I}
              wordType="adj-i"
              getRankTabs={getAdjITabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 い형용사입니다."
            />
          } />
          <Route path="/adj-na/:id" element={<WordDetailPage wordType="adj-na" />} />
          <Route path="/adj-na"     element={
            <WordLibrary
              items={ADJ_NA}
              wordType="adj-na"
              getRankTabs={getAdjNaTabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 な형용사입니다."
            />
          } />
          <Route path="/noun/:id" element={<WordDetailPage wordType="noun" />} />
          <Route path="/noun"     element={
            <WordLibrary
              items={NOUNS}
              wordType="noun"
              getRankTabs={getNounTabs}
              description="일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 명사입니다."
            />
          } />
          <Route path="*" element={
            <>
              <SearchBar onAnalyze={handleAnalyze} loading={loading} onTyping={setTyping} onClear={handleClear} />

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
                  {dailyVerb && <DailyVerbCard verb={dailyVerb} onNavigate={navigate} />}
                </>
              )}
            </>
          } />
        </Routes>

      </div>

      {showSignup && (
        <SignupModal
          mode={signupMode}
          onSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
        />
      )}
      {showHistory && user && (
        <HistoryDrawer user={user} onClose={() => setShowHistory(false)} onSelect={handleSelectSaved} />
      )}
    </div>
  )
}
