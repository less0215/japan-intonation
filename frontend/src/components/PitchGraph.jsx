import { useState } from 'react'

const PRIMARY    = '#5CA9CE'
const HIGH_Y     = 18    // 높은 음 y 좌표
const LOW_Y      = 68    // 낮은 음 y 좌표
const GRAPH_BTM  = 82    // fill 영역 하단
const LABEL_Y    = 100   // 모라 텍스트 y 좌표
const SVG_H      = 115   // SVG 전체 높이
const MORA_W     = 44    // 모라 1개당 너비

/* 히라가나 문자열을 모라 배열로 분리 */
function splitMora(hiragana) {
  // 작은 가나(ゃゅょぁ 등)는 앞 글자와 합쳐 하나의 모라로 처리
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

/* accent 배열을 기반으로 SVG cubic bezier 경로를 생성 */
function buildPaths(accent, moraCount) {
  const pts = accent.slice(0, moraCount).map((v, i) => ({
    x: MORA_W / 2 + i * MORA_W,
    y: v === 0 ? LOW_Y : HIGH_Y,
  }))

  if (pts.length < 2) return { line: '', fill: '' }

  // 곡선 경로
  let line = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1]
    const c = pts[i]
    const mx = (p.x + c.x) / 2
    // cubic bezier: 수평 → 수평 S자 곡선
    line += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`
  }

  // fill 영역 (곡선 아래)
  const last  = pts[pts.length - 1]
  const first = pts[0]
  const fill  = `${line} L ${last.x} ${GRAPH_BTM} L ${first.x} ${GRAPH_BTM} Z`

  return { line, fill, pts }
}

/* ─── 재생 버튼 아이콘 ─── */
function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

/* ─── 메인 컴포넌트 ───
 * hideHeader=true 이면 인토네이션 레이블/버튼 헤더를 숨김
 * (ResultCard 내부에서 버튼을 직접 관리할 때 사용)
 */
export default function PitchGraph({ accentData, furigana, hideHeader = false }) {
  const [playing, setPlaying] = useState(false)

  // 전체 모라 (furigana 문자열 → 모라 배열)
  const allMora = splitMora(furigana)

  return (
    <div>
      {/* hideHeader=false 일 때만 헤더 표시 */}
      {!hideHeader && (
        <div style={styles.header}>
          <span style={styles.label}>인토네이션</span>
          <button
            onClick={() => setPlaying(p => !p)}
            style={styles.playBtn}
            title={playing ? '일시정지' : '재생'}
          >
            {playing ? <IconPause /> : <IconPlay />}
          </button>
        </div>
      )}

      {/* 구(phrase) 단위로 그래프 렌더 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: hideHeader ? '0' : '12px' }}>
        {accentData.map((phrase, pi) => {
          // 이 phrase에 해당하는 모라 슬라이스
          const offset = accentData.slice(0, pi).reduce((s, p) => s + p.mora_count, 0)
          const mora   = allMora.slice(offset, offset + phrase.mora_count)
          const svgW   = phrase.mora_count * MORA_W
          const { line, fill, pts } = buildPaths(phrase.accent, phrase.mora_count)

          return (
            <div key={phrase.phrase_id} style={{ overflowX: 'auto' }}>
              <svg
                width={svgW}
                height={SVG_H}
                viewBox={`0 0 ${svgW} ${SVG_H}`}
                style={{ display: 'block' }}
              >
                {/* fill 영역 */}
                {fill && (
                  <path d={fill} fill={PRIMARY} fillOpacity={0.08} stroke="none" />
                )}
                {/* 곡선 */}
                {line && (
                  <path d={line} fill="none" stroke={PRIMARY} strokeWidth={2.5}
                    strokeLinecap="round" strokeLinejoin="round" />
                )}
                {/* 각 모라 위치의 점 */}
                {pts && pts.map((pt, i) => (
                  <circle
                    key={i} cx={pt.x} cy={pt.y} r={5}
                    fill="#ffffff" stroke={PRIMARY} strokeWidth={2}
                  />
                ))}
                {/* 모라 텍스트 (히라가나) */}
                {mora.map((m, i) => (
                  <text
                    key={i}
                    x={MORA_W / 2 + i * MORA_W}
                    y={LABEL_Y}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#444444"
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
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  playBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    backgroundColor: '#5CA9CE',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
