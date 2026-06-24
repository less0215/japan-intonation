/* 예문 카드 — 동사·い형·な형·명사 공용 (UIUX 일관성)
 * example: { korean, japanese, reading, plain, accentData, furigana, pattern }
 * wordInfo: { id, category, word, reading }
 * index: 예문 인덱스 (저장 id 생성용)
 */
import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import { track, logLearning } from '../App'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function ExampleCard({ example, wordInfo, index }) {
  const [showGraph, setShowGraph] = useState(false)
  const [audioState, setAudioState] = useState('idle')
  const [showPattern, setShowPattern] = useState(false)
  const audioRef = useRef(null)

  async function handlePlay() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    track('tts_play_example', { category: wordInfo?.category, word_id: wordInfo?.id })
    logLearning('tts_replay', wordInfo?.word, { kind: 'word', category: wordInfo?.category, word_id: wordInfo?.id, reading: wordInfo?.reading })   // 집단지성: 어떤 단어 발음을 다시 듣나
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: example.plain, gender: 'female' }),
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      await audio.play(); setAudioState('playing')
    } catch { setAudioState('idle') }
  }

  const graphActive = showGraph && example.accentData?.length > 0

  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 10, padding: '14px 14px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{example.korean}</span>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RubyText text={example.japanese} fontSize={15} fontWeight={500} />
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{example.reading}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0, alignItems: 'center' }}>
          {wordInfo && (
            <ExampleBookmarkButton exampleInfo={{
              id: `${wordInfo.category}_${wordInfo.id}_${index}`,
              wordId: wordInfo.id,
              wordText: wordInfo.word,
              wordReading: wordInfo.reading,
              wordCategory: wordInfo.category,
              exampleJp: example.plain,
              exampleKr: example.korean,
            }} />
          )}
          {example.accentData?.length > 0 && (
            <button onClick={() => { if (!showGraph) { track('pitch_graph_expand', { category: wordInfo?.category, word_id: wordInfo?.id }); logLearning('pitch_expand', wordInfo?.word, { category: wordInfo?.category, word_id: wordInfo?.id }) } setShowGraph(v => !v) }} title="억양 그래프" style={{
              width: 26, height: 26, borderRadius: 6, border: `1px solid ${graphActive ? PRIMARY : 'var(--bd)'}`,
              backgroundColor: graphActive ? `${PRIMARY}18` : 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5 Q2 1 3 5 Q4 9 5 5 Q6 1 7 5 Q8 9 9 5 Q10 1 11 5 Q12 9 13 5"
                  stroke={graphActive ? PRIMARY : 'var(--text-3)'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          )}
          <button onClick={handlePlay} title="발음 듣기" style={{
            width: 26, height: 26, borderRadius: '50%', cursor: 'pointer',
            border: `1px solid ${audioState === 'playing' ? PRIMARY : 'var(--bd)'}`,
            backgroundColor: audioState === 'playing' ? `${PRIMARY}18` : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {audioState === 'loading' ? (
              <span className="spinner" style={{ width: 9, height: 9, borderTopColor: PRIMARY, borderColor: 'var(--bd)' }} />
            ) : audioState === 'playing' ? (
              <svg width="9" height="9" viewBox="0 0 24 24" fill={PRIMARY}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="var(--text-3)"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </div>
      {graphActive && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginTop: 4 }}>
          <PitchGraph accentData={example.accentData} furigana={example.furigana} hideHeader />
        </div>
      )}
      {example.pattern && (
        <>
          <button onClick={() => { if (!showPattern) { track('pattern_expand', { pattern: example.pattern.name, category: wordInfo?.category }); logLearning('pattern_expand', example.pattern.name, { category: wordInfo?.category, word: wordInfo?.word }) } setShowPattern(v => !v) }} style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 4,
            height: 22, padding: '0 8px', borderRadius: 11, fontSize: 11, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer',
            backgroundColor: showPattern ? `${PRIMARY}15` : 'var(--surface-2)',
            color: showPattern ? PRIMARY : 'var(--text-2)',
            border: `1px solid ${showPattern ? PRIMARY + '44' : 'var(--bd)'}`,
            transition: 'all 0.15s',
          }}>
            <span style={{ fontSize: 10 }}>📌</span>
            {example.pattern.name}
            <span style={{ fontSize: 9, opacity: 0.7 }}>{showPattern ? '▲' : '▼'}</span>
          </button>
          {showPattern && (
            <div style={{ padding: '10px 12px', background: 'var(--surface-2)', border: `1px solid ${PRIMARY}22`, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>{example.pattern.name}</span>
              <span style={{ fontSize: 13, color: PRIMARY, fontWeight: 600 }}>{example.pattern.meaning}</span>
              <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{example.pattern.note}</span>
            </div>
          )}
        </>
      )}
      <ExampleAnalysis japaneseText={example.plain} />
    </div>
  )
}
