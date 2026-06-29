/* 홈 구조 프로토타입 (/home-demo) — 두 축(번역기 60% / TED 쉐도잉 40%)에 충실한 새 홈.
 * TED 쉐도잉을 학습의 메인으로 끌어올린 구성. 데이터는 동작 확인용 가짜(featured만 실제 영상). 토스풍. */
import { useNavigate } from 'react-router-dom'

const PRIMARY = '#5CA9CE'
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }

const LEVELS = [{ lv: 'N5', n: 18 }, { lv: 'N4', n: 34 }, { lv: 'N3', n: 41 }, { lv: 'N2', n: 26 }, { lv: 'N1', n: 11 }]
const FEATURED = { id: 'ldybnuFxdiQ', jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', who: '高橋晋平 · TEDxTokyo', lv: 'N3', dur: '5:55' }
const VIDEOS = [
  { jp: '好きを仕事にする方法', kr: '좋아하는 일을 직업으로', lv: 'N4', dur: '12:10', g: ['#5CA9CE', '#3B82C4'] },
  { jp: '失敗から学んだこと', kr: '실패에서 배운 것', lv: 'N3', dur: '9:32', g: ['#E8772E', '#D9534F'] },
  { jp: '日本の伝統と未来', kr: '일본의 전통과 미래', lv: 'N2', dur: '15:04', g: ['#1D9E75', '#3B9AE1'] },
  { jp: 'やさしい日本語のはなし', kr: '쉬운 일본어 이야기', lv: 'N5', dur: '7:20', g: ['#E0A91B', '#E8772E'] },
]
const POS = [{ k: '동사', n: 100, to: '/verbs' }, { k: 'い형용사', n: 100, to: '/adj-i' }, { k: 'な형용사', n: 100, to: '/adj-na' }, { k: '명사', n: 100, to: '/noun' }, { k: '조사', n: 10, to: '/particles' }]

function LvBadge({ lv, size = 11 }) {
  return <span style={{ fontSize: size, fontWeight: 800, color: '#fff', background: JLPT[lv], padding: '2px 7px', borderRadius: 6 }}>{lv}</span>
}

export default function HomeDemo() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '4px 14px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 인사 */}
      <div style={{ paddingTop: 6 }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-3)', fontWeight: 600 }}>오늘도 일본어, 두 가지 길로</p>
        <p style={{ margin: '3px 0 0', fontSize: 21, fontWeight: 800, color: 'var(--text-strong)' }}>무엇을 해볼까요?</p>
      </div>

      {/* 두 축 — 번역기(60%) / TED 쉐도잉(40%) */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => navigate('/')} style={{
          flex: 1.5, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', borderRadius: 20, padding: '18px 18px 20px',
          background: 'linear-gradient(150deg,#6fb6d6 0%,#5CA9CE 60%,#4f96bb 100%)', color: '#fff', boxShadow: '0 10px 26px rgba(92,169,206,0.36)',
        }}>
          <div style={{ fontSize: 26, lineHeight: 1 }}>⚡</div>
          <p style={{ margin: '12px 0 2px', fontSize: 18, fontWeight: 800 }}>번역기</p>
          <p style={{ margin: 0, fontSize: 12.5, opacity: 0.92, lineHeight: 1.5 }}>한국어 → 일본어<br />발음 · 피치 · 문장 분해까지</p>
        </button>
        <button onClick={() => navigate('/study-demo')} style={{
          flex: 1, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', borderRadius: 20, padding: '18px 16px 20px',
          background: 'var(--surface)', border: `1.5px solid ${PRIMARY}55`, color: 'var(--text-1)',
        }}>
          <div style={{ fontSize: 26, lineHeight: 1 }}>🎬</div>
          <p style={{ margin: '12px 0 2px', fontSize: 18, fontWeight: 800, color: 'var(--text-strong)' }}>영상 쉐도잉</p>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>TED로<br />레벨 맞춤 학습</p>
        </button>
      </div>

      {/* ── TED 쉐도잉 (학습 메인) ─────────────── */}
      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-strong)' }}>🎬 영상으로 쉐도잉</p>
            <p style={{ margin: '2px 0 0', fontSize: 12.5, color: 'var(--text-3)' }}>TED 영상으로 진짜 일본어를, 내 레벨에 맞게</p>
          </div>
          <button onClick={() => navigate('/study-demo')} style={{ border: 'none', background: 'none', color: PRIMARY, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>전체보기 ›</button>
        </div>

        {/* 오늘의 추천 (실제 영상) */}
        <button onClick={() => navigate('/study-demo')} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--bd)', borderRadius: 18, overflow: 'hidden', background: 'var(--surface)', padding: 0, marginBottom: 16 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
            <img src={`https://img.youtube.com/vi/${FEATURED.id}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 55%)' }} />
            <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 10.5, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 9px', borderRadius: 20 }}>오늘의 추천</span>
            <span style={{ position: 'absolute', top: 10, right: 10 }}><LvBadge lv={FEATURED.lv} /></span>
            <span style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '2px 7px', borderRadius: 6 }}>{FEATURED.dur}</span>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 20, color: PRIMARY, marginLeft: 3 }}>▶</span>
            </div>
          </div>
          <div style={{ padding: '12px 14px 14px' }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{FEATURED.jp}</p>
            <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--text-2)' }}>{FEATURED.kr}</p>
            <p style={{ margin: '6px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>{FEATURED.who}</p>
          </div>
        </button>

        {/* 레벨별 둘러보기 */}
        <p style={{ margin: '0 0 8px', fontSize: 13.5, fontWeight: 700, color: 'var(--text-1)' }}>레벨별로 골라보기</p>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18 }}>
          {LEVELS.map(({ lv, n }) => (
            <button key={lv} onClick={() => navigate('/study-demo')} style={{ flex: '0 0 auto', cursor: 'pointer', fontFamily: 'inherit', width: 84, padding: '12px 0', borderRadius: 14, border: `1px solid ${JLPT[lv]}55`, background: `${JLPT[lv]}12`, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: JLPT[lv] }}>{lv}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', margin: '2px 0' }}>{LV_LABEL[lv]}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)' }}>{n}편</div>
            </button>
          ))}
        </div>

        {/* 인기 영상 가로 스크롤 */}
        <p style={{ margin: '0 0 8px', fontSize: 13.5, fontWeight: 700, color: 'var(--text-1)' }}>지금 인기 있는 영상</p>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
          {VIDEOS.map((v, i) => (
            <button key={i} onClick={() => navigate('/study-demo')} style={{ flex: '0 0 auto', width: 190, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', background: `linear-gradient(135deg, ${v.g[0]}, ${v.g[1]})` }}>
                <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 9.5, fontWeight: 800, color: '#fff', letterSpacing: 0.5, opacity: 0.9 }}>TEDx</span>
                <span style={{ position: 'absolute', top: 8, right: 8 }}><LvBadge lv={v.lv} size={10} /></span>
                <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 10.5, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '1px 6px', borderRadius: 5 }}>{v.dur}</span>
                <span style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 12.5, fontWeight: 800, color: '#fff', fontFamily: "'Noto Sans JP', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.4)', maxWidth: '70%' }}>{v.jp}</span>
              </div>
              <p style={{ margin: '7px 2px 0', fontSize: 12.5, color: 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ── 단어 사전 (보조) ─────────────────────── */}
      <section>
        <p style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800, color: 'var(--text-strong)' }}>📚 품사별 단어 사전</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {POS.map(({ k, n, to }) => (
            <button key={k} onClick={() => navigate(to)} style={{ cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 12, border: '1px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-1)', fontSize: 13, fontWeight: 600 }}>
              {k} <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{n}</span>
            </button>
          ))}
        </div>
      </section>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>홈 구조 프로토타입 · 영상 데이터는 예시입니다</p>
    </div>
  )
}
