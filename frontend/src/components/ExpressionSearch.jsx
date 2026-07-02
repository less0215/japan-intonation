/* 표현 검색 (YouGlish식) — 한국어/일본어 표현 입력 → 쉐도잉 DB(2만여 대사)에서
 * 그 표현이 실제로 쓰인 장면을 찾아, 미니 쉐도잉 플레이어로 보고/들려준다.
 * ⚠️ P1 프로토타입 — 숨김 라우트(/lab/expression). 웹 전용, 클라이언트 전용(백엔드 무관).
 *   프로덕션 StudyVideoDemo는 건드리지 않고, 같은 부품(RubyText·pronText·YT IFrame·오버레이 자막)만 재사용.
 * 결과뷰 = 영상(오버레이 자막) + 해설(타임라인 자막) + 컨트롤 + 관련 예시 레일.
 * 카라오케: 라인별 타임스탬프만 있어 '라인 단위 스윕'(구간 경과 비율만큼 좌→우 하이라이트)을 일·한 양쪽에 적용. */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import RubyText, { parseFurigana } from './RubyText'
import { pronText } from '../utils/kana.mjs'
import { STUDY_DATA } from '../data/studyData'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'

const PRIMARY = '#5CA9CE'
const thumb = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`
const norm = (s) => (s || '').replace(/\s+/g, '').toLowerCase()
const hasJapanese = (s) => /[぀-ヿ㐀-鿿]/.test(s)
const fmtT = (sec) => { const m = Math.floor(sec / 60), s = Math.floor(sec % 60); return `${m}:${String(s).padStart(2, '0')}` }
const EXAMPLES = ['하려고 해', '할 거야', '하고 싶어', '해 가다', '해야 해', '할지도 몰라', 'ていく', '思う']
const MAX_HITS = 80
const RATES = [0.75, 1, 1.25, 1.5]

const FURIGANA_RE = /([^\s()（）]+?)\(([ぁ-ゖー]+)\)/g
function krPronOf(furiganaHtml) {
  if (!furiganaHtml) return ''
  const plain = furiganaHtml.replace(FURIGANA_RE, '$2')
  return pronText(plain, furiganaHtml)
}

// ── YT IFrame API 로더(웹 전용) ──
let _ytPromise = null
function loadYT() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (_ytPromise) return _ytPromise
  _ytPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT) }
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  })
  return _ytPromise
}

// ── 자막/대사 검색 ──
function buildLineIndex() {
  const out = []
  for (const v of Object.values(STUDY_DATA)) {
    const lines = v.lines || []
    for (let i = 0; i < lines.length; i++) out.push({ videoId: v.videoId, title: v.title, titleKr: v.titleKr, idx: i, t: lines[i].t, jp: lines[i].jp, kr: lines[i].kr })
  }
  return out
}
function matchCandidates(query) {
  const q = norm(query)
  if (!q) return []
  if (hasJapanese(query)) return EXPRESSION_SIGNATURES.filter((s) => s.jpRe.test(query))
  return EXPRESSION_SIGNATURES.filter((s) => s.ko.some((a) => { const na = norm(a); return na.includes(q) || q.includes(na) }))
}
// 매칭 부분 위치(하이라이트용) — 평문 jp 기준 [start,end)
function matchSpan(jp, matcher) {
  if (matcher.jpRe) { const m = jp.match(matcher.jpRe); if (m) return [m.index, m.index + m[0].length] }
  else if (matcher.raw) { const i = jp.indexOf(matcher.raw); if (i >= 0) return [i, i + matcher.raw.length] }
  return null
}

// ── 매칭 표현을 굵게 ──
// furigana_html엔 (요미)가 끼어 평문 jp 인덱스와 어긋남 → parseFurigana로 파트를 얻고,
// 각 파트의 '평문 길이'(ruby=한자, plain=텍스트)로 오프셋을 재구성해 매칭 span과 겹치는 파트만 강조.
// (예: 思(おも)う 는 [ruby 思/おも][plain う] → 평문 "思う"와 오프셋 일치 → "思う" 정확 강조)
function EmphFurigana({ furiganaHtml, jp, matcher, fontSize }) {
  const span = matchSpan(jp, matcher)
  const parts = parseFurigana(furiganaHtml)
  const rtSize = Math.max(9, Math.round(fontSize * 0.72))
  const HL = { background: `${PRIMARY}30`, borderRadius: 3, boxShadow: `inset 0 -2px 0 ${PRIMARY}`, fontWeight: 700 }
  const inSpan = (a, b) => span && b > span[0] && a < span[1]
  let pos = 0
  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight: 500, lineHeight: 1.8 }}>
      {parts.map((p, i) => {
        if (p.type === 'ruby') {
          const s = pos, e = pos + p.kanji.length; pos = e
          const hl = inSpan(s, e) ? HL : undefined  // 한자는 통째로(요미 분리 불가)
          return <span key={i} style={hl}>{p.kanji}<span style={{ fontSize: rtSize, color: 'var(--text-3)', fontWeight: 400 }}>({p.reading})</span></span>
        }
        // 평문: span 경계에서 잘라 매칭 글자만 강조
        const t = p.text, s = pos; pos += t.length
        if (!span) return <span key={i}>{t}</span>
        const a = Math.max(0, span[0] - s), b = Math.min(t.length, span[1] - s)
        if (a >= b) return <span key={i}>{t}</span>   // 겹침 없음
        return <span key={i}>{t.slice(0, a)}<span style={HL}>{t.slice(a, b)}</span>{t.slice(b)}</span>
      })}
    </span>
  )
}

export default function ExpressionSearch() {
  const allLines = useMemo(buildLineIndex, [])
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState('idle')      // idle | disambig | results | empty
  const [candidates, setCandidates] = useState([])
  const [matcher, setMatcher] = useState(null)
  const [groups, setGroups] = useState([])         // [{videoId,title,titleKr,hits:[{idx,t,jp,kr}]}]
  const [totalHits, setTotalHits] = useState(0)

  // 플레이어 상태
  const [activeVid, setActiveVid] = useState(null)
  const [activeIdx, setActiveIdx] = useState(-1)   // 현재 재생 중인 대사(오버레이·카라오케용)
  const [selectedIdx, setSelectedIdx] = useState(-1) // 지금 보여주는 '매칭 문장'(화면과 기능 사이)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rateIdx, setRateIdx] = useState(1)
  const [hideJp, setHideJp] = useState(false)
  const [hideKr, setHideKr] = useState(false)
  const [capMode, setCapMode] = useState('both')   // both | jp | kr | off

  const playerRef = useRef(null)
  const hostRef = useRef(null)         // YT가 이 안의 자식 노드를 자기 iframe으로 교체(React는 이 div만 소유 → 충돌 방지)
  const createdRef = useRef(false)     // 플레이어 1회 생성 가드
  const loadedVidRef = useRef(null)    // 현재 플레이어에 로드된 영상
  const activeVidRef = useRef(null)    // tick(1회 생성)이 최신 activeVid를 읽도록
  const activeRef = useRef(-1)
  const occurrencesRef = useRef([])  // 표현이 나오는 장면들의 평면 재생목록 [{vid,idx,t}]
  const playIdxRef = useRef(0)       // 이어재생 중인 장면 인덱스
  const jpFillRef = useRef(null)   // 오버레이 일본어 스윕
  const krFillRef = useRef(null)   // 오버레이 한국어 스윕
  const lineFillRef = useRef(null) // 문장 카라오케 스윕
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 900 : false)
  useEffect(() => { const f = () => setIsWide(window.innerWidth >= 900); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])

  const activeData = activeVid ? STUDY_DATA[activeVid] : null
  const lines = activeData?.lines || []
  const cur = activeIdx >= 0 ? lines[activeIdx] : null

  // ── 검색 ──
  const runSearch = (m) => {
    const test = m.jpRe ? (jp) => m.jpRe.test(jp) : (jp) => jp.includes(m.raw)
    const byVid = new Map()
    let total = 0
    for (const l of allLines) {
      if (!test(l.jp)) continue
      total++
      if (total > MAX_HITS) break
      if (!byVid.has(l.videoId)) byVid.set(l.videoId, { videoId: l.videoId, title: l.title, titleKr: l.titleKr, hits: [] })
      byVid.get(l.videoId).hits.push({ idx: l.idx, t: l.t, jp: l.jp, kr: l.kr })
    }
    const grouped = [...byVid.values()].sort((a, b) => b.hits.length - a.hits.length)
    // 이어재생용 평면 재생목록(영상별 그룹 순 → 그룹 내 시간순)
    occurrencesRef.current = grouped.flatMap((g) => g.hits.map((h) => ({ vid: g.videoId, idx: h.idx, t: h.t })))
    playIdxRef.current = 0
    setMatcher(m); setGroups(grouped); setTotalHits(total)
    if (grouped.length) {
      const first = grouped[0]
      openAt(first.videoId, first.hits[0].idx)
      setStage('results')
    } else setStage('empty')
  }
  const onSearch = (raw) => {
    const q = (raw ?? query).trim(); setQuery(q)
    if (!q) return
    const cands = matchCandidates(q)
    if (cands.length > 1) { setCandidates(cands); setStage('disambig'); return }
    if (cands.length === 1) { runSearch(cands[0]); return }
    if (hasJapanese(q)) runSearch({ raw: q, label: `"${q}"`, note: '입력한 일본어가 그대로 나오는 대사' })
    else setStage('empty')
  }

  // ── 영상 열기 + 특정 대사로 점프 ──
  const seekLine = (i) => {
    const p = playerRef.current, ls = STUDY_DATA[activeVidRef.current]?.lines || []
    if (!p || !p.seekTo || i < 0 || i >= ls.length) return
    p.seekTo(Math.max(0, ls[i].t - 0.12), true); if (p.playVideo) p.playVideo()
    activeRef.current = i; setActiveIdx(i)
  }
  const openAt = (vid, idx) => {
    const pi = occurrencesRef.current.findIndex((o) => o.vid === vid && o.idx === idx)
    if (pi >= 0) playIdxRef.current = pi                           // 이어재생 위치를 클릭한 장면으로
    setSelectedIdx(idx)                                            // 화면과 기능 사이에 보여줄 '매칭 문장'
    if (vid === activeVid) { seekLine(idx); return }
    activeRef.current = idx; setActiveIdx(idx); setActiveVid(vid)   // 영상 전환은 아래 [activeVid] 효과가 loadVideoById로 처리
  }

  // ── 플레이어 생성(1회, 결과 진입 시). 영상 전환은 loadVideoById로만(언마운트 없음 → React↔YT 충돌 회피) ──
  useEffect(() => {
    if (stage !== 'results' || createdRef.current) return
    createdRef.current = true
    let timer, cancelled = false
    const tick = () => {
      const p = playerRef.current; if (!p || !p.getCurrentTime) return
      let t; try { t = p.getCurrentTime() } catch { return }
      const ls = STUDY_DATA[activeVidRef.current]?.lines || []
      // ── 표현만 이어재생: 현재 매칭 장면이 끝나면 사이 구간을 건너뛰고 다음 매칭 장면으로 점프 ──
      const occ = occurrencesRef.current[playIdxRef.current]
      if (occ && occ.vid === activeVidRef.current) {
        const endT = ls[occ.idx + 1] ? ls[occ.idx + 1].t : (ls[occ.idx]?.t ?? 0) + 6
        if (t >= endT - 0.12) {
          playIdxRef.current += 1
          const next = occurrencesRef.current[playIdxRef.current]
          if (next) {
            activeRef.current = next.idx; setSelectedIdx(next.idx); setActiveIdx(next.idx)
            if (next.vid === activeVidRef.current) { try { p.seekTo(Math.max(0, next.t - 0.12), true); p.playVideo?.() } catch {} }
            else setActiveVid(next.vid)   // [activeVid] 효과가 loadVideoById(startSeconds)로 그 지점부터 재생
          } else { try { p.pauseVideo() } catch {} }
          return   // 이번 틱은 점프 처리만(사이 줄이 잠깐 보이는 깜빡임 방지)
        }
      }
      let idx = -1
      for (let i = 0; i < ls.length; i++) { if (ls[i].t <= t + 0.12) idx = i; else break }
      if (idx !== activeRef.current) { activeRef.current = idx; setActiveIdx(idx) }
      if (idx >= 0) {
        const start = ls[idx].t, end = ls[idx + 1] ? ls[idx + 1].t : start + 4
        const prog = Math.max(0, Math.min(1, (t - start) / Math.max(0.4, end - start)))
        const w = `${(prog * 100).toFixed(1)}%`
        if (jpFillRef.current) jpFillRef.current.style.width = w
        if (krFillRef.current) krFillRef.current.style.width = w
        if (lineFillRef.current) lineFillRef.current.style.width = w
      }
    }
    loadYT().then((YT) => {
      if (cancelled || !YT || !hostRef.current) return
      const el = document.createElement('div'); hostRef.current.appendChild(el)
      const vid0 = activeVidRef.current
      const start0 = activeRef.current >= 0 ? (STUDY_DATA[vid0]?.lines[activeRef.current]?.t ?? 0) : 0
      loadedVidRef.current = vid0
      playerRef.current = new YT.Player(el, {
        videoId: vid0,
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1, cc_load_policy: 0, start: Math.max(0, Math.floor(start0)), origin: typeof window !== 'undefined' ? window.location.origin : '' },
        events: { onStateChange: (e) => setIsPlaying(e.data === 1), onReady: () => { timer = setInterval(tick, 120) } },
      })
    })
    return () => { cancelled = true; if (timer) clearInterval(timer); try { playerRef.current?.destroy?.() } catch {} playerRef.current = null; createdRef.current = false }
  }, [stage])

  // ── 영상 전환 — 언마운트 없이 loadVideoById(매칭 대사 지점부터) ──
  useEffect(() => {
    activeVidRef.current = activeVid
    const p = playerRef.current
    if (!p || !p.loadVideoById || !activeVid || loadedVidRef.current === activeVid) return
    loadedVidRef.current = activeVid
    const idx = activeRef.current >= 0 ? activeRef.current : 0
    const t = STUDY_DATA[activeVid]?.lines[idx]?.t ?? 0
    p.loadVideoById({ videoId: activeVid, startSeconds: Math.max(0, t - 0.12) })
  }, [activeVid])
  // (자막 리스트 자동 스크롤 제거 — 영상이 화면 밖으로 밀리는 문제 방지. 상단 sticky로 영상 항상 노출)

  // 컨트롤
  const togglePlay = () => { const p = playerRef.current; if (!p) return; if (p.getPlayerState && p.getPlayerState() === 1) p.pauseVideo(); else p.playVideo?.() }
  const goPrev = () => seekLine(Math.max(0, (activeRef.current < 0 ? 0 : activeRef.current) - 1))
  const goNext = () => seekLine(Math.min(lines.length - 1, (activeRef.current < 0 ? -1 : activeRef.current) + 1))
  const replay = () => seekLine(activeRef.current < 0 ? 0 : activeRef.current)
  const cycleRate = () => setRateIdx((prev) => { const n = (prev + 1) % RATES.length; playerRef.current?.setPlaybackRate?.(RATES[n]); return n })
  const CAP_ORDER = ['both', 'jp', 'kr', 'off']; const CAP_LABEL = { both: '일+한', jp: '일본어', kr: '한국어', off: '끔' }

  const blur = (on) => ({ filter: on ? 'blur(6px)' : 'none', userSelect: on ? 'none' : 'auto', transition: 'filter .15s' })
  const chip = (on) => ({ display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 11px', borderRadius: 10, border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? `${PRIMARY}1a` : 'var(--surface)', color: on ? PRIMARY : 'var(--text-2)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' })

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '18px 14px 60px', color: 'var(--text-1)' }}>
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>표현 검색 (내부 프로토타입) | 틱재팬</title></Helmet>

      <div><span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: PRIMARY, padding: '2px 8px', borderRadius: 6 }}>내부 프로토타입 · 비공개</span></div>
      <h1 style={{ fontSize: 21, fontWeight: 800, margin: '8px 0 4px', color: 'var(--text-strong)' }}>표현 검색</h1>
      <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>
        한국어("하려고 해") 또는 일본어("ていく")를 입력하면, 쉐도잉 영상 속 실제 사용 장면을 찾아 줘요. 같은 표현이 맥락·억양에 따라 어떻게 다른지 보고 들어 보세요.
      </p>

      {/* 검색바 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onSearch() }}
          placeholder="표현 입력 (예: 하려고 해 / ていく)"
          style={{ flex: 1, padding: '11px 14px', fontSize: 15, borderRadius: 10, border: '1px solid var(--bd-2)', background: 'var(--surface)', color: 'var(--text-1)', fontFamily: 'inherit', outline: 'none' }} />
        <button onClick={() => onSearch()} style={{ padding: '0 20px', fontSize: 15, fontWeight: 700, borderRadius: 10, border: 'none', background: PRIMARY, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>검색</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {EXAMPLES.map((ex) => <button key={ex} onClick={() => onSearch(ex)} style={{ fontSize: 12.5, padding: '5px 11px', borderRadius: 999, border: '1px solid var(--bd)', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'inherit' }}>{ex}</button>)}
      </div>

      {/* 선택칩 */}
      {stage === 'disambig' && (
        <div style={{ background: 'var(--primary-tint)', border: '1px solid var(--primary-tint-bd)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 10px', fontSize: 13.5, fontWeight: 700 }}>"{query}"은(는) 여러 표현으로 쓰여요. 어떤 걸 찾을까요?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {candidates.map((s) => (
              <button key={s.id} onClick={() => runSearch(s)} style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{s.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 8 }}>{s.reading}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-2)', marginTop: 3 }}>{s.note}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'empty' && <p style={{ fontSize: 14, color: 'var(--text-2)', padding: '20px 0' }}>"{query}"에 대한 예시를 못 찾았어요. 예시 칩을 눌러 보세요.</p>}

      {stage === 'results' && activeData && (() => {
        const sel = selectedIdx >= 0 ? lines[selectedIdx] : cur
        return (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{matcher.label}</span>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{groups.length}개 영상 · {totalHits}{totalHits >= MAX_HITS ? '+' : ''}개 예시</span>
            {matcher.note && <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>· 💡 {matcher.note}</span>}
          </div>

          {/* 넓은 화면=2단(좌 영상+문장+기능 / 우 관련 예시=쉐도잉 스크립트 위치), 좁은 화면=세로 스택 */}
          <div style={isWide ? { display: 'flex', gap: 28, alignItems: 'flex-start' } : undefined}>
          {/* 좌: 화면 → 문장 → 기능 (sticky로 항상 노출) */}
          <div style={isWide ? { flex: '1.4 1 0', minWidth: 0 } : undefined}>
          <div style={{ position: 'sticky', top: isWide ? 14 : 0, zIndex: 5, background: 'var(--bg)', paddingBottom: 12, ...(isWide ? {} : { maxWidth: 640, margin: '0 auto' }) }}>
            {/* 화면 + 오버레이 자막 */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
              {/* YT.Player가 이 div 안의 자식 노드를 자기 iframe으로 교체 — React는 이 div만 소유(리마운트/충돌 없음) */}
              <div ref={hostRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              {capMode !== 'off' && cur && (
                <div style={{ position: 'absolute', left: '50%', bottom: '7%', transform: 'translateX(-50%)', maxWidth: '96%', width: 'max-content', padding: '8px 16px', borderRadius: 12, textAlign: 'center', background: 'rgba(0,0,0,0.66)', backdropFilter: 'blur(3px)', color: '#fff', pointerEvents: 'none' }}>
                  {(capMode === 'both' || capMode === 'jp') && !hideJp && (
                    <div style={{ position: 'relative', lineHeight: 1.45, display: 'inline-block' }}>
                      <div style={{ opacity: 0.5 }}><RubyText text={cur.furigana_html} fontSize={16} /></div>
                      <div ref={jpFillRef} style={{ position: 'absolute', inset: 0, width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', color: '#fff' }}><RubyText text={cur.furigana_html} fontSize={16} /></div>
                    </div>
                  )}
                  {(capMode === 'both' || capMode === 'jp') && !hideJp && <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'rgba(255,255,255,0.6)' }}>{krPronOf(cur.furigana_html)}</p>}
                  {(capMode === 'both' || capMode === 'kr') && !hideKr && (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: 3 }}>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, opacity: 0.5 }}>{cur.kr}</p>
                      <p ref={krFillRef} style={{ position: 'absolute', inset: 0, margin: 0, width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: 13, lineHeight: 1.4, color: '#fff' }}>{cur.kr}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 문장 — 지금 보고 있는 '이 표현이 든 문장'만(한자=후리가나). 화면과 기능 사이 */}
            {sel && (
              <div style={{ margin: '10px 0 0', padding: '12px 14px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
                <div style={{ fontSize: 11, color: PRIMARY, fontWeight: 700, marginBottom: 5 }}>{fmtT(sel.t)} · {activeData.titleKr || activeData.title}</div>
                <div style={{ position: 'relative', display: 'inline-block', ...blur(hideJp) }}>
                  <EmphFurigana furiganaHtml={sel.furigana_html} jp={sel.jp} matcher={matcher} fontSize={19} />
                  {activeIdx === selectedIdx && <div ref={lineFillRef} style={{ position: 'absolute', left: 0, bottom: -2, height: 2, width: '0%', background: PRIMARY, borderRadius: 2 }} />}
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-2)', ...blur(hideKr) }}>{sel.kr}</p>
              </div>
            )}

            {/* 기능 */}
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {[['이전', goPrev], ['다시', replay], [isPlaying ? '정지' : '재생', togglePlay], ['다음', goNext]].map(([lb, fn], i) => (
                <button key={i} onClick={fn} style={{ flex: 1, height: 44, borderRadius: 11, border: 'none', background: lb === '재생' || lb === '정지' ? PRIMARY : 'var(--surface-2)', color: lb === '재생' || lb === '정지' ? '#fff' : 'var(--text-1)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{lb}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 6px 0 10px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-3)' }}>가리기</span>
                <button onClick={() => setHideJp((v) => !v)} style={chip(hideJp)}>일</button>
                <button onClick={() => setHideKr((v) => !v)} style={chip(hideKr)}>한</button>
              </span>
              <button onClick={() => setCapMode((m) => CAP_ORDER[(CAP_ORDER.indexOf(m) + 1) % 4])} style={chip(capMode !== 'off')} title="영상 위 자막">자막 {CAP_LABEL[capMode]}</button>
              <span style={{ flex: 1 }} />
              <button onClick={cycleRate} style={chip(rateIdx !== 1)}>{RATES[rateIdx]}×</button>
            </div>
          </div>

          </div>{/* 좌 컬럼 끝 */}

          {/* 우: 관련 예시 — 쉐도잉 스크립트 위치(넓은 화면=우측, 좁은 화면=아래). 이 표현이 든 문장만 나열 */}
          <div style={isWide ? { flex: '1 1 0', minWidth: 300, maxWidth: 520 } : { maxWidth: 640, margin: '18px auto 0' }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 4px' }}>이 표현이 나오는 다른 장면 · {totalHits}{totalHits >= MAX_HITS ? '+' : ''}개</p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 12px' }}>재생하면 이 장면들만 순서대로 이어서 재생돼요.</p>
            {groups.map((g) => (
              <div key={g.videoId} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 6px' }}>
                  <img src={thumb(g.videoId)} alt="" loading="lazy" style={{ width: 64, aspectRatio: '16/9', objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: g.videoId === activeVid ? PRIMARY : 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.titleKr || g.title}<span style={{ color: 'var(--text-3)', fontWeight: 400 }}> · {g.hits.length}개</span></span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 8, borderLeft: '2px solid var(--bd)' }}>
                  {g.hits.map((h) => {
                    const on = g.videoId === activeVid && h.idx === selectedIdx
                    return (
                      <button key={h.idx} onClick={() => openAt(g.videoId, h.idx)}
                        style={{ display: 'flex', gap: 10, alignItems: 'baseline', textAlign: 'left', padding: '8px 10px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: on ? `${PRIMARY}14` : 'transparent', boxShadow: on ? `inset 3px 0 0 ${PRIMARY}` : 'none' }}>
                        <span style={{ fontSize: 11, color: on ? PRIMARY : 'var(--text-3)', fontVariantNumeric: 'tabular-nums', flexShrink: 0, fontWeight: on ? 700 : 400 }}>{fmtT(h.t)}</span>
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: 14, color: 'var(--text-1)', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.5 }}>
                            <EmphFurigana furiganaHtml={STUDY_DATA[g.videoId].lines[h.idx].furigana_html} jp={h.jp} matcher={matcher} fontSize={14} />
                          </span>
                          <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{h.kr}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>{/* 우 컬럼 끝 */}
          </div>{/* 2단 래퍼 끝 */}
        </>
        )
      })()}
    </div>
  )
}
