import { useState, useMemo } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import SignupModal from './components/SignupModal'
import HistoryDrawer from './components/HistoryDrawer'
import VerbLibrary from './components/VerbLibrary'
import VerbDetailPage from './components/VerbDetailPage'
import { useUser } from './context/UserContext'
import { VERBS } from './data/verbs'

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

  const tab = location.pathname.startsWith('/verbs') ? 'verbs' : 'translate'

  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [inputText, setInputText]     = useState('')
  const [error, setError]             = useState(null)
  const [saved, setSaved]             = useState(false)
  const [showSignup, setShowSignup]   = useState(false)
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
      setResult(await res.json())
    } catch (err) {
      const isFetchError = err.name === 'TypeError' || err.message.includes('fetch') || err.message.includes('network')
      setError(isFetchError ? '서버가 시작되는 중입니다. 잠시 후 다시 시도해 주세요.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSave() {
    if (!user) setShowSignup(true)
    else       doSave(user)
  }

  async function doSave(currentUser) {
    try { await saveResult(currentUser, inputText, result); setSaved(true) }
    catch { /* 실패 시 무시 */ }
  }

  function handleSignupSuccess(newUser) {
    setUser(newUser)
    setShowSignup(false)
    doSave(newUser)
  }

  function handleSelectSaved(savedResult, savedInput) {
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
  }

  const hasContent = loading || error || result
  const isVerbsTab = tab === 'verbs'

  return (
    <div className={hasContent || isVerbsTab ? 'page' : 'page page--center'}>
      <div className="container">

        {/* 앱 헤더 */}
        <div className="app-header">
          <h1 className="app-title">
            틱재팬{' '}
            <span style={{ fontWeight: 400, color: '#888888', fontSize: '14px' }}>
              일본어 번역기
            </span>
          </h1>
          {user && tab === 'translate' && (
            <button className="history-btn" onClick={() => setShowHistory(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              저장 목록
            </button>
          )}
        </div>

        {/* 탭 네비게이션 */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* 번역기 탭 */}
          <button
            onClick={() => navigate('/')}
            style={{
              height: 36, padding: '0 16px', borderRadius: 20,
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              cursor: 'pointer', border: 'none',
              backgroundColor: tab === 'translate' ? '#111111' : '#f0f0f0',
              color:           tab === 'translate' ? '#ffffff' : '#666666',
              transition: 'all 0.15s',
            }}
          >
            번역기
          </button>

          {/* 동사 TOP50 탭 — 강조형 */}
          <button
            onClick={() => navigate('/verbs')}
            style={{
              height: 36, padding: '0 14px', borderRadius: 20,
              fontSize: 12, fontWeight: 700, fontFamily: 'inherit',
              cursor: 'pointer',
              border: tab === 'verbs' ? 'none' : `1.5px solid ${PRIMARY}55`,
              backgroundColor: tab === 'verbs' ? PRIMARY : `${PRIMARY}12`,
              color:           tab === 'verbs' ? '#ffffff' : PRIMARY,
              transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: 4,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 11 }}>🎌</span>
            일본인이 자주 쓰는 동사 TOP50
          </button>
        </div>

        {/* 라우트 */}
        <Routes>
          <Route path="/verbs/:id" element={<VerbDetailPage />} />
          <Route path="/verbs"     element={<VerbLibrary />} />
          <Route path="*" element={
            <>
              {/* 오늘의 단어 — 결과 없을 때만 표시 */}
              {!hasContent && dailyVerb && (
                <DailyVerbCard verb={dailyVerb} onNavigate={navigate} />
              )}

              <SearchBar onAnalyze={handleAnalyze} loading={loading} />

              {error && <div className="error-box">{error}</div>}
              {loading && (
                <div className="loading-box">
                  <span className="spinner" style={{ borderColor: 'rgba(92,169,206,0.3)', borderTopColor: PRIMARY }} />
                  <span className="loading-text">번역 및 악센트 분석 중...</span>
                </div>
              )}
              {result && (
                <ResultCard data={result} onSave={handleSave} saved={saved} inputText={inputText} />
              )}
            </>
          } />
        </Routes>

      </div>

      {showSignup && (
        <SignupModal onSuccess={handleSignupSuccess} onClose={() => setShowSignup(false)} />
      )}
      {showHistory && user && (
        <HistoryDrawer user={user} onClose={() => setShowHistory(false)} onSelect={handleSelectSaved} />
      )}
    </div>
  )
}
