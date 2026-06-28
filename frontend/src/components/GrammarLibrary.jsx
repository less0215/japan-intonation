import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import { useUser } from '../context/UserContext'
import WordBookmarkButton from './WordBookmarkButton'
import HiraganaTable from './HiraganaTable'
import VerbConjugationTable from './VerbConjugationTable'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'

const PRIMARY = '#5CA9CE'

const TABS = [
  { key: 'all',        label: '전체' },
  { key: 'noun',       label: '명사',     sub: '~이다 / ~입니다 등' },
  { key: 'verb-form', label: '동사 활용', sub: '~합니다/~했다/~하고 등' },
  { key: 'adj-i', label: 'い형용사', sub: '~다/~지 않다/~었다 등' },
  { key: 'adj-na', label: 'な형용사', sub: '~다/~한/~해지다 등' },
  { key: 'desire', label: '희망·의지', sub: '~하고 싶다/~할 생각 등' },
  { key: 'permission', label: '의무·허가·금지', sub: '~해도 된다/~하면 안 된다 등' },
  { key: 'condition', label: '조건·가정', sub: '~하면/~라면 등' },
  { key: 'experience', label: '경험·시도', sub: '~한 적 있다/~해 보다 등' },
  { key: 'guess', label: '추측·전문', sub: '~할 것 같다/~라고 한다 등' },
  { key: 'compare', label: '비교·정도', sub: '~보다/~만큼/너무 ~ 등' },
  { key: 'passive', label: '수동·사역', sub: '~당하다/~시키다 등' },
  { key: 'connect', label: '접속·열거', sub: '~하면서/~하거나/~만 등' },
  { key: 'time', label: '때·순서', sub: '~할 때/~전에/~후에 등' },
  { key: 'te',         label: '동작 표현', sub: '~해 가다/오다 등' },
  { key: 'giving',     label: '주고받기',  sub: '~해 주다 등' },
  { key: 'conjecture', label: '추측 표현', sub: '~인 것 같다 등' },
  { key: 'reason',     label: '이유 표현', sub: '~이니까 등' },
  { key: 'koto',       label: '결정·규칙', sub: '~하기로 하다 등' },
  { key: 'other',      label: '권유·제안', sub: '~합시다 등' },
]

export default function GrammarLibrary() {
  const navigate = useNavigate()
  const { user } = useUser()
  const isAdmin = !!user?.is_admin
  const [activeTab, setActiveTab] = useState('all')

  // beta 패턴(예: 명사 챕터)은 관리자 계정에서만 노출
  const visibleGrammar = isAdmin ? GRAMMAR : GRAMMAR.filter(g => !g.beta)
  const visibleTabs = TABS.filter(t =>
    t.key === 'all' || visibleGrammar.some(g => g.category === t.key))

  const activeKey = visibleTabs.some(t => t.key === activeTab) ? activeTab : 'all'
  const filtered = activeKey === 'all'
    ? visibleGrammar
    : visibleGrammar.filter(g => g.category === activeKey)

  const activeTabInfo = visibleTabs.find(t => t.key === activeKey)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 참고자료 — 오십음도 + 동사 그룹별 활용표 (목록 화면에서는 접힌 상태) */}
      <HiraganaTable defaultOpen={false} />
      <VerbConjugationTable defaultOpen={false} />

      {/* 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: 'var(--surface-2)',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📌</span>
        <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, margin: 0 }}>
          일본어 핵심 문법 패턴을 접속 규칙·예문·피치 악센트와 함께 정리했습니다. 카드를 눌러 상세 설명을 확인하세요.
        </p>
      </div>

      {/* 카테고리 탭 */}
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {visibleTabs.map(tab => {
            const active = activeKey === tab.key
            const count = tab.key === 'all' ? visibleGrammar.length : visibleGrammar.filter(g => g.category === tab.key).length
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: `1.5px solid ${active ? PRIMARY : 'var(--bd)'}`,
                  background: active ? PRIMARY : '#fff',
                  color: active ? '#fff' : 'var(--text-2)',
                  fontSize: 12.5,
                  fontWeight: active ? 700 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
                <span style={{ marginLeft: 5, fontSize: 11, color: active ? 'rgba(255,255,255,0.8)' : 'var(--text-3)' }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 선택된 탭 설명 */}
      {activeTabInfo?.sub && (
        <p style={{ margin: '-4px 0 0', fontSize: 12, color: 'var(--text-3)' }}>
          {activeTabInfo.sub}
        </p>
      )}

      {/* 패턴 카드 목록 */}
      {filtered.map((item, index) => (
        <Fragment key={item.id}>
        <button
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
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>({item.reading})</span>
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
              fill="none" stroke="var(--text-3)" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </button>

        {/* 8번째 카드 뒤 웹 인피드 광고 */}
        {index === 7 && (
          // TODO: 전용 in-feed 슬롯 생성 후 교체
          !isAdFreeMember() && <AdSenseUnit slot="2450758307" style={{ margin: '12px 0' }} />
        )}
        </Fragment>
      ))}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13, padding: '40px 0' }}>
          해당 카테고리의 패턴이 없습니다.
        </p>
      )}
    </div>
  )
}
