import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import AdminRevenue from './AdminRevenue'

/* 프로필 탭 — 계정·문의·다운로드·로그아웃·회원탈퇴 */
const PRIMARY = '#5CA9CE'

function Row({ icon, label, color, onClick }) {
  const txt = color || 'var(--text-1, #333)'
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 2px', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--bd, #f0f0f0)', fontSize: 13.5, color: txt, cursor: 'pointer', fontFamily: 'inherit' }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color || PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={icon} /></svg>
      {label}
    </button>
  )
}

export default function ProfilePage({ user, fastUnlimited, onLogout, onDeleteAccount, onLogin, isApp }) {
  const navigate = useNavigate()
  return (
    <>
      <PageSEO title="프로필 - 틱재팬" description="틱재팬 계정 관리" path="/profile" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 10px' }}>프로필</h2>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, border: '1px solid var(--bd)', borderRadius: 14, padding: 12, marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: PRIMARY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{user.name?.[0] ?? '회'}</div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
              {user.name}
              {fastUnlimited && <span style={{ fontSize: 10, background: '#fff5e0', color: '#c98a00', borderRadius: 5, padding: '1px 5px', marginLeft: 6 }}>⚡무제한</span>}
            </p>
            <p style={{ margin: '1px 0 0', fontSize: 11, color: 'var(--text-3)' }}>로그인됨</p>
          </div>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 16px', marginBottom: 10, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eaf4fa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>로그인하고 더 편하게 이용하세요</p>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>번역 저장·빠른 번역 등 회원 전용 기능을 사용할 수 있어요.</p>
          <button onClick={onLogin} style={{ width: '100%', height: 46, borderRadius: 12, background: PRIMARY, color: '#fff', border: 'none', fontSize: 14.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>로그인 / 회원가입</button>
        </div>
      )}

      {/* 관리자 전용 — 제휴 수익 대시보드 */}
      {user?.is_admin && <AdminRevenue />}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Row icon="M4 4h16v16H4z M4 6l8 6 8-6" label="문의하기" onClick={() => { window.location.href = 'mailto:mgz.less@tickjapan.com?subject=[틱재팬] 문의' }} />
        {!isApp && <Row icon="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" label="앱 다운로드" onClick={() => navigate('/download')} />}
        {user && <Row icon="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" label="로그아웃" color="#888" onClick={onLogout} />}
      </div>

      <div style={{ textAlign: 'center', marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {user && <button onClick={onDeleteAccount} style={{ background: 'none', border: 'none', fontSize: 11.5, color: '#d05050', cursor: 'pointer', fontFamily: 'inherit' }}>회원탈퇴</button>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
          <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>개인정보처리방침</button>
          <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>이용약관</button>
        </div>
      </div>
    </>
  )
}
