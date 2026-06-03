const PRIMARY    = '#5CA9CE'
const HIGH_Y     = 18
const LOW_Y      = 68
const GRAPH_BTM  = 82
const LABEL_Y    = 100
const SVG_H      = 115
const MORA_W     = 34
const PAD        = 8
const PHRASE_GAP = 24  // phrase 사이 공백 (선 없음 — 자연스러운 구분)

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

/* phrase 하나의 path 생성 (xStart: SVG 내 x 시작 위치) */
function buildPhrasePaths(accent, count, xStart) {
  const pts = accent.slice(0, count).map((v, i) => ({
    x: xStart + MORA_W / 2 + i * MORA_W,
    y: v === 0 ? LOW_Y : HIGH_Y,
  }))

  if (pts.length < 2) return { line: '', fill: '' }

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

  return { line, fill }
}

/*
 * 모든 phrase를 단일 SVG 안에 렌더링 — phrase 사이 gap만 두고 선 없이
 * → 끊김 없이 각 phrase의 선이 독립적으로 깔끔하게 표시됨
 */
export default function PitchGraph({ accentData, furigana, hideHeader = false }) {
  const allMora = splitMora(furigana)

  // 각 phrase의 x 시작 위치 계산
  let xCursor = PAD
  const phrases = accentData.map((phrase, pi) => {
    const offset = accentData.slice(0, pi).reduce((s, p) => s + p.mora_count, 0)
    const mora   = allMora.slice(offset, offset + phrase.mora_count)
    const count  = mora.length
    if (count === 0) return null

    const xStart  = xCursor
    xCursor      += count * MORA_W + (pi < accentData.length - 1 ? PHRASE_GAP : 0)

    return { mora, count, xStart, accent: phrase.accent }
  }).filter(Boolean)

  const totalW = xCursor + PAD

  return (
    <div style={{ marginTop: hideHeader ? 0 : 12 }}>
      <svg
        width={totalW}
        height={SVG_H}
        viewBox={`0 0 ${totalW} ${SVG_H}`}
        style={{ display: 'block' }}
      >
        {phrases.map((pd, i) => {
          const { line, fill } = buildPhrasePaths(pd.accent, pd.count, pd.xStart)
          return (
            <g key={i}>
              {fill && (
                <path d={fill} fill={PRIMARY} fillOpacity={0.08} stroke="none" />
              )}
              {line && (
                <path d={line} fill="none" stroke={PRIMARY} strokeWidth={2.5}
                  strokeLinecap="round" strokeLinejoin="round" />
              )}
              {pd.mora.map((m, j) => (
                <text
                  key={j}
                  x={pd.xStart + MORA_W / 2 + j * MORA_W}
                  y={LABEL_Y}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#555555"
                  fontFamily="'Noto Sans JP', sans-serif"
                >
                  {m}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
