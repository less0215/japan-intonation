import { useParams, useNavigate } from 'react-router-dom'
import { VERBS } from '../data/verbs'
import VerbDetail from './VerbDetail'

export default function VerbDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const verb     = VERBS.find(v => v.id === id)

  if (!verb) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        동사를 찾을 수 없어요.
      </div>
    )
  }

  return <VerbDetail verb={verb} onBack={() => navigate('/verbs')} />
}
