import { useState, useRef, useEffect } from 'react'
import { logLearning } from '../App'

/* 발음 연습 (관리자 전용 베타 · 온디바이스 · 전체화면 음성모드)
 * - 칩 탭 → 전체화면 음성모드 오버레이로 전환(미니멀, 대화하듯)
 * - 실시간 파형 + 반응하는 원으로 '내 목소리가 들어가는 중'을 시각화
 * - 마이크 녹음 → Web Audio 자기상관 F0 추출 → 반음 정규화 → 정답 0/1 패턴과 고저·다운스텝 비교
 * - 절대 Hz가 아니라 '모라 간 상대 고저 + 다운스텝 위치'. 서버/AI 호출 0. logLearning('pitch_attempt') 적재 */
const PRIMARY = '#5CA9CE'
const MINE = '#F0A046'

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
function downstepIndex(acc) {
  for (let i = 0; i < acc.length - 1; i++) if (acc[i] === 1 && acc[i + 1] === 0) return i
  return -1
}
/* 자기상관 피치 — buf:Float32, sr → Hz 또는 -1(무성). 임계값 완화 + 항(term) 수 정규화 */
function detectPitch(buf, sr) {
  let ss = 0
  for (let i = 0; i < buf.length; i++) ss += buf[i] * buf[i]
  const ms = ss / buf.length            // mean square (= rms^2)
  if (ms < 0.00003) return -1           // 사실상 무음만 컷 (완화)
  const minLag = Math.floor(sr / 400), maxLag = Math.floor(sr / 70)
  let bestLag = -1, bestNorm = 0
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0
    for (let i = 0; i < buf.length - lag; i++) sum += buf[i] * buf[i + lag]
    const n = sum / (buf.length - lag)  // 항 수로 정규화 → lag별 공정 비교
    if (n > bestNorm) { bestNorm = n; bestLag = lag }
  }
  if (bestLag < 0 || bestNorm < 0.25 * ms) return -1   // clarity 완화(0.25)
  return sr / bestLag
}
const hzToSemi = (hz) => 12 * Math.log2(hz)

export default function PronunciationPractice({ accentData, furigana, japanese, korean_pronunciation, inputText }) {
  const { moraList, accent } = flattenAccent(accentData, furigana)
  const N = accent.length
  const [phase, setPhase] = useState('closed')   // closed|listening|analyzing|result|denied|error
  const [result, setResult] = useState(null)
  const [fb, setFb] = useState(null)             // 사용자 피드백: null|'up'|'down'|'done'
  const a = useRef({})
  const orbRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => () => cleanup(), [])   // 언마운트 정리
  if (!moraList.length) return null

  function cleanup() {
    const o = a.current
    try { cancelAnimationFrame(o.raf) } catch {}
    try { o.stream?.getTracks().forEach(t => t.stop()) } catch {}
    try { o.ctx?.close() } catch {}
    a.current = {}
  }

  // 사용자 피드백 적재 — '이 채점이 맞았나'를 정답 라벨로 수집(베타 정확도 개선용)
  function sendFeedback(verdict, reason) {
    try {
      logLearning('pitch_feedback', japanese, {
        verdict, reason: reason || null, score: result?.score,
        target: accent, mine: result?.mine, down_target: result?.downT, input: inputText,
      })
    } catch {}
  }

  async function open() {
    setPhase('listening'); setResult(null); setFb(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const analyser = ctx.createAnalyser(); analyser.fftSize = 2048
      ctx.createMediaStreamSource(stream).connect(analyser)
      const buf = new Float32Array(analyser.fftSize)
      const o = { ctx, stream, analyser, buf, frames: [], started: 0, silence: 0, t0: ctx.currentTime, last: 0 }
      a.current = o
      loop()
    } catch (e) {
      cleanup(); setPhase(e?.name === 'NotAllowedError' ? 'denied' : 'error')
    }
  }

  function loop() {
    const o = a.current
    if (!o.analyser) return
    o.analyser.getFloatTimeDomainData(o.buf)
    drawWave(o.buf)
    // 실시간 레벨(RMS) → 원 크기/광도
    let ss = 0; for (let i = 0; i < o.buf.length; i++) ss += o.buf[i] * o.buf[i]
    const rms = Math.sqrt(ss / o.buf.length)
    if (orbRef.current) {
      const s = Math.min(1.7, 1 + rms * 6)
      orbRef.current.style.transform = `scale(${s.toFixed(3)})`
      orbRef.current.style.boxShadow = `0 0 ${20 + rms * 160}px ${6 + rms * 40}px rgba(92,169,206,${Math.min(0.5, 0.12 + rms * 2)})`
    }
    const now = o.ctx.currentTime
    if (now - o.last >= 0.03) {
      o.last = now
      const f0 = detectPitch(o.buf, o.ctx.sampleRate)
      o.frames.push({ f0 })
      const speaking = rms > 0.012
      if (speaking) { o.started = o.started || now; o.silence = 0 }
      else if (o.started) o.silence += 0.03
      if (o.started && o.silence > 0.8) return finish()     // 말 끝나고 0.8초 무음 → 자동
      if (now - o.t0 > 7) return finish()                   // 최대 7초
    }
    o.raf = requestAnimationFrame(loop)
  }

  function drawWave(buf) {
    const c = canvasRef.current; if (!c) return
    const ctx = c.getContext('2d'); const W = c.width, H = c.height
    ctx.clearRect(0, 0, W, H)
    ctx.lineWidth = 2; ctx.strokeStyle = PRIMARY; ctx.beginPath()
    const step = Math.floor(buf.length / W) || 1
    for (let x = 0; x < W; x++) {
      const v = buf[x * step] || 0
      const y = H / 2 + v * H * 0.85
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.stroke()
  }

  function finish() {
    const frames = a.current.frames || []
    cleanup(); setPhase('analyzing')
    setTimeout(() => analyze(frames), 80)
  }

  function analyze(frames) {
    const voiced = frames.filter(f => f.f0 > 0)
    if (voiced.length < Math.max(5, N)) { setPhase('error'); return }
    const semis = voiced.map(f => hzToSemi(f.f0))
    const sorted = [...semis].sort((x, y) => x - y)
    const med = sorted[Math.floor(sorted.length / 2)]
    const norm = semis.map(s => s - med)
    const moraPitch = []
    for (let i = 0; i < N; i++) {
      const seg = norm.slice(Math.floor(i * norm.length / N), Math.floor((i + 1) * norm.length / N))
      const ssort = (seg.length ? seg : [0]).slice().sort((x, y) => x - y)
      moraPitch.push(ssort[Math.floor(ssort.length / 2)])
    }
    const mn = Math.min(...moraPitch), mx = Math.max(...moraPitch), mid = (mn + mx) / 2
    const flat = (mx - mn) < 1.5
    const mine = moraPitch.map(p => (!flat && p >= mid ? 1 : 0))
    const downT = downstepIndex(accent), downM = downstepIndex(mine)
    const moraMatch = mine.reduce((s, v, i) => s + (v === accent[i] ? 1 : 0), 0) / N
    const downOK = downT === downM
    const score = Math.round((downOK ? 60 : Math.max(0, 60 - Math.abs(downT - downM) * 18)) + moraMatch * 40)
    let coach
    if (flat && downT >= 0) coach = '한국어 영향으로 평평하게 말하기 쉬워요. 한 곳에서 또렷이 내려보세요.'
    else if (downOK) coach = '악센트 핵 위치 정확! 일본어다움의 80%는 여기예요. 👍'
    else if (downT >= 0 && downM >= 0) coach = `${downT + 1}번째 모라 ${moraList[downT] || ''} 에서 내려가야 하는데 위치가 살짝 달랐어요.`
    else if (downT < 0) coach = '이 단어는 끝까지 평판(平板)이라 내리지 않아요. 거의 다 왔어요!'
    else coach = '핵심은 잡았어요. 다운스텝 위치만 한 번 더 맞춰볼까요?'
    setResult({ mine, score, downT, coach })
    setPhase('result')
    try { logLearning('pitch_attempt', japanese, { input: inputText, target: accent, mine, down_target: downT, down_mine: downM, score, flat }) } catch {}
  }

  function close() { cleanup(); setPhase('closed') }

  // 결과 곡선 좌표
  const W = N * 40 + 24, GH = 110, HY = 26, LY = 78
  const px = (i) => 12 + 20 + i * 40
  const path = (acc) => acc.map((v, i) => `${i ? 'L' : 'M'} ${px(i)} ${v ? HY : LY}`).join(' ')

  if (phase === 'closed') {
    return (
      <div style={{ margin: '2px 20px 6px' }}>
        <button onClick={open} style={chip}>
          <Mic /> 발음 연습 <span style={{ fontSize: 9.5, color: 'var(--warning)', background: 'var(--warning-tint)', borderRadius: 5, padding: '1px 5px' }}>베타</span>
        </button>
      </div>
    )
  }

  // ── 전체화면 음성모드 오버레이 ──
  return (
    <div style={overlay}>
      <button onClick={close} aria-label="닫기" style={closeBtn}>✕</button>

      {/* 상단: 목표 문장 */}
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#fff', fontFamily: "'Noto Sans JP',sans-serif", lineHeight: 1.3 }}>{japanese}</p>
        {korean_pronunciation && <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{korean_pronunciation}</p>}
      </div>

      {/* 중앙: 상태별 */}
      {(phase === 'listening' || phase === 'analyzing') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
          <div style={{ position: 'relative', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div ref={orbRef} style={{ width: 110, height: 110, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #7cc4e6, ${PRIMARY})`, transition: 'transform 0.06s linear', willChange: 'transform' }} />
          </div>
          <canvas ref={canvasRef} width={300} height={64} style={{ width: 300, height: 64, opacity: phase === 'analyzing' ? 0.3 : 1 }} />
          <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
            {phase === 'analyzing' ? '발음 패턴 분석 중…' : '따라 말해보세요'}
          </p>
          {phase === 'listening' && <button onClick={finish} style={stopBtn}>멈추고 분석</button>}
        </div>
      )}

      {phase === 'result' && result && (
        <div style={{ width: '100%', maxWidth: 420, padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f3b22', background: '#aee4c4', borderRadius: 999, padding: '6px 16px' }}>
              {result.score >= 80 ? '아주 좋아요!' : result.score >= 55 ? '핵심은 잡았어요!' : '거의 다 왔어요'} · {result.score}점
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '14px 12px 10px' }}>
            <div style={{ overflowX: 'auto' }}>
              <svg width={W} height={GH} viewBox={`0 0 ${W} ${GH}`} style={{ display: 'block', margin: '0 auto' }}>
                {[HY, LY].map((y, i) => <line key={i} x1={12} y1={y} x2={W - 12} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="2 3" />)}
                <text x={4} y={HY + 3} fontSize="9" fill="rgba(255,255,255,0.4)">高</text>
                <text x={4} y={LY + 3} fontSize="9" fill="rgba(255,255,255,0.4)">低</text>
                <path d={path(accent)} fill="none" stroke={PRIMARY} strokeWidth="2.6" strokeLinejoin="round" />
                <path d={path(result.mine)} fill="none" stroke={MINE} strokeWidth="2.2" strokeDasharray="5 4" strokeLinejoin="round" />
                {result.downT >= 0 && <text x={px(result.downT)} y={14} fontSize="10" fill={PRIMARY} textAnchor="middle">▼</text>}
                {moraList.map((m, i) => <text key={i} x={px(i)} y={GH - 5} fontSize="12" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="'Noto Sans JP',sans-serif">{m}</text>)}
              </svg>
            </div>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
              <span><span style={{ color: PRIMARY }}>━</span> 정답</span>
              <span><span style={{ color: MINE }}>┅</span> 내 발음</span>
            </div>
          </div>
          <p style={{ margin: '14px 0 10px', fontSize: 13.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.55, textAlign: 'center' }}>{result.coach}</p>

          {/* 피드백 — 채점이 맞았는지 사용자에게 묻기(베타 정확도 개선용 데이터) */}
          <div style={{ marginBottom: 14, padding: '11px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, textAlign: 'center' }}>
            {fb === null && (
              <>
                <p style={{ margin: '0 0 9px', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>이 채점, 정확했나요?</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <button onClick={() => { setFb('up'); sendFeedback('up') }} style={fbBtn}>👍 좋아요</button>
                  <button onClick={() => setFb('down')} style={fbBtn}>👎 아쉬워요</button>
                </div>
              </>
            )}
            {fb === 'down' && (
              <>
                <p style={{ margin: '0 0 9px', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>어떤 점이 아쉬웠나요?</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[['wrong_judge', '정답인데 틀렸대요'], ['not_heard', '내 발음 인식이 안 됨'], ['bad_coach', '코칭이 이상해요']].map(([r, label]) => (
                    <button key={r} onClick={() => { sendFeedback('down', r); setFb('done') }} style={fbChip}>{label}</button>
                  ))}
                </div>
              </>
            )}
            {(fb === 'up' || fb === 'done') && (
              <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.8)' }}>알려줘서 고마워요 🙌 베타를 같이 키워가요.</p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={open} style={{ ...stopBtn, flex: 1, background: PRIMARY, color: '#fff', border: 'none' }}>다시 말하기</button>
            <button onClick={close} style={{ ...stopBtn, flex: 1 }}>닫기</button>
          </div>
        </div>
      )}

      {(phase === 'denied' || phase === 'error') && (
        <div style={{ textAlign: 'center', padding: '0 32px' }}>
          <p style={{ margin: '0 0 18px', fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            {phase === 'denied' ? '마이크 권한이 꺼져 있어요.\n설정에서 마이크를 켜주세요.' : '잘 안 들렸어요.\n더 또렷하게 다시 말해볼까요?'}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {phase === 'error' && <button onClick={open} style={{ ...stopBtn, background: PRIMARY, color: '#fff', border: 'none' }}>다시 말하기</button>}
            <button onClick={close} style={stopBtn}>닫기</button>
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
const overlay = { position: 'fixed', inset: 0, zIndex: 9500, background: 'radial-gradient(circle at 50% 35%, #1a2730 0%, #0b1116 70%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '64px 0 48px' }
const closeBtn = { position: 'absolute', top: 18, right: 18, width: 38, height: 38, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: 16, cursor: 'pointer', fontFamily: 'inherit' }
const stopBtn = { height: 46, padding: '0 22px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }
const fbBtn = { height: 36, padding: '0 16px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }
const fbChip = { height: 32, padding: '0 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }
