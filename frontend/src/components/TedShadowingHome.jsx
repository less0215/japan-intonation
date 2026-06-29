/* 홈 — 'TED 쉐도잉' 섹션 (번역기 아래). 넷플릭스식: 오늘의 추천 + 레벨별 가로 스크롤 행.
 * 실제 일본어 TEDx 영상 20편(studyCatalog.js). 썸네일=img.youtube.com 실제 로드.
 * 모든 카드 → /study-demo (전체 학습은 데모 1편 데이터, 영상별 학습은 파이프라인 필요). */
import { STUDY_CATALOG, STUDY_FEATURED } from '../data/studyCatalog'

const PRIMARY = '#5CA9CE'
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const ORDER = ['N4', 'N3', 'N2', 'N1']

const ROWS = ORDER.map(lv => ({ lv, items: STUDY_CATALOG.filter(v => v.lv === lv) })).filter(r => r.items.length)

function Card({ v, onNavigate }) {
  return (
    <button className="ted-card" onClick={() => onNavigate('/study-demo')} style={{ flex: '0 0 174px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
        <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 7, right: 7, fontSize: 9.5, fontWeight: 800, color: '#fff', background: JLPT[v.lv], padding: '1px 6px', borderRadius: 5 }}>{v.lv}</span>
        <span style={{ position: 'absolute', bottom: 7, right: 7, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
      </div>
      <p style={{ margin: '6px 2px 0', fontSize: 12.5, fontWeight: 600, color: 'var(--text-1,#3a4250)', fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.jp}</p>
      <p style={{ margin: '1px 2px 0', fontSize: 11, color: 'var(--text-3,#9aa0a6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
    </button>
  )
}

export default function TedShadowingHome({ onNavigate }) {
  const f = STUDY_FEATURED
  return (
    <div>
      <style>{`.ted-card{transition:transform .18s ease}@media (hover:hover){.ted-card:hover{transform:scale(1.045)}}`}</style>

      {/* 헤드카피 */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '2px 2px 12px' }}>
        <div>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>당신이 찾고 있던 유익하고 짧은 쉐도잉</p>
          <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-3,#9aa0a6)' }}>TED 영상으로, 내 레벨에 맞게</p>
        </div>
        <button onClick={() => onNavigate('/study-demo')} style={{ border: 'none', background: 'none', color: PRIMARY, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>전체보기 ›</button>
      </div>

      {/* 오늘의 추천 */}
      <button className="ted-card" onClick={() => onNavigate('/study-demo')} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0, marginBottom: 22 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
          <img src={`https://img.youtube.com/vi/${f.id}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0) 52%)' }} />
          <span style={{ position: 'absolute', top: 10, left: 10, fontSize: 10.5, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 9px', borderRadius: 20 }}>오늘의 추천</span>
          <span style={{ position: 'absolute', top: 10, right: 10, fontSize: 11, fontWeight: 800, color: '#fff', background: JLPT[f.lv], padding: '2px 8px', borderRadius: 6 }}>{f.lv}</span>
          <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: "'Noto Sans JP', sans-serif", textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{f.jp}</p>
            <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'rgba(255,255,255,0.9)' }}>{f.kr} · {f.ev} · {f.dur}</p>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 20, color: PRIMARY, marginLeft: 3 }}>▶</span>
          </div>
        </div>
      </button>

      {/* 레벨별 행 (넷플릭스식) */}
      {ROWS.map(({ lv, items }) => (
        <div key={lv} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '0 2px 9px' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: JLPT[lv], padding: '2px 8px', borderRadius: 6 }}>{lv}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-1,#3a4250)' }}>{LV_LABEL[lv]}</span>
            <span style={{ fontSize: 11.5, color: 'var(--text-3,#9aa0a6)' }}>· {items.length}편</span>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -2px', padding: '0 2px 4px' }}>
            {items.map(v => <Card key={v.id} v={v} onNavigate={onNavigate} />)}
          </div>
        </div>
      ))}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3,#9aa0a6)', margin: '6px 0 2px' }}>실제 일본어 TEDx 20편 · 레벨은 임시 추정 · 학습 화면은 현재 데모 1편</p>
    </div>
  )
}
