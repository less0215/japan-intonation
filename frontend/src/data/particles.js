export const PARTICLES = [
  {
    id: 'ga',
    rank: 1,
    particle: 'が',
    reading: '가',
    meanings: ['이/가', '을/를'],
    usages: [
      {
        type: 'basic',
        meaning: '이/가 (주어)',
        example: {
          kr: '아이가 울고 있다',
          jp: '子供(こども)が泣(な)いている',
          pronunciation: '코도모가 나이테이루',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 1, accent: [0] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '동작의 주체(주어). 한국어 이/가와 동일.',
      },
      {
        type: 'applied',
        meaning: '을/를 (감정·능력·욕구의 대상)',
        example: {
          kr: '나는 농구를 좋아해요',
          jp: '私(わたし)はバスケが好(す)きです',
          pronunciation: '와타시와 바스케가 스키데스',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          ],
        },
        note: '한국어는 \'을/를\'이지만 일본어는 が. 好(す)き·嫌(きら)い·上手(じょうず)·下手(へた)·欲(ほ)しい·分(わ)かる·出来(でき)る 앞에는 を 아니고 が.',
      },
    ],
  },
  {
    id: 'wa',
    rank: 2,
    particle: 'は',
    reading: '와',
    meanings: ['은/는'],
    usages: [
      {
        type: 'basic',
        meaning: '은/는 (주제 제시)',
        example: {
          kr: '야마다 씨는 지금 교실에 있어',
          jp: '山田(やまだ)さんは今(いま)教室(きょうしつ)にいます',
          pronunciation: '야마다상와 이마 쿄-시츠니 이마스',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '주제 제시. \'야마다 씨에 대해 말하자면\' 뉘앙스.',
      },
      {
        type: 'applied',
        meaning: '은/는 (대비·강조)',
        example: {
          kr: '초밥은 먹지만 회는 안 먹어요',
          jp: 'お寿司(すし)は食(た)べますが、刺身(さしみ)は食(た)べません',
          pronunciation: '오스시와 타베마스가, 사시미와 타베마셍',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 0, 1] },
            { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          ],
        },
        note: 'は를 두 번 써서 두 대상을 대비. 형태는 같고 기능만 달라지는 케이스.',
      },
    ],
  },
  {
    id: 'wo',
    rank: 3,
    particle: 'を',
    reading: '오',
    meanings: ['을/를', '~을 (통과)', '에서 (출발)'],
    usages: [
      {
        type: 'basic',
        meaning: '을/를 (목적어)',
        example: {
          kr: '튀김을 먹었습니다',
          jp: '天(てん)ぷらを食(た)べました',
          pronunciation: '텐뿌라오 타베마시타',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          ],
        },
        note: '동작의 목적어. 가장 기본 용법.',
      },
      {
        type: 'applied',
        meaning: '~을 (통과점) / 에서 (출발점)',
        example: {
          kr: '다리를 건넙니다 / 버스에서 내립니다',
          jp: '橋(はし)を渡(わた)ります ／ バスを降(お)ります',
          pronunciation: '하시오 와타리마스 / 바스오 오리마스',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          ],
        },
        note: '통과점(橋(はし)を渡(わた)る)·출발점(バスを降(お)りる)도 を. 뒤 동사가 자동사라서 목적어가 아닌데도 を씀.',
      },
    ],
  },
  {
    id: 'ni',
    rank: 4,
    particle: 'に',
    reading: '니',
    meanings: ['에', '에게', '으로', '을/를'],
    usages: [
      {
        type: 'basic',
        meaning: '에 (존재장소·도착점) / 에게 (대상) / 으로 (변화·선택)',
        example: {
          kr: '다나카 씨는 교실에 있습니다',
          jp: '田中(たなか)さんは教室(きょうしつ)にいます',
          pronunciation: '타나카상와 쿄-시츠니 이마스',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '존재 장소는 に. 행동이 일어나는 장소는 で. \'있다·없다\' 뒤면 に.',
      },
      {
        type: 'applied',
        meaning: '을/를 (탑승 대상)',
        example: {
          kr: '버스를 탑니다',
          jp: 'バスに乗(の)ります',
          pronunciation: '바스니 노리마스',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '한국어는 \'버스를\'이지만 일본어는 に. 탑승 목적지(도착점)라서 に. 관용적으로 고정됨.',
      },
    ],
  },
  {
    id: 'he',
    rank: 5,
    particle: 'へ',
    reading: '에',
    meanings: ['으로', '에게'],
    usages: [
      {
        type: 'basic',
        meaning: '으로 (방향·목적지)',
        example: {
          kr: '홋카이도에 갑니다',
          jp: '北海道(ほっかいどう)へ行(い)きます',
          pronunciation: '홋카이도-에 이키마스',
          accentData: [
            { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '방향·목적지. に와 거의 같지만 へ는 \'그 방향으로\' 뉘앙스.',
      },
      {
        type: 'applied',
        meaning: '에게 (동작의 대상)',
        example: {
          kr: '가족에게 편지를 썼습니다',
          jp: '家族(かぞく)へ手紙(てがみ)を書(か)きました',
          pronunciation: '카조쿠에 테가미오 카키마시타',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          ],
        },
        note: '동작의 대상(사람). に로 바꿔도 됨. 단 물리적 밀착(벽에 그림 붙이다 등)은 に만 가능, へ 불가.',
      },
    ],
  },
  {
    id: 'de',
    rank: 6,
    particle: 'で',
    reading: '데',
    meanings: ['에서', '으로', '때문에'],
    usages: [
      {
        type: 'basic',
        meaning: '에서 (동작 장소) / 으로 (수단·방법)',
        example: {
          kr: '도서관에서 책을 읽었습니다',
          jp: '図書館(としょかん)で本(ほん)を読(よ)みました',
          pronunciation: '토쇼칸데 혼오 요미마시타',
          accentData: [
            { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 1] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          ],
        },
        note: '동작이 일어나는 장소. \'있다·없다\' 뒤 장소는 に, 행동이 있으면 で.',
      },
      {
        type: 'applied',
        meaning: '으로 (재료) / 때문에 (원인)',
        example: {
          kr: '이 책상은 나무로 만들었습니다',
          jp: 'この机(つくえ)は木(き)で作(つく)りました',
          pronunciation: '코노 츠쿠에와 키데 츠쿠리마시타',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
          ],
        },
        note: '재료가 결과물에서 눈에 보일 때 で. 원형이 사라질 만큼 변형되면 から.',
      },
    ],
  },
  {
    id: 'kara',
    rank: 7,
    particle: 'から',
    reading: '카라',
    meanings: ['에서', '부터', '으로', '때문에'],
    usages: [
      {
        type: 'basic',
        meaning: '에서 (출발점) / 부터 (시작점)',
        example: {
          kr: '일본어 수업은 10시부터입니다',
          jp: '日本語(にほんご)の授業(じゅぎょう)は10時(じ)からです',
          pronunciation: '니홍고노 쥬교-와 쥬-지카라데스',
          accentData: [
            { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 1, 1, 1, 1] },
          ],
        },
        note: '시간의 시작점. \'부터\'로 해석되는 가장 기본 용법.',
      },
      {
        type: 'applied',
        meaning: '으로 (원료 — 원형이 안 보이는 변형) / 때문에 (원인·발단)',
        example: {
          kr: '맥주는 보리로 만듭니다',
          jp: 'ビールは麦(むぎ)から作(つく)ります',
          pronunciation: '비-루와 무기카라 츠쿠리마스',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          ],
        },
        note: '원형이 사라질 만큼 변형되는 원료는 から. で와 구분 포인트.',
      },
    ],
  },
  {
    id: 'made',
    rank: 8,
    particle: 'まで',
    reading: '마데',
    meanings: ['까지'],
    usages: [
      {
        type: 'basic',
        meaning: '까지 (장소·시간의 끝점)',
        example: {
          kr: '바겐세일은 내일까지예요',
          jp: 'バーゲンセールは明日(あした)までです',
          pronunciation: '바-겐세-루와 아시타마데데스',
          accentData: [
            { phrase_id: 0, mora_count: 8, accent: [1, 0, 0, 0, 1, 1, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '시간의 끝점(한도). 장소에도 동일하게 씀.',
      },
      {
        type: 'applied',
        meaning: '에서~까지 (から～まで 세트)',
        example: {
          kr: '집에서 회사까지 1시간 걸립니다',
          jp: '家(いえ)から会社(かいしゃ)まで1時間(じかん)かかります',
          pronunciation: '이에카라 카이샤마데 이치지칸 카카리마스',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 4, mora_count: 4, accent: [1, 0, 1, 1] },
          ],
        },
        note: 'から～まで 세트. 출발점~도착점 범위를 한 문장에 표현. まで 자체 의미는 동일.',
      },
    ],
  },
  {
    id: 'mo',
    rank: 9,
    particle: 'も',
    reading: '모',
    meanings: ['도', '아무~도', '~이나'],
    usages: [
      {
        type: 'basic',
        meaning: '도 (같은 종류 추가)',
        example: {
          kr: '나도 돌아갈게요',
          jp: '私(わたし)も帰(かえ)ります',
          pronunciation: '와타시모 카에리마스',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '같은 종류 추가. は를 も로 바꾼다고 이해하면 쉬움.',
      },
      {
        type: 'applied',
        meaning: '아무~도 (완전부정) / ~이나 (수량 강조)',
        example: {
          kr: '교실에는 아무도 없습니다 / 10시간이나 자버렸어',
          jp: '教室(きょうしつ)には誰(だれ)もいません ／ 10時間(じかん)も寝(ね)てしまいました',
          pronunciation: '쿄-시츠니와 다레모 이마셍 / 쥬-지칸모 네테시마이마시타',
          accentData: [
            { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 4, mora_count: 2, accent: [0, 1] },
            { phrase_id: 5, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: '완전부정 — 의문사(誰(だれ)·何(なに)·どこ)+も+부정형 세트. 수량강조 — 숫자 뒤 も는 \'~이나\'(놀람·과장).',
      },
    ],
  },
  {
    id: 'no',
    rank: 10,
    particle: 'の',
    reading: '노',
    meanings: ['의', '~인 것', '~하는 것'],
    usages: [
      {
        type: 'basic',
        meaning: '의 (소유·소속)',
        example: {
          kr: '이것은 나의 책입니다',
          jp: 'これは私(わたし)の本(ほん)です',
          pronunciation: '코레와 와타시노 혼데스',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 2, mora_count: 2, accent: [0, 1] },
            { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '소유·소속 관계. 한국어 \'의\'와 동일한 가장 기본 용법.',
      },
      {
        type: 'applied',
        meaning: '~인 것 / ~하는 것 (명사화)',
        example: {
          kr: '수영하는 것을 좋아합니다',
          jp: '泳(およ)ぐのが好(す)きです',
          pronunciation: '오요구노가 스키데스',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 2, accent: [0, 1] },
            { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '동사·형용사 뒤에서 명사처럼 만듦. \'~하는 것\'으로 번역. こと로도 바꿀 수 있지만 の는 더 구어체.',
      },
    ],
  },
]
