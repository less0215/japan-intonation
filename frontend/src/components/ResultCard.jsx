import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import CopyButton from './CopyButton'
import { BreakdownTable, BreakdownCards, DetailToggleButton } from './BreakdownPanel'
import { track } from '../App'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

function parseFurigana(str) {
  const regex = /([^\s()（）]+?)\(([^)（）]+)\)/g
  const segments = []
  let lastIndex = 0, match
  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex)
      segments.push({ type: 'text', content: str.slice(lastIndex, match.index) })
    segments.push({ type: 'ruby', kanji: match[1], reading: match[2] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < str.length)
    segments.push({ type: 'text', content: str.slice(lastIndex) })
  return segments
}

function GenderToggle({ gender, onChange }) {
  return (
    <div className="gender-toggle">
      {[{ value: 'female', label: '여성' }, { value: 'male', label: '남성' }].map(({ value, label }) => (
        <button key={value} onClick={() => onChange(value)} className="gender-btn"
          style={{ backgroundColor: gender === value ? PRIMARY : 'transparent', color: gender === value ? '#fff' : '#888888' }}>
          {label}
        </button>
      ))}
    </div>
  )
}

function PlayButton({ audioState, onToggle }) {
  return (
    <button onClick={onToggle} className="play-btn" disabled={audioState === 'loading'}
      title={audioState === 'playing' ? '일시정지' : '재생'}>
      {audioState === 'loading' ? (
        <span className="spinner" style={{ width: 14, height: 14 }} />
      ) : audioState === 'playing' ? <IconPause /> : <IconPlay />}
    </button>
  )
}

function IconPlay() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
}
function IconPause() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
}

function SaveButton({ onSave, saved }) {
  return (
    <button className={`save-btn ${saved ? 'save-btn--saved' : ''}`} onClick={onSave} disabled={saved}>
      {saved ? <>✓ 저장됨</> : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          저장하기
        </>
      )}
    </button>
  )
}

export default function ResultCard({ data, onSave, saved, inputText, breakdownLoading }) {
  const { japanese, furigana, furigana_html, korean_pronunciation, accent_data, breakdown } = data
  const hasBreakdown = breakdown && breakdown.length > 0

  const [gender, setGender]         = useState('female')
  const [audioState, setAudioState] = useState('idle')
  const [showDetail, setShowDetail] = useState(false)
  const audioRef = useRef(null)

  const segments = parseFurigana(furigana_html)

  function handleGenderChange(value) {
    audioRef.current?.pause()
    audioRef.current = null
    setAudioState('idle')
    setGender(value)
  }

  async function handlePlayToggle() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: japanese, gender }),
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      await audio.play()
      setAudioState('playing')
      track('tts_play', { gender, text_length: japanese.length })
    } catch { setAudioState('idle') }
  }

  return (
    <div className="card">

      {/* 섹션 1: 한국어 입력 → 일본어 → 발음 */}
      <div className="section">
        <div className="section-header">
          {/* 한국어 입력문 — 프라이머리 컬러 */}
          {inputText && (
            <span style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, flex: 1, minWidth: 0, wordBreak: 'break-all' }}>
              {inputText}
            </span>
          )}
          <div className="header-actions">
            <CopyButton getText={() => furigana_html} />
            <GenderToggle gender={gender} onChange={handleGenderChange} />
            <PlayButton audioState={audioState} onToggle={handlePlayToggle} />
          </div>
        </div>
        {/* 일본어 */}
        <p className="japanese-text">
          {segments.map((seg, i) =>
            seg.type === 'ruby' ? (
              <span key={i}>{seg.kanji}<span className="furigana-reading">({seg.reading})</span></span>
            ) : <span key={i}>{seg.content}</span>
          )}
        </p>
        {/* 한국어 발음 */}
        <p className="pronunciation-text">{korean_pronunciation}</p>
      </div>

      {/* 피치 그래프 — full-width */}
      <div style={{ padding: '0 20px 4px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <PitchGraph accentData={accent_data} furigana={furigana} hideHeader />
      </div>

      <hr className="divider" />

      {/* 섹션 2: 문장 분해 — 별도 호출로 뒤이어 채워짐 */}
      <div className="section">
        <div className="section-header">
          <span className="section-label">문장 분해</span>
          {hasBreakdown && (
            <DetailToggleButton showDetail={showDetail} onToggle={() => {
              if (!showDetail) track('breakdown_expand', { text_length: japanese.length })
              setShowDetail(v => !v)
            }} />
          )}
        </div>
        {hasBreakdown ? (
          <>
            <BreakdownTable breakdown={breakdown} showDetail={showDetail} />
            <BreakdownCards breakdown={breakdown} showDetail={showDetail} />
            {/* 동사 감지 시 인스타 강의 CTA */}
            {(() => {
              const verbRow = breakdown.find(r => r.part_of_speech?.includes('동사'))
              if (!verbRow) return null
              return (
                <a
                  href="https://www.instagram.com/p/DZVF2naN7QW/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    margin: '10px 0 2px',
                    padding: '11px 14px',
                    background: 'linear-gradient(135deg, #fdf0f8 0%, #fff5fb 100%)',
                    border: '1.5px solid #f0c0de',
                    borderRadius: 10,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <defs>
                      <linearGradient id="igr" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433"/>
                        <stop offset="50%" stopColor="#dc2743"/>
                        <stop offset="100%" stopColor="#bc1888"/>
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igr)"/>
                    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
                  </svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#c0306a' }}>
                      {verbRow.unit} 표현 확장 무료 강의
                    </p>
                    <p style={{ margin: '1px 0 0', fontSize: 11, color: '#b06090' }}>
                      동사 활용 완벽 정복 · 인스타그램에서 보기
                    </p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M9 18l6-6-6-6" stroke="#c0306a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )
            })()}
          </>
        ) : breakdownLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 4px', color: '#aaa' }}>
            <span className="spinner" style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 13 }}>문장 분해 분석 중...</span>
          </div>
        ) : null}
      </div>

      {/* 저장 버튼 */}
      <div style={{ padding: '0 16px 18px' }}>
        <SaveButton onSave={onSave} saved={saved} />
      </div>

    </div>
  )
}
