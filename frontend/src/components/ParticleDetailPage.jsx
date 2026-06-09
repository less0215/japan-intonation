import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PARTICLES } from '../data/particles'
import ParticleDetail from './ParticleDetail'
import { track } from '../App'

export default function ParticleDetailPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const particle = PARTICLES.find(p => p.id === id)

  useEffect(() => {
    if (particle) track('word_detail_view', { category: 'particles', word_id: particle.id, word: particle.particle, rank: particle.rank })
  }, [particle])

  if (!particle) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        조사를 찾을 수 없어요.
      </div>
    )
  }

  return <ParticleDetail particle={particle} />
}
