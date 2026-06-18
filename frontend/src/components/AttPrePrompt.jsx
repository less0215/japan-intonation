/* ATT(추적 동의) 사전 안내 시트
 * 번역 1회 후 표시 → '다음 화면' 클릭 시 iOS 시스템 ATT 팝업 호출.
 * 시스템 팝업을 위장하지 않는 정석 pre-prompt (애플 가이드라인 준수).
 */
const PRIMARY = '#5CA9CE'

export default function AttPrePrompt({ onProceed }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* 아이콘 */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: `${PRIMARY}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px 0 16px',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M17 7h4v4" />
          </svg>
        </div>

        {/* 헤드카피 */}
        <p style={{ fontSize: 19, fontWeight: 700, margin: '0 0 8px', color: '#222', lineHeight: 1.4 }}>
          일본어 실력이 늘 수 있게 도와드릴게요
        </p>
        {/* 서브카피 */}
        <p style={{ fontSize: 14, color: '#666', margin: '0 0 18px', lineHeight: 1.65 }}>
          사용 패턴을 익명 분석해 번역 품질 및 학습 경험 향상을 도와 드릴 수 있습니다. 다음 화면에서 ‘허용’을 눌러 주세요.
        </p>

        {/* 안심 문구 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 22px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ fontSize: 12.5, color: '#aaa' }}>개인을 식별하는 정보는 수집하지 않아요</span>
        </div>

        {/* 단일 버튼 → 시스템 ATT 팝업 */}
        <button
          onClick={onProceed}
          style={{
            width: '100%', height: 50, border: 'none', borderRadius: 13,
            background: PRIMARY, color: '#fff', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          다음 화면
        </button>
      </div>
    </div>
  )
}
