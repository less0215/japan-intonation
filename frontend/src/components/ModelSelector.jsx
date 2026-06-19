/* 번역 모델 선택기 (기본/빠른) — LLM 스타일 드롭다운
 * - 기본 번역: gemini-2.5-flash-lite (무제한)
 * - 빠른 번역: gemini-3.1-flash-lite (하루 제한)
 */
import { useState, useEffect, useRef } from 'react'

const PRIMARY = '#5CA9CE'

export default function ModelSelector({ model, onChange, fastRemaining, fastLimit }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const isFast = model === 'fast'
  const fastLocked = fastRemaining <= 0

  function pick(v) {
    if (v === 'fast' && fastLocked) return   // 제한 도달 시 선택 불가
    onChange(v)
    setOpen(false)
  }

  return (
    <div ref={ref} style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px',
          borderRadius: 16, background: `${PRIMARY}14`, border: `1px solid ${PRIMARY}40`,
          color: '#357694', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {isFast
            ? <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            : <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
        </svg>
        {isFast ? '빠른 번역' : '기본 번역'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 38, left: 0, zIndex: 30, width: 244,
          background: '#fff', border: '1px solid #ececec', borderRadius: 14,
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)', padding: 6,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {/* 기본 번역 */}
          <button onClick={() => pick('basic')} style={optStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
            </svg>
            <span style={{ flex: 1 }}>
              <span style={titleStyle}>기본 번역</span>
              <span style={descStyle}>안정적인 번역 · 무제한</span>
            </span>
            {!isFast && <CheckIcon />}
          </button>

          {/* 빠른 번역 */}
          <button onClick={() => pick('fast')} style={{ ...optStyle, cursor: fastLocked ? 'default' : 'pointer', opacity: fastLocked ? 0.6 : 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c98a00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            <span style={{ flex: 1 }}>
              <span style={{ ...titleStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
                빠른 번역
                <span style={{ fontSize: 10, fontWeight: 700, color: '#7a5400', background: '#fbeec9', borderRadius: 6, padding: '1px 6px' }}>NEW</span>
              </span>
              <span style={descStyle}>
                {fastLocked
                  ? '오늘 사용량을 다 썼어요 · 내일 다시'
                  : `더 빠르고 똑똑한 번역 · 오늘 ${fastRemaining}/${fastLimit}회`}
              </span>
            </span>
            {isFast ? <CheckIcon /> : (fastLocked && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ))}
          </button>
        </div>
      )}
    </div>
  )
}

const optStyle = {
  display: 'flex', alignItems: 'flex-start', gap: 10, textAlign: 'left',
  padding: '10px', border: 'none', background: 'none', borderRadius: 10,
  cursor: 'pointer', fontFamily: 'inherit', width: '100%',
}
const titleStyle = { display: 'block', fontSize: 13.5, fontWeight: 700, color: '#111' }
const descStyle = { display: 'block', fontSize: 11.5, color: '#999', marginTop: 2 }

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
