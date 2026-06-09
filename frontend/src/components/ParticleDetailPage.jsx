import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PARTICLES } from '../data/particles'
import ParticleDetail from './ParticleDetail'
import PageSEO from './PageSEO'
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

  return (
    <>
      <PageSEO
        title={`${particle.particle} (${particle.reading}) - 일본어 조사 ${particle.rank}위 기본·응용 용법`}
        description={`일본어 조사 ${particle.particle}(${particle.meanings.join('·')})의 기본·응용 용법과 예문을 확인하세요. 한국어와 차이점 중심으로 정리했습니다.`}
        path={`/particles/${particle.id}`}
      />
      <ParticleDetail particle={particle} />
    </>
  )
}
