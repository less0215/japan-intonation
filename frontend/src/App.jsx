import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import SignupModal from './components/SignupModal'
import HistoryDrawer from './components/HistoryDrawer'
import VerbLibrary from './components/VerbLibrary'
import VerbDetailPage from './components/VerbDetailPage'
import { useUser } from './context/UserContext'

const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function App() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, setUser, saveResult } = useUser()

  // 현재 탭: /verbs로 시작하면 'verbs', 아니면 'translate'
  const tab = location.pathname.startsWith('/verbs') ? 'verbs' : 'translate'

  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [inputText, setInputText]     = useState('')
  const [error, setError]             = useState(null)

  const [saved, setSaved]             = useState(false)
  const [showSignup, setShowSignup]   = useState(false)
  const [showHistory, setShowHistory] = useState(false)

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
      try {
        res = await fetchAnalyze()
      } catch {
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
    try {
      await saveResult(currentUser, inputText, result)
      setSaved(true)
    } catch { /* 실패 시 무시 */ }
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
              일본어 변환기
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
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'translate', label: '변환기',    path: '/',      activeColor: '#111111' },
            { id: 'verbs',     label: '동사 학습',  path: '/verbs', activeColor: '#5CA9CE' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => navigate(t.path)}
              style={{
                height: 36,
                padding: '0 16px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: tab === t.id ? t.activeColor : '#f0f0f0',
                color:           tab === t.id ? '#ffffff' : '#666666',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 라우트 */}
        <Routes>
          <Route path="/verbs/:id" element={<VerbDetailPage />} />
          <Route path="/verbs"     element={<VerbLibrary />} />
          <Route path="*" element={
            <>
              <SearchBar onAnalyze={handleAnalyze} loading={loading} />
              {error   && <div className="error-box">{error}</div>}
              {loading && (
                <div className="loading-box">
                  <span className="spinner" style={{ borderColor: 'rgba(92,169,206,0.3)', borderTopColor: '#5CA9CE' }} />
                  <span className="loading-text">번역 및 악센트 분석 중...</span>
                </div>
              )}
              {result && (
                <ResultCard data={result} onSave={handleSave} saved={saved} />
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
