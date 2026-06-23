// 마이리얼트립 여행 상품 — 우리 백엔드(/travel/products)에서 큐레이션 카탈로그를 받아온다.
// (API 키는 서버에만 있고, 프론트는 우리 백엔드하고만 통신)

const API_URL = 'https://japan-intonation-production.up.railway.app'
const CACHE_KEY = 'tickjapan_travel_cache'
const CACHE_TTL = 6 * 3600 * 1000   // 6시간

let _cache = null
let _promise = null

function _readCache() {
  try {
    const r = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (r && Array.isArray(r.products) && (Date.now() - r.t) < CACHE_TTL) return r.products
  } catch {}
  return null
}
function _writeCache(products) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), products })) } catch {}
}

// 동기 캐시 조회 — 첫 렌더에서 바로 쓸 수 있으면 반환(없으면 null) → 레이아웃 점프 방지
export function getCachedTravelProducts() {
  if (_cache) return _cache
  const c = _readCache()
  if (c) { _cache = c }
  return _cache
}

function _fetchFresh() {
  if (_promise) return _promise
  _promise = fetch(`${API_URL}/travel/products`)
    .then((r) => (r.ok ? r.json() : { products: [] }))
    .then((d) => { _cache = d.products || []; _writeCache(_cache); _promise = null; return _cache })
    .catch(() => { _promise = null; return _cache || [] })
  return _promise
}

// 카탈로그 로드 — 캐시 있으면 즉시 반환 + 백그라운드 갱신, 없으면 fetch
export function loadTravelProducts() {
  const cached = getCachedTravelProducts()
  if (cached) { _fetchFresh(); return Promise.resolve(cached) }   // 즉시 + 뒤에서 최신화
  return _fetchFresh()
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
  const partner = item.partner || 'myrealtrip'
  let url = item.url
  // 마이리얼트립만 utm_content(배치__상품) 추적 부착. 세시간전 등은 원본 링크 그대로.
  if (partner === 'myrealtrip') {
    const utm = `${placement}__${item.gid || item.id}`.slice(0, 100)
    const sep = url.includes('?') ? '&' : '?'
    url = `${url}${sep}utm_content=${encodeURIComponent(utm)}`
  }
  try { window.gtag?.('event', 'affiliate_click', { partner, item_id: item.gid, placement }) } catch {}
  window.open(url, '_blank', 'noopener,noreferrer')
}
