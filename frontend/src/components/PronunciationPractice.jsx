import { useState, useRef } from 'react'
import { logLearning } from '../App'

/* 발음 연습 (관리자 전용 MVP · 온디바이스)
 * - 마이크 녹음 → Web Audio로 음높이(F0) 추출 → 정답 악센트(0/1)와 고저 패턴 비교
 * - 절대 Hz가 아니라 '모라 간 상대 고저 + 다운스텝 위치'를 봄(화자별 목소리 높이 정규화)
 * - 서버/AI 호출 0 (오프라인·프라이버시). 결과는 logLearning('pitch_attempt')로 집단지성 적재
 * - 모라 정렬은 MVP라 '유성 구간 등분' 휴리스틱 — 실기기 튜닝 필요 */
const PRIMARY = '#5CA9CE'
const MINE = '#D85A30'

/* 후리가나(히라가나)를 모라 단위로 분할 — 작은 가나(ゃゅょ)·促音っ·장음ー 결합 */
function splitMora(furigana) {
  const SMALL = 'ゃゅょゎ'
  const chars = [...(furigana || '')]
  const mora = []
  for (let i = 0; i < chars.length; i++) {
    if (SMALL.includes(chars[i]) && mora.length) mora[mora.length - 1] += chars[i]
    else mora.push(chars[i])
  }
  return mora
}

/* accentData(phrase별 0/1) + furigana → 평탄화된 {moraList, accent(0/1배열)} (PitchGraph와 동일 규칙) */
function flattenAccent(accentData, furigana) {
  const allMora = splitMora(furigana)
  const moraList = [], accent = []
  ;(accentData || []).forEach((ph, pi) => {
    const isLast = pi === accentData.length - 1
    const offset = moraList.length
    const count = isLast ? allMora.length - offset : Math.min(ph.mora_count, allMora.length - offset)
    const last = ph.accent[ph.accent.length - 1] ?? 0
    for (let j = 0; j < count; j++) { moraList.push(allMora[offset + j]); accent.push(ph.accent[j] ?? last) }
  })
  return { moraList, accent }
}

/* 다운스텝(악센트 핵) 위치 — 0/1 배열에서 1→0 으로 떨어지는 모라 index. 없으면 -1(평판/끝올림) */
function downstepIndex(acc) {
  for (let i = 0; i < acc.length - 1; i++) if (acc[i] === 1 && acc[i + 1] === 0) return i
  return -1
}

/* 자기상관(autocorrelation) 피치 추출 — buf:Float32, sr:샘플레이트 → Hz 또는 -1(무성) */
function detectPitch(buf, sr) {
  let rms = 0
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / buf.length)
  if (rms < 0.012) return -1                       // 너무 조용 → 무성
  const minLag = Math.floor(sr / 400)              // 400Hz 상한
  const maxLag = Math.floor(sr / 70)               // 70Hz 하한 (사람 음성)
  let bestLag = -1, bestVal = 0
  const c0 = buf.reduce((s, v) => s + v * v, 0)
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0
    for (let i = 0; i < buf.length - lag; i++) sum += buf[i] * buf[i + lag]
    if (sum > bestVal) { bestVal = sum; bestLag = lag }
  }
  if (bestLag < 0 || bestVal / c0 < 0.45) return -1   // clarity 낮으면 버림
  return sr / bestLag
}

const hzToSemi = (hz) => 12 * Math.log2(hz)

export default function PronunciationPractice({ accentData, furigana, japanese, inputText }) {
  const { moraList, accent } = flattenAccent(accentData, furigana)
  const [state, setState] = useState('idle')        // idle|permission|recording|analyzing|result|denied|error
  const [result, setResult] = useState(null)        // { mine:[0/1], score, downTarget, downMine, coach }
  const grantedRef = useRef(false)
  const audioRef = useRef({})                        // { ctx, stream, analyser, raf, frames, started, silence }

  if (!moraList.length) return null
  const N = accent.length

  function cleanup() {
    const a = audioRef.current
    try { cancelAnimationFrame(a.raf) } catch {}
    try { a.stream?.getTracks().forEach(t => t.stop()) } catch {}
    try { a.ctx?.close() } catch {}
    audioRef.current = {}
  }

  async function beginRecording() {
    setState('recording')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
      grantedRef.current = true
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const src = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      src.connect(analyser)
      const buf = new Float32Array(analyser.fftSize)
      const frames = []
      const a = { ctx, stream, analyser, frames, started: 0, silence: 0, t0: ctx.currentTime, last: 0 }
      audioRef.current = a

      const loop = () => {
        analyser.getFloatTimeDomainData(buf)
        const now = ctx.currentTime
        if (now - a.last >= 0.03) {                 // ~30ms 간격 샘플
          a.last = now
          const f0 = detectPitch(buf, ctx.sampleRate)
          frames.push({ t: now - a.t0, f0 })
          if (f0 > 0) { a.started = a.started || now; a.silence = 0 }
          else if (a.started) a.silence += 0.03
          // 발화 시작 후 0.9초 무음 → 자동 종료 (VAD)
          if (a.started && a.silence > 0.9) { finishRecording(); return }
          // 최대 6초 안전 종료
          if (now - a.t0 > 6) { finishRecording(); return }
        }
        a.raf = requestAnimationFrame(loop)
      }
      a.raf = requestAnimationFrame(loop)
    } catch (e) {
      cleanup()
      setState(e?.name === 'NotAllowedError' ? 'denied' : 'error')
    }
  }

  function finishRecording() {
    const frames = audioRef.current.frames || []
    cleanup()
    setState('analyzing')
    setTimeout(() => analyze(frames), 60)
  }

  function analyze(frames) {
    const voiced = frames.filter(f => f.f0 > 0)
    if (voiced.length < N * 2) { setState('error'); return }   // 너무 짧음/무음
    // 반음 변환 + 중앙값 정규화(목소리 높이 제거)
    const semis = voiced.map(f => hzToSemi(f.f0))
    const sorted = [...semis].sort((x, y) => x - y)
    const med = sorted[Math.floor(sorted.length / 2)]
    const norm = semis.map(s => s - med)             // 0 기준 상대 음높이
    // 유성 구간을 N개 모라로 등분 → 모라별 중앙 음높이
    const moraPitch = []
    for (let i = 0; i < N; i++) {
      const seg = norm.slice(Math.floor(i * norm.length / N), Math.floor((i + 1) * norm.length / N))
      if (!seg.length) { moraPitch.push(0); continue }
      const ss = [...seg].sort((x, y) => x - y)
      moraPitch.push(ss[Math.floor(ss.length / 2)])
    }
    // H/L 양자화: 전체 범위 중간값 기준
    const mn = Math.min(...moraPitch), mx = Math.max(...moraPitch)
    const mid = (mn + mx) / 2
    const flat = (mx - mn) < 1.5                      // 1.5반음 미만이면 사실상 평탄
    const mine = moraPitch.map(p => (!flat && p >= mid ? 1 : 0))
    // 채점
    const downT = downstepIndex(accent)
    const downM = downstepIndex(mine)
    const moraMatch = mine.reduce((s, v, i) => s + (v === accent[i] ? 1 : 0), 0) / N
    const downOK = downT === downM
    const score = Math.round((downOK ? 60 : Math.max(0, 60 - Math.abs(downT - downM) * 18)) + moraMatch * 40)
    // 코칭 문구(좌절 금지)
    let coach
    if (flat && downT >= 0) coach = '한국어 영향으로 평평하게 말하기 쉬워요. 한 곳에서 또렷이 내려보세요.'
    else if (downOK) coach = '악센트 핵 위치 정확! 일본어다움의 80%는 여기예요. 👍'
    else if (downT >= 0 && downM >= 0) coach = `${downT + 1}번째 모라 ${moraList[downT] || ''} 에서 내려가야 하는데 위치가 살짝 달랐어요.`
    else if (downT < 0) coach = '이 단어는 끝까지 평판(平板)이라 내리지 않아요. 거의 다 왔어요!'
    else coach = '핵심은 잡았어요. 다운스텝 위치만 한 번 더 맞춰볼까요?'

    const r = { mine, score, downT, downM, flat, coach }
    setResult(r)
    setState('result')
    try { logLearning('pitch_attempt', japanese, { input: inputText, target: accent, mine, down_target: downT, down_mine: downM, score, flat }) } catch {}
  }

  function onChipTap() {
    if (grantedRef.current) beginRecording()
    else setState('permission')
  }
  function close() { cleanup(); setState('idle') }

  // ── 렌더 ──────────────────────────────────
  const W = N * 34 + 16, H = 96, HY = 22, LY = 64
  const px = (i) => 8 + 17 + i * 34
  const path = (acc) => acc.map((v, i) => `${i ? 'L' : 'M'} ${px(i)} ${v ? HY : LY}`).join(' ')

  return (
    <div style={{ margin: '2px 20px 6px' }}>
      {state === 'idle' && (
        <button onClick={onChipTap} style={chip}>
          <Mic /> 발음 연습 <span style={{ fontSize: 9.5, color: '#e0892a', background: '#fff5e8', borderRadius: 5, padding: '1px 5px' }}>베타</span>
        </button>
      )}

      {state === 'permission' && (
        <div style={card}>
          <p style={{ margin: '0 0 4px', fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)' }}>내 발음을 듣고 악센트를 비교해드려요</p>
          <p style={{ margin: '0 0 11px', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5 }}>녹음은 기기 안에서만 분석되고 서버로 전송되지 않아요.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={beginRecording} style={btnFill}>마이크 허용</button>
            <button onClick={close} style={btnOut}>나중에</button>
          </div>
        </div>
      )}

      {state === 'recording' && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E24B4A', animation: 'tjpulse 1s infinite' }} />
            <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>듣는 중… 따라 말해보세요: <b style={{ fontFamily: "'Noto Sans JP',sans-serif" }}>{japanese}</b></span>
          </div>
          <p style={{ margin: '0 0 9px', fontSize: 10.5, color: 'var(--text-3)' }}>또박또박 한 박자로 말하고, 멈추면 자동으로 분석돼요.</p>
          <button onClick={finishRecording} style={btnOut}>멈추고 분석</button>
          <style>{`@keyframes tjpulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
        </div>
      )}

      {state === 'analyzing' && (
        <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 14, height: 14, border: '2px solid var(--bd)', borderTopColor: PRIMARY, borderRadius: '50%', display: 'inline-block', animation: 'tjspin .7s linear infinite' }} />
          <span style={{ fontSize: 12.5, color: 'var(--text-2)' }}>발음 패턴 분석 중…</span>
        </div>
      )}

      {state === 'result' && result && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>내 발음 vs 정답</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#27500A', background: '#EAF3DE', borderRadius: 8, padding: '3px 9px' }}>
              {result.score >= 80 ? '아주 좋아요!' : result.score >= 55 ? '핵심은 잡았어요!' : '거의 다 왔어요'} · {result.score}점
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
              {[HY, LY].map((y, i) => <line key={i} x1={8} y1={y} x2={W - 8} y2={y} stroke="var(--bd)" strokeWidth="0.5" strokeDasharray="2 3" />)}
              <text x={2} y={HY + 3} fontSize="8" fill="var(--text-3)">高</text>
              <text x={2} y={LY + 3} fontSize="8" fill="var(--text-3)">低</text>
              <path d={path(accent)} fill="none" stroke={PRIMARY} strokeWidth="2.4" strokeLinejoin="round" />
              <path d={path(result.mine)} fill="none" stroke={MINE} strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
              {result.downT >= 0 && <text x={px(result.downT)} y={12} fontSize="9" fill={PRIMARY} textAnchor="middle">▼</text>}
              {moraList.map((m, i) => <text key={i} x={px(i)} y={H - 4} fontSize="11" fill="var(--text-3)" textAnchor="middle" fontFamily="'Noto Sans JP',sans-serif">{m}</text>)}
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 12, fontSize: 10.5, color: 'var(--text-3)', margin: '2px 0 8px' }}>
            <span><span style={{ color: PRIMARY }}>━</span> 정답</span>
            <span><span style={{ color: MINE }}>┅</span> 내 발음</span>
          </div>
          <p style={{ margin: '0 0 11px', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.5, background: 'var(--surface-2)', borderRadius: 8, padding: '8px 10px' }}>{result.coach}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={beginRecording} style={btnFill}>다시 녹음</button>
            <button onClick={close} style={btnOut}>닫기</button>
          </div>
        </div>
      )}

      {(state === 'denied' || state === 'error') && (
        <div style={card}>
          <p style={{ margin: '0 0 10px', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>
            {state === 'denied' ? '마이크 권한이 꺼져 있어요. 설정에서 마이크를 켜주세요.' : '잘 안 들렸어요. 또박또박 다시 말해볼까요?'}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setState('idle')} style={btnFill}>확인</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Mic() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" /></svg>
}

const chip = { display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, padding: '6px 11px', borderRadius: 999, border: `1px solid ${PRIMARY}`, color: PRIMARY, background: 'rgba(92,169,206,0.08)', cursor: 'pointer', fontFamily: 'inherit' }
const card = { background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: '13px 14px' }
const btnFill = { flex: 1, height: 40, border: 'none', borderRadius: 11, background: PRIMARY, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }
const btnOut = { flex: 1, height: 40, borderRadius: 11, background: 'transparent', border: '1px solid var(--bd)', color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }
