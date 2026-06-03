/* 문장 분해 공통 컴포넌트
 * ResultCard와 VerbDetail 예문 모두에서 사용
 */

const PRIMARY = '#5CA9CE'

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

/* ── 행 단위 뜻 + 원리 패널 */
export function DetailPanel({ row }) {
  const hasSteps = row.conjugation_steps && row.conjugation_steps.length > 0
  return (
    <div style={{
      margin: '0 14px 10px',
      padding: '12px 14px',
      background: '#f8fbfe',
      border: `1px solid ${PRIMARY}22`,
      borderRadius: 10,
    }}>
      {row.korean_meaning && (
        <p style={{ fontSize: 13, color: '#444', marginBottom: hasSteps ? 10 : 0 }}>
          <span style={{ fontSize: 11, color: '#aaa', marginRight: 6 }}>뜻</span>
          {row.korean_meaning}
        </p>
      )}
      {hasSteps && <ConjugationPanel steps={row.conjugation_steps} />}
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
        <div key={i}>
          <div
            className="breakdown-row"
            style={{ backgroundColor: i % 2 === 1 ? '#f9f9f9' : 'transparent', borderTop: '0.5px solid #eeeeee' }}
          >
            <span className="breakdown-unit">{row.unit}</span>
            <span className="breakdown-cell">{row.hiragana}</span>
            <span className="breakdown-cell">{row.korean_pronunciation}</span>
            <span className="breakdown-cell"><span className="pos-badge">{row.part_of_speech}</span></span>
          </div>
          {showDetail && (row.korean_meaning || (row.conjugation_steps && row.conjugation_steps.length > 0)) && (
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
          {showDetail && (row.korean_meaning || (row.conjugation_steps && row.conjugation_steps.length > 0)) && (
            <DetailPanel row={row} />
          )}
        </div>
      ))}
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
      {showDetail ? '원리 닫기' : '뜻 · 원리 보기'}
    </button>
  )
}
