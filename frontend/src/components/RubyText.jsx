/* 한자(よみ) 루비 텍스트 공통 컴포넌트
 *
 * HTML <ruby> 태그는 후리가나가 한자보다 넓으면 브라우저가 한자 간격을 강제로 늘려
 * 위치가 어긋나 보이는 문제가 있음. flex 컬럼 방식으로 대체.
 *
 * 어미(送り仮名) 자동 분리: 話す(はなす) → 話(はな) + す
 */

const HIRAGANA = /[ぁ-ゟ]/

function splitOkurigana(kanji, reading) {
  let k = kanji, r = reading
  while (k.length > 1 && r.length > 1 && HIRAGANA.test(k[k.length - 1]) && k[k.length - 1] === r[r.length - 1]) {
    k = k.slice(0, -1)
    r = r.slice(0, -1)
  }
  return { base: k, baseReading: r, suffix: kanji.slice(k.length) }
}

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

  const rtSize = Math.max(9, Math.round(fontSize * 0.72))

  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight, lineHeight: 1.8 }}>
      {parts.map((p, i) =>
        p.type === 'ruby' ? (
          /* 괄호 표기: 話(はな)す — 밀림 없는 교재 스타일 */
          <span key={i}>
            {p.kanji}
            <span style={{ fontSize: rtSize, color: '#888' }}>({p.reading})</span>
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </span>
  )
}
