import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'

const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  async function handleAnalyze(text) {
    setLoading(true)
    setError(null)
    setResult(null)

    // Railway cold start 대응 — 연결 실패 시 1회 자동 재시도 (2초 후)
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
        // 첫 요청 실패(cold start 등) → 2초 후 재시도
        await new Promise(r => setTimeout(r, 2000))
        res = await fetchAnalyze()
      }

      if (!res.ok) {
        if (res.status === 503 || res.status === 429) {
          throw new Error('서버가 혼잡합니다. 잠시 후 다시 시도해 주세요.')
        } else if (res.status >= 500) {
          throw new Error('일시적인 오류가 발생했습니다. 다시 시도해 주세요.')
        } else {
          throw new Error('요청을 처리할 수 없습니다. 다시 시도해 주세요.')
        }
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      // 재시도 후에도 실패하면 서버 기동 중 안내
      const isFetchError = err.name === 'TypeError' || err.message.includes('fetch') || err.message.includes('network')
      setError(isFetchError
        ? '서버가 시작되는 중입니다. 잠시 후 다시 시도해 주세요.'
        : err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="container">

        <h1 className="app-title">
          틱재팬{' '}
          <span style={{ fontWeight: 400, color: '#888888', fontSize: '14px' }}>
            일본어 변환기
          </span>
        </h1>

        <SearchBar onAnalyze={handleAnalyze} loading={loading} />

        {error && <div className="error-box">{error}</div>}

        {loading && (
          <div className="loading-box">
            <span
              className="spinner"
              style={{ borderColor: 'rgba(92,169,206,0.3)', borderTopColor: '#5CA9CE' }}
            />
            <span className="loading-text">번역 및 악센트 분석 중...</span>
          </div>
        )}

        {result && <ResultCard data={result} />}

      </div>
    </div>
  )
}
