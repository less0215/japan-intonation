/* 홈 구조 프로토타입 (/home-demo) — 미니멀 버전.
 * 본질=번역기를 상단 히어로로, 그 아래 쉐도잉 한 조각만 세련되게. 나머지(단어사전 등) 제거.
 * 데이터는 동작 확인용(featured만 실제 영상). 토스풍·군더더기 없이. */
import { useNavigate } from 'react-router-dom'

const PRIMARY = '#5CA9CE'
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1']
const FEATURED = { id: 'ldybnuFxdiQ', jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', who: '高橋晋平 · TEDxTokyo', lv: 'N3', dur: '5:55' }

export default function HomeDemo() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 540, margin: '0 auto', padding: '14px 16px 28px' }}>
      {/* 본질: 번역기 */}
      <p style={{ margin: '4px 0 14px', fontSize: 22, fontWeight: 800, color: 'var(--text-strong)', lineHeight: 1.3 }}>무엇을 일본어로<br />옮겨볼까요?</p>

      <button onClick={() => navigate('/')} style={{
        width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
        border: '1px solid var(--bd)', borderRadius: 20, background: 'var(--surface)', padding: '16px 16px 18px',
        boxShadow: '0 8px 24px rgba(20,40,55,0.06)',
      }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: PRIMARY }}>번역기 · 한국어 → 일본어</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 11, padding: '13px 15px', borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--bd)' }}>
          <span style={{ flex: 1, fontSize: 14.5, color: 'var(--text-3)' }}>예) 회의는 몇 시예요?</span>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
        <p style={{ margin: '11px 2px 0', fontSize: 12.5, color: 'var(--text-3)' }}>후리가나 · 피치 악센트 · 문장 분해까지 한 번에</p>
      </button>

      {/* 쉐도잉 — 미니멀 한 조각 */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '30px 2px 12px' }}>
        <p style={{ margin: 0, fontSize: 16.5, fontWeight: 800, color: 'var(--text-strong)' }}>영상으로 쉐도잉</p>
        <button onClick={() => navigate('/study-demo')} style={{ border: 'none', background: 'none', color: PRIMARY, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>전체보기 ›</button>
      </div>

      {/* 오늘의 영상 (실제) */}
      <button onClick={() => navigate('/study-demo')} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--bd)', borderRadius: 18, overflow: 'hidden', background: 'var(--surface)', padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
          <img src={`https://img.youtube.com/vi/${FEATURED.id}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)' }} />
          <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 11, fontWeight: 800, color: '#fff', background: JLPT[FEATURED.lv], padding: '2px 8px', borderRadius: 6 }}>{FEATURED.lv}</span>
          <span style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '2px 7px', borderRadius: 6 }}>{FEATURED.dur}</span>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 19, color: PRIMARY, marginLeft: 3 }}>▶</span>
          </div>
        </div>
        <div style={{ padding: '12px 14px 14px' }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{FEATURED.jp}</p>
          <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-2)' }}>{FEATURED.kr} · {FEATURED.who}</p>
        </div>
      </button>

      {/* 레벨별 — 슬림 */}
      <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
        {LEVELS.map(lv => (
          <button key={lv} onClick={() => navigate('/study-demo')} style={{ flex: 1, cursor: 'pointer', fontFamily: 'inherit', padding: '9px 0', borderRadius: 11, border: `1px solid ${JLPT[lv]}55`, background: `${JLPT[lv]}12`, fontSize: 13, fontWeight: 800, color: JLPT[lv] }}>{lv}</button>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 22 }}>홈 구조 프로토타입 · 영상 데이터는 예시</p>
    </div>
  )
}
