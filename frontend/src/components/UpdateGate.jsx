import { useState, useEffect } from 'react'

/* 강제 업데이트 게이트 (앱 전용)
 * - 서버(/app-version)의 min_required 보다 설치버전이 낮으면 닫기 불가 팝업 → App Store로.
 * - 웹은 동작 안 함. 서버 호출 실패 시엔 막지 않음(fail-open).
 * ★ 새 버전 빌드할 때마다 APP_VERSION 을 그 버전(=project.pbxproj MARKETING_VERSION)으로 올릴 것! */
const APP_VERSION = '1.7'
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

/* "1.6.2" 같은 버전 비교 — a<b 면 음수 */
function cmpVersion(a, b) {
  const pa = String(a).split('.').map(n => parseInt(n, 10) || 0)
  const pb = String(b).split('.').map(n => parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0)
    if (d !== 0) return d
  }
  return 0
}

export default function UpdateGate() {
  const [info, setInfo] = useState(null)   // { ios_url } when update required

  useEffect(() => {
    if (!isApp) return
    fetch(`${API_URL}/app-version`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && d.min_required && cmpVersion(APP_VERSION, d.min_required) < 0) {
          setInfo({ ios_url: d.ios_url })
        }
      })
      .catch(() => {})   // 실패 시 막지 않음
  }, [])

  if (!info) return null

  const openStore = () => {
    try { window.open(info.ios_url, '_system') } catch { window.location.href = info.ios_url }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(15,25,35,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <div style={{ width: 320, maxWidth: '92vw', background: 'var(--surface, #fff)', borderRadius: 20, padding: '28px 22px 20px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.32)' }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(92,169,206,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: 'var(--text-strong, #1a2730)' }}>새 버전이 나왔어요</p>
        <p style={{ margin: '0 0 20px', fontSize: 13.5, color: 'var(--text-2, #5f6b73)', lineHeight: 1.6 }}>
          더 나은 번역과 새로운 기능을 위해<br />최신 버전으로 업데이트해 주세요.
        </p>
        <button onClick={openStore} style={{ width: '100%', height: 50, border: 'none', borderRadius: 14, background: PRIMARY, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          App Store에서 업데이트
        </button>
      </div>
    </div>
  )
}
