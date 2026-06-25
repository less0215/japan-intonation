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

// ── 맥락 매칭(적합도 기반) ─────────────────────────────────────
// 번역 입력+결과(또는 라이브캠 도시)에서 '권역/명소'를 감지해 같은 권역 상품만 점수순 추천.
//  ① 약매칭(범용 단어 '여행·관광'만 걸린 것)은 버려 엉뚱한 노출 방지(예: '나고야 여행'에 오사카투어 X)
//  ② 권역 단위로 인근까지 자연 노출(간사이=오사카·교토·고베…)  ③ 여행 맥락 아니면 비노출.
// 도시/명소 단어 → 권역 코드 (텍스트·상품 키워드 모두 이걸로 권역 판정)
const PLACE_REGION = {
  // 간토·후지권
  '도쿄': 'kanto', '東京': 'kanto', '신주쿠': 'kanto', '시부야': 'kanto', '아사쿠사': 'kanto', '우에노': 'kanto', '긴자': 'kanto', '이케부쿠로': 'kanto', '하라주쿠': 'kanto',
  '디즈니': 'kanto', '스카이트리': 'kanto', '팀랩': 'kanto', 'teamlab': 'kanto', '나리타': 'kanto', '하네다': 'kanto', '스카이라이너': 'kanto', '요코하마': 'kanto', '가마쿠라': 'kanto', '닛코': 'kanto',
  '후지': 'kanto', '후지산': 'kanto', '富士': 'kanto', '하코네': 'kanto', '가와구치코': 'kanto', '河口湖': 'kanto',
  // 간사이
  '오사카': 'kansai', '大阪': 'kansai', '도톤보리': 'kansai', '난바': 'kansai', '우메다': 'kansai', '신사이바시': 'kansai', '유니버설': 'kansai', '유니버셜': 'kansai', 'usj': 'kansai', '라피트': 'kansai', '간사이': 'kansai',
  '교토': 'kansai', '京都': 'kansai', '기요미즈': 'kansai', '기온': 'kansai', '아라시야마': 'kansai', '후시미': 'kansai', '이나리': 'kansai', '고베': 'kansai', '神戸': 'kansai', '나라': 'kansai', '奈良': 'kansai',
  // 규슈·오키나와
  '후쿠오카': 'kyushu', '福岡': 'kyushu', '하카타': 'kyushu', '구마모토': 'kyushu', '가고시마': 'kyushu', '사쿠라지마': 'kyushu', '나가사키': 'kyushu', '벳푸': 'kyushu', '유후인': 'kyushu', '오키나와': 'kyushu', '沖縄': 'kyushu', '나하': 'kyushu',
  // 주부
  '나고야': 'chubu', '名古屋': 'chubu', '가나자와': 'chubu', '金沢': 'chubu', '다카야마': 'chubu',
  // 주고쿠·시코쿠
  '히로시마': 'cs', '広島': 'cs', '다카마쓰': 'cs', '돗토리': 'cs', '오카야마': 'cs',
  // 홋카이도·도호쿠
  '삿포로': 'north', '札幌': 'north', '홋카이도': 'north', '하코다테': 'north', '오타루': 'north', '후라노': 'north', '센다이': 'north', '아오모리': 'north',
}
const SIM_TERMS = ['유심', '이심', 'esim', '데이터', '로밍', '와이파이', '포켓와이파이']
const WEAK_TERMS = ['여행', '관광', '일정', '투어', '당일', '일본', '일본여행', '예약', '후기', '가격', '입장권', '티켓']

function _regionsIn(hay) {
  const r = new Set()
  for (const term in PLACE_REGION) if (hay.includes(term)) r.add(PLACE_REGION[term])
  return r
}

// 맥락 매칭(적합도 점수순, 최대 2개). 여행 맥락(장소/통신 의도)이 없으면 [].
export function matchTravelProducts(products, ...texts) {
  const hay = texts.filter(Boolean).join(' ').toLowerCase()
  if (!hay.trim() || !products || products.length === 0) return []

  const textRegions = _regionsIn(hay)
  const simIntent = SIM_TERMS.some((t) => hay.includes(t))
  if (textRegions.size === 0 && !simIntent) return []   // 여행 맥락 아님 → 비노출

  const scored = []
  for (const p of products) {
    const kws = (p.keywords || []).map((k) => String(k).toLowerCase())
    const matched = kws.filter((k) => k && hay.includes(k))
    if (matched.length === 0) continue
    // 적합도 = 텍스트 권역과 일치하는 '장소' 키워드 수(많을수록 더 구체적·관련 높음)
    let score = matched.filter((k) => PLACE_REGION[k] && textRegions.has(PLACE_REGION[k])).length
    // 통신(유심/eSIM) 의도 + eSIM 상품 → 노출 후보
    if (simIntent && p.cat === 'esim') score = Math.max(score, 1)
    if (score > 0) scored.push({ p, score })   // 약매칭(범용 단어만, score 0)은 자동 제외
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 2).map((x) => x.p)
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
