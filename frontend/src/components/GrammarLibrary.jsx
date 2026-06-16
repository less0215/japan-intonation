import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import WordBookmarkButton from './WordBookmarkButton'

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

/* ── 히라가나 오십음도 ── */
const HIRAGANA_ROWS = [
  { row: 'あ行', chars: ['あ','い','う','え','お'], reads: ['아','이','우','에','오'] },
  { row: 'か行', chars: ['か','き','く','け','こ'], reads: ['카','키','쿠','케','코'] },
  { row: 'さ行', chars: ['さ','し','す','せ','そ'], reads: ['사','시','스','세','소'] },
  { row: 'た行', chars: ['た','ち','つ','て','と'], reads: ['타','치','츠','테','토'] },
  { row: 'な行', chars: ['な','に','ぬ','ね','の'], reads: ['나','니','누','네','노'] },
  { row: 'は行', chars: ['は','ひ','ふ','へ','ほ'], reads: ['하','히','후','헤','호'] },
  { row: 'ま行', chars: ['ま','み','む','め','も'], reads: ['마','미','무','메','모'] },
  { row: 'や行', chars: ['や','','ゆ','','よ'],   reads: ['야','','유','','요'] },
  { row: 'ら行', chars: ['ら','り','る','れ','ろ'], reads: ['라','리','루','레','로'] },
  { row: 'わ行', chars: ['わ','','','','を'],      reads: ['와','','','','오(を)'] },
  { row: 'ん',   chars: ['ん','','','',''],         reads: ['ん','','','',''] },
]

function HiraganaTable() {
  const [open, setOpen] = useState(true)

  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* 헤더 토글 */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#f8f9fa', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>🈴</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>히라가나 오십음도 (あいうえお 표)</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: '12px 16px 16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {/* 열 헤더 */}
          <div style={{ display: 'grid', gridTemplateColumns: '36px repeat(5, 1fr)', gap: 4, minWidth: 280 }}>
            <div />
            {['あ단','い단','う단','え단','お단'].map(h => (
              <div key={h} style={{ textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600, paddingBottom: 4 }}>{h}</div>
            ))}

            {HIRAGANA_ROWS.map(({ row, chars, reads }) => (
              <>
                {/* 행 레이블 */}
                <div key={row + '_label'} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: '#aaa', fontWeight: 600,
                }}>
                  {row}
                </div>
                {chars.map((ch, ci) => (
                  <div key={row + ci} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '6px 4px',
                    background: ch ? '#f0f8fc' : 'transparent',
                    borderRadius: 8,
                    border: ch ? '1px solid #d0eaf5' : 'none',
                  }}>
                    {ch ? (
                      <>
                        <span style={{ fontSize: 18, fontFamily: "'Noto Sans JP', sans-serif", color: '#333', lineHeight: 1.2 }}>{ch}</span>
                        <span style={{ fontSize: 9.5, color: '#888', marginTop: 2 }}>{reads[ci]}</span>
                      </>
                    ) : null}
                  </div>
                ))}
              </>
            ))}
          </div>

          <p style={{ margin: '12px 0 0', fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>
            * し(시)·ち(치)·つ(츠)·ふ(후)는 예외적인 발음입니다.
          </p>
        </div>
      )}
    </div>
  )
}

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
