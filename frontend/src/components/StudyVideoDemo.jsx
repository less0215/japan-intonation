/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 영상 위 자막 오버레이 + 줄 클릭 점프 + 현재 줄 하이라이트·자동 스크롤. 시드=studyDemo.js.
 * 쉐도잉 단축키(웹) + 컨트롤 바(웹·앱 공용). 단어 칩(JLPT 색상)·단어 팝업·문장/단어 저장(저장→타임라인 점프).
 * 참고 UX: Language Reactor / Migaku(레벨 색상) / Yomitan(클릭 사전 팝업). 저장은 프로토타입이라 localStorage. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import RubyText from './RubyText'
import { STUDY_DEMO } from '../data/studyDemo'

const PRIMARY = '#5CA9CE'
const RATES = [0.5, 0.75, 1, 1.25, 1.5]
const SHOW_KEYS = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false

// JLPT 레벨별 색 (쉬움 N5 → 어려움 N1)
const JLPT = {
  N5: '#1D9E75', N4: '#3B9AE1', N3: '#E0A91B', N2: '#E8772E', N1: '#D9534F',
}
const jcolor = (lv) => JLPT[lv] || '#9aa5b1'

// localStorage(프로토타입 저장)
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
  const [showWords, setShowWords] = useState(true)   // 단어 칩 표시
  const [headH, setHeadH] = useState(0)
  // 저장(localStorage)
  const [savedLines, setSavedLines] = useState(() => lsLoad(LS_LINES))
  const [savedWords, setSavedWords] = useState(() => lsLoad(LS_WORDS))
  const [panel, setPanel] = useState(null)           // 'saved' | null
  const [popWord, setPopWord] = useState(null)        // 단어 팝업 데이터

  useEffect(() => lsSave(LS_LINES, savedLines), [savedLines])
  useEffect(() => lsSave(LS_WORDS, savedWords), [savedWords])

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
  const stepRate = (dir) => setRateIdx(prev => {
    const next = Math.min(RATES.length - 1, Math.max(0, prev + dir))
    const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[next]); return next
  })
  const cycleRate = () => setRateIdx(prev => {
    const next = (prev + 1) % RATES.length
    const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[next]); return next
  })

  // ── 저장 토글 ─────────────────────────────────────
  const isLineSaved = (i) => savedLines.some(s => s.vid === vid && s.idx === i)
  const toggleSaveLine = (i) => setSavedLines(prev => {
    const ex = prev.some(s => s.vid === vid && s.idx === i)
    if (ex) return prev.filter(s => !(s.vid === vid && s.idx === i))
    const ln = lines[i]
    return [...prev, { vid, idx: i, t: ln.t, jp: ln.jp, furigana_html: ln.furigana_html, kr: ln.kr, title: data.title }]
  })
  const wordKey = (w) => `${w.w}|${w.reading}`
  const isWordSaved = (w) => savedWords.some(s => wordKey(s) === wordKey(w))
  const toggleSaveWord = (w) => setSavedWords(prev => {
    if (prev.some(s => wordKey(s) === wordKey(w))) return prev.filter(s => wordKey(s) !== wordKey(w))
    return [...prev, { w: w.w, reading: w.reading, ko: w.ko, jlpt: w.jlpt }]
  })

  // ── 플레이어 초기화 + 폴링 ────────────────────────
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
              if (li >= 0) {
                const endT = lines[li + 1] ? lines[li + 1].t : Infinity
                if (t >= endT - 0.12) { try { p.seekTo(lines[li].t, true) } catch {} }
                idx = li
              }
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

  useEffect(() => {
    const el = lineRefs.current[activeIdx]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [activeIdx])

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

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 0 90px' }}>
      <div style={{ padding: '4px 4px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>영상 학습 · 프로토타입</span>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', margin: '5px 0 2px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>{data.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>{data.titleKr}</p>
      </div>

      {/* 영상 + 컨트롤 — 상단 고정 */}
      <div ref={headRef} style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', paddingBottom: 8 }}>
        <div style={{
          position: 'relative', margin: '0 auto', borderRadius: 14, overflow: 'hidden', background: '#000',
          aspectRatio: '16 / 9', width: 'auto', maxWidth: '100%',
          height: 'min(44vh, calc((min(100vw, 720px) - 8px) * 0.5625))',
        }}>
          <div id="yt-player-demo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          {showCap && cur && (
            <div style={{
              position: 'absolute', left: '50%', bottom: '8%', transform: 'translateX(-50%)',
              maxWidth: '92%', padding: '7px 14px', borderRadius: 10, textAlign: 'center',
              background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(2px)', color: '#fff', pointerEvents: 'none',
            }}>
              <div style={{ lineHeight: 1.5 }}><RubyText text={cur.furigana_html} fontSize={16} /></div>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.92)', lineHeight: 1.4, filter: hideKr ? 'blur(5px)' : 'none' }}>{cur.kr}</p>
            </div>
          )}
        </div>

        {/* 재생 컨트롤 */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, marginTop: 8 }}>
          <CtrlBtn label="이전" sub="A" glyph="⏮" onClick={goPrev} showKey />
          <CtrlBtn label="다시" sub="S" glyph="↺" onClick={replay} showKey />
          <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" glyph={isPlaying ? '⏸' : '▶'} onClick={togglePlay} primary showKey />
          <CtrlBtn label="반복" sub="R" glyph="⟳" onClick={toggleLoop} active={loopIdx >= 0} showKey />
          <CtrlBtn label="다음" sub="D" glyph="⏭" onClick={goNext} showKey />
        </div>

        {/* 보조 컨트롤 */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
          <button onClick={cycleRate} style={subBtn(false)}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span> 배속{SHOW_KEYS && <KeyHint>Z/X</KeyHint>}
          </button>
          <button onClick={() => setHideKr(v => !v)} style={subBtn(hideKr)}>{hideKr ? '뜻 보기' : '뜻 가리기'}{SHOW_KEYS && <KeyHint>H</KeyHint>}</button>
          <button onClick={() => setShowCap(v => !v)} style={subBtn(showCap)}>{showCap ? '영상자막 끄기' : '영상자막 켜기'}{SHOW_KEYS && <KeyHint>C</KeyHint>}</button>
          <button onClick={() => setShowWords(v => !v)} style={subBtn(showWords)}>단어 {showWords ? '끄기' : '켜기'}</button>
          <span style={{ flex: 1 }} />
          <button onClick={() => setPanel('saved')} style={{ ...subBtn(false), fontWeight: 700 }}>⭐ 저장함 ({savedLines.length + savedWords.length})</button>
        </div>

        {/* JLPT 색 범례 (단어 켜짐일 때) */}
        {showWords && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 7, flexWrap: 'wrap', fontSize: 10.5, color: 'var(--text-3)' }}>
            <span>JLPT</span>
            {['N5', 'N4', 'N3', 'N2', 'N1'].map(lv => (
              <span key={lv} style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <i style={{ width: 9, height: 9, borderRadius: 3, background: jcolor(lv), display: 'inline-block' }} />{lv}
              </span>
            ))}
            <span style={{ color: 'var(--text-3)', opacity: 0.7 }}>· 추정치</span>
          </div>
        )}
      </div>

      {/* 타임라인 스크립트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lines.map((ln, i) => {
          const on = i === activeIdx
          const saved = isLineSaved(i)
          return (
            <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => seekLine(i)}
              style={{
                position: 'relative', cursor: 'pointer', padding: '10px 40px 10px 12px', borderRadius: 10,
                scrollMarginTop: headH + 14,
                background: on ? 'var(--primary-tint)' : 'transparent',
                borderLeft: `3px solid ${on ? PRIMARY : 'transparent'}`,
                transition: 'background 0.15s',
              }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>{fmtT(ln.t)}</div>
              <RubyText text={ln.furigana_html} fontSize={15.5} />
              <p style={{ margin: '3px 0 0', fontSize: 13, lineHeight: 1.5, color: on ? 'var(--text-1)' : 'var(--text-2)', filter: hideKr ? 'blur(5px)' : 'none', userSelect: hideKr ? 'none' : 'auto' }}>{ln.kr}</p>

              {/* 단어 칩 (JLPT 색상) */}
              {showWords && ln.words && ln.words.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 7 }}>
                  {ln.words.map((w, wi) => (
                    <button key={wi} onClick={(e) => { e.stopPropagation(); setPopWord(w) }} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8,
                      border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`,
                      cursor: 'pointer', fontSize: 12.5, color: 'var(--text-1)',
                      fontFamily: "'Noto Sans JP', sans-serif",
                    }}>
                      {w.w}
                      <span style={{ fontSize: 9, fontWeight: 800, color: jcolor(w.jlpt) }}>{w.jlpt || '·'}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* 문장 저장 버튼 */}
              <button onClick={(e) => { e.stopPropagation(); toggleSaveLine(i) }} aria-label="문장 저장" style={{
                position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 8, cursor: 'pointer',
                border: 'none', background: 'transparent', color: saved ? '#1D9E75' : 'var(--text-3)',
                fontSize: 17, lineHeight: 1, fontFamily: 'inherit',
              }}>{saved ? '★' : '☆'}</button>
            </div>
          )
        })}
      </div>

      {/* 단어 팝업 (Yomitan 스타일) */}
      {popWord && (
        <div onClick={() => setPopWord(null)} style={backdrop}>
          <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Noto Sans JP', sans-serif", color: 'var(--text-strong)' }}>{popWord.w}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: jcolor(popWord.jlpt), padding: '2px 7px', borderRadius: 6 }}>{popWord.jlpt || 'JLPT 외'}</span>
            </div>
            <p style={{ margin: '0 0 2px', fontSize: 14, color: 'var(--text-2)', fontFamily: "'Noto Sans JP', sans-serif" }}>{popWord.reading}</p>
            <p style={{ margin: '6px 0 14px', fontSize: 16, color: 'var(--text-1)', fontWeight: 600 }}>{popWord.ko || '—'}</p>
            <button onClick={() => toggleSaveWord(popWord)} style={{
              width: '100%', height: 44, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 700,
              border: isWordSaved(popWord) ? '1px solid #1D9E75' : 'none',
              background: isWordSaved(popWord) ? 'transparent' : PRIMARY, color: isWordSaved(popWord) ? '#1D9E75' : '#fff',
            }}>{isWordSaved(popWord) ? '★ 어휘장에 저장됨' : '☆ 어휘장에 저장'}</button>
          </div>
        </div>
      )}

      {/* 저장함 패널 (문장 / 단어) */}
      {panel === 'saved' && (
        <div onClick={() => setPanel(null)} style={backdrop}>
          <div onClick={e => e.stopPropagation()} style={{ ...card, maxWidth: 460, maxHeight: '78vh', overflowY: 'auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-strong)' }}>저장함</span>
              <button onClick={() => setPanel(null)} style={{ border: 'none', background: 'transparent', fontSize: 22, color: 'var(--text-3)', cursor: 'pointer' }}>×</button>
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, color: PRIMARY, margin: '4px 0 6px' }}>저장한 문장 ({savedLines.length})</p>
            {savedLines.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: '0 0 10px' }}>줄 오른쪽 ☆ 를 눌러 문장을 저장하세요. 저장한 문장을 누르면 그 장면으로 이동합니다.</p>}
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
            {savedWords.length === 0 && <p style={{ fontSize: 12.5, color: 'var(--text-3)', margin: 0 }}>단어 칩을 눌러 어휘를 저장하세요.</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {savedWords.map((w, i) => (
                <span key={i} onClick={() => setPopWord(w)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 9px', borderRadius: 8, border: `1px solid ${jcolor(w.jlpt)}`, background: `${jcolor(w.jlpt)}1a`, fontSize: 12.5 }}>
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
    <button onClick={onClick} aria-label={label} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 1, padding: '7px 2px 5px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit',
      border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`,
      background: active ? 'var(--primary-tint)' : (primary ? PRIMARY : 'var(--surface)'),
      color: primary ? '#fff' : (active ? PRIMARY : 'var(--text-1)'),
      transition: 'background 0.12s, border-color 0.12s',
    }}>
      <span style={{ fontSize: 16, lineHeight: 1 }}>{glyph}</span>
      <span style={{ fontSize: 11, fontWeight: 600 }}>{label}</span>
      {showKey && SHOW_KEYS && <span style={{ fontSize: 9, opacity: 0.6, lineHeight: 1 }}>{sub}</span>}
    </button>
  )
}
function subBtn(active) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 11px',
    borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
    border: `1px solid ${active ? PRIMARY : 'var(--bd)'}`,
    background: active ? 'var(--primary-tint)' : 'var(--surface)', color: active ? PRIMARY : 'var(--text-1)',
  }
}
function KeyHint({ children }) {
  return <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 4px', borderRadius: 4, background: 'var(--bd)', color: 'var(--text-3)', fontWeight: 700 }}>{children}</span>
}
const backdrop = { position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(15,23,30,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const card = { width: '100%', background: 'var(--bg)', border: '1px solid var(--bd)', borderRadius: 16, padding: 18, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }
