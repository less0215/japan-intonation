/* 품사별 단어 목록 + 문법 진입 바 */

const WORD_CATEGORIES = [
  { key: 'verbs',     path: '/verbs',     label: '일본인이 많이 쓰는 동사 TOP100' },
  { key: 'adj-i',     path: '/adj-i',     label: '일본인이 많이 쓰는 い형용사 TOP100' },
  { key: 'adj-na',    path: '/adj-na',    label: '일본인이 많이 쓰는 な형용사 TOP100' },
  { key: 'noun',      path: '/noun',      label: '일본인이 많이 쓰는 명사 TOP100' },
  { key: 'particles', path: '/particles', label: '일본인이 많이 쓰는 조사 TOP10' },
]

const GRAMMAR_CATEGORY = { key: 'grammar', path: '/grammar', label: '핵심 문법 패턴 모아보기' }

const sectionLabelStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: '#aaa',
  letterSpacing: '0.6px',
  textTransform: 'uppercase',
  marginBottom: 2,
}

function Bar({ item, current, onNavigate }) {
  return (
    <button
      className="cat-bar"
      data-active={current === item.key}
      onClick={() => onNavigate(item.path)}
    >
      <span className="cat-bar-label">{item.label}</span>
      <svg className="cat-bar-chevron" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  )
}

export default function CategoryBars({ current, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 단어 라이브러리 섹션 */}
      <div>
        <p style={sectionLabelStyle}>단어 라이브러리</p>
        <div className="cat-bars">
          {WORD_CATEGORIES.map(item => (
            <Bar key={item.key} item={item} current={current} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* 문법 패턴 섹션 */}
      <div>
        <p style={sectionLabelStyle}>일본어 핵심 문법</p>
        <div className="cat-bars">
          <Bar item={GRAMMAR_CATEGORY} current={current} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}
