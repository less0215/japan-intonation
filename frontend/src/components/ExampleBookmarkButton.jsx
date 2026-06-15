import { useUser } from '../context/UserContext'

const PRIMARY = '#5CA9CE'

/* 예문 북마크 버튼
 * exampleInfo: { id, wordId, wordText, wordReading, wordCategory, exampleJp, exampleKr }
 */
export default function ExampleBookmarkButton({ exampleInfo }) {
  const { isExampleSaved, toggleSaveExample } = useUser()
  const saved = isExampleSaved(exampleInfo.id)

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 9px',
    borderRadius: 8,
    border: saved ? '1.5px solid #1D9E75' : `1.5px solid ${PRIMARY}66`,
    background: saved ? '#E1F5EE' : 'transparent',
    color: saved ? '#085041' : PRIMARY,
    fontSize: 11,
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
    toggleSaveExample(exampleInfo)
  }

  return (
    <button style={btnStyle} onClick={handleClick} title={saved ? '저장 취소' : '예문 저장'}>
      {saved ? '저장됨' : '저장하기'}
    </button>
  )
}
