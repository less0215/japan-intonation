const PRIMARY   = '#5CA9CE'
const HIGH_Y    = 18
const LOW_Y     = 68
const GRAPH_BTM = 82
const LABEL_Y   = 100
const SVG_H     = 115
const MORA_W    = 34
const PAD       = 8

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
export default function PitchGraph({ accentData, furigana, hideHeader = false }) {
  const allMora = splitMora(furigana)

  // phrase 순서대로 mora + accent 통합
  const moraList   = []
  const accentList = []

  accentData.forEach((phrase, pi) => {
    const offset = accentData.slice(0, pi).reduce((s, p) => s + p.mora_count, 0)
    const mora   = allMora.slice(offset, offset + phrase.mora_count)
    mora.forEach((m, j) => {
      moraList.push(m)
      accentList.push(phrase.accent[j] ?? 0)
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
}
