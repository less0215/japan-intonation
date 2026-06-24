/* 안드로이드 출시 알림 팝업
 * - 출시 알림 신청한 회원에게만, Android 출시 후 1회 노출
 * - ANDROID_LAUNCHED를 true로 바꾸고, PLAY_URL을 실제 링크로 교체하면 활성화됨
 * - 노출 조건: 출시 ON + 로그인 + 서버 신청자(opted_in) + 미노출(notified=false) + 로컬 미닫음
 */
import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { track } from '../App'

const API_URL = 'https://japan-intonation-production.up.railway.app'

/* 출시되면 true로 변경 + 실제 Play 스토어/OneLink 주소 입력 */
const ANDROID_LAUNCHED = false
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.tickjapan.app'

const DISMISS_KEY = 'tickjapan_android_launch_seen'

export default function AndroidLaunchPopup() {
  const { user } = useUser()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ANDROID_LAUNCHED || !user?.user_id) return
    try { if (localStorage.getItem(DISMISS_KEY) === 'true') return } catch { return }

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/android-interest/${user.user_id}`)
        if (!res.ok) return
        const { opted_in } = await res.json()
        if (!cancelled && opted_in) { setVisible(true); track('android_launch_popup_view') }
      } catch { /* 무시 */ }
    })()
    return () => { cancelled = true }
  }, [user?.user_id])

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, 'true') } catch {}
    setVisible(false)
  }
  function handleInstall() {
    track('android_launch_popup_install')
    try { localStorage.setItem(DISMISS_KEY, 'true') } catch {}
    setVisible(false)
    window.open(PLAY_URL, '_blank', 'noopener,noreferrer')
  }

  if (!visible) return null

  return (
    <div className="modal-backdrop" onClick={dismiss}>
      <div
        className="modal-sheet"
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', alignItems: 'center', textAlign: 'center', gap: 0, padding: '28px 24px 16px' }}
      >
        {/* 닫기 */}
        <button
          onClick={dismiss}
          aria-label="닫기"
          style={{ position: 'absolute', top: 12, right: 14, width: 26, height: 26, background: 'none', border: 'none', fontSize: 17, color: 'var(--text-3)', cursor: 'pointer', padding: 0, lineHeight: 1 }}
        >✕</button>

        {/* 아이콘 */}
        <div style={{ width: 60, height: 60, borderRadius: 16, background: '#eaf7f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#1d9e75">
            <path d="M17.6 9.48l1.84-3.18a.4.4 0 1 0-.69-.4l-1.86 3.23a11.46 11.46 0 0 0-9.78 0L5.25 5.9a.4.4 0 1 0-.69.4L6.4 9.48A11.34 11.34 0 0 0 .5 18.5h23a11.34 11.34 0 0 0-5.9-9.02zM7 15.25a1.13 1.13 0 1 1 0-2.25 1.13 1.13 0 0 1 0 2.25zm10 0a1.13 1.13 0 1 1 0-2.25 1.13 1.13 0 0 1 0 2.25z"/>
          </svg>
        </div>

        {/* 카피 */}
        <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 6px', lineHeight: 1.4 }}>
          기다려주셔서 고마워요!
        </p>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '0 0 20px', lineHeight: 1.6 }}>
          신청하신 <b style={{ fontWeight: 700, color: 'var(--text-strong)' }}>틱재팬 Android 앱</b>이<br />드디어 출시됐어요. 지금 바로 설치해요!
        </p>

        {/* 설치 버튼 (안드로이드 그린 그라데이션) */}
        <button
          onClick={handleInstall}
          style={{
            width: '100%', height: 50, borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'linear-gradient(145deg, #3ec98f 0%, #1d9e75 60%, #16855f 100%)',
            color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 8px 22px rgba(29,158,117,0.35), inset 0 1px 0 rgba(255,255,255,0.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.6 1.8a1 1 0 0 0-.6.92v18.56a1 1 0 0 0 .6.92l10.1-10.2L3.6 1.8zm12.3 8.3l-2.6-2.62L5.2 2.3l10.7 7.8zm0 3.8l-10.7 7.8 8.1-5.18 2.6-2.62zm1.5-2.3l2.9-1.68c.66-.38.66-1.34 0-1.72L17.4 6.2 14.6 12l2.8 5.8 2.9-1.68z"/>
          </svg>
          Play 스토어에서 받기
        </button>
        <button
          onClick={dismiss}
          style={{ width: '100%', height: 38, marginTop: 2, background: 'none', border: 'none', fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          다음에 할게요
        </button>
      </div>
    </div>
  )
}
