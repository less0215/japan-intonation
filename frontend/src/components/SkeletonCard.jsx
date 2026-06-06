/* 번역 결과 로딩 스켈레톤
 * 버튼을 누르는 즉시 ResultCard와 같은 레이아웃의 뼈대를 보여줘
 * "누르자마자 반응한다"는 즉각 반응감을 준다.
 * 입력한 한국어(inputText)는 이미 알고 있으므로 그대로 표시한다.
 */

const PRIMARY = '#5CA9CE'

export default function SkeletonCard({ inputText }) {
  return (
    <div className="card" aria-busy="true">

      {/* 섹션 1: 입력문(즉시 표시) + 일본어/발음 뼈대 */}
      <div className="section">
        <div className="section-header">
          {inputText && (
            <span style={{ fontSize: 13, fontWeight: 700, color: PRIMARY, flex: 1, minWidth: 0, wordBreak: 'break-all' }}>
              {inputText}
            </span>
          )}
        </div>
        {/* 일본어 자리 */}
        <div className="skel" style={{ height: 26, width: '85%' }} />
        {/* 한국어 발음 자리 */}
        <div className="skel" style={{ height: 15, width: '60%' }} />
      </div>

      {/* 피치 그래프 자리 */}
      <div style={{ padding: '0 20px 4px' }}>
        <div className="skel" style={{ height: 90, width: '100%', borderRadius: 10 }} />
      </div>

      <hr className="divider" />

      {/* 섹션 2: 문장 분해 자리 */}
      <div className="section">
        <div className="section-header">
          <span className="section-label">문장 분해</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[80, 92, 70].map((w, i) => (
            <div key={i} className="skel" style={{ height: 16, width: `${w}%` }} />
          ))}
        </div>
      </div>

    </div>
  )
}
