import { useState, useEffect } from 'react'

/* 관리자 전용 — 메시지함(공지) 관리: 목록 + 회수/복구 + 고정/해제 (제목은 AdminSection이 제공) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'

export default function AdminMessages() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(0)   // 처리 중인 message_id

  function load() {
    if (!adminKey) return
    setLoading(true); setErr('')
    fetch(`${API_URL}/admin/messages?key=${encodeURIComponent(adminKey)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setRows).catch(() => setErr('불러오지 못했어요.')).finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load() }, [])

  async function setMsg(id, patch) {
    setBusy(id); setErr('')
    try {
      const res = await fetch(`${API_URL}/admin/message-set`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, message_id: id, ...patch }),
      })
      if (!res.ok) throw new Error()
      load()
    } catch { setErr('변경에 실패했어요.') } finally { setBusy(0) }
  }

  if (!adminKey) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 함께 열려요.</p>
  if (!rows) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{loading ? '불러오는 중…' : (err || '데이터 없음')}</p>

  const Badge = ({ text, color, bg }) => (
    <span style={{ fontSize: 10.5, fontWeight: 700, color, background: bg, borderRadius: 6, padding: '1px 6px' }}>{text}</span>
  )

  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 14, background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>메시지 <b style={{ color: 'var(--text-strong)', fontSize: 14 }}>{rows.length}</b>개 · 활성 {rows.filter(m => m.active).length}</span>
        <button onClick={load} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>
      {err && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--danger)' }}>{err}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map(m => (
          <div key={m.id} style={{ border: '1px solid var(--bd)', borderRadius: 10, padding: '10px 12px', background: 'var(--surface-2)', opacity: m.active ? 1 : 0.55 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 3 }}>
              {m.pinned && <Badge text="고정" color="#fff" bg={PRIMARY} />}
              {m.active ? <Badge text="활성" color="#1D9E75" bg="rgba(29,158,117,.12)" />
                        : <Badge text="회수됨" color="var(--text-3)" bg="var(--bd)" />}
              <span style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{m.audience === 'all' ? '전체' : `유저 ${m.audience}`} · #{m.id}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{m.title}</p>
            <p style={{ margin: '2px 0 8px', fontSize: 12, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.body}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <button disabled={busy === m.id} onClick={() => setMsg(m.id, { active: !m.active })}
                style={{ flex: 1, height: 32, borderRadius: 8, border: `1px solid ${m.active ? 'var(--danger)' : '#1D9E75'}`, background: 'transparent', color: m.active ? 'var(--danger)' : '#1D9E75', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {busy === m.id ? '…' : (m.active ? '회수' : '복구')}
              </button>
              <button disabled={busy === m.id} onClick={() => setMsg(m.id, { pinned: !m.pinned })}
                style={{ flex: 1, height: 32, borderRadius: 8, border: '1px solid var(--bd)', background: 'transparent', color: 'var(--text-2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {m.pinned ? '고정 해제' : '고정'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
