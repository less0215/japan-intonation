import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PARTICLES } from '../data/particles'
import PitchGraph from './PitchGraph'
import PronunciationPractice from './PronunciationPractice'
import WordBookmarkButton from './WordBookmarkButton'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import { track } from '../App'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

/* ── 피치 계산 헬퍼 (WordDetail과 동일) ── */
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
/* 후리가나 표기 → 히라가나 추출: 漢字(かんじ) → かんじ, 나머지 가나 유지 */
function extractFurigana(text) {
  return text
    .replace(/[^\s()（）]+\(([^)（）]+)\)/g, (_, r) => r)
    .replace(/[（(）)]/g, '')
    .replace(/[^぀-ゟ゠-ヿ]/g, '')
}
function stripFurigana(text) {
  return text.replace(/[（(][^）)]+[）)]/g, '').replace(/[（(）)]/g, '')
}

/* ── 후리가나 렌더링 — 한자만 매칭 ── */

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
    track('tts_play_example', { category: 'particle' })
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
          {/* 예문 저장 버튼 */}
          {exampleInfo && <ExampleBookmarkButton exampleInfo={exampleInfo} />}
          {/* 억양 그래프 버튼 */}
          {accentData && (
            <button
              onClick={() => { if (!showGraph) track('pitch_graph_expand', { category: 'particle' }); setShowGraph(v => !v) }}
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
          {/* TTS 재생 버튼 */}
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

      {/* 인토네이션 그래프 — 즉시 표시 */}
      {graphActive && (
        <>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginTop: 8 }}>
            <PitchGraph accentData={accentData} furigana={furigana} hideHeader />
          </div>
          <PronunciationPractice compact accentData={accentData} furigana={furigana} japanese={plainText} korean_pronunciation={example.pronunciation} inputText={example.kr} />
        </>
      )}

      {/* 활용 원리 보기 */}
      <ExampleAnalysis japaneseText={plainText} />
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export default function ParticleDetail({ particle }) {
  const navigate = useNavigate()
  const currentIndex = PARTICLES.findIndex(p => p.id === particle.id)
  const prev = PARTICLES[currentIndex - 1] ?? null
  const next = PARTICLES[currentIndex + 1] ?? null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <button onClick={() => navigate('/particles')} className="back-to-translate" style={{ alignSelf: 'flex-start' }}>
        ← 목록으로
      </button>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#5CA9CE', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1 }}>
              {particle.particle}
            </span>
            <span style={{ fontSize: 16, color: 'var(--text-3)' }}>({particle.reading})</span>
          </div>
          <WordBookmarkButton wordInfo={{ id: particle.id, category: 'particle', word: particle.particle, reading: particle.reading, meaning: particle.meanings[0] ?? '' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {particle.meanings.map((m, i) => (
            <span key={i} className="particle-meaning-tag">{m}</span>
          ))}
        </div>
      </div>

      {/* 인스타 강의 배너 */}
      <a
        href="https://www.instagram.com/p/DZ6V1YZzvYk/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('instagram_banner_click', { category: 'particle', word_id: particle.id, word: particle.particle })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '13px 16px',
          background: 'linear-gradient(135deg, #fdf0f8 0%, #fff5fb 100%)',
          border: '1.5px solid #f0c0de',
          borderRadius: 12,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="ig3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig3)"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
        </svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#c0306a' }}>
            {particle.particle} 표현 확장 무료 강의
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#b06090' }}>
            조사 활용 완벽 정복 · 인스타그램에서 보기
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="#c0306a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* 용법 카드들 */}
      {particle.usages.map((usage, i) => (
        <div key={i} className="card" id={i === 0 ? 'examples-section' : undefined}>
          <div className="section">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span className={`particle-section-badge particle-section-badge--${usage.type}`}>
                {usage.type === 'basic' ? '기본' : '응용'}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.5 }}>
                {usage.meaning}
              </span>
            </div>
            <ExampleBox
              example={usage.example}
              exampleInfo={{
                id: `particle_${particle.id}_${i}`,
                wordId: particle.id,
                wordText: particle.particle,
                wordReading: particle.reading,
                wordCategory: 'particle',
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
        <button className="particle-nav-btn" disabled={!prev} onClick={() => prev && navigate(`/particles/${prev.id}`)}>
          ← {prev ? `${prev.particle}（${prev.reading}）` : '처음'}
        </button>
        <button className="particle-nav-btn" disabled={!next} onClick={() => next && navigate(`/particles/${next.id}`)}>
          {next ? `${next.particle}（${next.reading}）` : '마지막'} →
        </button>
      </div>

    </div>
  )
}
