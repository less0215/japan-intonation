/* 리뷰 이벤트 팝업 (앱 전용)
 * - 로그인 유저가 앱을 충분히 써본 시점(누적 번역 8회쯤) 1회 노출
 * - 미니멀 디자인(별 없음). 리뷰 작성 → 스크린샷+번호를 메일로 보내면 플러스 1개월 지급
 * - 스토어 URL은 플랫폼별로 분기(현재 iOS만, 안드로이드 출시 시 Play 주소 추가) */
import { track } from '../App'

const PRIMARY = '#5CA9CE'
const REVIEW_EMAIL = 'mgz.less@gmail.com'

// iOS App Store 리뷰 작성 딥링크 (Android 출시 시 Play 주소로 분기)
const IOS_REVIEW_URL = 'https://apps.apple.com/app/id6781296261?action=write-review'

function storeReviewUrl() {
  const platform = window.Capacitor?.getPlatform?.()
  if (platform === 'android') return null   // TODO: Play 스토어 리뷰 주소 (안드로이드 출시 후)
  return IOS_REVIEW_URL
}

export default function ReviewEventPopup({ trigger, onClose }) {
  function writeReview() {
    const url = storeReviewUrl()
    track('review_prompt_cta', { trigger })   // GA4 + AppsFlyer(af_review_cta)
    if (url) {
      try { window.open(url, '_system') } catch { window.location.href = url }
    }
    onClose?.()
  }
  // CTA 없이 닫기(배경/X/다음에) = 이탈
  function dismiss() {
    track('review_prompt_dismiss', { trigger })
    onClose?.()
  }

  const Step = ({ n, children }) => (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: PRIMARY, color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>
      <span style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.45, whiteSpace: 'nowrap' }}>{children}</span>
    </div>
  )

  return (
    <div onClick={dismiss} style={{ position: 'fixed', inset: 0, zIndex: 6000, background: 'rgba(20,30,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: 356, maxWidth: '94vw', background: 'var(--surface)', borderRadius: 22, padding: '28px 24px 18px', boxShadow: '0 16px 48px rgba(0,0,0,0.28)' }}>
        <button onClick={dismiss} aria-label="닫기" style={{ position: 'absolute', top: 15, right: 15, width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'var(--surface-2)', color: 'var(--text-3)', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1, padding: 0 }}>✕</button>

        <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(92,169,206,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px auto 16px' }}>
          <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
        </div>

        <p style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--text-strong)', lineHeight: 1.35, letterSpacing: '-0.5px', whiteSpace: 'nowrap', textAlign: 'center' }}>광고 제거 + 빠른 번역 1개월</p>
        <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, textAlign: 'center' }}>앱스토어/플레이스토어에 후기 작성해 주시면 플러스 1개월 <b style={{ fontWeight: 600, color: 'var(--text-1)' }}>(8,900원 상당)</b> 적용해 드려요!</p>

        <div style={{ background: 'var(--surface-2)', borderRadius: 14, padding: '15px 15px 14px', marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Step n={1}>앱스토어/플레이스토어에 후기를 작성한 뒤</Step>
          <Step n={2}>리뷰 스크린샷과 휴대폰 번호를</Step>
          <Step n={3}><span style={{ color: PRIMARY, fontWeight: 600 }}>{REVIEW_EMAIL}</span> 으로 보내주세요</Step>
        </div>

        <button onClick={writeReview} style={{ width: '100%', height: 50, border: 'none', borderRadius: 14, background: PRIMARY, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          App Store에서 리뷰 쓰기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        </button>
        <button onClick={dismiss} style={{ width: '100%', height: 38, marginTop: 4, background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>다음에 할게요</button>
      </div>
    </div>
  )
}
