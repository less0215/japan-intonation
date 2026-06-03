import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

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

/* 말하기 연습 버튼 */
function PracticeButton({ japanesePlain }) {
  const [state, setState] = useState('idle') // idle | loading | playing
  const audioRef = useRef(null)

  async function handleClick() {
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
        body: JSON.stringify({ text: japanesePlain, gender: 'female' }),
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
    <button onClick={handleClick} style={styles.practiceBtn}>
      {state === 'loading' ? (
        <span className="spinner" style={{ width: 13, height: 13, borderTopColor: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }} />
      ) : state === 'playing' ? (
        '⏸ 일시정지'
      ) : (
        '▶ 말하기 연습'
      )}
    </button>
  )
}

/* 활용 테이블 */
function FormTable({ form }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={styles.formTitle}>
        {form.name} <span style={{ color: '#aaa', fontSize: 12 }}>{form.nameJp}</span>
      </p>
      <div style={styles.tableWrap}>
        {/* 헤더 */}
        <div style={{ ...styles.tableRow, backgroundColor: '#f7f7f7' }}>
          <span style={styles.headerCell}>구분</span>
          <span style={styles.headerCell}>정중체 (です・ます)</span>
          <span style={styles.headerCell}>보통체 (辞書形)</span>
        </div>
        {/* 행 */}
        {form.rows.map((row, i) => (
          <div key={i} style={{ ...styles.tableRow, borderTop: '1px solid #f0f0f0', backgroundColor: i % 2 === 1 ? '#fafafa' : 'transparent' }}>
            <div style={styles.labelCell}>
              <span style={{ fontWeight: 600, fontSize: 13, color: '#333' }}>{row.label}</span>
              {row.sub && <span style={{ fontSize: 11, color: '#aaa' }}>{row.sub}</span>}
            </div>
            <div style={styles.formCell}>
              <span style={styles.japaneseForm}>{row.formal.text}</span>
              <span style={styles.readingForm}>{row.formal.ruby}</span>
              <span style={styles.meaningForm}>{row.formal.meaning}</span>
            </div>
            <div style={styles.formCell}>
              <span style={styles.japaneseForm}>{row.casual.text}</span>
              <span style={styles.readingForm}>{row.casual.ruby}</span>
              <span style={styles.meaningForm}>{row.casual.meaning}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* 메인 컴포넌트 */
export default function VerbDetail({ verb, onBack }) {
  return (
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

      {/* 활용 테이블들 */}
      {verb.forms.map((form, i) => (
        <FormTable key={i} form={form} />
      ))}

      {/* 예문 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={styles.sectionTitle}>예문</p>
        {verb.examples.map((ex, i) => (
          <div key={i} style={styles.exampleCard}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              <span style={{ fontSize: 13, color: '#888' }}>{ex.korean}</span>
              <RubyText text={ex.japanese} />
              <span style={{ fontSize: 12, color: '#5CA9CE' }}>{ex.reading}</span>
              {ex.accentData && ex.furigana && (
                <div style={{ marginTop: 4, overflowX: 'auto' }}>
                  <PitchGraph accentData={ex.accentData} furigana={ex.furigana} hideHeader />
                </div>
              )}
            </div>
            <PracticeButton japanesePlain={ex.plain} />
          </div>
        ))}
      </div>

    </div>
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
    gridTemplateColumns: '1fr 2fr 2fr',
    padding: '10px 12px',
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
  japaneseForm: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: "'Noto Sans JP', sans-serif",
    color: '#111',
  },
  readingForm: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: 500,
  },
  meaningForm: {
    fontSize: 12,
    color: '#888',
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
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  practiceBtn: {
    flexShrink: 0,
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
    gap: 4,
    whiteSpace: 'nowrap',
  },
}
