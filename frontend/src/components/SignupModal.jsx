import { useState } from 'react'
import { track } from '../App'

const API_URL = 'https://japan-intonation-production.up.railway.app'

// 관리자 계정 보호: 이름이 '정봉준'으로 시작하면 추가 인증 코드 요구
const ADMIN_NAME_PREFIX = '정봉준'
const ADMIN_EXTRA_CODE = '920322'

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
  const [needCode, setNeedCode] = useState(false)   // 관리자 추가 인증 팝업 표시
  const [code, setCode]         = useState('')
  const [codeError, setCodeError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('이름을 입력해 주세요.')
    if (phone.replace(/\D/g, '').length < 10) return setError('올바른 휴대폰 번호를 입력해 주세요.')
    // 관리자 이름(정봉준*)으로 로그인 시도 → 추가 인증 코드 팝업 먼저
    if (name.trim().startsWith(ADMIN_NAME_PREFIX)) { setError(''); setCode(''); setCodeError(''); setNeedCode(true); return }
    doSignup()
  }

  // 추가 인증 코드 확인 → 일치 시 실제 로그인 진행
  function handleCodeSubmit(e) {
    e.preventDefault()
    if (code.trim() !== ADMIN_EXTRA_CODE) { setCodeError('인증 코드가 올바르지 않습니다.'); return }
    setNeedCode(false); setCodeError('')
    doSignup()
  }

  async function doSignup() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone, platform: (window.Capacitor?.isNativePlatform?.() ?? false) ? 'app' : 'web' }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || '요청에 실패했습니다.')
      }
      const data = await res.json()
      // 신규 가입만 signup_complete(AF/Pixel 매핑) — 기존 회원 재로그인은 login_complete로 분리(어트리뷰션 오염 방지)
      if (data.is_new) track('signup_complete', { trigger: mode, is_new: true })
      else track('login_complete', { trigger: mode, is_returning: true })
      onSuccess({ user_id: data.user_id, name: data.name, fast_unlimited: !!data.fast_unlimited, is_admin: !!data.is_admin })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 관리자 추가 인증 코드 팝업
  if (needCode) {
    return (
      <div className="modal-backdrop" onClick={() => setNeedCode(false)}>
        <div className="modal-sheet" onClick={e => e.stopPropagation()}>
          <div className="modal-handle" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 4 }}>
            <p className="modal-title">관리자 인증</p>
            <p className="modal-subtitle">관리자 계정으로 로그인하려면 추가 인증 코드를 입력해 주세요.</p>
          </div>
          <form onSubmit={handleCodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              className="modal-input"
              type="password"
              inputMode="numeric"
              placeholder="추가 인증 코드"
              value={code}
              onChange={e => { setCode(e.target.value); setCodeError('') }}
              autoFocus
            />
            {codeError && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '0 2px' }}>{codeError}</p>}
            <button type="submit" className="modal-submit" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? '처리 중...' : '인증하고 로그인'}
            </button>
            <button type="button" onClick={() => setNeedCode(false)} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>뒤로</button>
          </form>
        </div>
      </div>
    )
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
            background: 'var(--primary-tint)',
            border: '1px solid var(--primary-tint-bd)',
            borderRadius: 9,
            marginTop: 2,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5CA9CE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span style={{ fontSize: 12, color: 'var(--primary-strong)', lineHeight: 1.5 }}>
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
          {error && <p style={{ fontSize: 13, color: 'var(--danger)', margin: '0 2px' }}>{error}</p>}
          <button type="submit" className="modal-submit" disabled={loading} style={{ marginTop: 4 }}>
            {loading ? '처리 중...' : (submitLabel ?? (mode === 'login' ? '로그인' : '가입하고 저장하기'))}
          </button>
        </form>
      </div>
    </div>
  )
}
