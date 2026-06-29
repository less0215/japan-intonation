/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 영상 위 자막 오버레이 + 현재 줄 하이라이트·자동 스크롤. 시드=studyDemo.js.
 * 쉐도잉 단축키 + 컨트롤 바. 일본어/한국어 가리기(작문·받아쓰기), 단어 칩(JLPT), 단어 팝업.
 * 문장 클릭 → 문장 상세(단어별 레벨 + 문장 분해/활용 원리 = /breakdown 재활용). 북마크 저장.
 * 요약 펼치기 + 영상 난이도(JLPT 집계) + 하단 단어장. 첫 사용 스포트라이트 가이드(프로그래스바).
 * 참고 UX: Language Reactor / Migaku / Yomitan. 저장은 프로토타입이라 localStorage. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import RubyText from './RubyText'
import { ExampleAnalysis } from './BreakdownPanel'
import { STUDY_DEMO } from '../data/studyDemo'

const PRIMARY = '#5CA9CE'
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
  const [popWord, setPopWord] = useState(null)   // { word, lineIdx }
  const [detailIdx, setDetailIdx] = useState(null)   // 문장 상세 모달
  const [tour, setTour] = useState(false)

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

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || ''
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'a': case 'A': case 'ArrowLeft': e.preventDefault(); goPrev(); break
        case 'd': case 'D': case 'ArrowRight': e.preventDefault(); goNext(); break
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

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 0 90px' }}>
      <div style={{ padding: '4px 4px 10px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>영상 학습 · 프로토타입</span>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', margin: '5px 0 2px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>{data.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: '0 0 8px' }}>{data.titleKr}</p>

        <div data-tour="level" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 13, background: `${jcolor(stat.overall)}14`, border: `1px solid ${jcolor(stat.overall)}55`, borderLeft: `5px solid ${jcolor(stat.overall)}` }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 50, padding: '5px 0', borderRadius: 10, background: jcolor(stat.overall), color: '#fff', lineHeight: 1 }}>
            <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.92 }}>JLPT</span>
            <span style={{ fontSize: 20, fontWeight: 900, marginTop: 3 }}>{stat.overall}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: 'var(--text-strong)', wordBreak: 'keep-all' }}>이 영상은 JLPT {stat.overall} 수준이에요</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{LV_LABEL[stat.overall]} · 등장 단어의 {stat.covPct}%가 {stat.overall} 이하</p>
          </div>
          <button onClick={() => setOpenSummary(v => !v)} style={{ ...subBtn(openSummary), fontWeight: 700, flexShrink: 0 }}>요약 {openSummary ? '▲' : '▼'}</button>
        </div>
        <div style={{ textAlign: 'right', marginTop: 5 }}>
          <button onClick={startTour} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 11.5, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>사용법 다시 보기</button>
        </div>

        {openSummary && (
          <div style={{ marginTop: 8, padding: 14, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
            <p style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-1)', wordBreak: 'keep-all' }}>{data.summary}</p>
            {data.points && (
              <ul style={{ margin: '0 0 12px', paddingLeft: 18, color: 'var(--text-2)' }}>
                {data.points.map((p, i) => <li key={i} style={{ fontSize: 12.5, lineHeight: 1.7, wordBreak: 'keep-all' }}>{p}</li>)}
              </ul>
            )}
            <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 10 }}>
              <p style={{ margin: '0 0 7px', fontSize: 12, color: 'var(--text-2)', wordBreak: 'keep-all' }}>
                <b style={{ color: 'var(--text-strong)' }}>난이도 집계</b> — 등장 단어 {stat.total}개 중 <b style={{ color: jcolor(stat.overall) }}>{stat.covPct}%가 {stat.overall} 이하</b> → 권장 <b style={{ color: jcolor(stat.overall) }}>{stat.overall} ({LV_LABEL[stat.overall]})</b>
              </p>
              <div style={{ display: 'flex', height: 11, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--bd)' }}>
                {ORDER.map(lv => stat.counts[lv] > 0 && (<div key={lv} title={`${lv} ${stat.counts[lv]}`} style={{ width: `${stat.counts[lv] / stat.total * 100}%`, background: jcolor(lv) }} />))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 7, fontSize: 10.5, color: 'var(--text-3)' }}>
                {ORDER.map(lv => (<span key={lv} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><i style={{ width: 9, height: 9, borderRadius: 3, background: jcolor(lv), display: 'inline-block' }} />{lv} {stat.counts[lv]}</span>))}
                <span style={{ opacity: 0.7 }}>· JLPT는 추정치</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 영상 + 컨트롤 — 상단 고정 */}
      <div ref={headRef} style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', paddingBottom: 8 }}>
        <div style={{ position: 'relative', margin: '0 auto', borderRadius: 14, overflow: 'hidden', background: '#000', aspectRatio: '16 / 9', width: 'auto', maxWidth: '100%', height: 'min(44vh, calc((min(100vw, 720px) - 8px) * 0.5625))' }}>
          <div id="yt-player-demo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          {showCap && cur && (
            <div style={{ position: 'absolute', left: '50%', bottom: '8%', transform: 'translateX(-50%)', maxWidth: '92%', padding: '7px 14px', borderRadius: 10, textAlign: 'center', background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(2px)', color: '#fff', pointerEvents: 'none' }}>
              <div style={{ lineHeight: 1.5, ...blurStyle(hideJp) }}><RubyText text={cur.furigana_html} fontSize={16} /></div>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4, ...blurStyle(hideKr) }}>{cur.kr}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, marginTop: 8 }}>
          <CtrlBtn label="이전" sub="A" glyph="⏮" onClick={goPrev} showKey />
          <CtrlBtn label="다시" sub="S" glyph="↺" onClick={replay} showKey />
          <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" glyph={isPlaying ? '⏸' : '▶'} onClick={togglePlay} primary showKey tour="play" />
          <CtrlBtn label="반복" sub="R" glyph="⟳" onClick={toggleLoop} active={loopIdx >= 0} showKey tour="loop" />
          <CtrlBtn label="다음" sub="D" glyph="⏭" onClick={goNext} showKey />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          <button data-tour="rate" onClick={cycleRate} style={subBtn(false)}><span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span> 배속{SHOW_KEYS && <KeyHint>Z/X</KeyHint>}</button>
          <span data-tour="hide" style={{ display: 'inline-flex', gap: 6 }}>
            <button onClick={() => setHideJp(v => !v)} style={subBtn(hideJp)}>{hideJp ? '일본어 보기' : '일본어 가리기'}{SHOW_KEYS && <KeyHint>J</KeyHint>}</button>
            <button onClick={() => setHideKr(v => !v)} style={subBtn(hideKr)}>{hideKr ? '한국어 보기' : '한국어 가리기'}{SHOW_KEYS && <KeyHint>H</KeyHint>}</button>
          </span>
          <button onClick={() => setShowCap(v => !v)} style={subBtn(showCap)}>{showCap ? '영상자막 끄기' : '영상자막 켜기'}{SHOW_KEYS && <KeyHint>C</KeyHint>}</button>
          <button onClick={() => setShowWords(v => !v)} style={subBtn(showWords)}>단어 {showWords ? '끄기' : '켜기'}</button>
          <span style={{ flex: 1 }} />
          <button data-tour="saved" onClick={() => setPanel('saved')} style={{ ...subBtn(false), fontWeight: 700 }}>⭐ 저장함 ({savedLines.length + savedWords.length})</button>
        </div>
      </div>

      {/* 타임라인 스크립트 — 줄 클릭=문장 상세 / 북마크=저장 / 칩=단어 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lines.map((ln, i) => {
          const on = i === activeIdx
          const saved = isLineSaved(i)
          return (
            <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => setDetailIdx(i)}
              data-tour={i === 0 ? 'line' : undefined}
              style={{ position: 'relative', cursor: 'pointer', padding: '10px 40px 10px 12px', borderRadius: 10, scrollMarginTop: headH + 14, background: on ? 'var(--primary-tint)' : 'transparent', borderLeft: `3px solid ${on ? PRIMARY : 'transparent'}`, transition: 'background 0.15s' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>{fmtT(ln.t)}</div>
              <div style={blurStyle(hideJp)}><RubyText text={ln.furigana_html} fontSize={15.5} /></div>
              <p style={{ margin: '3px 0 0', fontSize: 13, lineHeight: 1.5, color: on ? 'var(--text-1)' : 'var(--text-2)', ...blurStyle(hideKr) }}>{ln.kr}</p>

              {showWords && on && ln.words && ln.words.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                  {ln.words.map((w, wi) => (
                    <button key={wi} onClick={(e) => { e.stopPropagation(); openPop(w, i) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer', fontSize: 12.5, color: 'var(--text-2)', fontFamily: "'Noto Sans JP', sans-serif" }}>
                      {w.w}<span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
                    </button>
                  ))}
                </div>
              )}

              <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(i) }} aria-label="문장 북마크" data-tour={i === 0 ? 'bookmark' : undefined}
                style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 8, cursor: 'pointer', border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bookmark filled={saved} color={saved ? '#1D9E75' : 'var(--text-3)'} />
              </button>
            </div>
          )
        })}
      </div>

      {/* 하단 — 이 영상 단어장 */}
      <div style={{ marginTop: 16, padding: '0 4px' }}>
        <button onClick={() => setOpenVocab(v => !v)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-1)', fontSize: 14, fontWeight: 700 }}>
          <span>📚 이 영상 단어장 · {vocab.count}단어 (레벨별)</span><span>{openVocab ? '▲' : '▼'}</span>
        </button>
        {openVocab && (
          <div style={{ marginTop: 8 }}>
            {ORDER.map(lv => vocab.byLevel[lv].length > 0 && (
              <div key={lv} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 7px' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(lv), padding: '2px 8px', borderRadius: 6 }}>{lv}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{LV_LABEL[lv]} · {vocab.byLevel[lv].length}개</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6 }}>
                  {vocab.byLevel[lv].map((w, i) => {
                    const ws = isWordSaved(w)
                    return (
                      <div key={i} onClick={() => openPop(w, w.lineIdx)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 9px', borderRadius: 9, border: `1px solid ${jcolor(lv)}55`, background: `${jcolor(lv)}12`, cursor: 'pointer' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ lineHeight: 1.3 }}><Furi w={w.w} reading={w.reading} size={14.5} /></div>
                          <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.ko}</div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleSaveWord(w) }} aria-label="단어 저장" style={{ border: 'none', background: 'transparent', display: 'flex', cursor: 'pointer' }}>
                          <Bookmark filled={ws} color={ws ? '#1D9E75' : 'var(--text-3)'} size={15} />
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

      {/* 단어 팝업 */}
      {popWord && (() => {
        const w = popWord.word, li = popWord.lineIdx, ln = lines[li], lnSaved = isLineSaved(li)
        return (
          <div onClick={() => setPopWord(null)} style={backdrop}>
            <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}>
                <Furi w={w.w} reading={w.reading} size={26} />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(w.jlpt), padding: '2px 8px', borderRadius: 6 }}>{w.jlpt || 'JLPT 외'}</span>
              </div>
              <p style={{ margin: '4px 0 14px', fontSize: 16, color: 'var(--text-1)', fontWeight: 600 }}>{w.ko || '—'}</p>
              {ln && (
                <div onClick={() => { setPopWord(null); seekLine(li) }} style={{ cursor: 'pointer', padding: '9px 11px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--bd)', marginBottom: 12 }}>
                  <div style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 700, marginBottom: 3 }}>예문 · {fmtT(ln.t)} ▶ 누르면 그 장면으로</div>
                  <RubyText text={ln.furigana_html} fontSize={14} />
                  <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-2)' }}>{ln.kr}</p>
                </div>
              )}
              <div style={{ display: 'flex', gap: 7 }}>
                <button onClick={() => toggleSaveWord(w)} style={popBtn(isWordSaved(w))}>{isWordSaved(w) ? '★ 단어 저장됨' : '☆ 단어 저장'}</button>
                <button onClick={() => toggleSaveLine(li)} style={popBtn(lnSaved)}>{lnSaved ? '★ 예문 저장됨' : '☆ 예문 저장'}</button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* 문장 상세 — 단어별 레벨 + 문장 분해(왜 이렇게 만들어졌나) */}
      {detailIdx != null && (() => {
        const ln = lines[detailIdx], dSaved = isLineSaved(detailIdx)
        return (
          <div onClick={() => setDetailIdx(null)} style={backdrop}>
            <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 480, maxHeight: '86vh', overflowY: 'auto', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>문장 분석 · {fmtT(ln.t)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button onClick={() => toggleSaveLine(detailIdx)} aria-label="문장 북마크" style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', padding: 4 }}><Bookmark filled={dSaved} color={dSaved ? '#1D9E75' : 'var(--text-3)'} /></button>
                  <button onClick={() => setDetailIdx(null)} style={{ border: 'none', background: 'transparent', fontSize: 22, color: 'var(--text-3)', cursor: 'pointer' }}>×</button>
                </div>
              </div>

              <div style={{ lineHeight: 1.6 }}><RubyText text={ln.furigana_html} fontSize={19} /></div>
              <p style={{ margin: '5px 0 12px', fontSize: 14, color: 'var(--text-2)' }}>{ln.kr}</p>

              <button onClick={() => { setDetailIdx(null); seekLine(detailIdx) }} style={{ width: '100%', height: 42, borderRadius: 11, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 14 }}>▶ 이 장면부터 재생</button>

              {ln.words && ln.words.length > 0 && (
                <>
                  <p style={{ margin: '0 0 7px', fontSize: 12.5, fontWeight: 700, color: 'var(--text-strong)' }}>이 문장의 단어 (JLPT)</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                    {ln.words.map((w, wi) => (
                      <button key={wi} onClick={() => openPop(w, detailIdx)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 9px', borderRadius: 9, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, cursor: 'pointer', fontFamily: 'inherit' }}>
                        <Furi w={w.w} reading={w.reading} size={14} />
                        <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{w.ko}</span>
                        <span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* 문장 분해 (단어 단위 + 히라가나 + 한글발음 + 뜻 + 품사 + 활용 원리) */}
              <p style={{ margin: '14px 0 0', fontSize: 12.5, fontWeight: 700, color: 'var(--text-strong)' }}>문장 분해 · 왜 이렇게 만들어졌을까</p>
              <ExampleAnalysis japaneseText={ln.jp} />
            </div>
          </div>
        )
      })()}

      {/* 저장함 */}
      {panel === 'saved' && (
        <div onClick={() => setPanel(null)} style={backdrop}>
          <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 460, maxHeight: '78vh', overflowY: 'auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-strong)' }}>저장함</span>
              <button onClick={() => setPanel(null)} style={{ border: 'none', background: 'transparent', fontSize: 22, color: 'var(--text-3)', cursor: 'pointer' }}>×</button>
            </div>
            <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '4px 0 6px' }}>저장한 문장·예문 ({savedLines.filter(s => s.vid === vid).length})</p>
            {savedLines.filter(s => s.vid === vid).length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: '0 0 10px' }}>줄의 북마크 또는 단어 팝업의 ‘예문 저장’으로 저장하세요. 누르면 그 장면으로 이동합니다.</p>}
            {savedLines.filter(s => s.vid === vid).map((s) => (
              <div key={s.idx} onClick={() => { setPanel(null); seekLine(s.idx) }} style={{ cursor: 'pointer', padding: '8px 10px', borderRadius: 9, background: 'var(--surface)', marginBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fmtT(s.t)}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 13.5, color: 'var(--text-1)' }}>{s.jp}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.kr}</div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(s.idx) }} style={{ border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}>×</button>
              </div>
            ))}
            <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '14px 0 6px' }}>어휘장 ({savedWords.length})</p>
            {savedWords.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: 0 }}>단어 칩이나 단어장에서 저장하세요.</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {savedWords.map((w, i) => (
                <span key={i} onClick={() => openPop(w, vocab.all.find(v => wkey(v) === wkey(w))?.lineIdx ?? 0)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 8, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, fontSize: 12.5 }}>
                  <b style={{ fontFamily: "'Noto Sans JP', sans-serif", color: 'var(--text-1)' }}>{w.w}</b>
                  <span style={{ color: 'var(--text-3)' }}>{w.ko}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tour && <StudyOnboarding steps={TOUR_STEPS} onClose={closeTour} />}
    </div>
  )
}

// ── 첫 사용 가이드 (대상만 또렷, 주변 블러+딤, 프로그래스바) ──
const TOUR_STEPS = [
  { sel: 'level', title: '이 영상의 난이도', desc: '영상에 나온 단어를 모아 JLPT 레벨을 추정했어요. ‘요약’을 누르면 줄거리·난이도 분석도 볼 수 있어요.' },
  { sel: 'play', title: '재생', desc: '재생하면 자막이 문장별로 따라 강조돼요. 스페이스바로도 재생·정지할 수 있어요.' },
  { sel: 'loop', title: '문장 반복 (쉐도잉)', desc: '한 문장을 계속 반복 재생해요 — 쉐도잉의 핵심! 이전·다시·다음은 A·S·D 키예요.' },
  { sel: 'rate', title: '배속', desc: '익숙해질 때까지 느리게 들어보세요. Z(느리게)·X(빠르게).' },
  { sel: 'hide', title: '일본어 / 한국어 가리기', desc: '일본어를 가리고 한국어만 보며 작문하거나, 한국어를 가리고 들으며 받아쓰기 — 번갈아 연습할 수 있어요. (J / H)' },
  { sel: 'line', title: '문장을 누르면 자세히', desc: '문장을 누르면 단어별 레벨과 ‘문장 분해(왜 이렇게 만들어졌는지)’까지 펼쳐져요. 히라가나만 알아도 이해되게 풀어드려요.' },
  { sel: 'bookmark', title: '북마크로 저장', desc: '마음에 든 문장은 북마크로 저장해요. 저장한 문장·단어는 ⭐저장함에 모이고, 누르면 그 장면으로 이동해요.' },
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
  const cardW = Math.min(330, vw - 24)
  const below = r ? (r.y + r.h + 185 < vh) : true
  const cardLeft = r ? Math.min(Math.max(12, r.x), vw - cardW - 12) : (vw - cardW) / 2
  const cardTop = r ? (below ? r.y + r.h + 12 : null) : Math.max(40, (vh - 220) / 2)
  const cardBottom = (r && !below) ? (vh - r.y + 12) : null
  const pct = Math.round((i + 1) / steps.length * 100)

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 6000 }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,12,16,0.55)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', clipPath: clip, transition: 'clip-path 0.25s ease', pointerEvents: 'none' }} />
      {r && <div style={{ position: 'fixed', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 12, border: `2px solid ${PRIMARY}`, boxShadow: `0 0 0 3px ${PRIMARY}55, 0 8px 30px rgba(0,0,0,0.45)`, pointerEvents: 'none', transition: 'all 0.25s ease' }} />}
      <div onClick={next} style={{ position: 'fixed', inset: 0, pointerEvents: 'auto', cursor: 'pointer' }} />
      <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', left: cardLeft, top: cardTop ?? undefined, bottom: cardBottom ?? undefined, width: cardW, zIndex: 6002, background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 14, padding: 16, boxShadow: '0 18px 50px rgba(0,0,0,0.45)', pointerEvents: 'auto' }}>
        {/* 프로그래스바 */}
        <div style={{ height: 5, borderRadius: 3, background: 'var(--bd)', overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: PRIMARY, borderRadius: 3, transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, marginBottom: 4 }}>{i + 1} / {steps.length}</div>
        <p style={{ margin: '0 0 5px', fontSize: 15, fontWeight: 800, color: 'var(--text-strong)', wordBreak: 'keep-all' }}>{step.title}</p>
        <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{step.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit' }}>건너뛰기</button>
          <span style={{ flex: 1 }} />
          {i > 0 && <button onClick={prev} style={{ ...subBtn(false), height: 36 }}>이전</button>}
          <button onClick={next} style={{ height: 36, padding: '0 16px', borderRadius: 10, border: 'none', background: PRIMARY, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>{last ? '시작하기' : '다음'}</button>
        </div>
      </div>
    </div>
  )
}

// ── 보조 컴포넌트/스타일 ──────────────────────────────
function CtrlBtn({ label, sub, glyph, onClick, primary, active, showKey, tour }) {
  return (
    <button onClick={onClick} aria-label={label} data-tour={tour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, padding: '7px 2px 5px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? 'var(--primary-tint)' : (primary ? PRIMARY : 'var(--surface)'), color: primary ? '#fff' : (active ? PRIMARY : 'var(--text-1)'), transition: 'background 0.12s, border-color 0.12s' }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
      {showKey && SHOW_KEYS && <span style={{ fontSize: 9, opacity: 0.6, lineHeight: 1 }}>{sub}</span>}
    </button>
  )
}
function subBtn(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 11px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? 'var(--primary-tint)' : 'var(--surface)', color: active ? PRIMARY : 'var(--text-1)' }
}
function popBtn(active) {
  return { flex: 1, height: 42, borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', border: active ? '1px solid #1D9E75' : '1px solid var(--bd)', background: active ? 'transparent' : PRIMARY, color: active ? '#1D9E75' : '#fff' }
}
function KeyHint({ children }) {
  return <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 4px', borderRadius: 4, background: 'var(--bd)', color: 'var(--text-3)', fontWeight: 700 }}>{children}</span>
}
const backdrop = { position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(15,23,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const card = { width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 16, padding: 18, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }
