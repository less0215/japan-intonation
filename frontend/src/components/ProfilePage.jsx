import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'

/* 프로필 탭 — 계정·무제한 받기·문의·다운로드·로그아웃·회원탈퇴 */
const PRIMARY = '#5CA9CE'

function Row({ icon, label, color = '#333', onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 2px', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f0f0f0', fontSize: 13.5, color, cursor: 'pointer', fontFamily: 'inherit' }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color === '#333' ? PRIMARY : color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={icon} /></svg>
      {label}
    </button>
  )
}

export default function ProfilePage({ user, fastUnlimited, onReviewReward, onLogout, onDeleteAccount, onLogin, isApp }) {
  const navigate = useNavigate()
  return (
    <>
      <PageSEO title="프로필 - 틱재팬" description="틱재팬 계정 관리" path="/profile" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 14px' }}>프로필</h2>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, border: '1px solid #eaecef', borderRadius: 14, padding: 12, marginBottom: 16 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: PRIMARY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{user.name?.[0] ?? '회'}</div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
              {user.name}
              {fastUnlimited && <span style={{ fontSize: 10, background: '#fff5e0', color: '#c98a00', borderRadius: 5, padding: '1px 5px', marginLeft: 6 }}>⚡무제한</span>}
            </p>
            <p style={{ margin: '1px 0 0', fontSize: 11, color: '#9aa0a6' }}>로그인됨</p>
          </div>
        </div>
      ) : (
        <button onClick={onLogin} style={{ width: '100%', height: 48, borderRadius: 13, background: PRIMARY, color: '#fff', border: 'none', fontSize: 15, fontWeight: 500, cursor: 'pointer', marginBottom: 16, fontFamily: 'inherit' }}>로그인 / 회원가입</button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Row icon="M13 2L3 14h7l-1 8 10-12h-7l1-8z" label="빠른 번역 무제한 받기" color={PRIMARY} onClick={onReviewReward} />
        <Row icon="M4 4h16v16H4z M4 6l8 6 8-6" label="문의하기" onClick={() => { window.location.href = 'mailto:mgz.less@tickjapan.com?subject=[틱재팬] 문의' }} />
        {!isApp && <Row icon="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" label="앱 다운로드" onClick={() => navigate('/download')} />}
        {user && <Row icon="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" label="로그아웃" color="#888" onClick={onLogout} />}
      </div>

      <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {user && <button onClick={onDeleteAccount} style={{ background: 'none', border: 'none', fontSize: 11.5, color: '#d05050', cursor: 'pointer', fontFamily: 'inherit' }}>회원탈퇴</button>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', fontSize: 11, color: '#b3b8bd', cursor: 'pointer', fontFamily: 'inherit' }}>개인정보처리방침</button>
          <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', fontSize: 11, color: '#b3b8bd', cursor: 'pointer', fontFamily: 'inherit' }}>이용약관</button>
        </div>
      </div>
    </>
  )
}
