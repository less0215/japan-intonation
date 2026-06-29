/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 반응형: PC=2단(좌 영상 고정 + 우 스크립트), 모바일=세로 스택(영상 상단 고정).
 * 영상 위 자막 오버레이 + 현재 줄 하이라이트·자동 스크롤. 시드=studyDemo.js.
 * 쉐도잉 단축키 + 컨트롤. 일/한 가리기, 단어 칩(JLPT), 단어 시트.
 * 문장 클릭 → 시트: 문장 분해는 '보기' 버튼으로 수동 실행(/breakdown 캐시, 문장당 최초 1회만 비용).
 * 요약 펼치기 + 영상 난이도(JLPT 집계) + 단어장. 첫 사용 가이드(스포트라이트+프로그래스).
 * UI 톤: 토스풍. 저장=localStorage(프로토타입). */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import RubyText from './RubyText'
import { BreakdownTable, BreakdownCards } from './BreakdownPanel'
import { STUDY_DEMO } from '../data/studyDemo'

const PRIMARY = '#5CA9CE'
const GREEN = '#1D9E75'
const API_URL = 'https://japan-intonation-production.up.railway.app'
const RATES = [0.5, 0.75, 1, 1.25, 1.5]
const SHOW_KEYS = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false

const ORDER = ['N5', 'N4', 'N3', 'N2', 'N1']
const JLPT = { N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F' }
const LV_LABEL = { N5: '입문', N4: '초급', N3: '중급', N2: '중상급', N1: '상급' }
const jcolor = (lv) => JLPT[lv] || '#9aa5b1'
const hasKanji = (s) => /[一-鿿々〆]/.test(s || '')

const LS_LINES = 'tickjapan_study_saved_lines'
const LS_WORDS = 'tickjapan_study_saved_words'
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

export default function StudyVideoDemo() {
  const data = STUDY_DEMO
  const vid = data.videoId
  const lines = data.lines
  const playerRef = useRef(null)
  const lineRefs = useRef([])
  const headRef = useRef(null)
  const activeRef = useRef(-1)
  const loopRef = useRef(-1)
  const detailRef = useRef(null)
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 900 : false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [loopIdx, setLoopIdx] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rateIdx, setRateIdx] = useState(2)
  const [hideKr, setHideKr] = useState(false)
  const [hideJp, setHideJp] = useState(false)
  const [showCap, setShowCap] = useState(true)
  const [showWords, setShowWords] = useState(true)
  const [headH, setHeadH] = useState(0)
  const [openSummary, setOpenSummary] = useState(false)
  const [openVocab, setOpenVocab] = useState(false)
  const [savedLines, setSavedLines] = useState(() => lsLoad(LS_LINES))
  const [savedWords, setSavedWords] = useState(() => lsLoad(LS_WORDS))
  const [panel, setPanel] = useState(null)
  const [popWord, setPopWord] = useState(null)
  const [detailIdx, setDetailIdx] = useState(null)
  const [tour, setTour] = useState(false)

  useEffect(() => { const f = () => setIsWide(window.innerWidth >= 900); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  useEffect(() => lsSave(LS_LINES, savedLines), [savedLines])
  useEffect(() => lsSave(LS_WORDS, savedWords), [savedWords])
  useEffect(() => { try { if (!localStorage.getItem('tickjapan_study_onboarded')) { const id = setTimeout(() => setTour(true), 700); return () => clearTimeout(id) } } catch {} }, [])
  const startTour = () => { window.scrollTo({ top: 0 }); setTour(true) }
  const closeTour = () => { setTour(false); try { localStorage.setItem('tickjapan_study_onboarded', '1') } catch {} }

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
    lines.forEach((ln, i) => (ln.words || []).forEach(w => { const k = `${w.w}|${w.reading}`; if (!map.has(k)) map.set(k, { ...w, lineIdx: i }) }))
    const all = [...map.values()]
    const byLevel = {}; ORDER.forEach(lv => { byLevel[lv] = all.filter(w => w.jlpt === lv) })
    return { all, byLevel, count: all.length }
  }, [])

  // ── 플레이어 제어 ─────────────────────────────────
  const seekLine = (i) => {
    const p = playerRef.current
    if (!p || !p.seekTo || i < 0 || i >= lines.length) return
    p.seekTo(Math.max(0, lines[i].t - 0.15), true)
    if (p.playVideo) p.playVideo()
    activeRef.current = i; setActiveIdx(i)
    if (loopRef.current >= 0) { loopRef.current = i; setLoopIdx(i) }
  }
  const goPrev = () => seekLine(Math.max(0, (activeRef.current < 0 ? 0 : activeRef.current) - 1))
  const goNext = () => seekLine(Math.min(lines.length - 1, (activeRef.current < 0 ? -1 : activeRef.current) + 1))
  const replay = () => seekLine(activeRef.current < 0 ? 0 : activeRef.current)
  const togglePlay = () => { const p = playerRef.current; if (!p || !p.getPlayerState) return; if (p.getPlayerState() === 1) p.pauseVideo(); else p.playVideo() }
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
    let timer, cancelled = false
    loadYT().then(YT => {
      if (cancelled || !YT) return
      playerRef.current = new YT.Player('yt-player-demo', {
        videoId: vid,
        playerVars: { rel: 0, modestbranding: 1, cc_load_policy: 0, playsinline: 1 },
        events: {
          onStateChange: (e) => setIsPlaying(e.data === 1),
          onReady: () => {
            timer = setInterval(() => {
              const p = playerRef.current
              if (!p || !p.getCurrentTime) return
              let t; try { t = p.getCurrentTime() } catch { return }
              let idx = -1
              for (let i = 0; i < lines.length; i++) { if (lines[i].t <= t + 0.15) idx = i; else break }
              const li = loopRef.current
              if (li >= 0) { const endT = lines[li + 1] ? lines[li + 1].t : Infinity; if (t >= endT - 0.12) { try { p.seekTo(lines[li].t, true) } catch {} } idx = li }
              if (idx !== activeRef.current) { activeRef.current = idx; setActiveIdx(idx) }
            }, 200)
          },
        },
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
        case 'c': case 'C': e.preventDefault(); setShowCap(v => !v); break
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
  const ov = jcolor(stat.overall)

  // ── 공유 블록 ──────────────────────────────────────
  const bannerBlock = (
    <>
      <div data-tour="level" style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 14px', borderRadius: 16, background: `${ov}14`, border: `1px solid ${ov}44` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 54, padding: '6px 0', borderRadius: 12, background: ov, color: '#fff', lineHeight: 1, boxShadow: `0 4px 12px ${ov}55` }}>
          <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.92 }}>JLPT</span>
          <span style={{ fontSize: 21, fontWeight: 900, marginTop: 3 }}>{stat.overall}</span>
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
              <b style={{ color: 'var(--text-strong)' }}>난이도 집계</b> — 등장 단어 {stat.total}개 중 <b style={{ color: ov }}>{stat.covPct}%가 {stat.overall} 이하</b>라 권장 <b style={{ color: ov }}>{stat.overall} ({LV_LABEL[stat.overall]})</b>
            </p>
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden' }}>
              {ORDER.map(lv => stat.counts[lv] > 0 && (<div key={lv} title={`${lv} ${stat.counts[lv]}`} style={{ width: `${stat.counts[lv] / stat.total * 100}%`, background: jcolor(lv) }} />))}
            </div>
            <div style={{ display: 'flex', gap: 11, flexWrap: 'wrap', marginTop: 9, fontSize: 11, color: 'var(--text-3)' }}>
              {ORDER.map(lv => (<span key={lv} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><i style={{ width: 9, height: 9, borderRadius: 3, background: jcolor(lv), display: 'inline-block' }} />{lv} {stat.counts[lv]}</span>))}
              <span style={{ opacity: 0.7 }}>· JLPT는 추정치</span>
            </div>
          </div>
        </div>
      )}
    </>
  )

  const videoBlock = (
    <div style={{ position: 'relative', margin: '0 auto', borderRadius: 16, overflow: 'hidden', background: '#000', boxShadow: '0 6px 22px rgba(0,0,0,0.18)',
      ...(isWide ? { width: '100%', aspectRatio: '16 / 9', maxHeight: '60vh' } : { aspectRatio: '16 / 9', width: 'auto', maxWidth: '100%', height: 'min(42vh, calc((min(100vw, 720px) - 24px) * 0.5625))' }) }}>
      <div id="yt-player-demo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {showCap && cur && (
        <div style={{ position: 'absolute', left: '50%', bottom: '8%', transform: 'translateX(-50%)', maxWidth: '92%', padding: '8px 15px', borderRadius: 12, textAlign: 'center', background: 'rgba(0,0,0,0.64)', backdropFilter: 'blur(3px)', color: '#fff', pointerEvents: 'none' }}>
          <div style={{ lineHeight: 1.5, ...blurStyle(hideJp) }}><RubyText text={cur.furigana_html} fontSize={isWide ? 18 : 16} /></div>
          <p style={{ margin: '2px 0 0', fontSize: isWide ? 14 : 13, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4, ...blurStyle(hideKr) }}>{cur.kr}</p>
        </div>
      )}
    </div>
  )

  const controlsBlock = (
    <>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 6, marginTop: 10 }}>
        <CtrlBtn label="이전" sub="A" glyph="⏮" onClick={goPrev} showKey />
        <CtrlBtn label="다시" sub="S" glyph="↺" onClick={replay} showKey />
        <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" glyph={isPlaying ? '⏸' : '▶'} onClick={togglePlay} primary showKey tour="play" />
        <CtrlBtn label="반복" sub="R" glyph="⟳" onClick={toggleLoop} active={loopIdx >= 0} showKey tour="loop" />
        <CtrlBtn label="다음" sub="D" glyph="⏭" onClick={goNext} showKey />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 7, marginTop: 8 }}>
        <button data-tour="rate" onClick={cycleRate} style={chip(false)}><span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span> 배속{SHOW_KEYS && <KeyHint>Z/X</KeyHint>}</button>
        <span data-tour="hide" style={{ display: 'inline-flex', gap: 7 }}>
          <button onClick={() => setHideJp(v => !v)} style={chip(hideJp)}>{hideJp ? '일본어 보기' : '일본어 가리기'}{SHOW_KEYS && <KeyHint>J</KeyHint>}</button>
          <button onClick={() => setHideKr(v => !v)} style={chip(hideKr)}>{hideKr ? '한국어 보기' : '한국어 가리기'}{SHOW_KEYS && <KeyHint>H</KeyHint>}</button>
        </span>
        <button onClick={() => setShowCap(v => !v)} style={chip(showCap)}>{showCap ? '영상자막 끄기' : '영상자막 켜기'}{SHOW_KEYS && <KeyHint>C</KeyHint>}</button>
        <button onClick={() => setShowWords(v => !v)} style={chip(showWords)}>단어 {showWords ? '끄기' : '켜기'}</button>
        <span style={{ flex: 1 }} />
        <button data-tour="saved" onClick={() => setPanel('saved')} style={{ ...chip(false), fontWeight: 700 }}>⭐ 저장함 {savedLines.length + savedWords.length}</button>
      </div>
    </>
  )

  const transcriptBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {!isWide && <p style={{ fontSize: 11.5, color: 'var(--text-3)', margin: '2px 4px 4px' }}>문장을 누르면 분해·단어를 자세히 볼 수 있어요</p>}
      {lines.map((ln, i) => {
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
                    {w.w}<span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
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
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(lv), padding: '2px 9px', borderRadius: 7 }}>{lv}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{LV_LABEL[lv]} · {vocab.byLevel[lv].length}개</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 7 }}>
                {vocab.byLevel[lv].map((w, i) => {
                  const ws = isWordSaved(w)
                  return (
                    <div key={i} onClick={() => openPop(w, w.lineIdx)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 11, border: `1px solid ${jcolor(lv)}44`, background: `${jcolor(lv)}10`, cursor: 'pointer' }}>
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
        <span style={{ fontSize: 11.5, fontWeight: 800, color: PRIMARY, letterSpacing: 0.2 }}>영상 학습 · 프로토타입</span>
        <button onClick={startTour} style={{ ...ghostBtn(false), height: 28, fontSize: 11.5, borderColor: PRIMARY, color: PRIMARY, flexShrink: 0 }}>❓ 사용법</button>
      </div>
      <p style={{ fontSize: isWide ? 23 : 20, fontWeight: 800, color: 'var(--text-strong)', margin: '6px 0 3px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.32, wordBreak: 'keep-all' }}>{data.title}</p>
      <p style={{ fontSize: isWide ? 14.5 : 13.5, color: 'var(--text-3)', margin: 0 }}>{data.titleKr}</p>
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
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(w.jlpt), padding: '3px 9px', borderRadius: 7 }}>{w.jlpt || 'JLPT 외'}</span>
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

      {panel === 'saved' && (
        <Sheet onClose={() => setPanel(null)} scrim={0.44} maxH="80vh" wide={isWide}>
          <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 12px' }}>저장함</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '4px 0 7px' }}>저장한 문장·예문 ({savedLines.filter(s => s.vid === vid).length})</p>
          {savedLines.filter(s => s.vid === vid).length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: '0 0 12px', wordBreak: 'keep-all' }}>문장의 북마크를 누르면 여기에 모여요. 누르면 그 장면으로 이동합니다.</p>}
          {savedLines.filter(s => s.vid === vid).map((s) => (
            <div key={s.idx} onClick={() => { setPanel(null); seekLine(s.idx) }} style={{ cursor: 'pointer', padding: '10px 12px', borderRadius: 12, background: 'var(--surface)', marginBottom: 7, display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fmtT(s.t)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13.5, color: 'var(--text-1)' }}>{s.jp}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.kr}</div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(s.idx) }} style={{ border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}>×</button>
            </div>
          ))}
          <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '16px 0 7px' }}>어휘장 ({savedWords.length})</p>
          {savedWords.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: 0 }}>단어를 누른 뒤 저장하면 모여요.</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {savedWords.map((w, i) => (
              <span key={i} onClick={() => openPop(w, vocab.all.find(v => wkey(v) === wkey(w))?.lineIdx ?? 0)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 9, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, fontSize: 12.5 }}>
                <b style={{ fontFamily: "'Noto Sans JP', sans-serif", color: 'var(--text-1)' }}>{w.w}</b>
                <span style={{ color: 'var(--text-3)' }}>{w.ko}</span>
                <span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
              </span>
            ))}
          </div>
        </Sheet>
      )}

      {tour && <StudyOnboarding steps={TOUR_STEPS} onClose={closeTour} />}
    </>
  )

  // ── 데스크톱: 2단(좌 영상 고정 + 우 스크립트) ──────
  if (isWide) {
    return (
      <div style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
        {styleTag}
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '12px 28px 40px' }}>
          <div style={{ marginBottom: 16 }}>{titleBlock}</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 28, alignItems: 'stretch' }}>
            <div style={{ flex: '1.35 1 0', minWidth: 0 }}>
              <div ref={headRef} style={{ position: 'sticky', top: 14, alignSelf: 'flex-start' }}>
                <div style={{ marginBottom: 12 }}>{bannerBlock}</div>
                {videoBlock}
                {controlsBlock}
              </div>
            </div>
            <div style={{ flex: '1 1 0', minWidth: 360, maxWidth: 560 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-2)', margin: '2px 0 8px' }}>스크립트 <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>· 문장을 누르면 분해·단어를 봐요</span></p>
              {transcriptBlock}
              {vocabBlock}
            </div>
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
      <div ref={headRef} style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', padding: '0 10px 10px' }}>
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
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: z, background: `rgba(12,18,24,${scrim})`, display: 'flex', alignItems: wide ? 'center' : 'flex-end', justifyContent: 'center', padding: wide ? 24 : 0, animation: 'tjFade 0.18s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: wide ? 560 : 640, maxHeight: wide ? '86vh' : maxH, overflowY: 'auto', background: 'var(--bg)', borderRadius: wide ? 20 : '22px 22px 0 0', padding: wide ? '20px 20px 22px' : '8px 18px 26px', boxShadow: '0 -12px 44px rgba(0,0,0,0.32)', animation: wide ? 'tjPop 0.22s cubic-bezier(0.16,1,0.3,1)' : 'tjUp 0.3s cubic-bezier(0.16,1,0.3,1)' }}>
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
        <MiniCtl glyph="⏮" label="이전" k="A" onClick={onPrev} />
        <MiniCtl glyph={isPlaying ? '⏸' : '▶'} label={isPlaying ? '정지' : '재생'} k="Space" onClick={onTogglePlay} />
        <MiniCtl glyph="↺" label="다시" k="S" onClick={onPlayLine} />
        <MiniCtl glyph="⟳" label="반복" k="R" on={isLooping} onClick={onLoopLine} />
        <MiniCtl glyph="⏭" label="다음" k="D" onClick={onNext} />
      </div>

      {/* 문장 분해 — 수동 실행 */}
      <div style={{ border: `1.5px solid ${PRIMARY}`, borderRadius: 15, overflow: 'hidden' }}>
        <div style={{ background: `${PRIMARY}14`, padding: '12px 15px', borderBottom: `1px solid ${PRIMARY}33` }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>📝 문장 분해</p>
          <p style={{ margin: '3px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>왜 이렇게 만들어졌을까 — 단어·문법·활용 원리를 쉽게</p>
        </div>
        <div style={{ padding: '14px 15px' }}>
          {state === 'idle' && (
            <>
              <button onClick={load} style={{ width: '100%', height: 48, borderRadius: 12, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 800, fontSize: 14.5, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 16px ${PRIMARY}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>📝 문장 분해 보기</button>
              <p style={{ margin: '9px 0 0', fontSize: 11.5, color: 'var(--text-3)', textAlign: 'center' }}>누르면 단어·문법·활용 원리를 풀어드려요</p>
            </>
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
                <button key={wi} onClick={() => onOpenWord(w)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 10px', borderRadius: 10, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Furi w={w.w} reading={w.reading} size={14} />
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{w.ko}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
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
  { sel: 'loop', title: '문장 반복', desc: '한 문장을 반복 재생해 따라 말해보세요. 이전·다시·다음은 A·S·D 키예요.' },
  { sel: 'rate', title: '배속', desc: '익숙해질 때까지 천천히 들어요. Z 느리게, X 빠르게.' },
  { sel: 'hide', title: '일본어·한국어 가리기', desc: '일본어를 가리면 작문 연습, 한국어를 가리면 받아쓰기. 번갈아 해보세요.' },
  { sel: 'line', title: '문장을 누르면 자세히', desc: '문장을 누르면 문장 분해와 단어 레벨을 볼 수 있어요. 히라가나만 알아도 이해되게 풀어드려요.' },
  { sel: 'bookmark', title: '북마크로 저장', desc: '마음에 든 문장은 북마크하세요. 저장함에서 다시 보고 그 장면으로 이동해요.' },
]

function StudyOnboarding({ steps, onClose }) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
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
  const next = () => { if (last) onClose(); else setI(v => v + 1) }
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
        <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.62, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{step.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>건너뛰기</button>
          <span style={{ flex: 1 }} />
          {i > 0 && <button onClick={prev} style={{ ...ghostBtn(false), height: 38 }}>이전</button>}
          <button onClick={next} style={{ height: 38, padding: '0 18px', borderRadius: 11, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `0 6px 16px ${PRIMARY}55` }}>{last ? '시작하기' : '다음'}</button>
        </div>
      </div>
    </div>
  )
}

// ── 보조 컴포넌트/스타일 ──────────────────────────────
function CtrlBtn({ label, sub, glyph, onClick, primary, active, showKey, tour }) {
  return (
    <button onClick={onClick} aria-label={label} data-tour={tour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '9px 2px 6px', borderRadius: 13, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${active ? PRIMARY : (primary ? 'transparent' : 'var(--bd)')}`, background: active ? `${PRIMARY}18` : (primary ? PRIMARY : 'var(--surface)'), color: primary ? '#fff' : (active ? PRIMARY : 'var(--text-1)'), boxShadow: primary ? `0 6px 16px ${PRIMARY}44` : 'none', transition: 'background 0.14s, border-color 0.14s' }}>
      <span style={{ fontSize: 17, lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
      {showKey && SHOW_KEYS && <span style={{ fontSize: 9, opacity: 0.55, lineHeight: 1 }}>{sub}</span>}
    </button>
  )
}
function chip(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? `${PRIMARY}18` : 'var(--surface)', color: active ? PRIMARY : 'var(--text-1)', transition: 'background 0.14s' }
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
function MiniCtl({ glyph, label, k, on, onClick }) {
  return (
    <button onClick={onClick} aria-label={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, height: 48, borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? `${PRIMARY}18` : 'transparent', color: on ? PRIMARY : 'var(--text-1)' }}>
      <span style={{ fontSize: 15, lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 10, fontWeight: 700, lineHeight: 1 }}>{label}</span>
      {SHOW_KEYS && <span style={{ fontSize: 8.5, opacity: 0.5, lineHeight: 1 }}>{k}</span>}
    </button>
  )
}
