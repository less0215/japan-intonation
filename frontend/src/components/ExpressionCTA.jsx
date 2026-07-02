/* 번역 결과 → 표현으로 배우기 CTA
 * 번역된 일본어에 아는 표현 패턴(expressionSignatures)이 들어 있으면
 * "실제 원어민은 이렇게 써요" 배너 하나를 결과 카드 아래에 노출.
 * 의도: 번역기(도구) 사용자를 영상 학습 세션(체류)으로 전환 — 파파고와의 차별점 연결고리. */
import { useNavigate } from 'react-router-dom'
import { matchExpressions, sceneCount } from '../utils/expressions'
import { track } from '../App'

export default function ExpressionCTA({ japanese }) {
  const navigate = useNavigate()
  if (!japanese) return null
  const sig = matchExpressions(japanese).find((s) => sceneCount(s.id) > 0)
  if (!sig) return null
  const n = sceneCount(sig.id)

  return (
    <button
      onClick={() => { try { track('expression_cta', { from: 'translate', sig: sig.id }) } catch {}; navigate(`/lab/expression?p=${sig.id}`) }}
      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', padding: '13px 15px', marginTop: 10, borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid rgba(92,169,206,0.45)', background: 'rgba(92,169,206,0.08)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 10.5, fontWeight: 800, letterSpacing: '.04em', color: '#5CA9CE' }}>실제 원어민은 이렇게 써요</p>
        <p style={{ margin: '3px 0 0', fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong,#1f2937)', fontFamily: "'Noto Sans JP', sans-serif" }}>
          {sig.label}
          <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-3,#9aa0a6)', marginLeft: 8 }}>영상 속 {n}개 장면</span>
        </p>
        <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-2,#5b6470)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sig.note}</p>
      </div>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5CA9CE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 6 15 12 9 18" /></svg>
    </button>
  )
}
