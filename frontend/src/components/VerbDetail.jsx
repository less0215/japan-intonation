import { useState, useRef } from 'react'
import { BreakdownTable, BreakdownCards, DetailToggleButton, ExampleAnalysis } from './BreakdownPanel'
import { track } from '../App'
import JlptBadge from './JlptBadge'
import PitchGraph from './PitchGraph'
import PronunciationPractice from './PronunciationPractice'
import SignupModal from './SignupModal'
import { useUser } from '../context/UserContext'
import WordBookmarkButton from './WordBookmarkButton'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import ExampleCard from './ExampleCard'
import { CONJ_LABELS } from '../data/verbs'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'



function btnStyle(color, bg, border) {
  return {
    height: 26, padding: '0 10px', borderRadius: 13,
    fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
    cursor: 'pointer', border: `1.5px solid ${border}`,
    backgroundColor: bg, color: color,
  }
}

/* 漢字(よみ) → 순수 히라가나 (PitchGraph furigana용) */
const stripFurigana = (text) => text.replace(/\([^)）]+\)/g, '')
const toHiragana   = (text) =>
  text.replace(/[^\s()（）]+?\(([^)）]+)\)/g, '$1').replace(/[？。、！↑\s]/g, '')

/* 히라가나 → 모라 배열 (PitchGraph의 splitMora와 동일) */
function splitMoraLocal(hiragana) {
  const smallKana = new Set(['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ','ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ'])
  const chars = [...hiragana]; const mora = []
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && smallKana.has(chars[i + 1])) { mora.push(chars[i] + chars[i + 1]); i++ }
    else mora.push(chars[i])
  }
  return mora
}

/*
 * accentType 기반 로컬 악센트 계산 (OJAD 없이 즉시)
 *   0 = 平板型  (LH…H) : [0, 1, 1, ...]
 *   1 = 頭高型  (HL…L) : [1, 0, 0, ...]
 *   n≥2 = 中高型 (ドロップがn拍目の後): [0, 1…1, 0, 0, ...]
 */
function computeAccentLocal(furigana, accentType) {
  const mora = splitMoraLocal(furigana)
  if (mora.length === 0) return null
  const n = accentType ?? 0
  const accent = mora.map((_, i) => {
    if (n === 0) return i === 0 ? 0 : 1
    if (i === 0) return n === 1 ? 1 : 0
    return i < n ? 1 : 0
  })
  return [{ phrase_id: '0', mora_count: mora.length, accent }]
}

/* 활용형 행 — TTS(스피커) + 억양(파형 버튼) 독립 */
function FormRow({ row, index, gender, accentType, borderStyle }) {
  const [audioState, setAudioState] = useState('idle')
  const [showGraph,  setShowGraph]  = useState(false)
  const audioRef = useRef(null)

  const plainText  = stripFurigana(row.text)
  const furigana   = toHiragana(row.text)
  // OJAD 대신 로컬 계산 — 즉시, API 불필요
  const accentData = furigana ? computeAccentLocal(furigana, accentType ?? 0) : null

  /* ── TTS 재생 */
  async function handlePlay() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainText, gender }),
      })
      if (!res.ok) throw new Error()
      const blob  = await res.blob()
      const url   = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      await audio.play()
      setAudioState('playing')
    } catch { setAudioState('idle') }
  }

  const graphActive = showGraph && accentData

  return (
    <div style={{ borderTop: borderStyle?.borderTop, backgroundColor: borderStyle?.bg }}>
      {/* 표현 행 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', padding: '9px 12px', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{CONJ_LABELS[index]}</span>
        <div style={styles.formCell}>
          <span style={styles.meaningForm}>{row.meaning}</span>
          <RubyText text={row.text} />
          <span style={styles.readingForm}>{row.ruby}</span>
        </div>
        {/* 버튼 묶음 */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
          {/* 억양 그래프 버튼 */}
          <button
            onClick={() => setShowGraph(v => !v)}
            title="억양 그래프"
            style={{
              width: 26, height: 26, borderRadius: 6,
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
          {/* TTS 스피커 버튼 */}
          <button onClick={handlePlay} title={audioState === 'playing' ? '정지' : '발음 듣기'} style={{
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${audioState === 'playing' ? PRIMARY : 'var(--bd)'}`,
            backgroundColor: audioState === 'playing' ? `${PRIMARY}18` : 'transparent',
            cursor: 'pointer',
          }}>
            {audioState === 'loading' ? (
              <span className="spinner" style={{ width: 9, height: 9, borderTopColor: PRIMARY, borderColor: 'var(--bd)' }} />
            ) : audioState === 'playing' ? (
              <svg width="9" height="9" viewBox="0 0 24 24" fill={PRIMARY}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="var(--text-3)"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* 억양 그래프 — 즉시 렌더 */}
      {graphActive && furigana && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '2px 12px 10px' }}>
          <PitchGraph accentData={accentData} furigana={furigana} hideHeader />
          <PronunciationPractice compact accentData={accentData} furigana={furigana} japanese={plainText} korean_pronunciation={row.ruby} inputText={row.meaning} />
        </div>
      )}
    </div>
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
      backgroundColor: state === 'saved' ? '#e6f7ee' : 'var(--surface-2)',
      color:           state === 'saved' ? '#38a169' : 'var(--text-2)',
      border:          state === 'saved' ? '1.5px solid #9ae6b4' : '1.5px solid var(--bd)',
    }}>
      {state === 'saving' ? (
        <span className="spinner" style={{ width: 11, height: 11, borderTopColor: 'var(--text-2)', borderColor: 'rgba(0,0,0,0.15)' }} />
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
      <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid var(--bd)' }}>
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
              color:           gender === v ? '#fff' : 'var(--text-3)',
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
function ConjSection({ title, titleJp, rows, accentType }) {
  const [gender, setGender] = useState('female')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* 성별 토글 (오른쪽 정렬) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', border: '1.5px solid var(--bd)', borderRadius: 8, overflow: 'hidden' }}>
          {[{ v: 'female', l: '여성' }, { v: 'male', l: '남성' }].map(({ v, l }) => (
            <button key={v} onClick={() => setGender(v)} style={{
              height: 26, padding: '0 10px', fontSize: 11, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', border: 'none',
              backgroundColor: gender === v ? PRIMARY : '#fff',
              color:           gender === v ? '#fff' : 'var(--text-3)',
              transition: 'all 0.15s',
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={styles.tableWrap}>
        {/* 헤더 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 28px', padding: '8px 12px', gap: 8, backgroundColor: 'var(--surface-2)' }}>
          <span style={styles.headerCell}>구분</span>
          <span style={styles.headerCell}>표현</span>
          <span />
        </div>
        {rows.map((row, i) => (
          <FormRow
            key={i}
            row={row}
            index={i}
            gender={gender}
            accentType={accentType}
            borderStyle={{
              borderTop: i === 4 ? '2px solid var(--bd)' : '1px solid var(--bd)',
              bg: i % 2 === 1 ? 'var(--surface-2)' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ConjugationTable({ conjugations, accentType }) {
  const [tab, setTab] = useState('formal')
  const tabs = [
    { id: 'formal', label: '정중체', labelJp: 'です・ます体' },
    { id: 'casual', label: '보통체', labelJp: '普通体' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* 탭 */}
      <div style={{ display: 'flex', border: '1.5px solid var(--bd)', borderRadius: 10, overflow: 'hidden', alignSelf: 'flex-start' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '7px 18px', fontSize: 13, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer', border: 'none',
            backgroundColor: tab === t.id ? PRIMARY : '#fff',
            color:           tab === t.id ? '#fff' : 'var(--text-3)',
            transition: 'all 0.15s',
          }}>
            {t.label}
            <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 4, opacity: 0.8 }}>
              {t.labelJp}
            </span>
          </button>
        ))}
      </div>
      <ConjSection
        key={tab}
        title={tab === 'formal' ? '정중체' : '보통체'}
        titleJp={tab === 'formal' ? '(です・ます体)' : '(普通体)'}
        rows={tab === 'formal' ? conjugations.formal : conjugations.casual}
        accentType={accentType}
      />
    </div>
  )
}

/* 예문 문법 패턴 뱃지 + 설명 */
function PatternBadge({ pattern }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: 6 }}>
      <button
        onClick={() => { if (!open) track('pattern_expand', { pattern: pattern.name, category: 'verb' }); setOpen(v => !v) }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          height: 22, padding: '0 8px',
          borderRadius: 11,
          fontSize: 11, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
          backgroundColor: open ? `${PRIMARY}15` : 'var(--surface-2)',
          color: open ? PRIMARY : 'var(--text-2)',
          border: `1px solid ${open ? PRIMARY + '44' : 'var(--bd)'}`,
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
          background: 'var(--surface-2)',
          border: `1px solid ${PRIMARY}22`,
          borderRadius: 8,
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>{pattern.name}</span>
          <span style={{ fontSize: 13, color: PRIMARY, fontWeight: 600 }}>{pattern.meaning}</span>
          <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{pattern.note}</span>
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

      {/* 뒤로 가기 */}
      <button onClick={onBack} style={styles.backBtn}>← 목록으로</button>

      {/* 헤더 카드 — WordDetail과 동일한 스타일로 통일 */}
      <div style={{
        background: `linear-gradient(135deg, ${PRIMARY}18 0%, ${PRIMARY}08 100%)`,
        border: `1.5px solid ${PRIMARY}33`,
        borderRadius: 14,
        padding: '18px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <JlptBadge level={verb.jlpt} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: PRIMARY,
              background: `${PRIMARY}18`, borderRadius: 8, padding: '2px 8px',
            }}>
              동사 #{verb.rank}위
            </span>
          </div>
          <WordBookmarkButton wordInfo={{ id: verb.id, category: 'verb', word: verb.verb, reading: verb.reading, meaning: verb.meaning }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 36, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>
            {verb.verb}
          </span>
          <span style={{ fontSize: 16, color: PRIMARY, fontWeight: 600 }}>
            {verb.reading}
          </span>
        </div>
        <div style={{ fontSize: 16, color: 'var(--text-2)', marginTop: 4 }}>
          {verb.meaning}
        </div>
      </div>

      {/* 인스타 강의 배너 */}
      <a
        href="https://www.instagram.com/p/DZ6TPrATN4l/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('instagram_banner_click', { category: 'verb', word_id: verb.id, word: verb.verb })}
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
        {/* 인스타 아이콘 */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
        </svg>

        {/* 텍스트 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#c0306a' }}>
            {verb.verb} 표현 확장 무료 강의
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#b06090' }}>
            동사 활용 완벽 정복 · 인스타그램에서 보기
          </p>
        </div>

        {/* 화살표 */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="#c0306a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* 준비 중 안내 — WordDetail과 동일한 스타일로 통일 */}
      {!verb.conjugations && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '48px 20px',
          background: 'var(--surface-2)',
          borderRadius: 14,
          border: '1.5px dashed #e0e0e0',
        }}>
          <span style={{ fontSize: 32, marginBottom: 12 }}>🚧</span>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-2)', margin: '0 0 6px' }}>
            곧 업데이트 됩니다
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
            이 단어의 활용 데이터를 준비 중이에요.
          </p>
        </div>
      )}

      {/* 활용 테이블 (정중체 + 보통체) */}
      {verb.conjugations && (
        <ConjugationTable conjugations={verb.conjugations} accentType={verb.accentType ?? 0} />
      )}

      {/* 예문 — 다른 품사와 동일한 공용 ExampleCard 사용 (UIUX 일관성) */}
      {verb.examples.length > 0 && (
      <div id="examples-section" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={styles.sectionTitle}>예문</p>
        {verb.examples.map((ex, i) => (
          <ExampleCard
            key={i}
            example={ex}
            index={i}
            wordInfo={{ id: verb.id, category: 'verb', word: verb.verb, reading: verb.reading }}
          />
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
    border: '1.5px solid var(--bd)',
    borderRadius: 8,
    fontSize: 13,
    color: 'var(--text-2)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  verbTitle: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "'Noto Sans JP', sans-serif",
    color: 'var(--text-strong)',
  },
  verbSub: {
    fontSize: 14,
    color: 'var(--text-3)',
  },
  formTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text-strong)',
  },
  tableWrap: {
    border: '1.5px solid var(--bd)',
    borderRadius: 10,
    overflow: 'visible',   /* 억양 그래프가 행 아래로 펼쳐지도록 */
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
    color: 'var(--text-3)',
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
    color: 'var(--text-3)',
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
    color: 'var(--text-strong)',
  },
  exampleCard: {
    background: 'var(--surface)',
    border: '1.5px solid var(--bd)',
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
