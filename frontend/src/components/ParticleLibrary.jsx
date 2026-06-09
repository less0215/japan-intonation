import { useState } from 'react'

const PRIMARY = '#5CA9CE'

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

function ParticleCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="particle-card">
      {/* 헤더 — 항상 표시 */}
      <button className="particle-card-header" onClick={() => setOpen(v => !v)}>
        <div className="particle-card-title">
          <span className="particle-char">{item.particle}</span>
          <span className="particle-reading">({item.reading})</span>
          <span className="particle-basic-meaning">{item.basicMeaning}</span>
        </div>
        <svg
          className="particle-chevron"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* 상세 — 펼쳤을 때 */}
      {open && (
        <div className="particle-card-body">

          {/* 기본 용법 */}
          <div className="particle-section">
            <span className="particle-section-badge particle-section-badge--basic">기본</span>
            <div className="particle-example">
              <p className="particle-example-kr">{item.basic.kr}</p>
              <p className="particle-example-jp"><RubyText text={item.basic.jp} /></p>
            </div>
            <p className="particle-note">{item.basic.note}</p>
          </div>

          <div className="particle-divider" />

          {/* 응용 용법 */}
          <div className="particle-section">
            <div className="particle-section-top">
              <span className="particle-section-badge particle-section-badge--applied">응용</span>
              <span className="particle-applied-meaning">{item.appliedMeaning}</span>
            </div>
            <div className="particle-example">
              <p className="particle-example-kr">{item.applied.kr}</p>
              <p className="particle-example-jp"><RubyText text={item.applied.jp} /></p>
            </div>
            <p className="particle-note">{item.applied.note}</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default function ParticleLibrary({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: '#f8f9fa',
        border: '1px solid #e8e8e8',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📌</span>
        <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, margin: 0 }}>
          한국어와 다르게 쓰이는 일본어 조사 핵심 10개를 기본·응용 용법으로 정리했습니다.
          카드를 탭하면 예문과 해설을 확인할 수 있어요.
        </p>
      </div>

      {/* 조사 카드 목록 */}
      {items.map(item => (
        <ParticleCard key={item.id} item={item} />
      ))}

    </div>
  )
}
