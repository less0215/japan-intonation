import { detectTravelProducts } from '../data/travelContext'

/* 맥락 트리거 — 번역 결과가 여행 관련일 때만 관련 Klook 상품 1~2개 추천
 * - 매칭 없으면 렌더 안 함(스팸 방지)
 * - 태그를 result_context로 바꿔 홈 배너와 실적 분리 */
const PRIMARY = '#5CA9CE'

function openContextual(item) {
  const url = item.url.replace('aff_label1=home_section', 'aff_label1=result_context')
  try { window.gtag?.('event', 'affiliate_click', { partner: 'klook', item_id: item.id, price: item.price, placement: 'result_context' }) } catch {}
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function ContextualTravel({ input, japanese }) {
  const items = detectTravelProducts(input, japanese)
  if (items.length === 0) return null

  return (
    <div style={{ marginTop: 8, border: '1px solid #e3eef4', borderRadius: 13, background: 'linear-gradient(135deg, #f4fafd 0%, #eef6fb 100%)', padding: '11px 12px' }}>
      <p style={{ margin: '0 0 9px', fontSize: 12.5, fontWeight: 600, color: '#3a6f8a' }}>
        일본 여행 준비 중이세요? 이건 어때요
      </p>
      <div style={{ display: 'flex', gap: 9 }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openContextual(item)}
            style={{ flex: 1, minWidth: 0, textAlign: 'left', padding: 0, cursor: 'pointer', background: '#fff', border: '1px solid #e2e9ee', borderRadius: 11, overflow: 'hidden', fontFamily: 'inherit' }}
          >
            <div style={{ height: 72, background: `#e8edf0 url('${item.image}') center/cover` }} />
            <div style={{ padding: '7px 8px 9px' }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, color: '#3a3f44', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 29 }}>{item.name}</p>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: PRIMARY }}>₩{item.price.toLocaleString()}~</span>
            </div>
          </button>
        ))}
      </div>
      <p style={{ margin: '7px 0 0', fontSize: 9.5, color: '#aab6bd' }}>제휴 링크 · 구매 시 틱재팬에 수수료가 지급됩니다</p>
    </div>
  )
}
