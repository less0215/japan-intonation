/* 영상 학습 카탈로그 — 실제 일본어 TEDx 강연 20편 (yt-dlp 검색으로 ID·제목·길이 실측).
 * 썸네일은 img.youtube.com/vi/<id>/hqdefault.jpg 로 실제 로드.
 * ⚠️ jlpt 레벨은 현재 주제 기반 추정(provisional) — 정식 분류는 자막 단어 분석(/study/words) 필요.
 * kr 제목은 직접 번역. 전체 학습 데이터(자막·분해)는 영상별 파이프라인 필요(지금은 데모 1편만 완비). */
export const STUDY_CATALOG = [
  // ── N4 (초급 — 짧고 비교적 쉬운 편) ──
  { id: '6JKzW0a-nhE', jp: 'データで語る', kr: '데이터로 말하다', ev: 'TEDxTokyo', dur: '6:01', lv: 'N4' },
  { id: '4n94nFD3aus', jp: '彼らは何を話している?', kr: '그들은 무슨 말을 하고 있나', ev: 'TEDxTokyo', dur: '8:26', lv: 'N4' },

  // ── N3 (중급) ──
  { id: 'ldybnuFxdiQ', jp: '新しいアイデアのつくり方', kr: '새로운 아이디어를 만드는 법', ev: 'TEDxTokyo', dur: '5:55', lv: 'N3' },
  { id: 'VDtCA2GPw4k', jp: 'なんとかなる', kr: '어떻게든 된다 — 보이지 않는 벽을 넘으려면', ev: 'TEDxKagoshima', dur: '9:12', lv: 'N3' },
  { id: 'KqdT9J10rg0', jp: '世界にないものは、あなたの中にある', kr: '세상에 없는 것은 당신 안에 있다', ev: 'TEDxHimi', dur: '15:36', lv: 'N3' },
  { id: 'ZqvQgX5gvoM', jp: '家族のカタチ', kr: '가족의 모양', ev: 'TEDxSannomiya', dur: '15:19', lv: 'N3' },
  { id: 'gBumdOWWMhY', jp: 'どうせ無理をなくしたい', kr: '희망은 초대한다 — "어차피 무리"를 없애려면', ev: 'TEDxSapporo', dur: '20:43', lv: 'N3' },
  { id: '_bqRGsg44Rc', jp: '食を通じた日本と世界の繋がり', kr: '음식으로 잇는 일본과 세계', ev: 'TEDxDoshishaU', dur: '15:58', lv: 'N3' },

  // ── N2 (중상급) ──
  { id: '7WAHPmY-B70', jp: '一瞬で惹きつける声を出す方法', kr: '순식간에 사로잡는 목소리 내는 법', ev: 'TEDxShinshuU', dur: '12:37', lv: 'N2' },
  { id: '4jfcE8u9KOM', jp: '感動を創造する言葉の伝え方', kr: '감동을 만드는 말 전하는 법', ev: 'TEDxMeijiU', dur: '19:09', lv: 'N2' },
  { id: 'cjtmDEG-B7U', jp: '人生の価値は何を残すかにある', kr: '인생의 가치는 무엇을 남기느냐에 있다', ev: 'TEDxHimi', dur: '16:11', lv: 'N2' },
  { id: 'alM-g--UJt4', jp: '受け入れるという生き方', kr: '받아들이며 사는 삶', ev: 'TEDxNagoyaU', dur: '17:57', lv: 'N2' },
  { id: 'SaalrFGgTIw', jp: 'すべてを失って気づいたこと', kr: '모든 걸 잃고 깨달은, 소중한 것', ev: 'TEDxNagoyaU', dur: '17:03', lv: 'N2' },
  { id: 'g_xV-ElH2x4', jp: 'ボーダーを越える新たな公用語', kr: '경계를 넘는 새로운 공용어', ev: 'TEDxSannomiya', dur: '18:27', lv: 'N2' },
  { id: '5Uo5_-kq4j0', jp: '幸せの四つの因子', kr: '행복의 네 가지 요인', ev: 'TEDxShintomi', dur: '16:38', lv: 'N2' },

  // ── N1 (상급) ──
  { id: 'QgEwxuwj3Mg', jp: 'あいまいでいいかげんな日本語の話', kr: '애매하고 대충인 일본어 이야기', ev: 'TEDxSapporo', dur: '15:15', lv: 'N1' },
  { id: 'Ibw0yLy8h20', jp: '古神道に伝わる日本語の秘密', kr: '고신토에 전해지는 일본어의 비밀', ev: 'TEDxHimi', dur: '9:33', lv: 'N1' },
  { id: 'w50ElZTtzXE', jp: '突破する力', kr: '돌파하는 힘', ev: 'TEDxHaneda', dur: '25:10', lv: 'N1' },
  { id: 'oQdtYbQ9Y7Q', jp: '外郎売で日本語トレーニング', kr: '‘외랑매’로 일본어 트레이닝(빠른말)', ev: 'TEDxAkitaIntlU', dur: '18:07', lv: 'N1' },
  { id: 'CJJV4xe8N4M', jp: '私と、私のアンドロイド', kr: '나와 나의 안드로이드 (이시구로 히로시)', ev: 'TEDxSeeds', dur: '20:32', lv: 'N1' },
]

export const STUDY_FEATURED = STUDY_CATALOG.find(v => v.id === 'ldybnuFxdiQ')
