/* 품사별 단어 목록 진입 바 (Papago의 음성/대화/이미지 스타일)
 * 가로로 길쭉한 바 4개를 세로로 쌓아 보여준다.
 */

const CATEGORIES = [
  { key: 'verbs',  path: '/verbs',  label: '동사',     emoji: '🏃' },
  { key: 'adj-i',  path: '/adj-i',  label: 'い형용사', emoji: '🌸' },
  { key: 'adj-na', path: '/adj-na', label: 'な형용사', emoji: '✨' },
  { key: 'noun',   path: '/noun',   label: '명사',     emoji: '📦' },
]

export default function CategoryBars({ current, onNavigate }) {
  return (
    <div className="cat-bars">
      {CATEGORIES.map(({ key, path, label, emoji }) => (
        <button
          key={key}
          className="cat-bar"
          data-active={current === key}
          onClick={() => onNavigate(path)}
        >
          <span className="cat-bar-emoji">{emoji}</span>
          <span className="cat-bar-text">
            <span className="cat-bar-label">{label}</span>
            <span className="cat-bar-sub">TOP 100</span>
          </span>
          <svg className="cat-bar-chevron" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      ))}
    </div>
  )
}
