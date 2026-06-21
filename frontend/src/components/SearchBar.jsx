import { useState, useRef, useEffect } from 'react'
import { track } from '../App'

const PRIMARY = '#5CA9CE'

/* 남은 초 → "오후 5:50" 형태의 초기화 시각 */
function resetClock(sec) {
  const d = new Date(Date.now() + Math.max(0, sec) * 1000)
  let h = d.getHours()
  const m = d.getMinutes()
  const ap = h < 12 ? '오전' : '오후'
  h = h % 12 || 12
  return `${ap} ${h}:${String(m).padStart(2, '0')}`
}

/* 빠른 번역 스위치 + 사용량 (입력창 내부 하단 한 줄) */
function FastToolbar({ active, locked, usedPct = 0, unlimited, resetSec = 0, onToggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%' }}>
      {/* 좌측: 사용량 (활성 + 일반 회원일 때만) */}
      {active && !unlimited && (
        <>
          <span style={{ width: 48, height: 5, borderRadius: 3, background: '#eef1f3', overflow: 'hidden', flexShrink: 0 }}>
            <span style={{ display: 'block', height: '100%', width: `${usedPct}%`, background: locked ? '#e9a020' : PRIMARY, borderRadius: 3 }} />
          </span>
          <span style={{ fontSize: 10.5, color: locked ? '#c98a00' : '#9aa0a6' }}>
            {resetClock(resetSec)} 초기화 · <b style={{ fontWeight: 600, color: locked ? '#c98a00' : PRIMARY }}>{usedPct}%</b>
          </span>
        </>
      )}
      {active && unlimited && (
        <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 600 }}>무제한 이용 중 !</span>
      )}
      {/* 우측: ⚡ 빠른 번역 + 스위치 */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={active}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: active ? '#357694' : '#8a9197' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? PRIMARY : 'none'} stroke={active ? 'none' : '#a3a9af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        빠른 번역
        <span style={{ width: 44, height: 26, borderRadius: 13, background: active ? PRIMARY : '#dfe3e7', position: 'relative', transition: 'background .15s' }}>
          <span style={{ position: 'absolute', top: 3, left: active ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .15s' }} />
        </span>
      </button>
    </div>
  )
}

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
            <FastToolbar {...fast} />
          </div>
        )}
      </div>
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
