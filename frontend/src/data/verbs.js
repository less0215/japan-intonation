/* 동사 학습 데이터 (BCCWJ 빈도 순)
 * conjugations.formal / casual : 각 8개 (현재긍/부정/긍질/부질 + 과거 동일)
 * examples[].pattern            : 적용된 문법 패턴
 */

export function getRankTabs(verbs, pageSize = 10) {
  const max = verbs.reduce((m, v) => Math.max(m, v.rank), 0)
  const tabs = []
  for (let start = 1; start <= max; start += pageSize) {
    const end = Math.min(start + pageSize - 1, max)
    tabs.push({ id: `${start}-${end}`, label: `${start}~${end}위`, start, end })
  }
  return tabs
}

/* ── 활용형 행 순서 (formal/casual 공통) ────────────────────── */
export const CONJ_LABELS = [
  '현재/미래 긍정',
  '현재/미래 부정',
  '현재/미래 긍정 질문',
  '현재/미래 부정 질문',
  '과거 긍정',
  '과거 부정',
  '과거 긍정 질문',
  '과거 부정 질문',
]

export const VERBS = [

  /* ══════════════════════════════════════════════════
   * 1위  言う
   * ══════════════════════════════════════════════════ */
  {
    id: 'iu', rank: 1, verb: '言う', reading: '이우', meaning: '말하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '言(い)います',             ruby: '이이마스',          meaning: '말합니다' },
        { text: '言(い)いません',           ruby: '이이마셍',          meaning: '안 말합니다' },
        { text: '言(い)いますか？',         ruby: '이이마스까?',       meaning: '말합니까?' },
        { text: '言(い)いませんか？',       ruby: '이이마셍까?',       meaning: '안 말합니까?' },
        { text: '言(い)いました',           ruby: '이이마시타',        meaning: '말했습니다' },
        { text: '言(い)いませんでした',     ruby: '이이마셍데시타',    meaning: '안 말했습니다' },
        { text: '言(い)いましたか？',       ruby: '이이마시타까?',     meaning: '말했습니까?' },
        { text: '言(い)いませんでしたか？', ruby: '이이마셍데시타까?', meaning: '안 말했습니까?' },
      ],
      casual: [
        { text: '言(い)う',           ruby: '이우',        meaning: '말해' },
        { text: '言(い)わない',       ruby: '이와나이',    meaning: '안 말해' },
        { text: '言(い)う？',         ruby: '이우?',       meaning: '말해?' },
        { text: '言(い)わない？',     ruby: '이와나이?',   meaning: '안 말해?' },
        { text: '言(い)った',         ruby: '잇타',        meaning: '말했어' },
        { text: '言(い)わなかった',   ruby: '이와나캇타',  meaning: '안 말했어' },
        { text: '言(い)った？',       ruby: '잇타?',       meaning: '말했어?' },
        { text: '言(い)わなかった？', ruby: '이와나캇타?', meaning: '안 말했어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 괜찮다고 말했어.',
        japanese: '彼(かれ)は大丈夫(だいじょうぶ)だと言(い)った。',
        plain:    '彼は大丈夫だと言った。',
        reading:  '카레와 다이죠부다토 잇타.',
        pattern:  { name: '〜と言う', meaning: '~라고 말하다', note: '인용·직접화법에 쓰는 と 표현' },
        furigana: 'かれはだいじょうぶだといった',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '선생님이 내일 시험이 있다고 했어.',
        japanese: '先生(せんせい)が明日(あした)テストがあるって言(い)ってた。',
        plain:    '先生が明日テストがあるって言ってた。',
        reading:  '센세이가 아시타 테스토가 아룻테 잇테타.',
        pattern:  { name: '〜って言う', meaning: '~라고 하다 (구어)', note: 'と言う의 구어체 단축형. 친한 사이에서 사용' },
        furigana: 'せんせいがあしたてすとがあるっていってた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 9, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '좋아하지 않는다고 해도 먹어야 해.',
        japanese: '好(す)きじゃないと言(い)っても、食(た)べなきゃ。',
        plain:    '好きじゃないと言っても、食べなきゃ。',
        reading:  '스키자나이토 잇테모, 타베나캬.',
        pattern:  { name: '〜と言っても', meaning: '~라고 해도', note: '앞의 말을 인정하면서 역접을 나타냄' },
        furigana: 'すきじゃないといってもたべなきゃ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 2위  する
   * ══════════════════════════════════════════════════ */
  {
    id: 'suru', rank: 2, verb: 'する', reading: '스루', meaning: '하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'します',             ruby: '시마스',        meaning: '합니다' },
        { text: 'しません',           ruby: '시마셍',        meaning: '안 합니다' },
        { text: 'しますか？',         ruby: '시마스까?',     meaning: '합니까?' },
        { text: 'しませんか？',       ruby: '시마셍까?',     meaning: '안 합니까?' },
        { text: 'しました',           ruby: '시마시타',      meaning: '했습니다' },
        { text: 'しませんでした',     ruby: '시마셍데시타',  meaning: '안 했습니다' },
        { text: 'しましたか？',       ruby: '시마시타까?',   meaning: '했습니까?' },
        { text: 'しませんでしたか？', ruby: '시마셍데시타까?', meaning: '안 했습니까?' },
      ],
      casual: [
        { text: 'する',           ruby: '스루',      meaning: '해' },
        { text: 'しない',         ruby: '시나이',    meaning: '안 해' },
        { text: 'する？',         ruby: '스루?',     meaning: '해?' },
        { text: 'しない？',       ruby: '시나이?',   meaning: '안 해?' },
        { text: 'した',           ruby: '시타',      meaning: '했어' },
        { text: 'しなかった',     ruby: '시나캇타',  meaning: '안 했어' },
        { text: 'した？',         ruby: '시타?',     meaning: '했어?' },
        { text: 'しなかった？',   ruby: '시나캇타?', meaning: '안 했어?' },
      ],
    },
    examples: [
      {
        korean:   '숙제를 하고 나서 게임을 한다.',
        japanese: '宿題(しゅくだい)をしてから、ゲームをする。',
        plain:    '宿題をしてから、ゲームをする。',
        reading:  '슈쿠다이오 시테카라, 게ー무오 스루.',
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '앞 행동이 완료된 후 뒤 행동을 함을 나타냄' },
        furigana: 'しゅくだいをしてからげーむをする',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '합격하기 위해 매일 공부하고 있어.',
        japanese: '合格(ごうかく)するために、毎日(まいにち)勉強(べんきょう)している。',
        plain:    '合格するために、毎日勉強している。',
        reading:  '고ー카쿠 스루타메니, 마이니치 벵쿄시테이루.',
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '목적·목표를 나타내는 표현' },
        furigana: 'ごうかくするためにまいにちべんきょうしている',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 11, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '일찍 자도록 하고 있어.',
        japanese: '早(はや)く寝(ね)るようにしている。',
        plain:    '早く寝るようにしている。',
        reading:  '하야쿠 네루요ー니 시테이루.',
        pattern:  { name: '〜ようにする', meaning: '~하도록 하다', note: '습관적 노력이나 의지적 행동을 나타냄' },
        furigana: 'はやくねるようにしている',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 3위  ある
   * ══════════════════════════════════════════════════ */
  {
    id: 'aru', rank: 3, verb: 'ある', reading: '아루', meaning: '있다 (사물)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'あります',             ruby: '아리마스',        meaning: '있습니다' },
        { text: 'ありません',           ruby: '아리마셍',        meaning: '없습니다' },
        { text: 'ありますか？',         ruby: '아리마스까?',     meaning: '있습니까?' },
        { text: 'ありませんか？',       ruby: '아리마셍까?',     meaning: '없습니까?' },
        { text: 'ありました',           ruby: '아리마시타',      meaning: '있었습니다' },
        { text: 'ありませんでした',     ruby: '아리마셍데시타',  meaning: '없었습니다' },
        { text: 'ありましたか？',       ruby: '아리마시타까?',   meaning: '있었습니까?' },
        { text: 'ありませんでしたか？', ruby: '아리마셍데시타까?', meaning: '없었습니까?' },
      ],
      casual: [
        { text: 'ある',           ruby: '아루',      meaning: '있어' },
        { text: 'ない',           ruby: '나이',      meaning: '없어' },
        { text: 'ある？',         ruby: '아루?',     meaning: '있어?' },
        { text: 'ない？',         ruby: '나이?',     meaning: '없어?' },
        { text: 'あった',         ruby: '앗타',      meaning: '있었어' },
        { text: 'なかった',       ruby: '나캇타',    meaning: '없었어' },
        { text: 'あった？',       ruby: '앗타?',     meaning: '있었어?' },
        { text: 'なかった？',     ruby: '나캇타?',   meaning: '없었어?' },
      ],
    },
    examples: [
      {
        korean:   '예약해 두었습니다.',
        japanese: '予約(よやく)してあります。',
        plain:    '予約してあります。',
        reading:  '요야쿠시테 아리마스.',
        pattern:  { name: '〜てある', meaning: '~해 두다', note: '준비 또는 의도적으로 해 놓은 상태를 나타냄' },
        furigana: 'よやくしてあります',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '후지산에 올라간 적이 있어.',
        japanese: '富士山(ふじさん)に登(のぼ)ったことがある。',
        plain:    '富士山に登ったことがある。',
        reading:  '후지상니 노봇타 코토가 아루.',
        pattern:  { name: '〜たことがある', meaning: '~한 적이 있다', note: '과거의 경험을 나타내는 표현' },
        furigana: 'ふじさんにのぼったことがある',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '내일 회의가 있으니까 준비해 두세요.',
        japanese: '明日(あした)は会議(かいぎ)があるから、準備(じゅんび)しておいてください。',
        plain:    '明日は会議があるから、準備しておいてください。',
        reading:  '아시타와 카이기가 아루카라, 쥰비시테오이테 쿠다사이.',
        pattern:  { name: '〜から', meaning: '~이기 때문에', note: '이유·근거를 나타내는 접속 표현' },
        furigana: 'あしたはかいぎがあるからじゅんびしておいてください',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 4위  なる
   * ══════════════════════════════════════════════════ */
  {
    id: 'naru', rank: 4, verb: 'なる', reading: '나루', meaning: '되다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'なります',             ruby: '나리마스',        meaning: '됩니다' },
        { text: 'なりません',           ruby: '나리마셍',        meaning: '안 됩니다' },
        { text: 'なりますか？',         ruby: '나리마스까?',     meaning: '됩니까?' },
        { text: 'なりませんか？',       ruby: '나리마셍까?',     meaning: '안 됩니까?' },
        { text: 'なりました',           ruby: '나리마시타',      meaning: '됐습니다' },
        { text: 'なりませんでした',     ruby: '나리마셍데시타',  meaning: '안 됐습니다' },
        { text: 'なりましたか？',       ruby: '나리마시타까?',   meaning: '됐습니까?' },
        { text: 'なりませんでしたか？', ruby: '나리마셍데시타까?', meaning: '안 됐습니까?' },
      ],
      casual: [
        { text: 'なる',           ruby: '나루',      meaning: '돼' },
        { text: 'ならない',       ruby: '나라나이',  meaning: '안 돼' },
        { text: 'なる？',         ruby: '나루?',     meaning: '돼?' },
        { text: 'ならない？',     ruby: '나라나이?', meaning: '안 돼?' },
        { text: 'なった',         ruby: '낫타',      meaning: '됐어' },
        { text: 'ならなかった',   ruby: '나라나캇타', meaning: '안 됐어' },
        { text: 'なった？',       ruby: '낫타?',     meaning: '됐어?' },
        { text: 'ならなかった？', ruby: '나라나캇타?', meaning: '안 됐어?' },
      ],
    },
    examples: [
      {
        korean:   '일본어를 잘하게 됐어.',
        japanese: '日本語(にほんご)が上手(じょうず)になった。',
        plain:    '日本語が上手になった。',
        reading:  '니혼고가 죠ー즈니 낫타.',
        pattern:  { name: '〜になる', meaning: '~이/가 되다', note: '명사·な형용사 뒤에 붙어 상태 변화를 나타냄' },
        furigana: 'にほんごがじょうずになった',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '매일 운동하게 됐어.',
        japanese: '毎日(まいにち)運動(うんどう)するようになった。',
        plain:    '毎日運動するようになった。',
        reading:  '마이니치 운도ー스루 요ー니 낫타.',
        pattern:  { name: '〜ようになる', meaning: '~하게 되다', note: '능력·습관이 생겼음을 나타내는 표현' },
        furigana: 'まいにちうんどうするようになった',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '요즘 단 것을 먹지 않게 됐어.',
        japanese: '最近(さいきん)、甘(あま)いものを食(た)べなくなった。',
        plain:    '最近、甘いものを食べなくなった。',
        reading:  '사이킨, 아마이 모노오 타베나쿠 낫타.',
        pattern:  { name: '〜なくなる', meaning: '~하지 않게 되다', note: '어떤 행동을 하지 않는 상태로 변했음을 나타냄' },
        furigana: 'さいきんあまいものをたべなくなった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 5위  思う
   * ══════════════════════════════════════════════════ */
  {
    id: 'omou', rank: 5, verb: '思う', reading: '오모우', meaning: '생각하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '思(おも)います',             ruby: '오모이마스',          meaning: '생각합니다' },
        { text: '思(おも)いません',           ruby: '오모이마셍',          meaning: '생각 안 합니다' },
        { text: '思(おも)いますか？',         ruby: '오모이마스까?',       meaning: '생각하십니까?' },
        { text: '思(おも)いませんか？',       ruby: '오모이마셍까?',       meaning: '생각 안 하십니까?' },
        { text: '思(おも)いました',           ruby: '오모이마시타',        meaning: '생각했습니다' },
        { text: '思(おも)いませんでした',     ruby: '오모이마셍데시타',    meaning: '생각 안 했습니다' },
        { text: '思(おも)いましたか？',       ruby: '오모이마시타까?',     meaning: '생각했습니까?' },
        { text: '思(おも)いませんでしたか？', ruby: '오모이마셍데시타까?', meaning: '생각 안 했습니까?' },
      ],
      casual: [
        { text: '思(おも)う',           ruby: '오모우',       meaning: '생각해' },
        { text: '思(おも)わない',       ruby: '오모와나이',   meaning: '생각 안 해' },
        { text: '思(おも)う？',         ruby: '오모우?',      meaning: '생각해?' },
        { text: '思(おも)わない？',     ruby: '오모와나이?',  meaning: '생각 안 해?' },
        { text: '思(おも)った',         ruby: '오못타',       meaning: '생각했어' },
        { text: '思(おも)わなかった',   ruby: '오모와나캇타', meaning: '생각 안 했어' },
        { text: '思(おも)った？',       ruby: '오못타?',      meaning: '생각했어?' },
        { text: '思(おも)わなかった？', ruby: '오모와나캇타?', meaning: '생각 안 했어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 친절한 사람이라고 생각합니다.',
        japanese: '彼(かれ)は優(やさ)しい人(ひと)だと思(おも)います。',
        plain:    '彼は優しい人だと思います。',
        reading:  '카레와 야사시이 히토다토 오모이마스.',
        pattern:  { name: '〜と思う', meaning: '~라고 생각하다', note: '의견·추측을 나타낼 때 사용하는 가장 기본적인 표현' },
        furigana: 'かれはやさしいひとだとおもいます',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '더 어렵다고 생각했었어.',
        japanese: 'もっと難(むずか)しいと思(おも)っていた。',
        plain:    'もっと難しいと思っていた。',
        reading:  '못토 무즈카시이토 오못테이타.',
        pattern:  { name: '〜と思っていた', meaning: '~라고 생각했었다', note: '과거의 생각·예상이 지금과 다름을 나타냄' },
        furigana: 'もっとむずかしいとおもっていた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '어떻게 생각하세요?',
        japanese: 'どのようにお考(かんが)えですか？',
        plain:    'どのようにお考えですか？',
        reading:  '도노요ー니 오캉가에데스까?',
        pattern:  { name: '〜と思いますか', meaning: '~라고 생각하십니까?', note: 'どう/どのように思う로 상대의 의견을 묻는 표현' },
        furigana: 'どのようにおかんがえですか',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 6위  行く
   * ══════════════════════════════════════════════════ */
  {
    id: 'iku', rank: 6, verb: '行く', reading: '이쿠', meaning: '가다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '行(い)きます',             ruby: '이키마스',          meaning: '갑니다' },
        { text: '行(い)きません',           ruby: '이키마셍',          meaning: '안 갑니다' },
        { text: '行(い)きますか？',         ruby: '이키마스까?',       meaning: '갑니까?' },
        { text: '行(い)きませんか？',       ruby: '이키마셍까?',       meaning: '안 가십니까?' },
        { text: '行(い)きました',           ruby: '이키마시타',        meaning: '갔습니다' },
        { text: '行(い)きませんでした',     ruby: '이키마셍데시타',    meaning: '안 갔습니다' },
        { text: '行(い)きましたか？',       ruby: '이키마시타까?',     meaning: '갔습니까?' },
        { text: '行(い)きませんでしたか？', ruby: '이키마셍데시타까?', meaning: '안 갔습니까?' },
      ],
      casual: [
        { text: '行(い)く',           ruby: '이쿠',       meaning: '가' },
        { text: '行(い)かない',       ruby: '이카나이',   meaning: '안 가' },
        { text: '行(い)く？',         ruby: '이쿠?',      meaning: '가?' },
        { text: '行(い)かない？',     ruby: '이카나이?',  meaning: '안 가?' },
        { text: '行(い)った',         ruby: '잇타',       meaning: '갔어' },
        { text: '行(い)かなかった',   ruby: '이카나캇타', meaning: '안 갔어' },
        { text: '行(い)った？',       ruby: '잇타?',      meaning: '갔어?' },
        { text: '行(い)かなかった？', ruby: '이카나캇타?', meaning: '안 갔어?' },
      ],
    },
    examples: [
      {
        korean:   '영화를 보러 갔습니다.',
        japanese: '映画(えいが)を見(み)に行(い)きました。',
        plain:    '映画を見に行きました。',
        reading:  '에이가오 미니 이키마시타.',
        pattern:  { name: '〜に行く', meaning: '~하러 가다', note: '동사 ます형 + に行く — 목적을 나타냄' },
        furigana: 'えいがをみにいきました',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 8, accent: [0, 1, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '교토에 간 적이 있습니다.',
        japanese: '京都(きょうと)に行(い)ったことがあります。',
        plain:    '京都に行ったことがあります。',
        reading:  '쿄ー토니 잇타 코토가 아리마스.',
        pattern:  { name: '〜たことがある', meaning: '~한 적이 있다', note: '과거 경험을 나타내는 표현' },
        furigana: 'きょうとにいったことがあります',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '비가 오니까 밖에 안 나갈게.',
        japanese: '雨(あめ)が降(ふ)っているから、外(そと)に行(い)かない。',
        plain:    '雨が降っているから、外に行かない。',
        reading:  '아메가 훗테이루카라, 소토니 이카나이.',
        pattern:  { name: '〜から', meaning: '~이기 때문에', note: '이유를 나타내는 접속 표현. ので보다 주관적' },
        furigana: 'あめがふっているからそとにいかない',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 8, accent: [1, 0, 0, 0, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 7위  来る
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuru', rank: 7, verb: '来る', reading: '쿠루', meaning: '오다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '来(き)ます',             ruby: '키마스',          meaning: '옵니다' },
        { text: '来(き)ません',           ruby: '키마셍',          meaning: '안 옵니다' },
        { text: '来(き)ますか？',         ruby: '키마스까?',       meaning: '옵니까?' },
        { text: '来(き)ませんか？',       ruby: '키마셍까?',       meaning: '안 오십니까?' },
        { text: '来(き)ました',           ruby: '키마시타',        meaning: '왔습니다' },
        { text: '来(き)ませんでした',     ruby: '키마셍데시타',    meaning: '안 왔습니다' },
        { text: '来(き)ましたか？',       ruby: '키마시타까?',     meaning: '왔습니까?' },
        { text: '来(き)ませんでしたか？', ruby: '키마셍데시타까?', meaning: '안 왔습니까?' },
      ],
      casual: [
        { text: '来(く)る',           ruby: '쿠루',      meaning: '와' },
        { text: '来(こ)ない',         ruby: '코나이',    meaning: '안 와' },
        { text: '来(く)る？',         ruby: '쿠루?',     meaning: '와?' },
        { text: '来(こ)ない？',       ruby: '코나이?',   meaning: '안 와?' },
        { text: '来(き)た',           ruby: '키타',      meaning: '왔어' },
        { text: '来(こ)なかった',     ruby: '코나캇타',  meaning: '안 왔어' },
        { text: '来(き)た？',         ruby: '키타?',     meaning: '왔어?' },
        { text: '来(こ)なかった？',   ruby: '코나캇타?', meaning: '안 왔어?' },
      ],
    },
    examples: [
      {
        korean:   '추워지기 시작했다.',
        japanese: '寒(さむ)くなってきた。',
        plain:    '寒くなってきた。',
        reading:  '사무쿠 낫테키타.',
        pattern:  { name: '〜てくる', meaning: '~해 오다 / 점점 ~해지다', note: '변화가 서서히 진행됨을 나타냄' },
        furigana: 'さむくなってきた',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '친구가 놀러 왔어.',
        japanese: '友達(ともだち)が遊(あそ)びに来(き)た。',
        plain:    '友達が遊びに来た。',
        reading:  '토모다치가 아소비니 키타.',
        pattern:  { name: '〜に来る', meaning: '~하러 오다', note: '동사 ます형 + に来る — 목적을 나타냄' },
        furigana: 'ともだちがあそびにきた',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '어디서 오셨어요?',
        japanese: 'どちらからいらっしゃいましたか？',
        plain:    'どちらからいらっしゃいましたか？',
        reading:  '도치라카라 이랏샤이마시타까?',
        pattern:  { name: '〜から来る', meaning: '~에서 오다', note: 'どちら(어디)와 함께 출신·출발지를 묻는 표현. 경어 いらっしゃる 활용' },
        furigana: 'どちらからいらっしゃいましたか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 8위  見る
   * ══════════════════════════════════════════════════ */
  {
    id: 'miru', rank: 8, verb: '見る', reading: '미루', meaning: '보다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '見(み)ます',             ruby: '미마스',          meaning: '봅니다' },
        { text: '見(み)ません',           ruby: '미마셍',          meaning: '안 봅니다' },
        { text: '見(み)ますか？',         ruby: '미마스까?',       meaning: '봅니까?' },
        { text: '見(み)ませんか？',       ruby: '미마셍까?',       meaning: '안 보십니까?' },
        { text: '見(み)ました',           ruby: '미마시타',        meaning: '봤습니다' },
        { text: '見(み)ませんでした',     ruby: '미마셍데시타',    meaning: '안 봤습니다' },
        { text: '見(み)ましたか？',       ruby: '미마시타까?',     meaning: '봤습니까?' },
        { text: '見(み)ませんでしたか？', ruby: '미마셍데시타까?', meaning: '안 봤습니까?' },
      ],
      casual: [
        { text: '見(み)る',           ruby: '미루',      meaning: '봐' },
        { text: '見(み)ない',         ruby: '미나이',    meaning: '안 봐' },
        { text: '見(み)る？',         ruby: '미루?',     meaning: '봐?' },
        { text: '見(み)ない？',       ruby: '미나이?',   meaning: '안 봐?' },
        { text: '見(み)た',           ruby: '미타',      meaning: '봤어' },
        { text: '見(み)なかった',     ruby: '미나캇타',  meaning: '안 봤어' },
        { text: '見(み)た？',         ruby: '미타?',     meaning: '봤어?' },
        { text: '見(み)なかった？',   ruby: '미나캇타?', meaning: '안 봤어?' },
      ],
    },
    examples: [
      {
        korean:   '한번 먹어 보세요.',
        japanese: '一度(いちど)食(た)べてみてください。',
        plain:    '一度食べてみてください。',
        reading:  '이치도 타베테 미테쿠다사이.',
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '시도·경험을 나타내는 표현. 見る를 보조동사로 사용' },
        furigana: 'いちどたべてみてください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그녀는 행복해 보여.',
        japanese: '彼女(かのじょ)は幸(しあわ)せそうに見(み)える。',
        plain:    '彼女は幸せそうに見える。',
        reading:  '카노죠와 시아와세소ー니 미에루.',
        pattern:  { name: '〜ように見える', meaning: '~처럼/~게 보이다', note: '외관상 인상을 나타내는 표현' },
        furigana: 'かのじょはしあわせそうにみえる',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 9, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   'TV를 보면서 일본어를 공부하고 있어.',
        japanese: 'テレビを見(み)ながら日本語(にほんご)を勉強(べんきょう)している。',
        plain:    'テレビを見ながら日本語を勉強している。',
        reading:  '테레비오 미나가라 니혼고오 벵쿄시테이루.',
        pattern:  { name: '〜ながら', meaning: '~하면서 (동시동작)', note: '두 동작을 동시에 할 때 사용. ます형 + ながら' },
        furigana: 'てれびをみながらにほんごをべんきょうしている',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 9위  やる
   * ══════════════════════════════════════════════════ */
  {
    id: 'yaru', rank: 9, verb: 'やる', reading: '야루', meaning: '하다 (구어)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'やります',             ruby: '야리마스',        meaning: '합니다' },
        { text: 'やりません',           ruby: '야리마셍',        meaning: '안 합니다' },
        { text: 'やりますか？',         ruby: '야리마스까?',     meaning: '합니까?' },
        { text: 'やりませんか？',       ruby: '야리마셍까?',     meaning: '안 합니까?' },
        { text: 'やりました',           ruby: '야리마시타',      meaning: '했습니다' },
        { text: 'やりませんでした',     ruby: '야리마셍데시타',  meaning: '안 했습니다' },
        { text: 'やりましたか？',       ruby: '야리마시타까?',   meaning: '했습니까?' },
        { text: 'やりませんでしたか？', ruby: '야리마셍데시타까?', meaning: '안 했습니까?' },
      ],
      casual: [
        { text: 'やる',           ruby: '야루',      meaning: '해' },
        { text: 'やらない',       ruby: '야라나이',  meaning: '안 해' },
        { text: 'やる？',         ruby: '야루?',     meaning: '해?' },
        { text: 'やらない？',     ruby: '야라나이?', meaning: '안 해?' },
        { text: 'やった',         ruby: '얏타',      meaning: '했어' },
        { text: 'やらなかった',   ruby: '야라나캇타', meaning: '안 했어' },
        { text: 'やった？',       ruby: '얏타?',     meaning: '했어?' },
        { text: 'やらなかった？', ruby: '야라나캇타?', meaning: '안 했어?' },
      ],
    },
    examples: [
      {
        korean:   '일단 해 보자.',
        japanese: 'とりあえずやってみよう。',
        plain:    'とりあえずやってみよう。',
        reading:  '토리아에즈 얏테 미요ー.',
        pattern:  { name: '〜てみる (의지형)', meaning: '~해 보다 / 해 보자', note: 'とりあえず(일단)와 자주 쓰임. みよう = みる의 의지형' },
        furigana: 'とりあえずやってみよう',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '포기하지 않고 계속하는 게 중요해.',
        japanese: '諦(あきら)めずにやり続(つづ)けることが大切(たいせつ)だ。',
        plain:    '諦めずにやり続けることが大切だ。',
        reading:  '아키라메즈니 야리츠즈케루 코토가 타이세츠다.',
        pattern:  { name: '〜ずに', meaning: '~하지 않고 (부정 연용)', note: 'ない형 대신 ず + に. 문어·격식체에서도 자주 사용' },
        furigana: 'あきらめずにやりつづけることがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 15, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '열심히 했더니 시험에 합격했어.',
        japanese: '一生懸命(いっしょうけんめい)やったら、試験(しけん)に合格(ごうかく)した。',
        plain:    '一生懸命やったら、試験に合格した。',
        reading:  '잇쇼ー켄메이 얏타라, 시켕니 고ー카쿠시타.',
        pattern:  { name: '〜たら', meaning: '~했더니 / ~하면', note: '조건·계기를 나타냄. 예상치 못한 결과가 이어질 때도 사용' },
        furigana: 'いっしょうけんめいやったらしけんにごうかくした',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 12, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 10위  いる
   * ══════════════════════════════════════════════════ */
  {
    id: 'iru', rank: 10, verb: 'いる', reading: '이루', meaning: '있다 (사람·동물)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'います',             ruby: '이마스',        meaning: '있습니다' },
        { text: 'いません',           ruby: '이마셍',        meaning: '없습니다' },
        { text: 'いますか？',         ruby: '이마스까?',     meaning: '있습니까?' },
        { text: 'いませんか？',       ruby: '이마셍까?',     meaning: '없습니까?' },
        { text: 'いました',           ruby: '이마시타',      meaning: '있었습니다' },
        { text: 'いませんでした',     ruby: '이마셍데시타',  meaning: '없었습니다' },
        { text: 'いましたか？',       ruby: '이마시타까?',   meaning: '있었습니까?' },
        { text: 'いませんでしたか？', ruby: '이마셍데시타까?', meaning: '없었습니까?' },
      ],
      casual: [
        { text: 'いる',           ruby: '이루',      meaning: '있어' },
        { text: 'いない',         ruby: '이나이',    meaning: '없어' },
        { text: 'いる？',         ruby: '이루?',     meaning: '있어?' },
        { text: 'いない？',       ruby: '이나이?',   meaning: '없어?' },
        { text: 'いた',           ruby: '이타',      meaning: '있었어' },
        { text: 'いなかった',     ruby: '이나캇타',  meaning: '없었어' },
        { text: 'いた？',         ruby: '이타?',     meaning: '있었어?' },
        { text: 'いなかった？',   ruby: '이나캇타?', meaning: '없었어?' },
      ],
    },
    examples: [
      {
        korean:   '지금 공부하고 있습니다.',
        japanese: '今(いま)、勉強(べんきょう)しています。',
        plain:    '今、勉強しています。',
        reading:  '이마, 벵쿄시테이마스.',
        pattern:  { name: '〜ている', meaning: '~하고 있다 (진행)', note: '동작의 진행을 나타내는 가장 기본적인 표현. て형 + いる' },
        furigana: 'いまべんきょうしています',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 10, accent: [1, 0, 0, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '마침 밥을 먹고 있는 중이에요.',
        japanese: 'ちょうど食(た)べているところです。',
        plain:    'ちょうど食べているところです。',
        reading:  '쵸ー도 타베테이루 토코로데스.',
        pattern:  { name: '〜ているところ', meaning: '~하고 있는 중이다', note: '어떤 동작이 진행 중임을 강조. 타이밍을 명확히 할 때 사용' },
        furigana: 'ちょうどたべているところです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '역 앞에서 기다리고 있을게.',
        japanese: '駅前(えきまえ)で待(ま)っているよ。',
        plain:    '駅前で待っているよ。',
        reading:  '에키마에데 맛테이루요.',
        pattern:  { name: '〜ている (상태)', meaning: '~하고 있다 / ~해 있다', note: '진행뿐 아니라 지속적 상태도 나타냄. 여기서는 "기다리고 있겠다"는 의지' },
        furigana: 'えきまえでまっているよ',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 11~50위: 탭 생성용 스텁 ─────────────────── */

  /* ══════════════════════════════════════════════════
   * 11위  できる
   * ══════════════════════════════════════════════════ */
  {
    id: 'dekiru', rank: 11, verb: 'できる', reading: '데키루', meaning: '할 수 있다; 생기다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'できます',             ruby: '데키마스',          meaning: '할 수 있습니다' },
        { text: 'できません',           ruby: '데키마셍',          meaning: '할 수 없습니다' },
        { text: 'できますか？',         ruby: '데키마스까?',       meaning: '할 수 있습니까?' },
        { text: 'できませんか？',       ruby: '데키마셍까?',       meaning: '할 수 없습니까?' },
        { text: 'できました',           ruby: '데키마시타',        meaning: '할 수 있었습니다' },
        { text: 'できませんでした',     ruby: '데키마셍데시타',    meaning: '할 수 없었습니다' },
        { text: 'できましたか？',       ruby: '데키마시타까?',     meaning: '할 수 있었습니까?' },
        { text: 'できませんでしたか？', ruby: '데키마셍데시타까?', meaning: '할 수 없었습니까?' },
      ],
      casual: [
        { text: 'できる',           ruby: '데키루',      meaning: '할 수 있어' },
        { text: 'できない',         ruby: '데키나이',    meaning: '할 수 없어' },
        { text: 'できる？',         ruby: '데키루?',     meaning: '할 수 있어?' },
        { text: 'できない？',       ruby: '데키나이?',   meaning: '할 수 없어?' },
        { text: 'できた',           ruby: '데키타',      meaning: '할 수 있었어' },
        { text: 'できなかった',     ruby: '데키나캇타',  meaning: '할 수 없었어' },
        { text: 'できた？',         ruby: '데키타?',     meaning: '할 수 있었어?' },
        { text: 'できなかった？',   ruby: '데키나캇타?', meaning: '할 수 없었어?' },
      ],
    },
    examples: [
      {
        korean:   '일본어를 말할 수 있습니까?',
        japanese: '日本語(にほんご)を話(はな)すことができますか？',
        plain:    '日本語を話すことができますか？',
        reading:  '니혼고오 하나스 코토가 데키마스까?',
        pattern:  { name: '〜ことができる', meaning: '~할 수 있다', note: '동사 원형 + ことができる. 能力·가능성을 나타내는 격식적 표현' },
        furigana: 'にほんごをはなすことができますか',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그녀는 피아노를 칠 수 있어.',
        japanese: '彼女(かのじょ)はピアノが弾(ひ)けるんだって。',
        plain:    '彼女はピアノが弾けるんだって。',
        reading:  '카노죠와 피아노가 히케룬닷테.',
        pattern:  { name: '〜んだって', meaning: '~래 / ~다고 하더라 (전문)', note: 'んだ(강조·설명) + って(전문). 남에게서 들은 내용을 전달할 때 사용' },
        furigana: 'かのじょはぴあのがひけるんだって',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '이 문제는 혼자서는 해결할 수 없어.',
        japanese: 'この問題(もんだい)は一人(ひとり)では解決(かいけつ)できない。',
        plain:    'この問題は一人では解決できない。',
        reading:  '코노 몬다이와 히토리데와 카이케츠 데키나이.',
        pattern:  { name: '〜できない', meaning: '~할 수 없다', note: 'できる의 부정형. 불가능·능력 부재를 나타냄' },
        furigana: 'このもんだいはひとりではかいけつできない',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 12위  持つ
   * ══════════════════════════════════════════════════ */
  {
    id: 'motsu', rank: 12, verb: '持つ', reading: '모츠', meaning: '가지다; 들다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '持(も)ちます',             ruby: '모치마스',          meaning: '가집니다' },
        { text: '持(も)ちません',           ruby: '모치마셍',          meaning: '안 가집니다' },
        { text: '持(も)ちますか？',         ruby: '모치마스까?',       meaning: '가집니까?' },
        { text: '持(も)ちませんか？',       ruby: '모치마셍까?',       meaning: '안 가집니까?' },
        { text: '持(も)ちました',           ruby: '모치마시타',        meaning: '가졌습니다' },
        { text: '持(も)ちませんでした',     ruby: '모치마셍데시타',    meaning: '안 가졌습니다' },
        { text: '持(も)ちましたか？',       ruby: '모치마시타까?',     meaning: '가졌습니까?' },
        { text: '持(も)ちませんでしたか？', ruby: '모치마셍데시타까?', meaning: '안 가졌습니까?' },
      ],
      casual: [
        { text: '持(も)つ',           ruby: '모츠',       meaning: '가져' },
        { text: '持(も)たない',       ruby: '모타나이',   meaning: '안 가져' },
        { text: '持(も)つ？',         ruby: '모츠?',      meaning: '가져?' },
        { text: '持(も)たない？',     ruby: '모타나이?',  meaning: '안 가져?' },
        { text: '持(も)った',         ruby: '못타',       meaning: '가졌어' },
        { text: '持(も)たなかった',   ruby: '모타나캇타', meaning: '안 가졌어' },
        { text: '持(も)った？',       ruby: '못타?',      meaning: '가졌어?' },
        { text: '持(も)たなかった？', ruby: '모타나캇타?', meaning: '안 가졌어?' },
      ],
    },
    examples: [
      {
        korean:   '짐을 들어 드릴까요?',
        japanese: '荷物(にもつ)を持(も)ちましょうか？',
        plain:    '荷物を持ちましょうか？',
        reading:  '니모츠오 모치마쇼ー까?',
        pattern:  { name: '〜ましょうか', meaning: '~할까요? (제안)', note: '상대를 위한 행동을 자발적으로 제안하는 표현' },
        furigana: 'にもつをもちましょうか',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그는 강한 의지를 가지고 있어.',
        japanese: '彼(かれ)は強(つよ)い意志(いし)を持(も)っている。',
        plain:    '彼は強い意志を持っている。',
        reading:  '카레와 츠요이 이시오 못테이루.',
        pattern:  { name: '〜ている (상태)', meaning: '~을 가지고 있다', note: '持つ + ている로 소유 상태를 나타냄' },
        furigana: 'かれはつよいいしをもっている',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '우산을 가지고 외출했어.',
        japanese: '傘(かさ)を持(も)って外出(がいしゅつ)した。',
        plain:    '傘を持って外出した。',
        reading:  '카사오 못테 가이슈츠시타.',
        pattern:  { name: '〜て (연용)', meaning: '~을 가지고 / ~하고서', note: 'て형으로 연속 동작을 연결. 持って는 수반 상태를 나타냄' },
        furigana: 'かさをもってがいしゅつした',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 13위  出る
   * ══════════════════════════════════════════════════ */
  {
    id: 'deru', rank: 13, verb: '出る', reading: '데루', meaning: '나오다; 나가다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '出(で)ます',             ruby: '데마스',          meaning: '나갑니다' },
        { text: '出(で)ません',           ruby: '데마셍',          meaning: '안 나갑니다' },
        { text: '出(で)ますか？',         ruby: '데마스까?',       meaning: '나갑니까?' },
        { text: '出(で)ませんか？',       ruby: '데마셍까?',       meaning: '안 나가십니까?' },
        { text: '出(で)ました',           ruby: '데마시타',        meaning: '나갔습니다' },
        { text: '出(で)ませんでした',     ruby: '데마셍데시타',    meaning: '안 나갔습니다' },
        { text: '出(で)ましたか？',       ruby: '데마시타까?',     meaning: '나갔습니까?' },
        { text: '出(で)ませんでしたか？', ruby: '데마셍데시타까?', meaning: '안 나갔습니까?' },
      ],
      casual: [
        { text: '出(で)る',           ruby: '데루',      meaning: '나가' },
        { text: '出(で)ない',         ruby: '데나이',    meaning: '안 나가' },
        { text: '出(で)る？',         ruby: '데루?',     meaning: '나가?' },
        { text: '出(で)ない？',       ruby: '데나이?',   meaning: '안 나가?' },
        { text: '出(で)た',           ruby: '데타',      meaning: '나갔어' },
        { text: '出(で)なかった',     ruby: '데나캇타',  meaning: '안 나갔어' },
        { text: '出(で)た？',         ruby: '데타?',     meaning: '나갔어?' },
        { text: '出(で)なかった？',   ruby: '데나캇타?', meaning: '안 나갔어?' },
      ],
    },
    examples: [
      {
        korean:   '집에서 나오고 나서 비가 내리기 시작했어.',
        japanese: '家(いえ)を出(で)てから、雨(あめ)が降(ふ)り始(はじ)めた。',
        plain:    '家を出てから、雨が降り始めた。',
        reading:  '이에오 데테카라, 아메가 후리하지메타.',
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '앞 동작이 끝난 후 뒤 동작이 시작됨을 나타냄' },
        furigana: 'いえをでてからあめがふりはじめた',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 9, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '회의에 나가기 위해 준비하고 있어.',
        japanese: '会議(かいぎ)に出(で)るために準備(じゅんび)している。',
        plain:    '会議に出るために準備している。',
        reading:  '카이기니 데루타메니 쥰비시테이루.',
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '목적을 나타내는 표현. 동사 원형 + ために' },
        furigana: 'かいぎにでるためにじゅんびしている',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '드디어 답이 나왔어.',
        japanese: 'やっと答(こた)えが出(で)た。',
        plain:    'やっと答えが出た。',
        reading:  '얏토 코타에가 데타.',
        pattern:  { name: '〜が出る', meaning: '~이 나오다', note: '결과·결론이 나타날 때 사용하는 자동사 표현' },
        furigana: 'やっとこたえがでた',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 14위  考える
   * ══════════════════════════════════════════════════ */
  {
    id: 'kangaeru', rank: 14, verb: '考える', reading: '캉가에루', meaning: '생각하다; 고려하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '考(かんが)えます',             ruby: '캉가에마스',          meaning: '생각합니다' },
        { text: '考(かんが)えません',           ruby: '캉가에마셍',          meaning: '생각 안 합니다' },
        { text: '考(かんが)えますか？',         ruby: '캉가에마스까?',       meaning: '생각하십니까?' },
        { text: '考(かんが)えませんか？',       ruby: '캉가에마셍까?',       meaning: '생각 안 하십니까?' },
        { text: '考(かんが)えました',           ruby: '캉가에마시타',        meaning: '생각했습니다' },
        { text: '考(かんが)えませんでした',     ruby: '캉가에마셍데시타',    meaning: '생각 안 했습니다' },
        { text: '考(かんが)えましたか？',       ruby: '캉가에마시타까?',     meaning: '생각했습니까?' },
        { text: '考(かんが)えませんでしたか？', ruby: '캉가에마셍데시타까?', meaning: '생각 안 했습니까?' },
      ],
      casual: [
        { text: '考(かんが)える',           ruby: '캉가에루',       meaning: '생각해' },
        { text: '考(かんが)えない',         ruby: '캉가에나이',     meaning: '생각 안 해' },
        { text: '考(かんが)える？',         ruby: '캉가에루?',      meaning: '생각해?' },
        { text: '考(かんが)えない？',       ruby: '캉가에나이?',    meaning: '생각 안 해?' },
        { text: '考(かんが)えた',           ruby: '캉가에타',       meaning: '생각했어' },
        { text: '考(かんが)えなかった',     ruby: '캉가에나캇타',   meaning: '생각 안 했어' },
        { text: '考(かんが)えた？',         ruby: '캉가에타?',      meaning: '생각했어?' },
        { text: '考(かんが)えなかった？',   ruby: '캉가에나캇타?',  meaning: '생각 안 했어?' },
      ],
    },
    examples: [
      {
        korean:   '좀 더 생각해 보고 나서 결정할게.',
        japanese: 'もう少(すこ)し考(かんが)えてから決(き)める。',
        plain:    'もう少し考えてから決める。',
        reading:  '모ー스코시 캉가에테카라 키메루.',
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '어떤 행동을 완료한 뒤 다음 행동을 함을 나타냄' },
        furigana: 'もうすこしかんがえてからきめる',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '미래에 대해 진지하게 생각하고 있어.',
        japanese: '将来(しょうらい)について真剣(しんけん)に考(かんが)えている。',
        plain:    '将来について真剣に考えている。',
        reading:  '쇼ー라이니츠이테 신켄니 캉가에테이루.',
        pattern:  { name: '〜について考える', meaning: '~에 대해 생각하다', note: '주제·대상을 나타내는 について + 考える의 결합' },
        furigana: 'しょうらいについてしんけんにかんがえている',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '어떤 방법이 좋을지 생각해 봤어.',
        japanese: 'どんな方法(ほうほう)がいいか考(かんが)えてみた。',
        plain:    'どんな方法がいいか考えてみた。',
        reading:  '돈나 호ー호ー가 이이카 캉가에테미타.',
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '시험 삼아 해보는 행동을 나타냄. て형 + みる' },
        furigana: 'どんなほうほうがいいかかんがえてみた',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 15위  分かる
   * ══════════════════════════════════════════════════ */
  {
    id: 'wakaru', rank: 15, verb: '分かる', reading: '와카루', meaning: '알다; 이해하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '分(わ)かります',             ruby: '와카리마스',          meaning: '알겠습니다' },
        { text: '分(わ)かりません',           ruby: '와카리마셍',          meaning: '모르겠습니다' },
        { text: '分(わ)かりますか？',         ruby: '와카리마스까?',       meaning: '아십니까?' },
        { text: '分(わ)かりませんか？',       ruby: '와카리마셍까?',       meaning: '모르십니까?' },
        { text: '分(わ)かりました',           ruby: '와카리마시타',        meaning: '알았습니다' },
        { text: '分(わ)かりませんでした',     ruby: '와카리마셍데시타',    meaning: '몰랐습니다' },
        { text: '分(わ)かりましたか？',       ruby: '와카리마시타까?',     meaning: '알았습니까?' },
        { text: '分(わ)かりませんでしたか？', ruby: '와카리마셍데시타까?', meaning: '몰랐습니까?' },
      ],
      casual: [
        { text: '分(わ)かる',           ruby: '와카루',       meaning: '알아' },
        { text: '分(わ)からない',       ruby: '와카라나이',   meaning: '몰라' },
        { text: '分(わ)かる？',         ruby: '와카루?',      meaning: '알아?' },
        { text: '分(わ)からない？',     ruby: '와카라나이?',  meaning: '몰라?' },
        { text: '分(わ)かった',         ruby: '와캇타',       meaning: '알았어' },
        { text: '分(わ)からなかった',   ruby: '와카라나캇타', meaning: '몰랐어' },
        { text: '分(わ)かった？',       ruby: '와캇타?',      meaning: '알았어?' },
        { text: '分(わ)からなかった？', ruby: '와카라나캇타?', meaning: '몰랐어?' },
      ],
    },
    examples: [
      {
        korean:   '이 문제의 의미를 이해할 수 있어?',
        japanese: 'この問題(もんだい)の意味(いみ)が分(わ)かる？',
        plain:    'この問題の意味が分かる？',
        reading:  '코노 몬다이노 이미가 와카루?',
        pattern:  { name: '〜が分かる', meaning: '~을 알다 / 이해하다', note: '분かる는 타동사가 아니라 자동사. 목적어를 が로 받음' },
        furigana: 'このもんだいのいみがわかる',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '설명을 들으니 이해가 됐어.',
        japanese: '説明(せつめい)を聞(き)いたら、分(わ)かった。',
        plain:    '説明を聞いたら、分かった。',
        reading:  '세츠메이오 키이타라, 와캇타.',
        pattern:  { name: '〜たら', meaning: '~했더니 / ~하면', note: '조건·계기를 나타냄. 듣고 나서 이해가 된 계기를 표현' },
        furigana: 'せつめいをきいたらわかった',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '이유는 전혀 몰랐어.',
        japanese: '理由(りゆう)は全然(ぜんぜん)分(わ)からなかった。',
        plain:    '理由は全然分からなかった。',
        reading:  '리유ー와 젠젠 와카라나캇타.',
        pattern:  { name: '全然〜ない', meaning: '전혀 ~않다', note: '否定 강조 부사 全然과 ない형 부정형을 결합하는 전형적 패턴' },
        furigana: 'りゆうはぜんぜんわからなかった',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 16위  入る
   * ══════════════════════════════════════════════════ */
  {
    id: 'hairu', rank: 16, verb: '入る', reading: '하이루', meaning: '들어가다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '入(はい)ります',             ruby: '하이리마스',          meaning: '들어갑니다' },
        { text: '入(はい)りません',           ruby: '하이리마셍',          meaning: '안 들어갑니다' },
        { text: '入(はい)りますか？',         ruby: '하이리마스까?',       meaning: '들어갑니까?' },
        { text: '入(はい)りませんか？',       ruby: '하이리마셍까?',       meaning: '안 들어가십니까?' },
        { text: '入(はい)りました',           ruby: '하이리마시타',        meaning: '들어갔습니다' },
        { text: '入(はい)りませんでした',     ruby: '하이리마셍데시타',    meaning: '안 들어갔습니다' },
        { text: '入(はい)りましたか？',       ruby: '하이리마시타까?',     meaning: '들어갔습니까?' },
        { text: '入(はい)りませんでしたか？', ruby: '하이리마셍데시타까?', meaning: '안 들어갔습니까?' },
      ],
      casual: [
        { text: '入(はい)る',           ruby: '하이루',       meaning: '들어가' },
        { text: '入(はい)らない',       ruby: '하이라나이',   meaning: '안 들어가' },
        { text: '入(はい)る？',         ruby: '하이루?',      meaning: '들어가?' },
        { text: '入(はい)らない？',     ruby: '하이라나이?',  meaning: '안 들어가?' },
        { text: '入(はい)った',         ruby: '하잇타',       meaning: '들어갔어' },
        { text: '入(はい)らなかった',   ruby: '하이라나캇타', meaning: '안 들어갔어' },
        { text: '入(はい)った？',       ruby: '하잇타?',      meaning: '들어갔어?' },
        { text: '入(はい)らなかった？', ruby: '하이라나캇타?', meaning: '안 들어갔어?' },
      ],
    },
    examples: [
      {
        korean:   '안에 들어가도 됩니까?',
        japanese: '中(なか)に入(はい)ってもいいですか？',
        plain:    '中に入ってもいいですか？',
        reading:  '나카니 하잇테모 이이데스까?',
        pattern:  { name: '〜てもいい', meaning: '~해도 된다 (허가)', note: 'て형 + もいい로 허가를 구하거나 부여하는 표현' },
        furigana: 'なかにはいってもいいですか',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '욕조에 들어가기 전에 샤워를 해.',
        japanese: 'お風呂(ふろ)に入(はい)る前(まえ)にシャワーを浴(あ)びて。',
        plain:    'お風呂に入る前にシャワーを浴びて。',
        reading:  '오후로니 하이루 마에니 샤와ー오 아비테.',
        pattern:  { name: '〜前に', meaning: '~하기 전에', note: '동사 원형 + 前に. 순서를 나타내는 시간 표현' },
        furigana: 'おふろにはいるまえにしゃわーをあびて',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '부원이 됐으면 해서 동아리에 들어갔어.',
        japanese: 'メンバーになりたくてサークルに入(はい)った。',
        plain:    'メンバーになりたくてサークルに入った。',
        reading:  '멤바ー니 나리타쿠테 사ー쿠루니 하잇타.',
        pattern:  { name: '〜たくて', meaning: '~하고 싶어서', note: 'たい(희망) + くて. 이유를 나타내는 て형 접속' },
        furigana: 'めんばーになりたくてさーくるにはいった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 17위  作る
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsukuru', rank: 17, verb: '作る', reading: '츠쿠루', meaning: '만들다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '作(つく)ります',             ruby: '츠쿠리마스',          meaning: '만듭니다' },
        { text: '作(つく)りません',           ruby: '츠쿠리마셍',          meaning: '안 만듭니다' },
        { text: '作(つく)りますか？',         ruby: '츠쿠리마스까?',       meaning: '만듭니까?' },
        { text: '作(つく)りませんか？',       ruby: '츠쿠리마셍까?',       meaning: '안 만드십니까?' },
        { text: '作(つく)りました',           ruby: '츠쿠리마시타',        meaning: '만들었습니다' },
        { text: '作(つく)りませんでした',     ruby: '츠쿠리마셍데시타',    meaning: '안 만들었습니다' },
        { text: '作(つく)りましたか？',       ruby: '츠쿠리마시타까?',     meaning: '만들었습니까?' },
        { text: '作(つく)りませんでしたか？', ruby: '츠쿠리마셍데시타까?', meaning: '안 만들었습니까?' },
      ],
      casual: [
        { text: '作(つく)る',           ruby: '츠쿠루',       meaning: '만들어' },
        { text: '作(つく)らない',       ruby: '츠쿠라나이',   meaning: '안 만들어' },
        { text: '作(つく)る？',         ruby: '츠쿠루?',      meaning: '만들어?' },
        { text: '作(つく)らない？',     ruby: '츠쿠라나이?',  meaning: '안 만들어?' },
        { text: '作(つく)った',         ruby: '츠쿳타',       meaning: '만들었어' },
        { text: '作(つく)らなかった',   ruby: '츠쿠라나캇타', meaning: '안 만들었어' },
        { text: '作(つく)った？',       ruby: '츠쿳타?',      meaning: '만들었어?' },
        { text: '作(つく)らなかった？', ruby: '츠쿠라나캇타?', meaning: '안 만들었어?' },
      ],
    },
    examples: [
      {
        korean:   '엄마한테 케이크를 만들어 달라고 했어.',
        japanese: 'お母(かあ)さんにケーキを作(つく)ってもらった。',
        plain:    'お母さんにケーキを作ってもらった。',
        reading:  '오카ー상니 케ー키오 츠쿳테모랏타.',
        pattern:  { name: '〜てもらう', meaning: '~해 받다 / ~해 달라고 하다', note: '상대방의 행동을 받는 표현. に가 행위자를 나타냄' },
        furigana: 'おかあさんにけーきをつくってもらった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '좋은 환경을 만들기 위해 노력하고 있어.',
        japanese: 'よい環境(かんきょう)を作(つく)るために努力(どりょく)している。',
        plain:    'よい環境を作るために努力している。',
        reading:  '요이 캉쿄ー오 츠쿠루타메니 도료쿠시테이루.',
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '목적·목표를 나타내는 표현. 동사 원형 + ために' },
        furigana: 'よいかんきょうをつくるためにどりょくしている',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '직접 만든 요리를 먹어 보세요.',
        japanese: '手作(てづく)りの料理(りょうり)を食(た)べてみてください。',
        plain:    '手作りの料理を食べてみてください。',
        reading:  '테즈쿠리노 료ー리오 타베테 미테쿠다사이.',
        pattern:  { name: '〜てみる', meaning: '~해 보다 (시도)', note: '처음 경험하거나 시험 삼아 해보는 행동을 나타냄' },
        furigana: 'てづくりのりょうりをたべてみてください',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 18위  聞く
   * ══════════════════════════════════════════════════ */
  {
    id: 'kiku', rank: 18, verb: '聞く', reading: '키쿠', meaning: '듣다; 묻다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '聞(き)きます',             ruby: '키키마스',          meaning: '듣습니다' },
        { text: '聞(き)きません',           ruby: '키키마셍',          meaning: '안 듣습니다' },
        { text: '聞(き)きますか？',         ruby: '키키마스까?',       meaning: '듣습니까?' },
        { text: '聞(き)きませんか？',       ruby: '키키마셍까?',       meaning: '안 들으십니까?' },
        { text: '聞(き)きました',           ruby: '키키마시타',        meaning: '들었습니다' },
        { text: '聞(き)きませんでした',     ruby: '키키마셍데시타',    meaning: '안 들었습니다' },
        { text: '聞(き)きましたか？',       ruby: '키키마시타까?',     meaning: '들었습니까?' },
        { text: '聞(き)きませんでしたか？', ruby: '키키마셍데시타까?', meaning: '안 들었습니까?' },
      ],
      casual: [
        { text: '聞(き)く',           ruby: '키쿠',       meaning: '들어' },
        { text: '聞(き)かない',       ruby: '키카나이',   meaning: '안 들어' },
        { text: '聞(き)く？',         ruby: '키쿠?',      meaning: '들어?' },
        { text: '聞(き)かない？',     ruby: '키카나이?',  meaning: '안 들어?' },
        { text: '聞(き)いた',         ruby: '키이타',     meaning: '들었어' },
        { text: '聞(き)かなかった',   ruby: '키카나캇타', meaning: '안 들었어' },
        { text: '聞(き)いた？',       ruby: '키이타?',    meaning: '들었어?' },
        { text: '聞(き)かなかった？', ruby: '키카나캇타?', meaning: '안 들었어?' },
      ],
    },
    examples: [
      {
        korean:   '음악을 들으면서 공부하고 있어.',
        japanese: '音楽(おんがく)を聞(き)きながら勉強(べんきょう)している。',
        plain:    '音楽を聞きながら勉強している。',
        reading:  '온가쿠오 키키나가라 벵쿄시테이루.',
        pattern:  { name: '〜ながら', meaning: '~하면서 (동시동작)', note: 'ます형 + ながら. 두 동작을 동시에 할 때 사용' },
        furigana: 'おんがくをききながらべんきょうしている',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '길을 모르면 역원에게 물어봐.',
        japanese: '道(みち)が分(わ)からなければ、駅員(えきいん)に聞(き)いてみて。',
        plain:    '道が分からなければ、駅員に聞いてみて。',
        reading:  '미치가 와카라나케레바, 에키잉니 키이테미테.',
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '시험 삼아 물어보는 행동을 권유하는 표현' },
        furigana: 'みちがわからなければえきいんにきいてみて',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '선생님 말씀을 잘 들으세요.',
        japanese: '先生(せんせい)の話(はなし)をよく聞(き)いてください。',
        plain:    '先生の話をよく聞いてください。',
        reading:  '센세이노 하나시오 요쿠 키이테쿠다사이.',
        pattern:  { name: '〜てください', meaning: '~해 주세요 (의뢰·지시)', note: 'て형 + ください. 요청이나 지시를 나타내는 표현' },
        furigana: 'せんせいのはなしをよくきいてください',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 19위  使う
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsukau', rank: 19, verb: '使う', reading: '츠카우', meaning: '사용하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '使(つか)います',             ruby: '츠카이마스',          meaning: '사용합니다' },
        { text: '使(つか)いません',           ruby: '츠카이마셍',          meaning: '사용 안 합니다' },
        { text: '使(つか)いますか？',         ruby: '츠카이마스까?',       meaning: '사용하십니까?' },
        { text: '使(つか)いませんか？',       ruby: '츠카이마셍까?',       meaning: '사용 안 하십니까?' },
        { text: '使(つか)いました',           ruby: '츠카이마시타',        meaning: '사용했습니다' },
        { text: '使(つか)いませんでした',     ruby: '츠카이마셍데시타',    meaning: '사용 안 했습니다' },
        { text: '使(つか)いましたか？',       ruby: '츠카이마시타까?',     meaning: '사용했습니까?' },
        { text: '使(つか)いませんでしたか？', ruby: '츠카이마셍데시타까?', meaning: '사용 안 했습니까?' },
      ],
      casual: [
        { text: '使(つか)う',           ruby: '츠카우',       meaning: '써' },
        { text: '使(つか)わない',       ruby: '츠카와나이',   meaning: '안 써' },
        { text: '使(つか)う？',         ruby: '츠카우?',      meaning: '써?' },
        { text: '使(つか)わない？',     ruby: '츠카와나이?',  meaning: '안 써?' },
        { text: '使(つか)った',         ruby: '츠캇타',       meaning: '썼어' },
        { text: '使(つか)わなかった',   ruby: '츠카와나캇타', meaning: '안 썼어' },
        { text: '使(つか)った？',       ruby: '츠캇타?',      meaning: '썼어?' },
        { text: '使(つか)わなかった？', ruby: '츠카와나캇타?', meaning: '안 썼어?' },
      ],
    },
    examples: [
      {
        korean:   '이 앱을 사용하는 방법을 가르쳐 줘.',
        japanese: 'このアプリの使(つか)い方(かた)を教(おし)えて。',
        plain:    'このアプリの使い方を教えて。',
        reading:  '코노 아푸리노 츠카이카타오 오시에테.',
        pattern:  { name: '〜方', meaning: '~하는 방법', note: 'ます형 + 方. 방법이나 방식을 나타내는 명사 파생 표현' },
        furigana: 'このあぷりのつかいかたをおしえて',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '사전을 사용해 가면서 읽으세요.',
        japanese: '辞書(じしょ)を使(つか)いながら読(よ)んでください。',
        plain:    '辞書を使いながら読んでください。',
        reading:  '지쇼오 츠카이나가라 욘데쿠다사이.',
        pattern:  { name: '〜ながら', meaning: '~하면서', note: 'ます형 + ながら. 두 동작이 동시에 이루어짐을 나타냄' },
        furigana: 'じしょをつかいながらよんでください',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 컴퓨터는 10년이나 사용했어.',
        japanese: 'このパソコンは10年(ねん)も使(つか)った。',
        plain:    'このパソコンは10年も使った。',
        reading:  '코노 파소콩와 쥬ー넨모 츠캇타.',
        pattern:  { name: '〜も (강조)', meaning: '~나 / ~씩이나 (예상 초과)', note: 'も를 수량 뒤에 붙여 놀라움이나 강조를 나타냄' },
        furigana: 'このぱそこんはじゅうねんもつかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 20위  取る
   * ══════════════════════════════════════════════════ */
  {
    id: 'toru', rank: 20, verb: '取る', reading: '토루', meaning: '잡다; 가져가다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '取(と)ります',             ruby: '토리마스',          meaning: '가져갑니다' },
        { text: '取(と)りません',           ruby: '토리마셍',          meaning: '안 가져갑니다' },
        { text: '取(と)りますか？',         ruby: '토리마스까?',       meaning: '가져가십니까?' },
        { text: '取(と)りませんか？',       ruby: '토리마셍까?',       meaning: '안 가져가십니까?' },
        { text: '取(と)りました',           ruby: '토리마시타',        meaning: '가져갔습니다' },
        { text: '取(と)りませんでした',     ruby: '토리마셍데시타',    meaning: '안 가져갔습니다' },
        { text: '取(と)りましたか？',       ruby: '토리마시타까?',     meaning: '가져갔습니까?' },
        { text: '取(と)りませんでしたか？', ruby: '토리마셍데시타까?', meaning: '안 가져갔습니까?' },
      ],
      casual: [
        { text: '取(と)る',           ruby: '토루',       meaning: '가져가' },
        { text: '取(と)らない',       ruby: '토라나이',   meaning: '안 가져가' },
        { text: '取(と)る？',         ruby: '토루?',      meaning: '가져가?' },
        { text: '取(と)らない？',     ruby: '토라나이?',  meaning: '안 가져가?' },
        { text: '取(と)った',         ruby: '톳타',       meaning: '가져갔어' },
        { text: '取(と)らなかった',   ruby: '토라나캇타', meaning: '안 가져갔어' },
        { text: '取(と)った？',       ruby: '톳타?',      meaning: '가져갔어?' },
        { text: '取(と)らなかった？', ruby: '토라나캇타?', meaning: '안 가져갔어?' },
      ],
    },
    examples: [
      {
        korean:   '소금 좀 집어 줄래?',
        japanese: '塩(しお)を取(と)ってもらえる？',
        plain:    '塩を取ってもらえる？',
        reading:  '시오오 톳테 모라에루?',
        pattern:  { name: '〜てもらえる？', meaning: '~해 줄 수 있어? (부탁)', note: 'てもらう의 가능형 의문문. 부드럽게 부탁하는 표현' },
        furigana: 'しおをとってもらえる',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '메모를 한 다음 잊지 않도록 해.',
        japanese: 'メモを取(と)ってから忘(わす)れないようにして。',
        plain:    'メモを取ってから忘れないようにして。',
        reading:  '메모오 톳테카라 와스레나이 요ー니시테.',
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '메모를 한 후 잊지 않도록 한다는 순서·계기를 나타냄' },
        furigana: 'めもをとってからわすれないようにして',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '사진을 찍어도 됩니까?',
        japanese: '写真(しゃしん)を撮(と)ってもいいですか？',
        plain:    '写真を撮ってもいいですか？',
        reading:  '샤싱오 톳테모 이이데스까?',
        pattern:  { name: '〜てもいい', meaning: '~해도 된다 (허가)', note: 'て형 + もいいですか로 허가를 구하는 표현. 撮る(찍다)도 取る와 동음이의' },
        furigana: 'しゃしんをとってもいいですか',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  { id: 'shiru',    rank: 21, verb: '知る',     reading: '시루',       meaning: '알다',                   conjugations: null, examples: [] },
  { id: 'okonau',   rank: 22, verb: '行う',     reading: '오코나우',   meaning: '행하다; 실시하다',       conjugations: null, examples: [] },
  { id: 'shigoto',  rank: 23, verb: '仕事する', reading: '시고토스루', meaning: '일하다',                 conjugations: null, examples: [] },
  { id: 'taberu',   rank: 24, verb: '食べる',   reading: '타베루',     meaning: '먹다',                   conjugations: null, examples: [] },
  { id: 'kaku',     rank: 25, verb: '書く',     reading: '카쿠',       meaning: '쓰다',                   conjugations: null, examples: [] },
  { id: 'ireru',    rank: 26, verb: '入れる',   reading: '이레루',     meaning: '넣다',                   conjugations: null, examples: [] },
  { id: 'tsuku',    rank: 27, verb: '付く',     reading: '츠쿠',       meaning: '붙다; 달라붙다',         conjugations: null, examples: [] },
  { id: 'dasu',     rank: 28, verb: '出す',     reading: '다스',       meaning: '꺼내다; 내다',           conjugations: null, examples: [] },
  { id: 'gozaru',   rank: 29, verb: 'ございます', reading: '고자이마스', meaning: '있습니다 (경어)',      conjugations: null, examples: [] },
  { id: 'chigau',   rank: 30, verb: '違う',     reading: '치가우',     meaning: '다르다; 틀리다',         conjugations: null, examples: [] },
  { id: 'ukeru',    rank: 31, verb: '受ける',   reading: '우케루',     meaning: '받다; 수용하다',         conjugations: null, examples: [] },
  { id: 'hanasu',   rank: 32, verb: '話す',     reading: '하나스',     meaning: '말하다; 이야기하다',     conjugations: null, examples: [] },
  { id: 'kaeru',    rank: 33, verb: '帰る',     reading: '카에루',     meaning: '돌아가다',               conjugations: null, examples: [] },
  { id: 'kakeru',   rank: 34, verb: '掛ける',   reading: '카케루',     meaning: '걸다; (시간·돈이) 들다', conjugations: null, examples: [] },
  { id: 'owaru',    rank: 35, verb: '終わる',   reading: '오와루',     meaning: '끝나다',                 conjugations: null, examples: [] },
  { id: 'imisuru',  rank: 36, verb: '意味する', reading: '이미스루',   meaning: '의미하다',               conjugations: null, examples: [] },
  { id: 'tsukeru',  rank: 37, verb: '付ける',   reading: '츠케루',     meaning: '붙이다; 켜다',           conjugations: null, examples: [] },
  { id: 'kanjiru',  rank: 38, verb: '感じる',   reading: '캉지루',     meaning: '느끼다',                 conjugations: null, examples: [] },
  { id: 'kakaru',   rank: 39, verb: 'かかる',   reading: '카카루',     meaning: '(시간·돈이) 걸리다',    conjugations: null, examples: [] },
  { id: 'sumu',     rank: 40, verb: '住む',     reading: '스무',       meaning: '살다; 거주하다',         conjugations: null, examples: [] },
  { id: 'seikatsu', rank: 41, verb: '生活する', reading: '세이카츠스루', meaning: '생활하다',            conjugations: null, examples: [] },
  { id: 'ageru',    rank: 42, verb: 'あげる',   reading: '아게루',     meaning: '올리다; 주다',           conjugations: null, examples: [] },
  { id: 'noru',     rank: 43, verb: '乗る',     reading: '노루',       meaning: '타다',                   conjugations: null, examples: [] },
  { id: 'mieru',    rank: 44, verb: '見える',   reading: '미에루',     meaning: '보이다',                 conjugations: null, examples: [] },
  { id: 'kawaru',   rank: 45, verb: '変わる',   reading: '카와루',     meaning: '바뀌다; 변하다',         conjugations: null, examples: [] },
  { id: 'yomu',     rank: 46, verb: '読む',     reading: '요무',       meaning: '읽다',                   conjugations: null, examples: [] },
  { id: 'oshieru',  rank: 47, verb: '教える',   reading: '오시에루',   meaning: '가르치다; 알려주다',     conjugations: null, examples: [] },
  { id: 'oku',      rank: 48, verb: '置く',     reading: '오쿠',       meaning: '놓다; 두다',             conjugations: null, examples: [] },
  { id: 'nokoru',   rank: 49, verb: '残る',     reading: '노코루',     meaning: '남다',                   conjugations: null, examples: [] },
  { id: 'yobu',     rank: 50, verb: '呼ぶ',     reading: '요부',       meaning: '부르다',                 conjugations: null, examples: [] },
]
