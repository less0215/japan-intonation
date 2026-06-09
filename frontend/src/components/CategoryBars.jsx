/* 품사별 단어 목록 진입 바 (Papago의 음성/대화/이미지 스타일)
 * 가로로 길쭉한 바 4개를 세로로 쌓아 보여준다.
 */

const CATEGORIES = [
  { key: 'verbs',     path: '/verbs',     label: '일본인이 많이 쓰는 동사 TOP100' },
  { key: 'adj-i',     path: '/adj-i',     label: '일본인이 많이 쓰는 い형용사 TOP100' },
  { key: 'adj-na',    path: '/adj-na',    label: '일본인이 많이 쓰는 な형용사 TOP100' },
  { key: 'noun',      path: '/noun',      label: '일본인이 많이 쓰는 명사 TOP100' },
  { key: 'particles', path: '/particles', label: '일본인이 많이 쓰는 조사 TOP10' },
]

export default function CategoryBars({ current, onNavigate }) {
  return (
    <div className="cat-bars">
      {CATEGORIES.map(({ key, path, label }) => (
        <button
          key={key}
          className="cat-bar"
          data-active={current === key}
          onClick={() => onNavigate(path)}
        >
          <span className="cat-bar-label">{label}</span>
          <svg className="cat-bar-chevron" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      ))}
    </div>
  )
}
