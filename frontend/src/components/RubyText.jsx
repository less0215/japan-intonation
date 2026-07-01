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

/* 후리가나 루비는 괄호 안이 '히라가나 읽기'일 때만 적용.
 * 원문에 들어 있는 리터럴 괄호(예: "(ヨハネ1:12)", "(株)")는 읽기가 아니므로 그대로 평문 표시. */
const RUBY_REGEX = /([^\s()（）]+?)\(([ぁ-ゖー]+)\)/g

/* furigana_html → 렌더 단위 파츠 배열. RubyText와 카라오케 자막(KaraokeText)이 공유. */
export function parseFurigana(text) {
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
  return parts
}

export default function RubyText({ text, fontSize = 15, fontWeight = 500 }) {
  const parts = parseFurigana(text)
  const rtSize = Math.max(9, Math.round(fontSize * 0.72))

  return (
    <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize, fontWeight, lineHeight: 1.8 }}>
      {parts.map((p, i) =>
        p.type === 'ruby' ? (
          /* 괄호 표기: 話(はな)す — 밀림 없는 교재 스타일 */
          <span key={i}>
            {p.kanji}
            <span style={{ fontSize: rtSize, color: 'var(--text-3)' }}>({p.reading})</span>
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </span>
  )
}
