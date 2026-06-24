/* 첫 방문 시 앱 다운로드 유도 팝업 (웹 전용)
 * - 처음 방문한 사람에게만 노출
 * - '이미 앱이 있어요 · 다시 보지 않기' 누르면 영구 숨김
 * - X(닫기)는 이번 세션만 닫힘
 */
import { useEffect, useState } from 'react'
import { track } from '../App'

const PRIMARY = '#5CA9CE'
const DISMISS_KEY = 'tickjapan_app_promo_dismissed'

export default function AppDownloadPromo({ onDownload }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === 'true') return
    } catch { return }
    // 진입 직후 살짝 늦게 등장 (화면 안정 후)
    const t = setTimeout(() => { setVisible(true); track('app_promo_view') }, 1200)
    return () => clearTimeout(t)
  }, [])

  function closeSession() { setVisible(false) }
  function dismissForever() {
    try { localStorage.setItem(DISMISS_KEY, 'true') } catch {}
    track('app_promo_dismiss')
    setVisible(false)
  }
  function handleDownload() {
    try { localStorage.setItem(DISMISS_KEY, 'true') } catch {}
    track('app_promo_download_click')
    setVisible(false)
    onDownload()
  }

  if (!visible) return null

  return (
    <div
      onClick={closeSession}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(20,30,40,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 320,
          background: '#fff', borderRadius: 20,
          padding: '28px 24px 16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        }}
      >
        {/* 닫기(세션) */}
        <button
          onClick={closeSession}
          aria-label="닫기"
          style={{
            position: 'absolute', top: 12, right: 14, width: 26, height: 26,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 17, color: 'var(--text-3)', lineHeight: 1, padding: 0,
          }}
        >✕</button>

        {/* 아이콘 */}
        <img
          src="/apple-touch-icon.png"
          alt="틱재팬"
          width="60" height="60"
          style={{ borderRadius: 15, marginBottom: 12, boxShadow: '0 4px 16px rgba(92,169,206,0.22)' }}
        />

        {/* 카피 */}
        <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 6px', lineHeight: 1.35 }}>
          앱으로 더 쾌적하게 공부해요
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 18px', lineHeight: 1.55 }}>
          틱재팬 앱을 설치하면 더 빠르고 편하게<br />일본어를 번역하고 학습할 수 있어요.
        </p>

        {/* 다운로드 버튼 */}
        <button
          onClick={handleDownload}
          style={{
            width: '100%', height: 48, border: 'none', borderRadius: 12,
            background: PRIMARY, color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          앱 다운로드
        </button>

        {/* 영구 숨김 */}
        <button
          onClick={dismissForever}
          style={{
            width: '100%', height: 36, marginTop: 2,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 12.5, color: 'var(--text-3)', fontFamily: 'inherit',
          }}
        >
          이미 앱이 있어요 · 다시 보지 않기
        </button>
      </div>
    </div>
  )
}
