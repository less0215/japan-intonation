import { useUser } from '../context/UserContext'
import { track } from '../App'

const PRIMARY = '#5CA9CE'

/* 단어 북마크 버튼 — 상세/목록 페이지 공용
 * wordInfo: { id, category, word, reading, meaning }
 * size: 'default' | 'small'
 */
export default function WordBookmarkButton({ wordInfo, size = 'default', saveLabel = '저장하기', savedLabel = '저장됨' }) {
  const { isWordSaved, toggleSaveWord } = useUser()
  const saved = isWordSaved(wordInfo.id)

  const isSmall = size === 'small'

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isSmall ? 0 : 5,
    padding: isSmall ? '5px' : '7px 13px',
    borderRadius: isSmall ? '50%' : 8,
    border: saved
      ? '1.5px solid #1D9E75'
      : `1.5px solid ${PRIMARY}66`,
    background: saved ? '#E1F5EE' : 'transparent',
    color: saved ? '#085041' : PRIMARY,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all .15s',
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    flexShrink: 0,
  }

  function handleClick(e) {
    e.stopPropagation()
    e.preventDefault()
    track('word_save', { action: saved ? 'unsave' : 'save', category: wordInfo.category, word_id: wordInfo.id, word: wordInfo.word })
    toggleSaveWord(wordInfo)
  }

  return (
    <button style={btnStyle} onClick={handleClick} title={saved ? '저장 취소' : '단어 저장'}>
      {saved ? (
        /* 채워진 북마크 */
        <svg width={isSmall ? 14 : 13} height={isSmall ? 14 : 13} viewBox="0 0 24 24" fill="#1D9E75" stroke="none">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ) : (
        /* 빈 북마크 */
        <svg width={isSmall ? 14 : 13} height={isSmall ? 14 : 13} viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      )}
      {!isSmall && (saved ? savedLabel : saveLabel)}
    </button>
  )
}
