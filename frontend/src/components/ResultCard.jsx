import { useState, useRef, useEffect } from 'react'
import PitchGraph from './PitchGraph'
import CopyButton from './CopyButton'
import { BreakdownTable, BreakdownCards, DetailToggleButton, BreakdownPreview } from './BreakdownPanel'
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

export default function ResultCard({ data, onSave, saved, inputText, breakdownLoading, onRequestBreakdown }) {
  const { japanese, furigana, furigana_html, korean_pronunciation, accent_data, breakdown } = data
  const hasBreakdown = breakdown && breakdown.length > 0

  const [gender, setGender]         = useState('female')
  const [audioState, setAudioState] = useState('idle')
  const [showDetail, setShowDetail] = useState(false)
  // 문장 분해는 기본 접힘 — 펼칠 때만 실제 호출(온디맨드)
  const [expanded, setExpanded]     = useState(false)

  const breakdownRef = useRef(null)

  function handleExpandBreakdown() {
    track('breakdown_expand', { text_length: japanese.length })
    setExpanded(true)
    if (!hasBreakdown) onRequestBreakdown?.()   // 아직 없으면 이때 1회 호출
  }

  // 펼친 직후 + 분해 콘텐츠가 실제로 그려진 뒤, 누른 자리(분해 섹션)를 화면 상단으로
  useEffect(() => {
    if (!expanded) return
    requestAnimationFrame(() => {
      breakdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [expanded, hasBreakdown])

  // 새 번역(다른 문장)이 오면 분해 다시 접기
  useEffect(() => { setExpanded(false); setShowDetail(false) }, [japanese])
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

      {/* 섹션 2: 문장 분해 — 기본 접힘(정적 예시), 펼칠 때만 실제 호출 */}
      <div className="section" ref={breakdownRef} style={{ scrollMarginTop: 12 }}>
        <div className="section-header">
          <span className="section-label">문장 분해</span>
          {expanded && hasBreakdown && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DetailToggleButton showDetail={showDetail} onToggle={() => setShowDetail(v => !v)} />
              <button
                onClick={() => setExpanded(false)}
                style={{ height: 26, padding: '0 8px', borderRadius: 13, fontSize: 11, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', border: '1.5px solid #e0e0e0', background: 'transparent', color: '#aaa' }}
              >
                접기
              </button>
            </div>
          )}
        </div>
        {!expanded ? (
          <BreakdownPreview onExpand={handleExpandBreakdown} />
        ) : hasBreakdown ? (
          <>
            <BreakdownTable breakdown={breakdown} showDetail={showDetail} />
            <BreakdownCards breakdown={breakdown} showDetail={showDetail} />
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 4px', color: '#aaa' }}>
            <span className="spinner" style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 13 }}>문장 분해 분석 중...</span>
          </div>
        )}
      </div>

      {/* 저장 버튼 */}
      <div style={{ padding: '0 16px 18px' }}>
        <SaveButton onSave={onSave} saved={saved} />
      </div>

    </div>
  )
}
