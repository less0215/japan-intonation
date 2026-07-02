// 표현 검색(YouGlish식) — 문법 패턴별 "검색 시그니처".
// ko: 한국어 입력이 이 패턴을 가리키는 별칭들(느슨하게 매칭 — 같은 한국어가 여러 패턴을 가리키면
//     선택칩으로 갈라 보여준다. 예: '할 거야' → 思う / 予定 / つもり).
// jpRe: 영상 자막(평문 jp)에서 이 패턴이 쓰인 대사를 찾는 정규식 시그니처(활용형 포함).
// note: 뉘앙스 한 줄(결과 화면 안내용).
// ⚠️ P1 프로토타입 — 흔한 표현 위주로 시작. 정규식은 오탐이 있을 수 있어 점진적으로 다듬는다.
export const EXPRESSION_SIGNATURES = [
  {
    id: 'omou',
    kr: '~하려고 하다',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'desire-you-to-omou',   // /grammar/desire-you-to-omou 상세 페이지와 연결
    label: '〜(よ)うと思う',
    reading: '(요)-토 오모우',
    ko: ['하려고 해', '하려고', '하려고 한다', '해야지', '할 거야', '할까 해'],
    en: ['going to', 'thinking of', 'planning to'],
    jpRe: /(よう|おう|こう|そう|とう|のう|もう|ぼう|ろう|ごう|ぞう|どう)と(?:おも|思)/,
    note: '지금 막 마음먹은 주관적 의지. 말하기 직전에 정한 느낌(바뀔 수도 있음).',
  },
  {
    id: 'yotei',
    kr: '~할 예정',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'desire-yotei-da',   // /grammar/desire-yotei-da 상세 페이지와 연결
    label: '〜予定だ',
    reading: '요테-다',
    ko: ['할 예정', '예정이야', '예정이다', '예정', '할 거야'],
    en: ['scheduled to', 'plan', 'planned'],
    jpRe: /予定/,
    note: '이미 정해진 객관적 일정·계획(달력에 박힌 스케줄).',
  },
  {
    id: 'tsumori',
    kr: '~할 작정',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'desire-tsumori-da',   // /grammar/desire-tsumori-da 상세 페이지와 연결
    label: '〜つもり',
    reading: '츠모리',
    ko: ['할 생각', '할 작정', '하려는 생각', '할 거야'],
    en: ['intend to', 'intention'],
    jpRe: /つもり/,
    note: '전부터 굳혀 온 작정·의도(思う보다 좀 더 단단한 결심).',
  },
  {
    id: 'tai-omou',
    kr: '~하고 싶다',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'desire-tai',   // /grammar/desire-tai 상세 페이지와 연결
    label: '〜たいと思う',
    reading: '타이토 오모우',
    ko: ['하고 싶다고', '하고 싶어', '싶다고 생각', '하고 싶습니다'],
    en: ['want to', 'would like to'],
    jpRe: /たいと(?:おも|思)/,
    note: '"~하고 싶다"는 바람을 정중히·부드럽게 말할 때.',
  },
  {
    id: 'teiku',
    kr: '~해 가다',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'te-iku',   // /grammar/te-iku 상세 페이지와 연결
    label: '〜ていく',
    reading: '테 이쿠',
    ko: ['해 가다', '해 나가다', '하고 가다', '해 갈게'],
    en: ['go on', 'keep doing'],
    jpRe: /て(?:いく|いき|いっ|行く|行き|行っ)/,
    note: '지금부터 앞으로 계속·점점 변해 가는 방향(멀어지는 느낌).',
  },
  {
    id: 'tekuru',
    kr: '~해 오다',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'te-kuru',   // /grammar/te-kuru 상세 페이지와 연결
    label: '〜てくる',
    reading: '테 쿠루',
    ko: ['해 오다', '하고 오다', '해 왔다', '해 올게'],
    en: ['have been', 'come to'],
    jpRe: /て(?:くる|きた|きて|来る|来た|来て)/,
    note: '지금까지 계속해 온·이쪽으로 다가오는 방향(가까워지는 느낌).',
  },
  {
    id: 'nakereba',
    kr: '~해야 한다',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'permission-nakereba-naranai',   // /grammar/permission-nakereba-naranai 상세 페이지와 연결
    label: '〜なければならない / なきゃ',
    reading: '나케레바 나라나이',
    ko: ['해야 한다', '해야 해', '하지 않으면 안 된다', '해야만'],
    en: ['have to', 'must', 'need to'],
    jpRe: /(なければ|なきゃ|なくては|なくちゃ|ねばなら)/,
    note: '"~하지 않으면 안 된다" = 의무·필요.',
  },
  {
    id: 'tehoshii',
    kr: '~해 줬으면',   // 카드·목록 표시용 짧은 뜻
    label: '〜てほしい',
    reading: '테 호시이',
    ko: ['해 줬으면', '해 주길 바라', '해 줘', '해 주면 좋겠다'],
    en: ['want you to', 'wish you would'],
    jpRe: /て(?:ほしい|欲しい)/,
    note: '상대가 ~해 주기를 바라는 마음.',
  },
  {
    id: 'kamo',
    kr: '~일지도 몰라',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'kamo-shirenai',   // /grammar/kamo-shirenai 상세 페이지와 연결
    label: '〜かもしれない',
    reading: '카모시레나이',
    ko: ['일지도 몰라', '할지도', '할지도 모른다', '~일 수도'],
    en: ['might', 'maybe', 'may be'],
    jpRe: /かも(?:しれ|しん)/,
    note: '"~일지도 모른다" = 낮은 확신의 추측.',
  },
  {
    id: 'hazu',
    kr: '분명 ~일 거야',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'guess-hazu-da',   // /grammar/guess-hazu-da 상세 페이지와 연결
    label: '〜はず',
    reading: '하즈',
    ko: ['할 터', '분명', '~할 것이다', '~일 것이다', '~할 리'],
    en: ['should be', 'supposed to'],
    jpRe: /はず/,
    note: '근거가 있어 "당연히 ~할 것이다"라고 확신할 때.',
  },
  {
    id: 'rashii',
    kr: '~인 것 같아',   // 카드·목록 표시용 짧은 뜻
    grammarId: 'rashii',   // /grammar/rashii 상세 페이지와 연결
    label: '〜らしい',
    reading: '라시이',
    ko: ['라는 것 같다', '답다', '라나 봐', '~라고 한다'],
    en: ['seems', 'apparently', 'i heard'],
    jpRe: /らしい/,
    note: '들은 정보에 근거한 추측("~라고 한다") 또는 "~답다".',
  },
]
