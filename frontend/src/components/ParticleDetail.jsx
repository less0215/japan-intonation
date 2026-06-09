import { useNavigate } from 'react-router-dom'
import { PARTICLES } from '../data/particles'

/* 후리가나 파싱 — 漢字(かんじ) 형식 → ruby 렌더링 */
function RubyText({ text }) {
  const regex = /([^\s()（）]+?)\(([^)（）]+)\)/g
  const parts = []; let last = 0, match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'plain', text: text.slice(last, match.index) })
    parts.push({ type: 'ruby', kanji: match[1], reading: match[2] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ type: 'plain', text: text.slice(last) })
  return (
    <span>
      {parts.map((p, i) =>
        p.type === 'ruby'
          ? <ruby key={i}>{p.kanji}<rt style={{ fontSize: 10, color: '#888' }}>{p.reading}</rt></ruby>
          : <span key={i}>{p.text}</span>
      )}
    </span>
  )
}

export default function ParticleDetail({ particle }) {
  const navigate = useNavigate()
  const currentIndex = PARTICLES.findIndex(p => p.id === particle.id)
  const prev = PARTICLES[currentIndex - 1] ?? null
  const next = PARTICLES[currentIndex + 1] ?? null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 뒤로 가기 */}
      <button
        onClick={() => navigate('/particles')}
        className="back-to-translate"
        style={{ alignSelf: 'flex-start' }}
      >
        ← 목록으로
      </button>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#5CA9CE', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1 }}>
            {particle.particle}
          </span>
          <span style={{ fontSize: 16, color: '#aaa' }}>({particle.reading})</span>
          <span style={{ fontSize: 13, color: '#888', marginLeft: 4 }}>제{particle.rank}위</span>
        </div>
        {/* 의미 태그 모음 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {particle.meanings.map((m, i) => (
            <span key={i} className="particle-meaning-tag">{m}</span>
          ))}
        </div>
      </div>

      {/* 용법 카드들 */}
      {particle.usages.map((usage, i) => (
        <div key={i} className="card">
          <div className="section">
            {/* 배지 + 의미 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span className={`particle-section-badge particle-section-badge--${usage.type}`}>
                {usage.type === 'basic' ? '기본' : '응용'}
              </span>
              <span style={{ fontSize: 14, color: '#444', fontWeight: 500, lineHeight: 1.5 }}>
                {usage.meaning}
              </span>
            </div>

            {/* 예문 박스 */}
            <div className="particle-example">
              <p className="particle-example-kr">{usage.example.kr}</p>
              <p className="particle-example-jp">
                <RubyText text={usage.example.jp} />
              </p>
            </div>

            {/* 해설 */}
            <p className="particle-note">{usage.note}</p>
          </div>
        </div>
      ))}

      {/* 이전 / 다음 내비게이션 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button
          className="particle-nav-btn"
          disabled={!prev}
          onClick={() => prev && navigate(`/particles/${prev.id}`)}
        >
          ← {prev ? `${prev.particle}（${prev.reading}）` : '처음'}
        </button>
        <button
          className="particle-nav-btn"
          disabled={!next}
          onClick={() => next && navigate(`/particles/${next.id}`)}
        >
          {next ? `${next.particle}（${next.reading}）` : '마지막'} →
        </button>
      </div>

    </div>
  )
}
