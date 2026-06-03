/* 동사 학습 데이터
 * 새 동사 추가 시 이 배열에 객체를 추가하면 됨
 */

export const CATEGORIES = [
  { id: "basic",     name: "기본 동사" },
  { id: "move",      name: "이동 동사" },
  { id: "daily",     name: "일상 동사" },
  { id: "emotion",   name: "감정 동사" },
  { id: "work",      name: "업무 동사" },
]

export const VERBS = [
  {
    id: "suru",
    category: "basic",
    verb: "する",
    reading: "스루",
    meaning: "하다",
    forms: [
      {
        name: "현재형",
        nameJp: "現在形",
        rows: [
          {
            label: "긍정",
            sub: "현재/미래",
            formal:   { text: "します",      ruby: "시마스",    meaning: "합니다 / 할 겁니다"    },
            casual:   { text: "する",         ruby: "스루",      meaning: "해 / 할 거야"          },
          },
          {
            label: "부정",
            sub: "현재/미래",
            formal:   { text: "しません",     ruby: "시마셍",    meaning: "안 합니다 / 안 할 겁니다" },
            casual:   { text: "しない",       ruby: "시나이",    meaning: "안 해 / 안 할 거야"    },
          },
          {
            label: "긍정 의문",
            sub: "",
            formal:   { text: "しますか？",   ruby: "시마스까?", meaning: "합니까?"               },
            casual:   { text: "する？↑",      ruby: "스루?",     meaning: "해?"                   },
          },
          {
            label: "부정 의문",
            sub: "",
            formal:   { text: "しませんか？", ruby: "시마셍까?", meaning: "안 합니까?"             },
            casual:   { text: "しない？↑",    ruby: "시나이?",   meaning: "안 해?"                },
          },
        ],
      },
    ],
    examples: [
      {
        korean:   "매일 공부합니다.",
        japanese: "毎日(まいにち)、勉強(べんきょう)します。",
        plain:    "毎日、勉強します。",
        reading:  "마이니치, 벵쿄시마스.",
      },
      {
        korean:   "오늘은 일 안 해요.",
        japanese: "今日(きょう)は仕事(しごと)しない。",
        plain:    "今日は仕事しない。",
        reading:  "쿄와 시고토 시나이.",
      },
      {
        korean:   "내일 같이 운동할래요?",
        japanese: "明日(あした)、一緒(いっしょ)に運動(うんどう)しますか？",
        plain:    "明日、一緒に運動しますか？",
        reading:  "아시타, 잇쇼니 운도시마스까?",
      },
    ],
  },
  // TODO: 새 동사 여기에 추가
]
