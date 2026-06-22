import { useEffect, useRef } from 'react'

/* AdSense 디스플레이 광고 (웹 전용)
 * - 앱(Capacitor 웹뷰)에선 AdSense 정책상 금지 → 렌더 안 함
 * - adsbygoogle 스크립트는 최초 1회만 주입(lazy), 마운트 시 push
 */
const CLIENT = 'ca-pub-8958373483224358'
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

export default function AdSenseUnit({ slot, style }) {
  const pushedRef = useRef(false)
  useEffect(() => {
    if (isApp || pushedRef.current) return
    pushedRef.current = true
    // 스크립트 최초 1회 주입
    if (!document.querySelector('script[data-adsense]')) {
      const s = document.createElement('script')
      s.async = true
      s.crossOrigin = 'anonymous'
      s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`
      s.setAttribute('data-adsense', '1')
      document.head.appendChild(s)
    }
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
  }, [])

  if (isApp) return null
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
