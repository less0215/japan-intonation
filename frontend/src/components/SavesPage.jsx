import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

/* 저장 탭 — 번역 기록 / 저장 단어 / 저장 예문
 * - 리스트형(유려한 간격), 편집 모드에서 우측 체크박스로 다중/전체 삭제
 */
const PRIMARY = '#5CA9CE'
const CAT_PATH = { verb: '/verbs', 'adj-i': '/adj-i', 'adj-na': '/adj-na', noun: '/noun', particle: '/particles', onomatope: '/onomatope' }

export default function SavesPage({ onSelectHistory }) {
  const { translationHistory, savedWords, savedExamples, removeHistoryItems, removeWords, removeExamples } = useUser()
  const [seg, setSeg] = useState('history')
  const [editMode, setEditMode] = useState(false)
  const [selected, setSelected] = useState([])   // 선택된 id 배열
  const navigate = useNavigate()

  // 문법 저장은 category 'grammar' → 별도 '문법' 탭으로 분리(단어 탭에선 제외)
  const grammarWords = savedWords.filter(w => w.category === 'grammar')
  const plainWords = savedWords.filter(w => w.category !== 'grammar')
  const list = seg === 'history' ? translationHistory
    : seg === 'words' ? plainWords
    : seg === 'grammar' ? grammarWords
    : savedExamples
  // 탭 전환 시 선택/편집 초기화
  useEffect(() => { setSelected([]); setEditMode(false) }, [seg])

  function toggleSel(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  function allSelected() { return list.length > 0 && selected.length === list.length }
  function toggleAll() { setSelected(allSelected() ? [] : list.map(it => it.id)) }

  function doRemove(ids) {
    if (seg === 'history') removeHistoryItems(ids)
    else if (seg === 'words' || seg === 'grammar') removeWords(ids)
    else removeExamples(ids)
  }
  function deleteSelected() {
    if (selected.length === 0) return
    doRemove(selected); setSelected([])
  }
  function deleteAll() {
    if (list.length === 0) return
    if (!window.confirm('이 탭의 항목을 모두 삭제할까요?')) return
    doRemove(list.map(it => it.id)); setSelected([]); setEditMode(false)   // 현재 탭 항목만 삭제(문법/단어 분리 보호)
  }

  function onItemClick(it) {
    if (editMode) { toggleSel(it.id); return }
    if (seg === 'history') onSelectHistory?.(it.result, it.input_text)
    else if (seg === 'grammar') navigate(`/grammar/${it.id}`)
    else if (seg === 'words') CAT_PATH[it.category] && navigate(`${CAT_PATH[it.category]}/${it.id.split('_').pop?.() ?? it.id}`)
    else CAT_PATH[it.wordCategory] && navigate(`${CAT_PATH[it.wordCategory]}/${it.wordId}#examples-section`)
  }

  const segStyle = (on) => ({
    flex: 1, textAlign: 'center', borderRadius: 9, padding: '8px 0', fontSize: 12.5,
    fontWeight: on ? 600 : 400, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
    background: on ? PRIMARY : 'var(--surface-2)', color: on ? '#fff' : 'var(--text-2)',
  })

  function Checkbox({ on }) {
    return (
      <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {on && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
      </span>
    )
  }

  function row(primary, sub, it, last) {
    const on = selected.includes(it.id)
    return (
      <button key={it.id} onClick={() => onItemClick(it)}
        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: last ? 'none' : '1px solid var(--bd)', padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{primary}</p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</p>
        </div>
        {editMode
          ? <Checkbox on={on} />
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6" /></svg>}
      </button>
    )
  }

  const empty = (t) => (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: '48px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>
      <p style={{ margin: 0, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>{t}</p>
    </div>
  )

  const rows = seg === 'history'
    ? translationHistory.map((h, i) => row(h.japanese, h.input_text, h, i === translationHistory.length - 1))
    : seg === 'words'
      ? plainWords.map((w, i) => row(`${w.word}  ${w.reading ?? ''}`, w.meaning, w, i === plainWords.length - 1))
      : seg === 'grammar'
        ? grammarWords.map((w, i) => row(`${w.word}  ${w.reading ?? ''}`, w.meaning, w, i === grammarWords.length - 1))
        : savedExamples.map((e, i) => row(e.exampleJp, e.exampleKr, e, i === savedExamples.length - 1))

  return (
    <>
      <PageSEO title="저장 - 틱재팬" description="저장한 번역·단어·예문을 모아보세요." path="/saves" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 2px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>저장</h2>
        {list.length > 0 && (
          <button onClick={() => { setEditMode(v => !v); setSelected([]) }} style={{ background: 'none', border: 'none', fontSize: 13, color: PRIMARY, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
            {editMode ? '완료' : '편집'}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <button style={segStyle(seg === 'history')}  onClick={() => setSeg('history')}>번역 기록</button>
        <button style={segStyle(seg === 'words')}    onClick={() => setSeg('words')}>단어</button>
        <button style={segStyle(seg === 'grammar')}  onClick={() => setSeg('grammar')}>문법</button>
        <button style={segStyle(seg === 'examples')} onClick={() => setSeg('examples')}>예문</button>
      </div>

      {/* 편집 액션 바 */}
      {editMode && list.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 2px 8px' }}>
          <button onClick={toggleAll} style={{ background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'inherit' }}>
            {allSelected() ? '전체 해제' : '전체 선택'}
          </button>
          <div style={{ display: 'flex', gap: 14 }}>
            <button onClick={deleteSelected} disabled={selected.length === 0} style={{ background: 'none', border: 'none', fontSize: 12.5, color: selected.length ? '#d05050' : '#cbd0d4', cursor: selected.length ? 'pointer' : 'default', fontFamily: 'inherit', fontWeight: 500 }}>
              선택 삭제{selected.length ? ` (${selected.length})` : ''}
            </button>
            <button onClick={deleteAll} style={{ background: 'none', border: 'none', fontSize: 12.5, color: '#d05050', cursor: 'pointer', fontFamily: 'inherit' }}>전체 삭제</button>
          </div>
        </div>
      )}

      {list.length === 0
        ? empty(seg === 'history' ? '저장된 번역 기록이 없어요.' : seg === 'words' ? '저장한 단어가 없어요.' : seg === 'grammar' ? '저장한 문법이 없어요.' : '저장한 예문이 없어요.')
        : <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden' }}>{rows}</div>}
    </>
  )
}
