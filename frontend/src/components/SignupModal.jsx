import { useState } from 'react'
import { track } from '../App'

const API_URL = 'https://japan-intonation-production.up.railway.app'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function SignupModal({ onSuccess, onClose, mode = 'save' }) {
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
      onSuccess({ user_id: data.user_id, name: data.name })
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
            {mode === 'login' ? '로그인' : '저장하기'}
          </p>
          <p className="modal-subtitle">
            {mode === 'login'
              ? '가입 시 사용한 이름과 휴대폰 번호로 로그인하세요'
              : '처음 저장 시 간단한 정보가 필요해요'}
          </p>
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
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '가입하고 저장하기'}
          </button>
        </form>
      </div>
    </div>
  )
}
