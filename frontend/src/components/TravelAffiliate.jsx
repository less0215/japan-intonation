import { useState, useEffect } from 'react'
import { loadTravelProducts, getCachedTravelProducts, openTravelProduct } from '../travel'

/* 일본 여행 준비 — 마이리얼트립/세시간전 제휴 추천 (홈)
 * - 캐시가 있으면 첫 렌더에서 즉시 표시(레이아웃 점프 방지)
 * - 첫 방문(캐시 없음)엔 같은 높이의 스켈레톤으로 자리 예약 후 부드럽게 전환
 * - 우→좌 자동 흐름(마퀴), hover 시 일시정지 */
const PRIMARY = '#5CA9CE'

const Header = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 2px 8px' }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>일본 여행 준비</span>
    <span style={{ fontSize: 11, color: '#b6bcc1' }}>· 더 싸고 편하게</span>
  </div>
)

// 로딩(첫 방문) 스켈레톤 — 실제 카드와 같은 크기로 자리만 예약
function Skeleton() {
  return (
    <div style={{ marginTop: 4 }}>
      <Header />
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden', padding: '2px 0 6px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ flex: '0 0 auto', width: 142, border: '1px solid var(--bd)', borderRadius: 13, overflow: 'hidden', background: 'var(--surface)' }}>
            <div style={{ height: 90, background: 'var(--surface-2)' }} />
            <div style={{ padding: '8px 9px 10px' }}>
              <div style={{ height: 8, width: '55%', background: 'var(--surface-2)', borderRadius: 4, marginBottom: 7 }} />
              <div style={{ height: 9, width: '90%', background: 'var(--surface-2)', borderRadius: 4, marginBottom: 5 }} />
              <div style={{ height: 9, width: '40%', background: 'var(--surface-2)', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TravelAffiliate() {
  // 캐시 있으면 즉시(동기) 표시, 없으면 null(=첫 방문 로딩)
  const [items, setItems] = useState(() => getCachedTravelProducts())
  useEffect(() => { loadTravelProducts().then(setItems) }, [])

  if (items == null) return <Skeleton />
  if (items.length === 0) return null

  const loop = [...items, ...items]
  const duration = Math.max(24, Math.round(items.length * 2.6))

  return (
    <div style={{ marginTop: 4 }} className="travel-fadein">
      <style>{`
        @keyframes travelflow { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes travelfade { from { opacity: 0; } to { opacity: 1; } }
        .travel-fadein { animation: travelfade .35s ease both; }
        .travel-marquee { animation: travelflow var(--dur,60s) linear infinite; }
        .travel-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .travel-marquee { animation: none; } .travel-fadein { animation: none; } }
      `}</style>

      <Header />

      <div style={{ overflow: 'hidden', padding: '2px 0 6px' }}>
        <div className="travel-marquee" style={{ display: 'flex', width: 'max-content', '--dur': `${duration}s` }}>
          {loop.map((item, i) => (
            <button
              key={`${item.id}-${i}`}
              aria-hidden={i >= items.length ? 'true' : undefined}
              onClick={() => openTravelProduct(item, 'home_banner')}
              style={{
                flex: '0 0 auto', width: 142, marginRight: 10, textAlign: 'left', padding: 0, cursor: 'pointer',
                background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 13, overflow: 'hidden',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ height: 90, background: `#e8edf0 url('${item.image}') center/cover` }} />
              <div style={{ padding: '8px 9px 10px' }}>
                <p style={{ margin: '0 0 3px', fontSize: 10.5, color: 'var(--text-3)' }}>{item.city} · 일본</p>
                <p style={{
                  margin: '0 0 6px', fontSize: 11.5, color: 'var(--text-strong)', lineHeight: 1.35,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 31,
                }}>{item.title}</p>
                {item.price > 0 && (
                  <span style={{ fontSize: 12, fontWeight: 600, color: PRIMARY }}>
                    ₩{item.price.toLocaleString()}~
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <p style={{ margin: '6px 2px 0', fontSize: 10, color: 'var(--text-3)' }}>
        일부 링크는 제휴 링크이며, 구매 시 틱재팬에 일정 수수료가 지급됩니다.
      </p>
    </div>
  )
}
