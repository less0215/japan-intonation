import { useState, useEffect, useRef } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const CODE_EXPIRE = 5 * 60  // 5분 (초)

/* 휴대폰 자동 하이픈 포맷 */
function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

/* 타이머 표시 MM:SS */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function SignupModal({ onSuccess, onClose, mode = 'save' }) {
  const [step, setStep]         = useState('input')   // 'input' | 'verify'
  const [name, setName]         = useState('')
  const [phone, setPhone]       = useState('')
  const [code, setCode]         = useState('')
  const [timer, setTimer]       = useState(CODE_EXPIRE)
  const [sending, setSending]   = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError]       = useState('')
  const timerRef = useRef(null)
  const codeInputRef = useRef(null)

  /* 타이머 정리 */
  useEffect(() => () => clearInterval(timerRef.current), [])

  /* 타이머 시작 */
  function startTimer() {
    setTimer(CODE_EXPIRE)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  /* 인증번호 발송 */
  async function handleSendCode(e) {
    e.preventDefault()
    if (!name.trim()) return setError('이름을 입력해 주세요.')
    if (phone.replace(/\D/g, '').length < 10) return setError('올바른 휴대폰 번호를 입력해 주세요.')

    setSending(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || 'SMS 발송에 실패했습니다.')
      }
      setStep('verify')
      startTimer()
      setTimeout(() => codeInputRef.current?.focus(), 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  /* 인증번호 재발송 */
  async function handleResend() {
    setCode('')
    setError('')
    setSending(true)
    try {
      const res = await fetch(`${API_URL}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      if (!res.ok) throw new Error('재발송에 실패했습니다.')
      startTimer()
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  /* 인증번호 확인 */
  async function handleVerify(e) {
    e.preventDefault()
    if (code.length < 6) return setError('6자리 인증번호를 입력해 주세요.')
    if (timer === 0) return setError('인증번호가 만료되었습니다. 재발송해 주세요.')

    setVerifying(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, code }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || '인증에 실패했습니다.')
      }
      const data = await res.json()
      onSuccess({ user_id: data.user_id, name: data.name })
    } catch (err) {
      setError(err.message)
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 4 }}>
          <p className="modal-title">
            {mode === 'login' ? '로그인' : '저장하기'}
          </p>
          <p className="modal-subtitle">
            {step === 'input'
              ? mode === 'login'
                ? '가입 시 사용한 휴대폰 번호로 로그인하세요'
                : '처음 저장 시 간단한 정보가 필요해요'
              : `${phone} 으로 인증번호를 발송했어요`}
          </p>
        </div>

        {/* ── 1단계: 이름 + 번호 입력 */}
        {step === 'input' && (
          <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              className="modal-input"
              type="text"
              placeholder="이름"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            <input
              className="modal-input"
              type="tel"
              placeholder="휴대폰 번호 (010-0000-0000)"
              value={phone}
              onChange={e => setPhone(formatPhone(e.target.value))}
              inputMode="tel"
            />
            {error && <p style={{ fontSize: 13, color: '#c53030', margin: '0 2px' }}>{error}</p>}
            <button type="submit" className="modal-submit" disabled={sending} style={{ marginTop: 4 }}>
              {sending ? '발송 중...' : '인증번호 받기'}
            </button>
          </form>
        )}

        {/* ── 2단계: 인증번호 입력 */}
        {step === 'verify' && (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 인증번호 입력 + 타이머 */}
            <div style={{ position: 'relative' }}>
              <input
                ref={codeInputRef}
                className="modal-input"
                type="text"
                placeholder="인증번호 6자리"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                style={{ paddingRight: 70, letterSpacing: '0.2em' }}
              />
              <span style={{
                position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                fontSize: 14, fontWeight: 600,
                color: timer < 60 ? '#e53e3e' : '#5CA9CE',
              }}>
                {formatTime(timer)}
              </span>
            </div>

            {error && <p style={{ fontSize: 13, color: '#c53030', margin: '0 2px' }}>{error}</p>}

            <button type="submit" className="modal-submit" disabled={verifying || timer === 0} style={{ marginTop: 4 }}>
              {verifying ? '확인 중...' : '확인'}
            </button>

            {/* 재발송 + 번호 변경 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button type="button" onClick={handleResend} disabled={sending}
                style={{ background: 'none', border: 'none', fontSize: 13, color: '#888', cursor: 'pointer' }}>
                {sending ? '발송 중...' : '인증번호 재발송'}
              </button>
              <span style={{ color: '#ddd', fontSize: 13 }}>|</span>
              <button type="button" onClick={() => { setStep('input'); setCode(''); setError(''); clearInterval(timerRef.current) }}
                style={{ background: 'none', border: 'none', fontSize: 13, color: '#888', cursor: 'pointer' }}>
                번호 변경
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
