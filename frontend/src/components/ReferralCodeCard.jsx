import { useState } from 'react'

/* 추천인(인플루언서 협업) 코드 입력 → 플러스 1개월 무료 적용(1인 1회) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

const card = { border: '1px solid var(--bd)', borderRadius: 16, padding: 14, marginBottom: 8, background: 'var(--surface)' }
const title = { margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }

export default function ReferralCodeCard({ user, fastUnlimited, onLogin, onApplied }) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle')   // idle | loading | ok | err
  const [msg, setMsg] = useState('')

  // 이미 플러스/구독 이용 중이면 입력란 대신 안내
  if (fastUnlimited) {
    return (
      <div style={card}>
        <p style={title}>🎁 추천인 코드</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
          이미 플러스를 이용 중이에요. 추천인 코드는 구독이 없을 때 사용할 수 있어요.
        </p>
      </div>
    )
  }

  async function apply() {
    if (status === 'loading') return
    if (!user?.user_id) { onLogin?.(); return }
    const c = code.trim()
    if (!c) { setStatus('err'); setMsg('코드를 입력해 주세요.'); return }
    setStatus('loading'); setMsg('')
    try {
      const res = await fetch(`${API_URL}/referral/redeem`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id, code: c }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok && d.ok) {
        setStatus('ok'); setMsg('플러스 1개월이 적용됐어요! 🎉'); setCode('')
        onApplied?.()
      } else {
        setStatus('err'); setMsg(d.detail || '적용에 실패했어요. 코드를 확인해 주세요.')
      }
    } catch {
      setStatus('err'); setMsg('네트워크 오류예요. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <div style={card}>
      <p style={title}>🎁 추천인 코드</p>
      <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
        인플루언서에게 받은 코드를 입력하면 <b style={{ color: PRIMARY }}>플러스 1개월</b>이 무료로 적용돼요.
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); if (status === 'err') { setStatus('idle'); setMsg('') } }}
          onKeyDown={e => { if (e.key === 'Enter') apply() }}
          placeholder="코드 입력"
          autoCapitalize="characters" autoCorrect="off" spellCheck={false}
          style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 11, border: '1.5px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-strong)', fontSize: 14, padding: '0 13px', fontFamily: 'inherit', letterSpacing: 0.5 }}
        />
        <button
          onClick={apply}
          disabled={status === 'loading'}
          style={{ flexShrink: 0, height: 44, padding: '0 18px', borderRadius: 11, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 14, fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', fontFamily: 'inherit', opacity: status === 'loading' ? 0.6 : 1 }}
        >
          {status === 'loading' ? '적용 중…' : '적용'}
        </button>
      </div>
      {msg && (
        <p style={{ margin: '8px 2px 0', fontSize: 12, fontWeight: 500, color: status === 'ok' ? 'var(--success)' : 'var(--danger)' }}>
          {msg}
        </p>
      )}
    </div>
  )
}
