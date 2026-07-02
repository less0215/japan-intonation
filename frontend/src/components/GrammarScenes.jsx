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
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, margin: '0 2px 10px' }}>
        <p style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>영상 속 실제 사용 <span style={{ fontSize: 12.5, fontWeight: 400, color: 'var(--text-3)' }}>· {total}개 장면</span></p>
      </div>
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
      <button onClick={() => navigate(`/lab/expression?p=${sig.id}`)}
        style={{ width: '100%', marginTop: 10, height: 46, borderRadius: 13, border: `1px solid rgba(92,169,206,0.5)`, background: 'rgba(92,169,206,0.08)', color: PRIMARY, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
        영상으로 따라 말하기 →
      </button>
    </div>
  )
}
