import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
import SignupModal from './components/SignupModal'
import HistoryDrawer from './components/HistoryDrawer'
import VerbLibrary from './components/VerbLibrary'

const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function App() {
  const [tab, setTab]                  = useState('translate') // 'translate' | 'verbs'
  const [loading, setLoading]         = useState(false)
  const [result, setResult]           = useState(null)
  const [inputText, setInputText]     = useState('')   // 현재 변환한 한국어 원문
  const [error, setError]             = useState(null)

  // 저장 관련
  const [saved, setSaved]             = useState(false)
  const [showSignup, setShowSignup]   = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // 로그인 사용자 (localStorage 유지)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tickjapan_user')) } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('tickjapan_user', JSON.stringify(user))
    else      localStorage.removeItem('tickjapan_user')
  }, [user])

  /* ── 변환 요청 */
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

  /* ── 저장 버튼 클릭 */
  function handleSave() {
    if (!user) {
      setShowSignup(true)  // 비로그인 → 회원가입 모달
    } else {
      doSave(user)         // 로그인 → 바로 저장
    }
  }

  /* ── 실제 저장 API 호출 */
  async function doSave(currentUser) {
    try {
      const res = await fetch(`${API_URL}/saves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          input_text: inputText,
          result,
        }),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
    } catch {
      /* 실패 시 무시 */
    }
  }

  /* ── 회원가입 완료 후 */
  function handleSignupSuccess(newUser) {
    setUser(newUser)
    setShowSignup(false)
    doSave(newUser)   // 가입 즉시 저장
  }

  /* ── 저장 목록에서 항목 선택 → 결과 복원 */
  function handleSelectSaved(savedResult, savedInput) {
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
  }

  const hasContent = loading || error || result

  return (
    <div className={hasContent || tab === 'verbs' ? 'page' : 'page page--center'}>
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
            { id: 'translate', label: '변환기',   activeColor: '#111111' },
            { id: 'verbs',     label: '동사 학습', activeColor: '#5CA9CE' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
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

        {/* 동사 학습 탭 */}
        {tab === 'verbs' && <VerbLibrary />}

        {/* 변환기 탭 */}
        {tab === 'translate' && (
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
              <ResultCard
                data={result}
                onSave={handleSave}
                saved={saved}
              />
            )}
          </>
        )}

      </div>

      {/* 회원가입 모달 */}
      {showSignup && (
        <SignupModal
          onSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
        />
      )}

      {/* 저장 목록 드로어 */}
      {showHistory && user && (
        <HistoryDrawer
          user={user}
          onClose={() => setShowHistory(false)}
          onSelect={handleSelectSaved}
        />
      )}

    </div>
  )
}
