/* 동사 학습 데이터
 * rank: 전체 순위 (1위부터)
 * examples[].accentData / furigana: PitchGraph에 사용
 */

/* rank 범위에서 탭 레이블 생성 */
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
  {
    id: "suru",
    rank: 1,
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
        furigana: "まいにちべんきょうします",
        accentData: [
          { phrase_id: 0, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 1, mora_count: 8, accent: [1, 0, 0, 0, 0, 1, 1, 1] },
        ],
      },
      {
        korean:   "오늘은 일 안 해요.",
        japanese: "今日(きょう)は仕事(しごと)しない。",
        plain:    "今日は仕事しない。",
        reading:  "쿄와 시고토 시나이.",
        furigana: "きょうはしごとしない",
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [1, 0, 0] },
          { phrase_id: 1, mora_count: 8, accent: [0, 1, 1, 1, 1, 0, 0, 0] },
        ],
      },
      {
        korean:   "내일 같이 운동할래요?",
        japanese: "明日(あした)、一緒(いっしょ)に運動(うんどう)しますか？",
        plain:    "明日、一緒に運動しますか？",
        reading:  "아시타, 잇쇼니 운도시마스까?",
        furigana: "あしたいっしょにうんどうしますか",
        accentData: [
          { phrase_id: 0, mora_count: 3, accent: [0, 1, 1] },
          { phrase_id: 1, mora_count: 4, accent: [0, 1, 1, 1] },
          { phrase_id: 2, mora_count: 8, accent: [0, 1, 1, 1, 1, 1, 1, 1] },
        ],
      },
    ],
  },
  // TODO: 새 동사 여기에 추가
]
