import { splitMora, kanjiGroupFlags, moraHangulLV } from '../utils/kana.mjs'

const PRIMARY   = '#5CA9CE'
const HIGH_Y    = 18
const LOW_Y     = 68
const GRAPH_BTM = 82
const LABEL_Y   = 100   // 히라가나
const HANGUL_Y  = 116   // 한글 발음(히라가나 아래)
const SVG_H     = 130
const MORA_W    = 34
const PAD       = 8

// 가나→한글 변환 로직은 ../utils/kana.mjs(단일 소스 + node 단위테스트)로 분리.
// 결합 모라(요음·외래어·촉음)는 거기서 합성식으로 처리해 그래프에 가나가 새지 않게 한다.

/*
 * 모든 phrase의 accent를 하나의 배열로 합쳐 단일 연속 곡선으로 렌더링.
 * phrase 경계 공백 없음 → OJAD처럼 끊김 없는 부드러운 선.
 */
export default function PitchGraph({ accentData, furigana, furiganaHtml, hideHeader = false }) {
  const allMora = splitMora(furigana)
  const kanjiFlags = kanjiGroupFlags(furiganaHtml, allMora)

  // phrase 순서대로 mora + accent 통합
  // 마지막 phrase가 나머지 mora를 모두 흡수해 잘림 없이 전체 문장을 표시
  const moraList   = []
  const accentList = []

  accentData.forEach((phrase, pi) => {
    const isLast = pi === accentData.length - 1
    const offset = moraList.length
    const count  = isLast
      ? allMora.length - offset          // 마지막은 남은 mora 전부
      : Math.min(phrase.mora_count, allMora.length - offset)
    const mora = allMora.slice(offset, offset + count)
    mora.forEach((m, j) => {
      moraList.push(m)
      // accent 배열 밖이면 마지막 값 반복
      const lastAcc = phrase.accent[phrase.accent.length - 1] ?? 0
      accentList.push(phrase.accent[j] ?? lastAcc)
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
            key={`k${i}`}
            x={PAD + MORA_W / 2 + i * MORA_W}
            y={LABEL_Y}
            textAnchor="middle"
            fontSize="12"
            style={{ fill: 'var(--text-1, #555555)' }}
            fontFamily="'Noto Sans JP', sans-serif"
          >
            {m}
          </text>
        ))}
        {/* 한글 발음 — 히라가나 아래 (읽기 서툰 사용자용) */}
        {moraList.map((m, i) => (
          <text
            key={`h${i}`}
            x={PAD + MORA_W / 2 + i * MORA_W}
            y={HANGUL_Y}
            textAnchor="middle"
            fontSize="10.5"
            style={{ fill: 'var(--text-3, #9aa0a6)' }}
          >
            {moraHangulLV(moraList, i, kanjiFlags)}
          </text>
        ))}
      </svg>
    </div>
  )
}
