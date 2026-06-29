/* 안드로이드 웹 사용자 전용 — '앱 7월 초 출시 예정' 안내 배너.
 * 안드로이드는 아직 앱이 없어 강제 유도 불가 → 출시 대기 안내로 기대치 형성. 닫으면 영구 숨김. */
import { useState } from 'react'

const DISMISS_KEY = 'tickjapan_android_soon_dismissed'
const PRIMARY = '#5CA9CE'

export default function AndroidComingSoonBanner() {
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(DISMISS_KEY) === '1' } catch { return false }
  })
  if (hidden) return null

  return (
    <div style={{
      position: 'fixed', left: 8, right: 8,
      bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))',
      zIndex: 90,
      background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 12,
      padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>🤖</span>
      <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: 'var(--text-1)', lineHeight: 1.45 }}>
        <b style={{ color: 'var(--text-strong)' }}>안드로이드 앱</b>이 <b style={{ color: PRIMARY }}>7월 초 출시</b> 예정이에요! 앱에서 더 빠르고 쾌적하게 만나요.
      </span>
      <button
        onClick={() => { try { localStorage.setItem(DISMISS_KEY, '1') } catch {} ; setHidden(true) }}
        aria-label="닫기"
        style={{ flexShrink: 0, width: 24, height: 24, border: 'none', background: 'none', color: 'var(--text-3)', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1 }}
      >✕</button>
    </div>
  )
}
