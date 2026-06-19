/* 앱 다운로드 페이지 — OS 감지 + 추적(UTM) 링크 */
import { useEffect, useState } from 'react'
import { track } from '../App'
import { useUser } from '../context/UserContext'
import SignupModal from './SignupModal'

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

/* AppsFlyer OneLink — 클릭→설치 어트리뷰션. iOS는 App Store로 리다이렉트됨
 * pid=download_page, c=web_launch 가 링크에 내장되어 AppsFlyer에서 추적 */
const IOS_URL = 'https://tickjapan.onelink.me/NFsQ/jzbm8oeu'

function detectOS() {
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

function getFrom() {
  try { return new URLSearchParams(window.location.search).get('from') || 'direct' }
  catch { return 'direct' }
}

export default function DownloadPage() {
  const { user, setUser } = useUser()
  const [os, setOs] = useState('other')
  const [androidDone, setAndroidDone] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  useEffect(() => {
    setOs(detectOS())
    track('download_page_view', { os: detectOS(), from: getFrom() })
  }, [])

  function handleIos() {
    track('download_click', { os: 'ios', store: 'app_store', from: getFrom() })
    if (typeof window.__afLog === 'function') window.__afLog('af_download_click', { store: 'app_store' })
  }

  /* 알림 신청 서버 기록 (로그인 회원만) */
  async function recordInterest(u) {
    if (!u?.user_id) return
    try {
      await fetch(`${API_URL}/android-interest`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: u.user_id }),
      })
    } catch { /* 무시 */ }
    try { localStorage.setItem('tickjapan_android_notify', 'true') } catch {}
    setAndroidDone(true)
    track('android_interest', { from: getFrom(), logged_in: true })
  }

  /* Android '출시 알림 받기' — 로그인 안 했으면 가입 모달, 했으면 바로 신청 */
  function handleAndroid() {
    if (androidDone) return
    track('android_interest_click', { from: getFrom(), logged_in: !!user })
    if (user?.user_id) recordInterest(user)
    else setShowSignup(true)
  }

  /* 가입/로그인 성공 → 유저 저장 후 알림 신청 */
  function handleSignupSuccess(u) {
    setUser(u)
    setShowSignup(false)
    recordInterest(u)
  }

  const iosPrimary = os !== 'android'   // 안드로이드 기기가 아니면 iOS를 강조

  return (
    <div style={{
      minHeight: '70vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '32px 22px 60px', gap: 0,
    }}>
      {/* 앱 아이콘 */}
      <img
        src="/apple-touch-icon.png"
        alt="틱재팬"
        width="84" height="84"
        style={{ borderRadius: 20, boxShadow: '0 6px 20px rgba(92,169,206,0.25)' }}
      />

      {/* 타이틀 */}
      <h1 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '20px 0 8px', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
        일본어에만 집중한 AI 번역앱
      </h1>
      <p style={{ fontSize: 12, color: '#777', lineHeight: 1.6, margin: '0 0 32px', whiteSpace: 'nowrap' }}>
        일본어 문법 설명은 물론 특유의 억양·뉘앙스까지 알려드립니다!
      </p>

      {/* 버튼 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
        {/* iOS */}
        <a
          href={IOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleIos}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            height: 56, borderRadius: 16, textDecoration: 'none',
            background: iosPrimary
              ? 'linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 55%, #000 100%)'
              : '#fff',
            color: iosPrimary ? '#fff' : '#111',
            border: iosPrimary ? '1px solid rgba(255,255,255,0.08)' : '1.5px solid #e2e2e2',
            boxShadow: iosPrimary
              ? '0 8px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)'
              : 'none',
            fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.2px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.978 4.46z"/>
          </svg>
          App Store에서 받기
        </a>

        {/* Android — 출시 예정 (클릭 시 관심 표시 기록) */}
        <button
          onClick={handleAndroid}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            height: 56, borderRadius: 14, width: '100%', fontFamily: 'inherit',
            background: androidDone ? '#eaf7f1' : '#f5f5f5',
            color: androidDone ? '#1d9e75' : '#999',
            border: `1.5px solid ${androidDone ? '#bfe8d6' : '#eee'}`,
            fontSize: 15.5, fontWeight: 600, cursor: androidDone ? 'default' : 'pointer',
          }}
        >
          {androidDone ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              출시되면 알려드릴게요!
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5c0-.35.18-.66.46-.85L13.5 12 3.46 21.35A.99.99 0 0 1 3 20.5zm13.81-5.31l-2.54-1.46L12.4 12l1.87-1.73 2.54-1.46 2.2 1.27c.71.41.71 1.43 0 1.84l-2.2 1.27zM5.5 2.62l8.55 4.93-1.9 1.76-6.65-6.69zm0 18.76l6.65-6.69 1.9 1.76-8.55 4.93z"/>
              </svg>
              Android 출시 알림 받기
            </>
          )}
        </button>
      </div>

      {/* OS 안내 문구 */}
      <p style={{ fontSize: 12.5, color: '#bbb', marginTop: 20 }}>
        {os === 'android'
          ? 'Android 버전은 곧 출시됩니다. iOS는 지금 이용 가능해요.'
          : os === 'ios'
          ? '버튼을 누르면 App Store로 이동합니다.'
          : '아이폰은 App Store에서, 안드로이드는 곧 만나요.'}
      </p>

      {/* 알림 신청용 가입/로그인 모달 */}
      {showSignup && (
        <SignupModal
          onSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
          title="Android 출시 알림 받기"
          subtitle="이름과 휴대폰 번호를 남기면, Android 앱이 출시될 때 가장 먼저 알려드려요."
          submitLabel="알림 신청하기"
        />
      )}
    </div>
  )
}
