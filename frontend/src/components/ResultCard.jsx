import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import CopyButton from './CopyButton'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

/* furigana_html 파싱: "日本語(にほんご)を勉強(べんきょう)しています"
 * → [{type:'ruby', kanji, reading} | {type:'text', content}]
 */
function parseFurigana(str) {
  const regex = /([^\s()（）]+?)\(([^)（）]+)\)/g
  const segments = []
  let lastIndex = 0
  let match
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

/* ── 성별 토글 */
function GenderToggle({ gender, onChange }) {
  return (
    <div className="gender-toggle">
      {[{ value: 'female', label: '여성' }, { value: 'male', label: '남성' }].map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className="gender-btn"
          style={{
            backgroundColor: gender === value ? PRIMARY : 'transparent',
            color: gender === value ? '#fff' : '#888888',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ── 재생 버튼 */
function PlayButton({ audioState, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="play-btn"
      disabled={audioState === 'loading'}
      title={audioState === 'playing' ? '일시정지' : '재생'}
    >
      {audioState === 'loading' ? (
        <span className="spinner" style={{ width: 14, height: 14 }} />
      ) : audioState === 'playing' ? (
        <IconPause />
      ) : (
        <IconPlay />
      )}
    </button>
  )
}

function IconPlay() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
}
function IconPause() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
}

/* ── 활용 단계 펼침 패널 */
function ConjugationPanel({ steps }) {
  return (
    <div style={{
      margin: '10px 0 4px',
      padding: '12px 14px',
      background: '#f8fbfe',
      border: `1px solid ${PRIMARY}33`,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: '0.3px', marginBottom: 8 }}>
        활용 원리
      </p>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 화살표 연결선 */}
          {i > 0 && (
            <div style={{ paddingLeft: 20, color: '#ccc', fontSize: 14, lineHeight: 1, margin: '3px 0' }}>↓</div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            {/* 단계 번호 */}
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              backgroundColor: PRIMARY, color: '#fff',
              fontSize: 10, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{s.step}</span>
            {/* 형태 */}
            <span style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 15, fontWeight: 600, color: '#111',
            }}>{s.form}</span>
            {/* 레이블 */}
            <span style={{
              fontSize: 12, color: '#666',
              background: '#f0f0f0', borderRadius: 6, padding: '1px 7px',
            }}>{s.label}</span>
          </div>
          {/* 설명 */}
          <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0 26px', lineHeight: 1.5 }}>
            {s.note}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ── 문장 분해 행 (데스크탑) — 활용 단계 포함 */
function BreakdownRow({ row, index, expanded, onToggle }) {
  const hasSteps = row.conjugation_steps && row.conjugation_steps.length > 0
  const bg = index % 2 === 1 ? '#f9f9f9' : 'transparent'
  return (
    <>
      <div
        className="breakdown-row"
        style={{ backgroundColor: bg, borderTop: '0.5px solid #eeeeee', cursor: hasSteps ? 'pointer' : 'default', userSelect: 'none' }}
        onClick={hasSteps ? onToggle : undefined}
      >
        {/* 단위 + 뜻 */}
        <div className="breakdown-unit-wrap">
          <span className="breakdown-unit">
            {row.unit}
            {hasSteps && (
              <span style={{ marginLeft: 5, fontSize: 10, color: PRIMARY, fontWeight: 700, verticalAlign: 'middle' }}>
                {expanded ? '▲' : '▼'}
              </span>
            )}
          </span>
          {row.korean_meaning && (
            <span className="breakdown-meaning">{row.korean_meaning}</span>
          )}
        </div>
        <span className="breakdown-cell">{row.hiragana}</span>
        <span className="breakdown-cell">{row.korean_pronunciation}</span>
        <span className="breakdown-cell"><span className="pos-badge">{row.part_of_speech}</span></span>
      </div>
      {hasSteps && expanded && (
        <div className="breakdown-conjugation" style={{ backgroundColor: bg }}>
          <ConjugationPanel steps={row.conjugation_steps} />
        </div>
      )}
    </>
  )
}

/* ── 문장 분해 테이블 (데스크탑) */
function BreakdownTable({ breakdown }) {
  const [expanded, setExpanded] = useState({})
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="breakdown-table" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto' }}>
      <div className="breakdown-row breakdown-header" style={{ gridColumn: '1 / -1', display: 'contents' }}>
        {['단위 / 뜻', '히라가나', '한글 발음', '품사'].map(h => (
          <span key={h} className="breakdown-header-cell">{h}</span>
        ))}
      </div>
      {breakdown.map((row, i) => (
        <BreakdownRow
          key={i}
          row={row}
          index={i}
          expanded={!!expanded[i]}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  )
}

/* ── 문장 분해 카드 (모바일) */
function BreakdownCards({ breakdown }) {
  const [expanded, setExpanded] = useState({})
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="breakdown-cards">
      {breakdown.map((row, i) => {
        const hasSteps = row.conjugation_steps && row.conjugation_steps.length > 0
        return (
          <div key={i} className="breakdown-card-item">
            <div
              className="breakdown-card-top"
              style={{ cursor: hasSteps ? 'pointer' : 'default' }}
              onClick={hasSteps ? () => toggle(i) : undefined}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="breakdown-card-unit">{row.unit}</span>
                {row.korean_meaning && (
                  <span style={{ fontSize: 12, color: '#555' }}>{row.korean_meaning}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pos-badge">{row.part_of_speech}</span>
                {hasSteps && (
                  <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 700 }}>
                    {expanded[i] ? '▲' : '▼'}
                  </span>
                )}
              </div>
            </div>
            <div className="breakdown-card-bottom">
              <span className="breakdown-card-sub">{row.hiragana}</span>
              <span className="breakdown-card-dot">·</span>
              <span className="breakdown-card-sub">{row.korean_pronunciation}</span>
            </div>
            {hasSteps && expanded[i] && (
              <ConjugationPanel steps={row.conjugation_steps} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── 저장 버튼 */
function SaveButton({ onSave, saved }) {
  return (
    <button
      className={`save-btn ${saved ? 'save-btn--saved' : ''}`}
      onClick={onSave}
      disabled={saved}
    >
      {saved ? (
        <>✓ 저장됨</>
      ) : (
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

/* ── 메인 컴포넌트 */
export default function ResultCard({ data, onSave, saved }) {
  const { japanese, furigana, furigana_html, korean_pronunciation, accent_data, breakdown } = data

  const [gender, setGender]         = useState('female')
  const [audioState, setAudioState] = useState('idle')
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
      audioRef.current?.pause()
      audioRef.current = null
      setAudioState('idle')
      return
    }
    if (audioState === 'loading') return

    setAudioState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: japanese, gender }),
      })
      if (!res.ok) throw new Error(`TTS 오류 (${res.status})`)

      const blob  = await res.blob()
      const url   = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio

      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }

      await audio.play()
      setAudioState('playing')
    } catch (err) {
      console.error('TTS 오류:', err)
      setAudioState('idle')
    }
  }

  return (
    <div className="card">

      {/* ── 섹션 1: 일본어 + 그래프 + 한글 발음 */}
      <div className="section">
        <div className="section-header">
          <span className="section-label">일본어</span>
          <div className="header-actions">
            <CopyButton getText={() => furigana_html} />
            <GenderToggle gender={gender} onChange={handleGenderChange} />
            <PlayButton audioState={audioState} onToggle={handlePlayToggle} />
          </div>
        </div>

        <p className="japanese-text">
          {segments.map((seg, i) =>
            seg.type === 'ruby' ? (
              <span key={i}>
                {seg.kanji}
                <span className="furigana-reading">({seg.reading})</span>
              </span>
            ) : (
              <span key={i}>{seg.content}</span>
            )
          )}
        </p>

        <PitchGraph accentData={accent_data} furigana={furigana} hideHeader />
        <p className="pronunciation-text">{korean_pronunciation}</p>
      </div>

      <hr className="divider" />

      {/* ── 섹션 2: 문장 분해 */}
      <div className="section">
        <div className="section-header">
          <span className="section-label">문장 분해</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>동사·형용사는 ▼ 클릭 시 활용 원리 표시</span>
        </div>
        <BreakdownTable breakdown={breakdown} />
        <BreakdownCards breakdown={breakdown} />
      </div>

      {/* ── 저장 버튼 */}
      <div style={{ padding: '0 16px 18px' }}>
        <SaveButton onSave={onSave} saved={saved} />
      </div>

    </div>
  )
}
