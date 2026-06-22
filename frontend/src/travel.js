// 마이리얼트립 여행 상품 — 우리 백엔드(/travel/products)에서 큐레이션 카탈로그를 받아온다.
// (API 키는 서버에만 있고, 프론트는 우리 백엔드하고만 통신)

const API_URL = 'https://japan-intonation-production.up.railway.app'

let _cache = null
let _promise = null

// 카탈로그 1회 로드 + 메모리 캐시
export function loadTravelProducts() {
  if (_cache) return Promise.resolve(_cache)
  if (_promise) return _promise
  _promise = fetch(`${API_URL}/travel/products`)
    .then((r) => (r.ok ? r.json() : { products: [] }))
    .then((d) => { _cache = d.products || []; return _cache })
    .catch(() => { _cache = []; return _cache })
  return _promise
}

// 맥락 매칭 — 입력(한국어)+번역문에서 상품 keywords로 매칭. 최대 2개. 없으면 [].
export function matchTravelProducts(products, ...texts) {
  const hay = texts.filter(Boolean).join(' ').toLowerCase()
  if (!hay.trim() || !products || products.length === 0) return []

  const matched = []
  for (const p of products) {
    const kws = p.keywords || []
    if (kws.some((k) => k && hay.includes(String(k).toLowerCase()))) {
      matched.push(p)
      if (matched.length >= 2) break
    }
  }
  if (matched.length > 0) return matched

  // 구체 매칭 없음 → 일반 일본 여행 키워드면 general 카테고리 기본 추천
  const GENERAL = ['오사카', '도쿄', '교토', '후지', '일본 여행', '여행', '관광', '호텔', '숙소', '온천', '벚꽃', '항공']
  if (GENERAL.some((k) => hay.includes(k))) {
    const gen = products.filter((p) => p.cat === 'general')
    return (gen.length ? gen : products).slice(0, 2)
  }
  return []
}

// 클릭 → 추적 링크 + utm_content(배치__상품) 부착 후 열기 (배치별 전환 추적용)
export function openTravelProduct(item, placement) {
  if (!item?.url) return
  const utm = `${placement}__${item.gid || item.id}`.slice(0, 100)
  const sep = item.url.includes('?') ? '&' : '?'
  const url = `${item.url}${sep}utm_content=${encodeURIComponent(utm)}`
  try { window.gtag?.('event', 'affiliate_click', { partner: 'myrealtrip', item_id: item.gid, placement }) } catch {}
  window.open(url, '_blank', 'noopener,noreferrer')
}
