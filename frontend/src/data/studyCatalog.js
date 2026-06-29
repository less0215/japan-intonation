/* 영상 학습 카탈로그 — 실제 일본어 TEDx 강연 20편 (yt-dlp 검색으로 ID·제목·길이 실측).
 * 썸네일=img.youtube.com/vi/<id>/hqdefault.jpg. 출처: 전부 공식 TEDx Talks 채널(신뢰 가능).
 * ⚠️ jlpt 레벨·tags는 현재 주제 기반 추정(provisional). 전체 학습 데이터는 영상별 파이프라인 필요(현재 데모 1편 완비). */
export const STUDY_CATALOG = [
  // N4
  { id: '6JKzW0a-nhE', jp: 'データで語る', kr: '데이터로 말하다', ev: 'TEDxTokyo', dur: '6:01', lv: 'N4', tags: ['비즈니스', '커뮤니케이션'] },
  { id: '4n94nFD3aus', jp: '彼らは何を話している?', kr: '그들은 무슨 말을 하고 있나', ev: 'TEDxTokyo', dur: '8:26', lv: 'N4', tags: ['언어', '커뮤니케이션'] },
  // N3
  { id: 'ldybnuFxdiQ', jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', ev: 'TEDxTokyo', dur: '5:55', lv: 'N3', tags: ['창의성', '비즈니스', '동기부여'] },
  { id: 'VDtCA2GPw4k', jp: 'なんとかなる', kr: '어떻게든 된다', ev: 'TEDxKagoshima', dur: '9:12', lv: 'N3', tags: ['동기부여', '인생', '도전'] },
  { id: 'KqdT9J10rg0', jp: '世界にないものは、あなたの中にある', kr: '세상에 없는 것은 당신 안에 있다', ev: 'TEDxHimi', dur: '15:36', lv: 'N3', tags: ['동기부여', '창의성', '인생'] },
  { id: 'ZqvQgX5gvoM', jp: '家族のカタチ', kr: '가족의 모양', ev: 'TEDxSannomiya', dur: '15:19', lv: 'N3', tags: ['인생', '사회'] },
  { id: 'gBumdOWWMhY', jp: 'どうせ無理をなくしたい', kr: '"어차피 무리"를 없애려면', ev: 'TEDxSapporo', dur: '20:43', lv: 'N3', tags: ['동기부여', '도전', '과학'] },
  { id: '_bqRGsg44Rc', jp: '食を通じた日本と世界の繋がり', kr: '음식으로 잇는 일본과 세계', ev: 'TEDxDoshishaU', dur: '15:58', lv: 'N3', tags: ['문화', '글로벌'] },
  // N2
  { id: '7WAHPmY-B70', jp: '一瞬で惹きつける声を出す方法', kr: '순식간에 사로잡는 목소리 내는 법', ev: 'TEDxShinshuU', dur: '12:37', lv: 'N2', tags: ['커뮤니케이션', '비즈니스'] },
  { id: '4jfcE8u9KOM', jp: '感動を創造する言葉の伝え方', kr: '감동을 만드는 말 전하는 법', ev: 'TEDxMeijiU', dur: '19:09', lv: 'N2', tags: ['커뮤니케이션', '동기부여'] },
  { id: 'cjtmDEG-B7U', jp: '人生の価値は何を残すかにある', kr: '인생의 가치는 무엇을 남기느냐에', ev: 'TEDxHimi', dur: '16:11', lv: 'N2', tags: ['인생', '철학', '동기부여'] },
  { id: 'alM-g--UJt4', jp: '受け入れるという生き方', kr: '받아들이며 사는 삶', ev: 'TEDxNagoyaU', dur: '17:57', lv: 'N2', tags: ['인생', '철학'] },
  { id: 'SaalrFGgTIw', jp: 'すべてを失って気づいたこと', kr: '모든 걸 잃고 깨달은 소중한 것', ev: 'TEDxNagoyaU', dur: '17:03', lv: 'N2', tags: ['인생', '동기부여', '행복'] },
  { id: 'g_xV-ElH2x4', jp: 'ボーダーを越える新たな公用語', kr: '경계를 넘는 새로운 공용어', ev: 'TEDxSannomiya', dur: '18:27', lv: 'N2', tags: ['언어', '글로벌'] },
  { id: '5Uo5_-kq4j0', jp: '幸せの四つの因子', kr: '행복의 네 가지 요인', ev: 'TEDxShintomi', dur: '16:38', lv: 'N2', tags: ['행복', '과학', '심리'] },
  // N1
  { id: 'QgEwxuwj3Mg', jp: 'あいまいでいいかげんな日本語の話', kr: '애매하고 대충인 일본어 이야기', ev: 'TEDxSapporo', dur: '15:15', lv: 'N1', tags: ['언어', '문화'] },
  { id: 'Ibw0yLy8h20', jp: '古神道に伝わる日本語の秘密', kr: '고신토에 전해지는 일본어의 비밀', ev: 'TEDxHimi', dur: '9:33', lv: 'N1', tags: ['언어', '문화', '역사'] },
  { id: 'w50ElZTtzXE', jp: '突破する力', kr: '돌파하는 힘', ev: 'TEDxHaneda', dur: '25:10', lv: 'N1', tags: ['도전', '동기부여'] },
  { id: 'oQdtYbQ9Y7Q', jp: '外郎売で日本語トレーニング', kr: '‘외랑매’로 일본어 빠른말 훈련', ev: 'TEDxAkitaIntlU', dur: '18:07', lv: 'N1', tags: ['언어', '문화'] },
  { id: 'CJJV4xe8N4M', jp: '私と、私のアンドロイド', kr: '나와 나의 안드로이드', ev: 'TEDxSeeds', dur: '20:32', lv: 'N1', tags: ['과학', '미래'] },
]

export const STUDY_FEATURED = STUDY_CATALOG.find(v => v.id === 'ldybnuFxdiQ')

// 인기 TOP10 (예시 순위)
const TOP_IDS = ['ldybnuFxdiQ', 'gBumdOWWMhY', 'CJJV4xe8N4M', 'VDtCA2GPw4k', '5Uo5_-kq4j0', 'oQdtYbQ9Y7Q', 'KqdT9J10rg0', '7WAHPmY-B70', 'cjtmDEG-B7U', 'QgEwxuwj3Mg']
export const STUDY_TOP10 = TOP_IDS.map(id => STUDY_CATALOG.find(v => v.id === id)).filter(Boolean)

// 주제별 카테고리 (쉐도잉 탭 행 구성용)
export const TAG_GROUPS = [
  { tag: '동기부여', label: '눈에 보석이 박힌 사람들' },
  { tag: '언어', label: '일본어가 들리기 시작할 때' },
  { tag: '비즈니스', label: '일잘러가 되고 싶다면' },
  { tag: '인생', label: '여운이 남는 이야기' },
  { tag: '과학', label: '앞서 가는 사람들' },
  { tag: '문화', label: '도쿄의 공기까지' },
]
