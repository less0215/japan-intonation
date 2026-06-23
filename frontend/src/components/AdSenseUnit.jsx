import { useEffect, useRef } from 'react'

/* AdSense 디스플레이 광고 (웹 전용)
 * - 앱(Capacitor 웹뷰)에선 AdSense 정책상 금지 → 렌더 안 함
 * - ADSENSE_ENABLED: 계정/사이트 승인 + 실제 광고 게재 준비가 되면 true 로.
 *   승인 전(false)엔 광고 슬롯(<ins>)을 아예 렌더하지 않아 빈자리·'타닥' 점프가 없음.
 *   단, 승인 심사를 위해 adsbygoogle.js 스크립트는 계속 로드한다.
 */
const CLIENT = 'ca-pub-8958373483224358'
const ADSENSE_ENABLED = false   // ← 승인 후 광고 켤 때 true
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

export default function AdSenseUnit({ slot, style }) {
  const pushedRef = useRef(false)
  useEffect(() => {
    if (isApp) return
    // 스크립트 최초 1회 주입 (승인 심사용 — 광고 비활성이어도 로드)
    if (!document.querySelector('script[data-adsense]')) {
      const s = document.createElement('script')
      s.async = true
      s.crossOrigin = 'anonymous'
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`
      s.setAttribute('data-adsense', '1')
      document.head.appendChild(s)
    }
    // 광고 슬롯 활성 시에만 push
    if (!ADSENSE_ENABLED || pushedRef.current) return
    pushedRef.current = true
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
  }, [])

  // 앱이거나 광고 비활성 → 슬롯 렌더 안 함 (자리 차지 X)
  if (isApp || !ADSENSE_ENABLED) return null
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
