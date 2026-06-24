// 음성 입력(STT) 헬퍼 — 한국어 받아쓰기 → 번역 입력창에 채움.
//   · 웹: 브라우저 Web Speech API (ko-KR) — 무료·실시간(부분 결과)
//   · 앱(iOS WKWebView): Web Speech 미지원 → 마이크 녹음(MediaRecorder) → 백엔드 /transcribe(Gemini)로 받아쓰기
// 마이크 버튼은 sttSupported()가 true일 때만 노출. 녹음은 발음 연습과 동일하게 getUserMedia 사용(앱에서 검증됨).

const API_URL = 'https://japan-intonation-production.up.railway.app'
const isApp = () => window.Capacitor?.isNativePlatform?.() ?? false
const hasWebSpeech = () => !!(window.SpeechRecognition || window.webkitSpeechRecognition)
const hasRecorder = () => !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder)

// 웹 상태
let _webRec = null
let _finalized = false
let _lastPartial = ''
// 앱(녹음) 상태
let _mediaRec = null
let _stream = null
let _chunks = []
let _active = false
let _pending = null     // sttStop이 참조하는 현재 세션 콜백

export async function sttSupported() {
  try {
    if (isApp()) return hasRecorder()      // 앱: 녹음 → 백엔드
    return hasWebSpeech()                   // 웹: Web Speech API
  } catch { return false }
}

// Gemini가 받는 오디오 포맷 우선순위로 MediaRecorder mimeType 선택(iOS=mp4/aac, 그 외 ogg/webm)
function pickMime() {
  const cands = ['audio/mp4', 'audio/aac', 'audio/ogg;codecs=opus', 'audio/webm;codecs=opus', 'audio/webm']
  for (const c of cands) { try { if (window.MediaRecorder?.isTypeSupported?.(c)) return c } catch {} }
  return ''
}

function blobToB64(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onloadend = () => resolve(String(r.result).split(',')[1] || '')
    r.onerror = reject
    r.readAsDataURL(blob)
  })
}

function stopStream() {
  try { _stream?.getTracks?.().forEach(t => t.stop()) } catch {}
  _stream = null
}

async function transcribeBlob(blob, mime) {
  const audio_b64 = await blobToB64(blob)
  const res = await fetch(`${API_URL}/transcribe`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audio_b64, mime_type: mime || 'audio/mp4', lang: 'ko' }),
  })
  if (!res.ok) throw new Error('transcribe_failed')
  const d = await res.json()
  return (d.text || '').trim()
}

// 콜백: onPartial(text) 웹 실시간 / onFinal(text) 확정 / onError(code) / onEnd() / onTranscribing() 앱 변환중
export async function sttStart({ onPartial, onFinal, onError, onEnd, onTranscribing } = {}) {
  if (_active) return
  _active = true
  _finalized = false
  _lastPartial = ''
  _chunks = []
  const end = () => { if (_active) { _active = false; onEnd?.() } }
  const emitFinal = (t) => { if (_finalized) return; _finalized = true; onFinal?.((t || '').trim()) }
  // sttStop이 참조할 수 있도록 콜백 보관
  _pending = { emitFinal, end, onError, onTranscribing }

  try {
    if (isApp()) {
      try {
        _stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      } catch { onError?.('denied'); _active = false; return }
      const mime = pickMime()
      _mediaRec = new MediaRecorder(_stream, mime ? { mimeType: mime } : undefined)
      _mediaRec.ondataavailable = (e) => { if (e.data?.size) _chunks.push(e.data) }
      _mediaRec.start()
    } else {
      const Rec = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!Rec) { onError?.('unsupported'); _active = false; return }
      const rec = new Rec()
      _webRec = rec
      rec.lang = 'ko-KR'
      rec.interimResults = true
      rec.continuous = false
      rec.maxAlternatives = 1
      rec.onresult = (e) => {
        let interim = '', final = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const tr = e.results[i][0].transcript
          if (e.results[i].isFinal) final += tr; else interim += tr
        }
        if (final) { _lastPartial = final; emitFinal(final) }
        else if (interim) { _lastPartial = interim; onPartial?.(interim) }
      }
      rec.onerror = (e) => { onError?.(e.error || 'error') }
      rec.onend = () => { emitFinal(_lastPartial); _webRec = null; end() }   // 침묵 시 자동 종료 포함
      rec.start()
    }
  } catch (e) {
    console.warn('[stt] start 실패', e)
    onError?.('start_failed'); _active = false
  }
}

// 인식 종료(사용자 '완료') → 웹: 즉시 확정 / 앱: 녹음 정지 후 백엔드 받아쓰기
export async function sttStop() {
  const p = _pending
  try {
    if (isApp()) {
      if (!_mediaRec) { p?.end?.(); return }
      p?.onTranscribing?.()                 // UI에 '받아쓰는 중' 표시
      const rec = _mediaRec
      const type = rec.mimeType || _chunks[0]?.type || pickMime() || 'audio/mp4'
      rec.onstop = async () => {
        _mediaRec = null
        stopStream()
        try {
          const text = (_chunks.length ? await transcribeBlob(new Blob(_chunks, { type }), type) : '')
          p?.emitFinal?.(text)
        } catch {
          p?.onError?.('transcribe_failed')
        }
        p?.end?.()
      }
      try { rec.stop() } catch { stopStream(); p?.end?.() }
    } else {
      _webRec?.stop?.()                      // → onend → onFinal/onEnd
    }
  } catch {}
}

// 취소(결과 버림)
export async function sttCancel() {
  _finalized = true
  _lastPartial = ''
  if (isApp()) {
    try { _mediaRec?.stop?.() } catch {}
    _mediaRec = null
    _chunks = []
    stopStream()
    _pending?.end?.()
  } else {
    try { _webRec?.stop?.() } catch {}
  }
}
