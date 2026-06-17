/* 히라가나 오십음도 — GrammarLibrary·GrammarDetail 공통 사용 */
import { useState } from 'react'

const HIRAGANA_ROWS = [
  { row: 'あ行', chars: ['あ','い','う','え','お'], reads: ['아','이','우','에','오'] },
  { row: 'か行', chars: ['か','き','く','け','こ'], reads: ['카','키','쿠','케','코'] },
  { row: 'さ行', chars: ['さ','し','す','せ','そ'], reads: ['사','시','스','세','소'] },
  { row: 'た行', chars: ['た','ち','つ','て','と'], reads: ['타','치','츠','테','토'] },
  { row: 'な行', chars: ['な','に','ぬ','ね','の'], reads: ['나','니','누','네','노'] },
  { row: 'は行', chars: ['は','ひ','ふ','へ','ほ'], reads: ['하','히','후','헤','호'] },
  { row: 'ま行', chars: ['ま','み','む','め','も'], reads: ['마','미','무','메','모'] },
  { row: 'や行', chars: ['や','','ゆ','','よ'],   reads: ['야','','유','','요'] },
  { row: 'ら行', chars: ['ら','り','る','れ','ろ'], reads: ['라','리','루','레','로'] },
  { row: 'わ行', chars: ['わ','','','','を'],      reads: ['와','','','','오(を)'] },
  { row: 'ん',   chars: ['ん','','','',''],         reads: ['ん','','','',''] },
]

/* defaultOpen: true면 처음부터 펼쳐진 상태 */
export default function HiraganaTable({ defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{
      border: '1px solid #e8e8e8',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* 헤더 토글 */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#f8f9fa', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 0.3 }}>참고</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#333' }}>히라가나 오십음도 (あいうえお 표)</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: '12px 16px 16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '36px repeat(5, 1fr)', gap: 4, minWidth: 280 }}>
            {/* 열 헤더 */}
            <div />
            {['あ단','い단','う단','え단','お단'].map(h => (
              <div key={h} style={{ textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600, paddingBottom: 4 }}>{h}</div>
            ))}

            {HIRAGANA_ROWS.map(({ row, chars, reads }) => (
              <>
                <div key={row + '_label'} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: '#aaa', fontWeight: 600,
                }}>
                  {row}
                </div>
                {chars.map((ch, ci) => (
                  <div key={row + ci} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    padding: '6px 4px',
                    background: ch ? '#f0f8fc' : 'transparent',
                    borderRadius: 8,
                    border: ch ? '1px solid #d0eaf5' : 'none',
                  }}>
                    {ch ? (
                      <>
                        <span style={{ fontSize: 18, fontFamily: "'Noto Sans JP', sans-serif", color: '#333', lineHeight: 1.2 }}>{ch}</span>
                        <span style={{ fontSize: 9.5, color: '#888', marginTop: 2 }}>{reads[ci]}</span>
                      </>
                    ) : null}
                  </div>
                ))}
              </>
            ))}
          </div>

          <p style={{ margin: '12px 0 0', fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>
            * し(시)·ち(치)·つ(츠)·ふ(후)는 예외적인 발음입니다.
          </p>
        </div>
      )}
    </div>
  )
}
