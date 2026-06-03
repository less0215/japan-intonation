import { useState } from 'react'

/* 한국어 입력창 + 분석 버튼 */
export default function SearchBar({ onAnalyze, loading }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || loading) return
    onAnalyze(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="한국어 문장을 입력하세요"
        disabled={loading}
        style={styles.input}
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        style={{
          ...styles.button,
          opacity: loading || !text.trim() ? 0.6 : 1,
          cursor: loading || !text.trim() ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? (
          /* 로딩 스피너 */
          <span className="spinner" />
        ) : (
          '변환'
        )}
      </button>
    </form>
  )
}

const PRIMARY = '#5CA9CE'

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    height: '48px',
    padding: '0 16px',
    fontSize: '15px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    fontFamily: 'inherit',
    color: '#111111',
    transition: 'border-color 0.15s',
  },
  button: {
    height: '48px',
    minWidth: '80px',
    padding: '0 22px',
    backgroundColor: PRIMARY,
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.15s',
  },
}
