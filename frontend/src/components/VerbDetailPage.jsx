import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { VERBS } from '../data/verbs'
import VerbDetail from './VerbDetail'
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
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        동사를 찾을 수 없어요.
      </div>
    )
  }

  return <VerbDetail verb={verb} onBack={() => navigate('/verbs')} />
}
