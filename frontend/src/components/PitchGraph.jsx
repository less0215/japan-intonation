const PRIMARY   = '#5CA9CE'
const HIGH_Y    = 18
const LOW_Y     = 68
const GRAPH_BTM = 82
const LABEL_Y   = 100
const SVG_H     = 115
const MORA_W    = 40
const PAD       = 8   // SVG 좌우 여백 — 원 테두리 잘림 방지

/* 히라가나 문자열을 모라 배열로 분리 */
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

/* accent 배열 → SVG cubic bezier 경로 */
function buildPaths(accent, count) {
  const pts = accent.slice(0, count).map((v, i) => ({
    x: PAD + MORA_W / 2 + i * MORA_W,
    y: v === 0 ? LOW_Y : HIGH_Y,
  }))

  if (pts.length < 2) return { line: '', fill: '', pts }

  let line = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p  = pts[i - 1]
    const c  = pts[i]
    const mx = (p.x + c.x) / 2
    line += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`
  }

  const last  = pts[pts.length - 1]
  const first = pts[0]
  const fill  = `${line} L ${last.x} ${GRAPH_BTM} L ${first.x} ${GRAPH_BTM} Z`

  return { line, fill, pts }
}

/*
 * 호출하는 쪽에서 overflow-x:auto 래퍼를 제공해야 함.
 * 이 컴포넌트 자체는 inline-flex로 자연스러운 너비를 가짐.
 */
export default function PitchGraph({ accentData, furigana, hideHeader = false }) {
  const allMora = splitMora(furigana)

  return (
    <div
      className="pitch-graph-wrap"
      style={{ display: 'inline-flex', gap: 12, marginTop: hideHeader ? 0 : 12 }}
    >
      {accentData.map((phrase, pi) => {
        const offset = accentData.slice(0, pi).reduce((s, p) => s + p.mora_count, 0)
        const mora   = allMora.slice(offset, offset + phrase.mora_count)
        const count  = mora.length
        if (count === 0) return null

        const svgW = count * MORA_W + PAD * 2
        const { line, fill, pts } = buildPaths(phrase.accent, count)

        return (
          <div key={phrase.phrase_id} style={{ flexShrink: 0 }}>
            <svg
              width={svgW}
              height={SVG_H}
              viewBox={`0 0 ${svgW} ${SVG_H}`}
              style={{ display: 'block' }}
            >
              {fill && (
                <path d={fill} fill={PRIMARY} fillOpacity={0.08} stroke="none" />
              )}
              {line && (
                <path d={line} fill="none" stroke={PRIMARY} strokeWidth={2.5}
                  strokeLinecap="round" strokeLinejoin="round" />
              )}
              {pts.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r={4.5}
                  fill="#ffffff" stroke={PRIMARY} strokeWidth={2} />
              ))}
              {mora.map((m, i) => (
                <text
                  key={i}
                  x={PAD + MORA_W / 2 + i * MORA_W}
                  y={LABEL_Y}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#555555"
                  fontFamily="'Noto Sans JP', sans-serif"
                >
                  {m}
                </text>
              ))}
            </svg>
          </div>
        )
      })}
    </div>
  )
}
