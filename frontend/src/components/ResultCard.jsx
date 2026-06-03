import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import CopyButton from './CopyButton'

const PRIMARY    = '#5CA9CE'
const API_URL    = 'http://localhost:8000'

/* ── 유틸: furigana_html 문자열 파싱
 * 입력: "日本語(にほんご)を勉強(べんきょう)しています"
 * 출력: [{type:'ruby', kanji, reading} | {type:'text', content}]
 */
function parseFurigana(str) {
  const regex = /([^\s()（）]+?)\(([^)）]+)\)/g
  const segments = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: str.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'ruby', kanji: match[1], reading: match[2] })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < str.length) {
    segments.push({ type: 'text', content: str.slice(lastIndex) })
  }
  return segments
}

/* ── 구분선 */
function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '0' }} />
}

/* ── 섹션 헤더: 레이블 + 버튼 그룹 */
function SectionHeader({ label, children }) {
  return (
    <div style={styles.sectionHeader}>
      <span style={styles.sectionLabel}>{label}</span>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  )
}

/* ── 성별 토글 버튼 쌍 */
function GenderToggle({ gender, onChange }) {
  const opts = [
    { value: 'female', label: '여성' },
    { value: 'male',   label: '남성' },
  ]
  return (
    <div style={styles.toggleWrap}>
      {opts.map(({ value, label }) => {
        const active = gender === value
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            style={{
              ...styles.toggleBtn,
              backgroundColor: active ? PRIMARY : 'transparent',
              color:           active ? '#ffffff' : '#888888',
              border:          active ? 'none' : '0.5px solid #cccccc',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/* ── 재생 버튼
 * audioState: 'idle' | 'loading' | 'playing'
 */
function PlayButton({ audioState, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={styles.playBtn}
      title={audioState === 'playing' ? '일시정지' : '재생'}
      disabled={audioState === 'loading'}
    >
      {audioState === 'loading' ? (
        /* 로딩 스피너 */
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
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

/* ── 문장 분해 테이블 */
function BreakdownTable({ breakdown }) {
  const HEADERS = ['단위', '히라가나', '한글 발음', '품사']

  return (
    <div style={styles.tableWrap}>
      {/* 헤더 행 */}
      <div style={{ ...styles.tableRow, ...styles.tableHeader }}>
        {HEADERS.map(h => (
          <span key={h} style={styles.headerCell}>{h}</span>
        ))}
      </div>

      {/* 데이터 행 */}
      {breakdown.map((row, i) => (
        <div
          key={i}
          style={{
            ...styles.tableRow,
            backgroundColor: i % 2 === 1 ? '#f9f9f9' : 'transparent',
            borderTop: '0.5px solid #eeeeee',
          }}
        >
          <span style={styles.unitCell}>{row.unit}</span>
          <span style={styles.dataCell}>{row.hiragana}</span>
          <span style={styles.dataCell}>{row.korean_pronunciation}</span>
          <span style={styles.dataCell}>
            <span style={styles.posBadge}>{row.part_of_speech}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── 메인 컴포넌트 */
export default function ResultCard({ data }) {
  const { japanese, furigana, furigana_html, korean_pronunciation, accent_data, breakdown } = data

  // 성별 상태: 'female' | 'male'
  const [gender, setGender] = useState('female')
  // 오디오 재생 상태: 'idle' | 'loading' | 'playing'
  const [audioState, setAudioState] = useState('idle')
  // 현재 재생 중인 Audio 인스턴스 참조
  const audioRef = useRef(null)

  const segments = parseFurigana(furigana_html)

  /* 성별 변경 시 재생 중이면 중단 */
  function handleGenderChange(value) {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setAudioState('idle')
    setGender(value)
  }

  /* 재생/일시정지 토글 */
  async function handlePlayToggle() {
    // 재생 중 → 일시정지
    if (audioState === 'playing') {
      audioRef.current?.pause()
      audioRef.current = null
      setAudioState('idle')
      return
    }

    // 로딩 중 클릭 무시
    if (audioState === 'loading') return

    setAudioState('loading')

    try {
      // /tts 엔드포인트로 MP3 요청
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: japanese, gender }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `TTS 오류 (${res.status})`)
      }

      // Blob → objectURL → Audio 재생
      const blob     = await res.blob()
      const url      = URL.createObjectURL(blob)
      const audio    = new Audio(url)
      audioRef.current = audio

      // 재생 완료 시 상태 초기화
      audio.onended = () => {
        setAudioState('idle')
        URL.revokeObjectURL(url)
        audioRef.current = null
      }

      // 오류 시 상태 초기화
      audio.onerror = () => {
        setAudioState('idle')
        URL.revokeObjectURL(url)
        audioRef.current = null
      }

      await audio.play()
      setAudioState('playing')

    } catch (err) {
      console.error('TTS 재생 오류:', err)
      setAudioState('idle')
    }
  }

  return (
    <div style={styles.card}>

      {/* ────── 섹션 1: 일본어 + 그래프 + 한글 발음 ────── */}
      <div style={styles.section}>
        {/* 헤더: 레이블 | [복사] [여성|남성] [재생] */}
        <SectionHeader label="일본어">
          <CopyButton getText={() => furigana_html} />
          <GenderToggle gender={gender} onChange={handleGenderChange} />
          <PlayButton audioState={audioState} onToggle={handlePlayToggle} />
        </SectionHeader>

        {/* 인라인 후리가나 텍스트 */}
        <p style={styles.japaneseText}>
          {segments.map((seg, i) =>
            seg.type === 'ruby' ? (
              <span key={i}>
                {seg.kanji}
                <span style={styles.reading}>({seg.reading})</span>
              </span>
            ) : (
              <span key={i}>{seg.content}</span>
            )
          )}
        </p>

        {/* 인토네이션 그래프 */}
        <PitchGraph accentData={accent_data} furigana={furigana} hideHeader />

        {/* 한글 발음 — 서브텍스트 */}
        <p style={styles.pronunciationText}>{korean_pronunciation}</p>
      </div>

      <Divider />

      {/* ────── 섹션 2: 문장 분해 ────── */}
      <div style={styles.section}>
        <SectionHeader label="문장 분해" />
        <BreakdownTable breakdown={breakdown} />
      </div>

    </div>
  )
}

/* ── 스타일 */
const styles = {
  card: {
    border: '1.5px solid #e8e8e8',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  section: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  // 일본어 본문
  japaneseText: {
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: "'Noto Sans JP', sans-serif",
    lineHeight: '1.7',
    color: '#111111',
    margin: 0,
  },
  // 괄호+후리가나
  reading: {
    color: PRIMARY,
    fontSize: '0.75em',
    fontWeight: '400',
  },
  // 한글 발음 서브텍스트
  pronunciationText: {
    fontSize: '14px',
    color: '#888888',
    margin: 0,
    lineHeight: '1.5',
  },
  // 성별 토글 래퍼
  toggleWrap: {
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    gap: '1px',
    backgroundColor: '#e0e0e0', // 버튼 사이 gap 배경
  },
  // 성별 토글 개별 버튼
  toggleBtn: {
    height: '30px',
    padding: '0 12px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'inherit',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s',
    whiteSpace: 'nowrap',
  },
  // 재생 버튼
  playBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    backgroundColor: PRIMARY,
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'opacity 0.15s',
  },
  // 문장 분해 테이블
  tableWrap: {
    borderRadius: '8px',
    border: '1px solid #eeeeee',
    overflow: 'hidden',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1.4fr 1.4fr 1fr',
    alignItems: 'center',
    padding: '10px 14px',
    gap: '8px',
  },
  tableHeader: {
    backgroundColor: '#fafafa',
  },
  headerCell: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  unitCell: {
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: "'Noto Sans JP', sans-serif",
    color: '#111111',
  },
  dataCell: {
    fontSize: '14px',
    color: '#555555',
  },
  posBadge: {
    display: 'inline-block',
    fontSize: '11px',
    color: '#666666',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '2px 7px',
  },
}
