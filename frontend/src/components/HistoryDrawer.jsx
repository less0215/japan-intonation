import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { track } from '../App'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

/* 품사 카테고리 레이블 */
const CATEGORY_TABS = [
  { id: 'all',      label: '전체' },
  { id: 'verb',     label: '동사' },
  { id: 'adj-na',   label: 'な형' },
  { id: 'adj-i',    label: 'い형' },
  { id: 'noun',     label: '명사' },
  { id: 'particle', label: '조사' },
]

/* 카테고리 → 한국어 레이블 */
const CAT_LABEL = { verb: '동사', 'adj-na': 'な형용사', 'adj-i': 'い형용사', noun: '명사', particle: '조사' }

/* 카테고리 → 상세 페이지 경로 */
function getPath(category, id) {
  const map = { verb: `/verbs/${id}`, 'adj-na': `/adj-na/${id}`, 'adj-i': `/adj-i/${id}`, noun: `/noun/${id}`, particle: `/particles/${id}` }
  return map[category] ?? null
}

/* 저장된 결과 목록을 보여주는 드로어 */
export default function HistoryDrawer({ user, onClose, onSelect, onDeleteAccount }) {
  const { savedWords, toggleSaveWord, savedExamples, toggleSaveExample } = useUser()
  const navigate = useNavigate()

  /* 메인 탭: 'saves' | 'words' | 'examples' — 비로그인이면 단어 탭 기본 */
  const [mainTab, setMainTab] = useState(user ? 'saves' : 'words')

  /* 번역 저장 목록 */
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)

  /* 단어 / 예문 카테고리 필터 */
  const [wordCat,    setWordCat]    = useState('all')
  const [exampleCat, setExampleCat] = useState('all')

  /* 번역 저장 목록 불러오기 (로그인 시에만) */
  useEffect(() => {
    if (!user) { setLoading(false); return }
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
  }, [user?.user_id])

  /* 번역 항목 삭제 */
  async function handleDelete(e, saveId) {
    e.stopPropagation()
    try {
      await fetch(`${API_URL}/saves/${saveId}?user_id=${user.user_id}`, { method: 'DELETE' })
      setItems(prev => prev.filter(i => i.id !== saveId))
    } catch { /* 실패 무시 */ }
  }

  /* 단어 카드 이동 */
  function handleWordClick(word) {
    const path = getPath(word.category, word.id)
    if (path) { track('saved_item_click', { tab: 'words', category: word.category, word_id: word.id }); navigate(path); onClose() }
  }

  /* 예문 이동 — 예문 섹션으로 스크롤 */
  function handleExampleClick(ex) {
    const path = getPath(ex.wordCategory, ex.wordId)
    if (!path) return
    track('saved_item_click', { tab: 'examples', category: ex.wordCategory, word_id: ex.wordId })
    onClose()
    navigate(path)
    /* 페이지 이동 후 예문 섹션으로 스크롤 */
    setTimeout(() => {
      document.getElementById('examples-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  const filteredWords    = wordCat    === 'all' ? savedWords    : savedWords.filter(w => w.category === wordCat)
  const filteredExamples = exampleCat === 'all' ? savedExamples : savedExamples.filter(e => e.wordCategory === exampleCat)

  function fmtCount(n) { return n >= 100 ? '99+' : n }

  /* 메인 탭 정의 */
  const MAIN_TABS = [
    { id: 'saves',    label: '번역 저장', count: loading ? 0 : items.length },
    { id: 'words',    label: '저장 단어', count: savedWords.length },
    { id: 'examples', label: '저장 예문', count: savedExamples.length },
  ]

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-sheet" onClick={e => e.stopPropagation()}>

        {/* 헤더 */}
        <div className="drawer-header">
          <span className="drawer-title">
            저장 목록 {user && <span style={{ color: PRIMARY }}>{user.name}</span>}
          </span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        {/* 메인 탭 */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid #f0f0f0', flexShrink: 0 }}>
          {MAIN_TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setMainTab(t.id)}
              style={{
                flex: 1,
                padding: '10px 4px',
                background: 'none',
                border: 'none',
                borderBottom: mainTab === t.id ? `2.5px solid ${PRIMARY}` : '2.5px solid transparent',
                color: mainTab === t.id ? PRIMARY : '#aaa',
                fontWeight: mainTab === t.id ? 700 : 400,
                fontSize: 13,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all .15s',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{
                  marginLeft: 4,
                  background: mainTab === t.id ? PRIMARY : '#ddd',
                  color: mainTab === t.id ? '#fff' : '#888',
                  borderRadius: 10,
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                }}>
                  {fmtCount(t.count)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── 번역 저장 탭 ── */}
        {mainTab === 'saves' && (
          <div className="drawer-list">
            {!user ? (
              <p className="drawer-empty">로그인하면 번역 저장 기록을 볼 수 있어요.</p>
            ) : loading ? (
              <p className="drawer-empty">불러오는 중...</p>
            ) : items.length === 0 ? (
              <p className="drawer-empty">아직 저장된 항목이 없어요.<br />변환 후 저장해 보세요!</p>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="drawer-item"
                  onClick={() => { track('saved_item_click', { tab: 'saves' }); onSelect(item.result, item.input_text); onClose() }}
                >
                  <div className="drawer-item-body">
                    <p className="drawer-item-input">{item.input_text}</p>
                    <p className="drawer-item-japanese">{item.japanese}</p>
                  </div>
                  <button className="drawer-item-delete" onClick={e => handleDelete(e, item.id)} title="삭제">✕</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── 저장 단어 탭 ── */}
        {mainTab === 'words' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '10px 16px 6px', flexShrink: 0 }}>
              {CATEGORY_TABS.map(cat => (
                <button key={cat.id} onClick={() => setWordCat(cat.id)} style={filterBtnStyle(wordCat === cat.id)}>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="drawer-list">
              {filteredWords.length === 0 ? (
                <p className="drawer-empty">
                  {wordCat === 'all' ? '저장된 단어가 없어요.\n단어 카드에서 저장해 보세요!' : '이 카테고리에 저장된 단어가 없어요.'}
                </p>
              ) : (
                filteredWords.map(word => (
                  <div key={word.id} className="drawer-item" onClick={() => handleWordClick(word)} style={{ alignItems: 'center' }}>
                    <div className="drawer-item-body">
                      <p className="drawer-item-japanese" style={{ marginBottom: 2 }}>{word.word}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>{word.reading} · {word.meaning}</p>
                    </div>
                    <button className="drawer-item-delete" onClick={e => { e.stopPropagation(); toggleSaveWord(word) }} title="저장 취소">✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── 저장 예문 탭 ── */}
        {mainTab === 'examples' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '10px 16px 6px', flexShrink: 0 }}>
              {CATEGORY_TABS.map(cat => (
                <button key={cat.id} onClick={() => setExampleCat(cat.id)} style={filterBtnStyle(exampleCat === cat.id)}>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="drawer-list">
              {filteredExamples.length === 0 ? (
                <p className="drawer-empty">
                  {exampleCat === 'all' ? '저장된 예문이 없어요.\n예문 옆 저장 버튼을 눌러보세요!' : '이 카테고리에 저장된 예문이 없어요.'}
                </p>
              ) : (
                filteredExamples.map(ex => (
                  <div key={ex.id} className="drawer-item" onClick={() => handleExampleClick(ex)}>
                    <div className="drawer-item-body">
                      <p style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif", color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ex.exampleJp}
                      </p>
                      <p style={{ margin: '0 0 4px', fontSize: 12, color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ex.exampleKr}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: PRIMARY, fontWeight: 600 }}>
                        {ex.wordText} ({CAT_LABEL[ex.wordCategory] ?? ex.wordCategory}) 의 예문
                      </p>
                    </div>
                    <button className="drawer-item-delete" onClick={e => { e.stopPropagation(); toggleSaveExample(ex) }} title="저장 취소">✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 드로어 하단 — 개인정보·이용약관 + 회원탈퇴 (심사 필수 접근성) */}
        <div style={{
          padding: '16px 20px 20px',
          borderTop: '1px solid #f0f0f0',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}>
          {/* 개인정보처리방침·이용약관 — 앱 내 어디서든 접근 가능해야 함 */}
          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={() => { onClose(); navigate('/privacy') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#aaa', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}
            >
              개인정보처리방침
            </button>
            <button
              onClick={() => { onClose(); navigate('/terms') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#aaa', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}
            >
              이용약관
            </button>
          </div>

          {user && onDeleteAccount && (
            <button
              onClick={() => { onClose(); onDeleteAccount() }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, color: '#bbb', fontFamily: 'inherit',
                textDecoration: 'underline', padding: 0,
              }}
            >
              회원탈퇴
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

function filterBtnStyle(active) {
  return {
    padding: '4px 10px',
    borderRadius: 14,
    fontSize: 12,
    fontWeight: active ? 700 : 400,
    border: active ? `1.5px solid ${PRIMARY}` : '1.5px solid #e8e8e8',
    background: active ? '#f0f9ff' : 'transparent',
    color: active ? PRIMARY : '#888',
    fontFamily: 'inherit',
    cursor: 'pointer',
  }
}
