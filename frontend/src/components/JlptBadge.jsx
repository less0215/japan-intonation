/* JLPT 레벨 딱지 — 레벨별 색 (쉬움 N5 → 어려움 N1)
 * 레벨 출처: Tanos(비공식 표준, CC BY) 기반 매칭 참고값. 미상이면 렌더 안 함. */
const COLORS = { N5: '#1aa888', N4: '#2a8fb8', N3: '#d8902e', N2: '#d8742f', N1: '#cc4b4b' }

export default function JlptBadge({ level, style }) {
  if (!level || !COLORS[level]) return null
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, color: '#fff', background: COLORS[level],
      borderRadius: 8, padding: '2px 8px', whiteSpace: 'nowrap', ...style,
    }}>JLPT {level}</span>
  )
}
