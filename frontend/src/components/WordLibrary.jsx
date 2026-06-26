import { useState, useMemo, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import WordBookmarkButton from './WordBookmarkButton'
import { track } from '../App'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'

const PRIMARY = '#5CA9CE'

const SORT_OPTIONS = [
  { id: 'rank', label: '순위순' },
  { id: 'ja',   label: '일본어순' },
  { id: 'ko',   label: '한국어순' },
]

/* wordType: 'adj-i' | 'adj-na' | 'noun' */
export default function WordLibrary({ items, wordType, getRankTabs, description }) {
  const navigate  = useNavigate()
  const rankTabs  = useMemo(() => getRankTabs(items, 10), [items])

  const storageKey = `wordLibTab_${wordType}`
  const [selectedTab, setSelectedTab] = useState(
    () => sessionStorage.getItem(storageKey) ?? rankTabs[0]?.id ?? ''
  )
  const [sortBy, setSortBy] = useState('rank')

  function handleTabChange(id) {
    sessionStorage.setItem(storageKey, id)
    setSelectedTab(id)
    track('library_tab_view', { category: wordType, tab: id })
  }

  const currentTab = rankTabs.find(t => t.id === selectedTab) ?? rankTabs[0]

  const filteredItems = useMemo(() => {
    if (!currentTab) return []
    const inRange = items.filter(v => v.rank >= currentTab.start && v.rank <= currentTab.end)
    return [...inRange].sort((a, b) => {
      if (sortBy === 'rank') return a.rank - b.rank
      if (sortBy === 'ja')   return a.verb.localeCompare(b.verb, 'ja')
      if (sortBy === 'ko')   return a.meaning.localeCompare(b.meaning, 'ko')
      return 0
    })
  }, [currentTab, sortBy, items])

  // 해당 구간의 단어가 모두 데이터(conjugations) 없는 스텁일 때만 "준비 중" 표시
  const isComingSoon = filteredItems.length > 0 && filteredItems.every(v => !v.conjugations)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 출처 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: 'var(--surface-2)',
        border: '1px solid var(--bd)',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📖</span>
        <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6, margin: 0 }}>
          {description} <span style={{ color: 'var(--text-3)' }}>(BCCWJ, 2011)</span>
        </p>
      </div>

      {/* 순위 탭 */}
      <div style={styles.tabRow}>
        {rankTabs.map(tab => {
          const active = tab.id === selectedTab
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                ...styles.tabBtn,
                backgroundColor: active ? PRIMARY : '#ffffff',
                color:           active ? '#ffffff' : 'var(--text-2)',
                border:          active ? 'none' : '1.5px solid var(--bd)',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* 11위 이상: 업데이트 예정 메시지 */}
      {isComingSoon ? (
        <div style={styles.comingSoon}>
          <span style={{ fontSize: 32, marginBottom: 12 }}>🚧</span>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-2)', margin: '0 0 6px' }}>
            곧 업데이트 됩니다
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
            {currentTab.start}~{currentTab.end}위 데이터를 준비 중이에요.
          </p>
        </div>
      ) : (
        <>
          {/* 정렬 */}
          <div style={styles.sortRow}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', marginRight: 4 }}>정렬</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                style={{
                  ...styles.sortBtn,
                  backgroundColor: sortBy === opt.id ? '#f0f9ff' : 'transparent',
                  color:           sortBy === opt.id ? PRIMARY : 'var(--text-2)',
                  fontWeight:      sortBy === opt.id ? 700 : 400,
                  border:          sortBy === opt.id ? `1.5px solid ${PRIMARY}` : '1.5px solid var(--bd)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* 카드 목록 */}
          <div style={styles.verbGrid}>
            {filteredItems.map((item, index) => (
              <Fragment key={item.id}>
                <button
                  onClick={() => navigate(`/${wordType}/${item.id}`)}
                  style={styles.verbCard}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: 2 }}>
                    <span style={styles.rankBadge}>#{item.rank}</span>
                    <WordBookmarkButton wordInfo={{ id: item.id, category: wordType, word: item.verb, reading: item.reading, meaning: item.meaning }} size="small" />
                  </div>
                  <span style={styles.verbJapanese}>{item.verb}</span>
                  <span style={styles.verbReading}>{item.reading}</span>
                  <span style={styles.verbMeaning}>{item.meaning}</span>
                </button>
                {/* 8번째 카드(index===7) 뒤 그리드 전체폭 인피드 광고 1개 */}
                {index === 7 && !isAdFreeMember() && (
                  // TODO: 전용 in-feed 슬롯 생성 후 교체
                  <AdSenseUnit slot="2450758307" style={{ gridColumn: '1 / -1', margin: '12px 0' }} />
                )}
              </Fragment>
            ))}
          </div>
        </>
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
    background: 'var(--surface)',
    border: '1.5px solid var(--bd)',
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
    color: 'var(--text-strong)',
  },
  verbReading: {
    fontSize: 12,
    color: PRIMARY,
    fontWeight: 500,
  },
  verbMeaning: {
    fontSize: 13,
    color: 'var(--text-3)',
    marginTop: 2,
  },
  comingSoon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 20px',
    background: 'var(--surface-2)',
    borderRadius: 14,
    border: '1.5px dashed #e0e0e0',
  },
}
