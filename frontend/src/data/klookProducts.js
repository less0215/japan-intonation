// Klook 제휴 상품 큐레이션 (일본 여행) — aid=125095, 통화 KRW, 태그 home_section
// ⚠️ 가격은 변동될 수 있어 "최저가 ~" 형태로만 노출. 이미지는 Klook CDN.
// 제휴 링크: 클릭 시 추적 → 구매 시 틱재팬에 수수료 (커미션율은 참고용, 사용자 비노출)

const BASE = 'https://affiliate.klook.com/redirect?aid=125095&_currency=KRW'
const TAG = '&aff_label1=home_section'
const link = (activityPath) => `${BASE}&k_site=${encodeURIComponent('https://www.klook.com' + activityPath)}${TAG}`
const img = (id) => `https://res.klook.com/image/upload/c_fill,w_400,h_300/activities/${id}.jpg`

export const KLOOK_PRODUCTS = [
  {
    id: 'sushi-making',
    city: '도쿄',
    name: '도쿄 스시 만들기 체험 & 요리 강좌',
    price: 52300,
    image: img('bdlloubxgklcs24yswyw'),
    url: link('/ko/activity/122869-tokyo-sushi-making-experience-japanese-cooking-class'),
  },
  {
    id: 'kimono-tokyo',
    city: '도쿄',
    name: '도쿄 기모노 렌탈 & 사진 촬영 (아사쿠사)',
    price: 26500,
    image: img('z1ioc8zcsyhs3gqwczuy'),
    url: link('/ko/activity/2125-kimono-experience-tokyo'),
  },
  {
    id: 'usj-osaka',
    city: '오사카',
    name: '오사카 유니버설 스튜디오 재팬 입장권',
    price: 83700,
    image: img('tfutvhekax4sl8ryt5u2'),
    url: link('/ko/activity/46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry'),
  },
  {
    id: 'ghibli-park',
    city: '나고야',
    name: '아이치 지브리 파크 티켓',
    price: 34400,
    image: img('ey36go4ieyukkpecrq5f'),
    url: link('/ko/activity/132673-ghibli-park-ticket'),
  },
  {
    id: 'jr-kansai-wide',
    city: '오사카',
    name: 'JR 서일본 간사이 와이드 패스',
    price: 113600,
    image: img('vwxge6wpij0bep6eejcc'),
    url: link('/ko/activity/3277-5-day-kansai-wide-area-jr-pass'),
  },
  {
    id: 'fuji-daytour',
    city: '후지산',
    name: '후지산 당일 투어 (말차 체험 포함)',
    price: 74000,
    image: img('raa9paomp6548dspuohl'),
    url: link('/ko/activity/2675-mount-fuji-classic-route-day-tour-tokyo'),
  },
  {
    id: 'luggage-delivery',
    city: '도쿄',
    name: '도쿄 공항 → 호텔 수하물 배송 서비스',
    price: 17800,
    image: img('cgv9rjnwszy1h7hr6udi'),
    url: link('/ko/activity/27664-hotel-luggage-delivery-service-tokyo-hotels-airport'),
  },
  {
    id: 'sake-tokyo',
    city: '도쿄',
    name: '일본 사케 무제한 체험 (도쿄)',
    price: 41700,
    image: img('wzmrvcdkskflrxgzwbs5'),
    url: link('/ko/activity/92502-sake-all-you-can-drink-experience-tokyo'),
  },
]
