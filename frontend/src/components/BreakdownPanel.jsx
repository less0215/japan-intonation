/* 문장 분해 공통 컴포넌트
 * ResultCard, VerbDetail, WordDetail, ParticleDetail 예문에서 공통 사용
 */

import { useState } from 'react'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

/* ── 활용 원리 단계 */
export function ConjugationPanel({ steps }) {
  return (
    <div style={{
      margin: '10px 0 4px',
      padding: '12px 14px',
      background: '#f8fbfe',
      border: `1px solid ${PRIMARY}33`,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: '0.3px', marginBottom: 8 }}>
        활용 원리
      </p>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {i > 0 && (
            <div style={{ paddingLeft: 20, color: '#ccc', fontSize: 14, lineHeight: 1, margin: '3px 0' }}>↓</div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              backgroundColor: PRIMARY, color: '#fff',
              fontSize: 10, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{s.step}</span>
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, fontWeight: 600, color: '#111' }}>
              {s.form}
            </span>
            <span style={{ fontSize: 12, color: '#666', background: '#f0f0f0', borderRadius: 6, padding: '1px 7px' }}>
              {s.label}
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#888', margin: '2px 0 0 26px', lineHeight: 1.5 }}>
            {s.note}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ── 행 단위 활용 원리 패널 (뜻은 항상 표시되므로 여기선 원리만) */
export function DetailPanel({ row }) {
  return (
    <div style={{
      margin: '0 14px 10px',
      padding: '12px 14px',
      background: '#f8fbfe',
      border: `1px solid ${PRIMARY}22`,
      borderRadius: 10,
    }}>
      <ConjugationPanel steps={row.conjugation_steps} />
    </div>
  )
}

/* ── 문장 분해 테이블 (데스크탑) */
export function BreakdownTable({ breakdown, showDetail }) {
  return (
    <div className="breakdown-table">
      <div className="breakdown-row breakdown-header">
        {['단위', '히라가나', '한글 발음', '품사'].map(h => (
          <span key={h} className="breakdown-header-cell">{h}</span>
        ))}
      </div>
      {breakdown.map((row, i) => (
        <div key={i} style={{ backgroundColor: i % 2 === 1 ? '#f9f9f9' : 'transparent', borderTop: '0.5px solid #eeeeee' }}>
          <div className="breakdown-row">
            <span className="breakdown-unit">{row.unit}</span>
            <span className="breakdown-cell">{row.hiragana}</span>
            <span className="breakdown-cell">{row.korean_pronunciation}</span>
            <span className="breakdown-cell"><span className="pos-badge">{row.part_of_speech}</span></span>
          </div>
          {/* 단어 뜻 — 발음 아래 항상 표시 */}
          {row.korean_meaning && (
            <div className="breakdown-meaning-cell">{row.korean_meaning}</div>
          )}
          {showDetail && row.conjugation_steps && row.conjugation_steps.length > 0 && (
            <DetailPanel row={row} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── 문장 분해 카드 (모바일) */
export function BreakdownCards({ breakdown, showDetail }) {
  return (
    <div className="breakdown-cards">
      {breakdown.map((row, i) => (
        <div key={i} className="breakdown-card-item">
          <div className="breakdown-card-top">
            <span className="breakdown-card-unit">{row.unit}</span>
            <span className="pos-badge">{row.part_of_speech}</span>
          </div>
          <div className="breakdown-card-bottom">
            <span className="breakdown-card-sub">{row.hiragana}</span>
            <span className="breakdown-card-dot">·</span>
            <span className="breakdown-card-sub">{row.korean_pronunciation}</span>
          </div>
          {/* 단어 뜻 — 발음 아래 항상 표시 */}
          {row.korean_meaning && (
            <div className="breakdown-card-meaning">{row.korean_meaning}</div>
          )}
          {showDetail && row.conjugation_steps && row.conjugation_steps.length > 0 && (
            <DetailPanel row={row} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── 예문 활용 원리 보기 — 첫 클릭 시 /breakdown 호출, 이후 토글 */
export function ExampleAnalysis({ japaneseText }) {
  const [state,      setState]      = useState('idle')
  const [showDetail, setShowDetail] = useState(false)
  const [breakdown,  setBreakdown]  = useState(null)

  async function handleToggle() {
    if (!breakdown) {
      setState('loading')
      try {
        const res = await fetch(`${API_URL}/breakdown`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ japanese: japaneseText }),
        })
        if (!res.ok) throw new Error()
        const data = await res.json()
        setBreakdown(data.breakdown ?? [])
        setState('done')
        setShowDetail(true)
      } catch {
        setState('error')
      }
      return
    }
    setShowDetail(v => !v)
  }

  return (
    <div>
      <div style={{ borderTop: '1px solid #f0f0f0', margin: '12px 0 10px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {state === 'loading' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="spinner" style={{ width: 12, height: 12, borderTopColor: PRIMARY, borderColor: `${PRIMARY}33` }} />
            <span style={{ fontSize: 11, color: '#aaa' }}>분석 중...</span>
          </div>
        ) : state === 'error' ? (
          <button onClick={handleToggle} style={{
            height: 26, padding: '0 10px', borderRadius: 13, fontSize: 11, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
            border: '1.5px solid #fed7d7', backgroundColor: '#fff5f5', color: '#e53e3e',
          }}>
            다시 시도
          </button>
        ) : (
          <DetailToggleButton showDetail={showDetail} onToggle={handleToggle} />
        )}
      </div>
      {breakdown && showDetail && breakdown.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <BreakdownTable breakdown={breakdown} showDetail={showDetail} />
          <BreakdownCards breakdown={breakdown} showDetail={showDetail} />
        </div>
      )}
    </div>
  )
}

/* ── 뜻·원리 보기 토글 버튼 */
export function DetailToggleButton({ showDetail, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        height: 26,
        padding: '0 10px',
        borderRadius: 13,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'inherit',
        cursor: 'pointer',
        border: `1.5px solid ${showDetail ? PRIMARY : '#e0e0e0'}`,
        backgroundColor: showDetail ? `${PRIMARY}15` : 'transparent',
        color: showDetail ? PRIMARY : '#aaa',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {showDetail ? '원리 닫기' : '활용 원리 보기'}
    </button>
  )
}
