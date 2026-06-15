import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

/* 카테고리 레이블 */
const CATEGORY_TABS = [
  { id: 'all',      label: '전체' },
  { id: 'verb',     label: '동사' },
  { id: 'adj-na',   label: 'な형' },
  { id: 'adj-i',    label: 'い형' },
  { id: 'noun',     label: '명사' },
  { id: 'particle', label: '조사' },
]

/* 저장된 결과 목록을 보여주는 하단 드로어 */
export default function HistoryDrawer({ user, onClose, onSelect }) {
  const { savedWords, toggleSaveWord } = useUser()
  const navigate = useNavigate()

  /* 탭: 'saves' | 'words' */
  const [mainTab, setMainTab] = useState('saves')

  /* 번역 저장 목록 */
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)

  /* 단어 카테고리 필터 */
  const [wordCat, setWordCat] = useState('all')

  /* 번역 저장 목록 불러오기 */
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

  /* 번역 항목 삭제 */
  async function handleDelete(e, saveId) {
    e.stopPropagation()
    try {
      await fetch(`${API_URL}/saves/${saveId}?user_id=${user.user_id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== saveId))
    } catch { /* 실패 무시 */ }
  }

  /* 단어 카드 클릭 시 해당 상세 페이지로 이동 */
  function handleWordClick(word) {
    const pathMap = {
      verb: `/verbs/${word.id}`,
      'adj-na': `/adj-na/${word.id}`,
      'adj-i':  `/adj-i/${word.id}`,
      noun:     `/noun/${word.id}`,
      particle: `/particles/${word.id}`,
    }
    const path = pathMap[word.category]
    if (path) { navigate(path); onClose() }
  }

  const filteredWords = wordCat === 'all'
    ? savedWords
    : savedWords.filter(w => w.category === wordCat)

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="drawer-header">
          <span className="drawer-title">
            저장 목록 <span style={{ color: PRIMARY }}>{user.name}</span>
          </span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        {/* 메인 탭 */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid #f0f0f0', marginBottom: 12 }}>
          {[{ id: 'saves', label: '번역 저장' }, { id: 'words', label: '저장 단어' }].map(t => (
            <button
              key={t.id}
              onClick={() => setMainTab(t.id)}
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'none',
                border: 'none',
                borderBottom: mainTab === t.id ? `2.5px solid ${PRIMARY}` : '2.5px solid transparent',
                color: mainTab === t.id ? PRIMARY : '#aaa',
                fontWeight: mainTab === t.id ? 700 : 400,
                fontSize: 14,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {t.label}
              {t.id === 'words' && savedWords.length > 0 && (
                <span style={{
                  marginLeft: 5,
                  background: PRIMARY,
                  color: '#fff',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '1px 6px',
                }}>
                  {savedWords.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 번역 저장 탭 */}
        {mainTab === 'saves' && (
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
        )}

        {/* 저장 단어 탭 */}
        {mainTab === 'words' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* 카테고리 필터 */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 2px' }}>
              {CATEGORY_TABS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setWordCat(cat.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 14,
                    fontSize: 12,
                    fontWeight: wordCat === cat.id ? 700 : 400,
                    border: wordCat === cat.id ? `1.5px solid ${PRIMARY}` : '1.5px solid #e8e8e8',
                    background: wordCat === cat.id ? '#f0f9ff' : 'transparent',
                    color: wordCat === cat.id ? PRIMARY : '#888',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 단어 목록 */}
            <div className="drawer-list" style={{ paddingTop: 0 }}>
              {filteredWords.length === 0 ? (
                <p className="drawer-empty">
                  {wordCat === 'all' ? '저장된 단어가 없어요.\n단어 카드에서 저장해 보세요!' : '이 카테고리에 저장된 단어가 없어요.'}
                </p>
              ) : (
                filteredWords.map(word => (
                  <div
                    key={word.id}
                    className="drawer-item"
                    onClick={() => handleWordClick(word)}
                    style={{ alignItems: 'center' }}
                  >
                    <div className="drawer-item-body">
                      <p className="drawer-item-japanese" style={{ marginBottom: 2 }}>{word.word}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{word.reading} · {word.meaning}</p>
                    </div>
                    <button
                      className="drawer-item-delete"
                      onClick={e => { e.stopPropagation(); toggleSaveWord(word) }}
                      title="저장 취소"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
