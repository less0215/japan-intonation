import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import WordBookmarkButton from './WordBookmarkButton'
import HiraganaTable from './HiraganaTable'

const PRIMARY = '#5CA9CE'

const TABS = [
  { key: 'all',        label: '전체' },
  { key: 'te',         label: '동작 표현', sub: '~해 가다/오다 등' },
  { key: 'giving',     label: '주고받기',  sub: '~해 주다 등' },
  { key: 'conjecture', label: '추측 표현', sub: '~인 것 같다 등' },
  { key: 'reason',     label: '이유 표현', sub: '~이니까 등' },
  { key: 'koto',       label: '결정·규칙', sub: '~하기로 하다 등' },
  { key: 'other',      label: '권유·제안', sub: '~합시다 등' },
]

export default function GrammarLibrary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? GRAMMAR
    : GRAMMAR.filter(g => g.category === activeTab)

  const activeTabInfo = TABS.find(t => t.key === activeTab)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 히라가나 표 */}
      <HiraganaTable />

      {/* 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: '#f8f9fa',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📌</span>
        <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, margin: 0 }}>
          일본어 핵심 문법 패턴을 접속 규칙·예문·피치 악센트와 함께 정리했습니다. 카드를 눌러 상세 설명을 확인하세요.
        </p>
      </div>

      {/* 카테고리 탭 */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.key
            const count = tab.key === 'all' ? GRAMMAR.length : GRAMMAR.filter(g => g.category === tab.key).length
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1.5px solid ${active ? PRIMARY : '#e0e0e0'}`,
                  background: active ? PRIMARY : '#fff',
                  color: active ? '#fff' : '#666',
                  fontSize: 12.5,
                  fontWeight: active ? 700 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
                <span style={{ marginLeft: 5, fontSize: 11, color: active ? 'rgba(255,255,255,0.8)' : '#bbb' }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 선택된 탭 설명 */}
      {activeTabInfo?.sub && (
        <p style={{ margin: '-4px 0 0', fontSize: 12, color: '#aaa' }}>
          {activeTabInfo.sub}
        </p>
      )}

      {/* 패턴 카드 목록 */}
      {filtered.map(item => (
        <button
          key={item.id}
          className="particle-list-card"
          onClick={() => navigate(`/grammar/${item.id}`)}
          style={{ alignItems: 'flex-start' }}
        >
          {/* 왼쪽: 패턴명 (세로 배치) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0, width: 130 }}>
            <span style={{
              fontSize: 17, fontWeight: 700, color: PRIMARY,
              fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.2,
            }}>
              {item.pattern}
            </span>
            <span style={{ fontSize: 11, color: '#bbb' }}>({item.reading})</span>
          </div>

          {/* 가운데: 의미 태그 */}
          <div className="particle-list-meanings">
            {item.meanings.map((m, i) => (
              <span key={i} className="particle-meaning-tag">{m}</span>
            ))}
          </div>

          {/* 오른쪽: 북마크 + 화살표 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginTop: 2 }}>
            <WordBookmarkButton
              wordInfo={{ id: item.id, category: 'grammar', word: item.pattern, reading: item.reading, meaning: item.meanings[0] ?? '' }}
              size="small"
            />
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="#ccc" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#bbb', fontSize: 13, padding: '40px 0' }}>
          해당 카테고리의 패턴이 없습니다.
        </p>
      )}
    </div>
  )
}
