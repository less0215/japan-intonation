import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

/* 앱(Capacitor)환경에서는 서버가 없으므로 HashRouter 사용 */
const isApp = window.Capacitor?.isNativePlatform?.() ?? false
const Router = isApp ? HashRouter : BrowserRouter
import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './context/UserContext'
import App from './App'
import './App.css'

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
