/* 오노마토페(의성어·의태어) 학습 데이터 — 자주 쓰는 것 엄선
 * category: 감정 | 모양 | 소리 | 식감 | 상태
 * icon: OnomatopeIcon 키 (연상 그래픽)
 * jlpt: Tanos(CC BY) 매칭 참고값. 리스트에 없으면 null(딱지 없음).
 */
export const ONOMATOPE = [
  {
    id: 'dokidoki', rank: 1, word: 'ドキドキ', kana: 'どきどき', reading: '도키도키',
    meaning: '두근두근', sub: '설렘·긴장으로 심장이 빠르게 뜀', category: '감정', icon: 'heart', jlpt: 'N2', usage: 'ドキドキする',
    examples: [
      { korean: '시험 전이라 가슴이 두근두근해.', japanese: '試験の前で心臓がドキドキする。', reading: '시켄노 마에데 신조-가 도키도키스루' },
      { korean: '좋아하는 사람을 보면 두근두근해.', japanese: '好きな人を見るとドキドキする。', reading: '스키나 히토오 미루토 도키도키스루' },
    ],
  },
  {
    id: 'wakuwaku', rank: 2, word: 'ワクワク', kana: 'わくわく', reading: '와쿠와쿠',
    meaning: '두근두근(설렘)', sub: '기대로 마음이 들뜸', category: '감정', icon: 'star', jlpt: null, usage: 'ワクワクする',
    examples: [
      { korean: '여행 생각에 두근두근 설레.', japanese: '旅行のことを考えるとワクワクする。', reading: '료코-노 코토오 칸가에루토 와쿠와쿠스루' },
      { korean: '내일이 너무 기대돼.', japanese: '明日が楽しみでワクワクする。', reading: '아시타가 타노시미데 와쿠와쿠스루' },
    ],
  },
  {
    id: 'nikoniko', rank: 3, word: 'ニコニコ', kana: 'にこにこ', reading: '니코니코',
    meaning: '싱글벙글', sub: '기분 좋게 웃는 모습', category: '감정', icon: 'smile', jlpt: 'N2', usage: 'ニコニコする',
    examples: [
      { korean: '그녀는 항상 싱글벙글 웃고 있어.', japanese: '彼女はいつもニコニコしている。', reading: '카노조와 이츠모 니코니코시테이루' },
      { korean: '아기가 싱글벙글 웃었다.', japanese: '赤ちゃんがニコニコ笑った。', reading: '아카쨩가 니코니코 와랏타' },
    ],
  },
  {
    id: 'iraira', rank: 4, word: 'イライラ', kana: 'いらいら', reading: '이라이라',
    meaning: '짜증', sub: '뜻대로 안 돼 신경질이 남', category: '감정', icon: 'anger', jlpt: 'N3', usage: 'イライラする',
    examples: [
      { korean: '차가 막혀서 짜증나.', japanese: '渋滞でイライラする。', reading: '주-타이데 이라이라스루' },
      { korean: '기다리는 게 짜증나기 시작했어.', japanese: '待つのにイライラしてきた。', reading: '마츠노니 이라이라시테키타' },
    ],
  },
  {
    id: 'bikkuri', rank: 5, word: 'びっくり', kana: 'びっくり', reading: '빅쿠리',
    meaning: '깜짝 놀람', sub: '갑작스러운 일에 놀람', category: '감정', icon: 'surprise', jlpt: null, usage: 'びっくりする',
    examples: [
      { korean: '갑자기 소리가 나서 깜짝 놀랐어.', japanese: '急に音がしてびっくりした。', reading: '큐-니 오토가 시테 빅쿠리시타' },
      { korean: '깜짝 놀랄 만큼 쌌어.', japanese: 'びっくりするほど安かった。', reading: '빅쿠리스루호도 야스캇타' },
    ],
  },
  {
    id: 'kirakira', rank: 6, word: 'キラキラ', kana: 'きらきら', reading: '키라키라',
    meaning: '반짝반짝', sub: '빛이 작게 반짝이는 모양', category: '모양', icon: 'sparkle', jlpt: null, usage: 'キラキラする / キラキラ光る',
    examples: [
      { korean: '별이 반짝반짝 빛나고 있어.', japanese: '星がキラキラ光っている。', reading: '호시가 키라키라 히캇테이루' },
      { korean: '눈이 반짝반짝 빛났다.', japanese: '目がキラキラしていた。', reading: '메가 키라키라시테이타' },
    ],
  },
  {
    id: 'fuwafuwa', rank: 7, word: 'ふわふわ', kana: 'ふわふわ', reading: '후와후와',
    meaning: '폭신폭신', sub: '가볍고 부드러운 모양', category: '모양', icon: 'cloud', jlpt: 'N2', usage: 'ふわふわする / ふわふわの〜',
    examples: [
      { korean: '이 빵은 폭신폭신해.', japanese: 'このパンはふわふわだ。', reading: '코노 판와 후와후와다' },
      { korean: '구름이 폭신폭신해 보여.', japanese: '雲がふわふわして見える。', reading: '쿠모가 후와후와시테 미에루' },
    ],
  },
  {
    id: 'pikapika', rank: 8, word: 'ピカピカ', kana: 'ぴかぴか', reading: '피카피카',
    meaning: '반짝반짝(윤기)', sub: '닦여서 윤이 나는 모양', category: '모양', icon: 'shine', jlpt: 'N2', usage: 'ピカピカに〜 / ピカピカ光る',
    examples: [
      { korean: '구두를 반짝반짝하게 닦았어.', japanese: '靴をピカピカに磨いた。', reading: '쿠츠오 피카피카니 미가이타' },
      { korean: '새 차가 반짝반짝해.', japanese: '新しい車がピカピカだ。', reading: '아타라시이 쿠루마가 피카피카다' },
    ],
  },
  {
    id: 'sakusaku', rank: 9, word: 'サクサク', kana: 'さくさく', reading: '사쿠사쿠',
    meaning: '바삭바삭', sub: '가볍게 씹히는 식감/소리', category: '식감', icon: 'food', jlpt: null, usage: 'サクサクする / サクサクの〜',
    examples: [
      { korean: '튀김이 바삭바삭해.', japanese: '天ぷらがサクサクだ。', reading: '텐푸라가 사쿠사쿠다' },
      { korean: '쿠키가 바삭바삭해서 맛있어.', japanese: 'クッキーがサクサクしておいしい。', reading: '쿡키-가 사쿠사쿠시테 오이시이' },
    ],
  },
  {
    id: 'mochimochi', rank: 10, word: 'もちもち', kana: 'もちもち', reading: '모치모치',
    meaning: '쫀득쫀득', sub: '말랑하고 탄력 있는 식감', category: '식감', icon: 'food', jlpt: null, usage: 'もちもちする / もちもちの〜',
    examples: [
      { korean: '이 떡은 쫀득쫀득해.', japanese: 'このお餅はもちもちだ。', reading: '코노 오모치와 모치모치다' },
      { korean: '쫀득쫀득한 빵을 좋아해.', japanese: 'もちもちのパンが好きだ。', reading: '모치모치노 판가 스키다' },
    ],
  },
  {
    id: 'gussuri', rank: 11, word: 'ぐっすり', kana: 'ぐっすり', reading: '굿스리',
    meaning: '푹 (잠)', sub: '깊이 자는 모양', category: '상태', icon: 'sleep', jlpt: 'N3', usage: 'ぐっすり寝る / 眠る',
    examples: [
      { korean: '어젯밤엔 푹 잤어.', japanese: '昨夜はぐっすり寝た。', reading: '사쿠야와 굿스리 네타' },
      { korean: '아기가 푹 자고 있어.', japanese: '赤ちゃんがぐっすり眠っている。', reading: '아카쨩가 굿스리 네뭇테이루' },
    ],
  },
  {
    id: 'hakkiri', rank: 12, word: 'はっきり', kana: 'はっきり', reading: '핫키리',
    meaning: '분명히', sub: '또렷하고 확실한 모양', category: '상태', icon: 'clear', jlpt: 'N4', usage: 'はっきり言う / 見える',
    examples: [
      { korean: '생각을 분명히 말해 줘.', japanese: '考えをはっきり言ってください。', reading: '칸가에오 핫키리 잇테쿠다사이' },
      { korean: '글자가 분명하게 보여.', japanese: '字がはっきり見える。', reading: '지가 핫키리 미에루' },
    ],
  },
  {
    id: 'shikkari', rank: 13, word: 'しっかり', kana: 'しっかり', reading: '식카리',
    meaning: '확실히·단단히', sub: '야무지고 견고한 모양', category: '상태', icon: 'check', jlpt: 'N4', usage: 'しっかりする / しっかり〜',
    examples: [
      { korean: '손잡이를 꽉 잡아.', japanese: '手すりをしっかり持って。', reading: '테스리오 식카리 못테' },
      { korean: '제대로 공부했어.', japanese: 'しっかり勉強した。', reading: '식카리 벤쿄-시타' },
    ],
  },
  {
    id: 'dandan', rank: 14, word: 'だんだん', kana: 'だんだん', reading: '단단',
    meaning: '점점', sub: '서서히 변해 가는 모양', category: '모양', icon: 'gradual', jlpt: 'N5', usage: 'だんだん〜なる',
    examples: [
      { korean: '점점 추워지고 있어.', japanese: 'だんだん寒くなってきた。', reading: '단단 사무쿠 낫테키타' },
      { korean: '일본어가 점점 늘고 있어.', japanese: '日本語がだんだん上手になる。', reading: '니혼고가 단단 조-즈니 나루' },
    ],
  },
  {
    id: 'gorogoro', rank: 15, word: 'ゴロゴロ', kana: 'ごろごろ', reading: '고로고로',
    meaning: '빈둥빈둥 / 우르릉', sub: '뒹굴거림, 또는 천둥 소리', category: '소리', icon: 'sound', jlpt: null, usage: 'ゴロゴロする',
    examples: [
      { korean: '주말엔 집에서 빈둥거렸어.', japanese: '週末は家でゴロゴロしていた。', reading: '슈-마츠와 이에데 고로고로시테이타' },
      { korean: '천둥이 우르릉 울렸다.', japanese: '雷がゴロゴロ鳴った。', reading: '카미나리가 고로고로 낫타' },
    ],
  },
  {
    id: 'wanwan', rank: 16, word: 'ワンワン', kana: 'わんわん', reading: '완완',
    meaning: '멍멍', sub: '개 짖는 소리', category: '소리', icon: 'dog', jlpt: null, usage: 'ワンワン(吠える)',
    examples: [
      { korean: '개가 멍멍 짖고 있어.', japanese: '犬がワンワン吠えている。', reading: '이누가 완완 호에테이루' },
      { korean: '멍멍 소리가 들려.', japanese: 'ワンワンという声が聞こえる。', reading: '완완토 이우 코에가 키코에루' },
    ],
  },
]

export const ONOMATOPE_CATEGORIES = ['전체', '감정', '모양', '소리', '식감', '상태']
