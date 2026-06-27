import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageSEO from './PageSEO'
import { useUser } from '../context/UserContext'
import { track } from '../App'   // GA4 + AppsFlyer/Pixel 매핑 일원화
import { purchase as iapPurchase, restore as iapRestore, IAP_PRODUCTS } from '../iap'

const PRIMARY = '#5CA9CE'
const BUS_FARE = 1500   // 시내버스 한 번 요금 — 가격 앵커링용
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

// IAP 실패 코드 → 사용자 안내(괄호로 코드 노출 = 무한로딩 대신 원인 즉시 파악).
// no_product/product_timeout 이 뜨면 ASC 상품 미로드(유료 계약 미체결·상품 상태)임을 바로 알 수 있다.
const IAP_ERROR_HINT = {
  not_ready:        '결제를 시작하지 못했어요. 앱을 완전히 종료 후 다시 실행해 주세요. (not_ready)',
  no_product:       '상품 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요. (no_product)',
  product_timeout:  '상품 정보를 불러오지 못했어요. 네트워크 확인 후 다시 시도해 주세요. (product_timeout)',
  purchase_timeout: "결제가 완료되지 않았어요. 이미 결제됐다면 '구매 복원'을 눌러주세요. (purchase_timeout)",
}

/* 플랜 업그레이드 (/plans) — 무료/플러스/프로. 미니멀
 * 가격 단일 출처(SSOT) */
export const PLANS = {
  monthly: { label: '월간', plus: { total: 4400,  was: 8900,  per: 147, unit: '월' }, pro: { total: 19000, per: 633, unit: '월' } },
  yearly:  { label: '연간', plus: { total: 44000, was: 89000, per: 121, unit: '년', save: '2개월 무료' }, pro: { total: 190000, per: 521, unit: '년', save: '2개월 무료' } },
}

function Check({ color }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
}
function SoonBadge() {
  return <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--warning)', background: 'var(--warning-tint)', borderRadius: 5, padding: '1px 5px', flexShrink: 0 }}>개발 예정</span>
}

export default function SubscriptionPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [sp] = useSearchParams()
  const [period, setPeriod] = useState('monthly')
  const [notice, setNotice] = useState(null)   // 'login' | 'error' | 'useapp' | 'done' | 'restored' | 'norestore'
  const [errDetail, setErrDetail] = useState('')            // IAP 실패 코드(error 모달에서 원인 안내)
  const [purchasing, setPurchasing] = useState(null)        // 결제 진행 중인 플랜(앱 인앱결제)
  const lastChoice = useRef({ plan: null, period: 'monthly' })   // 직전 선택(plan/period) — waitlist·abandon에서 재사용
  const p = PLANS[period]

  // 플랜 화면 노출 — 구독 퍼널 시작점. source는 진입 경로(?from=profile|fast_limit|review|web_fast)
  useEffect(() => {
    track('plans_view', { source: sp.get('from') || 'direct', period, is_logged_in: !!user, is_app: isApp })
  }, [])   // 마운트 1회

  function closeNotice() {
    // 플랜 선택 후 뜬 안내 모달을 결제 없이 닫음 = 이탈
    if (notice) track('subscribe_abandon', { plan: lastChoice.current.plan, period: lastChoice.current.period, notice_type: notice })
    setNotice(null)
  }

  async function choose(plan) {
    console.log('[iap] choose() 클릭 —', { plan, period, isApp })   // 핸들러 진입 자체 확인용
    lastChoice.current = { plan, period }
    track('subscribe_cta', { plan, period, source: sp.get('from') || 'direct', is_logged_in: !!user, is_app: isApp })
    // 앱(iOS): RevenueCat 인앱 결제(StoreKit)
    if (isApp) {
      if (purchasing) return
      setPurchasing(plan)
      let r
      try {
        r = await iapPurchase(IAP_PRODUCTS[`${plan}-${period}`])
      } finally {
        setPurchasing(null)   // 성공·취소·실패·예외 모든 분기에서 '처리 중' 해제(무한로딩 방지)
      }
      if (r?.success) {
        try { localStorage.setItem('tickjapan_ad_free', '1') } catch {}
        window.dispatchEvent(new CustomEvent('tickjapan:iap-updated'))   // App.jsx가 권한 재확인 → 광고제거·무제한 반영
        track('subscribe_success', { plan, period, via: 'iap', source: sp.get('from') || 'direct', value: PLANS[period]?.[plan]?.total, currency: 'KRW' })
        setNotice('done')
      } else if (r?.cancelled) {
        track('subscribe_cancel', { plan, period, via: 'iap' })
      } else {
        track('subscribe_fail', { plan, period, via: 'iap', reason: r?.error || 'unknown' })
        setErrDetail(r?.error || '')
        setNotice('error')
      }
      return
    }
    // 웹: 구독은 앱(App Store 인앱결제)에서만 진행 — 앱 설치 안내
    setNotice('useapp')
  }

  // 구매 복원 (앱 — Apple 필수). 기기 변경/재설치 시 기존 구독 되살림
  async function restoreSub() {
    if (!isApp || purchasing) return
    setPurchasing('restore')
    const r = await iapRestore()
    setPurchasing(null)
    track('subscribe_restore', { result: r.anyActive ? 'ok' : 'none' })
    if (r.anyActive) {
      try { localStorage.setItem('tickjapan_ad_free', '1') } catch {}
      window.dispatchEvent(new CustomEvent('tickjapan:iap-updated'))
      setNotice('restored')
    } else {
      setNotice('norestore')
    }
  }

  return (
    <>
      <PageSEO title="플랜 업그레이드 - 틱재팬" description="광고 없이, 빠른 번역. 하루 121원부터." path="/plans" />

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
            {PLANS[k].label}{k === 'yearly' && <span style={{ fontSize: 10, color: 'var(--warning)', marginLeft: 5 }}>2개월 무료</span>}
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
          {p.plus.was && <span style={{ fontSize: 13, textDecoration: 'line-through', color: 'var(--text-3)' }}>{p.plus.unit} ₩{p.plus.was.toLocaleString()}</span>}
        </div>
        {/* 청구금액(실제 결제액)을 가장 크고 또렷하게 — Apple 3.1.2(c). 하루 환산가는 작은 부수 표기. */}
        <p style={{ margin: '8px 0 0', display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>₩{p.plus.total.toLocaleString()}</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)' }}>/ {p.plus.unit}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-3)' }}>하루 {p.plus.per}원꼴</span>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', margin: '8px 0 0' }}>
          {p.plus.was && <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--warning)', background: 'var(--warning-tint)', borderRadius: 6, padding: '2px 8px' }}>출시 할인 {Math.round((1 - p.plus.total / p.plus.was) * 100)}%</span>}
          <span style={{ fontSize: 11.5, fontWeight: 600, color: PRIMARY }}>첫 7일 무료</span>
          {p.plus.save && <span style={{ fontSize: 12, color: 'var(--warning)', fontWeight: 500 }}>· {p.plus.save}</span>}
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />광고 완전 제거</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />빠른 번역 하루 200회 <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>· 사실상 무제한</span></li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />사진 번역 하루 40회</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-1)' }}><Check color={PRIMARY} />이벤트 우선 참여</li>
        </ul>
        <button onClick={() => choose('plus')} disabled={!!purchasing} style={{ width: '100%', background: PRIMARY, color: '#fff', border: 'none', borderRadius: 13, padding: '14px', fontSize: 14.5, fontWeight: 600, cursor: purchasing ? 'default' : 'pointer', opacity: purchasing && purchasing !== 'plus' ? 0.6 : 1, fontFamily: 'inherit' }}>{purchasing === 'plus' ? '처리 중…' : '플러스 시작하기'}</button>
      </div>

      {/* 프로 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 18, padding: '18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>프로</span>
        </div>
        {/* 청구금액 최우선 — Apple 3.1.2(c). 하루 환산가는 부수 표기. */}
        <p style={{ margin: '8px 0 0', display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-strong)' }}>₩{p.pro.total.toLocaleString()}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)' }}>/ {p.pro.unit}</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-3)' }}>하루 {p.pro.per}원꼴</span>
        </p>
        {p.pro.save && <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--warning)', fontWeight: 500 }}>{p.pro.save}</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: '11px 0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['광고 완전 제거', '빠른 번역 무제한', '사진 번역 무제한', '이벤트 우선 초대', '신규 기능 우선 이용'].map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--text-1)' }}><Check color="var(--success)" />{f}</li>
          ))}
        </ul>
        <button onClick={() => choose('pro')} disabled={!!purchasing} style={{ width: '100%', background: 'var(--surface-2)', color: 'var(--text-1)', border: '1px solid var(--bd)', borderRadius: 13, padding: '13px', fontSize: 14, fontWeight: 600, cursor: purchasing ? 'default' : 'pointer', opacity: purchasing && purchasing !== 'pro' ? 0.6 : 1, fontFamily: 'inherit' }}>{purchasing === 'pro' ? '처리 중…' : '프로 선택'}</button>
      </div>

      {isApp ? (
        <div style={{ margin: '8px 2px 0', textAlign: 'center' }}>
          <button onClick={restoreSub} disabled={!!purchasing} style={{ background: 'none', border: 'none', color: PRIMARY, fontSize: 13, fontWeight: 600, cursor: purchasing ? 'default' : 'pointer', fontFamily: 'inherit', padding: '6px 0' }}>
            {purchasing === 'restore' ? '복원 중…' : '구매 복원'}
          </button>
          <p style={{ margin: '6px 0 0', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.6 }}>
            플러스는 첫 7일 무료 체험 후 자동으로 유료 구독으로 전환돼요(월 ₩4,400 · 연 ₩44,000). 무료 체험·구독 기간 종료 24시간 전까지 해지하지 않으면 자동 갱신·청구되며, 결제는 Apple ID에 청구돼요. 설정 → Apple ID → 구독에서 언제든 해지할 수 있어요.
          </p>
          <p style={{ margin: '5px 0 0', fontSize: 10.5 }}>
            <button onClick={() => navigate('/terms')} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 10.5, textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>이용약관</button>
            <span style={{ color: 'var(--text-3)' }}> · </span>
            <button onClick={() => navigate('/privacy')} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 10.5, textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>개인정보처리방침</button>
          </p>
        </div>
      ) : (
        <p style={{ margin: '4px 2px 0', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.6, textAlign: 'center' }}>
          구독은 앱에서 진행되며, 언제든 해지할 수 있어요.
        </p>
      )}

      {/* 안내 모달 — 로그인 필요 / 앱(웹에서) / 오류 */}
      {notice && (() => {
        const N = {
          login: { title: '로그인이 필요해요', body: '구독은 로그인 후 이용할 수 있어요.', primary: '로그인하러 가기', onPrimary: () => navigate('/profile') },
          useapp: { title: '앱에서 구독할 수 있어요', body: '구독은 앱에서 진행돼요. 앱을 설치하면 광고 없이 더 빠르게 이용할 수 있어요.', primary: '앱 다운로드', onPrimary: () => { closeNotice(); navigate('/download') } },
          done:  { title: '구독 완료!', body: '이제 광고 없이 빠르게 이용할 수 있어요. 감사해요 :)', primary: '확인', onPrimary: () => { closeNotice(); navigate('/') } },
          restored: { title: '구매 복원 완료', body: '기존 구독을 되살렸어요. 혜택이 다시 적용됩니다.', primary: '확인', onPrimary: () => { closeNotice(); navigate('/') } },
          norestore: { title: '복원할 구매가 없어요', body: '이 Apple ID로 구독한 내역을 찾지 못했어요.', primary: '확인', onPrimary: closeNotice },
          error: { title: '문제가 발생했어요', body: IAP_ERROR_HINT[errDetail] || '잠시 후 다시 시도해 주세요.', primary: '확인', onPrimary: closeNotice },
        }[notice] || { title: '안내', body: '', primary: '확인', onPrimary: closeNotice }
        return (
          <div onClick={closeNotice} style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(20,30,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: 300, maxWidth: '90vw', background: 'var(--surface)', borderRadius: 18, padding: '22px 20px 16px', textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.28)' }}>
              <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{N.title}</p>
              <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{N.body}</p>
              <button onClick={N.onPrimary} style={{ width: '100%', height: 46, border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{N.primary}</button>
              <button onClick={closeNotice} style={{ width: '100%', height: 36, marginTop: 4, background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>닫기</button>
            </div>
          </div>
        )
      })()}
    </>
  )
}
