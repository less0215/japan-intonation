import { KLOOK_PRODUCTS } from './klookProducts'

// 번역 문장의 여행 맥락 감지 → 관련 Klook 상품 추천 (클라이언트 키워드 매칭, 무지연·무비용)
// 구체적 키워드 우선, 없으면 일반 일본 여행 키워드로 기본 추천.

const byId = Object.fromEntries(KLOOK_PRODUCTS.map((p) => [p.id, p]))

// 구체 키워드 → 상품 id (순서 = 우선순위)
const SPECIFIC = [
  { id: 'luggage-delivery', kw: ['공항', '나리타', '하네다', '간사이공항', '수하물', '캐리어', '짐 ', '공항버스', '리무진'] },
  { id: 'usj-osaka',        kw: ['유니버설', '유니버셜', 'usj', '유니버', '닌텐도', '슈퍼닌텐도'] },
  { id: 'ghibli-park',      kw: ['지브리', '토토로', '하울', '센과'] },
  { id: 'kimono-tokyo',     kw: ['기모노', '유카타', '전통의상', '하카마'] },
  { id: 'sushi-making',     kw: ['스시', '초밥', '요리 체험', '쿠킹', '만들기 체험', '라멘', '오마카세'] },
  { id: 'sake-tokyo',       kw: ['사케', '이자카야', '니혼슈', '술집', '한잔'] },
  { id: 'fuji-daytour',     kw: ['후지산', '후지', '富士', '가와구치코', '하코네'] },
  { id: 'jr-kansai-wide',   kw: ['신칸센', 'jr', '제이알', '전철', '지하철', '기차', '열차', '패스', '교통', '역까지', '전차'] },
]

// 일반 일본 여행 키워드 (구체 매칭 없을 때 기본 추천)
const GENERAL_KW = ['오사카', '도쿄', '교토', '일본 여행', '여행', '관광', '호텔', '숙소', '료칸', '온천', '벚꽃', '단풍', '항공', '비행기']
const GENERAL_PICKS = ['jr-kansai-wide', 'sushi-making']

// 입력(한국어)+번역문에서 매칭. 최대 2개 상품 반환. 없으면 [].
export function detectTravelProducts(...texts) {
  const hay = texts.filter(Boolean).join(' ').toLowerCase()
  if (!hay.trim()) return []

  const matched = []
  for (const { id, kw } of SPECIFIC) {
    if (kw.some((k) => hay.includes(k.toLowerCase()))) {
      if (byId[id] && !matched.includes(id)) matched.push(id)
    }
    if (matched.length >= 2) break
  }
  if (matched.length > 0) return matched.map((id) => byId[id])

  // 구체 매칭 없음 → 일반 여행 키워드면 기본 추천
  if (GENERAL_KW.some((k) => hay.includes(k.toLowerCase()))) {
    return GENERAL_PICKS.map((id) => byId[id]).filter(Boolean)
  }
  return []
}
