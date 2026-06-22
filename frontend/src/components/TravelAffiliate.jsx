import { KLOOK_PRODUCTS } from '../data/klookProducts'

/* 일본 여행 준비 — Klook 제휴 추천 섹션
 * - 가로 스크롤 카드. 광고 배너가 아닌 "여행 준비 도움" 톤
 * - 클릭 시 GA4 이벤트 기록(내 클릭 수 자체 집계 → 대시보드 대조용) 후 새 탭으로 이동
 * - TODO(앱): @capacitor/browser 설치 후 외부 브라우저로 열어 추적 쿠키 보장 */
const PRIMARY = '#5CA9CE'

function openAffiliate(item) {
  // 자체 클릭 집계 (Klook 대시보드와 대조용)
  try { window.gtag?.('event', 'affiliate_click', { partner: 'klook', item_id: item.id, price: item.price }) } catch {}
  window.open(item.url, '_blank', 'noopener,noreferrer')
}

export default function TravelAffiliate() {
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '4px 2px 8px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#8a9197' }}>일본 여행 준비</span>
        <span style={{ fontSize: 11, color: '#b6bcc1' }}>· 더 싸고 편하게</span>
      </div>

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '2px 2px 6px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {KLOOK_PRODUCTS.map((item) => (
          <button
            key={item.id}
            onClick={() => openAffiliate(item)}
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
              }}>{item.name}</p>
              <span style={{ fontSize: 12, fontWeight: 600, color: PRIMARY }}>
                ₩{item.price.toLocaleString()}~
              </span>
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
