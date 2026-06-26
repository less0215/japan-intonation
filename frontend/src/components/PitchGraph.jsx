const PRIMARY   = '#5CA9CE'
const HIGH_Y    = 18
const LOW_Y     = 68
const GRAPH_BTM = 82
const LABEL_Y   = 100   // 히라가나
const HANGUL_Y  = 116   // 한글 발음(히라가나 아래)
const SVG_H     = 130
const MORA_W    = 34
const PAD       = 8

// 가나 모라 → 한글 발음 (읽기 서툰 사용자용). 없으면 가나 그대로 표기
const KANA_HANGUL = {
  あ:'아',い:'이',う:'우',え:'에',お:'오',
  か:'카',き:'키',く:'쿠',け:'케',こ:'코',
  さ:'사',し:'시',す:'스',せ:'세',そ:'소',
  た:'타',ち:'치',つ:'츠',て:'테',と:'토',
  な:'나',に:'니',ぬ:'누',ね:'네',の:'노',
  は:'하',ひ:'히',ふ:'후',へ:'헤',ほ:'호',
  ま:'마',み:'미',む:'무',め:'메',も:'모',
  や:'야',ゆ:'유',よ:'요',
  ら:'라',り:'리',る:'루',れ:'레',ろ:'로',
  わ:'와',ゐ:'이',ゑ:'에',を:'오',ん:'ㄴ',
  が:'가',ぎ:'기',ぐ:'구',げ:'게',ご:'고',
  ざ:'자',じ:'지',ず:'즈',ぜ:'제',ぞ:'조',
  だ:'다',ぢ:'지',づ:'즈',で:'데',ど:'도',
  ば:'바',び:'비',ぶ:'부',べ:'베',ぼ:'보',
  ぱ:'파',ぴ:'피',ぷ:'푸',ぺ:'페',ぽ:'포',
  っ:'ㅅ',ー:'ー',
  きゃ:'캬',きゅ:'큐',きょ:'쿄',
  しゃ:'샤',しゅ:'슈',しょ:'쇼',
  ちゃ:'챠',ちゅ:'츄',ちょ:'쵸',
  にゃ:'냐',にゅ:'뉴',にょ:'뇨',
  ひゃ:'햐',ひゅ:'휴',ひょ:'효',
  みゃ:'먀',みゅ:'뮤',みょ:'묘',
  りゃ:'랴',りゅ:'류',りょ:'료',
  ぎゃ:'갸',ぎゅ:'규',ぎょ:'교',
  じゃ:'자',じゅ:'주',じょ:'조',
  ぢゃ:'자',ぢゅ:'주',ぢょ:'조',
  びゃ:'뱌',びゅ:'뷰',びょ:'뵤',
  ぴゃ:'퍄',ぴゅ:'퓨',ぴょ:'표',
}
const moraToHangul = (m) => KANA_HANGUL[m] ?? m

// 모라 모음(a/i/u/e/o) — 장음 압축 판정용
const MORA_VOWEL = {}
for (const k of 'あかさたなはまやらわがざだばぱ') MORA_VOWEL[k] = 'a'
for (const k of 'いきしちにひみりぎじぢびぴゐ') MORA_VOWEL[k] = 'i'
for (const k of 'うくすつぬふむゆるぐずづぶぷ') MORA_VOWEL[k] = 'u'
for (const k of 'えけせてねへめれげぜでべぺゑ') MORA_VOWEL[k] = 'e'
for (const k of 'おこそとのほもよろをごぞどぼぽ') MORA_VOWEL[k] = 'o'
const vowelOf = (m) => {
  if (!m) return null
  const last = m[m.length - 1]
  if (last === 'ゃ') return 'a'
  if (last === 'ゅ') return 'u'
  if (last === 'ょ') return 'o'
  return MORA_VOWEL[m] ?? null
}

// furigana_html의 '한자 독음(괄호 안)'에 해당하는 모라만 true 표시. splitMora와 분절·문자가 일치할 때만 신뢰(아니면 null → 압축 안 함).
// 한자 독음 그룹 안에서만 장음을 압축하므로 형태소 경계 밖(ています의 てい 등)은 건드리지 않는다.
function kanjiGroupFlags(furiganaHtml, allMora) {
  if (!furiganaHtml) return null
  const isKana = (ch) => /[぀-ヿ]/.test(ch)
  const chars = []
  let inParen = false
  for (const ch of furiganaHtml) {
    if (ch === '(' || ch === '（') { inParen = true; continue }
    if (ch === ')' || ch === '）') { inParen = false; continue }
    if (isKana(ch)) chars.push({ ch, kanji: inParen })
  }
  const small = new Set(['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ','ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ'])
  const moras = [], flags = []
  for (let i = 0; i < chars.length; i++) {
    let m = chars[i].ch
    const kanji = chars[i].kanji
    if (i + 1 < chars.length && small.has(chars[i + 1].ch)) { m += chars[i + 1].ch; i++ }
    moras.push(m); flags.push(kanji)
  }
  if (moras.length !== allMora.length) return null
  for (let i = 0; i < moras.length; i++) if (moras[i] !== allMora[i]) return null
  return flags
}

// 한자 그룹 안에서만 장음 압축: え단+い→ー, お/う단+う→ー. 그 외엔 가나→한글 그대로.
function moraHangulLV(moraList, i, kanjiFlags) {
  const m = moraList[i]
  if (kanjiFlags && i > 0 && kanjiFlags[i] && kanjiFlags[i - 1]) {
    const pv = vowelOf(moraList[i - 1])
    if (m === 'い' && pv === 'e') return 'ー'
    if (m === 'う' && (pv === 'o' || pv === 'u')) return 'ー'
  }
  return moraToHangul(m)
}

function splitMora(hiragana) {
  const smallKana = new Set([
    'ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ',
    'ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ',
  ])
  const chars = [...hiragana]
  const mora  = []
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && smallKana.has(chars[i + 1])) {
      mora.push(chars[i] + chars[i + 1])
      i++
    } else {
      mora.push(chars[i])
    }
  }
  return mora
}

/*
 * 모든 phrase의 accent를 하나의 배열로 합쳐 단일 연속 곡선으로 렌더링.
 * phrase 경계 공백 없음 → OJAD처럼 끊김 없는 부드러운 선.
 */
export default function PitchGraph({ accentData, furigana, furiganaHtml, hideHeader = false }) {
  const allMora = splitMora(furigana)
  const kanjiFlags = kanjiGroupFlags(furiganaHtml, allMora)

  // phrase 순서대로 mora + accent 통합
  // 마지막 phrase가 나머지 mora를 모두 흡수해 잘림 없이 전체 문장을 표시
  const moraList   = []
  const accentList = []

  accentData.forEach((phrase, pi) => {
    const isLast = pi === accentData.length - 1
    const offset = moraList.length
    const count  = isLast
      ? allMora.length - offset          // 마지막은 남은 mora 전부
      : Math.min(phrase.mora_count, allMora.length - offset)
    const mora = allMora.slice(offset, offset + count)
    mora.forEach((m, j) => {
      moraList.push(m)
      // accent 배열 밖이면 마지막 값 반복
      const lastAcc = phrase.accent[phrase.accent.length - 1] ?? 0
      accentList.push(phrase.accent[j] ?? lastAcc)
    })
  })

  const count = moraList.length
  if (count === 0) return null

  // 각 모라의 x·y 좌표
  const pts = accentList.map((v, i) => ({
    x: PAD + MORA_W / 2 + i * MORA_W,
    y: v === 0 ? LOW_Y : HIGH_Y,
  }))

  // 단일 cubic bezier 패스
  let line = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p  = pts[i - 1]
    const c  = pts[i]
    const mx = (p.x + c.x) / 2
    line += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`
  }

  const last = pts[pts.length - 1]
  const fill = `${line} L ${last.x} ${GRAPH_BTM} L ${pts[0].x} ${GRAPH_BTM} Z`

  const svgW = count * MORA_W + PAD * 2

  return (
    <div style={{ marginTop: hideHeader ? 0 : 12 }}>
      <svg
        width={svgW}
        height={SVG_H}
        viewBox={`0 0 ${svgW} ${SVG_H}`}
        style={{ display: 'block' }}
      >
        <path d={fill} fill={PRIMARY} fillOpacity={0.08} stroke="none" />
        <path d={line} fill="none" stroke={PRIMARY} strokeWidth={2.5}
          strokeLinecap="round" strokeLinejoin="round" />
        {moraList.map((m, i) => (
          <text
            key={`k${i}`}
            x={PAD + MORA_W / 2 + i * MORA_W}
            y={LABEL_Y}
            textAnchor="middle"
            fontSize="12"
            style={{ fill: 'var(--text-1, #555555)' }}
            fontFamily="'Noto Sans JP', sans-serif"
          >
            {m}
          </text>
        ))}
        {/* 한글 발음 — 히라가나 아래 (읽기 서툰 사용자용) */}
        {moraList.map((m, i) => (
          <text
            key={`h${i}`}
            x={PAD + MORA_W / 2 + i * MORA_W}
            y={HANGUL_Y}
            textAnchor="middle"
            fontSize="10.5"
            style={{ fill: 'var(--text-3, #9aa0a6)' }}
          >
            {moraHangulLV(moraList, i, kanjiFlags)}
          </text>
        ))}
      </svg>
    </div>
  )
}
