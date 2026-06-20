import { useState, useRef, useEffect } from 'react'
import { track } from '../App'
import ModelSelector from './ModelSelector'

/* 한국어 입력창 + 번역 버튼
 * - 큰 textarea (여러 줄 입력)
 * - 디바운스 자동 번역: 입력을 멈추면 자동으로 번역 시작 (Papago 방식)
 * - Enter = 즉시 번역 / Shift+Enter = 줄바꿈
 */
const DEBOUNCE_MS = 600

export default function SearchBar({ onAnalyze, loading, onTyping, onClear, fast }) {
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
  const focusedRef = useRef(false)

  function handleFocus() {
    // 세션 첫 입력창 포커스만 기록 (번역 깔때기 시작점)
    if (focusedRef.current) return
    focusedRef.current = true
    track('search_focus')
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* 입력창 + 하단 툴바(빠른 번역 칩)를 한 박스로 */}
      <div className="search-box">
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="번역할 내용을 입력하세요"
          className="search-input"
          rows={3}
        />
        {fast && (
          <div className="search-box-toolbar">
            <ModelSelector variant="chip" {...fast} />
          </div>
        )}
      </div>
      {/* 빠른 번역 활성 시 사용량(%) 안내는 입력창 아래에 표시 */}
      {fast && fast.active && <ModelSelector variant="info" {...fast} />}
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
