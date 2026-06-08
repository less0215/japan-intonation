import { useState, useRef, useEffect } from 'react'

/* 한국어 입력창 + 번역 버튼
 * - 큰 textarea (여러 줄 입력)
 * - 디바운스 자동 번역: 입력을 멈추면 자동으로 번역 시작 (Papago 방식)
 * - Enter = 즉시 번역 / Shift+Enter = 줄바꿈
 */
const DEBOUNCE_MS = 1800

export default function SearchBar({ onAnalyze, loading, onTyping, onClear }) {
  const [text, setText] = useState('')
  const timerRef = useRef(null)
  const lastSubmittedRef = useRef('')

  // 언마운트 시 타이머 정리
  useEffect(() => () => clearTimeout(timerRef.current), [])

  function submit(value) {
    const trimmed = value.trim()
    clearTimeout(timerRef.current)
    onTyping?.(false)
    if (!trimmed || trimmed === lastSubmittedRef.current) return
    lastSubmittedRef.current = trimmed
    onAnalyze(trimmed)
  }

  function handleChange(e) {
    const value = e.target.value
    setText(value)
    clearTimeout(timerRef.current)
    const trimmed = value.trim()
    if (!trimmed) {
      // 입력을 모두 지우면 이전 결과도 함께 제거
      onTyping?.(false)
      lastSubmittedRef.current = ''
      onClear?.()
      return
    }
    // 입력 즉시 "번역 중" 신호 → 디바운스 후 자동 번역
    onTyping?.(true)
    timerRef.current = setTimeout(() => submit(value), DEBOUNCE_MS)
  }

  function handleKeyDown(e) {
    // Enter(줄바꿈 아님) = 즉시 번역
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(text)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    submit(text)
  }

  const disabled = loading || !text.trim()

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <textarea
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="번역할 내용을 입력하세요"
        className="search-input"
        rows={3}
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
