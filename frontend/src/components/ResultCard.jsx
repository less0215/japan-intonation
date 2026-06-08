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

function FeedbackSection({ inputText, japanese, userId, anonymousId }) {
  const [rating, setRating]       = useState(null)   // null | 'good' | 'bad'
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)

  async function sendFeedback(selectedRating, commentText) {
    setSending(true)
    try {
      await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || null,
          anonymous_id: anonymousId || null,
          input_text: inputText,
          japanese,
          rating: selectedRating,
          comment: commentText || null,
        }),
      })
    } catch {}
    setSending(false)
    setSubmitted(true)
  }

  function handleRating(value) {
    setRating(value)
    setShowComment(true)
  }

  function handleSubmit() {
    sendFeedback(rating, comment)
  }

  function handleSkip() {
    sendFeedback(rating, null)
  }

  if (submitted) {
    return (
      <div className="feedback-done">
        피드백 감사합니다 🙏
      </div>
    )
  }

  return (
    <div className="feedback-section">
      <span className="feedback-label">번역 품질이 어떤가요?</span>
      <div className="feedback-btns">
        <button
          className={`feedback-btn ${rating === 'good' ? 'feedback-btn--good' : ''}`}
          onClick={() => handleRating('good')}
          disabled={sending}
          title="좋아요"
        >👍</button>
        <button
          className={`feedback-btn ${rating === 'bad' ? 'feedback-btn--bad' : ''}`}
          onClick={() => handleRating('bad')}
          disabled={sending}
          title="별로예요"
        >👎</button>
      </div>
      {showComment && (
        <div className="feedback-comment">
          <textarea
            className="feedback-textarea"
            placeholder="어떤 점이 아쉬웠나요? (선택)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={2}
            maxLength={300}
          />
          <div className="feedback-comment-actions">
            <button className="feedback-skip" onClick={handleSkip} disabled={sending}>건너뛰기</button>
            <button className="feedback-submit" onClick={handleSubmit} disabled={sending}>
              {sending ? <span className="spinner" style={{ width: 12, height: 12, borderColor: 'rgba(255,255,255,0.4)', borderTopColor: '#fff' }} /> : '제출'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ResultCard({ data, onSave, saved, inputText, breakdownLoading, userId, anonymousId }) {
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
          </>
        ) : breakdownLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 4px', color: '#aaa' }}>
            <span className="spinner" style={{ width: 14, height: 14 }} />
            <span style={{ fontSize: 13 }}>문장 분해 분석 중...</span>
          </div>
        ) : null}
      </div>

      {/* 저장 버튼 */}
      <div style={{ padding: '0 16px 12px' }}>
        <SaveButton onSave={onSave} saved={saved} />
      </div>

      <hr className="divider" />

      {/* 피드백 */}
      <FeedbackSection
        inputText={inputText}
        japanese={japanese}
        userId={userId}
        anonymousId={anonymousId}
      />

    </div>
  )
}
