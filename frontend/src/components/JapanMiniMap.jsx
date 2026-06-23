/* 일본 지도 — 자체 제작 단순화 SVG(저작권 0, 지리적 형태). 틱재팬 프라이머리 톤.
 * region: 강조할 지방 id → 섬은 통째로, 혼슈 지방은 클립한 구역(zone)으로 강조
 * marker: { x, y } = 핀 끝점 (viewBox 0 0 220 280 기준) */
const BASE = '#cfe3ef'   // 기본 섬
const HI = '#5CA9CE'     // 강조 지방 (틱재팬 프라이머리)
const PIN = '#e24b4a'

const HOKKAIDO = 'M170 24 C184 14 202 26 198 44 C206 58 192 76 178 71 C162 80 149 64 156 49 C150 36 159 28 170 24 Z'
const HONSHU = 'M157 84 C167 92 171 108 174 124 C179 140 176 151 165 157 C147 168 132 176 115 186 C96 196 79 205 64 211 C58 213 55 209 59 204 C75 194 92 187 107 178 C126 167 137 157 145 141 C152 127 150 108 149 94 C148 87 150 82 157 84 Z'
const SHIKOKU = 'M104 210 C118 206 134 210 132 220 C130 230 110 230 104 224 C98 220 98 212 104 210 Z'
const KYUSHU = 'M70 196 C84 198 86 214 80 228 C84 242 74 256 62 252 C50 256 46 242 52 230 C46 218 54 202 70 196 Z'

// 혼슈 내 지방 구역(클립으로 혼슈 모양 안에서만 칠해짐)
const ZONES = {
  tohoku:  { cx: 160, cy: 102, rx: 14, ry: 24, rot: -44 },
  kanto:   { cx: 169, cy: 148, rx: 17, ry: 16, rot: -25 },
  chubu:   { cx: 147, cy: 150, rx: 15, ry: 19, rot: -45 },
  kansai:  { cx: 116, cy: 184, rx: 18, ry: 13, rot: -28 },
  chugoku: { cx: 82,  cy: 201, rx: 22, ry: 11, rot: -22 },
}
// 지역 id → 강조할 섬/구역
const REGION = {
  kyushu:   { islands: ['kyushu', 'okinawa'] },
  hokkaido: { islands: ['hokkaido'], zones: ['tohoku'] },
  kanto:    { zones: ['kanto'] },
  chubu:    { zones: ['chubu'] },
  kansai:   { zones: ['kansai'] },
  'chugoku-shikoku': { islands: ['shikoku'], zones: ['chugoku'] },
}

export default function JapanMiniMap({ marker, label, region }) {
  const r = REGION[region] || {}
  const islands = new Set(r.islands || [])
  const zones = r.zones || []
  const x = marker?.x, y = marker?.y

  return (
    <svg viewBox="0 0 220 280" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`${label} 위치 지도`}>
      <defs>
        <clipPath id="honshuClip"><path d={HONSHU} /></clipPath>
      </defs>

      {/* 기본 섬 (강조 섬은 HI) */}
      <path d={HOKKAIDO} fill={islands.has('hokkaido') ? HI : BASE} />
      <path d={HONSHU} fill={BASE} />
      <path d={SHIKOKU} fill={islands.has('shikoku') ? HI : BASE} />
      <path d={KYUSHU} fill={islands.has('kyushu') ? HI : BASE} />
      <g fill={islands.has('okinawa') ? HI : BASE}>
        <ellipse cx="34" cy="260" rx="5" ry="9" transform="rotate(32 34 260)" />
        <ellipse cx="46" cy="250" rx="3" ry="5" />
      </g>

      {/* 혼슈 지방 구역 강조 (혼슈 모양으로 클립) */}
      <g clipPath="url(#honshuClip)">
        {zones.map(z => {
          const e = ZONES[z]
          return <ellipse key={z} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={HI} transform={`rotate(${e.rot} ${e.cx} ${e.cy})`} />
        })}
      </g>

      {/* 위치 핀 */}
      {marker && (
        <g>
          <ellipse cx={x} cy={y + 1} rx="6" ry="2.4" fill="rgba(0,0,0,0.18)" />
          <path d={`M${x} ${y} C${x - 5} ${y - 8} ${x - 8} ${y - 11} ${x - 8} ${y - 16} A8 8 0 1 1 ${x + 8} ${y - 16} C${x + 8} ${y - 11} ${x + 5} ${y - 8} ${x} ${y} Z`} fill={PIN} stroke="#fff" strokeWidth="1.5" />
          <circle cx={x} cy={y - 16} r="3.2" fill="#fff" />
        </g>
      )}
    </svg>
  )
}
