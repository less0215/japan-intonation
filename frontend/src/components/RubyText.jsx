/* 한자(よみ) 루비 텍스트 공통 컴포넌트
 * 어미(送り仮名) 자동 분리: 話す(はなす) → <ruby>話<rt>はな</rt></ruby>す
 */

const HIRAGANA = /[ぁ-ゟ]/

/* kanji 끝 히라가나와 reading 끝이 일치하면 순차적으로 분리 */
function splitOkurigana(kanji, reading) {
  let k = kanji, r = reading
  while (k.length > 1 && r.length > 1 && HIRAGANA.test(k[k.length - 1]) && k[k.length - 1] === r[r.length - 1]) {
    k = k.slice(0, -1)
    r = r.slice(0, -1)
  }
  return { base: k, baseReading: r, suffix: kanji.slice(k.length) }
}

/* 한자+히라가나 혼합 패턴: 話す(はなす), 日本語(にほんご) 등 */
const RUBY_REGEX = /([^\s()（）]+?)\(([^)）]+)\)/g

export default function RubyText({ text, fontSize = 15, fontWeight = 500 }) {
  const parts = []
  let last = 0, match
  const re = new RegExp(RUBY_REGEX.source, 'g')

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'plain', text: text.slice(last, match.index) })
    const { base, baseReading, suffix } = splitOkurigana(match[1], match[2])
    parts.push({ type: 'ruby', kanji: base, reading: baseReading })
    if (suffix) parts.push({ type: 'plain', text: suffix })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ type: 'plain', text: text.slice(last) })

  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight, lineHeight: 1.8 }}>
      {parts.map((p, i) =>
        p.type === 'ruby'
          ? <ruby key={i}>{p.kanji}<rt style={{ fontSize: Math.max(9, fontSize * 0.65), color: '#888' }}>{p.reading}</rt></ruby>
          : <span key={i}>{p.text}</span>
      )}
    </span>
  )
}
