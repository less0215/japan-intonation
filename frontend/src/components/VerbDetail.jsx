import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import SignupModal from './SignupModal'
import { useUser } from '../context/UserContext'
import { BreakdownTable, BreakdownCards, DetailToggleButton } from './BreakdownPanel'
import { CONJ_LABELS } from '../data/verbs'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

/* 예문 뜻·원리 보기 — 첫 클릭 시 /analyze 호출, 이후 토글만 */
function ExampleAnalysis({ koreanText }) {
  const [state,      setState]      = useState('idle')   // idle | loading | done | error
  const [showDetail, setShowDetail] = useState(false)
  const [breakdown,  setBreakdown]  = useState(null)

  async function handleToggle() {
    // 데이터 없으면 API 호출
    if (!breakdown) {
      setState('loading')
      try {
        const res = await fetch(`${API_URL}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: koreanText }),
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        setBreakdown(data.breakdown ?? [])
        setState('done')
        setShowDetail(true)
      } catch {
        setState('error')
      }
      return
    }
    setShowDetail(v => !v)
  }

  return (
    <div>
      {/* 구분선 */}
      <div style={{ borderTop: '1px solid #f0f0f0', margin: '12px 0 10px' }} />

      {/* 토글 버튼 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {state === 'loading' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="spinner" style={{ width: 12, height: 12, borderTopColor: PRIMARY, borderColor: `${PRIMARY}33` }} />
            <span style={{ fontSize: 11, color: '#aaa' }}>분석 중...</span>
          </div>
        ) : state === 'error' ? (
          <button onClick={handleToggle} style={btnStyle('#e53e3e', '#fff5f5', '#fed7d7')}>
            다시 시도
          </button>
        ) : (
          <DetailToggleButton
            showDetail={showDetail}
            onToggle={handleToggle}
          />
        )}
      </div>

      {/* 분해 패널 */}
      {breakdown && showDetail && breakdown.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <BreakdownTable breakdown={breakdown} showDetail={showDetail} />
          <BreakdownCards breakdown={breakdown} showDetail={showDetail} />
        </div>
      )}
    </div>
  )
}

function btnStyle(color, bg, border) {
  return {
    height: 26, padding: '0 10px', borderRadius: 13,
    fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
    cursor: 'pointer', border: `1.5px solid ${border}`,
    backgroundColor: bg, color: color,
  }
}

/* 후리가나 형식 "漢字(よみ)" 파싱 → span 렌더링 */
function RubyText({ text }) {
  const regex = /([^\s()（）]+?)\(([^)）]+)\)/g
  const parts = []
  let last = 0, match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'plain', text: text.slice(last, match.index) })
    parts.push({ type: 'ruby', kanji: match[1], reading: match[2] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ type: 'plain', text: text.slice(last) })

  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 17, fontWeight: 500 }}>
      {parts.map((p, i) =>
        p.type === 'ruby' ? (
          <ruby key={i}>
            {p.kanji}
            <rt style={{ fontSize: 10, color: '#888' }}>{p.reading}</rt>
          </ruby>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </span>
  )
}

/* 예문 저장 버튼 */
function SaveExampleButton({ example, onNeedSignup }) {
  const { user, saveResult } = useUser()
  const [state, setState] = useState('idle') // idle | saving | saved

  async function handleSave() {
    if (state === 'saved') return

    // 저장할 result 포맷 — HistoryDrawer가 읽는 구조에 맞춤
    const result = {
      japanese:             example.japanese,
      furigana:             example.furigana ?? '',
      korean_pronunciation: example.reading,
      furigana_html:        example.japanese,
      accent_data:          (example.accentData ?? []).map((p, i) => ({
        phrase_id:  String(p.phrase_id ?? i),
        mora_count: p.mora_count,
        accent:     p.accent,
      })),
      breakdown: [],
    }

    if (!user) {
      // 비로그인 → 부모가 모달 띄우고 완료되면 저장 처리
      onNeedSignup(result)
      return
    }

    setState('saving')
    try {
      await saveResult(user, example.korean, result)
      setState('saved')
    } catch {
      setState('idle')
    }
  }

  return (
    <button onClick={handleSave} style={{
      ...styles.saveBtn,
      backgroundColor: state === 'saved' ? '#e6f7ee' : '#f7f7f7',
      color:           state === 'saved' ? '#38a169' : '#666',
      border:          state === 'saved' ? '1.5px solid #9ae6b4' : '1.5px solid #e8e8e8',
    }}>
      {state === 'saving' ? (
        <span className="spinner" style={{ width: 11, height: 11, borderTopColor: '#666', borderColor: 'rgba(0,0,0,0.15)' }} />
      ) : state === 'saved' ? '✓ 저장됨' : '저장하기'}
    </button>
  )
}

/* 말하기 연습 (성별 토글 + 재생) */
function PracticeButton({ japanesePlain }) {
  const [state,  setState]  = useState('idle')    // idle | loading | playing
  const [gender, setGender] = useState('female')
  const audioRef = useRef(null)

  function handleGender(g) {
    if (state === 'playing') {
      audioRef.current?.pause()
      audioRef.current = null
      setState('idle')
    }
    setGender(g)
  }

  async function handlePlay() {
    if (state === 'playing') {
      audioRef.current?.pause()
      audioRef.current = null
      setState('idle')
      return
    }
    if (state === 'loading') return

    setState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: japanesePlain, gender }),
      })
      if (!res.ok) throw new Error()
      const blob  = await res.blob()
      const url   = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setState('idle'); URL.revokeObjectURL(url) }
      audio.onerror = () => { setState('idle'); URL.revokeObjectURL(url) }
      await audio.play()
      setState('playing')
    } catch {
      setState('idle')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'stretch' }}>
      {/* 성별 토글 */}
      <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #e8e8e8' }}>
        {[{ v: 'female', l: '여성' }, { v: 'male', l: '남성' }].map(({ v, l }) => (
          <button
            key={v}
            onClick={() => handleGender(v)}
            style={{
              flex: 1,
              height: 28,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: gender === v ? PRIMARY : '#fff',
              color:           gender === v ? '#fff' : '#aaa',
              transition: 'all 0.15s',
            }}
          >{l}</button>
        ))}
      </div>
      {/* 재생 버튼 */}
      <button onClick={handlePlay} style={styles.practiceBtn}>
        {state === 'loading' ? (
          <span className="spinner" style={{ width: 13, height: 13, borderTopColor: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }} />
        ) : state === 'playing' ? '⏸ 일시정지' : '▶ 말하기 연습'}
      </button>
    </div>
  )
}

/* 정중체 / 보통체 각 8행 테이블 */
function ConjSection({ title, titleJp, rows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={styles.formTitle}>{title}</span>
        <span style={{ fontSize: 12, color: '#aaa' }}>{titleJp}</span>
      </div>
      <div style={styles.tableWrap}>
        {/* 헤더 */}
        <div style={{ ...styles.tableRow, backgroundColor: '#f7f7f7' }}>
          <span style={styles.headerCell}>구분</span>
          <span style={styles.headerCell}>표현</span>
        </div>
        {rows.map((row, i) => (
          <div key={i} style={{
            ...styles.tableRow,
            borderTop: '1px solid #f0f0f0',
            backgroundColor: i % 2 === 1 ? '#fafafa' : 'transparent',
            // 현재·과거 그룹 사이 시각적 구분
            ...(i === 4 ? { borderTop: '2px solid #e8e8e8' } : {}),
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>
              {CONJ_LABELS[i]}
            </span>
            <div style={styles.formCell}>
              <span style={styles.meaningForm}>{row.meaning}</span>
              <RubyText text={row.text} />
              <span style={styles.readingForm}>{row.ruby}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConjugationTable({ conjugations }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ConjSection title="정중체" titleJp="(です・ます体)" rows={conjugations.formal} />
      <ConjSection title="보통체" titleJp="(普通体)" rows={conjugations.casual} />
    </div>
  )
}

/* 예문 문법 패턴 뱃지 + 설명 */
function PatternBadge({ pattern }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: 6 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          height: 22, padding: '0 8px',
          borderRadius: 11,
          fontSize: 11, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          backgroundColor: open ? `${PRIMARY}15` : '#f5f5f5',
          color: open ? PRIMARY : '#888',
          border: `1px solid ${open ? PRIMARY + '44' : '#e8e8e8'}`,
          transition: 'all 0.15s',
        }}
      >
        <span style={{ fontSize: 10 }}>📌</span>
        {pattern.name}
        <span style={{ fontSize: 9, opacity: 0.7 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{
          marginTop: 6, padding: '10px 12px',
          background: '#f8fbfe',
          border: `1px solid ${PRIMARY}22`,
          borderRadius: 8,
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#222' }}>{pattern.name}</span>
          <span style={{ fontSize: 13, color: PRIMARY, fontWeight: 600 }}>{pattern.meaning}</span>
          <span style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>{pattern.note}</span>
        </div>
      )}
    </div>
  )
}

/* 메인 컴포넌트 */
export default function VerbDetail({ verb, onBack }) {
  const { setUser, saveResult } = useUser()
  // 비로그인 저장 시도 시: 저장할 result를 임시 보관하고 모달 표시
  const [pendingSave, setPendingSave] = useState(null) // { inputText, result }
  const [showSignup,  setShowSignup]  = useState(false)

  function handleNeedSignup(inputText, result) {
    setPendingSave({ inputText, result })
    setShowSignup(true)
  }

  async function handleSignupSuccess(newUser) {
    setUser(newUser)
    setShowSignup(false)
    if (pendingSave) {
      try { await saveResult(newUser, pendingSave.inputText, pendingSave.result) } catch { /* 무시 */ }
      setPendingSave(null)
    }
  }

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* 뒤로가기 + 제목 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={styles.backBtn}>
          ← 목록
        </button>
        <div>
          <span style={styles.verbTitle}>{verb.verb}</span>
          <span style={styles.verbSub}> · {verb.reading} · {verb.meaning}</span>
        </div>
      </div>

      {/* 준비 중 안내 */}
      {!verb.conjugations && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#bbb', fontSize: 15 }}>
          콘텐츠 준비 중이에요 😊<br />
          <span style={{ fontSize: 13 }}>곧 추가될 예정입니다.</span>
        </div>
      )}

      {/* 활용 테이블 (정중체 + 보통체) */}
      {verb.conjugations && (
        <ConjugationTable conjugations={verb.conjugations} />
      )}

      {/* 예문 */}
      {verb.examples.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={styles.sectionTitle}>예문</p>
        {verb.examples.map((ex, i) => (
          <div key={i} style={styles.exampleCard}>

            {/* ① 텍스트 + 버튼 — 좌우 padding */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '14px 16px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, color: '#888' }}>{ex.korean}</span>
                <RubyText text={ex.japanese} />
                <span style={{ fontSize: 12, color: '#5CA9CE' }}>{ex.reading}</span>
                {ex.pattern && <PatternBadge pattern={ex.pattern} />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                <PracticeButton japanesePlain={ex.plain} />
                <SaveExampleButton
                  example={ex}
                  onNeedSignup={(result) => handleNeedSignup(ex.korean, result)}
                />
              </div>
            </div>

            {/* ② 억양 그래프 — padding 없이 카드 full-width, overflow-x 스크롤 */}
            {ex.accentData && ex.furigana && (
              <div style={{
                marginTop: 10,
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
                paddingLeft: 16,
                paddingBottom: 4,
              }}>
                <PitchGraph accentData={ex.accentData} furigana={ex.furigana} hideHeader />
              </div>
            )}

            {/* ③ 뜻·원리 보기 — 좌우 padding */}
            <div style={{ padding: '0 16px 14px' }}>
              <ExampleAnalysis koreanText={ex.korean} />
            </div>

          </div>
        ))}
      </div>
      )}

    </div>

    {/* 회원가입 / 로그인 모달 */}
    {showSignup && (
      <SignupModal
        onSuccess={handleSignupSuccess}
        onClose={() => { setShowSignup(false); setPendingSave(null) }}
      />
    )}
  </>
  )
}

const styles = {
  backBtn: {
    height: 34,
    padding: '0 14px',
    background: 'transparent',
    border: '1.5px solid #e8e8e8',
    borderRadius: 8,
    fontSize: 13,
    color: '#555',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  verbTitle: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "'Noto Sans JP', sans-serif",
    color: '#111',
  },
  verbSub: {
    fontSize: 14,
    color: '#888',
  },
  formTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#111',
  },
  tableWrap: {
    border: '1.5px solid #eeeeee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    padding: '9px 12px',
    gap: 8,
    alignItems: 'start',
  },
  headerCell: {
    fontSize: 11,
    fontWeight: 700,
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  labelCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  formCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  readingForm: {
    fontSize: 12,
    color: '#888',
    fontWeight: 400,
  },
  meaningForm: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: 700,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#111',
  },
  exampleCard: {
    background: '#ffffff',
    border: '1.5px solid #eeeeee',
    borderRadius: 12,
    padding: 0,           /* 섹션별로 개별 padding — 그래프 full-width 스크롤을 위해 */
    overflow: 'hidden',   /* borderRadius 안쪽 clip */
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  practiceBtn: {
    height: 36,
    padding: '0 14px',
    backgroundColor: PRIMARY,
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    whiteSpace: 'nowrap',
  },
  saveBtn: {
    height: 32,
    padding: '0 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s',
  },
}
