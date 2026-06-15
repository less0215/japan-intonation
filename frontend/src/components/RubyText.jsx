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

  const rtSize = Math.max(9, Math.round(fontSize * 0.62))

  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight, lineHeight: 2, display: 'inline' }}>
      {parts.map((p, i) =>
        p.type === 'ruby' ? (
          /* flex 컬럼으로 후리가나를 한자 바로 위에 고정 — 브라우저 ruby 간격 늘림 없음 */
          <span key={i} style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            verticalAlign: 'bottom',
            lineHeight: 1,
          }}>
            <span style={{ fontSize: rtSize, color: '#888', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              {p.reading}
            </span>
            <span style={{ lineHeight: 1.4 }}>{p.kanji}</span>
          </span>
        ) : (
          <span key={i} style={{ verticalAlign: 'bottom', lineHeight: 1.4, display: 'inline-block' }}>
            {p.text}
          </span>
        )
      )}
    </span>
  )
}
