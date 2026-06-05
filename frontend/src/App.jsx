import { useState, useMemo } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'
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
      setResult(data)
      doSave(user, text, data)
      // GA4 커스텀 이벤트 전송
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'analyze', {
          input_text: text,
          japanese: data.japanese,
          is_logged_in: !!user,
        })
      }
    } catch (err) {
      const isFetchError = err.name === 'TypeError' || err.message.includes('fetch') || err.message.includes('network')
      setError(isFetchError ? '서버가 시작되는 중입니다. 잠시 후 다시 시도해 주세요.' : err.message)
    } finally {
      setLoading(false)
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

  function handleSelectSaved(savedResult, savedInput) {
    setResult(savedResult)
    setInputText(savedInput)
    setSaved(true)
  }

  const hasContent = loading || error || result
  const isWordTab = tab !== 'translate'

  return (
    <div className={hasContent || isWordTab ? 'page' : 'page page--center'}>
      <div className="container">

        {/* 앱 헤더 */}
        <div className="app-header">
          <h1 className="app-title">
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
              onClick={() => navigate(path)}
              className="tab-btn tab-btn--primary"
              data-active={tab === key}
            >
              {label}
            </button>
          ))}
        </div>

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
