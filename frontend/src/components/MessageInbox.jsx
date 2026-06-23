import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'
const READ_KEY = 'tickjapan_read_msgs'
const HIDDEN_KEY = 'tickjapan_hidden_msgs'   // 사용자가 삭제(숨김)한 메시지 id

/* 읽은 메시지 id 집합 (localStorage) */
export function getReadIds() {
  try { return new Set(JSON.parse(localStorage.getItem(READ_KEY) || '[]')) } catch { return new Set() }
}
/* 삭제(숨김)한 메시지 id 집합 — 브로드캐스트라 서버 삭제 대신 기기별 숨김 */
export function getHiddenIds() {
  try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]')) } catch { return new Set() }
}
function markAllRead(ids) {
  try {
    const cur = getReadIds()
    ids.forEach(id => cur.add(id))
    localStorage.setItem(READ_KEY, JSON.stringify([...cur]))
  } catch {}
}
function hideIds(ids) {
  try {
    const cur = getHiddenIds()
    ids.forEach(id => cur.add(id))
    localStorage.setItem(HIDDEN_KEY, JSON.stringify([...cur]))
  } catch {}
}

function fmtDate(iso) {
  if (!iso) return ''
  return iso.slice(0, 10).replace(/-/g, '.')
}

/* 메시지함 (/messages) — 로그인 회원 전용 */
export default function MessageInbox() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [msgs, setMsgs] = useState(null)        // null=로딩, []=없음
  const [editMode, setEditMode] = useState(false)
  const [selected, setSelected] = useState(() => new Set())

  useEffect(() => {
    if (!user?.user_id) { setMsgs([]); return }
    fetch(`${API_URL}/messages/${user.user_id}`)
      .then(r => r.ok ? r.json() : [])
      .then(list => {
        const hidden = getHiddenIds()
        const visible = (Array.isArray(list) ? list : []).filter(m => !hidden.has(m.id))
        setMsgs(visible)
        markAllRead(visible.map(m => m.id))   // 본 메시지는 읽음 처리
      })
      .catch(() => setMsgs([]))
  }, [user?.user_id])

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  function deleteSelected() {
    if (selected.size === 0) return
    hideIds([...selected])
    setMsgs(prev => prev.filter(m => !selected.has(m.id)))
    setSelected(new Set())
    setEditMode(false)
  }
  function deleteAll() {
    if (!msgs?.length) return
    if (!window.confirm('메시지를 모두 삭제할까요?')) return
    hideIds(msgs.map(m => m.id))
    setMsgs([])
    setSelected(new Set())
    setEditMode(false)
  }

  const hasMsgs = user?.user_id && msgs && msgs.length > 0

  return (
    <>
      <PageSEO title="메시지함 - 틱재팬" description="운영자 메시지" path="/messages" />

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 14px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        뒤로
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 16px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text-strong)' }}>메시지함</h2>
        {hasMsgs && (
          <button onClick={() => { setEditMode(v => !v); setSelected(new Set()) }} style={{ background: 'none', border: 'none', fontSize: 13, color: editMode ? PRIMARY : 'var(--text-3)', fontWeight: editMode ? 600 : 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            {editMode ? '완료' : '편집'}
          </button>
        )}
      </div>

      {/* 편집 모드 툴바 */}
      {hasMsgs && editMode && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={deleteSelected} disabled={selected.size === 0} style={{ flex: 1, height: 40, borderRadius: 11, border: '1px solid var(--bd)', background: 'var(--surface)', color: selected.size ? '#d05050' : 'var(--text-3)', fontSize: 13, fontWeight: 600, cursor: selected.size ? 'pointer' : 'default', fontFamily: 'inherit' }}>
            선택 삭제{selected.size ? ` (${selected.size})` : ''}
          </button>
          <button onClick={deleteAll} style={{ flex: 1, height: 40, borderRadius: 11, border: '1px solid var(--bd)', background: 'var(--surface)', color: '#d05050', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            전체 삭제
          </button>
        </div>
      )}

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
          <p style={{ margin: 0, fontSize: 14 }}>받은 메시지가 없어요.</p>
        </div>
      )}

      {hasMsgs && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map(m => {
            const on = selected.has(m.id)
            return (
              <div key={m.id} onClick={() => editMode && toggleSelect(m.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'var(--surface)', border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, borderRadius: 16, padding: '15px 17px', cursor: editMode ? 'pointer' : 'default' }}>
                {editMode && (
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    {on && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </span>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>{m.title}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--text-3)', flexShrink: 0 }}>{fmtDate(m.created_at)}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{m.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
