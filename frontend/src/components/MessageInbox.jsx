import { useState, useEffect, useRef } from 'react'
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
function writeSet(key, set) {
  try { localStorage.setItem(key, JSON.stringify([...set])) } catch {}
}
function markRead(ids) {
  const cur = getReadIds(); ids.forEach(id => cur.add(id)); writeSet(READ_KEY, cur)
}
function hideIds(ids) {
  const cur = getHiddenIds(); ids.forEach(id => cur.add(id)); writeSet(HIDDEN_KEY, cur)
}

/* 이메일식 날짜: 오늘/어제/YYYY.MM.DD */
function fmtDate(iso) {
  if (!iso) return ''
  const ymd = iso.slice(0, 10)
  try {
    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const y = new Date(now); y.setDate(now.getDate() - 1)
    const yest = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`
    if (ymd === today) return '오늘'
    if (ymd === yest) return '어제'
  } catch {}
  return ymd.replace(/-/g, '.')
}
/* 접힌 상태 미리보기 — 본문 첫 줄 일부 */
function preview(body) {
  const oneLine = (body || '').replace(/\s+/g, ' ').trim()
  return oneLine.length > 46 ? oneLine.slice(0, 46) + '…' : oneLine
}

/* 메시지함 (/messages) — 로그인 회원 전용, 이메일식 UX */
export default function MessageInbox() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [msgs, setMsgs] = useState(null)              // null=로딩, []=없음
  const [newIds, setNewIds] = useState(() => new Set())   // 이번 방문 시점의 '새 메시지'
  const [expanded, setExpanded] = useState(() => new Set())
  const [editMode, setEditMode] = useState(false)
  const [selected, setSelected] = useState(() => new Set())
  const [tab, setTab] = useState('all')                   // all | unread | read
  const [unreadSnap, setUnreadSnap] = useState(() => new Set())  // 진입 시점 '안 읽음' 스냅샷(읽는 중 사라짐 방지)
  const initedRef = useRef(null)   // StrictMode 이중 실행/재렌더 가드 (markRead 부작용 보호)

  useEffect(() => {
    if (!user?.user_id) { setMsgs([]); return }
    if (initedRef.current === user.user_id) return
    initedRef.current = user.user_id
    fetch(`${API_URL}/messages/${user.user_id}`)
      .then(r => r.ok ? r.json() : [])
      .then(list => {
        const hidden = getHiddenIds(), read = getReadIds()
        const visible = (Array.isArray(list) ? list : []).filter(m => !hidden.has(m.id))
        const fresh = new Set(visible.filter(m => !read.has(m.id)).map(m => m.id))
        setMsgs(visible)
        setNewIds(fresh)
        setUnreadSnap(new Set(fresh))   // 탭 분류용 스냅샷(읽어도 이번 세션엔 그 탭에 남게 — 읽는 중 사라짐 방지)
        setExpanded(new Set())       // 모두 접힌 채 시작 — 탭해서 펼치면(또는 편집모드에서 선택) 읽음 처리(이메일식)
      })
      .catch(() => setMsgs([]))
  }, [user?.user_id])

  // 읽음 처리(localStorage 영구) + NEW 배지·점 즉시 해제
  function markReadLive(ids) {
    if (!ids.length) return
    markRead(ids)
    setNewIds(prev => { const n = new Set(prev); ids.forEach(i => n.delete(i)); return n })
  }
  function toggleExpand(id) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else { next.add(id); markReadLive([id]) }   // 펼쳐서 읽으면 읽음 처리
      return next
    })
  }
  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  function expandAll() { setExpanded(new Set(msgs.map(m => m.id))) }
  function collapseAll() { setExpanded(new Set()) }
  // 선택(단일/다중) 읽음 처리 — 편집 모드 유지(이어서 더 처리 가능)
  function readSelected() {
    if (selected.size === 0) return
    markReadLive([...selected])
    setSelected(new Set())
  }
  function toggleSelectAll() {
    const all = msgs && msgs.length > 0 && selected.size >= msgs.length
    setSelected(all ? new Set() : new Set((msgs || []).map(m => m.id)))
  }
  function deleteSelected() {
    if (selected.size === 0) return
    hideIds([...selected])
    setMsgs(prev => prev.filter(m => !selected.has(m.id)))
    setSelected(new Set()); setEditMode(false)
  }
  function deleteAll() {
    if (!msgs?.length) return
    if (!window.confirm('메시지를 모두 삭제할까요?')) return
    hideIds(msgs.map(m => m.id))
    setMsgs([]); setSelected(new Set()); setEditMode(false)
  }

  const hasMsgs = user?.user_id && msgs && msgs.length > 0
  const allExpanded = hasMsgs && expanded.size >= msgs.length
  const allSelected = hasMsgs && selected.size >= msgs.length
  const unreadCount = hasMsgs ? msgs.filter(m => unreadSnap.has(m.id)).length : 0
  const tabFiltered = hasMsgs ? msgs.filter(m =>
    tab === 'all' ? true : tab === 'unread' ? unreadSnap.has(m.id) : !unreadSnap.has(m.id)) : []

  return (
    <>
      <PageSEO title="메시지함 - 틱재팬" description="운영자 메시지" path="/messages" />

      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 14px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        뒤로
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--text-strong)' }}>메시지함</h2>
        {hasMsgs && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {!editMode && (
              <button onClick={allExpanded ? collapseAll : expandAll} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--text-3)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                {allExpanded ? '모두 접기' : '모두 펼치기'}
              </button>
            )}
            <button onClick={() => { setEditMode(v => !v); setSelected(new Set()) }} style={{ background: 'none', border: 'none', fontSize: 13, color: editMode ? PRIMARY : 'var(--text-3)', fontWeight: editMode ? 600 : 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              {editMode ? '완료' : '편집'}
            </button>
          </div>
        )}
      </div>

      {/* 편집 모드 툴바 — 선택(단일/다중) → 읽음 처리 / 삭제 */}
      {hasMsgs && editMode && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={readSelected} disabled={selected.size === 0} style={{ flex: 1, height: 40, borderRadius: 11, border: `1px solid ${selected.size ? PRIMARY : 'var(--bd)'}`, background: selected.size ? PRIMARY : 'var(--surface)', color: selected.size ? '#fff' : 'var(--text-3)', fontSize: 13, fontWeight: 600, cursor: selected.size ? 'pointer' : 'default', fontFamily: 'inherit' }}>
              읽음 처리{selected.size ? ` (${selected.size})` : ''}
            </button>
            <button onClick={deleteSelected} disabled={selected.size === 0} style={{ flex: 1, height: 40, borderRadius: 11, border: '1px solid var(--bd)', background: 'var(--surface)', color: selected.size ? 'var(--danger)' : 'var(--text-3)', fontSize: 13, fontWeight: 600, cursor: selected.size ? 'pointer' : 'default', fontFamily: 'inherit' }}>
              선택 삭제{selected.size ? ` (${selected.size})` : ''}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 9, padding: '0 4px' }}>
            <button onClick={toggleSelectAll} style={{ background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              {allSelected ? '선택 해제' : '전체 선택'}
            </button>
            <button onClick={deleteAll} style={{ background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              전체 삭제
            </button>
          </div>
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

      {/* 탭: 전체 / 안 읽음 / 읽음 */}
      {hasMsgs && !editMode && (
        <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
          {[['all', '전체', msgs.length], ['unread', '안 읽음', unreadCount], ['read', '읽음', msgs.length - unreadCount]].map(([k, label, cnt]) => {
            const on = tab === k
            return (
              <button key={k} onClick={() => { setUnreadSnap(new Set(newIds)); setTab(k) }}
                style={{ flex: 1, height: 36, borderRadius: 10, border: `1.5px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'var(--surface)', color: on ? '#fff' : 'var(--text-2)', fontSize: 12.5, fontWeight: on ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                {label} {cnt}
              </button>
            )
          })}
        </div>
      )}

      {hasMsgs && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tabFiltered.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '30px 0', fontSize: 13, color: 'var(--text-3)' }}>
              {tab === 'unread' ? '안 읽은 메시지가 없어요.' : tab === 'read' ? '읽은 메시지가 없어요.' : '메시지가 없어요.'}
            </p>
          ) : tabFiltered.map(m => {
            const open = expanded.has(m.id)
            const isNew = newIds.has(m.id)
            const sel = selected.has(m.id)
            return (
              <div key={m.id} style={{ background: 'var(--surface)', border: `1px solid ${sel ? PRIMARY : 'var(--bd)'}`, borderRadius: 14, overflow: 'hidden' }}>
                {/* 헤더 행 — 클릭: (편집)선택 / (일반)접기·펼치기 */}
                <div
                  onClick={() => editMode ? toggleSelect(m.id) : toggleExpand(m.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '14px 16px', cursor: 'pointer' }}
                >
                  {editMode ? (
                    <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${sel ? PRIMARY : 'var(--bd)'}`, background: sel ? PRIMARY : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {sel && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                    </span>
                  ) : (
                    isNew && <span style={{ width: 7, height: 7, borderRadius: '50%', background: PRIMARY, flexShrink: 0 }} />
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ fontSize: 14.5, fontWeight: isNew ? 700 : 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.title}</span>
                      {isNew && <span style={{ fontSize: 9.5, fontWeight: 700, color: '#fff', background: PRIMARY, borderRadius: 5, padding: '1px 5px', flexShrink: 0 }}>NEW</span>}
                    </div>
                    {/* 접혔을 때만 미리보기 한 줄 */}
                    {!open && <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preview(m.body)}</p>}
                  </div>

                  <span style={{ fontSize: 11.5, color: 'var(--text-3)', flexShrink: 0 }}>{fmtDate(m.created_at)}</span>
                  {!editMode && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}><polyline points="6 9 12 15 18 9" /></svg>
                  )}
                </div>

                {/* 펼친 본문 */}
                {open && !editMode && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--bd)' }}>
                    <p style={{ margin: '13px 0 0', fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{m.body}</p>
                    {m.cta_label && m.cta_target && (
                      <button
                        onClick={() => navigate(m.cta_target)}
                        style={{ width: '100%', marginTop: 14, height: 46, border: 'none', borderRadius: 12, background: PRIMARY, color: '#fff', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {m.cta_label}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
