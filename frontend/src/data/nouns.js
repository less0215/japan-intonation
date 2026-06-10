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

  /* ══════════════════════════════════════════════════
   * 11위  市
   * ══════════════════════════════════════════════════ */
  {
    id: 'shi', rank: 11, verb: '市', reading: '시', meaning: '시 (행정구역)',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '○○市(し)に住(す)んでいます',   ruby: '○○시니 슨데이마스',   meaning: '○○시에 살고 있습니다' },
        { text: '市役所(しやくしょ)に行(い)く', ruby: '시야쿠쇼니 이쿠',       meaning: '시청에 가다' },
        { text: '市立(しりつ)病院(びょういん)', ruby: '시리츠 뵤ー인',          meaning: '시립 병원' },
        { text: '市内(しない)を走(はし)るバス', ruby: '시나이오 하시루 바스',   meaning: '시내를 달리는 버스' },
        { text: '市長(しちょう)選挙(せんきょ)', ruby: '시쵸ー 센쿄',            meaning: '시장 선거' },
        { text: '隣(となり)の市(し)',           ruby: '토나리노 시',             meaning: '인근 시' },
        { text: '政令(せいれい)指定都市(していとし)', ruby: '세이레이 시테이 토시', meaning: '정령 지정 도시' },
        { text: '○○市(し)出身(しゅっしん)',   ruby: '○○시 슛신',              meaning: '○○시 출신' },
      ],
      plain: [
        { text: '市(し)',          ruby: '시',       meaning: '시' },
        { text: '市内(しない)',    ruby: '시나이',   meaning: '시내' },
        { text: '市役所(しやくしょ)', ruby: '시야쿠쇼', meaning: '시청' },
        { text: '市民(しみん)',    ruby: '시민',     meaning: '시민' },
        { text: '市長(しちょう)', ruby: '시쵸ー',    meaning: '시장' },
        { text: '市街(しがい)',    ruby: '시가이',   meaning: '시가지' },
        { text: '市立(しりつ)',    ruby: '시리츠',   meaning: '시립' },
        { text: '市場(いちば)',    ruby: '이치바',   meaning: '시장 (재래시장)' },
      ],
    },
    examples: [
      {
        korean:   '도쿄도는 23구와 시·정·촌으로 이루어져 있어.',
        japanese: '東京都(とうきょうと)は23区(く)と市町村(しちょうそん)から成(な)り立(た)っている。',
        plain:    '東京都は23区と市町村から成り立っている。',
        reading:  '토ー쿄ー토와 니쥬ー산쿠토 시쵸ー손카라 나리탓테이루.',
        pattern:  { name: '市町村', meaning: '시·정·촌 (행정구역)', note: '일본의 기초 지방자치단체. 市(인구 많음)·町(중간)·村(적음) 순' },
        furigana: 'とうきょうとはにじゅうさんくとしちょうそんからなりたっている',
        accentData: [
          { phrase_id: 0, mora_count: 30, accent: [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '시청에서 주민등록등본을 받았습니다.',
        japanese: '市役所(しやくしょ)で住民票(じゅうみんひょう)を取(と)りました。',
        plain:    '市役所で住民票を取った。',
        reading:  '시야쿠쇼데 쥬ー민효ー오 토리마시타.',
        pattern:  { name: '市役所で〜を取る', meaning: '시청에서 ~을 발급받다', note: '市役所는 시 행정업무를 처리하는 관청' },
        furigana: 'しやくしょでじゅうみんひょうをとりました',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '이 시에는 유명한 온천이 있습니다.',
        japanese: 'この市(し)には有名(ゆうめい)な温泉(おんせん)があります。',
        plain:    'この市には有名な温泉がある。',
        reading:  '코노 시니와 유ー메이나 온센가 아리마스.',
        pattern:  { name: '〜には〜がある', meaning: '~에는 ~이/가 있다', note: '특정 장소의 특징을 소개하는 표현' },
        furigana: 'このしにはゆうめいなおんせんがあります',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 12위  社会
   * ══════════════════════════════════════════════════ */
  {
    id: 'shakai', rank: 12, verb: '社会', reading: '샤카이', meaning: '사회',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '社会(しゃかい)に出(で)る',           ruby: '샤카이니 데루',          meaning: '사회에 나가다' },
        { text: '社会(しゃかい)に貢献(こうけん)する', ruby: '샤카이니 코ー켄스루',    meaning: '사회에 공헌하다' },
        { text: '社会(しゃかい)的(てき)な責任(せきにん)', ruby: '샤카이테키나 세키닌', meaning: '사회적 책임' },
        { text: '社会(しゃかい)問題(もんだい)',        ruby: '샤카이 몬다이',          meaning: '사회 문제' },
        { text: '社会(しゃかい)保障(ほしょう)',        ruby: '샤카이 호쇼ー',          meaning: '사회 보장' },
        { text: '社会(しゃかい)全体(ぜんたい)で',      ruby: '샤카이 젠타이데',        meaning: '사회 전체가 함께' },
        { text: '高齢化(こうれいか)社会(しゃかい)',    ruby: '코ー레이카 샤카이',      meaning: '고령화 사회' },
        { text: '社会(しゃかい)の仕組(しく)み',        ruby: '샤카이노 시쿠미',        meaning: '사회의 구조' },
      ],
      plain: [
        { text: '社会(しゃかい)',      ruby: '샤카이',     meaning: '사회' },
        { text: '社会人(しゃかいじん)', ruby: '샤카이진',   meaning: '사회인' },
        { text: '社会的(しゃかいてき)', ruby: '샤카이테키', meaning: '사회적' },
        { text: '社会科(しゃかいか)',  ruby: '샤카이카',   meaning: '사회과 (교과목)' },
        { text: '社会保険(しゃかいほけん)', ruby: '샤카이 호켄', meaning: '사회 보험' },
        { text: '社会貢献(しゃかいこうけん)', ruby: '샤카이 코ー켄', meaning: '사회 공헌' },
        { text: '社会復帰(しゃかいふっき)', ruby: '샤카이 훗키', meaning: '사회 복귀' },
        { text: '情報(じょうほう)社会(しゃかい)', ruby: '죠ー호ー 샤카이', meaning: '정보 사회' },
      ],
    },
    examples: [
      {
        korean:   '사회에 나온 뒤로 예절의 중요성을 알았어.',
        japanese: '社会(しゃかい)に出(で)てから礼儀(れいぎ)の大切(たいせつ)さを知(し)った。',
        plain:    '社会に出てから礼儀の大切さを知った。',
        reading:  '샤카이니 데테카라 레이기노 타이세츠사오 싯타.',
        pattern:  { name: '〜てから〜を知る', meaning: '~하고 나서 ~을 알다', note: '경험을 통해 무언가를 깨달았을 때 사용하는 표현' },
        furigana: 'しゃかいにでてかられいぎのたいせつさをしった',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1] },
        ],
      },
      {
        korean:   '환경 문제는 사회 전체가 대처할 필요가 있어.',
        japanese: '環境問題(かんきょうもんだい)は社会全体(しゃかいぜんたい)で取(と)り組(く)む必要(ひつよう)がある。',
        plain:    '環境問題は社会全体で取り組む必要がある。',
        reading:  '칸쿄ー 몬다이와 샤카이 젠타이데 토리쿠무 히츠요ー가 아루.',
        pattern:  { name: '〜で取り組む', meaning: '~가 대처하다; 함께 임하다', note: '문제 해결에 적극적으로 임하는 뉘앙스' },
        furigana: 'かんきょうもんだいはしゃかいぜんたいでとりくむひつようがある',
        accentData: [
          { phrase_id: 0, mora_count: 30, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '고령화 사회에 대한 대책이 시급해지고 있어.',
        japanese: '高齢化(こうれいか)社会(しゃかい)への対策(たいさく)が急(いそ)がれている。',
        plain:    '高齢化社会への対策が急がれている。',
        reading:  '코ー레이카 샤카이에노 타이사쿠가 이소가레테이루.',
        pattern:  { name: '〜への対策が急がれる', meaning: '~에 대한 대책이 시급하다', note: '수동형 急がれる로 사회적 필요성을 나타냄' },
        furigana: 'こうれいかしゃかいへのたいさくがいそがれている',
        accentData: [
          { phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 13위  事業
   * ══════════════════════════════════════════════════ */
  {
    id: 'jigyou', rank: 13, verb: '事業', reading: '지교ー', meaning: '사업',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '事業(じぎょう)を始(はじ)める',       ruby: '지교ー오 하지메루',    meaning: '사업을 시작하다' },
        { text: '事業(じぎょう)を拡大(かくだい)する', ruby: '지교ー오 카쿠다이스루', meaning: '사업을 확대하다' },
        { text: '事業(じぎょう)計画(けいかく)',        ruby: '지교ー 케이카쿠',      meaning: '사업 계획' },
        { text: '事業(じぎょう)を継続(けいぞく)する', ruby: '지교ー오 케이조쿠스루', meaning: '사업을 계속하다' },
        { text: '新規(しんき)事業(じぎょう)',          ruby: '신키 지교ー',           meaning: '신규 사업' },
        { text: '事業(じぎょう)主(ぬし)',              ruby: '지교ー누시',            meaning: '사업주' },
        { text: '社会(しゃかい)事業(じぎょう)',        ruby: '샤카이 지교ー',         meaning: '사회 사업' },
        { text: '事業(じぎょう)に参加(さんか)する',   ruby: '지교ー니 산카스루',     meaning: '사업에 참가하다' },
      ],
      plain: [
        { text: '事業(じぎょう)',        ruby: '지교ー',       meaning: '사업' },
        { text: '事業所(じぎょうしょ)', ruby: '지교ー쇼',     meaning: '사업소; 사업장' },
        { text: '事業主(じぎょうぬし)', ruby: '지교ー누시',   meaning: '사업주' },
        { text: '事業者(じぎょうしゃ)', ruby: '지교ー샤',     meaning: '사업자' },
        { text: '本業(ほんぎょう)',      ruby: '혼교ー',       meaning: '본업' },
        { text: '副業(ふくぎょう)',      ruby: '후쿠교ー',     meaning: '부업' },
        { text: '起業(きぎょう)',        ruby: '키교ー',       meaning: '창업' },
        { text: '廃業(はいぎょう)',      ruby: '하이교ー',     meaning: '폐업' },
      ],
    },
    examples: [
      {
        korean:   '새로운 사업을 시작했습니다.',
        japanese: '新(あたら)しい事業(じぎょう)を立(た)ち上(あ)げました。',
        plain:    '新しい事業を立ち上げた。',
        reading:  '아타라시이 지교ー오 타치아게마시타.',
        pattern:  { name: '〜を立ち上げる', meaning: '~을 설립하다; 시작하다', note: '사업·조직·프로젝트를 새로 시작할 때 쓰는 표현' },
        furigana: 'あたらしいじぎょうをたちあげました',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '그 사업은 큰 이익을 가져왔어.',
        japanese: 'その事業(じぎょう)は大(おお)きな利益(りえき)をもたらした。',
        plain:    'その事業は大きな利益をもたらした。',
        reading:  '소노 지교ー와 오ー키나 리에키오 모타라시타.',
        pattern:  { name: '〜をもたらす', meaning: '~을 가져오다; 초래하다', note: '결과·이익·해를 가져올 때 사용하는 격식 표현' },
        furigana: 'そのじぎょうはおおきなりえきをもたらした',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '환경 보호 사업에 참여하고 있어요.',
        japanese: '環境保護(かんきょうほご)の事業(じぎょう)に参加(さんか)しています。',
        plain:    '環境保護の事業に参加している。',
        reading:  '칸쿄ー호고노 지교ー니 산카시테이마스.',
        pattern:  { name: '〜に参加する', meaning: '~에 참가하다', note: '사업·행사·활동에 참여할 때 사용하는 기본 표현' },
        furigana: 'かんきょうほごのじぎょうにさんかしています',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 14위  世界
   * ══════════════════════════════════════════════════ */
  {
    id: 'sekai', rank: 14, verb: '世界', reading: '세카이', meaning: '세계; 세상',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '世界中(せかいじゅう)に',           ruby: '세카이쥬ー니',          meaning: '세계 곳곳에' },
        { text: '世界(せかい)で活躍(かつやく)する', ruby: '세카이데 카츠야쿠스루', meaning: '세계에서 활약하다' },
        { text: '世界遺産(せかいいさん)',            ruby: '세카이 이산',           meaning: '세계 유산' },
        { text: '世界平和(せかいへいわ)',            ruby: '세카이 헤이와',         meaning: '세계 평화' },
        { text: '世界(せかい)的(てき)に有名(ゆうめい)', ruby: '세카이테키니 유ー메이', meaning: '세계적으로 유명한' },
        { text: '世界(せかい)一(いち)',              ruby: '세카이이치',            meaning: '세계 최고; 세계 1위' },
        { text: '世界(せかい)の人々(ひとびと)',      ruby: '세카이노 히토비토',     meaning: '세계의 사람들' },
        { text: '世界(せかい)経済(けいざい)',        ruby: '세카이 케이자이',       meaning: '세계 경제' },
      ],
      plain: [
        { text: '世界(せかい)',        ruby: '세카이',     meaning: '세계' },
        { text: '世界中(せかいじゅう)', ruby: '세카이쥬ー', meaning: '세계 전체; 세계 곳곳' },
        { text: '世界遺産(せかいいさん)', ruby: '세카이이산', meaning: '세계 유산' },
        { text: '世界観(せかいかん)', ruby: '세카이칸',    meaning: '세계관' },
        { text: '世界一(せかいいち)', ruby: '세카이이치', meaning: '세계 1위' },
        { text: '別世界(べっせかい)',  ruby: '벳세카이',   meaning: '별세계; 다른 세상' },
        { text: '下(した)の世界(せかい)', ruby: '시타노 세카이', meaning: '지하 세계' },
        { text: '夢(ゆめ)の世界(せかい)', ruby: '유메노 세카이', meaning: '꿈의 세계' },
      ],
    },
    examples: [
      {
        korean:   '세계 곳곳의 사람들이 평화를 바라고 있어.',
        japanese: '世界中(せかいじゅう)の人々(ひとびと)が平和(へいわ)を望(のぞ)んでいる。',
        plain:    '世界中の人々が平和を望んでいる。',
        reading:  '세카이쥬ーノ히토비토가 헤이와오 노존데이루.',
        pattern:  { name: '〜を望む', meaning: '~을/를 바라다; 원하다', note: '희망·소망을 나타내는 격식 있는 표현' },
        furigana: 'せかいじゅうのひとびとがへいわをのぞんでいる',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '그녀는 세계에서 활약하는 아티스트야.',
        japanese: '彼女(かのじょ)は世界(せかい)で活躍(かつやく)するアーティストだ。',
        plain:    '彼女は世界で活躍するアーティストだ。',
        reading:  '카노죠와 세카이데 카츠야쿠스루 아ー티스토다.',
        pattern:  { name: '世界で活躍する', meaning: '세계에서 활약하다', note: '国際的な規模で活動することを指す표현' },
        furigana: 'かのじょはせかいでかつやくするあーてぃすとだ',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '세계 유산을 방문하는 게 꿈이에요.',
        japanese: '世界遺産(せかいいさん)を訪(おとず)れるのが夢(ゆめ)です。',
        plain:    '世界遺産を訪れるのが夢だ。',
        reading:  '세카이이산오 오토즈레루노가 유메데스.',
        pattern:  { name: '〜のが夢です', meaning: '~하는 것이 꿈입니다', note: '동사 원형 + のが + 夢です. 꿈·목표를 말하는 기본 표현' },
        furigana: 'せかいいさんをおとずれるのがゆめです',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 15위  人間
   * ══════════════════════════════════════════════════ */
  {
    id: 'ningen', rank: 15, verb: '人間', reading: '닝겐', meaning: '인간; 사람',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '人間(にんげん)関係(かんけい)',         ruby: '닝겐 칸케이',          meaning: '인간관계' },
        { text: '人間(にんげん)として大切(たいせつ)な', ruby: '닝겐토시테 타이세츠나', meaning: '인간으로서 중요한' },
        { text: '人間(にんげん)らしい生(い)き方(かた)', ruby: '닝겐라시이 이키카타',   meaning: '인간다운 삶의 방식' },
        { text: '人間(にんげん)の可能性(かのうせい)',   ruby: '닝겐노 카노ー세이',     meaning: '인간의 가능성' },
        { text: '人間(にんげん)性(せい)',               ruby: '닝겐세이',             meaning: '인간성' },
        { text: '人間(にんげん)ドラマ',                 ruby: '닝겐 도라마',          meaning: '인간 드라마' },
        { text: '人間(にんげん)社会(しゃかい)',         ruby: '닝겐 샤카이',          meaning: '인간 사회' },
        { text: '人間(にんげん)は〜な動物(どうぶつ)',   ruby: '닝겐와 〜나 도ー부츠', meaning: '인간은 ~한 동물이다' },
      ],
      plain: [
        { text: '人間(にんげん)',        ruby: '닝겐',       meaning: '인간' },
        { text: '人間関係(にんげんかんけい)', ruby: '닝겐 칸케이', meaning: '인간관계' },
        { text: '人間性(にんげんせい)',  ruby: '닝겐세이',   meaning: '인간성' },
        { text: '人間味(にんげんみ)',    ruby: '닝겐미',     meaning: '인간미' },
        { text: '人間離れ(にんげんばなれ)', ruby: '닝겐바나레', meaning: '인간을 벗어난 (능력 등)' },
        { text: '人間ドック',           ruby: '닝겐 독쿠',  meaning: '종합 건강검진' },
        { text: '人間力(にんげんりょく)', ruby: '닝겐료쿠',  meaning: '인간력; 인성' },
        { text: '非人間的(ひにんげんてき)', ruby: '히닝겐테키', meaning: '비인간적' },
      ],
    },
    examples: [
      {
        korean:   '인간은 사회적 동물이라고 한다.',
        japanese: '人間(にんげん)は社会(しゃかい)的(てき)な動物(どうぶつ)だと言(い)われている。',
        plain:    '人間は社会的な動物だと言われている。',
        reading:  '닝겐와 샤카이테키나 도ー부츠다토 이와레테이루.',
        pattern:  { name: '〜だと言われている', meaning: '~라고 알려져 있다; ~라고 한다', note: '일반적으로 알려진 사실을 나타내는 수동 표현' },
        furigana: 'にんげんはしゃかいてきなどうぶつだといわれている',
        accentData: [
          { phrase_id: 0, mora_count: 24, accent: [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '인간관계를 소중히 하는 것이 중요해.',
        japanese: '人間関係(にんげんかんけい)を大切(たいせつ)にすることが重要(じゅうよう)だ。',
        plain:    '人間関係を大切にすることが重要だ。',
        reading:  '닝겐 칸케이오 타이세츠니 스루코토가 쥬ー요ー다.',
        pattern:  { name: '〜を大切にする', meaning: '~을/를 소중히 하다', note: '관계·물건·가치를 소중하게 여기는 행동을 나타냄' },
        furigana: 'にんげんかんけいをたいせつにすることがじゅうようだ',
        accentData: [
          { phrase_id: 0, mora_count: 25, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '인간의 가능성은 무한해.',
        japanese: '人間(にんげん)の可能性(かのうせい)は無限大(むげんだい)だ。',
        plain:    '人間の可能性は無限大だ。',
        reading:  '닝겐노 카노ー세이와 무겐다이다.',
        pattern:  { name: '〜は無限大だ', meaning: '~은/는 무한하다', note: '가능성·잠재력이 끝이 없음을 강조하는 표현' },
        furigana: 'にんげんのかのうせいはむげんだいだ',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 16위  次
   * ══════════════════════════════════════════════════ */
  {
    id: 'tsugi', rank: 16, verb: '次', reading: '츠기', meaning: '다음',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '次(つぎ)の電車(でんしゃ)',           ruby: '츠기노 덴샤',        meaning: '다음 전철' },
        { text: '次(つぎ)の目標(もくひょう)',         ruby: '츠기노 모쿠효ー',    meaning: '다음 목표' },
        { text: '次(つぎ)回(かい)',                   ruby: '지카이',             meaning: '다음번; 다음 회' },
        { text: '次(つぎ)の段階(だんかい)',           ruby: '츠기노 단카이',      meaning: '다음 단계' },
        { text: '次(つぎ)の方(かた)',                 ruby: '츠기노 카타',        meaning: '다음 분 (순서)' },
        { text: '次(つぎ)々(つぎ)と',                ruby: '츠기츠기토',         meaning: '잇달아; 차례차례' },
        { text: '次(つぎ)世代(せだい)',              ruby: '지세다이',           meaning: '다음 세대' },
        { text: '次(つぎ)第(だい)',                  ruby: '시다이',             meaning: '차례; 순서대로' },
      ],
      plain: [
        { text: '次(つぎ)',          ruby: '츠기',     meaning: '다음' },
        { text: '次回(じかい)',      ruby: '지카이',   meaning: '다음번' },
        { text: '次第(しだい)',      ruby: '시다이',   meaning: '차례; ~하는 대로' },
        { text: '次世代(じせだい)', ruby: '지세다이', meaning: '다음 세대' },
        { text: '次々(つぎつぎ)',   ruby: '츠기츠기', meaning: '잇달아; 차례차례' },
        { text: 'お次(つぎ)',        ruby: '오츠기',   meaning: '다음 (정중)' },
        { text: '順次(じゅんじ)',   ruby: '준지',     meaning: '순차적으로' },
        { text: '次点(じてん)',      ruby: '지텐',     meaning: '차점; 2위' },
      ],
    },
    examples: [
      {
        korean:   '다음 전철은 5분 후에 옵니다.',
        japanese: '次(つぎ)の電車(でんしゃ)は5分後(ごふんご)に来(き)ます。',
        plain:    '次の電車は5分後に来る。',
        reading:  '츠기노 덴샤와 고훈고니 키마스.',
        pattern:  { name: '次の〜は〜に来る', meaning: '다음 ~은 ~에 오다', note: '교통수단 도착 시각을 안내하는 표현' },
        furigana: 'つぎのでんしゃはごふんごにきます',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '다음번에는 더 잘하고 싶어.',
        japanese: '次回(じかい)はもっとうまくやりたい。',
        plain:    '次回はもっとうまくやりたい。',
        reading:  '지카이와 못토 우마쿠 야리타이.',
        pattern:  { name: '次回はもっと〜たい', meaning: '다음번에는 더 ~하고 싶다', note: '반성 후 다음을 향한 의욕을 나타내는 표현' },
        furigana: 'じかいはもっとうまくやりたい',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '다음 목표를 향해 열심히 하자.',
        japanese: '次(つぎ)の目標(もくひょう)に向(む)かって頑張(がんば)ろう。',
        plain:    '次の目標に向かって頑張ろう。',
        reading:  '츠기노 모쿠효ーニ무캇테 간바로ー.',
        pattern:  { name: '〜に向かって頑張ろう', meaning: '~을 향해 열심히 하자', note: '목표를 향한 동기부여 표현. 권유 의지형 ろう를 사용' },
        furigana: 'つぎのもくひょうにむかってがんばろう',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 17위  法
   * ══════════════════════════════════════════════════ */
  {
    id: 'hou_law', rank: 17, verb: '法', reading: '호ー', meaning: '법; 법률',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '法律(ほうりつ)を守(まも)る',     ruby: '호ー리츠오 마모루',  meaning: '법률을 지키다' },
        { text: '法(ほう)に違反(いはん)する',     ruby: '호ーニ이한스루',     meaning: '법을 위반하다' },
        { text: '法(ほう)の下(もと)で',           ruby: '호ーノ모토데',       meaning: '법 아래에서' },
        { text: '法的(ほうてき)に問題(もんだい)がない', ruby: '호ー테키니 몬다이가 나이', meaning: '법적으로 문제없다' },
        { text: '法(ほう)を制定(せいてい)する',   ruby: '호ーオ세이테이스루', meaning: '법을 제정하다' },
        { text: '法(ほう)の精神(せいしん)',        ruby: '호ーノ세이신',       meaning: '법의 정신' },
        { text: '憲法(けんぽう)',                 ruby: '켄포ー',             meaning: '헌법' },
        { text: '違法(いほう)行為(こうい)',        ruby: '이호ー 코ーイ',      meaning: '불법 행위' },
      ],
      plain: [
        { text: '法(ほう)',          ruby: '호ー',       meaning: '법' },
        { text: '法律(ほうりつ)',    ruby: '호ー리츠',   meaning: '법률' },
        { text: '憲法(けんぽう)',    ruby: '켄포ー',     meaning: '헌법' },
        { text: '法的(ほうてき)',    ruby: '호ー테키',   meaning: '법적' },
        { text: '違法(いほう)',      ruby: '이호ー',     meaning: '불법' },
        { text: '合法(ごうほう)',    ruby: '고ー호ー',   meaning: '합법' },
        { text: '法案(ほうあん)',    ruby: '호ー안',     meaning: '법안' },
        { text: '法廷(ほうてい)',    ruby: '호ー테이',   meaning: '법정' },
      ],
    },
    examples: [
      {
        korean:   '법률을 지키는 것은 시민의 의무입니다.',
        japanese: '法律(ほうりつ)を守(まも)ることは市民(しみん)の義務(ぎむ)です。',
        plain:    '法律を守ることは市民の義務だ。',
        reading:  '호ー리츠오 마모루 코토와 시민노 기무데스.',
        pattern:  { name: '〜ことは〜の義務です', meaning: '~하는 것은 ~의 의무입니다', note: 'こと는 형식명사. 의무나 책임을 강조하는 격식 표현' },
        furigana: 'ほうりつをまもることはしみんのぎむです',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '그 행위는 법을 위반하고 있어.',
        japanese: 'その行為(こうい)は法(ほう)に違反(いはん)している。',
        plain:    'その行為は法に違反している。',
        reading:  '소노 코ーイワ 호ーニ이한시테이루.',
        pattern:  { name: '〜に違反する', meaning: '~을/를 위반하다', note: '법·규칙 위반을 나타내는 표현. 〜に違反している 형태로 상태를 나타냄' },
        furigana: 'そのこういはほうにいはんしている',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '법 앞에서는 모두가 평등해.',
        japanese: '法(ほう)の下(もと)ではみんな平等(びょうどう)だ。',
        plain:    '法の下ではみんな平等だ。',
        reading:  '호ー노 모토데와 민나 뵤ー도ー다.',
        pattern:  { name: '法の下で', meaning: '법 아래에서; 법 앞에서', note: '법적 평등을 나타내는 관용 표현' },
        furigana: 'ほうのもとではみんなびょうどうだ',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 18위  会社
   * ══════════════════════════════════════════════════ */
  {
    id: 'kaisha', rank: 18, verb: '会社', reading: '카이샤', meaning: '회사',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '会社(かいしゃ)に勤(つと)める',       ruby: '카이샤니 츠토메루',    meaning: '회사에 다니다' },
        { text: '会社(かいしゃ)を設立(せつりつ)する', ruby: '카이샤오 세츠리츠스루', meaning: '회사를 설립하다' },
        { text: '会社(かいしゃ)の雰囲気(ふんいき)',   ruby: '카이샤노 훙이키',      meaning: '회사 분위기' },
        { text: '会社(かいしゃ)を辞(や)める',         ruby: '카이샤오 야메루',      meaning: '회사를 그만두다' },
        { text: '会社(かいしゃ)員(いん)',              ruby: '카이샤인',             meaning: '회사원' },
        { text: '親会社(おやがいしゃ)',               ruby: '오야가이샤',           meaning: '모회사' },
        { text: '子会社(こがいしゃ)',                 ruby: '코가이샤',             meaning: '자회사' },
        { text: '会社(かいしゃ)説明会(せつめいかい)', ruby: '카이샤 세츠메이카이',  meaning: '회사 설명회' },
      ],
      plain: [
        { text: '会社(かいしゃ)',       ruby: '카이샤',     meaning: '회사' },
        { text: '会社員(かいしゃいん)', ruby: '카이샤인',   meaning: '회사원' },
        { text: '親会社(おやがいしゃ)', ruby: '오야가이샤', meaning: '모회사' },
        { text: '子会社(こがいしゃ)',   ruby: '코가이샤',   meaning: '자회사' },
        { text: '起業(きぎょう)',       ruby: '키교ー',     meaning: '창업' },
        { text: '会社名(かいしゃめい)', ruby: '카이샤메이', meaning: '회사명' },
        { text: '株式会社(かぶしきがいしゃ)', ruby: '카부시키가이샤', meaning: '주식회사' },
        { text: '有限会社(ゆうげんがいしゃ)', ruby: '유ー겐가이샤',   meaning: '유한회사' },
      ],
    },
    examples: [
      {
        korean:   '다음 달부터 새 회사에서 일합니다.',
        japanese: '来月(らいげつ)から新(あたら)しい会社(かいしゃ)で働(はたら)きます。',
        plain:    '来月から新しい会社で働く。',
        reading:  '라이게츠카라 아타라시이 카이샤데 하타라키마스.',
        pattern:  { name: '〜から〜で働く', meaning: '~부터 ~에서 일하다', note: '취직·이직 시작 시점을 나타내는 표현' },
        furigana: 'らいげつからあたらしいかいしゃではたらきます',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '회사 분위기가 매우 좋습니다.',
        japanese: '会社(かいしゃ)の雰囲気(ふんいき)がとても良(よ)いです。',
        plain:    '会社の雰囲気がとても良い。',
        reading:  '카이샤노 훙이키가 토테모 요이데스.',
        pattern:  { name: '〜の雰囲気がとても良い', meaning: '~의 분위기가 매우 좋다', note: '직장 환경을 긍정적으로 묘사하는 표현' },
        furigana: 'かいしゃのふんいきがとてもよいです',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '회사를 그만두고 독립하기로 했어.',
        japanese: '会社(かいしゃ)を辞(や)めて独立(どくりつ)することにした。',
        plain:    '会社を辞めて独立することにした。',
        reading:  '카이샤오 야메테 도쿠리츠 스루코토니 시타.',
        pattern:  { name: '〜ことにした', meaning: '~하기로 했다', note: '자신의 결정·의지를 나타내는 표현. することにした로 스스로 결정했음을 강조' },
        furigana: 'かいしゃをやめてどくりつすることにした',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 19위  男
   * ══════════════════════════════════════════════════ */
  {
    id: 'otoko', rank: 19, verb: '男', reading: '오토코', meaning: '남자; 남성',
    accentType: 0,
    conjugations: {
      formal: [
        { text: 'あの男(おとこ)の人(ひと)',           ruby: '아노 오토코노 히토',   meaning: '저 남자' },
        { text: '男(おとこ)らしい',                   ruby: '오토코라시이',         meaning: '남자다운' },
        { text: '男性(だんせい)',                     ruby: '단세이',               meaning: '남성' },
        { text: '男女(だんじょ)平等(びょうどう)',    ruby: '단죠 뵤ー도ー',         meaning: '남녀평등' },
        { text: '男(おとこ)の子(こ)',                 ruby: '오토코노 코',          meaning: '남자아이' },
        { text: '独(ひと)り身(み)の男(おとこ)',       ruby: '히토리미노 오토코',    meaning: '독신 남자' },
        { text: '男(おとこ)前(まえ)',                 ruby: '오토코마에',           meaning: '남자다운 외모; 멋진 남자' },
        { text: 'かっこいい男(おとこ)',               ruby: '캇코이이 오토코',      meaning: '멋진 남자' },
      ],
      plain: [
        { text: '男(おとこ)',        ruby: '오토코',    meaning: '남자' },
        { text: '男性(だんせい)',    ruby: '단세이',    meaning: '남성' },
        { text: '男の子(おとこのこ)', ruby: '오토코노코', meaning: '남자아이' },
        { text: '男らしい',          ruby: '오토코라시이', meaning: '남자다운' },
        { text: '男前(おとこまえ)',   ruby: '오토코마에', meaning: '남자다운 외모' },
        { text: '長男(ちょうなん)',   ruby: '쵸ー난',   meaning: '장남' },
        { text: '次男(じなん)',       ruby: '지난',     meaning: '차남' },
        { text: '男友達(おとこともだち)', ruby: '오토코토모다치', meaning: '남자 친구 (이성이 아닌)' },
      ],
    },
    examples: [
      {
        korean:   '저 남자 분은 누구입니까?',
        japanese: 'あの男(おとこ)の人(ひと)は誰(だれ)ですか？',
        plain:    'あの男の人は誰？',
        reading:  '아노 오토코노 히토와 다레데스카?',
        pattern:  { name: 'あの男の人は誰？', meaning: '저 남자는 누구야?', note: '男の人は 사람을 가리키는 일반적 표현. 男だけ는 다소 직접적' },
        furigana: 'あのおとこのひとはだれですか',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '남자다움이 뭔지 생각해 봤어.',
        japanese: '男(おとこ)らしさとは何(なに)かを考(かんが)えた。',
        plain:    '男らしさとは何かを考えた。',
        reading:  '오토코라시사토와 나니카오 칸가에타.',
        pattern:  { name: '〜らしさとは何か', meaning: '~다움이란 무엇인가', note: 'らしさ는 らしい의 명사형. 본질을 탐구하는 질문 형식' },
        furigana: 'おとこらしさとはなにかをかんがえた',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '남녀평등이 중요하다고 생각합니다.',
        japanese: '男女(だんじょ)平等(びょうどう)が大切(たいせつ)だと思(おも)います。',
        plain:    '男女平等が大切だと思う。',
        reading:  '단죠 뵤ー도ー가 타이세츠다토 오모이마스.',
        pattern:  { name: '〜が大切だと思う', meaning: '~이/가 중요하다고 생각한다', note: '의견·생각을 나타내는 と思う 표현. 정중형은 と思います' },
        furigana: 'だんじょびょうどうがたいせつだとおもいます',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 20위  地域
   * ══════════════════════════════════════════════════ */
  {
    id: 'chiiki', rank: 20, verb: '地域', reading: '치이키', meaning: '지역',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '地域(ちいき)の人々(ひとびと)',         ruby: '치이키노 히토비토',    meaning: '지역 주민들' },
        { text: '地域(ちいき)社会(しゃかい)',           ruby: '치이키 샤카이',        meaning: '지역 사회' },
        { text: '地域(ちいき)活性化(かっせいか)',       ruby: '치이키 캇세이카',      meaning: '지역 활성화' },
        { text: '地域(ちいき)に貢献(こうけん)する',    ruby: '치이키니 코ー켄스루',  meaning: '지역에 공헌하다' },
        { text: '地域(ちいき)の特産品(とくさんひん)',   ruby: '치이키노 토쿠산힌',    meaning: '지역 특산품' },
        { text: '地域(ちいき)差(さ)',                   ruby: '치이키사',             meaning: '지역 차이' },
        { text: '地域(ちいき)振興(しんこう)',           ruby: '치이키 신코ー',        meaning: '지역 진흥' },
        { text: '地域(ちいき)医療(いりょう)',           ruby: '치이키 이료ー',        meaning: '지역 의료' },
      ],
      plain: [
        { text: '地域(ちいき)',          ruby: '치이키',     meaning: '지역' },
        { text: '地域社会(ちいきしゃかい)', ruby: '치이키 샤카이', meaning: '지역 사회' },
        { text: '地域差(ちいきさ)',      ruby: '치이키사',   meaning: '지역 차이' },
        { text: '地域住民(ちいきじゅうみん)', ruby: '치이키 쥬ー민', meaning: '지역 주민' },
        { text: '全地域(ぜんちいき)',    ruby: '젠치이키',   meaning: '전 지역' },
        { text: '地域密着(ちいきみっちゃく)', ruby: '치이키 밋챠쿠', meaning: '지역 밀착' },
        { text: '過疎地域(かそちいき)', ruby: '카소치이키', meaning: '과소 지역' },
        { text: '都市(とし)地域(ちいき)', ruby: '토시 치이키', meaning: '도시 지역' },
      ],
    },
    examples: [
      {
        korean:   '지역 주민들과 협력해서 축제를 열었어.',
        japanese: '地域(ちいき)の人々(ひとびと)と協力(きょうりょく)して祭(まつ)りを開(ひら)いた。',
        plain:    '地域の人々と協力して祭りを開いた。',
        reading:  '치이키노 히토비토토 쿄ー료쿠시테 마츠리오 히라이타.',
        pattern:  { name: '〜と協力して〜を開く', meaning: '~와 협력해서 ~을 개최하다', note: '공동 행사 개최를 나타내는 표현' },
        furigana: 'ちいきのひとびとときょうりょくしてまつりをひらいた',
        accentData: [
          { phrase_id: 0, mora_count: 25, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0] },
        ],
      },
      {
        korean:   '이 지역은 자연이 풍부합니다.',
        japanese: 'この地域(ちいき)は自然(しぜん)が豊(ゆた)かです。',
        plain:    'この地域は自然が豊かだ。',
        reading:  '코노 치이키와 시젠가 유타카데스.',
        pattern:  { name: '〜は〜が豊かです', meaning: '~은/는 ~이 풍부합니다', note: '장소의 특징을 나타내는 表現. 豊かは な형용사' },
        furigana: 'このちいきはしぜんがゆたかです',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '지역 사회에 대한 공헌을 소중히 여기고 있어.',
        japanese: '地域社会(ちいきしゃかい)への貢献(こうけん)を大切(たいせつ)にしている。',
        plain:    '地域社会への貢献を大切にしている。',
        reading:  '치이키 샤카이에노 코ー켄오 타이세츠니 시테이루.',
        pattern:  { name: '〜を大切にしている', meaning: '~을/를 소중히 여기고 있다', note: '현재 진행형으로 지속적인 가치관·태도를 나타냄' },
        furigana: 'ちいきしゃかいへのこうけんをたいせつにしている',
        accentData: [
          { phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ── 21~100위: 스텁 ─────────────────────────────── */

  /* ══════════════════════════════════════════════════
   * 21위  顔
   * ══════════════════════════════════════════════════ */
  {
    id: 'kao', rank: 21, verb: '顔', reading: '카오', meaning: '얼굴',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '顔(かお)です',                   ruby: '카오데스',              meaning: '얼굴입니다' },
        { text: '顔(かお)じゃないです',           ruby: '카오쟈나이데스',        meaning: '얼굴이 아닙니다' },
        { text: '顔(かお)ですか？',               ruby: '카오데스까?',           meaning: '얼굴입니까?' },
        { text: '顔(かお)じゃないですか？',       ruby: '카오쟈나이데스까?',     meaning: '얼굴이 아닙니까?' },
        { text: '顔(かお)でした',                 ruby: '카오데시타',            meaning: '얼굴이었습니다' },
        { text: '顔(かお)じゃなかったです',       ruby: '카오쟈나캇타데스',      meaning: '얼굴이 아니었습니다' },
        { text: '顔(かお)でしたか？',             ruby: '카오데시타까?',         meaning: '얼굴이었습니까?' },
        { text: '顔(かお)じゃなかったですか？',   ruby: '카오쟈나캇타데스까?',   meaning: '얼굴이 아니었습니까?' },
      ],
      plain: [
        { text: '顔(かお)だ',               ruby: '카오다',            meaning: '얼굴이야' },
        { text: '顔(かお)じゃない',         ruby: '카오쟈나이',        meaning: '얼굴이 아니야' },
        { text: '顔(かお)だ？',             ruby: '카오다?',           meaning: '얼굴이야?' },
        { text: '顔(かお)じゃない？',       ruby: '카오쟈나이?',       meaning: '얼굴이 아니야?' },
        { text: '顔(かお)だった',           ruby: '카오닷타',          meaning: '얼굴이었어' },
        { text: '顔(かお)じゃなかった',     ruby: '카오쟈나캇타',      meaning: '얼굴이 아니었어' },
        { text: '顔(かお)だった？',         ruby: '카오닷타?',         meaning: '얼굴이었어?' },
        { text: '顔(かお)じゃなかった？',   ruby: '카오쟈나캇타?',     meaning: '얼굴이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀는 웃는 얼굴이 정말 멋있어.',
        japanese: '彼女(かのじょ)は笑顔(えがお)がとても素敵(すてき)だ。',
        plain:    '彼女は笑顔がとても素敵だ。',
        reading:  '카노죠와 에가오가 토테모 스테키다.',
        pattern:  { name: '〜は笑顔が素敵だ', meaning: '~은/는 웃는 얼굴이 멋있다', note: '笑顔(えがお)는 웃는 얼굴. 顔 관련 복합어는 일상에서 자주 사용됨' },
        furigana: 'かのじょはえがおがとてもすてきだ',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '얼굴을 씻고 나가겠습니다.',
        japanese: '顔(かお)を洗(あら)ってから出(で)かけます。',
        plain:    '顔を洗ってから出かける。',
        reading:  '카오오 아랏테카라 데카케마스.',
        pattern:  { name: '顔を洗ってから', meaning: '얼굴을 씻고 나서', note: 'てから는 순서를 나타내는 접속 표현. 세수 후 외출이라는 일상 루틴' },
        furigana: 'かおをあらってからでかけます',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '오랜만에 친구 얼굴을 보고 안심했어.',
        japanese: '久(ひさ)しぶりに友人(ゆうじん)の顔(かお)を見(み)て安心(あんしん)した。',
        plain:    '久しぶりに友人の顔を見て安心した。',
        reading:  '히사시부리니 유ー진노 카오오 미테 안신시타.',
        pattern:  { name: '〜の顔を見て安心した', meaning: '~의 얼굴을 보고 안심했다', note: 'て형으로 계기를 나타냄. 顔を見る는 만남을 의미하는 관용적 표현' },
        furigana: 'ひさしぶりにゆうじんのかおをみてあんしんした',
        accentData: [
          { phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 22위  情報
   * ══════════════════════════════════════════════════ */
  {
    id: 'jouhou', rank: 22, verb: '情報', reading: '죠ー호ー', meaning: '정보',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '情報(じょうほう)です',                 ruby: '죠ー호ー데스',              meaning: '정보입니다' },
        { text: '情報(じょうほう)じゃないです',         ruby: '죠ー호ー쟈나이데스',        meaning: '정보가 아닙니다' },
        { text: '情報(じょうほう)ですか？',             ruby: '죠ー호ー데스까?',           meaning: '정보입니까?' },
        { text: '情報(じょうほう)じゃないですか？',     ruby: '죠ー호ー쟈나이데스까?',     meaning: '정보가 아닙니까?' },
        { text: '情報(じょうほう)でした',               ruby: '죠ー호ー데시타',            meaning: '정보이었습니다' },
        { text: '情報(じょうほう)じゃなかったです',     ruby: '죠ー호ー쟈나캇타데스',      meaning: '정보가 아니었습니다' },
        { text: '情報(じょうほう)でしたか？',           ruby: '죠ー호ー데시타까?',         meaning: '정보이었습니까?' },
        { text: '情報(じょうほう)じゃなかったですか？', ruby: '죠ー호ー쟈나캇타데스까?',   meaning: '정보가 아니었습니까?' },
      ],
      plain: [
        { text: '情報(じょうほう)だ',               ruby: '죠ー호ー다',            meaning: '정보야' },
        { text: '情報(じょうほう)じゃない',         ruby: '죠ー호ー쟈나이',        meaning: '정보가 아니야' },
        { text: '情報(じょうほう)だ？',             ruby: '죠ー호ー다?',           meaning: '정보야?' },
        { text: '情報(じょうほう)じゃない？',       ruby: '죠ー호ー쟈나이?',       meaning: '정보가 아니야?' },
        { text: '情報(じょうほう)だった',           ruby: '죠ー호ー닷타',          meaning: '정보이었어' },
        { text: '情報(じょうほう)じゃなかった',     ruby: '죠ー호ー쟈나캇타',      meaning: '정보가 아니었어' },
        { text: '情報(じょうほう)だった？',         ruby: '죠ー호ー닷타?',         meaning: '정보이었어?' },
        { text: '情報(じょうほう)じゃなかった？',   ruby: '죠ー호ー쟈나캇타?',     meaning: '정보가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '인터넷에서 정보를 모았습니다.',
        japanese: 'インターネットで情報(じょうほう)を集(あつ)めました。',
        plain:    'インターネットで情報を集めた。',
        reading:  '인타ー넷토데 죠ー호ー오 아츠메마시타.',
        pattern:  { name: '〜で情報を集める', meaning: '~에서 정보를 모으다', note: 'で는 수단·방법을 나타내는 조사. 인터넷 검색 관련 표현' },
        furigana: 'いんたーねっとでじょうほうをあつめました',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '최신 정보를 확인해 주세요.',
        japanese: '最新(さいしん)の情報(じょうほう)を確認(かくにん)してください。',
        plain:    '最新の情報を確認してください。',
        reading:  '사이신노 죠ー호ー오 카쿠닌시테쿠다사이.',
        pattern:  { name: '最新の情報を確認する', meaning: '최신 정보를 확인하다', note: '最新の〜는 가장 새로운~이라는 뜻. 업무·뉴스 확인 시 자주 사용' },
        furigana: 'さいしんのじょうほうをかくにんしてください',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '개인정보 취급에 주의해 주세요.',
        japanese: '個人情報(こじんじょうほう)の取(と)り扱(あつか)いに注意(ちゅうい)してください。',
        plain:    '個人情報の取り扱いに注意してください。',
        reading:  '코진죠ー호ー노 토리아츠카이니 츄ー이시테쿠다사이.',
        pattern:  { name: '個人情報の取り扱いに注意する', meaning: '개인정보 취급에 주의하다', note: '個人情報는 개인정보. 법적·윤리적 맥락에서 중요한 표현' },
        furigana: 'こじんじょうほうのとりあつかいにちゅういしてください',
        accentData: [
          { phrase_id: 0, mora_count: 26, accent: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 23위  図
   * ══════════════════════════════════════════════════ */
  {
    id: 'zu', rank: 23, verb: '図', reading: '즈', meaning: '그림; 도표; 도면',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '図(ず)です',               ruby: '즈데스',            meaning: '도표입니다' },
        { text: '図(ず)じゃないです',       ruby: '즈쟈나이데스',      meaning: '도표가 아닙니다' },
        { text: '図(ず)ですか？',           ruby: '즈데스까?',         meaning: '도표입니까?' },
        { text: '図(ず)じゃないですか？',   ruby: '즈쟈나이데스까?',   meaning: '도표가 아닙니까?' },
        { text: '図(ず)でした',             ruby: '즈데시타',          meaning: '도표이었습니다' },
        { text: '図(ず)じゃなかったです',   ruby: '즈쟈나캇타데스',    meaning: '도표가 아니었습니다' },
        { text: '図(ず)でしたか？',         ruby: '즈데시타까?',       meaning: '도표이었습니까?' },
        { text: '図(ず)じゃなかったですか？',ruby: '즈쟈나캇타데스까?', meaning: '도표가 아니었습니까?' },
      ],
      plain: [
        { text: '図(ず)だ',             ruby: '즈다',          meaning: '도표야' },
        { text: '図(ず)じゃない',       ruby: '즈쟈나이',      meaning: '도표가 아니야' },
        { text: '図(ず)だ？',           ruby: '즈다?',         meaning: '도표야?' },
        { text: '図(ず)じゃない？',     ruby: '즈쟈나이?',     meaning: '도표가 아니야?' },
        { text: '図(ず)だった',         ruby: '즈닷타',        meaning: '도표이었어' },
        { text: '図(ず)じゃなかった',   ruby: '즈쟈나캇타',    meaning: '도표가 아니었어' },
        { text: '図(ず)だった？',       ruby: '즈닷타?',       meaning: '도표이었어?' },
        { text: '図(ず)じゃなかった？', ruby: '즈쟈나캇타?',   meaning: '도표가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '이 도표를 봐주세요.',
        japanese: 'この図(ず)を見(み)てください。',
        plain:    'この図を見てください。',
        reading:  '코노 즈오 미테쿠다사이.',
        pattern:  { name: 'この図を見てください', meaning: '이 도표를 봐주세요', note: '図를 직접 가리킬 때 사용. 발표나 설명에서 자주 사용되는 표현' },
        furigana: 'このずをみてください',
        accentData: [
          { phrase_id: 0, mora_count: 10, accent: [0, 1, 0, 0, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '지도를 보면서 길을 찾았어.',
        japanese: '地図(ちず)を見(み)ながら道(みち)を探(さが)した。',
        plain:    '地図を見ながら道を探した。',
        reading:  '치즈오 미나가라 미치오 사가시타.',
        pattern:  { name: '地図を見ながら道を探す', meaning: '지도를 보면서 길을 찾다', note: 'ながら는 동시 진행을 나타내는 접속 표현. 地図(ちず)는 지도' },
        furigana: 'ちずをみながらみちをさがした',
        accentData: [
          { phrase_id: 0, mora_count: 14, accent: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '도표로 설명하면 알기 쉬워.',
        japanese: '図(ず)で説明(せつめい)するとわかりやすい。',
        plain:    '図で説明するとわかりやすい。',
        reading:  '즈데 세츠메이스루토 와카리야스이.',
        pattern:  { name: '図で説明すると〜やすい', meaning: '도표로 설명하면 ~하기 쉽다', note: 'で는 수단, と는 자연스러운 결과를 나타냄. やすい는 접미사로 ~하기 쉽다는 뜻' },
        furigana: 'ずでせつめいするとわかりやすい',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 24위  言葉
   * ══════════════════════════════════════════════════ */
  {
    id: 'kotoba', rank: 24, verb: '言葉', reading: '코토바', meaning: '말; 언어; 단어',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '言葉(ことば)です',                 ruby: '코토바데스',            meaning: '말입니다' },
        { text: '言葉(ことば)じゃないです',         ruby: '코토바쟈나이데스',      meaning: '말이 아닙니다' },
        { text: '言葉(ことば)ですか？',             ruby: '코토바데스까?',         meaning: '말입니까?' },
        { text: '言葉(ことば)じゃないですか？',     ruby: '코토바쟈나이데스까?',   meaning: '말이 아닙니까?' },
        { text: '言葉(ことば)でした',               ruby: '코토바데시타',          meaning: '말이었습니다' },
        { text: '言葉(ことば)じゃなかったです',     ruby: '코토바쟈나캇타데스',    meaning: '말이 아니었습니다' },
        { text: '言葉(ことば)でしたか？',           ruby: '코토바데시타까?',       meaning: '말이었습니까?' },
        { text: '言葉(ことば)じゃなかったですか？', ruby: '코토바쟈나캇타데스까?', meaning: '말이 아니었습니까?' },
      ],
      plain: [
        { text: '言葉(ことば)だ',               ruby: '코토바다',          meaning: '말이야' },
        { text: '言葉(ことば)じゃない',         ruby: '코토바쟈나이',      meaning: '말이 아니야' },
        { text: '言葉(ことば)だ？',             ruby: '코토바다?',         meaning: '말이야?' },
        { text: '言葉(ことば)じゃない？',       ruby: '코토바쟈나이?',     meaning: '말이 아니야?' },
        { text: '言葉(ことば)だった',           ruby: '코토바닷타',        meaning: '말이었어' },
        { text: '言葉(ことば)じゃなかった',     ruby: '코토바쟈나캇타',    meaning: '말이 아니었어' },
        { text: '言葉(ことば)だった？',         ruby: '코토바닷타?',       meaning: '말이었어?' },
        { text: '言葉(ことば)じゃなかった？',   ruby: '코토바쟈나캇타?',   meaning: '말이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '다정한 말을 해줘서 기뻤어.',
        japanese: '優(やさ)しい言葉(ことば)をかけてもらって嬉(うれ)しかった。',
        plain:    '優しい言葉をかけてもらって嬉しかった。',
        reading:  '야사시이 코토바오 카케테 모랏테 우레시캇타.',
        pattern:  { name: '言葉をかけてもらって嬉しかった', meaning: '말을 걸어줘서 기뻤다', note: '言葉をかける는 말을 건네다는 관용 표현. もらって는 상대방이 해준 것에 대한 감사' },
        furigana: 'やさしいことばをかけてもらってうれしかった',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '말의 힘은 크다고 생각합니다.',
        japanese: '言葉(ことば)の力(ちから)は大(おお)きいと思(おも)います。',
        plain:    '言葉の力は大きいと思う。',
        reading:  '코토바노 치카라와 오ー키이토 오모이마스.',
        pattern:  { name: '〜の力は大きいと思います', meaning: '~의 힘은 크다고 생각합니다', note: 'と思います는 자신의 의견을 부드럽게 표현하는 방법' },
        furigana: 'ことばのちからはおおきいとおもいます',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '적절한 말이 떠오르지 않았어.',
        japanese: '適切(てきせつ)な言葉(ことば)が見(み)つからなかった。',
        plain:    '適切な言葉が見つからなかった。',
        reading:  '테키세츠나 코토바가 미츠카라나캇타.',
        pattern:  { name: '〜が見つからなかった', meaning: '~이/가 떠오르지 않았다', note: '見つかる는 발견되다. 부정형으로 적절한 표현을 찾지 못했음을 나타냄' },
        furigana: 'てきせつなことばがみつからなかった',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 25위  国
   * ══════════════════════════════════════════════════ */
  {
    id: 'kuni', rank: 25, verb: '国', reading: '쿠니', meaning: '나라; 국가',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '国(くに)です',               ruby: '쿠니데스',          meaning: '나라입니다' },
        { text: '国(くに)じゃないです',       ruby: '쿠니쟈나이데스',    meaning: '나라가 아닙니다' },
        { text: '国(くに)ですか？',           ruby: '쿠니데스까?',       meaning: '나라입니까?' },
        { text: '国(くに)じゃないですか？',   ruby: '쿠니쟈나이데스까?', meaning: '나라가 아닙니까?' },
        { text: '国(くに)でした',             ruby: '쿠니데시타',        meaning: '나라이었습니다' },
        { text: '国(くに)じゃなかったです',   ruby: '쿠니쟈나캇타데스',  meaning: '나라가 아니었습니다' },
        { text: '国(くに)でしたか？',         ruby: '쿠니데시타까?',     meaning: '나라이었습니까?' },
        { text: '国(くに)じゃなかったですか？',ruby: '쿠니쟈나캇타데스까?',meaning: '나라가 아니었습니까?' },
      ],
      plain: [
        { text: '国(くに)だ',             ruby: '쿠니다',        meaning: '나라야' },
        { text: '国(くに)じゃない',       ruby: '쿠니쟈나이',    meaning: '나라가 아니야' },
        { text: '国(くに)だ？',           ruby: '쿠니다?',       meaning: '나라야?' },
        { text: '国(くに)じゃない？',     ruby: '쿠니쟈나이?',   meaning: '나라가 아니야?' },
        { text: '国(くに)だった',         ruby: '쿠니닷타',      meaning: '나라이었어' },
        { text: '国(くに)じゃなかった',   ruby: '쿠니쟈나캇타',  meaning: '나라가 아니었어' },
        { text: '国(くに)だった？',       ruby: '쿠니닷타?',     meaning: '나라이었어?' },
        { text: '国(くに)じゃなかった？', ruby: '쿠니쟈나캇타?', meaning: '나라가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '세계에는 약 200개의 나라가 있습니다.',
        japanese: '世界(せかい)には約(やく)200の国(くに)があります。',
        plain:    '世界には約200の国がある。',
        reading:  '세카이니와 야쿠 니햐쿠노 쿠니가 아리마스.',
        pattern:  { name: '世界には〜の国があります', meaning: '세계에는 ~의 나라가 있습니다', note: 'には는 범위를 나타내는 복합 조사. 총수를 설명할 때 사용' },
        furigana: 'せかいにはやく200のくにがあります',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0] },
        ],
      },
      {
        korean:   '외국에 살아보고 싶다고 생각해.',
        japanese: '外国(がいこく)に住(す)んでみたいと思(おも)う。',
        plain:    '外国に住んでみたいと思う。',
        reading:  '가이코쿠니 슨데 미타이토 오모우.',
        pattern:  { name: '外国に住んでみたい', meaning: '외국에 살아보고 싶다', note: 'てみたい는 시도하고 싶다는 희망 표현. 外国은 국(くに)의 복합어' },
        furigana: 'がいこくにすんでみたいとおもう',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0] },
        ],
      },
      {
        korean:   '고국을 떠나는 건 쉽지 않아.',
        japanese: '故国(ここく)を離(はな)れることは簡単(かんたん)ではない。',
        plain:    '故国を離れることは簡単ではない。',
        reading:  '코코쿠오 하나레루 코토와 칸탄데와 나이.',
        pattern:  { name: '〜ことは簡単ではない', meaning: '~하는 것은 쉽지 않다', note: 'ことは는 동사를 명사화하는 표현. 簡単ではない는 쉽지 않다는 이중 부정' },
        furigana: 'ここくをはなれることはかんたんではない',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 26위  県
   * ══════════════════════════════════════════════════ */
  {
    id: 'ken', rank: 26, verb: '県', reading: '켄', meaning: '현 (행정 단위)',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '県(けん)です',               ruby: '켄데스',            meaning: '현입니다' },
        { text: '県(けん)じゃないです',       ruby: '켄쟈나이데스',      meaning: '현이 아닙니다' },
        { text: '県(けん)ですか？',           ruby: '켄데스까?',         meaning: '현입니까?' },
        { text: '県(けん)じゃないですか？',   ruby: '켄쟈나이데스까?',   meaning: '현이 아닙니까?' },
        { text: '県(けん)でした',             ruby: '켄데시타',          meaning: '현이었습니다' },
        { text: '県(けん)じゃなかったです',   ruby: '켄쟈나캇타데스',    meaning: '현이 아니었습니다' },
        { text: '県(けん)でしたか？',         ruby: '켄데시타까?',       meaning: '현이었습니까?' },
        { text: '県(けん)じゃなかったですか？',ruby: '켄쟈나캇타데스까?', meaning: '현이 아니었습니까?' },
      ],
      plain: [
        { text: '県(けん)だ',             ruby: '켄다',        meaning: '현이야' },
        { text: '県(けん)じゃない',       ruby: '켄쟈나이',    meaning: '현이 아니야' },
        { text: '県(けん)だ？',           ruby: '켄다?',       meaning: '현이야?' },
        { text: '県(けん)じゃない？',     ruby: '켄쟈나이?',   meaning: '현이 아니야?' },
        { text: '県(けん)だった',         ruby: '켄닷타',      meaning: '현이었어' },
        { text: '県(けん)じゃなかった',   ruby: '켄쟈나캇타',  meaning: '현이 아니었어' },
        { text: '県(けん)だった？',       ruby: '켄닷타?',     meaning: '현이었어?' },
        { text: '県(けん)じゃなかった？', ruby: '켄쟈나캇타?', meaning: '현이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '저는 도쿄도가 아니라 가나가와현에 살고 있어요.',
        japanese: '私(わたし)は東京都(とうきょうと)ではなく神奈川県(かながわけん)に住(す)んでいます。',
        plain:    '私は東京都ではなく神奈川県に住んでいる。',
        reading:  '와타시와 토ー쿄ー토데와 나쿠 카나가와켄니 슨데이마스.',
        pattern:  { name: '〜ではなく〜に住んでいます', meaning: '~이/가 아니라 ~에 살고 있습니다', note: 'ではなく는 否定的対比. 行政区分를 소개할 때 사용' },
        furigana: 'わたしはとうきょうとではなくかながわけんにすんでいます',
        accentData: [
          { phrase_id: 0, mora_count: 27, accent: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '이 현은 관광지로 유명합니다.',
        japanese: 'この県(けん)は観光地(かんこうち)として有名(ゆうめい)です。',
        plain:    'この県は観光地として有名だ。',
        reading:  '코노 켄와 칸코ー치토시테 유ー메이데스.',
        pattern:  { name: '〜として有名です', meaning: '~으로 유명합니다', note: 'として는 자격·역할을 나타내는 조사. 지역 특색을 소개할 때 사용' },
        furigana: 'このけんはかんこうちとしてゆうめいです',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '현을 넘어 이동하는 것은 허가되어 있었어.',
        japanese: '県(けん)をまたいでの移動(いどう)は許可(きょか)されていた。',
        plain:    '県をまたいでの移動は許可されていた。',
        reading:  '켄오 마타이데노 이도ー와 쿄ー카사레테이타.',
        pattern:  { name: '〜をまたいでの移動', meaning: '~을 넘어서의 이동', note: 'またいでの는 경계를 넘는 것을 나타냄. 都道府県をまたぐ는 관용 표현' },
        furigana: 'けんをまたいでのいどうはきょかされていた',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 27위  学校
   * ══════════════════════════════════════════════════ */
  {
    id: 'gakkou', rank: 27, verb: '学校', reading: '각코ー', meaning: '학교',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '学校(がっこう)です',                 ruby: '각코ー데스',            meaning: '학교입니다' },
        { text: '学校(がっこう)じゃないです',         ruby: '각코ー쟈나이데스',      meaning: '학교가 아닙니다' },
        { text: '学校(がっこう)ですか？',             ruby: '각코ー데스까?',         meaning: '학교입니까?' },
        { text: '学校(がっこう)じゃないですか？',     ruby: '각코ー쟈나이데스까?',   meaning: '학교가 아닙니까?' },
        { text: '学校(がっこう)でした',               ruby: '각코ー데시타',          meaning: '학교이었습니다' },
        { text: '学校(がっこう)じゃなかったです',     ruby: '각코ー쟈나캇타데스',    meaning: '학교가 아니었습니다' },
        { text: '学校(がっこう)でしたか？',           ruby: '각코ー데시타까?',       meaning: '학교이었습니까?' },
        { text: '学校(がっこう)じゃなかったですか？', ruby: '각코ー쟈나캇타데스까?', meaning: '학교가 아니었습니까?' },
      ],
      plain: [
        { text: '学校(がっこう)だ',               ruby: '각코ー다',          meaning: '학교야' },
        { text: '学校(がっこう)じゃない',         ruby: '각코ー쟈나이',      meaning: '학교가 아니야' },
        { text: '学校(がっこう)だ？',             ruby: '각코ー다?',         meaning: '학교야?' },
        { text: '学校(がっこう)じゃない？',       ruby: '각코ー쟈나이?',     meaning: '학교가 아니야?' },
        { text: '学校(がっこう)だった',           ruby: '각코ー닷타',        meaning: '학교이었어' },
        { text: '学校(がっこう)じゃなかった',     ruby: '각코ー쟈나캇타',    meaning: '학교가 아니었어' },
        { text: '学校(がっこう)だった？',         ruby: '각코ー닷타?',       meaning: '학교이었어?' },
        { text: '学校(がっこう)じゃなかった？',   ruby: '각코ー쟈나캇타?',   meaning: '학교가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '학교까지 걸어서 10분 걸립니다.',
        japanese: '学校(がっこう)まで歩(ある)いて十分(じゅっぷん)かかります。',
        plain:    '学校まで歩いて十分かかる。',
        reading:  '각코ー마데 아루이테 쥬ッ푼 카카리마스.',
        pattern:  { name: '〜まで歩いて〜かかります', meaning: '~까지 걸어서 ~걸립니다', note: 'まで는 도착점을 나타내는 조사. 통학 시간을 표현할 때 자주 사용' },
        furigana: 'がっこうまであるいてじゅっぷんかかります',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '학교에서 친구를 많이 사귀었어.',
        japanese: '学校(がっこう)でたくさんの友達(ともだち)ができた。',
        plain:    '学校でたくさんの友達ができた。',
        reading:  '각코ー데 타쿠산노 토모다치가 데키타.',
        pattern:  { name: '学校で友達ができた', meaning: '학교에서 친구가 생겼다', note: 'で는 장소 조사. ができた는 생겨났다·이루어졌다는 표현' },
        furigana: 'がっこうでたくさんのともだちができた',
        accentData: [
          { phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '내일은 학교를 쉴 예정이야.',
        japanese: '明日(あした)は学校(がっこう)を休(やす)む予定(よてい)です。',
        plain:    '明日は学校を休む予定だ。',
        reading:  '아시타와 각코ー오 야스무 요테이데스.',
        pattern:  { name: '〜を休む予定です', meaning: '~을 쉴 예정입니다', note: '予定です는 계획을 나타내는 격식 표현. 결석·결근 예정을 알릴 때 사용' },
        furigana: 'あしたはがっこうをやすむよていです',
        accentData: [
          { phrase_id: 0, mora_count: 16, accent: [0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 28위  企業
   * ══════════════════════════════════════════════════ */
  {
    id: 'kigyou', rank: 28, verb: '企業', reading: '키교ー', meaning: '기업',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '企業(きぎょう)です',                 ruby: '키교ー데스',            meaning: '기업입니다' },
        { text: '企業(きぎょう)じゃないです',         ruby: '키교ー쟈나이데스',      meaning: '기업이 아닙니다' },
        { text: '企業(きぎょう)ですか？',             ruby: '키교ー데스까?',         meaning: '기업입니까?' },
        { text: '企業(きぎょう)じゃないですか？',     ruby: '키교ー쟈나이데스까?',   meaning: '기업이 아닙니까?' },
        { text: '企業(きぎょう)でした',               ruby: '키교ー데시타',          meaning: '기업이었습니다' },
        { text: '企業(きぎょう)じゃなかったです',     ruby: '키교ー쟈나캇타데스',    meaning: '기업이 아니었습니다' },
        { text: '企業(きぎょう)でしたか？',           ruby: '키교ー데시타까?',       meaning: '기업이었습니까?' },
        { text: '企業(きぎょう)じゃなかったですか？', ruby: '키교ー쟈나캇타데스까?', meaning: '기업이 아니었습니까?' },
      ],
      plain: [
        { text: '企業(きぎょう)だ',               ruby: '키교ー다',          meaning: '기업이야' },
        { text: '企業(きぎょう)じゃない',         ruby: '키교ー쟈나이',      meaning: '기업이 아니야' },
        { text: '企業(きぎょう)だ？',             ruby: '키교ー다?',         meaning: '기업이야?' },
        { text: '企業(きぎょう)じゃない？',       ruby: '키교ー쟈나이?',     meaning: '기업이 아니야?' },
        { text: '企業(きぎょう)だった',           ruby: '키교ー닷타',        meaning: '기업이었어' },
        { text: '企業(きぎょう)じゃなかった',     ruby: '키교ー쟈나캇타',    meaning: '기업이 아니었어' },
        { text: '企業(きぎょう)だった？',         ruby: '키교ー닷타?',       meaning: '기업이었어?' },
        { text: '企業(きぎょう)じゃなかった？',   ruby: '키교ー쟈나캇타?',   meaning: '기업이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '대기업에 취직하고 싶어.',
        japanese: '大手(おおて)企業(きぎょう)に就職(しゅうしょく)したい。',
        plain:    '大手企業に就職したい。',
        reading:  '오ー테 키교ー니 슈ー쇼쿠시타이.',
        pattern:  { name: '大手企業に就職したい', meaning: '대기업에 취직하고 싶다', note: '大手企業는 대기업. 就職したい는 희망 표현으로 취업 의지를 나타냄' },
        furigana: 'おおてきぎょうにしゅうしょくしたい',
        accentData: [
          { phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '이 기업은 환경 문제에 힘쓰고 있어요.',
        japanese: 'この企業(きぎょう)は環境(かんきょう)問題(もんだい)に取(と)り組(く)んでいます。',
        plain:    'この企業は環境問題に取り組んでいる。',
        reading:  '코노 키교ー와 칸쿄ー몬다이니 토리쿤데이마스.',
        pattern:  { name: '〜に取り組んでいます', meaning: '~에 힘쓰고 있습니다', note: '取り組む는 적극적으로 임하다는 뜻. ている는 현재 진행 상태' },
        furigana: 'このきぎょうはかんきょうもんだいにとりくんでいます',
        accentData: [
          { phrase_id: 0, mora_count: 25, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0] },
        ],
      },
      {
        korean:   '중소기업 지원이 중요해.',
        japanese: '中小(ちゅうしょう)企業(きぎょう)の支援(しえん)が重要(じゅうよう)だ。',
        plain:    '中小企業の支援が重要だ。',
        reading:  '츄ー쇼ー키교ー노 시엔가 쥬ー요ー다.',
        pattern:  { name: '中小企業の支援が重要だ', meaning: '중소기업의 지원이 중요하다', note: '中小企業는 중소기업. 政策·経済의 맥락에서 자주 등장하는 표현' },
        furigana: 'ちゅうしょうきぎょうのしえんがじゅうようだ',
        accentData: [
          { phrase_id: 0, mora_count: 21, accent: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 29위  委員
   * ══════════════════════════════════════════════════ */
  {
    id: 'iin', rank: 29, verb: '委員', reading: '이잉', meaning: '위원',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '委員(いいん)です',                 ruby: '이인데스',            meaning: '위원입니다' },
        { text: '委員(いいん)じゃないです',         ruby: '이인쟈나이데스',      meaning: '위원이 아닙니다' },
        { text: '委員(いいん)ですか？',             ruby: '이인데스까?',         meaning: '위원입니까?' },
        { text: '委員(いいん)じゃないですか？',     ruby: '이인쟈나이데스까?',   meaning: '위원이 아닙니까?' },
        { text: '委員(いいん)でした',               ruby: '이인데시타',          meaning: '위원이었습니다' },
        { text: '委員(いいん)じゃなかったです',     ruby: '이인쟈나캇타데스',    meaning: '위원이 아니었습니다' },
        { text: '委員(いいん)でしたか？',           ruby: '이인데시타까?',       meaning: '위원이었습니까?' },
        { text: '委員(いいん)じゃなかったですか？', ruby: '이인쟈나캇타데스까?', meaning: '위원이 아니었습니까?' },
      ],
      plain: [
        { text: '委員(いいん)だ',               ruby: '이인다',          meaning: '위원이야' },
        { text: '委員(いいん)じゃない',         ruby: '이인쟈나이',      meaning: '위원이 아니야' },
        { text: '委員(いいん)だ？',             ruby: '이인다?',         meaning: '위원이야?' },
        { text: '委員(いいん)じゃない？',       ruby: '이인쟈나이?',     meaning: '위원이 아니야?' },
        { text: '委員(いいん)だった',           ruby: '이인닷타',        meaning: '위원이었어' },
        { text: '委員(いいん)じゃなかった',     ruby: '이인쟈나캇타',    meaning: '위원이 아니었어' },
        { text: '委員(いいん)だった？',         ruby: '이인닷타?',       meaning: '위원이었어?' },
        { text: '委員(いいん)じゃなかった？',   ruby: '이인쟈나캇타?',   meaning: '위원이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '그는 위원으로서 회의에 출석했어.',
        japanese: '彼(かれ)は委員(いいん)として会議(かいぎ)に出席(しゅっせき)した。',
        plain:    '彼は委員として会議に出席した。',
        reading:  '카레와 이인토시테 카이기니 슛세키시타.',
        pattern:  { name: '委員として会議に出席する', meaning: '위원으로서 회의에 출석하다', note: 'として는 자격·역할을 나타내는 조사. 직책을 명시할 때 사용' },
        furigana: 'かれはいいんとしてかいぎにしゅっせきした',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '반 위원으로 뽑혔습니다.',
        japanese: 'クラスの委員(いいん)に選(えら)ばれました。',
        plain:    'クラスの委員に選ばれた。',
        reading:  '쿠라스노 이인니 에라바레마시타.',
        pattern:  { name: '〜の委員に選ばれました', meaning: '~의 위원으로 뽑혔습니다', note: '選ばれる는 選ぶ의 수동형. に는 자격을 나타내는 조사' },
        furigana: 'くらすのいいんにえらばれました',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0] },
        ],
      },
      {
        korean:   '위원회에서 의견을 말했어.',
        japanese: '委員会(いいんかい)で意見(いけん)を述(の)べた。',
        plain:    '委員会で意見を述べた。',
        reading:  '이인카이데 이켄오 노베타.',
        pattern:  { name: '委員会で意見を述べる', meaning: '위원회에서 의견을 말하다', note: '述べる는 意見을 공식적으로 발표할 때 사용하는 격식 표현' },
        furigana: 'いいんかいでいけんをのべた',
        accentData: [
          { phrase_id: 0, mora_count: 13, accent: [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1] },
        ],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 30위  時代
   * ══════════════════════════════════════════════════ */
  {
    id: 'jidai', rank: 30, verb: '時代', reading: '지다이', meaning: '시대',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '時代(じだい)です',                 ruby: '지다이데스',            meaning: '시대입니다' },
        { text: '時代(じだい)じゃないです',         ruby: '지다이쟈나이데스',      meaning: '시대가 아닙니다' },
        { text: '時代(じだい)ですか？',             ruby: '지다이데스까?',         meaning: '시대입니까?' },
        { text: '時代(じだい)じゃないですか？',     ruby: '지다이쟈나이데스까?',   meaning: '시대가 아닙니까?' },
        { text: '時代(じだい)でした',               ruby: '지다이데시타',          meaning: '시대이었습니다' },
        { text: '時代(じだい)じゃなかったです',     ruby: '지다이쟈나캇타데스',    meaning: '시대가 아니었습니다' },
        { text: '時代(じだい)でしたか？',           ruby: '지다이데시타까?',       meaning: '시대이었습니까?' },
        { text: '時代(じだい)じゃなかったですか？', ruby: '지다이쟈나캇타데스까?', meaning: '시대가 아니었습니까?' },
      ],
      plain: [
        { text: '時代(じだい)だ',               ruby: '지다이다',          meaning: '시대야' },
        { text: '時代(じだい)じゃない',         ruby: '지다이쟈나이',      meaning: '시대가 아니야' },
        { text: '時代(じだい)だ？',             ruby: '지다이다?',         meaning: '시대야?' },
        { text: '時代(じだい)じゃない？',       ruby: '지다이쟈나이?',     meaning: '시대가 아니야?' },
        { text: '時代(じだい)だった',           ruby: '지다이닷타',        meaning: '시대이었어' },
        { text: '時代(じだい)じゃなかった',     ruby: '지다이쟈나캇타',    meaning: '시대가 아니었어' },
        { text: '時代(じだい)だった？',         ruby: '지다이닷타?',       meaning: '시대이었어?' },
        { text: '時代(じだい)じゃなかった？',   ruby: '지다이쟈나캇타?',   meaning: '시대가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '에도시대의 문화는 독특해.',
        japanese: '江戸(えど)時代(じだい)の文化(ぶんか)は独特(どくとく)だ。',
        plain:    '江戸時代の文化は独特だ。',
        reading:  '에도지다이노 분카와 도쿠토쿠다.',
        pattern:  { name: '〜時代の文化は独特だ', meaning: '~시대의 문화는 독특하다', note: '時代는 역사 구분을 나타냄. 江戸時代(1603~1868년)는 일본 역사에서 중요한 시기' },
        furigana: 'えどじだいのぶんかはどくとくだ',
        accentData: [
          { phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '시대가 바뀌어도 소중한 것이 있어.',
        japanese: '時代(じだい)が変(か)わっても大切(たいせつ)なものがある。',
        plain:    '時代が変わっても大切なものがある。',
        reading:  '지다이가 카왓테모 타이세츠나 모노가 아루.',
        pattern:  { name: '時代が変わっても', meaning: '시대가 바뀌어도', note: 'ても는 역접 조건. 시대를 초월한 가치를 표현할 때 자주 쓰임' },
        furigana: 'じだいがかわってもたいせつなものがある',
        accentData: [
          { phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0] },
        ],
      },
      {
        korean:   '지금은 정보화 시대라고 불립니다.',
        japanese: '今(いま)は情報化(じょうほうか)時代(じだい)と言(い)われています。',
        plain:    '今は情報化時代と言われている。',
        reading:  '이마와 죠ー호ー카지다이토 이와레테이마스.',
        pattern:  { name: '〜と言われています', meaning: '~라고 불립니다 / 알려져 있습니다', note: 'と言われる는 수동형으로 사회적 통념이나 공통 인식을 나타냄' },
        furigana: 'いまはじょうほうかじだいといわれています',
        accentData: [
          { phrase_id: 0, mora_count: 20, accent: [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0] },
        ],
      },
    ],
  },

  /* ── 31~100위: 스텁 ─────────────────────────────── */

  /* ══════════════════════════════════════════════════
   * 31위  本当
   * ══════════════════════════════════════════════════ */
  {
    id: 'hontou', rank: 31, verb: '本当', reading: '혼토ー', meaning: '정말; 진짜',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '本当(ほんとう)は〜です',       ruby: '혼토ー와 〜데스',       meaning: '사실은 ~입니다' },
        { text: '本当(ほんとう)は〜じゃないです', ruby: '혼토ー와 〜쟈나이데스', meaning: '사실은 ~이 아닙니다' },
        { text: '本当(ほんとう)ですか？',        ruby: '혼토ー데스까?',         meaning: '정말입니까?' },
        { text: '本当(ほんとう)じゃないですか？', ruby: '혼토ー쟈나이데스까?',  meaning: '거짓말이 아닙니까?' },
        { text: '本当(ほんとう)のことでした',    ruby: '혼토ー노 코토데시타',   meaning: '진짜 일이었습니다' },
        { text: '本当(ほんとう)のことじゃなかったです', ruby: '혼토ー노 코토쟈나캇타데스', meaning: '진짜 일이 아니었습니다' },
        { text: '本当(ほんとう)でしたか？',      ruby: '혼토ー데시타까?',       meaning: '정말이었습니까?' },
        { text: '本当(ほんとう)じゃなかったですか？', ruby: '혼토ー쟈나캇타데스까?', meaning: '거짓이 아니었습니까?' },
      ],
      plain: [
        { text: '本当(ほんとう)だ',          ruby: '혼토ー다',        meaning: '진짜야' },
        { text: '本当(ほんとう)じゃない',    ruby: '혼토ー쟈나이',    meaning: '진짜가 아니야' },
        { text: '本当(ほんとう)だ？',        ruby: '혼토ー다?',       meaning: '진짜야?' },
        { text: '本当(ほんとう)じゃない？',  ruby: '혼토ー쟈나이?',   meaning: '진짜가 아니야?' },
        { text: '本当(ほんとう)だった',      ruby: '혼토ー닷타',      meaning: '진짜였어' },
        { text: '本当(ほんとう)じゃなかった',ruby: '혼토ー쟈나캇타',  meaning: '진짜가 아니었어' },
        { text: '本当(ほんとう)だった？',    ruby: '혼토ー닷타?',     meaning: '진짜였어?' },
        { text: '本当(ほんとう)じゃなかった？',ruby: '혼토ー쟈나캇타?',meaning: '진짜가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '진짜를 알려주세요.',
        japanese: '本当(ほんとう)のことを教(おし)えてください。',
        plain:    '本当のことを教えてください。',
        reading:  '혼토ー노 코토오 오시에테쿠다사이.',
        pattern:  { name: '本当のことを教えてください', meaning: '진짜를 알려주세요', note: '本当のこと는 진실·사실. 진실을 말해달라고 요청할 때 사용' },
        furigana: 'ほんとうのことをおしえてください',
        accentData: [{ phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '정말 맛있네요.',
        japanese: '本当(ほんとう)に美味(おい)しいですね。',
        plain:    '本当に美味しいね。',
        reading:  '혼토ー니 오이시이데스네.',
        pattern:  { name: '本当に〜ですね', meaning: '정말 ~이네요', note: '本当に는 정말·진심으로의 의미. 감탄·공감을 나타낼 때 사용' },
        furigana: 'ほんとうにおいしいですね',
        accentData: [{ phrase_id: 0, mora_count: 12, accent: [0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0] }],
      },
      {
        korean:   '그게 정말 얘기예요?',
        japanese: 'それは本当(ほんとう)の話(はなし)ですか？',
        plain:    'それは本当の話だ？',
        reading:  '소레와 혼토ー노 하나시데스까?',
        pattern:  { name: 'それは本当の話ですか', meaning: '그게 정말 얘기예요?', note: '본당(本当)の話는 사실·진담. 믿기 어려운 말을 들었을 때 확인하는 표현' },
        furigana: 'それはほんとうのはなしですか',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 32위  者
   * ══════════════════════════════════════════════════ */
  {
    id: 'mono', rank: 32, verb: '者', reading: '모노', meaning: '사람; 자 (자격)',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '者(もの)は〜です',         ruby: '모노와 〜데스',       meaning: '~는 사람입니다' },
        { text: '者(もの)は〜じゃないです',  ruby: '모노와 〜쟈나이데스', meaning: '~는 사람이 아닙니다' },
        { text: '〜者(もの)ですか？',        ruby: '〜모노데스까?',       meaning: '~인 사람입니까?' },
        { text: '〜者(もの)じゃないですか？',ruby: '〜모노쟈나이데스까?', meaning: '~인 사람이 아닙니까?' },
        { text: '〜者(もの)でした',          ruby: '〜모노데시타',        meaning: '~인 사람이었습니다' },
        { text: '〜者(もの)じゃなかったです',ruby: '〜모노쟈나캇타데스',  meaning: '~인 사람이 아니었습니다' },
        { text: '〜者(もの)でしたか？',      ruby: '〜모노데시타까?',     meaning: '~인 사람이었습니까?' },
        { text: '〜者(もの)じゃなかったですか？',ruby: '〜모노쟈나캇타데스까?',meaning: '~인 사람이 아니었습니까?' },
      ],
      plain: [
        { text: '者(もの)だ',          ruby: '모노다',        meaning: '~인 사람이야' },
        { text: '者(もの)じゃない',    ruby: '모노쟈나이',    meaning: '~인 사람이 아니야' },
        { text: '者(もの)だ？',        ruby: '모노다?',       meaning: '~인 사람이야?' },
        { text: '者(もの)じゃない？',  ruby: '모노쟈나이?',   meaning: '~인 사람이 아니야?' },
        { text: '者(もの)だった',      ruby: '모노닷타',      meaning: '~인 사람이었어' },
        { text: '者(もの)じゃなかった',ruby: '모노쟈나캇타',  meaning: '~인 사람이 아니었어' },
        { text: '者(もの)だった？',    ruby: '모노닷타?',     meaning: '~인 사람이었어?' },
        { text: '者(もの)じゃなかった？',ruby: '모노쟈나캇타?',meaning: '~인 사람이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '책임자는 누구입니까?',
        japanese: '責任者(せきにんしゃ)はどちらですか？',
        plain:    '責任者はどちらですか？',
        reading:  '세키닌샤와 도치라데스까?',
        pattern:  { name: '責任者はどちらですか', meaning: '책임자는 누구입니까?', note: '責任者는 책임이 있는 사람. どちら는 どこ보다 정중한 표현' },
        furigana: 'せきにんしゃはどちらですか',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0] }],
      },
      {
        korean:   '젊은이가 활약할 수 있는 사회로 만들고 싶다.',
        japanese: '若者(わかもの)が活躍(かつやく)できる社会(しゃかい)にしたい。',
        plain:    '若者が活躍できる社会にしたい。',
        reading:  '와카모노가 카츠야쿠데키루 샤카이니 시타이.',
        pattern:  { name: '〜者が活躍できる社会にしたい', meaning: '~가 활약할 수 있는 사회로 만들고 싶다', note: '若者는 젊은이. 사회 비전을 표현할 때 자주 사용하는 패턴' },
        furigana: 'わかものがかつやくできるしゃかいにしたい',
        accentData: [{ phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0] }],
      },
      {
        korean:   '담당자에게 확인해보겠습니다.',
        japanese: '担当者(たんとうしゃ)に確認(かくにん)してみます。',
        plain:    '担当者に確認してみる。',
        reading:  '탄토ー샤니 카쿠닌시테 미마스.',
        pattern:  { name: '担当者に確認してみます', meaning: '담당자에게 확인해보겠습니다', note: '担当者는 담당자. てみます는 해보다의 의지 표현. 업무 상황에서 자주 사용' },
        furigana: 'たんとうしゃにかくにんしてみます',
        accentData: [{ phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 33위  声
   * ══════════════════════════════════════════════════ */
  {
    id: 'koe', rank: 33, verb: '声', reading: '코에', meaning: '목소리; 소리',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '声(こえ)は〜です',         ruby: '코에와 〜데스',       meaning: '목소리는 ~입니다' },
        { text: '声(こえ)は〜じゃないです',  ruby: '코에와 〜쟈나이데스', meaning: '목소리는 ~이 아닙니다' },
        { text: '声(こえ)ですか？',          ruby: '코에데스까?',         meaning: '목소리입니까?' },
        { text: '声(こえ)じゃないですか？',  ruby: '코에쟈나이데스까?',   meaning: '목소리가 아닙니까?' },
        { text: '声(こえ)でした',            ruby: '코에데시타',          meaning: '목소리였습니다' },
        { text: '声(こえ)じゃなかったです',  ruby: '코에쟈나캇타데스',    meaning: '목소리가 아니었습니다' },
        { text: '声(こえ)でしたか？',        ruby: '코에데시타까?',       meaning: '목소리였습니까?' },
        { text: '声(こえ)じゃなかったですか？',ruby: '코에쟈나캇타데스까?',meaning: '목소리가 아니었습니까?' },
      ],
      plain: [
        { text: '声(こえ)だ',          ruby: '코에다',        meaning: '목소리야' },
        { text: '声(こえ)じゃない',    ruby: '코에쟈나이',    meaning: '목소리가 아니야' },
        { text: '声(こえ)だ？',        ruby: '코에다?',       meaning: '목소리야?' },
        { text: '声(こえ)じゃない？',  ruby: '코에쟈나이?',   meaning: '목소리가 아니야?' },
        { text: '声(こえ)だった',      ruby: '코에닷타',      meaning: '목소리였어' },
        { text: '声(こえ)じゃなかった',ruby: '코에쟈나캇타',  meaning: '목소리가 아니었어' },
        { text: '声(こえ)だった？',    ruby: '코에닷타?',     meaning: '목소리였어?' },
        { text: '声(こえ)じゃなかった？',ruby: '코에쟈나캇타?',meaning: '목소리가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '그녀의 목소리는 매우 아름다워.',
        japanese: '彼女(かのじょ)の声(こえ)はとても美(うつく)しい。',
        plain:    '彼女の声はとても美しい。',
        reading:  '카노죠노 코에와 토테모 우츠쿠시이.',
        pattern:  { name: '〜の声はとても美しい', meaning: '~의 목소리는 매우 아름답다', note: '美しい는 아름답다. 목소리를 칭찬할 때 사용하는 표현' },
        furigana: 'かのじょのこえはとてもうつくしい',
        accentData: [{ phrase_id: 0, mora_count: 16, accent: [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0] }],
      },
      {
        korean:   '큰 소리로 말해주세요.',
        japanese: '大(おお)きな声(こえ)で話(はな)してください。',
        plain:    '大きな声で話してください。',
        reading:  '오ー키나 코에데 하나시테쿠다사이.',
        pattern:  { name: '大きな声で話す', meaning: '큰 소리로 말하다', note: '大きな声で는 큰 목소리로. 선명하게 말해달라는 요청 표현' },
        furigana: 'おおきなこえではなしてください',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] }],
      },
      {
        korean:   '말을 걸어줄 수 있어요?',
        japanese: '声(こえ)をかけてもらえますか？',
        plain:    '声をかけてもらえる？',
        reading:  '코에오 카케테 모라에마스까?',
        pattern:  { name: '声をかけてもらえますか', meaning: '말을 걸어줄 수 있어요?', note: '声をかける는 말을 걸다. てもらえますか는 부탁·요청의 정중한 표현' },
        furigana: 'こえをかけてもらえますか',
        accentData: [{ phrase_id: 0, mora_count: 12, accent: [1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 34위  家
   * ══════════════════════════════════════════════════ */
  {
    id: 'ie', rank: 34, verb: '家', reading: '이에', meaning: '집; 가정',
    accentType: 2,
    conjugations: {
      formal: [
        { text: '家(いえ)は〜です',         ruby: '이에와 〜데스',       meaning: '집은 ~입니다' },
        { text: '家(いえ)は〜じゃないです',  ruby: '이에와 〜쟈나이데스', meaning: '집은 ~이 아닙니다' },
        { text: '家(いえ)ですか？',          ruby: '이에데스까?',         meaning: '집입니까?' },
        { text: '家(いえ)じゃないですか？',  ruby: '이에쟈나이데스까?',   meaning: '집이 아닙니까?' },
        { text: '家(いえ)でした',            ruby: '이에데시타',          meaning: '집이었습니다' },
        { text: '家(いえ)じゃなかったです',  ruby: '이에쟈나캇타데스',    meaning: '집이 아니었습니다' },
        { text: '家(いえ)でしたか？',        ruby: '이에데시타까?',       meaning: '집이었습니까?' },
        { text: '家(いえ)じゃなかったですか？',ruby: '이에쟈나캇타데스까?',meaning: '집이 아니었습니까?' },
      ],
      plain: [
        { text: '家(いえ)だ',          ruby: '이에다',        meaning: '집이야' },
        { text: '家(いえ)じゃない',    ruby: '이에쟈나이',    meaning: '집이 아니야' },
        { text: '家(いえ)だ？',        ruby: '이에다?',       meaning: '집이야?' },
        { text: '家(いえ)じゃない？',  ruby: '이에쟈나이?',   meaning: '집이 아니야?' },
        { text: '家(いえ)だった',      ruby: '이에닷타',      meaning: '집이었어' },
        { text: '家(いえ)じゃなかった',ruby: '이에쟈나캇타',  meaning: '집이 아니었어' },
        { text: '家(いえ)だった？',    ruby: '이에닷타?',     meaning: '집이었어?' },
        { text: '家(いえ)じゃなかった？',ruby: '이에쟈나캇타?',meaning: '집이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '집에 돌아가면 연락해.',
        japanese: '家(いえ)に帰(かえ)ったら連絡(れんらく)してね。',
        plain:    '家に帰ったら連絡してね。',
        reading:  '이에니 카엣타라 렌라쿠시테네.',
        pattern:  { name: '家に帰ったら〜してね', meaning: '집에 돌아가면 ~해', note: 'たら는 조건·계기를 나타냄. 친한 사이에서 쓰는 부탁 표현' },
        furigana: 'いえにかえったられんらくしてね',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1] }],
      },
      {
        korean:   '우리 집은 역에서 가깝습니다.',
        japanese: '私(わたし)の家(いえ)は駅(えき)から近(ちか)いです。',
        plain:    '私の家は駅から近い。',
        reading:  '와타시노 이에와 에키카라 치카이데스.',
        pattern:  { name: '〜は駅から近いです', meaning: '~은 역에서 가깝습니다', note: '駅から近い는 역에서 가깝다. 집 위치를 설명할 때 사용' },
        furigana: 'わたしのいえはえきからちかいです',
        accentData: [{ phrase_id: 0, mora_count: 16, accent: [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0] }],
      },
      {
        korean:   '가족이랑 여행 가고 싶어.',
        japanese: '家族(かぞく)で旅行(りょこう)に行(い)きたい。',
        plain:    '家族で旅行に行きたい。',
        reading:  '카조쿠데 료코ー니 이키타이.',
        pattern:  { name: '家族で旅行に行きたい', meaning: '가족이랑 여행 가고 싶다', note: 'で는 수단·동행을 나타내는 조사. たい는 희망 표현' },
        furigana: 'かぞくでりょこうにいきたい',
        accentData: [{ phrase_id: 0, mora_count: 13, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 35위  方法
   * ══════════════════════════════════════════════════ */
  {
    id: 'houhou', rank: 35, verb: '方法', reading: '호ー호ー', meaning: '방법',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '方法(ほうほう)は〜です',         ruby: '호ー호ー와 〜데스',       meaning: '방법은 ~입니다' },
        { text: '方法(ほうほう)は〜じゃないです',  ruby: '호ー호ー와 〜쟈나이데스', meaning: '방법은 ~이 아닙니다' },
        { text: '方法(ほうほう)ですか？',          ruby: '호ー호ー데스까?',         meaning: '방법입니까?' },
        { text: '方法(ほうほう)じゃないですか？',  ruby: '호ー호ー쟈나이데스까?',   meaning: '방법이 아닙니까?' },
        { text: '方法(ほうほう)でした',            ruby: '호ー호ー데시타',          meaning: '방법이었습니다' },
        { text: '方法(ほうほう)じゃなかったです',  ruby: '호ー호ー쟈나캇타데스',    meaning: '방법이 아니었습니다' },
        { text: '方法(ほうほう)でしたか？',        ruby: '호ー호ー데시타까?',       meaning: '방법이었습니까?' },
        { text: '方法(ほうほう)じゃなかったですか？',ruby: '호ー호ー쟈나캇타데스까?',meaning: '방법이 아니었습니까?' },
      ],
      plain: [
        { text: '方法(ほうほう)だ',          ruby: '호ー호ー다',        meaning: '방법이야' },
        { text: '方法(ほうほう)じゃない',    ruby: '호ー호ー쟈나이',    meaning: '방법이 아니야' },
        { text: '方法(ほうほう)だ？',        ruby: '호ー호ー다?',       meaning: '방법이야?' },
        { text: '方法(ほうほう)じゃない？',  ruby: '호ー호ー쟈나이?',   meaning: '방법이 아니야?' },
        { text: '方法(ほうほう)だった',      ruby: '호ー호ー닷타',      meaning: '방법이었어' },
        { text: '方法(ほうほう)じゃなかった',ruby: '호ー호ー쟈나캇타',  meaning: '방법이 아니었어' },
        { text: '方法(ほうほう)だった？',    ruby: '호ー호ー닷타?',     meaning: '방법이었어?' },
        { text: '方法(ほうほう)じゃなかった？',ruby: '호ー호ー쟈나캇타?',meaning: '방법이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '더 좋은 방법이 있다고 생각해요.',
        japanese: 'もっと良(よ)い方法(ほうほう)があると思(おも)います。',
        plain:    'もっと良い方法があると思う。',
        reading:  '못토 요이 호ー호ー가 아루토 오모이마스.',
        pattern:  { name: 'もっと良い方法があると思います', meaning: '더 좋은 방법이 있다고 생각합니다', note: 'もっと는 더욱. と思います는 부드럽게 의견을 전달하는 표현' },
        furigana: 'もっとよいほうほうがあるとおもいます',
        accentData: [{ phrase_id: 0, mora_count: 18, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0] }],
      },
      {
        korean:   '이 문제를 해결하는 방법을 알려주세요.',
        japanese: 'この問題(もんだい)を解決(かいけつ)する方法(ほうほう)を教(おし)えてください。',
        plain:    'この問題を解決する方法を教えてください。',
        reading:  '코노 몬다이오 카이케츠스루 호ー호ー오 오시에테쿠다사이.',
        pattern:  { name: '〜を解決する方法を教えてください', meaning: '~을 해결하는 방법을 알려주세요', note: '解決する는 해결하다. 방법을 물어볼 때 쓰는 대표적 표현' },
        furigana: 'このもんだいをかいけつするほうほうをおしえてください',
        accentData: [{ phrase_id: 0, mora_count: 26, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '효과적인 공부 방법을 찾고 있어요.',
        japanese: '効果的(こうかてき)な勉強(べんきょう)方法(ほうほう)を探(さが)しています。',
        plain:    '効果的な勉強方法を探している。',
        reading:  '코ー카테키나 벵쿄ー호ー호ー오 사가시테이마스.',
        pattern:  { name: '効果的な〜方法を探しています', meaning: '효과적인 ~ 방법을 찾고 있습니다', note: '効果的(こうかてき)는 효과적. ています는 현재 진행·상태' },
        furigana: 'こうかてきなべんきょうほうほうをさがしています',
        accentData: [{ phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 36위  経済
   * ══════════════════════════════════════════════════ */
  {
    id: 'keizai', rank: 36, verb: '経済', reading: '케이자이', meaning: '경제',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '経済(けいざい)は〜です',         ruby: '케이자이와 〜데스',       meaning: '경제는 ~입니다' },
        { text: '経済(けいざい)は〜じゃないです',  ruby: '케이자이와 〜쟈나이데스', meaning: '경제는 ~이 아닙니다' },
        { text: '経済(けいざい)ですか？',          ruby: '케이자이데스까?',         meaning: '경제입니까?' },
        { text: '経済(けいざい)じゃないですか？',  ruby: '케이자이쟈나이데스까?',   meaning: '경제가 아닙니까?' },
        { text: '経済(けいざい)でした',            ruby: '케이자이데시타',          meaning: '경제였습니다' },
        { text: '経済(けいざい)じゃなかったです',  ruby: '케이자이쟈나캇타데스',    meaning: '경제가 아니었습니다' },
        { text: '経済(けいざい)でしたか？',        ruby: '케이자이데시타까?',       meaning: '경제였습니까?' },
        { text: '経済(けいざい)じゃなかったですか？',ruby: '케이자이쟈나캇타데스까?',meaning: '경제가 아니었습니까?' },
      ],
      plain: [
        { text: '経済(けいざい)だ',          ruby: '케이자이다',        meaning: '경제야' },
        { text: '経済(けいざい)じゃない',    ruby: '케이자이쟈나이',    meaning: '경제가 아니야' },
        { text: '経済(けいざい)だ？',        ruby: '케이자이다?',       meaning: '경제야?' },
        { text: '経済(けいざい)じゃない？',  ruby: '케이자이쟈나이?',   meaning: '경제가 아니야?' },
        { text: '経済(けいざい)だった',      ruby: '케이자이닷타',      meaning: '경제였어' },
        { text: '経済(けいざい)じゃなかった',ruby: '케이자이쟈나캇타',  meaning: '경제가 아니었어' },
        { text: '経済(けいざい)だった？',    ruby: '케이자이닷타?',     meaning: '경제였어?' },
        { text: '経済(けいざい)じゃなかった？',ruby: '케이자이쟈나캇타?',meaning: '경제가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '경제가 성장하고 있습니다.',
        japanese: '経済(けいざい)が成長(せいちょう)しています。',
        plain:    '経済が成長している。',
        reading:  '케이자이가 세이쵸ー시테이마스.',
        pattern:  { name: '経済が成長しています', meaning: '경제가 성장하고 있습니다', note: '成長する는 성장하다. ています는 지속적 상태. 뉴스·보고서에서 자주 사용' },
        furigana: 'けいざいがせいちょうしています',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '세계 경제의 동향을 주목하고 있어요.',
        japanese: '世界(せかい)経済(けいざい)の動向(どうこう)を注目(ちゅうもく)しています。',
        plain:    '世界経済の動向を注目している。',
        reading:  '세카이 케이자이노 도ー코ーオ 츄ー모쿠시테이마스.',
        pattern:  { name: '〜の動向を注目しています', meaning: '~의 동향을 주목하고 있습니다', note: '動向(どうこう)는 동향·흐름. 注目する는 주목하다' },
        furigana: 'せかいけいざいのどうこうをちゅうもくしています',
        accentData: [{ phrase_id: 0, mora_count: 23, accent: [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '경제적인 이유로 포기했습니다.',
        japanese: '経済的(けいざいてき)な理由(りゆう)で断念(だんねん)しました。',
        plain:    '経済的な理由で断念した。',
        reading:  '케이자이테키나 리유ー데 단넨시마시타.',
        pattern:  { name: '経済的な理由で断念する', meaning: '경제적인 이유로 포기하다', note: '経済的(けいざいてき)는 경제적. 断念する는 단념·포기하다' },
        furigana: 'けいざいてきなりゆうでだんねんしました',
        accentData: [{ phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 37위  女性
   * ══════════════════════════════════════════════════ */
  {
    id: 'josei', rank: 37, verb: '女性', reading: '죠세이', meaning: '여성',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '女性(じょせい)は〜です',         ruby: '죠세이와 〜데스',       meaning: '여성은 ~입니다' },
        { text: '女性(じょせい)は〜じゃないです',  ruby: '죠세이와 〜쟈나이데스', meaning: '여성은 ~이 아닙니다' },
        { text: '女性(じょせい)ですか？',          ruby: '죠세이데스까?',         meaning: '여성입니까?' },
        { text: '女性(じょせい)じゃないですか？',  ruby: '죠세이쟈나이데스까?',   meaning: '여성이 아닙니까?' },
        { text: '女性(じょせい)でした',            ruby: '죠세이데시타',          meaning: '여성이었습니다' },
        { text: '女性(じょせい)じゃなかったです',  ruby: '죠세이쟈나캇타데스',    meaning: '여성이 아니었습니다' },
        { text: '女性(じょせい)でしたか？',        ruby: '죠세이데시타까?',       meaning: '여성이었습니까?' },
        { text: '女性(じょせい)じゃなかったですか？',ruby: '죠세이쟈나캇타데스까?',meaning: '여성이 아니었습니까?' },
      ],
      plain: [
        { text: '女性(じょせい)だ',          ruby: '죠세이다',        meaning: '여성이야' },
        { text: '女性(じょせい)じゃない',    ruby: '죠세이쟈나이',    meaning: '여성이 아니야' },
        { text: '女性(じょせい)だ？',        ruby: '죠세이다?',       meaning: '여성이야?' },
        { text: '女性(じょせい)じゃない？',  ruby: '죠세이쟈나이?',   meaning: '여성이 아니야?' },
        { text: '女性(じょせい)だった',      ruby: '죠세이닷타',      meaning: '여성이었어' },
        { text: '女性(じょせい)じゃなかった',ruby: '죠세이쟈나캇타',  meaning: '여성이 아니었어' },
        { text: '女性(じょせい)だった？',    ruby: '죠세이닷타?',     meaning: '여성이었어?' },
        { text: '女性(じょせい)じゃなかった？',ruby: '죠세이쟈나캇타?',meaning: '여성이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '여성이 활약할 수 있는 사회를 목표로 하고 있어요.',
        japanese: '女性(じょせい)が活躍(かつやく)できる社会(しゃかい)を目指(めざ)しています。',
        plain:    '女性が活躍できる社会を目指している。',
        reading:  '죠세이가 카츠야쿠데키루 샤카이오 메자시테이마스.',
        pattern:  { name: '女性が活躍できる社会を目指す', meaning: '여성이 활약할 수 있는 사회를 목표로 하다', note: '目指す는 목표로 하다. 사회 이슈를 논할 때 자주 사용하는 표현' },
        furigana: 'じょせいがかつやくできるしゃかいをめざしています',
        accentData: [{ phrase_id: 0, mora_count: 24, accent: [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0] }],
      },
      {
        korean:   '그 여성은 매우 우수합니다.',
        japanese: 'その女性(じょせい)はとても優秀(ゆうしゅう)です。',
        plain:    'その女性はとても優秀だ。',
        reading:  '소노 죠세이와 토테모 유ー슈ー데스.',
        pattern:  { name: 'その女性はとても優秀です', meaning: '그 여성은 매우 우수합니다', note: '優秀(ゆうしゅう)는 우수하다. 사람을 칭찬할 때 사용' },
        furigana: 'そのじょせいはとてもゆうしゅうです',
        accentData: [{ phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '여성의 권리를 지키는 것이 중요합니다.',
        japanese: '女性(じょせい)の権利(けんり)を守(まも)ることが大切(たいせつ)です。',
        plain:    '女性の権利を守ることが大切だ。',
        reading:  '죠세이노 켄리오 마모루코토가 타이세츠데스.',
        pattern:  { name: '〜の権利を守ることが大切です', meaning: '~의 권리를 지키는 것이 중요합니다', note: '権利(けんり)는 권리. ことが大切는 ~하는 것이 중요하다는 표현' },
        furigana: 'じょせいのけんりをまもることがたいせつです',
        accentData: [{ phrase_id: 0, mora_count: 21, accent: [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 38위  共
   * ══════════════════════════════════════════════════ */
  {
    id: 'tomo', rank: 38, verb: '共', reading: '토모', meaning: '함께; 모두',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '共(とも)に〜です',         ruby: '토모니 〜데스',       meaning: '함께 ~입니다' },
        { text: '共(とも)に〜じゃないです',  ruby: '토모니 〜쟈나이데스', meaning: '함께 ~이 아닙니다' },
        { text: '共(とも)にですか？',        ruby: '토모니데스까?',       meaning: '함께입니까?' },
        { text: '共(とも)にじゃないですか？',ruby: '토모니쟈나이데스까?', meaning: '함께가 아닙니까?' },
        { text: '共(とも)にでした',          ruby: '토모니데시타',        meaning: '함께였습니다' },
        { text: '共(とも)にじゃなかったです',ruby: '토모니쟈나캇타데스',  meaning: '함께가 아니었습니다' },
        { text: '共(とも)にでしたか？',      ruby: '토모니데시타까?',     meaning: '함께였습니까?' },
        { text: '共(とも)にじゃなかったですか？',ruby: '토모니쟈나캇타데스까?',meaning: '함께가 아니었습니까?' },
      ],
      plain: [
        { text: '共(とも)にだ',          ruby: '토모니다',        meaning: '함께야' },
        { text: '共(とも)にじゃない',    ruby: '토모니쟈나이',    meaning: '함께가 아니야' },
        { text: '共(とも)にだ？',        ruby: '토모니다?',       meaning: '함께야?' },
        { text: '共(とも)にじゃない？',  ruby: '토모니쟈나이?',   meaning: '함께가 아니야?' },
        { text: '共(とも)にだった',      ruby: '토모니닷타',      meaning: '함께였어' },
        { text: '共(とも)にじゃなかった',ruby: '토모니쟈나캇타',  meaning: '함께가 아니었어' },
        { text: '共(とも)にだった？',    ruby: '토모니닷타?',     meaning: '함께였어?' },
        { text: '共(とも)にじゃなかった？',ruby: '토모니쟈나캇타?',meaning: '함께가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '둘 다 찬성했습니다.',
        japanese: '二人(ふたり)共(とも)に賛成(さんせい)しました。',
        plain:    '二人共に賛成した。',
        reading:  '후타리 토모니 산세이시마시타.',
        pattern:  { name: '二人共に〜しました', meaning: '둘 다 ~했습니다', note: '二人共に는 둘 모두. 합의·동의를 나타낼 때 사용' },
        furigana: 'ふたりともにさんせいしました',
        accentData: [{ phrase_id: 0, mora_count: 14, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0] }],
      },
      {
        korean:   '함께 힘냅시다.',
        japanese: '共(とも)に頑張(がんば)りましょう。',
        plain:    '共に頑張ろう。',
        reading:  '토모니 간바리마쇼ー.',
        pattern:  { name: '共に頑張りましょう', meaning: '함께 힘냅시다', note: '共に는 함께. りましょう는 함께 하자는 권유 표현. 격려·응원에서 사용' },
        furigana: 'ともにがんばりましょう',
        accentData: [{ phrase_id: 0, mora_count: 11, accent: [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '기쁨도 슬픔도 함께 나누고 싶어.',
        japanese: '喜(よろこ)びも悲(かな)しみも共(とも)に分(わ)かち合(あ)いたい。',
        plain:    '喜びも悲しみも共に分かち合いたい。',
        reading:  '요로코비모 카나시미모 토모니 와카치아이타이.',
        pattern:  { name: '〜も〜も共に分かち合いたい', meaning: '~도 ~도 함께 나누고 싶다', note: '分かち合う는 서로 나누다. 공감·동반을 표현하는 감성적 패턴' },
        furigana: 'よろこびもかなしみもともにわかちあいたい',
        accentData: [{ phrase_id: 0, mora_count: 20, accent: [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 39위  年度
   * ══════════════════════════════════════════════════ */
  {
    id: 'nendo', rank: 39, verb: '年度', reading: '넨도', meaning: '연도 (회계·학사)',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '年度(ねんど)は〜です',         ruby: '넨도와 〜데스',       meaning: '연도는 ~입니다' },
        { text: '年度(ねんど)は〜じゃないです',  ruby: '넨도와 〜쟈나이데스', meaning: '연도는 ~이 아닙니다' },
        { text: '年度(ねんど)ですか？',          ruby: '넨도데스까?',         meaning: '연도입니까?' },
        { text: '年度(ねんど)じゃないですか？',  ruby: '넨도쟈나이데스까?',   meaning: '연도가 아닙니까?' },
        { text: '年度(ねんど)でした',            ruby: '넨도데시타',          meaning: '연도였습니다' },
        { text: '年度(ねんど)じゃなかったです',  ruby: '넨도쟈나캇타데스',    meaning: '연도가 아니었습니다' },
        { text: '年度(ねんど)でしたか？',        ruby: '넨도데시타까?',       meaning: '연도였습니까?' },
        { text: '年度(ねんど)じゃなかったですか？',ruby: '넨도쟈나캇타데스까?',meaning: '연도가 아니었습니까?' },
      ],
      plain: [
        { text: '年度(ねんど)だ',          ruby: '넨도다',        meaning: '연도야' },
        { text: '年度(ねんど)じゃない',    ruby: '넨도쟈나이',    meaning: '연도가 아니야' },
        { text: '年度(ねんど)だ？',        ruby: '넨도다?',       meaning: '연도야?' },
        { text: '年度(ねんど)じゃない？',  ruby: '넨도쟈나이?',   meaning: '연도가 아니야?' },
        { text: '年度(ねんど)だった',      ruby: '넨도닷타',      meaning: '연도였어' },
        { text: '年度(ねんど)じゃなかった',ruby: '넨도쟈나캇타',  meaning: '연도가 아니었어' },
        { text: '年度(ねんど)だった？',    ruby: '넨도닷타?',     meaning: '연도였어?' },
        { text: '年度(ねんど)じゃなかった？',ruby: '넨도쟈나캇타?',meaning: '연도가 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '올 연도의 목표를 정했습니다.',
        japanese: '今年度(こんねんど)の目標(もくひょう)を決(き)めました。',
        plain:    '今年度の目標を決めた。',
        reading:  '코넨도노 모쿠효ー오 키메마시타.',
        pattern:  { name: '今年度の目標を決めました', meaning: '올 연도의 목표를 정했습니다', note: '今年度는 이번 연도. 목표 설정 장면에서 사용하는 표현' },
        furigana: 'こんねんどのもくひょうをきめました',
        accentData: [{ phrase_id: 0, mora_count: 17, accent: [0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0] }],
      },
      {
        korean:   '새 연도부터 새 부서로 이동합니다.',
        japanese: '新年度(しんねんど)から新(あたら)しい部署(ぶしょ)に異動(いどう)します。',
        plain:    '新年度から新しい部署に異動する。',
        reading:  '신넨도카라 아타라시이 부쇼니 이도ー시마스.',
        pattern:  { name: '新年度から〜に異動します', meaning: '새 연도부터 ~로 이동합니다', note: '異動(いどう)는 인사이동. 직장에서 부서 변경을 알릴 때 사용' },
        furigana: 'しんねんどからあたらしいぶしょにいどうします',
        accentData: [{ phrase_id: 0, mora_count: 22, accent: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '연도 말은 바빠집니다.',
        japanese: '年度末(ねんどまつ)は忙(いそが)しくなります。',
        plain:    '年度末は忙しくなる。',
        reading:  '넨도마츠와 이소가시쿠나리마스.',
        pattern:  { name: '年度末は忙しくなります', meaning: '연도 말은 바빠집니다', note: '年度末(ねんどまつ)는 연도 말. くなる는 상태 변화를 나타냄' },
        furigana: 'ねんどまつはいそがしくなります',
        accentData: [{ phrase_id: 0, mora_count: 15, accent: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0] }],
      },
    ],
  },

  /* ══════════════════════════════════════════════════
   * 40위  環境
   * ══════════════════════════════════════════════════ */
  {
    id: 'kankyou', rank: 40, verb: '環境', reading: '캉쿄ー', meaning: '환경',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '環境(かんきょう)は〜です',         ruby: '캉쿄ー와 〜데스',       meaning: '환경은 ~입니다' },
        { text: '環境(かんきょう)は〜じゃないです',  ruby: '캉쿄ーワ 〜쟈나이데스', meaning: '환경은 ~이 아닙니다' },
        { text: '環境(かんきょう)ですか？',          ruby: '캉쿄ー데스까?',         meaning: '환경입니까?' },
        { text: '環境(かんきょう)じゃないですか？',  ruby: '캉쿄ー쟈나이데스까?',   meaning: '환경이 아닙니까?' },
        { text: '環境(かんきょう)でした',            ruby: '캉쿄ー데시타',          meaning: '환경이었습니다' },
        { text: '環境(かんきょう)じゃなかったです',  ruby: '캉쿄ー쟈나캇타데스',    meaning: '환경이 아니었습니다' },
        { text: '環境(かんきょう)でしたか？',        ruby: '캉쿄ー데시타까?',       meaning: '환경이었습니까?' },
        { text: '環境(かんきょう)じゃなかったですか？',ruby: '캉쿄ー쟈나캇타데스까?',meaning: '환경이 아니었습니까?' },
      ],
      plain: [
        { text: '環境(かんきょう)だ',          ruby: '캉쿄ー다',        meaning: '환경이야' },
        { text: '環境(かんきょう)じゃない',    ruby: '캉쿄ー쟈나이',    meaning: '환경이 아니야' },
        { text: '環境(かんきょう)だ？',        ruby: '캉쿄ー다?',       meaning: '환경이야?' },
        { text: '環境(かんきょう)じゃない？',  ruby: '캉쿄ー쟈나이?',   meaning: '환경이 아니야?' },
        { text: '環境(かんきょう)だった',      ruby: '캉쿄ー닷타',      meaning: '환경이었어' },
        { text: '環境(かんきょう)じゃなかった',ruby: '캉쿄ー쟈나캇타',  meaning: '환경이 아니었어' },
        { text: '環境(かんきょう)だった？',    ruby: '캉쿄ー닷타?',     meaning: '환경이었어?' },
        { text: '環境(かんきょう)じゃなかった？',ruby: '캉쿄ー쟈나캇타?',meaning: '환경이 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '환경을 지키는 것은 중요합니다.',
        japanese: '環境(かんきょう)を守(まも)ることは大切(たいせつ)です。',
        plain:    '環境を守ることは大切だ。',
        reading:  '캉쿄ーオ 마모루코토와 타이세츠데스.',
        pattern:  { name: '環境を守ることは大切です', meaning: '환경을 지키는 것은 중요합니다', note: 'ことは는 명사화. 환경 보호의 중요성을 나타내는 표현' },
        furigana: 'かんきょうをまもることはたいせつです',
        accentData: [{ phrase_id: 0, mora_count: 18, accent: [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0] }],
      },
      {
        korean:   '일하는 환경을 개선하고 싶습니다.',
        japanese: '働(はたら)く環境(かんきょう)を改善(かいぜん)したいです。',
        plain:    '働く環境を改善したい。',
        reading:  '하타라쿠 캉쿄ーオ 카이젠시타이데스.',
        pattern:  { name: '働く環境を改善したいです', meaning: '일하는 환경을 개선하고 싶습니다', note: '改善する는 개선하다. したい는 희망 표현. 직장 환경 개선 요구 표현' },
        furigana: 'はたらくかんきょうをかいぜんしたいです',
        accentData: [{ phrase_id: 0, mora_count: 19, accent: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0] }],
      },
      {
        korean:   '아이가 자라는 환경이 중요하다고 생각합니다.',
        japanese: '子供(こども)が育(そだ)つ環境(かんきょう)が大切(たいせつ)だと思(おも)います。',
        plain:    '子供が育つ環境が大切だと思う。',
        reading:  '코도모가 소다츠 캉쿄ー가 타이세츠다토 오모이마스.',
        pattern:  { name: '〜が育つ環境が大切だと思います', meaning: '~이 자라는 환경이 중요하다고 생각합니다', note: 'と思います는 의견을 부드럽게 전달하는 표현. 양육 환경에 대한 의견 표현' },
        furigana: 'こどもがそだつかんきょうがたいせつだとおもいます',
        accentData: [{ phrase_id: 0, mora_count: 24, accent: [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0] }],
      },
    ],
  },

  /* ── 41~100위: 스텁 ─────────────────────────────── */
  /* ══════════════════════════════════════════════════
   * 41위  子
   * ══════════════════════════════════════════════════ */
  {
    id: 'ko', rank: 41, verb: '子', reading: '코', meaning: '아이; 자식',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '子(こ)は〜です', ruby: '코와 〜데스', meaning: '아이은(는) ~입니다' },
        { text: '子(こ)は〜じゃないです', ruby: '코와 〜쟈나이데스', meaning: '아이은(는) ~이 아닙니다' },
        { text: '子(こ)ですか？', ruby: '코데스까?', meaning: '아이입니까?' },
        { text: '子(こ)じゃないですか？', ruby: '코쟈나이데스까?', meaning: '아이이(가) 아닙니까?' },
        { text: '子(こ)でした', ruby: '코데시타', meaning: '아이이었습니다' },
        { text: '子(こ)じゃなかったです', ruby: '코쟈나캇타데스', meaning: '아이이(가) 아니었습니다' },
        { text: '子(こ)でしたか？', ruby: '코데시타까?', meaning: '아이이었습니까?' },
        { text: '子(こ)じゃなかったですか？', ruby: '코쟈나캇타데스까?', meaning: '아이이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '子(こ)だ', ruby: '코다', meaning: '아이이야' },
        { text: '子(こ)じゃない', ruby: '코쟈나이', meaning: '아이이(가) 아니야' },
        { text: '子(こ)だ？', ruby: '코다?', meaning: '아이이야?' },
        { text: '子(こ)じゃない？', ruby: '코쟈나이?', meaning: '아이이(가) 아니야?' },
        { text: '子(こ)だった', ruby: '코닷타', meaning: '아이이었어' },
        { text: '子(こ)じゃなかった', ruby: '코쟈나캇타', meaning: '아이이(가) 아니었어' },
        { text: '子(こ)だった？', ruby: '코닷타?', meaning: '아이이었어?' },
        { text: '子(こ)じゃなかった？', ruby: '코쟈나캇타?', meaning: '아이이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '어린 시절이 그립다.',
        japanese: '子供(こども)の頃(ころ)が懐(なつ)かしい。',
        plain:    '子供の頃が懐かしい。',
        reading:  '코도모노 코로가 나츠카시이.',
        pattern:  { name: '〜の頃', meaning: '~의 시절', note: '子供の頃는 어린 시절. 懐かしい는 그립다' },
        furigana: 'こどものころがなつかしい',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
        ],
      },
      {
        korean:   '외동으로 자랐습니다.',
        japanese: '一人(ひとり)っ子(こ)として育(そだ)ちました。',
        plain:    '一人っ子として育ちました。',
        reading:  '히토릭코토시테 소다치마시타.',
        pattern:  { name: '〜として', meaning: '~로서', note: '一人っ子는 외동. として는 자격·입장을 나타냄' },
        furigana: 'ひとりっことしてそだちました',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '저 아이는 항상 활기차요.',
        japanese: 'あの子(こ)はいつも元気(げんき)です。',
        plain:    'あの子はいつも元気です。',
        reading:  '아노 코와 이츠모 겡키데스.',
        pattern:  { name: 'あの子', meaning: '저 아이', note: '子는 아이를 친근하게 부를 때 단독으로도 사용됨' },
        furigana: 'あのこはいつもげんきです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 42위  相手
   * ══════════════════════════════════════════════════ */
  {
    id: 'aite', rank: 42, verb: '相手', reading: '아이테', meaning: '상대; 상대방',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '相手(あいて)は〜です', ruby: '아이테와 〜데스', meaning: '상대은(는) ~입니다' },
        { text: '相手(あいて)は〜じゃないです', ruby: '아이테와 〜쟈나이데스', meaning: '상대은(는) ~이 아닙니다' },
        { text: '相手(あいて)ですか？', ruby: '아이테데스까?', meaning: '상대입니까?' },
        { text: '相手(あいて)じゃないですか？', ruby: '아이테쟈나이데스까?', meaning: '상대이(가) 아닙니까?' },
        { text: '相手(あいて)でした', ruby: '아이테데시타', meaning: '상대이었습니다' },
        { text: '相手(あいて)じゃなかったです', ruby: '아이테쟈나캇타데스', meaning: '상대이(가) 아니었습니다' },
        { text: '相手(あいて)でしたか？', ruby: '아이테데시타까?', meaning: '상대이었습니까?' },
        { text: '相手(あいて)じゃなかったですか？', ruby: '아이테쟈나캇타데스까?', meaning: '상대이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '相手(あいて)だ', ruby: '아이테다', meaning: '상대이야' },
        { text: '相手(あいて)じゃない', ruby: '아이테쟈나이', meaning: '상대이(가) 아니야' },
        { text: '相手(あいて)だ？', ruby: '아이테다?', meaning: '상대이야?' },
        { text: '相手(あいて)じゃない？', ruby: '아이테쟈나이?', meaning: '상대이(가) 아니야?' },
        { text: '相手(あいて)だった', ruby: '아이테닷타', meaning: '상대이었어' },
        { text: '相手(あいて)じゃなかった', ruby: '아이테쟈나캇타', meaning: '상대이(가) 아니었어' },
        { text: '相手(あいて)だった？', ruby: '아이테닷타?', meaning: '상대이었어?' },
        { text: '相手(あいて)じゃなかった？', ruby: '아이테쟈나캇타?', meaning: '상대이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '말상대가 필요해요.',
        japanese: '話(はな)し相手(あいて)が欲(ほ)しいです。',
        plain:    '話し相手が欲しいです。',
        reading:  '하나시아이테가 호시이데스.',
        pattern:  { name: '〜が欲しい', meaning: '~을 원하다', note: '話し相手는 말상대. 欲しい는 명사를 원할 때 사용' },
        furigana: 'はなしあいてがほしいです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '상대의 기분을 생각하는 것이 중요합니다.',
        japanese: '相手(あいて)の気持(きも)ちを考(かんが)えることが大切(たいせつ)です。',
        plain:    '相手の気持ちを考えることが大切です。',
        reading:  '아이테노 키모치오 캉가에루코토가 타이세츠데스.',
        pattern:  { name: '〜ことが大切です', meaning: '~하는 것이 중요합니다', note: '동사 기본형+こと로 명사화. 気持ち는 기분·마음' },
        furigana: 'あいてのきもちをかんがえることがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 5, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '협상 상대는 매우 까다로웠다.',
        japanese: '交渉(こうしょう)の相手(あいて)はとても厳(きび)しかった。',
        plain:    '交渉の相手はとても厳しかった。',
        reading:  '코-쇼-노 아이테와 토테모 키비시캇타.',
        pattern:  { name: '〜の相手', meaning: '~의 상대', note: '交渉는 협상. 厳しい의 과거형 厳しかった' },
        furigana: 'こうしょうのあいてはとてもきびしかった',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 43위  状況
   * ══════════════════════════════════════════════════ */
  {
    id: 'joukyou', rank: 43, verb: '状況', reading: '죠ー쿄ー', meaning: '상황',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '状況(じょうきょう)は〜です', ruby: '죠ー쿄ー와 〜데스', meaning: '상황은(는) ~입니다' },
        { text: '状況(じょうきょう)は〜じゃないです', ruby: '죠ー쿄ー와 〜쟈나이데스', meaning: '상황은(는) ~이 아닙니다' },
        { text: '状況(じょうきょう)ですか？', ruby: '죠ー쿄ー데스까?', meaning: '상황입니까?' },
        { text: '状況(じょうきょう)じゃないですか？', ruby: '죠ー쿄ー쟈나이데스까?', meaning: '상황이(가) 아닙니까?' },
        { text: '状況(じょうきょう)でした', ruby: '죠ー쿄ー데시타', meaning: '상황이었습니다' },
        { text: '状況(じょうきょう)じゃなかったです', ruby: '죠ー쿄ー쟈나캇타데스', meaning: '상황이(가) 아니었습니다' },
        { text: '状況(じょうきょう)でしたか？', ruby: '죠ー쿄ー데시타까?', meaning: '상황이었습니까?' },
        { text: '状況(じょうきょう)じゃなかったですか？', ruby: '죠ー쿄ー쟈나캇타데스까?', meaning: '상황이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '状況(じょうきょう)だ', ruby: '죠ー쿄ー다', meaning: '상황이야' },
        { text: '状況(じょうきょう)じゃない', ruby: '죠ー쿄ー쟈나이', meaning: '상황이(가) 아니야' },
        { text: '状況(じょうきょう)だ？', ruby: '죠ー쿄ー다?', meaning: '상황이야?' },
        { text: '状況(じょうきょう)じゃない？', ruby: '죠ー쿄ー쟈나이?', meaning: '상황이(가) 아니야?' },
        { text: '状況(じょうきょう)だった', ruby: '죠ー쿄ー닷타', meaning: '상황이었어' },
        { text: '状況(じょうきょう)じゃなかった', ruby: '죠ー쿄ー쟈나캇타', meaning: '상황이(가) 아니었어' },
        { text: '状況(じょうきょう)だった？', ruby: '죠ー쿄ー닷타?', meaning: '상황이었어?' },
        { text: '状況(じょうきょう)じゃなかった？', ruby: '죠ー쿄ー쟈나캇타?', meaning: '상황이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '현재 상황을 설명해 주세요.',
        japanese: '現在(げんざい)の状況(じょうきょう)を説明(せつめい)してください。',
        plain:    '現在の状況を説明してください。',
        reading:  '겐자이노 죠-쿄-오 세츠메-시테쿠다사이.',
        pattern:  { name: '〜を説明してください', meaning: '~을 설명해 주세요', note: '現在는 현재. 説明する+てください로 정중한 의뢰' },
        furigana: 'げんざいのじょうきょうをせつめいしてください',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 3, accent: [1, 1, 0] },
          { phrase_id: 3, mora_count: 7, accent: [0, 0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '상황에 따라 판단이 달라집니다.',
        japanese: '状況(じょうきょう)によって判断(はんだん)が変(か)わります。',
        plain:    '状況によって判断が変わります。',
        reading:  '죠-쿄-니욧테 한단가 카와리마스.',
        pattern:  { name: '〜によって', meaning: '~에 따라', note: 'によって는 원인·기준을 나타냄. 変わる는 바뀌다' },
        furigana: 'じょうきょうによってはんだんがかわります',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '상황이 악화되고 있습니다.',
        japanese: '状況(じょうきょう)が悪化(あっか)しています。',
        plain:    '状況が悪化しています。',
        reading:  '죠-쿄-가 악카시테이마스.',
        pattern:  { name: '〜が悪化している', meaning: '~이 악화되고 있다', note: '悪化する는 악화되다. ています로 진행 중인 변화를 표현' },
        furigana: 'じょうきょうがあっかしています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 1] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 44위  女
   * ══════════════════════════════════════════════════ */
  {
    id: 'onna', rank: 44, verb: '女', reading: '온나', meaning: '여자; 여성',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '女(おんな)は〜です', ruby: '온나와 〜데스', meaning: '여자은(는) ~입니다' },
        { text: '女(おんな)は〜じゃないです', ruby: '온나와 〜쟈나이데스', meaning: '여자은(는) ~이 아닙니다' },
        { text: '女(おんな)ですか？', ruby: '온나데스까?', meaning: '여자입니까?' },
        { text: '女(おんな)じゃないですか？', ruby: '온나쟈나이데스까?', meaning: '여자이(가) 아닙니까?' },
        { text: '女(おんな)でした', ruby: '온나데시타', meaning: '여자이었습니다' },
        { text: '女(おんな)じゃなかったです', ruby: '온나쟈나캇타데스', meaning: '여자이(가) 아니었습니다' },
        { text: '女(おんな)でしたか？', ruby: '온나데시타까?', meaning: '여자이었습니까?' },
        { text: '女(おんな)じゃなかったですか？', ruby: '온나쟈나캇타데스까?', meaning: '여자이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '女(おんな)だ', ruby: '온나다', meaning: '여자이야' },
        { text: '女(おんな)じゃない', ruby: '온나쟈나이', meaning: '여자이(가) 아니야' },
        { text: '女(おんな)だ？', ruby: '온나다?', meaning: '여자이야?' },
        { text: '女(おんな)じゃない？', ruby: '온나쟈나이?', meaning: '여자이(가) 아니야?' },
        { text: '女(おんな)だった', ruby: '온나닷타', meaning: '여자이었어' },
        { text: '女(おんな)じゃなかった', ruby: '온나쟈나캇타', meaning: '여자이(가) 아니었어' },
        { text: '女(おんな)だった？', ruby: '온나닷타?', meaning: '여자이었어?' },
        { text: '女(おんな)じゃなかった？', ruby: '온나쟈나캇타?', meaning: '여자이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '그 여자분은 매우 친절했다.',
        japanese: 'その女(おんな)の人(ひと)はとても優(やさ)しかった。',
        plain:    'その女の人はとても優しかった。',
        reading:  '소노 온나노 히토와 토테모 야사시캇타.',
        pattern:  { name: '女の人', meaning: '여자분', note: '女の人는 여성을 정중하게 가리키는 표현' },
        furigana: 'そのおんなのひとはとてもやさしかった',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 3, mora_count: 6, accent: [1, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   '여자아이가 꽃을 들고 있어요.',
        japanese: '女(おんな)の子(こ)が花(はな)を持(も)っています。',
        plain:    '女の子が花を持っています。',
        reading:  '온나노 코가 하나오 못테이마스.',
        pattern:  { name: '女の子', meaning: '여자아이', note: '女の子는 여자아이. 持っている는 들고 있는 상태' },
        furigana: 'おんなのこがはなをもっています',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [1, 0, 0, 0, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '강한 여자가 되고 싶다고 생각하고 있어요.',
        japanese: '強(つよ)い女(おんな)になりたいと思(おも)っています。',
        plain:    '強い女になりたいと思っています。',
        reading:  '츠요이 온나니 나리타이토 오못테이마스.',
        pattern:  { name: '〜になりたい', meaning: '~이 되고 싶다', note: 'になる+たい는 ~이 되고 싶다. と思っている는 생각을 품고 있음' },
        furigana: 'つよいおんなになりたいとおもっています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 45위  地
   * ══════════════════════════════════════════════════ */
  {
    id: 'chi', rank: 45, verb: '地', reading: '치', meaning: '땅; 지역; 배경',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '地(ち)は〜です', ruby: '치와 〜데스', meaning: '땅은(는) ~입니다' },
        { text: '地(ち)は〜じゃないです', ruby: '치와 〜쟈나이데스', meaning: '땅은(는) ~이 아닙니다' },
        { text: '地(ち)ですか？', ruby: '치데스까?', meaning: '땅입니까?' },
        { text: '地(ち)じゃないですか？', ruby: '치쟈나이데스까?', meaning: '땅이(가) 아닙니까?' },
        { text: '地(ち)でした', ruby: '치데시타', meaning: '땅이었습니다' },
        { text: '地(ち)じゃなかったです', ruby: '치쟈나캇타데스', meaning: '땅이(가) 아니었습니다' },
        { text: '地(ち)でしたか？', ruby: '치데시타까?', meaning: '땅이었습니까?' },
        { text: '地(ち)じゃなかったですか？', ruby: '치쟈나캇타데스까?', meaning: '땅이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '地(ち)だ', ruby: '치다', meaning: '땅이야' },
        { text: '地(ち)じゃない', ruby: '치쟈나이', meaning: '땅이(가) 아니야' },
        { text: '地(ち)だ？', ruby: '치다?', meaning: '땅이야?' },
        { text: '地(ち)じゃない？', ruby: '치쟈나이?', meaning: '땅이(가) 아니야?' },
        { text: '地(ち)だった', ruby: '치닷타', meaning: '땅이었어' },
        { text: '地(ち)じゃなかった', ruby: '치쟈나캇타', meaning: '땅이(가) 아니었어' },
        { text: '地(ち)だった？', ruby: '치닷타?', meaning: '땅이었어?' },
        { text: '地(ち)じゃなかった？', ruby: '치쟈나캇타?', meaning: '땅이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '이 땅에 뿌리내린 활동을 하고 있습니다.',
        japanese: 'この地(ち)に根(ね)ざした活動(かつどう)をしています。',
        plain:    'この地に根ざした活動をしています。',
        reading:  '코노 치니 네자시타 카츠도-오 시테이마스.',
        pattern:  { name: '〜に根ざす', meaning: '~에 뿌리내리다', note: '根ざす는 뿌리내리다. この地는 이 땅·이 지역' },
        furigana: 'このちにねざしたかつどうをしています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 3, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '지리적 이점을 살린 작전입니다.',
        japanese: '地(ち)の利(り)を活(い)かした作戦(さくせん)です。',
        plain:    '地の利を活かした作戦です。',
        reading:  '치노 리오 이카시타 사쿠센데스.',
        pattern:  { name: '地の利', meaning: '지리적 이점', note: '地の利는 지리상의 이점이라는 관용 표현. 活かす는 살리다' },
        furigana: 'ちのりをいかしたさくせんです',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 3, accent: [1, 0, 0] },
        ],
      },
      {
        korean:   '지진으로 땅이 흔들렸습니다.',
        japanese: '地震(じしん)で地(ち)が揺(ゆ)れました。',
        plain:    '地震で地が揺れました。',
        reading:  '지신데 치가 유레마시타.',
        pattern:  { name: '〜で〜が揺れる', meaning: '~으로 ~이 흔들리다', note: 'で는 원인을 나타냄. 揺れる는 흔들리다' },
        furigana: 'じしんでちがゆれました',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 1, accent: [0] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 46위  技術
   * ══════════════════════════════════════════════════ */
  {
    id: 'gijutsu', rank: 46, verb: '技術', reading: '기쥬츠', meaning: '기술',
    accentType: 1,
    conjugations: {
      formal: [
        { text: '技術(ぎじゅつ)は〜です', ruby: '기쥬츠와 〜데스', meaning: '기술은(는) ~입니다' },
        { text: '技術(ぎじゅつ)は〜じゃないです', ruby: '기쥬츠와 〜쟈나이데스', meaning: '기술은(는) ~이 아닙니다' },
        { text: '技術(ぎじゅつ)ですか？', ruby: '기쥬츠데스까?', meaning: '기술입니까?' },
        { text: '技術(ぎじゅつ)じゃないですか？', ruby: '기쥬츠쟈나이데스까?', meaning: '기술이(가) 아닙니까?' },
        { text: '技術(ぎじゅつ)でした', ruby: '기쥬츠데시타', meaning: '기술이었습니다' },
        { text: '技術(ぎじゅつ)じゃなかったです', ruby: '기쥬츠쟈나캇타데스', meaning: '기술이(가) 아니었습니다' },
        { text: '技術(ぎじゅつ)でしたか？', ruby: '기쥬츠데시타까?', meaning: '기술이었습니까?' },
        { text: '技術(ぎじゅつ)じゃなかったですか？', ruby: '기쥬츠쟈나캇타데스까?', meaning: '기술이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '技術(ぎじゅつ)だ', ruby: '기쥬츠다', meaning: '기술이야' },
        { text: '技術(ぎじゅつ)じゃない', ruby: '기쥬츠쟈나이', meaning: '기술이(가) 아니야' },
        { text: '技術(ぎじゅつ)だ？', ruby: '기쥬츠다?', meaning: '기술이야?' },
        { text: '技術(ぎじゅつ)じゃない？', ruby: '기쥬츠쟈나이?', meaning: '기술이(가) 아니야?' },
        { text: '技術(ぎじゅつ)だった', ruby: '기쥬츠닷타', meaning: '기술이었어' },
        { text: '技術(ぎじゅつ)じゃなかった', ruby: '기쥬츠쟈나캇타', meaning: '기술이(가) 아니었어' },
        { text: '技術(ぎじゅつ)だった？', ruby: '기쥬츠닷타?', meaning: '기술이었어?' },
        { text: '技術(ぎじゅつ)じゃなかった？', ruby: '기쥬츠쟈나캇타?', meaning: '기술이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '최신 기술을 도입하고 있습니다.',
        japanese: '最新(さいしん)の技術(ぎじゅつ)を取(と)り入(い)れています。',
        plain:    '最新の技術を取り入れています。',
        reading:  '사이신노 기쥬츠오 토리이레테이마스.',
        pattern:  { name: '〜を取り入れる', meaning: '~을 도입하다', note: '取り入れる는 받아들이다·도입하다. 最新은 최신' },
        furigana: 'さいしんのぎじゅつをとりいれています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '기술을 갈고닦는 것이 중요합니다.',
        japanese: '技術(ぎじゅつ)を磨(みが)くことが大切(たいせつ)です。',
        plain:    '技術を磨くことが大切です。',
        reading:  '기쥬츠오 미가쿠코토가 타이세츠데스.',
        pattern:  { name: '〜を磨く', meaning: '~을 갈고닦다', note: '磨く는 닦다·연마하다. 기술이나 실력을 연마할 때도 사용' },
        furigana: 'ぎじゅつをみがくことがたいせつです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 2, accent: [0, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 4, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '일본의 기술은 세계에서 인정받고 있습니다.',
        japanese: '日本(にほん)の技術(ぎじゅつ)は世界(せかい)に認(みと)められています。',
        plain:    '日本の技術は世界に認められています。',
        reading:  '니혼노 기쥬츠와 세카이니 미토메라레테이마스.',
        pattern:  { name: '〜に認められる', meaning: '~에 인정받다', note: '認められる는 認める의 수동형. 인정받다는 뜻' },
        furigana: 'にほんのぎじゅつはせかいにみとめられています',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 5, accent: [0, 1, 0, 0, 0] },
          { phrase_id: 3, mora_count: 7, accent: [0, 0, 0, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 47위  大学
   * ══════════════════════════════════════════════════ */
  {
    id: 'daigaku', rank: 47, verb: '大学', reading: '다이가쿠', meaning: '대학; 대학교',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '大学(だいがく)は〜です', ruby: '다이가쿠와 〜데스', meaning: '대학은(는) ~입니다' },
        { text: '大学(だいがく)は〜じゃないです', ruby: '다이가쿠와 〜쟈나이데스', meaning: '대학은(는) ~이 아닙니다' },
        { text: '大学(だいがく)ですか？', ruby: '다이가쿠데스까?', meaning: '대학입니까?' },
        { text: '大学(だいがく)じゃないですか？', ruby: '다이가쿠쟈나이데스까?', meaning: '대학이(가) 아닙니까?' },
        { text: '大学(だいがく)でした', ruby: '다이가쿠데시타', meaning: '대학이었습니다' },
        { text: '大学(だいがく)じゃなかったです', ruby: '다이가쿠쟈나캇타데스', meaning: '대학이(가) 아니었습니다' },
        { text: '大学(だいがく)でしたか？', ruby: '다이가쿠데시타까?', meaning: '대학이었습니까?' },
        { text: '大学(だいがく)じゃなかったですか？', ruby: '다이가쿠쟈나캇타데스까?', meaning: '대학이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '大学(だいがく)だ', ruby: '다이가쿠다', meaning: '대학이야' },
        { text: '大学(だいがく)じゃない', ruby: '다이가쿠쟈나이', meaning: '대학이(가) 아니야' },
        { text: '大学(だいがく)だ？', ruby: '다이가쿠다?', meaning: '대학이야?' },
        { text: '大学(だいがく)じゃない？', ruby: '다이가쿠쟈나이?', meaning: '대학이(가) 아니야?' },
        { text: '大学(だいがく)だった', ruby: '다이가쿠닷타', meaning: '대학이었어' },
        { text: '大学(だいがく)じゃなかった', ruby: '다이가쿠쟈나캇타', meaning: '대학이(가) 아니었어' },
        { text: '大学(だいがく)だった？', ruby: '다이가쿠닷타?', meaning: '대학이었어?' },
        { text: '大学(だいがく)じゃなかった？', ruby: '다이가쿠쟈나캇타?', meaning: '대학이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '대학에서 경제학을 공부하고 있습니다.',
        japanese: '大学(だいがく)で経済学(けいざいがく)を学(まな)んでいます。',
        plain:    '大学で経済学を学んでいます。',
        reading:  '다이가쿠데 케-자이가쿠오 마난데이마스.',
        pattern:  { name: '〜で〜を学ぶ', meaning: '~에서 ~을 배우다', note: 'で는 장소를 나타냄. 学ぶ는 배우다' },
        furigana: 'だいがくでけいざいがくをまなんでいます',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [1, 0, 0, 0, 0] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   '대학 입시를 위해 준비하고 있습니다.',
        japanese: '大学受験(だいがくじゅけん)に向(む)けて準備(じゅんび)しています。',
        plain:    '大学受験に向けて準備しています。',
        reading:  '다이가쿠쥬켄니 무케테 쥼비시테이마스.',
        pattern:  { name: '〜に向けて', meaning: '~을 향해/위해', note: 'に向けて는 목표를 향한 준비·노력을 나타냄. 受験은 입시' },
        furigana: 'だいがくじゅけんにむけてじゅんびしています',
        accentData: [
          { phrase_id: 0, mora_count: 6, accent: [1, 0, 0, 1, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '이 대학은 역사가 길다.',
        japanese: 'この大学(だいがく)は歴史(れきし)が長(なが)い。',
        plain:    'この大学は歴史が長い。',
        reading:  '코노 다이가쿠와 레키시가 나가이.',
        pattern:  { name: '〜は〜が長い', meaning: '~은 ~이 길다', note: '歴史가 길다는 것은 전통이 깊다는 의미로도 쓰임' },
        furigana: 'このだいがくはれきしがながい',
        accentData: [
          { phrase_id: 0, mora_count: 2, accent: [0, 1] },
          { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 48위  先生
   * ══════════════════════════════════════════════════ */
  {
    id: 'sensei', rank: 48, verb: '先生', reading: '센세이', meaning: '선생님',
    accentType: 3,
    conjugations: {
      formal: [
        { text: '先生(せんせい)は〜です', ruby: '센세이와 〜데스', meaning: '선생님은(는) ~입니다' },
        { text: '先生(せんせい)は〜じゃないです', ruby: '센세이와 〜쟈나이데스', meaning: '선생님은(는) ~이 아닙니다' },
        { text: '先生(せんせい)ですか？', ruby: '센세이데스까?', meaning: '선생님입니까?' },
        { text: '先生(せんせい)じゃないですか？', ruby: '센세이쟈나이데스까?', meaning: '선생님이(가) 아닙니까?' },
        { text: '先生(せんせい)でした', ruby: '센세이데시타', meaning: '선생님이었습니다' },
        { text: '先生(せんせい)じゃなかったです', ruby: '센세이쟈나캇타데스', meaning: '선생님이(가) 아니었습니다' },
        { text: '先生(せんせい)でしたか？', ruby: '센세이데시타까?', meaning: '선생님이었습니까?' },
        { text: '先生(せんせい)じゃなかったですか？', ruby: '센세이쟈나캇타데스까?', meaning: '선생님이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '先生(せんせい)だ', ruby: '센세이다', meaning: '선생님이야' },
        { text: '先生(せんせい)じゃない', ruby: '센세이쟈나이', meaning: '선생님이(가) 아니야' },
        { text: '先生(せんせい)だ？', ruby: '센세이다?', meaning: '선생님이야?' },
        { text: '先生(せんせい)じゃない？', ruby: '센세이쟈나이?', meaning: '선생님이(가) 아니야?' },
        { text: '先生(せんせい)だった', ruby: '센세이닷타', meaning: '선생님이었어' },
        { text: '先生(せんせい)じゃなかった', ruby: '센세이쟈나캇타', meaning: '선생님이(가) 아니었어' },
        { text: '先生(せんせい)だった？', ruby: '센세이닷타?', meaning: '선생님이었어?' },
        { text: '先生(せんせい)じゃなかった？', ruby: '센세이쟈나캇타?', meaning: '선생님이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '선생님께 질문이 있습니다.',
        japanese: '先生(せんせい)に質問(しつもん)があります。',
        plain:    '先生に質問があります。',
        reading:  '센세-니 시츠몬가 아리마스.',
        pattern:  { name: '〜に質問がある', meaning: '~에게 질문이 있다', note: 'に는 질문의 대상을 나타냄. 質問은 질문' },
        furigana: 'せんせいにしつもんがあります',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '선생님 덕분에 합격할 수 있었습니다.',
        japanese: '先生(せんせい)のおかげで合格(ごうかく)できました。',
        plain:    '先生のおかげで合格できました。',
        reading:  '센세-노 오카게데 고-카쿠 데키마시타.',
        pattern:  { name: '〜のおかげで', meaning: '~덕분에', note: 'おかげで는 긍정적 결과의 원인에 감사를 표하는 표현' },
        furigana: 'せんせいのおかげでごうかくできました',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 3, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '선생님은 엄하지만 다정해.',
        japanese: '先生(せんせい)は厳(きび)しいけど優(やさ)しい。',
        plain:    '先生は厳しいけど優しい。',
        reading:  '센세-와 키비시이케도 야사시이.',
        pattern:  { name: '〜けど', meaning: '~지만', note: 'けど는 역접 접속. 厳しい는 엄하다, 優しい는 다정하다' },
        furigana: 'せんせいはきびしいけどやさしい',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 49위  内容
   * ══════════════════════════════════════════════════ */
  {
    id: 'naiyou', rank: 49, verb: '内容', reading: '나이요ー', meaning: '내용',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '内容(ないよう)は〜です', ruby: '나이요ー와 〜데스', meaning: '내용은(는) ~입니다' },
        { text: '内容(ないよう)は〜じゃないです', ruby: '나이요ー와 〜쟈나이데스', meaning: '내용은(는) ~이 아닙니다' },
        { text: '内容(ないよう)ですか？', ruby: '나이요ー데스까?', meaning: '내용입니까?' },
        { text: '内容(ないよう)じゃないですか？', ruby: '나이요ー쟈나이데스까?', meaning: '내용이(가) 아닙니까?' },
        { text: '内容(ないよう)でした', ruby: '나이요ー데시타', meaning: '내용이었습니다' },
        { text: '内容(ないよう)じゃなかったです', ruby: '나이요ー쟈나캇타데스', meaning: '내용이(가) 아니었습니다' },
        { text: '内容(ないよう)でしたか？', ruby: '나이요ー데시타까?', meaning: '내용이었습니까?' },
        { text: '内容(ないよう)じゃなかったですか？', ruby: '나이요ー쟈나캇타데스까?', meaning: '내용이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '内容(ないよう)だ', ruby: '나이요ー다', meaning: '내용이야' },
        { text: '内容(ないよう)じゃない', ruby: '나이요ー쟈나이', meaning: '내용이(가) 아니야' },
        { text: '内容(ないよう)だ？', ruby: '나이요ー다?', meaning: '내용이야?' },
        { text: '内容(ないよう)じゃない？', ruby: '나이요ー쟈나이?', meaning: '내용이(가) 아니야?' },
        { text: '内容(ないよう)だった', ruby: '나이요ー닷타', meaning: '내용이었어' },
        { text: '内容(ないよう)じゃなかった', ruby: '나이요ー쟈나캇타', meaning: '내용이(가) 아니었어' },
        { text: '内容(ないよう)だった？', ruby: '나이요ー닷타?', meaning: '내용이었어?' },
        { text: '内容(ないよう)じゃなかった？', ruby: '나이요ー쟈나캇타?', meaning: '내용이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '회의 내용을 알려 주세요.',
        japanese: '会議(かいぎ)の内容(ないよう)を教(おし)えてください。',
        plain:    '会議の内容を教えてください。',
        reading:  '카이기노 나이요-오 오시에테쿠다사이.',
        pattern:  { name: '〜を教えてください', meaning: '~을 알려 주세요', note: '教える는 알려주다. 会議는 회의' },
        furigana: 'かいぎのないようをおしえてください',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '메일 내용을 확인했습니다.',
        japanese: 'メールの内容(ないよう)を確認(かくにん)しました。',
        plain:    'メールの内容を確認しました。',
        reading:  '메-루노 나이요-오 카쿠닌시마시타.',
        pattern:  { name: '〜を確認する', meaning: '~을 확인하다', note: '確認する는 확인하다. 비즈니스에서 자주 쓰는 표현' },
        furigana: 'めーるのないようをかくにんしました',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 8, accent: [1, 0, 0, 0, 1, 1, 1, 1] },
        ],
      },
      {
        korean:   '수업 내용이 어려웠어.',
        japanese: '授業(じゅぎょう)の内容(ないよう)が難(むずか)しかった。',
        plain:    '授業の内容が難しかった。',
        reading:  '쥬교-노 나이요-가 무즈카시캇타.',
        pattern:  { name: '〜が難しい', meaning: '~이 어렵다', note: '授業는 수업. 難しい의 과거형 難しかった' },
        furigana: 'じゅぎょうのないようがむずかしかった',
        accentData: [
          { phrase_id: 0, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
          { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  /* ══════════════════════════════════════════════════
   * 50위  写真
   * ══════════════════════════════════════════════════ */
  {
    id: 'shashin', rank: 50, verb: '写真', reading: '샤싱', meaning: '사진',
    accentType: 0,
    conjugations: {
      formal: [
        { text: '写真(しゃしん)は〜です', ruby: '샤싱와 〜데스', meaning: '사진은(는) ~입니다' },
        { text: '写真(しゃしん)は〜じゃないです', ruby: '샤싱와 〜쟈나이데스', meaning: '사진은(는) ~이 아닙니다' },
        { text: '写真(しゃしん)ですか？', ruby: '샤싱데스까?', meaning: '사진입니까?' },
        { text: '写真(しゃしん)じゃないですか？', ruby: '샤싱쟈나이데스까?', meaning: '사진이(가) 아닙니까?' },
        { text: '写真(しゃしん)でした', ruby: '샤싱데시타', meaning: '사진이었습니다' },
        { text: '写真(しゃしん)じゃなかったです', ruby: '샤싱쟈나캇타데스', meaning: '사진이(가) 아니었습니다' },
        { text: '写真(しゃしん)でしたか？', ruby: '샤싱데시타까?', meaning: '사진이었습니까?' },
        { text: '写真(しゃしん)じゃなかったですか？', ruby: '샤싱쟈나캇타데스까?', meaning: '사진이(가) 아니었습니까?' },
      ],
      plain: [
        { text: '写真(しゃしん)だ', ruby: '샤싱다', meaning: '사진이야' },
        { text: '写真(しゃしん)じゃない', ruby: '샤싱쟈나이', meaning: '사진이(가) 아니야' },
        { text: '写真(しゃしん)だ？', ruby: '샤싱다?', meaning: '사진이야?' },
        { text: '写真(しゃしん)じゃない？', ruby: '샤싱쟈나이?', meaning: '사진이(가) 아니야?' },
        { text: '写真(しゃしん)だった', ruby: '샤싱닷타', meaning: '사진이었어' },
        { text: '写真(しゃしん)じゃなかった', ruby: '샤싱쟈나캇타', meaning: '사진이(가) 아니었어' },
        { text: '写真(しゃしん)だった？', ruby: '샤싱닷타?', meaning: '사진이었어?' },
        { text: '写真(しゃしん)じゃなかった？', ruby: '샤싱쟈나캇타?', meaning: '사진이(가) 아니었어?' },
      ],
    },
    examples: [
      {
        korean:   '사진 찍어도 되나요?',
        japanese: '写真(しゃしん)を撮(と)ってもいいですか？',
        plain:    '写真を撮ってもいいですか？',
        reading:  '샤신오 톳테모 이이데스까?',
        pattern:  { name: '〜てもいいですか', meaning: '~해도 됩니까?', note: 'てもいいですか는 허가를 구하는 표현. 撮る는 (사진을) 찍다' },
        furigana: 'しゃしんをとってもいいですか',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          { phrase_id: 3, mora_count: 3, accent: [0, 1, 1] },
        ],
      },
      {
        korean:   '이 사진은 10년 전에 찍은 거예요.',
        japanese: 'この写真(しゃしん)は10年前(ねんまえ)に撮(と)ったものです。',
        plain:    'この写真は10年前に撮ったものです。',
        reading:  '코노 샤신와 쥬-넴마에니 톳타 모노데스.',
        pattern:  { name: '〜たものです', meaning: '~한 것입니다', note: 'た형+ものです는 과거에 한 것을 설명하는 표현' },
        furigana: 'このしゃしんはじゅうねんまえにとったものです',
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 3, mora_count: 4, accent: [1, 0, 1, 1] },
          { phrase_id: 4, mora_count: 4, accent: [0, 1, 1, 1] },
        ],
      },
      {
        korean:   '사진으로 추억을 남기고 있어요.',
        japanese: '写真(しゃしん)で思(おも)い出(で)を残(のこ)しています。',
        plain:    '写真で思い出を残しています。',
        reading:  '샤신데 오모이데오 노코시테이마스.',
        pattern:  { name: '〜で〜を残す', meaning: '~으로 ~을 남기다', note: 'で는 수단을 나타냄. 思い出는 추억, 残す는 남기다' },
        furigana: 'しゃしんでおもいでをのこしています',
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
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
