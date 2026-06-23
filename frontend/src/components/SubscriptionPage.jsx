import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'

const PRIMARY = '#5CA9CE'
// App 순환 참조 방지 — 가벼운 자체 트래킹
const track = (name, params = {}) => { try { window.gtag?.('event', name, params); window.__afLog?.(name, params) } catch {} }

/* 플랜 업그레이드 (/plans) — 무료/플러스/프로. 하루 N원 강조 + 앵커 비유 */
const PLANS = {
  monthly: {
    label: '월간',
    plus: { total: 8900,  per: 297, unit: '월' },
    pro:  { total: 19900, per: 663, unit: '월' },
  },
  yearly: {
    label: '연간',
    plus: { total: 89000,  per: 244, unit: '년', save: '2개월 무료' },
    pro:  { total: 199000, per: 545, unit: '년', save: '2개월 무료' },
  },
}

function Check({ color }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
}

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('yearly')
  const [notice, setNotice] = useState(null)
  const p = PLANS[period]

  function choose(plan) { track('subscribe_cta', { plan, period }); setNotice(plan) }

  return (
    <>
      <PageSEO title="플랜 업그레이드 - 틱재팬" description="광고 제거 + 빠른 번역. 하루 297원부터." path="/plans" />

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        프로필
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 2px 4px', color: 'var(--text-strong)' }}>광고 없이, 더 빠르게</h2>
      <p style={{ margin: '0 2px 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>아메리카노 두 잔 값으로 광고를 없애고 빠른 번역을 펑펑 쓰세요.</p>

      {/* 월/연 토글 */}
      <div style={{ display: 'flex', gap: 6, background: 'var(--surface-2)', borderRadius: 12, padding: 4, marginBottom: 16 }}>
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

      {/* 무료 — 충분히 좋다 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>무료</span>
          <span style={{ fontSize: 12, color: '#1d9e75', background: 'rgba(29,158,117,0.12)', padding: '3px 9px', borderRadius: 7, fontWeight: 500 }}>이대로도 충분해요</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '11px 0 0', display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, color: 'var(--text-2)' }}>
          {['일반 번역 무제한', '학습·라이브캠·저장 전부 그대로', '빠른 번역 — 광고 보고 충전', '광고가 함께 표시돼요'].map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Check color={i < 3 ? '#1d9e75' : 'var(--text-3)'} />{f}</li>
          ))}
        </ul>
      </div>

      {/* 플러스 (추천) */}
      <div style={{ position: 'relative', background: 'var(--surface)', border: `2px solid ${PRIMARY}`, borderRadius: 18, padding: '20px 18px 16px', marginBottom: 12 }}>
        <span style={{ position: 'absolute', top: -11, left: 18, background: PRIMARY, color: '#fff', fontSize: 11.5, fontWeight: 600, padding: '3px 12px', borderRadius: 8 }}>추천</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: PRIMARY }}>플러스</span>
          <span style={{ fontSize: 11.5, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '3px 9px', borderRadius: 7 }}>광고 제거 + 빠른번역</span>
        </div>
        <p style={{ margin: '12px 0 2px', fontSize: 31, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>하루 {p.plus.per}원</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)' }}>{p.plus.unit} ₩{p.plus.total.toLocaleString()}{p.plus.save && <span style={{ color: '#e0892a', marginLeft: 6 }}>· {p.plus.save}</span>}</p>
        <p style={{ margin: '5px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>☕ 아메리카노 두 잔 값으로 한 달 광고 없이</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {['광고 완전 제거', '빠른 번역 하루 200회', '교류회·클래스 등 이벤트 우선 참여'].map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-1)' }}><Check color={PRIMARY} /><b style={{ fontWeight: 500 }}>{f}</b></li>
          ))}
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-2)' }}><Check color={PRIMARY} />무료의 모든 기능 포함</li>
        </ul>
        <button onClick={() => choose('plus')} style={{ width: '100%', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 13, padding: '14px', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>플러스 시작하기 · 하루 {p.plus.per}원</button>
      </div>

      {/* 프로 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 18, padding: '18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>프로</span>
          <span style={{ fontSize: 11.5, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '3px 9px', borderRadius: 7 }}>무제한</span>
        </div>
        <p style={{ margin: '10px 0 2px', fontSize: 25, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>하루 {p.pro.per}원</p>
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-2)' }}>{p.pro.unit} ₩{p.pro.total.toLocaleString()}{p.pro.save && <span style={{ color: '#e0892a', marginLeft: 6 }}>· {p.pro.save}</span>}</p>
        <p style={{ margin: '5px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>🎬 영화 한 편 값으로 빠른 번역 무제한</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['플러스의 모든 혜택', '빠른 번역 무제한', '이벤트 우선 초대 (가장 먼저)', '신규 기능 우선 이용'].map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: i === 1 ? 'var(--text-1)' : 'var(--text-2)' }}><Check color="#1d9e75" />{i === 1 ? <b style={{ fontWeight: 500 }}>{f}</b> : f}</li>
          ))}
        </ul>
        <button onClick={() => choose('pro')} style={{ width: '100%', background: 'var(--surface-2)', color: 'var(--text-1)', border: '1px solid var(--bd)', borderRadius: 13, padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>프로 선택 · 하루 {p.pro.per}원</button>
      </div>

      <p style={{ margin: '4px 2px 0', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.6, textAlign: 'center' }}>
        구독은 App Store/Google Play 계정으로 결제·관리되며 언제든 해지할 수 있어요.
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
