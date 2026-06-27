import { useState } from 'react'

/* 웹 무료 번역 일일 한도 도달 시 노출되는 안내 시트.
 * 밋밋한 에러 대신 "앱(광고 보고 무제한)·로그인"으로 자연스럽게 유도. */
const PRIMARY = '#5CA9CE'

export default function QuotaWall({ isLoggedIn, onDownload, onLogin, onClose }) {
  const [why, setWhy] = useState(false)

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ gap: 0, position: 'relative' }}>
        <div className="modal-handle" />

        {/* 닫기 */}
        <button onClick={onClose} aria-label="닫기" style={{
          position: 'absolute', top: 8, right: 10, width: 32, height: 32,
          border: 'none', background: 'transparent', color: 'var(--text-3)',
          fontSize: 22, lineHeight: 1, cursor: 'pointer', fontFamily: 'inherit',
        }}>×</button>

        {/* 아이콘 */}
        <div style={{
          width: 52, height: 52, borderRadius: 16, background: `${PRIMARY}1f`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0 14px',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
          </svg>
        </div>

        {/* 헤드·서브 */}
        <p style={{ fontSize: 18, fontWeight: 700, margin: '0 0 7px', color: 'var(--text-strong)' }}>
          오늘 무료 번역을 다 썼어요
        </p>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '0 0 16px', lineHeight: 1.6 }}>
          내일 다시 무료로 쓸 수 있어요. 지금 이어서 쓰려면 앱에서 <b style={{ fontWeight: 600, color: 'var(--text-1)' }}>광고를 보며 무제한</b>으로 이용하세요.
        </p>

        {/* 주 CTA — 앱 다운로드 */}
        <button onClick={onDownload} style={{
          width: '100%', height: 50, borderRadius: 14, border: 'none',
          background: 'linear-gradient(145deg,#6fb6d6 0%,#5CA9CE 55%,#4f96bb 100%)',
          color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 8px 20px rgba(92,169,206,0.35)',
        }}>
          앱 다운로드하고 계속하기
        </button>

        {/* 보조 CTA — 게스트는 로그인 유도(웹 로그인 한도가 더 큼) */}
        {!isLoggedIn && (
          <button onClick={onLogin} style={{
            width: '100%', height: 44, marginTop: 9, borderRadius: 12,
            border: '1px solid var(--bd)', background: 'var(--surface)',
            color: 'var(--text-1)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            로그인하고 오늘 더 받기
          </button>
        )}

        {/* 왜 한도? — 정직한 설명 */}
        <button onClick={() => setWhy(v => !v)} style={{
          margin: '14px auto 0', display: 'block', background: 'none', border: 'none',
          color: 'var(--text-3)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          왜 한도가 있나요? {why ? '▲' : '▼'}
        </button>
        {why && (
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.65 }}>
            번역에 쓰이는 AI에는 비용이 들어요. 그래서 웹 무료는 하루 일정 횟수로 두고, 더 필요하면 앱(광고 시청)이나 플러스 구독으로 이어갈 수 있게 했습니다. 너른 양해 부탁드려요.
          </p>
        )}
      </div>
    </div>
  )
}
