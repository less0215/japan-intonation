import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'

const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function App() {
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)   // API 응답 데이터
  const [error, setError]       = useState(null)   // 에러 메시지

  /* 분석 요청 */
  async function handleAnalyze(text) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) {
        // 상태 코드별 사용자 친화적 메시지로 변환
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
      // 네트워크 단절 등 fetch 자체 실패
      const message = err.message.includes('fetch')
        ? '네트워크 연결을 확인하고 다시 시도해 주세요.'
        : err.message
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* 앱 이름 */}
        <h1 style={styles.title}>틱재팬 <span style={{ fontWeight: 400, color: '#888888', fontSize: '16px' }}>일본어 변환기</span></h1>

        {/* 입력 영역 */}
        <SearchBar onAnalyze={handleAnalyze} loading={loading} />

        {/* 에러 메시지 */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        {/* 로딩 상태 */}
        {loading && (
          <div style={styles.loadingBox}>
            <span className="spinner" style={{ borderColor: 'rgba(92,169,206,0.3)', borderTopColor: '#5CA9CE' }} />
            <span style={styles.loadingText}>번역 및 악센트 분석 중...</span>
          </div>
        )}

        {/* 결과 카드 */}
        {result && <ResultCard data={result} />}

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '48px 20px 80px',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#111111',
    letterSpacing: '-0.3px',
  },
  loadingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 20px',
    backgroundColor: '#f0f8fd',
    border: '1px solid #c8e6f5',
    borderRadius: '10px',
  },
  loadingText: {
    fontSize: '14px',
    color: '#5CA9CE',
    fontWeight: '500',
  },
  errorBox: {
    padding: '14px 16px',
    backgroundColor: '#fff5f5',
    border: '1px solid #fecdcd',
    borderRadius: '10px',
    color: '#c53030',
    fontSize: '14px',
    lineHeight: '1.5',
  },
}
