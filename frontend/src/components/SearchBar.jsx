import { useState } from 'react'

/* 한국어 입력창 + 번역 버튼 */
export default function SearchBar({ onAnalyze, loading }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || loading) return
    onAnalyze(trimmed)
  }

  const disabled = loading || !text.trim()

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="한국어 문장을 입력하세요"
        disabled={loading}
        className="search-input"
      />
      <button
        type="submit"
        disabled={disabled}
        className="search-btn"
        style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        {loading ? <span className="spinner" /> : '번역'}
      </button>
    </form>
  )
}
