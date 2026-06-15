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
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '〜てから: 앞 동작 완료 후 뒤 동작이 이어짐.\n宿題をしてから、ゲームをする에서 してから가 숙제를 먼저 끝낸 뒤임을 명시.\n単純接続의 て형과 달리 순서를 강조할 때 사용.' },
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
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '〜ために: 「~하기 위해」목적 표현.\n合格するために勉強している에서 合格する(합격하다)+ために+勉強している.\n意志動詞(의지동사)만 앞에 올 수 있음. 雨が降るために는 틀림.' },
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
        pattern:  { name: '〜ようにする', meaning: '~하도록 하다', note: '〜ようにする: 「~하도록 애쓰다」의지적 노력 표현.\n早く寝るようにしている에서 寝る(자다)+ようにしている.\nようになる(자연스럽게 되다)와 달리 にする는 인위적 노력을 나타냄.' },
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
        pattern:  { name: '〜ている', meaning: '~하고 있다 (진행)', note: '〜ている: 동작의 진행을 나타냄. て형+いる.\n勉強しています에서 勉強する(공부하다)+ている.\n住んでいる처럼 상태동사는 「살고 있다」(현재 상태)로 해석.' },
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
        pattern:  { name: '〜ているところ', meaning: '~하고 있는 중이다', note: '〜ているところ: 지금 딱 그 순간에 진행 중임을 강조.\nちょうど食べているところです에서 ちょうど(마침)+食べている+ところ.\nところ는 시점을 명확히 해주는 역할.' },
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
        pattern:  { name: '〜ている (상태)', meaning: '~하고 있다 / ~해 있다', note: '〜ている (상태): 진행 외에도 지속 상태를 나타냄.\n駅前で待っているよ에서 待つ(기다리다)+ている.\n「기다리고 있겠다」는 현재 의지·상태를 함께 표현.' },
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
        pattern:  { name: '〜てある', meaning: '~해 두다', note: '〜てある: 누군가가 의도적으로 해 놓은 결과 상태.\n予約してあります에서 予約する+てある.\nてある는 타동사에 붙음. 준비된 상태를 나타냄.' },
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
        pattern:  { name: '〜たことがある', meaning: '~한 적이 있다', note: '〜たことがある: 「~한 적이 있다」경험 표현.\n富士山に登ったことがある에서 登った(올랐다)+ことがある.\nたことがない(한 적 없다)와 세트로 기억. 경험 유무를 물을 때 자주 씀.' },
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
        pattern:  { name: '〜から', meaning: '~이기 때문에', note: '〜から: 「~이기 때문에」이유·근거 표현.\n会議があるから、準備しておいてください에서 あるから가 이유.\nので보다 주관적 뉘앙스가 강함.' },
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
        pattern:  { name: '〜と言う', meaning: '~라고 말하다', note: '〜と言う: 「~라고 말하다」인용 표현.\n大丈夫だと言った에서 大丈夫だ(괜찮다)+と+言った.\nと는 인용의 격조사. 직접화법·간접화법 모두에 사용.' },
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
        pattern:  { name: '〜って言う', meaning: '~라고 하다 (구어)', note: '〜って言う: と言う의 구어체 단축형.\n先生が明日テストがあるって言ってた에서 あるって가 인용 부분.\n友達와의 대화처럼 격식 없는 장면에서 と→って로 줄어듦.' },
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
        pattern:  { name: '〜と言っても', meaning: '~라고 해도', note: '〜と言っても: 「~라고 해도」앞 내용을 인정하면서 역접.\n好きじゃないと言っても、食べなきゃ에서 と言っても가 역접 연결.\n앞 사실을 인정하되 뒷 내용이 그것에 반함을 나타냄.' },
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
        pattern:  { name: '〜になる', meaning: '~이/가 되다', note: '〜になる: 「~이/가 되다」상태 변화 표현.\n日本語が上手になった에서 上手(잘함)+になった.\n명사·な형용사 뒤에 붙어 변화를 나타냄. い형용사는 〜くなる.' },
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
        pattern:  { name: '〜ようになる', meaning: '~하게 되다', note: '〜ようになる: 「~하게 되다」능력·습관의 변화 표현.\n毎日運動するようになった에서 運動する+ようになった.\nようにする(노력)와 달리 ようになる는 자연스러운 변화를 나타냄.' },
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
        pattern:  { name: '〜なくなる', meaning: '~하지 않게 되다', note: '〜なくなる: 「~하지 않게 되다」부정 상태로의 변화.\n甘いものを食べなくなった에서 食べない(먹지 않음)+くなった.\n以前과 달라진 습관·행동을 나타낼 때 사용.' },
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
        pattern:  { name: '〜てくる', meaning: '~해 오다 / 점점 ~해지다', note: '〜てくる: 변화가 시작되어 지금까지 진행됨.\n寒くなってきた에서 寒くなる(추워지다)+てきた.\n過去부터 現在까지의 변화 진행을 나타냄.' },
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
        pattern:  { name: '〜に来る', meaning: '~하러 오다', note: '〜に来る: 「~하러 오다」목적 표현.\n友達が遊びに来た에서 遊び(遊ぶのます형)+に+来た.\nに는 목적을 나타내는 조사. に行く(가다)와 세트.' },
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
        pattern:  { name: '〜から来る', meaning: '~에서 오다', note: '〜から来る: 출신·출발지를 묻는 표현.\nどちらからいらっしゃいましたか에서 どちら(어디)가 출발지.\nいらっしゃる는 来る의 존경어. 격식 있는 장면에서 사용.' },
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
        pattern:  { name: '〜と思う', meaning: '~라고 생각하다', note: '〜と思う: 「~라고 생각하다」의견·추측 표현.\n彼は優しい人だと思います에서 優しい人だ+と思います.\n自分의 의견을 완곡하게 표현할 때 자주 씀.' },
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
        pattern:  { name: '〜と思っていた', meaning: '~라고 생각했었다', note: '〜と思っていた: 과거에 그렇게 생각했으나 지금은 달라졌음.\nもっと難しいと思っていた에서 もっと難しい+と思っていた.\n過去의 예상이 현재와 다름을 암시함.' },
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
        pattern:  { name: '〜と思いますか', meaning: '~라고 생각하십니까?', note: '〜と思いますか: 상대의 의견을 묻는 표현.\nどのようにお考えですか에서 お考え는 考える의 명사형+존경お.\nどう思う、どのように思う가 의견을 묻는 대표 형식.' },
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
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '〜てみる: 「~해 보다」시도 표현.\n一度食べてみてください에서 食べる+てみてください.\nみる는 「보다」지만 여기선 시도·경험의 보조동사.' },
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
        pattern:  { name: '〜ように見える', meaning: '~처럼/~게 보이다', note: '〜ように見える: 「~처럼 보이다」외관상 인상 표현.\n彼女は幸せそうに見える에서 幸せそう(행복해 보임)+に見える.\nように와 そうに 모두 외관 추정에 쓰이나 ように가 더 확정적.' },
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
        pattern:  { name: '〜ながら', meaning: '~하면서 (동시동작)', note: '〜ながら: 「~하면서」동시 동작 표현.\nテレビを見ながら日本語を勉強している에서 見(ます형)+ながら.\n主語가 같을 때만 사용. 메인 동작은 문장 끝 동사.' },
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
        pattern:  { name: '〜に行く', meaning: '~하러 가다', note: '〜に行く: 「~하러 가다」목적 표현.\n映画を見に行きました에서 見(み=ます형)+に+行きました.\nに는 목적 조사. ます형+に行く가 기본 형식.' },
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
        pattern:  { name: '〜たことがある', meaning: '~한 적이 있다', note: '〜たことがある: 「~한 적이 있다」경험 표현.\n京都に行ったことがあります에서 行った(갔다)+ことがあります.\n행동의 경험 유무를 나타내는 전형적 표현.' },
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
        pattern:  { name: '〜から', meaning: '~이기 때문에', note: '〜から: 「~이기 때문에」이유 표현.\n雨が降っているから、外に行かない에서 降っているから가 이유.\nので(객관적)보다 주관적·감정적 뉘앙스가 강함.' },
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
        pattern:  { name: '〜ことができる', meaning: '~할 수 있다', note: '〜ことができる: 「~할 수 있다」가능 표현.\n日本語を話すことができますか에서 話す+ことができます.\n話せる(가능형)과 같은 뜻이나 より格式的. 구어에서는 가능형이 자연스러움.' },
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
        pattern:  { name: '〜んだって', meaning: '~래 / ~다고 하더라 (전문)', note: '〜んだって: 「~래/~다고 하더라」전문(伝聞) 표현.\nピアノが弾けるんだって에서 弾ける+んだって.\nんだ(강조·설명)+って(인용). 남에게서 들은 내용을 전달.' },
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
        pattern:  { name: '〜できない', meaning: '~할 수 없다', note: '〜できない: できる의 부정형으로 불가능을 나타냄.\nこの問題は一人では解決できない에서 解決+できない.\n能力 부재·상황적 불가능 모두에 사용 가능.' },
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
        pattern:  { name: '〜によって', meaning: '~에 의해서; ~에 따라서', note: '〜によって: 「~에 의해서/따라서」원인·수단 표현.\n努力によって結果が変わる에서 努力+によって+結果が変わる.\n수동문의 동작주(〜によって作られた)에도 사용.' },
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
        pattern:  { name: '場合による', meaning: '경우에 따라 다르다', note: '場合による: 「경우에 따라 다르다」관용 표현.\nそれは場合による에서 場合(경우)+による.\n상황에 따라 결과가 달라질 때 쓰는 관용구.' },
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
        pattern:  { name: '〜による', meaning: '~에 의한; ~에 기인한', note: '〜による: 명사를 수식하는 「~에 의한」연체형.\n準備不足によるものだ에서 準備不足+による+もの.\nに+よる+名詞 형태로 명사를 수식.' },
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
        pattern:  { name: '〜がつく', meaning: '~이/가 켜지다; 붙다', note: '〜がつく: 불·전자기기가 켜지는 상태 변화.\n電気がついた에서 電気(전기)+が+ついた.\n付く·点く 등 한자 구별 주의. 반대말은 消える.' },
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
        pattern:  { name: '〜に着く', meaning: '~에 도착하다', note: '〜に着く: 「~에 도착하다」목적지 도달 표현.\n駅に着きましたか에서 駅+に+着きましたか.\n着く(도착)·付く(부착)·就く(취임) 동음이의어 주의.' },
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
        pattern:  { name: 'なかなか〜ない', meaning: '좀처럼 ~하지 않다', note: 'なかなか〜ない: 「좀처럼 ~하지 않다」부정 강조.\nシールがなかなかつかない에서 なかなか+つかない.\nなかなか는 반드시 부정형과 함께 써야 함.' },
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
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '〜てから: 「~하고 나서」순서 표현.\nもう少し考えてから決める에서 考えて+から+決める.\n考える(생각하다) 완료 후 決める(정하다)가 이어짐.' },
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
        pattern:  { name: '〜について考える', meaning: '~에 대해 생각하다', note: '〜について考える: 「~에 대해 생각하다」주제+동작 표현.\n将来について真剣に考えている에서 将来+について+考えている.\nについて는 주제·대상을 나타내는 격조사.' },
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
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '〜てみる: 「~해 보다」시도·탐색 표현.\nどんな方法がいいか考えてみた에서 考え(생각)+てみた.\n결과를 모른 채 시험해보는 뉘앙스.' },
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
        pattern:  { name: '〜てしまう', meaning: '~해버리다; 완전히 끝내다', note: '〜てしまう: 동작 완료 또는 후회·유감 표현.\n宿題を全部やってしまった에서 やって+しまった.\n구어에서는 やっちゃった로 줄어듦.' },
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
        pattern:  { name: 'うっかり〜てしまう', meaning: '그만; 실수로 ~해버리다', note: 'うっかり〜てしまう: 「그만 실수로 ~해버리다」.\nうっかり傘を忘れてしまった에서 うっかり(부주의)+忘れて+しまった.\nうっかり는 부주의한 실수를 나타내는 부사.' },
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
        pattern:  { name: '〜てしまおう', meaning: '~해버리자 (완료 의지·권유)', note: '〜てしまおう: しまう의 의지형으로 완료 의지·권유 표현.\n早く片付けてしまおう에서 片付けて(치워)+しまおう.\n「빨리 끝내버리자」는 자신 또는 상대에의 권유.' },
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
        pattern:  { name: '〜ましょうか', meaning: '~할까요? (제안)', note: '〜ましょうか: 「~할까요」상대를 위한 자발적 제안.\n荷物を持ちましょうか에서 持ち+ましょうか.\n提案 표현. ましょう(함께 하자)와 달리 상대에 초점.' },
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
        pattern:  { name: '〜ている (상태)', meaning: '~을 가지고 있다', note: '〜ている (상태): 소유 상태를 나타냄.\n強い意志を持っている에서 持つ+ている.\n持っている는 「가지고 있다」상태의 지속.' },
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
        pattern:  { name: '〜て (연용)', meaning: '~을 가지고 / ~하고서', note: '〜て (연용): て형으로 연속 동작·수반 상태 연결.\n傘を持って外出した에서 持って가 수반 상태.\n持って는 「들고·가지고서」라는 수반의 뉘앙스.' },
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
        pattern:  { name: '〜てみる (의지형)', meaning: '~해 보다 / 해 보자', note: '〜てみる (의지형): 「해 보자」시도 권유.\nとりあえずやってみよう에서 やって+みよう.\nとりあえず(일단·우선)와 자주 쓰임. みよう=みる의 의지형.' },
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
        pattern:  { name: '〜ずに', meaning: '~하지 않고 (부정 연용)', note: '〜ずに: 「~하지 않고」부정 연용 표현.\n諦めずにやり続ける에서 諦め(あきらめ)+ずに.\nない형 대신 ず+に. 格式的 문체에도 자주 사용.' },
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
        pattern:  { name: '〜たら', meaning: '~했더니 / ~하면', note: '〜たら: 「~했더니/~하면」조건·계기 표현.\n一生懸命やったら、試験に合格した에서 やった+ら.\n예상치 못한 좋은 결과가 이어지는 계기 표현.' },
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
        pattern:  { name: '〜が分かる', meaning: '~을 알다 / 이해하다', note: '〜が分かる: 「~을 알다」자동사 표현.\nこの問題の意味が分かる에서 意味(의미)+が+分かる.\n分かる는 자동사로 목적어를 が로 받음. を分かる는 틀림.' },
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
        pattern:  { name: '〜たら', meaning: '~했더니 / ~하면', note: '〜たら: 「~했더니」계기 표현.\n説明を聞いたら、分かった에서 聞いた+ら가 계기.\n説明(설명)을 들은 뒤 이해가 된 순서를 나타냄.' },
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
        pattern:  { name: '全然〜ない', meaning: '전혀 ~않다', note: '全然〜ない: 「전혀 ~하지 않다」부정 강조.\n理由は全然分からなかった에서 全然+分からなかった.\n全然는 반드시 부정형과 함께. 全然いい(전혀 좋다)는 현대 속어.' },
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
        pattern:  { name: '〜ておりません', meaning: '없습니다 (겸양)', note: '〜ておりません: いる의 겸양어로 비즈니스 표현.\n担当の者は今おりません에서 おりません=いません의 겸양체.\n전화 응대에서 자신 측 사람을 낮출 때 사용.' },
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
        pattern:  { name: '〜におります', meaning: '~에 있습니다 (겸양)', note: '〜におります: 「~에 있습니다」겸양 위치 표현.\n私はこちらにおります에서 こちら(이쪽)+に+おります.\nおる는 いる의 겸양어. 자신의 위치를 공손하게 전달.' },
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
        pattern:  { name: '〜ておりましたが', meaning: '있었습니다만 (겸양·과거)', note: '〜ておりましたが: 과거 겸양 표현.\n先ほどまでここにおりましたが에서 おりました가 과거 겸양.\nが는 전환·여운의 뉘앙스. 정중한 상황 설명에 사용.' },
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
        pattern:  { name: '〜ておく', meaning: '~해 놓다; 미리 해 두다', note: '〜ておく: 「미리 ~해 두다」사전 준비 표현.\n旅行の前にホテルを予約しておいた에서 予約して+おいた.\n나중을 위해 지금 해두는 행동. 구어에서는 〜とく로 줄어듦.' },
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
        pattern:  { name: '〜ておきます', meaning: '~해 놓겠습니다', note: '〜ておきます: 「~해 놓겠습니다」사전 행동 정중 표현.\n資料をプリントしておきます에서 プリントして+おきます.\n준비·배려 차원의 사전 행동을 공손하게 전달.' },
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
        pattern:  { name: '〜ておいてね', meaning: '~해 놓아 (당부·부탁)', note: '〜ておいてね: 「~해 놓아」가벼운 당부 표현.\n明日のために準備しておいてね에서 準備して+おいて+ね.\nておく의 て형+ね로 가볍게 부탁하는 뉘앙스.' },
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
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '〜てから: 「~하고 나서」순서 표현.\n家を出てから、雨が降り始めた에서 出て+から가 순서.\n집에서 나온 뒤 비가 내리기 시작한 순서를 명시.' },
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
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '〜ために: 「~하기 위해」목적 표현.\n会議に出るために準備している에서 出る+ために+準備.\n出る(나가다)가 목적, 準備(준비)가 그 수단.' },
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
        pattern:  { name: '〜が出る', meaning: '~이 나오다', note: '〜が出る: 「~이 나오다」결과·출현 표현.\nやっと答えが出た에서 答え(답)+が+出た.\n결과·결론이 드러날 때 쓰는 자동사 표현.' },
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
        pattern:  { name: '〜を行います', meaning: '~을/를 실시합니다', note: '〜を行います: する보다 격식 있는 공식 표현.\n毎年この時期にイベントを行います에서 イベント+を行います.\n행사·업무·실험 등 공식 문서에서 자주 사용.' },
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
        pattern:  { name: '〜を行いました', meaning: '~을/를 실시했습니다', note: '〜を行いました: 격식 있는 완료 표현.\nアンケート調査を行いました에서 調査+を行いました.\n조사·실험 완료 보고 등 格式的 문서에서 사용.' },
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
        pattern:  { name: '〜を行ってください', meaning: '~을/를 실시해 주세요', note: '〜を行ってください: 격식 있는 정중 요청.\n定期的に点検を行ってください에서 点検+を行って+ください.\n업무 지시·안내문에서 자주 쓰이는 격식 요청.' },
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
        pattern:  { name: '〜てもらえる？', meaning: '~해 줄 수 있어? (부탁)', note: '〜てもらえる?: 「~해 줄 수 있어?」부드러운 부탁.\n塩を取ってもらえる에서 取って+もらえる?.\nてもらう의 가능형 의문문으로 정중·부드러운 부탁.' },
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
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '〜てから: 메모 후 다음 행동으로 이어지는 순서 표현.\nメモを取ってから忘れないようにして에서 取って+から.\n取る(메모하다)+てから로 순서와 목적이 결합.' },
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
        pattern:  { name: '〜てもいい', meaning: '~해도 된다 (허가)', note: '〜てもいい: 「~해도 된다」허가 표현.\n写真を撮ってもいいですか에서 撮って+もいいですか.\nてもいいですか로 허가를 구하는 형식.' },
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
        pattern:  { name: '〜をくださる', meaning: '~을/를 주시다 (존경)', note: '〜をくださる: くれる의 존경어.\n先生が本をくださいました에서 本+を+くださいました.\n윗사람이 나에게 무언가를 줄 때 사용.' },
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
        pattern:  { name: '〜てください', meaning: '~해 주세요 (정중 요청)', note: '〜てください: 「~해 주세요」정중 요청.\nゆっくり話してください에서 話して+ください.\nください는 くださる의 명령형. て형+ください.' },
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
        pattern:  { name: 'お〜ください', meaning: '~해 주세요 (격식 높임)', note: 'お〜ください: 격식 높임 요청 표현.\nご意見をお聞かせください에서 お+聞かせ+ください.\nお+동사 연용형+ください. 비즈니스·공식 장면에서 사용.' },
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
        pattern:  { name: '〜に対して', meaning: '~에 대해서; ~을/를 향해', note: '〜に対して: 「~에 대해서」대상 표현.\n先生の質問に対して答えた에서 質問+に対して+答えた.\n동작이나 감정의 대상을 나타내는 격식 표현.' },
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
        pattern:  { name: '〜に対する〜', meaning: '~에 대한 (명사 수식)', note: '〜に対する〜: 연체형으로 명사를 수식.\nこの問題に対する解決策에서 に対する+解決策.\nに対する는 뒤에 명사를 수식하는 연체형.' },
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
        pattern:  { name: '〜に対して〜ない', meaning: '~에 대해 ~할 수 없다', note: '〜に対して〜ない: 대상에 대한 부정 표현.\n彼に対して何も言えなかった에서 に対して+何も言えなかった.\n감정·태도의 대상을 나타내며 부정 표현과 결합.' },
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
        pattern:  { name: '〜方', meaning: '~하는 방법', note: '〜方: 「~하는 방법」명사 파생 표현.\nこのアプリの使い方を教えて에서 使い(ます형)+方.\nます형+方=방법. 동사를 명사화하는 표현.' },
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
        pattern:  { name: '〜ながら', meaning: '~하면서', note: '〜ながら: 「~하면서」동시 동작 표현.\n辞書を使いながら読んでください에서 使い+ながら+読む.\nます형+ながら. 사전을 쓰면서 읽는 동시 동작.' },
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
        pattern:  { name: '〜も (강조)', meaning: '~나 / ~씩이나 (예상 초과)', note: '〜も (강조): 예상을 초과하는 수량에 놀라움을 나타냄.\nこのパソコンは10年も使った에서 10年+も.\nも를 수량 뒤에 붙여 「~씩이나」라는 강조.' },
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
        pattern:  { name: '〜ながら', meaning: '~하면서 (동시동작)', note: '〜ながら: 「~하면서」동시 동작 표현.\n音楽を聞きながら勉強している에서 聞き(ます형)+ながら.\n주어가 같을 때만 사용. 메인 동작은 문장 끝.' },
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
        pattern:  { name: '〜てみる', meaning: '~해 보다', note: '〜てみる: 「~해 보다」시도 권유.\n道が分からなければ、駅員に聞いてみて에서 聞いて+みて.\n분かれば(알면) 구조로 조건을 제시 후 시도를 권유.' },
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
        pattern:  { name: '〜てください', meaning: '~해 주세요 (의뢰·지시)', note: '〜てください: 「~해 주세요」의뢰·지시.\n先生の話をよく聞いてください에서 聞いて+ください.\n요청이나 지시를 나타내는 정중 표현.' },
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
        pattern:  { name: '〜をくれる', meaning: '~을/를 주다 (나에게)', note: '〜をくれる: 「(나에게) ~을 주다」수수 표현.\n友達がプレゼントをくれた에서 프레젠트+を+くれた.\nくれる는 제3자→화자 방향. あげる(화자→타인)와 반대.' },
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
        pattern:  { name: '〜てくれる', meaning: '~해 주다 (나를 위해)', note: '〜てくれる: 「~해 주다」수혜 표현.\n彼は何も教えてくれなかった에서 教えて+くれなかった.\nて형+くれる. 타인이 나를 위해 행동해 줄 때 사용.' },
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
        pattern:  { name: '〜てくれてありがとう', meaning: '~해 줘서 고마워', note: '〜てくれてありがとう: 감사의 이유를 てくれて로 표현.\n助けてくれてありがとう에서 助けて+くれて+ありがとう.\nくれるのて형으로 감사 이유를 연결하는 구어 표현.' },
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
        pattern:  { name: '〜を知っている', meaning: '~을/를 알고 있다', note: '〜を知っている: 「알고 있다」상태 표현.\n彼のことを知っている에서 知る+ている.\n知る는 순간동사. 현재 「알다」상태는 知っている로 표현.' },
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
        pattern:  { name: '〜を知りませんでした', meaning: '~을/를 몰랐습니다', note: '〜を知りませんでした: 「몰랐습니다」과거 부정 정중 표현.\nその話は知りませんでした에서 知りません+でした.\n知らなかった의 格式体. 격식 있는 사과에 자주 사용.' },
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
        pattern:  { name: '〜たい', meaning: '~하고 싶다', note: '〜たい: 「~하고 싶다」희망 표현.\n日本の文化をもっとよく知りたい에서 知り(ます형)+たい.\n동사 연용형+たい. 화자의 희망·바람을 나타냄.' },
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
        pattern:  { name: '〜に置いてください', meaning: '~에 두세요', note: '〜に置いてください: 「~에 두세요」위치+요청 표현.\n本を机の上に置いてください에서 上+に+置いて+ください.\nに는 위치 조사. てください는 부탁·지시 표현.' },
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
        pattern:  { name: '〜ておきます', meaning: '~해 두겠습니다', note: '〜ておきます: 「~해 두겠습니다」준비 표현.\n荷物はここに置いておきます에서 置いて+おきます.\nておく는 미래를 위한 준비·유지를 나타냄.' },
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
        pattern:  { name: '〜に置いている', meaning: '~에 두고 있다', note: '〜に置いている: 「~에 두고 있다」습관적 상태 표현.\n鍵はいつもそこに置いている에서 置いて+いる.\nている는 반복적 습관 또는 현재 상태를 나타냄.' },
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
        pattern:  { name: '〜てもいい', meaning: '~해도 된다 (허가)', note: '〜てもいい: 「~해도 된다」허가 표현.\n中に入ってもいいですか에서 入って+もいい+ですか.\nても+いい=허가. ？로 끝나면 허가 요청.' },
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
        pattern:  { name: '〜前に', meaning: '~하기 전에', note: '〜前に: 「~하기 전에」시간 순서 표현.\nお風呂に入る前にシャワーを浴びて에서 入る+前に.\n동사 원형+前に. てから(후)와 반대 방향.' },
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
        pattern:  { name: '〜たくて', meaning: '~하고 싶어서', note: '〜たくて: 「~하고 싶어서」이유 표현.\nメンバーになりたくてサークルに入った에서 なりたく+て.\nたい(희망)+くて로 이유를 나타내는 て형 접속.' },
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
        pattern:  { name: '〜てもらう', meaning: '~해 받다 / ~해 달라고 하다', note: '〜てもらう: 「~해 받다」수혜 표현.\nお母さんにケーキを作ってもらった에서 作って+もらった.\nに가 행위자. 상대의 행동이 화자에게 유익함을 나타냄.' },
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
        pattern:  { name: '〜ために', meaning: '~하기 위해서', note: '〜ために: 「~하기 위해」목적 표현.\nよい環境を作るために努力している에서 作る+ために+努力.\n환경을 만드는 것이 목적, 노력이 그 수단.' },
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
        pattern:  { name: '〜てみる', meaning: '~해 보다 (시도)', note: '〜てみる: 「~해 보다」시도 표현.\n手作りの料理を食べてみてください에서 食べて+みてください.\n직접 만든 음식을 경험해 보도록 권유.' },
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
        pattern:  { name: 'こちらにございます', meaning: '이쪽에 있습니다', note: 'こちらにございます: ある의 최고 경어형.\nこちらにございます에서 ここに+ある의 최고 경어.\n안내·접객 상황에서 물건의 위치를 공손히 안내.' },
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
        pattern:  { name: 'ご〜はございますか？', meaning: '~이/가 있으십니까?', note: 'ご〜はございますか？: 격식 있는 문의 표현.\n何かご不明な点はございますか에서 ご不明な点+は+ございますか.\nご+名詞+はございますか 형식. 고객 응대에서 자주 사용.' },
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
        pattern:  { name: '〜でございます', meaning: '~입니다 (최경어)', note: '〜でございます: です의 최고 경어형.\nただいまの時刻は十時でございます에서 十時+でございます.\n공식 방송·안내·格式的 자리에서 사용.' },
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
        pattern:  { name: '〜から〜を出す', meaning: '~에서 ~을 꺼내다', note: '〜から〜を出す: 「~에서 ~을 꺼내다」.\n引き出しからペンを出す에서 引き出し+から+ペン+を+出す.\nから는 출처를 나타내는 조사.' },
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
        pattern:  { name: '〜を提出する', meaning: '~을 제출하다', note: '〜を提出する: 「~을 제출하다」格式的 表現.\n宿題を提出しました에서 宿題+を+提出しました.\n提出する는 出す의 格式的 표현. 학교·직장에서 사용.' },
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
        pattern:  { name: '〜出す', meaning: '~하기 시작하다', note: '〜出す: 「~하기 시작하다」복합 동사.\n走り出したら止まれなかった에서 走り+出したら.\n動詞+出す는 동작의 시작을 나타냄. 走り出す=뛰기 시작.' },
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
        pattern:  { name: '〜をつけてください', meaning: '~을 켜주세요', note: '〜をつけてください: 「~을 켜주세요」요청 표현.\nテレビをつけてください에서 テレビ+を+つけて+ください.\nつける는 전자기기·조명을 켜다. 반대말은 消す.' },
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
        pattern:  { name: '名前を付けておく', meaning: '이름을 써 두다', note: '名前を付けておく: 「이름을 써 두다」준비 표현.\nメモに名前を付けておいた에서 付けて+おいた.\nておく는 준비·유지를 나타냄. 이름을 미리 기입해 두는 상황.' },
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
        pattern:  { name: '〜たまま〜てしまった', meaning: '~한 채로 ~해버렸다', note: '〜たまま〜てしまった: 「~한 채로 ~해버렸다」.\n電気をつけたまま寝てしまった에서 つけた+まま+寝て+しまった.\nまま는 상태 유지. てしまった는 의도치 않은 결과.' },
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
        pattern:  { name: '〜に付いている', meaning: '~에 붙어 있다', note: '〜に付いている: 「~에 붙어 있다」결과 상태 표현.\nシールが壁に付いている에서 付く(붙다)+ている.\nている는 결과 상태. 付く는 자동사로 저절로 붙는 상태.' },
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
        pattern:  { name: '〜の後をついてくる', meaning: '~의 뒤를 따라오다', note: '〜の後をついてくる: 「뒤를 따라오다」이동 표현.\n子供が親の後をついてきた에서 後+を+ついて+きた.\nてくる는 이쪽 방향으로의 이동을 나타냄.' },
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
        pattern:  { name: '〜が付いています', meaning: '~이/가 딸려 있습니다', note: '〜が付いています: 「~이 달려 있습니다」포함 상태 표현.\nこの商品には保証が付いています에서 保証+が+付いています.\n상품에 무언가가 포함·부속될 때 사용.' },
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
        pattern:  { name: '試験を受ける予定です', meaning: '시험을 볼 예정입니다', note: '試験を受ける予定です: 「시험을 볼 예정입니다」예정 표현.\n来月、試験を受ける予定です에서 受ける+予定です.\n受ける는 시험을 「받다/보다」는 뜻.' },
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
        pattern:  { name: '〜ことになった', meaning: '~하게 되었다', note: '〜ことになった: 「~하게 되었다」외부 결정 표현.\n手術を受けることになった에서 受ける+ことになった.\n자신의 의지보다 상황·외부 요인에 의한 결정.' },
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
        pattern:  { name: '〜を受けた', meaning: '~을/를 받았다', note: '〜を受けた: 「~을 받았다」수혜·수용 표현.\nいいアドバイスを受けた에서 アドバイス+を+受けた.\n受ける는 조언·영향 등 추상적인 것도 받을 때 사용.' },
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
        pattern:  { name: '毎日〜を書いています', meaning: '매일 ~을 쓰고 있어요', note: '毎日〜を書いています: 「매일 ~을 쓰고 있다」습관 표현.\n毎日日記を書いています에서 書いて+います.\nている는 반복적 습관. 일기처럼 규칙적 행동에 사용.' },
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
        pattern:  { name: '〜を書くのが好きだ', meaning: '~을 쓰는 것을 좋아한다', note: '〜を書くのが好きだ: 「~을 쓰는 것을 좋아하다」.\n手紙を書くのが好きだ에서 書く+のが+好きだ.\nの는 동명사화 역할. 동사를 명사처럼 만들어 好き에 연결.' },
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
        pattern:  { name: '〜に〜を書いてください', meaning: '~에 ~을 써주세요', note: '〜に〜を書いてください: 「~에 ~을 써 주세요」요청 표현.\n黒板に答えを書いてください에서 黒板+に+答え+を+書いて+ください.\nに는 위치 조사. てください는 정중한 요청.' },
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
        pattern:  { name: '〜にプレゼントをもらった', meaning: '~에 선물을 받았다', note: '〜にプレゼントをもらった: 「~에 선물을 받았다」수혜 표현.\n誕生日にプレゼントをもらった에서 誕生日(시기)+に+もらった.\nもらう는 화자가 받는 입장.' },
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
        pattern:  { name: '〜に〜してもらう', meaning: '~에게 ~해 받다', note: '〜に〜してもらう: 「~에게 ~해 받다」수혜 표현.\n先生に説明してもらいました에서 先生+に+説明して+もらいました.\nてもらう는 상대 행동이 화자에게 유익함을 나타냄.' },
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
        pattern:  { name: '〜てもらって助かった', meaning: '~해 받아서 살았다/다행이었다', note: '〜てもらって助かった: 「~해 받아서 다행이다」감사 표현.\n友達から手伝ってもらって助かった에서 手伝って+もらって+助かった.\n助かった는 도움이 됐다는 안도와 감사.' },
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
        pattern:  { name: '〜から〜を得ることができる', meaning: '~에서 ~을 얻을 수 있다', note: '〜から〜を得ることができる: 「~에서 ~을 얻을 수 있다」.\n経験から多くを得ることができる에서 経験+から+得る+ことができる.\n得る는 추상적인 것을 얻을 때도 사용.' },
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
        pattern:  { name: '〜を得るには〜がかかる', meaning: '~을 얻으려면 ~이/가 걸리다', note: '〜を得るには〜がかかる: 「~을 얻으려면 ~이 걸린다」조건 표현.\n信頼を得るには時間がかかる에서 得る+には+時間+が+かかる.\nには는 필요 조건. かかる는 시간·비용이 필요함.' },
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
        pattern:  { name: 'あり得ない', meaning: '있을 수 없다; 말도 안 된다', note: 'あり得ない: 「있을 수 없다」강한 부정 표현.\nあり得ないことが起きた에서 あり得ない+こと.\nあり得る의 부정형. 강한 놀라움·부정을 표현하는 관용구.' },
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
        pattern:  { name: '電話をかけたが出なかった', meaning: '전화했는데 안 받더라', note: '電話をかけたが出なかった: 전화했으나 안 받은 상황 표현.\n電話をかけたが出なかった에서 かけた+が+出なかった.\nが는 역접. 電話に出る=전화를 받다.' },
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
        pattern:  { name: '〜に絵を掛ける', meaning: '~에 그림을 걸다', note: '〜に絵を掛ける: 「~에 그림을 걸다」위치+동작 표현.\n壁に絵を掛けた에서 壁+に+絵+を+掛けた.\nに는 위치 조사. 掛ける는 걸다.' },
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
        pattern:  { name: '迷惑をかけてしまってすみません', meaning: '폐를 끼쳐버려서 죄송합니다', note: '迷惑をかけてしまってすみません: 폐를 끼친 것에 대한 사과.\n迷惑をかけてしまってすみません에서 かけて+しまって+すみません.\n迷惑をかける는 폐를 끼치다. てしまう는 후회·유감.' },
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
        pattern:  { name: '〜に知れ渡る', meaning: '~에 널리 알려지다', note: '〜に知れ渡る: 「~에 널리 알려지다」복합 동사 표현.\n彼の名前は今や世界中に知れ渡っている에서 知れ渡る+ている.\n知れる+渡る 복합동사. 今や는 「이제는」.' },
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
        pattern:  { name: '〜か知れない', meaning: '~일지 모른다', note: '〜か知れない: 「~일지 모른다」불확실 표현.\nどうなるか知れないけど頑張るしかない에서 か知れない+けど.\nしかない는 「~할 수밖에 없다」. 두 표현 세트로 기억.' },
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
        pattern:  { name: '〜てきた', meaning: '~해 오기 시작했다', note: '〜てきた: 변화가 시작되어 현재까지 진행됨.\n噂が広まって名前が知れてきた에서 知れて+きた.\nてくる는 과거→현재의 변화 진행을 나타냄.' },
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
        pattern:  { name: '〜に〜を入れる', meaning: '~에 ~을 넣다', note: '〜に〜を入れる: 「~에 ~을 넣다」위치+동작 표현.\nバッグに財布を入れた에서 バッグ+に+財布+を+入れた.\nに는 넣는 장소, を는 넣는 대상.' },
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
        pattern:  { name: '〜ますか？', meaning: '~하시겠습니까?', note: '〜ますか？: 「~하시겠습니까?」상대의 의향을 묻는 정중 표현.\nコーヒーに砂糖を入れますか에서 入れます+か.\n정중한 질문. コーヒーに砂糖는 「커피에 설탕」.' },
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
        pattern:  { name: '〜てください', meaning: '~해 주세요', note: '〜てください: 「~해 주세요」정중 의뢰 표현.\n洗濯機に洗濯物を入れてください에서 入れて+ください.\nて형+ください는 정중한 의뢰의 기본형.' },
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
        pattern:  { name: '〜に関する＋명사', meaning: '~에 관한', note: '〜に関する＋명사: 「~에 관한」연체형 표현.\n環境に関する問題を議論した에서 関する+問題.\nについての와 유사하나 に関する가 더 格式的.' },
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
        pattern:  { name: '〜ています', meaning: '~하고 있습니다', note: '〜ています: 조사 중인 상태를 나타냄.\n健康に関する情報を調べています에서 調べて+います.\n調べる(조사하다)+ている=현재 진행 중.' },
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
        pattern:  { name: 'お〜ください', meaning: '~해 주십시오 (존경)', note: 'お〜ください: 격식 높임 요청 표현.\nこの件に関するご意見をお聞かせください에서 お聞かせ+ください.\nお+動詞連用形+ください. 비즈니스·공식 장면.' },
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
        pattern:  { name: '声を上げる', meaning: '소리를 내다', note: '声を上げる: 「큰 소리를 내다」관용 표현.\n声を上げて笑った에서 声+を+上げて+笑った.\n声を上げる는 소리를 높이다는 관용구.' },
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
        pattern:  { name: '〜を上げる', meaning: '~을 올리다/높이다', note: '〜を上げる: 「~을 높이다·올리다」향상 표현.\n品質を上げる努力をしています에서 品質+を+上げる.\n上げる는 물리적 올리기뿐 아니라 수준 향상에도 사용.' },
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
        pattern:  { name: '手を上げる', meaning: '손을 들다', note: '手を上げる: 「손을 들다」동작 표현.\n手を上げてください에서 手+を+上げて+ください.\n授業에서 손을 드는 기본 표현.' },
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
        pattern:  { name: '〜から〜が見える', meaning: '~에서 ~이 보이다', note: '〜から〜が見える: 「~에서 ~이 보이다」자동사 표현.\n窓から山が見える에서 窓+から+山+が+見える.\n見える는 자동사. 「보이다」≠「보다(見る)」.' },
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
        pattern:  { name: '遠くに〜が見える', meaning: '멀리 ~이 보이다', note: '遠くに〜が見える: 「멀리 ~이 보이다」자동사 표현.\n遠くに海が見えます에서 遠く+に+海+が+見えます.\n見える는 자연스럽게 눈에 들어옴을 나타냄.' },
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
        pattern:  { name: '〜く見える', meaning: '~하게 보이다', note: '〜く見える: 「~게 보이다」외관 추정 표현.\n彼女は若く見えます에서 若く+見えます.\nい형용사의 く형+見える. 「젊어 보이다」라는 인상.' },
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
        pattern:  { name: '〜を頂く', meaning: '~을 받다 (겸양)', note: '〜を頂く: もらう의 겸양어.\nお土産を頂いてありがとうございます에서 頂いて+ありがとう.\n頂く는 もらう의 겸양형. 윗사람에게 받을 때 사용.' },
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
        pattern:  { name: 'お〜頂けますか', meaning: '~해 주실 수 있습니까?', note: 'お〜頂けますか: 격식 있는 부탁 표현.\nこちらで少々お待ち頂けますか에서 お待ち+頂けますか.\nお+ます형+頂けますか는 정중한 의뢰 형식.' },
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
        pattern:  { name: '頂きます', meaning: '잘 먹겠습니다', note: '頂きます: 식사 전 감사 인사 관용 표현.\nでは、頂きます에서 頂きます=「잘 먹겠습니다」.\n食事 전 말하는 의례적 표현. 直訳는 「받겠습니다」.' },
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
        pattern:  { name: '電話が掛かってくる', meaning: '전화가 걸려 오다', note: '電話が掛かってくる: 「전화가 걸려오다」표현.\n電話が掛かってきました에서 掛かって+きました.\nてくる는 이쪽 방향으로의 변화·이동. 전화가 오는 방향.' },
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
        pattern:  { name: '〜にはかかる', meaning: '~에는 (시간이) 걸리다', note: '〜にはかかる: 「~에는 (시간이) 걸리다」표현.\nこの仕事には三日かかります에서 仕事+には+かかります.\nかかる는 시간·비용이 필요함을 나타냄.' },
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
        pattern:  { name: '〜ています (상태)', meaning: '~해 있습니다 (결과 상태)', note: '〜ています (상태): 결과 상태의 지속.\n壁に絵が掛かっています에서 掛かる+ています.\n掛かっている는 걸려 있는 상태의 지속.' },
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
        pattern:  { name: '〜ましたか？', meaning: '~했습니까?', note: '〜ましたか？: 「~했습니까?」과거 경험 확인 표현.\n朝ごはんを食べましたか에서 食べました+か.\n아침을 먹었는지 확인하는 일상 질문.' },
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
        pattern:  { name: '〜と〜にいい', meaning: '~하면 ~에 좋다', note: '〜と〜にいい: 「~하면 ~에 좋다」조건+결과 표현.\n野菜をたくさん食べると健康にいい에서 食べる+と+健康にいい.\nと는 자연스러운 결과를 나타냄.' },
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
        pattern:  { name: '〜ましょう', meaning: '~합시다', note: '〜ましょう: 「~합시다」제안·권유 표현.\n一緒に夕食を食べましょう에서 食べ+ましょう.\n함께 하도록 권유. ましょうか(상대에게 제안)와 구별.' },
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
        pattern:  { name: '〜てもらえますか', meaning: '~해 줄 수 있나요?', note: '〜てもらえますか: 「~해 주실 수 있나요?」정중 부탁.\n道を教えてもらえますか에서 教えて+もらえますか.\nてもらう의 가능형 의문문. 정중한 부탁 형식.' },
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
        pattern:  { name: '〜を教えている', meaning: '~을 가르치고 있다', note: '〜を教えている: 「~을 가르치고 있다」진행 표현.\n先生が数学を教えています에서 教えて+います.\n교사가 수학을 가르치는 직업·습관 상태.' },
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
        pattern:  { name: '〜方を教える', meaning: '~하는 법을 알려주다', note: '〜方を教える: 「~하는 방법을 가르쳐 주다」표현.\n使い方を教えてください에서 使い方+を+教えて+ください.\n方는 방법. 使い(ます형)+方=사용법.' },
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
        pattern:  { name: '〜は違います', meaning: '~은 아닙니다/다릅니다', note: '〜は違います: 「~은 틀립니다」부정·정정 표현.\nそれは違います에서 それ+は+違います.\n것을 정정하거나 부정할 때 사용하는 기본 표현.' },
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
        pattern:  { name: '〜が違う＋명사', meaning: '~이 다른 (명사)', note: '〜が違う＋명사: 차이점이 있는 명사를 수식.\n考え方が違う二人が仲良くなった에서 違う+二人.\n「생각이 다른 두 사람」처럼 동사가 명사를 수식.' },
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
        pattern:  { name: '〜とは違う', meaning: '~과는 다르다', note: '〜とは違う: 「~와는 다르다」비교·차이 표현.\n私の意見とは少し違います에서 意見+とは+違います.\nとは는 비교 대상을 나타내는 복합 조사.' },
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
        pattern:  { name: '〜ことにする', meaning: '~하기로 하다', note: '〜ことにする: 「~하기로 하다」자신의 결정 표현.\n新しいプロジェクトを始めることにした에서 始める+ことにした.\n自分의 의지적 결정. ことになった(외부 결정)와 구별.' },
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
        pattern:  { name: '〜から始める', meaning: '~부터 시작하다', note: '〜から始める: 「~부터 시작하다」출발점 표현.\n来月から日本語の勉強を始めます에서 来月+から+始めます.\nから는 시작점을 나타냄.' },
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
        pattern:  { name: '〜ましょう', meaning: '~합시다', note: '〜ましょう: 「~합시다」회의 시작 권유 표현.\nでは、会議を始めましょう에서 始め+ましょう.\nでは는 「그럼」의 뜻. 공식 장면에서 자주 사용.' },
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
        pattern:  { name: '〜と〜も変わる', meaning: '~이 바뀌면 ~도 바뀐다', note: '〜と〜も変わる: 「~하면 ~도 변한다」자연 조건 표현.\n季節が変わると気温も変わる에서 変わる+と+気温+も変わる.\nと는 자연현상·법칙에 쓰이는 조건형.' },
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
        pattern:  { name: '大きく変わる', meaning: '크게 바뀌다', note: '大きく変わる: 「크게 변하다」정도+변화 표현.\n仕事のやり方が大きく変わった에서 大きく+変わった.\n大きく는 변화의 정도를 나타내는 부사.' },
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
        pattern:  { name: '突然変わる', meaning: '갑자기 바뀌다', note: '突然変わる: 「갑자기 변하다」예기치 않은 변화.\n彼の態度が突然変わった에서 突然+変わった.\n突然는 「갑자기」. 예상치 못한 태도 변화를 표현.' },
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
        pattern:  { name: '〜たら〜てください', meaning: '~하면 ~해 주세요', note: '〜たら〜てください: 「~하면 ~해 주세요」조건+요청.\n駅を過ぎたら左に曲がってください에서 過ぎた+ら+曲がってください.\nたら는 순서·계기 조건.' },
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
        pattern:  { name: '〜過ぎる', meaning: '너무 ~하다', note: '〜過ぎる: 「~하기 과하다·지나치다」정도 초과 표현.\n食べ過ぎると体に悪い에서 食べ(ます형)+過ぎる.\nます형+過ぎる. 정도가 지나침을 나타냄.' },
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
        pattern:  { name: '〜のは早い', meaning: '~하는 것은 빠르다', note: '〜のは早い: 「~하는 것은 빠르다」관용 표현.\n時間が過ぎるのは早い에서 過ぎる+のは+早い.\nの는 동명사화. 時間が過ぎる를 주어로 만듦.' },
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
        pattern:  { name: '〜ばれる', meaning: '불리다 (수동)', note: '〜ばれる: 「~으로 불리다」수동 표현.\n名前を呼ばれたので返事をした에서 呼ぶ→呼ばれた.\n呼ぶ의 수동형. 이름이 불려 반응하는 상황.' },
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
        pattern:  { name: '〜に呼ぶ', meaning: '~에 초대하다', note: '〜に呼ぶ: 「~에 초대하다」목적지+동작 표현.\n友達を誕生日パーティーに呼んだ에서 友達+を+パーティー+に+呼んだ.\n誰かをどこかに呼ぶ 형식.' },
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
        pattern:  { name: '〜てもらえますか', meaning: '~해 줄 수 있나요?', note: '〜てもらえますか: 「~해 주실 수 있나요?」정중 부탁.\nタクシーを呼んでもらえますか에서 呼んで+もらえますか.\nてもらう의 가능형 의문문.' },
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
        pattern:  { name: '〜を感じる', meaning: '~을 느끼다', note: '〜を感じる: 「~을 느끼다」감각 표현.\n春の暖かさを感じる季節になった에서 暖かさ+を+感じる.\n感じる는 신체적·정서적 감각 모두에 사용.' },
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
        pattern:  { name: '〜に感動を感じる', meaning: '~에서 감동을 느끼다', note: '〜に感動を感じる: 「~에서 감동을 느끼다」감정 표현.\n彼の言葉に感動を感じた에서 言葉+に+感動+を+感じた.\nに는 감정의 원인을 나타냄.' },
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
        pattern:  { name: '〜たら〜てください', meaning: '~하면 ~해 주세요', note: '〜たら〜てください: 「~을 느끼면 ~해 주세요」조건+요청.\n体の変化を感じたら病院へ行ってください에서 感じた+ら+行ってください.\nたら는 계기 조건.' },
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
        pattern:  { name: '〜で〜を買う', meaning: '~에서 ~을 사다', note: '〜で〜を買う: 「~에서 ~을 사다」장소+동작 표현.\nスーパーで野菜を買った에서 スーパー+で+野菜+を+買った.\nで는 동작의 장소를 나타냄.' },
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
        pattern:  { name: '〜たい', meaning: '~하고 싶다', note: '〜たい: 「~하고 싶다」희망 표현.\n新しいスマートフォンを買いたいです에서 買い(ます형)+たいです.\n동사 연용형+たい로 희망을 나타냄.' },
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
        pattern:  { name: '〜ために', meaning: '~하기 위해', note: '〜ために: 「~하기 위해」목적 표현.\nプレゼントを買うために貯金している에서 買う+ために+貯金.\n선물 구매가 목적, 저금이 그 수단.' },
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
        pattern:  { name: '〜ずに続ける', meaning: '~하지 않고 계속하다', note: '〜ずに続ける: 「~하지 않고 계속하다」부정 연용+지속.\nどんなに難しくても諦めずに続ける에서 諦め+ずに+続ける.\nずに는 ない의 격식체. 諦める(포기)+ずに.' },
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
        pattern:  { name: '〜を続けることが大切', meaning: '~을 계속하는 것이 중요하다', note: '〜を続けることが大切: 「~을 계속하는 것이 중요하다」.\n毎日練習を続けることが大切です에서 続ける+こと+が+大切.\nこと는 동사를 명사화. 연습 지속이 주어.' },
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
        pattern:  { name: '〜ていく', meaning: '계속 ~해 나가다', note: '〜ていく: 「~해 나가다」미래 지향 지속 표현.\nこのペースで続けていきましょう에서 続けて+いきましょう.\nてくる(과거→현재)와 달리 ていく는 현재→미래.' },
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
        pattern:  { name: '〜を示す', meaning: '~을 나타내다', note: '〜を示す: 「~을 나타내다·가리키다」표시 표현.\nデータがその事実を示している에서 事実+を+示している.\n示す는 데이터·증거 등이 사실을 나타낼 때 사용.' },
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
        pattern:  { name: '〜で〜を示す', meaning: '~으로 ~을 나타내다', note: '〜で〜を示す: 「~으로 ~을 나타내다」수단+표시 표현.\n地図で場所を示してください에서 地図+で+場所+を+示して.\nで는 수단을 나타냄.' },
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
        pattern:  { name: '〜を示す', meaning: '~을 발휘하다/보여주다', note: '〜を示す: 「~을 보여주다·발휘하다」.\n彼は強いリーダーシップを示した에서 リーダーシップ+を+示した.\n추상적인 능력·자질을 보여줄 때도 사용.' },
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
        pattern:  { name: '〜に返る', meaning: '~로 돌아가다', note: '〜に返る: 「~로 돌아가다」원상 복귀 표현.\n元の状態に返ることは難しい에서 元の状態+に+返る.\n返る(되돌아가다)와 帰る(귀가하다) 구별 주의.' },
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
        pattern:  { name: '〜なければならない', meaning: '~해야 한다', note: '〜なければならない: 「~해야 한다」의무 표현.\n借りたお金を返さなければならない에서 返さない(안 갚다)+ければならない.\n口語에서는 返さなきゃ로 줄어듦.' },
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
        pattern:  { name: '〜てこない', meaning: '~해 오지 않는다', note: '〜てこない: 「~해 오지 않다」예상 미실현 표현.\n返事が返ってこない에서 返って(돌아와)+こない.\nてくる의 부정형으로 기대한 변화가 오지 않음.' },
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
        pattern:  { name: '〜致します', meaning: '~하겠습니다 (겸양)', note: '〜致します: する의 겸양어.\n何かお手伝いできることがあれば致します에서 致します=します의 겸양.\n비즈니스 장면에서 자신의 행동을 낮추는 표현.' },
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
        pattern:  { name: 'ご〜を致す', meaning: '~을 드리다 (겸양)', note: 'ご〜を致す: 격식 있는 겸양 동작 표현.\nご連絡を致しました에서 ご連絡+を+致しました.\nご+名詞+を致す는 상대에 대한 행동의 格式的 표현.' },
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
        pattern:  { name: 'よろしくお願い致します', meaning: '잘 부탁드립니다', note: 'よろしくお願い致します: 격식 있는 인사 표현.\nよろしくお願い致します에서 お願い致します가 격식 핵심.\n비즈니스 문서·공식 인사의 마무리 표현.' },
        furigana: 'よろしくおねがいいたします',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 61위  切る
   * ══════════════════════════════════════════════════ */
  {
    id: 'kiru', rank: 61, verb: '切る', reading: '키루', meaning: '자르다; 끊다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '切(き)ます', ruby: '키마스', meaning: '자릅니다' },
        { text: '切(き)ません', ruby: '키마셍', meaning: '자르지 않습니다' },
        { text: '切(き)ますか？', ruby: '키마스까?', meaning: '자릅니까?' },
        { text: '切(き)ませんか？', ruby: '키마셍까?', meaning: '자르지 않습니까?' },
        { text: '切(き)ました', ruby: '키마시타', meaning: '잘랐습니다' },
        { text: '切(き)ませんでした', ruby: '키마셍데시타', meaning: '자르지 않았습니다' },
        { text: '切(き)ましたか？', ruby: '키마시타까?', meaning: '잘랐습니까?' },
        { text: '切(き)ませんでしたか？', ruby: '키마셍데시타까?', meaning: '자르지 않았습니까?' },
      ],
      casual: [
        { text: '切(き)る', ruby: '키루', meaning: '잘라' },
        { text: '切(き)らない', ruby: '키라나이', meaning: '자르지 않아' },
        { text: '切(き)る？', ruby: '키루?', meaning: '잘라?' },
        { text: '切(き)らない？', ruby: '키라나이?', meaning: '안 잘라?' },
        { text: '切(き)った', ruby: '킷타', meaning: '잘랐어' },
        { text: '切(き)らなかった', ruby: '키라나캇타', meaning: '자르지 않았어' },
        { text: '切(き)った？', ruby: '킷타?', meaning: '잘랐어?' },
        { text: '切(き)らなかった？', ruby: '키라나캇타?', meaning: '자르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '종이를 잘게 잘라 주세요.',
        japanese: '紙(かみ)を細(こま)かく切(き)ってください。',
        plain:    '紙を細かく切ってください。',
        reading:  '카미오 코마카쿠 킷테쿠다사이.',
        pattern:  { name: '〜を〜く切る', meaning: '~을 ~하게 자르다', note: '〜を〜く切る: 「~을 ~게 자르다」방법+동작 표현.\n紙を細かく切ってください에서 細かく+切って+ください.\n細かく는 「잘게」. 부사가 동사의 방법을 수식.' },
        furigana: 'かみをこまかくきってください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 8, accent: [1, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '전원을 끄고 재부팅해 주세요.',
        japanese: '電源(でんげん)を切(き)ってから再起動(さいきどう)してください。',
        plain:    '電源を切ってから再起動してください。',
        reading:  '덴겐오 킷테카라 사이키도-시테쿠다사이.',
        pattern:  { name: '〜てから', meaning: '~하고 나서', note: '〜てから: 「~하고 나서」순서 표현.\n電源を切ってから再起動してください에서 切って+から+再起動.\n전원 끄기 완료 후 재시작이 이어지는 순서.' },
        furigana: 'でんげんをきってからさいきどうしてください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '가위로 천을 잘랐어.',
        japanese: 'ハサミで布(ぬの)を切(き)った。',
        plain:    'ハサミで布を切った。',
        reading:  '하사미데 누노오 킷타.',
        pattern:  { name: '〜で〜を切る', meaning: '~으로 ~을 자르다', note: '〜で〜を切る: 「~로 ~을 자르다」도구+동작 표현.\nハサミで布を切った에서 ハサミ+で+布+を+切った.\nで는 도구·수단을 나타냄.' },
        furigana: 'はさみでぬのをきった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 62위  読む
   * ══════════════════════════════════════════════════ */
  {
    id: 'yomu', rank: 62, verb: '読む', reading: '요무', meaning: '읽다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '読(よ)ます', ruby: '요마스', meaning: '읽습니다' },
        { text: '読(よ)ません', ruby: '요마셍', meaning: '읽지 않습니다' },
        { text: '読(よ)ますか？', ruby: '요마스까?', meaning: '읽습니까?' },
        { text: '読(よ)ませんか？', ruby: '요마셍까?', meaning: '읽지 않습니까?' },
        { text: '読(よ)ました', ruby: '요마시타', meaning: '읽었습니다' },
        { text: '読(よ)ませんでした', ruby: '요마셍데시타', meaning: '읽지 않았습니다' },
        { text: '読(よ)ましたか？', ruby: '요마시타까?', meaning: '읽었습니까?' },
        { text: '読(よ)ませんでしたか？', ruby: '요마셍데시타까?', meaning: '읽지 않았습니까?' },
      ],
      casual: [
        { text: '読(よ)む', ruby: '요무', meaning: '읽어' },
        { text: '読(よ)まない', ruby: '요마나이', meaning: '읽지 않아' },
        { text: '読(よ)む？', ruby: '요무?', meaning: '읽어?' },
        { text: '読(よ)まない？', ruby: '요마나이?', meaning: '안 읽어?' },
        { text: '読(よ)んだ', ruby: '욘다', meaning: '읽었어' },
        { text: '読(よ)まなかった', ruby: '요마나캇타', meaning: '읽지 않았어' },
        { text: '読(よ)んだ？', ruby: '욘다?', meaning: '읽었어?' },
        { text: '読(よ)まなかった？', ruby: '요마나캇타?', meaning: '읽지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 아침 신문을 읽는 습관이 있어요.',
        japanese: '毎朝(まいあさ)新聞(しんぶん)を読(よ)む習慣(しゅうかん)があります。',
        plain:    '毎朝新聞を読む習慣があります。',
        reading:  '마이아사 신붕오 요무 슈-캉가 아리마스.',
        pattern:  { name: '〜習慣がある', meaning: '~하는 습관이 있다', note: '〜習慣がある: 「~하는 습관이 있다」습관 표현.\n毎朝新聞を読む習慣があります에서 読む+習慣+があります.\n動詞+習慣がある 형식.' },
        furigana: 'まいあさしんぶんをよむしゅうかんがあります',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        korean:   '이 책은 아주 읽기 쉬워.',
        japanese: 'この本(ほん)はとても読(よ)みやすい。',
        plain:    'この本はとても読みやすい。',
        reading:  '코노 혼와 토테모 요미야스이.',
        pattern:  { name: '〜やすい', meaning: '~하기 쉽다', note: '〜やすい: 「~하기 쉽다」용이함 표현.\nこの本はとても読みやすい에서 読み(ます형)+やすい.\nます형+やすい. 반대는 〜にくい.' },
        furigana: 'このほんはとてもよみやすい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '아이에게 그림책을 읽어 줬어.',
        japanese: '子供(こども)に絵本(えほん)を読(よ)んであげた。',
        plain:    '子供に絵本を読んであげた。',
        reading:  '코도모니 에홍오 욘데아게타.',
        pattern:  { name: '〜てあげる', meaning: '~해 주다', note: '〜てあげる: 「~해 주다」주는 방향 수수 표현.\n子供に絵本を読んであげた에서 読んで+あげた.\nてあげる는 화자→타인 방향. てくれる와 반대.' },
        furigana: 'こどもにえほんをよんであげた',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 63위  立つ
   * ══════════════════════════════════════════════════ */
  {
    id: 'tatsu', rank: 63, verb: '立つ', reading: '타츠', meaning: '서다; 일어서다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '立(た)ます', ruby: '타마스', meaning: '섭니다' },
        { text: '立(た)ません', ruby: '타마셍', meaning: '서지 않습니다' },
        { text: '立(た)ますか？', ruby: '타마스까?', meaning: '섭니까?' },
        { text: '立(た)ませんか？', ruby: '타마셍까?', meaning: '서지 않습니까?' },
        { text: '立(た)ました', ruby: '타마시타', meaning: '섰습니다' },
        { text: '立(た)ませんでした', ruby: '타마셍데시타', meaning: '서지 않았습니다' },
        { text: '立(た)ましたか？', ruby: '타마시타까?', meaning: '섰습니까?' },
        { text: '立(た)ませんでしたか？', ruby: '타마셍데시타까?', meaning: '서지 않았습니까?' },
      ],
      casual: [
        { text: '立(た)つ', ruby: '타츠', meaning: '서' },
        { text: '立(た)たない', ruby: '타타나이', meaning: '서지 않아' },
        { text: '立(た)つ？', ruby: '타츠?', meaning: '서?' },
        { text: '立(た)たない？', ruby: '타타나이?', meaning: '안 서?' },
        { text: '立(た)った', ruby: '탓타', meaning: '섰어' },
        { text: '立(た)たなかった', ruby: '타타나캇타', meaning: '서지 않았어' },
        { text: '立(た)った？', ruby: '탓타?', meaning: '섰어?' },
        { text: '立(た)たなかった？', ruby: '타타나캇타?', meaning: '서지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '버스를 기다리는 동안 계속 서 있었어.',
        japanese: 'バスを待(ま)つ間(あいだ)、ずっと立(た)っていた。',
        plain:    'バスを待つ間、ずっと立っていた。',
        reading:  '바스오 마츠 아이다, 즛토 탓테이타.',
        pattern:  { name: 'ずっと立っている', meaning: '계속 서 있다', note: 'ずっと立っている: 「계속 서 있다」지속 상태 표현.\nバスを待つ間、ずっと立っていた에서 ずっと+立っていた.\nずっと는 연속·지속을 나타내는 부사.' },
        furigana: 'ばすをまつあいだ、ずっとたっていた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 5, accent: [0, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '자리에서 일어나서 밖으로 나갔어.',
        japanese: '席(せき)を立(た)って外(そと)に出(で)た。',
        plain:    '席を立って外に出た。',
        reading:  '세키오 탓테 소토니 데타.',
        pattern:  { name: '席を立つ', meaning: '자리에서 일어나다', note: '席を立つ: 「자리를 떠나다」관용 표현.\n席を立って外に出た에서 席+を+立って+出た.\n席を立つ는 자리를 뜨다는 관용구.' },
        furigana: 'せきをたってそとにでた',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '그는 무대 위에 섰다.',
        japanese: '彼(かれ)は舞台(ぶたい)の上(うえ)に立(た)った。',
        plain:    '彼は舞台の上に立った。',
        reading:  '카레와 부타이노 우에니 탓타.',
        pattern:  { name: '〜の上に立つ', meaning: '~위에 서다', note: '〜の上に立つ: 「~의 위에 서다」위치 표현.\n彼は舞台の上に立った에서 舞台+の上+に+立った.\n舞台(무대)+の上に+立つ는 무대에 오르다는 표현.' },
        furigana: 'かれはぶたいのうえにたった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 2, accent: [1, 0] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 64위  話す
   * ══════════════════════════════════════════════════ */
  {
    id: 'hanasu', rank: 64, verb: '話す', reading: '하나스', meaning: '말하다; 이야기하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '話(はな)ます', ruby: '하나마스', meaning: '말합니다' },
        { text: '話(はな)ません', ruby: '하나마셍', meaning: '말하지 않습니다' },
        { text: '話(はな)ますか？', ruby: '하나마스까?', meaning: '말합니까?' },
        { text: '話(はな)ませんか？', ruby: '하나마셍까?', meaning: '말하지 않습니까?' },
        { text: '話(はな)ました', ruby: '하나마시타', meaning: '말했습니다' },
        { text: '話(はな)ませんでした', ruby: '하나마셍데시타', meaning: '말하지 않았습니다' },
        { text: '話(はな)ましたか？', ruby: '하나마시타까?', meaning: '말했습니까?' },
        { text: '話(はな)ませんでしたか？', ruby: '하나마셍데시타까?', meaning: '말하지 않았습니까?' },
      ],
      casual: [
        { text: '話(はな)す', ruby: '하나스', meaning: '말해' },
        { text: '話(はな)さない', ruby: '하나사나이', meaning: '말하지 않아' },
        { text: '話(はな)す？', ruby: '하나스?', meaning: '말해?' },
        { text: '話(はな)さない？', ruby: '하나사나이?', meaning: '안 말해?' },
        { text: '話(はな)した', ruby: '하나시타', meaning: '말했어' },
        { text: '話(はな)さなかった', ruby: '하나사나캇타', meaning: '말하지 않았어' },
        { text: '話(はな)した？', ruby: '하나시타?', meaning: '말했어?' },
        { text: '話(はな)さなかった？', ruby: '하나사나캇타?', meaning: '말하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님과 진로에 대해 이야기했어.',
        japanese: '先生(せんせい)と進路(しんろ)について話(はな)した。',
        plain:    '先生と進路について話した。',
        reading:  '센세-토 신로니츠이테 하나시타.',
        pattern:  { name: '〜について話す', meaning: '~에 대해 이야기하다', note: '〜について話す: 「~에 대해 이야기하다」.\n先生と進路について話した에서 進路+について+話した.\nについて는 주제를 나타냄.' },
        furigana: 'せんせいとしんろについてはなした',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [1, 0] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '영어로 말할 수 있어요?',
        japanese: '英語(えいご)で話(はな)せますか？',
        plain:    '英語で話せますか？',
        reading:  '에-고데 하나세마스까?',
        pattern:  { name: '〜で話せる', meaning: '~로 말할 수 있다', note: '〜で話せる: 「~으로 말할 수 있다」가능 표현.\n英語で話せますか에서 英語+で+話せますか.\nで는 수단. 話せる는 話す의 가능형.' },
        furigana: 'えいごではなせますか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 1, accent: [0] },
        ],
      },
      {
        korean:   '중요한 것을 말해 주세요.',
        japanese: '大切(たいせつ)なことを話(はな)してください。',
        plain:    '大切なことを話してください。',
        reading:  '타이세츠나 코토오 하나시테쿠다사이.',
        pattern:  { name: '〜を話してください', meaning: '~을 말해 주세요', note: '〜を話してください: 「~을 말해 주세요」의뢰 표현.\n大切なことを話してください에서 話して+ください.\n話す(말하다)+てください로 정중한 의뢰.' },
        furigana: 'たいせつなことをはなしてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 65위  求める
   * ══════════════════════════════════════════════════ */
  {
    id: 'motomeru', rank: 65, verb: '求める', reading: '모토메루', meaning: '구하다; 요구하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '求(もと)ます', ruby: '모토마스', meaning: '구합니다' },
        { text: '求(もと)ません', ruby: '모토마셍', meaning: '구하지 않습니다' },
        { text: '求(もと)ますか？', ruby: '모토마스까?', meaning: '구합니까?' },
        { text: '求(もと)ませんか？', ruby: '모토마셍까?', meaning: '구하지 않습니까?' },
        { text: '求(もと)ました', ruby: '모토마시타', meaning: '구했습니다' },
        { text: '求(もと)ませんでした', ruby: '모토마셍데시타', meaning: '구하지 않았습니다' },
        { text: '求(もと)ましたか？', ruby: '모토마시타까?', meaning: '구했습니까?' },
        { text: '求(もと)ませんでしたか？', ruby: '모토마셍데시타까?', meaning: '구하지 않았습니까?' },
      ],
      casual: [
        { text: '求(もと)める', ruby: '모토메루', meaning: '구해' },
        { text: '求(もと)めない', ruby: '모토메나이', meaning: '구하지 않아' },
        { text: '求(もと)める？', ruby: '모토메루?', meaning: '구해?' },
        { text: '求(もと)めない？', ruby: '모토메나이?', meaning: '안 구해?' },
        { text: '求(もと)めた', ruby: '모토메타', meaning: '구했어' },
        { text: '求(もと)めなかった', ruby: '모토메나캇타', meaning: '구하지 않았어' },
        { text: '求(もと)めた？', ruby: '모토메타?', meaning: '구했어?' },
        { text: '求(もと)めなかった？', ruby: '모토메나캇타?', meaning: '구하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '더 좋은 환경을 구해 이직했다.',
        japanese: 'より良(よ)い環境(かんきょう)を求(もと)めて転職(てんしょく)した。',
        plain:    'より良い環境を求めて転職した。',
        reading:  '요리 요이 캉쿄-오 모토메테 텐쇼쿠시타.',
        pattern:  { name: '〜を求めて', meaning: '~을 구해서', note: '〜を求めて: 「~을 구해서/찾아서」목적 표현.\nより良い環境を求めて転職した에서 求めて+転職した.\nを求めて는 이유·목적을 나타내는 형식.' },
        furigana: 'よりよいかんきょうをもとめててんしょくした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
      {
        korean:   '여러분의 협조를 구하고 있습니다.',
        japanese: '皆(みな)さんのご協力(きょうりょく)を求(もと)めています。',
        plain:    '皆さんのご協力を求めています。',
        reading:  '미나상노 고쿄-료쿠오 모토메테이마스.',
        pattern:  { name: '〜を求めている', meaning: '~을 구하고 있다', note: '〜を求めている: 「~을 구하고 있다」현재 요청 표현.\n皆さんのご協力を求めています에서 求めて+います.\n현재 진행·지속 상태로 협력을 요청.' },
        furigana: 'みなさんのごきょうりょくをもとめています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그는 높은 수준을 추구하는 사람이야.',
        japanese: '彼(かれ)は高(たか)い水準(すいじゅん)を求(もと)める人(ひと)だ。',
        plain:    '彼は高い水準を求める人だ。',
        reading:  '카레와 타카이 수이쥰오 모토메루 히토다.',
        pattern:  { name: '〜を求める人', meaning: '~을 추구하는 사람', note: '〜を求める人: 「~을 추구하는 사람」연체수식 표현.\n高い水準を求める人だ에서 求める+人.\n動詞が名詞를 수식하는 連体形 구조.' },
        furigana: 'かれはたかいすいじゅんをもとめるひとだ',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 66위  与える
   * ══════════════════════════════════════════════════ */
  {
    id: 'ataeru', rank: 66, verb: '与える', reading: '아타에루', meaning: '주다; 부여하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '与(あた)ます', ruby: '아타마스', meaning: '줍니다' },
        { text: '与(あた)ません', ruby: '아타마셍', meaning: '주지 않습니다' },
        { text: '与(あた)ますか？', ruby: '아타마스까?', meaning: '줍니까?' },
        { text: '与(あた)ませんか？', ruby: '아타마셍까?', meaning: '주지 않습니까?' },
        { text: '与(あた)ました', ruby: '아타마시타', meaning: '주었습니다' },
        { text: '与(あた)ませんでした', ruby: '아타마셍데시타', meaning: '주지 않았습니다' },
        { text: '与(あた)ましたか？', ruby: '아타마시타까?', meaning: '주었습니까?' },
        { text: '与(あた)ませんでしたか？', ruby: '아타마셍데시타까?', meaning: '주지 않았습니까?' },
      ],
      casual: [
        { text: '与(あた)える', ruby: '아타에루', meaning: '줘' },
        { text: '与(あた)えない', ruby: '아타에나이', meaning: '주지 않아' },
        { text: '与(あた)える？', ruby: '아타에루?', meaning: '줘?' },
        { text: '与(あた)えない？', ruby: '아타에나이?', meaning: '안 줘?' },
        { text: '与(あた)えた', ruby: '아타에타', meaning: '줬어' },
        { text: '与(あた)えなかった', ruby: '아타에나캇타', meaning: '주지 않았어' },
        { text: '与(あた)えた？', ruby: '아타에타?', meaning: '줬어?' },
        { text: '与(あた)えなかった？', ruby: '아타에나캇타?', meaning: '주지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '아이에게 좋은 교육을 주고 싶어.',
        japanese: '子供(こども)に良(よ)い教育(きょういく)を与(あた)えたい。',
        plain:    '子供に良い教育を与えたい。',
        reading:  '코도모니 요이 쿄-이쿠오 아타에타이.',
        pattern:  { name: '〜に〜を与える', meaning: '~에게 ~을 주다', note: '〜に〜を与える: 「~에게 ~을 주다」수혜 표현.\n子供に良い教育を与えたい에서 子供+に+教育+を+与えたい.\n与える는 아래로 주는 방향. もらう의 반대.' },
        furigana: 'こどもによいきょういくをあたえたい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 경험은 나에게 큰 영향을 줬어.',
        japanese: 'この経験(けいけん)は私(わたし)に大(おお)きな影響(えいきょう)を与(あた)えた。',
        plain:    'この経験は私に大きな影響を与えた。',
        reading:  '코노 케-켄와 와타시니 오-키나 에-쿄-오 아타에타.',
        pattern:  { name: '〜に影響を与える', meaning: '~에게 영향을 주다', note: '〜に影響を与える: 「~에 영향을 주다」영향 표현.\nこの経験は私に大きな影響を与えた에서 影響+を+与えた.\n影響を与える는 관용 표현으로 자주 사용.' },
        furigana: 'このけいけんはわたしにおおきなえいきょうをあたえた',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '기회를 줘서 고마워.',
        japanese: 'チャンスを与(あた)えてくれてありがとう。',
        plain:    'チャンスを与えてくれてありがとう。',
        reading:  '챤스오 아타에테쿠레테 아리가토-.',
        pattern:  { name: '〜てくれてありがとう', meaning: '~해 줘서 고마워', note: '〜てくれてありがとう: 「~해 줘서 감사해」감사 표현.\nチャンスを与えてくれてありがとう에서 与えて+くれて+ありがとう.\nくれて는 타인의 행동이 화자에게 유익함을 나타냄.' },
        furigana: 'ちゃんすをあたえてくれてありがとう',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 67위  生きる
   * ══════════════════════════════════════════════════ */
  {
    id: 'ikiru', rank: 67, verb: '生きる', reading: '이키루', meaning: '살다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '生(い)ます', ruby: '이마스', meaning: '삽니다' },
        { text: '生(い)ません', ruby: '이마셍', meaning: '살지 않습니다' },
        { text: '生(い)ますか？', ruby: '이마스까?', meaning: '삽니까?' },
        { text: '生(い)ませんか？', ruby: '이마셍까?', meaning: '살지 않습니까?' },
        { text: '生(い)ました', ruby: '이마시타', meaning: '살았습니다' },
        { text: '生(い)ませんでした', ruby: '이마셍데시타', meaning: '살지 않았습니다' },
        { text: '生(い)ましたか？', ruby: '이마시타까?', meaning: '살았습니까?' },
        { text: '生(い)ませんでしたか？', ruby: '이마셍데시타까?', meaning: '살지 않았습니까?' },
      ],
      casual: [
        { text: '生(い)きる', ruby: '이키루', meaning: '살아' },
        { text: '生(い)きない', ruby: '이키나이', meaning: '살지 않아' },
        { text: '生(い)きる？', ruby: '이키루?', meaning: '살아?' },
        { text: '生(い)きない？', ruby: '이키나이?', meaning: '안 살아?' },
        { text: '生(い)きた', ruby: '이키타', meaning: '살았어' },
        { text: '生(い)きなかった', ruby: '이키나캇타', meaning: '살지 않았어' },
        { text: '生(い)きた？', ruby: '이키타?', meaning: '살았어?' },
        { text: '生(い)きなかった？', ruby: '이키나캇타?', meaning: '살지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '자기답게 사는 것이 중요해요.',
        japanese: '自分(じぶん)らしく生(い)きることが大切(たいせつ)です。',
        plain:    '自分らしく生きることが大切です。',
        reading:  '지붕라시쿠 이키루코토가 타이세츠데스.',
        pattern:  { name: '〜らしく生きる', meaning: '~답게 살다', note: '〜らしく生きる: 「~답게 살다」관용 표현.\n自分らしく生きることが大切です에서 自分らしく+生きる.\nらしく는 「~답게」를 나타내는 접미어.' },
        furigana: 'じぶんらしくいきることがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [1, 0, 0, 0, 1] },
        ],
      },
      {
        korean:   '어려움을 극복하며 살아가.',
        japanese: '困難(こんなん)を乗(の)り越(こ)えて生(い)きていく。',
        plain:    '困難を乗り越えて生きていく。',
        reading:  '콘난오 노리코에테 이키테이쿠.',
        pattern:  { name: '〜ていく', meaning: '~해 나가다', note: '〜ていく: 「~해 나가다」지속·전진 표현.\n困難を乗り越えて生きていく에서 生きて+いく.\nていく는 현재→미래 방향의 지속.' },
        furigana: 'こんなんをのりこえていきていく',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '지금을 온 힘을 다해 살고 싶어.',
        japanese: '今(いま)を精一杯(せいいっぱい)生(い)きたい。',
        plain:    '今を精一杯生きたい。',
        reading:  '이마오 세-잇파이 이키타이.',
        pattern:  { name: '精一杯〜たい', meaning: '온 힘을 다해 ~하고 싶다', note: '精一杯〜たい: 「있는 힘껏 ~하고 싶다」희망 표현.\n今を精一杯生きたい에서 精一杯+生きたい.\n精一杯는 「최선을 다해」.' },
        furigana: 'いまをせいいっぱいいきたい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 68위  飲む
   * ══════════════════════════════════════════════════ */
  {
    id: 'nomu', rank: 68, verb: '飲む', reading: '노무', meaning: '마시다; 삼키다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '飲(の)ます', ruby: '노마스', meaning: '마십니다' },
        { text: '飲(の)ません', ruby: '노마셍', meaning: '마시지 않습니다' },
        { text: '飲(の)ますか？', ruby: '노마스까?', meaning: '마십니까?' },
        { text: '飲(の)ませんか？', ruby: '노마셍까?', meaning: '마시지 않습니까?' },
        { text: '飲(の)ました', ruby: '노마시타', meaning: '마셨습니다' },
        { text: '飲(の)ませんでした', ruby: '노마셍데시타', meaning: '마시지 않았습니다' },
        { text: '飲(の)ましたか？', ruby: '노마시타까?', meaning: '마셨습니까?' },
        { text: '飲(の)ませんでしたか？', ruby: '노마셍데시타까?', meaning: '마시지 않았습니까?' },
      ],
      casual: [
        { text: '飲(の)む', ruby: '노무', meaning: '마셔' },
        { text: '飲(の)まない', ruby: '노마나이', meaning: '마시지 않아' },
        { text: '飲(の)む？', ruby: '노무?', meaning: '마셔?' },
        { text: '飲(の)まない？', ruby: '노마나이?', meaning: '안 마셔?' },
        { text: '飲(の)んだ', ruby: '논다', meaning: '마셨어' },
        { text: '飲(の)まなかった', ruby: '노마나캇타', meaning: '마시지 않았어' },
        { text: '飲(の)んだ？', ruby: '논다?', meaning: '마셨어?' },
        { text: '飲(の)まなかった？', ruby: '노마나캇타?', meaning: '마시지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 아침 커피를 한 잔 마셔요.',
        japanese: '毎朝(まいあさ)コーヒーを一杯(いっぱい)飲(の)みます。',
        plain:    '毎朝コーヒーを一杯飲みます。',
        reading:  '마이아사 코-히-오 잇파이 노미마스.',
        pattern:  { name: '毎朝〜を飲む', meaning: '매일 아침 ~을 마시다', note: '毎朝〜を飲む: 「매일 아침 ~을 마시다」습관 표현.\n毎朝コーヒーを一杯飲みます에서 毎朝+コーヒー+一杯+飲みます.\n一杯(한 잔)+飲む가 습관 표현.' },
        furigana: 'まいあさこーひーをいっぱいのみます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '약 먹는 것을 잊지 마세요.',
        japanese: '薬(くすり)を飲(の)むのを忘(わす)れないでください。',
        plain:    '薬を飲むのを忘れないでください。',
        reading:  '쿠스리오 노무노오 와스레나이데쿠다사이.',
        pattern:  { name: '〜のを忘れない', meaning: '~하는 것을 잊지 않다', note: '〜のを忘れない: 「~하는 것을 잊지 않다」주의 표현.\n薬を飲むのを忘れないでください에서 飲む+のを+忘れないでください.\nのを는 동명사화. 忘れないで는 忘れる의 부정 요청.' },
        furigana: 'くすりをのむのをわすれないでください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 0, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '물을 많이 마시면 건강에 좋아.',
        japanese: '水(みず)をたくさん飲(の)むと健康(けんこう)にいい。',
        plain:    '水をたくさん飲むと健康にいい。',
        reading:  '미즈오 타쿠상 노무토 켕코-니 이이.',
        pattern:  { name: '〜と〜にいい', meaning: '~하면 ~에 좋다', note: '〜と〜にいい: 「~하면 ~에 좋다」조건+결과 표현.\n水をたくさん飲むと健康にいい에서 飲む+と+健康にいい.\nと는 습관·법칙의 자연스러운 결과.' },
        furigana: 'みずをたくさんのむとけんこうにいい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 69위  願う
   * ══════════════════════════════════════════════════ */
  {
    id: 'negau', rank: 69, verb: '願う', reading: '네가우', meaning: '바라다; 부탁하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '願(ねが)ます', ruby: '네가마스', meaning: '바랍니다' },
        { text: '願(ねが)ません', ruby: '네가마셍', meaning: '바라지 않습니다' },
        { text: '願(ねが)ますか？', ruby: '네가마스까?', meaning: '바랍니까?' },
        { text: '願(ねが)ませんか？', ruby: '네가마셍까?', meaning: '바라지 않습니까?' },
        { text: '願(ねが)ました', ruby: '네가마시타', meaning: '바랐습니다' },
        { text: '願(ねが)ませんでした', ruby: '네가마셍데시타', meaning: '바라지 않았습니다' },
        { text: '願(ねが)ましたか？', ruby: '네가마시타까?', meaning: '바랐습니까?' },
        { text: '願(ねが)ませんでしたか？', ruby: '네가마셍데시타까?', meaning: '바라지 않았습니까?' },
      ],
      casual: [
        { text: '願(ねが)う', ruby: '네가우', meaning: '바라' },
        { text: '願(ねが)わない', ruby: '네가와나이', meaning: '바라지 않아' },
        { text: '願(ねが)う？', ruby: '네가우?', meaning: '바라?' },
        { text: '願(ねが)わない？', ruby: '네가와나이?', meaning: '안 바라?' },
        { text: '願(ねが)った', ruby: '네갓타', meaning: '바랐어' },
        { text: '願(ねが)わなかった', ruby: '네가와나캇타', meaning: '바라지 않았어' },
        { text: '願(ねが)った？', ruby: '네갓타?', meaning: '바랐어?' },
        { text: '願(ねが)わなかった？', ruby: '네가와나캇타?', meaning: '바라지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '합격을 진심으로 바라고 있어요.',
        japanese: '合格(ごうかく)を心(こころ)から願(ねが)っています。',
        plain:    '合格を心から願っています。',
        reading:  '고-카쿠오 코코로카라 네갓테이마스.',
        pattern:  { name: '心から願う', meaning: '진심으로 바라다', note: '心から願う: 「진심으로 바라다」감정 강조 표현.\n合格を心から願っています에서 心から+願っています.\n心から는 「마음 깊이서」.' },
        furigana: 'ごうかくをこころからねがっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '잘 부탁드립니다.',
        japanese: 'どうぞよろしくお願(ねが)いします。',
        plain:    'どうぞよろしくお願いします。',
        reading:  '도-조 요로시쿠 오네가이시마스.',
        pattern:  { name: 'よろしくお願いする', meaning: '잘 부탁하다', note: 'よろしくお願いする: 「잘 부탁합니다」관용 인사.\nどうぞよろしくお願いします에서 よろしく+お願いします.\n처음 만남·의뢰 시 쓰이는 필수 표현.' },
        furigana: 'どうぞよろしくおねがいします',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '세계 평화를 바라는 마음은 소중해.',
        japanese: '世界(せかい)平和(へいわ)を願(ねが)う気持(きも)ちは大切(たいせつ)だ。',
        plain:    '世界平和を願う気持ちは大切だ。',
        reading:  '세카이 헤이와오 네가우 키모치와 타이세츠다.',
        pattern:  { name: '〜を願う気持ち', meaning: '~을 바라는 마음', note: '〜を願う気持ち: 「~을 바라는 마음」표현.\n世界平和を願う気持ちは大切だ에서 願う+気持ち.\n動詞連体形+気持ち=~하는 마음.' },
        furigana: 'せかいへいわをねがうきもちはたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 70위  待つ
   * ══════════════════════════════════════════════════ */
  {
    id: 'matsu', rank: 70, verb: '待つ', reading: '마츠', meaning: '기다리다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '待(ま)ます', ruby: '마마스', meaning: '기다립니다' },
        { text: '待(ま)ません', ruby: '마마셍', meaning: '기다리지 않습니다' },
        { text: '待(ま)ますか？', ruby: '마마스까?', meaning: '기다립니까?' },
        { text: '待(ま)ませんか？', ruby: '마마셍까?', meaning: '기다리지 않습니까?' },
        { text: '待(ま)ました', ruby: '마마시타', meaning: '기다렸습니다' },
        { text: '待(ま)ませんでした', ruby: '마마셍데시타', meaning: '기다리지 않았습니다' },
        { text: '待(ま)ましたか？', ruby: '마마시타까?', meaning: '기다렸습니까?' },
        { text: '待(ま)ませんでしたか？', ruby: '마마셍데시타까?', meaning: '기다리지 않았습니까?' },
      ],
      casual: [
        { text: '待(ま)つ', ruby: '마츠', meaning: '기다려' },
        { text: '待(ま)たない', ruby: '마타나이', meaning: '기다리지 않아' },
        { text: '待(ま)つ？', ruby: '마츠?', meaning: '기다려?' },
        { text: '待(ま)たない？', ruby: '마타나이?', meaning: '안 기다려?' },
        { text: '待(ま)った', ruby: '맛타', meaning: '기다렸어' },
        { text: '待(ま)たなかった', ruby: '마타나캇타', meaning: '기다리지 않았어' },
        { text: '待(ま)った？', ruby: '맛타?', meaning: '기다렸어?' },
        { text: '待(ま)たなかった？', ruby: '마타나캇타?', meaning: '기다리지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '친구를 역에서 기다리고 있어요.',
        japanese: '友達(ともだち)を駅(えき)で待(ま)っています。',
        plain:    '友達を駅で待っています。',
        reading:  '토모다치오 에키데 맛테이마스.',
        pattern:  { name: '〜で待っている', meaning: '~에서 기다리고 있다', note: '〜で待っている: 「~에서 기다리고 있다」위치+진행 표현.\n友達を駅で待っています에서 駅+で+待って+います.\nで는 동작의 장소.' },
        furigana: 'ともだちをえきでまっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '답장을 기다리고 있는 중이에요.',
        japanese: '返事(へんじ)を待(ま)っているところです。',
        plain:    '返事を待っているところです。',
        reading:  '헨지오 맛테이루 토코로데스.',
        pattern:  { name: '〜ているところ', meaning: '~하고 있는 중이다', note: '〜ているところ: 지금 딱 그 상태임을 강조.\n返事を待っているところです에서 待っている+ところ.\nところ는 지금 그 순간·상태임을 명확히 함.' },
        furigana: 'へんじをまっているところです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '조금만 더 기다려 주시겠어요?',
        japanese: 'もう少(すこ)し待(ま)ってもらえますか？',
        plain:    'もう少し待ってもらえますか？',
        reading:  '모- 스코시 맛테 모라에마스까?',
        pattern:  { name: '〜てもらえますか', meaning: '~해 줄 수 있나요?', note: '〜てもらえますか: 「~해 주실 수 있나요?」정중 부탁.\nもう少し待ってもらえますか에서 待って+もらえますか.\nてもらう의 가능형 의문문.' },
        furigana: 'もうすこしまってもらえますか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 71위  続く
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsuzuku', rank: 71, verb: '続く', reading: '츠즈쿠', meaning: '계속되다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '続(つづ)ます', ruby: '츠즈마스', meaning: '계속됩니다' },
        { text: '続(つづ)ません', ruby: '츠즈마셍', meaning: '계속되지 않습니다' },
        { text: '続(つづ)ますか？', ruby: '츠즈마스까?', meaning: '계속됩니까?' },
        { text: '続(つづ)ませんか？', ruby: '츠즈마셍까?', meaning: '계속되지 않습니까?' },
        { text: '続(つづ)ました', ruby: '츠즈마시타', meaning: '계속되었습니다' },
        { text: '続(つづ)ませんでした', ruby: '츠즈마셍데시타', meaning: '계속되지 않았습니다' },
        { text: '続(つづ)ましたか？', ruby: '츠즈마시타까?', meaning: '계속되었습니까?' },
        { text: '続(つづ)ませんでしたか？', ruby: '츠즈마셍데시타까?', meaning: '계속되지 않았습니까?' },
      ],
      casual: [
        { text: '続(つづ)く', ruby: '츠즈쿠', meaning: '계속돼' },
        { text: '続(つづ)かない', ruby: '츠즈카나이', meaning: '계속되지 않아' },
        { text: '続(つづ)く？', ruby: '츠즈쿠?', meaning: '계속돼?' },
        { text: '続(つづ)かない？', ruby: '츠즈카나이?', meaning: '안 계속돼?' },
        { text: '続(つづ)いた', ruby: '츠즈이타', meaning: '계속됐어' },
        { text: '続(つづ)かなかった', ruby: '츠즈카나캇타', meaning: '계속되지 않았어' },
        { text: '続(つづ)いた？', ruby: '츠즈이타?', meaning: '계속됐어?' },
        { text: '続(つづ)かなかった？', ruby: '츠즈카나캇타?', meaning: '계속되지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 일은 앞으로 사흘 더 계속될 예정이에요.',
        japanese: 'この仕事(しごと)はあと三日(みっか)続(つづ)く予定(よてい)です。',
        plain:    'この仕事はあと三日続く予定です。',
        reading:  '코노 시고토와 아토 밋카 츠즈쿠 요테-데스.',
        pattern:  { name: '〜続く予定だ', meaning: '~계속될 예정이다', note: '〜続く予定だ: 「~계속될 예정이다」예정 표현.\nこの仕事はあと三日続く予定です에서 続く+予定です.\n予定는 미래 계획을 나타냄.' },
        furigana: 'このしごとはあとみっかつづくよていです',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '비가 계속 와서 빨래가 안 말라.',
        japanese: '雨(あめ)が続(つづ)いて洗濯物(せんたくもの)が乾(かわ)かない。',
        plain:    '雨が続いて洗濯物が乾かない。',
        reading:  '아메가 츠즈이테 센타쿠모노가 카와카나이.',
        pattern:  { name: '〜て〜ない', meaning: '~해서 ~하지 않다', note: '〜て〜ない: 「~해서 ~하지 않다」원인+결과 표현.\n雨が続いて洗濯物が乾かない에서 続いて가 원인.\n乾かない는 건조 불가능의 결과.' },
        furigana: 'あめがつづいてせんたくものがかわかない',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '노력을 계속한 결과 꿈이 이루어졌어.',
        japanese: '努力(どりょく)を続(つづ)けた結果(けっか)、夢(ゆめ)が叶(かな)った。',
        plain:    '努力を続けた結果、夢が叶った。',
        reading:  '도료쿠오 츠즈케타 켁카, 유메가 카낫타.',
        pattern:  { name: '〜た結果', meaning: '~한 결과', note: '〜た結果: 「~한 결과」인과 관계 표현.\n努力を続けた結果、夢が叶った에서 続けた+結果.\nた+結果는 노력의 결과를 이어주는 표현.' },
        furigana: 'どりょくをつづけたけっか、ゆめがかなった',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 72위  従う
   * ══════════════════════════════════════════════════ */
  {
    id: 'shitagau', rank: 72, verb: '従う', reading: '시타가우', meaning: '따르다; 복종하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '従(したが)ます', ruby: '시타가마스', meaning: '따릅니다' },
        { text: '従(したが)ません', ruby: '시타가마셍', meaning: '따르지 않습니다' },
        { text: '従(したが)ますか？', ruby: '시타가마스까?', meaning: '따릅니까?' },
        { text: '従(したが)ませんか？', ruby: '시타가마셍까?', meaning: '따르지 않습니까?' },
        { text: '従(したが)ました', ruby: '시타가마시타', meaning: '따랐습니다' },
        { text: '従(したが)ませんでした', ruby: '시타가마셍데시타', meaning: '따르지 않았습니다' },
        { text: '従(したが)ましたか？', ruby: '시타가마시타까?', meaning: '따랐습니까?' },
        { text: '従(したが)ませんでしたか？', ruby: '시타가마셍데시타까?', meaning: '따르지 않았습니까?' },
      ],
      casual: [
        { text: '従(したが)う', ruby: '시타가우', meaning: '따라' },
        { text: '従(したが)わない', ruby: '시타가와나이', meaning: '따르지 않아' },
        { text: '従(したが)う？', ruby: '시타가우?', meaning: '따라?' },
        { text: '従(したが)わない？', ruby: '시타가와나이?', meaning: '안 따라?' },
        { text: '従(したが)った', ruby: '시타갓타', meaning: '따랐어' },
        { text: '従(したが)わなかった', ruby: '시타가와나캇타', meaning: '따르지 않았어' },
        { text: '従(したが)った？', ruby: '시타갓타?', meaning: '따랐어?' },
        { text: '従(したが)わなかった？', ruby: '시타가와나캇타?', meaning: '따르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '규칙에 따라 행동해 주세요.',
        japanese: '規則(きそく)に従(したが)って行動(こうどう)してください。',
        plain:    '規則に従って行動してください。',
        reading:  '키소쿠니 시타갓테 코-도-시테쿠다사이.',
        pattern:  { name: '〜に従って', meaning: '~에 따라', note: '〜に従って: 「~에 따라서」규칙·지시 준수 표현.\n規則に従って行動してください에서 規則+に従って+行動.\n規則に従う는 규칙을 따르다.' },
        furigana: 'きそくにしたがってこうどうしてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '상사의 지시에 따르는 것이 기본이에요.',
        japanese: '上司(じょうし)の指示(しじ)に従(したが)うのが基本(きほん)です。',
        plain:    '上司の指示に従うのが基本です。',
        reading:  '죠-시노 시지니 시타가우노가 키홍데스.',
        pattern:  { name: '〜に従うのが基本', meaning: '~에 따르는 것이 기본이다', note: '〜に従うのが基本: 「~에 따르는 것이 기본이다」.\n上司の指示に従うのが基本です에서 従う+の+が+基本.\nの는 동명사화.' },
        furigana: 'じょうしのしじにしたがうのがきほんです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '자신의 마음에 따라 결정했어.',
        japanese: '自分(じぶん)の気持(きも)ちに従(したが)って決(き)めた。',
        plain:    '自分の気持ちに従って決めた。',
        reading:  '지붕노 키모치니 시타갓테 키메타.',
        pattern:  { name: '〜に従って決める', meaning: '~에 따라 결정하다', note: '〜に従って決める: 「~에 따라 결정하다」.\n自分の気持ちに従って決めた에서 気持ち+に従って+決めた.\n자신의 감정을 기준으로 결정함을 나타냄.' },
        furigana: 'じぶんのきもちにしたがってきめた',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 73위  乗る
   * ══════════════════════════════════════════════════ */
  {
    id: 'noru', rank: 73, verb: '乗る', reading: '노루', meaning: '타다 (교통수단)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '乗(の)ます', ruby: '노마스', meaning: '탑니다' },
        { text: '乗(の)ません', ruby: '노마셍', meaning: '타지 않습니다' },
        { text: '乗(の)ますか？', ruby: '노마스까?', meaning: '탑니까?' },
        { text: '乗(の)ませんか？', ruby: '노마셍까?', meaning: '타지 않습니까?' },
        { text: '乗(の)ました', ruby: '노마시타', meaning: '탔습니다' },
        { text: '乗(の)ませんでした', ruby: '노마셍데시타', meaning: '타지 않았습니다' },
        { text: '乗(の)ましたか？', ruby: '노마시타까?', meaning: '탔습니까?' },
        { text: '乗(の)ませんでしたか？', ruby: '노마셍데시타까?', meaning: '타지 않았습니까?' },
      ],
      casual: [
        { text: '乗(の)る', ruby: '노루', meaning: '타' },
        { text: '乗(の)らない', ruby: '노라나이', meaning: '타지 않아' },
        { text: '乗(の)る？', ruby: '노루?', meaning: '타?' },
        { text: '乗(の)らない？', ruby: '노라나이?', meaning: '안 타?' },
        { text: '乗(の)った', ruby: '놋타', meaning: '탔어' },
        { text: '乗(の)らなかった', ruby: '노라나캇타', meaning: '타지 않았어' },
        { text: '乗(の)った？', ruby: '놋타?', meaning: '탔어?' },
        { text: '乗(の)らなかった？', ruby: '노라나캇타?', meaning: '타지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 전철을 타고 출근해요.',
        japanese: '毎日(まいにち)電車(でんしゃ)に乗(の)って通勤(つうきん)しています。',
        plain:    '毎日電車に乗って通勤しています。',
        reading:  '마이니치 덴샤니 놋테 츠-킨시테이마스.',
        pattern:  { name: '〜に乗って', meaning: '~을 타고', note: '〜に乗って: 「~을 타고」수단+동작 표현.\n毎日電車に乗って通勤しています에서 電車+に+乗って+通勤.\nに乗る는 교통수단을 타다. で와 구별.' },
        furigana: 'まいにちでんしゃにのってつうきんしています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [1, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '자전거 타는 것을 좋아해요.',
        japanese: '自転車(じてんしゃ)に乗(の)るのが好(す)きです。',
        plain:    '自転車に乗るのが好きです。',
        reading:  '지텐샤니 노루노가 스키데스.',
        pattern:  { name: '〜に乗るのが好き', meaning: '~을 타는 것을 좋아하다', note: '〜に乗るのが好き: 「~을 타는 것을 좋아하다」.\n自転車に乗るのが好きです에서 乗る+のが+好き.\nの는 동명사화. 자전거 타기를 좋아한다는 표현.' },
        furigana: 'じてんしゃにのるのがすきです',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '비행기를 타는 건 처음이에요.',
        japanese: '飛行機(ひこうき)に乗(の)るのは初(はじ)めてです。',
        plain:    '飛行機に乗るのは初めてです。',
        reading:  '히코-키니 노루노와 하지메테데스.',
        pattern:  { name: '〜は初めてです', meaning: '~은 처음입니다', note: '〜は初めてです: 「~은 처음입니다」첫 경험 표현.\n飛行機に乗るのは初めてです에서 乗る+のは+初めてです.\nのは는 동명사화+주제 제시.' },
        furigana: 'ひこうきにのるのははじめてです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 74위  認める
   * ══════════════════════════════════════════════════ */
  {
    id: 'mitomeru', rank: 74, verb: '認める', reading: '미토메루', meaning: '인정하다; 허가하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '認(みと)ます', ruby: '미토마스', meaning: '인정합니다' },
        { text: '認(みと)ません', ruby: '미토마셍', meaning: '인정하지 않습니다' },
        { text: '認(みと)ますか？', ruby: '미토마스까?', meaning: '인정합니까?' },
        { text: '認(みと)ませんか？', ruby: '미토마셍까?', meaning: '인정하지 않습니까?' },
        { text: '認(みと)ました', ruby: '미토마시타', meaning: '인정했습니다' },
        { text: '認(みと)ませんでした', ruby: '미토마셍데시타', meaning: '인정하지 않았습니다' },
        { text: '認(みと)ましたか？', ruby: '미토마시타까?', meaning: '인정했습니까?' },
        { text: '認(みと)ませんでしたか？', ruby: '미토마셍데시타까?', meaning: '인정하지 않았습니까?' },
      ],
      casual: [
        { text: '認(みと)める', ruby: '미토메루', meaning: '인정해' },
        { text: '認(みと)めない', ruby: '미토메나이', meaning: '인정하지 않아' },
        { text: '認(みと)める？', ruby: '미토메루?', meaning: '인정해?' },
        { text: '認(みと)めない？', ruby: '미토메나이?', meaning: '안 인정해?' },
        { text: '認(みと)めた', ruby: '미토메타', meaning: '인정했어' },
        { text: '認(みと)めなかった', ruby: '미토메나캇타', meaning: '인정하지 않았어' },
        { text: '認(みと)めた？', ruby: '미토메타?', meaning: '인정했어?' },
        { text: '認(みと)めなかった？', ruby: '미토메나캇타?', meaning: '인정하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그의 재능을 인정하지 않을 수 없어.',
        japanese: '彼(かれ)の才能(さいのう)を認(みと)めざるを得(え)ない。',
        plain:    '彼の才能を認めざるを得ない。',
        reading:  '카레노 사이노-오 미토메자루오 에나이.',
        pattern:  { name: '〜ざるを得ない', meaning: '~하지 않을 수 없다', note: '〜ざるを得ない: 「~하지 않을 수 없다」의무 표현.\n彼の才能を認めざるを得ない에서 認め+ざるを得ない.\nざるを得ない=~하지 않을 수 없다. 格式的 표현.' },
        furigana: 'かれのさいのうをみとめざるをえない',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '실수를 솔직하게 인정하는 것이 중요해.',
        japanese: 'ミスを素直(すなお)に認(みと)めることが大切(たいせつ)だ。',
        plain:    'ミスを素直に認めることが大切だ。',
        reading:  '미스오 스나오니 미토메루코토가 타이세츠다.',
        pattern:  { name: '〜を素直に認める', meaning: '~을 솔직하게 인정하다', note: '〜を素直に認める: 「솔직하게 인정하다」.\nミスを素直に認めることが大切だ에서 認める+こと+が+大切.\n素直(솔직)+に+認める=솔직하게 인정.' },
        furigana: 'みすをすなおにみとめることがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '신청을 허가할지 검토 중이야.',
        japanese: '申請(しんせい)を認(みと)めるかどうか検討中(けんとうちゅう)です。',
        plain:    '申請を認めるかどうか検討中です。',
        reading:  '신세-오 미토메루카도-카 켄토-츄-데스.',
        pattern:  { name: '〜かどうか検討中', meaning: '~할지 어떨지 검토 중이다', note: '〜かどうか検討中: 「~할지 검토 중이다」.\n申請を認めるかどうか検討中です에서 認める+かどうか+検討中.\nかどうか는 「~할지 어떨지」.' },
        furigana: 'しんせいをみとめるかどうかけんとうちゅうです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 75위  答える
   * ══════════════════════════════════════════════════ */
  {
    id: 'kotaeru', rank: 75, verb: '答える', reading: '코타에루', meaning: '대답하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '答(こた)ます', ruby: '코타마스', meaning: '대답합니다' },
        { text: '答(こた)ません', ruby: '코타마셍', meaning: '대답하지 않습니다' },
        { text: '答(こた)ますか？', ruby: '코타마스까?', meaning: '대답합니까?' },
        { text: '答(こた)ませんか？', ruby: '코타마셍까?', meaning: '대답하지 않습니까?' },
        { text: '答(こた)ました', ruby: '코타마시타', meaning: '대답했습니다' },
        { text: '答(こた)ませんでした', ruby: '코타마셍데시타', meaning: '대답하지 않았습니다' },
        { text: '答(こた)ましたか？', ruby: '코타마시타까?', meaning: '대답했습니까?' },
        { text: '答(こた)ませんでしたか？', ruby: '코타마셍데시타까?', meaning: '대답하지 않았습니까?' },
      ],
      casual: [
        { text: '答(こた)える', ruby: '코타에루', meaning: '대답해' },
        { text: '答(こた)えない', ruby: '코타에나이', meaning: '대답하지 않아' },
        { text: '答(こた)える？', ruby: '코타에루?', meaning: '대답해?' },
        { text: '答(こた)えない？', ruby: '코타에나이?', meaning: '안 대답해?' },
        { text: '答(こた)えた', ruby: '코타에타', meaning: '대답했어' },
        { text: '答(こた)えなかった', ruby: '코타에나캇타', meaning: '대답하지 않았어' },
        { text: '答(こた)えた？', ruby: '코타에타?', meaning: '대답했어?' },
        { text: '答(こた)えなかった？', ruby: '코타에나캇타?', meaning: '대답하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님의 질문에 대답하지 못했어.',
        japanese: '先生(せんせい)の質問(しつもん)に答(こた)えられなかった。',
        plain:    '先生の質問に答えられなかった。',
        reading:  '센세-노 시츠몽니 코타에라레나캇타.',
        pattern:  { name: '〜に答えられない', meaning: '~에 대답할 수 없다', note: '〜に答えられない: 「~에 대답하지 못하다」부정 가능 표현.\n先生の質問に答えられなかった에서 答える→答えられなかった.\n答えられる(대답 가능)+なかった.' },
        furigana: 'せんせいのしつもんにこたえられなかった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 1, accent: [0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 5, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 6, mora_count: 1, accent: [0] },
        ],
      },
      {
        korean:   '기대에 부응하기 위해 열심히 하고 있어.',
        japanese: '期待(きたい)に答(こた)えるために頑張(がんば)っています。',
        plain:    '期待に答えるために頑張っています。',
        reading:  '키타이니 코타에루타메니 간밧테이마스.',
        pattern:  { name: '期待に答える', meaning: '기대에 부응하다', note: '期待に答える: 「기대에 부응하다」관용 표현.\n期待に答えるために頑張っています에서 期待+に+答える.\n期待に答える는 기대에 부응하다는 관용구.' },
        furigana: 'きたいにこたえるためにがんばっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '설문에 응해 주세요.',
        japanese: 'アンケートに答(こた)えてください。',
        plain:    'アンケートに答えてください。',
        reading:  '안케-토니 코타에테쿠다사이.',
        pattern:  { name: '〜に答えてください', meaning: '~에 응해 주세요', note: '〜に答えてください: 「~에 답해 주세요」의뢰 표현.\nアンケートに答えてください에서 答えて+ください.\nアンケートに答える는 설문에 응하다.' },
        furigana: 'あんけーとにこたえてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 76위  終わる
   * ══════════════════════════════════════════════════ */
  {
    id: 'owaru', rank: 76, verb: '終わる', reading: '오와루', meaning: '끝나다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '終(お)ます', ruby: '오마스', meaning: '끝납니다' },
        { text: '終(お)ません', ruby: '오마셍', meaning: '끝나지 않습니다' },
        { text: '終(お)ますか？', ruby: '오마스까?', meaning: '끝납니까?' },
        { text: '終(お)ませんか？', ruby: '오마셍까?', meaning: '끝나지 않습니까?' },
        { text: '終(お)ました', ruby: '오마시타', meaning: '끝났습니다' },
        { text: '終(お)ませんでした', ruby: '오마셍데시타', meaning: '끝나지 않았습니다' },
        { text: '終(お)ましたか？', ruby: '오마시타까?', meaning: '끝났습니까?' },
        { text: '終(お)ませんでしたか？', ruby: '오마셍데시타까?', meaning: '끝나지 않았습니까?' },
      ],
      casual: [
        { text: '終(お)わる', ruby: '오와루', meaning: '끝나' },
        { text: '終(お)わらない', ruby: '오와라나이', meaning: '끝나지 않아' },
        { text: '終(お)わる？', ruby: '오와루?', meaning: '끝나?' },
        { text: '終(お)わらない？', ruby: '오와라나이?', meaning: '안 끝나?' },
        { text: '終(お)わった', ruby: '오왓타', meaning: '끝났어' },
        { text: '終(お)わらなかった', ruby: '오와라나캇타', meaning: '끝나지 않았어' },
        { text: '終(お)わった？', ruby: '오왓타?', meaning: '끝났어?' },
        { text: '終(お)わらなかった？', ruby: '오와라나캇타?', meaning: '끝나지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '회의가 예정대로 끝났어.',
        japanese: '会議(かいぎ)が予定(よてい)通(どお)りに終(お)わった。',
        plain:    '会議が予定通りに終わった。',
        reading:  '카이기가 요테-도-리니 오왓타.',
        pattern:  { name: '予定通りに終わる', meaning: '예정대로 끝나다', note: '予定通りに終わる: 「예정대로 끝나다」.\n会議が予定通りに終わった에서 予定通り+に+終わった.\n通り는 「~대로」를 나타냄.' },
        furigana: 'かいぎがよていどおりにおわった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 0, 0] },
        ],
      },
      {
        korean:   '숙제 끝나면 놀아도 돼.',
        japanese: '宿題(しゅくだい)が終(お)わったら遊(あそ)んでいいよ。',
        plain:    '宿題が終わったら遊んでいいよ。',
        reading:  '슈쿠다이가 오왓타라 아손데이이요.',
        pattern:  { name: '〜たら〜ていい', meaning: '~하면 ~해도 좋다', note: '〜たら〜ていい: 「~하면 ~해도 된다」조건+허가.\n宿題が終わったら遊んでいいよ에서 終わった+ら+遊んでいいよ.\nたら로 조건 제시, ていいよ로 허가.' },
        furigana: 'しゅくだいがおわったらあそんでいいよ',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 영화는 어떤 결말로 끝날까.',
        japanese: 'この映画(えいが)はどんな結末(けつまつ)で終(お)わるのか。',
        plain:    'この映画はどんな結末で終わるのか。',
        reading:  '코노 에-가와 돈나 케츠마츠데 오와루노카.',
        pattern:  { name: 'どんな〜で終わるのか', meaning: '어떤 ~으로 끝나는가', note: 'どんな〜で終わるのか: 「어떻게 끝나는지」결말 궁금 표현.\nこの映画はどんな結末で終わるのか에서 どんな結末+で+終わる.\nのか는 의문·궁금함을 나타냄.' },
        furigana: 'このえいがはどんなけつまつでおわるのか',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 77위  開く
   * ══════════════════════════════════════════════════ */
  {
    id: 'hiraku', rank: 77, verb: '開く', reading: '히라쿠', meaning: '열다; 개최하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '開(ひら)ます', ruby: '히라마스', meaning: '엽니다' },
        { text: '開(ひら)ません', ruby: '히라마셍', meaning: '열지 않습니다' },
        { text: '開(ひら)ますか？', ruby: '히라마스까?', meaning: '엽니까?' },
        { text: '開(ひら)ませんか？', ruby: '히라마셍까?', meaning: '열지 않습니까?' },
        { text: '開(ひら)ました', ruby: '히라마시타', meaning: '열었습니다' },
        { text: '開(ひら)ませんでした', ruby: '히라마셍데시타', meaning: '열지 않았습니다' },
        { text: '開(ひら)ましたか？', ruby: '히라마시타까?', meaning: '열었습니까?' },
        { text: '開(ひら)ませんでしたか？', ruby: '히라마셍데시타까?', meaning: '열지 않았습니까?' },
      ],
      casual: [
        { text: '開(ひら)く', ruby: '히라쿠', meaning: '열어' },
        { text: '開(ひら)かない', ruby: '히라카나이', meaning: '열지 않아' },
        { text: '開(ひら)く？', ruby: '히라쿠?', meaning: '열어?' },
        { text: '開(ひら)かない？', ruby: '히라카나이?', meaning: '안 열어?' },
        { text: '開(ひら)いた', ruby: '히라이타', meaning: '열었어' },
        { text: '開(ひら)かなかった', ruby: '히라카나캇타', meaning: '열지 않았어' },
        { text: '開(ひら)いた？', ruby: '히라이타?', meaning: '열었어?' },
        { text: '開(ひら)かなかった？', ruby: '히라카나캇타?', meaning: '열지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '새 레스토랑이 다음 달 열 예정이에요.',
        japanese: '新(あたら)しいレストランが来月(らいげつ)開(ひら)く予定(よてい)です。',
        plain:    '新しいレストランが来月開く予定です。',
        reading:  '아타라시이 레스토랑가 라이게츠 히라쿠 요테-데스.',
        pattern:  { name: '〜が〜開く予定', meaning: '~이 ~에 열 예정이다', note: '〜が〜開く予定: 「~이 ~에 열릴 예정이다」예정 표현.\n新しいレストランが来月開く予定です에서 開く+予定です.\n来月が時期, 新しいレストランが主語.' },
        furigana: 'あたらしいれすとらんがらいげつひらくよていです',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 1, 0, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '문을 열고 안에 들어갔어.',
        japanese: 'ドアを開(ひら)けて中(なか)に入(はい)った。',
        plain:    'ドアを開けて中に入った。',
        reading:  '도아오 히라케테 나카니 하잇타.',
        pattern:  { name: '〜を開けて〜に入る', meaning: '~을 열고 ~에 들어가다', note: '〜を開けて〜に入る: 「~을 열고 ~에 들어가다」순서 표현.\nドアを開けて中に入った에서 開けて+入った.\n開ける(타동사, 열다)와 開く(자동사, 열리다) 구별.' },
        furigana: 'どあをひらけてなかにはいった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '이벤트를 개최하기 위한 준비를 하고 있어.',
        japanese: 'イベントを開(ひら)くための準備(じゅんび)をしている。',
        plain:    'イベントを開くための準備をしている。',
        reading:  '이벤토오 히라쿠타메노 쥰비오 시테이루.',
        pattern:  { name: '〜を開くための準備', meaning: '~을 개최하기 위한 준비', note: '〜を開くための準備: 「~을 개최하기 위한 준비」.\nイベントを開くための準備をしている에서 開く+ための+準備.\nための는 목적을 나타내는 연체형.' },
        furigana: 'いべんとをひらくためのじゅんびをしている',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [1, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 78위  含む
   * ══════════════════════════════════════════════════ */
  {
    id: 'fukumu', rank: 78, verb: '含む', reading: '후쿠무', meaning: '포함하다; 담다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '含(ふく)ます', ruby: '후쿠마스', meaning: '포함합니다' },
        { text: '含(ふく)ません', ruby: '후쿠마셍', meaning: '포함하지 않습니다' },
        { text: '含(ふく)ますか？', ruby: '후쿠마스까?', meaning: '포함합니까?' },
        { text: '含(ふく)ませんか？', ruby: '후쿠마셍까?', meaning: '포함하지 않습니까?' },
        { text: '含(ふく)ました', ruby: '후쿠마시타', meaning: '포함했습니다' },
        { text: '含(ふく)ませんでした', ruby: '후쿠마셍데시타', meaning: '포함하지 않았습니다' },
        { text: '含(ふく)ましたか？', ruby: '후쿠마시타까?', meaning: '포함했습니까?' },
        { text: '含(ふく)ませんでしたか？', ruby: '후쿠마셍데시타까?', meaning: '포함하지 않았습니까?' },
      ],
      casual: [
        { text: '含(ふく)む', ruby: '후쿠무', meaning: '포함해' },
        { text: '含(ふく)まない', ruby: '후쿠마나이', meaning: '포함하지 않아' },
        { text: '含(ふく)む？', ruby: '후쿠무?', meaning: '포함해?' },
        { text: '含(ふく)まない？', ruby: '후쿠마나이?', meaning: '안 포함해?' },
        { text: '含(ふく)んだ', ruby: '후쿤다', meaning: '포함했어' },
        { text: '含(ふく)まなかった', ruby: '후쿠마나캇타', meaning: '포함하지 않았어' },
        { text: '含(ふく)んだ？', ruby: '후쿤다?', meaning: '포함했어?' },
        { text: '含(ふく)まなかった？', ruby: '후쿠마나캇타?', meaning: '포함하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 요금에는 세금이 포함되어 있습니다.',
        japanese: 'この料金(りょうきん)には税金(ぜいきん)が含(ふく)まれています。',
        plain:    'この料金には税金が含まれています。',
        reading:  '코노 료-킹니와 제-킹가 후쿠마레테이마스.',
        pattern:  { name: '〜には〜が含まれる', meaning: '~에는 ~이 포함되어 있다', note: '〜には〜が含まれる: 「~에는 ~이 포함되다」자동사 표현.\nこの料金には税金が含まれています에서 含まれて+います.\n含む(타동사)의 수동형=含まれる.' },
        furigana: 'このりょうきんにはぜいきんがふくまれています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 4, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '플랜에 식사가 포함되어 있어.',
        japanese: 'プランには食事(しょくじ)が含(ふく)まれている。',
        plain:    'プランには食事が含まれている。',
        reading:  '푸란니와 쇼쿠지가 후쿠마레테이루.',
        pattern:  { name: '〜に〜が含まれている', meaning: '~에 ~이 포함되어 있다', note: '〜に〜が含まれている: 「~에 ~이 포함되어 있다」상태 표현.\nプランには食事が含まれている에서 含まれて+いる.\n포함 상태의 지속을 나타냄.' },
        furigana: 'ぷらんにはしょくじがふくまれている',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 1, accent: [1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 1, accent: [0] },
          { phrase_id: 4, mora_count: 1, accent: [0] },
          { phrase_id: 5, mora_count: 1, accent: [1] },
          { phrase_id: 6, mora_count: 1, accent: [0] },
          { phrase_id: 7, mora_count: 1, accent: [0] },
          { phrase_id: 8, mora_count: 1, accent: [0] },
          { phrase_id: 9, mora_count: 1, accent: [0] },
        ],
      },
      {
        korean:   '보고서에는 모든 정보를 포함해 주세요.',
        japanese: '報告書(ほうこくしょ)にはすべての情報(じょうほう)を含(ふく)めてください。',
        plain:    '報告書にはすべての情報を含めてください。',
        reading:  '호-코쿠쇼니와 스베테노 죠-호-오 후쿠메테쿠다사이.',
        pattern:  { name: '〜を含めてください', meaning: '~을 포함해 주세요', note: '〜を含めてください: 「~을 포함시켜 주세요」의뢰 표현.\n報告書にはすべての情報を含めてください에서 含めて+ください.\n含める는 「포함시키다」타동사.' },
        furigana: 'ほうこくしょにはすべてのじょうほうをふくめてください',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 3, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 79위  会う
   * ══════════════════════════════════════════════════ */
  {
    id: 'au', rank: 79, verb: '会う', reading: '아우', meaning: '만나다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '会(あ)ます', ruby: '아마스', meaning: '만납니다' },
        { text: '会(あ)ません', ruby: '아마셍', meaning: '만나지 않습니다' },
        { text: '会(あ)ますか？', ruby: '아마스까?', meaning: '만납니까?' },
        { text: '会(あ)ませんか？', ruby: '아마셍까?', meaning: '만나지 않습니까?' },
        { text: '会(あ)ました', ruby: '아마시타', meaning: '만났습니다' },
        { text: '会(あ)ませんでした', ruby: '아마셍데시타', meaning: '만나지 않았습니다' },
        { text: '会(あ)ましたか？', ruby: '아마시타까?', meaning: '만났습니까?' },
        { text: '会(あ)ませんでしたか？', ruby: '아마셍데시타까?', meaning: '만나지 않았습니까?' },
      ],
      casual: [
        { text: '会(あ)う', ruby: '아우', meaning: '만나' },
        { text: '会(あ)わない', ruby: '아와나이', meaning: '만나지 않아' },
        { text: '会(あ)う？', ruby: '아우?', meaning: '만나?' },
        { text: '会(あ)わない？', ruby: '아와나이?', meaning: '안 만나?' },
        { text: '会(あ)った', ruby: '앗타', meaning: '만났어' },
        { text: '会(あ)わなかった', ruby: '아와나캇타', meaning: '만나지 않았어' },
        { text: '会(あ)った？', ruby: '앗타?', meaning: '만났어?' },
        { text: '会(あ)わなかった？', ruby: '아와나캇타?', meaning: '만나지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '오랜만에 친구를 만났어.',
        japanese: '久(ひさ)しぶりに友達(ともだち)に会(あ)った。',
        plain:    '久しぶりに友達に会った。',
        reading:  '히사시부리니 토모다치니 앗타.',
        pattern:  { name: '久しぶりに〜に会う', meaning: '오랜만에 ~을 만나다', note: '久しぶりに〜に会う: 「오랜만에 ~을 만나다」표현.\n久しぶりに友達に会った에서 久しぶり+に+会った.\n久しぶり는 「오랜만에」.' },
        furigana: 'ひさしぶりにともだちにあった',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
      {
        korean:   '내일 오후에 만나요.',
        japanese: '明日(あした)の午後(ごご)に会(あ)いましょう。',
        plain:    '明日の午後に会いましょう。',
        reading:  '아시타노 고고니 아이마쇼-.',
        pattern:  { name: '〜に会いましょう', meaning: '~에 만납시다', note: '〜に会いましょう: 「~에 만납시다」제안 표현.\n明日の午後に会いましょう에서 会い+ましょう.\n시간(明日の午後)+に+会いましょう.' },
        furigana: 'あしたのごごにあいましょう',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '우연히 역에서 옛 동료를 만났어.',
        japanese: '偶然(ぐうぜん)、駅(えき)で昔(むかし)の同僚(どうりょう)に会(あ)った。',
        plain:    '偶然、駅で昔の同僚に会った。',
        reading:  '구-젠, 에키데 무카시노 도-료-니 앗타.',
        pattern:  { name: '偶然〜に会う', meaning: '우연히 ~을 만나다', note: '偶然〜に会う: 「우연히 ~을 만나다」표현.\n偶然、駅で昔の同僚に会った에서 偶然(우연히)+会った.\n偶然는 「우연히」. 예상치 못한 만남.' },
        furigana: 'ぐうぜん、えきでむかしのどうりょうにあった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 80위  戻る
   * ══════════════════════════════════════════════════ */
  {
    id: 'modoru', rank: 80, verb: '戻る', reading: '모도루', meaning: '돌아오다; 돌아가다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '戻(もど)ます', ruby: '모도마스', meaning: '돌아옵니다' },
        { text: '戻(もど)ません', ruby: '모도마셍', meaning: '돌아오지 않습니다' },
        { text: '戻(もど)ますか？', ruby: '모도마스까?', meaning: '돌아옵니까?' },
        { text: '戻(もど)ませんか？', ruby: '모도마셍까?', meaning: '돌아오지 않습니까?' },
        { text: '戻(もど)ました', ruby: '모도마시타', meaning: '돌아왔습니다' },
        { text: '戻(もど)ませんでした', ruby: '모도마셍데시타', meaning: '돌아오지 않았습니다' },
        { text: '戻(もど)ましたか？', ruby: '모도마시타까?', meaning: '돌아왔습니까?' },
        { text: '戻(もど)ませんでしたか？', ruby: '모도마셍데시타까?', meaning: '돌아오지 않았습니까?' },
      ],
      casual: [
        { text: '戻(もど)る', ruby: '모도루', meaning: '돌아와' },
        { text: '戻(もど)らない', ruby: '모도라나이', meaning: '돌아오지 않아' },
        { text: '戻(もど)る？', ruby: '모도루?', meaning: '돌아와?' },
        { text: '戻(もど)らない？', ruby: '모도라나이?', meaning: '안 돌아와?' },
        { text: '戻(もど)った', ruby: '모돗타', meaning: '돌아왔어' },
        { text: '戻(もど)らなかった', ruby: '모도라나캇타', meaning: '돌아오지 않았어' },
        { text: '戻(もど)った？', ruby: '모돗타?', meaning: '돌아왔어?' },
        { text: '戻(もど)らなかった？', ruby: '모도라나캇타?', meaning: '돌아오지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '출장에서 돌아오면 바로 연락할게요.',
        japanese: '出張(しゅっちょう)から戻(もど)ったらすぐ連絡(れんらく)します。',
        plain:    '出張から戻ったらすぐ連絡します。',
        reading:  '슛쵸-카라 모돗타라 스구 렌라쿠시마스.',
        pattern:  { name: '〜から戻ったら', meaning: '~에서 돌아오면', note: '〜から戻ったら: 「~에서 돌아오면」조건 표현.\n出張から戻ったらすぐ連絡します에서 戻った+ら+連絡.\n出張(출장)+から+戻る=출장에서 돌아오다.' },
        furigana: 'しゅっちょうからもどったらすぐれんらくします',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '잊어버린 물건이 있어서 집에 돌아갔어.',
        japanese: '忘(わす)れ物(もの)をしたので家(いえ)に戻(もど)った。',
        plain:    '忘れ物をしたので家に戻った。',
        reading:  '와스레모노오 시타노데 이에니 모돗타.',
        pattern:  { name: '〜ので〜に戻る', meaning: '~이므로 ~으로 돌아가다', note: '〜ので〜に戻る: 「~이므로 ~으로 돌아가다」이유+행동.\n忘れ物をしたので家に戻った에서 したの+で+戻った.\nので는 객관적 이유를 나타냄.' },
        furigana: 'わすれものをしたのでいえにもどった',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '본론으로 돌아갑시다.',
        japanese: '話(はなし)を元(もと)に戻(もど)しましょう。',
        plain:    '話を元に戻しましょう。',
        reading:  '하나시오 모토니 모도시마쇼-.',
        pattern:  { name: '〜を元に戻す', meaning: '~을 원래로 되돌리다', note: '〜を元に戻す: 「~을 원상태로 되돌리다」.\n話を元に戻しましょう에서 元+に+戻しましょう.\n元に戻す는 원점으로 되돌리다는 표현.' },
        furigana: 'はなしをもとにもどしましょう',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 81위  歩く
   * ══════════════════════════════════════════════════ */
  {
    id: 'aruku', rank: 81, verb: '歩く', reading: '아루쿠', meaning: '걷다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '歩(ある)ます', ruby: '아루마스', meaning: '걷습니다' },
        { text: '歩(ある)ません', ruby: '아루마셍', meaning: '걷지 않습니다' },
        { text: '歩(ある)ますか？', ruby: '아루마스까?', meaning: '걷습니까?' },
        { text: '歩(ある)ませんか？', ruby: '아루마셍까?', meaning: '걷지 않습니까?' },
        { text: '歩(ある)ました', ruby: '아루마시타', meaning: '걸었습니다' },
        { text: '歩(ある)ませんでした', ruby: '아루마셍데시타', meaning: '걷지 않았습니다' },
        { text: '歩(ある)ましたか？', ruby: '아루마시타까?', meaning: '걸었습니까?' },
        { text: '歩(ある)ませんでしたか？', ruby: '아루마셍데시타까?', meaning: '걷지 않았습니까?' },
      ],
      casual: [
        { text: '歩(ある)く', ruby: '아루쿠', meaning: '걸어' },
        { text: '歩(ある)かない', ruby: '아루카나이', meaning: '걷지 않아' },
        { text: '歩(ある)く？', ruby: '아루쿠?', meaning: '걸어?' },
        { text: '歩(ある)かない？', ruby: '아루카나이?', meaning: '안 걸어?' },
        { text: '歩(ある)いた', ruby: '아루이타', meaning: '걸었어' },
        { text: '歩(ある)かなかった', ruby: '아루카나캇타', meaning: '걷지 않았어' },
        { text: '歩(ある)いた？', ruby: '아루이타?', meaning: '걸었어?' },
        { text: '歩(ある)かなかった？', ruby: '아루카나캇타?', meaning: '걷지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 아침 30분 걷도록 하고 있어요.',
        japanese: '毎朝(まいあさ)三十分(さんじゅっぷん)歩(ある)くようにしています。',
        plain:    '毎朝三十分歩くようにしています。',
        reading:  '마이아사 산쥿풍 아루쿠요-니 시테이마스.',
        pattern:  { name: '〜ようにしている', meaning: '~하도록 하고 있다', note: '〜ようにしている: 「~하도록 하고 있다」의지적 습관.\n毎朝三十分歩くようにしています에서 歩く+ようにしています.\nようにする는 습관·노력을 나타냄.' },
        furigana: 'まいあささんじゅっぷんあるくようにしています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 3, mora_count: 6, accent: [0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '역까지 걸어서 10분 걸려요.',
        japanese: '駅(えき)まで歩(ある)いて十分(じゅっぷん)かかります。',
        plain:    '駅まで歩いて十分かかります。',
        reading:  '에키마데 아루이테 쥿풍 카카리마스.',
        pattern:  { name: '〜て〜かかる', meaning: '~해서 ~걸리다', note: '〜て〜かかる: 「~해서 ~이 걸리다」수단+소요 표현.\n駅まで歩いて十分かかります에서 歩いて+十分+かかります.\nかかる는 시간이 걸리다.' },
        furigana: 'えきまであるいてじゅっぷんかかります',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '공원을 산책 삼아 걸었어.',
        japanese: '公園(こうえん)を散歩(さんぽ)がてら歩(ある)いた。',
        plain:    '公園を散歩がてら歩いた。',
        reading:  '코-엔오 산포가테라 아루이타.',
        pattern:  { name: '〜がてら', meaning: '~하는 김에', note: '〜がてら: 「~하는 김에」기회 삼아 하는 행동.\n公園を散歩がてら歩いた에서 散歩+がてら+歩いた.\nがてら는 ~하는 김에·겸해서.' },
        furigana: 'こうえんをさんぽがてらあるいた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 82위  当たる
   * ══════════════════════════════════════════════════ */
  {
    id: 'ataru', rank: 82, verb: '当たる', reading: '아타루', meaning: '맞다; 해당하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '当(あた)ます', ruby: '아타마스', meaning: '맞습니다' },
        { text: '当(あた)ません', ruby: '아타마셍', meaning: '맞지 않습니다' },
        { text: '当(あた)ますか？', ruby: '아타마스까?', meaning: '맞습니까?' },
        { text: '当(あた)ませんか？', ruby: '아타마셍까?', meaning: '맞지 않습니까?' },
        { text: '当(あた)ました', ruby: '아타마시타', meaning: '맞았습니다' },
        { text: '当(あた)ませんでした', ruby: '아타마셍데시타', meaning: '맞지 않았습니다' },
        { text: '当(あた)ましたか？', ruby: '아타마시타까?', meaning: '맞았습니까?' },
        { text: '当(あた)ませんでしたか？', ruby: '아타마셍데시타까?', meaning: '맞지 않았습니까?' },
      ],
      casual: [
        { text: '当(あた)る', ruby: '아타루', meaning: '맞아' },
        { text: '当(あた)らない', ruby: '아타라나이', meaning: '맞지 않아' },
        { text: '当(あた)る？', ruby: '아타루?', meaning: '맞아?' },
        { text: '当(あた)らない？', ruby: '아타라나이?', meaning: '안 맞아?' },
        { text: '当(あた)った', ruby: '아탓타', meaning: '맞았어' },
        { text: '当(あた)らなかった', ruby: '아타라나캇타', meaning: '맞지 않았어' },
        { text: '当(あた)った？', ruby: '아탓타?', meaning: '맞았어?' },
        { text: '当(あた)らなかった？', ruby: '아타라나캇타?', meaning: '맞지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '복권이 당첨되면 여행 가고 싶어.',
        japanese: '宝(たから)くじが当(あた)たったら旅行(りょこう)に行(い)きたい。',
        plain:    '宝くじが当たったら旅行に行きたい。',
        reading:  '타카라쿠지가 아탓타라 료코-니 이키타이.',
        pattern:  { name: '〜たら〜たい', meaning: '~되면 ~하고 싶다', note: '〜たら〜たい: 「~하면 ~하고 싶다」조건+희망.\n宝くじが当たったら旅行に行きたい에서 当たった+ら+行きたい.\n실현 가능성이 있는 가정+희망.' },
        furigana: 'たからくじがあたったらりょこうにいきたい',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 문제는 시험에 나올 가능성이 높아.',
        japanese: 'この問題(もんだい)は試験(しけん)に当(あた)る可能性(かのうせい)が高(たか)い。',
        plain:    'この問題は試験に当たる可能性が高い。',
        reading:  '코노 몬다이와 시켄니 아타루 카노-세-가 타카이.',
        pattern:  { name: '〜に当たる可能性が高い', meaning: '~에 해당할 가능성이 높다', note: '〜に当たる可能性が高い: 「~에 나올 가능성이 높다」.\nこの問題は試験に当たる可能性が高い에서 当たる+可能性が高い.\n当たる는 맞다·적중하다.' },
        furigana: 'このもんだいはしけんにあたるかのうせいがたかい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '그의 예측이 딱 맞았어.',
        japanese: '彼(かれ)の予測(よそく)がぴったり当(あた)たった。',
        plain:    '彼の予測がぴったり当たった。',
        reading:  '카레노 요소쿠가 핏타리 아탓타.',
        pattern:  { name: 'ぴったり当たる', meaning: '딱 맞다', note: 'ぴったり当たる: 「딱 맞다·정확히 적중하다」표현.\n彼の予測がぴったり当たった에서 ぴったり+当たった.\nぴったり는 「딱·정확히」를 나타내는 부사.' },
        furigana: 'かれのよそくがぴったりあたった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 83위  図る
   * ══════════════════════════════════════════════════ */
  {
    id: 'hakaru', rank: 83, verb: '図る', reading: '하카루', meaning: '꾀하다; 도모하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '図(はか)ます', ruby: '하카마스', meaning: '꾀합니다' },
        { text: '図(はか)ません', ruby: '하카마셍', meaning: '꾀하지 않습니다' },
        { text: '図(はか)ますか？', ruby: '하카마스까?', meaning: '꾀합니까?' },
        { text: '図(はか)ませんか？', ruby: '하카마셍까?', meaning: '꾀하지 않습니까?' },
        { text: '図(はか)ました', ruby: '하카마시타', meaning: '꾀했습니다' },
        { text: '図(はか)ませんでした', ruby: '하카마셍데시타', meaning: '꾀하지 않았습니다' },
        { text: '図(はか)ましたか？', ruby: '하카마시타까?', meaning: '꾀했습니까?' },
        { text: '図(はか)ませんでしたか？', ruby: '하카마셍데시타까?', meaning: '꾀하지 않았습니까?' },
      ],
      casual: [
        { text: '図(はか)る', ruby: '하카루', meaning: '꾀해' },
        { text: '図(はか)らない', ruby: '하카라나이', meaning: '꾀하지 않아' },
        { text: '図(はか)る？', ruby: '하카루?', meaning: '꾀해?' },
        { text: '図(はか)らない？', ruby: '하카라나이?', meaning: '안 꾀해?' },
        { text: '図(はか)った', ruby: '하캇타', meaning: '꾀했어' },
        { text: '図(はか)らなかった', ruby: '하카라나캇타', meaning: '꾀하지 않았어' },
        { text: '図(はか)った？', ruby: '하캇타?', meaning: '꾀했어?' },
        { text: '図(はか)らなかった？', ruby: '하카라나캇타?', meaning: '꾀하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '효율화를 꾀하기 위해 새로운 방법을 시도했어.',
        japanese: '効率化(こうりつか)を図(はか)るために新(あたら)しい方法(ほうほう)を試(ため)した。',
        plain:    '効率化を図るために新しい方法を試した。',
        reading:  '코-리츠카오 하카루타메니 아타라시이 호-호-오 타메시타.',
        pattern:  { name: '〜を図るために', meaning: '~을 꾀하기 위해', note: '〜を図るために: 「~을 도모하기 위해」목적 표현.\n効率化を図るために新しい方法を試した에서 図る+ために.\n図る는 목표 달성을 위해 노력하다.' },
        furigana: 'こうりつかをはかるためにあたらしいほうほうをためした',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '문제 해결을 도모하고 있어요.',
        japanese: '問題(もんだい)の解決(かいけつ)を図(はか)っています。',
        plain:    '問題の解決を図っています。',
        reading:  '몬다이노 카이케츠오 하캇테이마스.',
        pattern:  { name: '〜を図っている', meaning: '~을 도모하고 있다', note: '〜を図っている: 「~을 추진하고 있다」진행 표현.\n問題の解決を図っています에서 図って+います.\n해결을 추진 중인 상태.' },
        furigana: 'もんだいのかいけつをはかっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 1, accent: [0] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '양쪽의 이익을 도모하는 제안을 했어.',
        japanese: '双方(そうほう)の利益(りえき)を図(はか)る提案(ていあん)をした。',
        plain:    '双方の利益を図る提案をした。',
        reading:  '소-호-노 리에키오 하카루 테이안오 시타.',
        pattern:  { name: '〜を図る提案', meaning: '~을 도모하는 제안', note: '〜を図る提案: 「~을 도모하는 제안」연체수식.\n双方の利益を図る提案をした에서 図る+提案.\n図る가 제안을 수식하는 연체형.' },
        furigana: 'そうほうのりえきをはかるていあんをした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 84위  向かう
   * ══════════════════════════════════════════════════ */
  {
    id: 'mukau', rank: 84, verb: '向かう', reading: '무카우', meaning: '향하다; 마주하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '向(む)ます', ruby: '무마스', meaning: '향합니다' },
        { text: '向(む)ません', ruby: '무마셍', meaning: '향하지 않습니다' },
        { text: '向(む)ますか？', ruby: '무마스까?', meaning: '향합니까?' },
        { text: '向(む)ませんか？', ruby: '무마셍까?', meaning: '향하지 않습니까?' },
        { text: '向(む)ました', ruby: '무마시타', meaning: '향했습니다' },
        { text: '向(む)ませんでした', ruby: '무마셍데시타', meaning: '향하지 않았습니다' },
        { text: '向(む)ましたか？', ruby: '무마시타까?', meaning: '향했습니까?' },
        { text: '向(む)ませんでしたか？', ruby: '무마셍데시타까?', meaning: '향하지 않았습니까?' },
      ],
      casual: [
        { text: '向(む)かう', ruby: '무카우', meaning: '향해' },
        { text: '向(む)かわない', ruby: '무카와나이', meaning: '향하지 않아' },
        { text: '向(む)かう？', ruby: '무카우?', meaning: '향해?' },
        { text: '向(む)かわない？', ruby: '무카와나이?', meaning: '안 향해?' },
        { text: '向(む)かった', ruby: '무캇타', meaning: '향했어' },
        { text: '向(む)かわなかった', ruby: '무카와나캇타', meaning: '향하지 않았어' },
        { text: '向(む)かった？', ruby: '무캇타?', meaning: '향했어?' },
        { text: '向(む)かわなかった？', ruby: '무카와나캇타?', meaning: '향하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '역으로 향하던 중에 비가 내리기 시작했어.',
        japanese: '駅(えき)に向(む)かう途中(とちゅう)で雨(あめ)が降(ふ)り出(だ)した。',
        plain:    '駅に向かう途中で雨が降り出した。',
        reading:  '에키니 무카우 토추-데 아메가 후리다시타.',
        pattern:  { name: '〜に向かう途中で', meaning: '~로 향하는 도중에', note: '〜に向かう途中で: 「~으로 향하는 도중에」표현.\n駅に向かう途中で雨が降り出した에서 向かう途中+で+降り出した.\n途中で는 「도중에」.' },
        furigana: 'えきにむかうとちゅうであめがふりだした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '어려움에 맞서는 자세가 중요해.',
        japanese: '困難(こんなん)に向(む)かって立(た)ち向(む)かう姿勢(しせい)が大切(たいせつ)だ。',
        plain:    '困難に向かって立ち向かう姿勢が大切だ。',
        reading:  '콘난니 무캇테 타치무카우 시세-가 타이세츠다.',
        pattern:  { name: '〜に向かって立ち向かう', meaning: '~에 맞서다', note: '〜に向かって立ち向かう: 「~에 맞서다」강한 의지 표현.\n困難に向かって立ち向かう姿勢が大切だ에서 向かって+立ち向かう.\n立ち向かう는 맞서다.' },
        furigana: 'こんなんにむかってたちむかうしせいがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
      {
        korean:   '목표를 향해 한 걸음씩 나아가자.',
        japanese: '目標(もくひょう)に向(む)かって一歩(いっぽ)一歩(いっぽ)進(すす)もう。',
        plain:    '目標に向かって一歩一歩進もう。',
        reading:  '모쿠효-니 무캇테 잇포 잇포 스슨모-.',
        pattern:  { name: '〜に向かって進む', meaning: '~을 향해 나아가다', note: '〜に向かって進む: 「~을 향해 나아가다」방향+이동.\n目標に向かって一歩一歩進もう에서 向かって+進もう.\n進もう는 進む의 의지형.' },
        furigana: 'もくひょうにむかっていっぽいっぽすすもう',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 85위  見せる
   * ══════════════════════════════════════════════════ */
  {
    id: 'miseru', rank: 85, verb: '見せる', reading: '미세루', meaning: '보여주다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '見(み)ます', ruby: '미마스', meaning: '보여줍니다' },
        { text: '見(み)ません', ruby: '미마셍', meaning: '보여주지 않습니다' },
        { text: '見(み)ますか？', ruby: '미마스까?', meaning: '보여줍니까?' },
        { text: '見(み)ませんか？', ruby: '미마셍까?', meaning: '보여주지 않습니까?' },
        { text: '見(み)ました', ruby: '미마시타', meaning: '보여줬습니다' },
        { text: '見(み)ませんでした', ruby: '미마셍데시타', meaning: '보여주지 않았습니다' },
        { text: '見(み)ましたか？', ruby: '미마시타까?', meaning: '보여줬습니까?' },
        { text: '見(み)ませんでしたか？', ruby: '미마셍데시타까?', meaning: '보여주지 않았습니까?' },
      ],
      casual: [
        { text: '見(み)せる', ruby: '미세루', meaning: '보여줘' },
        { text: '見(み)せない', ruby: '미세나이', meaning: '보여주지 않아' },
        { text: '見(み)せる？', ruby: '미세루?', meaning: '보여줘?' },
        { text: '見(み)せない？', ruby: '미세나이?', meaning: '안 보여줘?' },
        { text: '見(み)せた', ruby: '미세타', meaning: '보여줬어' },
        { text: '見(み)せなかった', ruby: '미세나캇타', meaning: '보여주지 않았어' },
        { text: '見(み)せた？', ruby: '미세타?', meaning: '보여줬어?' },
        { text: '見(み)せなかった？', ruby: '미세나캇타?', meaning: '보여주지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '친구에게 새 스마트폰을 보여줬어.',
        japanese: '友達(ともだち)に新(あたら)しいスマホを見(み)せた。',
        plain:    '友達に新しいスマホを見せた。',
        reading:  '토모다치니 아타라시이 스마호오 미세타.',
        pattern:  { name: '〜に〜を見せる', meaning: '~에게 ~을 보여주다', note: '〜に〜を見せる: 「~에게 ~을 보여주다」표현.\n友達に新しいスマホを見せた에서 友達+に+スマホ+を+見せた.\n見せる는 보여주다(타동사).' },
        furigana: 'ともだちにあたらしいすまほをみせた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        korean:   '실력을 보여줄 기회가 왔어.',
        japanese: '実力(じつりょく)を見(み)せるチャンスが来(き)た。',
        plain:    '実力を見せるチャンスが来た。',
        reading:  '지츠료쿠오 미세루 챤스가 키타.',
        pattern:  { name: '〜を見せるチャンス', meaning: '~을 보여줄 기회', note: '〜を見せるチャンス: 「~을 보여줄 기회」연체수식.\n実力を見せるチャンスが来た에서 見せる+チャンス.\n動詞連体形이 名詞를 수식.' },
        furigana: 'じつりょくをみせるちゃんすがきた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
        ],
      },
      {
        korean:   '아이에게 그림책을 보여주면서 읽어줬어.',
        japanese: '子供(こども)に絵本(えほん)を見(み)せながら読(よ)んだ。',
        plain:    '子供に絵本を見せながら読んだ。',
        reading:  '코도모니 에홍오 미세나가라 욘다.',
        pattern:  { name: '〜ながら', meaning: '~하면서', note: '〜ながら: 「~하면서」동시 동작.\n子供に絵本を見せながら読んだ에서 見せ+ながら+読んだ.\nながら는 ます형+ながら로 동시 동작.' },
        furigana: 'こどもにえほんをみせながらよんだ',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 86위  死ぬ
   * ══════════════════════════════════════════════════ */
  {
    id: 'shinu', rank: 86, verb: '死ぬ', reading: '시누', meaning: '죽다',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '死(し)ます', ruby: '시마스', meaning: '죽습니다' },
        { text: '死(し)ません', ruby: '시마셍', meaning: '죽지 않습니다' },
        { text: '死(し)ますか？', ruby: '시마스까?', meaning: '죽습니까?' },
        { text: '死(し)ませんか？', ruby: '시마셍까?', meaning: '죽지 않습니까?' },
        { text: '死(し)ました', ruby: '시마시타', meaning: '죽었습니다' },
        { text: '死(し)ませんでした', ruby: '시마셍데시타', meaning: '죽지 않았습니다' },
        { text: '死(し)ましたか？', ruby: '시마시타까?', meaning: '죽었습니까?' },
        { text: '死(し)ませんでしたか？', ruby: '시마셍데시타까?', meaning: '죽지 않았습니까?' },
      ],
      casual: [
        { text: '死(し)ぬ', ruby: '시누', meaning: '죽어' },
        { text: '死(し)なない', ruby: '시나나이', meaning: '죽지 않아' },
        { text: '死(し)ぬ？', ruby: '시누?', meaning: '죽어?' },
        { text: '死(し)なない？', ruby: '시나나이?', meaning: '안 죽어?' },
        { text: '死(し)んだ', ruby: '신다', meaning: '죽었어' },
        { text: '死(し)ななかった', ruby: '시나나캇타', meaning: '죽지 않았어' },
        { text: '死(し)んだ？', ruby: '신다?', meaning: '죽었어?' },
        { text: '死(し)ななかった？', ruby: '시나나캇타?', meaning: '죽지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '할아버지는 아흔 살에 돌아가셨어요.',
        japanese: '祖父(そふ)は九十歳(きゅうじゅっさい)で亡(な)くなりました。',
        plain:    '祖父は九十歳で亡くなりました。',
        reading:  '소후와 큐-쥬삿사이데 나쿠나리마시타.',
        pattern:  { name: '〜で亡くなる', meaning: '~에 돌아가시다', note: '〜で亡くなる: 「~에 돌아가시다」표현.\n祖父は九十歳で亡くなりました에서 九十歳+で+亡くなりました.\n亡くなる는 死ぬ의 완곡 표현.' },
        furigana: 'そふはきゅうじゅっさいでなくなりました',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '그 식물은 물 부족으로 말라 버렸어.',
        japanese: 'その植物(しょくぶつ)は水不足(みずぶそく)で枯(か)れてしまった。',
        plain:    'その植物は水不足で枯れてしまった。',
        reading:  '소노 쇼쿠부츠와 미즈부소쿠데 카레테시맛타.',
        pattern:  { name: '〜で枯れてしまう', meaning: '~로 말라 버리다', note: '〜で枯れてしまう: 「~으로 시들어버리다」원인+결과.\nその植物は水不足で枯れてしまった에서 水不足+で+枯れてしまった.\nてしまった는 유감의 뉘앙스.' },
        furigana: 'そのしょくぶつはみずぶそくでかれてしまった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
      {
        korean:   '그는 웃다가 죽을 뻔했어.',
        japanese: '彼(かれ)は笑(わら)い死(し)にしそうなほど笑(わら)った。',
        plain:    '彼は笑い死にしそうなほど笑った。',
        reading:  '카레와 와라이지니시소-나 호도 와랏타.',
        pattern:  { name: '〜しそうなほど', meaning: '~할 것 같을 정도로', note: '〜しそうなほど: 「~할 것 같을 정도로」정도 비유 표현.\n彼は笑い死にしそうなほど笑った에서 しそうなほど가 정도.\nそうな는 외관 추정. ほど는 정도.' },
        furigana: 'かれはわらいじにしそうなほどわらった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 87위  変える
   * ══════════════════════════════════════════════════ */
  {
    id: 'kaeru_v', rank: 87, verb: '変える', reading: '카에루', meaning: '바꾸다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '変(か)ます', ruby: '카마스', meaning: '바꿉니다' },
        { text: '変(か)ません', ruby: '카마셍', meaning: '바꾸지 않습니다' },
        { text: '変(か)ますか？', ruby: '카마스까?', meaning: '바꿉니까?' },
        { text: '変(か)ませんか？', ruby: '카마셍까?', meaning: '바꾸지 않습니까?' },
        { text: '変(か)ました', ruby: '카마시타', meaning: '바꿨습니다' },
        { text: '変(か)ませんでした', ruby: '카마셍데시타', meaning: '바꾸지 않았습니다' },
        { text: '変(か)ましたか？', ruby: '카마시타까?', meaning: '바꿨습니까?' },
        { text: '変(か)ませんでしたか？', ruby: '카마셍데시타까?', meaning: '바꾸지 않았습니까?' },
      ],
      casual: [
        { text: '変(か)える', ruby: '카에루', meaning: '바꿔' },
        { text: '変(か)えない', ruby: '카에나이', meaning: '바꾸지 않아' },
        { text: '変(か)える？', ruby: '카에루?', meaning: '바꿔?' },
        { text: '変(か)えない？', ruby: '카에나이?', meaning: '안 바꿔?' },
        { text: '変(か)えた', ruby: '카에타', meaning: '바꿨어' },
        { text: '変(か)えなかった', ruby: '카에나캇타', meaning: '바꾸지 않았어' },
        { text: '変(か)えた？', ruby: '카에타?', meaning: '바꿨어?' },
        { text: '変(か)えなかった？', ruby: '카에나캇타?', meaning: '바꾸지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '생활 습관을 바꾸는 것은 어려워.',
        japanese: '生活(せいかつ)習慣(しゅうかん)を変(か)えることは難(むずか)しい。',
        plain:    '生活習慣を変えることは難しい。',
        reading:  '세-카츠 슈-캉오 카에루코토와 무즈카시이.',
        pattern:  { name: '〜を変えることは難しい', meaning: '~을 바꾸는 것은 어렵다', note: '〜を変えることは難しい: 「~을 바꾸기는 어렵다」.\n生活習慣を変えることは難しい에서 変える+こと+は+難しい.\nことは는 동명사화+주제 제시.' },
        furigana: 'せいかつしゅうかんをかえることはむずかしい',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '생각 방식을 바꾸면 편해질 수 있어.',
        japanese: '考(かんが)え方(かた)を変(か)えれば楽(らく)になれる。',
        plain:    '考え方を変えれば楽になれる。',
        reading:  '캉가에카타오 카에레바 라쿠니 나레루.',
        pattern:  { name: '〜れば楽になれる', meaning: '~하면 편해질 수 있다', note: '〜れば楽になれる: 「~하면 편해질 수 있다」가정+결과.\n考え方を変えれば楽になれる에서 変えれば+楽になれる.\nば는 가정 조건. なれる는 なる의 가능형.' },
        furigana: 'かんがえかたをかえればらくになれる',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '세상을 바꿀 만한 발명을 하고 싶어.',
        japanese: '世界(せかい)を変(か)えるような発明(はつめい)をしたい。',
        plain:    '世界を変えるような発明をしたい。',
        reading:  '세카이오 카에루요-나 하츠메-오 시타이.',
        pattern:  { name: '〜を変えるような', meaning: '~을 바꿀 만한', note: '〜を変えるような: 「~을 바꿀 것 같은」연체수식.\n世界を変えるような発明をしたい에서 変えるような+発明.\nような는 비유·추정의 연체형.' },
        furigana: 'せかいをかえるようなはつめいをしたい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 88위  残る
   * ══════════════════════════════════════════════════ */
  {
    id: 'nokoru', rank: 88, verb: '残る', reading: '노코루', meaning: '남다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '残(のこ)ます', ruby: '노코마스', meaning: '남습니다' },
        { text: '残(のこ)ません', ruby: '노코마셍', meaning: '남지 않습니다' },
        { text: '残(のこ)ますか？', ruby: '노코마스까?', meaning: '남습니까?' },
        { text: '残(のこ)ませんか？', ruby: '노코마셍까?', meaning: '남지 않습니까?' },
        { text: '残(のこ)ました', ruby: '노코마시타', meaning: '남았습니다' },
        { text: '残(のこ)ませんでした', ruby: '노코마셍데시타', meaning: '남지 않았습니다' },
        { text: '残(のこ)ましたか？', ruby: '노코마시타까?', meaning: '남았습니까?' },
        { text: '残(のこ)ませんでしたか？', ruby: '노코마셍데시타까?', meaning: '남지 않았습니까?' },
      ],
      casual: [
        { text: '残(のこ)る', ruby: '노코루', meaning: '남아' },
        { text: '残(のこ)らない', ruby: '노코라나이', meaning: '남지 않아' },
        { text: '残(のこ)る？', ruby: '노코루?', meaning: '남아?' },
        { text: '残(のこ)らない？', ruby: '노코라나이?', meaning: '안 남아?' },
        { text: '残(のこ)った', ruby: '노콧타', meaning: '남았어' },
        { text: '残(のこ)らなかった', ruby: '노코라나캇타', meaning: '남지 않았어' },
        { text: '残(のこ)った？', ruby: '노콧타?', meaning: '남았어?' },
        { text: '残(のこ)らなかった？', ruby: '노코라나캇타?', meaning: '남지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '일이 남아 있으니 먼저 돌아가세요.',
        japanese: '仕事(しごと)が残(のこ)っているので先(さき)に帰(かえ)ってください。',
        plain:    '仕事が残っているので先に帰ってください。',
        reading:  '시고토가 노콧테이루노데 사키니 카엣테쿠다사이.',
        pattern:  { name: '〜が残っているので', meaning: '~이 남아 있으므로', note: '〜が残っているので: 「~이 남아 있으니까」이유+행동.\n仕事が残っているので先に帰ってください에서 残っている+ので.\nので는 객관적 이유.' },
        furigana: 'しごとがのこっているのでさきにかえってください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '경기에서 살아남기 위해 전력을 다했어.',
        japanese: '試合(しあい)に残(のこ)るために全力(ぜんりょく)を尽(つ)くした。',
        plain:    '試合に残るために全力を尽くした。',
        reading:  '시아이니 노코루타메니 젠료쿠오 츠쿠시타.',
        pattern:  { name: '〜に残るために全力を尽くす', meaning: '~에 남기 위해 전력을 다하다', note: '〜に残るために全力を尽くす: 「~에 남기 위해 전력을 다하다」.\n試合に残るために全力を尽くした에서 残る+ために+全力.\n全力を尽くす는 최선을 다하다.' },
        furigana: 'しあいにのこるためにぜんりょくをつくした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '기록에 남을 훌륭한 연주였어.',
        japanese: '記録(きろく)に残(のこ)る素晴(すば)らしい演奏(えんそう)だった。',
        plain:    '記録に残る素晴らしい演奏だった。',
        reading:  '키로쿠니 노코루 스바라시이 엔소-닷타.',
        pattern:  { name: '記録に残る', meaning: '기록에 남다', note: '記録に残る: 「기록에 남다」관용 표현.\n記録に残る素晴らしい演奏だった에서 記録+に+残る.\n記録に残る가 연체형으로 演奏를 수식.' },
        furigana: 'きろくにのこるすばらしいえんそうだった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 89위  選ぶ
   * ══════════════════════════════════════════════════ */
  {
    id: 'erabu', rank: 89, verb: '選ぶ', reading: '에라부', meaning: '선택하다; 고르다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '選(えら)ます', ruby: '에라마스', meaning: '선택합니다' },
        { text: '選(えら)ません', ruby: '에라마셍', meaning: '선택하지 않습니다' },
        { text: '選(えら)ますか？', ruby: '에라마스까?', meaning: '선택합니까?' },
        { text: '選(えら)ませんか？', ruby: '에라마셍까?', meaning: '선택하지 않습니까?' },
        { text: '選(えら)ました', ruby: '에라마시타', meaning: '선택했습니다' },
        { text: '選(えら)ませんでした', ruby: '에라마셍데시타', meaning: '선택하지 않았습니다' },
        { text: '選(えら)ましたか？', ruby: '에라마시타까?', meaning: '선택했습니까?' },
        { text: '選(えら)ませんでしたか？', ruby: '에라마셍데시타까?', meaning: '선택하지 않았습니까?' },
      ],
      casual: [
        { text: '選(えら)ぶ', ruby: '에라부', meaning: '골라' },
        { text: '選(えら)ばない', ruby: '에라바나이', meaning: '선택하지 않아' },
        { text: '選(えら)ぶ？', ruby: '에라부?', meaning: '골라?' },
        { text: '選(えら)ばない？', ruby: '에라바나이?', meaning: '안 골라?' },
        { text: '選(えら)んだ', ruby: '에란다', meaning: '골랐어' },
        { text: '選(えら)ばなかった', ruby: '에라바나캇타', meaning: '선택하지 않았어' },
        { text: '選(えら)んだ？', ruby: '에란다?', meaning: '골랐어?' },
        { text: '選(えら)ばなかった？', ruby: '에라바나캇타?', meaning: '선택하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '많은 것 중에서 하나를 고르는 건 어려워.',
        japanese: 'たくさんの中(なか)から一(ひと)つを選(えら)ぶのは難(むずか)しい。',
        plain:    'たくさんの中から一つを選ぶのは難しい。',
        reading:  '타쿠상노 나카카라 히토츠오 에라부노와 무즈카시이.',
        pattern:  { name: '〜から一つを選ぶ', meaning: '~에서 하나를 선택하다', note: '〜から一つを選ぶ: 「~에서 하나를 선택하다」.\nたくさんの中から一つを選ぶのは難しい에서 から+選ぶ.\nから는 선택의 범위·출처.' },
        furigana: 'たくさんのなかからひとつをえらぶのはむずかしい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 4, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '스스로 길을 선택할 권리가 있어.',
        japanese: '自分(じぶん)で道(みち)を選(えら)ぶ権利(けんり)がある。',
        plain:    '自分で道を選ぶ権利がある。',
        reading:  '지붕데 미치오 에라부 켄리가 아루.',
        pattern:  { name: '〜を選ぶ権利がある', meaning: '~을 선택할 권리가 있다', note: '〜を選ぶ権利がある: 「~을 선택할 권리가 있다」.\n自分で道を選ぶ権利がある에서 選ぶ+権利+がある.\n選ぶ가 権利를 수식하는 연체형.' },
        furigana: 'じぶんでみちをえらぶけんりがある',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '팀의 리더를 선택해 주세요.',
        japanese: 'チームのリーダーを選(えら)んでください。',
        plain:    'チームのリーダーを選んでください。',
        reading:  '치-무노 리-다-오 에란데쿠다사이.',
        pattern:  { name: '〜を選んでください', meaning: '~을 선택해 주세요', note: '〜を選んでください: 「~을 선택해 주세요」의뢰.\nチームのリーダーを選んでください에서 選んで+ください.\nてください는 정중한 의뢰.' },
        furigana: 'ちーむのりーだーをえらんでください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 90위  生まれる
   * ══════════════════════════════════════════════════ */
  {
    id: 'umareru', rank: 90, verb: '生まれる', reading: '우마레루', meaning: '태어나다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '生(うま)ます', ruby: '우마마스', meaning: '태어납니다' },
        { text: '生(うま)ません', ruby: '우마마셍', meaning: '태어나지 않습니다' },
        { text: '生(うま)ますか？', ruby: '우마마스까?', meaning: '태어납니까?' },
        { text: '生(うま)ませんか？', ruby: '우마마셍까?', meaning: '태어나지 않습니까?' },
        { text: '生(うま)ました', ruby: '우마마시타', meaning: '태어났습니다' },
        { text: '生(うま)ませんでした', ruby: '우마마셍데시타', meaning: '태어나지 않았습니다' },
        { text: '生(うま)ましたか？', ruby: '우마마시타까?', meaning: '태어났습니까?' },
        { text: '生(うま)ませんでしたか？', ruby: '우마마셍데시타까?', meaning: '태어나지 않았습니까?' },
      ],
      casual: [
        { text: '生(うま)れる', ruby: '우마레루', meaning: '태어나' },
        { text: '生(うま)れない', ruby: '우마레나이', meaning: '태어나지 않아' },
        { text: '生(うま)れる？', ruby: '우마레루?', meaning: '태어나?' },
        { text: '生(うま)れない？', ruby: '우마레나이?', meaning: '안 태어나?' },
        { text: '生(うま)れた', ruby: '우마레타', meaning: '태어났어' },
        { text: '生(うま)れなかった', ruby: '우마레나캇타', meaning: '태어나지 않았어' },
        { text: '生(うま)れた？', ruby: '우마레타?', meaning: '태어났어?' },
        { text: '生(うま)れなかった？', ruby: '우마레나캇타?', meaning: '태어나지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '아기가 무사히 태어났어요.',
        japanese: '赤(あか)ちゃんが無事(ぶじ)に生(うま)れました。',
        plain:    '赤ちゃんが無事に生まれました。',
        reading:  '아카챵가 부지니 우마레마시타.',
        pattern:  { name: '〜が無事に生まれる', meaning: '~이 무사히 태어나다', note: '〜が無事に生まれる: 「~이 무사히 태어나다」.\n赤ちゃんが無事に生まれました에서 無事に+生まれました.\n無事に는 「무사히·탈없이」.' },
        furigana: 'あかちゃんがぶじにうまれました',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '새로운 아이디어가 생겨났어.',
        japanese: '新(あたら)しいアイデアが生(うま)れた。',
        plain:    '新しいアイデアが生まれた。',
        reading:  '아타라시이 아이데아가 우마레타.',
        pattern:  { name: '〜が生まれる', meaning: '~이 생겨나다', note: '〜が生まれる: 「~이 탄생하다·생기다」.\n新しいアイデアが生まれた에서 アイデア+が+生まれた.\n生まれる는 추상적 개념(아이디어)의 탄생에도 사용.' },
        furigana: 'あたらしいあいであがうまれた',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
      {
        korean:   '그는 도쿄에서 태어나서 오사카에서 자랐어.',
        japanese: '彼(かれ)は東京(とうきょう)で生(うま)まれて大阪(おおさか)で育(そだ)った。',
        plain:    '彼は東京で生まれて大阪で育った。',
        reading:  '카레와 토-쿄-데 우마레테 오-사카데 소닷타.',
        pattern:  { name: '〜で生まれて〜で育つ', meaning: '~에서 태어나서 ~에서 자라다', note: '〜で生まれて〜で育つ: 「~에서 태어나 ~에서 자라다」.\n彼は東京で生まれて大阪で育った에서 生まれて+育った.\nて형으로 순서 연결.' },
        furigana: 'かれはとうきょうでうまれておおさかでそだった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 4, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 91위  合わせる
   * ══════════════════════════════════════════════════ */
  {
    id: 'awaseru', rank: 91, verb: '合わせる', reading: '아와세루', meaning: '맞추다; 합치다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '合(あわ)ます', ruby: '아와마스', meaning: '맞춥니다' },
        { text: '合(あわ)ません', ruby: '아와마셍', meaning: '맞추지 않습니다' },
        { text: '合(あわ)ますか？', ruby: '아와마스까?', meaning: '맞춥니까?' },
        { text: '合(あわ)ませんか？', ruby: '아와마셍까?', meaning: '맞추지 않습니까?' },
        { text: '合(あわ)ました', ruby: '아와마시타', meaning: '맞췄습니다' },
        { text: '合(あわ)ませんでした', ruby: '아와마셍데시타', meaning: '맞추지 않았습니다' },
        { text: '合(あわ)ましたか？', ruby: '아와마시타까?', meaning: '맞췄습니까?' },
        { text: '合(あわ)ませんでしたか？', ruby: '아와마셍데시타까?', meaning: '맞추지 않았습니까?' },
      ],
      casual: [
        { text: '合(あわ)せる', ruby: '아와세루', meaning: '맞춰' },
        { text: '合(あわ)せない', ruby: '아와세나이', meaning: '맞추지 않아' },
        { text: '合(あわ)せる？', ruby: '아와세루?', meaning: '맞춰?' },
        { text: '合(あわ)せない？', ruby: '아와세나이?', meaning: '안 맞춰?' },
        { text: '合(あわ)せた', ruby: '아와세타', meaning: '맞췄어' },
        { text: '合(あわ)せなかった', ruby: '아와세나캇타', meaning: '맞추지 않았어' },
        { text: '合(あわ)せた？', ruby: '아와세타?', meaning: '맞췄어?' },
        { text: '合(あわ)せなかった？', ruby: '아와세나캇타?', meaning: '맞추지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '스케줄을 맞춰 주세요.',
        japanese: 'スケジュールを合(あわ)わせてください。',
        plain:    'スケジュールを合わせてください。',
        reading:  '스케쥬-루오 아와세테쿠다사이.',
        pattern:  { name: '〜を合わせてください', meaning: '~을 맞춰 주세요', note: '〜を合わせてください: 「~을 맞춰 주세요」.\nスケジュールを合わせてください에서 合わせて+ください.\n合わせる는 「맞추다·조율하다」.' },
        furigana: 'すけじゅーるをあわせてください',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '음악에 맞춰서 춤을 췄어.',
        japanese: '音楽(おんがく)に合(あ)わせて踊(おど)った。',
        plain:    '音楽に合わせて踊った。',
        reading:  '온가쿠니 아와세테 오돗타.',
        pattern:  { name: '〜に合わせて', meaning: '~에 맞춰서', note: '〜に合わせて: 「~에 맞춰서」기준 표현.\n音楽に合わせて踊った에서 音楽+に合わせて+踊った.\nに合わせて는 기준에 맞추어.' },
        furigana: 'おんがくにあわせておどった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
      {
        korean:   '두 의견을 합쳐서 하나로 만들었어.',
        japanese: '二(ふた)つの意見(いけん)を合(あわ)わせて一(ひと)つにした。',
        plain:    '二つの意見を合わせて一つにした。',
        reading:  '후타츠노 이켄오 아와세테 히토츠니 시타.',
        pattern:  { name: '〜を合わせて一つにする', meaning: '~을 합쳐서 하나로 만들다', note: '〜を合わせて一つにする: 「~을 합쳐 하나로 하다」.\n二つの意見を合わせて一つにした에서 合わせて+一つにした.\n合わせる+て+にする로 합쳐서 통합.' },
        furigana: 'ふたつのいけんをあわせてひとつにした',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
          { phrase_id: 5, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 92위  進む
   * ══════════════════════════════════════════════════ */
  {
    id: 'susumu', rank: 92, verb: '進む', reading: '스스무', meaning: '나아가다; 진행하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '進(すす)ます', ruby: '스스마스', meaning: '나아갑니다' },
        { text: '進(すす)ません', ruby: '스스마셍', meaning: '나아가지 않습니다' },
        { text: '進(すす)ますか？', ruby: '스스마스까?', meaning: '나아갑니까?' },
        { text: '進(すす)ませんか？', ruby: '스스마셍까?', meaning: '나아가지 않습니까?' },
        { text: '進(すす)ました', ruby: '스스마시타', meaning: '나아갔습니다' },
        { text: '進(すす)ませんでした', ruby: '스스마셍데시타', meaning: '나아가지 않았습니다' },
        { text: '進(すす)ましたか？', ruby: '스스마시타까?', meaning: '나아갔습니까?' },
        { text: '進(すす)ませんでしたか？', ruby: '스스마셍데시타까?', meaning: '나아가지 않았습니까?' },
      ],
      casual: [
        { text: '進(すす)む', ruby: '스스무', meaning: '나아가' },
        { text: '進(すす)まない', ruby: '스스마나이', meaning: '나아가지 않아' },
        { text: '進(すす)む？', ruby: '스스무?', meaning: '나아가?' },
        { text: '進(すす)まない？', ruby: '스스마나이?', meaning: '안 나아가?' },
        { text: '進(すす)んだ', ruby: '스슨다', meaning: '나아갔어' },
        { text: '進(すす)まなかった', ruby: '스스마나캇타', meaning: '나아가지 않았어' },
        { text: '進(すす)んだ？', ruby: '스슨다?', meaning: '나아갔어?' },
        { text: '進(すす)まなかった？', ruby: '스스마나캇타?', meaning: '나아가지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '계획대로 공사가 진행되고 있어.',
        japanese: '計画(けいかく)通(どお)りに工事(こうじ)が進(すす)んでいる。',
        plain:    '計画通りに工事が進んでいる。',
        reading:  '케-카쿠도-리니 코-지가 스슨데이루.',
        pattern:  { name: '計画通りに進む', meaning: '계획대로 진행되다', note: '計画通りに進む: 「계획대로 진행되다」표현.\n計画通りに工事が進んでいる에서 計画通り+に+進んでいる.\n通り는 「~대로」.' },
        furigana: 'けいかくどおりにこうじがすすんでいる',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '협의가 순조롭게 진행됐어.',
        japanese: '話(はな)し合(あ)いが順調(じゅんちょう)に進(すす)んだ。',
        plain:    '話し合いが順調に進んだ。',
        reading:  '하나시아이가 쥰쵸-니 스슨다.',
        pattern:  { name: '〜が順調に進む', meaning: '~이 순조롭게 진행되다', note: '〜が順調に進む: 「~이 순조롭게 진행되다」.\n話し合いが順調に進んだ에서 順調(순조)+に+進んだ.\n順調に는 「순조롭게」.' },
        furigana: 'はなしあいがじゅんちょうにすすんだ',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '기술이 급속히 발전하고 있어.',
        japanese: '技術(ぎじゅつ)が急速(きゅうそく)に進(すす)んでいる。',
        plain:    '技術が急速に進んでいる。',
        reading:  '기쥬츠가 큐-소쿠니 스슨데이루.',
        pattern:  { name: '〜が急速に進む', meaning: '~이 급속히 발전하다', note: '〜が急速に進む: 「~이 급속히 진행되다」.\n技術が急速に進んでいる에서 急速+に+進んでいる.\n急速に는 「급속히·빠른 속도로」.' },
        furigana: 'ぎじゅつがきゅうそくにすすんでいる',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 0, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 93위  定める
   * ══════════════════════════════════════════════════ */
  {
    id: 'sadameru', rank: 93, verb: '定める', reading: '사다메루', meaning: '정하다; 결정하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '定(さだ)ます', ruby: '사다마스', meaning: '정합니다' },
        { text: '定(さだ)ません', ruby: '사다마셍', meaning: '정하지 않습니다' },
        { text: '定(さだ)ますか？', ruby: '사다마스까?', meaning: '정합니까?' },
        { text: '定(さだ)ませんか？', ruby: '사다마셍까?', meaning: '정하지 않습니까?' },
        { text: '定(さだ)ました', ruby: '사다마시타', meaning: '정했습니다' },
        { text: '定(さだ)ませんでした', ruby: '사다마셍데시타', meaning: '정하지 않았습니다' },
        { text: '定(さだ)ましたか？', ruby: '사다마시타까?', meaning: '정했습니까?' },
        { text: '定(さだ)ませんでしたか？', ruby: '사다마셍데시타까?', meaning: '정하지 않았습니까?' },
      ],
      casual: [
        { text: '定(さだ)める', ruby: '사다메루', meaning: '정해' },
        { text: '定(さだ)めない', ruby: '사다메나이', meaning: '정하지 않아' },
        { text: '定(さだ)める？', ruby: '사다메루?', meaning: '정해?' },
        { text: '定(さだ)めない？', ruby: '사다메나이?', meaning: '안 정해?' },
        { text: '定(さだ)めた', ruby: '사다메타', meaning: '정했어' },
        { text: '定(さだ)めなかった', ruby: '사다메나캇타', meaning: '정하지 않았어' },
        { text: '定(さだ)めた？', ruby: '사다메타?', meaning: '정했어?' },
        { text: '定(さだ)めなかった？', ruby: '사다메나캇타?', meaning: '정하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '규칙을 정하고 나서 시작합시다.',
        japanese: 'ルールを定(さだ)めてから始(はじ)めましょう。',
        plain:    'ルールを定めてから始めましょう。',
        reading:  '루-루오 사다메테카라 하지메마쇼-.',
        pattern:  { name: '〜てから始める', meaning: '~을 정하고 나서 시작하다', note: '〜てから始める: 「~하고 나서 시작하다」순서 표현.\nルールを定めてから始めましょう에서 定めて+から+始めましょう.\n定める(정하다) 완료 후 시작.' },
        furigana: 'るーるをさだめてからはじめましょう',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
        ],
      },
      {
        korean:   '목표를 정하는 것이 중요해요.',
        japanese: '目標(もくひょう)を定(さだ)めることが大切(たいせつ)です。',
        plain:    '目標を定めることが大切です。',
        reading:  '모쿠효-오 사다메루코토가 타이세츠데스.',
        pattern:  { name: '〜を定めることが大切', meaning: '~을 정하는 것이 중요하다', note: '〜を定めることが大切: 「~을 정하는 것이 중요하다」.\n目標を定めることが大切です에서 定める+こと+が+大切.\nことが는 동명사화+주어 표시.' },
        furigana: 'もくひょうをさだめることがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '법률로 정해진 절차에 따라야 해.',
        japanese: '法律(ほうりつ)で定(さだ)められた手続(てつづ)きに従(したが)う。',
        plain:    '法律で定められた手続きに従う。',
        reading:  '호-리츠데 사다메라레타 테츠즈키니 시타가우.',
        pattern:  { name: '〜で定められた〜に従う', meaning: '~로 정해진 ~에 따르다', note: '〜で定められた〜に従う: 「~으로 정해진 ~에 따르다」.\n法律で定められた手続きに従う에서 定められた+手続き.\n定める의 수동형=定められる.' },
        furigana: 'ほうりつでさだめられたてつづきにしたがう',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 94위  加える
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuwaeru', rank: 94, verb: '加える', reading: '쿠와에루', meaning: '더하다; 추가하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '加(くわ)ます', ruby: '쿠와마스', meaning: '더합니다' },
        { text: '加(くわ)ません', ruby: '쿠와마셍', meaning: '더하지 않습니다' },
        { text: '加(くわ)ますか？', ruby: '쿠와마스까?', meaning: '더합니까?' },
        { text: '加(くわ)ませんか？', ruby: '쿠와마셍까?', meaning: '더하지 않습니까?' },
        { text: '加(くわ)ました', ruby: '쿠와마시타', meaning: '더했습니다' },
        { text: '加(くわ)ませんでした', ruby: '쿠와마셍데시타', meaning: '더하지 않았습니다' },
        { text: '加(くわ)ましたか？', ruby: '쿠와마시타까?', meaning: '더했습니까?' },
        { text: '加(くわ)ませんでしたか？', ruby: '쿠와마셍데시타까?', meaning: '더하지 않았습니까?' },
      ],
      casual: [
        { text: '加(くわ)える', ruby: '쿠와에루', meaning: '더해' },
        { text: '加(くわ)えない', ruby: '쿠와에나이', meaning: '더하지 않아' },
        { text: '加(くわ)える？', ruby: '쿠와에루?', meaning: '더해?' },
        { text: '加(くわ)えない？', ruby: '쿠와에나이?', meaning: '안 더해?' },
        { text: '加(くわ)えた', ruby: '쿠와에타', meaning: '더했어' },
        { text: '加(くわ)えなかった', ruby: '쿠와에나캇타', meaning: '더하지 않았어' },
        { text: '加(くわ)えた？', ruby: '쿠와에타?', meaning: '더했어?' },
        { text: '加(くわ)えなかった？', ruby: '쿠와에나캇타?', meaning: '더하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '요리에 소금을 더해 주세요.',
        japanese: '料理(りょうり)に塩(しお)を加(くわ)えてください。',
        plain:    '料理に塩を加えてください。',
        reading:  '료-리니 시오오 쿠와에테쿠다사이.',
        pattern:  { name: '〜に〜を加える', meaning: '~에 ~을 더하다', note: '〜に〜を加える: 「~에 ~을 더하다」표현.\n料理に塩を加えてください에서 料理+に+塩+を+加えて.\nに는 대상, を는 더하는 것.' },
        furigana: 'りょうりにしおをくわえてください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '새로운 멤버를 팀에 추가했어.',
        japanese: '新(あたら)しいメンバーをチームに加(くわ)えた。',
        plain:    '新しいメンバーをチームに加えた。',
        reading:  '아타라시이 멤바-오 치-무니 쿠와에타.',
        pattern:  { name: '〜に加える', meaning: '~에 추가하다', note: '〜に加える: 「~에 더하다·추가하다」표현.\n新しいメンバーをチームに加えた에서 チーム+に+加えた.\n人を組織に加える 형식.' },
        furigana: 'あたらしいめんばーをちーむにくわえた',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '더 자세한 설명을 추가할게요.',
        japanese: 'さらに詳(くわ)しい説明(せつめい)を加(くわ)えます。',
        plain:    'さらに詳しい説明を加えます。',
        reading:  '사라니 쿠와시이 세츠메-오 쿠와에마스.',
        pattern:  { name: 'さらに〜を加える', meaning: '더욱 ~을 추가하다', note: 'さらに〜を加える: 「더욱 ~을 추가하다」표현.\nさらに詳しい説明を加えます에서 さらに+詳しい説明+を+加えます.\nさらに는 「더욱·추가로」.' },
        furigana: 'さらにくわしいせつめいをくわえます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 95위  始まる
   * ══════════════════════════════════════════════════ */
  {
    id: 'hajimaru', rank: 95, verb: '始まる', reading: '하지마루', meaning: '시작되다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '始(はじ)ます', ruby: '하지마스', meaning: '시작됩니다' },
        { text: '始(はじ)ません', ruby: '하지마셍', meaning: '시작되지 않습니다' },
        { text: '始(はじ)ますか？', ruby: '하지마스까?', meaning: '시작됩니까?' },
        { text: '始(はじ)ませんか？', ruby: '하지마셍까?', meaning: '시작되지 않습니까?' },
        { text: '始(はじ)ました', ruby: '하지마시타', meaning: '시작됐습니다' },
        { text: '始(はじ)ませんでした', ruby: '하지마셍데시타', meaning: '시작되지 않았습니다' },
        { text: '始(はじ)ましたか？', ruby: '하지마시타까?', meaning: '시작됐습니까?' },
        { text: '始(はじ)ませんでしたか？', ruby: '하지마셍데시타까?', meaning: '시작되지 않았습니까?' },
      ],
      casual: [
        { text: '始(はじ)まる', ruby: '하지마루', meaning: '시작돼' },
        { text: '始(はじ)まらない', ruby: '하지마라나이', meaning: '시작되지 않아' },
        { text: '始(はじ)まる？', ruby: '하지마루?', meaning: '시작돼?' },
        { text: '始(はじ)まらない？', ruby: '하지마라나이?', meaning: '안 시작돼?' },
        { text: '始(はじ)まった', ruby: '하지맛타', meaning: '시작됐어' },
        { text: '始(はじ)まらなかった', ruby: '하지마라나캇타', meaning: '시작되지 않았어' },
        { text: '始(はじ)まった？', ruby: '하지맛타?', meaning: '시작됐어?' },
        { text: '始(はじ)まらなかった？', ruby: '하지마라나캇타?', meaning: '시작되지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '회의는 9시에 시작돼요.',
        japanese: '会議(かいぎ)は九時(くじ)に始(はじ)まります。',
        plain:    '会議は九時に始まります。',
        reading:  '카이기와 쿠지니 하지마리마스.',
        pattern:  { name: '〜は〜に始まる', meaning: '~은 ~에 시작되다', note: '〜は〜に始まる: 「~은 ~에 시작되다」시작 표현.\n会議は九時に始まります에서 会議+は+九時+に+始まります.\n始まる는 자동사로 「시작되다」.' },
        furigana: 'かいぎはくじにはじまります',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '봄이 되면 벚꽃이 피기 시작해.',
        japanese: '春(はる)になると桜(さくら)が咲(さ)き始(はじ)まる。',
        plain:    '春になると桜が咲き始まる。',
        reading:  '하루니나루토 사쿠라가 사키하지마루.',
        pattern:  { name: '〜になると〜始まる', meaning: '~이 되면 ~하기 시작하다', note: '〜になると〜始まる: 「~이 되면 ~하기 시작한다」.\n春になると桜が咲き始まる에서 になると+咲き始まる.\nと는 자연스러운 결과를 나타냄.' },
        furigana: 'はるになるとさくらがさきはじまる',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '새로운 생활이 시작돼서 기뻐.',
        japanese: '新(あたら)しい生活(せいかつ)が始(はじ)まって嬉(うれ)しい。',
        plain:    '新しい生活が始まって嬉しい。',
        reading:  '아타라시이 세-카츠가 하지맛테 우레시이.',
        pattern:  { name: '〜て嬉しい', meaning: '~해서 기쁘다', note: '〜て嬉しい: 「~해서 기쁘다」감정 표현.\n新しい生活が始まって嬉しい에서 始まって+嬉しい.\nて형으로 원인을 연결.' },
        furigana: 'あたらしいせいかつがはじまってうれしい',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 96위  走る
   * ══════════════════════════════════════════════════ */
  {
    id: 'hashiru', rank: 96, verb: '走る', reading: '하시루', meaning: '달리다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '走(はし)ます', ruby: '하시마스', meaning: '달립니다' },
        { text: '走(はし)ません', ruby: '하시마셍', meaning: '달리지 않습니다' },
        { text: '走(はし)ますか？', ruby: '하시마스까?', meaning: '달립니까?' },
        { text: '走(はし)ませんか？', ruby: '하시마셍까?', meaning: '달리지 않습니까?' },
        { text: '走(はし)ました', ruby: '하시마시타', meaning: '달렸습니다' },
        { text: '走(はし)ませんでした', ruby: '하시마셍데시타', meaning: '달리지 않았습니다' },
        { text: '走(はし)ましたか？', ruby: '하시마시타까?', meaning: '달렸습니까?' },
        { text: '走(はし)ませんでしたか？', ruby: '하시마셍데시타까?', meaning: '달리지 않았습니까?' },
      ],
      casual: [
        { text: '走(はし)る', ruby: '하시루', meaning: '달려' },
        { text: '走(はし)らない', ruby: '하시라나이', meaning: '달리지 않아' },
        { text: '走(はし)る？', ruby: '하시루?', meaning: '달려?' },
        { text: '走(はし)らない？', ruby: '하시라나이?', meaning: '안 달려?' },
        { text: '走(はし)った', ruby: '하싯타', meaning: '달렸어' },
        { text: '走(はし)らなかった', ruby: '하시라나캇타', meaning: '달리지 않았어' },
        { text: '走(はし)った？', ruby: '하싯타?', meaning: '달렸어?' },
        { text: '走(はし)らなかった？', ruby: '하시라나캇타?', meaning: '달리지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '매일 아침 공원을 달리고 있어요.',
        japanese: '毎朝(まいあさ)公園(こうえん)を走(はし)っています。',
        plain:    '毎朝公園を走っています。',
        reading:  '마이아사 코-엔오 하싯테이마스.',
        pattern:  { name: '毎朝〜を走る', meaning: '매일 아침 ~을 달리다', note: '毎朝〜を走る: 「매일 아침 ~을 달리다」습관 표현.\n毎朝公園を走っています에서 毎朝+公園+を+走っています.\nを走る는 장소·경로를 달리다.' },
        furigana: 'まいあさこうえんをはしっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '버스를 놓치지 않으려고 달렸어.',
        japanese: 'バスに乗(の)り遅(おく)れないように走(はし)った。',
        plain:    'バスに乗り遅れないように走った。',
        reading:  '바스니 노리오쿠레나이요-니 하싯타.',
        pattern:  { name: '〜ように走る', meaning: '~하도록 달리다', note: '〜ように走る: 「~하도록 달리다」목적 표현.\nバスに乗り遅れないように走った에서 乗り遅れないように+走った.\nように는 목적·의도를 나타냄.' },
        furigana: 'ばすにのりおくれないようにはしった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '마라톤 대회에서 10킬로를 달렸어.',
        japanese: 'マラソン大会(たいかい)で十(じゅっ)キロ走(はし)った。',
        plain:    'マラソン大会で十キロ走った。',
        reading:  '마라송 타이카이데 쥬키로 하싯타.',
        pattern:  { name: '〜で〜キロ走る', meaning: '~에서 ~킬로를 달리다', note: '〜で〜キロ走る: 「~에서 ~킬로 달리다」표현.\nマラソン大会で十キロ走った에서 大会+で+十キロ+走った.\nで는 장소·이벤트, キロ走る는 거리+달리다.' },
        furigana: 'まらそんたいかいでじゅっきろはしった',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [1, 1, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 97위  忘れる
   * ══════════════════════════════════════════════════ */
  {
    id: 'wasureru', rank: 97, verb: '忘れる', reading: '와스레루', meaning: '잊다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '忘(わす)ます', ruby: '와스마스', meaning: '잊습니다' },
        { text: '忘(わす)ません', ruby: '와스마셍', meaning: '잊지 않습니다' },
        { text: '忘(わす)ますか？', ruby: '와스마스까?', meaning: '잊습니까?' },
        { text: '忘(わす)ませんか？', ruby: '와스마셍까?', meaning: '잊지 않습니까?' },
        { text: '忘(わす)ました', ruby: '와스마시타', meaning: '잊었습니다' },
        { text: '忘(わす)ませんでした', ruby: '와스마셍데시타', meaning: '잊지 않았습니다' },
        { text: '忘(わす)ましたか？', ruby: '와스마시타까?', meaning: '잊었습니까?' },
        { text: '忘(わす)ませんでしたか？', ruby: '와스마셍데시타까?', meaning: '잊지 않았습니까?' },
      ],
      casual: [
        { text: '忘(わす)れる', ruby: '와스레루', meaning: '잊어' },
        { text: '忘(わす)れない', ruby: '와스레나이', meaning: '잊지 않아' },
        { text: '忘(わす)れる？', ruby: '와스레루?', meaning: '잊어?' },
        { text: '忘(わす)れない？', ruby: '와스레나이?', meaning: '안 잊어?' },
        { text: '忘(わす)れた', ruby: '와스레타', meaning: '잊었어' },
        { text: '忘(わす)れなかった', ruby: '와스레나캇타', meaning: '잊지 않았어' },
        { text: '忘(わす)れた？', ruby: '와스레타?', meaning: '잊었어?' },
        { text: '忘(わす)れなかった？', ruby: '와스레나캇타?', meaning: '잊지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '중요한 것을 잊지 않도록 메모했어.',
        japanese: '大切(たいせつ)なことを忘(わす)れないようにメモした。',
        plain:    '大切なことを忘れないようにメモした。',
        reading:  '타이세츠나 코토오 와스레나이요-니 메모시타.',
        pattern:  { name: '〜ないようにメモする', meaning: '~하지 않도록 메모하다', note: '〜ないようにメモする: 「~하지 않도록 메모하다」예방 표현.\n大切なことを忘れないようにメモした에서 忘れないように+メモした.\nように는 목적·의도.' },
        furigana: 'たいせつなことをわすれないようにめもした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
      {
        korean:   '우산을 전철 안에 놓고 내렸어.',
        japanese: '傘(かさ)を電車(でんしゃ)の中(なか)に忘(わす)れてしまった。',
        plain:    '傘を電車の中に忘れてしまった。',
        reading:  '카사오 덴샤노 나카니 와스레테시맛타.',
        pattern:  { name: '〜に忘れてしまう', meaning: '~에 (물건을) 놓고 오다', note: '〜に忘れてしまう: 「~에 두고 와버리다」실수 표현.\n傘を電車の中に忘れてしまった에서 忘れて+しまった.\nてしまった는 의도치 않은 실수와 후회.' },
        furigana: 'かさをでんしゃのなかにわすれてしまった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [0, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '옛일은 잊고 앞을 보자.',
        japanese: '昔(むかし)のことは忘(わす)れて前(まえ)を向(む)こう。',
        plain:    '昔のことは忘れて前を向こう。',
        reading:  '무카시노 코토와 와스레테 마에오 무코-.',
        pattern:  { name: '〜を忘れて前を向く', meaning: '~을 잊고 앞을 향하다', note: '〜を忘れて前を向く: 「~을 잊고 앞을 보다」.\n昔のことは忘れて前を向こう에서 忘れて+前を向こう.\n前を向く는 앞을 보다·긍정적으로 나아가다.' },
        furigana: 'むかしのことはわすれてまえをむこう',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 98위  関わる
   * ══════════════════════════════════════════════════ */
  {
    id: 'kakawaru', rank: 98, verb: '関わる', reading: '카카와루', meaning: '관련되다; 관계하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '関(かかわ)ます', ruby: '카카와마스', meaning: '관련됩니다' },
        { text: '関(かかわ)ません', ruby: '카카와마셍', meaning: '관련되지 않습니다' },
        { text: '関(かかわ)ますか？', ruby: '카카와마스까?', meaning: '관련됩니까?' },
        { text: '関(かかわ)ませんか？', ruby: '카카와마셍까?', meaning: '관련되지 않습니까?' },
        { text: '関(かかわ)ました', ruby: '카카와마시타', meaning: '관련됐습니다' },
        { text: '関(かかわ)ませんでした', ruby: '카카와마셍데시타', meaning: '관련되지 않았습니다' },
        { text: '関(かかわ)ましたか？', ruby: '카카와마시타까?', meaning: '관련됐습니까?' },
        { text: '関(かかわ)ませんでしたか？', ruby: '카카와마셍데시타까?', meaning: '관련되지 않았습니까?' },
      ],
      casual: [
        { text: '関(かかわ)わる', ruby: '카카와루', meaning: '관련돼' },
        { text: '関(かかわ)わらない', ruby: '카카와라나이', meaning: '관련되지 않아' },
        { text: '関(かかわ)わる？', ruby: '카카와루?', meaning: '관련돼?' },
        { text: '関(かかわ)わらない？', ruby: '카카와라나이?', meaning: '안 관련돼?' },
        { text: '関(かかわ)わった', ruby: '카카왓타', meaning: '관련됐어' },
        { text: '関(かかわ)わらなかった', ruby: '카카와라나캇타', meaning: '관련되지 않았어' },
        { text: '関(かかわ)わった？', ruby: '카카왓타?', meaning: '관련됐어?' },
        { text: '関(かかわ)わらなかった？', ruby: '카카와라나캇타?', meaning: '관련되지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 사건에 관련된 사람을 조사하고 있어요.',
        japanese: 'この事件(じけん)に関(かか)わっていた人(ひと)を調(しら)べています。',
        plain:    'この事件に関わっていた人を調べています。',
        reading:  '코노 지켄니 카카왓테이타 히토오 시라베테이마스.',
        pattern:  { name: '〜に関わっていた人', meaning: '~에 관련됐던 사람', note: '〜に関わっていた人: 「~에 관련되었던 사람」연체수식.\nこの事件に関わっていた人を調べています에서 関わっていた+人.\nていた는 과거 진행·상태.' },
        furigana: 'このじけんにかかわっていたひとをしらべています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          { phrase_id: 4, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
        ],
      },
      {
        korean:   '환경 문제는 우리 모두에게 관련된 문제야.',
        japanese: '環境(かんきょう)問題(もんだい)は私(わたし)たち全員(ぜんいん)に関(かか)わる問題(もんだい)です。',
        plain:    '環境問題は私たち全員に関わる問題です。',
        reading:  '캉쿄- 몬다이와 와타시타치 젠인니 카카와루 몬다이데스.',
        pattern:  { name: '〜に関わる問題', meaning: '~에 관련된 문제', note: '〜に関わる問題: 「~에 관련된 문제」연체수식.\n環境問題は私たち全員に関わる問題です에서 関わる+問題.\n全員に関わる는 모두에게 해당된다는 뜻.' },
        furigana: 'かんきょうもんだいはわたしたちぜんいんにかかわるもんだいです',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '업무에 관련된 중요한 결정을 했어.',
        japanese: '仕事(しごと)に関(かか)わる大切(たいせつ)な決定(けってい)をした。',
        plain:    '仕事に関わる大切な決定をした。',
        reading:  '시고토니 카카와루 타이세츠나 켓테-오 시타.',
        pattern:  { name: '〜に関わる大切な決定', meaning: '~에 관련된 중요한 결정', note: '〜に関わる大切な決定: 「~과 관련된 중요한 결정」.\n仕事に関わる大切な決定をした에서 関わる+大切な+決定.\n関わる가 명사를 수식하는 연체형.' },
        furigana: 'しごとにかかわるたいせつなけっていをした',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 4, mora_count: 2, accent: [0, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 99위  働く
   * ══════════════════════════════════════════════════ */
  {
    id: 'hataraku', rank: 99, verb: '働く', reading: '하타라쿠', meaning: '일하다; 작용하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '働(はたら)ます', ruby: '하타라마스', meaning: '일합니다' },
        { text: '働(はたら)ません', ruby: '하타라마셍', meaning: '일하지 않습니다' },
        { text: '働(はたら)ますか？', ruby: '하타라마스까?', meaning: '일합니까?' },
        { text: '働(はたら)ませんか？', ruby: '하타라마셍까?', meaning: '일하지 않습니까?' },
        { text: '働(はたら)ました', ruby: '하타라마시타', meaning: '일했습니다' },
        { text: '働(はたら)ませんでした', ruby: '하타라마셍데시타', meaning: '일하지 않았습니다' },
        { text: '働(はたら)ましたか？', ruby: '하타라마시타까?', meaning: '일했습니까?' },
        { text: '働(はたら)ませんでしたか？', ruby: '하타라마셍데시타까?', meaning: '일하지 않았습니까?' },
      ],
      casual: [
        { text: '働(はたら)く', ruby: '하타라쿠', meaning: '일해' },
        { text: '働(はたら)かない', ruby: '하타라카나이', meaning: '일하지 않아' },
        { text: '働(はたら)く？', ruby: '하타라쿠?', meaning: '일해?' },
        { text: '働(はたら)かない？', ruby: '하타라카나이?', meaning: '안 일해?' },
        { text: '働(はたら)いた', ruby: '하타라이타', meaning: '일했어' },
        { text: '働(はたら)かなかった', ruby: '하타라카나캇타', meaning: '일하지 않았어' },
        { text: '働(はたら)いた？', ruby: '하타라이타?', meaning: '일했어?' },
        { text: '働(はたら)かなかった？', ruby: '하타라카나캇타?', meaning: '일하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀는 지역 회사에서 일하고 있어요.',
        japanese: '彼女(かのじょ)は地元(じもと)の会社(かいしゃ)で働(はたら)いています。',
        plain:    '彼女は地元の会社で働いています。',
        reading:  '카노죠와 지모토노 카이샤데 하타라이테이마스.',
        pattern:  { name: '〜で働く', meaning: '~에서 일하다', note: '〜で働く: 「~에서 일하다」장소+동작 표현.\n彼女は地元の会社で働いています에서 会社+で+働いています.\nで는 동작의 장소. ている는 현재 직업 상태.' },
        furigana: 'かのじょはじもとのかいしゃではたらいています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [1, 0, 0, 0, 0, 1, 1] },
        ],
      },
      {
        korean:   '일하면서 자격증을 땄어요.',
        japanese: '働(はたら)きながら資格(しかく)を取(と)りました。',
        plain:    '働きながら資格を取りました。',
        reading:  '하타라키나가라 시카쿠오 토리마시타.',
        pattern:  { name: '〜ながら資格を取る', meaning: '~하면서 자격증을 따다', note: '〜ながら資格を取る: 「~하면서 자격증을 취득하다」.\n働きながら資格を取りました에서 働き+ながら+資格を取る.\nながら는 두 동작의 동시 진행.' },
        furigana: 'はたらきながらしかくをとりました',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '약이 몸속에서 작용하고 있어.',
        japanese: '薬(くすり)が体(からだ)の中(なか)で働(はたら)いている。',
        plain:    '薬が体の中で働いている。',
        reading:  '쿠스리가 카라다노 나카데 하타라이테이루.',
        pattern:  { name: '〜の中で働く', meaning: '~안에서 작용하다', note: '〜の中で働く: 「~의 안에서 작용하다」.\n薬が体の中で働いている에서 体の中+で+働いている.\n薬が働く는 「약이 작용하다」.' },
        furigana: 'くすりがからだのなかではたらいている',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 100위  送る
   * ══════════════════════════════════════════════════ */
  {
    id: 'okuru', rank: 100, verb: '送る', reading: '오쿠루', meaning: '보내다; 전송하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '送(おく)ます', ruby: '오쿠마스', meaning: '보냅니다' },
        { text: '送(おく)ません', ruby: '오쿠마셍', meaning: '보내지 않습니다' },
        { text: '送(おく)ますか？', ruby: '오쿠마스까?', meaning: '보냅니까?' },
        { text: '送(おく)ませんか？', ruby: '오쿠마셍까?', meaning: '보내지 않습니까?' },
        { text: '送(おく)ました', ruby: '오쿠마시타', meaning: '보냈습니다' },
        { text: '送(おく)ませんでした', ruby: '오쿠마셍데시타', meaning: '보내지 않았습니다' },
        { text: '送(おく)ましたか？', ruby: '오쿠마시타까?', meaning: '보냈습니까?' },
        { text: '送(おく)ませんでしたか？', ruby: '오쿠마셍데시타까?', meaning: '보내지 않았습니까?' },
      ],
      casual: [
        { text: '送(おく)る', ruby: '오쿠루', meaning: '보내' },
        { text: '送(おく)らない', ruby: '오쿠라나이', meaning: '보내지 않아' },
        { text: '送(おく)る？', ruby: '오쿠루?', meaning: '보내?' },
        { text: '送(おく)らない？', ruby: '오쿠라나이?', meaning: '안 보내?' },
        { text: '送(おく)った', ruby: '오쿳타', meaning: '보냈어' },
        { text: '送(おく)らなかった', ruby: '오쿠라나캇타', meaning: '보내지 않았어' },
        { text: '送(おく)った？', ruby: '오쿳타?', meaning: '보냈어?' },
        { text: '送(おく)らなかった？', ruby: '오쿠라나캇타?', meaning: '보내지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '친구에게 생일 선물을 보냈어.',
        japanese: '友達(ともだち)に誕生日(たんじょうび)プレゼントを送(おく)った。',
        plain:    '友達に誕生日プレゼントを送った。',
        reading:  '토모다치니 탄죠-비 푸레젠토오 오쿳타.',
        pattern:  { name: '〜に〜を送る', meaning: '~에게 ~을 보내다', note: '〜に〜を送る: 「~에게 ~을 보내다」.\n友達に誕生日プレゼントを送った에서 友達+に+プレゼント+を+送った.\nに는 수신자를 나타냄.' },
        furigana: 'ともだちにたんじょうびぷれぜんとをおくった',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '짐을 택배로 보내 주세요.',
        japanese: '荷物(にもつ)を宅配便(たくはいびん)で送(おく)ってください。',
        plain:    '荷物を宅配便で送ってください。',
        reading:  '니모츠오 타쿠하이빈데 오쿳테쿠다사이.',
        pattern:  { name: '〜で送ってください', meaning: '~으로 보내 주세요', note: '〜で送ってください: 「~으로 보내 주세요」수단+요청.\n荷物を宅配便で送ってください에서 宅配便+で+送って+ください.\nで는 수단·방법을 나타냄.' },
        furigana: 'にもつをたくはいびんでおくってください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
      {
        korean:   '충실한 매일을 보내고 있어요.',
        japanese: '充実(じゅうじつ)した毎日(まいにち)を送(おく)っています。',
        plain:    '充実した毎日を送っています。',
        reading:  '쥬-지츠시타 마이니치오 오쿳테이마스.',
        pattern:  { name: '〜を送っている', meaning: '~을 보내고 있다 (생활)', note: '〜を送っている: 「~을 보내고 있다·영위하고 있다」.\n充実した毎日を送っています에서 毎日+を+送っています.\n日々を送る는 「나날을 보내다」관용구.' },
        furigana: 'じゅうじつしたまいにちをおくっています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 7, accent: [1, 0, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
]
