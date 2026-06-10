/* い형용사 학습 데이터 (BCCWJ 빈도 순)
 * conjugations.formal / plain : 각 8개 (현재긍/부정/긍질/부질 + 과거 동일)
 */

export function getRankTabs(items, pageSize = 10) {
  const max = items.reduce((m, v) => Math.max(m, v.rank), 0)
  const tabs = []
  for (let start = 1; start <= max; start += pageSize) {
    const end = Math.min(start + pageSize - 1, max)
    tabs.push({ id: `${start}-${end}`, label: `${start}~${end}위`, start, end })
  }
  return tabs
}

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

export const ADJ_I = [

  /* ══════════════════════════════════════════════════
   * 1위  多い
   * ══════════════════════════════════════════════════ */
  {
    id: 'ooi', rank: 1, verb: '多い', reading: '오오이', meaning: '많다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '多(おお)いです',               ruby: '오오이데스',           meaning: '많습니다' },
        { text: '多(おお)くないです',            ruby: '오오쿠나이데스',       meaning: '많지 않습니다' },
        { text: '多(おお)いですか？',            ruby: '오오이데스까?',        meaning: '많습니까?' },
        { text: '多(おお)くないですか？',        ruby: '오오쿠나이데스까?',    meaning: '많지 않습니까?' },
        { text: '多(おお)かったです',            ruby: '오오캇타데스',         meaning: '많았습니다' },
        { text: '多(おお)くなかったです',        ruby: '오오쿠나캇타데스',     meaning: '많지 않았습니다' },
        { text: '多(おお)かったですか？',        ruby: '오오캇타데스까?',      meaning: '많았습니까?' },
        { text: '多(おお)くなかったですか？',    ruby: '오오쿠나캇타데스까?',  meaning: '많지 않았습니까?' },
      ],
      plain: [
        { text: '多(おお)い',           ruby: '오오이',        meaning: '많아' },
        { text: '多(おお)くない',       ruby: '오오쿠나이',    meaning: '많지 않아' },
        { text: '多(おお)い？',         ruby: '오오이?',       meaning: '많아?' },
        { text: '多(おお)くない？',     ruby: '오오쿠나이?',   meaning: '많지 않아?' },
        { text: '多(おお)かった',       ruby: '오오캇타',      meaning: '많았어' },
        { text: '多(おお)くなかった',   ruby: '오오쿠나캇타',  meaning: '많지 않았어' },
        { text: '多(おお)かった？',     ruby: '오오캇타?',     meaning: '많았어?' },
        { text: '多(おお)くなかった？', ruby: '오오쿠나캇타?', meaning: '많지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 도시에는 사람이 많아.',
        japanese: 'この街(まち)は人(ひと)が多(おお)い。',
        plain:    'この街は人が多い。',
        reading:  '코노 마치와 히토가 오오이.',
        pattern:  { name: '〜が多い', meaning: '~이/가 많다', note: '수량·빈도가 많음을 나타냄' },
        furigana: 'このまちはひとがおおい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '할 일이 너무 많아서 힘들어.',
        japanese: 'やることが多(おお)くて大変(たいへん)だ。',
        plain:    'やることが多くて大変だ。',
        reading:  '야루코토가 오오쿠테 타이헨다.',
        pattern:  { name: '〜くて', meaning: '~해서 (い형용사 원인)', note: 'い형용사 어간 + くて. 이유·원인을 나타냄' },
        furigana: 'やることがおおくてたいへんだ',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '지난달보다 비가 더 많이 왔어.',
        japanese: '先月(せんげつ)より雨(あめ)が多(おお)かった。',
        plain:    '先月より雨が多かった。',
        reading:  '센게츠요리 아메가 오오캇타.',
        pattern:  { name: '〜より〜が多い', meaning: '~보다 ~이 많다', note: '비교 표현. より 뒤에 비교 기준을 나타냄' },
        furigana: 'せんげつよりあめがおおかった',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 2위  高い
   * ══════════════════════════════════════════════════ */
  {
    id: 'takai', rank: 2, verb: '高い', reading: '타카이', meaning: '높다; 비싸다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '高(たか)いです',               ruby: '타카이데스',           meaning: '높습니다' },
        { text: '高(たか)くないです',            ruby: '타카쿠나이데스',       meaning: '높지 않습니다' },
        { text: '高(たか)いですか？',            ruby: '타카이데스까?',        meaning: '높습니까?' },
        { text: '高(たか)くないですか？',        ruby: '타카쿠나이데스까?',    meaning: '높지 않습니까?' },
        { text: '高(たか)かったです',            ruby: '타카캇타데스',         meaning: '높았습니다' },
        { text: '高(たか)くなかったです',        ruby: '타카쿠나캇타데스',     meaning: '높지 않았습니다' },
        { text: '高(たか)かったですか？',        ruby: '타카캇타데스까?',      meaning: '높았습니까?' },
        { text: '高(たか)くなかったですか？',    ruby: '타카쿠나캇타데스까?',  meaning: '높지 않았습니까?' },
      ],
      plain: [
        { text: '高(たか)い',           ruby: '타카이',        meaning: '높아' },
        { text: '高(たか)くない',       ruby: '타카쿠나이',    meaning: '높지 않아' },
        { text: '高(たか)い？',         ruby: '타카이?',       meaning: '높아?' },
        { text: '高(たか)くない？',     ruby: '타카쿠나이?',   meaning: '높지 않아?' },
        { text: '高(たか)かった',       ruby: '타카캇타',      meaning: '높았어' },
        { text: '高(たか)くなかった',   ruby: '타카쿠나캇타',  meaning: '높지 않았어' },
        { text: '高(たか)かった？',     ruby: '타카캇타?',     meaning: '높았어?' },
        { text: '高(たか)くなかった？', ruby: '타카쿠나캇타?', meaning: '높지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 빌딩은 정말 높다.',
        japanese: 'このビルはとても高(たか)い。',
        plain:    'このビルはとても高い。',
        reading:  '코노 비루와 토테모 타카이.',
        pattern:  { name: 'とても〜い', meaning: '정말 ~하다', note: 'とても는 い형용사·な형용사를 강조하는 부사' },
        furigana: 'このびるはとてもたかい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '이 가게는 그다지 비싸지 않아.',
        japanese: 'このお店(みせ)はそれほど高(たか)くない。',
        plain:    'このお店はそれほど高くない。',
        reading:  '코노 오미세와 소레호도 타카쿠나이.',
        pattern:  { name: 'それほど〜くない', meaning: '그다지 ~하지 않다', note: '정도 부사 それほど와 부정형의 결합' },
        furigana: 'このおみせはそれほどたかくない',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 0, 1, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '예전에는 이 동네 집값이 높지 않았어.',
        japanese: '昔(むかし)はこの地域(ちいき)の家賃(やちん)は高(たか)くなかった。',
        plain:    '昔はこの地域の家賃は高くなかった。',
        reading:  '무카시와 코노 치이키노 야칭와 타카쿠나캇타.',
        pattern:  { name: '〜くなかった', meaning: '~하지 않았다 (과거 부정)', note: 'い형용사 어간 + くなかった. 과거의 부정 상태' },
        furigana: 'むかしはこのちいきのやちんはたかくなかった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 3위  大きい
   * ══════════════════════════════════════════════════ */
  {
    id: 'ookii', rank: 3, verb: '大きい', reading: '오오키이', meaning: '크다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '大(おお)きいです',               ruby: '오오키이데스',           meaning: '큽니다' },
        { text: '大(おお)きくないです',            ruby: '오오키쿠나이데스',       meaning: '크지 않습니다' },
        { text: '大(おお)きいですか？',            ruby: '오오키이데스까?',        meaning: '큽니까?' },
        { text: '大(おお)きくないですか？',        ruby: '오오키쿠나이데스까?',    meaning: '크지 않습니까?' },
        { text: '大(おお)きかったです',            ruby: '오오키캇타데스',         meaning: '컸습니다' },
        { text: '大(おお)きくなかったです',        ruby: '오오키쿠나캇타데스',     meaning: '크지 않았습니다' },
        { text: '大(おお)きかったですか？',        ruby: '오오키캇타데스까?',      meaning: '컸습니까?' },
        { text: '大(おお)きくなかったですか？',    ruby: '오오키쿠나캇타데스까?',  meaning: '크지 않았습니까?' },
      ],
      plain: [
        { text: '大(おお)きい',           ruby: '오오키이',        meaning: '커' },
        { text: '大(おお)きくない',       ruby: '오오키쿠나이',    meaning: '크지 않아' },
        { text: '大(おお)きい？',         ruby: '오오키이?',       meaning: '커?' },
        { text: '大(おお)きくない？',     ruby: '오오키쿠나이?',   meaning: '크지 않아?' },
        { text: '大(おお)きかった',       ruby: '오오키캇타',      meaning: '컸어' },
        { text: '大(おお)きくなかった',   ruby: '오오키쿠나캇타',  meaning: '크지 않았어' },
        { text: '大(おお)きかった？',     ruby: '오오키캇타?',     meaning: '컸어?' },
        { text: '大(おお)きくなかった？', ruby: '오오키쿠나캇타?', meaning: '크지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '저 나무 정말 크다.',
        japanese: 'あの木(き)は本当(ほんとう)に大(おお)きい。',
        plain:    'あの木は本当に大きい。',
        reading:  '아노 키와 혼토ー니 오오키이.',
        pattern:  { name: '本当に〜い', meaning: '정말로 ~하다', note: '本当に는 강조 부사. 감탄·확인에 자주 사용' },
        furigana: 'あのきはほんとうにおおきい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 1, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '더 큰 사이즈는 없어요?',
        japanese: 'もっと大(おお)きいサイズはないですか？',
        plain:    'もっと大きいサイズはないですか？',
        reading:  '못토 오오키이 사이즈와 나이데스까?',
        pattern:  { name: 'もっと〜い', meaning: '더 ~한', note: 'もっと는 비교 강도를 높이는 부사' },
        furigana: 'もっとおおきいさいずはないですか',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '어렸을 때 이 집이 훨씬 크게 느껴졌어.',
        japanese: '子供(こども)の頃(ころ)はこの家(いえ)がもっと大(おお)きく感(かん)じた。',
        plain:    '子供の頃はこの家がもっと大きく感じた。',
        reading:  '코도모노 코로와 코노 이에가 못토 오오키쿠 칸지타.',
        pattern:  { name: '〜く感じる', meaning: '~하게 느껴지다', note: 'い형용사 어간 + く + 동사. 형용사를 부사적으로 활용하는 형태' },
        furigana: 'こどものころはこのいえがもっとおおきくかんじた',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 4위  強い
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsuyoi', rank: 4, verb: '強い', reading: '츠요이', meaning: '강하다; 강력하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '強(つよ)いです',               ruby: '츠요이데스',           meaning: '강합니다' },
        { text: '強(つよ)くないです',            ruby: '츠요쿠나이데스',       meaning: '강하지 않습니다' },
        { text: '強(つよ)いですか？',            ruby: '츠요이데스까?',        meaning: '강합니까?' },
        { text: '強(つよ)くないですか？',        ruby: '츠요쿠나이데스까?',    meaning: '강하지 않습니까?' },
        { text: '強(つよ)かったです',            ruby: '츠요캇타데스',         meaning: '강했습니다' },
        { text: '強(つよ)くなかったです',        ruby: '츠요쿠나캇타데스',     meaning: '강하지 않았습니다' },
        { text: '強(つよ)かったですか？',        ruby: '츠요캇타데스까?',      meaning: '강했습니까?' },
        { text: '強(つよ)くなかったですか？',    ruby: '츠요쿠나캇타데스까?',  meaning: '강하지 않았습니까?' },
      ],
      plain: [
        { text: '強(つよ)い',           ruby: '츠요이',        meaning: '강해' },
        { text: '強(つよ)くない',       ruby: '츠요쿠나이',    meaning: '강하지 않아' },
        { text: '強(つよ)い？',         ruby: '츠요이?',       meaning: '강해?' },
        { text: '強(つよ)くない？',     ruby: '츠요쿠나이?',   meaning: '강하지 않아?' },
        { text: '強(つよ)かった',       ruby: '츠요캇타',      meaning: '강했어' },
        { text: '強(つよ)くなかった',   ruby: '츠요쿠나캇타',  meaning: '강하지 않았어' },
        { text: '強(つよ)かった？',     ruby: '츠요캇타?',     meaning: '강했어?' },
        { text: '強(つよ)くなかった？', ruby: '츠요쿠나캇타?', meaning: '강하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그 선수는 정신력이 강해.',
        japanese: 'あの選手(せんしゅ)は精神力(せいしんりょく)が強(つよ)い。',
        plain:    'あの選手は精神力が強い。',
        reading:  '아노 센슈와 세이싱료쿠가 츠요이.',
        pattern:  { name: '〜が強い', meaning: '~이/가 강하다', note: '능력·특성이 강함을 나타냄' },
        furigana: 'あのせんしゅはせいしんりょくがつよい',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 1, mora_count: 9, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '바람이 강해서 우산을 쓸 수 없었어.',
        japanese: '風(かぜ)が強(つよ)くて傘(かさ)がさせなかった。',
        plain:    '風が強くて傘がさせなかった。',
        reading:  '카제가 츠요쿠테 카사가 사세나캇타.',
        pattern:  { name: '〜くて〜できない', meaning: '~해서 ~할 수 없다', note: 'くて로 원인을 나타내고 부정 결과로 이어지는 표현' },
        furigana: 'かぜがつよくてかさがさせなかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '예전보다 훨씬 강해졌어.',
        japanese: '前(まえ)よりずっと強(つよ)くなった。',
        plain:    '前よりずっと強くなった。',
        reading:  '마에요리 줏토 츠요쿠낫타.',
        pattern:  { name: '〜くなる', meaning: '~하게 되다', note: 'い형용사 어간 + くなる. 상태 변화를 나타냄' },
        furigana: 'まえよりずっとつよくなった',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 5위  悪い
   * ══════════════════════════════════════════════════ */
  {
    id: 'warui', rank: 5, verb: '悪い', reading: '와루이', meaning: '나쁘다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '悪(わる)いです',               ruby: '와루이데스',           meaning: '나쁩니다' },
        { text: '悪(わる)くないです',            ruby: '와루쿠나이데스',       meaning: '나쁘지 않습니다' },
        { text: '悪(わる)いですか？',            ruby: '와루이데스까?',        meaning: '나쁩니까?' },
        { text: '悪(わる)くないですか？',        ruby: '와루쿠나이데스까?',    meaning: '나쁘지 않습니까?' },
        { text: '悪(わる)かったです',            ruby: '와루캇타데스',         meaning: '나빴습니다' },
        { text: '悪(わる)くなかったです',        ruby: '와루쿠나캇타데스',     meaning: '나쁘지 않았습니다' },
        { text: '悪(わる)かったですか？',        ruby: '와루캇타데스까?',      meaning: '나빴습니까?' },
        { text: '悪(わる)くなかったですか？',    ruby: '와루쿠나캇타데스까?',  meaning: '나쁘지 않았습니까?' },
      ],
      plain: [
        { text: '悪(わる)い',           ruby: '와루이',        meaning: '나빠' },
        { text: '悪(わる)くない',       ruby: '와루쿠나이',    meaning: '나쁘지 않아' },
        { text: '悪(わる)い？',         ruby: '와루이?',       meaning: '나빠?' },
        { text: '悪(わる)くない？',     ruby: '와루쿠나이?',   meaning: '나쁘지 않아?' },
        { text: '悪(わる)かった',       ruby: '와루캇타',      meaning: '나빴어' },
        { text: '悪(わる)くなかった',   ruby: '와루쿠나캇타',  meaning: '나쁘지 않았어' },
        { text: '悪(わる)かった？',     ruby: '와루캇타?',     meaning: '나빴어?' },
        { text: '悪(わる)くなかった？', ruby: '와루쿠나캇타?', meaning: '나쁘지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '오늘은 컨디션이 좋지 않아.',
        japanese: '今日(きょう)は体調(たいちょう)が悪(わる)い。',
        plain:    '今日は体調が悪い。',
        reading:  '쿄ー와 타이쵸ー가 와루이.',
        pattern:  { name: '〜が悪い', meaning: '~이/가 나쁘다', note: '상태·상황이 좋지 않음을 나타냄' },
        furigana: 'きょうはたいちょうがわるい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '미안, 내가 나빴어.',
        japanese: 'ごめん、私(わたし)が悪(わる)かった。',
        plain:    'ごめん、私が悪かった。',
        reading:  '고멩, 와타시가 와루캇타.',
        pattern:  { name: '〜が悪かった', meaning: '~이/가 나빴다', note: '과거 상태·잘못을 인정하는 표현' },
        furigana: 'ごめんわたしがわるかった',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [1, 0, 0, 1, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '날씨가 나빠질 것 같아.',
        japanese: '天気(てんき)が悪(わる)くなりそうだ。',
        plain:    '天気が悪くなりそうだ。',
        reading:  '텡키가 와루쿠나리소ーだ.',
        pattern:  { name: '〜くなりそう', meaning: '~해질 것 같다', note: 'くなる(상태 변화) + そう(추측). 앞으로의 변화를 예상' },
        furigana: 'てんきがわるくなりそうだ',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 6위  少ない
   * ══════════════════════════════════════════════════ */
  {
    id: 'sukunai', rank: 6, verb: '少ない', reading: '스쿠나이', meaning: '적다; 드물다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '少(すく)ないです',               ruby: '스쿠나이데스',           meaning: '적습니다' },
        { text: '少(すく)なくないです',            ruby: '스쿠나쿠나이데스',       meaning: '적지 않습니다' },
        { text: '少(すく)ないですか？',            ruby: '스쿠나이데스까?',        meaning: '적습니까?' },
        { text: '少(すく)なくないですか？',        ruby: '스쿠나쿠나이데스까?',    meaning: '적지 않습니까?' },
        { text: '少(すく)なかったです',            ruby: '스쿠나캇타데스',         meaning: '적었습니다' },
        { text: '少(すく)なくなかったです',        ruby: '스쿠나쿠나캇타데스',     meaning: '적지 않았습니다' },
        { text: '少(すく)なかったですか？',        ruby: '스쿠나캇타데스까?',      meaning: '적었습니까?' },
        { text: '少(すく)なくなかったですか？',    ruby: '스쿠나쿠나캇타데스까?',  meaning: '적지 않았습니까?' },
      ],
      plain: [
        { text: '少(すく)ない',           ruby: '스쿠나이',        meaning: '적어' },
        { text: '少(すく)なくない',       ruby: '스쿠나쿠나이',    meaning: '적지 않아' },
        { text: '少(すく)ない？',         ruby: '스쿠나이?',       meaning: '적어?' },
        { text: '少(すく)なくない？',     ruby: '스쿠나쿠나이?',   meaning: '적지 않아?' },
        { text: '少(すく)なかった',       ruby: '스쿠나캇타',      meaning: '적었어' },
        { text: '少(すく)なくなかった',   ruby: '스쿠나쿠나캇타',  meaning: '적지 않았어' },
        { text: '少(すく)なかった？',     ruby: '스쿠나캇타?',     meaning: '적었어?' },
        { text: '少(すく)なくなかった？', ruby: '스쿠나쿠나캇타?', meaning: '적지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '요즘 시간이 너무 적어.',
        japanese: '最近(さいきん)、時間(じかん)が少(すく)ない。',
        plain:    '最近、時間が少ない。',
        reading:  '사이킹, 지캉가 스쿠나이.',
        pattern:  { name: '〜が少ない', meaning: '~이/가 적다', note: '수량·빈도가 부족함을 나타냄' },
        furigana: 'さいきんじかんがすくない',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '참가자가 생각보다 적었어.',
        japanese: '参加者(さんかしゃ)が思(おも)ったより少(すく)なかった。',
        plain:    '参加者が思ったより少なかった。',
        reading:  '산카샤가 오못타요리 스쿠나캇타.',
        pattern:  { name: '〜より少なかった', meaning: '~보다 적었다', note: '예상·기대와 비교하는 표현' },
        furigana: 'さんかしゃがおもったよりすくなかった',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '이 지역은 비가 적어서 가뭄이 심해.',
        japanese: 'この地域(ちいき)は雨(あめ)が少(すく)なくて干(かん)ばつがひどい。',
        plain:    'この地域は雨が少なくて干ばつがひどい。',
        reading:  '코노 치이키와 아메가 스쿠나쿠테 캉바츠가 히도이.',
        pattern:  { name: '〜なくて', meaning: '~하지 않아서 (い형용사 원인 부정)', note: '〜くて의 부정형. 원인이 부족함을 나타냄' },
        furigana: 'このちいきはあめがすくなくてかんばつがひどい',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 7위  長い
   * ══════════════════════════════════════════════════ */
  {
    id: 'nagai', rank: 7, verb: '長い', reading: '나가이', meaning: '길다 (길이·시간)',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '長(なが)いです',               ruby: '나가이데스',           meaning: '깁니다' },
        { text: '長(なが)くないです',            ruby: '나가쿠나이데스',       meaning: '길지 않습니다' },
        { text: '長(なが)いですか？',            ruby: '나가이데스까?',        meaning: '깁니까?' },
        { text: '長(なが)くないですか？',        ruby: '나가쿠나이데스까?',    meaning: '길지 않습니까?' },
        { text: '長(なが)かったです',            ruby: '나가캇타데스',         meaning: '길었습니다' },
        { text: '長(なが)くなかったです',        ruby: '나가쿠나캇타데스',     meaning: '길지 않았습니다' },
        { text: '長(なが)かったですか？',        ruby: '나가캇타데스까?',      meaning: '길었습니까?' },
        { text: '長(なが)くなかったですか？',    ruby: '나가쿠나캇타데스까?',  meaning: '길지 않았습니까?' },
      ],
      plain: [
        { text: '長(なが)い',           ruby: '나가이',        meaning: '길어' },
        { text: '長(なが)くない',       ruby: '나가쿠나이',    meaning: '길지 않아' },
        { text: '長(なが)い？',         ruby: '나가이?',       meaning: '길어?' },
        { text: '長(なが)くない？',     ruby: '나가쿠나이?',   meaning: '길지 않아?' },
        { text: '長(なが)かった',       ruby: '나가캇타',      meaning: '길었어' },
        { text: '長(なが)くなかった',   ruby: '나가쿠나캇타',  meaning: '길지 않았어' },
        { text: '長(なが)かった？',     ruby: '나가캇타?',     meaning: '길었어?' },
        { text: '長(なが)くなかった？', ruby: '나가쿠나캇타?', meaning: '길지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 강은 정말 길어.',
        japanese: 'この川(かわ)はとても長(なが)い。',
        plain:    'この川はとても長い。',
        reading:  '코노 카와와 토테모 나가이.',
        pattern:  { name: '〜が長い', meaning: '~이/가 길다', note: '물리적 길이·시간 등이 길다는 표현' },
        furigana: 'このかわはとてもながい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [1, 0, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '기다리는 시간이 길게 느껴졌어.',
        japanese: '待(ま)つ時間(じかん)が長(なが)く感(かん)じた。',
        plain:    '待つ時間が長く感じた。',
        reading:  '마츠 지캉가 나가쿠 칸지타.',
        pattern:  { name: '〜く感じる', meaning: '~하게 느껴지다', note: 'い형용사 어간 + く + 동사로 부사적 활용' },
        furigana: 'まつじかんがながくかんじた',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '머리가 짧아졌네.',
        japanese: '髪(かみ)が短(みじか)くなったね。',
        plain:    '髪が短くなったね。',
        reading:  '카미가 미지카쿠낫타네.',
        pattern:  { name: '〜くなる', meaning: '~하게 되다 (변화)', note: '반의어 短い(짧다)로 변화 표현. 長い↔短い' },
        furigana: 'かみがみじかくなったね',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 8위  早い
   * ══════════════════════════════════════════════════ */
  {
    id: 'hayai', rank: 8, verb: '早い', reading: '하야이', meaning: '빠르다; 이르다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '早(はや)いです',               ruby: '하야이데스',           meaning: '빠릅니다' },
        { text: '早(はや)くないです',            ruby: '하야쿠나이데스',       meaning: '빠르지 않습니다' },
        { text: '早(はや)いですか？',            ruby: '하야이데스까?',        meaning: '빠릅니까?' },
        { text: '早(はや)くないですか？',        ruby: '하야쿠나이데스까?',    meaning: '빠르지 않습니까?' },
        { text: '早(はや)かったです',            ruby: '하야캇타데스',         meaning: '빨랐습니다' },
        { text: '早(はや)くなかったです',        ruby: '하야쿠나캇타데스',     meaning: '빠르지 않았습니다' },
        { text: '早(はや)かったですか？',        ruby: '하야캇타데스까?',      meaning: '빨랐습니까?' },
        { text: '早(はや)くなかったですか？',    ruby: '하야쿠나캇타데스까?',  meaning: '빠르지 않았습니까?' },
      ],
      plain: [
        { text: '早(はや)い',           ruby: '하야이',        meaning: '빨라' },
        { text: '早(はや)くない',       ruby: '하야쿠나이',    meaning: '빠르지 않아' },
        { text: '早(はや)い？',         ruby: '하야이?',       meaning: '빨라?' },
        { text: '早(はや)くない？',     ruby: '하야쿠나이?',   meaning: '빠르지 않아?' },
        { text: '早(はや)かった',       ruby: '하야캇타',      meaning: '빨랐어' },
        { text: '早(はや)くなかった',   ruby: '하야쿠나캇타',  meaning: '빠르지 않았어' },
        { text: '早(はや)かった？',     ruby: '하야캇타?',     meaning: '빨랐어?' },
        { text: '早(はや)くなかった？', ruby: '하야쿠나캇타?', meaning: '빠르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '아직 너무 일러.',
        japanese: 'まだ早(はや)すぎる。',
        plain:    'まだ早すぎる。',
        reading:  '마다 하야스기루.',
        pattern:  { name: '〜すぎる', meaning: '너무 ~하다', note: 'い형용사 어간 + すぎる. 정도가 지나침을 나타냄' },
        furigana: 'まだはやすぎる',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '이렇게 일찍 올 줄은 몰랐어.',
        japanese: 'こんなに早(はや)く来(く)るとは思(おも)わなかった。',
        plain:    'こんなに早く来るとは思わなかった。',
        reading:  '콘나니 하야쿠 쿠루토와 오모와나캇타.',
        pattern:  { name: '〜とは思わなかった', meaning: '~할 줄은 몰랐다', note: '예상 밖의 사태에 대한 놀라움 표현' },
        furigana: 'こんなにはやくくるとはおもわなかった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '좀 더 일찍 출발할 걸 그랬어.',
        japanese: 'もっと早(はや)く出発(しゅっぱつ)すればよかった。',
        plain:    'もっと早く出発すればよかった。',
        reading:  '못토 하야쿠 슛파츠스레바 요캇타.',
        pattern:  { name: '〜ばよかった', meaning: '~했으면 좋았을 텐데', note: '가정 + よかった. 후회를 나타내는 표현' },
        furigana: 'もっとはやくしゅっぱつすればよかった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 9위  新しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'atarashii', rank: 9, verb: '新しい', reading: '아타라시이', meaning: '새롭다',
    accentType: 4,
    conjugations: {
      formal: [
        { text: '新(あたら)しいです',               ruby: '아타라시이데스',           meaning: '새롭습니다' },
        { text: '新(あたら)しくないです',            ruby: '아타라시쿠나이데스',       meaning: '새롭지 않습니다' },
        { text: '新(あたら)しいですか？',            ruby: '아타라시이데스까?',        meaning: '새롭습니까?' },
        { text: '新(あたら)しくないですか？',        ruby: '아타라시쿠나이데스까?',    meaning: '새롭지 않습니까?' },
        { text: '新(あたら)しかったです',            ruby: '아타라시캇타데스',         meaning: '새로웠습니다' },
        { text: '新(あたら)しくなかったです',        ruby: '아타라시쿠나캇타데스',     meaning: '새롭지 않았습니다' },
        { text: '新(あたら)しかったですか？',        ruby: '아타라시캇타데스까?',      meaning: '새로웠습니까?' },
        { text: '新(あたら)しくなかったですか？',    ruby: '아타라시쿠나캇타데스까?',  meaning: '새롭지 않았습니까?' },
      ],
      plain: [
        { text: '新(あたら)しい',           ruby: '아타라시이',        meaning: '새로워' },
        { text: '新(あたら)しくない',       ruby: '아타라시쿠나이',    meaning: '새롭지 않아' },
        { text: '新(あたら)しい？',         ruby: '아타라시이?',       meaning: '새로워?' },
        { text: '新(あたら)しくない？',     ruby: '아타라시쿠나이?',   meaning: '새롭지 않아?' },
        { text: '新(あたら)しかった',       ruby: '아타라시캇타',      meaning: '새로웠어' },
        { text: '新(あたら)しくなかった',   ruby: '아타라시쿠나캇타',  meaning: '새롭지 않았어' },
        { text: '新(あたら)しかった？',     ruby: '아타라시캇타?',     meaning: '새로웠어?' },
        { text: '新(あたら)しくなかった？', ruby: '아타라시쿠나캇타?', meaning: '새롭지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '새 스마트폰을 샀어.',
        japanese: '新(あたら)しいスマホを買(か)った。',
        plain:    '新しいスマホを買った。',
        reading:  '아타라시이 스마호오 캇타.',
        pattern:  { name: '新しい + 명사', meaning: '새로운 ~', note: 'い형용사는 명사 앞에서 그대로 사용 (연체형)' },
        furigana: 'あたらしいすまほをかった',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '이것은 최신 모델이 아니야.',
        japanese: 'これは新(あたら)しいモデルじゃない。',
        plain:    'これは新しいモデルじゃない。',
        reading:  '코레와 아타라시이 모데루자나이.',
        pattern:  { name: '〜じゃない', meaning: '~이/가 아니다', note: '명사/형용사 부정. 구어체 표현' },
        furigana: 'これはあたらしいもでるじゃない',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '새로운 것에 도전하고 싶어.',
        japanese: '新(あたら)しいことに挑戦(ちょうせん)したい。',
        plain:    '新しいことに挑戦したい。',
        reading:  '아타라시이 코토니 쵸ー센시타이.',
        pattern:  { name: '〜に挑戦したい', meaning: '~에 도전하고 싶다', note: 'たい형으로 희망을 나타냄' },
        furigana: 'あたらしいことにちょうせんしたい',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 10위  深い
   * ══════════════════════════════════════════════════ */
  {
    id: 'fukai', rank: 10, verb: '深い', reading: '후카이', meaning: '깊다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '深(ふか)いです',               ruby: '후카이데스',           meaning: '깊습니다' },
        { text: '深(ふか)くないです',            ruby: '후카쿠나이데스',       meaning: '깊지 않습니다' },
        { text: '深(ふか)いですか？',            ruby: '후카이데스까?',        meaning: '깊습니까?' },
        { text: '深(ふか)くないですか？',        ruby: '후카쿠나이데스까?',    meaning: '깊지 않습니까?' },
        { text: '深(ふか)かったです',            ruby: '후카캇타데스',         meaning: '깊었습니다' },
        { text: '深(ふか)くなかったです',        ruby: '후카쿠나캇타데스',     meaning: '깊지 않았습니다' },
        { text: '深(ふか)かったですか？',        ruby: '후카캇타데스까?',      meaning: '깊었습니까?' },
        { text: '深(ふか)くなかったですか？',    ruby: '후카쿠나캇타데스까?',  meaning: '깊지 않았습니까?' },
      ],
      plain: [
        { text: '深(ふか)い',           ruby: '후카이',        meaning: '깊어' },
        { text: '深(ふか)くない',       ruby: '후카쿠나이',    meaning: '깊지 않아' },
        { text: '深(ふか)い？',         ruby: '후카이?',       meaning: '깊어?' },
        { text: '深(ふか)くない？',     ruby: '후카쿠나이?',   meaning: '깊지 않아?' },
        { text: '深(ふか)かった',       ruby: '후카캇타',      meaning: '깊었어' },
        { text: '深(ふか)くなかった',   ruby: '후카쿠나캇타',  meaning: '깊지 않았어' },
        { text: '深(ふか)かった？',     ruby: '후카캇타?',     meaning: '깊었어?' },
        { text: '深(ふか)くなかった？', ruby: '후카쿠나캇타?', meaning: '깊지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 호수는 꽤 깊어.',
        japanese: 'この湖(みずうみ)はかなり深(ふか)い。',
        plain:    'この湖はかなり深い。',
        reading:  '코노 미즈우미와 카나리 후카이.',
        pattern:  { name: 'かなり〜い', meaning: '꽤 ~하다', note: 'かなり는 정도가 상당함을 나타내는 부사' },
        furigana: 'このみずうみはかなりふかい',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그 영화는 내용이 심오해.',
        japanese: 'あの映画(えいが)は内容(ないよう)が深(ふか)い。',
        plain:    'あの映画は内容が深い。',
        reading:  '아노 에이가와 나이요ー가 후카이.',
        pattern:  { name: '内容が深い', meaning: '내용이 깊다 (심오하다)', note: '물리적 깊이 외에도 내용의 깊이에도 사용' },
        furigana: 'あのえいがはないようがふかい',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '상처가 생각보다 깊지 않았어.',
        japanese: '傷(きず)は思(おも)ったより深(ふか)くなかった。',
        plain:    '傷は思ったより深くなかった。',
        reading:  '키즈와 오못타요리 후카쿠나캇타.',
        pattern:  { name: '〜より深くなかった', meaning: '~보다 깊지 않았다', note: '예상과의 비교 + 과거 부정' },
        furigana: 'きずはおもったよりふかくなかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 11위  若い
   * ══════════════════════════════════════════════════ */
  {
    id: 'wakai', rank: 11, verb: '若い', reading: '와카이', meaning: '젊다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '若(わか)いです',               ruby: '와카이데스',           meaning: '젊습니다' },
        { text: '若(わか)くないです',            ruby: '와카쿠나이데스',       meaning: '젊지 않습니다' },
        { text: '若(わか)いですか？',            ruby: '와카이데스까?',        meaning: '젊습니까?' },
        { text: '若(わか)くないですか？',        ruby: '와카쿠나이데스까?',    meaning: '젊지 않습니까?' },
        { text: '若(わか)かったです',            ruby: '와카캇타데스',         meaning: '젊었습니다' },
        { text: '若(わか)くなかったです',        ruby: '와카쿠나캇타데스',     meaning: '젊지 않았습니다' },
        { text: '若(わか)かったですか？',        ruby: '와카캇타데스까?',      meaning: '젊었습니까?' },
        { text: '若(わか)くなかったですか？',    ruby: '와카쿠나캇타데스까?',  meaning: '젊지 않았습니까?' },
      ],
      plain: [
        { text: '若(わか)い',           ruby: '와카이',        meaning: '젊어' },
        { text: '若(わか)くない',       ruby: '와카쿠나이',    meaning: '젊지 않아' },
        { text: '若(わか)い？',         ruby: '와카이?',       meaning: '젊어?' },
        { text: '若(わか)くない？',     ruby: '와카쿠나이?',   meaning: '젊지 않아?' },
        { text: '若(わか)かった',       ruby: '와카캇타',      meaning: '젊었어' },
        { text: '若(わか)くなかった',   ruby: '와카쿠나캇타',  meaning: '젊지 않았어' },
        { text: '若(わか)かった？',     ruby: '와카캇타?',     meaning: '젊었어?' },
        { text: '若(わか)くなかった？', ruby: '와카쿠나캇타?', meaning: '젊지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀는 매우 젊어 보여.',
        japanese: '彼女(かのじょ)はとても若(わか)く見(み)える。',
        plain:    '彼女はとても若く見える。',
        reading:  '카노죠와 토테모 와카쿠 미에루.',
        pattern:  { name: '〜く見える', meaning: '~해 보이다 (い형용사)', note: 'い형용사 어간 + く + 見える. 외관상 인상을 나타냄' },
        furigana: 'かのじょはとてもわかくみえる',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '젊을 때 다양한 경험을 하는 것이 중요해.',
        japanese: '若(わか)いうちに色々(いろいろ)な経験(けいけん)をすることが大切(たいせつ)だ。',
        plain:    '若いうちに色々な経験をすることが大切だ。',
        reading:  '와카이 우치니 이로이로나 케이켄오 스루 코토가 타이세츠다.',
        pattern:  { name: '〜うちに', meaning: '~하는 동안에; ~할 때', note: '어떤 상태가 지속되는 동안에 행동해야 함을 나타냄' },
        furigana: 'わかいうちにいろいろなけいけんをすることがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 26, accent: [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '저 배우는 아직 젊은데 연기가 굉장히 잘해.',
        japanese: 'あの俳優(はいゆう)はまだ若(わか)いのにとても演技(えんぎ)が上手(うま)い。',
        plain:    'あの俳優はまだ若いのにとても演技が上手い。',
        reading:  '아노 하이유ー와 마다 와카이노니 토테모 엔기가 우마이.',
        pattern:  { name: '〜のに', meaning: '~인데도 (역접)', note: '예상과 반대의 결과를 나타내는 역접 표현' },
        furigana: 'あのはいゆうはまだわかいのにとてもえんぎがうまい',
        accentData: [
          { phrase_id: 0, mora_count: 24, accent: [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 12위  旨い
   * ══════════════════════════════════════════════════ */
  {
    id: 'umai', rank: 12, verb: '旨い', reading: '우마이', meaning: '맛있다; 잘하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '旨(うま)いです',               ruby: '우마이데스',           meaning: '맛있습니다 / 잘합니다' },
        { text: '旨(うま)くないです',            ruby: '우마쿠나이데스',       meaning: '맛있지 않습니다' },
        { text: '旨(うま)いですか？',            ruby: '우마이데스까?',        meaning: '맛있습니까?' },
        { text: '旨(うま)くないですか？',        ruby: '우마쿠나이데스까?',    meaning: '맛있지 않습니까?' },
        { text: '旨(うま)かったです',            ruby: '우마캇타데스',         meaning: '맛있었습니다' },
        { text: '旨(うま)くなかったです',        ruby: '우마쿠나캇타데스',     meaning: '맛있지 않았습니다' },
        { text: '旨(うま)かったですか？',        ruby: '우마캇타데스까?',      meaning: '맛있었습니까?' },
        { text: '旨(うま)くなかったですか？',    ruby: '우마쿠나캇타데스까?',  meaning: '맛있지 않았습니까?' },
      ],
      plain: [
        { text: '旨(うま)い',           ruby: '우마이',        meaning: '맛있어 / 잘해' },
        { text: '旨(うま)くない',       ruby: '우마쿠나이',    meaning: '맛없어 / 못해' },
        { text: '旨(うま)い？',         ruby: '우마이?',       meaning: '맛있어?' },
        { text: '旨(うま)くない？',     ruby: '우마쿠나이?',   meaning: '맛없어?' },
        { text: '旨(うま)かった',       ruby: '우마캇타',      meaning: '맛있었어' },
        { text: '旨(うま)くなかった',   ruby: '우마쿠나캇타',  meaning: '맛없었어' },
        { text: '旨(うま)かった？',     ruby: '우마캇타?',     meaning: '맛있었어?' },
        { text: '旨(うま)くなかった？', ruby: '우마쿠나캇타?', meaning: '맛없었어?' },
      ],
    },
    examples: [
      {
        korean:   '이 라면 엄청 맛있어!',
        japanese: 'このラーメンはすごく旨(うま)い！',
        plain:    'このラーメンはすごく旨い！',
        reading:  '코노 라ー멘와 스고쿠 우마이!',
        pattern:  { name: 'すごく旨い', meaning: '엄청 맛있다', note: 'すごく는 すごい의 부사형. 旨い는 美味しい보다 구어적' },
        furigana: 'このらーめんはすごくうまい',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '그는 요리를 잘해서 인기가 있어.',
        japanese: '彼(かれ)は料理(りょうり)が旨(うま)くて人気(にんき)がある。',
        plain:    '彼は料理が旨くて人気がある。',
        reading:  '카레와 료ー리가 우마쿠테 닌키가 아루.',
        pattern:  { name: '〜くて', meaning: '~해서 (い형용사 원인)', note: 'い형용사 어간 + くて. 이유나 원인을 나타냄. 旨い는 솜씨가 좋다는 뜻도 있음' },
        furigana: 'かれはりょうりがうまくてにんきがある',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '맛있는 걸 먹으면 행복한 기분이 돼.',
        japanese: '旨(うま)いものを食(た)べると幸(しあわ)せな気持(きも)ちになる。',
        plain:    '旨いものを食べると幸せな気持ちになる。',
        reading:  '우마이 모노오 타베루토 시아와세나 키모치니 나루.',
        pattern:  { name: '〜と〜になる', meaning: '~하면 ~이/가 된다', note: '조건·결과를 나타내는 と. 자연스러운 결과를 표현' },
        furigana: 'うまいものをたべるとしあわせなきもちになる',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 13위  凄い
   * ══════════════════════════════════════════════════ */
  {
    id: 'sugoi', rank: 13, verb: '凄い', reading: '스고이', meaning: '대단하다; 굉장하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '凄(すご)いです',               ruby: '스고이데스',           meaning: '대단합니다' },
        { text: '凄(すご)くないです',            ruby: '스고쿠나이데스',       meaning: '대단하지 않습니다' },
        { text: '凄(すご)いですか？',            ruby: '스고이데스까?',        meaning: '대단합니까?' },
        { text: '凄(すご)くないですか？',        ruby: '스고쿠나이데스까?',    meaning: '대단하지 않습니까?' },
        { text: '凄(すご)かったです',            ruby: '스고캇타데스',         meaning: '대단했습니다' },
        { text: '凄(すご)くなかったです',        ruby: '스고쿠나캇타데스',     meaning: '대단하지 않았습니다' },
        { text: '凄(すご)かったですか？',        ruby: '스고캇타데스까?',      meaning: '대단했습니까?' },
        { text: '凄(すご)くなかったですか？',    ruby: '스고쿠나캇타데스까?',  meaning: '대단하지 않았습니까?' },
      ],
      plain: [
        { text: '凄(すご)い',           ruby: '스고이',        meaning: '대단해' },
        { text: '凄(すご)くない',       ruby: '스고쿠나이',    meaning: '대단하지 않아' },
        { text: '凄(すご)い？',         ruby: '스고이?',       meaning: '대단해?' },
        { text: '凄(すご)くない？',     ruby: '스고쿠나이?',   meaning: '대단하지 않아?' },
        { text: '凄(すご)かった',       ruby: '스고캇타',      meaning: '대단했어' },
        { text: '凄(すご)くなかった',   ruby: '스고쿠나캇타',  meaning: '대단하지 않았어' },
        { text: '凄(すご)かった？',     ruby: '스고캇타?',     meaning: '대단했어?' },
        { text: '凄(すご)くなかった？', ruby: '스고쿠나캇타?', meaning: '대단하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀의 그림은 정말 대단해.',
        japanese: '彼女(かのじょ)の絵(え)は本当(ほんとう)に凄(すご)い。',
        plain:    '彼女の絵は本当に凄い。',
        reading:  '카노죠노 에와 혼토ー니 스고이.',
        pattern:  { name: '本当に凄い', meaning: '정말 대단하다', note: '본当に는 강조 부사. 감탄·칭찬할 때 자주 사용' },
        furigana: 'かのじょのえはほんとうにすごい',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '굉장한 속도로 문제를 풀어버렸어.',
        japanese: '凄(すご)い速(はや)さで問題(もんだい)を解(と)いてしまった。',
        plain:    '凄い速さで問題を解いてしまった。',
        reading:  '스고이 하야사데 몬다이오 토이테 시맛타.',
        pattern:  { name: '凄い〜さで', meaning: '굉장한 ~으로', note: 'い형용사 어간 + さ로 명사화. 속도·강도를 나타낼 때 사용' },
        furigana: 'すごいはやさでもんだいをといてしまった',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '그의 발표는 굉장해서 감동받았어.',
        japanese: '彼(かれ)のプレゼンはすごくて感動(かんどう)した。',
        plain:    '彼のプレゼンはすごくて感動した。',
        reading:  '카레노 푸레젠와 스고쿠테 칸도ー시타.',
        pattern:  { name: '〜くて感動した', meaning: '~해서 감동받았다', note: 'くて는 い형용사의 원인·이유 표현. 강한 인상을 받았을 때 사용' },
        furigana: 'かれのぷれぜんはすごくてかんどうした',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 14위  小さい
   * ══════════════════════════════════════════════════ */
  {
    id: 'chiisai', rank: 14, verb: '小さい', reading: '치이사이', meaning: '작다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '小(ちい)さいです',               ruby: '치이사이데스',           meaning: '작습니다' },
        { text: '小(ちい)さくないです',            ruby: '치이사쿠나이데스',       meaning: '작지 않습니다' },
        { text: '小(ちい)さいですか？',            ruby: '치이사이데스까?',        meaning: '작습니까?' },
        { text: '小(ちい)さくないですか？',        ruby: '치이사쿠나이데스까?',    meaning: '작지 않습니까?' },
        { text: '小(ちい)さかったです',            ruby: '치이사캇타데스',         meaning: '작았습니다' },
        { text: '小(ちい)さくなかったです',        ruby: '치이사쿠나캇타데스',     meaning: '작지 않았습니다' },
        { text: '小(ちい)さかったですか？',        ruby: '치이사캇타데스까?',      meaning: '작았습니까?' },
        { text: '小(ちい)さくなかったですか？',    ruby: '치이사쿠나캇타데스까?',  meaning: '작지 않았습니까?' },
      ],
      plain: [
        { text: '小(ちい)さい',           ruby: '치이사이',        meaning: '작아' },
        { text: '小(ちい)さくない',       ruby: '치이사쿠나이',    meaning: '작지 않아' },
        { text: '小(ちい)さい？',         ruby: '치이사이?',       meaning: '작아?' },
        { text: '小(ちい)さくない？',     ruby: '치이사쿠나이?',   meaning: '작지 않아?' },
        { text: '小(ちい)さかった',       ruby: '치이사캇타',      meaning: '작았어' },
        { text: '小(ちい)さくなかった',   ruby: '치이사쿠나캇타',  meaning: '작지 않았어' },
        { text: '小(ちい)さかった？',     ruby: '치이사캇타?',     meaning: '작았어?' },
        { text: '小(ちい)さくなかった？', ruby: '치이사쿠나캇타?', meaning: '작지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 방은 좀 작습니다.',
        japanese: 'この部屋(へや)は少(すこ)し小(ちい)さいです。',
        plain:    'この部屋は少し小さい。',
        reading:  '코노 헤야와 스코시 치이사이데스.',
        pattern:  { name: '少し小さい', meaning: '조금 작다', note: '少し는 정도가 약함을 나타내는 부사. 직접적 부정 표현을 부드럽게 함' },
        furigana: 'このへやはすこしちいさいです',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '어린아이도 알 수 있도록 설명해 주세요.',
        japanese: '小(ちい)さい子供(こども)でも分(わ)かるように説明(せつめい)してください。',
        plain:    '小さい子供でも分かるように説明してください。',
        reading:  '치이사이 코도모데모 와카루요ー니 세츠메이 시테쿠다사이.',
        pattern:  { name: '〜でも分かるように', meaning: '~도 알 수 있도록', note: 'でも는 극단적인 예를 들어 "~조차도"를 나타냄' },
        furigana: 'ちいさいこどもでもわかるようにせつめいしてください',
        accentData: [
          { phrase_id: 0, mora_count: 25, accent: [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '지갑이 작아서 다 안 들어가.',
        japanese: '財布(さいふ)が小(ちい)さくて全部(ぜんぶ)入(はい)らない。',
        plain:    '財布が小さくて全部入らない。',
        reading:  '사이후가 치이사쿠테 젠부 하이라나이.',
        pattern:  { name: '〜くて〜ない', meaning: '~해서 ~지 않다', note: 'い형용사 くて는 이유. 크기가 작아서 생기는 불편함을 나타냄' },
        furigana: 'さいふがちいさくてぜんぶはいらない',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 15위  楽しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'tanoshii', rank: 15, verb: '楽しい', reading: '타노시이', meaning: '즐겁다; 재미있다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '楽(たの)しいです',               ruby: '타노시이데스',           meaning: '즐겁습니다' },
        { text: '楽(たの)しくないです',            ruby: '타노시쿠나이데스',       meaning: '즐겁지 않습니다' },
        { text: '楽(たの)しいですか？',            ruby: '타노시이데스까?',        meaning: '즐겁습니까?' },
        { text: '楽(たの)しくないですか？',        ruby: '타노시쿠나이데스까?',    meaning: '즐겁지 않습니까?' },
        { text: '楽(たの)しかったです',            ruby: '타노시캇타데스',         meaning: '즐거웠습니다' },
        { text: '楽(たの)しくなかったです',        ruby: '타노시쿠나캇타데스',     meaning: '즐겁지 않았습니다' },
        { text: '楽(たの)しかったですか？',        ruby: '타노시캇타데스까?',      meaning: '즐거웠습니까?' },
        { text: '楽(たの)しくなかったですか？',    ruby: '타노시쿠나캇타데스까?',  meaning: '즐겁지 않았습니까?' },
      ],
      plain: [
        { text: '楽(たの)しい',           ruby: '타노시이',        meaning: '즐거워' },
        { text: '楽(たの)しくない',       ruby: '타노시쿠나이',    meaning: '즐겁지 않아' },
        { text: '楽(たの)しい？',         ruby: '타노시이?',       meaning: '즐거워?' },
        { text: '楽(たの)しくない？',     ruby: '타노시쿠나이?',   meaning: '즐겁지 않아?' },
        { text: '楽(たの)しかった',       ruby: '타노시캇타',      meaning: '즐거웠어' },
        { text: '楽(たの)しくなかった',   ruby: '타노시쿠나캇타',  meaning: '즐겁지 않았어' },
        { text: '楽(たの)しかった？',     ruby: '타노시캇타?',     meaning: '즐거웠어?' },
        { text: '楽(たの)しくなかった？', ruby: '타노시쿠나캇타?', meaning: '즐겁지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '어제 파티는 정말 즐거웠어!',
        japanese: '昨日(きのう)のパーティーはとても楽(たの)しかった！',
        plain:    '昨日のパーティーはとても楽しかった！',
        reading:  '키노ー노 파ー티ー와 토테모 타노시캇타!',
        pattern:  { name: 'とても楽しかった', meaning: '정말 즐거웠어', note: 'とても는 강조 부사. 과거의 긍정적 경험을 표현' },
        furigana: 'きのうのぱーてぃーはとてもたのしかった',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '즐거운 추억을 많이 만들고 싶어.',
        japanese: '楽(たの)しい思(おも)い出(で)をたくさん作(つく)りたい。',
        plain:    '楽しい思い出をたくさん作りたい。',
        reading:  '타노시이 오모이데오 타쿠산 츠쿠리타이.',
        pattern:  { name: '〜をたくさん作りたい', meaning: '~을 많이 만들고 싶다', note: 'たい는 희망을 나타내는 조동사. たくさん은 수량·양이 많음을 강조' },
        furigana: 'たのしいおもいでをたくさんつくりたい',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '매일이 즐거우면 힘낼 수 있어.',
        japanese: '毎日(まいにち)が楽(たの)しければ頑張(がんば)れる。',
        plain:    '毎日が楽しければ頑張れる。',
        reading:  '마이니치가 타노시케레바 간바레루.',
        pattern:  { name: '〜ければ〜れる', meaning: '~하면 ~할 수 있다', note: 'い형용사 가정형 ければ. 조건이 충족되면 가능한 결과를 나타냄' },
        furigana: 'まいにちがたのしければがんばれる',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 16위  難しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'muzukashii', rank: 16, verb: '難しい', reading: '무즈카시이', meaning: '어렵다',
    accentType: 4,
    conjugations: {
      formal: [
        { text: '難(むずか)しいです',               ruby: '무즈카시이데스',           meaning: '어렵습니다' },
        { text: '難(むずか)しくないです',            ruby: '무즈카시쿠나이데스',       meaning: '어렵지 않습니다' },
        { text: '難(むずか)しいですか？',            ruby: '무즈카시이데스까?',        meaning: '어렵습니까?' },
        { text: '難(むずか)しくないですか？',        ruby: '무즈카시쿠나이데스까?',    meaning: '어렵지 않습니까?' },
        { text: '難(むずか)しかったです',            ruby: '무즈카시캇타데스',         meaning: '어려웠습니다' },
        { text: '難(むずか)しくなかったです',        ruby: '무즈카시쿠나캇타데스',     meaning: '어렵지 않았습니다' },
        { text: '難(むずか)しかったですか？',        ruby: '무즈카시캇타데스까?',      meaning: '어려웠습니까?' },
        { text: '難(むずか)しくなかったですか？',    ruby: '무즈카시쿠나캇타데스까?',  meaning: '어렵지 않았습니까?' },
      ],
      plain: [
        { text: '難(むずか)しい',           ruby: '무즈카시이',        meaning: '어려워' },
        { text: '難(むずか)しくない',       ruby: '무즈카시쿠나이',    meaning: '어렵지 않아' },
        { text: '難(むずか)しい？',         ruby: '무즈카시이?',       meaning: '어려워?' },
        { text: '難(むずか)しくない？',     ruby: '무즈카시쿠나이?',   meaning: '어렵지 않아?' },
        { text: '難(むずか)しかった',       ruby: '무즈카시캇타',      meaning: '어려웠어' },
        { text: '難(むずか)しくなかった',   ruby: '무즈카시쿠나캇타',  meaning: '어렵지 않았어' },
        { text: '難(むずか)しかった？',     ruby: '무즈카시캇타?',     meaning: '어려웠어?' },
        { text: '難(むずか)しくなかった？', ruby: '무즈카시쿠나캇타?', meaning: '어렵지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 문제는 저에게는 어렵습니다.',
        japanese: 'この問題(もんだい)は私(わたし)には難(むずか)しいです。',
        plain:    'この問題は私には難しい。',
        reading:  '코노 몬다이와 와타시니와 무즈카시이데스.',
        pattern:  { name: '〜には難しい', meaning: '~에게는 어렵다', note: 'には는 특정 대상을 한정. "나에게 있어서는"이라는 뉘앙스' },
        furigana: 'このもんだいはわたしにはむずかしいです',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '어려운 한자를 많이 외워야 해.',
        japanese: '難(むずか)しい漢字(かんじ)をたくさん覚(おぼ)えなければならない。',
        plain:    '難しい漢字をたくさん覚えなければならない。',
        reading:  '무즈카시이 칸지오 타쿠산 오보에나케레바 나라나이.',
        pattern:  { name: '〜なければならない', meaning: '~하지 않으면 안 된다; ~해야 한다', note: '의무·필요성을 나타내는 표현. なくてはいけない와 유사' },
        furigana: 'むずかしいかんじをたくさんおぼえなければならない',
        accentData: [
          { phrase_id: 0, mora_count: 24, accent: [0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '어려워도 포기하지 않는 것이 중요해.',
        japanese: '難(むずか)しくても諦(あきら)めないことが大切(たいせつ)だ。',
        plain:    '難しくても諦めないことが大切だ。',
        reading:  '무즈카시쿠테모 아키라메나이 코토가 타이세츠다.',
        pattern:  { name: '〜くても', meaning: '~해도; ~하더라도 (역접)', note: 'い형용사 어간 + くても. 역접 조건을 나타냄' },
        furigana: 'むずかしくてもあきらめないことがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 17위  美味しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'oishii', rank: 17, verb: '美味しい', reading: '오이시이', meaning: '맛있다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '美味(おい)しいです',               ruby: '오이시이데스',           meaning: '맛있습니다' },
        { text: '美味(おい)しくないです',            ruby: '오이시쿠나이데스',       meaning: '맛있지 않습니다' },
        { text: '美味(おい)しいですか？',            ruby: '오이시이데스까?',        meaning: '맛있습니까?' },
        { text: '美味(おい)しくないですか？',        ruby: '오이시쿠나이데스까?',    meaning: '맛있지 않습니까?' },
        { text: '美味(おい)しかったです',            ruby: '오이시캇타데스',         meaning: '맛있었습니다' },
        { text: '美味(おい)しくなかったです',        ruby: '오이시쿠나캇타데스',     meaning: '맛있지 않았습니다' },
        { text: '美味(おい)しかったですか？',        ruby: '오이시캇타데스까?',      meaning: '맛있었습니까?' },
        { text: '美味(おい)しくなかったですか？',    ruby: '오이시쿠나캇타데스까?',  meaning: '맛있지 않았습니까?' },
      ],
      plain: [
        { text: '美味(おい)しい',           ruby: '오이시이',        meaning: '맛있어' },
        { text: '美味(おい)しくない',       ruby: '오이시쿠나이',    meaning: '맛없어' },
        { text: '美味(おい)しい？',         ruby: '오이시이?',       meaning: '맛있어?' },
        { text: '美味(おい)しくない？',     ruby: '오이시쿠나이?',   meaning: '맛없어?' },
        { text: '美味(おい)しかった',       ruby: '오이시캇타',      meaning: '맛있었어' },
        { text: '美味(おい)しくなかった',   ruby: '오이시쿠나캇타',  meaning: '맛없었어' },
        { text: '美味(おい)しかった？',     ruby: '오이시캇타?',     meaning: '맛있었어?' },
        { text: '美味(おい)しくなかった？', ruby: '오이시쿠나캇타?', meaning: '맛없었어?' },
      ],
    },
    examples: [
      {
        korean:   '이 케이크 정말 맛있네요.',
        japanese: 'このケーキは本当(ほんとう)に美味(おい)しいですね。',
        plain:    'このケーキは本当に美味しい。',
        reading:  '코노 케ー키와 혼토ーニ 오이시이데스네.',
        pattern:  { name: '〜ですね', meaning: '~네요 (공감·감탄)', note: 'ね는 공감이나 감탄을 나타내는 終助詞. 상대방에게 동의를 구하는 뉘앙스' },
        furigana: 'このけーきはほんとうにおいしいですね',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '맛있는 요리를 만드는 것이 취미예요.',
        japanese: '美味(おい)しい料理(りょうり)を作(つく)るのが趣味(しゅみ)です。',
        plain:    '美味しい料理を作るのが趣味だ。',
        reading:  '오이시이 료ー리오 츠쿠루노가 슈미데스.',
        pattern:  { name: '〜のが趣味です', meaning: '~하는 것이 취미입니다', note: '동사 원형 + のが + 趣味です. 취미를 소개하는 기본 표현' },
        furigana: 'おいしいりょうりをつくるのがしゅみです',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '그 레스토랑은 정말 맛있었어.',
        japanese: 'そのレストランはとても美味(おい)しかった。',
        plain:    'そのレストランはとても美味しかった。',
        reading:  '소노 레스토란와 토테모 오이시캇타.',
        pattern:  { name: 'とても美味しかった', meaning: '정말 맛있었어', note: 'とても는 강조. 과거의 맛에 대한 긍정적 평가 표현' },
        furigana: 'そのれすとらんはとてもおいしかった',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 18위  面白い
   * ══════════════════════════════════════════════════ */
  {
    id: 'omoshiroi', rank: 18, verb: '面白い', reading: '오모시로이', meaning: '재미있다; 흥미롭다',
    accentType: 4,
    conjugations: {
      formal: [
        { text: '面白(おもしろ)いです',               ruby: '오모시로이데스',           meaning: '재미있습니다' },
        { text: '面白(おもしろ)くないです',            ruby: '오모시로쿠나이데스',       meaning: '재미없습니다' },
        { text: '面白(おもしろ)いですか？',            ruby: '오모시로이데스까?',        meaning: '재미있습니까?' },
        { text: '面白(おもしろ)くないですか？',        ruby: '오모시로쿠나이데스까?',    meaning: '재미없습니까?' },
        { text: '面白(おもしろ)かったです',            ruby: '오모시로캇타데스',         meaning: '재미있었습니다' },
        { text: '面白(おもしろ)くなかったです',        ruby: '오모시로쿠나캇타데스',     meaning: '재미없었습니다' },
        { text: '面白(おもしろ)かったですか？',        ruby: '오모시로캇타데스까?',      meaning: '재미있었습니까?' },
        { text: '面白(おもしろ)くなかったですか？',    ruby: '오모시로쿠나캇타데스까?',  meaning: '재미없었습니까?' },
      ],
      plain: [
        { text: '面白(おもしろ)い',           ruby: '오모시로이',        meaning: '재미있어' },
        { text: '面白(おもしろ)くない',       ruby: '오모시로쿠나이',    meaning: '재미없어' },
        { text: '面白(おもしろ)い？',         ruby: '오모시로이?',       meaning: '재미있어?' },
        { text: '面白(おもしろ)くない？',     ruby: '오모시로쿠나이?',   meaning: '재미없어?' },
        { text: '面白(おもしろ)かった',       ruby: '오모시로캇타',      meaning: '재미있었어' },
        { text: '面白(おもしろ)くなかった',   ruby: '오모시로쿠나캇타',  meaning: '재미없었어' },
        { text: '面白(おもしろ)かった？',     ruby: '오모시로캇타?',     meaning: '재미있었어?' },
        { text: '面白(おもしろ)くなかった？', ruby: '오모시로쿠나캇타?', meaning: '재미없었어?' },
      ],
    },
    examples: [
      {
        korean:   '그 영화는 정말 재미있었어.',
        japanese: 'その映画(えいが)はとても面白(おもしろ)かった。',
        plain:    'その映画はとても面白かった。',
        reading:  '소노 에이가와 토테모 오모시로캇타.',
        pattern:  { name: 'とても面白かった', meaning: '정말 재미있었어', note: 'とても + 과거형. 영화·책 등 콘텐츠 감상을 표현할 때 자주 사용' },
        furigana: 'そのえいがはとてもおもしろかった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '재미있는 아이디어가 떠올랐어.',
        japanese: '面白(おもしろ)いアイデアを思(おも)いついた。',
        plain:    '面白いアイデアを思いついた。',
        reading:  '오모시로이 아이데아오 오모이츠이타.',
        pattern:  { name: '〜を思いつく', meaning: '~을 떠올리다; 생각해 내다', note: '아이디어나 해결책이 갑자기 떠오를 때 사용하는 표현' },
        furigana: 'おもしろいあいであをおもいついた',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '그의 이야기는 언제나 재미있어.',
        japanese: '彼(かれ)の話(はなし)はいつも面白(おもしろ)い。',
        plain:    '彼の話はいつも面白い。',
        reading:  '카레노 하나시와 이츠모 오모시로이.',
        pattern:  { name: 'いつも面白い', meaning: '언제나 재미있다', note: 'いつも는 빈도 부사. 지속적 특성을 나타낼 때 사용' },
        furigana: 'かれのはなしはいつもおもしろい',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 19위  近い
   * ══════════════════════════════════════════════════ */
  {
    id: 'chikai', rank: 19, verb: '近い', reading: '치카이', meaning: '가깝다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '近(ちか)いです',               ruby: '치카이데스',           meaning: '가깝습니다' },
        { text: '近(ちか)くないです',            ruby: '치카쿠나이데스',       meaning: '가깝지 않습니다' },
        { text: '近(ちか)いですか？',            ruby: '치카이데스까?',        meaning: '가깝습니까?' },
        { text: '近(ちか)くないですか？',        ruby: '치카쿠나이데스까?',    meaning: '가깝지 않습니까?' },
        { text: '近(ちか)かったです',            ruby: '치카캇타데스',         meaning: '가까웠습니다' },
        { text: '近(ちか)くなかったです',        ruby: '치카쿠나캇타데스',     meaning: '가깝지 않았습니다' },
        { text: '近(ちか)かったですか？',        ruby: '치카캇타데스까?',      meaning: '가까웠습니까?' },
        { text: '近(ちか)くなかったですか？',    ruby: '치카쿠나캇타데스까?',  meaning: '가깝지 않았습니까?' },
      ],
      plain: [
        { text: '近(ちか)い',           ruby: '치카이',        meaning: '가까워' },
        { text: '近(ちか)くない',       ruby: '치카쿠나이',    meaning: '가깝지 않아' },
        { text: '近(ちか)い？',         ruby: '치카이?',       meaning: '가까워?' },
        { text: '近(ちか)くない？',     ruby: '치카쿠나이?',   meaning: '가깝지 않아?' },
        { text: '近(ちか)かった',       ruby: '치카캇타',      meaning: '가까웠어' },
        { text: '近(ちか)くなかった',   ruby: '치카쿠나캇타',  meaning: '가깝지 않았어' },
        { text: '近(ちか)かった？',     ruby: '치카캇타?',     meaning: '가까웠어?' },
        { text: '近(ちか)くなかった？', ruby: '치카쿠나캇타?', meaning: '가깝지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '역에서 집까지 가까워서 편리해요.',
        japanese: '駅(えき)から家(いえ)まで近(ちか)いので便利(べんり)です。',
        plain:    '駅から家まで近いので便利だ。',
        reading:  '에키카라 이에마데 치카이노데 벤리데스.',
        pattern:  { name: '〜ので便利です', meaning: '~해서 편리합니다', note: 'ので는 이유를 나타내는 접속사. から보다 부드러운 뉘앙스' },
        furigana: 'えきからいえまでちかいのでべんりです',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '가까운 미래에 로봇이 보급될 거야.',
        japanese: '近(ちか)い将来(しょうらい)、ロボットが普及(ふきゅう)するでしょう。',
        plain:    '近い将来、ロボットが普及するでしょう。',
        reading:  '치카이 쇼ー라이, 로봇토가 후큐ー스루데쇼ー.',
        pattern:  { name: '近い将来', meaning: '가까운 미래에', note: '머지않은 미래를 나타내는 관용 표현. 예측·전망과 함께 사용' },
        furigana: 'ちかいしょうらいろぼっとがふきゅうするでしょう',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 0, 1, 1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 15, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '더 가까이 와 주세요.',
        japanese: 'もっと近(ちか)くに来(き)てください。',
        plain:    'もっと近くに来てください。',
        reading:  '못토 치카쿠니 키테쿠다사이.',
        pattern:  { name: '〜くに来てください', meaning: '~하게 와 주세요', note: 'い형용사 어간 + く는 부사형. 방향·상태를 표현' },
        furigana: 'もっとちかくにきてください',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 20위  低い
   * ══════════════════════════════════════════════════ */
  {
    id: 'hikui', rank: 20, verb: '低い', reading: '히쿠이', meaning: '낮다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '低(ひく)いです',               ruby: '히쿠이데스',           meaning: '낮습니다' },
        { text: '低(ひく)くないです',            ruby: '히쿠쿠나이데스',       meaning: '낮지 않습니다' },
        { text: '低(ひく)いですか？',            ruby: '히쿠이데스까?',        meaning: '낮습니까?' },
        { text: '低(ひく)くないですか？',        ruby: '히쿠쿠나이데스까?',    meaning: '낮지 않습니까?' },
        { text: '低(ひく)かったです',            ruby: '히쿠캇타데스',         meaning: '낮았습니다' },
        { text: '低(ひく)くなかったです',        ruby: '히쿠쿠나캇타데스',     meaning: '낮지 않았습니다' },
        { text: '低(ひく)かったですか？',        ruby: '히쿠캇타데스까?',      meaning: '낮았습니까?' },
        { text: '低(ひく)くなかったですか？',    ruby: '히쿠쿠나캇타데스까?',  meaning: '낮지 않았습니까?' },
      ],
      plain: [
        { text: '低(ひく)い',           ruby: '히쿠이',        meaning: '낮아' },
        { text: '低(ひく)くない',       ruby: '히쿠쿠나이',    meaning: '낮지 않아' },
        { text: '低(ひく)い？',         ruby: '히쿠이?',       meaning: '낮아?' },
        { text: '低(ひく)くない？',     ruby: '히쿠쿠나이?',   meaning: '낮지 않아?' },
        { text: '低(ひく)かった',       ruby: '히쿠캇타',      meaning: '낮았어' },
        { text: '低(ひく)くなかった',   ruby: '히쿠쿠나캇타',  meaning: '낮지 않았어' },
        { text: '低(ひく)かった？',     ruby: '히쿠캇타?',     meaning: '낮았어?' },
        { text: '低(ひく)くなかった？', ruby: '히쿠쿠나캇타?', meaning: '낮지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 산은 해발고도가 낮아.',
        japanese: 'この山(やま)は標高(ひょうこう)が低(ひく)い。',
        plain:    'この山は標高が低い。',
        reading:  '코노 야마와 효ー코ー가 히쿠이.',
        pattern:  { name: '〜が低い', meaning: '~이/가 낮다', note: '수치·정도가 낮음을 나타냄. 標高(해발고도)·気温(기온) 등과 함께 자주 사용' },
        furigana: 'このやまはひょうこうがひくい',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '목소리가 낮아서 알아듣기 어려워.',
        japanese: '声(こえ)が低(ひく)くて聞(き)き取(と)りにくい。',
        plain:    '声が低くて聞き取りにくい。',
        reading:  '코에가 히쿠쿠테 키키토리니쿠이.',
        pattern:  { name: '〜くて〜にくい', meaning: '~해서 ~하기 어렵다', note: 'い형용사 くて(이유) + にくい(어렵다). 상태로 인한 불편함을 나타냄' },
        furigana: 'こえがひくくてききとりにくい',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '기온이 낮아져서 겉옷을 입었어.',
        japanese: '気温(きおん)が低(ひく)くなったので上着(うわぎ)を着(き)た。',
        plain:    '気温が低くなったので上着を着た。',
        reading:  '키온가 히쿠쿠 낫타노데 우와기오 키타.',
        pattern:  { name: '〜くなったので', meaning: '~해져서; ~해졌기 때문에', note: 'くなる(~해지다)의 과거형 + ので. 변화의 이유를 나타냄' },
        furigana: 'きおんがひくくなったのでうわぎをきた',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 21~100위: 스텁 ─────────────────────────────── */

  /* ══════════════════════════════════════════════════
   * 21위  嬉しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'ureshii', rank: 21, verb: '嬉しい', reading: '우레시이', meaning: '기쁘다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '嬉(うれ)しいです',               ruby: '우레시이데스',           meaning: '기쁩니다' },
        { text: '嬉(うれ)しくないです',           ruby: '우레시쿠나이데스',       meaning: '기쁘지 않습니다' },
        { text: '嬉(うれ)しいですか？',           ruby: '우레시이데스까?',        meaning: '기쁩니까?' },
        { text: '嬉(うれ)しくないですか？',       ruby: '우레시쿠나이데스까?',    meaning: '기쁘지 않습니까?' },
        { text: '嬉(うれ)しかったです',           ruby: '우레시캇타데스',         meaning: '기뻤습니다' },
        { text: '嬉(うれ)しくなかったです',       ruby: '우레시쿠나캇타데스',     meaning: '기쁘지 않았습니다' },
        { text: '嬉(うれ)しかったですか？',       ruby: '우레시캇타데스까?',      meaning: '기뻤습니까?' },
        { text: '嬉(うれ)しくなかったですか？',   ruby: '우레시쿠나캇타데스까?',  meaning: '기쁘지 않았습니까?' },
      ],
      plain: [
        { text: '嬉(うれ)しい',           ruby: '우레시이',        meaning: '기뻐' },
        { text: '嬉(うれ)しくない',       ruby: '우레시쿠나이',    meaning: '기쁘지 않아' },
        { text: '嬉(うれ)しい？',         ruby: '우레시이?',       meaning: '기뻐?' },
        { text: '嬉(うれ)しくない？',     ruby: '우레시쿠나이?',   meaning: '기쁘지 않아?' },
        { text: '嬉(うれ)しかった',       ruby: '우레시캇타',      meaning: '기뻤어' },
        { text: '嬉(うれ)しくなかった',   ruby: '우레시쿠나캇타',  meaning: '기쁘지 않았어' },
        { text: '嬉(うれ)しかった？',     ruby: '우레시캇타?',     meaning: '기뻤어?' },
        { text: '嬉(うれ)しくなかった？', ruby: '우레시쿠나캇타?', meaning: '기쁘지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '합격 통지를 받아서 기뻤어.',
        japanese: '合格(ごうかく)通知(つうち)をもらって嬉(うれ)しかった。',
        plain:    '合格通知をもらって嬉しかった。',
        reading:  '고ー카쿠 츠ー치오 모랏테 우레시캇타.',
        pattern:  { name: '〜をもらって嬉しかった', meaning: '~을 받아서 기뻤다', note: 'もらって는 계기를 나타냄. 嬉しかった는 嬉しい의 과거형' },
        furigana: 'ごうかくつうちをもらってうれしかった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '기쁜 소식이 도착했습니다.',
        japanese: '嬉(うれ)しいニュースが届(とど)きました。',
        plain:    '嬉しいニュースが届いた。',
        reading:  '우레시이 뉴ー스가 토도키마시타.',
        pattern:  { name: '嬉しいニュースが届く', meaning: '기쁜 소식이 도착하다', note: '嬉しい+名詞로 명사를 수식. 届く는 도착하다는 뜻' },
        furigana: 'うれしいにゅーすがとどきました',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '만날 수 있어서 기뻐요.',
        japanese: '会(あ)えて嬉(うれ)しいです。',
        plain:    '会えて嬉しい。',
        reading:  '아에테 우레시이데스.',
        pattern:  { name: '会えて嬉しいです', meaning: '만날 수 있어서 기쁩니다', note: '会えて는 会える(만날 수 있다)의 て형. 계기를 나타냄' },
        furigana: 'あえてうれしいです',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [1, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 22위  広い
   * ══════════════════════════════════════════════════ */
  {
    id: 'hiroi', rank: 22, verb: '広い', reading: '히로이', meaning: '넓다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '広(ひろ)いです',               ruby: '히로이데스',           meaning: '넓습니다' },
        { text: '広(ひろ)くないです',           ruby: '히로쿠나이데스',       meaning: '넓지 않습니다' },
        { text: '広(ひろ)いですか？',           ruby: '히로이데스까?',        meaning: '넓습니까?' },
        { text: '広(ひろ)くないですか？',       ruby: '히로쿠나이데스까?',    meaning: '넓지 않습니까?' },
        { text: '広(ひろ)かったです',           ruby: '히로캇타데스',         meaning: '넓었습니다' },
        { text: '広(ひろ)くなかったです',       ruby: '히로쿠나캇타데스',     meaning: '넓지 않았습니다' },
        { text: '広(ひろ)かったですか？',       ruby: '히로캇타데스까?',      meaning: '넓었습니까?' },
        { text: '広(ひろ)くなかったですか？',   ruby: '히로쿠나캇타데스까?',  meaning: '넓지 않았습니까?' },
      ],
      plain: [
        { text: '広(ひろ)い',           ruby: '히로이',        meaning: '넓어' },
        { text: '広(ひろ)くない',       ruby: '히로쿠나이',    meaning: '넓지 않아' },
        { text: '広(ひろ)い？',         ruby: '히로이?',       meaning: '넓어?' },
        { text: '広(ひろ)くない？',     ruby: '히로쿠나이?',   meaning: '넓지 않아?' },
        { text: '広(ひろ)かった',       ruby: '히로캇타',      meaning: '넓었어' },
        { text: '広(ひろ)くなかった',   ruby: '히로쿠나캇타',  meaning: '넓지 않았어' },
        { text: '広(ひろ)かった？',     ruby: '히로캇타?',     meaning: '넓었어?' },
        { text: '広(ひろ)くなかった？', ruby: '히로쿠나캇타?', meaning: '넓지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 공원은 정말 넓네요.',
        japanese: 'この公園(こうえん)はとても広(ひろ)いですね。',
        plain:    'この公園はとても広い。',
        reading:  '코노 코ー엔와 토테모 히로이데스네.',
        pattern:  { name: 'とても広いですね', meaning: '정말 넓네요', note: 'ですね는 공감·감탄을 나타냄. 공간의 넓이를 감탄할 때 사용' },
        furigana: 'このこうえんはとてもひろいですね',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '넓은 방으로 이사하고 싶어.',
        japanese: '広(ひろ)い部屋(へや)に引(ひ)っ越(こ)したい。',
        plain:    '広い部屋に引っ越したい。',
        reading:  '히로이 헤야니 힛코시타이.',
        pattern:  { name: '広い部屋に引っ越したい', meaning: '넓은 방으로 이사하고 싶다', note: 'に引っ越す는 ~로 이사하다. たい는 희망 표현' },
        furigana: 'ひろいへやにひっこしたい',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '시야가 넓은 사람은 유연하게 생각할 수 있어.',
        japanese: '視野(しや)が広(ひろ)い人(ひと)は柔軟(じゅうなん)に考(かんが)えられる。',
        plain:    '視野が広い人は柔軟に考えられる。',
        reading:  '시야가 히로이 히토와 쥬ー난니 칸가에라레루.',
        pattern:  { name: '視野が広い人は〜に考えられる', meaning: '시야가 넓은 사람은 ~하게 생각할 수 있다', note: '視野(しや)는 시야·관점. 가능 표현 〜られる로 능력을 나타냄' },
        furigana: 'しやがひろいひとはじゅうなんにかんがえられる',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 23위  美しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'utsukushii', rank: 23, verb: '美しい', reading: '우츠쿠시이', meaning: '아름답다',
    accentType: 4,
    conjugations: {
      formal: [
        { text: '美(うつく)しいです',               ruby: '우츠쿠시이데스',           meaning: '아름답습니다' },
        { text: '美(うつく)しくないです',           ruby: '우츠쿠시쿠나이데스',       meaning: '아름답지 않습니다' },
        { text: '美(うつく)しいですか？',           ruby: '우츠쿠시이데스까?',        meaning: '아름답습니까?' },
        { text: '美(うつく)しくないですか？',       ruby: '우츠쿠시쿠나이데스까?',    meaning: '아름답지 않습니까?' },
        { text: '美(うつく)しかったです',           ruby: '우츠쿠시캇타데스',         meaning: '아름다웠습니다' },
        { text: '美(うつく)しくなかったです',       ruby: '우츠쿠시쿠나캇타데스',     meaning: '아름답지 않았습니다' },
        { text: '美(うつく)しかったですか？',       ruby: '우츠쿠시캇타데스까?',      meaning: '아름다웠습니까?' },
        { text: '美(うつく)しくなかったですか？',   ruby: '우츠쿠시쿠나캇타데스까?',  meaning: '아름답지 않았습니까?' },
      ],
      plain: [
        { text: '美(うつく)しい',           ruby: '우츠쿠시이',        meaning: '아름다워' },
        { text: '美(うつく)しくない',       ruby: '우츠쿠시쿠나이',    meaning: '아름답지 않아' },
        { text: '美(うつく)しい？',         ruby: '우츠쿠시이?',       meaning: '아름다워?' },
        { text: '美(うつく)しくない？',     ruby: '우츠쿠시쿠나이?',   meaning: '아름답지 않아?' },
        { text: '美(うつく)しかった',       ruby: '우츠쿠시캇타',      meaning: '아름다웠어' },
        { text: '美(うつく)しくなかった',   ruby: '우츠쿠시쿠나캇타',  meaning: '아름답지 않았어' },
        { text: '美(うつく)しかった？',     ruby: '우츠쿠시캇타?',     meaning: '아름다웠어?' },
        { text: '美(うつく)しくなかった？', ruby: '우츠쿠시쿠나캇타?', meaning: '아름답지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '노을이 정말 아름다웠어.',
        japanese: '夕焼(ゆうや)けがとても美(うつく)しかった。',
        plain:    '夕焼けがとても美しかった。',
        reading:  '유ー야케가 토테모 우츠쿠시캇타.',
        pattern:  { name: 'とても美しかった', meaning: '정말 아름다웠다', note: '美しかった는 美しい의 과거형. 夕焼け(夕焼け)는 노을' },
        furigana: 'ゆうやけがとてもうつくしかった',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '아름다운 음악을 듣고 감동했어.',
        japanese: '美(うつく)しい音楽(おんがく)を聴(き)いて感動(かんどう)した。',
        plain:    '美しい音楽を聴いて感動した。',
        reading:  '우츠쿠시이 온가쿠오 키이테 칸도ー시타.',
        pattern:  { name: '美しい音楽を聴いて感動する', meaning: '아름다운 음악을 듣고 감동하다', note: 'て형으로 계기를 나타냄. 感動する는 깊이 감동받다는 뜻' },
        furigana: 'うつくしいおんがくをきいてかんどうした',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '저 산은 눈을 뒤집어쓰면 아름다워.',
        japanese: 'あの山(やま)は雪(ゆき)をかぶると美(うつく)しい。',
        plain:    'あの山は雪をかぶると美しい。',
        reading:  '아노 야마와 유키오 카부루토 우츠쿠시이.',
        pattern:  { name: '〜をかぶると美しい', meaning: '~을 뒤집어쓰면 아름답다', note: '雪をかぶる는 눈이 쌓이다. と는 자연스러운 결과를 이끄는 조건 표현' },
        furigana: 'あのやまはゆきをかぶるとうつくしい',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 24위  詳しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuwashii', rank: 24, verb: '詳しい', reading: '쿠와시이', meaning: '자세하다; 정통하다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '詳(くわ)しいです',               ruby: '쿠와시이데스',           meaning: '자세합니다' },
        { text: '詳(くわ)しくないです',           ruby: '쿠와시쿠나이데스',       meaning: '자세하지 않습니다' },
        { text: '詳(くわ)しいですか？',           ruby: '쿠와시이데스까?',        meaning: '자세합니까?' },
        { text: '詳(くわ)しくないですか？',       ruby: '쿠와시쿠나이데스까?',    meaning: '자세하지 않습니까?' },
        { text: '詳(くわ)しかったです',           ruby: '쿠와시캇타데스',         meaning: '자세했습니다' },
        { text: '詳(くわ)しくなかったです',       ruby: '쿠와시쿠나캇타데스',     meaning: '자세하지 않았습니다' },
        { text: '詳(くわ)しかったですか？',       ruby: '쿠와시캇타데스까?',      meaning: '자세했습니까?' },
        { text: '詳(くわ)しくなかったですか？',   ruby: '쿠와시쿠나캇타데스까?',  meaning: '자세하지 않았습니까?' },
      ],
      plain: [
        { text: '詳(くわ)しい',           ruby: '쿠와시이',        meaning: '자세해' },
        { text: '詳(くわ)しくない',       ruby: '쿠와시쿠나이',    meaning: '자세하지 않아' },
        { text: '詳(くわ)しい？',         ruby: '쿠와시이?',       meaning: '자세해?' },
        { text: '詳(くわ)しくない？',     ruby: '쿠와시쿠나이?',   meaning: '자세하지 않아?' },
        { text: '詳(くわ)しかった',       ruby: '쿠와시캇타',      meaning: '자세했어' },
        { text: '詳(くわ)しくなかった',   ruby: '쿠와시쿠나캇타',  meaning: '자세하지 않았어' },
        { text: '詳(くわ)しかった？',     ruby: '쿠와시캇타?',     meaning: '자세했어?' },
        { text: '詳(くわ)しくなかった？', ruby: '쿠와시쿠나캇타?', meaning: '자세하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 건에 대해 자세히 알려주세요.',
        japanese: 'この件(けん)について詳(くわ)しく教(おし)えてください。',
        plain:    'この件について詳しく教えてください。',
        reading:  '코노 켄니츠이테 쿠와시쿠 오시에테쿠다사이.',
        pattern:  { name: '〜について詳しく教えてください', meaning: '~에 대해 자세히 알려주세요', note: 'について는 ~에 대해서. 詳しく는 詳しい의 부사형' },
        furigana: 'このけんについてくわしくおしえてください',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그는 일본사에 정통해.',
        japanese: '彼(かれ)は日本史(にほんし)に詳(くわ)しい。',
        plain:    '彼は日本史に詳しい。',
        reading:  '카레와 니혼시니 쿠와시이.',
        pattern:  { name: '〜に詳しい', meaning: '~에 정통하다', note: 'に詳しい는 특정 분야의 지식이 풍부하다는 표현. に는 대상을 나타냄' },
        furigana: 'かれはにほんしにくわしい',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '자세한 설명이 써 있는 자료를 찾았어.',
        japanese: '詳(くわ)しい説明(せつめい)が書(か)いてある資料(しりょう)を見(み)つけた。',
        plain:    '詳しい説明が書いてある資料を見つけた。',
        reading:  '쿠와시이 세츠메이가 카이테아루 시료ー오 미츠케타.',
        pattern:  { name: '詳しい説明が書いてある資料', meaning: '자세한 설명이 적힌 자료', note: 'てある는 누군가가 해둔 상태를 나타냄. 문서·자료에 대한 표현' },
        furigana: 'くわしいせつめいがかいてあるしりょうをみつけた',
        accentData: [
          { phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 25위  白い
   * ══════════════════════════════════════════════════ */
  {
    id: 'shiroi', rank: 25, verb: '白い', reading: '시로이', meaning: '하얗다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '白(しろ)いです',               ruby: '시로이데스',           meaning: '하얗습니다' },
        { text: '白(しろ)くないです',           ruby: '시로쿠나이데스',       meaning: '하얗지 않습니다' },
        { text: '白(しろ)いですか？',           ruby: '시로이데스까?',        meaning: '하얗습니까?' },
        { text: '白(しろ)くないですか？',       ruby: '시로쿠나이데스까?',    meaning: '하얗지 않습니까?' },
        { text: '白(しろ)かったです',           ruby: '시로캇타데스',         meaning: '하얬습니다' },
        { text: '白(しろ)くなかったです',       ruby: '시로쿠나캇타데스',     meaning: '하얗지 않았습니다' },
        { text: '白(しろ)かったですか？',       ruby: '시로캇타데스까?',      meaning: '하얬습니까?' },
        { text: '白(しろ)くなかったですか？',   ruby: '시로쿠나캇타데스까?',  meaning: '하얗지 않았습니까?' },
      ],
      plain: [
        { text: '白(しろ)い',           ruby: '시로이',        meaning: '하얘' },
        { text: '白(しろ)くない',       ruby: '시로쿠나이',    meaning: '하얗지 않아' },
        { text: '白(しろ)い？',         ruby: '시로이?',       meaning: '하얘?' },
        { text: '白(しろ)くない？',     ruby: '시로쿠나이?',   meaning: '하얗지 않아?' },
        { text: '白(しろ)かった',       ruby: '시로캇타',      meaning: '하얬어' },
        { text: '白(しろ)くなかった',   ruby: '시로쿠나캇타',  meaning: '하얗지 않았어' },
        { text: '白(しろ)かった？',     ruby: '시로캇타?',     meaning: '하얬어?' },
        { text: '白(しろ)くなかった？', ruby: '시로쿠나캇타?', meaning: '하얗지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '하얀 눈이 쌓여서 예쁘네.',
        japanese: '白(しろ)い雪(ゆき)が積(つ)もって綺麗(きれい)だ。',
        plain:    '白い雪が積もって綺麗だ。',
        reading:  '시로이 유키가 츠못테 키레이다.',
        pattern:  { name: '白い雪が積もって綺麗だ', meaning: '하얀 눈이 쌓여서 예쁘네', note: 'て형으로 계기를 나타냄. 積もる는 쌓이다는 뜻' },
        furigana: 'しろいゆきがつもってきれいだ',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '흰 셔츠를 자주 입고 있어.',
        japanese: '白(しろ)いシャツをよく着(き)ています。',
        plain:    '白いシャツをよく着ている。',
        reading:  '시로이 샤츠오 요쿠 키테이마스.',
        pattern:  { name: '白いシャツをよく着ている', meaning: '흰 셔츠를 자주 입고 있다', note: 'ている는 반복적 습관을 나타냄. よく는 자주·잘이라는 빈도 부사' },
        furigana: 'しろいしゃつをよくきています',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '흰 밥이 제일 좋아.',
        japanese: '白(しろ)いご飯(はん)が一番(いちばん)好(す)きです。',
        plain:    '白いご飯が一番好きだ。',
        reading:  '시로이 고한가 이치반 스키데스.',
        pattern:  { name: '〜が一番好きです', meaning: '~이/가 제일 좋아요', note: '一番+好き는 가장 좋아함을 나타내는 자연스러운 표현' },
        furigana: 'しろいごはんがいちばんすきです',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 26위  厳しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'kibishii', rank: 26, verb: '厳しい', reading: '키비시이', meaning: '엄격하다; 혹독하다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '厳(きび)しいです',               ruby: '키비시이데스',           meaning: '엄격합니다' },
        { text: '厳(きび)しくないです',           ruby: '키비시쿠나이데스',       meaning: '엄격하지 않습니다' },
        { text: '厳(きび)しいですか？',           ruby: '키비시이데스까?',        meaning: '엄격합니까?' },
        { text: '厳(きび)しくないですか？',       ruby: '키비시쿠나이데스까?',    meaning: '엄격하지 않습니까?' },
        { text: '厳(きび)しかったです',           ruby: '키비시캇타데스',         meaning: '엄격했습니다' },
        { text: '厳(きび)しくなかったです',       ruby: '키비시쿠나캇타데스',     meaning: '엄격하지 않았습니다' },
        { text: '厳(きび)しかったですか？',       ruby: '키비시캇타데스까?',      meaning: '엄격했습니까?' },
        { text: '厳(きび)しくなかったですか？',   ruby: '키비시쿠나캇타데스까?',  meaning: '엄격하지 않았습니까?' },
      ],
      plain: [
        { text: '厳(きび)しい',           ruby: '키비시이',        meaning: '엄격해' },
        { text: '厳(きび)しくない',       ruby: '키비시쿠나이',    meaning: '엄격하지 않아' },
        { text: '厳(きび)しい？',         ruby: '키비시이?',       meaning: '엄격해?' },
        { text: '厳(きび)しくない？',     ruby: '키비시쿠나이?',   meaning: '엄격하지 않아?' },
        { text: '厳(きび)しかった',       ruby: '키비시캇타',      meaning: '엄격했어' },
        { text: '厳(きび)しくなかった',   ruby: '키비시쿠나캇타',  meaning: '엄격하지 않았어' },
        { text: '厳(きび)しかった？',     ruby: '키비시캇타?',     meaning: '엄격했어?' },
        { text: '厳(きび)しくなかった？', ruby: '키비시쿠나캇타?', meaning: '엄격하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님은 정말 엄격하지만 존경해.',
        japanese: '先生(せんせい)はとても厳(きび)しいけど尊敬(そんけい)している。',
        plain:    '先生はとても厳しいけど尊敬している。',
        reading:  '센세이와 토테모 키비시이케도 손케이시테이루.',
        pattern:  { name: '〜けど尊敬している', meaning: '~하지만 존경하다', note: 'けど는 역접 접속사(구어체). 엄격함 뒤에 존경심을 나타내는 표현' },
        furigana: 'せんせいはとてもきびしいけどそんけいしている',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '혹독한 훈련을 이겨냈어.',
        japanese: '厳(きび)しい訓練(くんれん)を乗(の)り越(こ)えた。',
        plain:    '厳しい訓練を乗り越えた。',
        reading:  '키비시이 쿤렌오 노리코에타.',
        pattern:  { name: '厳しい訓練を乗り越える', meaning: '혹독한 훈련을 이겨내다', note: '乗り越える는 극복하다는 관용 표현. 어려움을 극복하는 상황에 사용' },
        furigana: 'きびしいくんれんをのりこえた',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '올해 겨울은 특히 혹독했어.',
        japanese: '今年(ことし)の冬(ふゆ)は特(とく)に厳(きび)しかった。',
        plain:    '今年の冬は特に厳しかった。',
        reading:  '코토시노 후유와 토쿠니 키비시캇타.',
        pattern:  { name: '特に厳しかった', meaning: '특히 혹독했다', note: '特に는 특히·특별히라는 강조 부사. 날씨·상황이 평소보다 더 심했을 때 사용' },
        furigana: 'ことしのふゆはとくにきびしかった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 27위  可愛い
   * ══════════════════════════════════════════════════ */
  {
    id: 'kawaii', rank: 27, verb: '可愛い', reading: '카와이이', meaning: '귀엽다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '可愛(かわい)いです',               ruby: '카와이이데스',           meaning: '귀엽습니다' },
        { text: '可愛(かわい)くないです',           ruby: '카와이쿠나이데스',       meaning: '귀엽지 않습니다' },
        { text: '可愛(かわい)いですか？',           ruby: '카와이이데스까?',        meaning: '귀엽습니까?' },
        { text: '可愛(かわい)くないですか？',       ruby: '카와이쿠나이데스까?',    meaning: '귀엽지 않습니까?' },
        { text: '可愛(かわい)かったです',           ruby: '카와이캇타데스',         meaning: '귀여웠습니다' },
        { text: '可愛(かわい)くなかったです',       ruby: '카와이쿠나캇타데스',     meaning: '귀엽지 않았습니다' },
        { text: '可愛(かわい)かったですか？',       ruby: '카와이캇타데스까?',      meaning: '귀여웠습니까?' },
        { text: '可愛(かわい)くなかったですか？',   ruby: '카와이쿠나캇타데스까?',  meaning: '귀엽지 않았습니까?' },
      ],
      plain: [
        { text: '可愛(かわい)い',           ruby: '카와이이',        meaning: '귀여워' },
        { text: '可愛(かわい)くない',       ruby: '카와이쿠나이',    meaning: '귀엽지 않아' },
        { text: '可愛(かわい)い？',         ruby: '카와이이?',       meaning: '귀여워?' },
        { text: '可愛(かわい)くない？',     ruby: '카와이쿠나이?',   meaning: '귀엽지 않아?' },
        { text: '可愛(かわい)かった',       ruby: '카와이캇타',      meaning: '귀여웠어' },
        { text: '可愛(かわい)くなかった',   ruby: '카와이쿠나캇타',  meaning: '귀엽지 않았어' },
        { text: '可愛(かわい)かった？',     ruby: '카와이캇타?',     meaning: '귀여웠어?' },
        { text: '可愛(かわい)くなかった？', ruby: '카와이쿠나캇타?', meaning: '귀엽지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 아기 고양이는 정말 귀여워.',
        japanese: 'この子猫(こねこ)はとても可愛(かわい)い。',
        plain:    'この子猫はとても可愛い。',
        reading:  '코노 코네코와 토테모 카와이이.',
        pattern:  { name: 'とても可愛い', meaning: '정말 귀여워', note: 'とても는 강조 부사. 동물이나 아이에 대한 귀여움을 표현할 때 자주 사용' },
        furigana: 'このこねこはとてもかわいい',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '귀여운 옷을 발견해서 사버렸어.',
        japanese: '可愛(かわい)い服(ふく)を見(み)つけて買(か)ってしまった。',
        plain:    '可愛い服を見つけて買ってしまった。',
        reading:  '카와이이 후쿠오 미츠케테 캇테 시맛타.',
        pattern:  { name: '〜てしまった', meaning: '~해버렸다', note: 'てしまう는 의도치 않은 결과를 나타냄. 충동 구매 상황을 표현' },
        furigana: 'かわいいふくをみつけてかってしまった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그녀의 웃는 얼굴이 정말 귀여워.',
        japanese: '彼女(かのじょ)の笑顔(えがお)がとても可愛(かわい)い。',
        plain:    '彼女の笑顔がとても可愛い。',
        reading:  '카노죠노 에가오가 토테모 카와이이.',
        pattern:  { name: '〜の笑顔がとても可愛い', meaning: '~의 웃는 얼굴이 정말 귀여워', note: '笑顔(えがお)는 웃는 얼굴. の는 소유·속성을 나타내는 조사' },
        furigana: 'かのじょのえがおがとてもかわいい',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 28위  優しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'yasashii', rank: 28, verb: '優しい', reading: '야사시이', meaning: '친절하다; 상냥하다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '優(やさ)しいです',               ruby: '야사시이데스',           meaning: '상냥합니다' },
        { text: '優(やさ)しくないです',           ruby: '야사시쿠나이데스',       meaning: '상냥하지 않습니다' },
        { text: '優(やさ)しいですか？',           ruby: '야사시이데스까?',        meaning: '상냥합니까?' },
        { text: '優(やさ)しくないですか？',       ruby: '야사시쿠나이데스까?',    meaning: '상냥하지 않습니까?' },
        { text: '優(やさ)しかったです',           ruby: '야사시캇타데스',         meaning: '상냥했습니다' },
        { text: '優(やさ)しくなかったです',       ruby: '야사시쿠나캇타데스',     meaning: '상냥하지 않았습니다' },
        { text: '優(やさ)しかったですか？',       ruby: '야사시캇타데스까?',      meaning: '상냥했습니까?' },
        { text: '優(やさ)しくなかったですか？',   ruby: '야사시쿠나캇타데스까?',  meaning: '상냥하지 않았습니까?' },
      ],
      plain: [
        { text: '優(やさ)しい',           ruby: '야사시이',        meaning: '친절해' },
        { text: '優(やさ)しくない',       ruby: '야사시쿠나이',    meaning: '친절하지 않아' },
        { text: '優(やさ)しい？',         ruby: '야사시이?',       meaning: '친절해?' },
        { text: '優(やさ)しくない？',     ruby: '야사시쿠나이?',   meaning: '친절하지 않아?' },
        { text: '優(やさ)しかった',       ruby: '야사시캇타',      meaning: '친절했어' },
        { text: '優(やさ)しくなかった',   ruby: '야사시쿠나캇타',  meaning: '친절하지 않았어' },
        { text: '優(やさ)しかった？',     ruby: '야사시캇타?',     meaning: '친절했어?' },
        { text: '優(やさ)しくなかった？', ruby: '야사시쿠나캇타?', meaning: '친절하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 항상 친절하고 믿음직해.',
        japanese: '彼(かれ)はいつも優(やさ)しくて頼(たよ)りになる。',
        plain:    '彼はいつも優しくて頼りになる。',
        reading:  '카레와 이츠모 야사시쿠테 타요리니 나루.',
        pattern:  { name: '優しくて頼りになる', meaning: '친절하고 믿음직하다', note: 'くて는 형용사의 병렬 접속형. 頼りになる는 의지할 수 있다는 관용 표현' },
        furigana: 'かれはいつもやさしくてたよりになる',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '친절한 한마디로 마음이 편해져.',
        japanese: '優(やさ)しい言葉(ことば)一(ひと)つで気持(きも)ちが楽(らく)になる。',
        plain:    '優しい言葉一つで気持ちが楽になる。',
        reading:  '야사시이 코토바 히토츠데 키모치가 라쿠니 나루.',
        pattern:  { name: '言葉一つで気持ちが楽になる', meaning: '말 한마디로 마음이 편해지다', note: '一つで는 단 하나로. になる는 상태 변화를 나타냄' },
        furigana: 'やさしいことばひとつできもちがらくになる',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '그녀는 누구에게나 친절합니다.',
        japanese: '彼女(かのじょ)は誰(だれ)にでも優(やさ)しいです。',
        plain:    '彼女は誰にでも優しい。',
        reading:  '카노죠와 다레니데모 야사시이데스.',
        pattern:  { name: '誰にでも優しい', meaning: '누구에게나 친절하다', note: '誰にでも는 누구에게나. 보편적 친절함을 강조하는 표현' },
        furigana: 'かのじょはだれにでもやさしいです',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 29위  正しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'tadashii', rank: 29, verb: '正しい', reading: '타다시이', meaning: '올바르다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '正(ただ)しいです',               ruby: '타다시이데스',           meaning: '올바릅니다' },
        { text: '正(ただ)しくないです',           ruby: '타다시쿠나이데스',       meaning: '올바르지 않습니다' },
        { text: '正(ただ)しいですか？',           ruby: '타다시이데스까?',        meaning: '올바릅니까?' },
        { text: '正(ただ)しくないですか？',       ruby: '타다시쿠나이데스까?',    meaning: '올바르지 않습니까?' },
        { text: '正(ただ)しかったです',           ruby: '타다시캇타데스',         meaning: '올바랐습니다' },
        { text: '正(ただ)しくなかったです',       ruby: '타다시쿠나캇타데스',     meaning: '올바르지 않았습니다' },
        { text: '正(ただ)しかったですか？',       ruby: '타다시캇타데스까?',      meaning: '올바랐습니까?' },
        { text: '正(ただ)しくなかったですか？',   ruby: '타다시쿠나캇타데스까?',  meaning: '올바르지 않았습니까?' },
      ],
      plain: [
        { text: '正(ただ)しい',           ruby: '타다시이',        meaning: '올바르잖아' },
        { text: '正(ただ)しくない',       ruby: '타다시쿠나이',    meaning: '올바르지 않아' },
        { text: '正(ただ)しい？',         ruby: '타다시이?',       meaning: '올바르잖아?' },
        { text: '正(ただ)しくない？',     ruby: '타다시쿠나이?',   meaning: '올바르지 않아?' },
        { text: '正(ただ)しかった',       ruby: '타다시캇타',      meaning: '올바랐어' },
        { text: '正(ただ)しくなかった',   ruby: '타다시쿠나캇타',  meaning: '올바르지 않았어' },
        { text: '正(ただ)しかった？',     ruby: '타다시캇타?',     meaning: '올바랐어?' },
        { text: '正(ただ)しくなかった？', ruby: '타다시쿠나캇타?', meaning: '올바르지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '올바른 답을 고르세요.',
        japanese: '正(ただ)しい答(こた)えを選(えら)んでください。',
        plain:    '正しい答えを選んでください。',
        reading:  '타다시이 코타에오 에란데쿠다사이.',
        pattern:  { name: '正しい答えを選ぶ', meaning: '올바른 답을 고르다', note: '正しい+名詞로 명사를 수식. 시험·퀴즈 상황에서 자주 사용' },
        furigana: 'ただしいこたえをえらんでください',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '무엇이 올바른지 판단하는 건 어려워.',
        japanese: '何(なに)が正(ただ)しいか判断(はんだん)するのは難(むずか)しい。',
        plain:    '何が正しいか判断するのは難しい。',
        reading:  '나니가 타다시이카 한단스루노와 무즈카시이.',
        pattern:  { name: '何が正しいか判断するのは難しい', meaning: '무엇이 올바른지 판단하는 건 어렵다', note: '〜か는 간접 의문문. のは는 주제화 표현' },
        furigana: 'なにがただしいかはんだんするのはむずかしい',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '올바른 방법으로 문제를 풀었어.',
        japanese: '正(ただ)しい方法(ほうほう)で問題(もんだい)を解(と)いた。',
        plain:    '正しい方法で問題を解いた。',
        reading:  '타다시이 호ー호ー데 몬다이오 토이타.',
        pattern:  { name: '正しい方法で〜を解く', meaning: '올바른 방법으로 ~을 풀다', note: 'で는 수단·방법을 나타내는 조사. 解く는 문제를 풀다는 뜻' },
        furigana: 'ただしいほうほうでもんだいをといた',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 30위  酷い
   * ══════════════════════════════════════════════════ */
  {
    id: 'hidoi', rank: 30, verb: '酷い', reading: '히도이', meaning: '심하다; 너무하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '酷(ひど)いです',               ruby: '히도이데스',           meaning: '심합니다' },
        { text: '酷(ひど)くないです',           ruby: '히도쿠나이데스',       meaning: '심하지 않습니다' },
        { text: '酷(ひど)いですか？',           ruby: '히도이데스까?',        meaning: '심합니까?' },
        { text: '酷(ひど)くないですか？',       ruby: '히도쿠나이데스까?',    meaning: '심하지 않습니까?' },
        { text: '酷(ひど)かったです',           ruby: '히도캇타데스',         meaning: '심했습니다' },
        { text: '酷(ひど)くなかったです',       ruby: '히도쿠나캇타데스',     meaning: '심하지 않았습니다' },
        { text: '酷(ひど)かったですか？',       ruby: '히도캇타데스까?',      meaning: '심했습니까?' },
        { text: '酷(ひど)くなかったですか？',   ruby: '히도쿠나캇타데스까?',  meaning: '심하지 않았습니까?' },
      ],
      plain: [
        { text: '酷(ひど)い',           ruby: '히도이',        meaning: '너무해' },
        { text: '酷(ひど)くない',       ruby: '히도쿠나이',    meaning: '심하지 않아' },
        { text: '酷(ひど)い？',         ruby: '히도이?',       meaning: '너무해?' },
        { text: '酷(ひど)くない？',     ruby: '히도쿠나이?',   meaning: '심하지 않아?' },
        { text: '酷(ひど)かった',       ruby: '히도캇타',      meaning: '심했어' },
        { text: '酷(ひど)くなかった',   ruby: '히도쿠나캇타',  meaning: '심하지 않았어' },
        { text: '酷(ひど)かった？',     ruby: '히도캇타?',     meaning: '심했어?' },
        { text: '酷(ひど)くなかった？', ruby: '히도쿠나캇타?', meaning: '심하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그의 말은 너무 심해.',
        japanese: '彼(かれ)の言葉(ことば)は酷(ひど)すぎる。',
        plain:    '彼の言葉は酷すぎる。',
        reading:  '카레노 코토바와 히도스기루.',
        pattern:  { name: '〜すぎる', meaning: '너무 ~하다', note: '形容詞語幹+すぎる는 정도가 지나침을 나타냄. 비판이나 불만을 표현할 때 사용' },
        furigana: 'かれのことばはひどすぎる',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '어제 폭풍은 심했어.',
        japanese: '昨日(きのう)の嵐(あらし)は酷(ひど)かった。',
        plain:    '昨日の嵐は酷かった。',
        reading:  '키노ー노 아라시와 히도캇타.',
        pattern:  { name: '〜は酷かった', meaning: '~은/는 심했다', note: '酷かった는 과거형. 날씨·상황이 심했음을 나타냄' },
        furigana: 'きのうのあらしはひどかった',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '그런 대우는 심하다고 생각합니다.',
        japanese: 'そんな扱(あつか)いは酷(ひど)いと思(おも)います。',
        plain:    'そんな扱いは酷いと思う。',
        reading:  '손나 아츠카이와 히도이토 오모이마스.',
        pattern:  { name: '〜は酷いと思います', meaning: '~은/는 심하다고 생각합니다', note: 'と思います는 자신의 의견을 부드럽게 전달하는 표현' },
        furigana: 'そんなあつかいはひどいとおもいます',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ── 31~100위: 스텁 ─────────────────────────────── */

  /* ══════════════════════════════════════════════════
   * 31위  安い
   * ══════════════════════════════════════════════════ */
  {
    id: 'yasui', rank: 31, verb: '安い', reading: '야스이', meaning: '싸다; 저렴하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '安(やす)いです',            ruby: '야스이데스',          meaning: '쌉니다' },
        { text: '安(やす)くないです',         ruby: '야스쿠나이데스',      meaning: '싸지 않습니다' },
        { text: '安(やす)いですか？',         ruby: '야스이데스까?',       meaning: '쌉니까?' },
        { text: '安(やす)くないですか？',     ruby: '야스쿠나이데스까?',   meaning: '싸지 않습니까?' },
        { text: '安(やす)かったです',         ruby: '야스캇타데스',        meaning: '쌌습니다' },
        { text: '安(やす)くなかったです',     ruby: '야스쿠나캇타데스',    meaning: '싸지 않았습니다' },
        { text: '安(やす)かったですか？',     ruby: '야스캇타데스까?',     meaning: '쌌습니까?' },
        { text: '安(やす)くなかったですか？', ruby: '야스쿠나캇타데스까?', meaning: '싸지 않았습니까?' },
      ],
      plain: [
        { text: '安(やす)い',           ruby: '야스이',        meaning: '싸' },
        { text: '安(やす)くない',       ruby: '야스쿠나이',    meaning: '싸지 않아' },
        { text: '安(やす)い？',         ruby: '야스이?',       meaning: '싸?' },
        { text: '安(やす)くない？',     ruby: '야스쿠나이?',   meaning: '싸지 않아?' },
        { text: '安(やす)かった',       ruby: '야스캇타',      meaning: '쌌어' },
        { text: '安(やす)くなかった',   ruby: '야스쿠나캇타',  meaning: '싸지 않았어' },
        { text: '安(やす)かった？',     ruby: '야스캇타?',     meaning: '쌌어?' },
        { text: '安(やす)くなかった？', ruby: '야스쿠나캇타?', meaning: '싸지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 슈퍼는 채소가 싸.',
        japanese: 'このスーパーは野菜(やさい)が安(やす)い。',
        plain:    'このスーパーは野菜が安い。',
        reading:  '코노 스ー파ー와 야사이가 야스이.',
        pattern:  { name: '〜は〜が安い', meaning: '~은 ~이 싸다', note: '가격이 저렴함을 나타내는 표현. 슈퍼·시장 등 쇼핑 상황에서 자주 사용' },
        furigana: 'このすーぱーはやさいがやすい',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0] }],
      },
      {
        korean:   '싸고 맛있는 가게를 알려주세요.',
        japanese: '安(やす)くておいしいお店(みせ)を教(おし)えてください。',
        plain:    '安くておいしいお店を教えてください。',
        reading:  '야스쿠테 오이시이 오미세오 오시에테쿠다사이.',
        pattern:  { name: '安くておいしい〜', meaning: '싸고 맛있는 ~', note: 'くて는 い형용사의 연결형. 두 가지 좋은 조건을 동시에 나타냄' },
        furigana: 'やすくておいしいおみせをおしえてください',
        accentData: [{ phrase_id: 0, mora_count: 20, accent: [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '좀 더 싸지지 않을까요?',
        japanese: 'もう少(すこ)し安(やす)くなりませんか？',
        plain:    'もう少し安くなりませんか？',
        reading:  '모ー 스코시 야스쿠 나리마셍까?',
        pattern:  { name: 'もう少し安くなりませんか', meaning: '좀 더 싸지지 않을까요?', note: 'くなる는 상태 변화. ませんか는 부드러운 요청·제안. 가격 흥정 표현' },
        furigana: 'もうすこしやすくなりませんか',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 32위  軽い
   * ══════════════════════════════════════════════════ */
  {
    id: 'karui', rank: 32, verb: '軽い', reading: '카루이', meaning: '가볍다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '軽(かる)いです',            ruby: '카루이데스',          meaning: '가볍습니다' },
        { text: '軽(かる)くないです',         ruby: '카루쿠나이데스',      meaning: '가볍지 않습니다' },
        { text: '軽(かる)いですか？',         ruby: '카루이데스까?',       meaning: '가볍습니까?' },
        { text: '軽(かる)くないですか？',     ruby: '카루쿠나이데스까?',   meaning: '가볍지 않습니까?' },
        { text: '軽(かる)かったです',         ruby: '카루캇타데스',        meaning: '가벼웠습니다' },
        { text: '軽(かる)くなかったです',     ruby: '카루쿠나캇타데스',    meaning: '가볍지 않았습니다' },
        { text: '軽(かる)かったですか？',     ruby: '카루캇타데스까?',     meaning: '가벼웠습니까?' },
        { text: '軽(かる)くなかったですか？', ruby: '카루쿠나캇타데스까?', meaning: '가볍지 않았습니까?' },
      ],
      plain: [
        { text: '軽(かる)い',           ruby: '카루이',        meaning: '가벼워' },
        { text: '軽(かる)くない',       ruby: '카루쿠나이',    meaning: '가볍지 않아' },
        { text: '軽(かる)い？',         ruby: '카루이?',       meaning: '가벼워?' },
        { text: '軽(かる)くない？',     ruby: '카루쿠나이?',   meaning: '가볍지 않아?' },
        { text: '軽(かる)かった',       ruby: '카루캇타',      meaning: '가벼웠어' },
        { text: '軽(かる)くなかった',   ruby: '카루쿠나캇타',  meaning: '가볍지 않았어' },
        { text: '軽(かる)かった？',     ruby: '카루캇타?',     meaning: '가벼웠어?' },
        { text: '軽(かる)くなかった？', ruby: '카루쿠나캇타?', meaning: '가볍지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 가방은 매우 가벼워.',
        japanese: 'このカバンはとても軽(かる)い。',
        plain:    'このカバンはとても軽い。',
        reading:  '코노 카반와 토테모 카루이.',
        pattern:  { name: '〜はとても軽い', meaning: '~은 매우 가볍다', note: '가방·짐의 무게를 나타낼 때 자주 사용. 반대어는 重い(오모이)' },
        furigana: 'このかばんはとてもかるい',
        accentData: [{ phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1] }],
      },
      {
        korean:   '가벼운 운동을 매일 계속하고 있어요.',
        japanese: '軽(かる)い運動(うんどう)を毎日(まいにち)続(つづ)けています。',
        plain:    '軽い運動を毎日続けている。',
        reading:  '카루이 운도ー오 마이니치 츠즈케테이마스.',
        pattern:  { name: '軽い運動を毎日続けています', meaning: '가벼운 운동을 매일 계속하고 있습니다', note: '軽い運動는 가벼운 운동. ています는 현재 진행·지속 상태' },
        furigana: 'かるいうんどうをまいにちつづけています',
        accentData: [{ phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0] }],
      },
      {
        korean:   '마음이 가벼워졌어.',
        japanese: '気持(きも)ちが軽(かる)くなりました。',
        plain:    '気持ちが軽くなった。',
        reading:  '키모치가 카루쿠 나리마시타.',
        pattern:  { name: '気持ちが軽くなりました', meaning: '마음이 가벼워졌습니다', note: 'くなる는 상태 변화 표현. 걱정·부담이 줄었을 때의 감정 표현' },
        furigana: 'きもちがかるくなりました',
        accentData: [{ phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 33위  古い
   * ══════════════════════════════════════════════════ */
  {
    id: 'furui', rank: 33, verb: '古い', reading: '후루이', meaning: '낡다; 오래되다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '古(ふる)いです',            ruby: '후루이데스',          meaning: '오래됐습니다' },
        { text: '古(ふる)くないです',         ruby: '후루쿠나이데스',      meaning: '오래되지 않았습니다' },
        { text: '古(ふる)いですか？',         ruby: '후루이데스까?',       meaning: '오래됐습니까?' },
        { text: '古(ふる)くないですか？',     ruby: '후루쿠나이데스까?',   meaning: '오래되지 않았습니까?' },
        { text: '古(ふる)かったです',         ruby: '후루캇타데스',        meaning: '오래됐었습니다' },
        { text: '古(ふる)くなかったです',     ruby: '후루쿠나캇타데스',    meaning: '오래되지 않았습니다' },
        { text: '古(ふる)かったですか？',     ruby: '후루캇타데스까?',     meaning: '오래됐었습니까?' },
        { text: '古(ふる)くなかったですか？', ruby: '후루쿠나캇타데스까?', meaning: '오래되지 않았습니까?' },
      ],
      plain: [
        { text: '古(ふる)い',           ruby: '후루이',        meaning: '오래됐어' },
        { text: '古(ふる)くない',       ruby: '후루쿠나이',    meaning: '오래되지 않았어' },
        { text: '古(ふる)い？',         ruby: '후루이?',       meaning: '오래됐어?' },
        { text: '古(ふる)くない？',     ruby: '후루쿠나이?',   meaning: '오래되지 않았어?' },
        { text: '古(ふる)かった',       ruby: '후루캇타',      meaning: '오래됐었어' },
        { text: '古(ふる)くなかった',   ruby: '후루쿠나캇타',  meaning: '오래되지 않았었어' },
        { text: '古(ふる)かった？',     ruby: '후루캇타?',     meaning: '오래됐었어?' },
        { text: '古(ふる)くなかった？', ruby: '후루쿠나캇타?', meaning: '오래되지 않았었어?' },
      ],
    },
    examples: [
      {
        korean:   '이 건물은 매우 오래됐어.',
        japanese: 'この建物(たてもの)はとても古(ふる)い。',
        plain:    'この建物はとても古い。',
        reading:  '코노 타테모노와 토테모 후루이.',
        pattern:  { name: '〜はとても古い', meaning: '~은 매우 오래됐다', note: '건물·물건의 연식을 표현할 때 사용. 반대어는 新しい(아타라시이)' },
        furigana: 'このたてものはとてもふるい',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0] }],
      },
      {
        korean:   '오랜 친구를 만났어.',
        japanese: '古(ふる)い友達(ともだち)に会(あ)いました。',
        plain:    '古い友達に会った。',
        reading:  '후루이 토모다치니 아이마시타.',
        pattern:  { name: '古い友達に会いました', meaning: '오랜 친구를 만났습니다', note: '古い友達는 오래된 친구·옛 친구. 오랜 인연을 이야기할 때 사용' },
        furigana: 'ふるいともだちにあいました',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0] }],
      },
      {
        korean:   '오래된 스마트폰을 새것으로 바꿨어.',
        japanese: '古(ふる)いスマホを新(あたら)しいものに変(か)えました。',
        plain:    '古いスマホを新しいものに変えた。',
        reading:  '후루이 스마호오 아타라시이 모노니 카에마시타.',
        pattern:  { name: '古い〜を新しいものに変えました', meaning: '오래된 ~을 새것으로 바꿨습니다', note: '変える는 바꾸다. 물건 교체 상황에서 사용하는 표현' },
        furigana: 'ふるいすまほをあたらしいものにかえました',
        accentData: [{ phrase_id: 0, mora_count: 20, accent: [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 34위  怖い
   * ══════════════════════════════════════════════════ */
  {
    id: 'kowai', rank: 34, verb: '怖い', reading: '코와이', meaning: '무섭다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '怖(こわ)いです',            ruby: '코와이데스',          meaning: '무섭습니다' },
        { text: '怖(こわ)くないです',         ruby: '코와쿠나이데스',      meaning: '무섭지 않습니다' },
        { text: '怖(こわ)いですか？',         ruby: '코와이데스까?',       meaning: '무섭습니까?' },
        { text: '怖(こわ)くないですか？',     ruby: '코와쿠나이데스까?',   meaning: '무섭지 않습니까?' },
        { text: '怖(こわ)かったです',         ruby: '코와캇타데스',        meaning: '무서웠습니다' },
        { text: '怖(こわ)くなかったです',     ruby: '코와쿠나캇타데스',    meaning: '무섭지 않았습니다' },
        { text: '怖(こわ)かったですか？',     ruby: '코와캇타데스까?',     meaning: '무서웠습니까?' },
        { text: '怖(こわ)くなかったですか？', ruby: '코와쿠나캇타데스까?', meaning: '무섭지 않았습니까?' },
      ],
      plain: [
        { text: '怖(こわ)い',           ruby: '코와이',        meaning: '무서워' },
        { text: '怖(こわ)くない',       ruby: '코와쿠나이',    meaning: '무섭지 않아' },
        { text: '怖(こわ)い？',         ruby: '코와이?',       meaning: '무서워?' },
        { text: '怖(こわ)くない？',     ruby: '코와쿠나이?',   meaning: '무섭지 않아?' },
        { text: '怖(こわ)かった',       ruby: '코와캇타',      meaning: '무서웠어' },
        { text: '怖(こわ)くなかった',   ruby: '코와쿠나캇타',  meaning: '무섭지 않았어' },
        { text: '怖(こわ)かった？',     ruby: '코와캇타?',     meaning: '무서웠어?' },
        { text: '怖(こわ)くなかった？', ruby: '코와쿠나캇타?', meaning: '무섭지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '어두운 곳은 무서워.',
        japanese: '暗(くら)い場所(ばしょ)は怖(こわ)い。',
        plain:    '暗い場所は怖い。',
        reading:  '쿠라이 바쇼와 코와이.',
        pattern:  { name: '〜は怖い', meaning: '~은 무섭다', note: '怖い는 공포·두려움. 장소·상황에 대한 무서움을 나타냄' },
        furigana: 'くらいばしょはこわい',
        accentData: [{ phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 0] }],
      },
      {
        korean:   '무서운 꿈을 꿔버렸어.',
        japanese: '怖(こわ)い夢(ゆめ)を見(み)てしまいました。',
        plain:    '怖い夢を見てしまった。',
        reading:  '코와이 유메오 미테 시마이마시타.',
        pattern:  { name: '怖い夢を見てしまいました', meaning: '무서운 꿈을 꿔버렸습니다', note: 'てしまいました는 의도치 않은 결과에 대한 유감·당혹감 표현' },
        furigana: 'こわいゆめをみてしまいました',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0] }],
      },
      {
        korean:   '선생님은 무서워 보였지만 친절했어.',
        japanese: '先生(せんせい)は怖(こわ)そうに見(み)えたが優(やさ)しかった。',
        plain:    '先生は怖そうに見えたが優しかった。',
        reading:  '센세이와 코와소ー니 미에타가 야사시캇타.',
        pattern:  { name: '〜そうに見えたが〜だった', meaning: '~처럼 보였지만 ~였다', note: 'そうに見える는 ~처럼 보이다. が는 역접. 외모와 실제가 다를 때 사용' },
        furigana: 'せんせいはこわそうにみえたがやさしかった',
        accentData: [{ phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 35위  激しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'hageshii', rank: 35, verb: '激しい', reading: '하게시이', meaning: '격렬하다; 심하다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '激(はげ)しいです',            ruby: '하게시이데스',          meaning: '격렬합니다' },
        { text: '激(はげ)しくないです',         ruby: '하게시쿠나이데스',      meaning: '격렬하지 않습니다' },
        { text: '激(はげ)しいですか？',         ruby: '하게시이데스까?',       meaning: '격렬합니까?' },
        { text: '激(はげ)しくないですか？',     ruby: '하게시쿠나이데스까?',   meaning: '격렬하지 않습니까?' },
        { text: '激(はげ)しかったです',         ruby: '하게시캇타데스',        meaning: '격렬했습니다' },
        { text: '激(はげ)しくなかったです',     ruby: '하게시쿠나캇타데스',    meaning: '격렬하지 않았습니다' },
        { text: '激(はげ)しかったですか？',     ruby: '하게시캇타데스까?',     meaning: '격렬했습니까?' },
        { text: '激(はげ)しくなかったですか？', ruby: '하게시쿠나캇타데스까?', meaning: '격렬하지 않았습니까?' },
      ],
      plain: [
        { text: '激(はげ)しい',           ruby: '하게시이',        meaning: '격렬해' },
        { text: '激(はげ)しくない',       ruby: '하게시쿠나이',    meaning: '격렬하지 않아' },
        { text: '激(はげ)しい？',         ruby: '하게시이?',       meaning: '격렬해?' },
        { text: '激(はげ)しくない？',     ruby: '하게시쿠나이?',   meaning: '격렬하지 않아?' },
        { text: '激(はげ)しかった',       ruby: '하게시캇타',      meaning: '격렬했어' },
        { text: '激(はげ)しくなかった',   ruby: '하게시쿠나캇타',  meaning: '격렬하지 않았어' },
        { text: '激(はげ)しかった？',     ruby: '하게시캇타?',     meaning: '격렬했어?' },
        { text: '激(はげ)しくなかった？', ruby: '하게시쿠나캇타?', meaning: '격렬하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '비가 세차게 내리고 있어요.',
        japanese: '雨(あめ)が激(はげ)しく降(ふ)っています。',
        plain:    '雨が激しく降っている。',
        reading:  '아메가 하게시쿠 훗테이마스.',
        pattern:  { name: '雨が激しく降っています', meaning: '비가 세차게 내리고 있습니다', note: 'しく는 い형용사의 부사형. 날씨를 묘사할 때 자주 사용' },
        furigana: 'あめがはげしくふっています',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0] }],
      },
      {
        korean:   '격렬한 연습을 견뎌냈어.',
        japanese: '激(はげ)しい練習(れんしゅう)に耐(た)えました。',
        plain:    '激しい練習に耐えた。',
        reading:  '하게시이 렌슈ー니 타에마시타.',
        pattern:  { name: '激しい〜に耐える', meaning: '격렬한 ~을 견디다', note: '耐える는 견디다·참다. 혹독한 훈련을 이겨낸 상황을 표현' },
        furigana: 'はげしいれんしゅうにたえました',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0] }],
      },
      {
        korean:   '두 사람의 논쟁이 격렬해졌어.',
        japanese: '二人(ふたり)の議論(ぎろん)は激(はげ)しくなった。',
        plain:    '二人の議論は激しくなった。',
        reading:  '후타리노 기론와 하게시쿠 낫타.',
        pattern:  { name: '〜は激しくなった', meaning: '~이 격렬해졌다', note: 'しくなる는 상태 변화. 논쟁·갈등이 격화되는 상황을 표현' },
        furigana: 'ふたりのぎろんははげしくなった',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 36위  重い
   * ══════════════════════════════════════════════════ */
  {
    id: 'omoi', rank: 36, verb: '重い', reading: '오모이', meaning: '무겁다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '重(おも)いです',            ruby: '오모이데스',          meaning: '무겁습니다' },
        { text: '重(おも)くないです',         ruby: '오모쿠나이데스',      meaning: '무겁지 않습니다' },
        { text: '重(おも)いですか？',         ruby: '오모이데스까?',       meaning: '무겁습니까?' },
        { text: '重(おも)くないですか？',     ruby: '오모쿠나이데스까?',   meaning: '무겁지 않습니까?' },
        { text: '重(おも)かったです',         ruby: '오모캇타데스',        meaning: '무거웠습니다' },
        { text: '重(おも)くなかったです',     ruby: '오모쿠나캇타데스',    meaning: '무겁지 않았습니다' },
        { text: '重(おも)かったですか？',     ruby: '오모캇타데스까?',     meaning: '무거웠습니까?' },
        { text: '重(おも)くなかったですか？', ruby: '오모쿠나캇타데스까?', meaning: '무겁지 않았습니까?' },
      ],
      plain: [
        { text: '重(おも)い',           ruby: '오모이',        meaning: '무거워' },
        { text: '重(おも)くない',       ruby: '오모쿠나이',    meaning: '무겁지 않아' },
        { text: '重(おも)い？',         ruby: '오모이?',       meaning: '무거워?' },
        { text: '重(おも)くない？',     ruby: '오모쿠나이?',   meaning: '무겁지 않아?' },
        { text: '重(おも)かった',       ruby: '오모캇타',      meaning: '무거웠어' },
        { text: '重(おも)くなかった',   ruby: '오모쿠나캇타',  meaning: '무겁지 않았어' },
        { text: '重(おも)かった？',     ruby: '오모캇타?',     meaning: '무거웠어?' },
        { text: '重(おも)くなかった？', ruby: '오모쿠나캇타?', meaning: '무겁지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 여행가방은 매우 무거워.',
        japanese: 'このスーツケースはとても重(おも)い。',
        plain:    'このスーツケースはとても重い。',
        reading:  '코노 스ー츠케ー스와 토테모 오모이.',
        pattern:  { name: '〜はとても重い', meaning: '~은 매우 무겁다', note: '짐·가방의 무게를 표현할 때 사용. 반대어는 軽い(카루이)' },
        furigana: 'このすーつけーすはとてもおもい',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '무거운 짐을 혼자 날랐어.',
        japanese: '重(おも)い荷物(にもつ)を一人(ひとり)で運(はこ)んだ。',
        plain:    '重い荷物を一人で運んだ。',
        reading:  '오모이 니모츠오 히토리데 하콘다.',
        pattern:  { name: '重い荷物を一人で運んだ', meaning: '무거운 짐을 혼자 날랐다', note: '一人で는 혼자서. 힘든 일을 혼자 해낸 상황 표현' },
        furigana: 'おもいにもつをひとりではこんだ',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1] }],
      },
      {
        korean:   '무거운 책임을 느끼고 있어요.',
        japanese: '重(おも)い責任(せきにん)を感(かん)じています。',
        plain:    '重い責任を感じている。',
        reading:  '오모이 세키닌오 칸지테이마스.',
        pattern:  { name: '重い責任を感じています', meaning: '무거운 책임을 느끼고 있습니다', note: '責任(せきにん)는 책임. 重い는 물리적 무게뿐 아니라 심리적 부담에도 사용' },
        furigana: 'おもいせきにんをかんじています',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 37위  明るい
   * ══════════════════════════════════════════════════ */
  {
    id: 'akarui', rank: 37, verb: '明るい', reading: '아카루이', meaning: '밝다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '明(あか)るいです',            ruby: '아카루이데스',          meaning: '밝습니다' },
        { text: '明(あか)るくないです',         ruby: '아카루쿠나이데스',      meaning: '밝지 않습니다' },
        { text: '明(あか)るいですか？',         ruby: '아카루이데스까?',       meaning: '밝습니까?' },
        { text: '明(あか)るくないですか？',     ruby: '아카루쿠나이데스까?',   meaning: '밝지 않습니까?' },
        { text: '明(あか)るかったです',         ruby: '아카루캇타데스',        meaning: '밝았습니다' },
        { text: '明(あか)るくなかったです',     ruby: '아카루쿠나캇타데스',    meaning: '밝지 않았습니다' },
        { text: '明(あか)るかったですか？',     ruby: '아카루캇타데스까?',     meaning: '밝았습니까?' },
        { text: '明(あか)るくなかったですか？', ruby: '아카루쿠나캇타데스까?', meaning: '밝지 않았습니까?' },
      ],
      plain: [
        { text: '明(あか)るい',           ruby: '아카루이',        meaning: '밝아' },
        { text: '明(あか)るくない',       ruby: '아카루쿠나이',    meaning: '밝지 않아' },
        { text: '明(あか)るい？',         ruby: '아카루이?',       meaning: '밝아?' },
        { text: '明(あか)るくない？',     ruby: '아카루쿠나이?',   meaning: '밝지 않아?' },
        { text: '明(あか)るかった',       ruby: '아카루캇타',      meaning: '밝았어' },
        { text: '明(あか)るくなかった',   ruby: '아카루쿠나캇타',  meaning: '밝지 않았어' },
        { text: '明(あか)るかった？',     ruby: '아카루캇타?',     meaning: '밝았어?' },
        { text: '明(あか)るくなかった？', ruby: '아카루쿠나캇타?', meaning: '밝지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀는 항상 밝아.',
        japanese: '彼女(かのじょ)はいつも明(あか)るい。',
        plain:    '彼女はいつも明るい。',
        reading:  '카노죠와 이츠모 아카루이.',
        pattern:  { name: '〜はいつも明るい', meaning: '~은 항상 밝다', note: '明るい는 성격이 밝음을 표현할 때도 사용. いつも는 항상' },
        furigana: 'かのじょはいつもあかるい',
        accentData: [{ phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0] }],
      },
      {
        korean:   '밝은 방에서 공부하면 눈에 좋아.',
        japanese: '明(あか)るい部屋(へや)で勉強(べんきょう)すると目(め)に良(よ)い。',
        plain:    '明るい部屋で勉強すると目に良い。',
        reading:  '아카루이 헤야데 벵쿄ー스루토 메니 요이.',
        pattern:  { name: '明るい部屋で勉強すると目に良い', meaning: '밝은 방에서 공부하면 눈에 좋다', note: 'すると는 ~하면. 조건과 결과를 나타내는 표현' },
        furigana: 'あかるいへやでべんきょうするとめによい',
        accentData: [{ phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0] }],
      },
      {
        korean:   '밝은 미래를 믿고 있어.',
        japanese: '明(あか)るい未来(みらい)を信(しん)じています。',
        plain:    '明るい未来を信じている。',
        reading:  '아카루이 미라이오 신지테이마스.',
        pattern:  { name: '明るい未来を信じています', meaning: '밝은 미래를 믿고 있습니다', note: '未来(みらい)는 미래. 信じる는 믿다. 희망적 표현' },
        furigana: 'あかるいみらいをしんじています',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 38위  辛い
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsurai', rank: 38, verb: '辛い', reading: '츠라이', meaning: '괴롭다; 힘들다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '辛(つら)いです',            ruby: '츠라이데스',          meaning: '힘듭니다' },
        { text: '辛(つら)くないです',         ruby: '츠라쿠나이데스',      meaning: '힘들지 않습니다' },
        { text: '辛(つら)いですか？',         ruby: '츠라이데스까?',       meaning: '힘듭니까?' },
        { text: '辛(つら)くないですか？',     ruby: '츠라쿠나이데스까?',   meaning: '힘들지 않습니까?' },
        { text: '辛(つら)かったです',         ruby: '츠라캇타데스',        meaning: '힘들었습니다' },
        { text: '辛(つら)くなかったです',     ruby: '츠라쿠나캇타데스',    meaning: '힘들지 않았습니다' },
        { text: '辛(つら)かったですか？',     ruby: '츠라캇타데스까?',     meaning: '힘들었습니까?' },
        { text: '辛(つら)くなかったですか？', ruby: '츠라쿠나캇타데스까?', meaning: '힘들지 않았습니까?' },
      ],
      plain: [
        { text: '辛(つら)い',           ruby: '츠라이',        meaning: '힘들어' },
        { text: '辛(つら)くない',       ruby: '츠라쿠나이',    meaning: '힘들지 않아' },
        { text: '辛(つら)い？',         ruby: '츠라이?',       meaning: '힘들어?' },
        { text: '辛(つら)くない？',     ruby: '츠라쿠나이?',   meaning: '힘들지 않아?' },
        { text: '辛(つら)かった',       ruby: '츠라캇타',      meaning: '힘들었어' },
        { text: '辛(つら)くなかった',   ruby: '츠라쿠나캇타',  meaning: '힘들지 않았어' },
        { text: '辛(つら)かった？',     ruby: '츠라캇타?',     meaning: '힘들었어?' },
        { text: '辛(つら)くなかった？', ruby: '츠라쿠나캇타?', meaning: '힘들지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이별은 매우 힘들어.',
        japanese: '別(わか)れはとても辛(つら)い。',
        plain:    '別れはとても辛い。',
        reading:  '와카레와 토테모 츠라이.',
        pattern:  { name: '〜はとても辛い', meaning: '~은 매우 힘들다', note: '辛い는 정서적 고통·괴로움. 別れ는 이별. 슬픔의 감정을 표현' },
        furigana: 'わかれはとてもつらい',
        accentData: [{ phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 0, 0, 1, 1, 0, 1, 0] }],
      },
      {
        korean:   '힘든 시기를 극복했어.',
        japanese: '辛(つら)い時期(じき)を乗(の)り越(こ)えました。',
        plain:    '辛い時期を乗り越えた。',
        reading:  '츠라이 지키오 노리코에마시타.',
        pattern:  { name: '辛い時期を乗り越えました', meaning: '힘든 시기를 극복했습니다', note: '乗り越える는 극복하다. 어려움을 이겨낸 상황을 표현' },
        furigana: 'つらいじきをのりこえました',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0] }],
      },
      {
        korean:   '힘들어도 앞으로 나아갈 수밖에 없어.',
        japanese: '辛(つら)くても前(まえ)に進(すす)むしかない。',
        plain:    '辛くても前に進むしかない。',
        reading:  '츠라쿠테모 마에니 스스무 시카나이.',
        pattern:  { name: '辛くても前に進むしかない', meaning: '힘들어도 앞으로 나아갈 수밖에 없다', note: 'くても는 ~해도의 역접. しかない는 ~할 수밖에 없다는 강한 의지' },
        furigana: 'つらくてもまえにすすむしかない',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 39위  素晴らしい
   * ══════════════════════════════════════════════════ */
  {
    id: 'subarashii', rank: 39, verb: '素晴らしい', reading: '스바라시이', meaning: '훌륭하다; 멋지다',
    accentType: 4,
    conjugations: {
      formal: [
        { text: '素晴(すば)らしいです',            ruby: '스바라시이데스',          meaning: '훌륭합니다' },
        { text: '素晴(すば)らしくないです',         ruby: '스바라시쿠나이데스',      meaning: '훌륭하지 않습니다' },
        { text: '素晴(すば)らしいですか？',         ruby: '스바라시이데스까?',       meaning: '훌륭합니까?' },
        { text: '素晴(すば)らしくないですか？',     ruby: '스바라시쿠나이데스까?',   meaning: '훌륭하지 않습니까?' },
        { text: '素晴(すば)らしかったです',         ruby: '스바라시캇타데스',        meaning: '훌륭했습니다' },
        { text: '素晴(すば)らしくなかったです',     ruby: '스바라시쿠나캇타데스',    meaning: '훌륭하지 않았습니다' },
        { text: '素晴(すば)らしかったですか？',     ruby: '스바라시캇타데스까?',     meaning: '훌륭했습니까?' },
        { text: '素晴(すば)らしくなかったですか？', ruby: '스바라시쿠나캇타데스까?', meaning: '훌륭하지 않았습니까?' },
      ],
      plain: [
        { text: '素晴(すば)らしい',           ruby: '스바라시이',        meaning: '훌륭해' },
        { text: '素晴(すば)らしくない',       ruby: '스바라시쿠나이',    meaning: '훌륭하지 않아' },
        { text: '素晴(すば)らしい？',         ruby: '스바라시이?',       meaning: '훌륭해?' },
        { text: '素晴(すば)らしくない？',     ruby: '스바라시쿠나이?',   meaning: '훌륭하지 않아?' },
        { text: '素晴(すば)らしかった',       ruby: '스바라시캇타',      meaning: '훌륭했어' },
        { text: '素晴(すば)らしくなかった',   ruby: '스바라시쿠나캇타',  meaning: '훌륭하지 않았어' },
        { text: '素晴(すば)らしかった？',     ruby: '스바라시캇타?',     meaning: '훌륭했어?' },
        { text: '素晴(すば)らしくなかった？', ruby: '스바라시쿠나캇타?', meaning: '훌륭하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그의 연주는 훌륭해.',
        japanese: '彼(かれ)の演奏(えんそう)は素晴(すば)らしい。',
        plain:    '彼の演奏は素晴らしい。',
        reading:  '카레노 엔소ー와 스바라시이.',
        pattern:  { name: '〜は素晴らしい', meaning: '~은 훌륭하다', note: '素晴らしい는 매우 감탄할 만한 상황에서 사용. 연주·작품 등을 칭찬' },
        furigana: 'かれのえんそうはすばらしい',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0] }],
      },
      {
        korean:   '훌륭한 경치에 감동했어.',
        japanese: '素晴(すば)らしい景色(けしき)に感動(かんどう)しました。',
        plain:    '素晴らしい景色に感動した。',
        reading:  '스바라시이 케시키니 칸도ー시마시타.',
        pattern:  { name: '素晴らしい〜に感動しました', meaning: '훌륭한 ~에 감동했습니다', note: '感動する는 감동하다. 경치·공연 등에 크게 감명받을 때 사용' },
        furigana: 'すばらしいけしきにかんどうしました',
        accentData: [{ phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] }],
      },
      {
        korean:   '훌륭한 기회를 줘서 고마워.',
        japanese: '素晴(すば)らしい機会(きかい)を与(あた)えてくれてありがとう。',
        plain:    '素晴らしい機会を与えてくれてありがとう。',
        reading:  '스바라시이 키카이오 아타에테 쿠레테 아리가토ー.',
        pattern:  { name: '素晴らしい機会を与えてくれてありがとう', meaning: '훌륭한 기회를 줘서 고마워', note: 'てくれる는 나를 위해 해주다. 감사를 표현하는 상황' },
        furigana: 'すばらしいきかいをあたえてくれてありがとう',
        accentData: [{ phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 40위  可笑しい
   * ══════════════════════════════════════════════════ */
  {
    id: 'okashii', rank: 40, verb: '可笑しい', reading: '오카시이', meaning: '이상하다; 웃기다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '可笑(おか)しいです',            ruby: '오카시이데스',          meaning: '이상합니다' },
        { text: '可笑(おか)しくないです',         ruby: '오카시쿠나이데스',      meaning: '이상하지 않습니다' },
        { text: '可笑(おか)しいですか？',         ruby: '오카시이데스까?',       meaning: '이상합니까?' },
        { text: '可笑(おか)しくないですか？',     ruby: '오카시쿠나이데스까?',   meaning: '이상하지 않습니까?' },
        { text: '可笑(おか)しかったです',         ruby: '오카시캇타데스',        meaning: '이상했습니다' },
        { text: '可笑(おか)しくなかったです',     ruby: '오카시쿠나캇타데스',    meaning: '이상하지 않았습니다' },
        { text: '可笑(おか)しかったですか？',     ruby: '오카시캇타데스까?',     meaning: '이상했습니까?' },
        { text: '可笑(おか)しくなかったですか？', ruby: '오카시쿠나캇타데스까?', meaning: '이상하지 않았습니까?' },
      ],
      plain: [
        { text: '可笑(おか)しい',           ruby: '오카시이',        meaning: '이상해' },
        { text: '可笑(おか)しくない',       ruby: '오카시쿠나이',    meaning: '이상하지 않아' },
        { text: '可笑(おか)しい？',         ruby: '오카시이?',       meaning: '이상해?' },
        { text: '可笑(おか)しくない？',     ruby: '오카시쿠나이?',   meaning: '이상하지 않아?' },
        { text: '可笑(おか)しかった',       ruby: '오카시캇타',      meaning: '이상했어' },
        { text: '可笑(おか)しくなかった',   ruby: '오카시쿠나캇타',  meaning: '이상하지 않았어' },
        { text: '可笑(おか)しかった？',     ruby: '오카시캇타?',     meaning: '이상했어?' },
        { text: '可笑(おか)しくなかった？', ruby: '오카시쿠나캇타?', meaning: '이상하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 기계의 움직임이 이상해.',
        japanese: 'この機械(きかい)の動(うご)きが可笑(おか)しい。',
        plain:    'この機械の動きが可笑しい。',
        reading:  '코노 키카이노 우고키가 오카시이.',
        pattern:  { name: '〜の動きが可笑しい', meaning: '~의 움직임이 이상하다', note: '可笑しい는 이상한·비정상적인 상태. 기계·사람의 이상을 알아챌 때 사용' },
        furigana: 'このきかいのうごきがおかしい',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0] }],
      },
      {
        korean:   '그의 얘기는 항상 우스워서 웃어버려.',
        japanese: '彼(かれ)の話(はなし)はいつも可笑(おか)しくて笑(わら)ってしまう。',
        plain:    '彼の話はいつも可笑しくて笑ってしまう。',
        reading:  '카레노 하나시와 이츠모 오카시쿠테 와랏테 시마우.',
        pattern:  { name: '〜はいつも可笑しくて笑ってしまう', meaning: '~은 항상 우스워서 웃어버린다', note: 'くて는 원인·이유 표현. てしまう는 자기도 모르게 ~해버리다' },
        furigana: 'かれのはなしはいつもおかしくてわらってしまう',
        accentData: [{ phrase_id: 0, mora_count: 22, accent: [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1] }],
      },
      {
        korean:   '어딘가 이상하다고 느끼면 바로 말해주세요.',
        japanese: 'どこか可笑(おか)しいと感(かん)じたらすぐ言(い)ってください。',
        plain:    'どこか可笑しいと感じたらすぐ言ってください。',
        reading:  '도코카 오카시이토 칸지타라 스구 잇테쿠다사이.',
        pattern:  { name: 'どこか可笑しいと感じたらすぐ言ってください', meaning: '어딘가 이상하다고 느끼면 바로 말해주세요', note: 'たら는 조건 표현. すぐ는 즉시·바로. 이상 감지 시 즉각 신고 요청 표현' },
        furigana: 'どこかおかしいとかんじたらすぐいってください',
        accentData: [{ phrase_id: 0, mora_count: 22, accent: [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ── 41~100위: 스텁 ─────────────────────────────── */
  /* ══════════════════════════════════════════════════
   * 41위  寒い
   * ══════════════════════════════════════════════════ */
  {
    id: 'samui', rank: 41, verb: '寒い', reading: '사무이', meaning: '춥다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '寒(さむ)いです', ruby: '사무이데스', meaning: '춥습니다' },
        { text: '寒(さむ)くないです', ruby: '사무쿠나이데스', meaning: '춥지 않습니다' },
        { text: '寒(さむ)いですか？', ruby: '사무이데스까?', meaning: '춥습니까?' },
        { text: '寒(さむ)くないですか？', ruby: '사무쿠나이데스까?', meaning: '춥지 않습니까?' },
        { text: '寒(さむ)かったです', ruby: '사무캇타데스', meaning: '추웠습니다' },
        { text: '寒(さむ)くなかったです', ruby: '사무쿠나캇타데스', meaning: '춥지 않았습니다' },
        { text: '寒(さむ)かったですか？', ruby: '사무캇타데스까?', meaning: '추웠습니까?' },
        { text: '寒(さむ)くなかったですか？', ruby: '사무쿠나캇타데스까?', meaning: '춥지 않았습니까?' },
      ],
      plain: [
        { text: '寒(さむ)い', ruby: '사무이', meaning: '추워' },
        { text: '寒(さむ)くない', ruby: '사무쿠나이', meaning: '춥지 않아' },
        { text: '寒(さむ)い？', ruby: '사무이?', meaning: '추워?' },
        { text: '寒(さむ)くない？', ruby: '사무쿠나이?', meaning: '춥지 않아?' },
        { text: '寒(さむ)かった', ruby: '사무캇타', meaning: '추웠어' },
        { text: '寒(さむ)くなかった', ruby: '사무쿠나캇타', meaning: '춥지 않았어' },
        { text: '寒(さむ)かった？', ruby: '사무캇타?', meaning: '추웠어?' },
        { text: '寒(さむ)くなかった？', ruby: '사무쿠나캇타?', meaning: '춥지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '오늘은 너무 추워.',
        japanese: '今日(きょう)はとても寒(さむ)い。',
        plain:    '今日はとても寒い。',
        reading:  '쿄-와 토테모 사무이.',
        pattern:  { name: 'とても〜い', meaning: '매우 ~하다', note: 'とても는 정도를 강조하는 부사' },
        furigana: 'きょうはとてもさむい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '추운 겨울에는 전골 요리가 맛있어.',
        japanese: '寒(さむ)い冬(ふゆ)には鍋料理(なべりょうり)が美味(おい)しい。',
        plain:    '寒い冬には鍋料理が美味しい。',
        reading:  '사무이 후유니와 나베료-리가 오이시이.',
        pattern:  { name: 'い형용사＋명사', meaning: '~한 (명사)', note: 'い형용사는 그대로 명사를 수식. 鍋料理는 전골 요리' },
        furigana: 'さむいふゆにはなべりょうりがおいしい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '밖이 추우니까 코트를 입으세요.',
        japanese: '外(そと)が寒(さむ)いのでコートを着(き)てください。',
        plain:    '外が寒いのでコートを着てください。',
        reading:  '소토가 사무이노데 코-토오 키테쿠다사이.',
        pattern:  { name: '〜ので', meaning: '~이므로', note: 'ので는 원인·이유를 나타내는 접속조사' },
        furigana: 'そとがさむいのでこーとをきてください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [0, 0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 42위  痛い
   * ══════════════════════════════════════════════════ */
  {
    id: 'itai', rank: 42, verb: '痛い', reading: '이타이', meaning: '아프다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '痛(いた)いです', ruby: '이타이데스', meaning: '아픕니다' },
        { text: '痛(いた)くないです', ruby: '이타쿠나이데스', meaning: '아프지 않습니다' },
        { text: '痛(いた)いですか？', ruby: '이타이데스까?', meaning: '아픕니까?' },
        { text: '痛(いた)くないですか？', ruby: '이타쿠나이데스까?', meaning: '아프지 않습니까?' },
        { text: '痛(いた)かったです', ruby: '이타캇타데스', meaning: '아팠습니다' },
        { text: '痛(いた)くなかったです', ruby: '이타쿠나캇타데스', meaning: '아프지 않았습니다' },
        { text: '痛(いた)かったですか？', ruby: '이타캇타데스까?', meaning: '아팠습니까?' },
        { text: '痛(いた)くなかったですか？', ruby: '이타쿠나캇타데스까?', meaning: '아프지 않았습니까?' },
      ],
      plain: [
        { text: '痛(いた)い', ruby: '이타이', meaning: '아파' },
        { text: '痛(いた)くない', ruby: '이타쿠나이', meaning: '아프지 않아' },
        { text: '痛(いた)い？', ruby: '이타이?', meaning: '아파?' },
        { text: '痛(いた)くない？', ruby: '이타쿠나이?', meaning: '아프지 않아?' },
        { text: '痛(いた)かった', ruby: '이타캇타', meaning: '아팠어' },
        { text: '痛(いた)くなかった', ruby: '이타쿠나캇타', meaning: '아프지 않았어' },
        { text: '痛(いた)かった？', ruby: '이타캇타?', meaning: '아팠어?' },
        { text: '痛(いた)くなかった？', ruby: '이타쿠나캇타?', meaning: '아프지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '머리가 아파요.',
        japanese: '頭(あたま)が痛(いた)いです。',
        plain:    '頭が痛いです。',
        reading:  '아타마가 이타이데스.',
        pattern:  { name: '〜が痛い', meaning: '~이 아프다', note: '신체 부위+が痛い로 통증을 표현' },
        furigana: 'あたまがいたいです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '넘어져서 무릎이 아파.',
        japanese: '転(ころ)んで膝(ひざ)が痛(いた)い。',
        plain:    '転んで膝が痛い。',
        reading:  '코론데 히자가 이타이.',
        pattern:  { name: '〜て＋결과', meaning: '~해서 (결과)', note: 'て형으로 원인과 결과를 연결. 転ぶ는 넘어지다' },
        furigana: 'ころんでひざがいたい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '이가 아파서 잠을 못 잤어.',
        japanese: '歯(は)が痛(いた)くて眠(ねむ)れなかった。',
        plain:    '歯が痛くて眠れなかった。',
        reading:  '하가 이타쿠테 네무레나캇타.',
        pattern:  { name: '〜くて', meaning: '~해서', note: 'い형용사의 て형은 くて. 眠れない는 잠들 수 없다' },
        furigana: 'はがいたくてねむれなかった',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 43위  赤い
   * ══════════════════════════════════════════════════ */
  {
    id: 'akai', rank: 43, verb: '赤い', reading: '아카이', meaning: '빨갛다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '赤(あか)いです', ruby: '아카이데스', meaning: '빨갛습니다' },
        { text: '赤(あか)くないです', ruby: '아카쿠나이데스', meaning: '빨갛지 않습니다' },
        { text: '赤(あか)いですか？', ruby: '아카이데스까?', meaning: '빨갛습니까?' },
        { text: '赤(あか)くないですか？', ruby: '아카쿠나이데스까?', meaning: '빨갛지 않습니까?' },
        { text: '赤(あか)かったです', ruby: '아카캇타데스', meaning: '빨갰습니다' },
        { text: '赤(あか)くなかったです', ruby: '아카쿠나캇타데스', meaning: '빨갛지 않았습니다' },
        { text: '赤(あか)かったですか？', ruby: '아카캇타데스까?', meaning: '빨갰습니까?' },
        { text: '赤(あか)くなかったですか？', ruby: '아카쿠나캇타데스까?', meaning: '빨갛지 않았습니까?' },
      ],
      plain: [
        { text: '赤(あか)い', ruby: '아카이', meaning: '빨개' },
        { text: '赤(あか)くない', ruby: '아카쿠나이', meaning: '빨갛지 않아' },
        { text: '赤(あか)い？', ruby: '아카이?', meaning: '빨개?' },
        { text: '赤(あか)くない？', ruby: '아카쿠나이?', meaning: '빨갛지 않아?' },
        { text: '赤(あか)かった', ruby: '아카캇타', meaning: '빨갰어' },
        { text: '赤(あか)くなかった', ruby: '아카쿠나캇타', meaning: '빨갛지 않았어' },
        { text: '赤(あか)かった？', ruby: '아카캇타?', meaning: '빨갰어?' },
        { text: '赤(あか)くなかった？', ruby: '아카쿠나캇타?', meaning: '빨갛지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '저 빨간 차는 그의 것이야.',
        japanese: 'あの赤(あか)い車(くるま)は彼(かれ)のです。',
        plain:    'あの赤い車は彼のです。',
        reading:  '아노 아카이 쿠루마와 카레노데스.',
        pattern:  { name: 'い형용사＋명사', meaning: '~한 (명사)', note: '赤い가 車를 직접 수식. 彼の는 그의 것' },
        furigana: 'あのあかいくるまはかれのです',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '부끄러워서 얼굴이 빨개졌다.',
        japanese: '恥(は)ずかしくて顔(かお)が赤(あか)くなった。',
        plain:    '恥ずかしくて顔が赤くなった。',
        reading:  '하즈카시쿠테 카오가 아카쿠낫타.',
        pattern:  { name: '〜くなる', meaning: '~해지다', note: 'い형용사의 く형+なる로 상태 변화를 표현' },
        furigana: 'はずかしくてかおがあかくなった',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 0, 0, 1, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '노을로 하늘이 빨개.',
        japanese: '夕焼(ゆうや)けで空(そら)が赤(あか)い。',
        plain:    '夕焼けで空が赤い。',
        reading:  '유-야케데 소라가 아카이.',
        pattern:  { name: '〜で〜が赤い', meaning: '~으로 ~이 빨갛다', note: 'で는 원인. 夕焼け는 노을' },
        furigana: 'ゆうやけでそらがあかい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 44위  短い
   * ══════════════════════════════════════════════════ */
  {
    id: 'mijikai', rank: 44, verb: '短い', reading: '미지카이', meaning: '짧다',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '短(みじか)いです', ruby: '미지카이데스', meaning: '짧습니다' },
        { text: '短(みじか)くないです', ruby: '미지카쿠나이데스', meaning: '짧지 않습니다' },
        { text: '短(みじか)いですか？', ruby: '미지카이데스까?', meaning: '짧습니까?' },
        { text: '短(みじか)くないですか？', ruby: '미지카쿠나이데스까?', meaning: '짧지 않습니까?' },
        { text: '短(みじか)かったです', ruby: '미지카캇타데스', meaning: '짧았습니다' },
        { text: '短(みじか)くなかったです', ruby: '미지카쿠나캇타데스', meaning: '짧지 않았습니다' },
        { text: '短(みじか)かったですか？', ruby: '미지카캇타데스까?', meaning: '짧았습니까?' },
        { text: '短(みじか)くなかったですか？', ruby: '미지카쿠나캇타데스까?', meaning: '짧지 않았습니까?' },
      ],
      plain: [
        { text: '短(みじか)い', ruby: '미지카이', meaning: '짧아' },
        { text: '短(みじか)くない', ruby: '미지카쿠나이', meaning: '짧지 않아' },
        { text: '短(みじか)い？', ruby: '미지카이?', meaning: '짧아?' },
        { text: '短(みじか)くない？', ruby: '미지카쿠나이?', meaning: '짧지 않아?' },
        { text: '短(みじか)かった', ruby: '미지카캇타', meaning: '짧았어' },
        { text: '短(みじか)くなかった', ruby: '미지카쿠나캇타', meaning: '짧지 않았어' },
        { text: '短(みじか)かった？', ruby: '미지카캇타?', meaning: '짧았어?' },
        { text: '短(みじか)くなかった？', ruby: '미지카쿠나캇타?', meaning: '짧지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 영화는 시간이 짧아.',
        japanese: 'この映画(えいが)は時間(じかん)が短(みじか)い。',
        plain:    'この映画は時間が短い。',
        reading:  '코노 에-가와 지캉가 미지카이.',
        pattern:  { name: '〜は〜が短い', meaning: '~은 ~이 짧다', note: 'は~が 구문으로 대상의 속성을 설명' },
        furigana: 'このえいがはじかんがみじかい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 0, 1] },
        ],
      },
      {
        korean:   '짧은 말로 전하는 것이 중요합니다.',
        japanese: '短(みじか)い言葉(ことば)で伝(つた)えることが大切(たいせつ)です。',
        plain:    '短い言葉で伝えることが大切です。',
        reading:  '미지카이 코토바데 츠타에루코토가 타이세츠데스.',
        pattern:  { name: '〜で伝える', meaning: '~으로 전하다', note: 'で는 수단. 伝える는 전하다' },
        furigana: 'みじかいことばでつたえることがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '여름은 밤이 짧아.',
        japanese: '夏(なつ)は夜(よる)が短(みじか)い。',
        plain:    '夏は夜が短い。',
        reading:  '나츠와 요루가 미지카이.',
        pattern:  { name: '〜は〜が短い', meaning: '~은 ~이 짧다', note: '계절의 특징을 설명하는 표현' },
        furigana: 'なつはよるがみじかい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 45위  遅い
   * ══════════════════════════════════════════════════ */
  {
    id: 'osoi', rank: 45, verb: '遅い', reading: '오소이', meaning: '늦다; 느리다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '遅(おそ)いです', ruby: '오소이데스', meaning: '늦습니다' },
        { text: '遅(おそ)くないです', ruby: '오소쿠나이데스', meaning: '늦지 않습니다' },
        { text: '遅(おそ)いですか？', ruby: '오소이데스까?', meaning: '늦습니까?' },
        { text: '遅(おそ)くないですか？', ruby: '오소쿠나이데스까?', meaning: '늦지 않습니까?' },
        { text: '遅(おそ)かったです', ruby: '오소캇타데스', meaning: '늦었습니다' },
        { text: '遅(おそ)くなかったです', ruby: '오소쿠나캇타데스', meaning: '늦지 않았습니다' },
        { text: '遅(おそ)かったですか？', ruby: '오소캇타데스까?', meaning: '늦었습니까?' },
        { text: '遅(おそ)くなかったですか？', ruby: '오소쿠나캇타데스까?', meaning: '늦지 않았습니까?' },
      ],
      plain: [
        { text: '遅(おそ)い', ruby: '오소이', meaning: '늦어' },
        { text: '遅(おそ)くない', ruby: '오소쿠나이', meaning: '늦지 않아' },
        { text: '遅(おそ)い？', ruby: '오소이?', meaning: '늦어?' },
        { text: '遅(おそ)くない？', ruby: '오소쿠나이?', meaning: '늦지 않아?' },
        { text: '遅(おそ)かった', ruby: '오소캇타', meaning: '늦었어' },
        { text: '遅(おそ)くなかった', ruby: '오소쿠나캇타', meaning: '늦지 않았어' },
        { text: '遅(おそ)かった？', ruby: '오소캇타?', meaning: '늦었어?' },
        { text: '遅(おそ)くなかった？', ruby: '오소쿠나캇타?', meaning: '늦지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 항상 일이 느려.',
        japanese: '彼(かれ)はいつも仕事(しごと)が遅(おそ)い。',
        plain:    '彼はいつも仕事が遅い。',
        reading:  '카레와 이츠모 시고토가 오소이.',
        pattern:  { name: '〜が遅い', meaning: '~이 느리다', note: '遅い는 시간이 늦다와 속도가 느리다 두 의미로 쓰임' },
        furigana: 'かれはいつもしごとがおそい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
      {
        korean:   '전철이 느리니까 먼저 가세요.',
        japanese: '電車(でんしゃ)が遅(おそ)いから先(さき)に行(い)ってください。',
        plain:    '電車が遅いから先に行ってください。',
        reading:  '덴샤가 오소이카라 사키니 잇테쿠다사이.',
        pattern:  { name: '〜から', meaning: '~이니까', note: 'から는 이유를 나타냄. 先に는 먼저' },
        furigana: 'でんしゃがおそいからさきにいってください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '알아차리는 게 늦었어.',
        japanese: '気(き)づくのが遅(おそ)かった。',
        plain:    '気づくのが遅かった。',
        reading:  '키즈쿠노가 오소캇타.',
        pattern:  { name: '〜のが遅い', meaning: '~하는 것이 늦다', note: '동사 기본형+の로 명사화. 気づく는 알아차리다' },
        furigana: 'きづくのがおそかった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 46위  固い
   * ══════════════════════════════════════════════════ */
  {
    id: 'katai', rank: 46, verb: '固い', reading: '카타이', meaning: '단단하다; 딱딱하다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '固(かた)いです', ruby: '카타이데스', meaning: '단단합니다' },
        { text: '固(かた)くないです', ruby: '카타쿠나이데스', meaning: '단단하지 않습니다' },
        { text: '固(かた)いですか？', ruby: '카타이데스까?', meaning: '단단합니까?' },
        { text: '固(かた)くないですか？', ruby: '카타쿠나이데스까?', meaning: '단단하지 않습니까?' },
        { text: '固(かた)かったです', ruby: '카타캇타데스', meaning: '단단했습니다' },
        { text: '固(かた)くなかったです', ruby: '카타쿠나캇타데스', meaning: '단단하지 않았습니다' },
        { text: '固(かた)かったですか？', ruby: '카타캇타데스까?', meaning: '단단했습니까?' },
        { text: '固(かた)くなかったですか？', ruby: '카타쿠나캇타데스까?', meaning: '단단하지 않았습니까?' },
      ],
      plain: [
        { text: '固(かた)い', ruby: '카타이', meaning: '단단해' },
        { text: '固(かた)くない', ruby: '카타쿠나이', meaning: '단단하지 않아' },
        { text: '固(かた)い？', ruby: '카타이?', meaning: '단단해?' },
        { text: '固(かた)くない？', ruby: '카타쿠나이?', meaning: '단단하지 않아?' },
        { text: '固(かた)かった', ruby: '카타캇타', meaning: '단단했어' },
        { text: '固(かた)くなかった', ruby: '카타쿠나캇타', meaning: '단단하지 않았어' },
        { text: '固(かた)かった？', ruby: '카타캇타?', meaning: '단단했어?' },
        { text: '固(かた)くなかった？', ruby: '카타쿠나캇타?', meaning: '단단하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 빵은 너무 딱딱해.',
        japanese: 'このパンはとても固(かた)い。',
        plain:    'このパンはとても固い。',
        reading:  '코노 팡와 토테모 카타이.',
        pattern:  { name: 'とても〜い', meaning: '매우 ~하다', note: '固い는 물건이 딱딱하다는 뜻' },
        furigana: 'このぱんはとてもかたい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '굳은 악수를 나눴다.',
        japanese: '固(かた)い握手(あくしゅ)を交(か)わした。',
        plain:    '固い握手を交わした。',
        reading:  '카타이 아쿠슈오 카와시타.',
        pattern:  { name: '固い握手', meaning: '굳은 악수', note: '交わす는 주고받다. 固い는 비유적으로도 사용됨' },
        furigana: 'かたいあくしゅをかわした',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '굳은 의지로 끝까지 해냈다.',
        japanese: '固(かた)い意志(いし)で最後(さいご)までやり遂(と)げた。',
        plain:    '固い意志で最後までやり遂げた。',
        reading:  '카타이 이시데 사이고마데 야리토게타.',
        pattern:  { name: '固い意志', meaning: '굳은 의지', note: 'やり遂げる는 끝까지 해내다. まで는 ~까지' },
        furigana: 'かたいいしでさいごまでやりとげた',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 47위  弱い
   * ══════════════════════════════════════════════════ */
  {
    id: 'yowai', rank: 47, verb: '弱い', reading: '요와이', meaning: '약하다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '弱(よわ)いです', ruby: '요와이데스', meaning: '약합니다' },
        { text: '弱(よわ)くないです', ruby: '요와쿠나이데스', meaning: '약하지 않습니다' },
        { text: '弱(よわ)いですか？', ruby: '요와이데스까?', meaning: '약합니까?' },
        { text: '弱(よわ)くないですか？', ruby: '요와쿠나이데스까?', meaning: '약하지 않습니까?' },
        { text: '弱(よわ)かったです', ruby: '요와캇타데스', meaning: '약했습니다' },
        { text: '弱(よわ)くなかったです', ruby: '요와쿠나캇타데스', meaning: '약하지 않았습니다' },
        { text: '弱(よわ)かったですか？', ruby: '요와캇타데스까?', meaning: '약했습니까?' },
        { text: '弱(よわ)くなかったですか？', ruby: '요와쿠나캇타데스까?', meaning: '약하지 않았습니까?' },
      ],
      plain: [
        { text: '弱(よわ)い', ruby: '요와이', meaning: '약해' },
        { text: '弱(よわ)くない', ruby: '요와쿠나이', meaning: '약하지 않아' },
        { text: '弱(よわ)い？', ruby: '요와이?', meaning: '약해?' },
        { text: '弱(よわ)くない？', ruby: '요와쿠나이?', meaning: '약하지 않아?' },
        { text: '弱(よわ)かった', ruby: '요와캇타', meaning: '약했어' },
        { text: '弱(よわ)くなかった', ruby: '요와쿠나캇타', meaning: '약하지 않았어' },
        { text: '弱(よわ)かった？', ruby: '요와캇타?', meaning: '약했어?' },
        { text: '弱(よわ)くなかった？', ruby: '요와쿠나캇타?', meaning: '약하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 몸이 약해.',
        japanese: '彼(かれ)は体(からだ)が弱(よわ)い。',
        plain:    '彼は体が弱い。',
        reading:  '카레와 카라다가 요와이.',
        pattern:  { name: '体が弱い', meaning: '몸이 약하다', note: '体が弱い는 허약 체질을 나타내는 표현' },
        furigana: 'かれはからだがよわい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '약한 입장의 사람을 지키고 싶다.',
        japanese: '弱(よわ)い立場(たちば)の人(ひと)を守(まも)りたい。',
        plain:    '弱い立場の人を守りたい。',
        reading:  '요와이 타치바노 히토오 마모리타이.',
        pattern:  { name: '〜を守りたい', meaning: '~을 지키고 싶다', note: '立場는 입장. たい는 희망 표현' },
        furigana: 'よわいたちばのひとをまもりたい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 5, accent: [1, 0, 0, 1, 1] },
        ],
      },
      {
        korean:   '바람에 약한 건물입니다.',
        japanese: '風(かぜ)に弱(よわ)い建物(たてもの)です。',
        plain:    '風に弱い建物です。',
        reading:  '카제니 요와이 타테모노데스.',
        pattern:  { name: '〜に弱い', meaning: '~에 약하다', note: 'に弱い는 ~에 약하다·취약하다는 표현' },
        furigana: 'かぜによわいたてものです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 48위  薄い
   * ══════════════════════════════════════════════════ */
  {
    id: 'usui', rank: 48, verb: '薄い', reading: '우스이', meaning: '얇다; 옅다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '薄(うす)いです', ruby: '우스이데스', meaning: '얇습니다' },
        { text: '薄(うす)くないです', ruby: '우스쿠나이데스', meaning: '얇지 않습니다' },
        { text: '薄(うす)いですか？', ruby: '우스이데스까?', meaning: '얇습니까?' },
        { text: '薄(うす)くないですか？', ruby: '우스쿠나이데스까?', meaning: '얇지 않습니까?' },
        { text: '薄(うす)かったです', ruby: '우스캇타데스', meaning: '얇았습니다' },
        { text: '薄(うす)くなかったです', ruby: '우스쿠나캇타데스', meaning: '얇지 않았습니다' },
        { text: '薄(うす)かったですか？', ruby: '우스캇타데스까?', meaning: '얇았습니까?' },
        { text: '薄(うす)くなかったですか？', ruby: '우스쿠나캇타데스까?', meaning: '얇지 않았습니까?' },
      ],
      plain: [
        { text: '薄(うす)い', ruby: '우스이', meaning: '얇아' },
        { text: '薄(うす)くない', ruby: '우스쿠나이', meaning: '얇지 않아' },
        { text: '薄(うす)い？', ruby: '우스이?', meaning: '얇아?' },
        { text: '薄(うす)くない？', ruby: '우스쿠나이?', meaning: '얇지 않아?' },
        { text: '薄(うす)かった', ruby: '우스캇타', meaning: '얇았어' },
        { text: '薄(うす)くなかった', ruby: '우스쿠나캇타', meaning: '얇지 않았어' },
        { text: '薄(うす)かった？', ruby: '우스캇타?', meaning: '얇았어?' },
        { text: '薄(うす)くなかった？', ruby: '우스쿠나캇타?', meaning: '얇지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 종이는 아주 얇아.',
        japanese: 'この紙(かみ)はとても薄(うす)い。',
        plain:    'この紙はとても薄い。',
        reading:  '코노 카미와 토테모 우스이.',
        pattern:  { name: 'とても〜い', meaning: '매우 ~하다', note: '薄い는 두께가 얇다는 뜻' },
        furigana: 'このかみはとてもうすい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '벽이 얇아서 소리가 들려.',
        japanese: '壁(かべ)が薄(うす)くて音(おと)が聞(き)こえる。',
        plain:    '壁が薄くて音が聞こえる。',
        reading:  '카베가 우스쿠테 오토가 키코에루.',
        pattern:  { name: '〜くて', meaning: '~해서', note: 'くて는 い형용사의 이유 연결. 聞こえる는 들리다' },
        furigana: 'かべがうすくておとがきこえる',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '얇은 코트로는 추워.',
        japanese: '薄(うす)いコートでは寒(さむ)い。',
        plain:    '薄いコートでは寒い。',
        reading:  '우스이 코-토데와 사무이.',
        pattern:  { name: '〜では', meaning: '~으로는', note: 'では는 수단·조건으로는 부족함을 나타냄' },
        furigana: 'うすいこーとではさむい',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 49위  暗い
   * ══════════════════════════════════════════════════ */
  {
    id: 'kurai', rank: 49, verb: '暗い', reading: '쿠라이', meaning: '어둡다',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '暗(くら)いです', ruby: '쿠라이데스', meaning: '어둡습니다' },
        { text: '暗(くら)くないです', ruby: '쿠라쿠나이데스', meaning: '어둡지 않습니다' },
        { text: '暗(くら)いですか？', ruby: '쿠라이데스까?', meaning: '어둡습니까?' },
        { text: '暗(くら)くないですか？', ruby: '쿠라쿠나이데스까?', meaning: '어둡지 않습니까?' },
        { text: '暗(くら)かったです', ruby: '쿠라캇타데스', meaning: '어두웠습니다' },
        { text: '暗(くら)くなかったです', ruby: '쿠라쿠나캇타데스', meaning: '어둡지 않았습니다' },
        { text: '暗(くら)かったですか？', ruby: '쿠라캇타데스까?', meaning: '어두웠습니까?' },
        { text: '暗(くら)くなかったですか？', ruby: '쿠라쿠나캇타데스까?', meaning: '어둡지 않았습니까?' },
      ],
      plain: [
        { text: '暗(くら)い', ruby: '쿠라이', meaning: '어두워' },
        { text: '暗(くら)くない', ruby: '쿠라쿠나이', meaning: '어둡지 않아' },
        { text: '暗(くら)い？', ruby: '쿠라이?', meaning: '어두워?' },
        { text: '暗(くら)くない？', ruby: '쿠라쿠나이?', meaning: '어둡지 않아?' },
        { text: '暗(くら)かった', ruby: '쿠라캇타', meaning: '어두웠어' },
        { text: '暗(くら)くなかった', ruby: '쿠라쿠나캇타', meaning: '어둡지 않았어' },
        { text: '暗(くら)かった？', ruby: '쿠라캇타?', meaning: '어두웠어?' },
        { text: '暗(くら)くなかった？', ruby: '쿠라쿠나캇타?', meaning: '어둡지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '방이 어두우니까 불을 켜 주세요.',
        japanese: '部屋(へや)が暗(くら)いので電気(でんき)をつけてください。',
        plain:    '部屋が暗いので電気をつけてください。',
        reading:  '헤야가 쿠라이노데 뎅키오 츠케테쿠다사이.',
        pattern:  { name: '〜ので', meaning: '~이므로', note: '電気をつける는 불을 켜다는 관용 표현' },
        furigana: 'へやがくらいのででんきをつけてください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '어두운 밤길은 위험해요.',
        japanese: '暗(くら)い夜道(よみち)は危険(きけん)です。',
        plain:    '暗い夜道は危険です。',
        reading:  '쿠라이 요미치와 키켄데스.',
        pattern:  { name: 'い형용사＋명사', meaning: '~한 (명사)', note: '夜道는 밤길. 危険은 위험' },
        furigana: 'くらいよみちはきけんです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '그는 요즘 기분이 우울해.',
        japanese: '彼(かれ)は最近(さいきん)気分(きぶん)が暗(くら)い。',
        plain:    '彼は最近気分が暗い。',
        reading:  '카레와 사이킨 키붕가 쿠라이.',
        pattern:  { name: '気分が暗い', meaning: '기분이 어둡다/우울하다', note: '暗い는 성격이나 분위기가 어둡다는 비유로도 쓰임' },
        furigana: 'かれはさいきんきぶんがくらい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [1, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 50위  黒い
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuroi', rank: 50, verb: '黒い', reading: '쿠로이', meaning: '검다',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '黒(くろ)いです', ruby: '쿠로이데스', meaning: '검습니다' },
        { text: '黒(くろ)くないです', ruby: '쿠로쿠나이데스', meaning: '검지 않습니다' },
        { text: '黒(くろ)いですか？', ruby: '쿠로이데스까?', meaning: '검습니까?' },
        { text: '黒(くろ)くないですか？', ruby: '쿠로쿠나이데스까?', meaning: '검지 않습니까?' },
        { text: '黒(くろ)かったです', ruby: '쿠로캇타데스', meaning: '검었습니다' },
        { text: '黒(くろ)くなかったです', ruby: '쿠로쿠나캇타데스', meaning: '검지 않았습니다' },
        { text: '黒(くろ)かったですか？', ruby: '쿠로캇타데스까?', meaning: '검었습니까?' },
        { text: '黒(くろ)くなかったですか？', ruby: '쿠로쿠나캇타데스까?', meaning: '검지 않았습니까?' },
      ],
      plain: [
        { text: '黒(くろ)い', ruby: '쿠로이', meaning: '검어' },
        { text: '黒(くろ)くない', ruby: '쿠로쿠나이', meaning: '검지 않아' },
        { text: '黒(くろ)い？', ruby: '쿠로이?', meaning: '검어?' },
        { text: '黒(くろ)くない？', ruby: '쿠로쿠나이?', meaning: '검지 않아?' },
        { text: '黒(くろ)かった', ruby: '쿠로캇타', meaning: '검었어' },
        { text: '黒(くろ)くなかった', ruby: '쿠로쿠나캇타', meaning: '검지 않았어' },
        { text: '黒(くろ)かった？', ruby: '쿠로캇타?', meaning: '검었어?' },
        { text: '黒(くろ)くなかった？', ruby: '쿠로쿠나캇타?', meaning: '검지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '검은 고양이가 길을 가로질렀다.',
        japanese: '黒(くろ)い猫(ねこ)が道(みち)を横切(よこぎ)った。',
        plain:    '黒い猫が道を横切った。',
        reading:  '쿠로이 네코가 미치오 요코깃타.',
        pattern:  { name: 'い형용사＋명사', meaning: '~한 (명사)', note: '横切る는 가로지르다' },
        furigana: 'くろいねこがみちをよこぎった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '그는 검은 정장을 입고 있어요.',
        japanese: '彼(かれ)は黒(くろ)いスーツを着(き)ています。',
        plain:    '彼は黒いスーツを着ています。',
        reading:  '카레와 쿠로이 스-츠오 키테이마스.',
        pattern:  { name: '〜を着ている', meaning: '~을 입고 있다', note: '着ている는 입고 있는 상태를 나타냄' },
        furigana: 'かれはくろいすーつをきています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [1, 0, 0, 0, 1, 1] },
        ],
      },
      {
        korean:   '밤하늘이 검게 물들어 있다.',
        japanese: '夜空(よぞら)が黒(くろ)く染(そ)まっている。',
        plain:    '夜空が黒く染まっている。',
        reading:  '요조라가 쿠로쿠 소맛테이루.',
        pattern:  { name: '〜く染まる', meaning: '~하게 물들다', note: 'く형+染まる로 색의 변화를 표현. 夜空는 밤하늘' },
        furigana: 'よぞらがくろくそまっている',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  { id: 'tooi',        rank: 51,  verb: '遠い',        reading: '토오이',    meaning: '멀다',                   conjugations: null, examples: [] },
  { id: 'amai',        rank: 52,  verb: '甘い',        reading: '아마이',    meaning: '달다; 달콤하다',         conjugations: null, examples: [] },
  { id: 'atatakai',    rank: 53,  verb: '温かい',      reading: '아타타카이',meaning: '따뜻하다',               conjugations: null, examples: [] },
  { id: 'semai',       rank: 54,  verb: '狭い',        reading: '세마이',    meaning: '좁다',                   conjugations: null, examples: [] },
  { id: 'mezurashii',  rank: 55,  verb: '珍しい',      reading: '메즈라시이',meaning: '드물다; 신기하다',       conjugations: null, examples: [] },
  { id: 'sabishii',    rank: 56,  verb: '寂しい',      reading: '사비시이',  meaning: '쓸쓸하다; 외롭다',       conjugations: null, examples: [] },
  { id: 'isogashii',   rank: 57,  verb: '忙しい',      reading: '이소가시이',meaning: '바쁘다',                 conjugations: null, examples: [] },
  { id: 'tsumetai',    rank: 58,  verb: '冷たい',      reading: '츠메타이',  meaning: '차갑다',                 conjugations: null, examples: [] },
  { id: 'atsui_natsu', rank: 59,  verb: '暑い',        reading: '아츠이',    meaning: '덥다',                   conjugations: null, examples: [] },
  { id: 'hisashii',    rank: 60,  verb: '久しい',      reading: '히사시이',  meaning: '오랜만이다',             conjugations: null, examples: [] },
  { id: 'komakai',     rank: 61,  verb: '細かい',      reading: '코마카이',  meaning: '세세하다; 작다',         conjugations: null, examples: [] },
  { id: 'atsui_nabe',  rank: 62,  verb: '熱い',        reading: '아츠이',    meaning: '뜨겁다',                 conjugations: null, examples: [] },
  { id: 'kanashii',    rank: 63,  verb: '悲しい',      reading: '카나시이',  meaning: '슬프다',                 conjugations: null, examples: [] },
  { id: 'hosoi',       rank: 64,  verb: '細い',        reading: '호소이',    meaning: '가늘다',                 conjugations: null, examples: [] },
  { id: 'osoroshii',   rank: 65,  verb: '恐ろしい',    reading: '오소로시이',meaning: '무섭다; 끔찍하다',       conjugations: null, examples: [] },
  { id: 'koi',         rank: 66,  verb: '濃い',        reading: '코이',      meaning: '진하다; 짙다',           conjugations: null, examples: [] },
  { id: 'yoroshii',    rank: 67,  verb: '宜しい',      reading: '요로시이',  meaning: '좋다; 괜찮다 (정중)',    conjugations: null, examples: [] },
  { id: 'aoi',         rank: 68,  verb: '青い',        reading: '아오이',    meaning: '파랗다; 미숙하다',       conjugations: null, examples: [] },
  { id: 'hazukashii',  rank: 69,  verb: '恥ずかしい',  reading: '하즈카시이',meaning: '부끄럽다; 창피하다',     conjugations: null, examples: [] },
  { id: 'ichijirushii',rank: 70,  verb: '著しい',      reading: '이치지루시이',meaning: '현저하다; 두드러지다', conjugations: null, examples: [] },
  { id: 'atsui_hon',   rank: 71,  verb: '厚い',        reading: '아츠이',    meaning: '두껍다',                 conjugations: null, examples: [] },
  { id: 'kurushii',    rank: 72,  verb: '苦しい',      reading: '쿠루시이',  meaning: '괴롭다; 힘들다',         conjugations: null, examples: [] },
  { id: 'shikataganai',rank: 73,  verb: '仕方無い',    reading: '시카타나이',meaning: '어쩔 수 없다',           conjugations: null, examples: [] },
  { id: 'futoi',       rank: 74,  verb: '太い',        reading: '후토이',    meaning: '굵다; 두껍다',           conjugations: null, examples: [] },
  { id: 'fusawashii',  rank: 75,  verb: '相応しい',    reading: '후사와시이',meaning: '어울리다; 적합하다',     conjugations: null, examples: [] },
  { id: 'erai',        rank: 76,  verb: '偉い',        reading: '에라이',    meaning: '대단하다; 훌륭하다',     conjugations: null, examples: [] },
  { id: 'surudoi',     rank: 77,  verb: '鋭い',        reading: '스루도이',  meaning: '날카롭다; 예리하다',     conjugations: null, examples: [] },
  { id: 'arigatai',    rank: 78,  verb: '有り難い',    reading: '아리가타이',meaning: '감사하다; 고맙다',       conjugations: null, examples: [] },
  { id: 'monosugoi',   rank: 79,  verb: '物凄い',      reading: '모노스고이',meaning: '굉장하다; 엄청나다',     conjugations: null, examples: [] },
  { id: 'natsukashii', rank: 80,  verb: '懐かしい',    reading: '나츠카시이',meaning: '그립다; 향수를 느끼다',  conjugations: null, examples: [] },
  { id: 'osanai',      rank: 81,  verb: '幼い',        reading: '오사나이',  meaning: '어리다',                 conjugations: null, examples: [] },
  { id: 'kitsui',      rank: 82,  verb: 'きつい',      reading: '키츠이',    meaning: '힘들다; 꽉 끼다',        conjugations: null, examples: [] },
  { id: 'shitashii',   rank: 83,  verb: '親しい',      reading: '시타시이',  meaning: '친하다; 친밀하다',       conjugations: null, examples: [] },
  { id: 'marui',       rank: 84,  verb: '丸い',        reading: '마루이',    meaning: '둥글다',                 conjugations: null, examples: [] },
  { id: 'yawarakai',   rank: 85,  verb: '柔らかい',    reading: '야와라카이',meaning: '부드럽다',               conjugations: null, examples: [] },
  { id: 'nozomashii',  rank: 86,  verb: '望ましい',    reading: '노조마시이',meaning: '바람직하다',             conjugations: null, examples: [] },
  { id: 'medetai',     rank: 87,  verb: 'めでたい',    reading: '메데타이',  meaning: '경사스럽다; 축하할만하다', conjugations: null, examples: [] },
  { id: 'subayai',     rank: 88,  verb: '素早い',      reading: '스바야이',  meaning: '재빠르다; 날렵하다',     conjugations: null, examples: [] },
  { id: 'nemui',       rank: 89,  verb: '眠い',        reading: '네무이',    meaning: '졸리다',                 conjugations: null, examples: [] },
  { id: 'ayashii',     rank: 90,  verb: '怪しい',      reading: '아야시이',  meaning: '수상하다; 의심스럽다',   conjugations: null, examples: [] },
  { id: 'mazui',       rank: 91,  verb: '不味い',      reading: '마즈이',    meaning: '맛없다; 좋지 않다',      conjugations: null, examples: [] },
  { id: 'urusai',      rank: 92,  verb: '煩い',        reading: '우루사이',  meaning: '시끄럽다; 귀찮다',       conjugations: null, examples: [] },
  { id: 'abunai',      rank: 93,  verb: '危ない',      reading: '아부나이',  meaning: '위험하다',               conjugations: null, examples: [] },
  { id: 'habahiroi',   rank: 94,  verb: '幅広い',      reading: '하바히로이',meaning: '폭넓다; 다양하다',       conjugations: null, examples: [] },
  { id: 'kuyashii',    rank: 95,  verb: '悔しい',      reading: '쿠야시이',  meaning: '억울하다; 분하다',       conjugations: null, examples: [] },
  { id: 'mazushii',    rank: 96,  verb: '貧しい',      reading: '마즈시이',  meaning: '가난하다',               conjugations: null, examples: [] },
  { id: 'hitoshii',    rank: 97,  verb: '等しい',      reading: '히토시이',  meaning: '같다; 동등하다',         conjugations: null, examples: [] },
  { id: 'yawarakai2',  rank: 98,  verb: '軟らかい',    reading: '야와라카이',meaning: '부드럽다 (식감)',        conjugations: null, examples: [] },
  { id: 'otonashii',   rank: 99,  verb: '大人しい',    reading: '오토나시이',meaning: '얌전하다; 온순하다',     conjugations: null, examples: [] },
  { id: 'asai',        rank: 100, verb: '浅い',        reading: '아사이',    meaning: '얕다',                   conjugations: null, examples: [] },
]
