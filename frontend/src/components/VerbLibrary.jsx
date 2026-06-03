import { useState } from 'react'
import { CATEGORIES, VERBS } from '../data/verbs'
import VerbDetail from './VerbDetail'

/* 동사 학습 — 카테고리 목록 + 동사 카드 */
export default function VerbLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('basic')
  const [selectedVerb, setSelectedVerb]         = useState(null)

  // 선택된 카테고리의 동사 필터링
  const filteredVerbs = VERBS.filter(v => v.category === selectedCategory)

  // 동사 상세 페이지
  if (selectedVerb) {
    return (
      <VerbDetail
        verb={selectedVerb}
        onBack={() => setSelectedVerb(null)}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 카테고리 탭 */}
      <div style={styles.categoryWrap}>
        {CATEGORIES.map(cat => {
          const active   = cat.id === selectedCategory
          const count    = VERBS.filter(v => v.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                ...styles.categoryBtn,
                backgroundColor: active ? '#5CA9CE' : '#ffffff',
                color:           active ? '#ffffff' : '#555555',
                border:          active ? 'none'    : '1.5px solid #e8e8e8',
              }}
            >
              {cat.name}
              {count > 0 && (
                <span style={{
                  ...styles.countBadge,
                  backgroundColor: active ? 'rgba(255,255,255,0.25)' : '#f0f0f0',
                  color:           active ? '#ffffff' : '#888888',
                }}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
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
              onClick={() => setSelectedVerb(verb)}
              style={styles.verbCard}
            >
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
  categoryWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    height: 36,
    padding: '0 14px',
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  countBadge: {
    fontSize: 11,
    fontWeight: 600,
    borderRadius: 10,
    padding: '1px 7px',
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
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
    fontFamily: 'inherit',
  },
  verbJapanese: {
    fontSize: 22,
    fontWeight: 500,
    fontFamily: "'Noto Sans JP', sans-serif",
    color: '#111111',
  },
  verbReading: {
    fontSize: 12,
    color: '#5CA9CE',
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
