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
  { id: 'dekiru',   rank: 11, verb: 'できる',   reading: '데키루',     meaning: '할 수 있다; 생기다',    conjugations: null, examples: [] },
  { id: 'motsu',    rank: 12, verb: '持つ',     reading: '모츠',       meaning: '가지다; 들다',           conjugations: null, examples: [] },
  { id: 'deru',     rank: 13, verb: '出る',     reading: '데루',       meaning: '나오다; 나가다',         conjugations: null, examples: [] },
  { id: 'kangaeru', rank: 14, verb: '考える',   reading: '캉가에루',   meaning: '생각하다; 고려하다',     conjugations: null, examples: [] },
  { id: 'wakaru',   rank: 15, verb: '分かる',   reading: '와카루',     meaning: '알다; 이해하다',         conjugations: null, examples: [] },
  { id: 'hairu',    rank: 16, verb: '入る',     reading: '하이루',     meaning: '들어가다',               conjugations: null, examples: [] },
  { id: 'tsukuru',  rank: 17, verb: '作る',     reading: '츠쿠루',     meaning: '만들다',                 conjugations: null, examples: [] },
  { id: 'kiku',     rank: 18, verb: '聞く',     reading: '키쿠',       meaning: '듣다; 묻다',             conjugations: null, examples: [] },
  { id: 'tsukau',   rank: 19, verb: '使う',     reading: '츠카우',     meaning: '사용하다',               conjugations: null, examples: [] },
  { id: 'toru',     rank: 20, verb: '取る',     reading: '토루',       meaning: '잡다; 가져가다',         conjugations: null, examples: [] },
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
