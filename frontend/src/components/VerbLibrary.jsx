import { useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { VERBS, getRankTabs } from '../data/verbs'
import PitchGraph from './PitchGraph'

const API_URL = 'https://japan-intonation-production.up.railway.app'

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

function VerbCard({ verb, onNavigate }) {
  const [audioState, setAudioState] = useState('idle')
  const audioRef = useRef(null)
  const accentData = verb.hiragana ? computeAccent(verb.hiragana, verb.accentType ?? 0) : null

  async function handlePlay(e) {
    e.stopPropagation()
    if (audioState === 'playing') {
      audioRef.current?.pause(); audioRef.current = null; setAudioState('idle'); return
    }
    if (audioState === 'loading') return
    setAudioState('loading')
    try {
      const res = await fetch(`${API_URL}/tts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: verb.hiragana ?? verb.verb, gender: 'female' }),
      })
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      audio.onerror = () => { setAudioState('idle'); URL.revokeObjectURL(url); audioRef.current = null }
      await audio.play()
      setAudioState('playing')
    } catch { setAudioState('idle') }
  }

  return (
    <button onClick={() => onNavigate(`/verbs/${verb.id}`)} style={styles.verbCard}>
      <span style={styles.rankBadge}>#{verb.rank}</span>
      <span style={styles.verbJapanese}>{verb.verb}</span>
      <span style={styles.verbReading}>{verb.reading}</span>
      <span style={styles.verbMeaning}>{verb.meaning}</span>
      {accentData && (
        <div style={{ marginTop: 6, pointerEvents: 'none' }}>
          <PitchGraph accentData={accentData} furigana={verb.hiragana} hideHeader />
        </div>
      )}
      {verb.hiragana && (
        <button onClick={handlePlay} style={styles.audioBtn} title="발음 듣기">
          {audioState === 'loading' ? (
            <span className="spinner" style={{ width: 10, height: 10, borderTopColor: PRIMARY, borderColor: `${PRIMARY}33` }} />
          ) : audioState === 'playing' ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill={PRIMARY}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#aaa"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      )}
    </button>
  )
}

const PRIMARY = '#5CA9CE'

const SORT_OPTIONS = [
  { id: 'rank',    label: '순위순' },
  { id: 'ja',     label: '일본어순' },
  { id: 'ko',     label: '한국어순' },
]

export default function VerbLibrary() {
  const navigate  = useNavigate()
  const rankTabs  = useMemo(() => getRankTabs(VERBS, 10), [])

  const [selectedTab, setSelectedTab] = useState(rankTabs[0]?.id ?? '')
  const [sortBy,      setSortBy]      = useState('rank')

  const currentTab = rankTabs.find(t => t.id === selectedTab) ?? rankTabs[0]

  const filteredVerbs = useMemo(() => {
    if (!currentTab) return []
    const inRange = VERBS.filter(v => v.rank >= currentTab.start && v.rank <= currentTab.end)
    return [...inRange].sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank
      if (sortBy === 'ja')   return a.verb.localeCompare(b.verb, 'ja')
      if (sortBy === 'ko')   return a.meaning.localeCompare(b.meaning, 'ko')
      return 0
    })
  }, [currentTab, sortBy])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 출처 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: '#f8f9fa',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📖</span>
        <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, margin: 0 }}>
          일본어 단어 1억 개를 분석한 곳에서 발표한 사용 빈도 상위 100개 동사입니다. <span style={{ color: '#aaa' }}>(BCCWJ, 2011)</span>
        </p>
      </div>

      {/* 순위 탭 */}
      <div style={styles.tabRow}>
        {rankTabs.map(tab => {
          const active = tab.id === selectedTab
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                ...styles.tabBtn,
                backgroundColor: active ? PRIMARY : '#ffffff',
                color:           active ? '#ffffff' : '#555555',
                border:          active ? 'none' : '1.5px solid #e8e8e8',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* 정렬 */}
      <div style={styles.sortRow}>
        <span style={{ fontSize: 12, color: '#aaa', marginRight: 4 }}>정렬</span>
        {SORT_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSortBy(opt.id)}
            style={{
              ...styles.sortBtn,
              backgroundColor: sortBy === opt.id ? '#f0f9ff' : 'transparent',
              color:           sortBy === opt.id ? PRIMARY : '#888',
              fontWeight:      sortBy === opt.id ? 700 : 400,
              border:          sortBy === opt.id ? `1.5px solid ${PRIMARY}` : '1.5px solid #e8e8e8',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 동사 카드 목록 */}
      {filteredVerbs.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: 15, color: '#aaaaaa' }}>아직 준비 중이에요 😊</p>
        </div>
      ) : (
        <div style={styles.verbGrid}>
          {filteredVerbs.map(verb => (
            <VerbCard key={verb.id} verb={verb} onNavigate={navigate} />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  tabRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  tabBtn: {
    height: 36,
    padding: '0 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  sortRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  sortBtn: {
    height: 28,
    padding: '0 10px',
    borderRadius: 14,
    fontSize: 12,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  verbGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 10,
  },
  verbCard: {
    background: '#ffffff',
    border: '1.5px solid #e8e8e8',
    borderRadius: 12,
    padding: '14px 12px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
    overflow: 'hidden',
  },
  rankBadge: {
    fontSize: 11,
    fontWeight: 700,
    color: PRIMARY,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: '1px 7px',
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  verbJapanese: {
    fontSize: 22,
    fontWeight: 500,
    fontFamily: "'Noto Sans JP', sans-serif",
    color: '#111111',
  },
  verbReading: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: 500,
  },
  verbMeaning: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    padding: '60px 0',
  },
  audioBtn: {
    marginTop: 6,
    width: 28, height: 28,
    borderRadius: '50%',
    border: '1px solid #e8e8e8',
    backgroundColor: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}
