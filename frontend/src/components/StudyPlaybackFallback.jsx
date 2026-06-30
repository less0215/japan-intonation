/* 앱(iOS·Android WebView)에서 YouTube 재생이 막힐 때(오류 153 = Referer 없음 등) 영상 박스를 채우는 폴백 카드.
 * '웹에서 시청하기' → AppLauncher.openUrl 이 기기 기본 브라우저로 같은 영상을 열어줌(iOS=Safari, Android=Chrome 등).
 * 스터디 상세 플레이어(StudyVideoDemo)와 카테고리 상세 시트(ShadowingBrowse) 공용 → 문구·디자인 일원화. */
import { AppLauncher } from '@capacitor/app-launcher'

const PRIMARY = '#5CA9CE'
const WEB_STUDY_BASE = 'https://www.tickjapan.com/study-demo'  // 실제 원격 사이트(진짜 origin → 웹에서는 재생 정상)

export default function StudyPlaybackFallback({ vid }) {
  const openWeb = async () => { try { await AppLauncher.openUrl({ url: `${WEB_STUDY_BASE}?v=${vid}` }) } catch {} }
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 22, textAlign: 'center', background: 'linear-gradient(180deg,#15171b,#0c0d10)', color: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>앱에서는 이 영상 재생이 제한돼요</p>
          <p style={{ margin: '7px 0 0', fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.78)', wordBreak: 'keep-all' }}>웹에서 열면 자막·발음 그대로 끊김 없이 학습할 수 있어요.</p>
        </div>
      </div>
      <button onClick={openWeb}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 48, padding: '0 26px', borderRadius: 13, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 800, color: '#fff', background: 'linear-gradient(145deg,#6fb6d6,#5CA9CE 55%,#4f96bb)', boxShadow: `0 6px 18px ${PRIMARY}66` }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
        웹에서 시청하기
      </button>
    </div>
  )
}
