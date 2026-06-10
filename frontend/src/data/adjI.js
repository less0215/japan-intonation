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
  { id: 'ureshii',     rank: 21,  verb: '嬉しい',      reading: '우레시이',  meaning: '기쁘다',                 conjugations: null, examples: [] },
  { id: 'hiroi',       rank: 22,  verb: '広い',        reading: '히로이',    meaning: '넓다',                   conjugations: null, examples: [] },
  { id: 'utsukushii',  rank: 23,  verb: '美しい',      reading: '우츠쿠시이',meaning: '아름답다',               conjugations: null, examples: [] },
  { id: 'kuwashii',    rank: 24,  verb: '詳しい',      reading: '쿠와시이',  meaning: '자세하다; 정통하다',     conjugations: null, examples: [] },
  { id: 'shiroi',      rank: 25,  verb: '白い',        reading: '시로이',    meaning: '하얗다',                 conjugations: null, examples: [] },
  { id: 'kibishii',    rank: 26,  verb: '厳しい',      reading: '키비시이',  meaning: '엄격하다; 혹독하다',     conjugations: null, examples: [] },
  { id: 'kawaii',      rank: 27,  verb: '可愛い',      reading: '카와이이',  meaning: '귀엽다',                 conjugations: null, examples: [] },
  { id: 'yasashii',    rank: 28,  verb: '優しい',      reading: '야사시이',  meaning: '친절하다; 상냥하다',     conjugations: null, examples: [] },
  { id: 'tadashii',    rank: 29,  verb: '正しい',      reading: '타다시이',  meaning: '올바르다',               conjugations: null, examples: [] },
  { id: 'hidoi',       rank: 30,  verb: '酷い',        reading: '히도이',    meaning: '심하다; 너무하다',       conjugations: null, examples: [] },
  { id: 'yasui',       rank: 31,  verb: '安い',        reading: '야스이',    meaning: '싸다; 저렴하다',         conjugations: null, examples: [] },
  { id: 'karui',       rank: 32,  verb: '軽い',        reading: '카루이',    meaning: '가볍다',                 conjugations: null, examples: [] },
  { id: 'furui',       rank: 33,  verb: '古い',        reading: '후루이',    meaning: '낡다; 오래되다',         conjugations: null, examples: [] },
  { id: 'kowai',       rank: 34,  verb: '怖い',        reading: '코와이',    meaning: '무섭다',                 conjugations: null, examples: [] },
  { id: 'hageshii',    rank: 35,  verb: '激しい',      reading: '하게시이',  meaning: '격렬하다; 심하다',       conjugations: null, examples: [] },
  { id: 'omoi',        rank: 36,  verb: '重い',        reading: '오모이',    meaning: '무겁다',                 conjugations: null, examples: [] },
  { id: 'akarui',      rank: 37,  verb: '明るい',      reading: '아카루이',  meaning: '밝다',                   conjugations: null, examples: [] },
  { id: 'tsurai',      rank: 38,  verb: '辛い',        reading: '츠라이',    meaning: '괴롭다; 힘들다',         conjugations: null, examples: [] },
  { id: 'subarashii',  rank: 39,  verb: '素晴らしい',  reading: '스바라시이',meaning: '훌륭하다; 멋지다',       conjugations: null, examples: [] },
  { id: 'okashii',     rank: 40,  verb: '可笑しい',    reading: '오카시이',  meaning: '이상하다; 웃기다',       conjugations: null, examples: [] },
  { id: 'samui',       rank: 41,  verb: '寒い',        reading: '사무이',    meaning: '춥다',                   conjugations: null, examples: [] },
  { id: 'itai',        rank: 42,  verb: '痛い',        reading: '이타이',    meaning: '아프다',                 conjugations: null, examples: [] },
  { id: 'akai',        rank: 43,  verb: '赤い',        reading: '아카이',    meaning: '빨갛다',                 conjugations: null, examples: [] },
  { id: 'mijikai',     rank: 44,  verb: '短い',        reading: '미지카이',  meaning: '짧다',                   conjugations: null, examples: [] },
  { id: 'osoi',        rank: 45,  verb: '遅い',        reading: '오소이',    meaning: '느리다; 늦다',           conjugations: null, examples: [] },
  { id: 'katai',       rank: 46,  verb: '固い',        reading: '카타이',    meaning: '딱딱하다; 굳다',         conjugations: null, examples: [] },
  { id: 'yowai',       rank: 47,  verb: '弱い',        reading: '요와이',    meaning: '약하다',                 conjugations: null, examples: [] },
  { id: 'usui',        rank: 48,  verb: '薄い',        reading: '우스이',    meaning: '얇다; 옅다',             conjugations: null, examples: [] },
  { id: 'kurai',       rank: 49,  verb: '暗い',        reading: '쿠라이',    meaning: '어둡다',                 conjugations: null, examples: [] },
  { id: 'kuroi',       rank: 50,  verb: '黒い',        reading: '쿠로이',    meaning: '검다',                   conjugations: null, examples: [] },
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
