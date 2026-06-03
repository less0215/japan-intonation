import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { VERBS, getRankTabs } from '../data/verbs'

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
            <button
              key={verb.id}
              onClick={() => navigate(`/verbs/${verb.id}`)}
              style={styles.verbCard}
            >
              <span style={styles.rankBadge}>#{verb.rank}</span>
              <span style={styles.verbJapanese}>{verb.verb}</span>
              <span style={styles.verbReading}>{verb.reading}</span>
              <span style={styles.verbMeaning}>{verb.meaning}</span>
            </button>
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
    padding: '14px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
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
}
