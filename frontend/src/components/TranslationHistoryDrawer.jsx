import { useUser } from '../context/UserContext'
import { track } from '../App'

const PRIMARY = '#5CA9CE'

/* 번역 기록 드로어 — 번역할 때마다 자동 누적된 로컬 기록 (능동 '저장 목록'과 별개) */
export default function TranslationHistoryDrawer({ onClose, onSelect }) {
  const { translationHistory, removeHistoryItem, clearHistory } = useUser()

  function handleClearAll() {
    if (translationHistory.length === 0) return
    if (window.confirm('번역 기록을 모두 삭제할까요?')) {
      clearHistory()
      track('translation_history_clear')
    }
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="drawer-header">
          <span className="drawer-title">번역 기록</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        {/* 안내 + 전체 삭제 */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 16px', borderBottom: '1.5px solid #f0f0f0', flexShrink: 0,
        }}>
          <span style={{ fontSize: 11.5, color: '#aaa' }}>
            최근 번역 {translationHistory.length}건 (이 기기에만 저장)
          </span>
          {translationHistory.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#bbb', fontFamily: 'inherit', textDecoration: 'underline', padding: 0 }}
            >
              전체 삭제
            </button>
          )}
        </div>

        {/* 기록 목록 */}
        <div className="drawer-list">
          {translationHistory.length === 0 ? (
            <p className="drawer-empty">아직 번역 기록이 없어요.<br />문장을 번역하면 여기에 쌓여요!</p>
          ) : (
            translationHistory.map(item => (
              <div
                key={item.id}
                className="drawer-item"
                onClick={() => { track('translation_history_item_click'); onSelect(item.result, item.input_text); onClose() }}
              >
                <div className="drawer-item-body">
                  <p className="drawer-item-input">{item.input_text}</p>
                  <p className="drawer-item-japanese">{item.japanese}</p>
                </div>
                <button
                  className="drawer-item-delete"
                  onClick={e => { e.stopPropagation(); removeHistoryItem(item.id) }}
                  title="기록 삭제"
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
