import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'
const READ_KEY = 'tickjapan_read_msgs'

/* 읽은 메시지 id 집합 (localStorage) */
export function getReadIds() {
  try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || '[]')) } catch { return new Set() }
}
function markAllRead(ids) {
  try {
    const cur = getReadIds()
    ids.forEach(id => cur.add(id))
    localStorage.setItem(READ_KEY, JSON.stringify([...cur]))
  } catch {}
}

function fmtDate(iso) {
  if (!iso) return ''
  const s = iso.slice(0, 10).replace(/-/g, '.')
  return s
}

/* 메시지함 (/messages) — 로그인 회원 전용 */
export default function MessageInbox() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [msgs, setMsgs] = useState(null)   // null=로딩, []=없음

  useEffect(() => {
    if (!user?.user_id) { setMsgs([]); return }
    fetch(`${API_URL}/messages/${user.user_id}`)
      .then(r => r.ok ? r.json() : [])
      .then(list => {
        setMsgs(Array.isArray(list) ? list : [])
        // 본 메시지는 읽음 처리 → 헤더 빨간 점 사라짐
        markAllRead((list || []).map(m => m.id))
      })
      .catch(() => setMsgs([]))
  }, [user?.user_id])

  return (
    <>
      <PageSEO title="메시지함 - 틱재팬" description="운영자 메시지" path="/messages" />

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 14px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        뒤로
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 2px 16px', color: 'var(--text-strong)' }}>메시지함</h2>

      {!user?.user_id && (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-2)' }}>
          <p style={{ margin: '0 0 14px', fontSize: 14 }}>로그인하면 메시지를 확인할 수 있어요.</p>
          <button onClick={() => navigate('/profile')} style={{ height: 44, padding: '0 24px', border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>로그인하러 가기</button>
        </div>
      )}

      {user?.user_id && msgs === null && (
        <p style={{ textAlign: 'center', padding: '40px 0', fontSize: 13, color: 'var(--text-3)' }}>불러오는 중…</p>
      )}

      {user?.user_id && msgs && msgs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-3)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, marginBottom: 10 }}><path d="M4 4h16v12H5.2L4 17.2V4z" /></svg>
          <p style={{ margin: 0, fontSize: 14 }}>아직 받은 메시지가 없어요.</p>
        </div>
      )}

      {user?.user_id && msgs && msgs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 16, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>{m.title}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-3)', flexShrink: 0 }}>{fmtDate(m.created_at)}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{m.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
