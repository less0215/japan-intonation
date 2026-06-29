/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 줄 클릭 → 해당 시점으로 점프, 재생 중 현재 줄 하이라이트·자동 스크롤. 시드 데이터=studyDemo.js.
 * 쉐도잉 단축키(웹) + 컨트롤 바(웹·앱 공용): 이전/다음/다시/반복(루프)/재생·정지/배속/뜻가리기. */
import { useEffect, useRef, useState } from 'react'
import RubyText from './RubyText'
import { STUDY_DEMO } from '../data/studyDemo'

const PRIMARY = '#5CA9CE'
const RATES = [0.5, 0.75, 1, 1.25, 1.5]
// 마우스 포인터(=웹)에서만 키 안내 노출. 터치(앱)에서는 버튼만.
const SHOW_KEYS = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false

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
  const lines = data.lines
  const playerRef = useRef(null)
  const lineRefs = useRef([])
  const activeRef = useRef(-1)       // 현재 재생 줄 (핸들러에서 최신값 읽기용)
  const loopRef = useRef(-1)         // 반복(루프) 대상 줄 인덱스, -1=off
  const [activeIdx, setActiveIdx] = useState(-1)
  const [loopIdx, setLoopIdx] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [rateIdx, setRateIdx] = useState(2)   // 1.0배
  const [hideKr, setHideKr] = useState(false)

  // ── 플레이어 제어 헬퍼 ───────────────────────────────
  const seekLine = (i) => {
    const p = playerRef.current
    if (!p || !p.seekTo || i < 0 || i >= lines.length) return
    p.seekTo(Math.max(0, lines[i].t - 0.15), true)
    if (p.playVideo) p.playVideo()
    activeRef.current = i; setActiveIdx(i)
    if (loopRef.current >= 0) { loopRef.current = i; setLoopIdx(i) }   // 반복 중이면 대상 이동
  }
  const goPrev = () => seekLine(Math.max(0, (activeRef.current < 0 ? 0 : activeRef.current) - 1))
  const goNext = () => seekLine(Math.min(lines.length - 1, (activeRef.current < 0 ? -1 : activeRef.current) + 1))
  const replay = () => seekLine(activeRef.current < 0 ? 0 : activeRef.current)
  const togglePlay = () => {
    const p = playerRef.current; if (!p || !p.getPlayerState) return
    if (p.getPlayerState() === 1) p.pauseVideo(); else p.playVideo()
  }
  const toggleLoop = () => {
    if (loopRef.current >= 0) { loopRef.current = -1; setLoopIdx(-1) }
    else { const i = activeRef.current < 0 ? 0 : activeRef.current; loopRef.current = i; setLoopIdx(i); seekLine(i) }
  }
  const stepRate = (dir) => setRateIdx(prev => {
    const next = Math.min(RATES.length - 1, Math.max(0, prev + dir))
    const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[next])
    return next
  })
  const cycleRate = () => setRateIdx(prev => {
    const next = (prev + 1) % RATES.length
    const p = playerRef.current; if (p && p.setPlaybackRate) p.setPlaybackRate(RATES[next])
    return next
  })

  // ── 유튜브 플레이어 초기화 + 재생 위치 폴링 ──────────
  useEffect(() => {
    let timer, cancelled = false
    loadYT().then(YT => {
      if (cancelled || !YT) return
      playerRef.current = new YT.Player('yt-player-demo', {
        videoId: data.videoId,
        playerVars: { rel: 0, modestbranding: 1, cc_load_policy: 0, playsinline: 1 },
        events: {
          onStateChange: (e) => setIsPlaying(e.data === 1),
          onReady: () => {
            timer = setInterval(() => {
              const p = playerRef.current
              if (!p || !p.getCurrentTime) return
              let t
              try { t = p.getCurrentTime() } catch { return }
              let idx = -1
              for (let i = 0; i < lines.length; i++) { if (lines[i].t <= t + 0.15) idx = i; else break }
              const li = loopRef.current
              if (li >= 0) {
                const endT = lines[li + 1] ? lines[li + 1].t : Infinity
                if (t >= endT - 0.12) { try { p.seekTo(lines[li].t, true) } catch {} }
                idx = li   // 반복 중에는 하이라이트 고정
              }
              if (idx !== activeRef.current) { activeRef.current = idx; setActiveIdx(idx) }
            }, 200)
          },
        },
      })
    })
    return () => { cancelled = true; if (timer) clearInterval(timer) }
  }, [])

  // 현재 줄 자동 스크롤
  useEffect(() => {
    const el = lineRefs.current[activeIdx]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeIdx])

  // ── 키보드 단축키 (웹) ───────────────────────────────
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
        case 'z': case 'Z': e.preventDefault(); stepRate(-1); break
        case 'x': case 'X': e.preventDefault(); stepRate(1); break
        case ' ': e.preventDefault(); togglePlay(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 0 90px' }}>
      <div style={{ padding: '4px 4px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>영상 학습 · 프로토타입</span>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', margin: '5px 0 2px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>{data.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>{data.titleKr}</p>
      </div>

      {/* 유튜브 플레이어 + 컨트롤 바 — 상단 고정(sticky): 자막이 스크롤돼도 화자 모습 유지 */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', paddingBottom: 8 }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
          <div id="yt-player-demo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        </div>

        {/* 컨트롤 바 (웹·앱 공용) */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 5, marginTop: 8 }}>
          <CtrlBtn label="이전" sub="A" glyph="⏮" onClick={goPrev} showKey />
          <CtrlBtn label="다시" sub="S" glyph="↺" onClick={replay} showKey />
          <CtrlBtn label={isPlaying ? '정지' : '재생'} sub="Space" glyph={isPlaying ? '⏸' : '▶'} onClick={togglePlay} primary showKey />
          <CtrlBtn label="반복" sub="R" glyph="⟳" onClick={toggleLoop} active={loopIdx >= 0} showKey />
          <CtrlBtn label="다음" sub="D" glyph="⏭" onClick={goNext} showKey />
        </div>

        {/* 보조 컨트롤 — 배속 / 뜻 가리기 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <button onClick={cycleRate} style={subBtn(false)}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{RATES[rateIdx]}×</span> 배속{SHOW_KEYS && <KeyHint>Z/X</KeyHint>}
          </button>
          <button onClick={() => setHideKr(v => !v)} style={subBtn(hideKr)}>
            {hideKr ? '뜻 보기' : '뜻 가리기'}{SHOW_KEYS && <KeyHint>H</KeyHint>}
          </button>
          <span style={{ flex: 1 }} />
          {loopIdx >= 0 && <span style={{ fontSize: 11, color: PRIMARY, fontWeight: 700 }}>🔁 {fmtT(lines[loopIdx].t)} 반복 중</span>}
        </div>

        {SHOW_KEYS && (
          <p style={{ margin: '7px 4px 0', fontSize: 11, color: 'var(--text-3)' }}>
            단축키 · <b>A</b>/<b>D</b> 이전·다음 · <b>S</b> 다시 · <b>R</b> 반복 · <b>Space</b> 재생 · <b>Z/X</b> 배속 · <b>H</b> 뜻
          </p>
        )}
      </div>

      {/* 타임라인 스크립트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lines.map((ln, i) => {
          const on = i === activeIdx
          return (
            <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => seekLine(i)}
              style={{
                cursor: 'pointer', padding: '10px 12px', borderRadius: 10,
                background: on ? 'var(--primary-tint)' : 'transparent',
                borderLeft: `3px solid ${on ? PRIMARY : 'transparent'}`,
                transition: 'background 0.15s',
              }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>{fmtT(ln.t)}</div>
              <RubyText text={ln.furigana_html} fontSize={15.5} />
              <p style={{
                margin: '3px 0 0', fontSize: 13, lineHeight: 1.5,
                color: on ? 'var(--text-1)' : 'var(--text-2)',
                filter: hideKr ? 'blur(5px)' : 'none', userSelect: hideKr ? 'none' : 'auto',
                transition: 'filter 0.15s',
              }}>{ln.kr}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── 컨트롤 버튼들 ──────────────────────────────────────
function CtrlBtn({ label, sub, glyph, onClick, primary, active, showKey }) {
  const accent = active || primary
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
    background: active ? 'var(--primary-tint)' : 'var(--surface)',
    color: active ? PRIMARY : 'var(--text-1)',
  }
}

function KeyHint({ children }) {
  return <span style={{ marginLeft: 4, fontSize: 9, padding: '1px 4px', borderRadius: 4, background: 'var(--bd)', color: 'var(--text-3)', fontWeight: 700 }}>{children}</span>
}
