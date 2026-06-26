// 가나(후리가나) → 한글 발음 변환 유틸 — PitchGraph(그래프 모라 라벨)와 단위테스트가 공유하는 단일 소스.
// 핵심 원칙: 결합 모라(요음 ゃゅょ · 외래어 ぁぃぅぇぉ · 촉음 っ)는 종류가 열려 있어 평면 사전 1:1로는
// 다 못 막는다. 그래서 moraToHangul은 '합성식'으로 동작해 어떤 모라도 가나가 새지 않게 한다.
// (테스트: src/utils/kana.test.mjs — node로 전수 검증)

// 단일 가나 + 표준 요음 + 외래어 합성 + 작은가나 단독값
export const KANA_HANGUL = {
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
  // 외래어 합성 모라(でぃ=디, ふぇ=페 등). 후리가나는 보통 히라가나라 히라가나 우선 + 가타카나 보강.
  いぇ:'예',うぃ:'위',うぇ:'웨',うぉ:'워',
  ゔ:'브',ゔぁ:'바',ゔぃ:'비',ゔぇ:'베',ゔぉ:'보',ゔゅ:'뷰',
  しぇ:'셰',じぇ:'제',ちぇ:'체',つぁ:'차',つぃ:'치',つぇ:'체',つぉ:'초',
  てぃ:'티',てゅ:'튜',でぃ:'디',でゅ:'듀',とぅ:'투',どぅ:'두',
  ふぁ:'파',ふぃ:'피',ふぇ:'페',ふぉ:'포',ふゅ:'퓨',
  イェ:'예',ウィ:'위',ウェ:'웨',ウォ:'워',
  ヴ:'브',ヴァ:'바',ヴィ:'비',ヴェ:'베',ヴォ:'보',ヴュ:'뷰',
  シェ:'셰',ジェ:'제',チェ:'체',ツァ:'차',ツィ:'치',ツェ:'체',ツォ:'초',
  ティ:'티',テュ:'튜',ディ:'디',デュ:'듀',トゥ:'투',ドゥ:'두',
  ファ:'파',フィ:'피',フェ:'페',フォ:'포',フュ:'퓨',
  // 작은 가나 단독값 — 미등록 결합의 '글자별 폴백'에서 가나 노출 방지(직접 모라로는 거의 안 쓰임)
  ぁ:'아',ぃ:'이',ぅ:'우',ぇ:'에',ぉ:'오',ゃ:'야',ゅ:'유',ょ:'요',
  ァ:'아',ィ:'이',ゥ:'우',ェ:'에',ォ:'오',ャ:'야',ュ:'유',ョ:'요',
}

// ㅅ받침(촉음) 합성 — '레'+ㅅ → '렛'. 마지막 음절에 종성이 없을 때만 결합.
export function withSokuon(s) {
  if (!s) return s
  const c = s.charCodeAt(s.length - 1)
  if (c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 === 0) {
    return s.slice(0, -1) + String.fromCharCode(c + 19)   // 종성 ㅅ
  }
  return s
}

// 모라 → 한글(합성식). ① 단일/요음/외래어는 직접 매핑 ② 촉음 결합(れっ 등)은 '앞 한글 + ㅅ받침'으로 합성
// ③ 그 외 미등록 결합은 글자별 변환으로 이어붙여 가나 노출을 원천 차단(최후 안전망).
export function moraToHangul(m) {
  if (!m) return m
  const direct = KANA_HANGUL[m]
  if (direct) return direct
  const last = m[m.length - 1]
  if (last === 'っ' || last === 'ッ') return withSokuon(moraToHangul(m.slice(0, -1)))
  if (m.length > 1) return [...m].map((c) => KANA_HANGUL[c] ?? c).join('')
  return m
}

// 모라 모음(a/i/u/e/o) — 장음 압축 판정용
const MORA_VOWEL = {}
for (const k of 'あかさたなはまやらわがざだばぱ') MORA_VOWEL[k] = 'a'
for (const k of 'いきしちにひみりぎじぢびぴゐ') MORA_VOWEL[k] = 'i'
for (const k of 'うくすつぬふむゆるぐずづぶぷ') MORA_VOWEL[k] = 'u'
for (const k of 'えけせてねへめれげぜでべぺゑ') MORA_VOWEL[k] = 'e'
for (const k of 'おこそとのほもよろをごぞどぼぽ') MORA_VOWEL[k] = 'o'
export const vowelOf = (m) => {
  if (!m) return null
  const last = m[m.length - 1]
  if (last === 'ゃ' || last === 'ぁ' || last === 'ァ') return 'a'
  if (last === 'ぃ' || last === 'ィ') return 'i'
  if (last === 'ゅ' || last === 'ぅ' || last === 'ゥ') return 'u'
  if (last === 'ぇ' || last === 'ェ') return 'e'
  if (last === 'ょ' || last === 'ぉ' || last === 'ォ') return 'o'
  return MORA_VOWEL[m] ?? null
}

export function splitMora(hiragana) {
  const smallKana = new Set([
    'ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','っ',
    'ァ','ィ','ゥ','ェ','ォ','ャ','ュ','ョ','ッ',
  ])
  const chars = [...(hiragana || '')]
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

// furigana_html의 '한자 독음(괄호 안)'에 해당하는 모라만 true. splitMora와 분절·문자가 일치할 때만 신뢰(아니면 null).
// 한자 독음 그룹 안에서만 장음을 압축하므로 형태소 경계 밖(ています의 てい 등)은 건드리지 않는다.
export function kanjiGroupFlags(furiganaHtml, allMora) {
  if (!furiganaHtml) return null
  // furigana는 히라가나. 괄호 안=한자/외래어 독음(히라가나+장음 ー), 괄호 밖=히라가나만(조사 등).
  // 괄호 밖 가타카나 외래어(ディカフェ·コーヒー 등)와 그 ー는 '한자처럼' 건너뛰어 정렬을 맞춘다.
  const isHira = (ch) => /[ぁ-ゟ]/.test(ch)
  const chars = []
  let inParen = false
  for (const ch of furiganaHtml) {
    if (ch === '(' || ch === '（') { inParen = true; continue }
    if (ch === ')' || ch === '）') { inParen = false; continue }
    if (inParen) { if (isHira(ch) || ch === 'ー') chars.push({ ch, kanji: true }) }
    else if (isHira(ch)) chars.push({ ch, kanji: false })
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
export function moraHangulLV(moraList, i, kanjiFlags) {
  const m = moraList[i]
  if (kanjiFlags && i > 0 && kanjiFlags[i] && kanjiFlags[i - 1]) {
    const pv = vowelOf(moraList[i - 1])
    if (m === 'い' && pv === 'e') return 'ー'
    if (m === 'う' && (pv === 'o' || pv === 'u')) return 'ー'
  }
  return moraToHangul(m)
}
