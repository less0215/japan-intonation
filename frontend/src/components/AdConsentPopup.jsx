import { useState } from 'react'

// 보상형 광고 시청 전 양해 팝업 (앱 전용)
// mode='enable'   : 빠른 번역을 처음 켤 때
// mode='unlock5h' : 5시간 사용량을 모두 소진했을 때 즉시 해제
export default function AdConsentPopup({ mode = 'enable', onWatch, onClose }) {
  const [loading, setLoading] = useState(false)

  const copy = mode === 'unlock5h'
    ? {
        body: (
          <>
            틱재팬을 계속 <b>무료</b>로 운영하기 위해<br />
            짧은 광고를 도입했어요<br />
            광고를 봐주시면 <b>5시간 기다리지 않고</b><br />
            <b>지금 바로</b> 빠른 번역을 풀어드릴게요
          </>
        ),
        primary: '광고 보고 지금 바로 켜기',
        secondary: '5시간 기다릴게요',
      }
    : {
        body: (
          <>
            틱재팬을 계속 <b>무료</b>로 운영하기 위해<br />
            짧은 광고를 도입했어요<br />
            광고를 봐주시면<br />
            <b>빠른 번역</b>을 바로 켜드릴게요
          </>
        ),
        primary: '광고 보고 빠른 번역 켜기',
        secondary: '다음에 할게요',
      }

  async function handleWatch() {
    if (loading) return
    setLoading(true)
    try { await onWatch?.() } finally { setLoading(false) }
  }

  return (
    <div style={ov} onClick={loading ? undefined : onClose}>
      <div style={card} onClick={(e) => e.stopPropagation()}>
        <div style={iconBox}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#5CA9CE">
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
        <p style={head}>광고 죄송합니다</p>
        <p style={body}>{copy.body}</p>
        <button style={primaryBtn} onClick={handleWatch} disabled={loading}>
          {loading ? (
            '광고 불러오는 중…'
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 6 }}>
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
              {copy.primary}
            </>
          )}
        </button>
        <button style={secondaryBtn} onClick={onClose} disabled={loading}>
          {copy.secondary}
        </button>
      </div>
    </div>
  )
}

const ov = {
  position: 'fixed', inset: 0, zIndex: 4000,
  background: 'rgba(20,30,40,0.45)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
}
const card = {
  width: 320, maxWidth: '90vw', background: '#fff', borderRadius: 20,
  padding: '26px 22px 16px', textAlign: 'center',
  boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
}
const iconBox = {
  width: 54, height: 54, borderRadius: 15, background: '#eef7fc',
  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px',
}
// 이모지(🙇)가 두부로 깨지지 않도록 이모지 폰트 fallback 명시
const head = {
  fontSize: 19, fontWeight: 600, color: '#1f2937', margin: '0 0 14px', letterSpacing: '-0.3px',
  fontFamily: "'Noto Sans KR', 'Apple Color Emoji', sans-serif",
}
const body = { fontSize: 13, color: '#666', lineHeight: 1.7, margin: '0 0 18px' }
// 버튼은 기본적으로 body 폰트를 상속하지 않으므로 font-family: inherit 필수 (한글 깨짐 방지)
const primaryBtn = {
  width: '100%', height: 50, border: '1px solid rgba(255,255,255,0.14)', borderRadius: 14,
  background: 'linear-gradient(145deg,#6fb6d6 0%,#5CA9CE 55%,#4f96bb 100%)',
  color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  boxShadow: '0 8px 22px rgba(92,169,206,0.34),inset 0 1px 0 rgba(255,255,255,0.28)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const secondaryBtn = {
  width: '100%', height: 38, marginTop: 2, background: 'none', border: 'none',
  fontSize: 12.5, color: '#bbb', cursor: 'pointer', fontFamily: 'inherit',
}
