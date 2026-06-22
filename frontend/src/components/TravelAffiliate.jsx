import { useState, useEffect } from 'react'
import { loadTravelProducts, openTravelProduct } from '../travel'

/* 일본 여행 준비 — 마이리얼트립 제휴 추천 섹션 (홈)
 * - 백엔드 큐레이션 카탈로그(/travel/products)에서 받아 가로 스크롤 카드로 노출
 * - 카탈로그가 비어있으면(키 미설정/배치 전) 아무것도 안 보임 */
const PRIMARY = '#5CA9CE'

export default function TravelAffiliate() {
  const [items, setItems] = useState([])
  useEffect(() => { loadTravelProducts().then(setItems) }, [])

  if (items.length === 0) return null

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 2px 8px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#8a9197' }}>일본 여행 준비</span>
        <span style={{ fontSize: 11, color: '#b6bcc1' }}>· 더 싸고 편하게</span>
      </div>

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 2px 6px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openTravelProduct(item, 'home_banner')}
            style={{
              flex: '0 0 auto', width: 142, textAlign: 'left', padding: 0, cursor: 'pointer',
              background: '#fff', border: '1px solid #eaecef', borderRadius: 13, overflow: 'hidden',
              fontFamily: 'inherit',
            }}
          >
            <div style={{ height: 90, background: `#e8edf0 url('${item.image}') center/cover` }} />
            <div style={{ padding: '8px 9px 10px' }}>
              <p style={{ margin: '0 0 3px', fontSize: 10.5, color: '#aeb4b9' }}>{item.city} · 일본</p>
              <p style={{
                margin: '0 0 6px', fontSize: 11.5, color: '#2b2f33', lineHeight: 1.35,
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

      <p style={{ margin: '6px 2px 0', fontSize: 10, color: '#c2c7cc' }}>
        일부 링크는 제휴 링크이며, 구매 시 틱재팬에 일정 수수료가 지급됩니다.
      </p>
    </div>
  )
}
