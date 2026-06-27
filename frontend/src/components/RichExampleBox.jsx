import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import { track } from '../App'

/* 문법·의성어 등에서 공용으로 쓰는 리치 예문 박스
 * (즉시 피치그래프 + TTS + 활용원리 + 예문저장). 단일 소스로 유지.
 * example: { kr, jp(후리가나_html), furigana(가나), accentData, pronunciation } */

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

const smallKana = new Set(['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ','ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ'])
function splitMora(h) {
  const chars = [...h]; const mora = []
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && smallKana.has(chars[i + 1])) { mora.push(chars[i] + chars[i + 1]); i++ }
    else mora.push(chars[i])
  }
  return mora
}
function computeAccent(hiragana, n = 0) {
  const mora = splitMora(hiragana)
  if (!mora.length) return null
  const accent = mora.map((_, i) => {
    if (n === 0) return i === 0 ? 0 : 1
    if (i === 0) return n === 1 ? 1 : 0
    return i < n ? 1 : 0
  })
  return [{ phrase_id: '0', mora_count: mora.length, accent }]
}
function extractFurigana(text) {
  return text
    .replace(/[^\s()（）]+\(([^)（）]+)\)/g, (_, r) => r)
    .replace(/[（(）)]/g, '')
    .replace(/[^぀-ゟ゠-ヿ]/g, '')
}
function stripFurigana(text) {
  return text.replace(/[（(][^）)]+[）)]/g, '').replace(/[（(）)]/g, '')
}

export default function RichExampleBox({ example, exampleInfo, category = 'grammar' }) {
  const [showGraph,  setShowGraph]  = useState(false)
  const [audioState, setAudioState] = useState('idle')
  const audioRef = useRef(null)

  const plainText  = stripFurigana(example.jp)
  const furigana   = example.furigana ?? extractFurigana(example.jp)
  const accentData = example.accentData ?? (furigana ? computeAccent(furigana, 0) : null)
  const graphActive = showGraph && accentData

  async function handlePlay() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    track('tts_play_example', { category })
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText, gender: 'female' }),
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      await audio.play(); setAudioState('playing')
    } catch { setAudioState('idle') }
  }

  return (
    <div className="particle-example">
      {/* 한국어 번역 */}
      <p className="particle-example-kr">{example.kr}</p>

      {/* 일본어 + 버튼들 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <RubyText text={example.jp} fontSize={15} />
        <div style={{ display: 'flex', gap: 5, flexShrink: 0, alignItems: 'center' }}>
          {exampleInfo && <ExampleBookmarkButton exampleInfo={exampleInfo} saveLabel="예문 저장" savedLabel="예문 저장됨" />}
          {accentData && (
            <button
              onClick={() => { if (!showGraph) track('pitch_graph_expand', { category }); setShowGraph(v => !v) }}
              title="억양 그래프"
              style={{
                width: 28, height: 28, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${graphActive ? PRIMARY : 'var(--bd)'}`,
                backgroundColor: graphActive ? `${PRIMARY}18` : 'transparent',
                cursor: 'pointer',
              }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5 Q2 1 3 5 Q4 9 5 5 Q6 1 7 5 Q8 9 9 5 Q10 1 11 5 Q12 9 13 5"
                  stroke={graphActive ? PRIMARY : 'var(--text-3)'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          )}
          <button
            onClick={handlePlay}
            title={audioState === 'playing' ? '정지' : '발음 듣기'}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${audioState === 'playing' ? PRIMARY : 'var(--bd)'}`,
              backgroundColor: audioState === 'playing' ? `${PRIMARY}18` : 'transparent',
              cursor: 'pointer',
            }}
          >
            {audioState === 'loading' ? (
              <span className="spinner" style={{ width: 9, height: 9, borderTopColor: PRIMARY, borderColor: 'var(--bd)' }} />
            ) : audioState === 'playing' ? (
              <svg width="9" height="9" viewBox="0 0 24 24" fill={PRIMARY}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="var(--text-3)"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 한국어 발음 */}
      {example.pronunciation && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic', lineHeight: 1.4 }}>
          {example.pronunciation}
        </p>
      )}

      {/* 인토네이션 그래프 */}
      {graphActive && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginTop: 8 }}>
          <PitchGraph accentData={accentData} furigana={furigana} hideHeader />
        </div>
      )}

      {/* 활용 원리 보기 */}
      <ExampleAnalysis japaneseText={plainText} />
    </div>
  )
}
