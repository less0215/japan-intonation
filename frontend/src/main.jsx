import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './context/UserContext'
import App from './App'
import './App.css'

/* 앱(Capacitor) 환경에서는 HashRouter, 웹에서는 BrowserRouter */
const isApp = window.Capacitor?.isNativePlatform?.() ?? false
const Router = isApp ? HashRouter : BrowserRouter

/* 앱 환경에서만: ATT(추적 동의) 팝업 → AppsFlyer SDK 초기화 */
if (isApp) {
  /* 1) ATT 권한 요청 — iOS 추적 동의 팝업. 응답과 무관하게 AppsFlyer는 초기화 */
  async function initTracking() {
    try {
      const { AppTrackingTransparency } = await import('@capgo/capacitor-app-tracking-transparency')
      const { status } = await AppTrackingTransparency.getStatus()
      // 아직 묻지 않은 상태면 권한 요청 팝업 표시
      if (status === 'notDetermined') {
        await AppTrackingTransparency.requestPermission()
      }
    } catch (e) {
      /* ATT 미지원 환경(안드로이드 등)·오류 시 무시하고 진행 */
    }

    /* 2) AppsFlyer 초기화 — ATT 응답 이후 IDFA 포함 여부가 반영됨 */
    const { AppsFlyer } = await import('appsflyer-capacitor-plugin')
    AppsFlyer.initSDK({
      appID: '6781296261',   // App Store 숫자 ID (어트리뷰션용)
      devKey: 'EX5AVwQz9vfi3LqsMnKER3',
      isDebug: false,
      waitForATTUserAuthorization: 10,
      registerOnDeepLink: true,
      registerConversionListener: true,
    })
  }
  initTracking()
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
