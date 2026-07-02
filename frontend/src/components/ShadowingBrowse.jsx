/* 쉐도잉 브라우즈 (넷플릭스식) — 홈 섹션(variant='home') + 쉐도잉 탭(variant='tab') 공용.
 * 홈: TOP10 최상단 + 개인화(로그인) + 주제 카테고리. 헤드카피·히어로·필터는 탭에만.
 * 탭: 헤드카피 + 히어로 + 필터(레벨·분량) + 개인화 + TOP10 + 주제.
 * 데스크톱 카드 호버 → 음소거 자동재생 미리보기 + 정보(넷플릭스식). 제목=한국어 위/일본어 아래.
 * 평가/시청=localStorage. 모든 학습 → /study-demo. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { STUDY_CATALOG, STUDY_FEATURED, STUDY_TOP10, TAG_GROUPS } from '../data/studyCatalog'
import { STUDY_DATA } from '../data/studyData'   // 검색: 대사(스크립트) 내용까지 매칭

const API_URL = 'https://japan-intonation-production.up.railway.app'
// 좋아요/싫어요를 서버에 기록 → 전역 랭킹(수요)에 즉시 반영
function logRate(video_id, kind) {
  try {
    let user_id = null; try { user_id = JSON.parse(localStorage.getItem('tickjapan_user') || 'null')?.user_id || null } catch {}
    let anon_id = null; try { anon_id = localStorage.getItem('tickjapan_anon') || null } catch {}
    const body = JSON.stringify({ events: [{ video_id, kind }], user_id, anon_id })
    if (navigator.sendBeacon) navigator.sendBeacon(`${API_URL}/study/events`, new Blob([body], { type: 'application/json' }))
    else fetch(`${API_URL}/study/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true })
    if (window.gtag) window.gtag('event', 'shadow_' + kind, { video_id })
  } catch {}
}

const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const LEVELS = ['N4', 'N3', 'N2', 'N1']
const DURS = [{ k: 'short', label: '~10분' }, { k: 'mid', label: '10~20분' }, { k: 'long', label: '20분+' }]
const WHY_TED = [
  { t: '부담 없는 길이 · 풍부한 선택지', d: '드라마·영화 한 편은 너무 길어 반복하기 어렵죠(같은 걸 계속 보면 지루하고요). TED는 짧으면 5분, 강연 수도 많아 내 취향에 맞는 영상을 꼭 찾을 수 있어요.' },
  { t: '탄탄한 구조 · 명확한 메시지', d: '연사들은 자신의 연구·책을 바탕으로 발표해 논리가 탄탄하고, 정해진 시간 안에 말하다 보니 내용이 밀도 있어요.' },
  { t: '사고방식 · 표현력까지', d: '말하는 방식과 논리적 사고를 함께 익히고, 불특정 다수 앞 강연이라 지엽적인 표현 없이 올바른 표현을 배울 수 있어요.' },
]
const LS_RATE = 'tickjapan_study_ratings'
const LS_WATCH = 'tickjapan_study_watched'
const LS_VIDS = 'tickjapan_study_saved_videos'
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
const CAN_HOVER = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(hover:hover) and (pointer:fine)').matches : false
const IS_APP = typeof window !== 'undefined' && (window.Capacitor?.isNativePlatform?.() ?? false)
const durSec = (d) => { const [m, s] = (d || '0:0').split(':').map(Number); return (m || 0) * 60 + (s || 0) }

function LvOnThumb({ lv }) {
  return <span style={{ fontSize: 9.5, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.45)', padding: '1px 6px', borderRadius: 5 }}>{lv}</span>
}

function Card({ v, onOpen, rating, onHover, onLeave }) {
  return (
    <button className="ted-card" onClick={() => onOpen(v)}
      onMouseEnter={CAN_HOVER ? (e) => onHover(v, e.currentTarget) : undefined}
      onMouseLeave={CAN_HOVER ? onLeave : undefined}
      style={{ flex: '0 0 174px', width: 174, maxWidth: 174, minWidth: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
        <img src={thumb(v.id)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 7, right: 7 }}><LvOnThumb lv={v.lv} /></span>
        <span style={{ position: 'absolute', bottom: 7, right: 7, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
        {v.ready && <span style={{ position: 'absolute', bottom: 7, left: 7, fontSize: 9.5, fontWeight: 800, color: '#111', background: 'rgba(255,255,255,0.92)', padding: '1px 6px', borderRadius: 4 }}>▶ 학습</span>}
        {rating === 'up' && <span style={{ position: 'absolute', top: 7, left: 7, display: 'flex', color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}><Thumb filled size={14} /></span>}
      </div>
      <p style={{ margin: '6px 2px 0', fontSize: 12.5, fontWeight: 700, color: 'var(--text-1,#3a4250)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
      <p style={{ margin: '1px 2px 0', fontSize: 11, color: 'var(--text-3,#9aa0a6)', fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.jp}</p>
    </button>
  )
}

function RankCard({ v, rank, onOpen, onHover, onLeave }) {
  return (
    <button className="ted-card" onClick={() => onOpen(v)} style={{ flex: '0 0 226px', width: 226, maxWidth: 226, minWidth: 0, display: 'flex', alignItems: 'flex-end', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
      <span style={{ flex: '0 0 58px', fontSize: 82, fontWeight: 900, lineHeight: 0.8, color: 'transparent', WebkitTextStroke: '2px var(--text-3,#b9c2cc)', marginRight: -6, fontFamily: 'Arial, sans-serif' }}>{rank}</span>
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }} onMouseEnter={CAN_HOVER ? (e) => onHover(v, e.currentTarget) : undefined} onMouseLeave={CAN_HOVER ? onLeave : undefined}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 10, overflow: 'hidden', background: '#000' }}>
          <img src={thumb(v.id)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: 6, right: 6 }}><LvOnThumb lv={v.lv} /></span>
          <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
          {v.ready && <span style={{ position: 'absolute', bottom: 6, left: 6, fontSize: 9.5, fontWeight: 800, color: '#111', background: 'rgba(255,255,255,0.92)', padding: '1px 6px', borderRadius: 4 }}>▶ 학습</span>}
        </div>
        <p style={{ margin: '5px 2px 0', fontSize: 12, fontWeight: 700, color: 'var(--text-1,#3a4250)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.kr}</p>
      </div>
    </button>
  )
}

function Row({ title, items, onOpen, ratings, ranked, onHover, onLeave, autoScroll }) {
  if (!items || !items.length) return null
  // 자동 스크롤(마퀴): 아이템을 2벌 복제한 트랙을 -50%까지 무한 이동 → 이음매 없이 우→좌로 순환.
  // hover 시 정지(카드 클릭·미리보기 여유를 위해). 모바일은 hover 없어 계속 흐르되 탭은 정상 동작.
  const track = autoScroll ? [...items, ...items] : items
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ margin: '0 2px 7px', fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>{title}</p>
      <div style={autoScroll
        ? { overflow: 'hidden', margin: '0 -2px', padding: '0 2px 4px' }
        : { display: 'flex', gap: ranked ? 4 : 10, overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -2px', padding: '0 2px 4px' }}>
        <div className={autoScroll ? 'tj-marquee-track' : undefined}
          style={{ display: 'flex', gap: ranked ? 4 : 10, width: 'max-content' }}>
          {track.map((v, i) => ranked
            ? <RankCard key={`${v.id}-${i}`} v={v} rank={(i % items.length) + 1} onOpen={onOpen} onHover={onHover} onLeave={onLeave} />
            : <Card key={`${v.id}-${i}`} v={v} onOpen={onOpen} rating={ratings[v.id]} onHover={onHover} onLeave={onLeave} />)}
        </div>
      </div>
    </div>
  )
}

export default function ShadowingBrowse({ variant = 'home', isLoggedIn, userName, onNavigate }) {
  const [ratings, setRatings] = useState(() => load(LS_RATE, {}))
  const [watched, setWatched] = useState(() => load(LS_WATCH, []))
  const [sel, setSel] = useState(null)
  const [lvF, setLvF] = useState('all')
  const [durF, setDurF] = useState('all')
  const [q, setQ] = useState('')   // 영상 검색(제목·대사) — 한 글자마다 즉시 결과
  const [hover, setHover] = useState(null)   // { v, rect }
  const [filterOpen, setFilterOpen] = useState(false)
  const [savedVids, setSavedVids] = useState(() => load(LS_VIDS, []))
  const [rankedIds, setRankedIds] = useState(null)   // 서버 인기 랭킹(수요 반영)
  const [whyOpen, setWhyOpen] = useState(() => { try { return !localStorage.getItem('tickjapan_shadow_why') } catch { return true } })   // 첫 진입엔 펼침
  const toggleWhy = () => setWhyOpen(o => { const n = !o; if (!n) { try { localStorage.setItem('tickjapan_shadow_why', '1') } catch {} } return n })
  const enterT = useRef(); const leaveT = useRef(); const filterRef = useRef()

  useEffect(() => { try { localStorage.setItem(LS_RATE, JSON.stringify(ratings)) } catch {} }, [ratings])
  useEffect(() => { try { localStorage.setItem(LS_WATCH, JSON.stringify(watched)) } catch {} }, [watched])
  useEffect(() => { try { localStorage.setItem(LS_VIDS, JSON.stringify(savedVids)) } catch {} }, [savedVids])
  useEffect(() => { const f = () => setHover(null); window.addEventListener('scroll', f, true); return () => window.removeEventListener('scroll', f, true) }, [])
  useEffect(() => { fetch(`${API_URL}/study/ranking`).then(r => r.ok ? r.json() : null).then(d => setRankedIds(Array.isArray(d?.ids) ? d.ids : [])).catch(() => setRankedIds([])) }, [])
  useEffect(() => {
    if (!filterOpen) return
    const f = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false) }
    document.addEventListener('mousedown', f); return () => document.removeEventListener('mousedown', f)
  }, [filterOpen])

  const rate = (id, v) => setRatings(p => {
    if (p[id] !== v && (v === 'up' || v === 'down')) logRate(id, v === 'up' ? 'rate_up' : 'rate_down')
    return { ...p, [id]: p[id] === v ? undefined : v }
  })
  const start = (id) => {
    setWatched(p => [id, ...p.filter(x => x !== id)].slice(0, 12)); setSel(null); setHover(null); onNavigate('/study-demo?v=' + id)
  }
  const isVidSaved = (id) => savedVids.includes(id)
  const toggleVid = (id) => setSavedVids(p => p.includes(id) ? p.filter(x => x !== id) : [id, ...p])

  const onHover = (v, el) => { clearTimeout(leaveT.current); clearTimeout(enterT.current); const rect = el.getBoundingClientRect(); enterT.current = setTimeout(() => setHover({ v, rect }), 480) }
  const onLeave = () => { clearTimeout(enterT.current); leaveT.current = setTimeout(() => setHover(null), 160) }

  const READY = STUDY_CATALOG.filter(v => v.ready)   // 학습 스크립트 준비된 영상만 노출(준비 중은 숨김)
  const byId = (id) => STUDY_CATALOG.find(v => v.id === id)
  const watchedV = watched.map(byId).filter(v => v && v.ready)
  const likedIds = Object.keys(ratings).filter(id => ratings[id] === 'up')
  const disliked = new Set(Object.keys(ratings).filter(id => ratings[id] === 'down'))
  const likedV = likedIds.length ? byId(likedIds[likedIds.length - 1]) : null
  // 인기 TOP10 = 서버 랭킹(실수요) 우선, 부족분은 정적 큐레이션으로 보충(데이터 적을 땐 사실상 큐레이션)
  const top10 = useMemo(() => {
    const m = new Map(READY.map(v => [v.id, v])); const out = []; const seen = new Set()
    for (const id of (rankedIds || [])) { const v = m.get(id); if (v && !seen.has(id)) { out.push(v); seen.add(id) } }
    for (const v of STUDY_TOP10) { if (v.ready && !seen.has(v.id)) { out.push(v); seen.add(v.id) } }
    return out.slice(0, 10)
  }, [rankedIds])
  // 추천 = 내가 '좋아요'한 영상들의 태그/레벨과 겹치는 정도로 점수화(싫어요·이미 좋아요 제외)
  const similar = (() => {
    if (!likedIds.length) return []
    const likedVids = likedIds.map(byId).filter(Boolean)
    const tagW = {}; likedVids.forEach(v => (v.tags || []).forEach(t => { tagW[t] = (tagW[t] || 0) + 1 }))
    const lvW = {}; likedVids.forEach(v => { lvW[v.lv] = (lvW[v.lv] || 0) + 1 })
    return READY.filter(v => !likedIds.includes(v.id) && !disliked.has(v.id))
      .map(v => ({ v, s: (v.tags || []).reduce((a, t) => a + (tagW[t] || 0), 0) + (lvW[v.lv] || 0) * 0.5 }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.v).slice(0, 12)
  })()
  const f = STUDY_FEATURED
  const isTab = variant === 'tab'
  const filtering = isTab && (lvF !== 'all' || durF !== 'all')
  const durOk = (v) => durF === 'all' || (durF === 'short' ? durSec(v.dur) <= 600 : durF === 'mid' ? (durSec(v.dur) > 600 && durSec(v.dur) <= 1200) : durSec(v.dur) > 1200)
  const filtered = READY.filter(v => (lvF === 'all' || v.lv === lvF) && durOk(v))

  // ── 영상 검색(제목·태그·대사) — 글자마다 즉시. 제목 매칭 우선, 대사 매칭은 스니펫 2개까지 표시 ──
  const nq = q.trim().toLowerCase()
  const searchResults = (() => {
    if (!isTab || !nq) return null
    const out = []; const seen = new Set()
    const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
    for (const v of READY) {   // ① 제목·태그·연사 매칭
      const hay = `${v.kr} ${v.jp} ${(v.tags || []).join(' ')} ${v.ev || ''}`.toLowerCase()
      if (hay.includes(nq)) { out.push({ v, byTitle: true, snippets: [], count: 0 }); seen.add(v.id) }
    }
    for (const v of READY) {   // ② 대사(일본어·한국어) 매칭
      const lines = STUDY_DATA[v.id]?.lines; if (!lines) continue
      let entry = null
      for (const ln of lines) {
        const inKr = ln.kr && ln.kr.toLowerCase().includes(nq)
        const inJp = !inKr && ln.jp && ln.jp.toLowerCase().includes(nq)
        if (!inKr && !inJp) continue
        if (!entry) {
          entry = seen.has(v.id) ? out.find(r => r.v.id === v.id) : { v, byTitle: false, snippets: [], count: 0 }
          if (!seen.has(v.id)) { out.push(entry); seen.add(v.id) }
        }
        entry.count++
        if (entry.snippets.length < 2) entry.snippets.push({ text: inKr ? ln.kr : ln.jp, time: fmtT(ln.t) })
      }
    }
    // 제목 매칭 먼저, 그다음 대사 매칭 많은 순
    return out.sort((a, b) => (b.byTitle - a.byTitle) || (b.count - a.count)).slice(0, 30)
  })()
  // 스니펫에서 검색어만 강조
  const Snip = ({ text }) => {
    const i = text.toLowerCase().indexOf(nq)
    if (i < 0) return <>{text}</>
    return <>{text.slice(0, i)}<b style={{ color: 'var(--text-strong,#1f2937)', background: 'rgba(92,169,206,0.18)', borderRadius: 3, padding: '0 1px' }}>{text.slice(i, i + nq.length)}</b>{text.slice(i + nq.length)}</>
  }

  const rowProps = { onOpen: setSel, ratings, onHover, onLeave }

  return (
    <div>
      <style>{`.ted-card{transition:transform .18s ease}@media (hover:hover){.ted-card:hover{transform:scale(1.045)}}@keyframes tjFadeS{from{opacity:0}to{opacity:1}}@keyframes tjUpS{from{transform:translateY(30px);opacity:.6}to{transform:translateY(0);opacity:1}}@keyframes tjPv{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}@keyframes tjMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.tj-marquee-track{animation:tjMarquee 46s linear infinite}@media (hover:hover){.tj-marquee-track:hover{animation-play-state:paused}}`}</style>

      {/* 탭: 헤드카피 + 히어로 + 필터 */}
      {isTab && (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, margin: '2px 2px 14px' }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>쉐도잉</p>
              <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-3,#9aa0a6)', wordBreak: 'keep-all' }}>TED, 영화보다 더 영화 같은 이야기</p>
            </div>
            {/* 필터 드롭다운 (레벨·분량) */}
            <div ref={filterRef} style={{ position: 'relative', flexShrink: 0 }}>
              <button onClick={() => setFilterOpen(o => !o)} aria-label="필터" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, border: `1px solid ${filtering ? 'var(--text-1,#3a4250)' : 'var(--bd,#e0e5e9)'}`, background: filtering ? 'var(--surface,#f1f5f8)' : 'transparent', color: filtering ? 'var(--text-strong,#1f2937)' : 'var(--text-2,#5b6470)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                필터{filtering ? ` · ${filtered.length}` : ''}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {filterOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 60, width: 248, background: 'var(--bg,#fff)', border: '1px solid var(--bd,#e0e5e9)', borderRadius: 14, boxShadow: '0 12px 34px rgba(0,0,0,0.18)', padding: '13px 14px' }}>
                  <p style={{ margin: '0 0 7px', fontSize: 11, fontWeight: 800, color: 'var(--text-3,#9aa0a6)', letterSpacing: '.02em' }}>레벨</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <button onClick={() => setLvF('all')} style={fchip(lvF === 'all')}>전체</button>
                    {LEVELS.map(lv => <button key={lv} onClick={() => setLvF(lv)} style={fchip(lvF === lv)}>{lv}</button>)}
                  </div>
                  <p style={{ margin: '13px 0 7px', fontSize: 11, fontWeight: 800, color: 'var(--text-3,#9aa0a6)', letterSpacing: '.02em' }}>분량</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <button onClick={() => setDurF('all')} style={fchip(durF === 'all')}>전체</button>
                    {DURS.map(d => <button key={d.k} onClick={() => setDurF(d.k)} style={fchip(durF === d.k)}>{d.label}</button>)}
                  </div>
                  {filtering && <button onClick={() => { setLvF('all'); setDurF('all') }} style={{ marginTop: 13, width: '100%', height: 34, borderRadius: 9, border: '1px solid var(--bd,#e0e5e9)', background: 'transparent', color: 'var(--text-2,#5b6470)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>필터 초기화</button>}
                </div>
              )}
            </div>
          </div>
          {/* 영상 검색 — 제목·대사 기반, 글자마다 즉시 결과 */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3,#9aa0a6)" strokeWidth="2.2" strokeLinecap="round" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></svg>
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="영상 검색 — 제목이나 대사 속 단어로"
              style={{ width: '100%', height: 44, padding: '0 40px', fontSize: 14.5, borderRadius: 12, border: '1px solid var(--bd,#e0e5e9)', background: 'var(--surface,#f7f9fb)', color: 'var(--text-1,#3a4250)', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            />
            {q && (
              <button onClick={() => setQ('')} aria-label="검색 지우기" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'transparent', color: 'var(--text-3,#9aa0a6)', fontSize: 17, cursor: 'pointer', lineHeight: 1 }}>×</button>
            )}
          </div>
          {!nq && <>
          <button className="ted-card" onClick={() => setSel(f)} style={{ width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0, marginBottom: 18 }}>
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
          {/* 왜 TED 쉐도잉? — 첫 진입엔 펼침, 이후 접힘(누르면 다시) */}
          <div style={{ marginBottom: 18, border: '1px solid var(--bd,#e0e5e9)', borderRadius: 14, overflow: 'hidden', background: 'var(--surface,#f7f9fb)' }}>
            <button onClick={toggleWhy} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '13px 15px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>왜 TED로 쉐도잉을 해야 할까요?</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3,#9aa0a6)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: whyOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }}><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {whyOpen && (
              <div style={{ padding: '0 15px 16px', display: 'flex', flexDirection: 'column', gap: 13 }}>
                {WHY_TED.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: 'var(--text-strong,#1f2937)', color: 'var(--bg,#fff)', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong,#1f2937)', wordBreak: 'keep-all' }}>{w.t}</p>
                      <p style={{ margin: '3px 0 0', fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-2,#5b6470)', wordBreak: 'keep-all' }}>{w.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          </>}
        </>
      )}

      {/* 검색 결과 (탭, 검색 중) — 제목 매칭 우선 + 대사 매칭(스니펫·타임스탬프) */}
      {searchResults ? (
        <div style={{ marginBottom: 22 }}>
          <p style={{ margin: '0 2px 12px', fontSize: 14.5, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>‘{q.trim()}’ 검색 결과 · {searchResults.length}편{searchResults.length >= 30 ? '+' : ''}</p>
          {searchResults.length === 0
            ? <p style={{ fontSize: 13, color: 'var(--text-3,#9aa0a6)', textAlign: 'center', padding: '24px 0' }}>‘{q.trim()}’이(가) 들어간 영상이 없어요.</p>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {searchResults.map(({ v, snippets, count }) => (
                  <button key={v.id} className="ted-card" onClick={() => setSel(v)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: 'none', padding: 0 }}>
                    <div style={{ position: 'relative', flex: '0 0 128px', width: 128, aspectRatio: '16/9', borderRadius: 9, overflow: 'hidden', background: '#000' }}>
                      <img src={thumb(v.id)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 5, right: 5 }}><LvOnThumb lv={v.lv} /></span>
                      <span style={{ position: 'absolute', bottom: 5, right: 5, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '1px 5px', borderRadius: 4 }}>{v.dur}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--text-1,#3a4250)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.kr}</p>
                      <p style={{ margin: '1px 0 0', fontSize: 11, color: 'var(--text-3,#9aa0a6)', fontFamily: "'Noto Sans JP', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.jp}</p>
                      {snippets.map((s, i) => (
                        <p key={i} style={{ margin: '4px 0 0', fontSize: 12, lineHeight: 1.5, color: 'var(--text-2,#5b6470)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <span style={{ color: 'var(--text-3,#9aa0a6)', fontVariantNumeric: 'tabular-nums' }}>{s.time}</span> · <Snip text={s.text} />
                        </p>
                      ))}
                      {count > 2 && <p style={{ margin: '3px 0 0', fontSize: 11, color: 'var(--text-3,#9aa0a6)' }}>대사 매칭 {count}곳</p>}
                    </div>
                  </button>
                ))}
              </div>}
        </div>
      ) : filtering ? (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 2px 12px' }}>
            <p style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>필터 결과 · {filtered.length}편</p>
            <button onClick={() => { setLvF('all'); setDurF('all') }} style={{ border: 'none', background: 'none', color: 'var(--text-2,#5b6470)', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>초기화</button>
          </div>
          {filtered.length === 0
            ? <p style={{ fontSize: 13, color: 'var(--text-3,#9aa0a6)', textAlign: 'center', padding: '24px 0' }}>조건에 맞는 영상이 없어요. 필터를 바꿔보세요.</p>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                {filtered.map(v => <Card key={v.id} v={v} onOpen={setSel} rating={ratings[v.id]} onHover={onHover} onLeave={onLeave} />)}
              </div>}
        </div>
      ) : (
        <>
          {/* 홈: TOP10 최상단 */}
          {!isTab && <Row title="쉐도잉 인기 TOP 10" items={top10} ranked autoScroll {...rowProps} />}

          {isLoggedIn && watchedV.length > 0 && <Row title={`${userName || '회원'}님이 시청 중인 콘텐츠`} items={watchedV} {...rowProps} />}
          {isLoggedIn && likedV && similar.length > 0 && <Row title={`‘좋아요’한 〈${likedV.kr}〉과 비슷한 콘텐츠`} items={similar} {...rowProps} />}

          {/* 탭: TOP10 (개인화 다음) */}
          {isTab && <Row title="쉐도잉 인기 TOP 10" items={top10} ranked autoScroll {...rowProps} />}

          {/* 주제 카테고리 (홈·탭 공통) */}
          {TAG_GROUPS.map(g => <Row key={g.tag} title={g.label} items={READY.filter(v => v.tags.includes(g.tag))} {...rowProps} />)}
        </>
      )}

      {!isLoggedIn && <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-3,#9aa0a6)', margin: '6px 0 2px' }}>로그인하면 ‘시청 중’·‘좋아요 기반 추천’이 나와요</p>}

      {/* 데스크톱 호버 미리보기 (자동재생 + 정보) */}
      {hover && (() => {
        const { v, rect } = hover
        const vw = window.innerWidth
        const W = Math.min(330, Math.max(rect.width + 56, 300))
        const left = Math.max(8, Math.min(rect.left + rect.width / 2 - W / 2, vw - W - 8))
        const top = Math.max(8, rect.top - 30)
        return (
          <div style={{ position: 'fixed', left, top, width: W, zIndex: 4200, borderRadius: 12, overflow: 'hidden', background: 'var(--bg,#fff)', boxShadow: '0 18px 48px rgba(0,0,0,0.45)', animation: 'tjPv .16s ease' }}
            onMouseEnter={() => clearTimeout(leaveT.current)} onMouseLeave={onLeave}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <iframe title="preview" src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
            </div>
            <div style={{ padding: '11px 13px 13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                <button onClick={() => start(v.id)} aria-label="시작" style={pvCircle(true)}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg></button>
                <button onClick={() => rate(v.id, 'up')} aria-label="좋아요" style={pvCircle(false, ratings[v.id] === 'up')}><Thumb filled={ratings[v.id] === 'up'} size={16} /></button>
                <button onClick={() => toggleVid(v.id)} aria-label="저장" style={pvCircle(false, isVidSaved(v.id))}><Bookmark filled={isVidSaved(v.id)} size={16} /></button>
                <span style={{ flex: 1 }} />
                <button onClick={() => setSel(v)} aria-label="상세" style={pvCircle(false)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg></button>
              </div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>{v.kr}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--text-3,#9aa0a6)', fontFamily: "'Noto Sans JP', sans-serif" }}>{v.jp}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-1,#3a4250)', border: '1px solid var(--bd,#d7dde2)', padding: '1px 7px', borderRadius: 5 }}>{v.lv} · {LV_LABEL[v.lv]}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-3,#9aa0a6)' }}>{v.dur}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-3,#9aa0a6)' }}>· {v.tags.join(' · ')}</span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* 상세 시트 */}
      {sel && (
        <div onClick={() => setSel(null)} style={{ position: 'fixed', inset: 0, zIndex: 4500, background: 'rgba(12,18,24,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'tjFadeS .18s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 460, maxHeight: '86vh', overflowY: 'auto', background: 'var(--bg,#fff)', borderRadius: '22px 22px 0 0', boxShadow: '0 -12px 44px rgba(0,0,0,0.3)', animation: 'tjUpS .3s cubic-bezier(.16,1,.3,1)' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000', borderRadius: '22px 22px 0 0', overflow: 'hidden' }}>
              {/* 앱: 실도메인 프록시(live-embed.html)로 음소거 미리보기 인앱 재생(153 회피). 웹: 직접 임베드 */}
              <iframe title="preview" src={IS_APP ? `https://tickjapan.com/live-embed.html?v=${sel.id}` : `https://www.youtube-nocookie.com/embed/${sel.id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
              <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 11, fontWeight: 800, color: '#fff', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.45)', padding: '2px 9px', borderRadius: 6, pointerEvents: 'none' }}>{sel.lv} · {LV_LABEL[sel.lv]}</span>
              <span style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11.5, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.65)', padding: '2px 8px', borderRadius: 6, pointerEvents: 'none' }}>{sel.dur}</span>
            </div>
            <div style={{ padding: '16px 18px 24px' }}>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-strong,#1f2937)' }}>{sel.kr}</p>
              <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--text-2,#5b6470)', fontFamily: "'Noto Sans JP', sans-serif" }}>{sel.jp}</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--text-3,#9aa0a6)' }}>{sel.ev} · {sel.dur}</p>
              {sel.desc && <p style={{ margin: '11px 0 0', fontSize: 13, lineHeight: 1.62, color: 'var(--text-2,#5b6470)', wordBreak: 'keep-all' }}>{sel.desc}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                {sel.tags.map(t => <span key={t} style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-2,#5b6470)', background: 'var(--surface,#f1f5f8)', border: '1px solid var(--bd,#e6ebef)', padding: '4px 10px', borderRadius: 20 }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button onClick={() => rate(sel.id, 'up')} style={rateBtn(ratings[sel.id] === 'up')}><Thumb filled={ratings[sel.id] === 'up'} /> 좋아요</button>
                <button onClick={() => rate(sel.id, 'down')} style={rateBtn(ratings[sel.id] === 'down')}><Thumb down filled={ratings[sel.id] === 'down'} /> 별로</button>
                <button onClick={() => toggleVid(sel.id)} style={rateBtn(isVidSaved(sel.id))}><Bookmark filled={isVidSaved(sel.id)} size={17} /> {isVidSaved(sel.id) ? '저장됨' : '저장'}</button>
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

function fchip(on) {
  return { padding: '5px 11px', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', border: `1px solid ${on ? 'var(--text-1,#3a4250)' : 'var(--bd,#e0e5e9)'}`, background: on ? 'var(--text-strong,#1f2937)' : 'transparent', color: on ? 'var(--bg,#fff)' : 'var(--text-2,#5b6470)' }
}
function pvCircle(primary, active) {
  return { width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'inherit', border: primary ? 'none' : `1.5px solid ${active ? 'var(--text-1,#3a4250)' : 'var(--bd,#d7dde2)'}`, background: primary ? 'var(--text-strong,#1f2937)' : 'transparent', color: primary ? 'var(--bg,#fff)' : (active ? 'var(--text-strong,#1f2937)' : 'var(--text-2,#5b6470)') }
}
function rateBtn(on) {
  return { flex: 1, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, border: `1px solid ${on ? 'var(--text-2,#5b6470)' : 'var(--bd,#e6ebef)'}`, background: on ? 'var(--surface,#f1f5f8)' : 'transparent', color: on ? 'var(--text-strong,#1f2937)' : 'var(--text-3,#9aa0a6)' }
}
function Bookmark({ filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function Thumb({ down, filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transform: down ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}
