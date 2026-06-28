/* 동사 그룹별 활용표 — 오십음도와 함께 GrammarDetail·GrammarLibrary 참고자료로 사용 */
import { useState } from 'react'

const PRIMARY = '#5CA9CE'

/* 행 = 활용형, 열 = 1그룹/2그룹/3그룹 (대표 동사로 예시) */
const ROWS = [
  { label: '사전형', g1: '書く', g2: '食べる', g3: 'する / 来る(くる)' },
  { label: '정중 〜ます', g1: '書きます', g2: '食べます', g3: 'します / きます' },
  { label: '부정 〜ない', g1: '書かない', g2: '食べない', g3: 'しない / こない' },
  { label: 'て형', g1: '書いて', g2: '食べて', g3: 'して / きて' },
  { label: '과거 〜た', g1: '書いた', g2: '食べた', g3: 'した / きた' },
  { label: '가능형', g1: '書ける', g2: '食べられる', g3: 'できる / こられる' },
  { label: '의지 〜よう', g1: '書こう', g2: '食べよう', g3: 'しよう / こよう' },
]

const RULES = [
  { g: '1그룹 (5단)', tip: '어미가 う단(う·く·ぐ·す·つ·ぬ·ぶ·む·る). 활용 시 어미의 단(段)이 바뀐다.', ex: '書く·飲む·話す' },
  { g: '2그룹 (1단)', tip: '「い단·え단 소리 + る」로 끝남. 활용은 る만 떼고 붙이면 끝.', ex: '食べる·見る·寝る' },
  { g: '3그룹 (불규칙)', tip: 'する·来る 두 개뿐. 통째로 외우는 게 빠름.', ex: 'する·来る(くる)' },
]

export default function VerbConjugationTable({ defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden', background: 'var(--surface)' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: 'var(--surface-2)', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 0.3 }}>참고</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>동사 그룹별 활용표</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: '12px 16px 16px' }}>
          {/* 그룹 구분법 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {RULES.map(r => (
              <div key={r.g} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ flexShrink: 0, fontSize: 11.5, fontWeight: 700, color: PRIMARY, width: 86 }}>{r.g}</span>
                <span style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  {r.tip} <span style={{ color: 'var(--text-3)', fontFamily: "'Noto Sans JP', sans-serif" }}>예: {r.ex}</span>
                </span>
              </div>
            ))}
          </div>

          {/* 활용표 (가로 스크롤) */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: 360, borderCollapse: 'collapse', fontFamily: "'Noto Sans JP', sans-serif" }}>
              <thead>
                <tr>
                  {['활용형', '1그룹', '2그룹', '3그룹'].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 0 ? 'left' : 'left', fontSize: 11, fontWeight: 700,
                      color: i === 0 ? 'var(--text-3)' : PRIMARY, padding: '0 8px 8px', whiteSpace: 'nowrap',
                      fontFamily: 'inherit',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, ri) => (
                  <tr key={r.label} style={{ borderTop: '1px solid var(--bd)' }}>
                    <td style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, padding: '7px 8px', whiteSpace: 'nowrap' }}>{r.label}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-strong)', padding: '7px 8px', whiteSpace: 'nowrap' }}>{r.g1}</td>
                    <td style={{ fontSize: 13, color: 'var(--text-strong)', padding: '7px 8px', whiteSpace: 'nowrap' }}>{r.g2}</td>
                    <td style={{ fontSize: 12.5, color: 'var(--text-strong)', padding: '7px 8px', whiteSpace: 'nowrap' }}>{r.g3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ margin: '12px 0 0', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.6 }}>
            * 1그룹 て·た형은 끝글자에 따라 음편이 달라요: う·つ·る→って/った, む·ぶ·ぬ→んで/んだ, く→いて/いた, ぐ→いで/いだ, す→して/した (예외 行く→行って).
          </p>
        </div>
      )}
    </div>
  )
}
