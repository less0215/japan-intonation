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
      {
        kr: '시험 전이라 가슴이 두근두근해.',
        jp: '試験(しけん)の前(まえ)で心臓(しんぞう)がドキドキする。',
        furigana: 'しけんのまえでしんぞうがドキドキする',
        pronunciation: '시켄노 마에데 신조-가도키도키스루',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
      {
        kr: '좋아하는 사람을 보면 두근두근해.',
        jp: '好(す)きな人(ひと)を見(み)るとドキドキする。',
        furigana: 'すきなひとをみるとドキドキする',
        pronunciation: '스키나 히토오 미루토도키도키스루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [1, 0] },
        ],
      },
    ],
  },
  {
    id: 'wakuwaku', rank: 2, word: 'ワクワク', kana: 'わくわく', reading: '와쿠와쿠',
    meaning: '두근두근(설렘)', sub: '기대로 마음이 들뜸', category: '감정', icon: 'star', jlpt: 'N3', approx: true, usage: 'ワクワクする',
    examples: [
      {
        kr: '여행 생각에 두근두근 설레.',
        jp: '旅行(りょこう)のことを考(かんが)えるとワクワクする',
        furigana: 'りょこうのことをかんがえるとワクワクする',
        pronunciation: '료코-노코토오 칸가에루토와쿠와쿠스루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 4, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        kr: '내일이 너무 기대돼.',
        jp: '明日(あす)が楽(たの)しみでワクワクする。',
        furigana: 'あすがたのしみでワクワクする',
        pronunciation: '아스가 타노시미데와쿠와쿠스루',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  {
    id: 'nikoniko', rank: 3, word: 'ニコニコ', kana: 'にこにこ', reading: '니코니코',
    meaning: '싱글벙글', sub: '기분 좋게 웃는 모습', category: '감정', icon: 'smile', jlpt: 'N2', usage: 'ニコニコする',
    examples: [
      {
        kr: '그녀는 항상 싱글벙글 웃고 있어.',
        jp: '彼女(かのじょ)はいつもニコニコしている。',
        furigana: 'かのじょはいつもニコニコしている',
        pronunciation: '카노조와이츠모니코니코시테이루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        kr: '아기가 싱글벙글 웃었다.',
        jp: '赤ちゃん(あかちゃん)がニコニコ笑(わら)った。',
        furigana: 'あかちゃんがニコニコわらった',
        pronunciation: '아카챤가니코니코와랏타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },
  {
    id: 'iraira', rank: 4, word: 'イライラ', kana: 'いらいら', reading: '이라이라',
    meaning: '짜증', sub: '뜻대로 안 돼 신경질이 남', category: '감정', icon: 'anger', jlpt: 'N3', usage: 'イライラする',
    examples: [
      {
        kr: '차가 막혀서 짜증나.',
        jp: '渋滞(じゅうたい)でイライラする。',
        furigana: 'じゅうたいでイライラする',
        pronunciation: '주-타이데이라이라스루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        kr: '기다리는 게 짜증나기 시작했어.',
        jp: '待(ま)つのにイライラしてきた。',
        furigana: 'まつのにイライラしてきた',
        pronunciation: '마츠노니이라이라시테키타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'bikkuri', rank: 5, word: 'びっくり', kana: 'びっくり', reading: '빅쿠리',
    meaning: '깜짝 놀람', sub: '갑작스러운 일에 놀람', category: '감정', icon: 'surprise', jlpt: 'N4', approx: true, usage: 'びっくりする',
    examples: [
      {
        kr: '갑자기 소리가 나서 깜짝 놀랐어.',
        jp: '急(きゅう)に音(おと)がしてびっくりした。',
        furigana: 'きゅうにおとがしてびっくりした',
        pronunciation: '큐-니 오토가시테빗쿠리시타',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '깜짝 놀랄 만큼 쌌어.',
        jp: 'びっくりするほど安(やす)かった',
        furigana: 'びっくりするほどやすかった',
        pronunciation: '빗쿠리스루호도 야스캇타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'kirakira', rank: 6, word: 'キラキラ', kana: 'きらきら', reading: '키라키라',
    meaning: '반짝반짝', sub: '빛이 작게 반짝이는 모양', category: '모양', icon: 'sparkle', jlpt: 'N3', approx: true, usage: 'キラキラする / キラキラ光る',
    examples: [
      {
        kr: '별이 반짝반짝 빛나고 있어.',
        jp: '星(ほし)がきらきら光(ひか)っている。',
        furigana: 'ほしがきらきらひかっている',
        pronunciation: '호시가키라키라 히캇테이루',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '눈이 반짝반짝 빛났다.',
        jp: '目(め)がキラキラしていました。',
        furigana: 'めがキラキラしていました',
        pronunciation: '메가키라키라시테이마시타',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'fuwafuwa', rank: 7, word: 'ふわふわ', kana: 'ふわふわ', reading: '후와후와',
    meaning: '폭신폭신', sub: '가볍고 부드러운 모양', category: '모양', icon: 'cloud', jlpt: 'N2', usage: 'ふわふわする / ふわふわの〜',
    examples: [
      {
        kr: '이 빵은 폭신폭신해.',
        jp: 'このパンはふわふわだ',
        furigana: 'このパンはふわふわだ',
        pronunciation: '코노판와후와후와다',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        kr: '구름이 폭신폭신해 보여.',
        jp: '雲(くも)がふわふわして見(み)える。',
        furigana: 'くもがふわふわしてみえる',
        pronunciation: '쿠모가후와후와시테 미에루',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'pikapika', rank: 8, word: 'ピカピカ', kana: 'ぴかぴか', reading: '피카피카',
    meaning: '반짝반짝(윤기)', sub: '닦여서 윤이 나는 모양', category: '모양', icon: 'shine', jlpt: 'N2', usage: 'ピカピカに〜 / ピカピカ光る',
    examples: [
      {
        kr: '구두를 반짝반짝하게 닦았어.',
        jp: '靴(くつ)をピカピカに磨(みが)いた。',
        furigana: 'くつをピカピカにみがいた',
        pronunciation: '쿠츠오피카피카니 미가이타',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        kr: '새 차가 반짝반짝해.',
        jp: '新(あたら)しい車(くるま)がピカピカだ。',
        furigana: 'あたらしいくるまがピカピカだ',
        pronunciation: '아타라시이 쿠루마가피카피카다',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 1, accent: [0] },
        ],
      },
    ],
  },
  {
    id: 'sakusaku', rank: 9, word: 'サクサク', kana: 'さくさく', reading: '사쿠사쿠',
    meaning: '바삭바삭', sub: '가볍게 씹히는 식감/소리', category: '식감', icon: 'food', jlpt: 'N2', approx: true, usage: 'サクサクする / サクサクの〜',
    examples: [
      {
        kr: '튀김이 바삭바삭해.',
        jp: '天ぷら(てんぷら)がサクサクだ。',
        furigana: 'てんぷらがサクサクだ',
        pronunciation: '텐푸라가사쿠사쿠다',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        kr: '쿠키가 바삭바삭해서 맛있어.',
        jp: 'クッキーがサクサクしておいしい。',
        furigana: 'クッキーがサクサクしておいしい',
        pronunciation: '쿳키-가사쿠사쿠시테오이시이',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'mochimochi', rank: 10, word: 'もちもち', kana: 'もちもち', reading: '모치모치',
    meaning: '쫀득쫀득', sub: '말랑하고 탄력 있는 식감', category: '식감', icon: 'food', jlpt: 'N2', approx: true, usage: 'もちもちする / もちもちの〜',
    examples: [
      {
        kr: '이 떡은 쫀득쫀득해.',
        jp: 'このお餅(もち)はもちもちだ。',
        furigana: 'このおもちはもちもちだ',
        pronunciation: '코노오 모치와모치모치다',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '쫀득쫀득한 빵을 좋아해.',
        jp: 'もちもちのパンが好(す)きだ',
        furigana: 'もちもちのパンがすきだ',
        pronunciation: '모치모치노판가 스키다',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [1, 0] },
        ],
      },
    ],
  },
  {
    id: 'gussuri', rank: 11, word: 'ぐっすり', kana: 'ぐっすり', reading: '굿스리',
    meaning: '푹 (잠)', sub: '깊이 자는 모양', category: '상태', icon: 'sleep', jlpt: 'N3', usage: 'ぐっすり寝る / 眠る',
    examples: [
      {
        kr: '어젯밤엔 푹 잤어.',
        jp: '昨夜(さくや)はぐっすり寝(ね)た。',
        furigana: 'さくやはぐっすりねた',
        pronunciation: '사쿠야와굿스리 네타',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        kr: '아기가 푹 자고 있어.',
        jp: '赤ちゃん(あかちゃん)がぐっすり眠(ねむ)っている。',
        furigana: 'あかちゃんがぐっすりねむっている',
        pronunciation: '아카챤가굿스리네뭇테이루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'hakkiri', rank: 12, word: 'はっきり', kana: 'はっきり', reading: '핫키리',
    meaning: '분명히', sub: '또렷하고 확실한 모양', category: '상태', icon: 'clear', jlpt: 'N4', usage: 'はっきり言う / 見える',
    examples: [
      {
        kr: '생각을 분명히 말해 줘.',
        jp: '考(かんが)えをはっきり言(い)ってください。',
        furigana: 'かんがえをはっきりいってください',
        pronunciation: '칸가에오핫키리 잇테쿠다사이',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '글자가 분명하게 보여.',
        jp: '字(じ)がはっきり見(み)える。',
        furigana: 'じがはっきりみえる',
        pronunciation: '지가핫키리 미에루',
        accentData: [
          { phrase_id: 0, mora_count: 1, accent: [1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'shikkari', rank: 13, word: 'しっかり', kana: 'しっかり', reading: '식카리',
    meaning: '확실히·단단히', sub: '야무지고 견고한 모양', category: '상태', icon: 'check', jlpt: 'N4', usage: 'しっかりする / しっかり〜',
    examples: [
      {
        kr: '손잡이를 꽉 잡아.',
        jp: '手すり(てすり)をしっかり持って(もって)',
        furigana: 'てすりをしっかりもって',
        pronunciation: '테스리오싯카리못테',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        kr: '제대로 공부했어.',
        jp: 'しっかり勉強(べんきょう)した。',
        furigana: 'しっかりべんきょうした',
        pronunciation: '싯카리 벤쿄-시타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  {
    id: 'dandan', rank: 14, word: 'だんだん', kana: 'だんだん', reading: '단단',
    meaning: '점점', sub: '서서히 변해 가는 모양', category: '모양', icon: 'gradual', jlpt: 'N5', usage: 'だんだん〜なる',
    examples: [
      {
        kr: '점점 추워지고 있어.',
        jp: 'だんだん寒(さむ)くなってきた。',
        furigana: 'だんだんさむくなってきた',
        pronunciation: '단단 사무쿠낫테키타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '일본어가 점점 늘고 있어.',
        jp: '日本語(にほんご)がだんだん上手(じょうず)になる。',
        furigana: 'にほんごがだんだんじょうずになる',
        pronunciation: '니혼고가단단 조-즈니나루',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  {
    id: 'gorogoro', rank: 15, word: 'ゴロゴロ', kana: 'ごろごろ', reading: '고로고로',
    meaning: '빈둥빈둥 / 우르릉', sub: '뒹굴거림, 또는 천둥 소리', category: '소리', icon: 'sound', jlpt: 'N3', approx: true, usage: 'ゴロゴロする',
    examples: [
      {
        kr: '주말엔 집에서 빈둥거렸어.',
        jp: '週末(しゅうまつ)は家(いえ)でゴロゴロしていました。',
        furigana: 'しゅうまつはいえでゴロゴロしていました',
        pronunciation: '슈-마츠와 이에데고로고로시테이마시타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '천둥이 우르릉 울렸다.',
        jp: '雷(かみなり)がゴロゴロ鳴(な)った。',
        furigana: 'かみなりがゴロゴロなった',
        pronunciation: '카미나리가고로고로 낫타',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },
  {
    id: 'wanwan', rank: 16, word: 'ワンワン', kana: 'わんわん', reading: '완완',
    meaning: '멍멍', sub: '개 짖는 소리', category: '소리', icon: 'dog', jlpt: 'N4', approx: true, usage: 'ワンワン(吠える)',
    examples: [
      {
        kr: '개가 멍멍 짖고 있어.',
        jp: '犬(いぬ)がワンワン吠(な)いている',
        furigana: 'いぬがワンワンないている',
        pronunciation: '이누가완완 나이테이루',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        kr: '멍멍 소리가 들려.',
        jp: 'ワンワンという声(こえ)が聞こ(きこ)える。',
        furigana: 'ワンワンというこえがきこえる',
        pronunciation: '완완토이우코에가키코에루',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
]

export const ONOMATOPE_CATEGORIES = ['전체', '감정', '모양', '소리', '식감', '상태']
