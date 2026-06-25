import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './context/UserContext'
import App from './App'
import './App.css'

/* 테마 초기 적용 — 저장값 우선, 없으면 시스템 설정(prefers-color-scheme) */
try {
  const saved = localStorage.getItem('tickjapan_theme')
  const dark = saved ? saved === 'dark'
    : window.matchMedia?.('(prefers-color-scheme: dark)').matches
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
} catch {}

/* 앱(Capacitor) 환경에서는 HashRouter, 웹에서는 BrowserRouter */
const isApp = window.Capacitor?.isNativePlatform?.() ?? false
const Router = isApp ? HashRouter : BrowserRouter

/* 앱 환경에서만 AppsFlyer 초기화 (ATT 요청은 번역 1회 후 사전 안내 시트에서 별도 처리) */
if (isApp) {
  // 앱 동작 설정(광고 빈도 등) 로드 — 백엔드에서 값만 바꾸면 재빌드 없이 반영
  import('./config').then(({ loadConfig }) => loadConfig())
  import('appsflyer-capacitor-plugin').then(({ AppsFlyer }) => {
    AppsFlyer.initSDK({
      appID: '6781296261',   // App Store 숫자 ID (어트리뷰션용)
      devKey: 'EX5AVwQz9vfi3LqsMnKER3',
      isDebug: false,
      waitForATTUserAuthorization: 60,  // ATT는 번역 후 물으므로 대기시간 넉넉히
      registerOnDeepLink: true,
      registerConversionListener: true,
    })
    // 인앱 이벤트 로깅 헬퍼 — track()에서 호출 (앱 환경에서만 존재)
    window.__afLog = (eventName, eventValue = {}) => {
      AppsFlyer.logEvent({ eventName, eventValue }).catch(() => {})
    }
  })
  // AdMob 보상형 광고 초기화 (현재 테스트 광고)
  import('./ads').then(({ initAds }) => initAds())
  // 인앱 결제(RevenueCat) 초기화 — 로그인 사용자 연결은 App.jsx에서 처리
  import('./iap').then(({ initIAP }) => { try { const u = JSON.parse(localStorage.getItem('tickjapan_user') || 'null'); initIAP(u?.user_id) } catch { initIAP() } })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
)
