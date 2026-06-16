import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import GrammarDetail from './GrammarDetail'
import PageSEO from './PageSEO'
import { track } from '../App'

export default function GrammarDetailPage() {
  const { id }  = useParams()
  const pattern = GRAMMAR.find(g => g.id === id)

  useEffect(() => {
    if (pattern) track('word_detail_view', { category: 'grammar', word_id: pattern.id, word: pattern.pattern })
  }, [pattern])

  if (!pattern) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        문법 패턴을 찾을 수 없어요.
      </div>
    )
  }

  return (
    <>
      <PageSEO
        title={`${pattern.pattern} (${pattern.reading}) 뜻·접속·예문 | 일본어 문법 패턴`}
        description={`일본어 문법 ${pattern.pattern}(${pattern.meanings.join('·')})의 접속 규칙과 예문을 피치 악센트와 함께 정리했습니다.`}
        path={`/grammar/${pattern.id}`}
      />
      <GrammarDetail pattern={pattern} />
    </>
  )
}
