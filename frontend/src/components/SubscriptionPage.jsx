import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'

const PRIMARY = '#5CA9CE'
// App 순환 참조 방지 — 가벼운 자체 트래킹
const track = (name, params = {}) => { try { window.gtag?.('event', name, params); window.__afLog?.(name, params) } catch {} }

/* 플랜 업그레이드 (/plans) — 무료/플러스/프로. 미니멀 */
const PLANS = {
  monthly: { label: '월간', plus: { total: 8900,  per: 297, unit: '월' }, pro: { total: 19900, per: 663, unit: '월' } },
  yearly:  { label: '연간', plus: { total: 89000, per: 244, unit: '년', save: '2개월 무료' }, pro: { total: 199000, per: 545, unit: '년', save: '2개월 무료' } },
}

function Check({ color }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
}

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('yearly')
  const [notice, setNotice] = useState(null)
  const p = PLANS[period]

  function choose(plan) { track('subscribe_cta', { plan, period }); setNotice(plan) }

  return (
    <>
      <PageSEO title="플랜 업그레이드 - 틱재팬" description="광고 없이, 빠른 번역. 하루 244원부터." path="/plans" />

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 14px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        프로필
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 2px 14px', color: 'var(--text-strong)' }}>광고 없이, 더 빠르게</h2>

      {/* 월/연 토글 */}
      <div style={{ display: 'flex', gap: 6, background: 'var(--surface-2)', borderRadius: 12, padding: 4, marginBottom: 14 }}>
        {['monthly', 'yearly'].map(k => (
          <button key={k} onClick={() => setPeriod(k)} style={{
            flex: 1, textAlign: 'center', borderRadius: 9, padding: '9px 0', fontSize: 13, fontWeight: period === k ? 600 : 500,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: period === k ? 'var(--surface)' : 'transparent', color: period === k ? PRIMARY : 'var(--text-3)',
            boxShadow: period === k ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>
            {PLANS[k].label}{k === 'yearly' && <span style={{ fontSize: 10, color: '#e0892a', marginLeft: 5 }}>2개월 무료</span>}
          </button>
        ))}
      </div>

      {/* 무료 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>무료</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>₩0</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>번역·학습·라이브캠·저장까지 전부 무료로. 광고가 함께 표시돼요.</p>
      </div>

      {/* 플러스 (추천) */}
      <div style={{ position: 'relative', background: 'var(--surface)', border: `2px solid ${PRIMARY}`, borderRadius: 18, padding: '20px 18px 16px', marginBottom: 12 }}>
        <span style={{ position: 'absolute', top: -11, left: 18, background: PRIMARY, color: '#fff', fontSize: 11.5, fontWeight: 600, padding: '3px 12px', borderRadius: 8 }}>추천</span>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: PRIMARY }}>플러스</span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{p.plus.unit} ₩{p.plus.total.toLocaleString()}</span>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>하루 {p.plus.per}원</p>
        {p.plus.save && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#e0892a', fontWeight: 500 }}>{p.plus.save}</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />광고 완전 제거</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />빠른 번역 하루 200회 <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>· 사실상 무제한</span></li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />이벤트 우선 참여</li>
        </ul>
        <button onClick={() => choose('plus')} style={{ width: '100%', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 13, padding: '14px', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>플러스 시작하기</button>
      </div>

      {/* 프로 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 18, padding: '18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>프로</span>
          <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>{p.pro.unit} ₩{p.pro.total.toLocaleString()}</span>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>하루 {p.pro.per}원</p>
        {p.pro.save && <p style={{ margin: '2px 0 0', fontSize: 12, color: '#e0892a', fontWeight: 500 }}>{p.pro.save}</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: '11px 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['광고 완전 제거', '빠른 번역 무제한', '이벤트 우선 초대', '신규 기능 우선 이용'].map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-1)' }}><Check color="#1d9e75" />{f}</li>
          ))}
        </ul>
        <button onClick={() => choose('pro')} style={{ width: '100%', background: 'var(--surface-2)', color: 'var(--text-1)', border: '1px solid var(--bd)', borderRadius: 13, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>프로 선택</button>
      </div>

      <p style={{ margin: '4px 2px 0', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.6, textAlign: 'center' }}>
        App Store/Google Play 계정으로 결제·관리되며 언제든 해지할 수 있어요.
      </p>

      {/* 결제 연동 전 안내 모달 */}
      {notice && (
        <div onClick={() => setNotice(null)} style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(20,30,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 300, maxWidth: '90vw', background: 'var(--surface)', borderRadius: 18, padding: '22px 20px 16px', textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.28)' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={PRIMARY}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>곧 만나요!</p>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{notice === 'pro' ? '프로' : '플러스'} 구독은 출시 준비 중이에요.<br />오픈 알림을 보내드릴까요?</p>
            <button onClick={() => { track('subscribe_notify', { plan: notice, period }); setNotice('done') }} style={{ width: '100%', height: 46, border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {notice === 'done' ? '신청 완료 ✓' : '오픈 알림 받기'}
            </button>
            <button onClick={() => setNotice(null)} style={{ width: '100%', height: 36, marginTop: 4, background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>닫기</button>
          </div>
        </div>
      )}
    </>
  )
}
