/* 앱 다운로드 페이지 — OS 감지 + 추적(UTM) 링크 */
import { useEffect, useState } from 'react'
import { track } from '../App'

const PRIMARY = '#5CA9CE'

/* App Store 링크 (UTM + Apple 캠페인 토큰 ct) — GA4·App Analytics 추적용 */
const IOS_URL =
  'https://apps.apple.com/kr/app/id6781296261' +
  '?mt=8&ct=download_page' +
  '&utm_source=tickjapan_web&utm_medium=download_page&utm_campaign=launch'

function detectOS() {
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

export default function DownloadPage() {
  const [os, setOs] = useState('other')
  useEffect(() => {
    setOs(detectOS())
    track('download_page_view', { os: detectOS() })
  }, [])

  function handleIos() {
    track('download_click', { os: 'ios', store: 'app_store' })
    if (typeof window.__afLog === 'function') window.__afLog('af_download_click', { store: 'app_store' })
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
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111', margin: '20px 0 8px', lineHeight: 1.4 }}>
        일본어에만 집중한<br />AI 통번역 및 학습 앱
      </h1>
      <p style={{ fontSize: 14.5, color: '#777', lineHeight: 1.6, margin: '0 0 32px', maxWidth: 320 }}>
        앱 다운 후 쾌적한 환경에서 이용해 보세요!
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
            height: 56, borderRadius: 14, textDecoration: 'none',
            background: iosPrimary ? '#111' : '#fff',
            color: iosPrimary ? '#fff' : '#111',
            border: iosPrimary ? 'none' : '1.5px solid #e2e2e2',
            fontSize: 15.5, fontWeight: 600,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.978 4.46z"/>
          </svg>
          App Store에서 받기
        </a>

        {/* Android — 출시 예정 */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            height: 56, borderRadius: 14,
            background: '#f5f5f5', color: '#aaa',
            border: '1.5px solid #eee',
            fontSize: 15.5, fontWeight: 600, cursor: 'default',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 20.5V3.5c0-.35.18-.66.46-.85L13.5 12 3.46 21.35A.99.99 0 0 1 3 20.5zm13.81-5.31l-2.54-1.46L12.4 12l1.87-1.73 2.54-1.46 2.2 1.27c.71.41.71 1.43 0 1.84l-2.2 1.27zM5.5 2.62l8.55 4.93-1.9 1.76-6.65-6.69zm0 18.76l6.65-6.69 1.9 1.76-8.55 4.93z"/>
          </svg>
          Android 출시 예정
        </div>
      </div>

      {/* OS 안내 문구 */}
      <p style={{ fontSize: 12.5, color: '#bbb', marginTop: 20 }}>
        {os === 'android'
          ? 'Android 버전은 곧 출시됩니다. iOS는 지금 이용 가능해요.'
          : os === 'ios'
          ? '버튼을 누르면 App Store로 이동합니다.'
          : '아이폰은 App Store에서, 안드로이드는 곧 만나요.'}
      </p>
    </div>
  )
}
