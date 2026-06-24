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
function FastToolbar({ active, locked, usedPct = 0, unlimited, resetSec = 0, onToggle, onUnlock, unlimitedLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%' }}>
      {/* 좌측: 사용량 소진 + 광고 해제 가능(앱) → '제한 풀기' 칩 버튼 (자동 팝업 X) */}
      {active && !unlimited && locked && onUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, background: 'var(--warning-tint)', border: '1px solid var(--warning)', borderRadius: 999, padding: '5px 11px 5px 9px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--warning)"><polygon points="8 6 8 18 18 12" /></svg>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--warning)' }}>무료 사용량 제한 풀기</span>
        </button>
      )}
      {/* 좌측: 사용량 표시 (활성 + 일반 회원, 제한 풀기 칩이 없을 때) */}
      {active && !unlimited && !(locked && onUnlock) && (
        <>
          <span style={{ width: 48, height: 5, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden', flexShrink: 0 }}>
            <span style={{ display: 'block', height: '100%', width: `${usedPct}%`, background: locked ? 'var(--warning)' : PRIMARY, borderRadius: 3 }} />
          </span>
          <span style={{ fontSize: 10.5, color: locked ? 'var(--warning)' : 'var(--text-3)' }}>
            {resetClock(resetSec)} 초기화 · <b style={{ fontWeight: 600, color: locked ? 'var(--warning)' : PRIMARY }}>{usedPct}%</b>
          </span>
        </>
      )}
      {active && unlimited && (
        <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 600 }}>{unlimitedLabel || '무제한 이용 중'}</span>
      )}
      {/* 우측: ⚡ 빠른 번역 + 스위치 */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={active}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: active ? PRIMARY : 'var(--text-2)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? PRIMARY : 'none'} stroke={active ? 'none' : 'var(--text-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        빠른 번역
        <span style={{ width: 44, height: 26, borderRadius: 13, background: active ? PRIMARY : 'var(--bd-2)', position: 'relative', transition: 'background .15s' }}>
          <span style={{ position: 'absolute', top: 3, left: active ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: 'var(--surface)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .15s' }} />
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
const DEBOUNCE_MS = 850

export default function SearchBar({ onAnalyze, loading, onTyping, onClear, fast, showCamera, onCamera }) {
  const [text, setText] = useState('')
  const timerRef = useRef(null)
  const lastSubmittedRef = useRef('')
  const galleryRef = useRef(null)
  const cameraRef = useRef(null)
  const [showPicker, setShowPicker] = useState(false)
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  // 사진 선택 → 부모(handlePhoto)로 전달. 같은 파일 재선택도 되도록 value 초기화
  function handleFile(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    setShowPicker(false)
    if (f) onCamera?.(f)
  }
  // 카메라 버튼: 모바일은 갤러리/카메라 선택 팝업, PC(카메라 없음)는 바로 파일창
  function openPhoto() {
    if (isMobile) setShowPicker(true)
    else galleryRef.current?.click()
  }

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
      <div className="search-box" style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="번역할 내용을 입력하세요"
          className="search-input"
          rows={6}
          style={{ minHeight: '42vh', fontSize: 18 }}
        />
        {/* 사진 번역 버튼 — 입력칸이 비어 있을 때만 노출. 타이핑하면 자연스럽게 사라짐 */}
        {showCamera && !text.trim() && !loading && (
          <>
            <input ref={galleryRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
            <button
              type="button"
              onClick={openPhoto}
              aria-label="사진으로 번역"
              style={{ position: 'absolute', top: 11, right: 11, width: 48, height: 48, borderRadius: 14, border: `1.5px solid ${PRIMARY}`, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, overflow: 'visible' }}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3.2" />
              </svg>
            </button>
          </>
        )}
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
        style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 17, padding: '17px 0' }}
      >
        {loading ? <span className="spinner" /> : '번역'}
      </button>

      {/* 모바일 사진 선택 — 갤러리/카메라 바텀시트 (PC는 안 뜸, 바로 파일창) */}
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--overlay)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '20px 16px calc(18px + env(safe-area-inset-bottom, 0px))', boxShadow: '0 -8px 30px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', textAlign: 'center', marginBottom: 16 }}>사진 가져오기</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="button" onClick={() => cameraRef.current?.click()} style={pickerBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3.2" /></svg>
                카메라로 촬영
              </button>
              <button type="button" onClick={() => galleryRef.current?.click()} style={pickerBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                갤러리에서 선택
              </button>
            </div>
            <button type="button" onClick={() => setShowPicker(false)} style={{ width: '100%', marginTop: 12, padding: '13px', borderRadius: 12, border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>취소</button>
          </div>
        </div>
      )}
    </form>
  )
}

const pickerBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '15px', borderRadius: 14, border: '1.5px solid var(--bd)', background: 'var(--surface-2)', color: 'var(--text-strong)', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }
