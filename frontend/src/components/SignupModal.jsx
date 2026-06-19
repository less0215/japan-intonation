import { useState } from 'react'
import { track } from '../App'

const API_URL = 'https://japan-intonation-production.up.railway.app'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function SignupModal({ onSuccess, onClose, mode = 'save', title, subtitle, submitLabel }) {
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('이름을 입력해 주세요.')
    if (phone.replace(/\D/g, '').length < 10) return setError('올바른 휴대폰 번호를 입력해 주세요.')

    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || '요청에 실패했습니다.')
      }
      const data = await res.json()
      track('signup_complete', { trigger: mode })
      onSuccess({ user_id: data.user_id, name: data.name, fast_unlimited: !!data.fast_unlimited })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 4 }}>
          <p className="modal-title">
            {title ?? (mode === 'login' ? '로그인' : '저장하기')}
          </p>
          <p className="modal-subtitle">
            {subtitle ?? (mode === 'login'
              ? '가입 시 입력한 이름과 휴대폰 번호를 그대로 입력하시면 로그인됩니다'
              : '이름과 휴대폰 번호를 입력하면 저장이 시작됩니다. 다음에 같은 정보로 다시 불러올 수 있어요')}
          </p>

          {/* 중복 가입 방지 안내 — 번호 고유 식별 */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 7,
            padding: '9px 11px',
            background: '#f0f9ff',
            border: '1px solid #d6ecf7',
            borderRadius: 9,
            marginTop: 2,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5CA9CE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span style={{ fontSize: 12, color: '#357694', lineHeight: 1.5 }}>
              휴대폰 번호는 중복 가입이 불가능하니 정확한 정보를 입력해 주세요.
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          <button type="submit" className="modal-submit" disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '처리 중...' : (submitLabel ?? (mode === 'login' ? '로그인' : '가입하고 저장하기'))}
          </button>
        </form>
      </div>
    </div>
  )
}
