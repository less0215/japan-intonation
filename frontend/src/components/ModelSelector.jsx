import { useState, useEffect } from 'react'

/* 빠른 번역 토글 (⚡) — 누르면 활성화, 아래 안내·사용량(%) 표시
 * - 기본 OFF = 기본 번역(2.5) / ON = 빠른 번역(3.1)
 * - 로그인 회원만 사용, 하루 사용량 제한(횟수는 숨기고 %로 표기)
 */
const PRIMARY = '#5CA9CE'

// 남은 초 → "N시간 M분" / "M분" 문자열
function fmtLeft(sec) {
  const s = Math.max(0, sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}시간 ${m}분`
  return `${Math.max(1, m)}분`
}

export default function ModelSelector({ active, locked, usedPct, unlimited, resetSec = 0, onToggle }) {
  // 한도 소진 시 충전(리셋)까지 카운트다운 — 서버가 준 남은 초 기준으로 1분마다 감소
  const [leftSec, setLeftSec] = useState(resetSec)
  useEffect(() => { setLeftSec(resetSec) }, [resetSec])
  useEffect(() => {
    if (!locked) return
    const t = setInterval(() => setLeftSec(v => Math.max(0, v - 60)), 60000)
    return () => clearInterval(t)
  }, [locked])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start', width: '100%' }}>
      {/* 토글 칩 */}
      <button
        onClick={onToggle}
        aria-pressed={active}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px',
          borderRadius: 17, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
          letterSpacing: '-0.2px',
          border: active ? '1px solid rgba(255,255,255,0.14)' : `1.5px solid ${PRIMARY}40`,
          background: active
            ? 'linear-gradient(145deg, #6fb6d6 0%, #5CA9CE 55%, #4f96bb 100%)'
            : '#fff',
          color: active ? '#fff' : '#357694',
          boxShadow: active ? '0 6px 16px rgba(92,169,206,0.32), inset 0 1px 0 rgba(255,255,255,0.28)' : 'none',
          transition: 'all .15s',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill={active ? '#fff' : 'none'} stroke={active ? 'none' : '#357694'} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
        빠른 번역
      </button>

      {/* 활성화 시 안내 + 사용량(%) */}
      {active && (
        <div style={{ width: '100%', maxWidth: 280 }}>
          {unlimited ? (
            <p style={{ margin: 0, fontSize: 11.5, color: PRIMARY, fontWeight: 700, lineHeight: 1.5, whiteSpace: 'nowrap' }}>
              ⚡ 무제한 이용 중 — 마음껏 사용하세요 !
            </p>
          ) : locked ? (
            <p style={{ margin: 0, fontSize: 11.5, color: '#c98a00', lineHeight: 1.5 }}>
              빠른 번역을 모두 사용했어요.<br />
              <b style={{ fontWeight: 700 }}>{fmtLeft(leftSec)} 후</b>에 다시 충전돼요.
            </p>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11.5, color: '#999' }}>오늘 빠른 번역 사용량</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: usedPct >= 80 ? '#c98a00' : PRIMARY }}>{usedPct}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: '#eee', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${usedPct}%`, borderRadius: 2, background: usedPct >= 80 ? '#e9a020' : PRIMARY, transition: 'width .2s' }} />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 11, color: '#bbb', lineHeight: 1.5 }}>
                더 빠르고 똑똑한 번역이에요. 하루 사용량 제한이 있어요.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
