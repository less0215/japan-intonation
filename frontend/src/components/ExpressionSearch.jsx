/* 표현으로 배우기 (미니멀 프로토타입) — 숨김 라우트 /lab/expression, noindex.
 *
 * 한국어(·일본어·영어) 표현을 입력하면 쉐도잉 DB(94편·2만여 대사)에서 그 표현이
 * 실제로 쓰인 장면을 찾아 "한 장면 = 한 카드"로 보여준다. 현재 장면은 자동 반복(루프)되어
 * 따라 말하기에 집중할 수 있고, 준비되면 ▷ 로 다음 장면으로 넘어간다.
 * 히라가나만 알아도 되도록: 한자는 전부 후리가나, 찾은 표현은 하이라이트, 밑에 발음·번역.
 *
 * 화면 3개: home(입력) → choose(뜻이 갈릴 때만) → study(영상+문장+버튼 3개).
 * 군더더기 배제: 오버레이 자막·가리기·자막모드·관련목록 없음. 문장 카드 하나가 학습 대상.
 * 플레이어는 1회 생성 + loadVideoById로만 영상 전환(React↔YT iframe 충돌 회피, 검증된 패턴). */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { parseFurigana } from './RubyText'
import { pronText } from '../utils/kana.mjs'
import { STUDY_DATA } from '../data/studyData'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'
import { matchExpressions, hasJapanese } from '../utils/expressions'

const PRIMARY = '#5CA9CE'
const GREEN = '#1D9E75'
const MAX_PLAYS = 60
// 문장 저장 — 쉐도잉과 동일 키·형식({vid,idx,t,jp,furigana_html,kr})이라 저장탭(쉐도잉>저장한 문장)에 그대로 뜸
const LS_LINES = 'tickjapan_study_saved_lines'
const lsLoad = (k) => { try { return JSON.parse(localStorage.getItem(k) || '[]') } catch { return [] } }
const fmtT = (sec) => { const m = Math.floor(sec / 60), s = Math.floor(sec % 60); return `${m}:${String(s).padStart(2, '0')}` }
const SUGGESTIONS = ['하려고 해', '하고 싶어', '해야 해', '할지도 몰라', '해 줬으면']

const FURIGANA_RE = /([^\s()（）]+?)\(([ぁ-ゖー]+)\)/g
const krPronOf = (f) => { if (!f) return ''; return pronText(f.replace(FURIGANA_RE, '$2'), f) }

// ── YT IFrame API(웹 전용) ──
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

// ── 검색 ──
function buildLineIndex() {
  const out = []
  for (const v of Object.values(STUDY_DATA)) {
    const lines = v.lines || []
    for (let i = 0; i < lines.length; i++) out.push({ vid: v.videoId, titleKr: v.titleKr || v.title, idx: i, t: lines[i].t, jp: lines[i].jp })
  }
  return out
}
function matchSpan(jp, matcher) {
  if (matcher.jpRe) { const m = jp.match(matcher.jpRe); if (m) return [m.index, m.index + m[0].length] }
  else if (matcher.raw) { const i = jp.indexOf(matcher.raw); if (i >= 0) return [i, i + matcher.raw.length] }
  return null
}

// ── 후리가나 + 표현 하이라이트 (parseFurigana 오프셋 매핑으로 매칭 글자만 정밀 강조) ──
function EmphFurigana({ furiganaHtml, jp, matcher, fontSize }) {
  const span = matcher ? matchSpan(jp, matcher) : null
  const parts = parseFurigana(furiganaHtml)
  const rtSize = Math.max(9, Math.round(fontSize * 0.62))
  const HL = { background: `${PRIMARY}26`, borderRadius: 4, boxShadow: `inset 0 -2px 0 ${PRIMARY}`, fontWeight: 700 }
  const inSpan = (a, b) => span && b > span[0] && a < span[1]
  let pos = 0
  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight: 500, lineHeight: 1.9, color: 'var(--text-strong)' }}>
      {parts.map((p, i) => {
        if (p.type === 'ruby') {
          const s = pos, e = pos + p.kanji.length; pos = e
          return <span key={i} style={inSpan(s, e) ? HL : undefined}>{p.kanji}<span style={{ fontSize: rtSize, color: 'var(--text-3)', fontWeight: 400 }}>({p.reading})</span></span>
        }
        const t = p.text, s = pos; pos += t.length
        if (!span) return <span key={i}>{t}</span>
        const a = Math.max(0, span[0] - s), b = Math.min(t.length, span[1] - s)
        if (a >= b) return <span key={i}>{t}</span>
        return <span key={i}>{t.slice(0, a)}<span style={HL}>{t.slice(a, b)}</span>{t.slice(b)}</span>
      })}
    </span>
  )
}

function Icon({ name, size = 20 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'play': return <svg {...p}><polygon points="7 4.5 19.5 12 7 19.5" fill="currentColor" stroke="none" /></svg>
    case 'pause': return <svg {...p}><line x1="9" y1="5" x2="9" y2="19" /><line x1="15" y1="5" x2="15" y2="19" /></svg>
    case 'prev': return <svg {...p}><polyline points="14.5 6 8.5 12 14.5 18" /></svg>
    case 'next': return <svg {...p}><polyline points="9.5 6 15.5 12 9.5 18" /></svg>
    case 'back': return <svg {...p}><polyline points="14.5 5 7.5 12 14.5 19" /></svg>
    case 'go': return <svg {...p}><line x1="4" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>
    default: return null
  }
}

export default function ExpressionSearch() {
  const allLines = useMemo(buildLineIndex, [])
  const [screen, setScreen] = useState('home')   // home | choose | study
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [candidates, setCandidates] = useState([])
  const [matcher, setMatcher] = useState(null)
  const [plays, setPlays] = useState([])          // [{vid,titleKr,idx,t}]
  const [pos, setPos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [slow, setSlow] = useState(false)
  const [savedLines, setSavedLines] = useState(() => lsLoad(LS_LINES))
  useEffect(() => { try { localStorage.setItem(LS_LINES, JSON.stringify(savedLines)) } catch {} }, [savedLines])

  // 진입 파라미터 — ?p=<시그니처id>(쉐도잉 검색·번역 CTA·문법 상세에서 직행) / ?q=<검색어>
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const p = searchParams.get('p'), q0 = searchParams.get('q')
    if (p) { const s = EXPRESSION_SIGNATURES.find((x) => x.id === p); if (s) { startStudy(s); return } }
    if (q0) submit(q0)
  }, [])  // 최초 진입 1회

  const playerRef = useRef(null)
  const hostRef = useRef(null)
  const loadedVidRef = useRef(null)
  const playsRef = useRef([]); useEffect(() => { playsRef.current = plays }, [plays])
  const posRef = useRef(0); useEffect(() => { posRef.current = pos }, [pos])
  const slowRef = useRef(false); useEffect(() => { slowRef.current = slow }, [slow])
  const barRef = useRef(null)

  // ── 검색 실행 → 학습 화면 ──
  const startStudy = (m) => {
    const test = m.jpRe ? (jp) => m.jpRe.test(jp) : (jp) => jp.includes(m.raw)
    const found = []
    for (const l of allLines) { if (test(l.jp)) { found.push(l); if (found.length >= MAX_PLAYS) break } }
    if (!found.length) { setNotFound(true); setScreen('home'); return }
    setMatcher(m); setPlays(found); setPos(0); setNotFound(false); setScreen('study')
  }
  const submit = (raw) => {
    const q = (raw ?? query).trim(); setQuery(q); setNotFound(false)
    if (!q) return
    const cands = matchExpressions(q)
    if (cands.length === 1) { startStudy(cands[0]); return }
    if (cands.length > 1) {
      // 후보별 장면 수 미리 계산(선택 카드에 표시) — DB에 장면이 없는 후보는 제외
      const withCount = cands.map((c) => ({ ...c, count: allLines.filter((l) => c.jpRe.test(l.jp)).length })).filter((c) => c.count > 0)
      if (withCount.length === 0) { setNotFound(true); return }
      if (withCount.length === 1) { startStudy(withCount[0]); return }
      setCandidates(withCount); setScreen('choose'); return
    }
    if (hasJapanese(q)) { startStudy({ raw: q, label: `“${q}”`, note: '' }); return }
    setNotFound(true)
  }

  // ── 플레이어: 학습 화면에서 1회 생성, 현재 장면 자동 루프 ──
  useEffect(() => {
    if (screen !== 'study') return
    let timer, cancelled = false
    const tick = () => {
      const p = playerRef.current; if (!p || !p.getCurrentTime) return
      let t; try { t = p.getCurrentTime() } catch { return }
      const cur = playsRef.current[posRef.current]
      if (!cur || loadedVidRef.current !== cur.vid) return
      const ls = STUDY_DATA[cur.vid]?.lines || []
      const start = ls[cur.idx]?.t ?? 0
      const end = ls[cur.idx + 1] ? ls[cur.idx + 1].t : start + 6
      if (t >= end - 0.1) { try { p.seekTo(Math.max(0, start - 0.1), true) } catch {} return }  // 장면 자동 반복
      if (barRef.current) {
        const prog = Math.max(0, Math.min(1, (t - start) / Math.max(0.4, end - start)))
        barRef.current.style.width = `${(prog * 100).toFixed(1)}%`
      }
    }
    loadYT().then((YT) => {
      if (cancelled || !YT || !hostRef.current) return
      const el = document.createElement('div'); hostRef.current.appendChild(el)
      const cur = playsRef.current[posRef.current]
      loadedVidRef.current = cur.vid
      playerRef.current = new YT.Player(el, {
        videoId: cur.vid,
        playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0, modestbranding: 1, iv_load_policy: 3, cc_load_policy: 0, start: Math.max(0, Math.floor(cur.t)), origin: window.location.origin },
        events: {
          onStateChange: (e) => { setIsPlaying(e.data === 1); if (e.data === 1) { try { playerRef.current?.setPlaybackRate?.(slowRef.current ? 0.75 : 1) } catch {} } },
          onReady: () => { timer = setInterval(tick, 120) },
        },
      })
    })
    return () => { cancelled = true; if (timer) clearInterval(timer); try { playerRef.current?.destroy?.() } catch {} playerRef.current = null; loadedVidRef.current = null }
  }, [screen])

  // ── 장면 이동 ──
  const goTo = (n) => {
    const list = playsRef.current
    if (n < 0 || n >= list.length) return
    setPos(n)
    const cur = list[n], p = playerRef.current
    if (!p) return
    if (barRef.current) barRef.current.style.width = '0%'
    if (loadedVidRef.current === cur.vid) { try { p.seekTo(Math.max(0, cur.t - 0.1), true); p.playVideo?.() } catch {} }
    else { loadedVidRef.current = cur.vid; try { p.loadVideoById({ videoId: cur.vid, startSeconds: Math.max(0, cur.t - 0.1) }) } catch {} }
  }
  const togglePlay = () => { const p = playerRef.current; if (!p) return; try { p.getPlayerState() === 1 ? p.pauseVideo() : p.playVideo() } catch {} }
  const toggleSlow = () => setSlow((s) => { const ns = !s; try { playerRef.current?.setPlaybackRate?.(ns ? 0.75 : 1) } catch {}; return ns })

  // 키보드: ← → 장면 이동, Space 재생/일시정지
  useEffect(() => {
    if (screen !== 'study') return
    const onKey = (e) => {
      if ((e.target?.tagName || '') === 'INPUT' || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.code === 'ArrowLeft') { e.preventDefault(); goTo(posRef.current - 1) }
      else if (e.code === 'ArrowRight') { e.preventDefault(); goTo(posRef.current + 1) }
      else if (e.code === 'Space') { e.preventDefault(); togglePlay() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [screen])

  const cur = plays[pos]
  const line = cur ? STUDY_DATA[cur.vid]?.lines[cur.idx] : null

  // ── 문장 저장(쉐도잉과 동일 형식 → 저장탭 호환) ──
  const isSaved = cur ? savedLines.some((s) => s.vid === cur.vid && s.idx === cur.idx) : false
  const toggleSave = () => {
    if (!cur || !line) return
    setSavedLines((prev) => prev.some((s) => s.vid === cur.vid && s.idx === cur.idx)
      ? prev.filter((s) => !(s.vid === cur.vid && s.idx === cur.idx))
      : [...prev, { vid: cur.vid, idx: cur.idx, t: line.t, jp: line.jp, furigana_html: line.furigana_html, kr: line.kr }])
  }

  // ── 공통 래퍼 ──
  const page = (children) => (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '18px 16px 22px', color: 'var(--text-1)' }}>
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>표현으로 배우기 | 틱재팬</title></Helmet>
      {children}
    </div>
  )

  // ── ① 입력 ──
  if (screen === 'home') return page(
    <div style={{ paddingTop: '10vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 8px', wordBreak: 'keep-all' }}>이 말, 일본어로 어떻게 할까?</h1>
      <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 28px', lineHeight: 1.6, wordBreak: 'keep-all' }}>표현을 입력하면 실제 원어민이 어떻게 쓰는지 확인할 수 있어요</p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          autoFocus value={query}
          onChange={(e) => { setQuery(e.target.value); setNotFound(false) }}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
          placeholder="예: 하려고 해"
          style={{ flex: 1, height: 54, padding: '0 18px', fontSize: 16, borderRadius: 16, border: '1.5px solid var(--bd-2)', background: 'var(--surface)', color: 'var(--text-1)', fontFamily: 'inherit', outline: 'none' }}
        />
        <button onClick={() => submit()} aria-label="검색" style={{ width: 54, height: 54, borderRadius: 16, border: 'none', background: PRIMARY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <Icon name="go" size={22} />
        </button>
      </div>
      {notFound && <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '14px 0 0' }}>아직 준비되지 않은 표현이에요. 아래에서 골라 보세요.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 22 }}>
        {SUGGESTIONS.map((s) => (
          <button key={s} onClick={() => submit(s)} style={{ fontSize: 13.5, padding: '9px 15px', borderRadius: 999, border: '1px solid var(--bd)', background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
        ))}
      </div>
    </div>
  )

  // ── ② 뜻 선택(갈릴 때만) ──
  if (screen === 'choose') return page(
    <div style={{ paddingTop: '6vh' }}>
      <button onClick={() => setScreen('home')} aria-label="뒤로" style={{ border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 4, marginLeft: -4 }}><Icon name="back" /></button>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-strong)', margin: '14px 0 4px' }}>“{query}” — 어떤 뜻이에요?</h2>
      <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '0 0 20px' }}>일본어에서는 뜻에 따라 표현이 달라져요.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {candidates.map((c) => (
          <button key={c.id} onClick={() => startStudy(c)} style={{ textAlign: 'left', padding: '16px 18px', borderRadius: 16, border: '1px solid var(--bd)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{c.label}</span>
              <span style={{ fontSize: 12, color: 'var(--text-3)', flexShrink: 0 }}>{c.count}장면</span>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{c.note}</p>
          </button>
        ))}
      </div>
    </div>
  )

  // ── ③ 학습: 영상 → 문장 → 버튼 3개 ──
  return page(
    <>
      {/* 상단: 뒤로 + 표현 + 진행 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button onClick={() => setScreen('home')} aria-label="뒤로" style={{ border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 4, marginLeft: -4, flexShrink: 0 }}><Icon name="back" /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16.5, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{matcher.label}</div>
          {matcher.note && <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{matcher.note}</div>}
        </div>
        <span style={{ fontSize: 12.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{pos + 1} / {plays.length}</span>
      </div>

      {/* 영상 */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 18, overflow: 'hidden', background: '#000', boxShadow: '0 8px 28px rgba(0,0,0,0.18)' }}>
        <div ref={hostRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>

      {/* 문장 — 학습 대상 하나만. 아래 얇은 진행바가 장면 싱크 */}
      {line && (
        <div style={{ position: 'relative', overflow: 'hidden', marginTop: 14, padding: '18px 46px 20px 18px', borderRadius: 18, background: 'var(--surface)', border: '1px solid var(--bd)' }}>
          <EmphFurigana furiganaHtml={line.furigana_html} jp={line.jp} matcher={matcher} fontSize={20} />
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-3)' }}>{krPronOf(line.furigana_html)}</p>
          <p style={{ margin: '7px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-2)', wordBreak: 'keep-all' }}>{line.kr}</p>
          <p style={{ margin: '10px 0 0', fontSize: 11.5, color: 'var(--text-3)' }}>{cur.titleKr} · {fmtT(cur.t)}</p>
          {/* 문장 저장 — 저장탭(쉐도잉 > 저장한 문장)에서 확인 가능 */}
          <button onClick={toggleSave} aria-label={isSaved ? '저장 취소' : '문장 저장'}
            style={{ position: 'absolute', top: 12, right: 10, width: 34, height: 34, borderRadius: 10, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill={isSaved ? GREEN : 'none'} stroke={isSaved ? GREEN : 'var(--text-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <div style={{ position: 'absolute', left: 0, bottom: 0, height: 3, width: '100%', background: 'var(--bd)' }} />
          <div ref={barRef} style={{ position: 'absolute', left: 0, bottom: 0, height: 3, width: '0%', background: PRIMARY, transition: 'width 0.12s linear' }} />
        </div>
      )}

      {/* 버튼 3개 + 천천히 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, marginTop: 20 }}>
        <button onClick={() => goTo(pos - 1)} disabled={pos === 0} aria-label="이전 장면"
          style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid var(--bd)', background: 'var(--surface)', color: pos === 0 ? 'var(--bd-2)' : 'var(--text-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: pos === 0 ? 'default' : 'pointer' }}>
          <Icon name="prev" />
        </button>
        <button onClick={togglePlay} aria-label={isPlaying ? '일시정지' : '재생'}
          style={{ width: 68, height: 68, borderRadius: '50%', border: 'none', background: PRIMARY, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 8px 22px ${PRIMARY}55` }}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={26} />
        </button>
        <button onClick={() => goTo(pos + 1)} disabled={pos === plays.length - 1} aria-label="다음 장면"
          style={{ width: 52, height: 52, borderRadius: '50%', border: '1px solid var(--bd)', background: 'var(--surface)', color: pos === plays.length - 1 ? 'var(--bd-2)' : 'var(--text-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="next" />
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
        <button onClick={toggleSlow} style={{ fontSize: 12.5, fontWeight: 700, padding: '7px 14px', borderRadius: 999, border: `1px solid ${slow ? PRIMARY : 'var(--bd)'}`, background: slow ? `${PRIMARY}1a` : 'var(--surface)', color: slow ? PRIMARY : 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}>
          천천히 {slow ? 'ON' : ''}
        </button>
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 16 }}>이 장면은 자동으로 반복돼요 — 소리 내어 따라 해 보세요</p>
    </>
  )
}
