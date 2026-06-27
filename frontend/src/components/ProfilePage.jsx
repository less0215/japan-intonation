import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import ReferralCodeCard from './ReferralCodeCard'
import AdminMetrics from './AdminMetrics'
import AdminRevenue from './AdminRevenue'
import AdminLearning from './AdminLearning'

/* 프로필 탭 — 계정·문의·다운로드·로그아웃·회원탈퇴 */
const PRIMARY = '#5CA9CE'

function Row({ icon, label, color, onClick }) {
  const txt = color || 'var(--text-1)'
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 2px', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--bd, #f0f0f0)', fontSize: 13.5, color: txt, cursor: 'pointer', fontFamily: 'inherit' }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={color || PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={icon} /></svg>
      {label}
    </button>
  )
}

export default function ProfilePage({ user, fastUnlimited, planLabel, onLogout, onDeleteAccount, onLogin, onSubRefresh, isApp }) {
  const navigate = useNavigate()
  return (
    <>
      <PageSEO title="프로필 - 틱재팬" description="틱재팬 계정 관리" path="/profile" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 10px' }}>프로필</h2>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, border: '1px solid var(--bd)', borderRadius: 14, padding: 12, marginBottom: 10 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: PRIMARY, color: 'var(--on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{user.name?.[0] ?? '회'}</div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
              {user.name}
              {fastUnlimited && <span style={{ fontSize: 10, background: 'rgba(92,169,206,0.16)', color: PRIMARY, fontWeight: 700, borderRadius: 5, padding: '1px 6px', marginLeft: 6 }}>플러스</span>}
            </p>
            <p style={{ margin: '1px 0 0', fontSize: 11, color: fastUnlimited ? PRIMARY : 'var(--text-3)' }}>
              {fastUnlimited ? (planLabel || '플러스 이용 중') : '로그인됨'}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: '20px 16px', marginBottom: 10, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>로그인하고 더 편하게 이용하세요</p>
          <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>번역 저장·빠른 번역 등 회원 전용 기능을 사용할 수 있어요.</p>
          <button onClick={onLogin} style={{ width: '100%', height: 46, borderRadius: 12, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 14.5, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>로그인 / 회원가입</button>
        </div>
      )}

      {/* 프로 업그레이드 배너 — iOS 안티스티어링: 앱에선 외부 결제 유도 금지 */}
      {!fastUnlimited && !isApp && (
        <button onClick={() => navigate('/plans')} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', background: 'linear-gradient(135deg, #5CA9CE 0%, #4f96bb 100%)', border: 'none', borderRadius: 16, padding: '13px 16px', marginBottom: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
          <span style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--on-primary)"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: 'var(--on-primary)' }}>광고 제거 + 빠른 번역</span>
            <span style={{ display: 'block', fontSize: 12, color: '#eaf5fb', marginTop: 1 }}>버스 한 번 타는데 1,500원, 플러스는 하루 147원</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}

      {/* 관리자 전용 — 제휴 수익 대시보드 */}
      {user?.is_admin && <AdminMetrics />}
      {user?.is_admin && <AdminRevenue />}
      {user?.is_admin && <AdminLearning />}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 추천인 코드 — 메뉴 행, 탭하면 입력란 펼침(웹·앱 공통) */}
        <ReferralCodeCard user={user} fastUnlimited={fastUnlimited} onLogin={onLogin} onApplied={onSubRefresh} />
        <Row icon="M4 4h16v16H4z M4 6l8 6 8-6" label="문의하기" onClick={() => { window.location.href = 'mailto:mgz.less@tickjapan.com?subject=[틱재팬] 문의' }} />
        {!isApp && <Row icon="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" label="앱 다운로드" onClick={() => navigate('/download')} />}
        {user && <Row icon="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" label="로그아웃" color="var(--text-2)" onClick={onLogout} />}
      </div>

      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>개인정보처리방침</button>
          <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>이용약관</button>
          {user && <button onClick={onDeleteAccount} style={{ background: 'none', border: 'none', fontSize: 11, color: 'var(--danger)', cursor: 'pointer', fontFamily: 'inherit' }}>회원탈퇴</button>}
        </div>
      </div>
    </>
  )
}
