/* 회원 탈퇴 확인 모달 */
import { useState } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

export default function DeleteAccountModal({ user, onDeleted, onClose }) {
  const [step, setStep]       = useState('confirm') // 'confirm' | 'loading' | 'done'
  const [error, setError]     = useState('')

  async function handleDelete() {
    setStep('loading')
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/user/${user.user_id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error()
      setStep('done')
    } catch {
      setError('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      setStep('confirm')
    }
  }

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.sheet} onClick={e => e.stopPropagation()}>

        {step === 'done' ? (
          /* 완료 화면 */
          <>
            <div style={styles.iconWrap}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="#1D9E75" strokeWidth="1.8"/>
                <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={styles.title}>탈퇴가 완료되었습니다</h2>
            <p style={styles.desc}>그동안 틱재팬을 이용해 주셔서 감사합니다.</p>
            <button style={{ ...styles.btnPrimary, background: '#1D9E75' }} onClick={onDeleted}>
              확인
            </button>
          </>
        ) : (
          /* 확인 화면 */
          <>
            {/* 닫기 버튼 */}
            <button style={styles.closeBtn} onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div style={styles.iconWrap}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="#e05a5a" strokeWidth="1.8"/>
                <line x1="12" y1="7" x2="12" y2="13" stroke="#e05a5a" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="16.5" r="1.1" fill="#e05a5a"/>
              </svg>
            </div>

            <h2 style={styles.title}>정말 탈퇴하시겠어요?</h2>
            <p style={styles.desc}>
              탈퇴하면 <strong>{user.name}</strong>님의 저장된 번역 기록이
              모두 삭제되며 복구할 수 없습니다.
            </p>

            <div style={styles.infoBox}>
              <p style={{ margin: 0, fontSize: 12.5, color: '#888', lineHeight: 1.7 }}>
                • 저장 단어·예문은 기기에 남아 있습니다<br />
                • 동일한 전화번호로 재가입할 수 있습니다
              </p>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.btnRow}>
              <button style={styles.btnGhost} onClick={onClose} disabled={step === 'loading'}>
                취소
              </button>
              <button style={styles.btnDanger} onClick={handleDelete} disabled={step === 'loading'}>
                {step === 'loading' ? '처리 중…' : '탈퇴하기'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

const styles = {
  backdrop: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    zIndex: 1000,
  },
  sheet: {
    background: '#fff',
    borderRadius: '20px 20px 0 0',
    padding: '32px 24px 40px',
    width: '100%',
    maxWidth: 480,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 16,
    background: 'none', border: 'none',
    cursor: 'pointer', padding: 4,
    display: 'flex', alignItems: 'center',
  },
  iconWrap: {
    marginBottom: 4,
  },
  title: {
    fontSize: 18, fontWeight: 700, color: '#111',
    margin: 0, textAlign: 'center',
  },
  desc: {
    fontSize: 14, color: '#555', lineHeight: 1.7,
    textAlign: 'center', margin: 0,
  },
  infoBox: {
    background: '#f8f9fa',
    border: '1px solid #e8e8e8',
    borderRadius: 10,
    padding: '12px 14px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 4,
  },
  error: {
    fontSize: 13, color: '#e05a5a', margin: 0, textAlign: 'center',
  },
  btnRow: {
    display: 'flex', gap: 10, width: '100%', marginTop: 8,
  },
  btnGhost: {
    flex: 1, height: 48,
    background: '#f5f5f5', border: 'none',
    borderRadius: 12, fontSize: 15, fontWeight: 600,
    color: '#555', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnDanger: {
    flex: 1, height: 48,
    background: '#e05a5a', border: 'none',
    borderRadius: 12, fontSize: 15, fontWeight: 600,
    color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
  },
  btnPrimary: {
    width: '100%', height: 48,
    background: PRIMARY, border: 'none',
    borderRadius: 12, fontSize: 15, fontWeight: 600,
    color: '#fff', cursor: 'pointer', fontFamily: 'inherit',
    marginTop: 8,
  },
}
