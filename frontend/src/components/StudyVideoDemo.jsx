/* 영상 학습 프로토타입 (/study-demo) — 유튜브 임베드 + 타임라인 자막(일본어 후리가나 / 한국어).
 * 줄 클릭 → 해당 시점으로 점프, 재생 중 현재 줄 하이라이트·자동 스크롤. 시드 데이터=studyDemo.js. */
import { useEffect, useRef, useState } from 'react'
import RubyText from './RubyText'
import { STUDY_DEMO } from '../data/studyDemo'

const PRIMARY = '#5CA9CE'

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
  const playerRef = useRef(null)
  const lineRefs = useRef([])
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    let timer, cancelled = false
    loadYT().then(YT => {
      if (cancelled || !YT) return
      playerRef.current = new YT.Player('yt-player-demo', {
        videoId: data.videoId,
        playerVars: { rel: 0, modestbranding: 1, cc_load_policy: 0, playsinline: 1 },
        events: {
          onReady: () => {
            timer = setInterval(() => {
              const p = playerRef.current
              if (!p || !p.getCurrentTime) return
              let t
              try { t = p.getCurrentTime() } catch { return }
              let idx = -1
              for (let i = 0; i < data.lines.length; i++) {
                if (data.lines[i].t <= t + 0.15) idx = i; else break
              }
              setActiveIdx(idx)
            }, 300)
          },
        },
      })
    })
    return () => { cancelled = true; if (timer) clearInterval(timer) }
  }, [])

  useEffect(() => {
    const el = lineRefs.current[activeIdx]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeIdx])

  const seek = (t) => {
    const p = playerRef.current
    if (p && p.seekTo) { p.seekTo(Math.max(0, t - 0.2), true); if (p.playVideo) p.playVideo() }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 0 90px' }}>
      <div style={{ padding: '4px 4px 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>영상 학습 · 프로토타입</span>
        <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', margin: '5px 0 2px', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.3 }}>{data.title}</p>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>{data.titleKr}</p>
      </div>

      {/* 유튜브 플레이어 (16:9) */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
        <div id="yt-player-demo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>

      <p style={{ margin: '12px 4px 6px', fontSize: 11.5, color: 'var(--text-3)' }}>
        문장을 누르면 그 장면으로 이동해요 · 재생 중 현재 문장이 강조됩니다
      </p>

      {/* 타임라인 스크립트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.lines.map((ln, i) => {
          const on = i === activeIdx
          return (
            <div key={i} ref={el => (lineRefs.current[i] = el)} onClick={() => seek(ln.t)}
              style={{
                cursor: 'pointer', padding: '10px 12px', borderRadius: 10,
                background: on ? 'var(--primary-tint)' : 'transparent',
                borderLeft: `3px solid ${on ? PRIMARY : 'transparent'}`,
                transition: 'background 0.15s',
              }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 3, fontVariantNumeric: 'tabular-nums' }}>{fmtT(ln.t)}</div>
              <RubyText text={ln.furigana_html} fontSize={15.5} />
              <p style={{ margin: '3px 0 0', fontSize: 13, color: on ? 'var(--text-1)' : 'var(--text-2)', lineHeight: 1.5 }}>{ln.kr}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
