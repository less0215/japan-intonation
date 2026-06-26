import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import WordBookmarkButton from './WordBookmarkButton'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'

const PRIMARY = '#5CA9CE'

export default function ParticleLibrary({ items }) {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* 안내 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 8,
        padding: '11px 14px',
        background: '#f8f9fa',
        border: '1px solid var(--bd)',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }}>📌</span>
        <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6, margin: 0 }}>
          한국어와 다르게 쓰이는 일본어 조사 핵심 10개를 기본·응용 용법으로 정리했습니다.
        </p>
      </div>

      {/* 조사 카드 목록 */}
      {items.map((item, index) => (
        <Fragment key={item.id}>
          <button
            className="particle-list-card"
            onClick={() => navigate(`/particles/${item.id}`)}
          >
            {/* 왼쪽: 조사 문자 + 읽기 */}
            <div className="particle-list-left">
              <span className="particle-list-char">{item.particle}</span>
              <span className="particle-list-reading">({item.reading})</span>
            </div>

            {/* 가운데: 의미 태그들 */}
            <div className="particle-list-meanings">
              {item.meanings.map((m, i) => (
                <span key={i} className="particle-meaning-tag">{m}</span>
              ))}
            </div>

            {/* 오른쪽: 북마크 + 화살표 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <WordBookmarkButton wordInfo={{ id: item.id, category: 'particle', word: item.particle, reading: item.reading, meaning: item.meanings[0] ?? '' }} size="small" />
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="#ccc" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>

          {/* 인피드 광고 (5번째 카드 뒤) */}
          {index === 4 && !isAdFreeMember() && (
            // TODO: 전용 in-feed 슬롯 생성 후 교체
            <AdSenseUnit slot="2450758307" style={{ margin: '12px 0' }} />
          )}
        </Fragment>
      ))}
    </div>
  )
}
