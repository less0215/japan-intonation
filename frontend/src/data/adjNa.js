/* な형용사 학습 데이터 (BCCWJ 빈도 순)
 * conjugations.formal / plain : 각 8개
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

export const ADJ_NA = [

  /* ══════════════════════════════════════════════════
   * 1위  可能
   * ══════════════════════════════════════════════════ */
  {
    id: 'kanou', rank: 1, verb: '可能', reading: '카노ー', meaning: '가능한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '可能(かのう)です',               ruby: '카노ー데스',           meaning: '가능합니다' },
        { text: '可能(かのう)じゃないです',        ruby: '카노ー자나이데스',     meaning: '가능하지 않습니다' },
        { text: '可能(かのう)ですか？',            ruby: '카노ー데스까?',        meaning: '가능합니까?' },
        { text: '可能(かのう)じゃないですか？',    ruby: '카노ー자나이데스까?',  meaning: '가능하지 않습니까?' },
        { text: '可能(かのう)でした',              ruby: '카노ー데시타',         meaning: '가능했습니다' },
        { text: '可能(かのう)じゃなかったです',    ruby: '카노ー자나캇타데스',   meaning: '가능하지 않았습니다' },
        { text: '可能(かのう)でしたか？',          ruby: '카노ー데시타까?',      meaning: '가능했습니까?' },
        { text: '可能(かのう)じゃなかったですか？',ruby: '카노ー자나캇타데스까?',meaning: '가능하지 않았습니까?' },
      ],
      plain: [
        { text: '可能(かのう)だ',           ruby: '카노ー다',        meaning: '가능해' },
        { text: '可能(かのう)じゃない',     ruby: '카노ー자나이',    meaning: '가능하지 않아' },
        { text: '可能(かのう)？',           ruby: '카노ー?',         meaning: '가능해?' },
        { text: '可能(かのう)じゃない？',   ruby: '카노ー자나이?',   meaning: '가능하지 않아?' },
        { text: '可能(かのう)だった',       ruby: '카노ー닷타',      meaning: '가능했어' },
        { text: '可能(かのう)じゃなかった', ruby: '카노ー자나캇타',  meaning: '가능하지 않았어' },
        { text: '可能(かのう)だった？',     ruby: '카노ー닷타?',     meaning: '가능했어?' },
        { text: '可能(かのう)じゃなかった？',ruby: '카노ー자나캇타?', meaning: '가능하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '지금 바로 출발하는 게 가능합니까?',
        japanese: '今(いま)すぐ出発(しゅっぱつ)することは可能(かのう)ですか？',
        plain:    '今すぐ出発することは可能ですか？',
        reading:  '이마 스구 슛파츠스루 코토와 카노ー데스까?',
        pattern:  { name: '〜ことは可能ですか？', meaning: '~하는 것이 가능합니까?', note: '정중한 가능 여부 확인 표현' },
        furigana: 'いますぐしゅっぱつすることはかのうですか',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이것도 가능하면 오늘 안으로 해 줘.',
        japanese: '可能(かのう)であれば今日中(きょうじゅう)に終(お)わらせて。',
        plain:    '可能であれば今日中に終わらせて。',
        reading:  '카노ー데아레바 쿄ー주ー니 오와라세테.',
        pattern:  { name: '可能であれば', meaning: '가능하다면', note: '조건을 나타내는 관용 표현. 정중한 요청에 자주 사용' },
        furigana: 'かのうであればきょうじゅうにおわらせて',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '당시에는 그게 가능하지 않았어.',
        japanese: '当時(とうじ)はそれは可能(かのう)じゃなかった。',
        plain:    '当時はそれは可能じゃなかった。',
        reading:  '토ー지와 소레와 카노ー자나캇타.',
        pattern:  { name: '〜じゃなかった', meaning: '~하지 않았다 (과거 부정)', note: 'な형용사 과거 부정. ではなかった의 구어형' },
        furigana: 'とうじはそれはかのうじゃなかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 2위  好き
   * ══════════════════════════════════════════════════ */
  {
    id: 'suki', rank: 2, verb: '好き', reading: '스키', meaning: '좋아하는; 좋아함',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '好(す)きです',               ruby: '스키데스',           meaning: '좋아합니다' },
        { text: '好(す)きじゃないです',        ruby: '스키자나이데스',     meaning: '좋아하지 않습니다' },
        { text: '好(す)きですか？',            ruby: '스키데스까?',        meaning: '좋아합니까?' },
        { text: '好(す)きじゃないですか？',    ruby: '스키자나이데스까?',  meaning: '좋아하지 않습니까?' },
        { text: '好(す)きでした',              ruby: '스키데시타',         meaning: '좋아했습니다' },
        { text: '好(す)きじゃなかったです',    ruby: '스키자나캇타데스',   meaning: '좋아하지 않았습니다' },
        { text: '好(す)きでしたか？',          ruby: '스키데시타까?',      meaning: '좋아했습니까?' },
        { text: '好(す)きじゃなかったですか？',ruby: '스키자나캇타데스까?',meaning: '좋아하지 않았습니까?' },
      ],
      plain: [
        { text: '好(す)きだ',           ruby: '스키다',        meaning: '좋아해' },
        { text: '好(す)きじゃない',     ruby: '스키자나이',    meaning: '좋아하지 않아' },
        { text: '好(す)き？',           ruby: '스키?',         meaning: '좋아해?' },
        { text: '好(す)きじゃない？',   ruby: '스키자나이?',   meaning: '좋아하지 않아?' },
        { text: '好(す)きだった',       ruby: '스키닷타',      meaning: '좋아했어' },
        { text: '好(す)きじゃなかった', ruby: '스키자나캇타',  meaning: '좋아하지 않았어' },
        { text: '好(す)きだった？',     ruby: '스키닷타?',     meaning: '좋아했어?' },
        { text: '好(す)きじゃなかった？',ruby: '스키자나캇타?', meaning: '좋아하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '나는 일본 음악을 정말 좋아해.',
        japanese: '私(わたし)は日本(にほん)の音楽(おんがく)がとても好(す)きだ。',
        plain:    '私は日本の音楽がとても好きだ。',
        reading:  '와타시와 니혼노 온가쿠가 토테모 스키다.',
        pattern:  { name: '〜が好きだ', meaning: '~을/를 좋아하다', note: '好き는 な형용사. 좋아하는 대상에 が를 사용' },
        furigana: 'わたしはにほんのおんがくがとてもすきだ',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '어떤 음식을 좋아해요?',
        japanese: 'どんな食(た)べ物(もの)が好(す)きですか？',
        plain:    'どんな食べ物が好きですか？',
        reading:  '돈나 타베모노가 스키데스까?',
        pattern:  { name: 'どんな〜が好きですか？', meaning: '어떤 ~을 좋아합니까?', note: '취향을 묻는 기본 표현' },
        furigana: 'どんなたべものがすきですか',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '예전에는 채소를 좋아하지 않았어.',
        japanese: '昔(むかし)は野菜(やさい)が好(す)きじゃなかった。',
        plain:    '昔は野菜が好きじゃなかった。',
        reading:  '무카시와 야사이가 스키자나캇타.',
        pattern:  { name: '〜が好きじゃなかった', meaning: '~을 좋아하지 않았다', note: '과거 기호·감정의 부정 표현' },
        furigana: 'むかしはやさいがすきじゃなかった',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 3위  重要
   * ══════════════════════════════════════════════════ */
  {
    id: 'juuyou', rank: 3, verb: '重要', reading: '쥬ー요ー', meaning: '중요한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '重要(じゅうよう)です',               ruby: '쥬ー요ー데스',           meaning: '중요합니다' },
        { text: '重要(じゅうよう)じゃないです',        ruby: '쥬ー요ー자나이데스',     meaning: '중요하지 않습니다' },
        { text: '重要(じゅうよう)ですか？',            ruby: '쥬ー요ー데스까?',        meaning: '중요합니까?' },
        { text: '重要(じゅうよう)じゃないですか？',    ruby: '쥬ー요ー자나이데스까?',  meaning: '중요하지 않습니까?' },
        { text: '重要(じゅうよう)でした',              ruby: '쥬ー요ー데시타',         meaning: '중요했습니다' },
        { text: '重要(じゅうよう)じゃなかったです',    ruby: '쥬ー요ー자나캇타데스',   meaning: '중요하지 않았습니다' },
        { text: '重要(じゅうよう)でしたか？',          ruby: '쥬ー요ー데시타까?',      meaning: '중요했습니까?' },
        { text: '重要(じゅうよう)じゃなかったですか？',ruby: '쥬ー요ー자나캇타데스까?',meaning: '중요하지 않았습니까?' },
      ],
      plain: [
        { text: '重要(じゅうよう)だ',           ruby: '쥬ー요ー다',        meaning: '중요해' },
        { text: '重要(じゅうよう)じゃない',     ruby: '쥬ー요ー자나이',    meaning: '중요하지 않아' },
        { text: '重要(じゅうよう)？',           ruby: '쥬ー요ー?',         meaning: '중요해?' },
        { text: '重要(じゅうよう)じゃない？',   ruby: '쥬ー요ー자나이?',   meaning: '중요하지 않아?' },
        { text: '重要(じゅうよう)だった',       ruby: '쥬ー요ー닷타',      meaning: '중요했어' },
        { text: '重要(じゅうよう)じゃなかった', ruby: '쥬ー요ー자나캇타',  meaning: '중요하지 않았어' },
        { text: '重要(じゅうよう)だった？',     ruby: '쥬ー요ー닷타?',     meaning: '중요했어?' },
        { text: '重要(じゅうよう)じゃなかった？',ruby: '쥬ー요ー자나캇타?', meaning: '중요하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 회의는 매우 중요합니다.',
        japanese: 'この会議(かいぎ)はとても重要(じゅうよう)です。',
        plain:    'この会議はとても重要です。',
        reading:  '코노 카이기와 토테모 쥬ー요ー데스.',
        pattern:  { name: '〜はとても重要です', meaning: '~은/는 매우 중요합니다', note: '강조 부사 とても와 함께 정중하게 표현' },
        furigana: 'このかいぎはとてもじゅうようです',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          { phrase_id: 1, mora_count: 8, accent: [1, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '건강이 제일 중요해.',
        japanese: '健康(けんこう)が一番(いちばん)重要(じゅうよう)だ。',
        plain:    '健康が一番重要だ。',
        reading:  '켕코ー가 이치방 쥬ー요ー다.',
        pattern:  { name: '一番〜だ', meaning: '제일 ~하다', note: '가장 높은 정도를 나타내는 표현' },
        furigana: 'けんこうがいちばんじゅうようだ',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그 당시에는 그게 그렇게 중요하지 않았어.',
        japanese: '当時(とうじ)はそれはそれほど重要(じゅうよう)じゃなかった。',
        plain:    '当時はそれはそれほど重要じゃなかった。',
        reading:  '토ー지와 소레와 소레호도 쥬ー요ー자나캇타.',
        pattern:  { name: 'それほど〜じゃなかった', meaning: '그다지 ~하지 않았다', note: 'それほど로 정도를 낮추고 과거 부정으로 표현' },
        furigana: 'とうじはそれはそれほどじゅうようじゃなかった',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 4위  非常
   * ══════════════════════════════════════════════════ */
  {
    id: 'hijou', rank: 4, verb: '非常', reading: '히죠ー', meaning: '매우; 대단히 (な형용사·부사)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '非常(ひじょう)です',               ruby: '히죠ー데스',           meaning: '매우 그렇습니다' },
        { text: '非常(ひじょう)じゃないです',        ruby: '히죠ー자나이데스',     meaning: '그다지 아닙니다' },
        { text: '非常(ひじょう)ですか？',            ruby: '히죠ー데스까?',        meaning: '매우 그렇습니까?' },
        { text: '非常(ひじょう)じゃないですか？',    ruby: '히죠ー자나이데스까?',  meaning: '그다지 아닙니까?' },
        { text: '非常(ひじょう)でした',              ruby: '히죠ー데시타',         meaning: '매우 그랬습니다' },
        { text: '非常(ひじょう)じゃなかったです',    ruby: '히죠ー자나캇타데스',   meaning: '그다지 아니었습니다' },
        { text: '非常(ひじょう)でしたか？',          ruby: '히죠ー데시타까?',      meaning: '매우 그랬습니까?' },
        { text: '非常(ひじょう)じゃなかったですか？',ruby: '히죠ー자나캇타데스까?',meaning: '그다지 아니었습니까?' },
      ],
      plain: [
        { text: '非常(ひじょう)だ',           ruby: '히죠ー다',        meaning: '매우 그래' },
        { text: '非常(ひじょう)じゃない',     ruby: '히죠ー자나이',    meaning: '그다지 아니야' },
        { text: '非常(ひじょう)？',           ruby: '히죠ー?',         meaning: '매우 그래?' },
        { text: '非常(ひじょう)じゃない？',   ruby: '히죠ー자나이?',   meaning: '그다지 아니야?' },
        { text: '非常(ひじょう)だった',       ruby: '히죠ー닷타',      meaning: '매우 그랬어' },
        { text: '非常(ひじょう)じゃなかった', ruby: '히죠ー자나캇타',  meaning: '그다지 아니었어' },
        { text: '非常(ひじょう)だった？',     ruby: '히죠ー닷타?',     meaning: '매우 그랬어?' },
        { text: '非常(ひじょう)じゃなかった？',ruby: '히죠ー자나캇타?', meaning: '그다지 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '오늘은 매우 덥습니다.',
        japanese: '今日(きょう)は非常(ひじょう)に暑(あつ)いです。',
        plain:    '今日は非常に暑いです。',
        reading:  '쿄ー와 히죠ー니 아츠이데스.',
        pattern:  { name: '非常に〜', meaning: '매우 ~하다', note: '非常に는 형용사·부사를 강조하는 부사. 격식체에서 자주 사용' },
        furigana: 'きょうはひじょうにあついです',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 0, 1, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '이 문제는 매우 어렵다.',
        japanese: 'この問題(もんだい)は非常(ひじょう)に難(むずか)しい。',
        plain:    'この問題は非常に難しい。',
        reading:  '코노 몬다이와 히죠ー니 무즈카시이.',
        pattern:  { name: '非常に + 형용사', meaning: '매우 ~하다', note: '格式体 표현. とても보다 격식 있는 강조 표현' },
        furigana: 'このもんだいはひじょうにむずかしい',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그 행사는 매우 성공적이었어.',
        japanese: 'そのイベントは非常(ひじょう)にうまくいった。',
        plain:    'そのイベントは非常にうまくいった。',
        reading:  '소노 이벤토와 히죠ー니 우마쿠잇타.',
        pattern:  { name: '非常にうまくいく', meaning: '매우 잘 되다', note: 'うまくいく(잘 되다)를 강조' },
        furigana: 'そのいべんとはひじょうにうまくいった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 5위  様々
   * ══════════════════════════════════════════════════ */
  {
    id: 'samazama', rank: 5, verb: '様々', reading: '사마자마', meaning: '다양한; 여러 가지',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '様々(さまざま)です',               ruby: '사마자마데스',           meaning: '다양합니다' },
        { text: '様々(さまざま)じゃないです',        ruby: '사마자마자나이데스',     meaning: '다양하지 않습니다' },
        { text: '様々(さまざま)ですか？',            ruby: '사마자마데스까?',        meaning: '다양합니까?' },
        { text: '様々(さまざま)じゃないですか？',    ruby: '사마자마자나이데스까?',  meaning: '다양하지 않습니까?' },
        { text: '様々(さまざま)でした',              ruby: '사마자마데시타',         meaning: '다양했습니다' },
        { text: '様々(さまざま)じゃなかったです',    ruby: '사마자마자나캇타데스',   meaning: '다양하지 않았습니다' },
        { text: '様々(さまざま)でしたか？',          ruby: '사마자마데시타까?',      meaning: '다양했습니까?' },
        { text: '様々(さまざま)じゃなかったですか？',ruby: '사마자마자나캇타데스까?',meaning: '다양하지 않았습니까?' },
      ],
      plain: [
        { text: '様々(さまざま)だ',           ruby: '사마자마다',        meaning: '다양해' },
        { text: '様々(さまざま)じゃない',     ruby: '사마자마자나이',    meaning: '다양하지 않아' },
        { text: '様々(さまざま)？',           ruby: '사마자마?',         meaning: '다양해?' },
        { text: '様々(さまざま)じゃない？',   ruby: '사마자마자나이?',   meaning: '다양하지 않아?' },
        { text: '様々(さまざま)だった',       ruby: '사마자마닷타',      meaning: '다양했어' },
        { text: '様々(さまざま)じゃなかった', ruby: '사마자마자나캇타',  meaning: '다양하지 않았어' },
        { text: '様々(さまざま)だった？',     ruby: '사마자마닷타?',     meaning: '다양했어?' },
        { text: '様々(さまざま)じゃなかった？',ruby: '사마자마자나캇타?', meaning: '다양하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '여러 의견이 있었어.',
        japanese: '様々(さまざま)な意見(いけん)があった。',
        plain:    '様々な意見があった。',
        reading:  '사마자마나 이켕가 앗타.',
        pattern:  { name: '様々な + 명사', meaning: '다양한 ~', note: 'な형용사의 연체형 (~な + 명사)' },
        furigana: 'さまざまないけんがあった',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '세계에는 다양한 문화가 있어.',
        japanese: '世界(せかい)には様々(さまざま)な文化(ぶんか)がある。',
        plain:    '世界には様々な文化がある。',
        reading:  '세카이니와 사마자마나 분카가 아루.',
        pattern:  { name: '様々な文化', meaning: '다양한 문화', note: '명사 수식 용법. な를 붙여 명사를 수식' },
        furigana: 'せかいにはさまざまなぶんかがある',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '그 당시에는 다양한 문제가 있었어.',
        japanese: '当時(とうじ)は様々(さまざま)な問題(もんだい)があった。',
        plain:    '当時は様々な問題があった。',
        reading:  '토ー지와 사마자마나 몬다이가 앗타.',
        pattern:  { name: '様々な問題があった', meaning: '다양한 문제가 있었다', note: '과거 상황 묘사에서 様々を活用' },
        furigana: 'とうじはさまざまなもんだいがあった',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 6위  特別
   * ══════════════════════════════════════════════════ */
  {
    id: 'tokubetsu', rank: 6, verb: '特別', reading: '토쿠베츠', meaning: '특별한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '特別(とくべつ)です',               ruby: '토쿠베츠데스',           meaning: '특별합니다' },
        { text: '特別(とくべつ)じゃないです',        ruby: '토쿠베츠자나이데스',     meaning: '특별하지 않습니다' },
        { text: '特別(とくべつ)ですか？',            ruby: '토쿠베츠데스까?',        meaning: '특별합니까?' },
        { text: '特別(とくべつ)じゃないですか？',    ruby: '토쿠베츠자나이데스까?',  meaning: '특별하지 않습니까?' },
        { text: '特別(とくべつ)でした',              ruby: '토쿠베츠데시타',         meaning: '특별했습니다' },
        { text: '特別(とくべつ)じゃなかったです',    ruby: '토쿠베츠자나캇타데스',   meaning: '특별하지 않았습니다' },
        { text: '特別(とくべつ)でしたか？',          ruby: '토쿠베츠데시타까?',      meaning: '특별했습니까?' },
        { text: '特別(とくべつ)じゃなかったですか？',ruby: '토쿠베츠자나캇타데스까?',meaning: '특별하지 않았습니까?' },
      ],
      plain: [
        { text: '特別(とくべつ)だ',           ruby: '토쿠베츠다',        meaning: '특별해' },
        { text: '特別(とくべつ)じゃない',     ruby: '토쿠베츠자나이',    meaning: '특별하지 않아' },
        { text: '特別(とくべつ)？',           ruby: '토쿠베츠?',         meaning: '특별해?' },
        { text: '特別(とくべつ)じゃない？',   ruby: '토쿠베츠자나이?',   meaning: '특별하지 않아?' },
        { text: '特別(とくべつ)だった',       ruby: '토쿠베츠닷타',      meaning: '특별했어' },
        { text: '特別(とくべつ)じゃなかった', ruby: '토쿠베츠자나캇타',  meaning: '특별하지 않았어' },
        { text: '特別(とくべつ)だった？',     ruby: '토쿠베츠닷타?',     meaning: '특별했어?' },
        { text: '特別(とくべつ)じゃなかった？',ruby: '토쿠베츠자나캇타?', meaning: '특별하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '오늘은 특별한 날이에요.',
        japanese: '今日(きょう)は特別(とくべつ)な日(ひ)です。',
        plain:    '今日は特別な日です。',
        reading:  '쿄ー와 토쿠베츠나 히데스.',
        pattern:  { name: '特別な + 명사', meaning: '특별한 ~', note: 'な형용사 연체형. 기념일·특별한 상황에 자주 사용' },
        furigana: 'きょうはとくべつなひです',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 0, 1, 1, 1, 0, 1] },
        ],
      },
      {
        korean:   '특별히 이유는 없어.',
        japanese: '特別(とくべつ)な理由(りゆう)はない。',
        plain:    '特別な理由はない。',
        reading:  '토쿠베츠나 리유ー와 나이.',
        pattern:  { name: '特別な理由はない', meaning: '특별한 이유는 없다', note: '부정 표현과 결합. 이유 없음을 나타냄' },
        furigana: 'とくべつなりゆうはない',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '그 때가 나에게 특별했어.',
        japanese: 'あの時(とき)は私(わたし)にとって特別(とくべつ)だった。',
        plain:    'あの時は私にとって特別だった。',
        reading:  '아노 토키와 와타시니톳테 토쿠베츠닷타.',
        pattern:  { name: '〜にとって特別だった', meaning: '~에게 특별했다', note: 'にとって(~에게 있어서) + 과거 상태 표현' },
        furigana: 'あのときはわたしにとってとくべつだった',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 7위  確か
   * ══════════════════════════════════════════════════ */
  {
    id: 'tashika', rank: 7, verb: '確か', reading: '타시카', meaning: '확실한; 틀림없는',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '確(たし)かです',               ruby: '타시카데스',           meaning: '확실합니다' },
        { text: '確(たし)かじゃないです',        ruby: '타시카자나이데스',     meaning: '확실하지 않습니다' },
        { text: '確(たし)かですか？',            ruby: '타시카데스까?',        meaning: '확실합니까?' },
        { text: '確(たし)かじゃないですか？',    ruby: '타시카자나이데스까?',  meaning: '확실하지 않습니까?' },
        { text: '確(たし)かでした',              ruby: '타시카데시타',         meaning: '확실했습니다' },
        { text: '確(たし)かじゃなかったです',    ruby: '타시카자나캇타데스',   meaning: '확실하지 않았습니다' },
        { text: '確(たし)かでしたか？',          ruby: '타시카데시타까?',      meaning: '확실했습니까?' },
        { text: '確(たし)かじゃなかったですか？',ruby: '타시카자나캇타데스까?',meaning: '확실하지 않았습니까?' },
      ],
      plain: [
        { text: '確(たし)かだ',           ruby: '타시카다',        meaning: '확실해' },
        { text: '確(たし)かじゃない',     ruby: '타시카자나이',    meaning: '확실하지 않아' },
        { text: '確(たし)か？',           ruby: '타시카?',         meaning: '확실해?' },
        { text: '確(たし)かじゃない？',   ruby: '타시카자나이?',   meaning: '확실하지 않아?' },
        { text: '確(たし)かだった',       ruby: '타시카닷타',      meaning: '확실했어' },
        { text: '確(たし)かじゃなかった', ruby: '타시카자나캇타',  meaning: '확실하지 않았어' },
        { text: '確(たし)かだった？',     ruby: '타시카닷타?',     meaning: '확실했어?' },
        { text: '確(たし)かじゃなかった？',ruby: '타시카자나캇타?', meaning: '확실하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '그거 확실해?',
        japanese: 'それは確(たし)かですか？',
        plain:    'それは確かですか？',
        reading:  '소레와 타시카데스까?',
        pattern:  { name: '〜は確かですか？', meaning: '~은/는 확실합니까?', note: '사실 확인을 위한 기본 표현' },
        furigana: 'それはたしかですか',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '확실히 그렇게 말했어.',
        japanese: '確(たし)かにそう言(い)った。',
        plain:    '確かにそう言った。',
        reading:  '타시카니 소ー잇타.',
        pattern:  { name: '確かに', meaning: '확실히; 분명히', note: 'な형용사의 부사형 (〜に). 사실임을 강조할 때 사용' },
        furigana: 'たしかにそういった',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [1, 0, 0, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '그때는 확실하지 않았어.',
        japanese: 'あの時(とき)は確(たし)かじゃなかった。',
        plain:    'あの時は確かじゃなかった。',
        reading:  '아노 토키와 타시카자나캇타.',
        pattern:  { name: '〜じゃなかった', meaning: '~하지 않았다', note: '과거 불확실성을 표현' },
        furigana: 'あのときはたしかじゃなかった',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 8위  簡単
   * ══════════════════════════════════════════════════ */
  {
    id: 'kantan', rank: 8, verb: '簡単', reading: '칸탄', meaning: '간단한; 쉬운',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '簡単(かんたん)です',               ruby: '칸탄데스',           meaning: '간단합니다' },
        { text: '簡単(かんたん)じゃないです',        ruby: '칸탄자나이데스',     meaning: '간단하지 않습니다' },
        { text: '簡単(かんたん)ですか？',            ruby: '칸탄데스까?',        meaning: '간단합니까?' },
        { text: '簡単(かんたん)じゃないですか？',    ruby: '칸탄자나이데스까?',  meaning: '간단하지 않습니까?' },
        { text: '簡単(かんたん)でした',              ruby: '칸탄데시타',         meaning: '간단했습니다' },
        { text: '簡単(かんたん)じゃなかったです',    ruby: '칸탄자나캇타데스',   meaning: '간단하지 않았습니다' },
        { text: '簡単(かんたん)でしたか？',          ruby: '칸탄데시타까?',      meaning: '간단했습니까?' },
        { text: '簡単(かんたん)じゃなかったですか？',ruby: '칸탄자나캇타데스까?',meaning: '간단하지 않았습니까?' },
      ],
      plain: [
        { text: '簡単(かんたん)だ',           ruby: '칸탄다',        meaning: '간단해' },
        { text: '簡単(かんたん)じゃない',     ruby: '칸탄자나이',    meaning: '간단하지 않아' },
        { text: '簡単(かんたん)？',           ruby: '칸탄?',         meaning: '간단해?' },
        { text: '簡単(かんたん)じゃない？',   ruby: '칸탄자나이?',   meaning: '간단하지 않아?' },
        { text: '簡単(かんたん)だった',       ruby: '칸탄닷타',      meaning: '간단했어' },
        { text: '簡単(かんたん)じゃなかった', ruby: '칸탄자나캇타',  meaning: '간단하지 않았어' },
        { text: '簡単(かんたん)だった？',     ruby: '칸탄닷타?',     meaning: '간단했어?' },
        { text: '簡単(かんたん)じゃなかった？',ruby: '칸탄자나캇타?', meaning: '간단하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 요리는 만들기 정말 간단해.',
        japanese: 'この料理(りょうり)はとても簡単(かんたん)に作(つく)れる。',
        plain:    'この料理はとても簡単に作れる。',
        reading:  '코노 료ー리와 토테모 칸탄니 츠쿠레루.',
        pattern:  { name: '簡単に + 동사', meaning: '간단히 ~하다', note: '부사형(〜に)으로 동사 수식' },
        furigana: 'このりょうりはとてもかんたんにつくれる',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그 문제는 그다지 간단하지 않아.',
        japanese: 'その問題(もんだい)はそれほど簡単(かんたん)じゃない。',
        plain:    'その問題はそれほど簡単じゃない。',
        reading:  '소노 몬다이와 소레호도 칸탄자나이.',
        pattern:  { name: 'それほど〜じゃない', meaning: '그다지 ~하지 않다', note: '정도를 낮추는 부정 표현' },
        furigana: 'そのもんだいはそれほどかんたんじゃない',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '처음에는 간단했는데 점점 어려워졌어.',
        japanese: '最初(さいしょ)は簡単(かんたん)だったのに、だんだん難(むずか)しくなった。',
        plain:    '最初は簡単だったのに、だんだん難しくなった。',
        reading:  '사이쇼와 칸탄닷타노니, 당당 무즈카시쿠낫타.',
        pattern:  { name: '〜だったのに', meaning: '~했는데 (예상 외의 결과)', note: '과거 상태 + のに. 기대와 다른 결과에 대한 아쉬움' },
        furigana: 'さいしょはかんたんだったのにだんだんむずかしくなった',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 9위  大切
   * ══════════════════════════════════════════════════ */
  {
    id: 'taisetsu', rank: 9, verb: '大切', reading: '타이세츠', meaning: '소중한; 중요한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '大切(たいせつ)です',               ruby: '타이세츠데스',           meaning: '소중합니다' },
        { text: '大切(たいせつ)じゃないです',        ruby: '타이세츠자나이데스',     meaning: '소중하지 않습니다' },
        { text: '大切(たいせつ)ですか？',            ruby: '타이세츠데스까?',        meaning: '소중합니까?' },
        { text: '大切(たいせつ)じゃないですか？',    ruby: '타이세츠자나이데스까?',  meaning: '소중하지 않습니까?' },
        { text: '大切(たいせつ)でした',              ruby: '타이세츠데시타',         meaning: '소중했습니다' },
        { text: '大切(たいせつ)じゃなかったです',    ruby: '타이세츠자나캇타데스',   meaning: '소중하지 않았습니다' },
        { text: '大切(たいせつ)でしたか？',          ruby: '타이세츠데시타까?',      meaning: '소중했습니까?' },
        { text: '大切(たいせつ)じゃなかったですか？',ruby: '타이세츠자나캇타데스까?',meaning: '소중하지 않았습니까?' },
      ],
      plain: [
        { text: '大切(たいせつ)だ',           ruby: '타이세츠다',        meaning: '소중해' },
        { text: '大切(たいせつ)じゃない',     ruby: '타이세츠자나이',    meaning: '소중하지 않아' },
        { text: '大切(たいせつ)？',           ruby: '타이세츠?',         meaning: '소중해?' },
        { text: '大切(たいせつ)じゃない？',   ruby: '타이세츠자나이?',   meaning: '소중하지 않아?' },
        { text: '大切(たいせつ)だった',       ruby: '타이세츠닷타',      meaning: '소중했어' },
        { text: '大切(たいせつ)じゃなかった', ruby: '타이세츠자나캇타',  meaning: '소중하지 않았어' },
        { text: '大切(たいせつ)だった？',     ruby: '타이세츠닷타?',     meaning: '소중했어?' },
        { text: '大切(たいせつ)じゃなかった？',ruby: '타이세츠자나캇타?', meaning: '소중하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '가족은 나에게 가장 소중한 존재야.',
        japanese: '家族(かぞく)は私(わたし)にとって一番(いちばん)大切(たいせつ)な存在(そんざい)だ。',
        plain:    '家族は私にとって一番大切な存在だ。',
        reading:  '카조쿠와 와타시니톳테 이치방 타이세츠나 손자이다.',
        pattern:  { name: '〜にとって大切な〜', meaning: '~에게 소중한 ~', note: 'にとって로 주체를 나타내고 大切으로 중요도 표현' },
        furigana: 'かぞくはわたしにとっていちばんたいせつなそんざいだ',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '소중하게 다루어 주세요.',
        japanese: '大切(たいせつ)に扱(あつか)ってください。',
        plain:    '大切に扱ってください。',
        reading:  '타이세츠니 아츠캇테쿠다사이.',
        pattern:  { name: '大切に + 동사', meaning: '소중히 ~하다', note: '부사형 大切に + 동작 동사' },
        furigana: 'たいせつにあつかってください',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그 추억은 나에게 소중했어.',
        japanese: 'その思(おも)い出(で)は私(わたし)にとって大切(たいせつ)だった。',
        plain:    'その思い出は私にとって大切だった。',
        reading:  '소노 오모이데와 와타시니톳테 타이세츠닷타.',
        pattern:  { name: '〜にとって大切だった', meaning: '~에게 소중했다', note: '과거의 감정·가치 표현' },
        furigana: 'そのおもいではわたしにとってたいせつだった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 10위  十分
   * ══════════════════════════════════════════════════ */
  {
    id: 'juubun', rank: 10, verb: '十分', reading: '쥬ー붕', meaning: '충분한',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '十分(じゅうぶん)です',               ruby: '쥬ー붕데스',           meaning: '충분합니다' },
        { text: '十分(じゅうぶん)じゃないです',        ruby: '쥬ー붕자나이데스',     meaning: '충분하지 않습니다' },
        { text: '十分(じゅうぶん)ですか？',            ruby: '쥬ー붕데스까?',        meaning: '충분합니까?' },
        { text: '十分(じゅうぶん)じゃないですか？',    ruby: '쥬ー붕자나이데스까?',  meaning: '충분하지 않습니까?' },
        { text: '十分(じゅうぶん)でした',              ruby: '쥬ー붕데시타',         meaning: '충분했습니다' },
        { text: '十分(じゅうぶん)じゃなかったです',    ruby: '쥬ー붕자나캇타데스',   meaning: '충분하지 않았습니다' },
        { text: '十分(じゅうぶん)でしたか？',          ruby: '쥬ー붕데시타까?',      meaning: '충분했습니까?' },
        { text: '十分(じゅうぶん)じゃなかったですか？',ruby: '쥬ー붕자나캇타데스까?',meaning: '충분하지 않았습니까?' },
      ],
      plain: [
        { text: '十分(じゅうぶん)だ',           ruby: '쥬ー붕다',        meaning: '충분해' },
        { text: '十分(じゅうぶん)じゃない',     ruby: '쥬ー붕자나이',    meaning: '충분하지 않아' },
        { text: '十分(じゅうぶん)？',           ruby: '쥬ー붕?',         meaning: '충분해?' },
        { text: '十分(じゅうぶん)じゃない？',   ruby: '쥬ー붕자나이?',   meaning: '충분하지 않아?' },
        { text: '十分(じゅうぶん)だった',       ruby: '쥬ー붕닷타',      meaning: '충분했어' },
        { text: '十分(じゅうぶん)じゃなかった', ruby: '쥬ー붕자나캇타',  meaning: '충분하지 않았어' },
        { text: '十分(じゅうぶん)だった？',     ruby: '쥬ー붕닷타?',     meaning: '충분했어?' },
        { text: '十分(じゅうぶん)じゃなかった？',ruby: '쥬ー붕자나캇타?', meaning: '충분하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이 정도면 충분해.',
        japanese: 'これで十分(じゅうぶん)だ。',
        plain:    'これで十分だ。',
        reading:  '코레데 쥬ー붕다.',
        pattern:  { name: 'これで十分だ', meaning: '이것으로 충분하다', note: 'で로 수단·조건을 나타내고 十分으로 충족을 표현' },
        furigana: 'これでじゅうぶんだ',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '충분히 생각하고 나서 결정해.',
        japanese: '十分(じゅうぶん)に考(かんが)えてから決(き)めて。',
        plain:    '十分に考えてから決めて。',
        reading:  '쥬ー붕니 캉가에테카라 키메테.',
        pattern:  { name: '十分に + 동사', meaning: '충분히 ~하다', note: '부사형 十分に + 행동 동사' },
        furigana: 'じゅうぶんにかんがえてからきめて',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '시간이 충분하지 않았어.',
        japanese: '時間(じかん)が十分(じゅうぶん)じゃなかった。',
        plain:    '時間が十分じゃなかった。',
        reading:  '지캉가 쥬ー붕자나캇타.',
        pattern:  { name: '〜が十分じゃなかった', meaning: '~이/가 충분하지 않았다', note: '부족함을 나타내는 과거 부정 표현' },
        furigana: 'じかんがじゅうぶんじゃなかった',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 11~100위: 스텁 ─────────────────────────────── */
  {
    id: 'akiraka', rank: 11, verb: '明らか', reading: '아키라카', meaning: '명백한; 분명한',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '明(あき)らかです', ruby: '아키라카데스', meaning: '분명합니다' },
        { text: '明(あき)らかじゃないです', ruby: '아키라카자나이데스', meaning: '분명하지 않습니다' },
        { text: '明(あき)らかですか？', ruby: '아키라카데스까?', meaning: '분명합니까?' },
        { text: '明(あき)らかじゃないですか？', ruby: '아키라카자나이데스까?', meaning: '분명하지 않습니까?' },
        { text: '明(あき)らかでした', ruby: '아키라카데시타', meaning: '분명했습니다' },
        { text: '明(あき)らかじゃなかったです', ruby: '아키라카자나캇타데스', meaning: '분명하지 않았습니다' },
        { text: '明(あき)らかでしたか？', ruby: '아키라카데시타까?', meaning: '분명했습니까?' },
        { text: '明(あき)らかじゃなかったですか？', ruby: '아키라카자나캇타데스까?', meaning: '분명하지 않았습니까?' },
      ],
      plain: [
        { text: '明(あき)らかだ', ruby: '아키라카다', meaning: '분명해' },
        { text: '明(あき)らかじゃない', ruby: '아키라카자나이', meaning: '분명하지 않아' },
        { text: '明(あき)らか？', ruby: '아키라카?', meaning: '분명해?' },
        { text: '明(あき)らかじゃない？', ruby: '아키라카자나이?', meaning: '분명하지 않아?' },
        { text: '明(あき)らかだった', ruby: '아키라카닷타', meaning: '분명했어' },
        { text: '明(あき)らかじゃなかった', ruby: '아키라카자나캇타', meaning: '분명하지 않았어' },
        { text: '明(あき)らかだった？', ruby: '아키라카닷타?', meaning: '분명했어?' },
        { text: '明(あき)らかじゃなかった？', ruby: '아키라카자나캇타?', meaning: '분명하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '답은 명백해.',
        japanese: '答(こた)えは明(あき)らかだ。',
        plain:    '答えは明らかだ。',
        reading:  '코타에와 아키라카다.',
        pattern:  { name: '〜は明らかだ', meaning: '~은/는 명백하다', note: '분명함을 단정' },
        furigana: 'こたえはあきらかだ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 0, 0, 0, 2, 0, 0, 0] },
        ],
      },
      {
        korean:   '명백한 실수야.',
        japanese: '明(あき)らかな間違(まちが)いだ。',
        plain:    '明らかな間違いだ。',
        reading:  '아키라카나 마치가이다.',
        pattern:  { name: '明らかな〜', meaning: '명백한 ~', note: 'な형용사 + 명사' },
        furigana: 'あきらかなまちがいだ',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 0, 0, 0, 0, 2, 2, 0, 0] },
        ],
      },
      {
        korean:   '결과는 분명해졌어.',
        japanese: '結果(けっか)は明(あき)らかになった。',
        plain:    '結果は明らかになった。',
        reading:  '켁카와 아키라카니 낫타.',
        pattern:  { name: '〜になった', meaning: '~해졌다', note: '상태 변화(な형용사)' },
        furigana: 'けっかはあきらかになった',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 0, 2, 0, 0, 0, 3, 0, 0] },
        ],
      },
    ],
  },
  {
    id: 'iya', rank: 12, verb: '嫌', reading: '이야', meaning: '싫은; 불쾌한',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '嫌(いや)です', ruby: '이야데스', meaning: '싫습니다' },
        { text: '嫌(いや)じゃないです', ruby: '이야자나이데스', meaning: '싫지 않습니다' },
        { text: '嫌(いや)ですか？', ruby: '이야데스까?', meaning: '싫습니까?' },
        { text: '嫌(いや)じゃないですか？', ruby: '이야자나이데스까?', meaning: '싫지 않습니까?' },
        { text: '嫌(いや)でした', ruby: '이야데시타', meaning: '싫었습니다' },
        { text: '嫌(いや)じゃなかったです', ruby: '이야자나캇타데스', meaning: '싫지 않았습니다' },
        { text: '嫌(いや)でしたか？', ruby: '이야데시타까?', meaning: '싫었습니까?' },
        { text: '嫌(いや)じゃなかったですか？', ruby: '이야자나캇타데스까?', meaning: '싫지 않았습니까?' },
      ],
      plain: [
        { text: '嫌(いや)だ', ruby: '이야다', meaning: '싫어' },
        { text: '嫌(いや)じゃない', ruby: '이야자나이', meaning: '싫지 않아' },
        { text: '嫌(いや)？', ruby: '이야?', meaning: '싫어?' },
        { text: '嫌(いや)じゃない？', ruby: '이야자나이?', meaning: '싫지 않아?' },
        { text: '嫌(いや)だった', ruby: '이야닷타', meaning: '싫었어' },
        { text: '嫌(いや)じゃなかった', ruby: '이야자나캇타', meaning: '싫지 않았어' },
        { text: '嫌(いや)だった？', ruby: '이야닷타?', meaning: '싫었어?' },
        { text: '嫌(いや)じゃなかった？', ruby: '이야자나캇타?', meaning: '싫지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '야채가 싫어.',
        japanese: '野菜(やさい)が嫌(いや)だ。',
        plain:    '野菜が嫌だ。',
        reading:  '야사이가 이야다.',
        pattern:  { name: '〜が嫌だ', meaning: '~이/가 싫다', note: '혐오·거부를 나타냄' },
        furigana: 'やさいがいやだ',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 0, 2, 0] },
        ],
      },
      {
        korean:   '불쾌한 기분이 들어.',
        japanese: '嫌(いや)な気分(きぶん)になる。',
        plain:    '嫌な気分になる。',
        reading:  '이야나 키분니 나루.',
        pattern:  { name: '嫌な〜', meaning: '불쾌한 ~', note: 'な형용사 + 명사' },
        furigana: 'いやなきぶんになる',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 0, 2, 0, 0, 0, 3, 0] },
        ],
      },
      {
        korean:   '이제 싫어졌어.',
        japanese: 'もう嫌(いや)になった。',
        plain:    'もう嫌になった。',
        reading:  '모ー 이야니 낫타.',
        pattern:  { name: 'もう〜になった', meaning: '이제 ~해졌다', note: '상태 변화' },
        furigana: 'もういやになった',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [1, 0, 0, 2, 0, 3, 0, 0] },
        ],
      },
    ],
  },
  {
    id: 'onaji', rank: 13, verb: '同じ', reading: '오나지', meaning: '같은; 동일한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '同(おな)じです', ruby: '오나지데스', meaning: '같습니다' },
        { text: '同(おな)じじゃないです', ruby: '오나지자나이데스', meaning: '같지 않습니다' },
        { text: '同(おな)じですか？', ruby: '오나지데스까?', meaning: '같습니까?' },
        { text: '同(おな)じじゃないですか？', ruby: '오나지자나이데스까?', meaning: '같지 않습니까?' },
        { text: '同(おな)じでした', ruby: '오나지데시타', meaning: '같았습니다' },
        { text: '同(おな)じじゃなかったです', ruby: '오나지자나캇타데스', meaning: '같지 않았습니다' },
        { text: '同(おな)じでしたか？', ruby: '오나지데시타까?', meaning: '같았습니까?' },
        { text: '同(おな)じじゃなかったですか？', ruby: '오나지자나캇타데스까?', meaning: '같지 않았습니까?' },
      ],
      plain: [
        { text: '同(おな)じだ', ruby: '오나지다', meaning: '같아' },
        { text: '同(おな)じじゃない', ruby: '오나지자나이', meaning: '같지 않아' },
        { text: '同(おな)じ？', ruby: '오나지?', meaning: '같아?' },
        { text: '同(おな)じじゃない？', ruby: '오나지자나이?', meaning: '같지 않아?' },
        { text: '同(おな)じだった', ruby: '오나지닷타', meaning: '같았어' },
        { text: '同(おな)じじゃなかった', ruby: '오나지자나캇타', meaning: '같지 않았어' },
        { text: '同(おな)じだった？', ruby: '오나지닷타?', meaning: '같았어?' },
        { text: '同(おな)じじゃなかった？', ruby: '오나지자나캇타?', meaning: '같지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '우리는 같은 학교야.',
        japanese: '私(わたし)たちは同(おな)じ学校(がっこう)だ。',
        plain:    '私たちは同じ学校だ。',
        reading:  '와타시타치와 오나지 각코ー다.',
        pattern:  { name: '同じ〜', meaning: '같은 ~', note: '同じ는 な를 붙이지 않음' },
        furigana: 'わたしたちはおなじがっこうだ',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2] },
        ],
      },
      {
        korean:   '답은 같아.',
        japanese: '答(こた)えは同(おな)じだ。',
        plain:    '答えは同じだ。',
        reading:  '코타에와 오나지다.',
        pattern:  { name: '〜は同じだ', meaning: '~은/는 같다', note: '동일함을 나타냄' },
        furigana: 'こたえはおなじだ',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 0, 0, 0, 2, 2, 2] },
        ],
      },
      {
        korean:   '같은 실수를 반복해.',
        japanese: '同(おな)じ間違(まちが)いを繰(く)り返(かえ)す。',
        plain:    '同じ間違いを繰り返す。',
        reading:  '오나지 마치가이오 쿠리카에스.',
        pattern:  { name: '〜を繰り返す', meaning: '~을/를 반복하다', note: '繰り返す 기본 문형' },
        furigana: 'おなじまちがいをくりかえす',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 0] },
        ],
      },
    ],
  },
  {
    id: 'douyou', rank: 14, verb: '同様', reading: '도ー요ー', meaning: '같은; 마찬가지',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '同様(どうよう)です', ruby: '도ー요ー데스', meaning: '같습니다' },
        { text: '同様(どうよう)じゃないです', ruby: '도ー요ー자나이데스', meaning: '같지 않습니다' },
        { text: '同様(どうよう)ですか？', ruby: '도ー요ー데스까?', meaning: '같습니까?' },
        { text: '同様(どうよう)じゃないですか？', ruby: '도ー요ー자나이데스까?', meaning: '같지 않습니까?' },
        { text: '同様(どうよう)でした', ruby: '도ー요ー데시타', meaning: '같았습니다' },
        { text: '同様(どうよう)じゃなかったです', ruby: '도ー요ー자나캇타데스', meaning: '같지 않았습니다' },
        { text: '同様(どうよう)でしたか？', ruby: '도ー요ー데시타까?', meaning: '같았습니까?' },
        { text: '同様(どうよう)じゃなかったですか？', ruby: '도ー요ー자나캇타데스까?', meaning: '같지 않았습니까?' },
      ],
      plain: [
        { text: '同様(どうよう)だ', ruby: '도ー요ー다', meaning: '같아' },
        { text: '同様(どうよう)じゃない', ruby: '도ー요ー자나이', meaning: '같지 않아' },
        { text: '同様(どうよう)？', ruby: '도ー요ー?', meaning: '같아?' },
        { text: '同様(どうよう)じゃない？', ruby: '도ー요ー자나이?', meaning: '같지 않아?' },
        { text: '同様(どうよう)だった', ruby: '도ー요ー닷타', meaning: '같았어' },
        { text: '同様(どうよう)じゃなかった', ruby: '도ー요ー자나캇타', meaning: '같지 않았어' },
        { text: '同様(どうよう)だった？', ruby: '도ー요ー닷타?', meaning: '같았어?' },
        { text: '同様(どうよう)じゃなかった？', ruby: '도ー요ー자나캇타?', meaning: '같지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '올해도 작년과 마찬가지야.',
        japanese: '今年(ことし)も去年(きょねん)と同様(どうよう)だ。',
        plain:    '今年も去年と同様だ。',
        reading:  '코토시모 쿄넨토 도ー요ー다.',
        pattern:  { name: '〜と同様だ', meaning: '~와 마찬가지다', note: '비교 대상 + と' },
        furigana: 'ことしもきょねんとどうようだ',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 2, 2, 0, 0, 0, 0, 3, 3, 3, 3] },
        ],
      },
      {
        korean:   '결과는 마찬가지였어.',
        japanese: '結果(けっか)は同様(どうよう)だった。',
        plain:    '結果は同様だった。',
        reading:  '켁카와 도ー요ー닷타.',
        pattern:  { name: '〜だった', meaning: '~였다 (과거)', note: 'な형용사 과거형' },
        furigana: 'けっかはどうようだった',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 0, 2, 2, 2, 2, 0, 0] },
        ],
      },
      {
        korean:   '나도 마찬가지로 생각해.',
        japanese: '私(わたし)も同様(どうよう)に思(おも)う。',
        plain:    '私も同様に思う。',
        reading:  '와타시모 도ー요ー니 오모우.',
        pattern:  { name: '同様に〜', meaning: '마찬가지로 ~', note: 'な형용사 부사형' },
        furigana: 'わたしもどうようにおもう',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 0] },
        ],
      },
    ],
  },
  {
    id: 'kirei', rank: 15, verb: '奇麗', reading: '키레이', meaning: '예쁜; 깨끗한',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '奇麗(きれい)です', ruby: '키레이데스', meaning: '예쁩니다' },
        { text: '奇麗(きれい)じゃないです', ruby: '키레이자나이데스', meaning: '예쁘지 않습니다' },
        { text: '奇麗(きれい)ですか？', ruby: '키레이데스까?', meaning: '예쁩니까?' },
        { text: '奇麗(きれい)じゃないですか？', ruby: '키레이자나이데스까?', meaning: '예쁘지 않습니까?' },
        { text: '奇麗(きれい)でした', ruby: '키레이데시타', meaning: '예뻤습니다' },
        { text: '奇麗(きれい)じゃなかったです', ruby: '키레이자나캇타데스', meaning: '예쁘지 않았습니다' },
        { text: '奇麗(きれい)でしたか？', ruby: '키레이데시타까?', meaning: '예뻤습니까?' },
        { text: '奇麗(きれい)じゃなかったですか？', ruby: '키레이자나캇타데스까?', meaning: '예쁘지 않았습니까?' },
      ],
      plain: [
        { text: '奇麗(きれい)だ', ruby: '키레이다', meaning: '예뻐' },
        { text: '奇麗(きれい)じゃない', ruby: '키레이자나이', meaning: '예쁘지 않아' },
        { text: '奇麗(きれい)？', ruby: '키레이?', meaning: '예뻐?' },
        { text: '奇麗(きれい)じゃない？', ruby: '키레이자나이?', meaning: '예쁘지 않아?' },
        { text: '奇麗(きれい)だった', ruby: '키레이닷타', meaning: '예뻤어' },
        { text: '奇麗(きれい)じゃなかった', ruby: '키레이자나캇타', meaning: '예쁘지 않았어' },
        { text: '奇麗(きれい)だった？', ruby: '키레이닷타?', meaning: '예뻤어?' },
        { text: '奇麗(きれい)じゃなかった？', ruby: '키레이자나캇타?', meaning: '예쁘지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '방이 깨끗해.',
        japanese: '部屋(へや)が奇麗(きれい)だ。',
        plain:    '部屋が奇麗だ。',
        reading:  '헤야가 키레이다.',
        pattern:  { name: '〜が奇麗だ', meaning: '~이/가 깨끗하다', note: '청결·아름다움을 나타냄' },
        furigana: 'へやがきれいだ',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 0, 2, 0, 0, 0] },
        ],
      },
      {
        korean:   '예쁜 꽃이 피었어.',
        japanese: '奇麗(きれい)な花(はな)が咲(さ)いた。',
        plain:    '奇麗な花が咲いた。',
        reading:  '키레이나 하나가 사이타.',
        pattern:  { name: '奇麗な〜', meaning: '예쁜 ~', note: 'な형용사 + 명사' },
        furigana: 'きれいなはながさいた',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [1, 0, 0, 0, 0, 2, 0, 0, 3, 3] },
        ],
      },
      {
        korean:   '글씨를 예쁘게 써.',
        japanese: '字(じ)を奇麗(きれい)に書(か)く。',
        plain:    '字を奇麗に書く。',
        reading:  '지오 키레이니 카쿠.',
        pattern:  { name: '奇麗に〜', meaning: '예쁘게 ~', note: 'な형용사 부사형' },
        furigana: 'じをきれいにかく',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [1, 0, 2, 0, 0, 0, 3, 0] },
        ],
      },
    ],
  },
  {
    id: 'kanzen', rank: 16, verb: '完全', reading: '칸젠', meaning: '완전한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '完全(かんぜん)です', ruby: '칸젠데스', meaning: '완전합니다' },
        { text: '完全(かんぜん)じゃないです', ruby: '칸젠자나이데스', meaning: '완전하지 않습니다' },
        { text: '完全(かんぜん)ですか？', ruby: '칸젠데스까?', meaning: '완전합니까?' },
        { text: '完全(かんぜん)じゃないですか？', ruby: '칸젠자나이데스까?', meaning: '완전하지 않습니까?' },
        { text: '完全(かんぜん)でした', ruby: '칸젠데시타', meaning: '완전했습니다' },
        { text: '完全(かんぜん)じゃなかったです', ruby: '칸젠자나캇타데스', meaning: '완전하지 않았습니다' },
        { text: '完全(かんぜん)でしたか？', ruby: '칸젠데시타까?', meaning: '완전했습니까?' },
        { text: '完全(かんぜん)じゃなかったですか？', ruby: '칸젠자나캇타데스까?', meaning: '완전하지 않았습니까?' },
      ],
      plain: [
        { text: '完全(かんぜん)だ', ruby: '칸젠다', meaning: '완전해' },
        { text: '完全(かんぜん)じゃない', ruby: '칸젠자나이', meaning: '완전하지 않아' },
        { text: '完全(かんぜん)？', ruby: '칸젠?', meaning: '완전해?' },
        { text: '完全(かんぜん)じゃない？', ruby: '칸젠자나이?', meaning: '완전하지 않아?' },
        { text: '完全(かんぜん)だった', ruby: '칸젠닷타', meaning: '완전했어' },
        { text: '完全(かんぜん)じゃなかった', ruby: '칸젠자나캇타', meaning: '완전하지 않았어' },
        { text: '完全(かんぜん)だった？', ruby: '칸젠닷타?', meaning: '완전했어?' },
        { text: '完全(かんぜん)じゃなかった？', ruby: '칸젠자나캇타?', meaning: '완전하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '준비는 완벽해.',
        japanese: '準備(じゅんび)は完全(かんぜん)だ。',
        plain:    '準備は完全だ。',
        reading:  '줌비와 칸젠다.',
        pattern:  { name: '〜は完全だ', meaning: '~은/는 완전하다', note: '완전함을 나타냄' },
        furigana: 'じゅんびはかんぜんだ',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [1, 1, 0, 0, 0, 0, 2, 2, 2, 2] },
        ],
      },
      {
        korean:   '완전한 승리야.',
        japanese: '完全(かんぜん)な勝利(しょうり)だ。',
        plain:    '完全な勝利だ。',
        reading:  '칸젠나 쇼ー리다.',
        pattern:  { name: '完全な〜', meaning: '완전한 ~', note: 'な형용사 + 명사' },
        furigana: 'かんぜんなしょうりだ',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 2, 2, 0, 0, 0] },
        ],
      },
      {
        korean:   '완전히 잊고 있었어.',
        japanese: '完全(かんぜん)に忘(わす)れていた。',
        plain:    '完全に忘れていた。',
        reading:  '칸젠니 와스레테이타.',
        pattern:  { name: '完全に〜', meaning: '완전히 ~', note: 'な형용사 부사형(강조)' },
        furigana: 'かんぜんにわすれていた',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2] },
        ],
      },
    ],
  },
  {
    id: 'arata', rank: 17, verb: '新た', reading: '아라타', meaning: '새로운',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '新(あら)たです', ruby: '아라타데스', meaning: '새롭습니다' },
        { text: '新(あら)たじゃないです', ruby: '아라타자나이데스', meaning: '새롭지 않습니다' },
        { text: '新(あら)たですか？', ruby: '아라타데스까?', meaning: '새롭습니까?' },
        { text: '新(あら)たじゃないですか？', ruby: '아라타자나이데스까?', meaning: '새롭지 않습니까?' },
        { text: '新(あら)たでした', ruby: '아라타데시타', meaning: '새로웠습니다' },
        { text: '新(あら)たじゃなかったです', ruby: '아라타자나캇타데스', meaning: '새롭지 않았습니다' },
        { text: '新(あら)たでしたか？', ruby: '아라타데시타까?', meaning: '새로웠습니까?' },
        { text: '新(あら)たじゃなかったですか？', ruby: '아라타자나캇타데스까?', meaning: '새롭지 않았습니까?' },
      ],
      plain: [
        { text: '新(あら)ただ', ruby: '아라타다', meaning: '새로워' },
        { text: '新(あら)たじゃない', ruby: '아라타자나이', meaning: '새롭지 않아' },
        { text: '新(あら)た？', ruby: '아라타?', meaning: '새로워?' },
        { text: '新(あら)たじゃない？', ruby: '아라타자나이?', meaning: '새롭지 않아?' },
        { text: '新(あら)ただった', ruby: '아라타닷타', meaning: '새로웠어' },
        { text: '新(あら)たじゃなかった', ruby: '아라타자나캇타', meaning: '새롭지 않았어' },
        { text: '新(あら)ただった？', ruby: '아라타닷타?', meaning: '새로웠어?' },
        { text: '新(あら)たじゃなかった？', ruby: '아라타자나캇타?', meaning: '새롭지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '새로운 도전이 시작돼.',
        japanese: '新(あら)たな挑戦(ちょうせん)が始(はじ)まる。',
        plain:    '新たな挑戦が始まる。',
        reading:  '아라타나 쵸ー센가 하지마루.',
        pattern:  { name: '新たな〜', meaning: '새로운 ~', note: '新しい보다 격식 있는 표현' },
        furigana: 'あらたなちょうせんがはじまる',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 3, 3, 3] },
        ],
      },
      {
        korean:   '마음을 새롭게 해.',
        japanese: '気持(きも)ちを新(あら)たにする。',
        plain:    '気持ちを新たにする。',
        reading:  '키모치오 아라타니 스루.',
        pattern:  { name: '新たに〜', meaning: '새롭게 ~', note: 'な형용사 부사형' },
        furigana: 'きもちをあらたにする',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 2, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '새로운 문제가 나왔어.',
        japanese: '新(あら)たな問題(もんだい)が出(で)てきた。',
        plain:    '新たな問題が出てきた。',
        reading:  '아라타나 몬다이가 데테키타.',
        pattern:  { name: '〜が出てきた', meaning: '~이/가 나왔다', note: '出てくる의 과거형' },
        furigana: 'あらたなもんだいがでてきた',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 0, 0, 2, 2, 2, 2, 3, 0, 0, 0] },
        ],
      },
    ],
  },
  {
    id: 'iroiro', rank: 18, verb: '色々', reading: '이로이로', meaning: '여러 가지; 다양한',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '色々(いろいろ)です', ruby: '이로이로데스', meaning: '다양합니다' },
        { text: '色々(いろいろ)じゃないです', ruby: '이로이로자나이데스', meaning: '다양하지 않습니다' },
        { text: '色々(いろいろ)ですか？', ruby: '이로이로데스까?', meaning: '다양합니까?' },
        { text: '色々(いろいろ)じゃないですか？', ruby: '이로이로자나이데스까?', meaning: '다양하지 않습니까?' },
        { text: '色々(いろいろ)でした', ruby: '이로이로데시타', meaning: '다양했습니다' },
        { text: '色々(いろいろ)じゃなかったです', ruby: '이로이로자나캇타데스', meaning: '다양하지 않았습니다' },
        { text: '色々(いろいろ)でしたか？', ruby: '이로이로데시타까?', meaning: '다양했습니까?' },
        { text: '色々(いろいろ)じゃなかったですか？', ruby: '이로이로자나캇타데스까?', meaning: '다양하지 않았습니까?' },
      ],
      plain: [
        { text: '色々(いろいろ)だ', ruby: '이로이로다', meaning: '다양해' },
        { text: '色々(いろいろ)じゃない', ruby: '이로이로자나이', meaning: '다양하지 않아' },
        { text: '色々(いろいろ)？', ruby: '이로이로?', meaning: '다양해?' },
        { text: '色々(いろいろ)じゃない？', ruby: '이로이로자나이?', meaning: '다양하지 않아?' },
        { text: '色々(いろいろ)だった', ruby: '이로이로닷타', meaning: '다양했어' },
        { text: '色々(いろいろ)じゃなかった', ruby: '이로이로자나캇타', meaning: '다양하지 않았어' },
        { text: '色々(いろいろ)だった？', ruby: '이로이로닷타?', meaning: '다양했어?' },
        { text: '色々(いろいろ)じゃなかった？', ruby: '이로이로자나캇타?', meaning: '다양하지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '여러 나라에 가고 싶어.',
        japanese: '色々(いろいろ)な国(くに)に行(い)きたい。',
        plain:    '色々な国に行きたい。',
        reading:  '이로이로나 쿠니니 이키타이.',
        pattern:  { name: '色々な〜', meaning: '여러 가지 ~', note: '다양함을 나타냄' },
        furigana: 'いろいろなくににいきたい',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 0, 2, 2, 0, 3, 3, 0] },
        ],
      },
      {
        korean:   '여러모로 신세 졌어.',
        japanese: '色々(いろいろ)お世話(せわ)になった。',
        plain:    '色々お世話になった。',
        reading:  '이로이로 오세와니 낫타.',
        pattern:  { name: 'お世話になった', meaning: '신세를 졌다', note: '감사 관용 표현' },
        furigana: 'いろいろおせわになった',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 0, 2, 0, 0, 3, 0, 0] },
        ],
      },
      {
        korean:   '방법은 여러 가지 있어.',
        japanese: '方法(ほうほう)は色々(いろいろ)ある。',
        plain:    '方法は色々ある。',
        reading:  '호ー호ー와 이로이로 아루.',
        pattern:  { name: '色々ある', meaning: '여러 가지 있다', note: '色々의 부사적 용법' },
        furigana: 'ほうほうはいろいろある',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 0, 2, 2, 2, 2, 0] },
        ],
      },
    ],
  },
  {
    id: 'taihen', rank: 19, verb: '大変', reading: '타이헨', meaning: '힘든; 큰일인',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '大変(たいへん)です', ruby: '타이헨데스', meaning: '힘듭니다' },
        { text: '大変(たいへん)じゃないです', ruby: '타이헨자나이데스', meaning: '힘들지 않습니다' },
        { text: '大変(たいへん)ですか？', ruby: '타이헨데스까?', meaning: '힘듭니까?' },
        { text: '大変(たいへん)じゃないですか？', ruby: '타이헨자나이데스까?', meaning: '힘들지 않습니까?' },
        { text: '大変(たいへん)でした', ruby: '타이헨데시타', meaning: '힘들었습니다' },
        { text: '大変(たいへん)じゃなかったです', ruby: '타이헨자나캇타데스', meaning: '힘들지 않았습니다' },
        { text: '大変(たいへん)でしたか？', ruby: '타이헨데시타까?', meaning: '힘들었습니까?' },
        { text: '大変(たいへん)じゃなかったですか？', ruby: '타이헨자나캇타데스까?', meaning: '힘들지 않았습니까?' },
      ],
      plain: [
        { text: '大変(たいへん)だ', ruby: '타이헨다', meaning: '힘들어' },
        { text: '大変(たいへん)じゃない', ruby: '타이헨자나이', meaning: '힘들지 않아' },
        { text: '大変(たいへん)？', ruby: '타이헨?', meaning: '힘들어?' },
        { text: '大変(たいへん)じゃない？', ruby: '타이헨자나이?', meaning: '힘들지 않아?' },
        { text: '大変(たいへん)だった', ruby: '타이헨닷타', meaning: '힘들었어' },
        { text: '大変(たいへん)じゃなかった', ruby: '타이헨자나캇타', meaning: '힘들지 않았어' },
        { text: '大変(たいへん)だった？', ruby: '타이헨닷타?', meaning: '힘들었어?' },
        { text: '大変(たいへん)じゃなかった？', ruby: '타이헨자나캇타?', meaning: '힘들지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '일이 힘들어.',
        japanese: '仕事(しごと)が大変(たいへん)だ。',
        plain:    '仕事が大変だ。',
        reading:  '시고토가 타이헨다.',
        pattern:  { name: '〜が大変だ', meaning: '~이/가 힘들다', note: '고됨을 나타냄' },
        furigana: 'しごとがたいへんだ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 0, 2, 2, 2, 2] },
        ],
      },
      {
        korean:   '힘든 하루였어.',
        japanese: '大変(たいへん)な一日(いちにち)だった。',
        plain:    '大変な一日だった。',
        reading:  '타이헨나 이치니치닷타.',
        pattern:  { name: '大変な〜', meaning: '힘든 ~', note: 'な형용사 + 명사' },
        furigana: 'たいへんないちにちだった',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 0, 2, 2, 2, 0, 0, 0] },
        ],
      },
      {
        korean:   '정말 신세 많이 졌습니다.',
        japanese: '大変(たいへん)お世話(せわ)になりました。',
        plain:    '大変お世話になりました。',
        reading:  '타이헨 오세와니 나리마시타.',
        pattern:  { name: '大変〜', meaning: '정말; 매우 ~', note: '大変의 부사적 용법(강조)' },
        furigana: 'たいへんおせわになりました',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 0, 2, 0, 0, 0, 3, 3, 0, 0] },
        ],
      },
    ],
  },
  {
    id: 'daijoubu', rank: 20, verb: '大丈夫', reading: '다이죠ー부', meaning: '괜찮은; 문제없는',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '大丈夫(だいじょうぶ)です', ruby: '다이죠ー부데스', meaning: '괜찮습니다' },
        { text: '大丈夫(だいじょうぶ)じゃないです', ruby: '다이죠ー부자나이데스', meaning: '괜찮지 않습니다' },
        { text: '大丈夫(だいじょうぶ)ですか？', ruby: '다이죠ー부데스까?', meaning: '괜찮습니까?' },
        { text: '大丈夫(だいじょうぶ)じゃないですか？', ruby: '다이죠ー부자나이데스까?', meaning: '괜찮지 않습니까?' },
        { text: '大丈夫(だいじょうぶ)でした', ruby: '다이죠ー부데시타', meaning: '괜찮았습니다' },
        { text: '大丈夫(だいじょうぶ)じゃなかったです', ruby: '다이죠ー부자나캇타데스', meaning: '괜찮지 않았습니다' },
        { text: '大丈夫(だいじょうぶ)でしたか？', ruby: '다이죠ー부데시타까?', meaning: '괜찮았습니까?' },
        { text: '大丈夫(だいじょうぶ)じゃなかったですか？', ruby: '다이죠ー부자나캇타데스까?', meaning: '괜찮지 않았습니까?' },
      ],
      plain: [
        { text: '大丈夫(だいじょうぶ)だ', ruby: '다이죠ー부다', meaning: '괜찮아' },
        { text: '大丈夫(だいじょうぶ)じゃない', ruby: '다이죠ー부자나이', meaning: '괜찮지 않아' },
        { text: '大丈夫(だいじょうぶ)？', ruby: '다이죠ー부?', meaning: '괜찮아?' },
        { text: '大丈夫(だいじょうぶ)じゃない？', ruby: '다이죠ー부자나이?', meaning: '괜찮지 않아?' },
        { text: '大丈夫(だいじょうぶ)だった', ruby: '다이죠ー부닷타', meaning: '괜찮았어' },
        { text: '大丈夫(だいじょうぶ)じゃなかった', ruby: '다이죠ー부자나캇타', meaning: '괜찮지 않았어' },
        { text: '大丈夫(だいじょうぶ)だった？', ruby: '다이죠ー부닷타?', meaning: '괜찮았어?' },
        { text: '大丈夫(だいじょうぶ)じゃなかった？', ruby: '다이죠ー부자나캇타?', meaning: '괜찮지 않았어?' },
      ],
    },
    examples: [
      {
        korean:   '이제 괜찮아.',
        japanese: 'もう大丈夫(だいじょうぶ)だ。',
        plain:    'もう大丈夫だ。',
        reading:  '모ー 다이죠ー부다.',
        pattern:  { name: 'もう大丈夫', meaning: '이제 괜찮다', note: '안심을 나타냄' },
        furigana: 'もうだいじょうぶだ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [1, 0, 0, 2, 2, 2, 0, 0, 0] },
        ],
      },
      {
        korean:   '혼자서 괜찮아요?',
        japanese: '一人(ひとり)で大丈夫(だいじょうぶ)ですか？',
        plain:    '一人で大丈夫ですか？',
        reading:  '히토리데 다이죠ー부데스까?',
        pattern:  { name: '〜で大丈夫ですか？', meaning: '~해도 괜찮아요?', note: '확인·염려 표현' },
        furigana: 'ひとりでだいじょうぶですか',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '괜찮아, 걱정 없어.',
        japanese: '大丈夫(だいじょうぶ)、心配(しんぱい)ないよ。',
        plain:    '大丈夫、心配ないよ。',
        reading:  '다이죠ー부, 심파이 나이요.',
        pattern:  { name: '心配ないよ', meaning: '걱정 없어', note: '상대를 안심시키는 표현' },
        furigana: 'だいじょうぶしんぱいないよ',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },
  { id: 'daiji',      rank: 21,  verb: '大事',       reading: '다이지',    meaning: '중요한; 소중한',          conjugations: null, examples: [] },
  { id: 'yuumei',     rank: 22,  verb: '有名',       reading: '유ー메이',  meaning: '유명한',                  conjugations: null, examples: [] },
  { id: 'yuukou',     rank: 23,  verb: '有効',       reading: '유ー코ー',  meaning: '유효한; 효과 있는',       conjugations: null, examples: [] },
  { id: 'touzen',     rank: 24,  verb: '当然',       reading: '토ー젱',    meaning: '당연한',                  conjugations: null, examples: [] },
  { id: 'sonna',      rank: 25,  verb: 'そんな',     reading: '손나',      meaning: '그런; 그러한',            conjugations: null, examples: [] },
  { id: 'amari',      rank: 26,  verb: '余り',       reading: '아마리',    meaning: '그다지; 별로',            conjugations: null, examples: [] },
  { id: 'yutaka',     rank: 27,  verb: '豊か',       reading: '유타카',    meaning: '풍요로운; 풍부한',        conjugations: null, examples: [] },
  { id: 'shizuka',    rank: 28,  verb: '静か',       reading: '시즈카',    meaning: '조용한',                  conjugations: null, examples: [] },
  { id: 'tekisetsu',  rank: 29,  verb: '適切',       reading: '테키세츠',  meaning: '적절한',                  conjugations: null, examples: [] },
  { id: 'zannen',     rank: 30,  verb: '残念',       reading: '잔넨',      meaning: '유감인; 아쉬운',          conjugations: null, examples: [] },
  { id: 'shizen',     rank: 31,  verb: '自然',       reading: '시젱',      meaning: '자연스러운',              conjugations: null, examples: [] },
  { id: 'meikaku',    rank: 32,  verb: '明確',       reading: '메이카쿠',  meaning: '명확한',                  conjugations: null, examples: [] },
  { id: 'tayou',      rank: 33,  verb: '多様',       reading: '타요ー',    meaning: '다양한',                  conjugations: null, examples: [] },
  { id: 'shuyou',     rank: 34,  verb: '主要',       reading: '슈요ー',    meaning: '주요한',                  conjugations: null, examples: [] },
  { id: 'koudo',      rank: 35,  verb: '高度',       reading: '코ー도',    meaning: '고도의; 수준 높은',       conjugations: null, examples: [] },
  { id: 'ikaga',      rank: 36,  verb: '如何',       reading: '이카가',    meaning: '어떤지; 어떠한',          conjugations: null, examples: [] },
  { id: 'kakujitsu',  rank: 37,  verb: '確実',       reading: '카쿠지츠',  meaning: '확실한',                  conjugations: null, examples: [] },
  { id: 'tokushu',    rank: 38,  verb: '特殊',       reading: '토쿠슈',    meaning: '특수한; 특별한',          conjugations: null, examples: [] },
  { id: 'takusan',    rank: 39,  verb: '沢山',       reading: '타쿠상',    meaning: '많은',                    conjugations: null, examples: [] },
  { id: 'konna',      rank: 40,  verb: 'こんな',     reading: '콘나',      meaning: '이런; 이러한',            conjugations: null, examples: [] },
  { id: 'daisuki',    rank: 41,  verb: '大好き',     reading: '다이스키',  meaning: '매우 좋아하는',           conjugations: null, examples: [] },
  { id: 'igai',       rank: 42,  verb: '意外',       reading: '이가이',    meaning: '의외인; 뜻밖의',          conjugations: null, examples: [] },
  { id: 'tanjun',     rank: 43,  verb: '単純',       reading: '탄쥰',      meaning: '단순한',                  conjugations: null, examples: [] },
  { id: 'kyodai',     rank: 44,  verb: '巨大',       reading: '쿄다이',    meaning: '거대한',                  conjugations: null, examples: [] },
  { id: 'oohaba',     rank: 45,  verb: '大幅',       reading: '오ー하바',  meaning: '대폭적인; 큰 폭의',       conjugations: null, examples: [] },
  { id: 'migoto',     rank: 46,  verb: '見事',       reading: '미고토',    meaning: '훌륭한; 멋진',            conjugations: null, examples: [] },
  { id: 'wazuka',     rank: 47,  verb: '僅か',       reading: '와즈카',    meaning: '약간의; 극소량의',        conjugations: null, examples: [] },
  { id: 'atarimae',   rank: 48,  verb: '当たり前',   reading: '아타리마에',meaning: '당연한; 보통의',          conjugations: null, examples: [] },
  { id: 'shinki',     rank: 49,  verb: '新規',       reading: '신키',      meaning: '신규의',                  conjugations: null, examples: [] },
  { id: 'rippa',      rank: 50,  verb: '立派',       reading: '립파',      meaning: '훌륭한; 당당한',          conjugations: null, examples: [] },
  { id: 'suteki',     rank: 51,  verb: '素敵',       reading: '스테키',    meaning: '멋진; 근사한',            conjugations: null, examples: [] },
  { id: 'youi',       rank: 52,  verb: '容易',       reading: '요ー이',    meaning: '쉬운; 용이한',            conjugations: null, examples: [] },
  { id: 'dokuji',     rank: 53,  verb: '独自',       reading: '도쿠지',    meaning: '독자적인; 자체적인',      conjugations: null, examples: [] },
  { id: 'kenmei',     rank: 54,  verb: '懸命',       reading: '켄메이',    meaning: '필사적인',                conjugations: null, examples: [] },
  { id: 'dōitsu',     rank: 55,  verb: '同一',       reading: '도ー이츠',  meaning: '동일한',                  conjugations: null, examples: [] },
  { id: 'tekisei',    rank: 56,  verb: '適正',       reading: '테키세이',  meaning: '적정한',                  conjugations: null, examples: [] },
  { id: 'youchi',     rank: 57,  verb: '幼稚',       reading: '요ー치',    meaning: '유치한',                  conjugations: null, examples: [] },
  { id: 'donna',      rank: 58,  verb: 'どんな',     reading: '돈나',      meaning: '어떤; 어떠한',            conjugations: null, examples: [] },
  { id: 'jouzu',      rank: 59,  verb: '上手',       reading: '죠ー즈',    meaning: '능숙한; 잘하는',          conjugations: null, examples: [] },
  { id: 'koutou',     rank: 60,  verb: '高等',       reading: '코ー토ー',  meaning: '고등의; 수준 높은',       conjugations: null, examples: [] },
  { id: 'haruka',     rank: 61,  verb: '遥か',       reading: '하루카',    meaning: '아득한; 훨씬',            conjugations: null, examples: [] },
  { id: 'hisshi',     rank: 62,  verb: '必死',       reading: '힛시',      meaning: '필사적인',                conjugations: null, examples: [] },
  { id: 'kouteki',    rank: 63,  verb: '公的',       reading: '코ー테키',  meaning: '공적인',                  conjugations: null, examples: [] },
  { id: 'juudai',     rank: 64,  verb: '重大',       reading: '쥬ー다이',  meaning: '중대한',                  conjugations: null, examples: [] },
  { id: 'kyuusoku',   rank: 65,  verb: '急速',       reading: '큐ー소쿠',  meaning: '급속한',                  conjugations: null, examples: [] },
  { id: 'toumei',     rank: 66,  verb: '透明',       reading: '토ー메이',  meaning: '투명한',                  conjugations: null, examples: [] },
  { id: 'bimyou',     rank: 67,  verb: '微妙',       reading: '비묘ー',    meaning: '미묘한; 애매한',          conjugations: null, examples: [] },
  { id: 'teinei',     rank: 68,  verb: '丁寧',       reading: '테이네이',  meaning: '정중한; 꼼꼼한',          conjugations: null, examples: [] },
  { id: 'sunao',      rank: 69,  verb: '素直',       reading: '스나오',    meaning: '솔직한; 순순한',          conjugations: null, examples: [] },
  { id: 'chiteki',    rank: 70,  verb: '知的',       reading: '치테키',    meaning: '지적인',                  conjugations: null, examples: [] },
  { id: 'shinkoku',   rank: 71,  verb: '深刻',       reading: '싱코쿠',    meaning: '심각한',                  conjugations: null, examples: [] },
  { id: 'majime',     rank: 72,  verb: '真面目',     reading: '마지메',    meaning: '성실한; 진지한',          conjugations: null, examples: [] },
  { id: 'michika',    rank: 73,  verb: '身近',       reading: '미치카',    meaning: '친근한; 가까운',          conjugations: null, examples: [] },
  { id: 'kichou',     rank: 74,  verb: '貴重',       reading: '키쵸ー',    meaning: '귀중한',                  conjugations: null, examples: [] },
  { id: 'sakan',      rank: 75,  verb: '盛ん',       reading: '사캉',      meaning: '활발한; 왕성한',          conjugations: null, examples: [] },
  { id: 'kanari',     rank: 76,  verb: '可成',       reading: '카나리',    meaning: '상당한; 꽤',              conjugations: null, examples: [] },
  { id: 'houfu',      rank: 77,  verb: '豊富',       reading: '호ー후',    meaning: '풍부한',                  conjugations: null, examples: [] },
  { id: 'seishiki',   rank: 78,  verb: '正式',       reading: '세이시키',  meaning: '정식의',                  conjugations: null, examples: [] },
  { id: 'kenzen',     rank: 79,  verb: '健全',       reading: '켄젱',      meaning: '건전한',                  conjugations: null, examples: [] },
  { id: 'yuushuu',    rank: 80,  verb: '優秀',       reading: '유ー슈ー',  meaning: '우수한',                  conjugations: null, examples: [] },
  { id: 'kyouryoku',  rank: 81,  verb: '強力',       reading: '쿄ー료쿠',  meaning: '강력한',                  conjugations: null, examples: [] },
  { id: 'fuyou',      rank: 82,  verb: '不要',       reading: '후요ー',    meaning: '불필요한',                conjugations: null, examples: [] },
  { id: 'furu',       rank: 83,  verb: 'フル',       reading: '후루',      meaning: '풀; 최대한의',            conjugations: null, examples: [] },
  { id: 'houteki',    rank: 84,  verb: '法的',       reading: '호ー테키',  meaning: '법적인',                  conjugations: null, examples: [] },
  { id: 'fukaketsu',  rank: 85,  verb: '不可欠',     reading: '후카케츠',  meaning: '불가결한; 필수적인',      conjugations: null, examples: [] },
  { id: 'kappatsu',   rank: 86,  verb: '活発',       reading: '캇파츠',    meaning: '활발한',                  conjugations: null, examples: [] },
  { id: 'odayaka',    rank: 87,  verb: '穏やか',     reading: '오다야카',  meaning: '온화한; 잔잔한',          conjugations: null, examples: [] },
  { id: 'dokutoku',   rank: 88,  verb: '独特',       reading: '도쿠토쿠',  meaning: '독특한',                  conjugations: null, examples: [] },
  { id: 'kasuka',     rank: 89,  verb: '微か',       reading: '카스카',    meaning: '희미한; 어렴풋한',        conjugations: null, examples: [] },
  { id: 'kawaisou',   rank: 90,  verb: '可哀想',     reading: '카와이소ー',meaning: '불쌍한; 가엾은',          conjugations: null, examples: [] },
  { id: 'tandoku',    rank: 91,  verb: '単独',       reading: '탄도쿠',    meaning: '단독의',                  conjugations: null, examples: [] },
  { id: 'enkatsu',    rank: 92,  verb: '円滑',       reading: '엔카츠',    meaning: '원활한',                  conjugations: null, examples: [] },
  { id: 'kimyou',     rank: 93,  verb: '奇妙',       reading: '키묘ー',    meaning: '기묘한; 이상한',          conjugations: null, examples: [] },
  { id: 'yuuri',      rank: 94,  verb: '有利',       reading: '유ー리',    meaning: '유리한',                  conjugations: null, examples: [] },
  { id: 'yuuryoku',   rank: 95,  verb: '有力',       reading: '유ー료쿠',  meaning: '유력한; 강력한',          conjugations: null, examples: [] },
  { id: 'hayame',     rank: 96,  verb: '早め',       reading: '하야메',    meaning: '이른; 일찍',              conjugations: null, examples: [] },
  { id: 'nesshin',    rank: 97,  verb: '熱心',       reading: '넷싱',      meaning: '열심인; 열정적인',        conjugations: null, examples: [] },
  { id: 'kekkou',     rank: 98,  verb: '結構',       reading: '켁코ー',    meaning: '꽤; 상당히',              conjugations: null, examples: [] },
  { id: 'shimpuru',   rank: 99,  verb: 'シンプル',   reading: '심푸루',    meaning: '심플한; 단순한',          conjugations: null, examples: [] },
  { id: 'junsui',     rank: 100, verb: '純粋',       reading: '쥰스이',    meaning: '순수한',                  conjugations: null, examples: [] },
]
