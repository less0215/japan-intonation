// node src/utils/kana.test.mjs 로 실행하는 단위테스트(실제 kana.mjs를 import).
// 목적: 그래프 모라 라벨에 '가나가 새는' 일이 다신 없게 전수 보장.
import { KANA_HANGUL, moraToHangul, splitMora, kanjiGroupFlags, moraHangulLV, kataToHira } from './kana.mjs'

let pass = 0, fail = 0
const eq = (got, exp, name) => { if (got === exp) { pass++ } else { fail++; console.log(`  FAIL ${name}: '${got}' (기대 '${exp}')`) } }

// 가나(ー 제외)가 출력에 남아있으면 누수 = 버그
const KANA_LEAK = /[぀-・ヽ-ヿ]/   // 히라가나·가타카나, ー(U+30FC)만 제외

console.log('=== 특정 케이스 ===')
eq(moraToHangul('れっ'), '렛', '촉음 れっ')
eq(moraToHangul('かっ'), '캇', '촉음 かっ')
eq(moraToHangul('きっ'), '킷', '촉음 きっ')
eq(moraToHangul('でぃ'), '디', '외래어 でぃ')
eq(moraToHangul('ふぇ'), '페', '외래어 ふぇ')
eq(moraToHangul('きょ'), '쿄', '요음 きょ')
eq(moraToHangul('ー'),  'ー', '장음부호 ー(유지)')

// 실제 문장: エスプレッソ(えすぷれっそ) 모라별
const espMorae = splitMora('えすぷれっそ').map(moraToHangul).join('/')
eq(espMorae, '에/스/푸/렛/소', 'エスプレッソ 모라')

// トリプル エスプレッソ ラテ (사용자 케이스)
const tri = splitMora('とりぷるえすぷれっそらて').map(moraToHangul).join('/')
eq(tri, '토/리/푸/루/에/스/푸/렛/소/라/테', 'トリプル エスプレッソ ラテ')

// 가타카나(외래어·고유어) — 기본 가타카나가 한글로 변환돼야(가나 누수 X)
eq(moraToHangul('テ'), '테', '가타카나 テ')
eq(moraToHangul('ス'), '스', '가타카나 ス')
eq(moraToHangul('ト'), '토', '가타카나 ト')
eq(moraToHangul('ガ'), '가', '가타카나 탁음 ガ')
eq(moraToHangul('キャ'), '캬', '가타카나 요음 キャ')
eq(moraToHangul('ヴ'), '브', '가타카나 ヴ')
eq(splitMora('テスト').map(moraToHangul).join('/'), '테/스/토', 'テスト 모라')
eq(splitMora('エスプレッソ').map(moraToHangul).join('/'), '에/스/푸/렛/소', 'エスプレッソ(가타카나) 모라')

// 그래프 장음 경로(moraHangulLV + kanjiGroupFlags)
function graph(furigana, html) {
  const am = splitMora(furigana)
  const kf = kanjiGroupFlags(html, am)
  return am.map((m, i) => moraHangulLV(am, i, kf)).join('/')
}
eq(graph('にほんにいくよていだよ', '日本(にほん)に行(い)く予定(よてい)だよ'), '니/호/ㄴ/니/이/쿠/요/테/ー/다/요', '予定 그래프')
eq(graph('べんきょうしています', '勉強(べんきょう)しています'), '베/ㄴ/쿄/ー/시/테/이/마/스', 'ています 예외 유지')
eq(graph('でぃかふぇらて', 'ディカフェ(でぃかふぇ) ラテ(らて)'), '디/카/페/라/테', 'ディカフェ 외래어')
eq(graph('いまテストちゅうです', '今(いま)テスト中(ちゅう)です'), '이/마/테/스/토/츄/ー/데/스', '今テスト中です 그래프(가타카나+장음)')

console.log('=== 전수: 가나 누수 0 보장 ===')
// 모든 단일 히라가나(+탁음·반탁음) + 각각 촉음 결합 + 모든 요음/외래어 키
const singles = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'
const probes = []
for (const c of singles) { probes.push(c); probes.push(c + 'っ') }
for (const k of Object.keys(KANA_HANGUL)) { probes.push(k); probes.push(k + 'っ') }
let leaks = 0
for (const m of probes) {
  const out = moraToHangul(m)
  if (KANA_LEAK.test(out)) { leaks++; if (leaks <= 10) console.log(`  LEAK '${m}' -> '${out}'`) }
}
if (leaks === 0) { pass++; console.log(`  OK — ${probes.length}개 모라 전수, 가나 누수 0`) }
else { fail++; console.log(`  FAIL — 가나 누수 ${leaks}건`) }

console.log('=== 가타카나 전수: 누수 0 보장 ===')
// 모든 단일 가타카나(= 히라가나 singles +0x60) + 촉음 결합
const kataSingles = [...singles].map(c => String.fromCodePoint(c.codePointAt(0) + 0x60))
const toKata = (s) => [...s].map(c => { const o = c.codePointAt(0); return (o >= 0x3041 && o <= 0x3096) ? String.fromCodePoint(o + 0x60) : c }).join('')
const kataProbes = []
for (const c of kataSingles) { kataProbes.push(c); kataProbes.push(c + 'ッ') }
for (const k of Object.keys(KANA_HANGUL)) { kataProbes.push(toKata(k)) }   // 요음·외래어 가타카나형
let kleaks = 0
for (const m of kataProbes) {
  const out = moraToHangul(m)
  if (KANA_LEAK.test(out)) { kleaks++; if (kleaks <= 10) console.log(`  LEAK '${m}' -> '${out}'`) }
}
if (kleaks === 0) { pass++; console.log(`  OK — ${kataProbes.length}개 가타카나 모라 전수, 가나 누수 0`) }
else { fail++; console.log(`  FAIL — 가타카나 누수 ${kleaks}건`) }

console.log(`\n결과: pass ${pass} / fail ${fail}`)
process.exit(fail ? 1 : 0)
