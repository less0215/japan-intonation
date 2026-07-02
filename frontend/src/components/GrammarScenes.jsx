/* 문법 상세 → 영상 속 실제 사용 장면
 * 이 문법에 매핑된 표현 시그니처(expressionSignatures.grammarId)가 있으면
 * 쉐도잉 DB에서 실제 사용 장면 3개를 미리 보여주고 '표현으로 배우기'로 연결.
 * 의도: 정적 문법 페이지(SEO 관문)에 살아있는 원어민 예시 = 체류·페이지 가치 상승. */
import { useNavigate } from 'react-router-dom'
import RubyText from './RubyText'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'
import { sceneCount, sceneSamples } from '../utils/expressions'

const PRIMARY = '#5CA9CE'
const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function GrammarScenes({ grammarId }) {
  const navigate = useNavigate()
  const sig = EXPRESSION_SIGNATURES.find((s) => s.grammarId === grammarId)
  if (!sig) return null
  const total = sceneCount(sig.id)
  if (!total) return null
  const samples = sceneSamples(sig, 3)

  return (
    <div style={{ marginTop: 22 }}>
      <p style={{ margin: '0 2px 10px', fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>영상 속 실제 사용 <span style={{ fontSize: 12.5, fontWeight: 400, color: 'var(--text-3)' }}>· {total}개 장면</span></p>
      {/* CTA — 섹션 최상단(스크롤 전에 보이도록). 장면 미리보기는 아래 */}
      <button onClick={() => navigate(`/lab/expression?p=${sig.id}`)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 10, height: 50, padding: '0 16px', borderRadius: 14, border: 'none', background: PRIMARY, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 14.5, fontWeight: 800 }}>원어민 장면으로 연습하기</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
      </button>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 16, overflow: 'hidden' }}>
        {samples.map((s, i) => (
          <button key={`${s.vid}-${s.idx}`} onClick={() => navigate(`/lab/expression?p=${sig.id}`)}
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
