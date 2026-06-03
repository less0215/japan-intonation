/* 동사 학습 데이터
 * rank: 전체 순위 (BCCWJコーパス 기준 빈도순)
 * 1~10위: forms + examples 완성
 * 11~50위: 기본 정보만 (준비 중)
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

export const VERBS = [

  /* ── 1위 ── */
  {
    id: 'iu',
    rank: 1,
    verb: '言う',
    reading: '이우',
    meaning: '말하다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: '言います',      ruby: '이이마스',    meaning: '말합니다 / 말할 겁니다' },
            casual: { text: '言う',           ruby: '이우',        meaning: '말해 / 말할 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: '言いません',     ruby: '이이마셍',    meaning: '안 말합니다' },
            casual: { text: '言わない',       ruby: '이와나이',    meaning: '안 말해' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: '言いますか？',   ruby: '이이마스까?', meaning: '말합니까?' },
            casual: { text: '言う？↑',        ruby: '이우?',       meaning: '말해?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: '言いませんか？', ruby: '이이마셍까?', meaning: '안 말합니까?' },
            casual: { text: '言わない？↑',    ruby: '이와나이?',   meaning: '안 말해?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '뭐라고 했어요?',
        japanese: '何(なに)と言(い)いましたか？',
        plain:    '何と言いましたか？',
        reading:  '나니토 이이마시타까?',
        furigana: 'なにといいましたか',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그렇게 말하지 마.',
        japanese: 'そんなことを言(い)わないで。',
        plain:    'そんなことを言わないで。',
        reading:  '손나 코토오 이와나이데.',
        furigana: 'そんなことをいわないで',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 2위 ── */
  {
    id: 'suru',
    rank: 2,
    verb: 'する',
    reading: '스루',
    meaning: '하다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: 'します',      ruby: '시마스',    meaning: '합니다 / 할 겁니다' },
            casual: { text: 'する',         ruby: '스루',      meaning: '해 / 할 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: 'しません',     ruby: '시마셍',    meaning: '안 합니다' },
            casual: { text: 'しない',       ruby: '시나이',    meaning: '안 해' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: 'しますか？',   ruby: '시마스까?', meaning: '합니까?' },
            casual: { text: 'する？↑',      ruby: '스루?',     meaning: '해?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: 'しませんか？', ruby: '시마셍까?', meaning: '안 합니까?' },
            casual: { text: 'しない？↑',    ruby: '시나이?',   meaning: '안 해?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '매일 공부합니다.',
        japanese: '毎日(まいにち)、勉強(べんきょう)します。',
        plain:    '毎日、勉強します。',
        reading:  '마이니치, 벵쿄시마스.',
        furigana: 'まいにちべんきょうします',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 8, accent: [1, 0, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '오늘은 일 안 해요.',
        japanese: '今日(きょう)は仕事(しごと)しない。',
        plain:    '今日は仕事しない。',
        reading:  '쿄와 시고토 시나이.',
        furigana: 'きょうはしごとしない',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 8, accent: [0, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 3위 ── */
  {
    id: 'aru',
    rank: 3,
    verb: 'ある',
    reading: '아루',
    meaning: '있다 (사물)',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: 'あります',      ruby: '아리마스',    meaning: '있습니다' },
            casual: { text: 'ある',           ruby: '아루',        meaning: '있어' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: 'ありません',     ruby: '아리마셍',    meaning: '없습니다' },
            casual: { text: 'ない',           ruby: '나이',        meaning: '없어' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: 'ありますか？',   ruby: '아리마스까?', meaning: '있습니까?' },
            casual: { text: 'ある？↑',        ruby: '아루?',       meaning: '있어?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: 'ありませんか？', ruby: '아리마셍까?', meaning: '없습니까?' },
            casual: { text: 'ない？↑',        ruby: '나이?',       meaning: '없어?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '역 근처에 편의점이 있어요.',
        japanese: '駅(えき)の近(ちか)くにコンビニがあります。',
        plain:    '駅の近くにコンビニがあります。',
        reading:  '에키노 치카쿠니 콘비니가 아리마스.',
        furigana: 'えきのちかくにこんびにがあります',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '시간 있어?',
        japanese: '時間(じかん)ある？',
        plain:    '時間ある？',
        reading:  '지캉 아루?',
        furigana: 'じかんある',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ── 4위 ── */
  {
    id: 'naru',
    rank: 4,
    verb: 'なる',
    reading: '나루',
    meaning: '되다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: 'なります',      ruby: '나리마스',    meaning: '됩니다 / 될 겁니다' },
            casual: { text: 'なる',           ruby: '나루',        meaning: '돼 / 될 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: 'なりません',     ruby: '나리마셍',    meaning: '안 됩니다' },
            casual: { text: 'ならない',       ruby: '나라나이',    meaning: '안 돼' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: 'なりますか？',   ruby: '나리마스까?', meaning: '됩니까?' },
            casual: { text: 'なる？↑',        ruby: '나루?',       meaning: '돼?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: 'なりませんか？', ruby: '나리마셍까?', meaning: '안 됩니까?' },
            casual: { text: 'ならない？↑',    ruby: '나라나이?',   meaning: '안 돼?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '선생님이 되고 싶어요.',
        japanese: '先生(せんせい)になりたいです。',
        plain:    '先生になりたいです。',
        reading:  '센세이니 나리타이데스.',
        furigana: 'せんせいになりたいです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '봄이 됐네요.',
        japanese: '春(はる)になりましたね。',
        plain:    '春になりましたね。',
        reading:  '하루니 나리마시타네.',
        furigana: 'はるになりましたね',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 5위 ── */
  {
    id: 'omou',
    rank: 5,
    verb: '思う',
    reading: '오모우',
    meaning: '생각하다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: '思います',      ruby: '오모이마스',    meaning: '생각합니다' },
            casual: { text: '思う',           ruby: '오모우',        meaning: '생각해' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: '思いません',     ruby: '오모이마셍',    meaning: '생각 안 합니다' },
            casual: { text: '思わない',       ruby: '오모와나이',    meaning: '생각 안 해' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: '思いますか？',   ruby: '오모이마스까?', meaning: '생각하십니까?' },
            casual: { text: '思う？↑',        ruby: '오모우?',       meaning: '생각해?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: '思いませんか？', ruby: '오모이마셍까?', meaning: '생각 안 하십니까?' },
            casual: { text: '思わない？↑',    ruby: '오모와나이?',   meaning: '생각 안 해?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '그거 좋은 생각인 것 같아요.',
        japanese: 'それはいい考(かんが)えだと思(おも)います。',
        plain:    'それはいい考えだと思います。',
        reading:  '소레와 이이 캉가에다토 오모이마스.',
        furigana: 'それはいいかんがえだとおもいます',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '어떻게 생각해?',
        japanese: 'どう思(おも)う？',
        plain:    'どう思う？',
        reading:  '도오 오모우?',
        furigana: 'どうおもう',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 6위 ── */
  {
    id: 'iku',
    rank: 6,
    verb: '行く',
    reading: '이쿠',
    meaning: '가다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: '行きます',      ruby: '이키마스',    meaning: '갑니다 / 갈 겁니다' },
            casual: { text: '行く',           ruby: '이쿠',        meaning: '가 / 갈 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: '行きません',     ruby: '이키마셍',    meaning: '안 갑니다' },
            casual: { text: '行かない',       ruby: '이카나이',    meaning: '안 가' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: '行きますか？',   ruby: '이키마스까?', meaning: '갑니까?' },
            casual: { text: '行く？↑',        ruby: '이쿠?',       meaning: '가?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: '行きませんか？', ruby: '이키마셍까?', meaning: '안 갑니까?' },
            casual: { text: '行かない？↑',    ruby: '이카나이?',   meaning: '안 가?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '학교에 갑니다.',
        japanese: '学校(がっこう)に行(い)きます。',
        plain:    '学校に行きます。',
        reading:  '각코니 이키마스.',
        furigana: 'がっこうにいきます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '같이 안 갈래?',
        japanese: '一緒(いっしょ)に行(い)かない？',
        plain:    '一緒に行かない？',
        reading:  '잇쇼니 이카나이?',
        furigana: 'いっしょにいかない',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 7위 ── */
  {
    id: 'kuru',
    rank: 7,
    verb: '来る',
    reading: '쿠루',
    meaning: '오다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: '来ます',      ruby: '키마스',    meaning: '옵니다 / 올 겁니다' },
            casual: { text: '来る',         ruby: '쿠루',      meaning: '와 / 올 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: '来ません',     ruby: '키마셍',    meaning: '안 옵니다' },
            casual: { text: '来ない',       ruby: '코나이',    meaning: '안 와' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: '来ますか？',   ruby: '키마스까?', meaning: '옵니까?' },
            casual: { text: '来る？↑',      ruby: '쿠루?',     meaning: '와?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: '来ませんか？', ruby: '키마셍까?', meaning: '안 오십니까?' },
            casual: { text: '来ない？↑',    ruby: '코나이?',   meaning: '안 와?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '내일 파티에 와요.',
        japanese: '明日(あした)パーティーに来(き)てください。',
        plain:    '明日パーティーに来てください。',
        reading:  '아시타 파ー티ー니 키테 쿠다사이.',
        furigana: 'あしたぱーてぃーにきてください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '언제 와?',
        japanese: 'いつ来(く)る？',
        plain:    'いつ来る？',
        reading:  '이츠 쿠루?',
        furigana: 'いつくる',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 8위 ── */
  {
    id: 'miru',
    rank: 8,
    verb: '見る',
    reading: '미루',
    meaning: '보다',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: '見ます',      ruby: '미마스',    meaning: '봅니다 / 볼 겁니다' },
            casual: { text: '見る',         ruby: '미루',      meaning: '봐 / 볼 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: '見ません',     ruby: '미마셍',    meaning: '안 봅니다' },
            casual: { text: '見ない',       ruby: '미나이',    meaning: '안 봐' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: '見ますか？',   ruby: '미마스까?', meaning: '봅니까?' },
            casual: { text: '見る？↑',      ruby: '미루?',     meaning: '봐?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: '見ませんか？', ruby: '미마셍까?', meaning: '안 봅니까?' },
            casual: { text: '見ない？↑',    ruby: '미나이?',   meaning: '안 봐?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '이 영화 봤어요?',
        japanese: 'この映画(えいが)見(み)ましたか？',
        plain:    'この映画見ましたか？',
        reading:  '코노 에이가 미마시타까?',
        furigana: 'このえいがみましたか',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '텔레비전 안 봐.',
        japanese: 'テレビを見(み)ない。',
        plain:    'テレビを見ない。',
        reading:  '테레비오 미나이.',
        furigana: 'てれびをみない',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 9위 ── */
  {
    id: 'yaru',
    rank: 9,
    verb: 'やる',
    reading: '야루',
    meaning: '하다 (구어)',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: 'やります',      ruby: '야리마스',    meaning: '합니다 / 할 겁니다' },
            casual: { text: 'やる',           ruby: '야루',        meaning: '해 / 할 거야' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: 'やりません',     ruby: '야리마셍',    meaning: '안 합니다' },
            casual: { text: 'やらない',       ruby: '야라나이',    meaning: '안 해' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: 'やりますか？',   ruby: '야리마스까?', meaning: '합니까?' },
            casual: { text: 'やる？↑',        ruby: '야루?',       meaning: '해?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: 'やりませんか？', ruby: '야리마셍까?', meaning: '안 합니까?' },
            casual: { text: 'やらない？↑',    ruby: '야라나이?',   meaning: '안 해?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '할 수 있어, 해봐!',
        japanese: 'できる、やってみて！',
        plain:    'できる、やってみて！',
        reading:  '데키루, 얏테 미테!',
        furigana: 'できるやってみて',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이번엔 제대로 해볼게.',
        japanese: '今回(こんかい)はちゃんとやる。',
        plain:    '今回はちゃんとやる。',
        reading:  '콘카이와 챤토 야루.',
        furigana: 'こんかいはちゃんとやる',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 10위 ── */
  {
    id: 'iru',
    rank: 10,
    verb: 'いる',
    reading: '이루',
    meaning: '있다 (사람·동물)',
    forms: [
      {
        name: '현재형',
        nameJp: '現在形',
        rows: [
          {
            label: '긍정', sub: '현재/미래',
            formal: { text: 'います',      ruby: '이마스',    meaning: '있습니다' },
            casual: { text: 'いる',         ruby: '이루',      meaning: '있어' },
          },
          {
            label: '부정', sub: '현재/미래',
            formal: { text: 'いません',     ruby: '이마셍',    meaning: '없습니다' },
            casual: { text: 'いない',       ruby: '이나이',    meaning: '없어' },
          },
          {
            label: '긍정 의문', sub: '',
            formal: { text: 'いますか？',   ruby: '이마스까?', meaning: '있습니까?' },
            casual: { text: 'いる？↑',      ruby: '이루?',     meaning: '있어?' },
          },
          {
            label: '부정 의문', sub: '',
            formal: { text: 'いませんか？', ruby: '이마셍까?', meaning: '없습니까?' },
            casual: { text: 'いない？↑',    ruby: '이나이?',   meaning: '없어?' },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   '집에 있어요.',
        japanese: '家(いえ)にいます。',
        plain:    '家にいます。',
        reading:  '이에니 이마스.',
        furigana: 'いえにいます',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '거기 누구 있어?',
        japanese: 'そこに誰(だれ)かいる？',
        plain:    'そこに誰かいる？',
        reading:  '소코니 다레카 이루?',
        furigana: 'そこにだれかいる',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },

  /* ── 11~50위: 준비 중 (탭 생성용) ── */
  { id: 'dekiru',   rank: 11, verb: 'できる',   reading: '데키루',   meaning: '할 수 있다; 생기다',        forms: [], examples: [] },
  { id: 'motsu',    rank: 12, verb: '持つ',     reading: '모츠',     meaning: '가지다; 들다',               forms: [], examples: [] },
  { id: 'deru',     rank: 13, verb: '出る',     reading: '데루',     meaning: '나오다; 나가다',             forms: [], examples: [] },
  { id: 'kangaeru', rank: 14, verb: '考える',   reading: '캉가에루', meaning: '생각하다; 고려하다',         forms: [], examples: [] },
  { id: 'wakaru',   rank: 15, verb: '分かる',   reading: '와카루',   meaning: '알다; 이해하다',             forms: [], examples: [] },
  { id: 'hairu',    rank: 16, verb: '入る',     reading: '하이루',   meaning: '들어가다',                   forms: [], examples: [] },
  { id: 'tsukuru',  rank: 17, verb: '作る',     reading: '츠쿠루',   meaning: '만들다',                     forms: [], examples: [] },
  { id: 'kiku',     rank: 18, verb: '聞く',     reading: '키쿠',     meaning: '듣다; 묻다',                 forms: [], examples: [] },
  { id: 'tsukau',   rank: 19, verb: '使う',     reading: '츠카우',   meaning: '사용하다',                   forms: [], examples: [] },
  { id: 'toru',     rank: 20, verb: '取る',     reading: '토루',     meaning: '잡다; 가져가다',             forms: [], examples: [] },

  { id: 'shiru',    rank: 21, verb: '知る',     reading: '시루',     meaning: '알다',                       forms: [], examples: [] },
  { id: 'okonau',   rank: 22, verb: '行う',     reading: '오코나우',  meaning: '행하다; 실시하다',           forms: [], examples: [] },
  { id: 'shigoto',  rank: 23, verb: '仕事する', reading: '시고토스루', meaning: '일하다',                   forms: [], examples: [] },
  { id: 'taberu',   rank: 24, verb: '食べる',   reading: '타베루',   meaning: '먹다',                       forms: [], examples: [] },
  { id: 'kaku',     rank: 25, verb: '書く',     reading: '카쿠',     meaning: '쓰다',                       forms: [], examples: [] },
  { id: 'ireru',    rank: 26, verb: '入れる',   reading: '이레루',   meaning: '넣다',                       forms: [], examples: [] },
  { id: 'tsuku',    rank: 27, verb: '付く',     reading: '츠쿠',     meaning: '붙다; 달라붙다',             forms: [], examples: [] },
  { id: 'dasu',     rank: 28, verb: '出す',     reading: '다스',     meaning: '꺼내다; 내다',               forms: [], examples: [] },
  { id: 'gozaru',   rank: 29, verb: 'ございます', reading: '고자이마스', meaning: '있습니다 (경어)',         forms: [], examples: [] },
  { id: 'chigau',   rank: 30, verb: '違う',     reading: '치가우',   meaning: '다르다; 틀리다',             forms: [], examples: [] },

  { id: 'ukeru',    rank: 31, verb: '受ける',   reading: '우케루',   meaning: '받다; 수용하다',             forms: [], examples: [] },
  { id: 'hanasu',   rank: 32, verb: '話す',     reading: '하나스',   meaning: '말하다; 이야기하다',         forms: [], examples: [] },
  { id: 'kaeru',    rank: 33, verb: '帰る',     reading: '카에루',   meaning: '돌아가다',                   forms: [], examples: [] },
  { id: 'kakeru',   rank: 34, verb: '掛ける',   reading: '카케루',   meaning: '걸다; (시간·돈이) 들다',    forms: [], examples: [] },
  { id: 'owaru',    rank: 35, verb: '終わる',   reading: '오와루',   meaning: '끝나다',                     forms: [], examples: [] },
  { id: 'imisuru',  rank: 36, verb: '意味する', reading: '이미스루', meaning: '의미하다',                   forms: [], examples: [] },
  { id: 'tsukeru',  rank: 37, verb: '付ける',   reading: '츠케루',   meaning: '붙이다; 켜다',               forms: [], examples: [] },
  { id: 'kanjiru',  rank: 38, verb: '感じる',   reading: '캉지루',   meaning: '느끼다',                     forms: [], examples: [] },
  { id: 'kakaru',   rank: 39, verb: 'かかる',   reading: '카카루',   meaning: '(시간·돈이) 걸리다',        forms: [], examples: [] },
  { id: 'sumu',     rank: 40, verb: '住む',     reading: '스무',     meaning: '살다; 거주하다',             forms: [], examples: [] },

  { id: 'seikatsu', rank: 41, verb: '生活する', reading: '세이카츠스루', meaning: '생활하다',              forms: [], examples: [] },
  { id: 'ageru',    rank: 42, verb: 'あげる',   reading: '아게루',   meaning: '올리다; 주다',               forms: [], examples: [] },
  { id: 'noru',     rank: 43, verb: '乗る',     reading: '노루',     meaning: '타다',                       forms: [], examples: [] },
  { id: 'mieru',    rank: 44, verb: '見える',   reading: '미에루',   meaning: '보이다',                     forms: [], examples: [] },
  { id: 'kawaru',   rank: 45, verb: '変わる',   reading: '카와루',   meaning: '바뀌다; 변하다',             forms: [], examples: [] },
  { id: 'yomu',     rank: 46, verb: '読む',     reading: '요무',     meaning: '읽다',                       forms: [], examples: [] },
  { id: 'oshieru',  rank: 47, verb: '教える',   reading: '오시에루', meaning: '가르치다; 알려주다',         forms: [], examples: [] },
  { id: 'oku',      rank: 48, verb: '置く',     reading: '오쿠',     meaning: '놓다; 두다',                 forms: [], examples: [] },
  { id: 'nokoru',   rank: 49, verb: '残る',     reading: '노코루',   meaning: '남다',                       forms: [], examples: [] },
  { id: 'yobu',     rank: 50, verb: '呼ぶ',     reading: '요부',     meaning: '부르다',                     forms: [], examples: [] },
]
