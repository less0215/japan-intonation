import { useNavigate } from 'react-router-dom'

/* 웹 전역 푸터 — 전자상거래법 신원정보 표시(웹 전용).
 * 앱(Capacitor)에서는 렌더 안 함(App.jsx에서 !isApp 조건). 다크모드 토큰 사용.
 * ⚠️ 사업자등록증 기준. 전화번호·통신판매업 신고번호는 확정 후 채울 것. */
const BIZ = {
  company: '틱재팬',
  ceo: '정봉준',
  bizNo: '582-45-01235',
  // 통신판매업 신고번호 — 신고 후 기입 (예: '제2026-인천중구-XXXX호')
  mailOrderNo: '신고 준비 중',
  address: '인천광역시 중구 찬들로 141, 530동 1902호',
  // 고객센터 전화 — 유선/070/0505/대표번호/휴대폰 (확정 후 기입)
  tel: '',
  email: 'mgz.less@gmail.com',
  privacyOfficer: '정봉준',
  host: 'Vercel Inc.',
}

export default function SiteFooter() {
  const navigate = useNavigate()
  const dot = <span style={{ color: 'var(--text-3)', margin: '0 6px' }}>·</span>

  return (
    <footer style={{ borderTop: '1px solid var(--bd)', marginTop: 28, padding: '20px 4px 8px', fontSize: 11.5, color: 'var(--text-3)', lineHeight: 1.9 }}>
      {/* 약관/정책 링크 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 12 }}>
        <button onClick={() => navigate('/terms')} style={linkBtn}>이용약관</button>
        <button onClick={() => navigate('/privacy')} style={{ ...linkBtn, fontWeight: 700, color: 'var(--text-2)' }}>개인정보처리방침</button>
      </div>

      {/* 사업자 정보 */}
      <div style={{ color: 'var(--text-3)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-2)', marginBottom: 2 }}>{BIZ.company}</div>
        <div>대표자 {BIZ.ceo}{dot}사업자등록번호 {BIZ.bizNo}</div>
        <div>통신판매업신고 {BIZ.mailOrderNo}</div>
        <div>주소 {BIZ.address}</div>
        <div>
          {BIZ.tel && <>고객센터 {BIZ.tel}{dot}</>}
          <a href={`mailto:${BIZ.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{BIZ.email}</a>
        </div>
        <div>개인정보보호책임자 {BIZ.privacyOfficer}{dot}호스팅 {BIZ.host}</div>
      </div>

      <div style={{ marginTop: 10, color: 'var(--text-3)' }}>© 2026 {BIZ.company}. All rights reserved.</div>
    </footer>
  )
}

const linkBtn = { background: 'none', border: 'none', padding: 0, fontFamily: 'inherit', fontSize: 11.5, color: 'var(--text-3)', cursor: 'pointer' }
