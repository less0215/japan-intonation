/* 홈 — 'TED 쉐도잉으로 배우는 일본어' 섹션 (번역기 아래).
 * 넷플릭스식: 오늘의 추천(히어로) + 레벨별 가로 스크롤 행. 데이터는 예시(featured만 실제 영상).
 * 모든 카드 → /study-demo (프로토타입). */

const PRIMARY = '#5CA9CE'
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const REAL = 'ldybnuFxdiQ'

const FEATURED = { id: REAL, jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', who: '高橋晋平 · TEDxTokyo', lv: 'N3', dur: '5:55' }

const ROWS = [
  {
    lv: 'N5', items: [
      { jp: 'やさしい日本語のはなし', kr: '쉬운 일본어 이야기', dur: '7:20' },
      { jp: 'あいさつの基本', kr: '인사의 기본', dur: '5:10' },
      { jp: '数字と時間', kr: '숫자와 시간', dur: '6:02' },
      { jp: '自己紹介のコツ', kr: '자기소개의 비결', dur: '8:44' },
      { jp: '毎日のことば', kr: '매일 쓰는 말', dur: '5:55' },
    ],
  },
  {
    lv: 'N4', items: [
      { jp: '好きを仕事にする方法', kr: '좋아하는 일을 직업으로', dur: '12:10' },
      { jp: '旅の思い出', kr: '여행의 추억', dur: '9:18' },
      { jp: '料理と文化', kr: '요리와 문화', dur: '10:32' },
      { jp: '学校で学んだこと', kr: '학교에서 배운 것', dur: '7:50' },
    ],
  },
  {
    lv: 'N3', items: [
      { id: REAL, jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', dur: '5:55' },
      { jp: '失敗から学ぶ', kr: '실패에서 배우다', dur: '9:32' },
      { jp: 'データと直感', kr: '데이터와 직관', dur: '11:04' },
      { jp: '続ける力', kr: '계속하는 힘', dur: '8:21' },
    ],
  },
  {
    lv: 'N2', items: [
      { jp: '日本の伝統と未来', kr: '일본의 전통과 미래', dur: '15:04' },
      { jp: '働き方を変える', kr: '일하는 방식을 바꾸다', dur: '13:40' },
      { jp: '地域を元気に', kr: '지역을 활기차게', dur: '10:58' },
      { jp: '科学のおはなし', kr: '과학 이야기', dur: '12:26' },
    ],
  },
  {
    lv: 'N1', items: [
      { jp: '社会とテクノロジー', kr: '사회와 테크놀로지', dur: '17:12' },
      { jp: '哲学的に考える', kr: '철학적으로 생각하기', dur: '14:30' },
      { jp: '創造性とは何か', kr: '창의성이란 무엇인가', dur: '16:05' },
    ],
  },
]

function shade(lv) { const c = JLPT[lv]; return [c, c + 'aa'] }

function Card({ v, lv, onNavigate }) {
  const thumb = v.id ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : null
  const [c1] = shade(lv)
  return (
    <button className="ted-card" onClick={() => onNavigate('/study-demo')} style={{ flex: '0 0 172px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: thumb ? '#000' : `linear-gradient(135deg, ${c1}, ${JLPT[lv]}66)` }}>
        {thumb && <img src={thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <span style={{ position: 'absolute', top: 7, right: 7, fontSize: 9.5, fontWeight: 800, color: '#fff', background: JLPT[lv], padding: '1px 6px', borderRadius: 5 }}>{lv}</span>
        <span style={{ position: 'absolute', bottom: 7, right: 7, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
        {!thumb && <span style={{ position: 'absolute', left: 9, bottom: 8, fontSize: 12.5, fontWeight: 800, color: '#fff', fontFamily: "'Noto Sans JP', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.45)', maxWidth: '75%' }}>{v.jp}</span>}
      </div>
      <p style={{ margin: '6px 2px 0', fontSize: 12, color: 'var(--text-2,#5b6470)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
    </button>
  )
}

export default function TedShadowingHome({ onNavigate }) {
  return (
    <div>
      <style>{`.ted-card{transition:transform .18s ease}@media (hover:hover){.ted-card:hover{transform:scale(1.045)}}`}</style>

      {/* 섹션 헤더 */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '2px 2px 12px' }}>
        <div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>🎬 TED 쉐도잉으로 배우는 일본어</p>
          <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-3,#9aa0a6)' }}>TED 영상으로 진짜 일본어를, 내 레벨에 맞게</p>
        </div>
        <button onClick={() => onNavigate('/study-demo')} style={{ border: 'none', background: 'none', color: PRIMARY, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>전체보기 ›</button>
      </div>

      {/* 오늘의 추천 (실제 영상, 큰 카드) */}
      <button className="ted-card" onClick={() => onNavigate('/study-demo')} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0, marginBottom: 22 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
          <img src={`https://img.youtube.com/vi/${FEATURED.id}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0) 52%)' }} />
          <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 10.5, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 9px', borderRadius: 20 }}>오늘의 추천</span>
          <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 11, fontWeight: 800, color: '#fff', background: JLPT[FEATURED.lv], padding: '2px 8px', borderRadius: 6 }}>{FEATURED.lv}</span>
          <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: "'Noto Sans JP', sans-serif", textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{FEATURED.jp}</p>
            <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'rgba(255,255,255,0.9)' }}>{FEATURED.kr} · {FEATURED.who}</p>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20, color: PRIMARY, marginLeft: 3 }}>▶</span>
          </div>
        </div>
      </button>

      {/* 레벨별 행 (넷플릭스식 가로 스크롤) */}
      {ROWS.map(({ lv, items }) => (
        <div key={lv} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '0 2px 9px' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: JLPT[lv], padding: '2px 8px', borderRadius: 6 }}>{lv}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-1,#3a4250)' }}>{LV_LABEL[lv]}</span>
            <span style={{ fontSize: 11.5, color: 'var(--text-3,#9aa0a6)' }}>· {items.length}편</span>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -2px', padding: '0 2px 4px' }}>
            {items.map((v, i) => <Card key={i} v={v} lv={lv} onNavigate={onNavigate} />)}
          </div>
        </div>
      ))}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3,#9aa0a6)', margin: '6px 0 2px' }}>영상은 예시입니다 · 추천 1편만 실제 영상</p>
    </div>
  )
}
