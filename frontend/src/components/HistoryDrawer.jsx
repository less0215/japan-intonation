import { useEffect, useState } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'

/* 저장된 결과 목록을 보여주는 하단 드로어 */
export default function HistoryDrawer({ user, onClose, onSelect }) {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)

  /* 저장 목록 불러오기 */
  useEffect(() => {
    async function fetchSaves() {
      try {
        const res = await fetch(`${API_URL}/saves/${user.user_id}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setItems(data)
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchSaves()
  }, [user.user_id])

  /* 항목 삭제 */
  async function handleDelete(e, saveId) {
    e.stopPropagation()
    try {
      await fetch(`${API_URL}/saves/${saveId}?user_id=${user.user_id}`, {
        method: 'DELETE',
      })
      setItems(prev => prev.filter(i => i.id !== saveId))
    } catch {
      /* 실패 무시 */
    }
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="drawer-header">
          <span className="drawer-title">
            저장 목록 <span style={{ color: '#5CA9CE' }}>{user.name}</span>
          </span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        {/* 목록 */}
        <div className="drawer-list">
          {loading ? (
            <p className="drawer-empty">불러오는 중...</p>
          ) : items.length === 0 ? (
            <p className="drawer-empty">
              아직 저장된 항목이 없어요.<br />변환 후 저장해 보세요!
            </p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="drawer-item"
                onClick={() => { onSelect(item.result, item.input_text); onClose() }}
              >
                <div className="drawer-item-body">
                  <p className="drawer-item-input">{item.input_text}</p>
                  <p className="drawer-item-japanese">{item.japanese}</p>
                </div>
                <button
                  className="drawer-item-delete"
                  onClick={e => handleDelete(e, item.id)}
                  title="삭제"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
