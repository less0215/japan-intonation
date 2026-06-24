/* 문장 분해 공통 컴포넌트
 * ResultCard, VerbDetail, WordDetail, ParticleDetail 예문에서 공통 사용
 */

import { useState } from 'react'
import { track } from '../App'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

/* ── 활용 원리 단계 */
export function ConjugationPanel({ steps }) {
  return (
    <div style={{
      margin: '10px 0 4px',
      padding: '12px 14px',
      background: 'var(--surface-2)',
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
            <div style={{ paddingLeft: 20, color: 'var(--text-3)', fontSize: 14, lineHeight: 1, margin: '3px 0' }}>↓</div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              width: 18, height: 18, borderRadius: '50%',
              backgroundColor: PRIMARY, color: '#fff',
              fontSize: 10, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{s.step}</span>
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>
              {s.form}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-2)', background: 'var(--surface-2)', borderRadius: 6, padding: '1px 7px' }}>
              {s.label}
            </span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '2px 0 0 26px', lineHeight: 1.5 }}>
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
      background: 'var(--surface-2)',
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
        <div key={i} style={{ backgroundColor: i % 2 === 1 ? 'var(--surface-2)' : 'transparent', borderTop: '0.5px solid var(--bd)' }}>
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
        track('example_analysis_expand', { japanese: japaneseText })
      } catch {
        setState('error')
      }
      return
    }
    setShowDetail(v => !v)
  }

  return (
    <div>
      <div style={{ borderTop: '1px solid var(--bd)', margin: '12px 0 10px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {state === 'loading' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="spinner" style={{ width: 12, height: 12, borderTopColor: PRIMARY, borderColor: `${PRIMARY}33` }} />
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>분석 중...</span>
          </div>
        ) : state === 'error' ? (
          <button onClick={handleToggle} style={{
            height: 26, padding: '0 10px', borderRadius: 13, fontSize: 11, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
            border: '1.5px solid var(--danger)', backgroundColor: 'var(--danger-tint)', color: 'var(--danger)',
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

/* ── 문장 분해 접힘 상태 미리보기
 * - 정적 예시(고정 데이터, API 호출 없음)로 기능을 이해시키고
 * - 강조된 CTA로 실제 분해(온디맨드 호출)를 유도 → 호출 절감 */
const EXAMPLE_BREAKDOWN = [
  { unit: '日本語を', hiragana: 'にほんごを', korean_pronunciation: '니혼고오', korean_meaning: '일본어를', part_of_speech: '명사+조사' },
  { unit: '話す',     hiragana: 'はなす',     korean_pronunciation: '하나스',   korean_meaning: '말하다',   part_of_speech: '동사' },
  { unit: 'ことができますか', hiragana: 'ことができますか', korean_pronunciation: '코토가데키마스카', korean_meaning: '~할 수 있습니까?', part_of_speech: '문법 패턴' },
]

export function BreakdownPreview({ onExpand }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* 정적 예시 (흐리게, 상호작용 불가) */}
      <div style={{ position: 'relative', opacity: 0.5, pointerEvents: 'none', userSelect: 'none', maxHeight: 132, overflow: 'hidden', filter: 'grayscale(0.15)' }} aria-hidden="true">
        <span style={{ position: 'absolute', top: 6, right: 4, zIndex: 2, fontSize: 10, fontWeight: 700, color: '#fff', background: '#b9c4cc', borderRadius: 6, padding: '2px 7px' }}>예시</span>
        <BreakdownTable breakdown={EXAMPLE_BREAKDOWN} showDetail={false} />
        <BreakdownCards breakdown={EXAMPLE_BREAKDOWN} showDetail={false} />
      </div>
      {/* 하단 페이드 + CTA (저장하기 파란 버튼과 구분되도록 골드 계열·풀폭) */}
      <div style={{ position: 'relative', marginTop: -34, paddingTop: 34, padding: '34px 16px 0', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--surface) 62%)', textAlign: 'center' }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--text-3)' }}>단어·문법·활용 원리까지 이렇게 분해해 드려요</p>
        <button
          onClick={onExpand}
          style={{
            display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 7, height: 48,
            borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
            letterSpacing: '-0.2px', color: '#fff', border: '1px solid rgba(255,255,255,0.18)',
            background: 'linear-gradient(145deg, #ffb648 0%, #f0a500 55%, #e08e00 100%)',
            boxShadow: '0 8px 20px rgba(240,165,0,0.34), inset 0 1px 0 rgba(255,255,255,0.32)',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          문장 분해 결과 보기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
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
        border: `1.5px solid ${showDetail ? PRIMARY : 'var(--bd)'}`,
        backgroundColor: showDetail ? `${PRIMARY}15` : 'transparent',
        color: showDetail ? PRIMARY : 'var(--text-3)',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {showDetail ? '원리 닫기' : '활용 원리 보기'}
    </button>
  )
}
