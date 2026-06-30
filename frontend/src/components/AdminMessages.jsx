import { useState, useEffect } from 'react'

/* 관리자 전용 — 메시지함(공지) 관리: 새 공지 발송 + 목록/회수·복구/고정 (제목은 AdminSection이 제공) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'
const PHONE_STORE = 'tickjapan_admin_phone'

/* 쉐도잉 출시 공지(맞춤법 검수본) — '채우기' 한 번으로 폼에 로드 */
const LAUNCH = {
  title: '일본어 공부, TED 쉐도잉으로 재밌게 공부해 봐요!',
  body: `Why - 왜 하필 TED 쉐도잉인가요?
TED 강연은 짧고, 유익합니다. 쉐도잉의 핵심은 반복인데, TED는 분량이 적당해 반복하기가 좋습니다.
또한 어려운 표현이 적은 편입니다. 연사들은 불특정 다수를 쉽게 이해시키기 위해서 대부분 쉬운 표현을 사용합니다.

How - 어떻게 공부해야 하나요?
1. 처음에는 한국 영상 보듯이 그냥 보세요
2. 그리고 해당 영상이 재밌다면 한 문장씩 뜯어보세요. ("왜 이 문장이 이런 한국어로 번역됐을까?" 고민하며 문장을 뜯으면 도움이 되더라고요!)
3. 문장이 이해가 됐다면, 인토네이션을 신경 써가며 따라 해 보세요

위 과정을 반복하다 보면, 본인이 어떤 부분에 약한지를 알 수 있게 됩니다. 약한 부분을 알았다면, 해당 부분을 다른 것보다 조금 더 많이 연습하면 됩니다.

지금 입문 영상 한 편을 무료로 공개해 놨어요. 영상 길이는 약 5분이기 때문에 입문용으로 딱입니다! 이 영상을 통해 TED 쉐도잉을 경험해 보세요!

📅 7월 1일(수)부터 TED 강연 100편 + 앱에서 바로 시청! (TED 강연은 지속 업데이트 예정)`,
  cta_label: '입문 쉐도잉 영상 보기 (무료)',
  cta_target: '/study-demo?v=ldybnuFxdiQ',
  audience: 'all',
}
const EMPTY = { title: '', body: '', cta_label: '', cta_target: '', audience: 'all' }

export default function AdminMessages() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(0)   // 처리 중인 message_id
  // 새 공지 작성/발송
  const [phone, setPhone] = useState(() => { try { return localStorage.getItem(PHONE_STORE) || '' } catch { return '' } })
  const [f, setF] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState('')

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

  async function send() {
    if (!f.title.trim() || !f.body.trim()) { setErr('제목과 내용을 입력해 주세요.'); return }
    if (!phone.trim()) { setErr('관리자 전화번호를 입력해 주세요.'); return }
    setSending(true); setErr(''); setSent('')
    try {
      const res = await fetch(`${API_URL}/admin/send-message`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_phone: phone.trim(), key: adminKey,
          title: f.title.trim(), body: f.body,
          audience: (f.audience.trim() || 'all'),
          cta_label: f.cta_label.trim() || null,
          cta_target: f.cta_target.trim() || null,
        }),
      })
      if (!res.ok) throw new Error()
      const d = await res.json()
      try { localStorage.setItem(PHONE_STORE, phone.trim()) } catch {}
      setSent(`발송 완료! (#${d.id} · 대상 ${d.audience === 'all' ? '전체 회원' : d.audience})`)
      setF(EMPTY)
      load()
    } catch { setErr('발송에 실패했어요. 관리자 전화번호·키를 확인해 주세요.') } finally { setSending(false) }
  }

  if (!adminKey) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 함께 열려요.</p>

  const inp = { width: '100%', marginBottom: 6, padding: '0 11px', height: 38, borderRadius: 9, border: '1px solid var(--bd)', background: 'var(--bg)', color: 'var(--text-1)', fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }
  const Badge = ({ text, color, bg }) => (
    <span style={{ fontSize: 10.5, fontWeight: 700, color, background: bg, borderRadius: 6, padding: '1px 6px' }}>{text}</span>
  )

  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 14, background: 'var(--surface)' }}>
      {/* 새 공지 보내기 */}
      <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--bd)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-strong)' }}>새 공지 보내기</span>
          <button onClick={() => { setF(LAUNCH); setSent('') }} style={{ fontSize: 11, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>쉐도잉 출시 공지 채우기</button>
        </div>
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="관리자 전화번호 (010-...)" style={inp} />
        <input value={f.title} onChange={e => setF({ ...f, title: e.target.value })} placeholder="제목" style={inp} />
        <textarea value={f.body} onChange={e => setF({ ...f, body: e.target.value })} placeholder="내용" rows={6}
          style={{ ...inp, height: 'auto', minHeight: 110, padding: '9px 11px', resize: 'vertical', lineHeight: 1.5 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={f.cta_label} onChange={e => setF({ ...f, cta_label: e.target.value })} placeholder="CTA 라벨(선택)" style={{ ...inp, flex: 1 }} />
          <input value={f.cta_target} onChange={e => setF({ ...f, cta_target: e.target.value })} placeholder="CTA 경로 /study-demo?v=…" style={{ ...inp, flex: 1 }} />
        </div>
        <input value={f.audience} onChange={e => setF({ ...f, audience: e.target.value })} placeholder="대상: all(전체) 또는 user_id" style={inp} />
        {sent && <p style={{ margin: '2px 0 8px', fontSize: 12, color: '#1D9E75', fontWeight: 600 }}>{sent}</p>}
        <button onClick={send} disabled={sending} style={{ width: '100%', height: 44, borderRadius: 11, border: 'none', background: PRIMARY, color: '#fff', fontSize: 13.5, fontWeight: 700, cursor: sending ? 'default' : 'pointer', fontFamily: 'inherit', opacity: sending ? 0.6 : 1 }}>
          {sending ? '발송 중…' : '전 회원에게 발송'}
        </button>
        <p style={{ margin: '7px 0 0', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.55 }}>· 대상 <b>all</b> = 기존 + 신규 가입 회원 모두 메시지함에서 보게 돼요.<br />· CTA 경로는 앱 내부 경로(<b>/</b>로 시작)만 동작해요(외부 URL ✕).</p>
      </div>

      {/* 보낸 공지 관리 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>메시지 <b style={{ color: 'var(--text-strong)', fontSize: 14 }}>{rows ? rows.length : 0}</b>개 · 활성 {rows ? rows.filter(m => m.active).length : 0}</span>
        <button onClick={load} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>
      {err && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--danger)' }}>{err}</p>}
      {!rows ? <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{loading ? '불러오는 중…' : '데이터 없음'}</p> : (
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
      )}
    </div>
  )
}
