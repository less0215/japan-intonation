import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'
import { track } from '../App'
import { PLANS } from './SubscriptionPage'   // 가격 단일 출처(SSOT) — 매출 전환 value 계산에 재사용

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

/* /billing/success — 토스 결제창에서 돌아온 뒤 빌링키 발급+결제+구독 저장 확정 */
export function BillingSuccess() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [sp] = useSearchParams()
  const [state, setState] = useState('loading')   // loading | done | error
  const [msg, setMsg] = useState('')
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    const authKey = sp.get('authKey')
    const customerKey = sp.get('customerKey')
    const plan = sp.get('plan')
    const period = sp.get('period')
    if (!authKey || !customerKey || !user?.user_id) { setState('error'); setMsg('결제 정보를 확인할 수 없어요.'); return }
    fetch(`${API_URL}/billing/confirm`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authKey, customerKey, user_id: user.user_id, plan, period }),
    })
      .then(async (r) => {
        if (!r.ok) { let d = '결제 처리에 실패했어요.'; try { const j = await r.json(); if (j?.detail) d = j.detail } catch {} ; throw new Error(d) }
        return r.json()
      })
      .then(() => {
        setState('done')
        const value = PLANS[period]?.[plan]?.total
        track('subscribe_success', { plan, period, value, currency: 'KRW' })   // GA4 + AppsFlyer(af_subscribe) + Pixel(Purchase)
      })
      .catch((e) => {
        setState('error'); setMsg(e.message || '결제 처리에 실패했어요.')
        track('subscribe_fail', { plan, period, reason: (e.message || '').slice(0, 80), stage: 'confirm' })
      })
  }, [])

  return (
    <>
      <PageSEO title="결제 완료 - 틱재팬" description="구독 결제 처리" path="/billing/success" />
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
        {state === 'loading' && (
          <>
            <span style={{ width: 26, height: 26, border: '3px solid var(--bd)', borderTopColor: PRIMARY, borderRadius: '50%', display: 'inline-block', animation: 'tjspin 0.7s linear infinite' }} />
            <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--text-2)' }}>결제를 확인하고 있어요…</p>
          </>
        )}
        {state === 'done' && (
          <>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(29,158,117,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>구독이 시작됐어요!</p>
            <p style={{ margin: '6px 0 18px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>이제 광고 없이 더 빠르게 이용하실 수 있어요.<br />감사합니다 :)</p>
            <button onClick={() => navigate('/')} style={{ height: 46, padding: '0 28px', border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>시작하기</button>
          </>
        )}
        {state === 'error' && (
          <>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>결제를 완료하지 못했어요</p>
            <p style={{ margin: '6px 0 18px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{msg}</p>
            <button onClick={() => navigate('/plans')} style={{ height: 46, padding: '0 28px', border: '1px solid var(--bd)', borderRadius: 12, background: 'var(--surface-2)', color: 'var(--text-1)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>다시 시도</button>
          </>
        )}
      </div>
      <style>{`@keyframes tjspin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}

/* /billing/fail — 결제창에서 취소·실패 */
export function BillingFail() {
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const message = sp.get('message') || '결제가 취소되었어요.'
  const firedRef = useRef(false)
  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    track('subscribe_fail', { plan: sp.get('plan') || '', period: sp.get('period') || '', reason: message.slice(0, 80), stage: 'gateway' })
  }, [])
  return (
    <>
      <PageSEO title="결제 실패 - 틱재팬" description="구독 결제 실패" path="/billing/fail" />
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>결제가 완료되지 않았어요</p>
        <p style={{ margin: '6px 0 18px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{message}</p>
        <button onClick={() => navigate('/plans')} style={{ height: 46, padding: '0 28px', border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>다시 시도</button>
      </div>
    </>
  )
}
