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
   * 1위  する
   * ══════════════════════════════════════════════════ */
  {
    id: 'suru', rank: 1, verb: 'する', reading: '스루', meaning: '하다',
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
   * 2위  いる
   * ══════════════════════════════════════════════════ */
  {
    id: 'iru', rank: 2, verb: 'いる', reading: '이루', meaning: '있다 (사람·동물)',
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
   * 4위  言う
   * ══════════════════════════════════════════════════ */
  {
    id: 'iu', rank: 4, verb: '言う', reading: '이우', meaning: '말하다',
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
   * 5위  なる
   * ══════════════════════════════════════════════════ */
  {
    id: 'naru', rank: 5, verb: 'なる', reading: '나루', meaning: '되다',
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
   * 6위  来る
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuru', rank: 6, verb: '来る', reading: '쿠루', meaning: '오다',
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
   * 7위  思う
   * ══════════════════════════════════════════════════ */
  {
    id: 'omou', rank: 7, verb: '思う', reading: '오모우', meaning: '생각하다',
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
   * 9위  行く
   * ══════════════════════════════════════════════════ */
  {
    id: 'iku', rank: 9, verb: '行く', reading: '이쿠', meaning: '가다',
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
  /* ── 11~50위: 탭 생성용 스텁 ─────────────────── */
  /* ══════════════════════════════════════════════════
   * 10위  できる
   * ══════════════════════════════════════════════════ */
  {
    id: 'dekiru', rank: 10, verb: 'できる', reading: '데키루', meaning: '할 수 있다; 생기다',
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
   * 11위  因る
   * ══════════════════════════════════════════════════ */
  {
    id: 'yoru', rank: 11, verb: '因る', reading: '요루', meaning: '~에 의하다; ~에 달려 있다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'よります',             ruby: '요리마스',          meaning: '~에 달려 있습니다' },
        { text: 'よりません',           ruby: '요리마셍',          meaning: '~에 달려 있지 않습니다' },
        { text: 'よりますか？',         ruby: '요리마스까?',       meaning: '~에 달려 있습니까?' },
        { text: 'よりませんか？',       ruby: '요리마셍까?',       meaning: '~에 달려 있지 않습니까?' },
        { text: 'よりました',           ruby: '요리마시타',        meaning: '~에 달려 있었습니다' },
        { text: 'よりませんでした',     ruby: '요리마셍데시타',    meaning: '~에 달려 있지 않았습니다' },
        { text: 'よりましたか？',       ruby: '요리마시타까?',     meaning: '~에 달려 있었습니까?' },
        { text: 'よりませんでしたか？', ruby: '요리마셍데시타까?', meaning: '~에 달려 있지 않았습니까?' },
      ],
      casual: [
        { text: 'よる',           ruby: '요루',        meaning: '~에 달려 있어' },
        { text: 'よらない',       ruby: '요라나이',    meaning: '~에 달려 있지 않아' },
        { text: 'よる？',         ruby: '요루?',       meaning: '~에 달려 있어?' },
        { text: 'よらない？',     ruby: '요라나이?',   meaning: '~에 달려 있지 않아?' },
        { text: 'よった',         ruby: '욧타',        meaning: '~에 달려 있었어' },
        { text: 'よらなかった',   ruby: '요라나캇타',  meaning: '~에 달려 있지 않았어' },
        { text: 'よった？',       ruby: '욧타?',       meaning: '~에 달려 있었어?' },
        { text: 'よらなかった？', ruby: '요라나캇타?', meaning: '~에 달려 있지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '노력에 따라 결과가 달라져.',
        japanese: '努力(どりょく)によって結果(けっか)が変(か)わる。',
        plain:    '努力によって結果が変わる。',
        reading:  '도료쿠니 욧테 켓카가 카와루.',
        pattern:  { name: '〜によって', meaning: '~에 의해서; ~에 따라서', note: '원인·수단·근거를 나타내는 격식 표현. 수동문의 동작주에도 사용' },
        furigana: 'どりょくによってけっかがかわる',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그건 경우에 따라 다릅니다.',
        japanese: 'それは場合(ばあい)によります。',
        plain:    'それは場合による。',
        reading:  '소레와 바아이니 요리마스.',
        pattern:  { name: '場合による', meaning: '경우에 따라 다르다', note: '상황에 따라 결과가 달라짐을 나타내는 관용 표현' },
        furigana: 'それはばあいによります',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '실패의 원인은 준비 부족에 의한 것이야.',
        japanese: '失敗(しっぱい)の原因(げんいん)は準備(じゅんび)不足(ぶそく)によるものだ。',
        plain:    '失敗の原因は準備不足によるものだ。',
        reading:  '싯파이노 겐인와 준비 부소쿠니 요루 모노다.',
        pattern:  { name: '〜による', meaning: '~에 의한; ~에 기인한', note: '명사를 수식하는 용법. に + よる + 명사 형태로 사용' },
        furigana: 'しっぱいのげんいんはじゅんびぶそくによるものだ',
        accentData: [
          { phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 12위  つく
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsuku_iru', rank: 12, verb: 'つく', reading: '츠쿠', meaning: '붙다; 켜지다; 도착하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'つきます',             ruby: '츠키마스',          meaning: '붙습니다 / 도착합니다' },
        { text: 'つきません',           ruby: '츠키마셍',          meaning: '붙지 않습니다' },
        { text: 'つきますか？',         ruby: '츠키마스까?',       meaning: '붙습니까?' },
        { text: 'つきませんか？',       ruby: '츠키마셍까?',       meaning: '붙지 않습니까?' },
        { text: 'つきました',           ruby: '츠키마시타',        meaning: '붙었습니다' },
        { text: 'つきませんでした',     ruby: '츠키마셍데시타',    meaning: '붙지 않았습니다' },
        { text: 'つきましたか？',       ruby: '츠키마시타까?',     meaning: '붙었습니까?' },
        { text: 'つきませんでしたか？', ruby: '츠키마셍데시타까?', meaning: '붙지 않았습니까?' },
      ],
      casual: [
        { text: 'つく',           ruby: '츠쿠',        meaning: '붙어' },
        { text: 'つかない',       ruby: '츠카나이',    meaning: '붙지 않아' },
        { text: 'つく？',         ruby: '츠쿠?',       meaning: '붙어?' },
        { text: 'つかない？',     ruby: '츠카나이?',   meaning: '붙지 않아?' },
        { text: 'ついた',         ruby: '츠이타',      meaning: '붙었어' },
        { text: 'つかなかった',   ruby: '츠카나캇타',  meaning: '붙지 않았어' },
        { text: 'ついた？',       ruby: '츠이타?',     meaning: '붙었어?' },
        { text: 'つかなかった？', ruby: '츠카나캇타?', meaning: '붙지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '불이 켜졌어.',
        japanese: '電気(でんき)がついた。',
        plain:    '電気がついた。',
        reading:  '덴키가 츠이타.',
        pattern:  { name: '〜がつく', meaning: '~이/가 켜지다; 붙다', note: '주어가 저절로 변화하는 상태 변화를 나타냄. 付く·点く 등 한자 구별' },
        furigana: 'でんきがついた',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '역에 도착했습니까?',
        japanese: '駅(えき)に着(つ)きましたか？',
        plain:    '駅に着いた？',
        reading:  '에키니 츠키마시타카?',
        pattern:  { name: '〜に着く', meaning: '~에 도착하다', note: '목적지 도착. 着く(도착)·付く(부착)·就く(취임) 등 동음이의어 주의' },
        furigana: 'えきについましたか',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [1, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '스티커가 잘 안 붙어.',
        japanese: 'シールがなかなかつかない。',
        plain:    'シールがなかなかつかない。',
        reading:  '시ー루가 나카나카 츠카나이.',
        pattern:  { name: 'なかなか〜ない', meaning: '좀처럼 ~하지 않다', note: 'なかなか는 부정형과 함께 써서 "좀처럼 ~하지 않다"는 뜻을 나타냄' },
        furigana: 'しーるがなかなかつかない',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 13위  考える
   * ══════════════════════════════════════════════════ */
  {
    id: 'kangaeru', rank: 13, verb: '考える', reading: '캉가에루', meaning: '생각하다; 고려하다',
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
   * 14위  仕舞う
   * ══════════════════════════════════════════════════ */
  {
    id: 'shimau', rank: 14, verb: '仕舞う', reading: '시마우', meaning: '끝내다; ~해버리다 (보조동사)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'しまいます',             ruby: '시마이마스',          meaning: '끝냅니다 / ~해버립니다' },
        { text: 'しまいません',           ruby: '시마이마셍',          meaning: '끝내지 않습니다' },
        { text: 'しまいますか？',         ruby: '시마이마스까?',       meaning: '끝냅니까?' },
        { text: 'しまいませんか？',       ruby: '시마이마셍까?',       meaning: '끝내지 않습니까?' },
        { text: 'しまいました',           ruby: '시마이마시타',        meaning: '끝냈습니다' },
        { text: 'しまいませんでした',     ruby: '시마이마셍데시타',    meaning: '끝내지 않았습니다' },
        { text: 'しまいましたか？',       ruby: '시마이마시타까?',     meaning: '끝냈습니까?' },
        { text: 'しまいませんでしたか？', ruby: '시마이마셍데시타까?', meaning: '끝내지 않았습니까?' },
      ],
      casual: [
        { text: 'しまう',           ruby: '시마우',        meaning: '끝내 / 해버려' },
        { text: 'しまわない',       ruby: '시마와나이',    meaning: '끝내지 않아' },
        { text: 'しまう？',         ruby: '시마우?',       meaning: '끝내?' },
        { text: 'しまわない？',     ruby: '시마와나이?',   meaning: '끝내지 않아?' },
        { text: 'しまった',         ruby: '시맛타',        meaning: '끝냈어 / 해버렸어' },
        { text: 'しまわなかった',   ruby: '시마와나캇타',  meaning: '끝내지 않았어' },
        { text: 'しまった？',       ruby: '시맛타?',       meaning: '끝냈어?' },
        { text: 'しまわなかった？', ruby: '시마와나캇타?', meaning: '끝내지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '숙제를 전부 다 해버렸어.',
        japanese: '宿題(しゅくだい)を全部(ぜんぶ)やってしまった。',
        plain:    '宿題を全部やってしまった。',
        reading:  '슈쿠다이오 젠부 얏테 시맛타.',
        pattern:  { name: '〜てしまう', meaning: '~해버리다; 완전히 끝내다', note: '동작의 완료 또는 후회·유감을 나타내는 보조동사 용법. 구어에서는 〜ちゃう로 줄어듦' },
        furigana: 'しゅくだいをぜんぶやってしまった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '그만 우산을 두고 와 버렸습니다.',
        japanese: 'うっかり傘(かさ)を忘(わす)れてしまいました。',
        plain:    'うっかり傘を忘れてしまった。',
        reading:  '웃카리 카사오 와스레테 시마이마시타.',
        pattern:  { name: 'うっかり〜てしまう', meaning: '그만; 실수로 ~해버리다', note: 'うっかり는 부주의한 실수를 나타내는 부사. 후회 뉘앙스가 강함' },
        furigana: 'うっかりかさをわすれてしまいました',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '빨리 치워 버리자.',
        japanese: '早(はや)く片付(かたづ)けてしまおう。',
        plain:    '早く片付けてしまおう。',
        reading:  '하야쿠 카타즈케테 시마오ー.',
        pattern:  { name: '〜てしまおう', meaning: '~해버리자 (완료 의지·권유)', note: 'しまう의 의지형. 빨리 끝내자는 의미의 권유 표현' },
        furigana: 'はやくかたづけてしまおう',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 15위  持つ
   * ══════════════════════════════════════════════════ */
  {
    id: 'motsu', rank: 15, verb: '持つ', reading: '모츠', meaning: '가지다; 들다',
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
   * 16위  やる
   * ══════════════════════════════════════════════════ */
  {
    id: 'yaru', rank: 16, verb: 'やる', reading: '야루', meaning: '하다 (구어)',
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
   * 17위  分かる
   * ══════════════════════════════════════════════════ */
  {
    id: 'wakaru', rank: 17, verb: '分かる', reading: '와카루', meaning: '알다; 이해하다',
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
   * 18위  居る(おる)
   * ══════════════════════════════════════════════════ */
  {
    id: 'oru', rank: 18, verb: '居る(おる)', reading: '오루', meaning: '있다 (겸양·방언)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'おります',             ruby: '오리마스',          meaning: '있습니다 (겸양)' },
        { text: 'おりません',           ruby: '오리마셍',          meaning: '없습니다 (겸양)' },
        { text: 'おりますか？',         ruby: '오리마스까?',       meaning: '계십니까?' },
        { text: 'おりませんか？',       ruby: '오리마셍까?',       meaning: '안 계십니까?' },
        { text: 'おりました',           ruby: '오리마시타',        meaning: '있었습니다 (겸양)' },
        { text: 'おりませんでした',     ruby: '오리마셍데시타',    meaning: '없었습니다 (겸양)' },
        { text: 'おりましたか？',       ruby: '오리마시타까?',     meaning: '계셨습니까?' },
        { text: 'おりませんでしたか？', ruby: '오리마셍데시타까?', meaning: '안 계셨습니까?' },
      ],
      casual: [
        { text: 'おる',           ruby: '오루',        meaning: '있어 (방언·겸양)' },
        { text: 'おらない',       ruby: '오라나이',    meaning: '없어' },
        { text: 'おる？',         ruby: '오루?',       meaning: '있어?' },
        { text: 'おらない？',     ruby: '오라나이?',   meaning: '없어?' },
        { text: 'おった',         ruby: '옷타',        meaning: '있었어' },
        { text: 'おらなかった',   ruby: '오라나캇타',  meaning: '없었어' },
        { text: 'おった？',       ruby: '옷타?',       meaning: '있었어?' },
        { text: 'おらなかった？', ruby: '오라나캇타?', meaning: '없었어?' },
      ],
    },
    examples: [
      {
        korean:   '담당자는 지금 자리에 없습니다.',
        japanese: '担当(たんとう)の者(もの)は今(いま)おりません。',
        plain:    '担当の者は今いない。',
        reading:  '탄토ー노 모노와 이마 오리마셍.',
        pattern:  { name: '〜ておりません', meaning: '없습니다 (겸양)', note: 'いる의 겸양어. 전화 응대·비즈니스 장면에서 자신이나 내부인을 낮출 때 사용' },
        furigana: 'たんとうのものはいまおりません',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '저는 이쪽에 있습니다.',
        japanese: '私(わたし)はこちらにおります。',
        plain:    '私はここにいる。',
        reading:  '와타시와 코치라니 오리마스.',
        pattern:  { name: '〜におります', meaning: '~에 있습니다 (겸양)', note: '자신의 위치를 상대에게 공손하게 전달하는 표현' },
        furigana: 'わたしはこちらにおります',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '조금 전까지 여기 있었는데요.',
        japanese: '先(さき)ほどまでここにおりましたが。',
        plain:    'さっきまでここにいたけど。',
        reading:  '사키호도 마데 코코니 오리마시타가.',
        pattern:  { name: '〜ておりましたが', meaning: '있었습니다만 (겸양·과거)', note: 'おる의 과거형. が는 전환 또는 여운의 뉘앙스. 정중한 상황 설명에 사용' },
        furigana: 'さきほどまでここにおりましたが',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 19위  於く (〜ておく)
   * ══════════════════════════════════════════════════ */
  {
    id: 'oku_aux', rank: 19, verb: '於く', reading: '오쿠', meaning: '~해 두다 (보조동사)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'ておきます',             ruby: '테오키마스',          meaning: '~해 놓겠습니다' },
        { text: 'ておきません',           ruby: '테오키마셍',          meaning: '~해 놓지 않겠습니다' },
        { text: 'ておきますか？',         ruby: '테오키마스까?',       meaning: '~해 놓겠습니까?' },
        { text: 'ておきませんか？',       ruby: '테오키마셍까?',       meaning: '~해 놓지 않겠습니까?' },
        { text: 'ておきました',           ruby: '테오키마시타',        meaning: '~해 놓았습니다' },
        { text: 'ておきませんでした',     ruby: '테오키마셍데시타',    meaning: '~해 놓지 않았습니다' },
        { text: 'ておきましたか？',       ruby: '테오키마시타까?',     meaning: '~해 놓았습니까?' },
        { text: 'ておきませんでしたか？', ruby: '테오키마셍데시타까?', meaning: '~해 놓지 않았습니까?' },
      ],
      casual: [
        { text: 'ておく',           ruby: '테오쿠',        meaning: '~해 놓아' },
        { text: 'ておかない',       ruby: '테오카나이',    meaning: '~해 놓지 않아' },
        { text: 'ておく？',         ruby: '테오쿠?',       meaning: '~해 놓을래?' },
        { text: 'ておかない？',     ruby: '테오카나이?',   meaning: '~해 놓지 않을래?' },
        { text: 'ておいた',         ruby: '테오이타',      meaning: '~해 놓았어' },
        { text: 'ておかなかった',   ruby: '테오카나캇타',  meaning: '~해 놓지 않았어' },
        { text: 'ておいた？',       ruby: '테오이타?',     meaning: '~해 놓았어?' },
        { text: 'ておかなかった？', ruby: '테오카나캇타?', meaning: '~해 놓지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '여행 전에 호텔을 예약해 놓았어.',
        japanese: '旅行(りょこう)の前(まえ)にホテルを予約(よやく)しておいた。',
        plain:    '旅行の前にホテルを予約しておいた。',
        reading:  '료코ー노 마에니 호테루오 요야쿠 시테오이타.',
        pattern:  { name: '〜ておく', meaning: '~해 놓다; 미리 해 두다', note: '사전 준비나 향후를 위해 어떤 행동을 해 두는 것을 나타냄' },
        furigana: 'りょこうのまえにほてるをよやくしておいた',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '자료를 프린트해 놓겠습니다.',
        japanese: '資料(しりょう)をプリントしておきます。',
        plain:    '資料をプリントしておく。',
        reading:  '시료ー오 푸린토 시테오키마스.',
        pattern:  { name: '〜ておきます', meaning: '~해 놓겠습니다', note: '준비나 배려 차원의 사전 행동. 정중 표현' },
        furigana: 'しりょうをぷりんとしておきます',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '내일을 위해 준비해 놓아.',
        japanese: '明日(あした)のために準備(じゅんび)しておいてね。',
        plain:    '明日のために準備しておいてね。',
        reading:  '아시타노 타메니 준비 시테오이테네.',
        pattern:  { name: '〜ておいてね', meaning: '~해 놓아 (당부·부탁)', note: 'ておく의 て형 + ね로 가볍게 당부하는 뉘앙스' },
        furigana: 'あしたのためにじゅんびしておいてね',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 20위  出る
   * ══════════════════════════════════════════════════ */
  {
    id: 'deru', rank: 20, verb: '出る', reading: '데루', meaning: '나오다; 나가다',
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
   * 21위  行う
   * ══════════════════════════════════════════════════ */
  {
    id: 'okonau', rank: 21, verb: '行う', reading: '오코나우', meaning: '실시하다; 행하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'おこないます',             ruby: '오코나이마스',          meaning: '실시합니다' },
        { text: 'おこないません',           ruby: '오코나이마셍',          meaning: '실시하지 않습니다' },
        { text: 'おこないますか？',         ruby: '오코나이마스까?',       meaning: '실시합니까?' },
        { text: 'おこないませんか？',       ruby: '오코나이마셍까?',       meaning: '실시하지 않습니까?' },
        { text: 'おこないました',           ruby: '오코나이마시타',        meaning: '실시했습니다' },
        { text: 'おこないませんでした',     ruby: '오코나이마셍데시타',    meaning: '실시하지 않았습니다' },
        { text: 'おこないましたか？',       ruby: '오코나이마시타까?',     meaning: '실시했습니까?' },
        { text: 'おこないませんでしたか？', ruby: '오코나이마셍데시타까?', meaning: '실시하지 않았습니까?' },
      ],
      casual: [
        { text: 'おこなう',           ruby: '오코나우',        meaning: '실시해' },
        { text: 'おこなわない',       ruby: '오코나와나이',    meaning: '실시하지 않아' },
        { text: 'おこなう？',         ruby: '오코나우?',       meaning: '실시해?' },
        { text: 'おこなわない？',     ruby: '오코나와나이?',   meaning: '실시하지 않아?' },
        { text: 'おこなった',         ruby: '오코낫타',        meaning: '실시했어' },
        { text: 'おこなわなかった',   ruby: '오코나와나캇타',  meaning: '실시하지 않았어' },
        { text: 'おこなった？',       ruby: '오코낫타?',       meaning: '실시했어?' },
        { text: 'おこなわなかった？', ruby: '오코나와나캇타?', meaning: '실시하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매년 이 시기에 이벤트를 실시합니다.',
        japanese: '毎年(まいとし)この時期(じき)にイベントを行(おこな)います。',
        plain:    '毎年この時期にイベントを行う。',
        reading:  '마이토시 코노 지키니 이벤토오 오코나이마스.',
        pattern:  { name: '〜を行います', meaning: '~을/를 실시합니다', note: 'する보다 격식 있는 공식 표현. 행사·업무·실험 등에 자주 사용' },
        furigana: 'まいとしこのじきにいべんとをおこないます',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '설문조사를 실시했습니다.',
        japanese: 'アンケート調査(ちょうさ)を行(おこな)いました。',
        plain:    'アンケート調査を行った。',
        reading:  '안케ー토 쵸ー사오 오코나이마시타.',
        pattern:  { name: '〜を行いました', meaning: '~을/를 실시했습니다', note: '조사·실험·행사 등을 완료했을 때 쓰는 격식 표현' },
        furigana: 'あんけーとちょうさをおこないました',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '정기적으로 점검을 실시해 주세요.',
        japanese: '定期的(ていきてき)に点検(てんけん)を行(おこな)ってください。',
        plain:    '定期的に点検を行ってください。',
        reading:  '테이키테키니 텐켄오 오코낫테 쿠다사이.',
        pattern:  { name: '〜を行ってください', meaning: '~을/를 실시해 주세요', note: '업무 지시나 안내문에서 자주 사용하는 정중한 요청 표현' },
        furigana: 'ていきてきにてんけんをおこなってください',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 22위  取る
   * ══════════════════════════════════════════════════ */
  {
    id: 'toru', rank: 22, verb: '取る', reading: '토루', meaning: '잡다; 가져가다',
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
  /* ══════════════════════════════════════════════════
   * 23위  下さる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kudasaru', rank: 23, verb: '下さる', reading: '쿠다사루', meaning: '주시다 (존경어)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'くださいます',             ruby: '쿠다사이마스',          meaning: '주십니다 (존경)' },
        { text: 'くださいません',           ruby: '쿠다사이마셍',          meaning: '주시지 않습니다' },
        { text: 'くださいますか？',         ruby: '쿠다사이마스까?',       meaning: '주시겠습니까?' },
        { text: 'くださいませんか？',       ruby: '쿠다사이마셍까?',       meaning: '주시지 않겠습니까?' },
        { text: 'くださいました',           ruby: '쿠다사이마시타',        meaning: '주셨습니다' },
        { text: 'くださいませんでした',     ruby: '쿠다사이마셍데시타',    meaning: '주시지 않았습니다' },
        { text: 'くださいましたか？',       ruby: '쿠다사이마시타까?',     meaning: '주셨습니까?' },
        { text: 'くださいませんでしたか？', ruby: '쿠다사이마셍데시타까?', meaning: '주시지 않았습니까?' },
      ],
      casual: [
        { text: 'くださる',           ruby: '쿠다사루',        meaning: '주셔 / 주신다 (존경)' },
        { text: 'くださらない',       ruby: '쿠다사라나이',    meaning: '주시지 않아' },
        { text: 'くださる？',         ruby: '쿠다사루?',       meaning: '주실래요?' },
        { text: 'くださらない？',     ruby: '쿠다사라나이?',   meaning: '주시지 않을래요?' },
        { text: 'くださった',         ruby: '쿠다삿타',        meaning: '주셨어' },
        { text: 'くださらなかった',   ruby: '쿠다사라나캇타',  meaning: '주시지 않았어' },
        { text: 'くださった？',       ruby: '쿠다삿타?',       meaning: '주셨어?' },
        { text: 'くださらなかった？', ruby: '쿠다사라나캇타?', meaning: '주시지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님이 책을 주셨습니다.',
        japanese: '先生(せんせい)が本(ほん)をくださいました。',
        plain:    '先生が本をくれた。',
        reading:  '센세이가 혼오 쿠다사이마시타.',
        pattern:  { name: '〜をくださる', meaning: '~을/를 주시다 (존경)', note: 'くれる의 존경어. 윗사람이 나에게 무언가를 줄 때 사용' },
        furigana: 'せんせいがほんをくださいました',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '천천히 말씀해 주세요.',
        japanese: 'ゆっくり話(はな)してください。',
        plain:    'ゆっくり話してください。',
        reading:  '유쿠리 하나시테 쿠다사이.',
        pattern:  { name: '〜てください', meaning: '~해 주세요 (정중 요청)', note: 'ください는 くださる의 명령형. て형 + ください로 정중한 요청 표현' },
        furigana: 'ゆっくりはなしてください',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '의견을 들려 주세요.',
        japanese: 'ご意見(いけん)をお聞(き)かせください。',
        plain:    'ご意見をお聞かせください。',
        reading:  '고이켄오 오키카세 쿠다사이.',
        pattern:  { name: 'お〜ください', meaning: '~해 주세요 (격식 높임)', note: 'お + 동사 연용형 + ください. 비즈니스·공식 장면의 정중한 요청' },
        furigana: 'ごいけんをおきかせください',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 24위  対する
   * ══════════════════════════════════════════════════ */
  {
    id: 'taisuru', rank: 24, verb: '対する', reading: '타이스루', meaning: '~에 대하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'たいします',             ruby: '타이시마스',          meaning: '~에 대합니다' },
        { text: 'たいしません',           ruby: '타이시마셍',          meaning: '~에 대하지 않습니다' },
        { text: 'たいしますか？',         ruby: '타이시마스까?',       meaning: '~에 대합니까?' },
        { text: 'たいしませんか？',       ruby: '타이시마셍까?',       meaning: '~에 대하지 않습니까?' },
        { text: 'たいしました',           ruby: '타이시마시타',        meaning: '~에 대했습니다' },
        { text: 'たいしませんでした',     ruby: '타이시마셍데시타',    meaning: '~에 대하지 않았습니다' },
        { text: 'たいしましたか？',       ruby: '타이시마시타까?',     meaning: '~에 대했습니까?' },
        { text: 'たいしませんでしたか？', ruby: '타이시마셍데시타까?', meaning: '~에 대하지 않았습니까?' },
      ],
      casual: [
        { text: 'たいする',           ruby: '타이스루',        meaning: '~에 대해' },
        { text: 'たいしない',         ruby: '타이시나이',      meaning: '~에 대하지 않아' },
        { text: 'たいする？',         ruby: '타이스루?',       meaning: '~에 대해?' },
        { text: 'たいしない？',       ruby: '타이시나이?',     meaning: '~에 대하지 않아?' },
        { text: 'たいした',           ruby: '타이시타',        meaning: '~에 대했어' },
        { text: 'たいしなかった',     ruby: '타이시나캇타',    meaning: '~에 대하지 않았어' },
        { text: 'たいした？',         ruby: '타이시타?',       meaning: '~에 대했어?' },
        { text: 'たいしなかった？',   ruby: '타이시나캇타?',   meaning: '~에 대하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님의 질문에 대해 대답했어.',
        japanese: '先生(せんせい)の質問(しつもん)に対(たい)して答(こた)えた。',
        plain:    '先生の質問に対して答えた。',
        reading:  '센세이노 시츠몽니 타이시테 코타에타.',
        pattern:  { name: '〜に対して', meaning: '~에 대해서; ~을/를 향해', note: '동작이나 감정의 대상을 나타내는 격식 표현' },
        furigana: 'せんせいのしつもんにたいしてこたえた',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '이 문제에 대한 해결책을 생각해 봅시다.',
        japanese: 'この問題(もんだい)に対(たい)する解決策(かいけつさく)を考(かんが)えましょう。',
        plain:    'この問題に対する解決策を考えよう。',
        reading:  '코노 몬다이니 타이스루 카이케츠사쿠오 칸가에마쇼ー.',
        pattern:  { name: '〜に対する〜', meaning: '~에 대한 (명사 수식)', note: 'に対する는 連体形. 뒤에 명사를 수식할 때 사용' },
        furigana: 'このもんだいにたいするかいけつさくをかんがえましょう',
        accentData: [
          { phrase_id: 0, mora_count: 26, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그에게 아무 말도 할 수 없었어.',
        japanese: '彼(かれ)に対(たい)して何(なに)も言(い)えなかった。',
        plain:    '彼に対して何も言えなかった。',
        reading:  '카레니 타이시테 나니모 이에나캇타.',
        pattern:  { name: '〜に対して〜ない', meaning: '~에 대해 ~할 수 없다', note: '감정·태도의 대상을 나타내는 に対して와 부정 표현의 결합' },
        furigana: 'かれにたいしてなにもいえなかった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 25위  使う
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsukau', rank: 25, verb: '使う', reading: '츠카우', meaning: '사용하다',
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
   * 26위  聞く
   * ══════════════════════════════════════════════════ */
  {
    id: 'kiku', rank: 26, verb: '聞く', reading: '키쿠', meaning: '듣다; 묻다',
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
   * 27위  呉れる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kureru', rank: 27, verb: '呉れる', reading: '쿠레루', meaning: '(나에게) 주다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: 'くれます',             ruby: '쿠레마스',          meaning: '줍니다 (나에게)' },
        { text: 'くれません',           ruby: '쿠레마셍',          meaning: '주지 않습니다' },
        { text: 'くれますか？',         ruby: '쿠레마스까?',       meaning: '주겠습니까?' },
        { text: 'くれませんか？',       ruby: '쿠레마셍까?',       meaning: '주지 않겠습니까?' },
        { text: 'くれました',           ruby: '쿠레마시타',        meaning: '주었습니다' },
        { text: 'くれませんでした',     ruby: '쿠레마셍데시타',    meaning: '주지 않았습니다' },
        { text: 'くれましたか？',       ruby: '쿠레마시타까?',     meaning: '주었습니까?' },
        { text: 'くれませんでしたか？', ruby: '쿠레마셍데시타까?', meaning: '주지 않았습니까?' },
      ],
      casual: [
        { text: 'くれる',           ruby: '쿠레루',        meaning: '줘' },
        { text: 'くれない',         ruby: '쿠레나이',      meaning: '안 줘' },
        { text: 'くれる？',         ruby: '쿠레루?',       meaning: '줄래?' },
        { text: 'くれない？',       ruby: '쿠레나이?',     meaning: '안 줄래?' },
        { text: 'くれた',           ruby: '쿠레타',        meaning: '줬어' },
        { text: 'くれなかった',     ruby: '쿠레나캇타',    meaning: '안 줬어' },
        { text: 'くれた？',         ruby: '쿠레타?',       meaning: '줬어?' },
        { text: 'くれなかった？',   ruby: '쿠레나캇타?',   meaning: '안 줬어?' },
      ],
    },
    examples: [
      {
        korean:   '친구가 선물을 줬어.',
        japanese: '友達(ともだち)がプレゼントをくれた。',
        plain:    '友達がプレゼントをくれた。',
        reading:  '토모다치가 푸레젠토오 쿠레타.',
        pattern:  { name: '〜をくれる', meaning: '~을/를 주다 (나에게)', note: 'くれる는 화자 쪽으로의 수수를 나타냄. あげる(줌)·もらう(받음)와 구별' },
        furigana: 'ともだちがぷれぜんとをくれた',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1] },
        ],
      },
      {
        korean:   '그는 아무것도 가르쳐 주지 않았습니다.',
        japanese: '彼(かれ)は何(なに)も教(おし)えてくれませんでした。',
        plain:    '彼は何も教えてくれなかった。',
        reading:  '카레와 나니모 오시에테 쿠레마셍데시타.',
        pattern:  { name: '〜てくれる', meaning: '~해 주다 (나를 위해)', note: 'て형 + くれる. 타인이 나를 위해 행동해 줄 때 사용. ~てあげる와 시점 반대' },
        furigana: 'かれはなにもおしえてくれませんでした',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '도와줘서 고마워.',
        japanese: '助(たす)けてくれてありがとう。',
        plain:    '助けてくれてありがとう。',
        reading:  '타스케테 쿠레테 아리가토ー.',
        pattern:  { name: '〜てくれてありがとう', meaning: '~해 줘서 고마워', note: 'くれる의 て형으로 감사의 이유를 나타냄. 구어에서 자주 쓰이는 표현' },
        furigana: 'たすけてくれてありがとう',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 28위  知る
   * ══════════════════════════════════════════════════ */
  {
    id: 'shiru', rank: 28, verb: '知る', reading: '시루', meaning: '알다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'しります',             ruby: '시리마스',          meaning: '압니다' },
        { text: 'しりません',           ruby: '시리마셍',          meaning: '모릅니다' },
        { text: 'しりますか？',         ruby: '시리마스까?',       meaning: '아십니까?' },
        { text: 'しりませんか？',       ruby: '시리마셍까?',       meaning: '모르십니까?' },
        { text: 'しりました',           ruby: '시리마시타',        meaning: '알게 되었습니다' },
        { text: 'しりませんでした',     ruby: '시리마셍데시타',    meaning: '몰랐습니다' },
        { text: 'しりましたか？',       ruby: '시리마시타까?',     meaning: '아셨습니까?' },
        { text: 'しりませんでしたか？', ruby: '시리마셍데시타까?', meaning: '모르셨습니까?' },
      ],
      casual: [
        { text: 'しる',           ruby: '시루',        meaning: '알아' },
        { text: 'しらない',       ruby: '시라나이',    meaning: '몰라' },
        { text: 'しる？',         ruby: '시루?',       meaning: '알아?' },
        { text: 'しらない？',     ruby: '시라나이?',   meaning: '몰라?' },
        { text: 'しった',         ruby: '싯타',        meaning: '알게 됐어' },
        { text: 'しらなかった',   ruby: '시라나캇타',  meaning: '몰랐어' },
        { text: 'しった？',       ruby: '싯타?',       meaning: '알게 됐어?' },
        { text: 'しらなかった？', ruby: '시라나캇타?', meaning: '몰랐어?' },
      ],
    },
    examples: [
      {
        korean:   '그 사람에 대해 알고 있어?',
        japanese: '彼(かれ)のことを知(し)っている？',
        plain:    '彼のことを知っている？',
        reading:  '카레노 코토오 싯테이루?',
        pattern:  { name: '〜を知っている', meaning: '~을/를 알고 있다', note: '知る는 순간동사. 현재 "알다" 상태는 知っている(알고 있다)로 표현' },
        furigana: 'かれのことをしっている',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그 이야기는 몰랐습니다.',
        japanese: 'その話(はなし)は知(し)りませんでした。',
        plain:    'その話は知らなかった。',
        reading:  '소노 하나시와 시리마셍데시타.',
        pattern:  { name: '〜を知りませんでした', meaning: '~을/를 몰랐습니다', note: '知る의 과거 부정 정중 표현. 知らなかった의 격식체' },
        furigana: 'そのはなしはしりませんでした',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '일본 문화를 더 잘 알고 싶어.',
        japanese: '日本(にほん)の文化(ぶんか)をもっとよく知(し)りたい。',
        plain:    '日本の文化をもっとよく知りたい。',
        reading:  '니혼노 분카오 못토 요쿠 시리타이.',
        pattern:  { name: '〜たい', meaning: '~하고 싶다', note: '동사 연용형 + たい. 화자의 희망이나 바람을 나타냄' },
        furigana: 'にほんのぶんかをもっとよくしりたい',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 29위  置く
   * ══════════════════════════════════════════════════ */
  {
    id: 'oku2', rank: 29, verb: '置く', reading: '오쿠', meaning: '두다; 놓다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '置(お)きます',             ruby: '오키마스',          meaning: '둡니다' },
        { text: '置(お)きません',           ruby: '오키마셍',          meaning: '두지 않습니다' },
        { text: '置(お)きますか？',         ruby: '오키마스까?',       meaning: '둡니까?' },
        { text: '置(お)きませんか？',       ruby: '오키마셍까?',       meaning: '두지 않습니까?' },
        { text: '置(お)きました',           ruby: '오키마시타',        meaning: '두었습니다' },
        { text: '置(お)きませんでした',     ruby: '오키마셍데시타',    meaning: '두지 않았습니다' },
        { text: '置(お)きましたか？',       ruby: '오키마시타까?',     meaning: '두었습니까?' },
        { text: '置(お)きませんでしたか？', ruby: '오키마셍데시타까?', meaning: '두지 않았습니까?' },
      ],
      casual: [
        { text: '置(お)く',           ruby: '오쿠',        meaning: '둬' },
        { text: '置(お)かない',       ruby: '오카나이',    meaning: '두지 않아' },
        { text: '置(お)く？',         ruby: '오쿠?',       meaning: '둬?' },
        { text: '置(お)かない？',     ruby: '오카나이?',   meaning: '두지 않아?' },
        { text: '置(お)いた',         ruby: '오이타',      meaning: '뒀어' },
        { text: '置(お)かなかった',   ruby: '오카나캇타',  meaning: '두지 않았어' },
        { text: '置(お)いた？',       ruby: '오이타?',     meaning: '뒀어?' },
        { text: '置(お)かなかった？', ruby: '오카나캇타?', meaning: '두지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '책을 책상 위에 두세요.',
        japanese: '本(ほん)を机(つくえ)の上(うえ)に置(お)いてください。',
        plain:    '本を机の上に置いてください。',
        reading:  '혼오 츠쿠에노 우에니 오이테쿠다사이.',
        pattern:  { name: '〜に置いてください', meaning: '~에 두세요', note: 'に는 위치 조사. てください는 부탁·지시 표현으로 일상적으로 자주 사용' },
        furigana: 'ほんをつくえのうえにおいてください',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '짐은 여기에 두겠습니다.',
        japanese: '荷物(にもつ)はここに置(お)いておきます。',
        plain:    '荷物はここに置いておく。',
        reading:  '니모츠와 코코니 오이테 오키마스.',
        pattern:  { name: '〜ておきます', meaning: '~해 두겠습니다', note: 'ておく는 미래를 위한 준비나 유지를 나타내는 표현' },
        furigana: 'にもつはここにおいておきます',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '열쇠는 항상 거기에 두고 있어.',
        japanese: '鍵(かぎ)はいつもそこに置(お)いている。',
        plain:    '鍵はいつもそこに置いている。',
        reading:  '카기와 이츠모 소코니 오이테이루.',
        pattern:  { name: '〜に置いている', meaning: '~에 두고 있다', note: 'ている는 현재 진행 또는 습관적 상태를 나타냄' },
        furigana: 'かぎはいつもそこにおいている',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 30위  入る
   * ══════════════════════════════════════════════════ */
  {
    id: 'hairu', rank: 30, verb: '入る', reading: '하이루', meaning: '들어가다',
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
   * 31위  作る
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsukuru', rank: 31, verb: '作る', reading: '츠쿠루', meaning: '만들다',
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
   * 32위  ございます
   * ══════════════════════════════════════════════════ */
  {
    id: 'gozaimasu', rank: 32, verb: 'ございます', reading: '고자이마스', meaning: '있습니다 (최고 경어)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'ございます',                 ruby: '고자이마스',          meaning: '있습니다' },
        { text: 'ございません',               ruby: '고자이마셍',          meaning: '없습니다' },
        { text: 'ございますか？',             ruby: '고자이마스까?',       meaning: '있습니까?' },
        { text: 'ございませんか？',           ruby: '고자이마셍까?',       meaning: '없습니까?' },
        { text: 'ございました',               ruby: '고자이마시타',        meaning: '있었습니다' },
        { text: 'ございませんでした',         ruby: '고자이마셍데시타',    meaning: '없었습니다' },
        { text: 'ございましたか？',           ruby: '고자이마시타까?',     meaning: '있었습니까?' },
        { text: 'ございませんでしたか？',     ruby: '고자이마셍데시타까?', meaning: '없었습니까?' },
      ],
      casual: [
        { text: 'ある',           ruby: '아루',        meaning: '있어' },
        { text: 'ない',           ruby: '나이',        meaning: '없어' },
        { text: 'ある？',         ruby: '아루?',       meaning: '있어?' },
        { text: 'ない？',         ruby: '나이?',       meaning: '없어?' },
        { text: 'あった',         ruby: '앗타',        meaning: '있었어' },
        { text: 'なかった',       ruby: '나캇타',      meaning: '없었어' },
        { text: 'あった？',       ruby: '앗타?',       meaning: '있었어?' },
        { text: 'なかった？',     ruby: '나캇타?',     meaning: '없었어?' },
      ],
    },
    examples: [
      {
        korean:   '이쪽에 있습니다.',
        japanese: 'こちらにございます。',
        plain:    'こちらにある。',
        reading:  '코치라니 고자이마스.',
        pattern:  { name: 'こちらにございます', meaning: '이쪽에 있습니다', note: 'ございます는 ある의 최고 경어형. 안내·접객 상황에서 자주 사용' },
        furigana: 'こちらにございます',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '불명확한 점이 있으십니까?',
        japanese: '何(なに)かご不明(ふめい)な点(てん)はございますか？',
        plain:    '何か不明な点はあるか？',
        reading:  '나니카 고후메이나 텐와 고자이마스까?',
        pattern:  { name: 'ご〜はございますか？', meaning: '~이/가 있으십니까?', note: 'ご+名詞+はございますか는 격식 있는 문의 표현. 고객 응대에서 자주 사용' },
        furigana: 'なにかごふめいなてんはございますか',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '현재 시각은 열 시입니다.',
        japanese: 'ただいまの時刻(じこく)は十時(じゅうじ)でございます。',
        plain:    '今の時刻は十時だ。',
        reading:  '타다이마노 지코쿠와 쥬ー지데 고자이마스.',
        pattern:  { name: '〜でございます', meaning: '~입니다 (최경어)', note: 'です의 최고 경어형. 공식 방송·안내·격식 자리에서 사용' },
        furigana: 'ただいまのじこくはじゅうじでございます',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 33위  出す
   * ══════════════════════════════════════════════════ */
  {
    id: 'dasu', rank: 33, verb: '出す', reading: '다스', meaning: '내다; 꺼내다; ~하기 시작하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '出(だ)します',             ruby: '다시마스',          meaning: '냅니다' },
        { text: '出(だ)しません',           ruby: '다시마셍',          meaning: '내지 않습니다' },
        { text: '出(だ)しますか？',         ruby: '다시마스까?',       meaning: '냅니까?' },
        { text: '出(だ)しませんか？',       ruby: '다시마셍까?',       meaning: '내지 않습니까?' },
        { text: '出(だ)しました',           ruby: '다시마시타',        meaning: '냈습니다' },
        { text: '出(だ)しませんでした',     ruby: '다시마셍데시타',    meaning: '내지 않았습니다' },
        { text: '出(だ)しましたか？',       ruby: '다시마시타까?',     meaning: '냈습니까?' },
        { text: '出(だ)しませんでしたか？', ruby: '다시마셍데시타까?', meaning: '내지 않았습니까?' },
      ],
      casual: [
        { text: '出(だ)す',           ruby: '다스',        meaning: '내' },
        { text: '出(だ)さない',       ruby: '다사나이',    meaning: '내지 않아' },
        { text: '出(だ)す？',         ruby: '다스?',       meaning: '낼 거야?' },
        { text: '出(だ)さない？',     ruby: '다사나이?',   meaning: '안 낼 거야?' },
        { text: '出(だ)した',         ruby: '다시타',      meaning: '냈어' },
        { text: '出(だ)さなかった',   ruby: '다사나캇타',  meaning: '내지 않았어' },
        { text: '出(だ)した？',       ruby: '다시타?',     meaning: '냈어?' },
        { text: '出(だ)さなかった？', ruby: '다사나캇타?', meaning: '내지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '서랍에서 펜을 꺼내.',
        japanese: '引(ひ)き出(だ)しからペンを出(だ)す。',
        plain:    '引き出しからペンを出す。',
        reading:  '히키다시카라 펜오 다스.',
        pattern:  { name: '〜から〜を出す', meaning: '~에서 ~을 꺼내다', note: 'から는 출처를 나타내는 조사. 물건을 꺼낼 때 기본적으로 사용하는 표현' },
        furigana: 'ひきだしからぺんをだす',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '숙제를 제출했습니다.',
        japanese: '宿題(しゅくだい)を提出(ていしゅつ)しました。',
        plain:    '宿題を提出した。',
        reading:  '슈쿠다이오 테이슈츠시마시타.',
        pattern:  { name: '〜を提出する', meaning: '~을 제출하다', note: '提出する는 出す의 격식 표현. 학교·직장에서 과제·서류를 낼 때 사용' },
        furigana: 'しゅくだいをていしゅつしました',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '뛰기 시작하자 멈출 수가 없었어.',
        japanese: '走(はし)り出(だ)したら止(と)まれなかった。',
        plain:    '走り出したら止まれなかった。',
        reading:  '하시리다시타라 토마레나캇타.',
        pattern:  { name: '〜出す', meaning: '~하기 시작하다', note: '動詞+出す는 동작의 시작을 나타내는 복합 표현. 走り出す=뛰기 시작하다' },
        furigana: 'はしりだしたらとまれなかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 34위  付ける
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsukeru', rank: 34, verb: '付ける', reading: '츠케루', meaning: '붙이다; 켜다; 기입하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '付(つ)けます',             ruby: '츠케마스',          meaning: '켭니다 / 붙입니다' },
        { text: '付(つ)けません',           ruby: '츠케마셍',          meaning: '켜지 않습니다' },
        { text: '付(つ)けますか？',         ruby: '츠케마스까?',       meaning: '켭니까?' },
        { text: '付(つ)けませんか？',       ruby: '츠케마셍까?',       meaning: '켜지 않습니까?' },
        { text: '付(つ)けました',           ruby: '츠케마시타',        meaning: '켰습니다' },
        { text: '付(つ)けませんでした',     ruby: '츠케마셍데시타',    meaning: '켜지 않았습니다' },
        { text: '付(つ)けましたか？',       ruby: '츠케마시타까?',     meaning: '켰습니까?' },
        { text: '付(つ)けませんでしたか？', ruby: '츠케마셍데시타까?', meaning: '켜지 않았습니까?' },
      ],
      casual: [
        { text: '付(つ)ける',           ruby: '츠케루',        meaning: '켜' },
        { text: '付(つ)けない',         ruby: '츠케나이',      meaning: '켜지 않아' },
        { text: '付(つ)ける？',         ruby: '츠케루?',       meaning: '켤 거야?' },
        { text: '付(つ)けない？',       ruby: '츠케나이?',     meaning: '안 켤 거야?' },
        { text: '付(つ)けた',           ruby: '츠케타',        meaning: '켰어' },
        { text: '付(つ)けなかった',     ruby: '츠케나캇타',    meaning: '켜지 않았어' },
        { text: '付(つ)けた？',         ruby: '츠케타?',       meaning: '켰어?' },
        { text: '付(つ)けなかった？',   ruby: '츠케나캇타?',   meaning: '켜지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '텔레비전을 켜주세요.',
        japanese: 'テレビをつけてください。',
        plain:    'テレビをつけてください。',
        reading:  '테레비오 츠케테 쿠다사이.',
        pattern:  { name: '〜をつけてください', meaning: '~을 켜주세요', note: 'つける는 전자기기·조명을 켤 때 사용. 반대말은 消す(けす)' },
        furigana: 'てれびをつけてください',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '메모에 이름을 써 두었어.',
        japanese: 'メモに名前(なまえ)を付(つ)けておいた。',
        plain:    'メモに名前を付けておいた。',
        reading:  '메모니 나마에오 츠케테 오이타.',
        pattern:  { name: '名前を付けておく', meaning: '이름을 써 두다', note: 'ておく는 준비·유지를 나타냄. 이름을 기입해 두는 상황' },
        furigana: 'めもになまえをつけておいた',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '불을 켠 채로 잠들어버렸어.',
        japanese: '電気(でんき)をつけたまま寝(ね)てしまった。',
        plain:    '電気をつけたまま寝てしまった。',
        reading:  '덴키오 츠케타마마 네테 시맛타.',
        pattern:  { name: '〜たまま〜てしまった', meaning: '~한 채로 ~해버렸다', note: 'まま는 상태 유지를 나타냄. てしまった는 의도치 않은 결과를 표현' },
        furigana: 'でんきをつけたままねてしまった',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 35위  付く
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsuku2', rank: 35, verb: '付く', reading: '츠쿠', meaning: '붙다; 달리다; 따라가다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '付(つ)きます',             ruby: '츠키마스',          meaning: '붙습니다' },
        { text: '付(つ)きません',           ruby: '츠키마셍',          meaning: '붙지 않습니다' },
        { text: '付(つ)きますか？',         ruby: '츠키마스까?',       meaning: '붙습니까?' },
        { text: '付(つ)きませんか？',       ruby: '츠키마셍까?',       meaning: '붙지 않습니까?' },
        { text: '付(つ)きました',           ruby: '츠키마시타',        meaning: '붙었습니다' },
        { text: '付(つ)きませんでした',     ruby: '츠키마셍데시타',    meaning: '붙지 않았습니다' },
        { text: '付(つ)きましたか？',       ruby: '츠키마시타까?',     meaning: '붙었습니까?' },
        { text: '付(つ)きませんでしたか？', ruby: '츠키마셍데시타까?', meaning: '붙지 않았습니까?' },
      ],
      casual: [
        { text: '付(つ)く',           ruby: '츠쿠',        meaning: '붙어' },
        { text: '付(つ)かない',       ruby: '츠카나이',    meaning: '붙지 않아' },
        { text: '付(つ)く？',         ruby: '츠쿠?',       meaning: '붙어?' },
        { text: '付(つ)かない？',     ruby: '츠카나이?',   meaning: '붙지 않아?' },
        { text: '付(つ)いた',         ruby: '츠이타',      meaning: '붙었어' },
        { text: '付(つ)かなかった',   ruby: '츠카나캇타',  meaning: '붙지 않았어' },
        { text: '付(つ)いた？',       ruby: '츠이타?',     meaning: '붙었어?' },
        { text: '付(つ)かなかった？', ruby: '츠카나캇타?', meaning: '붙지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '스티커가 벽에 붙어 있어.',
        japanese: 'シールが壁(かべ)に付(つ)いている。',
        plain:    'シールが壁に付いている。',
        reading:  '시ー루가 카베니 츠이테이루.',
        pattern:  { name: '〜に付いている', meaning: '~에 붙어 있다', note: 'ている는 결과 상태를 나타냄. 付く는 자동사로 저절로 붙는 상태' },
        furigana: 'しーるがかべについている',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '아이가 부모 뒤를 따라왔어.',
        japanese: '子供(こども)が親(おや)の後(あと)をついてきた。',
        plain:    '子供が親の後をついてきた。',
        reading:  '코도모가 오야노 아토오 츠이테 키타.',
        pattern:  { name: '〜の後をついてくる', meaning: '~의 뒤를 따라오다', note: 'ついてくる는 뒤따라오다. 기어오다의 뜻으로도 사용. てくる는 이쪽 방향 이동' },
        furigana: 'こどもがおやのあとをついてきた',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '이 상품에는 보증이 딸려 있습니다.',
        japanese: 'この商品(しょうひん)には保証(ほしょう)が付(つ)いています。',
        plain:    'この商品には保証が付いている。',
        reading:  '코노 쇼ー힌니와 호쇼ー가 츠이테이마스.',
        pattern:  { name: '〜が付いています', meaning: '~이/가 딸려 있습니다', note: '상품·서비스에 무언가가 포함될 때 사용. ている는 포함 상태' },
        furigana: 'このしょうひんにはほしょうがついています',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 36위  受ける
   * ══════════════════════════════════════════════════ */
  {
    id: 'ukeru', rank: 36, verb: '受ける', reading: '우케루', meaning: '받다; 수용하다; 수험하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '受(う)けます',             ruby: '우케마스',          meaning: '받습니다' },
        { text: '受(う)けません',           ruby: '우케마셍',          meaning: '받지 않습니다' },
        { text: '受(う)けますか？',         ruby: '우케마스까?',       meaning: '받습니까?' },
        { text: '受(う)けませんか？',       ruby: '우케마셍까?',       meaning: '받지 않습니까?' },
        { text: '受(う)けました',           ruby: '우케마시타',        meaning: '받았습니다' },
        { text: '受(う)けませんでした',     ruby: '우케마셍데시타',    meaning: '받지 않았습니다' },
        { text: '受(う)けましたか？',       ruby: '우케마시타까?',     meaning: '받았습니까?' },
        { text: '受(う)けませんでしたか？', ruby: '우케마셍데시타까?', meaning: '받지 않았습니까?' },
      ],
      casual: [
        { text: '受(う)ける',           ruby: '우케루',        meaning: '받아' },
        { text: '受(う)けない',         ruby: '우케나이',      meaning: '받지 않아' },
        { text: '受(う)ける？',         ruby: '우케루?',       meaning: '받아?' },
        { text: '受(う)けない？',       ruby: '우케나이?',     meaning: '안 받아?' },
        { text: '受(う)けた',           ruby: '우케타',        meaning: '받았어' },
        { text: '受(う)けなかった',     ruby: '우케나캇타',    meaning: '받지 않았어' },
        { text: '受(う)けた？',         ruby: '우케타?',       meaning: '받았어?' },
        { text: '受(う)けなかった？',   ruby: '우케나캇타?',   meaning: '받지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '다음 달 시험을 볼 예정입니다.',
        japanese: '来月(らいげつ)、試験(しけん)を受(う)ける予定(よてい)です。',
        plain:    '来月、試験を受ける予定だ。',
        reading:  '라이게츠, 시켄오 우케루 요테이데스.',
        pattern:  { name: '試験を受ける予定です', meaning: '시험을 볼 예정입니다', note: '受ける는 시험·검사를 받다/보다는 뜻. 予定です는 예정 표현' },
        furigana: 'らいげつしけんをうけるよていです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 12, accent: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '수술을 받게 되었어.',
        japanese: '手術(しゅじゅつ)を受(う)けることになった。',
        plain:    '手術を受けることになった。',
        reading:  '슈쥬츠오 우케루 코토니 낫타.',
        pattern:  { name: '〜ことになった', meaning: '~하게 되었다', note: '외부 요인으로 인한 결정을 나타냄. 자신의 의지보다는 상황에 의해 결정됨' },
        furigana: 'しゅじゅつをうけることになった',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '좋은 조언을 받았어.',
        japanese: 'いいアドバイスを受(う)けた。',
        plain:    'いいアドバイスを受けた。',
        reading:  '이ー 아도바이스오 우케타.',
        pattern:  { name: '〜を受けた', meaning: '~을/를 받았다', note: '受ける는 조언·영향·처리 등 추상적인 것을 받을 때도 사용' },
        furigana: 'いいあどばいすをうけた',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 37위  書く
   * ══════════════════════════════════════════════════ */
  {
    id: 'kaku', rank: 37, verb: '書く', reading: '카쿠', meaning: '쓰다; 그리다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '書(か)きます',             ruby: '카키마스',          meaning: '씁니다' },
        { text: '書(か)きません',           ruby: '카키마셍',          meaning: '쓰지 않습니다' },
        { text: '書(か)きますか？',         ruby: '카키마스까?',       meaning: '씁니까?' },
        { text: '書(か)きませんか？',       ruby: '카키마셍까?',       meaning: '쓰지 않습니까?' },
        { text: '書(か)きました',           ruby: '카키마시타',        meaning: '썼습니다' },
        { text: '書(か)きませんでした',     ruby: '카키마셍데시타',    meaning: '쓰지 않았습니다' },
        { text: '書(か)きましたか？',       ruby: '카키마시타까?',     meaning: '썼습니까?' },
        { text: '書(か)きませんでしたか？', ruby: '카키마셍데시타까?', meaning: '쓰지 않았습니까?' },
      ],
      casual: [
        { text: '書(か)く',           ruby: '카쿠',        meaning: '써' },
        { text: '書(か)かない',       ruby: '카카나이',    meaning: '쓰지 않아' },
        { text: '書(か)く？',         ruby: '카쿠?',       meaning: '쓸 거야?' },
        { text: '書(か)かない？',     ruby: '카카나이?',   meaning: '안 쓸 거야?' },
        { text: '書(か)いた',         ruby: '카이타',      meaning: '썼어' },
        { text: '書(か)かなかった',   ruby: '카카나캇타',  meaning: '쓰지 않았어' },
        { text: '書(か)いた？',       ruby: '카이타?',     meaning: '썼어?' },
        { text: '書(か)かなかった？', ruby: '카카나캇타?', meaning: '쓰지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 일기를 쓰고 있어요.',
        japanese: '毎日(まいにち)日記(にっき)を書(か)いています。',
        plain:    '毎日日記を書いている。',
        reading:  '마이니치 닛키오 카이테이마스.',
        pattern:  { name: '毎日〜を書いています', meaning: '매일 ~을 쓰고 있어요', note: 'ている는 반복적 습관을 나타냄. 일기 쓰기처럼 규칙적 행동에 사용' },
        furigana: 'まいにちにっきをかいています',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '그녀는 편지 쓰는 걸 좋아해.',
        japanese: '彼女(かのじょ)は手紙(てがみ)を書(か)くのが好(す)きだ。',
        plain:    '彼女は手紙を書くのが好きだ。',
        reading:  '카노죠와 테가미오 카쿠노가 스키다.',
        pattern:  { name: '〜を書くのが好きだ', meaning: '~을 쓰는 것을 좋아한다', note: 'のが+好き는 「~하는 것을 좋아하다」는 뜻. の는 동명사화' },
        furigana: 'かのじょはてがみをかくのがすきだ',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '칠판에 답을 써주세요.',
        japanese: '黒板(こくばん)に答(こた)えを書(か)いてください。',
        plain:    '黒板に答えを書いてください。',
        reading:  '코쿠반니 코타에오 카이테 쿠다사이.',
        pattern:  { name: '〜に〜を書いてください', meaning: '~에 ~을 써주세요', note: 'に는 위치 조사. てください는 정중한 요청 표현' },
        furigana: 'こくばんにこたえをかいてください',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 38위  貰う
   * ══════════════════════════════════════════════════ */
  {
    id: 'morau', rank: 38, verb: '貰う', reading: '모라우', meaning: '받다 (내가 받음)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '貰(もら)います',             ruby: '모라이마스',          meaning: '받습니다' },
        { text: '貰(もら)いません',           ruby: '모라이마셍',          meaning: '받지 않습니다' },
        { text: '貰(もら)いますか？',         ruby: '모라이마스까?',       meaning: '받습니까?' },
        { text: '貰(もら)いませんか？',       ruby: '모라이마셍까?',       meaning: '받지 않습니까?' },
        { text: '貰(もら)いました',           ruby: '모라이마시타',        meaning: '받았습니다' },
        { text: '貰(もら)いませんでした',     ruby: '모라이마셍데시타',    meaning: '받지 않았습니다' },
        { text: '貰(もら)いましたか？',       ruby: '모라이마시타까?',     meaning: '받았습니까?' },
        { text: '貰(もら)いませんでしたか？', ruby: '모라이마셍데시타까?', meaning: '받지 않았습니까?' },
      ],
      casual: [
        { text: '貰(もら)う',           ruby: '모라우',        meaning: '받아' },
        { text: '貰(もら)わない',       ruby: '모라와나이',    meaning: '받지 않아' },
        { text: '貰(もら)う？',         ruby: '모라우?',       meaning: '받아?' },
        { text: '貰(もら)わない？',     ruby: '모라와나이?',   meaning: '안 받아?' },
        { text: '貰(もら)った',         ruby: '모랏타',        meaning: '받았어' },
        { text: '貰(もら)わなかった',   ruby: '모라와나캇타',  meaning: '받지 않았어' },
        { text: '貰(もら)った？',       ruby: '모랏타?',       meaning: '받았어?' },
        { text: '貰(もら)わなかった？', ruby: '모라와나캇타?', meaning: '받지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '생일에 선물을 받았어.',
        japanese: '誕生日(たんじょうび)にプレゼントをもらった。',
        plain:    '誕生日にプレゼントをもらった。',
        reading:  '탄죠ー비니 프레젠토오 모랏타.',
        pattern:  { name: '〜にプレゼントをもらった', meaning: '~에 선물을 받았다', note: 'もらう는 자신이 받는 입장. に는 시기나 받는 대상을 나타냄' },
        furigana: 'たんじょうびにぷれぜんとをもらった',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '선생님께 설명해 받았습니다.',
        japanese: '先生(せんせい)に説明(せつめい)してもらいました。',
        plain:    '先生に説明してもらった。',
        reading:  '센세이니 세츠메이시테 모라이마시타.',
        pattern:  { name: '〜に〜してもらう', meaning: '~에게 ~해 받다', note: 'てもらう는 상대방이 나를 위해 해준 것을 나타냄. 감사의 뉘앙스 포함' },
        furigana: 'せんせいにせつめいしてもらいました',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '친구한테 도움 받아서 살았어.',
        japanese: '友達(ともだち)から手伝(てつだ)ってもらって助(たす)かった。',
        plain:    '友達から手伝ってもらって助かった。',
        reading:  '토모다치카라 테츠닷테 모랏테 타스캇타.',
        pattern:  { name: '〜てもらって助かった', meaning: '~해 받아서 살았다/다행이었다', note: '助かった는 도움이 됐다·살았다는 감사와 안도의 표현' },
        furigana: 'ともだちからてつだってもらってたすかった',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 39위  得る
   * ══════════════════════════════════════════════════ */
  {
    id: 'eru', rank: 39, verb: '得る', reading: '에루', meaning: '얻다; ~할 수 있다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '得(え)ます',             ruby: '에마스',          meaning: '얻습니다' },
        { text: '得(え)ません',           ruby: '에마셍',          meaning: '얻지 못합니다' },
        { text: '得(え)ますか？',         ruby: '에마스까?',       meaning: '얻습니까?' },
        { text: '得(え)ませんか？',       ruby: '에마셍까?',       meaning: '얻지 못합니까?' },
        { text: '得(え)ました',           ruby: '에마시타',        meaning: '얻었습니다' },
        { text: '得(え)ませんでした',     ruby: '에마셍데시타',    meaning: '얻지 못했습니다' },
        { text: '得(え)ましたか？',       ruby: '에마시타까?',     meaning: '얻었습니까?' },
        { text: '得(え)ませんでしたか？', ruby: '에마셍데시타까?', meaning: '얻지 못했습니까?' },
      ],
      casual: [
        { text: '得(え)る',           ruby: '에루',        meaning: '얻어' },
        { text: '得(え)ない',         ruby: '에나이',      meaning: '얻지 못해' },
        { text: '得(え)る？',         ruby: '에루?',       meaning: '얻어?' },
        { text: '得(え)ない？',       ruby: '에나이?',     meaning: '얻지 못해?' },
        { text: '得(え)た',           ruby: '에타',        meaning: '얻었어' },
        { text: '得(え)なかった',     ruby: '에나캇타',    meaning: '얻지 못했어' },
        { text: '得(え)た？',         ruby: '에타?',       meaning: '얻었어?' },
        { text: '得(え)なかった？',   ruby: '에나캇타?',   meaning: '얻지 못했어?' },
      ],
    },
    examples: [
      {
        korean:   '경험에서 많은 것을 얻을 수 있어.',
        japanese: '経験(けいけん)から多(おお)くを得(え)ることができる。',
        plain:    '経験から多くを得ることができる。',
        reading:  '케이켄카라 오ー쿠오 에루 코토가 데키루.',
        pattern:  { name: '〜から〜を得ることができる', meaning: '~에서 ~을 얻을 수 있다', note: '得ることができる는 가능 표현. 추상적인 것을 얻는 데 자주 쓰임' },
        furigana: 'けいけんからおおくをえることができる',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '신뢰를 얻으려면 시간이 걸려.',
        japanese: '信頼(しんらい)を得(え)るには時間(じかん)がかかる。',
        plain:    '信頼を得るには時間がかかる。',
        reading:  '신라이오 에루니와 지칸가 카카루.',
        pattern:  { name: '〜を得るには〜がかかる', meaning: '~을 얻으려면 ~이/가 걸리다', note: 'には는 조건·필요 조건을 나타냄. かかる는 시간·비용이 필요하다는 뜻' },
        furigana: 'しんらいをえるにはじかんがかかる',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '있을 수 없는 일이 일어났어.',
        japanese: 'あり得(え)ないことが起(お)きた。',
        plain:    'あり得ないことが起きた。',
        reading:  '아리에나이 코토가 오키타.',
        pattern:  { name: 'あり得ない', meaning: '있을 수 없다; 말도 안 된다', note: 'あり得る의 부정형. 강한 부정·놀라움을 표현하는 관용구' },
        furigana: 'ありえないことがおきた',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 40위  掛ける
   * ══════════════════════════════════════════════════ */
  {
    id: 'kakeru', rank: 40, verb: '掛ける', reading: '카케루', meaning: '걸다; 곱하다; (전화) 걸다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '掛(か)けます',             ruby: '카케마스',          meaning: '겁니다' },
        { text: '掛(か)けません',           ruby: '카케마셍',          meaning: '걸지 않습니다' },
        { text: '掛(か)けますか？',         ruby: '카케마스까?',       meaning: '겁니까?' },
        { text: '掛(か)けませんか？',       ruby: '카케마셍까?',       meaning: '걸지 않습니까?' },
        { text: '掛(か)けました',           ruby: '카케마시타',        meaning: '걸었습니다' },
        { text: '掛(か)けませんでした',     ruby: '카케마셍데시타',    meaning: '걸지 않았습니다' },
        { text: '掛(か)けましたか？',       ruby: '카케마시타까?',     meaning: '걸었습니까?' },
        { text: '掛(か)けませんでしたか？', ruby: '카케마셍데시타까?', meaning: '걸지 않았습니까?' },
      ],
      casual: [
        { text: '掛(か)ける',           ruby: '카케루',        meaning: '걸어' },
        { text: '掛(か)けない',         ruby: '카케나이',      meaning: '걸지 않아' },
        { text: '掛(か)ける？',         ruby: '카케루?',       meaning: '걸어?' },
        { text: '掛(か)けない？',       ruby: '카케나이?',     meaning: '안 걸어?' },
        { text: '掛(か)けた',           ruby: '카케타',        meaning: '걸었어' },
        { text: '掛(か)けなかった',     ruby: '카케나캇타',    meaning: '걸지 않았어' },
        { text: '掛(か)けた？',         ruby: '카케타?',       meaning: '걸었어?' },
        { text: '掛(か)けなかった？',   ruby: '카케나캇타?',   meaning: '걸지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '전화했는데 안 받더라.',
        japanese: '電話(でんわ)をかけたが出(で)なかった。',
        plain:    '電話をかけたが出なかった。',
        reading:  '덴와오 카케타가 데나캇타.',
        pattern:  { name: '電話をかけたが出なかった', meaning: '전화했는데 안 받더라', note: '電話をかける는 전화를 걸다. が는 역접. 出る는 전화를 받다는 뜻' },
        furigana: 'でんわをかけたがでなかった',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '벽에 그림을 걸었어.',
        japanese: '壁(かべ)に絵(え)を掛(か)けた。',
        plain:    '壁に絵を掛けた。',
        reading:  '카베니 에오 카케타.',
        pattern:  { name: '〜に絵を掛ける', meaning: '~에 그림을 걸다', note: '掛ける는 벽에 물건을 걸 때 사용. に는 위치 조사' },
        furigana: 'かべにえをかけた',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '폐를 끼쳐버려서 죄송합니다.',
        japanese: '迷惑(めいわく)をかけてしまってすみません。',
        plain:    '迷惑をかけてしまってすみません。',
        reading:  '메이와쿠오 카케테 시맛테 스미마셍.',
        pattern:  { name: '迷惑をかけてしまってすみません', meaning: '폐를 끼쳐버려서 죄송합니다', note: '迷惑をかける는 폐를 끼치다는 관용 표현. てしまって+すみません은 사과 표현' },
        furigana: 'めいわくをかけてしまってすみません',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 41위  知れる
   * ══════════════════════════════════════════════════ */
  {
    id: 'shireru', rank: 41, verb: '知れる', reading: '시레루', meaning: '알려지다; ~일지도 모르다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '知(し)れます', ruby: '시레마스', meaning: '알려집니다' },
        { text: '知(し)れません', ruby: '시레마셍', meaning: '알려지지 않습니다' },
        { text: '知(し)れますか？', ruby: '시레마스까?', meaning: '알려집니까?' },
        { text: '知(し)れませんか？', ruby: '시레마셍까?', meaning: '알려지지 않습니까?' },
        { text: '知(し)れました', ruby: '시레마시타', meaning: '알려졌습니다' },
        { text: '知(し)れませんでした', ruby: '시레마셍데시타', meaning: '알려지지 않았습니다' },
        { text: '知(し)れましたか？', ruby: '시레마시타까?', meaning: '알려졌습니까?' },
        { text: '知(し)れませんでしたか？', ruby: '시레마셍데시타까?', meaning: '알려지지 않았습니까?' },
      ],
      casual: [
        { text: '知(し)れる', ruby: '시레루', meaning: '알려져' },
        { text: '知(し)れない', ruby: '시레나이', meaning: '알려지지 않아' },
        { text: '知(し)れる？', ruby: '시레루?', meaning: '알려져?' },
        { text: '知(し)れない？', ruby: '시레나이?', meaning: '안 알려져?' },
        { text: '知(し)れた', ruby: '시레타', meaning: '알려졌어' },
        { text: '知(し)れなかった', ruby: '시레나캇타', meaning: '알려지지 않았어' },
        { text: '知(し)れた？', ruby: '시레타?', meaning: '알려졌어?' },
        { text: '知(し)れなかった？', ruby: '시레나캇타?', meaning: '알려지지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그의 이름은 이제 전 세계에 알려져 있다.',
        japanese: '彼(かれ)の名前(なまえ)は今(いま)や世界中(せかいじゅう)に知(し)れ渡(わた)っている。',
        plain:    '彼の名前は今や世界中に知れ渡っている。',
        reading:  '카레노 나마에와 이마야 세카이쥬-니 시레와탓테이루.',
        pattern:  { name: '〜に知れ渡る', meaning: '~에 널리 알려지다', note: '知れ渡る는 知れる+渡る 복합동사로 널리 알려지다는 뜻. 今や는 이제는' },
        furigana: 'かれのなまえはいまやせかいじゅうにしれわたっている',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 0, 0] },
          { phrase_id: 4, mora_count: 6, accent: [0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '어떻게 될지 모르지만 열심히 할 수밖에 없어.',
        japanese: 'どうなるか知(し)れないけど頑張(がんば)るしかない。',
        plain:    'どうなるか知れないけど頑張るしかない。',
        reading:  '도-나루카 시레나이케도 감바루시카나이.',
        pattern:  { name: '〜か知れない', meaning: '~일지 모른다', note: 'か知れない는 불확실함을 나타내는 표현. しかない는 ~할 수밖에 없다' },
        furigana: 'どうなるかしれないけどがんばるしかない',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 8, accent: [1, 0, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '소문이 퍼져서 이름이 알려지기 시작했다.',
        japanese: '噂(うわさ)が広(ひろ)まって名前(なまえ)が知(し)れてきた。',
        plain:    '噂が広まって名前が知れてきた。',
        reading:  '우와사가 히로맛테 나마에가 시레테키타.',
        pattern:  { name: '〜てきた', meaning: '~해 오기 시작했다', note: 'てくる는 변화가 시작되어 진행됨을 나타냄. 広まる는 퍼지다' },
        furigana: 'うわさがひろまってなまえがしれてきた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 42위  入れる
   * ══════════════════════════════════════════════════ */
  {
    id: 'ireru', rank: 42, verb: '入れる', reading: '이레루', meaning: '넣다; 집어넣다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '入(い)れます', ruby: '이레마스', meaning: '넣습니다' },
        { text: '入(い)れません', ruby: '이레마셍', meaning: '넣지 않습니다' },
        { text: '入(い)れますか？', ruby: '이레마스까?', meaning: '넣습니까?' },
        { text: '入(い)れませんか？', ruby: '이레마셍까?', meaning: '넣지 않습니까?' },
        { text: '入(い)れました', ruby: '이레마시타', meaning: '넣었습니다' },
        { text: '入(い)れませんでした', ruby: '이레마셍데시타', meaning: '넣지 않았습니다' },
        { text: '入(い)れましたか？', ruby: '이레마시타까?', meaning: '넣었습니까?' },
        { text: '入(い)れませんでしたか？', ruby: '이레마셍데시타까?', meaning: '넣지 않았습니까?' },
      ],
      casual: [
        { text: '入(い)れる', ruby: '이레루', meaning: '넣어' },
        { text: '入(い)れない', ruby: '이레나이', meaning: '넣지 않아' },
        { text: '入(い)れる？', ruby: '이레루?', meaning: '넣어?' },
        { text: '入(い)れない？', ruby: '이레나이?', meaning: '안 넣어?' },
        { text: '入(い)れた', ruby: '이레타', meaning: '넣었어' },
        { text: '入(い)れなかった', ruby: '이레나캇타', meaning: '넣지 않았어' },
        { text: '入(い)れた？', ruby: '이레타?', meaning: '넣었어?' },
        { text: '入(い)れなかった？', ruby: '이레나캇타?', meaning: '넣지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '가방에 지갑을 넣었어.',
        japanese: 'バッグに財布(さいふ)を入(い)れた。',
        plain:    'バッグに財布を入れた。',
        reading:  '박구니 사이후오 이레타.',
        pattern:  { name: '〜に〜を入れる', meaning: '~에 ~을 넣다', note: 'に는 넣는 장소, を는 넣는 대상을 나타냄' },
        furigana: 'ばっぐにさいふをいれた',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '커피에 설탕을 넣으시겠어요?',
        japanese: 'コーヒーに砂糖(さとう)を入(い)れますか？',
        plain:    'コーヒーに砂糖を入れますか？',
        reading:  '코-히-니 사토-오 이레마스까?',
        pattern:  { name: '〜ますか？', meaning: '~하시겠습니까?', note: '상대의 의향을 묻는 정중한 질문 표현' },
        furigana: 'こーひーにさとうをいれますか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '세탁기에 빨래를 넣어 주세요.',
        japanese: '洗濯機(せんたくき)に洗濯物(せんたくもの)を入(い)れてください。',
        plain:    '洗濯機に洗濯物を入れてください。',
        reading:  '센타쿠키니 센타쿠모노오 이레테쿠다사이.',
        pattern:  { name: '〜てください', meaning: '~해 주세요', note: 'て형+ください는 정중한 의뢰 표현' },
        furigana: 'せんたくきにせんたくものをいれてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 43위  関する
   * ══════════════════════════════════════════════════ */
  {
    id: 'kansuru', rank: 43, verb: '関する', reading: '캉스루', meaning: '관련되다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '関(かん)します', ruby: '칸시마스', meaning: '관련됩니다' },
        { text: '関(かん)しません', ruby: '칸시마셍', meaning: '관련되지 않습니다' },
        { text: '関(かん)しますか？', ruby: '칸시마스까?', meaning: '관련됩니까?' },
        { text: '関(かん)しませんか？', ruby: '칸시마셍까?', meaning: '관련되지 않습니까?' },
        { text: '関(かん)しました', ruby: '칸시마시타', meaning: '관련되었습니다' },
        { text: '関(かん)しませんでした', ruby: '칸시마셍데시타', meaning: '관련되지 않았습니다' },
        { text: '関(かん)しましたか？', ruby: '칸시마시타까?', meaning: '관련되었습니까?' },
        { text: '関(かん)しませんでしたか？', ruby: '칸시마셍데시타까?', meaning: '관련되지 않았습니까?' },
      ],
      casual: [
        { text: '関(かん)する', ruby: '칸스루', meaning: '관련돼' },
        { text: '関(かん)しない', ruby: '칸시나이', meaning: '관련되지 않아' },
        { text: '関(かん)する？', ruby: '칸스루?', meaning: '관련돼?' },
        { text: '関(かん)しない？', ruby: '칸시나이?', meaning: '관련 안 돼?' },
        { text: '関(かん)した', ruby: '칸시타', meaning: '관련됐어' },
        { text: '関(かん)しなかった', ruby: '칸시나캇타', meaning: '관련되지 않았어' },
        { text: '関(かん)した？', ruby: '칸시타?', meaning: '관련됐어?' },
        { text: '関(かん)しなかった？', ruby: '칸시나캇타?', meaning: '관련되지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '환경에 관한 문제를 논의했다.',
        japanese: '環境(かんきょう)に関(かん)する問題(もんだい)を議論(ぎろん)した。',
        plain:    '環境に関する問題を議論した。',
        reading:  '캉쿄-니 칸스루 몬다이오 기론시타.',
        pattern:  { name: '〜に関する＋명사', meaning: '~에 관한', note: 'に関する는 명사를 수식하는 형태로 ~에 관한이라는 뜻' },
        furigana: 'かんきょうにかんするもんだいをぎろんした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        korean:   '건강에 관한 정보를 알아보고 있어요.',
        japanese: '健康(けんこう)に関(かん)する情報(じょうほう)を調(しら)べています。',
        plain:    '健康に関する情報を調べています。',
        reading:  '켕코-니 칸스루 죠-호-오 시라베테이마스.',
        pattern:  { name: '〜ています', meaning: '~하고 있습니다', note: 'て형+います는 현재 진행을 나타냄. 調べる는 조사하다' },
        furigana: 'けんこうにかんするじょうほうをしらべています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 0, 0, 1, 1] },
        ],
      },
      {
        korean:   '이 건에 관한 의견을 들려주세요.',
        japanese: 'この件(けん)に関(かん)するご意見(いけん)をお聞(き)かせください。',
        plain:    'この件に関するご意見をお聞かせください。',
        reading:  '코노 켄니 칸스루 고이켄오 오키카세쿠다사이.',
        pattern:  { name: 'お〜ください', meaning: '~해 주십시오 (존경)', note: 'お+동사 ます형+ください는 존경 의뢰 표현. ご意見은 의견의 높임말' },
        furigana: 'このけんにかんするごいけんをおきかせください',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          { phrase_id: 4, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 44위  上げる
   * ══════════════════════════════════════════════════ */
  {
    id: 'ageru', rank: 44, verb: '上げる', reading: '아게루', meaning: '올리다; (아랫사람에게) 주다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '上(あ)げます', ruby: '아게마스', meaning: '올립니다' },
        { text: '上(あ)げません', ruby: '아게마셍', meaning: '올리지 않습니다' },
        { text: '上(あ)げますか？', ruby: '아게마스까?', meaning: '올립니까?' },
        { text: '上(あ)げませんか？', ruby: '아게마셍까?', meaning: '올리지 않습니까?' },
        { text: '上(あ)げました', ruby: '아게마시타', meaning: '올렸습니다' },
        { text: '上(あ)げませんでした', ruby: '아게마셍데시타', meaning: '올리지 않았습니다' },
        { text: '上(あ)げましたか？', ruby: '아게마시타까?', meaning: '올렸습니까?' },
        { text: '上(あ)げませんでしたか？', ruby: '아게마셍데시타까?', meaning: '올리지 않았습니까?' },
      ],
      casual: [
        { text: '上(あ)げる', ruby: '아게루', meaning: '올려' },
        { text: '上(あ)げない', ruby: '아게나이', meaning: '올리지 않아' },
        { text: '上(あ)げる？', ruby: '아게루?', meaning: '올려?' },
        { text: '上(あ)げない？', ruby: '아게나이?', meaning: '안 올려?' },
        { text: '上(あ)げた', ruby: '아게타', meaning: '올렸어' },
        { text: '上(あ)げなかった', ruby: '아게나캇타', meaning: '올리지 않았어' },
        { text: '上(あ)げた？', ruby: '아게타?', meaning: '올렸어?' },
        { text: '上(あ)げなかった？', ruby: '아게나캇타?', meaning: '올리지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '소리 내서 웃었다.',
        japanese: '声(こえ)を上(あ)げて笑(わら)った。',
        plain:    '声を上げて笑った。',
        reading:  '코에오 아게테 와랏타.',
        pattern:  { name: '声を上げる', meaning: '소리를 내다', note: '声を上げる는 소리를 높이다, 소리 내다는 관용 표현. て형으로 연결' },
        furigana: 'こえをあげてわらった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '품질을 올리려는 노력을 하고 있습니다.',
        japanese: '品質(ひんしつ)を上(あ)げる努力(どりょく)をしています。',
        plain:    '品質を上げる努力をしています。',
        reading:  '힌시츠오 아게루 도료쿠오 시테이마스.',
        pattern:  { name: '〜を上げる', meaning: '~을 올리다/높이다', note: '수준이나 정도를 높일 때 上げる를 사용. 동사 기본형이 명사를 수식' },
        furigana: 'ひんしつをあげるどりょくをしています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '손을 들어 주세요.',
        japanese: '手(て)を上(あ)げてください。',
        plain:    '手を上げてください。',
        reading:  '테오 아게테쿠다사이.',
        pattern:  { name: '手を上げる', meaning: '손을 들다', note: '手を上げる는 손을 들다는 뜻. てください로 정중한 의뢰' },
        furigana: 'てをあげてください',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 45위  見える
   * ══════════════════════════════════════════════════ */
  {
    id: 'mieru', rank: 45, verb: '見える', reading: '미에루', meaning: '보이다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '見(み)えます', ruby: '미에마스', meaning: '보입니다' },
        { text: '見(み)えません', ruby: '미에마셍', meaning: '보이지 않습니다' },
        { text: '見(み)えますか？', ruby: '미에마스까?', meaning: '보입니까?' },
        { text: '見(み)えませんか？', ruby: '미에마셍까?', meaning: '보이지 않습니까?' },
        { text: '見(み)えました', ruby: '미에마시타', meaning: '보였습니다' },
        { text: '見(み)えませんでした', ruby: '미에마셍데시타', meaning: '보이지 않았습니다' },
        { text: '見(み)えましたか？', ruby: '미에마시타까?', meaning: '보였습니까?' },
        { text: '見(み)えませんでしたか？', ruby: '미에마셍데시타까?', meaning: '보이지 않았습니까?' },
      ],
      casual: [
        { text: '見(み)える', ruby: '미에루', meaning: '보여' },
        { text: '見(み)えない', ruby: '미에나이', meaning: '보이지 않아' },
        { text: '見(み)える？', ruby: '미에루?', meaning: '보여?' },
        { text: '見(み)えない？', ruby: '미에나이?', meaning: '안 보여?' },
        { text: '見(み)えた', ruby: '미에타', meaning: '보였어' },
        { text: '見(み)えなかった', ruby: '미에나캇타', meaning: '보이지 않았어' },
        { text: '見(み)えた？', ruby: '미에타?', meaning: '보였어?' },
        { text: '見(み)えなかった？', ruby: '미에나캇타?', meaning: '보이지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '창문에서 산이 보여.',
        japanese: '窓(まど)から山(やま)が見(み)える。',
        plain:    '窓から山が見える。',
        reading:  '마도카라 야마가 미에루.',
        pattern:  { name: '〜から〜が見える', meaning: '~에서 ~이 보이다', note: '見える는 자연히 눈에 들어오는 자발 동사. から는 출발점/기준점' },
        furigana: 'まどからやまがみえる',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '멀리 바다가 보입니다.',
        japanese: '遠(とお)くに海(うみ)が見(み)えます。',
        plain:    '遠くに海が見えます。',
        reading:  '토-쿠니 우미가 미에마스.',
        pattern:  { name: '遠くに〜が見える', meaning: '멀리 ~이 보이다', note: '遠く는 遠い의 명사형으로 먼 곳. に는 위치를 나타냄' },
        furigana: 'とおくにうみがみえます',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그녀는 어려 보여요.',
        japanese: '彼女(かのじょ)は若(わか)く見(み)えます。',
        plain:    '彼女は若く見えます。',
        reading:  '카노죠와 와카쿠 미에마스.',
        pattern:  { name: '〜く見える', meaning: '~하게 보이다', note: 'い형용사의 く형+見える로 ~해 보인다는 인상을 표현' },
        furigana: 'かのじょはわかくみえます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 46위  頂く
   * ══════════════════════════════════════════════════ */
  {
    id: 'itadaku', rank: 46, verb: '頂く', reading: '이타다쿠', meaning: '받다; 먹다 (겸양)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '頂(いただ)きます', ruby: '이타다키마스', meaning: '받습니다 (겸양)' },
        { text: '頂(いただ)きません', ruby: '이타다키마셍', meaning: '받지 않습니다' },
        { text: '頂(いただ)きますか？', ruby: '이타다키마스까?', meaning: '받습니까?' },
        { text: '頂(いただ)きませんか？', ruby: '이타다키마셍까?', meaning: '받지 않습니까?' },
        { text: '頂(いただ)きました', ruby: '이타다키마시타', meaning: '받았습니다' },
        { text: '頂(いただ)きませんでした', ruby: '이타다키마셍데시타', meaning: '받지 않았습니다' },
        { text: '頂(いただ)きましたか？', ruby: '이타다키마시타까?', meaning: '받았습니까?' },
        { text: '頂(いただ)きませんでしたか？', ruby: '이타다키마셍데시타까?', meaning: '받지 않았습니까?' },
      ],
      casual: [
        { text: '頂(いただ)く', ruby: '이타다쿠', meaning: '받아 (겸양)' },
        { text: '頂(いただ)かない', ruby: '이타다카나이', meaning: '받지 않아' },
        { text: '頂(いただ)く？', ruby: '이타다쿠?', meaning: '받아?' },
        { text: '頂(いただ)かない？', ruby: '이타다카나이?', meaning: '안 받아?' },
        { text: '頂(いただ)いた', ruby: '이타다이타', meaning: '받았어' },
        { text: '頂(いただ)かなかった', ruby: '이타다카나캇타', meaning: '받지 않았어' },
        { text: '頂(いただ)いた？', ruby: '이타다이타?', meaning: '받았어?' },
        { text: '頂(いただ)かなかった？', ruby: '이타다카나캇타?', meaning: '받지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선물을 주셔서 감사합니다.',
        japanese: 'お土産(みやげ)を頂(いただ)いてありがとうございます。',
        plain:    'お土産を頂いてありがとうございます。',
        reading:  '오미야게오 이타다이테 아리가토-고자이마스.',
        pattern:  { name: '〜を頂く', meaning: '~을 받다 (겸양)', note: '頂く는 もらう의 겸양어. お土産는 선물/기념품' },
        furigana: 'おみやげをいただいてありがとうございます',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 11, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '여기서 잠시 기다려 주시겠습니까?',
        japanese: 'こちらで少々(しょうしょう)お待(ま)ち頂(いただ)けますか？',
        plain:    'こちらで少々お待ち頂けますか？',
        reading:  '코치라데 쇼-쇼- 오마치 이타다케마스까?',
        pattern:  { name: 'お〜頂けますか', meaning: '~해 주실 수 있습니까?', note: 'お+ます형+頂けますか는 매우 정중한 의뢰 표현. 少々는 잠시' },
        furigana: 'こちらでしょうしょうおまちいただけますか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그럼, 잘 먹겠습니다.',
        japanese: 'では、頂(いただ)きます。',
        plain:    'では、頂きます。',
        reading:  '데와, 이타다키마스.',
        pattern:  { name: '頂きます', meaning: '잘 먹겠습니다', note: '식사 전 인사말. 음식을 받는다는 겸양 표현에서 유래' },
        furigana: 'では、いただきます',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 47위  掛かる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kakaru', rank: 47, verb: '掛かる', reading: '카카루', meaning: '걸리다; (시간·돈이) 들다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '掛(か)かります', ruby: '카카리마스', meaning: '걸립니다' },
        { text: '掛(か)かりません', ruby: '카카리마셍', meaning: '걸리지 않습니다' },
        { text: '掛(か)かりますか？', ruby: '카카리마스까?', meaning: '걸립니까?' },
        { text: '掛(か)かりませんか？', ruby: '카카리마셍까?', meaning: '걸리지 않습니까?' },
        { text: '掛(か)かりました', ruby: '카카리마시타', meaning: '걸렸습니다' },
        { text: '掛(か)かりませんでした', ruby: '카카리마셍데시타', meaning: '걸리지 않았습니다' },
        { text: '掛(か)かりましたか？', ruby: '카카리마시타까?', meaning: '걸렸습니까?' },
        { text: '掛(か)かりませんでしたか？', ruby: '카카리마셍데시타까?', meaning: '걸리지 않았습니까?' },
      ],
      casual: [
        { text: '掛(か)かる', ruby: '카카루', meaning: '걸려' },
        { text: '掛(か)からない', ruby: '카카라나이', meaning: '걸리지 않아' },
        { text: '掛(か)かる？', ruby: '카카루?', meaning: '걸려?' },
        { text: '掛(か)からない？', ruby: '카카라나이?', meaning: '안 걸려?' },
        { text: '掛(か)かった', ruby: '카캇타', meaning: '걸렸어' },
        { text: '掛(か)からなかった', ruby: '카카라나캇타', meaning: '걸리지 않았어' },
        { text: '掛(か)かった？', ruby: '카캇타?', meaning: '걸렸어?' },
        { text: '掛(か)からなかった？', ruby: '카카라나캇타?', meaning: '걸리지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '전화가 걸려 왔습니다.',
        japanese: '電話(でんわ)が掛(か)かってきました。',
        plain:    '電話が掛かってきました。',
        reading:  '덴와가 카캇테키마시타.',
        pattern:  { name: '電話が掛かってくる', meaning: '전화가 걸려 오다', note: '掛かる는 자동사. てくる는 화자 쪽으로의 방향을 나타냄' },
        furigana: 'でんわがかかってきました',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 일에는 사흘 걸립니다.',
        japanese: 'この仕事(しごと)には三日(みっか)かかります。',
        plain:    'この仕事には三日かかります。',
        reading:  '코노 시고토니와 믹카 카카리마스.',
        pattern:  { name: '〜にはかかる', meaning: '~에는 (시간이) 걸리다', note: '시간이나 비용이 드는 것을 かかる로 표현. 三日는 사흘' },
        furigana: 'このしごとにはみっかかかります',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
      {
        korean:   '벽에 그림이 걸려 있습니다.',
        japanese: '壁(かべ)に絵(え)が掛(か)かっています。',
        plain:    '壁に絵が掛かっています。',
        reading:  '카베니 에가 카캇테이마스.',
        pattern:  { name: '〜ています (상태)', meaning: '~해 있습니다 (결과 상태)', note: '자동사+ています는 동작 결과가 지속되는 상태를 나타냄' },
        furigana: 'かべにえがかかっています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 1, accent: [0] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 48위  食べる
   * ══════════════════════════════════════════════════ */
  {
    id: 'taberu', rank: 48, verb: '食べる', reading: '타베루', meaning: '먹다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '食(た)べます', ruby: '타베마스', meaning: '먹습니다' },
        { text: '食(た)べません', ruby: '타베마셍', meaning: '먹지 않습니다' },
        { text: '食(た)べますか？', ruby: '타베마스까?', meaning: '먹습니까?' },
        { text: '食(た)べませんか？', ruby: '타베마셍까?', meaning: '먹지 않습니까?' },
        { text: '食(た)べました', ruby: '타베마시타', meaning: '먹었습니다' },
        { text: '食(た)べませんでした', ruby: '타베마셍데시타', meaning: '먹지 않았습니다' },
        { text: '食(た)べましたか？', ruby: '타베마시타까?', meaning: '먹었습니까?' },
        { text: '食(た)べませんでしたか？', ruby: '타베마셍데시타까?', meaning: '먹지 않았습니까?' },
      ],
      casual: [
        { text: '食(た)べる', ruby: '타베루', meaning: '먹어' },
        { text: '食(た)べない', ruby: '타베나이', meaning: '먹지 않아' },
        { text: '食(た)べる？', ruby: '타베루?', meaning: '먹어?' },
        { text: '食(た)べない？', ruby: '타베나이?', meaning: '안 먹어?' },
        { text: '食(た)べた', ruby: '타베타', meaning: '먹었어' },
        { text: '食(た)べなかった', ruby: '타베나캇타', meaning: '먹지 않았어' },
        { text: '食(た)べた？', ruby: '타베타?', meaning: '먹었어?' },
        { text: '食(た)べなかった？', ruby: '타베나캇타?', meaning: '먹지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '아침밥 먹었어요?',
        japanese: '朝(あさ)ごはんを食(た)べましたか？',
        plain:    '朝ごはんを食べましたか？',
        reading:  '아사고항오 타베마시타까?',
        pattern:  { name: '〜ましたか？', meaning: '~했습니까?', note: '과거 정중형 질문. 朝ごはん은 아침밥' },
        furigana: 'あさごはんをたべましたか',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 1, accent: [0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 0] },
        ],
      },
      {
        korean:   '채소를 많이 먹으면 건강에 좋아.',
        japanese: '野菜(やさい)をたくさん食(た)べると健康(けんこう)にいい。',
        plain:    '野菜をたくさん食べると健康にいい。',
        reading:  '야사이오 타쿠상 타베루토 켕코-니 이이.',
        pattern:  { name: '〜と〜にいい', meaning: '~하면 ~에 좋다', note: 'と는 일반적 조건을 나타냄. 〜にいい는 ~에 좋다' },
        furigana: 'やさいをたくさんたべるとけんこうにいい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '같이 저녁 먹어요.',
        japanese: '一緒(いっしょ)に夕食(ゆうしょく)を食(た)べましょう。',
        plain:    '一緒に夕食を食べましょう。',
        reading:  '잇쇼니 유-쇼쿠오 타베마쇼-.',
        pattern:  { name: '〜ましょう', meaning: '~합시다', note: 'ましょう는 권유 표현. 一緒に는 함께' },
        furigana: 'いっしょにゆうしょくをたべましょう',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 49위  教える
   * ══════════════════════════════════════════════════ */
  {
    id: 'oshieru', rank: 49, verb: '教える', reading: '오시에루', meaning: '가르치다; 알려주다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '教(おし)えます', ruby: '오시에마스', meaning: '가르칩니다' },
        { text: '教(おし)えません', ruby: '오시에마셍', meaning: '가르치지 않습니다' },
        { text: '教(おし)えますか？', ruby: '오시에마스까?', meaning: '가르칩니까?' },
        { text: '教(おし)えませんか？', ruby: '오시에마셍까?', meaning: '가르치지 않습니까?' },
        { text: '教(おし)えました', ruby: '오시에마시타', meaning: '가르쳤습니다' },
        { text: '教(おし)えませんでした', ruby: '오시에마셍데시타', meaning: '가르치지 않았습니다' },
        { text: '教(おし)えましたか？', ruby: '오시에마시타까?', meaning: '가르쳤습니까?' },
        { text: '教(おし)えませんでしたか？', ruby: '오시에마셍데시타까?', meaning: '가르치지 않았습니까?' },
      ],
      casual: [
        { text: '教(おし)える', ruby: '오시에루', meaning: '가르쳐' },
        { text: '教(おし)えない', ruby: '오시에나이', meaning: '가르치지 않아' },
        { text: '教(おし)える？', ruby: '오시에루?', meaning: '가르쳐?' },
        { text: '教(おし)えない？', ruby: '오시에나이?', meaning: '안 가르쳐?' },
        { text: '教(おし)えた', ruby: '오시에타', meaning: '가르쳤어' },
        { text: '教(おし)えなかった', ruby: '오시에나캇타', meaning: '가르치지 않았어' },
        { text: '教(おし)えた？', ruby: '오시에타?', meaning: '가르쳤어?' },
        { text: '教(おし)えなかった？', ruby: '오시에나캇타?', meaning: '가르치지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '길을 알려 주시겠어요?',
        japanese: '道(みち)を教(おし)えてもらえますか？',
        plain:    '道を教えてもらえますか？',
        reading:  '미치오 오시에테 모라에마스까?',
        pattern:  { name: '〜てもらえますか', meaning: '~해 줄 수 있나요?', note: 'てもらえますか는 부탁 표현. 教える는 알려주다는 뜻으로도 쓰임' },
        furigana: 'みちをおしえてもらえますか',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '선생님이 수학을 가르치고 있습니다.',
        japanese: '先生(せんせい)が数学(すうがく)を教(おし)えています。',
        plain:    '先生が数学を教えています。',
        reading:  '센세-가 스-가쿠오 오시에테이마스.',
        pattern:  { name: '〜を教えている', meaning: '~을 가르치고 있다', note: 'ています는 직업적·반복적 행위에도 사용됨' },
        furigana: 'せんせいがすうがくをおしえています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 1, accent: [0] },
          { phrase_id: 3, mora_count: 5, accent: [1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '사용법을 알려 주세요.',
        japanese: '使(つか)い方(かた)を教(おし)えてください。',
        plain:    '使い方を教えてください。',
        reading:  '츠카이카타오 오시에테쿠다사이.',
        pattern:  { name: '〜方を教える', meaning: '~하는 법을 알려주다', note: 'ます형+方는 ~하는 방법. 使い方는 사용법' },
        furigana: 'つかいかたをおしえてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 50위  違う
   * ══════════════════════════════════════════════════ */
  {
    id: 'chigau', rank: 50, verb: '違う', reading: '치가우', meaning: '다르다; 틀리다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '違(ちが)います', ruby: '치가이마스', meaning: '다릅니다' },
        { text: '違(ちが)いません', ruby: '치가이마셍', meaning: '다르지 않습니다' },
        { text: '違(ちが)いますか？', ruby: '치가이마스까?', meaning: '다릅니까?' },
        { text: '違(ちが)いませんか？', ruby: '치가이마셍까?', meaning: '다르지 않습니까?' },
        { text: '違(ちが)いました', ruby: '치가이마시타', meaning: '달랐습니다' },
        { text: '違(ちが)いませんでした', ruby: '치가이마셍데시타', meaning: '다르지 않았습니다' },
        { text: '違(ちが)いましたか？', ruby: '치가이마시타까?', meaning: '달랐습니까?' },
        { text: '違(ちが)いませんでしたか？', ruby: '치가이마셍데시타까?', meaning: '다르지 않았습니까?' },
      ],
      casual: [
        { text: '違(ちが)う', ruby: '치가우', meaning: '달라' },
        { text: '違(ちが)わない', ruby: '치가와나이', meaning: '다르지 않아' },
        { text: '違(ちが)う？', ruby: '치가우?', meaning: '달라?' },
        { text: '違(ちが)わない？', ruby: '치가와나이?', meaning: '다르지 않아?' },
        { text: '違(ちが)った', ruby: '치갓타', meaning: '달랐어' },
        { text: '違(ちが)わなかった', ruby: '치가와나캇타', meaning: '다르지 않았어' },
        { text: '違(ちが)った？', ruby: '치갓타?', meaning: '달랐어?' },
        { text: '違(ちが)わなかった？', ruby: '치가와나캇타?', meaning: '다르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그건 아니에요.',
        japanese: 'それは違(ちが)います。',
        plain:    'それは違います。',
        reading:  '소레와 치가이마스.',
        pattern:  { name: '〜は違います', meaning: '~은 아닙니다/다릅니다', note: '違います는 부정·정정할 때 자주 쓰는 표현' },
        furigana: 'それはちがいます',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '사고방식이 다른 두 사람이 친해졌다.',
        japanese: '考(かんが)え方(かた)が違(ちが)う二人(ふたり)が仲良(なかよ)くなった。',
        plain:    '考え方が違う二人が仲良くなった。',
        reading:  '캉가에카타가 치가우 후타리가 나카요쿠낫타.',
        pattern:  { name: '〜が違う＋명사', meaning: '~이 다른 (명사)', note: '동사 기본형이 명사를 수식. 仲良くなる는 친해지다' },
        furigana: 'かんがえかたがちがうふたりがなかよくなった',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '제 의견과는 조금 달라요.',
        japanese: '私(わたし)の意見(いけん)とは少(すこ)し違(ちが)います。',
        plain:    '私の意見とは少し違います。',
        reading:  '와타시노 이켄토와 스코시 치가이마스.',
        pattern:  { name: '〜とは違う', meaning: '~과는 다르다', note: 'とは는 비교 대상을 강조. 少し는 조금' },
        furigana: 'わたしのいけんとはすこしちがいます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 51위  始める
   * ══════════════════════════════════════════════════ */
  {
    id: 'hajimeru', rank: 51, verb: '始める', reading: '하지메루', meaning: '시작하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '始(はじ)ます', ruby: '하지마스', meaning: '시작합니다' },
        { text: '始(はじ)ません', ruby: '하지마셍', meaning: '시작하지 않습니다' },
        { text: '始(はじ)ますか？', ruby: '하지마스까?', meaning: '시작합니까?' },
        { text: '始(はじ)ませんか？', ruby: '하지마셍까?', meaning: '시작하지 않습니까?' },
        { text: '始(はじ)ました', ruby: '하지마시타', meaning: '시작했습니다' },
        { text: '始(はじ)ませんでした', ruby: '하지마셍데시타', meaning: '시작하지 않았습니다' },
        { text: '始(はじ)ましたか？', ruby: '하지마시타까?', meaning: '시작했습니까?' },
        { text: '始(はじ)ませんでしたか？', ruby: '하지마셍데시타까?', meaning: '시작하지 않았습니까?' },
      ],
      casual: [
        { text: '始(はじ)める', ruby: '하지메루', meaning: '시작해' },
        { text: '始(はじ)めない', ruby: '하지메나이', meaning: '시작하지 않아' },
        { text: '始(はじ)める？', ruby: '하지메루?', meaning: '시작해?' },
        { text: '始(はじ)めない？', ruby: '하지메나이?', meaning: '안 시작해?' },
        { text: '始(はじ)めた', ruby: '하지메타', meaning: '시작했어' },
        { text: '始(はじ)めなかった', ruby: '하지메나캇타', meaning: '시작하지 않았어' },
        { text: '始(はじ)めた？', ruby: '하지메타?', meaning: '시작했어?' },
        { text: '始(はじ)めなかった？', ruby: '하지메나캇타?', meaning: '시작하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '새로운 프로젝트를 시작하기로 했다.',
        japanese: '新(あたら)しいプロジェクトを始(はじ)めることにした。',
        plain:    '新しいプロジェクトを始めることにした。',
        reading:  '아타라시이 프로젝토오 하지메루 코토니 시타.',
        pattern:  { name: '〜ことにする', meaning: '~하기로 하다', note: 'ことにする는 스스로 결정을 내릴 때 사용하는 표현' },
        furigana: 'あたらしいぷろじぇくとをはじめることにした',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 0, 1] },
        ],
      },
      {
        korean:   '다음 달부터 일본어 공부를 시작합니다.',
        japanese: '来月(らいげつ)から日本語(にほんご)の勉強(べんきょう)を始(はじ)めます。',
        plain:    '来月から日本語の勉強を始めます。',
        reading:  '라이게츠카라 니홍고노 벤쿄-오 하지메마스.',
        pattern:  { name: '〜から始める', meaning: '~부터 시작하다', note: 'から는 시작 시점을 나타냄' },
        furigana: 'らいげつからにほんごのべんきょうをはじめます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '그럼, 회의를 시작하겠습니다.',
        japanese: 'では、会議(かいぎ)を始(はじ)めましょう。',
        plain:    'では、会議を始めましょう。',
        reading:  '데와, 카이기오 하지메마쇼-.',
        pattern:  { name: '〜ましょう', meaning: '~합시다', note: 'ましょう는 함께 행동을 제안하는 권유 표현' },
        furigana: 'では、かいぎをはじめましょう',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 52위  変わる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kawaru', rank: 52, verb: '変わる', reading: '카와루', meaning: '바뀌다; 변하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '変(かわ)ます', ruby: '카와마스', meaning: '바뀝니다' },
        { text: '変(かわ)ません', ruby: '카와마셍', meaning: '바뀌지 않습니다' },
        { text: '変(かわ)ますか？', ruby: '카와마스까?', meaning: '바뀝니까?' },
        { text: '変(かわ)ませんか？', ruby: '카와마셍까?', meaning: '바뀌지 않습니까?' },
        { text: '変(かわ)ました', ruby: '카와마시타', meaning: '바뀌었습니다' },
        { text: '変(かわ)ませんでした', ruby: '카와마셍데시타', meaning: '바뀌지 않았습니다' },
        { text: '変(かわ)ましたか？', ruby: '카와마시타까?', meaning: '바뀌었습니까?' },
        { text: '変(かわ)ませんでしたか？', ruby: '카와마셍데시타까?', meaning: '바뀌지 않았습니까?' },
      ],
      casual: [
        { text: '変(か)わる', ruby: '카와루', meaning: '바뀌어' },
        { text: '変(か)わらない', ruby: '카와라나이', meaning: '바뀌지 않아' },
        { text: '変(か)わる？', ruby: '카와루?', meaning: '바뀌어?' },
        { text: '変(か)わらない？', ruby: '카와라나이?', meaning: '안 바뀌어?' },
        { text: '変(か)わった', ruby: '카왓타', meaning: '바뀌었어' },
        { text: '変(か)わらなかった', ruby: '카와라나캇타', meaning: '바뀌지 않았어' },
        { text: '変(か)わった？', ruby: '카왓타?', meaning: '바뀌었어?' },
        { text: '変(か)わらなかった？', ruby: '카와라나캇타?', meaning: '바뀌지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '계절이 바뀌면 기온도 변해.',
        japanese: '季節(きせつ)が変(か)わると気温(きおん)も変(か)わる。',
        plain:    '季節が変わると気温も変わる。',
        reading:  '키세츠가 카와루토 키옹모 카와루.',
        pattern:  { name: '〜と〜も変わる', meaning: '~이 바뀌면 ~도 바뀐다', note: 'と는 자연적 조건을 나타냄. も는 역시·또한' },
        furigana: 'きせつがかわるときおんもかわる',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '일하는 방식이 크게 바뀌었다.',
        japanese: '仕事(しごと)のやり方(かた)が大(おお)きく変(か)わった。',
        plain:    '仕事のやり方が大きく変わった。',
        reading:  '시고토노 야리카타가 오-키쿠 카왓타.',
        pattern:  { name: '大きく変わる', meaning: '크게 바뀌다', note: '大きく는 大きい의 부사형. 정도가 큰 변화를 나타냄' },
        furigana: 'しごとのやりかたがおおきくかわった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '그의 태도가 갑자기 바뀌었다.',
        japanese: '彼(かれ)の態度(たいど)が突然(とつぜん)変(か)わった。',
        plain:    '彼の態度が突然変わった。',
        reading:  '카레노 타이도가 토츠젠 카왓타.',
        pattern:  { name: '突然変わる', meaning: '갑자기 바뀌다', note: '突然는 갑자기라는 뜻의 부사' },
        furigana: 'かれのたいどがとつぜんかわった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 53위  過ぎる
   * ══════════════════════════════════════════════════ */
  {
    id: 'sugiru', rank: 53, verb: '過ぎる', reading: '스기루', meaning: '지나다; 너무 ~하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '過(す)ます', ruby: '스마스', meaning: '지납니다' },
        { text: '過(す)ません', ruby: '스마셍', meaning: '지나지 않습니다' },
        { text: '過(す)ますか？', ruby: '스마스까?', meaning: '지납니까?' },
        { text: '過(す)ませんか？', ruby: '스마셍까?', meaning: '지나지 않습니까?' },
        { text: '過(す)ました', ruby: '스마시타', meaning: '지났습니다' },
        { text: '過(す)ませんでした', ruby: '스마셍데시타', meaning: '지나지 않았습니다' },
        { text: '過(す)ましたか？', ruby: '스마시타까?', meaning: '지났습니까?' },
        { text: '過(す)ませんでしたか？', ruby: '스마셍데시타까?', meaning: '지나지 않았습니까?' },
      ],
      casual: [
        { text: '過(す)ぎる', ruby: '스기루', meaning: '지나' },
        { text: '過(す)ぎない', ruby: '스기나이', meaning: '지나지 않아' },
        { text: '過(す)ぎる？', ruby: '스기루?', meaning: '지나?' },
        { text: '過(す)ぎない？', ruby: '스기나이?', meaning: '안 지나?' },
        { text: '過(す)ぎた', ruby: '스기타', meaning: '지났어' },
        { text: '過(す)ぎなかった', ruby: '스기나캇타', meaning: '지나지 않았어' },
        { text: '過(す)ぎた？', ruby: '스기타?', meaning: '지났어?' },
        { text: '過(す)ぎなかった？', ruby: '스기나캇타?', meaning: '지나지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '역을 지나면 왼쪽으로 꺾어 주세요.',
        japanese: '駅(えき)を過(す)ぎたら左(ひだり)に曲(ま)がってください。',
        plain:    '駅を過ぎたら左に曲がってください。',
        reading:  '에키오 스기타라 히다리니 맛갓테쿠다사이.',
        pattern:  { name: '〜たら〜てください', meaning: '~하면 ~해 주세요', note: 'たら는 조건을 나타냄. 길 안내에서 자주 쓰이는 표현' },
        furigana: 'えきをすぎたらひだりにまがってください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '너무 먹으면 몸에 나빠.',
        japanese: '食(た)べ過(す)ぎると体(からだ)に悪(わる)い。',
        plain:    '食べ過ぎると体に悪い。',
        reading:  '타베스기루토 카라다니 와루이.',
        pattern:  { name: '〜過ぎる', meaning: '너무 ~하다', note: '동사 ます형+過ぎる로 정도가 지나침을 나타냄' },
        furigana: 'たべすぎるとからだにわるい',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '시간이 지나는 것은 빨라.',
        japanese: '時間(じかん)が過(す)ぎるのは早(はや)い。',
        plain:    '時間が過ぎるのは早い。',
        reading:  '지캉가 스기루노와 하야이.',
        pattern:  { name: '〜のは早い', meaning: '~하는 것은 빠르다', note: 'の로 명사화. 時間が過ぎる는 시간이 흐르다' },
        furigana: 'じかんがすぎるのははやい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 54위  呼ぶ
   * ══════════════════════════════════════════════════ */
  {
    id: 'yobu', rank: 54, verb: '呼ぶ', reading: '요부', meaning: '부르다; 초대하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '呼(よ)ます', ruby: '요마스', meaning: '부릅니다' },
        { text: '呼(よ)ません', ruby: '요마셍', meaning: '부르지 않습니다' },
        { text: '呼(よ)ますか？', ruby: '요마스까?', meaning: '부릅니까?' },
        { text: '呼(よ)ませんか？', ruby: '요마셍까?', meaning: '부르지 않습니까?' },
        { text: '呼(よ)ました', ruby: '요마시타', meaning: '불렀습니다' },
        { text: '呼(よ)ませんでした', ruby: '요마셍데시타', meaning: '부르지 않았습니다' },
        { text: '呼(よ)ましたか？', ruby: '요마시타까?', meaning: '불렀습니까?' },
        { text: '呼(よ)ませんでしたか？', ruby: '요마셍데시타까?', meaning: '부르지 않았습니까?' },
      ],
      casual: [
        { text: '呼(よ)ぶ', ruby: '요부', meaning: '불러' },
        { text: '呼(よ)ばない', ruby: '요바나이', meaning: '부르지 않아' },
        { text: '呼(よ)ぶ？', ruby: '요부?', meaning: '불러?' },
        { text: '呼(よ)ばない？', ruby: '요바나이?', meaning: '안 불러?' },
        { text: '呼(よ)んだ', ruby: '욘다', meaning: '불렀어' },
        { text: '呼(よ)ばなかった', ruby: '요바나캇타', meaning: '부르지 않았어' },
        { text: '呼(よ)んだ？', ruby: '욘다?', meaning: '불렀어?' },
        { text: '呼(よ)ばなかった？', ruby: '요바나캇타?', meaning: '부르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이름을 불려서 대답했다.',
        japanese: '名前(なまえ)を呼(よ)ばれたので返事(へんじ)をした。',
        plain:    '名前を呼ばれたので返事をした。',
        reading:  '나마에오 요바레타노데 헨지오 시타.',
        pattern:  { name: '〜ばれる', meaning: '불리다 (수동)', note: '呼ばれる는 呼ぶ의 수동형. ので는 이유' },
        furigana: 'なまえをよばれたのでへんじをした',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        korean:   '친구를 생일 파티에 불렀다.',
        japanese: '友達(ともだち)を誕生日(たんじょうび)パーティーに呼(よ)んだ。',
        plain:    '友達を誕生日パーティーに呼んだ。',
        reading:  '토모다치오 탄죠-비 파-티-니 욘다.',
        pattern:  { name: '〜に呼ぶ', meaning: '~에 초대하다', note: 'に는 목적지·자리를 나타냄. 呼ぶ는 초대하다는 뜻도 있음' },
        furigana: 'ともだちをたんじょうびぱーてぃーによんだ',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '택시를 불러 주시겠어요?',
        japanese: 'タクシーを呼(よ)んでもらえますか？',
        plain:    'タクシーを呼んでもらえますか？',
        reading:  '타쿠시-오 욘데 모라에마스까?',
        pattern:  { name: '〜てもらえますか', meaning: '~해 줄 수 있나요?', note: 'てもらえますか는 정중한 부탁 표현' },
        furigana: 'たくしーをよんでもらえますか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 1, accent: [0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 0, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 1, accent: [0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 55위  感じる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kanjiru', rank: 55, verb: '感じる', reading: '캉지루', meaning: '느끼다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '感(かん)ます', ruby: '캉마스', meaning: '느낍니다' },
        { text: '感(かん)ません', ruby: '캉마셍', meaning: '느끼지 않습니다' },
        { text: '感(かん)ますか？', ruby: '캉마스까?', meaning: '느낍니까?' },
        { text: '感(かん)ませんか？', ruby: '캉마셍까?', meaning: '느끼지 않습니까?' },
        { text: '感(かん)ました', ruby: '캉마시타', meaning: '느꼈습니다' },
        { text: '感(かん)ませんでした', ruby: '캉마셍데시타', meaning: '느끼지 않았습니다' },
        { text: '感(かん)ましたか？', ruby: '캉마시타까?', meaning: '느꼈습니까?' },
        { text: '感(かん)ませんでしたか？', ruby: '캉마셍데시타까?', meaning: '느끼지 않았습니까?' },
      ],
      casual: [
        { text: '感(かん)じる', ruby: '캉지루', meaning: '느껴' },
        { text: '感(かん)じない', ruby: '캉지나이', meaning: '느끼지 않아' },
        { text: '感(かん)じる？', ruby: '캉지루?', meaning: '느껴?' },
        { text: '感(かん)じない？', ruby: '캉지나이?', meaning: '안 느껴?' },
        { text: '感(かん)じた', ruby: '캉지타', meaning: '느꼈어' },
        { text: '感(かん)じなかった', ruby: '캉지나캇타', meaning: '느끼지 않았어' },
        { text: '感(かん)じた？', ruby: '캉지타?', meaning: '느꼈어?' },
        { text: '感(かん)じなかった？', ruby: '캉지나캇타?', meaning: '느끼지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '봄의 따뜻함을 느끼는 계절이 됐다.',
        japanese: '春(はる)の暖(あたた)かさを感(かん)じる季節(きせつ)になった。',
        plain:    '春の暖かさを感じる季節になった。',
        reading:  '하루노 아타타카사오 캉지루 키세츠니 낫타.',
        pattern:  { name: '〜を感じる', meaning: '~을 느끼다', note: '暖かさ는 暖かい의 명사형. になった는 변화' },
        furigana: 'はるのあたたかさをかんじるきせつになった',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '그의 말에 감동을 느꼈다.',
        japanese: '彼(かれ)の言葉(ことば)に感動(かんどう)を感(かん)じた。',
        plain:    '彼の言葉に感動を感じた。',
        reading:  '카레노 코토바니 칸도-오 캉지타.',
        pattern:  { name: '〜に感動を感じる', meaning: '~에서 감동을 느끼다', note: '感動를 感じる로 표현. に는 자극의 출처' },
        furigana: 'かれのことばにかんどうをかんじた',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '몸의 변화를 느끼면 병원에 가세요.',
        japanese: '体(からだ)の変化(へんか)を感(かん)じたら病院(びょういん)へ行(い)ってください。',
        plain:    '体の変化を感じたら病院へ行ってください。',
        reading:  '카라다노 헨카오 캉지타라 뵤-잉에 잇테쿠다사이.',
        pattern:  { name: '〜たら〜てください', meaning: '~하면 ~해 주세요', note: 'たら는 조건. へ는 방향을 나타내는 조사' },
        furigana: 'からだのへんかをかんじたらびょういんへいってください',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 56위  買う
   * ══════════════════════════════════════════════════ */
  {
    id: 'kau', rank: 56, verb: '買う', reading: '카우', meaning: '사다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '買(か)ます', ruby: '카마스', meaning: '삽니다' },
        { text: '買(か)ません', ruby: '카마셍', meaning: '사지 않습니다' },
        { text: '買(か)ますか？', ruby: '카마스까?', meaning: '삽니까?' },
        { text: '買(か)ませんか？', ruby: '카마셍까?', meaning: '사지 않습니까?' },
        { text: '買(か)ました', ruby: '카마시타', meaning: '샀습니다' },
        { text: '買(か)ませんでした', ruby: '카마셍데시타', meaning: '사지 않았습니다' },
        { text: '買(か)ましたか？', ruby: '카마시타까?', meaning: '샀습니까?' },
        { text: '買(か)ませんでしたか？', ruby: '카마셍데시타까?', meaning: '사지 않았습니까?' },
      ],
      casual: [
        { text: '買(か)う', ruby: '카우', meaning: '사' },
        { text: '買(か)わない', ruby: '카와나이', meaning: '사지 않아' },
        { text: '買(か)う？', ruby: '카우?', meaning: '사?' },
        { text: '買(か)わない？', ruby: '카와나이?', meaning: '안 사?' },
        { text: '買(か)った', ruby: '캇타', meaning: '샀어' },
        { text: '買(か)わなかった', ruby: '카와나캇타', meaning: '사지 않았어' },
        { text: '買(か)った？', ruby: '캇타?', meaning: '샀어?' },
        { text: '買(か)わなかった？', ruby: '카와나캇타?', meaning: '사지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '슈퍼에서 채소를 샀다.',
        japanese: 'スーパーで野菜(やさい)を買(か)った。',
        plain:    'スーパーで野菜を買った。',
        reading:  '스-파-데 야사이오 캇타.',
        pattern:  { name: '〜で〜を買う', meaning: '~에서 ~을 사다', note: 'で는 장소. 買う는 1단계 구매 행위' },
        furigana: 'すーぱーでやさいをかった',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [1, 0] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '새 스마트폰을 사고 싶어요.',
        japanese: '新(あたら)しいスマートフォンを買(か)いたいです。',
        plain:    '新しいスマートフォンを買いたいです。',
        reading:  '아타라시이 스마-토홍오 카이타이데스.',
        pattern:  { name: '〜たい', meaning: '~하고 싶다', note: 'ます형+たい는 희망을 나타냄' },
        furigana: 'あたらしいすまーとふぉんをかいたいです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 13, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '선물을 사기 위해 저금하고 있어.',
        japanese: 'プレゼントを買(か)うために貯金(ちょきん)している。',
        plain:    'プレゼントを買うために貯金している。',
        reading:  '프레젠토오 카우타메니 쵸킹시테이루.',
        pattern:  { name: '〜ために', meaning: '~하기 위해', note: 'ために는 목적을 나타냄. 貯金する는 저금하다' },
        furigana: 'ぷれぜんとをかうためにちょきんしている',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 57위  続ける
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsuzukeru', rank: 57, verb: '続ける', reading: '츠즈케루', meaning: '계속하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '続(つづ)ます', ruby: '츠즈마스', meaning: '계속합니다' },
        { text: '続(つづ)ません', ruby: '츠즈마셍', meaning: '계속하지 않습니다' },
        { text: '続(つづ)ますか？', ruby: '츠즈마스까?', meaning: '계속합니까?' },
        { text: '続(つづ)ませんか？', ruby: '츠즈마셍까?', meaning: '계속하지 않습니까?' },
        { text: '続(つづ)ました', ruby: '츠즈마시타', meaning: '계속했습니다' },
        { text: '続(つづ)ませんでした', ruby: '츠즈마셍데시타', meaning: '계속하지 않았습니다' },
        { text: '続(つづ)ましたか？', ruby: '츠즈마시타까?', meaning: '계속했습니까?' },
        { text: '続(つづ)ませんでしたか？', ruby: '츠즈마셍데시타까?', meaning: '계속하지 않았습니까?' },
      ],
      casual: [
        { text: '続(つづ)ける', ruby: '츠즈케루', meaning: '계속해' },
        { text: '続(つづ)けない', ruby: '츠즈케나이', meaning: '계속하지 않아' },
        { text: '続(つづ)ける？', ruby: '츠즈케루?', meaning: '계속해?' },
        { text: '続(つづ)けない？', ruby: '츠즈케나이?', meaning: '안 계속해?' },
        { text: '続(つづ)けた', ruby: '츠즈케타', meaning: '계속했어' },
        { text: '続(つづ)けなかった', ruby: '츠즈케나캇타', meaning: '계속하지 않았어' },
        { text: '続(つづ)けた？', ruby: '츠즈케타?', meaning: '계속했어?' },
        { text: '続(つづ)けなかった？', ruby: '츠즈케나캇타?', meaning: '계속하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '아무리 어려워도 포기하지 않고 계속한다.',
        japanese: 'どんなに難(むずか)しくても諦(あきら)めずに続(つづ)ける。',
        plain:    'どんなに難しくても諦めずに続ける。',
        reading:  '돈나니 무즈카시쿠테모 아키라메즈니 츠즈케루.',
        pattern:  { name: '〜ずに続ける', meaning: '~하지 않고 계속하다', note: 'ずに는 부정 접속 표현. 諦める는 포기하다' },
        furigana: 'どんなにむずかしくてもあきらめずにつづける',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '매일 연습을 계속하는 것이 중요합니다.',
        japanese: '毎日(まいにち)練習(れんしゅう)を続(つづ)けることが大切(たいせつ)です。',
        plain:    '毎日練習を続けることが大切です。',
        reading:  '마이니치 렌슈-오 츠즈케루코토가 타이세츠데스.',
        pattern:  { name: '〜を続けることが大切', meaning: '~을 계속하는 것이 중요하다', note: 'こと로 동사를 명사화. 継続의 중요성을 강조' },
        furigana: 'まいにちれんしゅうをつづけることがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '이 페이스로 계속해 나갑시다.',
        japanese: 'このペースで続(つづ)けていきましょう。',
        plain:    'このペースで続けていきましょう。',
        reading:  '코노 페-스데 츠즈케테 이키마쇼-.',
        pattern:  { name: '〜ていく', meaning: '계속 ~해 나가다', note: 'ていく는 현재 상태가 계속되어 나감을 나타냄' },
        furigana: 'このぺーすでつづけていきましょう',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 8, accent: [0, 0, 0, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 58위  示す
   * ══════════════════════════════════════════════════ */
  {
    id: 'shimesu', rank: 58, verb: '示す', reading: '시메스', meaning: '나타내다; 제시하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '示(しめ)ます', ruby: '시메마스', meaning: '나타냅니다' },
        { text: '示(しめ)ません', ruby: '시메마셍', meaning: '나타내지 않습니다' },
        { text: '示(しめ)ますか？', ruby: '시메마스까?', meaning: '나타냅니까?' },
        { text: '示(しめ)ませんか？', ruby: '시메마셍까?', meaning: '나타내지 않습니까?' },
        { text: '示(しめ)ました', ruby: '시메마시타', meaning: '나타냈습니다' },
        { text: '示(しめ)ませんでした', ruby: '시메마셍데시타', meaning: '나타내지 않았습니다' },
        { text: '示(しめ)ましたか？', ruby: '시메마시타까?', meaning: '나타냈습니까?' },
        { text: '示(しめ)ませんでしたか？', ruby: '시메마셍데시타까?', meaning: '나타내지 않았습니까?' },
      ],
      casual: [
        { text: '示(しめ)す', ruby: '시메스', meaning: '나타내' },
        { text: '示(しめ)さない', ruby: '시메사나이', meaning: '나타내지 않아' },
        { text: '示(しめ)す？', ruby: '시메스?', meaning: '나타내?' },
        { text: '示(しめ)さない？', ruby: '시메사나이?', meaning: '안 나타내?' },
        { text: '示(しめ)した', ruby: '시메시타', meaning: '나타냈어' },
        { text: '示(しめ)さなかった', ruby: '시메사나캇타', meaning: '나타내지 않았어' },
        { text: '示(しめ)した？', ruby: '시메시타?', meaning: '나타냈어?' },
        { text: '示(しめ)さなかった？', ruby: '시메사나캇타?', meaning: '나타내지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '데이터가 그 사실을 나타내고 있다.',
        japanese: 'データがその事実(じじつ)を示(しめ)している。',
        plain:    'データがその事実を示している。',
        reading:  '데-타가 소노 지지츠오 시메시테이루.',
        pattern:  { name: '〜を示す', meaning: '~을 나타내다', note: '示す는 증거·사실을 제시할 때 사용. ている는 상태 지속' },
        furigana: 'でーたがそのじじつをしめしている',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '지도로 장소를 나타내 주세요.',
        japanese: '地図(ちず)で場所(ばしょ)を示(しめ)してください。',
        plain:    '地図で場所を示してください。',
        reading:  '치즈데 바쇼오 시메시테쿠다사이.',
        pattern:  { name: '〜で〜を示す', meaning: '~으로 ~을 나타내다', note: 'で는 수단. 地図는 지도' },
        furigana: 'ちずでばしょをしめしてください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '그는 강한 리더십을 보여 주었다.',
        japanese: '彼(かれ)は強(つよ)いリーダーシップを示(しめ)した。',
        plain:    '彼は強いリーダーシップを示した。',
        reading:  '카레와 츠요이 리-다-싯프오 시메시타.',
        pattern:  { name: '〜を示す', meaning: '~을 발휘하다/보여주다', note: '示す는 능력이나 자질을 드러낼 때도 사용' },
        furigana: 'かれはつよいりーだーしっぷをしめした',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 59위  返る
   * ══════════════════════════════════════════════════ */
  {
    id: 'kaeru_moto', rank: 59, verb: '返る', reading: '카에루', meaning: '돌아가다 (원래 상태로)',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '返(かえ)ます', ruby: '카에마스', meaning: '돌아갑니다' },
        { text: '返(かえ)ません', ruby: '카에마셍', meaning: '돌아가지 않습니다' },
        { text: '返(かえ)ますか？', ruby: '카에마스까?', meaning: '돌아갑니까?' },
        { text: '返(かえ)ませんか？', ruby: '카에마셍까?', meaning: '돌아가지 않습니까?' },
        { text: '返(かえ)ました', ruby: '카에마시타', meaning: '돌아갔습니다' },
        { text: '返(かえ)ませんでした', ruby: '카에마셍데시타', meaning: '돌아가지 않았습니다' },
        { text: '返(かえ)ましたか？', ruby: '카에마시타까?', meaning: '돌아갔습니까?' },
        { text: '返(かえ)ませんでしたか？', ruby: '카에마셍데시타까?', meaning: '돌아가지 않았습니까?' },
      ],
      casual: [
        { text: '返(かえ)る', ruby: '카에루', meaning: '돌아가' },
        { text: '返(かえ)らない', ruby: '카에라나이', meaning: '돌아가지 않아' },
        { text: '返(かえ)る？', ruby: '카에루?', meaning: '돌아가?' },
        { text: '返(かえ)らない？', ruby: '카에라나이?', meaning: '안 돌아가?' },
        { text: '返(かえ)った', ruby: '카엣타', meaning: '돌아갔어' },
        { text: '返(かえ)らなかった', ruby: '카에라나캇타', meaning: '돌아가지 않았어' },
        { text: '返(かえ)った？', ruby: '카엣타?', meaning: '돌아갔어?' },
        { text: '返(かえ)らなかった？', ruby: '카에라나캇타?', meaning: '돌아가지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '원래 상태로 돌아가는 것은 어렵다.',
        japanese: '元(もと)の状態(じょうたい)に返(かえ)ることは難(むずか)しい。',
        plain:    '元の状態に返ることは難しい。',
        reading:  '모토노 죠-타이니 카에루코토와 무즈카시이.',
        pattern:  { name: '〜に返る', meaning: '~로 돌아가다', note: '返る는 원래 상태·위치로 되돌아가다. に는 도달점' },
        furigana: 'もとのじょうたいにかえることはむずかしい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '빌린 돈을 갚아야 한다.',
        japanese: '借(か)りたお金(かね)を返(かえ)さなければならない。',
        plain:    '借りたお金を返さなければならない。',
        reading:  '카리타 오카네오 카에사나케레바 나라나이.',
        pattern:  { name: '〜なければならない', meaning: '~해야 한다', note: 'なければならない는 의무 표현. お金を返す는 돈을 갚다' },
        furigana: 'かりたおかねをかえさなければならない',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '답장이 돌아오지 않는다.',
        japanese: '返事(へんじ)が返(かえ)ってこない。',
        plain:    '返事が返ってこない。',
        reading:  '헨지가 카엣테코나이.',
        pattern:  { name: '〜てこない', meaning: '~해 오지 않는다', note: 'てくる의 부정형. 반응이나 응답이 없음을 표현' },
        furigana: 'へんじがかえってこない',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 60위  致す
   * ══════════════════════════════════════════════════ */
  {
    id: 'itasu', rank: 60, verb: '致す', reading: '이타스', meaning: '하다 (겸양)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '致(いた)ます', ruby: '이타마스', meaning: '합니다 (겸양)' },
        { text: '致(いた)ません', ruby: '이타마셍', meaning: '하지 않습니다' },
        { text: '致(いた)ますか？', ruby: '이타마스까?', meaning: '합니까?' },
        { text: '致(いた)ませんか？', ruby: '이타마셍까?', meaning: '하지 않습니까?' },
        { text: '致(いた)ました', ruby: '이타마시타', meaning: '했습니다 (겸양)' },
        { text: '致(いた)ませんでした', ruby: '이타마셍데시타', meaning: '하지 않았습니다' },
        { text: '致(いた)ましたか？', ruby: '이타마시타까?', meaning: '했습니까?' },
        { text: '致(いた)ませんでしたか？', ruby: '이타마셍데시타까?', meaning: '하지 않았습니까?' },
      ],
      casual: [
        { text: '致(いた)す', ruby: '이타스', meaning: '해 (겸양)' },
        { text: '致(いた)さない', ruby: '이타사나이', meaning: '하지 않아' },
        { text: '致(いた)す？', ruby: '이타스?', meaning: '해?' },
        { text: '致(いた)さない？', ruby: '이타사나이?', meaning: '안 해?' },
        { text: '致(いた)した', ruby: '이타시타', meaning: '했어 (겸양)' },
        { text: '致(いた)さなかった', ruby: '이타사나캇타', meaning: '하지 않았어' },
        { text: '致(いた)した？', ruby: '이타시타?', meaning: '했어?' },
        { text: '致(いた)さなかった？', ruby: '이타사나캇타?', meaning: '하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '도움이 될 수 있는 일이 있다면 하겠습니다.',
        japanese: '何(なに)かお手伝(てつだ)いできることがあれば致(いた)します。',
        plain:    '何かお手伝いできることがあれば致します。',
        reading:  '나니카 오테츠다이 데키루코토가 아레바 이타시마스.',
        pattern:  { name: '〜致します', meaning: '~하겠습니다 (겸양)', note: '致す는 する의 겸양어. あれば는 조건을 부드럽게 나타냄' },
        furigana: 'なにかおてつだいできることがあればいたします',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '연락드렸습니다.',
        japanese: 'ご連絡(れんらく)を致(いた)しました。',
        plain:    'ご連絡を致しました。',
        reading:  '고렌라쿠오 이타시마시타.',
        pattern:  { name: 'ご〜を致す', meaning: '~을 드리다 (겸양)', note: 'ご+명사+致す는 비즈니스에서 자주 쓰는 겸양 표현' },
        furigana: 'ごれんらくをいたしました',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '잘 부탁드립니다.',
        japanese: 'よろしくお願(ねが)い致(いた)します。',
        plain:    'よろしくお願い致します。',
        reading:  '요로시쿠 오네가이 이타시마스.',
        pattern:  { name: 'よろしくお願い致します', meaning: '잘 부탁드립니다', note: 'メール・名刺交換등 공식 자리의 정형 인사. 致す로 겸양 강조' },
        furigana: 'よろしくおねがいいたします',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
        ],
      },
    ],
  },
  { id: 'kiru', rank: 61, verb: '切る', reading: '키루', meaning: '자르다; 끊다', conjugations: null, examples: [] },
  { id: 'yomu', rank: 62, verb: '読む', reading: '요무', meaning: '읽다', conjugations: null, examples: [] },
  { id: 'tatsu', rank: 63, verb: '立つ', reading: '타츠', meaning: '서다; 일어서다', conjugations: null, examples: [] },
  { id: 'hanasu', rank: 64, verb: '話す', reading: '하나스', meaning: '말하다; 이야기하다', conjugations: null, examples: [] },
  { id: 'motomeru', rank: 65, verb: '求める', reading: '모토메루', meaning: '구하다; 요구하다', conjugations: null, examples: [] },
  { id: 'ataeru', rank: 66, verb: '与える', reading: '아타에루', meaning: '주다; 부여하다', conjugations: null, examples: [] },
  { id: 'ikiru', rank: 67, verb: '生きる', reading: '이키루', meaning: '살다', conjugations: null, examples: [] },
  { id: 'nomu', rank: 68, verb: '飲む', reading: '노무', meaning: '마시다; 삼키다', conjugations: null, examples: [] },
  { id: 'negau', rank: 69, verb: '願う', reading: '네가우', meaning: '바라다; 부탁하다', conjugations: null, examples: [] },
  { id: 'matsu', rank: 70, verb: '待つ', reading: '마츠', meaning: '기다리다', conjugations: null, examples: [] },
  { id: 'tsuzuku', rank: 71, verb: '続く', reading: '츠즈쿠', meaning: '계속되다', conjugations: null, examples: [] },
  { id: 'shitagau', rank: 72, verb: '従う', reading: '시타가우', meaning: '따르다; 복종하다', conjugations: null, examples: [] },
  { id: 'noru', rank: 73, verb: '乗る', reading: '노루', meaning: '타다 (교통수단)', conjugations: null, examples: [] },
  { id: 'mitomeru', rank: 74, verb: '認める', reading: '미토메루', meaning: '인정하다; 허가하다', conjugations: null, examples: [] },
  { id: 'kotaeru', rank: 75, verb: '答える', reading: '코타에루', meaning: '대답하다', conjugations: null, examples: [] },
  { id: 'owaru', rank: 76, verb: '終わる', reading: '오와루', meaning: '끝나다', conjugations: null, examples: [] },
  { id: 'hiraku', rank: 77, verb: '開く', reading: '히라쿠', meaning: '열다; 개최하다', conjugations: null, examples: [] },
  { id: 'fukumu', rank: 78, verb: '含む', reading: '후쿠무', meaning: '포함하다; 담다', conjugations: null, examples: [] },
  { id: 'au', rank: 79, verb: '会う', reading: '아우', meaning: '만나다', conjugations: null, examples: [] },
  { id: 'modoru', rank: 80, verb: '戻る', reading: '모도루', meaning: '돌아오다; 돌아가다', conjugations: null, examples: [] },
  { id: 'aruku', rank: 81, verb: '歩く', reading: '아루쿠', meaning: '걷다', conjugations: null, examples: [] },
  { id: 'ataru', rank: 82, verb: '当たる', reading: '아타루', meaning: '맞다; 해당하다', conjugations: null, examples: [] },
  { id: 'hakaru', rank: 83, verb: '図る', reading: '하카루', meaning: '꾀하다; 도모하다', conjugations: null, examples: [] },
  { id: 'mukau', rank: 84, verb: '向かう', reading: '무카우', meaning: '향하다; 마주하다', conjugations: null, examples: [] },
  { id: 'miseru', rank: 85, verb: '見せる', reading: '미세루', meaning: '보여주다', conjugations: null, examples: [] },
  { id: 'shinu', rank: 86, verb: '死ぬ', reading: '시누', meaning: '죽다', conjugations: null, examples: [] },
  { id: 'kaeru_v', rank: 87, verb: '変える', reading: '카에루', meaning: '바꾸다', conjugations: null, examples: [] },
  { id: 'nokoru', rank: 88, verb: '残る', reading: '노코루', meaning: '남다', conjugations: null, examples: [] },
  { id: 'erabu', rank: 89, verb: '選ぶ', reading: '에라부', meaning: '선택하다; 고르다', conjugations: null, examples: [] },
  { id: 'umareru', rank: 90, verb: '生まれる', reading: '우마레루', meaning: '태어나다', conjugations: null, examples: [] },
  { id: 'awaseru', rank: 91, verb: '合わせる', reading: '아와세루', meaning: '맞추다; 합치다', conjugations: null, examples: [] },
  { id: 'susumu', rank: 92, verb: '進む', reading: '스스무', meaning: '나아가다; 진행하다', conjugations: null, examples: [] },
  { id: 'sadameru', rank: 93, verb: '定める', reading: '사다메루', meaning: '정하다; 결정하다', conjugations: null, examples: [] },
  { id: 'kuwaeru', rank: 94, verb: '加える', reading: '쿠와에루', meaning: '더하다; 추가하다', conjugations: null, examples: [] },
  { id: 'hajimaru', rank: 95, verb: '始まる', reading: '하지마루', meaning: '시작되다', conjugations: null, examples: [] },
  { id: 'hashiru', rank: 96, verb: '走る', reading: '하시루', meaning: '달리다', conjugations: null, examples: [] },
  { id: 'wasureru', rank: 97, verb: '忘れる', reading: '와스레루', meaning: '잊다', conjugations: null, examples: [] },
  { id: 'kakawaru', rank: 98, verb: '関わる', reading: '카카와루', meaning: '관련되다; 관계하다', conjugations: null, examples: [] },
  { id: 'hataraku', rank: 99, verb: '働く', reading: '하타라쿠', meaning: '일하다; 작용하다', conjugations: null, examples: [] },
  { id: 'okuru', rank: 100, verb: '送る', reading: '오쿠루', meaning: '보내다; 전송하다', conjugations: null, examples: [] },
]
