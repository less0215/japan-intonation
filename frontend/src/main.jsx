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

/* AppsFlyer SDK 초기화 — 앱 환경에서만 실행 */
if (isApp) {
  import('appsflyer-capacitor-plugin').then(({ AppsFlyer }) => {
    AppsFlyer.initSDK({
      appID: 'com.tickjapan.app',
      devKey: 'EX5AVwQz9vfi3LqsMnKER3',
      isDebug: false,
      waitForATTUserAuthorization: 10,
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
