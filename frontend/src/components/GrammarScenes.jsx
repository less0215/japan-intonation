/* 영상 속 실제 사용 — 문법·단어 상세를 쉐도잉 장면과 연결하는 공용 섹션.
 * 우선순위: 표현 시그니처(grammarId 매핑, 활용형까지 정규식 매칭) → 없으면 패턴/단어에서
 * 자동 유도한 원문 검색(querySceneStats). 장면 2개 미만이면 조용히 숨음(오탐 페일세이프).
 * CTA를 누르면 표현 학습(/lab/expression)에서 장면들을 루프로 따라 말하기. */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import RubyText from './RubyText'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'
import { sceneCount, sceneSamples, querySceneStats } from '../utils/expressions'

const PRIMARY = '#5CA9CE'
const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const MIN_SCENES = 2

// 공용: sig(시그니처) 또는 query(원문 문자열) 중 하나로 장면 섹션 렌더
export function UsageScenes({ sig, query }) {
  const navigate = useNavigate()
  const { total, samples, link } = useMemo(() => {
    if (sig) return { total: sceneCount(sig.id), samples: sceneSamples(sig, 3), link: `/lab/expression?p=${sig.id}` }
    if (query) { const st = querySceneStats(query, 3); return { ...st, link: `/lab/expression?q=${encodeURIComponent(query)}` } }
    return { total: 0, samples: [], link: '' }
  }, [sig?.id, query])
  if (total < MIN_SCENES) return null

  return (
    <div style={{ margin: '18px 0 22px' }}>
      <p style={{ margin: '0 2px 10px', fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>영상 속 실제 사용 <span style={{ fontSize: 12.5, fontWeight: 400, color: 'var(--text-3)' }}>· {total}개 장면</span></p>
      <button onClick={() => navigate(link)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10, height: 50, padding: '0 16px', borderRadius: 14, border: 'none', background: PRIMARY, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 14.5, fontWeight: 800 }}>따라 말하면서 표현 익히기</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
      </button>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}>
        {samples.map((s, i) => (
          <button key={`${s.vid}-${s.idx}`} onClick={() => navigate(link)}
            style={{ width: '100%', display: 'block', textAlign: 'left', padding: '13px 15px', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', borderBottom: i === samples.length - 1 ? 'none' : '1px solid var(--bd)' }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{s.titleKr} · {fmtT(s.t)}</p>
            <RubyText text={s.furigana_html} fontSize={14.5} />
            <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{s.kr}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// 문법 상세용 — grammarId 매핑 시그니처 우선, 없으면 패턴 표기에서 검색어 자동 유도
export default function GrammarScenes({ grammarId, query }) {
  const sig = EXPRESSION_SIGNATURES.find((s) => s.grammarId === grammarId)
  return <UsageScenes sig={sig} query={sig ? undefined : query} />
}
