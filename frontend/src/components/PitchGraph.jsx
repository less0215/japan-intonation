const PRIMARY   = '#5CA9CE'
const HIGH_Y    = 18
const LOW_Y     = 68
const GRAPH_BTM = 82
const LABEL_Y   = 100
const SVG_H     = 115
const MORA_W    = 40
const PAD       = 8

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

/* accent 배열 → SVG cubic bezier 경로 + 변곡점 인덱스 */
function buildPaths(accent, count) {
  const pts = accent.slice(0, count).map((v, i) => ({
    x: PAD + MORA_W / 2 + i * MORA_W,
    y: v === 0 ? LOW_Y : HIGH_Y,
  }))

  if (pts.length < 2) return { line: '', fill: '', pts, inflections: new Set([0]) }

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

  /* 변곡점: 피치가 바뀌는 지점 + 시작 + 끝 */
  const inflections = new Set([0, count - 1])
  for (let i = 1; i < count; i++) {
    if (accent[i] !== accent[i - 1]) {
      inflections.add(i - 1)
      inflections.add(i)
    }
  }

  return { line, fill, pts, inflections }
}

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
        const { line, fill, pts, inflections } = buildPaths(phrase.accent, count)

        return (
          <div key={phrase.phrase_id} style={{ flexShrink: 0 }}>
            <svg
              width={svgW}
              height={SVG_H}
              viewBox={`0 0 ${svgW} ${SVG_H}`}
              style={{ display: 'block' }}
            >
              {/* 채움 */}
              {fill && (
                <path d={fill} fill={PRIMARY} fillOpacity={0.08} stroke="none" />
              )}
              {/* 선 */}
              {line && (
                <path d={line} fill="none" stroke={PRIMARY} strokeWidth={2.5}
                  strokeLinecap="round" strokeLinejoin="round" />
              )}
              {/* 변곡점만 점 표시 */}
              {pts.map((pt, i) =>
                inflections.has(i) ? (
                  <circle key={i} cx={pt.x} cy={pt.y} r={4}
                    fill="#ffffff" stroke={PRIMARY} strokeWidth={2} />
                ) : null
              )}
              {/* 모라 라벨 */}
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
