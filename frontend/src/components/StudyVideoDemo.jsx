/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 반응형: PC=2단(좌 영상 고정 + 우 스크립트), 모바일=세로 스택(영상 상단 고정).
 * 영상 위 자막 오버레이 + 현재 줄 하이라이트·자동 스크롤. 시드=studyDemo.js.
 * 쉐도잉 단축키 + 컨트롤. 일/한 가리기, 단어 칩(JLPT), 단어 시트.
 * 문장 클릭 → 시트: 문장 분해는 '보기' 버튼으로 수동 실행(/breakdown 캐시, 문장당 최초 1회만 비용).
 * 요약 펼치기 + 영상 난이도(JLPT 집계) + 단어장. 첫 사용 가이드(스포트라이트+프로그래스).
 * UI 톤: 토스풍. 저장=localStorage(프로토타입). */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RubyText from './RubyText'
import { BreakdownTable, BreakdownCards } from './BreakdownPanel'
import { STUDY_DEMO } from '../data/studyDemo'
import { STUDY_DATA } from '../data/studyData'

const PRIMARY = '#5CA9CE'
const IS_APP = typeof window !== 'undefined' && (window.Capacitor?.isNativePlatform?.() ?? false)
const STICKY_TOP = IS_APP ? 'max(env(safe-area-inset-top, 0px), 56px)' : 0   // 앱: 상태바(노치/다이내믹아일랜드) 아래로
const GREEN = '#1D9E75'
const API_URL = 'https://japan-intonation-production.up.railway.app'
const RATES = [0.5, 0.75, 1, 1.25, 1.5]
const SHOW_KEYS = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false

const ORDER = ['N5', 'N4', 'N3', 'N2', 'N1']
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
// JLPT는 참고용 — 칩/배지는 중립(흑백), 분량 바만 회색 램프(밝음=쉬움→어두움=어려움)로 구분
const BARGREY = { N5: '#c4cbd1', N4: '#9aa3ac', N3: '#727c86', N2: '#525b64', N1: '#363d45' }
const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const jcolor = (lv) => JLPT[lv] || '#9aa5b1'
const hasKanji = (s) => /[一-鿿々〆]/.test(s || '')

const LS_LINES = 'tickjapan_study_saved_lines'
const LS_WORDS = 'tickjapan_study_saved_words'
const LS_VIDS = 'tickjapan_study_saved_videos'
const LS_RATE = 'tickjapan_study_ratings'
const LS_TOUR_OFF = 'tickjapan_study_tour_off'   // 사용자가 '다시 보지 않기' 누른 경우만 set
const lsLoad = (k) => { try { return JSON.parse(localStorage.getItem(k) || '[]') } catch { return [] } }
const lsSave = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

let _ytPromise = null
function loadYT() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (_ytPromise) return _ytPromise
  _ytPromise = new Promise(resolve => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT) }
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(s)
  })
  return _ytPromise
}
function fmtT(s) { const m = Math.floor(s / 60), ss = Math.floor(s % 60); return `${m}:${String(ss).padStart(2, '0')}` }

// 재생 컨트롤 — 블랙앤화이트 라인 아이콘 (currentColor)
function Ico({ name, size = 19 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'prev': return <svg {...p}><polygon points="18 6 18 18 9.5 12" /><line x1="6.5" y1="6" x2="6.5" y2="18" /></svg>
    case 'next': return <svg {...p}><polygon points="6 6 6 18 14.5 12" /><line x1="17.5" y1="6" x2="17.5" y2="18" /></svg>
    case 'play': return <svg {...p}><polygon points="7 5 19 12 7 19" /></svg>
    case 'pause': return <svg {...p}><line x1="9" y1="5" x2="9" y2="19" /><line x1="15" y1="5" x2="15" y2="19" /></svg>
    case 'replay': return <svg {...p}><polyline points="3 4 3 9 8 9" /><path d="M4.2 14a8 8 0 1 0 1.1-7.2L3 9" /></svg>
    case 'loop': return <svg {...p}><polyline points="17 2 21 6 17 10" /><path d="M3 11.5V10a4 4 0 0 1 4-4h14" /><polyline points="7 22 3 18 7 14" /><path d="M21 12.5V14a4 4 0 0 1-4 4H3" /></svg>
    default: return null
  }
}

function Furi({ w, reading, size = 16 }) {
  const f = { fontFamily: "'Noto Sans JP', sans-serif", fontSize: size }
  if (hasKanji(w) && reading && reading !== w)
    return <ruby style={f}>{w}<rt style={{ fontSize: size * 0.52, color: 'var(--text-3)' }}>{reading}</rt></ruby>
  return <span style={f}>{w}</span>
}
function Bookmark({ filled, color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const PREVIEW_LIMIT = 60  // 비회원·무료회원 미리보기 1분 (플러스↑ 무제한)
export default function StudyVideoDemo({ isPlus = false }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [gated, setGated] = useState(false)
  const isPlusRef = useRef(isPlus)
  useEffect(() => { isPlusRef.current = isPlus }, [isPlus])
  const vParam = searchParams.get('v')
  const data = (vParam && STUDY_DATA[vParam]) || STUDY_DEMO
  const vid = data.videoId
  const lines = data.lines
  const playerRef = useRef(null)
  const lineRefs = useRef([])
  const headRef = useRef(null)
  const activeRef = useRef(-1)
  const loopRef = useRef(-1)
  const detailRef = useRef(null)
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 900 : false)
  const [expanded, setExpanded] = useState(false)   // 확대(유사 전체화면) 모드 — 자막은 영상 아래(ToS 안전)
  const [isLandscape, setIsLandscape] = useState(typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [loopIdx, setLoopIdx] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rateIdx, setRateIdx] = useState(2)
  const [hideKr, setHideKr] = useState(false)
  const [hideJp, setHideJp] = useState(false)
  const [capMode, setCapMode] = useState('both')   // 영상 오버레이 자막: both | jp | kr | off
  const CAP_ORDER = ['both', 'jp', 'kr', 'off']
  const CAP_LABEL = { both: '일+한', jp: '일본어', kr: '한국어', off: '끔' }
  const cycleCap = () => setCapMode(m => CAP_ORDER[(CAP_ORDER.indexOf(m) + 1) % CAP_ORDER.length])
  const [showWords, setShowWords] = useState(true)
  const [headH, setHeadH] = useState(0)
  const [openSummary, setOpenSummary] = useState(false)
  const [openVocab, setOpenVocab] = useState(false)
  const [savedLines, setSavedLines] = useState(() => lsLoad(LS_LINES))
  const [savedWords, setSavedWords] = useState(() => lsLoad(LS_WORDS))
  const [savedVids, setSavedVids] = useState(() => lsLoad(LS_VIDS))
  const [panel, setPanel] = useState(null)
  const [popWord, setPopWord] = useState(null)
  const [detailIdx, setDetailIdx] = useState(null)
  const [tour, setTour] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [ratings, setRatings] = useState(() => { try { return JSON.parse(localStorage.getItem(LS_RATE) || '{}') } catch { return {} } })

  useEffect(() => { const f = () => { setIsWide(window.innerWidth >= 900); setIsLandscape(window.innerWidth > window.innerHeight) }; window.addEventListener('resize', f); window.addEventListener('orientationchange', f); return () => { window.removeEventListener('resize', f); window.removeEventListener('orientationchange', f) } }, [])
  // 확대 모드에서 뒤로가기(제스처/버튼)면 확대 해제
  useEffect(() => { if (!expanded) return; const onPop = () => setExpanded(false); window.history.pushState({ exp: 1 }, ''); window.addEventListener('popstate', onPop); return () => { window.removeEventListener('popstate', onPop); if (window.history.state?.exp) window.history.back() } }, [expanded])
  // 1분 게이트는 확대 모드 위에 안 보이므로, 게이트가 뜨면 확대 해제
  useEffect(() => { if (gated) setExpanded(false) }, [gated])
  // 확대 모드 동안 하단 네비/배너 숨김(몰입형) + 배경 스크롤 잠금
  useEffect(() => { document.body.classList.toggle('study-expanded', expanded); return () => document.body.classList.remove('study-expanded') }, [expanded])
  useEffect(() => lsSave(LS_LINES, savedLines), [savedLines])
  useEffect(() => lsSave(LS_WORDS, savedWords), [savedWords])
  useEffect(() => lsSave(LS_VIDS, savedVids), [savedVids])
  const vidSaved = savedVids.includes(vid)
  const toggleSaveVid = () => setSavedVids(prev => prev.includes(vid) ? prev.filter(x => x !== vid) : [vid, ...prev])
  useEffect(() => { try { localStorage.setItem(LS_RATE, JSON.stringify(ratings)) } catch {} }, [ratings])
  const rating = ratings[vid]
  const rateVid = (v) => setRatings(prev => ({ ...prev, [vid]: prev[vid] === v ? undefined : v }))
  // 사용법 가이드: '다시 보지 않기'를 누르지 않는 한 진입 때마다 자동 표시
  useEffect(() => { try { if (!localStorage.getItem(LS_TOUR_OFF)) { const id = setTimeout(() => setTour(true), 600); return () => clearTimeout(id) } } catch {} }, [])
  const startTour = () => { window.scrollTo({ top: 0 }); setTour(true) }
  const closeTour = (dontShowAgain) => { setTour(false); if (dontShowAgain) { try { localStorage.setItem(LS_TOUR_OFF, '1') } catch {} } }

  const stat = useMemo(() => {
    const counts = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 }
    let total = 0
    for (const ln of lines) for (const w of (ln.words || [])) if (counts[w.jlpt] != null) { counts[w.jlpt]++; total++ }
    let cum = 0, overall = 'N1', covPct = 100
    for (const lv of ORDER) { cum += counts[lv]; if (total && cum / total >= 0.8) { overall = lv; covPct = Math.round(cum / total * 100); break } }
    return { counts, total, overall, covPct }
  }, [])

  const vocab = useMemo(() => {
    const map = new Map()
    lines.forEach((ln, i) => {
      if (!isPlus && ln.t >= PREVIEW_LIMIT) return   // 무료: 1분 이후 단어는 미집계
      ;(ln.words || []).forEach(w => { const k = `${w.w}|${w.reading}`; if (!map.has(k)) map.set(k, { ...w, lineIdx: i }) })
    })
    const all = [...map.values()]
    const byLevel = {}; ORDER.forEach(lv => { byLevel[lv] = all.filter(w => w.jlpt === lv) })
    return { all, byLevel, count: all.length }
  }, [isPlus])

  // ── 플레이어 제어 ─────────────────────────────────
  const seekLine = (i) => {
    const p = playerRef.current
    if (!p || !p.seekTo || i < 0 || i >= lines.length) return
    if (!isPlus && lines[i].t >= PREVIEW_LIMIT) { setGated(true); return }
    p.seekTo(Math.max(0, lines[i].t - 0.15), true)
    if (p.playVideo) p.playVideo()
    activeRef.current = i; setActiveIdx(i)
    if (loopRef.current >= 0) { loopRef.current = i; setLoopIdx(i) }
  }
  const goPrev = () => seekLine(Math.max(0, (activeRef.current < 0 ? 0 : activeRef.current) - 1))
  const goNext = () => seekLine(Math.min(lines.length - 1, (activeRef.current < 0 ? -1 : activeRef.current) + 1))
  const replay = () => seekLine(activeRef.current < 0 ? 0 : activeRef.current)
  // 영상 맨 처음으로 되돌아가기 (반복 해제 + 스크립트 상단으로)
  const goStart = () => {
    const p = playerRef.current
    if (p && p.seekTo) { p.seekTo(0, true); if (p.playVideo) p.playVideo() }
    if (loopRef.current >= 0) { loopRef.current = -1; setLoopIdx(-1) }
    activeRef.current = -1; setActiveIdx(-1)
    lineRefs.current[0]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  const togglePlay = () => {
    const p = playerRef.current; if (!p || !p.getPlayerState) return
    if (p.getPlayerState() === 1) { p.pauseVideo(); return }
    if (!isPlus) { let t = 0; try { t = p.getCurrentTime() } catch {}; if (t >= PREVIEW_LIMIT) { setGated(true); return } }
    p.playVideo()
  }
  const toggleLoop = () => {
    if (loopRef.current >= 0) { loopRef.current = -1; setLoopIdx(-1) }
    else { const i = activeRef.current < 0 ? 0 : activeRef.current; loopRef.current = i; setLoopIdx(i); seekLine(i) }
  }
  const loopThisLine = (i) => {
    if (loopRef.current === i) { loopRef.current = -1; setLoopIdx(-1) }
    else { loopRef.current = i; setLoopIdx(i); seekLine(i) }
  }
  const detailGo = (delta) => {
    const i = detailRef.current; if (i == null) return
    const ni = Math.min(lines.length - 1, Math.max(0, i + delta))
    setDetailIdx(ni); seekLine(ni)
  }
  const stepRate = (dir) => setRateIdx(prev => { const n = Math.min(RATES.length - 1, Math.max(0, prev + dir)); const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[n]); return n })
  const cycleRate = () => setRateIdx(prev => { const n = (prev + 1) % RATES.length; const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[n]); return n })

  // ── 저장 ──────────────────────────────────────────
  const isLineSaved = (i) => savedLines.some(s => s.vid === vid && s.idx === i)
  const toggleSaveLine = (i) => setSavedLines(prev => {
    if (prev.some(s => s.vid === vid && s.idx === i)) return prev.filter(s => !(s.vid === vid && s.idx === i))
    const ln = lines[i]
    return [...prev, { vid, idx: i, t: ln.t, jp: ln.jp, furigana_html: ln.furigana_html, kr: ln.kr }]
  })
  const wkey = (w) => `${w.w}|${w.reading}`
  const isWordSaved = (w) => savedWords.some(s => wkey(s) === wkey(w))
  const toggleSaveWord = (w) => setSavedWords(prev => prev.some(s => wkey(s) === wkey(w))
    ? prev.filter(s => wkey(s) !== wkey(w))
    : [...prev, { w: w.w, reading: w.reading, ko: w.ko, jlpt: w.jlpt }])

  // ── 플레이어 init + 폴링 ──────────────────────────
  useEffect(() => {
    let timer, cancelled = false, started = false
    // 매 틱: 현재시간(t)으로 1분 게이트·활성 문장·반복 처리 (web/app 공용)
    const tick = () => {
      const p = playerRef.current
      if (!p || !p.getCurrentTime) return
      let t; try { t = p.getCurrentTime() } catch { return }
      if (!isPlusRef.current && t >= PREVIEW_LIMIT && p.getPlayerState && p.getPlayerState() === 1) { try { p.pauseVideo() } catch {}; setGated(true) }
      let idx = -1
      for (let i = 0; i < lines.length; i++) { if (lines[i].t <= t + 0.15) idx = i; else break }
      const li = loopRef.current
      if (li >= 0) { const endT = lines[li + 1] ? lines[li + 1].t : Infinity; if (t >= endT - 0.12) { try { p.seekTo(lines[li].t, true) } catch {} } idx = li }
      if (idx !== activeRef.current) { activeRef.current = idx; setActiveIdx(idx) }
    }
    const onReadyStart = () => { if (started) return; started = true; timer = setInterval(tick, 200) }

    if (IS_APP) {
      // 앱: 원격 origin 제어형 플레이어(shadow-player.html)를 iframe으로 띄우고 postMessage로 제어 → 오류 153 회피(라이브캠과 동일 패턴, 장치 검증 완료).
      // playerRef를 동일 API(shim)로 만들어 seekLine/togglePlay/goStart/폴링 로직을 그대로 재사용.
      let cachedT = 0, cachedState = -1
      const send = (msg) => { const f = document.getElementById('yt-player-demo'); try { f?.contentWindow?.postMessage({ src: 'tj-app', ...msg }, '*') } catch {} }
      playerRef.current = {
        seekTo: (t) => send({ cmd: 'seek', value: t }),
        playVideo: () => send({ cmd: 'play' }),
        pauseVideo: () => send({ cmd: 'pause' }),
        setPlaybackRate: (r) => send({ cmd: 'rate', value: r }),
        getCurrentTime: () => cachedT,
        getPlayerState: () => cachedState,
        destroy: () => {},
      }
      const onMsg = (e) => {
        const d = e.data; if (!d || d.src !== 'tj-player') return
        if (d.event === 'time') { cachedT = d.t; cachedState = d.state }
        else if (d.event === 'state') { cachedState = d.state; setIsPlaying(d.state === 1) }
        else if (d.event === 'ready') { onReadyStart() }
      }
      window.addEventListener('message', onMsg)
      return () => { cancelled = true; window.removeEventListener('message', onMsg); if (timer) clearInterval(timer) }
    }

    // 웹: 현재 origin이 실도메인이라 직접 YT.Player 채택이 정상 동작
    loadYT().then(YT => {
      if (cancelled || !YT) return
      playerRef.current = new YT.Player('yt-player-demo', {
        host: 'https://www.youtube.com',
        events: { onStateChange: (e) => setIsPlaying(e.data === 1), onReady: onReadyStart },
      })
    })
    return () => { cancelled = true; if (timer) clearInterval(timer) }
  }, [])

  useLayoutEffect(() => {
    const measure = () => { if (headRef.current) setHeadH(headRef.current.getBoundingClientRect().height) }
    measure()
    const ro = new ResizeObserver(measure); if (headRef.current) ro.observe(headRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => { const el = lineRefs.current[activeIdx]; if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [activeIdx])
  useEffect(() => { detailRef.current = detailIdx }, [detailIdx])
  // 문장 상세 팝업이 열린 채 재생 중이면, 영상 진행에 맞춰 팝업 내용도 활성 문장으로 동기화(일시정지 땐 수동 고정)
  useEffect(() => { if (detailIdx != null && isPlaying && activeIdx >= 0 && activeIdx !== detailIdx) setDetailIdx(activeIdx) }, [activeIdx, isPlaying, detailIdx])

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || ''
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'a': case 'A': case 'ArrowLeft': e.preventDefault(); detailRef.current != null ? detailGo(-1) : goPrev(); break
        case 'd': case 'D': case 'ArrowRight': e.preventDefault(); detailRef.current != null ? detailGo(1) : goNext(); break
        case 's': case 'S': e.preventDefault(); replay(); break
        case 'r': case 'R': e.preventDefault(); toggleLoop(); break
        case 'h': case 'H': e.preventDefault(); setHideKr(v => !v); break
        case 'j': case 'J': e.preventDefault(); setHideJp(v => !v); break
        case 'c': case 'C': e.preventDefault(); cycleCap(); break
        case 'z': case 'Z': e.preventDefault(); stepRate(-1); break
        case 'x': case 'X': e.preventDefault(); stepRate(1); break
        case ' ': e.preventDefault(); togglePlay(); break
        case 'Escape': setPopWord(null); setPanel(null); setDetailIdx(null); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cur = activeIdx >= 0 ? lines[activeIdx] : null
  const openPop = (w, lineIdx) => setPopWord({ word: w, lineIdx })
  const blurStyle = (on) => ({ filter: on ? 'blur(6px)' : 'none', userSelect: on ? 'none' : 'auto', transition: 'filter 0.15s' })

  // ── 공유 블록 ──────────────────────────────────────
  const bannerBlock = (
    <>
      <div data-tour="level" style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 14px', borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 52, padding: '6px 0', borderRadius: 12, border: '1px solid var(--bd)', color: 'var(--text-2)', lineHeight: 1 }}>
          <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.7 }}>JLPT</span>
          <span style={{ fontSize: 20, fontWeight: 900, marginTop: 3, color: 'var(--text-1)' }}>{stat.overall}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--text-strong)', wordBreak: 'keep-all' }}>이 영상은 JLPT {stat.overall} 수준이에요</p>
          <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{LV_LABEL[stat.overall]} · 등장 단어의 {stat.covPct}%가 {stat.overall} 이하</p>
        </div>
        <button onClick={() => setOpenSummary(v => !v)} style={{ ...ghostBtn(openSummary), flexShrink: 0 }}>요약 {openSummary ? '▲' : '▼'}</button>
      </div>
      {openSummary && (
        <div style={{ marginTop: 10, padding: 16, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--bd)', animation: 'tjFade 0.2s ease' }}>
          <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.7, color: 'var(--text-1)', wordBreak: 'keep-all' }}>{data.summary}</p>
          {data.points && (
            <ul style={{ margin: '0 0 14px', paddingLeft: 18, color: 'var(--text-2)' }}>
              {data.points.map((p, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.75, wordBreak: 'keep-all' }}>{p}</li>)}
            </ul>
          )}
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 12 }}>
            <p style={{ margin: '0 0 9px', fontSize: 12.5, color: 'var(--text-2)', wordBreak: 'keep-all' }}>
              <b style={{ color: 'var(--text-strong)' }}>난이도 집계</b> — 등장 단어 {stat.total}개 중 <b style={{ color: 'var(--text-strong)' }}>{stat.covPct}%가 {stat.overall} 이하</b>라 권장 <b style={{ color: 'var(--text-strong)' }}>{stat.overall} ({LV_LABEL[stat.overall]})</b>
            </p>
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden' }}>
              {ORDER.map(lv => stat.counts[lv] > 0 && (<div key={lv} title={`${lv} ${stat.counts[lv]}`} style={{ width: `${stat.counts[lv] / stat.total * 100}%`, background: BARGREY[lv] }} />))}
            </div>
            <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginTop: 9, fontSize: 11, color: 'var(--text-3)' }}>
              {ORDER.map(lv => (<span key={lv} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><i style={{ width: 9, height: 9, borderRadius: 3, background: BARGREY[lv], display: 'inline-block' }} />{lv} {stat.counts[lv]}</span>))}
              <span style={{ opacity: 0.7 }}>· JLPT는 추정치</span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  const videoBlock = (
    <div style={expanded
      ? { position: 'fixed', inset: 0, zIndex: 6000, background: '#000', display: 'flex', flexDirection: isLandscape ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: isLandscape ? 18 : 14, padding: isLandscape ? '0 14px' : '0' }
      : { position: 'relative', margin: '0 auto', borderRadius: 16, overflow: 'hidden', background: '#000', boxShadow: '0 6px 22px rgba(0,0,0,0.18)', ...(isWide ? { width: '100%', aspectRatio: '16 / 9', maxHeight: '60vh' } : { aspectRatio: '16 / 9', width: 'auto', maxWidth: '100%', height: 'min(42vh, calc((min(100vw, 720px) - 24px) * 0.5625))' }) }}>
      {/* 영상 박스 — iframe은 항상 이 안에 유지(확대 토글 시 언마운트 금지=재생 위치 보존).
          앱: 실도메인 프록시(shadow-player.html)로 153 회피·postMessage 제어. 웹: 직접 임베드. */}
      <div style={expanded
        ? { position: 'relative', flexShrink: 0, aspectRatio: '16 / 9', background: '#000', overflow: 'hidden', borderRadius: isLandscape ? 10 : 0, width: isLandscape ? 'min(62vw, calc(86vh * 16 / 9))' : 'min(100%, calc(64vh * 16 / 9))' }
        : { position: 'absolute', inset: 0 }}>
        <iframe id="yt-player-demo" title={data.title}
          src={IS_APP
            ? `https://tickjapan.com/shadow-player.html?v=${vid}`
            : `https://www.youtube.com/embed/${vid}?enablejsapi=1&playsinline=1&rel=0&modestbranding=1&cc_load_policy=0&widget_referrer=https%3A%2F%2Fwww.tickjapan.com&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        {!expanded && capMode !== 'off' && cur && (
          <div style={{ position: 'absolute', left: '50%', bottom: '7%', transform: 'translateX(-50%)', maxWidth: '96%', width: 'max-content', padding: '8px 16px', borderRadius: 12, textAlign: 'center', background: 'rgba(0,0,0,0.64)', backdropFilter: 'blur(3px)', color: '#fff', pointerEvents: 'none' }}>
            {(capMode === 'both' || capMode === 'jp') && <div style={{ lineHeight: 1.45 }}><RubyText text={cur.furigana_html} fontSize={16} /></div>}
            {(capMode === 'both' || capMode === 'kr') && <p style={{ margin: capMode === 'kr' ? 0 : '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4 }}>{cur.kr}</p>}
          </div>
        )}
        {/* 확대/축소 버튼 — 확대 모드에선 자막을 영상 아래/옆에 표시(YouTube ToS: 플레이어 위 오버레이 금지) */}
        <button onClick={() => setExpanded(v => !v)} aria-label={expanded ? '축소' : '크게 보기'} title={expanded ? '축소' : '크게 보기 (자막 함께)'}
          style={{ position: 'absolute', top: 8, right: 8, zIndex: 3, width: 34, height: 34, borderRadius: 9, border: 'none', background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {expanded
              ? <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" /></>
              : <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>}
          </svg>
        </button>
      </div>
      {expanded && (
        <div style={{ ...(isLandscape ? { flex: 1, minWidth: 0, maxWidth: 460, maxHeight: '92vh', overflowY: 'auto' } : { width: '100%', maxWidth: 560, padding: '0 18px' }), display: 'flex', flexDirection: 'column', gap: 14, color: '#fff' }}>
          <div style={{ textAlign: isLandscape ? 'left' : 'center' }}>
            {cur ? (<>
              <div style={blurStyle(hideJp)}><RubyText text={cur.furigana_html} fontSize={isLandscape ? 22 : 19} /></div>
              <p style={{ margin: '9px 0 0', fontSize: isLandscape ? 15.5 : 14, color: 'rgba(255,255,255,0.82)', lineHeight: 1.5, ...blurStyle(hideKr) }}>{cur.kr}</p>
            </>) : (
              <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>재생하면 자막이 여기에 표시돼요</p>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: isLandscape ? 'flex-start' : 'center' }}>
            {[['prev', '이전', goPrev], ['replay', '다시', replay], [isPlaying ? 'pause' : 'play', isPlaying ? '정지' : '재생', togglePlay], ['loop', '반복', toggleLoop], ['next', '다음', goNext]].map(([ic, lb, fn], i) => (
              <button key={i} onClick={fn} style={{ flex: isLandscape ? '0 0 auto' : 1, minWidth: 52, height: 46, borderRadius: 11, border: 'none', background: (ic === 'loop' && loopIdx >= 0) ? PRIMARY : 'rgba(255,255,255,0.13)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, cursor: 'pointer', fontFamily: 'inherit' }}>
                <Ico name={ic} size={18} />
                <span style={{ fontSize: 10.5 }}>{lb}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const controlsBlock = (
    <>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 6, marginTop: 10 }}>
        <CtrlBtn label="이전" sub="A" icon="prev" onClick={goPrev} showKey />
        <CtrlBtn label="다시" sub="S" icon="replay" onClick={replay} showKey />
        <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" icon={isPlaying ? 'pause' : 'play'} onClick={togglePlay} primary showKey tour="play" />
        <CtrlBtn label="반복" sub="R" icon="loop" onClick={toggleLoop} active={loopIdx >= 0} showKey tour="loop" />
        <CtrlBtn label="다음" sub="D" icon="next" onClick={goNext} showKey />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <button onClick={goStart} style={chip(false)} aria-label="처음으로" title="처음으로 (영상 맨 앞)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="6" x2="5" y2="18" /><polyline points="20 6 12 12 20 18" /><polyline points="12 6 6 12 12 18" /></svg>
          <span style={{ marginLeft: 4, fontSize: 11.5, fontWeight: 700 }}>처음</span>
        </button>
        <span data-tour="hide" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 4px 0 10px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-3)', marginRight: 2 }}>가리기</span>
          <button onClick={() => setHideJp(v => !v)} style={segChip(hideJp)} title="일본어 가리기 (J)"><EyeIcon off={hideJp} /> 일</button>
          <button onClick={() => setHideKr(v => !v)} style={segChip(hideKr)} title="한국어 가리기 (H)"><EyeIcon off={hideKr} /> 한</button>
        </span>
        <span style={{ flex: 1 }} />
        <button data-tour="rate" onClick={cycleRate} style={chip(rateIdx !== 2)} title="재생 속도 (Z 느리게 / X 빠르게)"><span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span></button>
        <button onClick={() => setSettingsOpen(true)} style={chip(false)} aria-label="표시 설정" title="자막·단어 표시 설정">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
        </button>
      </div>
      {settingsOpen && (
        <div onClick={() => setSettingsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 5200, background: 'rgba(10,15,20,0.4)', display: 'flex', alignItems: isWide ? 'center' : 'flex-end', justifyContent: 'center', animation: 'tjFade .16s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 380, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: isWide ? 18 : '20px 20px 0 0', padding: '18px 18px 22px', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: 'var(--text-strong)' }}>표시 설정</p>
              <button onClick={() => setSettingsOpen(false)} style={{ border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            <p style={{ margin: '0 0 7px', fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>영상 위 자막</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {CAP_ORDER.map(m => <button key={m} onClick={() => setCapMode(m)} style={{ ...segChip(capMode === m), flex: 1, height: 36, justifyContent: 'center' }}>{CAP_LABEL[m]}</button>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)' }}>스크립트 단어장</p>
                <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>각 문장 아래 단어 표시</p>
              </div>
              <button onClick={() => setShowWords(v => !v)} style={{ width: 50, height: 28, borderRadius: 999, border: 'none', cursor: 'pointer', background: showWords ? PRIMARY : 'var(--bd)', position: 'relative', transition: 'background .15s' }}>
                <span style={{ position: 'absolute', top: 3, left: showWords ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'left .15s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )

  const transcriptBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {!isWide && <p style={{ fontSize: 11.5, color: 'var(--text-3)', margin: '2px 4px 4px' }}>문장을 누르면 분해·단어를 자세히 볼 수 있어요</p>}
      {lines.map((ln, i) => {
        if (!isPlus && ln.t >= PREVIEW_LIMIT) return null   // 무료: 1분 이후 스크립트 잠금
        const on = i === activeIdx
        const saved = isLineSaved(i)
        return (
          <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => setDetailIdx(i)}
            data-tour={i === 0 ? 'line' : undefined}
            style={{ position: 'relative', cursor: 'pointer', padding: '12px 40px 12px 12px', borderRadius: 14, scrollMarginTop: (isWide ? 14 : headH + 14), background: on ? `${PRIMARY}16` : 'transparent', boxShadow: on ? `inset 3px 0 0 ${PRIMARY}` : 'none', transition: 'background 0.18s' }}>
            <div style={{ fontSize: 10.5, color: on ? PRIMARY : 'var(--text-3)', marginBottom: 4, fontVariantNumeric: 'tabular-nums', fontWeight: on ? 700 : 400 }}>{fmtT(ln.t)}</div>
            <div style={blurStyle(hideJp)}><RubyText text={ln.furigana_html} fontSize={15.5} /></div>
            <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.5, color: on ? 'var(--text-1)' : 'var(--text-2)', ...blurStyle(hideKr) }}>{ln.kr}</p>
            {showWords && on && ln.words && ln.words.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 9 }}>
                {ln.words.map((w, wi) => (
                  <button key={wi} onClick={(e) => { e.stopPropagation(); openPop(w, i) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 9, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer', fontSize: 12.5, color: 'var(--text-2)', fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {w.w}<span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-3)' }}>{w.jlpt || '·'}</span>
                  </button>
                ))}
              </div>
            )}
            <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(i) }} aria-label="문장 북마크" data-tour={i === 0 ? 'bookmark' : undefined}
              style={{ position: 'absolute', top: 10, right: 9, width: 32, height: 32, borderRadius: 9, cursor: 'pointer', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark filled={saved} color={saved ? GREEN : 'var(--text-3)'} />
            </button>
          </div>
        )
      })}
      {!isPlus && lines.some(l => l.t >= PREVIEW_LIMIT) && (
        <button onClick={() => navigate('/plans?from=shadowing_script')} style={{ marginTop: 8, width: '100%', textAlign: 'center', cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--bd)', background: 'var(--surface)', borderRadius: 16, padding: '20px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          <span style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text-strong)' }}>무료 미리보기는 1분까지예요</span>
          <span style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-2)', wordBreak: 'keep-all' }}>이후 스크립트와 영상은 한 편을 끝까지 반복하며 익히는 진짜 쉐도잉 — 플러스부터 무제한이에요.</span>
          <span style={{ marginTop: 8, height: 44, padding: '0 22px', borderRadius: 12, background: 'linear-gradient(145deg,#6fb6d6,#5CA9CE 55%,#4f96bb)', color: '#fff', fontSize: 14.5, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 16px ${PRIMARY}55` }}>쉐도잉 무제한 시청</span>
        </button>
      )}
    </div>
  )

  const vocabBlock = (
    <div style={{ marginTop: 18 }}>
      <button onClick={() => setOpenVocab(v => !v)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-1)', fontSize: 14, fontWeight: 700 }}>
        <span>📚 이 영상 단어장 · {vocab.count}단어</span><span style={{ color: 'var(--text-3)' }}>{openVocab ? '▲' : '▼'}</span>
      </button>
      {openVocab && (
        <div style={{ marginTop: 10, animation: 'tjFade 0.2s ease' }}>
          {ORDER.map(lv => vocab.byLevel[lv].length > 0 && (
            <div key={lv} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '0 0 8px' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--bg)', background: 'var(--text-2)', padding: '2px 9px', borderRadius: 7 }}>{lv}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{LV_LABEL[lv]} · {vocab.byLevel[lv].length}개</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 7 }}>
                {vocab.byLevel[lv].map((w, i) => {
                  const ws = isWordSaved(w)
                  return (
                    <div key={i} onClick={() => openPop(w, w.lineIdx)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 11, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ lineHeight: 1.3 }}><Furi w={w.w} reading={w.reading} size={14.5} /></div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.ko}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleSaveWord(w) }} aria-label="단어 저장" style={{ border: 'none', background: 'transparent', display: 'flex', cursor: 'pointer' }}>
                        <Bookmark filled={ws} color={ws ? GREEN : 'var(--text-3)'} size={15} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const titleBlock = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: PRIMARY, letterSpacing: 0.2 }}>TED 쉐도잉</span>
        <button onClick={startTour} style={{ ...ghostBtn(false), height: 28, fontSize: 11.5, color: 'var(--text-3)', flexShrink: 0 }}>❔ 사용법</button>
      </div>
      <p style={{ fontSize: isWide ? 23 : 20, fontWeight: 800, color: 'var(--text-strong)', margin: '6px 0 3px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.32, wordBreak: 'keep-all' }}>{data.title}</p>
      <p style={{ fontSize: isWide ? 14.5 : 13.5, color: 'var(--text-3)', margin: 0 }}>{data.titleKr}</p>
      {/* 액션: 좋아요 · 별로 · 저장 */}
      <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
        <ActionBtn active={rating === 'up'} onClick={() => rateVid('up')} label="좋아요"
          path="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        <ActionBtn active={rating === 'down'} onClick={() => rateVid('down')} label="별로" flip
          path="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        <ActionBtn active={vidSaved} onClick={toggleSaveVid} label={vidSaved ? '저장됨' : '저장'}
          path="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </div>
    </>
  )

  const styleTag = <style>{`@keyframes tjFade{from{opacity:0}to{opacity:1}}@keyframes tjUp{from{transform:translateY(34px);opacity:.5}to{transform:translateY(0);opacity:1}}@keyframes tjPop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}@keyframes tjRing{0%,100%{box-shadow:0 0 0 3px ${PRIMARY}55,0 8px 30px rgba(0,0,0,.45)}50%{box-shadow:0 0 0 6px ${PRIMARY}33,0 8px 30px rgba(0,0,0,.45)}}`}</style>

  const sheets = (
    <>
      {popWord && (() => {
        const w = popWord.word, li = popWord.lineIdx, ln = lines[li], lnSaved = isLineSaved(li)
        return (
          <Sheet onClose={() => setPopWord(null)} scrim={0.34} maxH="70vh" z={4600} wide={isWide}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Furi w={w.w} reading={w.reading} size={27} />
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--bg)', background: 'var(--text-2)', padding: '3px 9px', borderRadius: 7 }}>{w.jlpt || 'JLPT 외'}</span>
            </div>
            <p style={{ margin: '4px 0 16px', fontSize: 17, color: 'var(--text-1)', fontWeight: 700 }}>{w.ko || '—'}</p>
            {ln && (
              <div onClick={() => { setPopWord(null); seekLine(li) }} style={{ cursor: 'pointer', padding: '11px 13px', borderRadius: 13, background: 'var(--surface)', border: '1px solid var(--bd)', marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: PRIMARY, fontWeight: 700, marginBottom: 4 }}>예문 · {fmtT(ln.t)} · ▶ 그 장면으로</div>
                <RubyText text={ln.furigana_html} fontSize={14.5} />
                <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--text-2)' }}>{ln.kr}</p>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleSaveWord(w)} style={sheetBtn(isWordSaved(w))}>{isWordSaved(w) ? '★ 단어 저장됨' : '단어 저장'}</button>
              <button onClick={() => toggleSaveLine(li)} style={sheetBtn(lnSaved)}>{lnSaved ? '★ 예문 저장됨' : '예문 저장'}</button>
            </div>
          </Sheet>
        )
      })()}

      {detailIdx != null && (
        <SentenceDetail ln={lines[detailIdx]} saved={isLineSaved(detailIdx)} isPlaying={isPlaying} isLooping={loopIdx === detailIdx} wide={isWide}
          onClose={() => setDetailIdx(null)}
          onPrev={() => detailGo(-1)}
          onNext={() => detailGo(1)}
          onPlayLine={() => seekLine(detailIdx)}
          onLoopLine={() => loopThisLine(detailIdx)}
          onTogglePlay={togglePlay}
          onToggleSave={() => toggleSaveLine(detailIdx)}
          onOpenWord={(w) => openPop(w, detailIdx)} />
      )}


      {/* 미리보기 1분 한도 넛징 (비회원·무료회원) */}
      {gated && (
        <div onClick={() => setGated(false)} style={{ position: 'fixed', inset: 0, zIndex: 5000, background: 'rgba(10,15,20,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22, animation: 'tjFade 0.18s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 360, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 20, padding: '24px 22px', boxShadow: '0 24px 60px rgba(0,0,0,0.42)', textAlign: 'center', animation: 'tjPop 0.22s cubic-bezier(0.16,1,0.3,1)' }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🎬</div>
            <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 800, color: 'var(--text-strong)' }}>무료 미리보기는 1분까지예요</p>
            <p style={{ margin: '0 0 18px', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-2)', wordBreak: 'keep-all' }}><b style={{ color: 'var(--text-1)' }}>플러스 회원</b> 이상만 쉐도잉을 제한 없이 무제한으로 볼 수 있어요.</p>
            <button onClick={() => { setGated(false); navigate('/plans?from=shadowing_preview') }} style={{ width: '100%', height: 50, borderRadius: 14, border: 'none', background: 'linear-gradient(145deg,#6fb6d6,#5CA9CE 55%,#4f96bb)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 8px 20px ${PRIMARY}55` }}>쉐도잉 무제한 시청</button>
            <button onClick={() => setGated(false)} style={{ marginTop: 10, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>나중에</button>
          </div>
        </div>
      )}

      {tour && <StudyOnboarding steps={TOUR_STEPS} onClose={closeTour} />}
    </>
  )

  // ── 데스크톱: 2단(좌 영상 고정 + 우 스크립트) ──────
  if (isWide) {
    return (
      <div style={{ padding: '8px 0 36px' }}>
        {styleTag}
        <div style={{ marginBottom: 16 }}>{titleBlock}</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 28, alignItems: 'stretch' }}>
          <div style={{ flex: '1.7 1 0', minWidth: 0 }}>
            <div ref={headRef} style={{ position: 'sticky', top: 14, alignSelf: 'flex-start' }}>
              <div style={{ marginBottom: 12 }}>{bannerBlock}</div>
              {videoBlock}
              {controlsBlock}
            </div>
          </div>
          <div style={{ flex: '1 1 0', minWidth: 340, maxWidth: 480 }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-2)', margin: '2px 0 8px' }}>스크립트 <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>· 문장을 누르면 분해·단어를 봐요</span></p>
            {transcriptBlock}
            {vocabBlock}
          </div>
        </div>
        {sheets}
      </div>
    )
  }

  // ── 모바일: 세로 스택(영상 상단 고정) ───────────────
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '6px 0 24px' }}>
      {styleTag}
      <div style={{ padding: '6px 10px 12px' }}>
        {titleBlock}
        <div style={{ marginTop: 12 }}>{bannerBlock}</div>
      </div>
      <div ref={headRef} style={{ position: 'sticky', top: STICKY_TOP, zIndex: 10, background: 'var(--bg)', padding: '6px 10px 10px' }}>
        {videoBlock}
        {controlsBlock}
      </div>
      <div style={{ padding: '4px 4px 0' }}>{transcriptBlock}</div>
      <div style={{ padding: '0 10px' }}>{vocabBlock}</div>
      {sheets}
    </div>
  )
}

// ── 바텀시트(모바일) / 센터 모달(PC) ──────────────────
function Sheet({ onClose, scrim = 0.4, maxH = '80vh', z = 4000, wide = false, children }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: z, background: `rgba(12,18,24,${wide ? 0.1 : scrim})`, display: 'flex', alignItems: 'center', justifyContent: wide ? 'flex-end' : 'center', padding: wide ? '16px 18px' : 0, animation: 'tjFade 0.18s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: wide ? 400 : 640, maxHeight: wide ? '92vh' : maxH, overflowY: 'auto', background: 'var(--bg)', border: wide ? '1px solid var(--bd)' : 'none', borderRadius: wide ? 18 : '22px 22px 0 0', padding: wide ? '18px 18px 20px' : '8px 18px 26px', boxShadow: '0 16px 48px rgba(0,0,0,0.4)', animation: wide ? 'tjPop 0.22s cubic-bezier(0.16,1,0.3,1)' : 'tjUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
        {!wide && <div style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--bd)', margin: '2px auto 16px' }} />}
        {children}
      </div>
    </div>
  )
}

// ── 문장 상세 — 분해는 '보기' 버튼으로 수동 실행 ──────
function SentenceDetail({ ln, saved, isPlaying, isLooping, wide, onClose, onPrev, onNext, onPlayLine, onLoopLine, onTogglePlay, onToggleSave, onOpenWord }) {
  const [bd, setBd] = useState(null)
  const [state, setState] = useState('idle')   // idle → 사용자가 '문장 분해 보기' 누르면 loading
  const [wordsOpen, setWordsOpen] = useState(false)

  const load = () => {
    setState('loading')
    fetch(`${API_URL}/breakdown`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ japanese: ln.jp }) })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => { setBd(d.breakdown ?? []); setState('done') })
      .catch(() => setState('error'))
  }
  // 문장이 바뀌면 분해 초기화(자동 호출 안 함)
  useEffect(() => { setState('idle'); setBd(null); setWordsOpen(false) }, [ln.jp])

  return (
    <Sheet onClose={onClose} scrim={0.22} maxH="74vh" wide={wide}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>문장 분석 · {fmtT(ln.t)}</span>
        <button onClick={onToggleSave} aria-label="문장 북마크" style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', padding: 4 }}><Bookmark filled={saved} color={saved ? GREEN : 'var(--text-3)'} /></button>
      </div>

      <div style={{ lineHeight: 1.6 }}><RubyText text={ln.furigana_html} fontSize={20} /></div>
      <p style={{ margin: '6px 0 12px', fontSize: 14.5, color: 'var(--text-2)' }}>{ln.kr}</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        <MiniCtl icon="prev" label="이전" k="A" onClick={onPrev} />
        <MiniCtl icon={isPlaying ? 'pause' : 'play'} label={isPlaying ? '정지' : '재생'} k="Space" onClick={onTogglePlay} />
        <MiniCtl icon="replay" label="다시" k="S" onClick={onPlayLine} />
        <MiniCtl icon="loop" label="반복" k="R" on={isLooping} onClick={onLoopLine} />
        <MiniCtl icon="next" label="다음" k="D" onClick={onNext} />
      </div>

      {/* 문장 분해 — 수동 실행 */}
      <div style={{ border: `1.5px solid ${PRIMARY}`, borderRadius: 15, overflow: 'hidden' }}>
        <div style={{ background: `${PRIMARY}14`, padding: '12px 15px', borderBottom: `1px solid ${PRIMARY}33` }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>문장 분해</p>
          <p style={{ margin: '3px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>왜 이렇게 만들어졌을까? 단어·문법을 알기 쉽게 풀이!</p>
        </div>
        <div style={{ padding: '14px 15px' }}>
          {state === 'idle' && (
            <button onClick={load} style={{ width: '100%', height: 48, borderRadius: 12, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 800, fontSize: 14.5, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 16px ${PRIMARY}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>문장 분해 보기</button>
          )}
          {state === 'loading' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 0' }}>
              <span className="spinner" style={{ width: 15, height: 15, borderTopColor: PRIMARY, borderColor: `${PRIMARY}33` }} />
              <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>문장을 분해하는 중...</span>
            </div>
          )}
          {state === 'error' && <button onClick={load} style={{ height: 38, padding: '0 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', border: '1px solid var(--bd)', background: 'transparent', color: 'var(--text-2)' }}>다시 시도</button>}
          {state === 'done' && bd && bd.length > 0 && (<><BreakdownTable breakdown={bd} showDetail /><BreakdownCards breakdown={bd} showDetail /></>)}
          {state === 'done' && (!bd || bd.length === 0) && <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-3)' }}>이 문장은 분해 결과가 없어요.</p>}
        </div>
      </div>

      {ln.words && ln.words.length > 0 && (
        <div style={{ marginTop: 14 }}>
          <button onClick={() => setWordsOpen(v => !v)} style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', border: 'none', borderTop: '1px solid var(--bd)', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-2)', fontSize: 13, fontWeight: 600 }}>
            <span>이 문장의 단어 {ln.words.length}개 (JLPT)</span><span style={{ color: 'var(--text-3)' }}>{wordsOpen ? '▲' : '▼'}</span>
          </button>
          {wordsOpen && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {ln.words.map((w, wi) => (
                <button key={wi} onClick={() => onOpenWord(w)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 10px', borderRadius: 10, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Furi w={w.w} reading={w.reading} size={14} />
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{w.ko}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-3)' }}>{w.jlpt || '·'}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </Sheet>
  )
}

// ── 첫 사용 가이드 ────────────────────────────────────
const TOUR_STEPS = [
  { sel: 'level', title: '이 영상의 난이도', desc: '영상에 나온 단어로 JLPT 레벨을 추정했어요. ‘요약’에서 줄거리와 난이도 분석도 볼 수 있어요.' },
  { sel: 'play', title: '재생', desc: '재생하면 자막이 문장마다 따라 강조돼요. 스페이스바로도 돼요.' },
  { sel: 'loop', title: '문장 반복', desc: '한 문장을 반복 재생해 따라 말해보세요.\n이전·다시·다음은 A·S·D 키예요.' },
  { sel: 'rate', title: '배속', desc: '익숙해질 때까지 천천히 들어요.\nZ 느리게, X 빠르게.' },
  { sel: 'hide', title: '일본어·한국어 가리기', desc: '일본어를 가리면 작문 연습, 한국어를 가리면 받아쓰기. 번갈아 해보세요.' },
  { sel: 'line', title: '문장을 누르면 자세히', desc: '문장을 누르면 문장 분해와 단어 레벨을 볼 수 있어요. 히라가나만 알아도 이해되게 풀어드려요.' },
  { sel: 'bookmark', title: '북마크로 저장', desc: '마음에 든 문장은 북마크하세요. 저장함에서 다시 보고 그 장면으로 이동해요.' },
]

function StudyOnboarding({ steps, onClose }) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
  const [dontShow, setDontShow] = useState(false)
  const step = steps[i]
  useLayoutEffect(() => {
    const sel = `[data-tour="${step.sel}"]`
    const el = document.querySelector(sel)
    if (el) el.scrollIntoView({ block: 'center', behavior: 'auto' })
    const measure = () => { const e = document.querySelector(sel); if (e) setRect(e.getBoundingClientRect()) }
    const t = setTimeout(measure, 90)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); window.removeEventListener('scroll', measure, true) }
  }, [i])

  const last = i === steps.length - 1
  const next = () => { if (dontShow || last) onClose(dontShow); else setI(v => v + 1) }   // '다시 보지 않기' 체크 시 즉시 종료
  const prev = () => setI(v => Math.max(0, v - 1))

  const vw = typeof window !== 'undefined' ? window.innerWidth : 360
  const vh = typeof window !== 'undefined' ? window.innerHeight : 640
  const pad = 8
  const r = rect ? { x: Math.max(0, rect.left - pad), y: Math.max(0, rect.top - pad), w: rect.width + pad * 2, h: rect.height + pad * 2 } : null
  const clip = r ? `path(evenodd, "M0 0H${vw}V${vh}H0Z M${r.x} ${r.y}H${r.x + r.w}V${r.y + r.h}H${r.x}Z")` : undefined
  const cardW = Math.min(348, vw - 24)
  const below = r ? (r.y + r.h + 195 < vh) : true
  const cardLeft = r ? Math.min(Math.max(12, r.x), vw - cardW - 12) : (vw - cardW) / 2
  const cardTop = r ? (below ? r.y + r.h + 14 : null) : Math.max(44, (vh - 230) / 2)
  const cardBottom = (r && !below) ? (vh - r.y + 14) : null
  const pct = Math.round((i + 1) / steps.length * 100)

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 6000 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,12,16,0.58)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', clipPath: clip, transition: 'clip-path 0.28s cubic-bezier(0.16,1,0.3,1)', pointerEvents: 'none' }} />
      {r && <div style={{ position: 'fixed', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 13, animation: 'tjRing 1.8s ease-in-out infinite', pointerEvents: 'none', transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)' }} />}
      <div onClick={next} style={{ position: 'fixed', inset: 0, pointerEvents: 'auto', cursor: 'pointer' }} />
      <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', left: cardLeft, top: cardTop ?? undefined, bottom: cardBottom ?? undefined, width: cardW, zIndex: 6002, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 18, padding: '17px 18px', boxShadow: '0 20px 54px rgba(0,0,0,0.5)', pointerEvents: 'auto', animation: 'tjFade 0.2s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--bd)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: PRIMARY, borderRadius: 3, transition: 'width 0.32s cubic-bezier(0.16,1,0.3,1)' }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', flexShrink: 0 }}>{i + 1}/{steps.length}</span>
        </div>
        <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 800, color: 'var(--text-strong)', wordBreak: 'keep-all' }}>{step.title}</p>
        <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.62, color: 'var(--text-2)', wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{step.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 12, color: 'var(--text-3)', userSelect: 'none' }}>
            <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} style={{ accentColor: PRIMARY, width: 15, height: 15, cursor: 'pointer' }} />
            다시 보지 않기
          </label>
          <span style={{ flex: 1 }} />
          {i > 0 && <button onClick={prev} style={{ ...ghostBtn(false), height: 38 }}>이전</button>}
          <button onClick={next} style={{ height: 38, padding: '0 18px', borderRadius: 11, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 16px ${PRIMARY}55` }}>{last ? '시작하기' : '다음'}</button>
        </div>
      </div>
    </div>
  )
}

// ── 보조 컴포넌트/스타일 ──────────────────────────────
function CtrlBtn({ label, sub, icon, onClick, primary, active, showKey, tour }) {
  return (
    <button onClick={onClick} aria-label={label} data-tour={tour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '9px 2px 6px', borderRadius: 13, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${active ? PRIMARY : (primary ? 'transparent' : 'var(--bd)')}`, background: active ? `${PRIMARY}18` : (primary ? PRIMARY : 'var(--surface)'), color: primary ? '#fff' : (active ? PRIMARY : 'var(--text-1)'), boxShadow: primary ? `0 6px 16px ${PRIMARY}44` : 'none', transition: 'background 0.14s, border-color 0.14s' }}>
      <Ico name={icon} size={19} />
      <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
      {showKey && SHOW_KEYS && <span style={{ fontSize: 9, opacity: 0.55, lineHeight: 1 }}>{sub}</span>}
    </button>
  )
}
function chip(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? `${PRIMARY}18` : 'var(--surface)', color: active ? PRIMARY : 'var(--text-1)', transition: 'background 0.14s' }
}
function segChip(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 10px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', border: 'none', background: active ? PRIMARY : 'transparent', color: active ? '#fff' : 'var(--text-2)', transition: 'background 0.14s' }
}
function EyeIcon({ off }) {
  return off
    ? <svg width="12.5" height="12.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
    : <svg width="12.5" height="12.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
}
function ActionBtn({ active, onClick, label, path, flip }) {
  return (
    <button onClick={onClick} style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 40, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? `${PRIMARY}14` : 'var(--surface)', color: active ? PRIMARY : 'var(--text-2)', transition: 'background 0.14s, border-color 0.14s' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transform: flip ? 'rotate(180deg)' : 'none' }}><path d={path} /></svg>
      {label}
    </button>
  )
}
function ghostBtn(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 13px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 700, whiteSpace: 'nowrap', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? `${PRIMARY}14` : 'transparent', color: active ? PRIMARY : 'var(--text-2)' }
}
function sheetBtn(active) {
  return { flex: 1, height: 46, borderRadius: 13, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap', border: active ? `1px solid ${GREEN}` : 'none', background: active ? 'transparent' : PRIMARY, color: active ? GREEN : '#fff', boxShadow: active ? 'none' : `0 6px 16px ${PRIMARY}44` }
}
function KeyHint({ children }) {
  return <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 4px', borderRadius: 4, background: 'var(--bd)', color: 'var(--text-3)', fontWeight: 700 }}>{children}</span>
}
function MiniCtl({ icon, label, k, on, onClick }) {
  return (
    <button onClick={onClick} aria-label={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, height: 48, borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? `${PRIMARY}18` : 'transparent', color: on ? PRIMARY : 'var(--text-1)' }}>
      <Ico name={icon} size={17} />
      <span style={{ fontSize: 10, fontWeight: 700, lineHeight: 1 }}>{label}</span>
      {SHOW_KEYS && <span style={{ fontSize: 8.5, opacity: 0.5, lineHeight: 1 }}>{k}</span>}
    </button>
  )
}
