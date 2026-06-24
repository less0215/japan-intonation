/* 빠른 번역 한도 도달 시 플러스 업셀 팝업 (앱: 광고 옵션 포함 / 웹: 플러스만)
 * - onPlus: 플러스 무제한(가격표로) / onWatchAd: 광고 보고 더 쓰기(앱 전용, 없으면 미표시) / onClose: 닫기 */
const PRIMARY = '#5CA9CE'

export default function FastUpsellPopup({ onPlus, onWatchAd, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(20,30,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: 308, maxWidth: '90vw', background: 'var(--surface)', borderRadius: 18, padding: '24px 22px 14px', textAlign: 'center', boxShadow: '0 14px 44px rgba(0,0,0,0.22)' }}
      >
        <div style={{ width: 54, height: 54, borderRadius: 15, background: 'rgba(92,169,206,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
          <svg width="27" height="27" viewBox="0 0 24 24" fill={PRIMARY} stroke="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        </div>
        <p style={{ margin: '0 0 9px', fontSize: 17, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.4 }}>빠른 번역, 무제한 사용도 가능해요</p>
        <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.65, color: 'var(--text-2)' }}>빠른 번역은 서버 부하를 줄이기 위해 사용량이 정해져 있어요. 5시간마다 사용량이 채워집니다.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <button onClick={onPlus} style={{ width: '100%', border: 'none', borderRadius: 13, background: PRIMARY, color: '#fff', padding: 14, fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            플러스 무제한 · 7일 무료
          </button>
          {onWatchAd && (
            <button onClick={onWatchAd} style={{ width: '100%', border: '1px solid var(--bd)', borderRadius: 13, background: 'transparent', color: 'var(--text-2)', padding: 13, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              광고 보고 더 쓰기
            </button>
          )}
        </div>
        <button onClick={onClose} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 12.5, padding: '14px 0 2px', cursor: 'pointer', fontFamily: 'inherit' }}>닫기</button>
      </div>
    </div>
  )
}
