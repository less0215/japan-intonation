/* 문법 패턴 데이터 (테스트: ~ましょう 1개)
 *
 * 스키마 (조사 particles.js 구조 확장)
 * {
 *   id          : URL용 영문 식별자
 *   level       : 난이도/급수 라벨 (예: 'N5')
 *   pattern     : 패턴 표기 (예: '〜ましょう')
 *   reading     : 한글 독음
 *   meanings    : 의미 태그 배열
 *   connection  : 접속 규칙 (예: '동사 ます형 + ましょう')
 *   explanation : 패턴 한 줄 설명
 *   usages: [{
 *     type   : 'basic' | 'applied'
 *     meaning: 용법 설명
 *     example: { kr, jp(한자(요미) 표기), pronunciation, furigana, accentData }
 *     note   : 문법 포인트 (\n 줄바꿈, whiteSpace pre-line)
 *   }]
 * }
 *
 * ※ accentData(피치)는 짧은 문장 기준 근사값. 추후 정밀 보정 가능.
 */
export const GRAMMAR = [
  {
    id: 'mashou',
    level: 'N5',
    pattern: '〜ましょう',
    reading: '마쇼-',
    meanings: ['〜합시다', '〜할까요? (권유·제안)'],
    connection: '동사 ます형 (ます 떼고) + ましょう',
    explanation:
      '상대에게 함께 어떤 행동을 하자고 권유하거나 제안할 때 쓰는 정중한 표현. 「〜ましょうか」는 상대 의향을 더 부드럽게 묻는 느낌이 된다.',
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
        note:
          '권유: 「ます형 + ましょう」는 "~합시다". 함께 할 것을 적극적으로 제안.\n一緒に行きましょう에서 行きます → 行き + ましょう.\n혼잣말 의지("~해야지")로도 쓰이지만 기본은 상대를 포함한 권유.',
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
        note:
          '식사·휴식 등 일상 권유에 자연스럽게 사용.\n食べます → 食べ + ましょう.\nそろそろ(슬슬)와 함께 쓰면 "이제 ~할 때가 됐다"는 뉘앙스.',
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
        note:
          '제안·도움 제의: 「ましょうか」는 상대 의향을 부드럽게 물음.\n持ちます → 持ち + ましょうか.\n"~할까요?"로 상대를 배려하는 표현. 자기 행동을 제의할 때 자주 사용.',
      },
    ],
  },
]
