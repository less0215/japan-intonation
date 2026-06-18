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

/* 앱 환경에서만 AppsFlyer 초기화 (ATT 요청은 번역 1회 후 사전 안내 시트에서 별도 처리) */
if (isApp) {
  import('appsflyer-capacitor-plugin').then(({ AppsFlyer }) => {
    AppsFlyer.initSDK({
      appID: '6781296261',   // App Store 숫자 ID (어트리뷰션용)
      devKey: 'EX5AVwQz9vfi3LqsMnKER3',
      isDebug: false,
      waitForATTUserAuthorization: 60,  // ATT는 번역 후 물으므로 대기시간 넉넉히
      registerOnDeepLink: true,
      registerConversionListener: true,
    })
  })
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
