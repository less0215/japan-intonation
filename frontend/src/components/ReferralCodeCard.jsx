import { useState } from 'react'

/* 추천인(인플루언서 협업) 코드 — 프로필 메뉴 행(row) 형태. 탭하면 입력란이 펼쳐짐. */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

const rowStyle = {
  display: 'flex', alignItems: 'center', gap: 11, padding: '12px 2px', width: '100%',
  textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid var(--bd, #f0f0f0)',
  fontSize: 13.5, color: 'var(--text-1)', cursor: 'pointer', fontFamily: 'inherit',
}

export default function ReferralCodeCard({ user, fastUnlimited, onLogin, onApplied }) {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle')   // idle | loading | ok | err
  const [msg, setMsg] = useState('')

  if (fastUnlimited) return null   // 이미 플러스/구독 중이면 노출 안 함

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
      if (res.ok && d.ok) { setStatus('ok'); setMsg('플러스 1개월이 적용됐어요! 🎉'); setCode(''); onApplied?.() }
      else { setStatus('err'); setMsg(d.detail || '적용에 실패했어요. 코드를 확인해 주세요.') }
    } catch {
      setStatus('err'); setMsg('네트워크 오류예요. 잠시 후 다시 시도해 주세요.')
    }
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={rowStyle}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8 M2 7h20v5H2z M12 21V7 M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        추천인 코드
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ marginLeft: 'auto', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: '10px 2px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={code}
              onChange={e => { setCode(e.target.value.toUpperCase()); if (status === 'err') { setStatus('idle'); setMsg('') } }}
              onKeyDown={e => { if (e.key === 'Enter') apply() }}
              placeholder="코드 입력"
              autoCapitalize="characters" autoCorrect="off" spellCheck={false}
              style={{ flex: 1, minWidth: 0, height: 42, borderRadius: 10, border: '1.5px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-strong)', fontSize: 14, padding: '0 12px', fontFamily: 'inherit', letterSpacing: 0.5 }}
            />
            <button onClick={apply} disabled={status === 'loading'}
              style={{ flexShrink: 0, height: 42, padding: '0 16px', borderRadius: 10, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 13.5, fontWeight: 600, cursor: status === 'loading' ? 'default' : 'pointer', fontFamily: 'inherit', opacity: status === 'loading' ? 0.6 : 1 }}>
              {status === 'loading' ? '적용 중…' : '적용'}
            </button>
          </div>
          {msg && <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 500, color: status === 'ok' ? 'var(--success)' : 'var(--danger)' }}>{msg}</p>}
        </div>
      )}
    </>
  )
}
