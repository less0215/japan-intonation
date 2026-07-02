import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import { useUser } from '../context/UserContext'
import GrammarDetail from './GrammarDetail'
import GrammarScenes from './GrammarScenes'
import PageSEO from './PageSEO'
import { track } from '../App'

export default function GrammarDetailPage() {
  const { id }  = useParams()
  const { user } = useUser()
  const isAdmin = !!user?.is_admin
  const found   = GRAMMAR.find(g => g.id === id)
  // beta 패턴은 관리자 외에는 접근 불가(직접 URL 진입 차단)
  const pattern = found && (isAdmin || !found.beta) ? found : null

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pattern) track('word_detail_view', { category: 'grammar', word_id: pattern.id, word: pattern.pattern })
  }, [pattern])

  if (!pattern) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
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
      {/* 이 문법이 영상 속에서 실제로 쓰인 장면(매핑된 문법만 노출) */}
      <GrammarScenes grammarId={pattern.id} />
    </>
  )
}
