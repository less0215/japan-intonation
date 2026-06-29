/* 쉐도잉 브라우즈 (넷플릭스식) — 홈 섹션(variant='home') + 쉐도잉 탭(variant='tab') 공용.
 * 고정 행: 시청 중(로그인)·좋아요 비슷(로그인)·인기 TOP10(전체)·레벨별·주제별(탭).
 * 제목=한국어 위/일본어 아래(한국 타겟). 레벨칩·시작 버튼=흑백 심플. 평가/시청=localStorage.
 * 모든 학습 → /study-demo (영상별 전체 학습은 파이프라인 필요, 현재 데모 1편). */
import { useEffect, useState } from 'react'
import { STUDY_CATALOG, STUDY_FEATURED, STUDY_TOP10, TAG_GROUPS } from '../data/studyCatalog'

const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const ORDER = ['N4', 'N3', 'N2', 'N1']
const LS_RATE = 'tickjapan_study_ratings'
const LS_WATCH = 'tickjapan_study_watched'
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`

// 흑백 레벨 배지 — 썸네일 위(반투명 흑+흰테), 페이지 위(아웃라인)
function LvOnThumb({ lv }) {
  return <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.45)', padding: '1px 6px', borderRadius: 5 }}>{lv}</span>
}
function LvPlain({ lv, withLabel }) {
  return <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-1,#3a4250)', border: '1px solid var(--bd,#d7dde2)', padding: '2px 8px', borderRadius: 6 }}>{lv}{withLabel ? ` · ${LV_LABEL[lv]}` : ''}</span>
}

function Card({ v, onOpen, rating }) {
  return (
    <button className="ted-card" onClick={() => onOpen(v)} style={{ flex: '0 0 174px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
        <img src={thumb(v.id)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 7, right: 7 }}><LvOnThumb lv={v.lv} /></span>
        <span style={{ position: 'absolute', bottom: 7, right: 7, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
        {rating === 'up' && <span style={{ position: 'absolute', top: 7, left: 7, display: 'flex', color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}><Thumb filled size={14} /></span>}
      </div>
      <p style={{ margin: '6px 2px 0', fontSize: 12.5, fontWeight: 700, color: 'var(--text-1,#3a4250)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
      <p style={{ margin: '1px 2px 0', fontSize: 11, color: 'var(--text-3,#9aa0a6)', fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.jp}</p>
    </button>
  )
}

function RankCard({ v, rank, onOpen }) {
  return (
    <button className="ted-card" onClick={() => onOpen(v)} style={{ flex: '0 0 226px', display: 'flex', alignItems: 'flex-end', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <span style={{ flex: '0 0 58px', fontSize: 82, fontWeight: 900, lineHeight: 0.8, color: 'transparent', WebkitTextStroke: '2px var(--text-3,#b9c2cc)', marginRight: -6, fontFamily: 'Arial, sans-serif' }}>{rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
          <img src={thumb(v.id)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: 6, right: 6 }}><LvOnThumb lv={v.lv} /></span>
          <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
        </div>
        <p style={{ margin: '5px 2px 0', fontSize: 12, fontWeight: 700, color: 'var(--text-1,#3a4250)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
      </div>
    </button>
  )
}

function Row({ title, items, onOpen, ratings, ranked }) {
  if (!items || !items.length) return null
  return (
    <div style={{ marginBottom: 22 }}>
      <p style={{ margin: '0 2px 9px', fontSize: 14.5, fontWeight: 800, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>{title}</p>
      <div style={{ display: 'flex', gap: ranked ? 4 : 10, overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -2px', padding: '0 2px 4px' }}>
        {items.map((v, i) => ranked
          ? <RankCard key={v.id} v={v} rank={i + 1} onOpen={onOpen} />
          : <Card key={v.id} v={v} onOpen={onOpen} rating={ratings[v.id]} />)}
      </div>
    </div>
  )
}

export default function ShadowingBrowse({ variant = 'home', isLoggedIn, userName, onNavigate }) {
  const [ratings, setRatings] = useState(() => load(LS_RATE, {}))
  const [watched, setWatched] = useState(() => load(LS_WATCH, []))
  const [sel, setSel] = useState(null)

  useEffect(() => { try { localStorage.setItem(LS_RATE, JSON.stringify(ratings)) } catch {} }, [ratings])
  useEffect(() => { try { localStorage.setItem(LS_WATCH, JSON.stringify(watched)) } catch {} }, [watched])

  const rate = (id, v) => setRatings(p => ({ ...p, [id]: p[id] === v ? undefined : v }))
  const start = (id) => { setWatched(p => [id, ...p.filter(x => x !== id)].slice(0, 12)); setSel(null); onNavigate('/study-demo') }

  const byId = (id) => STUDY_CATALOG.find(v => v.id === id)
  const watchedV = watched.map(byId).filter(Boolean)
  const likedIds = Object.keys(ratings).filter(id => ratings[id] === 'up')
  const disliked = new Set(Object.keys(ratings).filter(id => ratings[id] === 'down'))
  const likedV = likedIds.length ? byId(likedIds[likedIds.length - 1]) : null
  const similar = likedV ? STUDY_CATALOG.filter(v => v.id !== likedV.id && !disliked.has(v.id) && (v.lv === likedV.lv || v.tags.some(t => likedV.tags.includes(t)))).slice(0, 12) : []
  const f = STUDY_FEATURED
  const isTab = variant === 'tab'

  return (
    <div>
      <style>{`.ted-card{transition:transform .18s ease}@media (hover:hover){.ted-card:hover{transform:scale(1.045)}}`}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: isTab ? '2px 2px 14px' : '2px 2px 12px' }}>
        <div>
          <p style={{ margin: 0, fontSize: isTab ? 20 : 17, fontWeight: 800, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>쉐도잉</p>
          <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-3,#9aa0a6)', wordBreak: 'keep-all' }}>TED, 영화보다 더 영화 같은 이야기</p>
        </div>
        {!isTab && <button onClick={() => onNavigate('/shadowing')} style={{ border: 'none', background: 'none', color: 'var(--text-2,#5b6470)', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>전체보기 ›</button>}
      </div>

      {/* 탭: 오늘의 추천 히어로 */}
      {isTab && (
        <button className="ted-card" onClick={() => setSel(f)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0, marginBottom: 24 }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: '46vh', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
            <img src={thumb(f.id)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0) 55%)' }} />
            <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 11, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '3px 10px', borderRadius: 20 }}>오늘의 추천</span>
            <span style={{ position: 'absolute', top: 12, right: 12 }}><LvOnThumb lv={f.lv} /></span>
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
              <p style={{ margin: 0, fontSize: 19, fontWeight: 800, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{f.kr}</p>
              <p style={{ margin: '3px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.82)', fontFamily: "'Noto Sans JP', sans-serif" }}>{f.jp} · {f.ev} · {f.dur}</p>
            </div>
          </div>
        </button>
      )}

      {isLoggedIn && watchedV.length > 0 && (
        <Row title={`${userName || '회원'}님이 시청 중인 콘텐츠`} items={watchedV} onOpen={setSel} ratings={ratings} />
      )}
      {isLoggedIn && likedV && similar.length > 0 && (
        <Row title={`‘좋아요’한 〈${likedV.kr}〉과 비슷한 콘텐츠`} items={similar} onOpen={setSel} ratings={ratings} />
      )}

      <Row title="쉐도잉 인기 TOP 10" items={STUDY_TOP10} onOpen={setSel} ratings={ratings} ranked />

      {/* 주제 카테고리 (홈·탭 공통). JLPT 레벨은 카드 칩으로만 참고 */}
      {TAG_GROUPS.map(g => (
        <Row key={g.tag} title={g.label} items={STUDY_CATALOG.filter(v => v.tags.includes(g.tag))} onOpen={setSel} ratings={ratings} />
      ))}

      {!isLoggedIn && <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3,#9aa0a6)', margin: '4px 0 2px' }}>로그인하면 ‘시청 중’·‘좋아요 기반 추천’이 나와요</p>}
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3,#9aa0a6)', margin: '4px 0 2px' }}>실제 일본어 TEDx 20편 · 레벨/주제는 임시 추정 · 학습은 현재 데모 1편</p>

      {/* 상세 시트 */}
      {sel && (
        <div onClick={() => setSel(null)} style={{ position: 'fixed', inset: 0, zIndex: 4500, background: 'rgba(12,18,24,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'tjFadeS .18s ease' }}>
          <style>{`@keyframes tjFadeS{from{opacity:0}to{opacity:1}}@keyframes tjUpS{from{transform:translateY(30px);opacity:.6}to{transform:translateY(0);opacity:1}}`}</style>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 460, maxHeight: '86vh', overflowY: 'auto', background: 'var(--bg,#fff)', borderRadius: '22px 22px 0 0', boxShadow: '0 -12px 44px rgba(0,0,0,0.3)', animation: 'tjUpS .3s cubic-bezier(.16,1,.3,1)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <img src={thumb(sel.id)} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px 22px 0 0' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 55%)', borderRadius: '22px 22px 0 0' }} />
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.45)', padding: '2px 9px', borderRadius: 6 }}>{sel.lv} · {LV_LABEL[sel.lv]}</span>
              <span style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11.5, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: 6 }}>{sel.dur}</span>
            </div>
            <div style={{ padding: '16px 18px 24px' }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>{sel.kr}</p>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--text-2,#5b6470)', fontFamily: "'Noto Sans JP', sans-serif" }}>{sel.jp}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-3,#9aa0a6)' }}>{sel.ev} · {sel.dur}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {sel.tags.map(t => <span key={t} style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-2,#5b6470)', background: 'var(--surface,#f1f5f8)', border: '1px solid var(--bd,#e6ebef)', padding: '4px 10px', borderRadius: 20 }}>{t}</span>)}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button onClick={() => rate(sel.id, 'up')} style={rateBtn(ratings[sel.id] === 'up')}><Thumb filled={ratings[sel.id] === 'up'} /> 좋아요</button>
                <button onClick={() => rate(sel.id, 'down')} style={rateBtn(ratings[sel.id] === 'down')}><Thumb down filled={ratings[sel.id] === 'down'} /> 별로</button>
              </div>
              <button onClick={() => start(sel.id)} style={{ width: '100%', height: 50, marginTop: 10, borderRadius: 14, border: 'none', background: 'var(--text-strong,#1f2937)', color: 'var(--bg,#fff)', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg> 쉐도잉 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function rateBtn(on) {
  return { flex: 1, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, border: `1px solid ${on ? 'var(--text-2,#5b6470)' : 'var(--bd,#e6ebef)'}`, background: on ? 'var(--surface,#f1f5f8)' : 'transparent', color: on ? 'var(--text-strong,#1f2937)' : 'var(--text-3,#9aa0a6)' }
}
function Thumb({ down, filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transform: down ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}
