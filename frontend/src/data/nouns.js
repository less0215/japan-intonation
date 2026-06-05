/* 명사 학습 데이터 (BCCWJ 빈도 순)
 * patterns: 자주 쓰는 표현 패턴 (4개)
 * examples: 예문 (3개)
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

export const NOUNS = [

  /* ══════════════════════════════════════════════════
   * 1위  事
   * ══════════════════════════════════════════════════ */
  {
    id: 'koto', rank: 1, verb: '事', reading: '코토', meaning: '일; 것; 사항',
    accentType: 2,
    conjugations: {
      formal: [
        { text: 'ことができます',           ruby: '코토가 데키마스',   meaning: '~할 수 있습니다' },
        { text: 'ことができません',         ruby: '코토가 데키마셍',   meaning: '~할 수 없습니다' },
        { text: 'ことがあります',           ruby: '코토가 아리마스',   meaning: '~한 적이 있습니다' },
        { text: 'ことがありません',         ruby: '코토가 아리마셍',   meaning: '~한 적이 없습니다' },
        { text: 'ことになりました',         ruby: '코토니 나리마시타', meaning: '~하게 되었습니다' },
        { text: 'ことにしました',           ruby: '코토니 시마시타',   meaning: '~하기로 했습니다' },
        { text: 'ことはありません',         ruby: '코토와 아리마셍',   meaning: '~할 필요 없습니다' },
        { text: 'ことが大切です',           ruby: '코토가 타이세츠데스',meaning: '~하는 것이 중요합니다' },
      ],
      plain: [
        { text: 'ことができる',     ruby: '코토가 데키루',    meaning: '~할 수 있어' },
        { text: 'ことができない',   ruby: '코토가 데키나이',  meaning: '~할 수 없어' },
        { text: 'ことがある',       ruby: '코토가 아루',      meaning: '~한 적 있어' },
        { text: 'ことがない',       ruby: '코토가 나이',      meaning: '~한 적 없어' },
        { text: 'ことになった',     ruby: '코토니 낫타',      meaning: '~하게 됐어' },
        { text: 'ことにした',       ruby: '코토니 시타',      meaning: '~하기로 했어' },
        { text: 'ことはない',       ruby: '코토와 나이',      meaning: '~할 필요 없어' },
        { text: 'ことが大切だ',     ruby: '코토가 타이세츠다',meaning: '~하는 것이 중요해' },
      ],
    },
    examples: [
      {
        korean:   '일본어를 말할 수 있어요.',
        japanese: '日本語(にほんご)を話(はな)すことができます。',
        plain:    '日本語を話すことができます。',
        reading:  '니혼고오 하나스 코토가 데키마스.',
        pattern:  { name: '〜することができる', meaning: '~할 수 있다', note: 'こと는 형식명사. 동사 원형 + ことができる로 가능을 나타냄' },
        furigana: 'にほんごをはなすことができます',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '도쿄에 간 적이 있어요?',
        japanese: '東京(とうきょう)に行(い)ったことがありますか？',
        plain:    '東京に行ったことがありますか？',
        reading:  '토ー쿄ー니 잇타 코토가 아리마스까?',
        pattern:  { name: '〜たことがある', meaning: '~한 적이 있다', note: '과거 경험을 나타내는 표현. 동사 과거형 + ことがある' },
        furigana: 'とうきょうにいったことがありますか',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '내년에 이사하기로 했어.',
        japanese: '来年(らいねん)引(ひ)っ越(こ)すことにした。',
        plain:    '来年引っ越すことにした。',
        reading:  '라이넨 힛코스 코토니 시타.',
        pattern:  { name: '〜ことにする', meaning: '~하기로 하다', note: '자신의 결정·의지를 나타냄' },
        furigana: 'らいねんひっこすことにした',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 2위  人
   * ══════════════════════════════════════════════════ */
  {
    id: 'hito', rank: 2, verb: '人', reading: '히토', meaning: '사람; 인간',
    accentType: 2,
    conjugations: {
      formal: [
        { text: 'あの人(ひと)は',         ruby: '아노 히토와',     meaning: '저 사람은' },
        { text: 'この人(ひと)は',         ruby: '코노 히토와',     meaning: '이 사람은' },
        { text: 'その人(ひと)は',         ruby: '소노 히토와',     meaning: '그 사람은' },
        { text: '一人(ひとり)で',         ruby: '히토리데',        meaning: '혼자서' },
        { text: '人(ひと)のために',       ruby: '히토노 타메니',   meaning: '남을 위해서' },
        { text: '人(ひと)と話(はな)す',  ruby: '히토토 하나스',   meaning: '사람과 이야기하다' },
        { text: '人(ひと)が多(おお)い',  ruby: '히토가 오오이',   meaning: '사람이 많다' },
        { text: '大人(おとな)',           ruby: '오토나',          meaning: '어른; 성인' },
      ],
      plain: [
        { text: '人(ひと)',               ruby: '히토',            meaning: '사람' },
        { text: '人(ひと)たち',           ruby: '히토타치',        meaning: '사람들' },
        { text: 'あの人(ひと)',           ruby: '아노 히토',       meaning: '저 사람' },
        { text: '他(ほか)の人(ひと)',     ruby: '호카노 히토',     meaning: '다른 사람' },
        { text: '人(ひと)ごみ',           ruby: '히토고미',        meaning: '인파; 사람 많은 곳' },
        { text: '一人(ひとり)',           ruby: '히토리',          meaning: '한 명; 혼자' },
        { text: '人(ひと)気(き)',         ruby: '히토키',          meaning: '인기' },
        { text: '人(ひと)生(せい)',       ruby: '진세이',          meaning: '인생' },
      ],
    },
    examples: [
      {
        korean:   '저 사람 누구야?',
        japanese: 'あの人(ひと)、誰(だれ)?',
        plain:    'あの人、誰?',
        reading:  '아노 히토, 다레?',
        pattern:  { name: 'あの人 / この人', meaning: '저 사람 / 이 사람', note: '지시대명사 + 人으로 특정 인물을 가리킴' },
        furigana: 'あのひとだれ',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '역 주변에 사람이 많아.',
        japanese: '駅(えき)の周(まわ)りに人(ひと)が多(おお)い。',
        plain:    '駅の周りに人が多い。',
        reading:  '에키노 마와리니 히토가 오오이.',
        pattern:  { name: '人が多い', meaning: '사람이 많다', note: '장소에 사람이 많음을 나타내는 표현' },
        furigana: 'えきのまわりにひとがおおい',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '혼자서 여행하는 것을 좋아해.',
        japanese: '一人(ひとり)で旅行(りょこう)するのが好(す)きだ。',
        plain:    '一人で旅行するのが好きだ。',
        reading:  '히토리데 료코ー스루노가 스키다.',
        pattern:  { name: '一人で', meaning: '혼자서', note: '人 + 数量詞. 혼자 행동함을 나타냄' },
        furigana: 'ひとりでりょこうするのがすきだ',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 3위  自分
   * ══════════════════════════════════════════════════ */
  {
    id: 'jibun', rank: 3, verb: '自分', reading: '지붕', meaning: '자신; 나',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '自分(じぶん)で',             ruby: '지붕데',           meaning: '스스로; 혼자서' },
        { text: '自分(じぶん)のため',         ruby: '지붕노 타메',      meaning: '자신을 위해서' },
        { text: '自分(じぶん)らしく',         ruby: '지붕라시쿠',       meaning: '자기답게' },
        { text: '自分(じぶん)で決(き)める',   ruby: '지붕데 키메루',    meaning: '스스로 결정하다' },
        { text: '自分(じぶん)を信(しん)じる', ruby: '지붕오 신지루',    meaning: '자신을 믿다' },
        { text: '自分(じぶん)のことを',       ruby: '지붕노 코토오',    meaning: '자신에 대해서' },
        { text: '自分(じぶん)自身(じしん)',   ruby: '지붕지싱',         meaning: '자기 자신' },
        { text: '自分(じぶん)勝手(かって)',   ruby: '지붕캇테',         meaning: '제멋대로' },
      ],
      plain: [
        { text: '自分(じぶん)',               ruby: '지붕',             meaning: '나; 자신' },
        { text: '自分(じぶん)で',             ruby: '지붕데',           meaning: '스스로' },
        { text: '自分(じぶん)のこと',         ruby: '지붕노 코토',      meaning: '자기 자신에 관한 것' },
        { text: '自分(じぶん)らしい',         ruby: '지붕라시이',       meaning: '자기다운; 자기답다' },
        { text: '自分(じぶん)だけ',           ruby: '지붕다케',         meaning: '나만; 자신만' },
        { text: '自分(じぶん)から',           ruby: '지붕카라',         meaning: '스스로; 자진해서' },
        { text: '自分(じぶん)なり',           ruby: '지붕나리',         meaning: '자기 나름대로' },
        { text: '自分(じぶん)を表現(ひょうげん)する', ruby: '지붕오 효겡스루', meaning: '자신을 표현하다' },
      ],
    },
    examples: [
      {
        korean:   '스스로 결정했어.',
        japanese: '自分(じぶん)で決(き)めた。',
        plain:    '自分で決めた。',
        reading:  '지붕데 키메타.',
        pattern:  { name: '自分で〜する', meaning: '스스로 ~하다', note: '自分で는 남의 도움 없이 혼자 하는 행동을 강조' },
        furigana: 'じぶんできめた',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '자기 자신을 사랑하는 게 중요해.',
        japanese: '自分(じぶん)自身(じしん)を愛(あい)することが大切(たいせつ)だ。',
        plain:    '自分自身を愛することが大切だ。',
        reading:  '지붕지싱오 아이스루 코토가 타이세츠다.',
        pattern:  { name: '自分自身', meaning: '자기 자신', note: '自分を강조한 복합 명사. 주체성을 강조할 때 사용' },
        furigana: 'じぶんじしんをあいすることがたいせつだ',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '나는 자기답게 살고 싶어.',
        japanese: '私(わたし)は自分(じぶん)らしく生(い)きたい。',
        plain:    '私は自分らしく生きたい。',
        reading:  '와타시와 지붕라시쿠 이키타이.',
        pattern:  { name: '自分らしく', meaning: '자기답게', note: '〜らしく는 "~답게"의 부사형. 자신의 본모습대로 살고 싶다는 표현' },
        furigana: 'わたしはじぶんらしくいきたい',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 4위  方
   * ══════════════════════════════════════════════════ */
  {
    id: 'hou', rank: 4, verb: '方', reading: '호ー', meaning: '쪽; 방향; 방법; 편',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '〜の方(ほう)が',       ruby: '노 호ー가',     meaning: '~하는 편이; ~쪽이' },
        { text: '〜方(かた)',           ruby: '카타',          meaning: '~하시는 분 (존경)' },
        { text: '方法(ほうほう)',       ruby: '호ー호ー',      meaning: '방법' },
        { text: '〜のやり方(かた)',     ruby: '노 야리카타',   meaning: '~하는 방법' },
        { text: '〜の仕方(しかた)',     ruby: '노 시카타',     meaning: '~하는 방법' },
        { text: '方向(ほうこう)',       ruby: '호ー코ー',      meaning: '방향' },
        { text: '一方(いっぽう)',       ruby: '잇포ー',        meaning: '한편; 반면' },
        { text: '両方(りょうほう)',     ruby: '료ー호ー',      meaning: '양쪽; 둘 다' },
      ],
      plain: [
        { text: '方(ほう)',             ruby: '호ー',          meaning: '쪽; 편' },
        { text: '〜の方(ほう)',         ruby: '노 호ー',       meaning: '~하는 쪽' },
        { text: '右方(みぎほう)',       ruby: '미기호ー',      meaning: '오른쪽' },
        { text: '左方(ひだりほう)',     ruby: '히다리호ー',    meaning: '왼쪽' },
        { text: 'こちらの方',           ruby: '코치라노 호ー',  meaning: '이쪽' },
        { text: '使い方(つかいかた)',   ruby: '츠카이카타',    meaning: '사용 방법' },
        { text: '読み方(よみかた)',     ruby: '요미카타',      meaning: '읽는 방법' },
        { text: '考え方(かんがえかた)', ruby: '칸가에카타',    meaning: '사고방식' },
      ],
    },
    examples: [
      {
        korean:   '이쪽이 더 저렴한 것 같아.',
        japanese: 'こちらの方(ほう)が安(やす)そうだ。',
        plain:    'こちらの方が安そうだ。',
        reading:  '코치라노 호ー가 야스소ー다.',
        pattern:  { name: '〜の方が〜だ', meaning: '~하는 쪽이 ~하다', note: '비교 표현. より를 생략하고 方が로 어느 쪽이 더 그런지 나타냄' },
        furigana: 'こちらのほうがやすそうだ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 1, 0, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '어떻게 쓰는지 알려줘.',
        japanese: '使(つか)い方(かた)を教(おし)えて。',
        plain:    '使い方を教えて。',
        reading:  '츠카이카타오 오시에테.',
        pattern:  { name: '〜方(かた)', meaning: '~하는 방법', note: '동사 ます형 + 方. 방법·수단을 나타내는 명사형' },
        furigana: 'つかいかたをおしえて',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '둘 다 먹고 싶어.',
        japanese: '両方(りょうほう)食(た)べたい。',
        plain:    '両方食べたい。',
        reading:  '료ー호ー 타베타이.',
        pattern:  { name: '両方', meaning: '둘 다; 양쪽', note: '方の合成語. 두 가지 모두를 나타냄' },
        furigana: 'りょうほうたべたい',
        accentData: [
          { phrase_id: 0, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 5위  訳
   * ══════════════════════════════════════════════════ */
  {
    id: 'wake', rank: 5, verb: '訳', reading: '와케', meaning: '이유; 의미; 도리',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '〜わけです',           ruby: '와케데스',      meaning: '~인 셈입니다' },
        { text: '〜わけではない',       ruby: '와케데와나이',  meaning: '~한 것은 아닙니다' },
        { text: '〜わけがない',         ruby: '와케가나이',    meaning: '~할 리가 없습니다' },
        { text: '〜わけにはいかない',   ruby: '와케니와 이카나이',meaning: '~할 수는 없습니다' },
        { text: '〜わけだ',             ruby: '와케다',        meaning: '~인 셈이다' },
        { text: 'どういうわけか',       ruby: '도ー이우와케카', meaning: '왜인지; 어찌된 셈인지' },
        { text: 'そういうわけで',       ruby: '소ー이우와케데', meaning: '그런 이유로; 그래서' },
        { text: '理由(りゆう)・訳',     ruby: '리유ー와케',    meaning: '이유 (동의어)' },
      ],
      plain: [
        { text: 'わけ',                 ruby: '와케',          meaning: '이유; 셈' },
        { text: '〜わけだ',             ruby: '와케다',        meaning: '~인 셈이야' },
        { text: '〜わけじゃない',       ruby: '와케자나이',    meaning: '~한 건 아니야' },
        { text: '〜わけがない',         ruby: '와케가나이',    meaning: '~할 리 없어' },
        { text: '〜わけにはいかない',   ruby: '와케니와 이카나이',meaning: '~할 수 없어' },
        { text: '〜わけで',             ruby: '와케데',        meaning: '~라는 이유로' },
        { text: '〜というわけか',       ruby: '토이우와케카',  meaning: '~라는 말인가' },
        { text: 'わかった',             ruby: '와캇타',        meaning: '알겠어 (わかる 활용)' },
      ],
    },
    examples: [
      {
        korean:   '그래서 늦은 거야.',
        japanese: 'そういうわけで遅(おく)れたわけだ。',
        plain:    'そういうわけで遅れたわけだ。',
        reading:  '소ー이우 와케데 오쿠레타 와케다.',
        pattern:  { name: 'そういうわけで', meaning: '그런 이유로; 그래서', note: '결과의 원인·이유를 설명하는 관용 표현' },
        furigana: 'そういうわけでおくれたわけだ',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '그렇다고 포기할 수는 없어.',
        japanese: 'だからといって諦(あきら)めるわけにはいかない。',
        plain:    'だからといって諦めるわけにはいかない。',
        reading:  '다카라토잇테 아키라메루 와케니와 이카나이.',
        pattern:  { name: '〜わけにはいかない', meaning: '~할 수는 없다', note: '사정상 어쩔 수 없이 할 수 없음을 나타내는 관용 표현' },
        furigana: 'だからといってあきらめるわけにはいかない',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '그가 화를 낼 리가 없어.',
        japanese: '彼(かれ)が怒(おこ)るわけがない。',
        plain:    '彼が怒るわけがない。',
        reading:  '카레가 오코루 와케가나이.',
        pattern:  { name: '〜わけがない', meaning: '~할 리가 없다', note: '가능성을 강하게 부정하는 표현' },
        furigana: 'かれがおこるわけがない',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 0, 1, 1, 1, 0, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 6위  問題
   * ══════════════════════════════════════════════════ */
  {
    id: 'mondai', rank: 6, verb: '問題', reading: '몬다이', meaning: '문제',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '問題(もんだい)ない',         ruby: '몬다이나이',      meaning: '문제없다' },
        { text: '問題(もんだい)がある',       ruby: '몬다이가 아루',   meaning: '문제가 있다' },
        { text: '問題(もんだい)を解(と)く',   ruby: '몬다이오 토쿠',   meaning: '문제를 풀다' },
        { text: '問題(もんだい)になる',       ruby: '몬다이니 나루',   meaning: '문제가 되다' },
        { text: '問題(もんだい)を解決(かいけつ)する', ruby: '몬다이오 카이케츠스루', meaning: '문제를 해결하다' },
        { text: '何(なに)が問題(もんだい)か', ruby: '나니가 몬다이카',  meaning: '무엇이 문제인지' },
        { text: '問題(もんだい)点(てん)',     ruby: '몬다이텡',        meaning: '문제점' },
        { text: '問題(もんだい)が起(お)きる', ruby: '몬다이가 오키루',  meaning: '문제가 생기다' },
      ],
      plain: [
        { text: '問題(もんだい)',             ruby: '몬다이',          meaning: '문제' },
        { text: '問題(もんだい)ない',         ruby: '몬다이나이',      meaning: '문제없어' },
        { text: '問題(もんだい)だ',           ruby: '몬다이다',        meaning: '문제야' },
        { text: '大(おお)きな問題(もんだい)', ruby: '오ー키나 몬다이',  meaning: '큰 문제' },
        { text: '問題(もんだい)集(しゅう)',   ruby: '몬다이슈ー',      meaning: '문제집' },
        { text: '社会(しゃかい)問題(もんだい)', ruby: '샤카이 몬다이',  meaning: '사회 문제' },
        { text: '問題(もんだい)解決(かいけつ)', ruby: '몬다이 카이케츠', meaning: '문제 해결' },
        { text: '問題(もんだい)外(がい)',     ruby: '몬다이가이',      meaning: '논외; 문제 밖' },
      ],
    },
    examples: [
      {
        korean:   '이 일에 관해서는 아무 문제없어.',
        japanese: 'この件(けん)については何(なに)も問題(もんだい)ない。',
        plain:    'この件については何も問題ない。',
        reading:  '코노 켄니츠이테와 나니모 몬다이나이.',
        pattern:  { name: '問題ない', meaning: '문제없다', note: '問題がない의 구어형. 걱정 없음을 나타내는 일상 표현' },
        furigana: 'このけんについてはなにももんだいない',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '그 방법에 문제가 있어.',
        japanese: 'その方法(ほうほう)には問題(もんだい)がある。',
        plain:    'その方法には問題がある。',
        reading:  '소노 호ー호ー니와 몬다이가 아루.',
        pattern:  { name: '問題がある', meaning: '문제가 있다', note: '존재 표현 ある로 문제의 존재를 나타냄' },
        furigana: 'そのほうほうにはもんだいがある',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '이 문제를 어떻게 해결할 거야?',
        japanese: 'この問題(もんだい)をどうやって解決(かいけつ)するの？',
        plain:    'この問題をどうやって解決するの？',
        reading:  '코노 몬다이오 도ー얏테 카이케츠스루노?',
        pattern:  { name: '問題を解決する', meaning: '문제를 해결하다', note: '〜を + 解決する의 기본 문형' },
        furigana: 'このもんだいをどうやってかいけつするの',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 7위  会
   * ══════════════════════════════════════════════════ */
  {
    id: 'kai', rank: 7, verb: '会', reading: '카이', meaning: '모임; 회; 협회',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '会(かい)を開(ひら)く',   ruby: '카이오 히라쿠',   meaning: '회를 열다' },
        { text: '会(かい)に参加(さんか)する', ruby: '카이니 산카스루', meaning: '회에 참가하다' },
        { text: '会(かい)が始(はじ)まる', ruby: '카이가 하지마루', meaning: '회가 시작되다' },
        { text: '学会(がっかい)',         ruby: '각카이',          meaning: '학회' },
        { text: '国会(こっかい)',         ruby: '콕카이',          meaning: '국회' },
        { text: '協会(きょうかい)',       ruby: '쿄ー카이',        meaning: '협회' },
        { text: '会員(かいいん)',         ruby: '카이잉',          meaning: '회원' },
        { text: '会合(かいごう)',         ruby: '카이고ー',        meaning: '회합; 모임' },
      ],
      plain: [
        { text: '会(かい)',               ruby: '카이',            meaning: '회; 모임' },
        { text: '研究会(けんきゅうかい)', ruby: '켄큐ー카이',      meaning: '연구회' },
        { text: '懇親会(こんしんかい)',   ruby: '콘싱카이',        meaning: '친목회' },
        { text: '発表会(はっぴょうかい)', ruby: '합표ー카이',      meaning: '발표회' },
        { text: '説明会(せつめいかい)',   ruby: '세츠메이카이',    meaning: '설명회' },
        { text: '同窓会(どうそうかい)',   ruby: '도ー소ー카이',    meaning: '동창회' },
        { text: '歓迎会(かんげいかい)',   ruby: '캉게이카이',      meaning: '환영회' },
        { text: '忘年会(ぼうねんかい)',   ruby: '보ー넨카이',      meaning: '망년회; 연말 모임' },
      ],
    },
    examples: [
      {
        korean:   '다음 주에 동창회가 있어.',
        japanese: '来週(らいしゅう)同窓会(どうそうかい)がある。',
        plain:    '来週同窓会がある。',
        reading:  '라이슈ー 도ー소ー카이가 아루.',
        pattern:  { name: '〜会がある', meaning: '~회가 있다', note: '会 합성어는 다양한 모임을 나타냄' },
        furigana: 'らいしゅうどうそうかいがある',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '설명회에 참가하고 싶어요.',
        japanese: '説明会(せつめいかい)に参加(さんか)したいです。',
        plain:    '説明会に参加したいです。',
        reading:  '세츠메이카이니 산카시타이데스.',
        pattern:  { name: '〜に参加する', meaning: '~에 참가하다', note: '行사·회합에 참가함을 나타냄' },
        furigana: 'せつめいかいにさんかしたいです',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '망년회는 몇 시에 시작해요?',
        japanese: '忘年会(ぼうねんかい)は何時(なんじ)から始(はじ)まりますか？',
        plain:    '忘年会は何時から始まりますか？',
        reading:  '보ー넨카이와 난지카라 하지마리마스까?',
        pattern:  { name: '〜は何時から始まりますか？', meaning: '~은 몇 시에 시작합니까?', note: '시간 확인 표현' },
        furigana: 'ぼうねんかいはなんじからはじまりますか',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 8위  子供
   * ══════════════════════════════════════════════════ */
  {
    id: 'kodomo', rank: 8, verb: '子供', reading: '코도모', meaning: '어린이; 아이',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '子供(こども)のころ',       ruby: '코도모노 코로',    meaning: '어린 시절' },
        { text: '子供(こども)たち',         ruby: '코도모타치',       meaning: '아이들' },
        { text: '子供(こども)が生(う)まれる', ruby: '코도모가 우마레루', meaning: '아이가 태어나다' },
        { text: '子供(こども)を育(そだ)てる', ruby: '코도모오 소다테루', meaning: '아이를 키우다' },
        { text: '子供(こども)向(む)け',     ruby: '코도모무케',       meaning: '어린이용' },
        { text: '子供(こども)の日(ひ)',     ruby: '코도모노 히',       meaning: '어린이날' },
        { text: '子供(こども)っぽい',       ruby: '코도못포이',       meaning: '어린애 같다' },
        { text: '子供(こども)部屋(べや)',   ruby: '코도모베야',       meaning: '어린이방' },
      ],
      plain: [
        { text: '子供(こども)',             ruby: '코도모',           meaning: '아이' },
        { text: '子ども(こども)',           ruby: '코도모',           meaning: '아이 (현대 표기)' },
        { text: '子供(こども)のころ',       ruby: '코도모노 코로',    meaning: '어린 시절' },
        { text: '子供(こども)たち',         ruby: '코도모타치',       meaning: '아이들' },
        { text: '子供(こども)らしい',       ruby: '코도모라시이',     meaning: '아이답다' },
        { text: '小(ちい)さい子(こ)',       ruby: '치이사이 코',       meaning: '어린 아이' },
        { text: '子供(こども)じみた',       ruby: '코도모지미타',     meaning: '어린애 같은' },
        { text: '子供心(こどもごころ)',     ruby: '코도모고코로',     meaning: '동심' },
      ],
    },
    examples: [
      {
        korean:   '어렸을 때 학교 가기 싫었어.',
        japanese: '子供(こども)のころ、学校(がっこう)に行(い)くのが嫌(いや)だった。',
        plain:    '子供のころ、学校に行くのが嫌だった。',
        reading:  '코도모노 코로, 각코ー니 이쿠노가 이야닷타.',
        pattern:  { name: '子供のころ', meaning: '어린 시절', note: 'ころ(시절)와 결합해 과거 시점을 나타냄' },
        furigana: 'こどものころがっこうにいくのがいやだった',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '아이를 키우는 것은 어렵지만 즐거워.',
        japanese: '子供(こども)を育(そだ)てることは大変(たいへん)だけど楽(たの)しい。',
        plain:    '子供を育てることは大変だけど楽しい。',
        reading:  '코도모오 소다테루 코토와 타이헨다케도 타노시이.',
        pattern:  { name: '子供を育てる', meaning: '아이를 키우다', note: '〜を育てる의 기본 문형' },
        furigana: 'こどもをそだてることはたいへんだけどたのしい',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 영화는 어린이용으로 만들어졌어.',
        japanese: 'この映画(えいが)は子供(こども)向(む)けに作(つく)られた。',
        plain:    'この映画は子供向けに作られた。',
        reading:  '코노 에이가와 코도모무케니 츠쿠라레타.',
        pattern:  { name: '子供向け', meaning: '어린이용; 어린이 대상', note: '〜向け는 "~를 위한/~용"을 나타내는 접미사' },
        furigana: 'このえいがはこどもむけにつくられた',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 9위  気
   * ══════════════════════════════════════════════════ */
  {
    id: 'ki', rank: 9, verb: '気', reading: '키', meaning: '기분; 기색; 마음',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '気(き)がする',     ruby: '키가 스루',      meaning: '느낌이 들다' },
        { text: '気(き)になる',     ruby: '키니 나루',      meaning: '신경 쓰이다; 마음에 걸리다' },
        { text: '気(き)をつける',   ruby: '키오 츠케루',    meaning: '조심하다; 주의하다' },
        { text: '気(き)に入(い)る', ruby: '키니 이루',      meaning: '마음에 들다' },
        { text: '気(き)持(も)ち',   ruby: '키모치',         meaning: '기분; 감정' },
        { text: '気(き)分(ぶん)',   ruby: '키붕',           meaning: '기분; 분위기' },
        { text: '元(げん)気(き)',   ruby: '겡키',           meaning: '건강; 기운' },
        { text: '本気(ほんき)',     ruby: '혼키',           meaning: '진심; 본심' },
      ],
      plain: [
        { text: '気(き)',           ruby: '키',              meaning: '기분; 기색' },
        { text: '気がする',         ruby: '키가 스루',       meaning: '느낌이 들어' },
        { text: '気になる',         ruby: '키니 나루',       meaning: '신경 쓰여' },
        { text: '気をつけて',       ruby: '키오 츠케테',     meaning: '조심해' },
        { text: '気に入った',       ruby: '키니 잇타',       meaning: '마음에 들어' },
        { text: 'やる気',           ruby: '야루키',          meaning: '의욕; 하려는 마음' },
        { text: '気が楽',           ruby: '키가 라쿠',       meaning: '마음이 편하다' },
        { text: '気にしない',       ruby: '키니 시나이',     meaning: '신경 안 써' },
      ],
    },
    examples: [
      {
        korean:   '무언가 이상한 느낌이 들어.',
        japanese: '何(なに)か変(へん)な気(き)がする。',
        plain:    '何か変な気がする。',
        reading:  '나니카 헨나 키가 스루.',
        pattern:  { name: '〜な気がする', meaning: '~한 느낌이 들다', note: '막연한 느낌·직감을 나타내는 관용 표현' },
        furigana: 'なにかへんなきがする',
        accentData: [
          { phrase_id: 0, mora_count: 8, accent: [0, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '그 사람이 계속 신경 쓰여.',
        japanese: 'あの人(ひと)のことがずっと気(き)になる。',
        plain:    'あの人のことがずっと気になる。',
        reading:  '아노 히토노 코토가 줏토 키니나루.',
        pattern:  { name: '〜が気になる', meaning: '~이/가 신경 쓰이다', note: '관심·걱정의 대상을 が로 나타내는 관용 표현' },
        furigana: 'あのひとのことがずっときになる',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '신경 쓰지 마.',
        japanese: '気(き)にしないで。',
        plain:    '気にしないで。',
        reading:  '키니시나이데.',
        pattern:  { name: '気にしないで', meaning: '신경 쓰지 마', note: '상대방을 위로·안심시키는 표현. 〜ないで는 가벼운 금지' },
        furigana: 'きにしないで',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 10위  目
   * ══════════════════════════════════════════════════ */
  {
    id: 'me', rank: 10, verb: '目', reading: '메', meaning: '눈; 시각; 눈금',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '目(め)が合(あ)う',     ruby: '메가 아우',      meaning: '눈이 마주치다' },
        { text: '目(め)を向(む)ける',   ruby: '메오 무케루',    meaning: '눈을 돌리다; 주목하다' },
        { text: '目(め)立(た)つ',       ruby: '메다츠',         meaning: '눈에 띄다' },
        { text: '目(め)指(ざ)す',       ruby: '메자스',         meaning: '목표로 하다' },
        { text: '一(ひと)目(め)',        ruby: '히토메',         meaning: '한눈; 첫눈' },
        { text: '目(め)的(てき)',        ruby: '모쿠테키',       meaning: '목적' },
        { text: '注(ちゅう)目(もく)',   ruby: '추ー모쿠',       meaning: '주목' },
        { text: '見(み)た目(め)',        ruby: '미타메',         meaning: '외모; 겉모습' },
      ],
      plain: [
        { text: '目(め)',               ruby: '메',              meaning: '눈' },
        { text: '目(め)が合う',         ruby: '메가 아우',       meaning: '눈이 마주쳐' },
        { text: '目(め)立つ',           ruby: '메다츠',          meaning: '눈에 띄어' },
        { text: '目(め)を閉(と)じる',   ruby: '메오 토지루',     meaning: '눈을 감다' },
        { text: '見(み)た目(め)',        ruby: '미타메',          meaning: '외모; 겉모습' },
        { text: '目(め)が覚(さ)める',   ruby: '메가 사메루',     meaning: '눈이 뜨이다; 잠이 깨다' },
        { text: '目(め)を細(ほそ)める', ruby: '메오 호소메루',   meaning: '눈을 가늘게 뜨다' },
        { text: '目(め)の前(まえ)',      ruby: '메노 마에',       meaning: '눈앞; 바로 앞' },
      ],
    },
    examples: [
      {
        korean:   '저도 모르게 눈이 마주쳤어.',
        japanese: 'ついあの人(ひと)と目(め)が合(あ)ってしまった。',
        plain:    'ついあの人と目が合ってしまった。',
        reading:  '츠이 아노 히토토 메가 앗테시맛타.',
        pattern:  { name: '目が合う', meaning: '눈이 마주치다', note: '우연히 시선이 만남을 나타내는 관용 표현' },
        furigana: 'ついあのひとともがあってしまった',
        accentData: [
          { phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '저 사람은 항상 눈에 띄어.',
        japanese: 'あの人(ひと)はいつも目(め)立(た)つ。',
        plain:    'あの人はいつも目立つ。',
        reading:  '아노 히토와 이츠모 메다츠.',
        pattern:  { name: '目立つ', meaning: '눈에 띄다; 두드러지다', note: '목 합성어 목+立つ. 주목받는 상태를 나타냄' },
        furigana: 'あのひとはいつもめだつ',
        accentData: [
          { phrase_id: 0, mora_count: 9, accent: [0, 1, 1, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '외모로 판단하지 마.',
        japanese: '見(み)た目(め)で判断(はんだん)しないで。',
        plain:    '見た目で判断しないで。',
        reading:  '미타메데 한당시나이데.',
        pattern:  { name: '見た目', meaning: '외모; 겉모습', note: '見る(보다) + 目의 복합어. 겉으로 보이는 모습을 나타냄' },
        furigana: 'みためではんだんしないで',
        accentData: [
          { phrase_id: 0, mora_count: 11, accent: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ── 11~100위: 스텁 ─────────────────────────────── */
  { id: 'shi',      rank: 11,  verb: '市',       reading: '시',       meaning: '시 (행정구역)',           conjugations: null, examples: [] },
  { id: 'shakai',   rank: 12,  verb: '社会',     reading: '샤카이',   meaning: '사회',                   conjugations: null, examples: [] },
  { id: 'jigyou',   rank: 13,  verb: '事業',     reading: '지교ー',   meaning: '사업',                   conjugations: null, examples: [] },
  { id: 'sekai',    rank: 14,  verb: '世界',     reading: '세카이',   meaning: '세계; 세상',             conjugations: null, examples: [] },
  { id: 'ningen',   rank: 15,  verb: '人間',     reading: '닝겐',     meaning: '인간; 사람',             conjugations: null, examples: [] },
  { id: 'tsugi',    rank: 16,  verb: '次',       reading: '츠기',     meaning: '다음',                   conjugations: null, examples: [] },
  { id: 'hou_law',  rank: 17,  verb: '法',       reading: '호ー',     meaning: '법; 법률',               conjugations: null, examples: [] },
  { id: 'kaisha',   rank: 18,  verb: '会社',     reading: '카이샤',   meaning: '회사',                   conjugations: null, examples: [] },
  { id: 'otoko',    rank: 19,  verb: '男',       reading: '오토코',   meaning: '남자; 남성',             conjugations: null, examples: [] },
  { id: 'chiiki',   rank: 20,  verb: '地域',     reading: '치이키',   meaning: '지역',                   conjugations: null, examples: [] },
  { id: 'kao',      rank: 21,  verb: '顔',       reading: '카오',     meaning: '얼굴',                   conjugations: null, examples: [] },
  { id: 'jouhou',   rank: 22,  verb: '情報',     reading: '죠ー호ー', meaning: '정보',                   conjugations: null, examples: [] },
  { id: 'zu',       rank: 23,  verb: '図',       reading: '즈',       meaning: '그림; 도표; 도면',       conjugations: null, examples: [] },
  { id: 'kotoba',   rank: 24,  verb: '言葉',     reading: '코토바',   meaning: '말; 언어; 단어',         conjugations: null, examples: [] },
  { id: 'kuni',     rank: 25,  verb: '国',       reading: '쿠니',     meaning: '나라; 국가',             conjugations: null, examples: [] },
  { id: 'ken',      rank: 26,  verb: '県',       reading: '켄',       meaning: '현 (행정 단위)',         conjugations: null, examples: [] },
  { id: 'gakkou',   rank: 27,  verb: '学校',     reading: '각코ー',   meaning: '학교',                   conjugations: null, examples: [] },
  { id: 'kigyou',   rank: 28,  verb: '企業',     reading: '키교ー',   meaning: '기업',                   conjugations: null, examples: [] },
  { id: 'iin',      rank: 29,  verb: '委員',     reading: '이잉',     meaning: '위원',                   conjugations: null, examples: [] },
  { id: 'jidai',    rank: 30,  verb: '時代',     reading: '지다이',   meaning: '시대',                   conjugations: null, examples: [] },
  { id: 'hontou',   rank: 31,  verb: '本当',     reading: '혼토ー',   meaning: '정말; 진짜',             conjugations: null, examples: [] },
  { id: 'mono',     rank: 32,  verb: '者',       reading: '모노',     meaning: '사람; 자 (자격)',        conjugations: null, examples: [] },
  { id: 'koe',      rank: 33,  verb: '声',       reading: '코에',     meaning: '목소리; 소리',           conjugations: null, examples: [] },
  { id: 'ie',       rank: 34,  verb: '家',       reading: '이에',     meaning: '집; 가정',               conjugations: null, examples: [] },
  { id: 'houhou',   rank: 35,  verb: '方法',     reading: '호ー호ー', meaning: '방법',                   conjugations: null, examples: [] },
  { id: 'keizai',   rank: 36,  verb: '経済',     reading: '케이자이', meaning: '경제',                   conjugations: null, examples: [] },
  { id: 'josei',    rank: 37,  verb: '女性',     reading: '죠세이',   meaning: '여성',                   conjugations: null, examples: [] },
  { id: 'tomo',     rank: 38,  verb: '共',       reading: '토모',     meaning: '함께; 모두',             conjugations: null, examples: [] },
  { id: 'nendo',    rank: 39,  verb: '年度',     reading: '넨도',     meaning: '연도 (회계·학사)',       conjugations: null, examples: [] },
  { id: 'kankyou',  rank: 40,  verb: '環境',     reading: '캉쿄ー',   meaning: '환경',                   conjugations: null, examples: [] },
  { id: 'ko',       rank: 41,  verb: '子',       reading: '코',       meaning: '아이; 자식',             conjugations: null, examples: [] },
  { id: 'aite',     rank: 42,  verb: '相手',     reading: '아이테',   meaning: '상대; 상대방',           conjugations: null, examples: [] },
  { id: 'joukyou',  rank: 43,  verb: '状況',     reading: '죠ー쿄ー', meaning: '상황',                   conjugations: null, examples: [] },
  { id: 'onna',     rank: 44,  verb: '女',       reading: '온나',     meaning: '여자; 여성',             conjugations: null, examples: [] },
  { id: 'chi',      rank: 45,  verb: '地',       reading: '치',       meaning: '땅; 지역; 배경',         conjugations: null, examples: [] },
  { id: 'gijutsu',  rank: 46,  verb: '技術',     reading: '기쥬츠',   meaning: '기술',                   conjugations: null, examples: [] },
  { id: 'daigaku',  rank: 47,  verb: '大学',     reading: '다이가쿠', meaning: '대학; 대학교',           conjugations: null, examples: [] },
  { id: 'sensei',   rank: 48,  verb: '先生',     reading: '센세이',   meaning: '선생님',                 conjugations: null, examples: [] },
  { id: 'naiyou',   rank: 49,  verb: '内容',     reading: '나이요ー', meaning: '내용',                   conjugations: null, examples: [] },
  { id: 'shashin',  rank: 50,  verb: '写真',     reading: '샤싱',     meaning: '사진',                   conjugations: null, examples: [] },
  { id: 'hoken',    rank: 51,  verb: '保険',     reading: '호켄',     meaning: '보험',                   conjugations: null, examples: [] },
  { id: 'basho',    rank: 52,  verb: '場所',     reading: '바쇼',     meaning: '장소',                   conjugations: null, examples: [] },
  { id: 'hazu',     rank: 53,  verb: '筈',       reading: '하즈',     meaning: '~할 것임 (형식명사)',    conjugations: null, examples: [] },
  { id: 'joutai',   rank: 54,  verb: '状態',     reading: '죠ー타이', meaning: '상태',                   conjugations: null, examples: [] },
  { id: 'ippan',    rank: 55,  verb: '一般',     reading: '잇판',     meaning: '일반',                   conjugations: null, examples: [] },
  { id: 'bubun',    rank: 56,  verb: '部分',     reading: '부붕',     meaning: '부분',                   conjugations: null, examples: [] },
  { id: 'seifu',    rank: 57,  verb: '政府',     reading: '세이후',   meaning: '정부',                   conjugations: null, examples: [] },
  { id: 'seido',    rank: 58,  verb: '制度',     reading: '세이도',   meaning: '제도',                   conjugations: null, examples: [] },
  { id: 'taishou',  rank: 59,  verb: '対象',     reading: '타이쇼ー', meaning: '대상',                   conjugations: null, examples: [] },
  { id: 'kimochi',  rank: 60,  verb: '気持ち',   reading: '키모치',   meaning: '기분; 마음',             conjugations: null, examples: [] },
  { id: 'kihon',    rank: 61,  verb: '基本',     reading: '키홍',     meaning: '기본',                   conjugations: null, examples: [] },
  { id: 'karada',   rank: 62,  verb: '体',       reading: '카라다',   meaning: '몸; 신체',               conjugations: null, examples: [] },
  { id: 'atama',    rank: 63,  verb: '頭',       reading: '아타마',   meaning: '머리',                   conjugations: null, examples: [] },
  { id: 'kou',      rank: 64,  verb: '項',       reading: '코ー',     meaning: '항목; 조항',             conjugations: null, examples: [] },
  { id: 'mizu',     rank: 65,  verb: '水',       reading: '미즈',     meaning: '물',                     conjugations: null, examples: [] },
  { id: 'hyou',     rank: 66,  verb: '表',       reading: '효ー',     meaning: '표; 테이블',             conjugations: null, examples: [] },
  { id: 'chihou',   rank: 67,  verb: '地方',     reading: '치호ー',   meaning: '지방; 지역',             conjugations: null, examples: [] },
  { id: 'kuruma',   rank: 68,  verb: '車',       reading: '쿠루마',   meaning: '자동차; 차',             conjugations: null, examples: [] },
  { id: 'kuchi',    rank: 69,  verb: '口',       reading: '쿠치',     meaning: '입; 입구',               conjugations: null, examples: [] },
  { id: 'katachi',  rank: 70,  verb: '形',       reading: '카타치',   meaning: '형태; 모양',             conjugations: null, examples: [] },
  { id: 'jiken',    rank: 71,  verb: '事件',     reading: '지켄',     meaning: '사건',                   conjugations: null, examples: [] },
  { id: 'go',       rank: 72,  verb: '語',       reading: '고',       meaning: '단어; 말; 언어',         conjugations: null, examples: [] },
  { id: 'kokumin',  rank: 73,  verb: '国民',     reading: '코쿠민',   meaning: '국민',                   conjugations: null, examples: [] },
  { id: 'teido',    rank: 74,  verb: '程度',     reading: '테이도',   meaning: '정도',                   conjugations: null, examples: [] },
  { id: 'chuushin', rank: 75,  verb: '中心',     reading: '추ー싱',   meaning: '중심',                   conjugations: null, examples: [] },
  { id: 'kikan',    rank: 76,  verb: '機関',     reading: '키캉',     meaning: '기관',                   conjugations: null, examples: [] },
  { id: 'sentaa',   rank: 77,  verb: 'センター', reading: '센타ー',   meaning: '센터',                   conjugations: null, examples: [] },
  { id: 'bunka',    rank: 78,  verb: '文化',     reading: '붕카',     meaning: '문화',                   conjugations: null, examples: [] },
  { id: 'kokusai',  rank: 79,  verb: '国際',     reading: '코쿠사이', meaning: '국제',                   conjugations: null, examples: [] },
  { id: 'gaku',     rank: 80,  verb: '額',       reading: '가쿠',     meaning: '금액; 액수',             conjugations: null, examples: [] },
  { id: 'mokuteki', rank: 81,  verb: '目的',     reading: '모쿠테키', meaning: '목적',                   conjugations: null, examples: [] },
  { id: 'sugata',   rank: 82,  verb: '姿',       reading: '스가타',   meaning: '모습; 자태',             conjugations: null, examples: [] },
  { id: 'warai',    rank: 83,  verb: '笑い',     reading: '와라이',   meaning: '웃음',                   conjugations: null, examples: [] },
  { id: 'heya',     rank: 84,  verb: '部屋',     reading: '헤야',     meaning: '방',                     conjugations: null, examples: [] },
  { id: 'kanji',    rank: 85,  verb: '感じ',     reading: '칸지',     meaning: '느낌; 인상',             conjugations: null, examples: [] },
  { id: 'chikara',  rank: 86,  verb: '力',       reading: '치카라',   meaning: '힘; 능력',               conjugations: null, examples: [] },
  { id: 'jitsu',    rank: 87,  verb: '実',       reading: '지츠',     meaning: '사실; 실제',             conjugations: null, examples: [] },
  { id: 'shugi',    rank: 88,  verb: '主義',     reading: '슈기',     meaning: '주의; 이즘',             conjugations: null, examples: [] },
  { id: 'kane',     rank: 89,  verb: '金',       reading: '카네',     meaning: '돈',                     conjugations: null, examples: [] },
  { id: 'ritsu',    rank: 90,  verb: '率',       reading: '리츠',     meaning: '비율; 율',               conjugations: null, examples: [] },
  { id: 'riyuu',    rank: 91,  verb: '理由',     reading: '리유ー',   meaning: '이유',                   conjugations: null, examples: [] },
  { id: 'zentai',   rank: 92,  verb: '全体',     reading: '젠타이',   meaning: '전체',                   conjugations: null, examples: [] },
  { id: 'shita',    rank: 93,  verb: '下',       reading: '시타',     meaning: '아래; 하',               conjugations: null, examples: [] },
  { id: 'saigo',    rank: 94,  verb: '最後',     reading: '사이고',   meaning: '마지막; 최후',           conjugations: null, examples: [] },
  { id: 'gawa',     rank: 95,  verb: '側',       reading: '가와',     meaning: '쪽; 측',                 conjugations: null, examples: [] },
  { id: 'kazoku',   rank: 96,  verb: '家族',     reading: '카조쿠',   meaning: '가족',                   conjugations: null, examples: [] },
  { id: 'kouka',    rank: 97,  verb: '効果',     reading: '코ー카',   meaning: '효과',                   conjugations: null, examples: [] },
  { id: 'ryou',     rank: 98,  verb: '量',       reading: '료ー',     meaning: '양; 분량',               conjugations: null, examples: [] },
  { id: 'hitobito', rank: 99,  verb: '人々',     reading: '히토비토', meaning: '사람들',                 conjugations: null, examples: [] },
  { id: 'ika',      rank: 100, verb: '以下',     reading: '이카',     meaning: '이하',                   conjugations: null, examples: [] },
]
