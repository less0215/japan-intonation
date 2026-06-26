/* 문법 패턴 데이터
 * category(심화): 'te' | 'giving' | 'conjecture' | 'reason' | 'koto' | 'other'
 * category(기초·책 챕터): 'noun' | ...
 */
export const GRAMMAR = [

  /* ── 명사 (기초·beta, 관리자 전용 노출) ── */
  {
    id: 'noun-da',
    category: 'noun',
    beta: true,
    pattern: '〜だ',
    reading: '다',
    meanings: ['~(이)다'],
    connection: '명사 + だ',
    explanation: '명사 뒤에 「だ」를 붙여 "~(이)다"라고 단정하는 가장 기본적인 보통체 표현이에요. 한국어의 "~이다 / ~다"에 해당하고, 친구나 가까운 사이에서 반말로 쓰거나 글에서 단정적으로 서술할 때 써요. 회화에서는 「だ」를 떼고 명사만 말하는 경우도 많지만, 글이나 단정적인 말투에서는 「だ」를 붙여요.',
    usages: [
      {
        type: 'basic',
        meaning: '~(이)다',
        example: {
          kr: '나는 학생이야.',
          jp: '私(わたし)は学生(がくせい)だよ',
          pronunciation: '와타시와가쿠세-다요',
          furigana: 'わたしはがくせいだよ',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '단정: 「명사 + だ」는 "~(이)다". 명사를 그대로 받아 보통체로 단정하는 가장 기본 형태(회화에서는 だよ처럼 끝에 よ를 붙이기도 함).',
      },
      {
        type: 'basic',
        meaning: '~(이)다',
        example: {
          kr: '오늘은 휴일이다.',
          jp: '今日(きょう)は休日(きゅうじつ)だ。',
          pronunciation: '쿄-와큐-지츠다',
          furigana: 'きょうはきゅうじつだ',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '今日は休みだ처럼 "오늘은 ~이다"로 자주 쓰임. 「だ」가 문장을 단정적으로 마무리한다.',
      },
      {
        type: 'applied',
        meaning: '~(이)다',
        example: {
          kr: '다음은 내 차례야.',
          jp: '次(つぎ)は私(わたし)の番(ばん)だよ。',
          pronunciation: '츠기와와타시노반다요',
          furigana: 'つぎはわたしのばんだよ',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          ],
        },
        note: '회화에서는 「だ」를 떼고 "次は私の番"처럼 명사로 끝내기도 하지만, 단정 어감을 살리려면 「だ」를 붙인다.',
      },
    ],
  },
  {
    id: 'noun-desu',
    category: 'noun',
    beta: true,
    pattern: '〜です',
    reading: '데스',
    meanings: ['~입니다'],
    connection: '명사 + です',
    explanation: '명사 뒤에 「です」를 붙여 "~입니다"라고 정중하게 단정하는 표현이에요. 「だ」의 정중체 버전으로, 처음 만나는 사람이나 윗사람, 손님에게 두루 쓸 수 있는 가장 안전한 말투예요. 한국어의 "~입니다 / ~이에요"에 해당해요.',
    usages: [
      {
        type: 'basic',
        meaning: '~입니다',
        example: {
          kr: '저는 회사원입니다.',
          jp: '私(わたし)は会社員(かいしゃいん)です。',
          pronunciation: '와타시와카이샤인데스',
          furigana: 'わたしはかいしゃいんです',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '정중 단정: 「명사 + です」는 "~입니다". 自己紹介(자기소개)에서 가장 많이 쓰는 형태.',
      },
      {
        type: 'basic',
        meaning: '~입니다',
        example: {
          kr: '여기는 학교입니다.',
          jp: 'ここは学校(がっこう)です。',
          pronunciation: '코코와갓코-데스',
          furigana: 'ここはがっこうです',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: 'ここは学校です처럼 장소를 정중히 소개할 때 사용. 「だ」를 「です」로 바꾸면 바로 정중체.',
      },
      {
        type: 'applied',
        meaning: '~입니다',
        example: {
          kr: '제 차례는 다음입니다.',
          jp: '私(わたし)の番(ばん)は次(つぎ)です。',
          pronunciation: '와타시노반와츠기데스',
          furigana: 'わたしのばんはつぎです',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          ],
        },
        note: '私の番は次です. 명사가 길어져도 마지막에 「です」만 붙이면 정중한 단정이 된다.',
      },
    ],
  },
  {
    id: 'noun-nano',
    category: 'noun',
    beta: true,
    pattern: '〜なの',
    reading: '나노',
    meanings: ['~야?', '~인 거야'],
    connection: '명사 + なの',
    explanation: '명사 뒤에 「なの」를 붙여 부드럽게 설명하거나 물어보는 표현이에요. 끝을 올리면 "~야?"라는 부드러운 의문, 내리면 "~인 거야"라는 부드러운 설명이 돼요. 명사 뒤에는 반드시 「な」가 들어가는 게 핵심이고(회화에서는 「なんだ」 형태로도 자주 들려요), 「だ」보다 말랑말랑하고 친근한 어감이라 이유를 묻거나 확인할 때 잘 어울려요.',
    usages: [
      {
        type: 'basic',
        meaning: '~야?',
        example: {
          kr: '너 학생인 거야?',
          jp: '君(きみ)は学生(がくせい)なの？',
          pronunciation: '키미와가쿠세-나노',
          furigana: 'きみはがくせいなの',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '부드러운 의문·설명: 명사 뒤에 「な」를 넣어 「なの／なんだ」로 부드럽게 묻거나 설명한다. 올림조면 "~인 거야?". 君、学生なの？',
      },
      {
        type: 'basic',
        meaning: '~야?',
        example: {
          kr: '너 의사야?',
          jp: '君(きみ)は医者(いしゃ)なの？',
          pronunciation: '키미와이샤나노',
          furigana: 'きみはいしゃなの',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 1] },
          ],
        },
        note: '君は医者なの？처럼 「명사+なの？」로 끝을 올려 부드럽게 확인하는 의문. 단순 의문보다 다정하다.',
      },
      {
        type: 'applied',
        meaning: '~야?',
        example: {
          kr: '그 사람 가수야?',
          jp: 'あの人(ひと)、歌手(かしゅ)なの？',
          pronunciation: '아노히토카슈나노',
          furigana: 'あのひとかしゅなの',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
            { phrase_id: 1, mora_count: 4, accent: [1, 0, 0, 0] },
          ],
        },
        note: 'あの人、歌手なの？ 핵심은 명사 뒤에 반드시 「な」가 들어간다는 점.',
      },
    ],
  },
  {
    id: 'noun-desuka',
    category: 'noun',
    beta: true,
    pattern: '〜ですか',
    reading: '데스카',
    meanings: ['~입니까?'],
    connection: '명사 + ですか',
    explanation: '명사 정중체 「です」 뒤에 의문 조사 「か」를 붙여 "~입니까?"라고 정중하게 묻는 표현이에요. 한국어의 "~입니까? / ~이세요?"에 해당하고, 처음 만난 사람이나 손님에게 정중하게 물어볼 때 두루 써요. 일본어에서는 「か」가 붙으면 물음표 없이도 의문문이 돼요.',
    usages: [
      {
        type: 'basic',
        meaning: '~입니까?',
        example: {
          kr: '실례지만 학생입니까?',
          jp: '失礼(しつれい)ですが、学生(がくせい)ですか。',
          pronunciation: '시츠레-데스가가쿠세-데스카',
          furigana: 'しつれいですががくせいですか',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 2, accent: [0, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          ],
        },
        note: '정중 의문: 「명사 + ですか」는 "~입니까?". です 뒤에 か만 붙이면 정중한 질문이 완성된다.',
      },
      {
        type: 'basic',
        meaning: '~입니까?',
        example: {
          kr: '오늘은 휴일입니까?',
          jp: '今日(きょう)は休日(きゅうじつ)ですか？',
          pronunciation: '쿄-와큐-지츠데스카',
          furigana: 'きょうはきゅうじつですか',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [1, 0] },
            { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '今日は休みですか. 「か」가 의문을 나타내므로 끝에 ? 없이도 질문이 된다.',
      },
      {
        type: 'applied',
        meaning: '~입니까?',
        example: {
          kr: '다음은 제 차례입니까?',
          jp: '次(つぎ)は私(わたし)の番(ばん)ですか',
          pronunciation: '츠기와와타시노반데스카',
          furigana: 'つぎはわたしのばんですか',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 2, accent: [1, 0] },
            { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: '次は私の番ですか. 순서·차례를 정중히 확인할 때 자주 쓰는 표현.',
      },
    ],
  },
  {
    id: 'noun-datta',
    category: 'noun',
    beta: true,
    pattern: '〜だった',
    reading: '닷타',
    meanings: ['~였다', '~였어'],
    connection: '명사 + だった',
    explanation: '명사 뒤에 「だった」를 붙여 "~였다 / ~였어"라고 과거를 단정하는 보통체 표현이에요. 「だ」의 과거형으로, 친구나 가까운 사이에서 반말로 지난 일을 말할 때 써요. 한국어의 "~였다 / ~였어"처럼 과거의 상태나 정체를 회상하듯 말할 때 잘 어울려요.',
    usages: [
      {
        type: 'basic',
        meaning: '~였다',
        example: {
          kr: '그 사람은 학생이었어.',
          jp: 'その人(ひと)は学生(がくせい)だった',
          pronunciation: '소노히토와가쿠세-닷타',
          furigana: 'そのひとはがくせいだった',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          ],
        },
        note: '과거 단정: 「명사 + だった」는 "~였다/였어". だ의 과거형으로 보통체(반말) 과거를 만든다.',
      },
      {
        type: 'basic',
        meaning: '~였다',
        example: {
          kr: '어제는 휴일이었어.',
          jp: '昨日(きのう)は休日(きゅうじつ)だったよ。',
          pronunciation: '키노-와큐-지츠닷타요',
          furigana: 'きのうはきゅうじつだったよ',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '昨日は休みだった. "명사 + だった"로 지난 일을 회상하듯 단정한다.',
      },
      {
        type: 'applied',
        meaning: '~였다',
        example: {
          kr: '아까는 내 차례였어.',
          jp: 'さっきは私(わたし)の番(ばん)だった。',
          pronunciation: '삿키와와타시노반닷타',
          furigana: 'さっきはわたしのばんだった',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 0, 0] },
          ],
        },
        note: 'さっきは私の番だった. 차례·상태가 과거였음을 반말로 표현. だ → だった.',
      },
    ],
  },
  {
    id: 'noun-deshita',
    category: 'noun',
    beta: true,
    pattern: '〜でした',
    reading: '데시타',
    meanings: ['~였습니다'],
    connection: '명사 + でした',
    explanation: '명사 정중체 「です」의 과거형으로 "~였습니다"라고 정중하게 과거를 단정하는 표현이에요. 「だった」의 정중체 버전이라, 윗사람이나 손님에게 지난 일을 정중하게 말할 때 써요. 한국어의 "~였습니다 / ~이었어요"에 해당해요.',
    usages: [
      {
        type: 'basic',
        meaning: '~였습니다',
        example: {
          kr: '그 사람은 회사원이었습니다.',
          jp: 'その人(ひと)会社員(かいしゃいん)でした',
          pronunciation: '소노히토카이샤인데시타',
          furigana: 'そのひとかいしゃいんでした',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
          ],
        },
        note: '정중 과거: 「명사 + でした」는 "~였습니다". です의 과거형으로 정중하게 과거를 단정한다.',
      },
      {
        type: 'basic',
        meaning: '~였습니다',
        example: {
          kr: '어제는 휴일이었습니다.',
          jp: '昨日(きのう)は休日(きゅうじつ)でした。',
          pronunciation: '키노-와큐-지츠데시타',
          furigana: 'きのうはきゅうじつでした',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '昨日は休みでした. です → でした로 바꾸면 그대로 정중한 과거가 된다.',
      },
      {
        type: 'applied',
        meaning: '~였습니다',
        example: {
          kr: '거기는 정말 맛집이었습니다.',
          jp: 'そこは本当(ほんとう)に美味(おい)しい店(みせ)でした',
          pronunciation: '소코와혼토-니오이시이미세데시타',
          furigana: 'そこはほんとうにおいしいみせでした',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 3, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: 'あそこは本当にいい店でした. 다녀온 가게·장소를 정중히 회상할 때 자연스럽다.',
      },
    ],
  },
  {
    id: 'noun-janai',
    category: 'noun',
    beta: true,
    pattern: '〜じゃない',
    reading: '자나이',
    meanings: ['~가 아니다', '~가 아니야'],
    connection: '명사 + じゃない',
    explanation: '명사 뒤에 「じゃない」를 붙여 "~가 아니다 / ~가 아니야"라고 부정하는 보통체 표현이에요. 「だ」의 부정형으로, 원래는 「ではない」지만 회화에서는 줄여서 「じゃない」를 훨씬 많이 써요. 친구나 가까운 사이에서 반말로 "그건 아니야"라고 정정하거나 부정할 때 자주 쓰여요.',
    usages: [
      {
        type: 'basic',
        meaning: '~가 아니다',
        example: {
          kr: '나는 학생이 아니야.',
          jp: '私(わたし)は学生(がくせい)じゃない',
          pronunciation: '와타시와가쿠세-자나이',
          furigana: 'わたしはがくせいじゃない',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [1, 0, 0, 0] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
          ],
        },
        note: '부정: 「명사 + じゃない」는 "~가 아니다". だ의 부정형이며 회화체. ではない의 축약형이 じゃない.',
      },
      {
        type: 'basic',
        meaning: '~가 아니다',
        example: {
          kr: '오늘은 휴일이 아니야.',
          jp: '今日(きょう)は休日(きゅうじつ)じゃない。',
          pronunciation: '쿄-와큐-지츠자나이',
          furigana: 'きょうはきゅうじつじゃない',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
          ],
        },
        note: '今日は休みじゃない. "명사 + じゃない"로 사실을 부정·정정한다.',
      },
      {
        type: 'applied',
        meaning: '~가 아니다',
        example: {
          kr: '지금은 네 차례가 아니야.',
          jp: '今(いま)は君(きみ)の番(ばん)じゃない',
          pronunciation: '이마와키미노반자나이',
          furigana: 'いまはきみのばんじゃない',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 0] },
            { phrase_id: 1, mora_count: 3, accent: [0, 1, 0] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 0] },
          ],
        },
        note: '今は君の番じゃない. 차례·자격 등을 반말로 부정할 때 자연스럽다.',
      },
    ],
  },
  {
    id: 'noun-janaidesu',
    category: 'noun',
    beta: true,
    pattern: '〜じゃないです',
    reading: '자나이데스',
    meanings: ['~가 아닙니다'],
    connection: '명사 + じゃないです',
    explanation: '명사 부정 보통체 「じゃない」 뒤에 「です」를 붙여 "~가 아닙니다"라고 정중하게 부정하는 표현이에요. 같은 뜻을 더 격식 있게 「ではないです／ではありません」으로도 쓰는데(예문은 이 격식형으로 나옵니다), 회화에서는 「じゃ」로 줄여 「会社員じゃないです」처럼 더 부드럽게 말해요. 한국어의 "~가 아닙니다 / ~가 아니에요"에 해당해요.',
    usages: [
      {
        type: 'basic',
        meaning: '~가 아닙니다',
        example: {
          kr: '저는 회사원이 아니에요.',
          jp: '私(わたし)は会社員(かいしゃいん)ではありません。',
          pronunciation: '와타시와카이샤인데와아리마센',
          furigana: 'わたしはかいしゃいんではありません',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: '정중 부정: 예문은 「ではないです」로 나왔는데, 회화에선 「会社員じゃないです」처럼 「じゃ」로 줄여 말한다(じゃ=では의 축약).',
      },
      {
        type: 'basic',
        meaning: '~가 아닙니다',
        example: {
          kr: '오늘은 휴일이 아니에요.',
          jp: '今日(きょう)は休日(きゅうじつ)ではありません。',
          pronunciation: '쿄-와큐-지츠데와아리마센',
          furigana: 'きょうはきゅうじつではありません',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: '今日は休みじゃないです＝ではないです. じゃない/ではない 뒤에 です만 붙이면 정중한 부정이 된다.',
      },
      {
        type: 'applied',
        meaning: '~가 아닙니다',
        example: {
          kr: '여기는 우리 회사가 아니에요.',
          jp: 'ここはうちの会社(かいしゃ)じゃないです',
          pronunciation: '코코와우치노카이샤자나이데스',
          furigana: 'ここはうちのかいしゃじゃないです',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 3, mora_count: 2, accent: [0, 1] },
          ],
        },
        note: 'ここは私の会社じゃないです로도 말할 수 있다. 「じゃありません／ではありません」은 더 딱딱한 정중 부정.',
      },
    ],
  },
  {
    id: 'noun-janakatta',
    category: 'noun',
    beta: true,
    pattern: '〜じゃなかった',
    reading: '자나캇타',
    meanings: ['~가 아니었다', '~가 아니었어'],
    connection: '명사 + じゃなかった',
    explanation: '명사 부정 보통체 「じゃない」의 과거형으로 "~가 아니었다 / ~가 아니었어"라고 과거를 부정하는 표현이에요. "~인 줄 알았는데 아니었어"처럼 지난 사실을 반말로 부정할 때 써요. 「ではなかった」를 회화에서 줄인 형태가 「じゃなかった」예요.',
    usages: [
      {
        type: 'basic',
        meaning: '~가 아니었다',
        example: {
          kr: '그 사람은 학생이 아니었어.',
          jp: 'その人(ひと)は学生(がくせい)じゃなかった。',
          pronunciation: '소노히토와가쿠세-자나캇타',
          furigana: 'そのひとはがくせいじゃなかった',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 0] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          ],
        },
        note: '과거 부정: 「じゃなかった」는 "~가 아니었다". じゃない의 과거형이며 보통체(반말).',
      },
      {
        type: 'basic',
        meaning: '~가 아니었다',
        example: {
          kr: '어제는 휴일이 아니었어.',
          jp: '昨日(きのう)は休日(きゅうじつ)じゃなかったよ。',
          pronunciation: '키노-와큐-지츠자나캇타요',
          furigana: 'きのうはきゅうじつじゃなかったよ',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 0, 0, 1] },
          ],
        },
        note: '昨日は休みじゃなかった. "~인 줄 알았는데 아니었어"라는 정정 뉘앙스로 자주 쓰인다.',
      },
      {
        type: 'applied',
        meaning: '~가 아니었다',
        example: {
          kr: '거기는 소문난 가게가 아니었어.',
          jp: 'そこは噂(うわさ)の店(みせ)じゃなかったよ',
          pronunciation: '소코와우와사노미세자나캇타요',
          furigana: 'そこはうわさのみせじゃなかったよ',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 3, accent: [0, 1, 0] },
            { phrase_id: 3, mora_count: 4, accent: [0, 1, 0, 1] },
          ],
        },
        note: 'あそこは噂の店じゃなかった. 기대와 달랐던 과거 사실을 반말로 부정. じゃない → じゃなかった.',
      },
    ],
  },
  {
    id: 'noun-janakattadesu',
    category: 'noun',
    beta: true,
    pattern: '〜じゃなかったです',
    reading: '자나캇타데스',
    meanings: ['~가 아니었습니다'],
    connection: '명사 + じゃなかったです',
    explanation: '명사 과거부정 「じゃなかった」 뒤에 「です」를 붙여 "~가 아니었습니다"라고 정중하게 과거를 부정하는 표현이에요. 같은 뜻을 더 격식 있게 「ではありませんでした」로도 쓰는데(예문은 이 격식형으로 나옵니다), 회화에서는 「休みじゃなかったです」처럼 「じゃ」로 줄여 더 부드럽게 말해요. 한국어의 "~가 아니었습니다 / ~가 아니었어요"에 해당해요.',
    usages: [
      {
        type: 'basic',
        meaning: '~가 아니었습니다',
        example: {
          kr: '그 사람은 회사원이 아니었습니다.',
          jp: 'その人(ひと)は会社員(かいしゃいん)ではありませんでした',
          pronunciation: '소노히토와카이샤인데와아리마센데시타',
          furigana: 'そのひとはかいしゃいんではありませんでした',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: '정중 과거 부정: 예문은 격식형 「ではありませんでした」지만, 회화에선 「会社員じゃなかったです」처럼 「じゃ」로 줄여 말한다.',
      },
      {
        type: 'basic',
        meaning: '~가 아니었습니다',
        example: {
          kr: '어제는 휴일이 아니었습니다.',
          jp: '昨日(きのう)は休日(きゅうじつ)ではありませんでした',
          pronunciation: '키노-와큐-지츠데와아리마센데시타',
          furigana: 'きのうはきゅうじつではありませんでした',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 10, accent: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: '昨日は休みじゃなかったです＝ではありませんでした. じゃなかった 뒤에 です만 붙이면 부드러운 정중 과거 부정이 된다.',
      },
      {
        type: 'applied',
        meaning: '~가 아니었습니다',
        example: {
          kr: '거기는 제 학교가 아니었습니다.',
          jp: 'そこは私(わたし)の学校(がっこう)ではありませんでした。',
          pronunciation: '소코와와타시노갓코-데와아리마센데시타',
          furigana: 'そこはわたしのがっこうではありませんでした',
          accentData: [
            { phrase_id: 0, mora_count: 2, accent: [0, 1] },
            { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 2, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 3, mora_count: 7, accent: [0, 1, 1, 1, 1, 1, 1] },
          ],
        },
        note: 'そこは私の学校じゃなかったです로도 말할 수 있다. 「ではありませんでした」는 더 딱딱한 정중 과거 부정.',
      },
    ],
  },

  /* ── 기타 (권유·제안) ── */
  {
    id: 'mashou',
    category: 'other',
    pattern: '〜ましょう',
    reading: '마쇼-',
    meanings: ['〜합시다', '〜할까요? (권유·제안)'],
    connection: '동사 ます형 (ます 떼고) + ましょう',
    explanation: '"같이 ~합시다!"라고 권유할 때 쓰는 표현이에요. 한국어의 "~합시다 / ~할까요?"와 거의 같아요. 친구부터 직장 동료까지 모두 쓸 수 있는 정중한 어감이에요. 「ましょうか」로 끝내면 상대방 의향을 더 부드럽게 물어보는 느낌이 돼요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜합시다 (함께 하자는 권유)',
        example: {
          kr: '같이 갑시다.',
          jp: '一緒(いっしょ)に行(い)きましょう。',
          pronunciation: '잇쇼니 이키마쇼-',
          furigana: 'いっしょにいきましょう',
          accentData: [
            { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
            { phrase_id: 1, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          ],
        },
        note: '권유: 「ます형 + ましょう」는 "~합시다". 함께 할 것을 적극적으로 제안.\n一緒に行きましょう에서 行きます → 行き + ましょう.',
      },
      {
        type: 'basic',
        meaning: '〜합시다 (일상적인 청유)',
        example: {
          kr: '슬슬 점심을 먹읍시다.',
          jp: 'そろそろ昼(ひる)ご飯(はん)を食(た)べましょう。',
          pronunciation: '소로소로 히루고항오 타베마쇼-',
          furigana: 'そろそろひるごはんをたべましょう',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 0] },
            { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 1] },
            { phrase_id: 2, mora_count: 5, accent: [0, 1, 1, 1, 0] },
          ],
        },
        note: '食べます → 食べ + ましょう.\nそろそろ(슬슬)와 함께 쓰면 "이제 ~할 때가 됐다"는 뉘앙스.',
      },
      {
        type: 'applied',
        meaning: '〜ましょうか (할까요? — 의향 묻기·도움 제의)',
        example: {
          kr: '짐을 들어 드릴까요?',
          jp: '荷物(にもつ)を持(も)ちましょうか。',
          pronunciation: '니모츠오 모치마쇼-카',
          furigana: 'にもつをもちましょうか',
          accentData: [
            { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
            { phrase_id: 1, mora_count: 6, accent: [0, 1, 1, 1, 1, 0] },
          ],
        },
        note: '「ましょうか」는 상대 의향을 부드럽게 물음.\n持ちます → 持ち + ましょうか.',
      },
    ],
  },

  /* ── て형 복합 표현 ── */
  {
    id: 'te-iku',
    category: 'te',
    pattern: '〜ていく',
    reading: '테 이쿠',
    meanings: ['〜해 가다', '점점 〜해지다 (미래 방향 변화)'],
    connection: '동사 て형 + いく',
    explanation: '"하고 가다" 또는 "점점 ~해지다"를 표현해요. 어떤 동작을 하고 이동할 때, 또는 지금부터 앞으로 계속 변해갈 때 써요. て형 뒤에 いく(가다)를 붙이면 "미래 방향으로 진행된다"는 뉘앙스가 담겨요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜해 가다 (동작 후 이동)',
        example: {
          kr: '점심을 먹고 가겠습니다.',
          jp: '昼(ひる)ごはんを食(た)べていきます。',
          pronunciation: '히루고항오 타베테 이키마스',
          furigana: 'ひるごはんをたべていきます',
        },
        note: '동작 후 이동: "~하고 나서 가다".\n「食べる → 食べて + いく」. 자리를 떠나기 전에 하는 행동을 나타낸다.',
      },
      {
        type: 'basic',
        meaning: '점점 〜해지다 (변화의 진행)',
        example: {
          kr: '날씨가 점점 추워져 간다.',
          jp: '天気(てんき)がどんどん寒(さむ)くなっていく。',
          pronunciation: '텐키가 돈돈 사무쿠 낫테이쿠',
          furigana: 'てんきがどんどんさむくなっていく',
        },
        note: '변화의 진행: 지금부터 앞으로도 계속 변해감.\nどんどん(점점)과 함께 쓰이는 경우가 많다.',
      },
    ],
  },

  {
    id: 'te-kuru',
    category: 'te',
    pattern: '〜てくる',
    reading: '테 쿠루',
    meanings: ['〜해 오다', '점점 〜해졌다 (현재까지의 변화)'],
    connection: '동사 て형 + くる',
    explanation: 'ていく의 반대 방향. "사 오다", "추워져 왔다"처럼 다른 장소에서 이쪽으로 오거나, 과거부터 지금까지 변화가 쌓여온 느낌을 표현해요. "오다(くる)"의 뉘앙스가 현재 시점으로 가까워지는 느낌이에요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜해 오다 (이동)',
        example: {
          kr: '편의점에서 사 오겠습니다.',
          jp: 'コンビニで買(か)ってきます。',
          pronunciation: '콘비니데 캇테 키마스',
          furigana: 'こんびにでかってきます',
        },
        note: '"~하고 나서 돌아오다". 잠깐 다녀오는 표현으로 자주 쓰인다.\n「買ってきます」= 사 오겠습니다.',
      },
      {
        type: 'basic',
        meaning: '점점 〜해졌다 (변화의 결과)',
        example: {
          kr: '일본어가 점점 늘었다.',
          jp: '日本語(にほんご)が上手(じょうず)になってきた。',
          pronunciation: '니홍고가 죠-즈니 낫테 키타',
          furigana: 'にほんごがじょうずになってきた',
        },
        note: '과거부터 지금까지 변화가 쌓여왔음.\nていく(미래 방향) ↔ てくる(과거→현재 방향).',
      },
    ],
  },

  {
    id: 'te-oku',
    category: 'te',
    pattern: '〜ておく',
    reading: '테 오쿠',
    meanings: ['〜해 두다', '〜해 놓다 (사전 준비·현상 유지)'],
    connection: '동사 て형 + おく',
    explanation: '"나중을 위해 미리 해두다"가 핵심 의미예요. "예약해 두다", "열어 놓다"처럼 준비나 상태 유지를 표현해요. 회화에서는 「〜とく」로 줄여 쓰는 경우가 많아요 (예: 予約しとく).',
    usages: [
      {
        type: 'basic',
        meaning: '미리 〜해 두다 (준비)',
        example: {
          kr: '여행 전에 호텔을 예약해 두겠습니다.',
          jp: '旅行(りょこう)の前(まえ)にホテルを予約(よやく)しておきます。',
          pronunciation: '료코-노 마에니 호테루오 요야쿠 시테 오키마스',
          furigana: 'りょこうのまえにほてるをよやくしておきます',
        },
        note: '나중에 필요할 것을 미리 해 놓는다.\n회화에서는 「〜とく」로 줄여 말함 (예: 予約しとく).',
      },
      {
        type: 'applied',
        meaning: '그대로 〜해 두다 (현상 유지)',
        example: {
          kr: '문은 열어 두세요.',
          jp: 'ドアを開(あ)けておいてください。',
          pronunciation: '도아오 아케테 오이테 쿠다사이',
          furigana: 'どあをあけておいてください',
        },
        note: '상태를 바꾸지 않고 그대로 유지.\n「開けておく」= "열어 놓다".',
      },
    ],
  },

  {
    id: 'te-shimau',
    category: 'te',
    pattern: '〜てしまう',
    reading: '테 시마우',
    meanings: ['〜해 버리다', '〜해 버렸다 (완료 강조·후회·유감)'],
    connection: '동사 て형 + しまう',
    explanation: '"어쩌다 ~해버렸다"는 후회나 아쉬움, 또는 "완전히 다 ~해버렸다"는 완료 강조에 써요. 의도하지 않은 실수나 돌이킬 수 없는 일을 표현할 때 딱 맞아요. 회화에서는 「〜ちゃった」로 줄여 쓰는 경우가 많아요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜해 버렸다 (후회·유감)',
        example: {
          kr: '숙제를 잊어버렸다.',
          jp: '宿題(しゅくだい)を忘(わす)れてしまった。',
          pronunciation: '슈쿠다이오 와스레테 시맛타',
          furigana: 'しゅくだいをわすれてしまった',
        },
        note: '의도치 않은 일에 대한 후회·유감.\n회화에서는 「〜ちゃった」로 줄여 말함 (예: 忘れちゃった).',
      },
      {
        type: 'basic',
        meaning: '완전히 〜해 버렸다 (완료 강조)',
        example: {
          kr: '케이크를 다 먹어버렸다.',
          jp: 'ケーキを全部(ぜんぶ)食(た)べてしまった。',
          pronunciation: '케-키오 젬부 타베테 시맛타',
          furigana: 'けーきをぜんぶたべてしまった',
        },
        note: '완료 강조: 전부 다 끝내버렸다는 의미.\n긍정적 완료에도 사용 가능 (예: 仕事が終わってしまった).',
      },
      {
        type: 'applied',
        meaning: '〜ちゃった (구어 축약형)',
        example: {
          kr: '비밀을 말해버렸어.',
          jp: '秘密(ひみつ)を言(い)っちゃった。',
          pronunciation: '히미츠오 잇챳타',
          furigana: 'ひみつをいっちゃった',
        },
        note: '「てしまった」→「ちゃった」: 일상 회화의 축약형.\n동사에 따라 でしまった→じゃった (예: 飲んじゃった)로 변하기도 함.',
      },
    ],
  },

  {
    id: 'te-ageru',
    category: 'giving',
    pattern: '〜てあげる',
    reading: '테 아게루',
    meanings: ['〜해 주다', '〜해 드리다 (내가 남에게)'],
    connection: '동사 て형 + あげる',
    explanation: '내가 상대방을 위해 뭔가를 해줄 때 쓰는 표현이에요. 방향은 항상 나→상대. "들어줬다", "찍어드릴까요?"처럼요. 윗사람에게는 「〜てさしあげる」를 씁니다. てあげる↔てくれる↔てもらう 세트로 함께 외우면 더 이해하기 쉬워요.',
    usages: [
      {
        type: 'basic',
        meaning: '내가 상대에게 〜해 주다',
        example: {
          kr: '친구의 짐을 들어줬다.',
          jp: '友達(ともだち)の荷物(にもつ)を持(も)ってあげた。',
          pronunciation: '토모다치노 니모츠오 못테 아게타',
          furigana: 'ともだちのにもつをもってあげた',
        },
        note: '혜택을 주는 방향: 나→상대.\n윗사람에게는 「〜てさしあげる」를 사용.',
      },
      {
        type: 'applied',
        meaning: '〜해 드릴까요? (도움 제의)',
        example: {
          kr: '사진을 찍어 드릴까요?',
          jp: '写真(しゃしん)を撮(と)ってあげましょうか。',
          pronunciation: '샤싱오 톳테 아게마쇼-카',
          furigana: 'しゃしんをとってあげましょうか',
        },
        note: '「〜てあげましょうか」= "~해 드릴까요?" (도움 제의).\nてあげる↔てくれる↔てもらう 세트로 익히면 좋다.',
      },
    ],
  },

  {
    id: 'te-kureru',
    category: 'giving',
    pattern: '〜てくれる',
    reading: '테 쿠레루',
    meanings: ['〜해 주다 (남이 나에게)', '〜해 줬다'],
    connection: '동사 て형 + くれる',
    explanation: '상대방이 나를 위해 뭔가를 해줄 때 쓰는 표현이에요. 방향은 항상 상대→나. 자연스럽게 고마움의 뉘앙스가 담겨요. "도와줬다", "알려줄 수 있어요?"처럼요. てあげる(내→상대)의 반대 방향이에요.',
    usages: [
      {
        type: 'basic',
        meaning: '남이 나에게 〜해 주다',
        example: {
          kr: '친구가 도와줬다.',
          jp: '友達(ともだち)が手伝(てつだ)ってくれた。',
          pronunciation: '토모다치가 테츠닷테 쿠레타',
          furigana: 'ともだちがてつだってくれた',
        },
        note: '혜택을 받는 방향: 상대→나.\nてあげる의 반대 방향. 주어는 남, 혜택받는 쪽은 나.',
      },
      {
        type: 'applied',
        meaning: '〜해 줄 수 있어요? (부탁)',
        example: {
          kr: '역까지 가는 길을 알려줄 수 있나요?',
          jp: '駅(えき)までの道(みち)を教(おし)えてくれませんか。',
          pronunciation: '에키마데노 미치오 오시에테 쿠레마셍카',
          furigana: 'えきまでのみちをおしえてくれませんか',
        },
        note: '부탁: 「〜てくれませんか」= "~해 주시겠어요?"\n더 정중: 「〜ていただけませんか」.',
      },
    ],
  },

  {
    id: 'tokoro',
    category: 'te',
    pattern: '〜ところ',
    reading: '토코로',
    meanings: ['〜하는 참이다', '〜하려던 참이다', '막 〜한 참이다'],
    connection: '동사 기본형/ている/た + ところ',
    explanation: '"딱 그 타이밍"을 표현하는 패턴이에요. 동사 형태에 따라 의미가 세 가지로 나뉘어요: 기본형+ところ="하려는 참", ている+ところ="하는 중", た+ところ="방금 막 한 참". 한국어의 "~하려던 참이에요"와 거의 같아요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하려던 참이다 (동작 직전)',
        example: {
          kr: '지금 나가려는 참이에요.',
          jp: '今(いま)出(で)かけるところです。',
          pronunciation: '이마 데카케루 토코로데스',
          furigana: 'いまでかけるところです',
        },
        note: '직전: 「기본형 + ところ」.\n3단계: 行くところ(가려는)→行っているところ(가는 중)→行ったところ(방금 갔다)',
      },
      {
        type: 'basic',
        meaning: '〜하는 중이다 (동작 진행)',
        example: {
          kr: '지금 밥 먹는 중이에요.',
          jp: '今(いま)ご飯(はん)を食(た)べているところです。',
          pronunciation: '이마 고항오 타베테이루 토코로데스',
          furigana: 'いまごはんをたべているところです',
        },
        note: '진행: 「ている + ところ」.\n정확히 그 순간에 하고 있다는 것을 강조.',
      },
      {
        type: 'applied',
        meaning: '막 〜한 참이다 (동작 직후)',
        example: {
          kr: '방금 막 끝난 참이에요.',
          jp: 'ちょうど終(お)わったところです。',
          pronunciation: '쵸-도 오왓타 토코로데스',
          furigana: 'ちょうどおわったところです',
        },
        note: '직후: 「た형 + ところ」.\n「ちょうど」(딱·마침)와 자주 함께 쓰인다.',
      },
    ],
  },

  /* ── 추측·양태 ── */
  {
    id: 'you-da',
    category: 'conjecture',
    pattern: '〜ようだ',
    reading: '요-다',
    meanings: ['〜인 것 같다 (직접 보고 판단)', '〜처럼 보인다'],
    connection: '동사·い형 보통형 + ようだ / な형·명사 + な + ようだ',
    explanation: '직접 눈으로 보거나 느낀 것을 바탕으로 "~같다"고 판단할 때 써요. 약간 격식체 느낌이에요. 비유로 "마치 꿈 같다(まるで夢のようだ)"처럼도 써요. 비슷한 표현인 みたいだ(구어), らしい(소문 기반)과 세트로 익혀두세요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜인 것 같다 (관찰 기반)',
        example: {
          kr: '비가 올 것 같다.',
          jp: '雨(あめ)が降(ふ)るようだ。',
          pronunciation: '아메가 후루 요-다',
          furigana: 'あめがふるようだ',
        },
        note: '직접 보거나 느낀 증거 기반의 추측. 객관적 판단 느낌.\nようだ(직접)·らしい(소문)·みたいだ(구어) 세트로 익힐 것.',
      },
      {
        type: 'applied',
        meaning: '〜처럼 보인다 (비유)',
        example: {
          kr: '마치 꿈 같다.',
          jp: 'まるで夢(ゆめ)のようだ。',
          pronunciation: '마루데 유메노 요-다',
          furigana: 'まるでゆめのようだ',
        },
        note: '비유: 「まるで〜のようだ」= "마치 ~같다".\n소설·문학에서 자주 등장하는 표현.',
      },
    ],
  },

  {
    id: 'rashii',
    category: 'conjecture',
    pattern: '〜らしい',
    reading: '라시이',
    meanings: ['〜인 것 같다 (소문·전문 기반)', '〜답다 (전형적 특성)'],
    connection: '동사·형용사 보통형 + らしい / 명사 + らしい',
    explanation: '"들은 이야기를 전달"하거나 "~답다"는 뜻으로 써요. "결혼한대"처럼 직접 확인하지 않고 들은 정보를 말할 때, 또는 "男らしい(남자답다)"처럼 전형적 특성을 표현할 때 써요. ようだ(직접 본 것) vs らしい(들은 것) 차이가 포인트예요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜인 것 같다 (전문·소문 기반)',
        example: {
          kr: '다나카 씨는 결혼할 것 같아.',
          jp: '田中(たなか)さんは結婚(けっこん)するらしい。',
          pronunciation: '타나카상와 켁콩 스루 라시이',
          furigana: 'たなかさんはけっこんするらしい',
        },
        note: '들은 정보를 전달: 직접 확인하지 않은 소문·전문.\nようだ(직접 판단) vs らしい(들은 정보로 판단).',
      },
      {
        type: 'applied',
        meaning: '〜답다 (전형적 특성)',
        example: {
          kr: '그다운 발상이네.',
          jp: '彼(かれ)らしい発想(はっそう)だね。',
          pronunciation: '카레라시이 핫소-다네',
          furigana: 'かれらしいはっそうだね',
        },
        note: '특성의 らしい: 「명사+らしい」= "~답다".\n「男らしい」(남자답다)·「春らしい」(봄답다) 등 형용사처럼 활용.',
      },
    ],
  },

  {
    id: 'mitai-da',
    category: 'conjecture',
    pattern: '〜みたいだ',
    reading: '미타이다',
    meanings: ['〜인 것 같다 (구어체)', '〜처럼 보인다'],
    connection: '동사·형용사 보통형 + みたいだ / 명사 + みたいだ',
    explanation: 'ようだ의 일상 편한 말투 버전이에요. "~인 것 같아", "~처럼"을 표현할 때 가장 자주 쓰이는 추측 표현이에요. 명사에 바로 붙일 수 있어서 접속도 편해요(な형·명사에 な 불필요). 일상 대화에서는 ようだ보다 みたいだ가 훨씬 자연스러워요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜인 것 같다 (구어)',
        example: {
          kr: '그는 화가 난 것 같아.',
          jp: '彼(かれ)は怒(おこ)っているみたいだ。',
          pronunciation: '카레와 오콧테이루 미타이다',
          furigana: 'かれはおこっているみたいだ',
        },
        note: 'ようだ의 구어체. 일상 대화에서 더 자연스럽다.\n명사 접속: 「명사+みたいだ」(な 불필요) ← ようだ와 차이점.',
      },
      {
        type: 'applied',
        meaning: '〜처럼 (비유, 구어)',
        example: {
          kr: '영화 같은 이야기네.',
          jp: '映画(えいが)みたいな話(はなし)だね。',
          pronunciation: '에-가 미타이나 하나시다네',
          furigana: 'えいがみたいなはなしだね',
        },
        note: '비유: 「명사+みたいな+명사」= "~같은 ~".\n「まるで映画みたい」도 자주 쓰임.',
      },
    ],
  },

  {
    id: 'kamo-shirenai',
    category: 'conjecture',
    pattern: '〜かもしれない',
    reading: '카모 시레나이',
    meanings: ['〜일지도 모른다', '〜할 수도 있다'],
    connection: '동사·형용사 보통형 + かもしれない / 명사 + かもしれない',
    explanation: '"어쩌면 ~일 수도 있어"처럼 반반도 안 되는 낮은 가능성을 표현해요. 확신하지 못할 때, 또는 단정 짓는 걸 피하고 싶을 때 자주 써요. 회화에서는 "かも"로 줄여 "そうかも~(그럴 수도~)"처럼 편하게 씁니다.',
    usages: [
      {
        type: 'basic',
        meaning: '〜일지도 모른다 (불확실한 추측)',
        example: {
          kr: '내일은 비가 올지도 몰라.',
          jp: '明日(あした)は雨(あめ)が降(ふ)るかもしれない。',
          pronunciation: '아시타와 아메가 후루 카모시레나이',
          furigana: 'あしたはあめがふるかもしれない',
        },
        note: '반반 이하의 가능성. ようだ(80%↑)보다 낮은 확실도.\n「かもしれません」이 정중체. 회화에서 「かも」로 줄이기도 함.',
      },
      {
        type: 'applied',
        meaning: '〜했을지도 모른다 (과거 추측)',
        example: {
          kr: '그가 거짓말을 했을지도 모른다.',
          jp: '彼(かれ)が嘘(うそ)をついたかもしれない。',
          pronunciation: '카레가 우소오 츠이타 카모시레나이',
          furigana: 'かれがうそをついたかもしれない',
        },
        note: '과거 추측: 동사 た형 + かもしれない.\n현재·미래와 동일 구조로 문맥으로 구분.',
      },
      {
        type: 'applied',
        meaning: '〜かも (구어 줄임형)',
        example: {
          kr: '그럴 수도 있지.',
          jp: 'そうかもね。',
          pronunciation: '소- 카모 네',
          furigana: 'そうかもね',
        },
        note: '「かもしれない」→「かも」: 친구 사이 일상 대화에서 자주 쓰임.\n「かもね(그럴 수도~)」「かもな(그럴지도~)」처럼 뒤에 ね·な를 붙여 어감 조절.',
      },
    ],
  },

  /* ── 이유·원인 ── */
  {
    id: 'node',
    category: 'reason',
    pattern: '〜ので',
    reading: '노데',
    meanings: ['〜이기 때문에', '〜이므로 (객관적·정중한 이유)'],
    connection: '동사·い형 보통형 + ので / な형·명사 + なので',
    explanation: '이유를 정중하고 부드럽게 전달할 때 써요. から보다 어조가 부드러워서 직장·공식적인 상황에 더 잘 어울려요. "회의 중이라서요"처럼 상대방의 양해를 구하거나 사과할 때 ので를 쓰면 자연스러워요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜이기 때문에 (정중한 이유)',
        example: {
          kr: '비가 오고 있으니, 우산을 가져가겠습니다.',
          jp: '雨(あめ)が降(ふ)っているので、傘(かさ)を持(も)っていきます。',
          pronunciation: '아메가 훗테이루노데 카사오 못테 이키마스',
          furigana: 'あめがふっているので、かさをもっていきます',
        },
        note: 'ので vs から: ので는 객관적·정중, から는 주관적·직접적.\n비즈니스·경어 상황에는 ので가 더 자연스럽다.',
      },
      {
        type: 'applied',
        meaning: '〜이므로, 〜해 주세요 (정중한 요청)',
        example: {
          kr: '회의 중이오니, 나중에 연락해 주세요.',
          jp: '会議中(かいぎちゅう)なので、後(あと)で連絡(れんらく)してください。',
          pronunciation: '카이기쥬-나노데 아토데 렌라쿠 시테 쿠다사이',
          furigana: 'かいぎちゅうなので、あとでれんらくしてください',
        },
        note: 'な형·명사 뒤에는 「なので」.\n부탁이나 사과의 이유를 부드럽게 제시할 때 유용.',
      },
    ],
  },

  {
    id: 'kara',
    category: 'reason',
    pattern: '〜から',
    reading: '카라',
    meanings: ['〜이니까', '〜이기 때문에 (주관적·직접적)'],
    connection: '동사·형용사 보통형 + から / 명사 + だから',
    explanation: '이유를 직접적이고 솔직하게 말할 때 쓰는 가장 기본적인 이유 표현이에요. 일상 대화에서 압도적으로 많이 써요. ので보다 조금 강한 어감이라 친구나 편한 사이에서 더 자연스러워요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜이니까 (주관적 이유)',
        example: {
          kr: '머리가 아프니까 일찍 돌아가겠습니다.',
          jp: '頭(あたま)が痛(いた)いから、早(はや)く帰(かえ)ります。',
          pronunciation: '아타마가 이타이카라 하야쿠 카에리마스',
          furigana: 'あたまがいたいから、はやくかえります',
        },
        note: 'から vs ので: から는 주관적·구어적.\n「から」 뒤에는 명령·의뢰·의지 표현도 자주 온다.',
      },
      {
        type: 'applied',
        meaning: '〜이니까 〜하세요 (이유→지시)',
        example: {
          kr: '위험하니까 뛰지 마세요.',
          jp: '危(あぶ)ないから、走(はし)らないでください。',
          pronunciation: '아부나이카라 하시라나이데 쿠다사이',
          furigana: 'あぶないから、はしらないでください',
        },
        note: 'から 뒤에 ~てください·~なさい 등이 자연스럽게 온다.\nので 뒤에는 강한 명령이 어색할 수 있음.',
      },
    ],
  },

  {
    id: 'no-da-kara',
    category: 'reason',
    pattern: '〜のだから',
    reading: '노다카라',
    meanings: ['〜이니까 (당연한 이유·주장 강조)', '〜인 것이니까'],
    connection: '동사·형용사 보통형 + のだから / な형·명사 + なのだから',
    explanation: '"당연히 ~해야지!"처럼 이유를 강하게 주장할 때 써요. から보다 훨씬 강조 어감이 강해요. "약속했잖아, 그러니까 해!"처럼 설득하거나 당위성을 주장할 때 딱 맞는 표현이에요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜이니까 당연히 〜해야 한다',
        example: {
          kr: '약속했으니까 제대로 해라.',
          jp: '約束(やくそく)したのだから、ちゃんとやりなさい。',
          pronunciation: '야쿠소쿠 시타노다카라 쨩토 야리나사이',
          furigana: 'やくそくしたのだから、ちゃんとやりなさい',
        },
        note: '당연한 귀결을 강조. から보다 이유·근거를 더 강하게 주장.\n「〜のだから〜べきだ」구조로 자주 쓰인다.',
      },
      {
        type: 'applied',
        meaning: '〜인 것이니까 (사정 설명)',
        example: {
          kr: '학생이니까 더 공부해야 해.',
          jp: '学生(がくせい)なのだから、もっと勉強(べんきょう)すべきだ。',
          pronunciation: '각세-나노다카라 못토 벵쿄- 스베키다',
          furigana: 'がくせいなのだから、もっとべんきょうすべきだ',
        },
        note: 'な형·명사 뒤: 「なのだから」.\n설득이나 당위성 주장에 주로 쓰임.',
      },
    ],
  },

  {
    id: 'no-ni',
    category: 'reason',
    pattern: '〜のに',
    reading: '노니',
    meanings: ['〜인데 (불만·의외)', '〜임에도 불구하고'],
    connection: '동사·い형 보통형 + のに / な형·명사 + な + のに',
    explanation: '"그렇게 열심히 했는데 왜!"처럼 기대와 다른 결과가 나왔을 때의 불만·아쉬움을 담는 표현이에요. 단순 역접인 が("~지만")보다 감정이 훨씬 강하게 담겨요. 문장 끝에 のに만 붙여도 혼잣말로 아쉬움을 표현할 수 있어요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜인데 (기대에 반하는 결과)',
        example: {
          kr: '열심히 했는데 실패했다.',
          jp: '一生懸命(いっしょうけんめい)やったのに、失敗(しっぱい)した。',
          pronunciation: '잇쇼-켐메- 얏타노니 싯파이 시타',
          furigana: 'いっしょうけんめいやったのに、しっぱいした',
        },
        note: '역접의 のに: 앞 내용과 반대 결과가 왔을 때.\n불만·아쉬움이 담김. が(단순 역접)보다 감정적.',
      },
      {
        type: 'applied',
        meaning: '〜하면 좋을 텐데 (아쉬움)',
        example: {
          kr: '같이 오면 좋을 텐데.',
          jp: '一緒(いっしょ)に来(き)てくれればいいのに。',
          pronunciation: '잇쇼니 키테쿠레레바 이이노니',
          furigana: 'いっしょにきてくれればいいのに',
        },
        note: '문장 끝 のに: "~인데..." 하고 아쉬움을 혼잣말처럼 표현.\n실현되지 않은 바람을 나타낼 때 자주 쓰임.',
      },
    ],
  },

  /* ── こと 표현 ── */
  {
    id: 'koto-da',
    category: 'koto',
    pattern: '〜ことだ',
    reading: '코토다',
    meanings: ['〜하는 것이 좋다', '〜해야 한다 (조언·충고)'],
    connection: '동사 기본형/ない형 + ことだ',
    explanation: '"~하는 게 좋아"라고 조언할 때 쓰는 표현이에요. 명령(なさい)보다는 부드럽고, 권유(たほうがいい)보다는 조금 직접적인 어감이에요. 부모님이 자녀에게, 선배가 후배에게 충고할 때 자연스럽게 쓰여요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하는 것이 좋다 (조언)',
        example: {
          kr: '건강을 위해 일찍 자는 것이 좋아.',
          jp: '健康(けんこう)のために早(はや)く寝(ね)ることだ。',
          pronunciation: '켕코-노 타메니 하야쿠 네루 코토다',
          furigana: 'けんこうのためにはやくねることだ',
        },
        note: '"~하는 것이 좋다/바람직하다".\nなさい(명령)보다 부드럽고, たほうがいい보다 직설적인 중간 어조.',
      },
      {
        type: 'applied',
        meaning: '〜하지 않는 것이 좋다 (부정 조언)',
        example: {
          kr: '무리하지 않는 게 좋아.',
          jp: '無理(むり)をしないことだ。',
          pronunciation: '무리오 시나이 코토다',
          furigana: 'むりをしないことだ',
        },
        note: '부정 조언: 「ない형 + ことだ」.\n주로 충고·당부할 때 쓰인다.',
      },
    ],
  },

  {
    id: 'koto-ni-suru',
    category: 'koto',
    pattern: '〜ことにする',
    reading: '코토니 스루',
    meanings: ['〜하기로 하다', '〜하기로 결정하다 (자신의 의지)'],
    connection: '동사 기본형/ない형 + ことにする',
    explanation: '"내가 직접 결정했다"는 의지를 표현해요. 한국어 "~하기로 했어"와 거의 같아요. ことにする(내 결정) ↔ ことになる(외부·상황에 의한 결정)를 세트로 기억하면 헷갈리지 않아요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하기로 하다 (자신의 결정)',
        example: {
          kr: '매일 운동하기로 했다.',
          jp: '毎日(まいにち)運動(うんどう)することにした。',
          pronunciation: '마이니치 운도- 스루코토니 시타',
          furigana: 'まいにちうんどうすることにした',
        },
        note: '자신의 의지 결정: ことにする(내 결정) ↔ ことになる(외부 결정).\n「〜ことにしました」가 정중체.',
      },
      {
        type: 'applied',
        meaning: '〜하지 않기로 하다 (부정 결정)',
        example: {
          kr: '술을 마시지 않기로 했다.',
          jp: 'お酒(さけ)を飲(の)まないことにした。',
          pronunciation: '오사케오 노마나이 코토니 시타',
          furigana: 'おさけをのまないことにした',
        },
        note: '부정 결정: 「ない형 + ことにする」.\n자기 자신과의 약속·결심에 가까운 표현.',
      },
    ],
  },

  {
    id: 'koto-ni-naru',
    category: 'koto',
    pattern: '〜ことになる',
    reading: '코토니 나루',
    meanings: ['〜하게 되다', '〜하게 됐다 (외부적 결정·상황)'],
    connection: '동사 기본형/ない형 + ことになる',
    explanation: '회사·상황 등 외부 사정으로 그렇게 됐을 때 써요. "전근하게 됐어", "결국 이렇게 됐네"처럼 내 의지와 무관하게 결정된 것을 객관적으로 전달하는 표현이에요. ことにする(내 결정)와 반드시 세트로 외워두세요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하게 됐다 (외부 결정)',
        example: {
          kr: '내년에 도쿄로 전근하게 됐다.',
          jp: '来年(らいねん)東京(とうきょう)に転勤(てんきん)することになった。',
          pronunciation: '라이넨 토-쿄-니 텡킹 스루코토니 낫타',
          furigana: 'らいねんとうきょうにてんきんすることになった',
        },
        note: '회사·상황 등에 의해 정해진 것을 객관적으로 전달.\nことにする(내 결정) ↔ ことになる(외부 결정).',
      },
      {
        type: 'applied',
        meaning: '결국 〜하게 됐다 (귀결)',
        example: {
          kr: '결국 둘이 함께 살게 됐다.',
          jp: '結局(けっきょく)二人(ふたり)で暮(く)らすことになった。',
          pronunciation: '켁쿄쿠 후타리데 쿠라스 코토니 낫타',
          furigana: 'けっきょくふたりでくらすことになった',
        },
        note: '여러 상황 끝에 자연스럽게 그렇게 됨.\n「結局」(결국)과 자주 함께 쓰인다.',
      },
    ],
  },

  {
    id: 'koto-ni-natte-iru',
    category: 'koto',
    pattern: '〜ことになっている',
    reading: '코토니 낫테이루',
    meanings: ['〜하기로 되어 있다', '〜하는 것으로 정해져 있다 (규정·예정)'],
    connection: '동사 기본형/ない형 + ことになっている',
    explanation: '이미 정해진 규칙이나 예정이 지금도 유효할 때 써요. "교복을 입기로 되어 있다", "내일 회의가 열리기로 되어 있다"처럼 공식적으로 정해진 것을 객관적으로 설명하는 표현이에요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하기로 되어 있다 (규정)',
        example: {
          kr: '이 학교에서는 교복을 입기로 되어 있다.',
          jp: 'この学校(がっこう)では制服(せいふく)を着(き)ることになっている。',
          pronunciation: '코노 각코-데와 세이후쿠오 키루 코토니 낫테이루',
          furigana: 'このがっこうではせいふくをきることになっている',
        },
        note: '이미 정해진 규칙이 지금도 적용 중.\nことになる(됐다) → ことになっている(되어 있다): 상태 지속 표현.',
      },
      {
        type: 'applied',
        meaning: '〜하기로 예정되어 있다',
        example: {
          kr: '내일 회의가 열리기로 되어 있다.',
          jp: '明日(あした)会議(かいぎ)が開(ひら)かれることになっている。',
          pronunciation: '아시타 카이기가 히라카레루 코토니 낫테이루',
          furigana: 'あしたかいぎがひらかれることになっている',
        },
        note: '공식적으로 정해진 일정이나 계획.\nことにしている(개인 습관)과 달리 외부적으로 정해진 것에 사용.',
      },
    ],
  },

  {
    id: 'koto-ni-shite-iru',
    category: 'koto',
    pattern: '〜ことにしている',
    reading: '코토니 시테이루',
    meanings: ['〜하기로 하고 있다', '〜하는 것을 습관으로 삼고 있다'],
    connection: '동사 기본형/ない형 + ことにしている',
    explanation: '내가 결심해서 지금도 습관적으로 실천하고 있을 때 써요. "매일 아침 조깅하기로 하고 있어"처럼 자신이 정한 생활 규칙을 나타내요. ことにする(한 번의 결정) → ことにしている(계속 실천 중)으로 이해하면 쉬워요.',
    usages: [
      {
        type: 'basic',
        meaning: '〜하는 것을 습관으로 삼고 있다',
        example: {
          kr: '매일 아침 조깅하기로 하고 있다.',
          jp: '毎朝(まいあさ)ジョギングすることにしている。',
          pronunciation: '마이아사 조깅구 스루코토니 시테이루',
          furigana: 'まいあさじょぎんぐすることにしている',
        },
        note: 'ことにする(한 번의 결정) → ことにしている(계속 실천 중).\n자신이 정한 생활 규칙·방침을 나타낼 때 자주 쓰임.',
      },
      {
        type: 'applied',
        meaning: '〜하지 않는 것을 원칙으로 삼고 있다',
        example: {
          kr: '자기 전에는 스마트폰을 보지 않기로 하고 있다.',
          jp: '寝(ね)る前(まえ)はスマホを見(み)ないことにしている。',
          pronunciation: '네루 마에와 스마호오 미나이 코토니 시테이루',
          furigana: 'ねるまえはすまほをみないことにしている',
        },
        note: '부정 습관: 「ない형 + ことにしている」.\n자신이 정한 금지·제한 규칙을 나타낼 때 사용.',
      },
    ],
  },
]
