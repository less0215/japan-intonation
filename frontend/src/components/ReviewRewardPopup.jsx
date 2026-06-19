import { track } from '../App'

/* 빠른 번역 무제한 이용권 안내 팝업
 * - 빠른 번역 일일 사용량을 모두 소진한 로그인 회원에게 노출
 * - App Store 후기 작성 → 캡처 → 이메일 전송 안내
 * - 후기 작성 버튼: UTM 태깅된 App Store write-review 링크 + GA4 이벤트
 */
const REVIEW_URL =
  'https://apps.apple.com/app/id6781296261?action=write-review' +
  '&utm_source=inapp&utm_medium=popup&utm_campaign=review_reward'

export default function ReviewRewardPopup({ onClose, onDismissForever }) {
  function handleReviewClick() {
    track('review_reward_click')
    window.open(REVIEW_URL, '_blank', 'noopener')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 320, padding: '24px 22px 14px', textAlign: 'center' }}
      >
        <button
          aria-label="닫기"
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 14, width: 26, height: 26, background: 'none', border: 'none', fontSize: 17, color: '#ccc', cursor: 'pointer' }}
        >✕</button>

        {/* ⚡ 아이콘 */}
        <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fff5e0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#e09b00" stroke="none">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>

        <p style={{ fontSize: 12.5, fontWeight: 600, color: '#e09b00', letterSpacing: '0.4px', margin: '0 0 3px' }}>한정 이벤트</p>
        <p style={{ fontSize: 19, fontWeight: 700, color: '#222', margin: '0 0 6px', lineHeight: 1.3, letterSpacing: '-0.4px' }}>빠른 번역 무제한 이용권</p>
        <p style={{ fontSize: 12.5, color: '#666', margin: '0 0 14px', lineHeight: 1.55 }}>
          App Store에 솔직한 후기를 남겨주시고<br />캡처본을 보내주시면 빠른 번역을<br />무제한 제공해 드려요.
        </p>

        {/* 3단계 안내 */}
        <div style={{ textAlign: 'left', background: '#f6f8fa', borderRadius: 12, padding: '12px 13px', marginBottom: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            'App Store에서 솔직한 후기 작성',
            '후기 화면 캡처와 휴대폰 번호를',
            <span key="3"><b style={{ fontWeight: 600 }}>mgz.less@tickjapan.com</b> 으로 전송</span>,
          ].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: '#5CA9CE', color: '#fff', fontSize: 11.5, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              <span style={{ fontSize: 12.5, color: '#333' }}>{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleReviewClick}
          style={{ width: '100%', height: 48, border: '1px solid rgba(255,255,255,0.14)', borderRadius: 14, background: 'linear-gradient(145deg, #6fb6d6 0%, #5CA9CE 55%, #4f96bb 100%)', color: '#fff', fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px', cursor: 'pointer', boxShadow: '0 8px 22px rgba(92,169,206,0.34), inset 0 1px 0 rgba(255,255,255,0.28)' }}
        >
          App Store 후기 작성하러 가기
        </button>
        <button
          onClick={onDismissForever}
          style={{ width: '100%', height: 32, marginTop: 2, background: 'none', border: 'none', fontSize: 12, color: '#bbb', cursor: 'pointer' }}
        >
          다시 보지 않기
        </button>
      </div>
    </div>
  )
}
