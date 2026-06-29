/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 영상 위 자막 오버레이 + 줄 클릭 점프 + 현재 줄 하이라이트·자동 스크롤. 시드=studyDemo.js.
 * 쉐도잉 단축키(웹) + 컨트롤 바(웹·앱). 단어 칩(JLPT 색상)·단어 팝업(읽기/뜻/예문/저장).
 * 요약 펼치기 + 영상 난이도(단어 JLPT 집계) + 하단 단어장(후리가나·레벨별·저장).
 * 참고 UX: Language Reactor / Migaku(레벨 색상) / Yomitan(클릭 사전). 저장은 프로토타입이라 localStorage. */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import RubyText from './RubyText'
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

// 후리가나 표기 (한자 포함 단어만 ruby)
function Furi({ w, reading, size = 16 }) {
  const f = { fontFamily: "'Noto Sans JP', sans-serif", fontSize: size }
  if (hasKanji(w) && reading && reading !== w)
    return <ruby style={f}>{w}<rt style={{ fontSize: size * 0.52, color: 'var(--text-3)' }}>{reading}</rt></ruby>
  return <span style={f}>{w}</span>
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
  const [showCap, setShowCap] = useState(true)
  const [showWords, setShowWords] = useState(true)
  const [headH, setHeadH] = useState(0)
  const [openSummary, setOpenSummary] = useState(false)
  const [openVocab, setOpenVocab] = useState(false)
  const [savedLines, setSavedLines] = useState(() => lsLoad(LS_LINES))
  const [savedWords, setSavedWords] = useState(() => lsLoad(LS_WORDS))
  const [panel, setPanel] = useState(null)
  const [popWord, setPopWord] = useState(null)   // { word, lineIdx }

  useEffect(() => lsSave(LS_LINES, savedLines), [savedLines])
  useEffect(() => lsSave(LS_WORDS, savedWords), [savedWords])

  // 영상 난이도 = 등장 단어의 JLPT 집계 (쉬움→어려움 누적 80% 도달 레벨)
  const stat = useMemo(() => {
    const counts = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 }
    let total = 0
    for (const ln of lines) for (const w of (ln.words || [])) if (counts[w.jlpt] != null) { counts[w.jlpt]++; total++ }
    let cum = 0, overall = 'N1', covPct = 100
    for (const lv of ORDER) { cum += counts[lv]; if (total && cum / total >= 0.8) { overall = lv; covPct = Math.round(cum / total * 100); break } }
    return { counts, total, overall, covPct }
  }, [])

  // 영상 단어장 = 중복 제거(첫 등장 줄 기록), 레벨별 그룹
  const vocab = useMemo(() => {
    const map = new Map()
    lines.forEach((ln, i) => (ln.words || []).forEach(w => {
      const k = `${w.w}|${w.reading}`
      if (!map.has(k)) map.set(k, { ...w, lineIdx: i })
    }))
    const all = [...map.values()]
    const byLevel = {}
    ORDER.forEach(lv => { byLevel[lv] = all.filter(w => w.jlpt === lv) })
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
        case 'c': case 'C': e.preventDefault(); setShowCap(v => !v); break
        case 'z': case 'Z': e.preventDefault(); stepRate(-1); break
        case 'x': case 'X': e.preventDefault(); stepRate(1); break
        case ' ': e.preventDefault(); togglePlay(); break
        case 'Escape': setPopWord(null); setPanel(null); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cur = activeIdx >= 0 ? lines[activeIdx] : null
  const openPop = (w, lineIdx) => setPopWord({ word: w, lineIdx })

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 0 90px' }}>
      <div style={{ padding: '4px 4px 10px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>영상 학습 · 프로토타입</span>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', margin: '5px 0 2px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>{data.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: '0 0 8px' }}>{data.titleKr}</p>

        {/* 영상 레벨 배지 + 요약 펼치기 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 9, background: `${jcolor(stat.overall)}1f`, border: `1px solid ${jcolor(stat.overall)}`, fontSize: 12.5, fontWeight: 800, color: jcolor(stat.overall) }}>
            이 영상 레벨 · JLPT {stat.overall} <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{LV_LABEL[stat.overall]}</span>
          </span>
          <button onClick={() => setOpenSummary(v => !v)} style={{ ...subBtn(openSummary), fontWeight: 700 }}>요약 · 난이도 {openSummary ? '▲' : '▼'}</button>
        </div>

        {/* 요약 + 난이도 집계 (펼침) */}
        {openSummary && (
          <div style={{ marginTop: 10, padding: 14, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
            <p style={{ margin: '0 0 10px', fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-1)' }}>{data.summary}</p>
            {data.points && (
              <ul style={{ margin: '0 0 12px', paddingLeft: 18, color: 'var(--text-2)' }}>
                {data.points.map((p, i) => <li key={i} style={{ fontSize: 12.5, lineHeight: 1.7 }}>{p}</li>)}
              </ul>
            )}
            <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 10 }}>
              <p style={{ margin: '0 0 7px', fontSize: 12, color: 'var(--text-2)' }}>
                <b style={{ color: 'var(--text-strong)' }}>난이도 집계</b> — 등장 단어 {stat.total}개 중 <b style={{ color: jcolor(stat.overall) }}>{stat.covPct}%가 {stat.overall} 이하</b> → 권장 <b style={{ color: jcolor(stat.overall) }}>{stat.overall} ({LV_LABEL[stat.overall]})</b>
              </p>
              <div style={{ display: 'flex', height: 11, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--bd)' }}>
                {ORDER.map(lv => stat.counts[lv] > 0 && (
                  <div key={lv} title={`${lv} ${stat.counts[lv]}`} style={{ width: `${stat.counts[lv] / stat.total * 100}%`, background: jcolor(lv) }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 7, fontSize: 10.5, color: 'var(--text-3)' }}>
                {ORDER.map(lv => (
                  <span key={lv} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <i style={{ width: 9, height: 9, borderRadius: 3, background: jcolor(lv), display: 'inline-block' }} />{lv} {stat.counts[lv]}
                  </span>
                ))}
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
              <div style={{ lineHeight: 1.5 }}><RubyText text={cur.furigana_html} fontSize={16} /></div>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4, filter: hideKr ? 'blur(5px)' : 'none' }}>{cur.kr}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, marginTop: 8 }}>
          <CtrlBtn label="이전" sub="A" glyph="⏮" onClick={goPrev} showKey />
          <CtrlBtn label="다시" sub="S" glyph="↺" onClick={replay} showKey />
          <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" glyph={isPlaying ? '⏸' : '▶'} onClick={togglePlay} primary showKey />
          <CtrlBtn label="반복" sub="R" glyph="⟳" onClick={toggleLoop} active={loopIdx >= 0} showKey />
          <CtrlBtn label="다음" sub="D" glyph="⏭" onClick={goNext} showKey />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          <button onClick={cycleRate} style={subBtn(false)}><span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span> 배속{SHOW_KEYS && <KeyHint>Z/X</KeyHint>}</button>
          <button onClick={() => setHideKr(v => !v)} style={subBtn(hideKr)}>{hideKr ? '뜻 보기' : '뜻 가리기'}{SHOW_KEYS && <KeyHint>H</KeyHint>}</button>
          <button onClick={() => setShowCap(v => !v)} style={subBtn(showCap)}>{showCap ? '영상자막 끄기' : '영상자막 켜기'}{SHOW_KEYS && <KeyHint>C</KeyHint>}</button>
          <button onClick={() => setShowWords(v => !v)} style={subBtn(showWords)}>단어 {showWords ? '끄기' : '켜기'}</button>
          <span style={{ flex: 1 }} />
          <button onClick={() => setPanel('saved')} style={{ ...subBtn(false), fontWeight: 700 }}>⭐ 저장함 ({savedLines.length + savedWords.length})</button>
        </div>
      </div>

      {/* 타임라인 스크립트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lines.map((ln, i) => {
          const on = i === activeIdx
          const saved = isLineSaved(i)
          return (
            <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => seekLine(i)}
              style={{ position: 'relative', cursor: 'pointer', padding: '10px 40px 10px 12px', borderRadius: 10, scrollMarginTop: headH + 14, background: on ? 'var(--primary-tint)' : 'transparent', borderLeft: `3px solid ${on ? PRIMARY : 'transparent'}`, transition: 'background 0.15s' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>{fmtT(ln.t)}</div>
              <RubyText text={ln.furigana_html} fontSize={15.5} />
              <p style={{ margin: '3px 0 0', fontSize: 13, lineHeight: 1.5, color: on ? 'var(--text-1)' : 'var(--text-2)', filter: hideKr ? 'blur(5px)' : 'none', userSelect: hideKr ? 'none' : 'auto' }}>{ln.kr}</p>

              {showWords && ln.words && ln.words.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 7 }}>
                  {ln.words.map((w, wi) => (
                    <button key={wi} onClick={(e) => { e.stopPropagation(); openPop(w, i) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, cursor: 'pointer', fontSize: 12.5, color: 'var(--text-1)', fontFamily: "'Noto Sans JP', sans-serif" }}>
                      {w.w}<span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
                    </button>
                  ))}
                </div>
              )}

              <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(i) }} aria-label="문장 저장" style={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 8, cursor: 'pointer', border: 'none', background: 'transparent', color: saved ? '#1D9E75' : 'var(--text-3)', fontSize: 17, lineHeight: 1, fontFamily: 'inherit' }}>{saved ? '★' : '☆'}</button>
            </div>
          )
        })}
      </div>

      {/* 하단 — 이 영상 단어장 (레벨별, 후리가나, 저장) */}
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
                        <button onClick={(e) => { e.stopPropagation(); toggleSaveWord(w) }} aria-label="단어 저장" style={{ border: 'none', background: 'transparent', color: ws ? '#1D9E75' : 'var(--text-3)', fontSize: 15, cursor: 'pointer', lineHeight: 1 }}>{ws ? '★' : '☆'}</button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 단어 팝업 — 읽기/뜻/JLPT + 예문(저장·타임라인) + 단어 저장 */}
      {popWord && (() => {
        const w = popWord.word, li = popWord.lineIdx, ln = lines[li]
        const lnSaved = isLineSaved(li)
        return (
          <div onClick={() => setPopWord(null)} style={backdrop}>
            <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 3 }}>
                <Furi w={w.w} reading={w.reading} size={26} />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(w.jlpt), padding: '2px 8px', borderRadius: 6 }}>{w.jlpt || 'JLPT 외'}</span>
              </div>
              <p style={{ margin: '4px 0 14px', fontSize: 16, color: 'var(--text-1)', fontWeight: 600 }}>{w.ko || '—'}</p>

              {/* 예문 (이 단어가 쓰인 줄) */}
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

      {/* 저장함 (문장 / 단어) */}
      {panel === 'saved' && (
        <div onClick={() => setPanel(null)} style={backdrop}>
          <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 460, maxHeight: '78vh', overflowY: 'auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-strong)' }}>저장함</span>
              <button onClick={() => setPanel(null)} style={{ border: 'none', background: 'transparent', fontSize: 22, color: 'var(--text-3)', cursor: 'pointer' }}>×</button>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '4px 0 6px' }}>저장한 문장·예문 ({savedLines.filter(s => s.vid === vid).length})</p>
            {savedLines.filter(s => s.vid === vid).length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: '0 0 10px' }}>줄의 ☆ 또는 단어 팝업의 ‘예문 저장’으로 저장하세요. 누르면 그 장면으로 이동합니다.</p>}
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
            {savedWords.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: 0 }}>단어 칩이나 단어장에서 ☆ 로 저장하세요.</p>}
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
    </div>
  )
}

// ── 보조 컴포넌트/스타일 ──────────────────────────────
function CtrlBtn({ label, sub, glyph, onClick, primary, active, showKey }) {
  return (
    <button onClick={onClick} aria-label={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, padding: '7px 2px 5px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? 'var(--primary-tint)' : (primary ? PRIMARY : 'var(--surface)'), color: primary ? '#fff' : (active ? PRIMARY : 'var(--text-1)'), transition: 'background 0.12s, border-color 0.12s' }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
      {showKey && SHOW_KEYS && <span style={{ fontSize: 9, opacity: 0.6, lineHeight: 1 }}>{sub}</span>}
    </button>
  )
}
function subBtn(active) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 11px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`, background: active ? 'var(--primary-tint)' : 'var(--surface)', color: active ? PRIMARY : 'var(--text-1)' }
}
function popBtn(active) {
  return { flex: 1, height: 42, borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, border: active ? '1px solid #1D9E75' : '1px solid var(--bd)', background: active ? 'transparent' : PRIMARY, color: active ? '#1D9E75' : '#fff' }
}
function KeyHint({ children }) {
  return <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 4px', borderRadius: 4, background: 'var(--bd)', color: 'var(--text-3)', fontWeight: 700 }}>{children}</span>
}
const backdrop = { position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(15,23,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const card = { width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 16, padding: 18, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }
