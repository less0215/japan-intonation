import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

/* 저장 탭 — 번역 기록 / 저장 단어 / 저장 예문 (기존 드로어를 페이지로 승격)
 * 데이터는 UserContext(로컬) 기반. 번역 기록 클릭 시 번역기로 불러오기.
 */
const PRIMARY = '#5CA9CE'
const CAT_PATH = { verb: '/verbs', 'adj-i': '/adj-i', 'adj-na': '/adj-na', noun: '/noun', particle: '/particles' }

export default function SavesPage({ onSelectHistory }) {
  const { translationHistory, savedWords, savedExamples, removeHistoryItem } = useUser()
  const [seg, setSeg] = useState('history')
  const navigate = useNavigate()

  const segStyle = (on) => ({
    flex: 1, textAlign: 'center', borderRadius: 9, padding: '8px 0', fontSize: 12.5,
    fontWeight: on ? 600 : 400, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
    background: on ? PRIMARY : '#f3f5f7', color: on ? '#fff' : '#888',
  })
  const card = { background: '#fff', border: '1px solid #eaecef', borderRadius: 12, padding: '11px 13px', marginBottom: 6, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit' }
  const empty = (t) => (
    <div style={{ background: '#fff', border: '1px solid #eaecef', borderRadius: 14, padding: '48px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#d4dade" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>
      <p style={{ margin: 0, textAlign: 'center', color: '#9aa0a6', fontSize: 13 }}>{t}</p>
    </div>
  )

  return (
    <>
      <PageSEO title="저장 - 틱재팬" description="저장한 번역·단어·예문을 모아보세요." path="/saves" noindex />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 10px' }}>저장</h2>
      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
        <button style={segStyle(seg === 'history')} onClick={() => setSeg('history')}>번역 기록</button>
        <button style={segStyle(seg === 'words')}   onClick={() => setSeg('words')}>단어</button>
        <button style={segStyle(seg === 'examples')} onClick={() => setSeg('examples')}>예문</button>
      </div>

      {seg === 'history' && (
        translationHistory.length === 0 ? empty('저장된 번역 기록이 없어요.') :
        translationHistory.map(h => (
          <button key={h.id} style={card} onClick={() => onSelectHistory?.(h.result, h.input_text)}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#1f2937' }}>{h.japanese}</p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9aa0a6' }}>{h.input_text}</p>
          </button>
        ))
      )}

      {seg === 'words' && (
        savedWords.length === 0 ? empty('저장한 단어가 없어요.') :
        savedWords.map(w => (
          <button key={w.id} style={card} onClick={() => CAT_PATH[w.category] && navigate(`${CAT_PATH[w.category]}/${w.id.split('_').pop?.() ?? w.id}`)}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#1f2937' }}>{w.word} <span style={{ fontSize: 12, color: '#9aa0a6', fontWeight: 400 }}>{w.reading}</span></p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9aa0a6' }}>{w.meaning}</p>
          </button>
        ))
      )}

      {seg === 'examples' && (
        savedExamples.length === 0 ? empty('저장한 예문이 없어요.') :
        savedExamples.map(ex => (
          <button key={ex.id} style={card} onClick={() => CAT_PATH[ex.wordCategory] && navigate(`${CAT_PATH[ex.wordCategory]}/${ex.wordId}#examples-section`)}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#1f2937' }}>{ex.exampleJp}</p>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9aa0a6' }}>{ex.exampleKr}</p>
          </button>
        ))
      )}
    </>
  )
}
