import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PARTICLES } from '../data/particles'
import PitchGraph from './PitchGraph'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

/* ── 후리가나 파싱 helpers ── */
function RubyText({ text, fontSize = 15 }) {
  const regex = /([^\s()（）]+?)\(([^)（）]+)\)/g
  const parts = []; let last = 0, match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'plain', text: text.slice(last, match.index) })
    parts.push({ type: 'ruby', kanji: match[1], reading: match[2] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ type: 'plain', text: text.slice(last) })
  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight: 500, lineHeight: 1.8 }}>
      {parts.map((p, i) =>
        p.type === 'ruby'
          ? <ruby key={i}>{p.kanji}<rt style={{ fontSize: 10, color: '#888' }}>{p.reading}</rt></ruby>
          : <span key={i}>{p.text}</span>
      )}
    </span>
  )
}

function stripFurigana(text) {
  return text.replace(/[（(][^）)]+[）)]/g, '').replace(/[（(）)]/g, '')
}

/* ── 예문 박스 (TTS + 그래프 + 한국어 발음 포함) ── */
function ExampleBox({ example }) {
  const [audioState, setAudioState] = useState('idle')
  const audioRef = useRef(null)

  const plainText = stripFurigana(example.jp)

  async function handlePlay() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
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

      {/* 일본어 + 재생 버튼 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <RubyText text={example.jp} fontSize={15} />
        <button
          onClick={handlePlay}
          title={audioState === 'playing' ? '정지' : '발음 듣기'}
          style={{
            flexShrink: 0,
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

      {/* 한국어 발음 */}
      {example.pronunciation && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#aaa', fontStyle: 'italic', lineHeight: 1.4 }}>
          {example.pronunciation}
        </p>
      )}
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

      {/* 뒤로 가기 */}
      <button
        onClick={() => navigate('/particles')}
        className="back-to-translate"
        style={{ alignSelf: 'flex-start' }}
      >
        ← 목록으로
      </button>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#5CA9CE', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1 }}>
            {particle.particle}
          </span>
          <span style={{ fontSize: 16, color: '#aaa' }}>({particle.reading})</span>
          <span style={{ fontSize: 13, color: '#888', marginLeft: 4 }}>제{particle.rank}위</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {particle.meanings.map((m, i) => (
            <span key={i} className="particle-meaning-tag">{m}</span>
          ))}
        </div>
      </div>

      {/* 용법 카드들 */}
      {particle.usages.map((usage, i) => (
        <div key={i} className="card">
          <div className="section">
            {/* 배지 + 의미 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span className={`particle-section-badge particle-section-badge--${usage.type}`}>
                {usage.type === 'basic' ? '기본' : '응용'}
              </span>
              <span style={{ fontSize: 14, color: '#444', fontWeight: 500, lineHeight: 1.5 }}>
                {usage.meaning}
              </span>
            </div>

            {/* 예문 박스 (TTS + 발음 포함) */}
            <ExampleBox example={usage.example} />

            {/* 해설 (후리가나 적용) */}
            <p className="particle-note">
              <RubyText text={usage.note} fontSize={13} />
            </p>
          </div>
        </div>
      ))}

      {/* 이전 / 다음 내비게이션 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button
          className="particle-nav-btn"
          disabled={!prev}
          onClick={() => prev && navigate(`/particles/${prev.id}`)}
        >
          ← {prev ? `${prev.particle}（${prev.reading}）` : '처음'}
        </button>
        <button
          className="particle-nav-btn"
          disabled={!next}
          onClick={() => next && navigate(`/particles/${next.id}`)}
        >
          {next ? `${next.particle}（${next.reading}）` : '마지막'} →
        </button>
      </div>

    </div>
  )
}
