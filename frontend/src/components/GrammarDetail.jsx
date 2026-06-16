import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import PitchGraph from './PitchGraph'
import WordBookmarkButton from './WordBookmarkButton'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import { track } from '../App'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

/* ── 피치 계산 헬퍼 (ParticleDetail과 동일) ── */
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

/* ── 예문 박스 (즉시 그래프 + TTS) ── */
function ExampleBox({ example, exampleInfo }) {
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
    track('tts_play_example', { category: 'grammar' })
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
          {exampleInfo && <ExampleBookmarkButton exampleInfo={exampleInfo} />}
          {accentData && (
            <button
              onClick={() => { if (!showGraph) track('pitch_graph_expand', { category: 'grammar' }); setShowGraph(v => !v) }}
              title="억양 그래프"
              style={{
                width: 28, height: 28, borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${graphActive ? PRIMARY : '#e0e0e0'}`,
                backgroundColor: graphActive ? `${PRIMARY}18` : 'transparent',
                cursor: 'pointer',
              }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5 Q2 1 3 5 Q4 9 5 5 Q6 1 7 5 Q8 9 9 5 Q10 1 11 5 Q12 9 13 5"
                  stroke={graphActive ? PRIMARY : '#bbb'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          )}
          <button
            onClick={handlePlay}
            title={audioState === 'playing' ? '정지' : '발음 듣기'}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${audioState === 'playing' ? PRIMARY : '#e0e0e0'}`,
              backgroundColor: audioState === 'playing' ? `${PRIMARY}18` : 'transparent',
              cursor: 'pointer',
            }}
          >
            {audioState === 'loading' ? (
              <span className="spinner" style={{ width: 9, height: 9, borderTopColor: PRIMARY, borderColor: '#e0e0e0' }} />
            ) : audioState === 'playing' ? (
              <svg width="9" height="9" viewBox="0 0 24 24" fill={PRIMARY}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#bbb"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#bbb" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 한국어 발음 */}
      {example.pronunciation && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#aaa', fontStyle: 'italic', lineHeight: 1.4 }}>
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

/* ── 메인 컴포넌트 ── */
export default function GrammarDetail({ pattern }) {
  const navigate = useNavigate()
  const currentIndex = GRAMMAR.findIndex(g => g.id === pattern.id)
  const prev = GRAMMAR[currentIndex - 1] ?? null
  const next = GRAMMAR[currentIndex + 1] ?? null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <button onClick={() => navigate('/')} className="back-to-translate" style={{ alignSelf: 'flex-start' }}>
        ← 홈으로
      </button>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: '#5CA9CE', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.1 }}>
              {pattern.pattern}
            </span>
            <span style={{ fontSize: 16, color: '#aaa' }}>({pattern.reading})</span>
          </div>
          <WordBookmarkButton wordInfo={{ id: pattern.id, category: 'grammar', word: pattern.pattern, reading: pattern.reading, meaning: pattern.meanings[0] ?? '' }} />
        </div>
        {pattern.level && (
          <span className="particle-section-badge particle-section-badge--basic" style={{ marginBottom: 8, display: 'inline-block' }}>
            {pattern.level}
          </span>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {pattern.meanings.map((m, i) => (
            <span key={i} className="particle-meaning-tag">{m}</span>
          ))}
        </div>
      </div>

      {/* 접속·설명 카드 */}
      <div className="card">
        <div className="section">
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>접속</p>
            <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600, color: '#333', fontFamily: "'Noto Sans JP', sans-serif" }}>
              {pattern.connection}
            </p>
          </div>
          {pattern.explanation && (
            <p style={{ margin: '14px 0 0', fontSize: 13.5, color: '#555', lineHeight: 1.7 }}>
              {pattern.explanation}
            </p>
          )}
        </div>
      </div>

      {/* 용법 카드들 */}
      {pattern.usages.map((usage, i) => (
        <div key={i} className="card" id={i === 0 ? 'examples-section' : undefined}>
          <div className="section">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span className={`particle-section-badge particle-section-badge--${usage.type}`}>
                {usage.type === 'basic' ? '기본' : '응용'}
              </span>
              <span style={{ fontSize: 14, color: '#444', fontWeight: 500, lineHeight: 1.5 }}>
                {usage.meaning}
              </span>
            </div>
            <ExampleBox
              example={usage.example}
              exampleInfo={{
                id: `grammar_${pattern.id}_${i}`,
                wordId: pattern.id,
                wordText: pattern.pattern,
                wordReading: pattern.reading,
                wordCategory: 'grammar',
                exampleJp: usage.example.jp?.replace(/[（(][^）)]+[）)]/g, '') ?? '',
                exampleKr: usage.example.kr ?? '',
              }}
            />
            <p className="particle-note">
              <RubyText text={usage.note} fontSize={13} />
            </p>
          </div>
        </div>
      ))}

      {/* 이전 / 다음 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button className="particle-nav-btn" disabled={!prev} onClick={() => prev && navigate(`/grammar/${prev.id}`)}>
          ← {prev ? prev.pattern : '처음'}
        </button>
        <button className="particle-nav-btn" disabled={!next} onClick={() => next && navigate(`/grammar/${next.id}`)}>
          {next ? next.pattern : '마지막'} →
        </button>
      </div>

    </div>
  )
}
