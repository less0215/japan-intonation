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
  const [signupMode, setSignupMode]   = useState('save') // 'save' | 'login'
  const [showHistory, setShowHistory] = useState(false)

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
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'analyze', {
          input_text: text,
          japanese: data.japanese,
          is_logged_in: !!user,
        })
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
      doSave(user, text, merged)        // 분해 포함해 저장
    } catch {
      doSave(user, text, translationData) // 분해 실패 시 번역만 저장
    } finally {
      setBreakdownLoading(false)
    }
  }

  function handleSave() {
    if (!user) { setSignupMode('save'); setShowSignup(true) }
    else       doSave(user, inputText, result)
  }

  function handleLoginClick() {
    setSignupMode('login')
    setShowSignup(true)
  }

  function handleLogout() {
    setUser(null)
  }

  async function doSave(currentUser, text, data) {
    try { await saveResult(currentUser ?? null, text ?? inputText, data ?? result); setSaved(true) }
    catch { /* 실패 시 무시 */ }
  }

  function handleSignupSuccess(newUser) {
    setUser(newUser)
    setShowSignup(false)
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
          <h1 className="app-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            틱재팬{' '}
            <span style={{ fontWeight: 400, color: '#888888', fontSize: '14px' }}>
              일본어 번역기
            </span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user ? (
              <>
                {/* 저장 목록 버튼 */}
                {tab === 'translate' && (
                  <button className="history-btn" onClick={() => setShowHistory(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    저장 목록
                  </button>
                )}
                {/* 사용자 정보 + 로그아웃 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: '#888' }}>{user.name}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      fontSize: 11, color: '#aaa', background: 'none',
                      border: '1px solid #e8e8e8', borderRadius: 6,
                      padding: '3px 8px', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              /* 비로그인: 로그인 버튼 */
              <button
                onClick={handleLoginClick}
                style={{
                  height: 32, padding: '0 14px', borderRadius: 8,
                  fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                  cursor: 'pointer',
                  border: `1.5px solid ${PRIMARY}55`,
                  backgroundColor: `${PRIMARY}10`,
                  color: PRIMARY,
                  transition: 'all 0.15s',
                }}
              >
                로그인
              </button>
            )}
          </div>
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
                <ResultCard data={result} onSave={handleSave} saved={saved} inputText={inputText} breakdownLoading={breakdownLoading} />
              )}

              {/* 결과/입력 전 홈 화면 — 품사 단어 목록 바 + 오늘의 단어 */}
              {!hasContent && (
                <>
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
