import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { VERBS } from '../data/verbs'
import VerbDetail from './VerbDetail'
import PageSEO from './PageSEO'
import { UsageScenes } from './GrammarScenes'
import { wordQuery } from '../utils/expressions'
import { track } from '../App'

export default function VerbDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const verb     = VERBS.find(v => v.id === id)

  useEffect(() => {
    if (verb) track('word_detail_view', { category: 'verbs', word_id: verb.id, word: verb.verb, rank: verb.rank })
  }, [verb])

  if (!verb) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
        동사를 찾을 수 없어요.
      </div>
    )
  }

  return (
    <>
      <PageSEO
        title={`${verb.verb} (${verb.reading}·${verb.meaning}) 활용표 - 동사 ${verb.rank}위`}
        description={`${verb.verb}(${verb.meaning})의 정중체·보통체 전체 활용표와 예문을 확인하세요. 일본인이 많이 쓰는 동사 ${verb.rank}위.`}
        path={`/verbs/${verb.id}`}
      />
      <VerbDetail verb={verb} onBack={() => navigate('/verbs')} />
      {/* 영상 속 실제 사용 — 쉐도잉 장면 연결(장면 2개 미만이면 자동 숨음) */}
      <UsageScenes query={wordQuery(verb.verb, 'verbs')} />
    </>
  )
}
