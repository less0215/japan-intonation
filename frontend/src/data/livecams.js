/* 일본 라이브캠(날씨) 데이터 — 임베드 허용된 YouTube 라이브 스트림만 큐레이션
 * videoId: youtube.com/embed/{videoId} 로 인앱 임베드
 * channel: 원본 채널(출처 표기 필수)
 * regionId: 지도 강조 키 (JapanMiniMap의 REGION 정의와 일치)
 * marker: 지도 핀 끝점 (viewBox 0 0 220 280) / where·whereSub: 쉬운 위치 설명
 */
export const LIVECAMS = [
  {
    id: 'tokyo', city: '도쿄', cityJp: '東京', cityKana: 'とうきょう', region: '간토', regionId: 'kanto',
    videoId: 'TObte08ESr0', spot: '신주쿠 가부키초', channel: '歌舞伎町ゴジラ前ライブ',
    desc: '신주쿠 가부키초 한복판을 24시간 비추는 라이브캠. 도쿄의 밤과 붐비는 거리를 실시간으로.',
    matchKeywords: ['도쿄', '東京', '신주쿠'],
    marker: { x: 168, y: 148 },
    where: '일본의 수도, 도쿄 도심',
    whereSub: '간토 지방의 중심 — 신주쿠는 도쿄에서 가장 번화한 밤거리예요',
  },
  {
    id: 'osaka', city: '오사카', cityJp: '大阪', cityKana: 'おおさか', region: '간사이', regionId: 'kansai',
    videoId: 'GiZq9R_djaM', spot: '도톤보리 글리코 앞', channel: 'MBS NEWS',
    desc: '도톤보리 글리코 간판·에비스바시 일대를 비추는 24시간 라이브캠. 오사카 미나미의 활기를 실시간으로.',
    matchKeywords: ['오사카', '大阪', '도톤보리'],
    marker: { x: 117, y: 184 },
    where: '간사이의 중심, 오사카',
    whereSub: '도쿄에서 신칸센 2시간 반 — 도톤보리는 오사카 최대 번화가예요',
  },
  {
    id: 'fukuoka', city: '후쿠오카', cityJp: '福岡', cityKana: 'ふくおか', region: '규슈·오키나와', regionId: 'kyushu',
    videoId: '8RyR0J8zbbU', spot: '하카타역 앞', channel: '福岡・佐賀 KBC NEWS',
    desc: 'JR 하카타역 하카타구치 광장을 24시간 비추는 실시간 라이브캠. 날씨·혼잡도를 한눈에.',
    matchKeywords: ['후쿠오카', '하카타', '福岡'],
    marker: { x: 66, y: 206 },
    where: '일본 남서쪽 규슈의 최대 도시',
    whereSub: '한국에서 가장 가까운 일본 — 부산에서 배로도 닿아요',
  },
  {
    id: 'sapporo', city: '삿포로', cityJp: '札幌', cityKana: 'さっぽろ', region: '홋카이도·도호쿠', regionId: 'hokkaido',
    videoId: 'O7aL3u5n1gQ', spot: 'JR 삿포로역', channel: 'HBC 北海道放送',
    desc: 'JR 삿포로역 앞을 비추는 24시간 라이브캠. 홋카이도의 날씨·적설·거리 풍경을 실시간으로.',
    matchKeywords: ['삿포로', '札幌', '홋카이도', '북해도'],
    marker: { x: 178, y: 46 },
    where: '일본 최북단, 홋카이도의 중심 도시',
    whereSub: '도쿄에서 비행기 1시간 반 — 겨울 눈축제로 유명해요',
  },
  {
    id: 'okinawa', city: '오키나와', cityJp: '沖縄', cityKana: 'おきなわ', region: '규슈·오키나와', regionId: 'kyushu',
    videoId: 'zzb8YRJAoyw', spot: '차탄 미야기 해안', channel: 'オーシャンビュー北谷町',
    desc: '차탄초 미야기 해안의 바다를 비추는 라이브캠. 오키나와의 하늘과 파도를 실시간으로.',
    matchKeywords: ['오키나와', '沖縄', '나하'],
    marker: { x: 38, y: 258 },
    where: '일본 최남단, 아열대 섬 오키나와',
    whereSub: '도쿄에서 비행기 2시간 반 — 에메랄드빛 바다로 유명해요',
  },
]

// /live 목록의 지역 표시 순서(데이터에 있는 지역만 노출)
export const LIVECAM_REGIONS = ['홋카이도·도호쿠', '간토', '주부', '간사이', '주고쿠·시코쿠', '규슈·오키나와']
