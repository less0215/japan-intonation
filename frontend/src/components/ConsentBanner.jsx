/* 개인정보 수집·분석 동의 배너 — 앱 첫 실행 시 표시 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CONSENT_KEY = 'tickjapan_analytics_consent'

/* gtag consent 상태 업데이트 헬퍼 */
function grantAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { 'analytics_storage': 'granted' })
  }
}

function denyAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { 'analytics_storage': 'denied' })
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored === null) {
        /* 동의 기록 없으면 배너 표시 */
        setVisible(true)
      }
    } catch (e) {
      /* localStorage 접근 불가 시 배너 표시 안 함 */
    }
  }, [])

  function handleAgree() {
    try { localStorage.setItem(CONSENT_KEY, 'true') } catch (e) {}
    grantAnalytics()
    setVisible(false)
  }

  function handleDeny() {
    try { localStorage.setItem(CONSENT_KEY, 'false') } catch (e) {}
    denyAnalytics()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: 'var(--surface)',
      borderTop: '1px solid var(--bd)',
      padding: '16px 20px 24px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.10)',
    }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--text-strong)', lineHeight: 1.7 }}>
        틱재팬은 서비스 개선을 위해 앱 사용 통계를 수집합니다.
        개인을 식별하는 정보는 수집하지 않습니다.
      </p>
      <p style={{ margin: '0 0 14px', fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>
        자세한 내용은{' '}
        <button
          onClick={() => navigate('/privacy')}
          style={{ background: 'none', border: 'none', padding: 0, color: '#5CA9CE', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}
        >
          개인정보처리방침
        </button>
        을 확인하세요.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleAgree}
          style={{
            flex: 1,
            padding: '11px 0',
            borderRadius: 10,
            border: 'none',
            background: '#5CA9CE',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          동의
        </button>
        <button
          onClick={handleDeny}
          style={{
            flex: 1,
            padding: '11px 0',
            borderRadius: 10,
            border: '1.5px solid #e0e0e0',
            background: '#fff',
            color: 'var(--text-2)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          거부
        </button>
      </div>
    </div>
  )
}
