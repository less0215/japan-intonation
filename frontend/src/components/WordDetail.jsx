import { useState, useRef } from 'react'
import PitchGraph from './PitchGraph'
import PronunciationPractice from './PronunciationPractice'
import WordBookmarkButton from './WordBookmarkButton'
import JlptBadge from './JlptBadge'
import ExampleBookmarkButton from './ExampleBookmarkButton'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import ExampleCard from './ExampleCard'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'
import { track } from '../App'

const PRIMARY  = '#5CA9CE'
const API_URL  = 'https://japan-intonation-production.up.railway.app'

const smallKana = new Set(['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ','ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ'])
function splitMora(h) {
  const chars = [...h]; const mora = []
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && smallKana.has(chars[i + 1])) { mora.push(chars[i] + chars[i + 1]); i++ }
    else mora.push(chars[i])
  }
  return mora
}
function computeAccent(hiragana, accentType) {
  const mora = splitMora(hiragana)
  if (!mora.length) return null
  const n = accentType ?? 0
  const accent = mora.map((_, i) => {
    if (n === 0) return i === 0 ? 0 : 1
    if (i === 0) return n === 1 ? 1 : 0
    return i < n ? 1 : 0
  })
  return [{ phrase_id: '0', mora_count: mora.length, accent }]
}

function stripFurigana(text) {
  return text.replace(/[（(][^）)]+[）)]/g, '').replace(/[（(）)]/g, '')
}

function toHiragana(text) {
  return text.replace(/[^（(）)]+\(([^)）]+)\)/g, (_, r) => r)
             .replace(/[（(）)]/g, '')
             .replace(/[^぀-ゟ゠-ヿ]/g, '')
}

// 단어 1개(고립 한자)는 TTS가 음독으로 잘못 읽음(卵→「らん」). 짧은 단독 단어면 읽기(히라가나)를 대신 보냄.
function ttsTextFor(japanese, reading) {
  const jp = (japanese || '').trim()
  const r  = (reading || '').trim()
  const isSingleWord = jp && r &&
    !/[\s、。，．・…!?！？「」『』（）(),.]/.test(jp) && [...jp].length <= 4 && /[々一-龯]/.test(jp)
  return isSingleWord ? r : jp
}


/* 활용형 행 — TTS + 억양 그래프 */
function FormRow({ row, index, conjLabel, gender, accentType, borderStyle }) {
  const [audioState, setAudioState] = useState('idle')
  const [showGraph,  setShowGraph]  = useState(false)
  const audioRef = useRef(null)

  const plainText = stripFurigana(row.text)
  const furigana  = toHiragana(row.text) || row.ruby?.replace(/[^぀-ゟ゠-ヿ]/g, '') || ''
  const accentData = furigana ? computeAccent(furigana, accentType ?? 0) : null
  const graphActive = showGraph && accentData

  async function handlePlay() {
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ttsTextFor(plainText, furigana), gender }),
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
    <div style={{ borderTop: borderStyle?.borderTop, backgroundColor: borderStyle?.bg }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', padding: '9px 12px', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{conjLabel}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{row.meaning}</span>
          <RubyText text={row.text} />
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{row.ruby}</span>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => setShowGraph(v => !v)} title="억양 그래프" style={{
            width: 26, height: 26, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${graphActive ? PRIMARY : 'var(--bd)'}`,
            backgroundColor: graphActive ? `${PRIMARY}18` : 'transparent', cursor: 'pointer',
          }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5 Q2 1 3 5 Q4 9 5 5 Q6 1 7 5 Q8 9 9 5 Q10 1 11 5 Q12 9 13 5"
                stroke={graphActive ? PRIMARY : 'var(--text-3)'} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
          </button>
          <button onClick={handlePlay} title={audioState === 'playing' ? '정지' : '발음 듣기'} style={{
            width: 26, height: 26, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${audioState === 'playing' ? PRIMARY : 'var(--bd)'}`,
            backgroundColor: audioState === 'playing' ? `${PRIMARY}18` : 'transparent', cursor: 'pointer',
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
      {graphActive && furigana && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '2px 12px 10px' }}>
          <PitchGraph accentData={accentData} furigana={furigana} hideHeader />
          <PronunciationPractice compact accentData={accentData} furigana={furigana} japanese={plainText} korean_pronunciation={row.ruby} inputText={row.meaning} />
        </div>
      )}
    </div>
  )
}

/* 활용 테이블 — 탭 방식 */
function ConjugationTable({ conjugations, conjLabels, accentType, wordType }) {
  const [tab,    setTab]    = useState('formal')
  const [gender, setGender] = useState('female')

  const isNoun = wordType === 'noun'
  const tabs = [
    { id: 'formal', label: '정중체', labelJp: isNoun ? 'です体' : 'です・ます体' },
    { id: 'casual', label: '보통체', labelJp: '普通体' },
  ]
  // 데이터 키: adj/noun은 'plain', verb는 'casual' — 둘 다 대응
  const rows = tab === 'formal'
    ? (conjugations.formal ?? [])
    : (conjugations.plain ?? conjugations.casual ?? [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* 탭 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', border: '1.5px solid var(--bd)', borderRadius: 10, overflow: 'hidden' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '7px 18px', fontSize: 13, fontWeight: 700,
              fontFamily: 'inherit', cursor: 'pointer', border: 'none',
              backgroundColor: tab === t.id ? PRIMARY : 'var(--surface)',
              color:           tab === t.id ? '#fff' : 'var(--text-3)',
              transition: 'all 0.15s',
            }}>
              {t.label}
              <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 4, opacity: 0.8 }}>{t.labelJp}</span>
            </button>
          ))}
        </div>
        {/* 성별 토글 */}
        <div style={{ display: 'flex', border: '1.5px solid var(--bd)', borderRadius: 8, overflow: 'hidden' }}>
          {[{ v: 'female', l: '여성' }, { v: 'male', l: '남성' }].map(({ v, l }) => (
            <button key={v} onClick={() => setGender(v)} style={{
              height: 26, padding: '0 10px', fontSize: 11, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', border: 'none',
              backgroundColor: gender === v ? PRIMARY : 'var(--surface)',
              color:           gender === v ? '#fff' : 'var(--text-3)',
              transition: 'all 0.15s',
            }}>{l}</button>
          ))}
        </div>
      </div>
      {/* 테이블 */}
      <div style={{ border: '1px solid var(--bd)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 28px', padding: '8px 12px', gap: 8, backgroundColor: 'var(--surface-2)' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)' }}>구분</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)' }}>표현</span>
          <span />
        </div>
        {rows.map((row, i) => (
          <FormRow
            key={`${tab}-${i}`}
            row={row} index={i}
            conjLabel={conjLabels?.[i] ?? row.meaning ?? ''}
            gender={gender}
            accentType={accentType}
            borderStyle={{
              borderTop: i === 0 ? 'none' : '1px solid var(--bd)',
              bg: i % 2 === 1 ? 'var(--surface-2)' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* 메인 컴포넌트 */
export default function WordDetail({ item, wordType, conjLabels, onBack }) {
  const isNoun = wordType === 'noun'
  const hasData = !!item.conjugations

  // 품사 레이블
  const posLabel = wordType === 'adj-i' ? 'い형용사'
                 : wordType === 'adj-na' ? 'な형용사'
                 : '명사'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* 뒤로 가기 — VerbDetail과 동일 스타일 */}
      <button onClick={onBack} style={styles.backBtn}>← 목록으로</button>

      {/* 헤더 카드 — VerbDetail과 완전히 동일한 구조 */}
      <div style={{
        background: `linear-gradient(135deg, ${PRIMARY}18 0%, ${PRIMARY}08 100%)`,
        border: `1.5px solid ${PRIMARY}33`,
        borderRadius: 14,
        padding: '18px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <JlptBadge level={item.jlpt} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: PRIMARY,
              background: `${PRIMARY}18`, borderRadius: 8, padding: '2px 8px',
            }}>
              {posLabel} #{item.rank}위
            </span>
          </div>
          <WordBookmarkButton wordInfo={{ id: item.id, category: wordType, word: item.verb ?? item.word, reading: item.reading, meaning: item.meaning }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 36, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>
            {item.word}
          </span>
          <span style={{ fontSize: 16, color: PRIMARY, fontWeight: 600 }}>
            {item.reading}
          </span>
        </div>
        <div style={{ fontSize: 16, color: 'var(--text-2)', marginTop: 4 }}>
          {item.meaning}
        </div>
      </div>

      {/* 인스타 강의 배너 */}
      <a
        href="https://www.instagram.com/p/DZ6U2LgTSXT/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('instagram_banner_click', { category: wordType, word_id: item.id, word: item.verb ?? item.word })}
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433"/>
              <stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/>
              <stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig2)"/>
          <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
        </svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#c0306a' }}>
            {item.word} 표현 확장 무료 강의
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#b06090' }}>
            {isNoun
              ? '명사 활용은 な형용사와 동일 · 형용사 활용 강의에서 함께 배우기'
              : '형용사 활용 완벽 정복 · 인스타그램에서 보기'}
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <path d="M9 18l6-6-6-6" stroke="#c0306a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* 준비 중 — VerbDetail과 동일한 🚧 카드 스타일 */}
      {!hasData && (
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

      {/* 활용 테이블 */}
      {hasData && (
        <ConjugationTable
          conjugations={item.conjugations}
          conjLabels={conjLabels}
          accentType={item.accentType ?? 0}
          wordType={wordType}
        />
      )}

      {/* 자주 쓰는 표현 (명사 전용) */}
      {isNoun && item.expressions?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={styles.sectionTitle}>자주 쓰는 표현</p>
          <div style={{ border: '1px solid var(--bd)', borderRadius: 10, overflow: 'hidden' }}>
            {item.expressions.map((exp, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                padding: '10px 14px', gap: 8, alignItems: 'center',
                borderTop: i === 0 ? 'none' : '1px solid var(--bd)',
                backgroundColor: i % 2 === 1 ? 'var(--surface-2)' : 'transparent',
              }}>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 500 }}>{exp.text}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{exp.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 인피드 광고 (예문 섹션 직전) */}
      {/* TODO: 전용 in-feed 슬롯 생성 후 교체 */}
      {!isAdFreeMember() && <AdSenseUnit slot="2450758307" style={{ margin: '12px 0' }} />}

      {/* 예문 */}
      {item.examples?.length > 0 && (
        <div id="examples-section" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={styles.sectionTitle}>예문</p>
          {item.examples.map((ex, i) => (
            <ExampleCard
              key={i}
              example={ex}
              wordInfo={{ id: item.id, category: wordType, word: item.verb ?? item.word, reading: item.reading }}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  backBtn: {
    alignSelf: 'flex-start',
    height: 34, padding: '0 14px',
    background: 'transparent',
    border: '1.5px solid var(--bd)',
    borderRadius: 8,
    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
    cursor: 'pointer', color: 'var(--text-2)',
    whiteSpace: 'nowrap',
  },
  sectionTitle: {
    fontSize: 13, fontWeight: 700, color: 'var(--text-2)', margin: 0,
  },
}
