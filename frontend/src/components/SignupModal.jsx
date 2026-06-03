import { useState } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'

/* 이름 + 휴대폰 번호로 간단 가입/로그인하는 하단 시트 모달 */
export default function SignupModal({ onSuccess, onClose }) {
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  /* 휴대폰 자동 하이픈 포맷: 01012345678 → 010-1234-5678 */
  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length < 4) return digits
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const trimName  = name.trim()
    const trimPhone = phone.trim()

    if (!trimName)  return setError('이름을 입력해 주세요.')
    if (trimPhone.replace(/\D/g, '').length < 10)
      return setError('올바른 휴대폰 번호를 입력해 주세요.')

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimName, phone: trimPhone }),
      })
      if (!res.ok) throw new Error('가입에 실패했습니다.')
      const data = await res.json()
      onSuccess({ user_id: data.user_id, name: data.name })
    } catch {
      setError('오류가 발생했습니다. 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        <div>
          <p className="modal-title">저장하기</p>
          <p className="modal-subtitle">처음 저장 시 간단한 정보가 필요해요</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
          {error && (
            <p style={{ fontSize: 13, color: '#c53030', margin: '0 2px' }}>{error}</p>
          )}
          <button
            type="submit"
            className="modal-submit"
            disabled={loading}
            style={{ marginTop: 4 }}
          >
            {loading ? '처리 중...' : '가입하고 저장'}
          </button>
        </form>
      </div>
    </div>
  )
}
