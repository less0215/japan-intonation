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

// 번역 톤 칩
const TONES = [
  { key: 'natural',  label: '자연스럽게', hint: '' },
  { key: 'business', label: '비즈니스',   hint: '정중한 경어체 (です·ます·おります)' },
  { key: 'literal',  label: '직역',       hint: '구조 그대로 — 학습용' },
]

export default function ResultCard({ data, onSave, saved, inputText, breakdownLoading, onRequestBreakdown, onBreakdownExpanded }) {
  // 톤 전환 — 'natural'은 원본 data, 그 외는 /translate-tone 로 받아 교체(칩 누를 때 생성)
  const [tone, setTone]         = useState('natural')
  const [toneData, setToneData] = useState({})   // { business: {...}, literal: {...} }
  const [toneLoading, setToneLoading] = useState(false)

  const view = tone === 'natural' ? data : (toneData[tone] || data)
  const { japanese, furigana, furigana_html, korean_pronunciation, accent_data, breakdown } = view
  // 분해 표시 여부는 '현재 보고 있는 톤'의 breakdown 기준 (톤별로 따로 보관) — 톤 전환 시 undefined 크래시 방지
  const hasBreakdown = breakdown && breakdown.length > 0

  // 현재 보이는 문장(톤 적용본)에 대한 분해를 별도로 받아 해당 톤에 병합 (natural은 부모가 처리)
  async function fetchToneBreakdown(t, jp) {
    if (!jp) return
    try {
      const res = await fetch(`${API_URL}/breakdown`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ japanese: jp }),
      })
      if (!res.ok) throw new Error()
      const { breakdown: bd } = await res.json()
      setToneData(prev => ({ ...prev, [t]: { ...(prev[t] || {}), breakdown: bd } }))
    } catch {}
  }

  async function handleTone(t) {
    if (t === tone) return
    if (t === 'natural' || toneData[t]) {
      setTone(t); track('tone_switch', { tone: t, cached: true })
      // 이미 분해를 펼친 상태에서 톤을 바꿨는데 그 톤에 분해가 아직 없으면 받아온다
      if (expanded && t !== 'natural' && !(toneData[t]?.breakdown?.length)) fetchToneBreakdown(t, toneData[t]?.japanese)
      return
    }
    if (!inputText) return
    setTone(t)
    setToneLoading(true)
    track('tone_switch', { tone: t, cached: false })
    try {
      const res = await fetch(`${API_URL}/translate-tone`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, tone: t }),
      })
      if (!res.ok) throw new Error()
      const d = await res.json()
      setToneData(prev => ({ ...prev, [t]: d }))
      // 분해가 펼쳐진 상태였다면 이 톤 문장에 대한 분해도 이어서 받아온다
      if (expanded && d?.japanese) fetchToneBreakdown(t, d.japanese)
    } catch {
      setTone('natural')   // 실패 시 기본으로 복귀
    } finally {
      setToneLoading(false)
    }
  }

  const [gender, setGender]         = useState('female')
  const [audioState, setAudioState] = useState('idle')
  const [showDetail, setShowDetail] = useState(false)
  // 문장 분해는 기본 접힘 — 펼칠 때만 실제 호출(온디맨드)
  const [expanded, setExpanded]     = useState(false)

  const breakdownRef = useRef(null)

  function handleExpandBreakdown() {
    track('breakdown_expand', { text_length: japanese.length })
    setExpanded(true)
    if (!hasBreakdown) {
      // natural은 부모가 결과에 병합, 그 외 톤은 현재 문장 기준으로 직접 받아온다
      if (tone === 'natural') onRequestBreakdown?.()
      else fetchToneBreakdown(tone, japanese)
    }
    onBreakdownExpanded?.()   // 여행 추천 팝업 트리거 armed
  }

  // 펼친 직후 + 분해 콘텐츠가 실제로 그려진 뒤, 누른 자리(분해 섹션)를 화면 상단으로
  useEffect(() => {
    if (!expanded) return
    requestAnimationFrame(() => {
      breakdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [expanded, hasBreakdown])

  // 새 번역(다른 문장)이 오면 분해 접기 + 톤 기본(자연스럽게)으로 초기화
  useEffect(() => { setExpanded(false); setShowDetail(false); setTone('natural'); setToneData({}) }, [data.japanese])

  // 맥락 기반 '이런 뜻일 수도' 제안 — 입력이 중의적일 때만 채워짐(아니면 빈 배열 → 카드 숨김)
  const [nuances, setNuances] = useState([])
  useEffect(() => {
    setNuances([])
    if (!inputText) return
    let alive = true
    fetch(`${API_URL}/nuances`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (alive && d?.alternatives?.length) { setNuances(d.alternatives); track('nuance_shown', { count: d.alternatives.length }) } })
      .catch(() => {})
    return () => { alive = false }
  }, [inputText, data.japanese])
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

        {/* 번역 톤 칩 — 누를 때 생성(자연스럽게/비즈니스/직역) */}
        {inputText && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {TONES.map(t => {
                const on = tone === t.key
                const busy = toneLoading && on
                return (
                  <button key={t.key} onClick={() => handleTone(t.key)} disabled={toneLoading} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'inherit', cursor: toneLoading ? 'default' : 'pointer',
                    fontSize: 11.5, fontWeight: on ? 600 : 500, padding: '5px 12px', borderRadius: 999,
                    border: `1px solid ${on ? PRIMARY : 'var(--bd,#e3e7ea)'}`, background: on ? PRIMARY : 'var(--surface,#fff)', color: on ? '#fff' : 'var(--text-2,#6b7177)',
                  }}>
                    {busy && <span style={{ width: 9, height: 9, border: '1.5px solid rgba(255,255,255,0.5)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'tjspin 0.6s linear infinite' }} />}
                    {t.label}
                  </button>
                )
              })}
            </div>
            {(() => { const h = TONES.find(t => t.key === tone)?.hint; return h ? (
              <p style={{ margin: '6px 2px 0', fontSize: 10.5, color: '#9aa0a6' }}>{h}</p>
            ) : null })()}
          </div>
        )}

        {/* 맥락 기반 제안 — 입력이 중의적일 때만 노출 */}
        {nuances.length > 0 && (
          <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: 12 }}>
            <p style={{ margin: '0 0 9px', fontSize: 12, fontWeight: 700, color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 13 }}>💡</span> 이런 뜻일 수도 있어요
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {nuances.map((n, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: i ? 10 : 0, borderTop: i ? '1px solid var(--bd)' : 'none' }}>
                  <span style={{ fontSize: 11.5, color: PRIMARY, fontWeight: 600 }}>{n.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, fontWeight: 500, color: 'var(--text-strong)', flex: 1, minWidth: 0 }}>{n.japanese}</span>
                    <CopyButton getText={() => n.japanese} onCopy={() => track('nuance_copy', { label: n.label, index: i, count: nuances.length })} />
                  </div>
                  {n.reading && <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{n.reading}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes tjspin{to{transform:rotate(360deg)}}`}</style>

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
