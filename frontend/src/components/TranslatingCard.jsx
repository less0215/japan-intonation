import { useState, useEffect } from 'react'

/* 번역 로딩 — 스켈레톤 대신 토스풍 모션.
 * 한↔あ 모핑 오브 + 펄스 링 + 진행 멘트 순환으로 지루하지 않게. */

const PRIMARY = '#5CA9CE'
const MESSAGES = ['일본어로 옮기는 중', '발음·악센트 다듬는 중', '거의 다 됐어요']

export default function TranslatingCard({ inputText }) {
  const [mi, setMi] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setMi(m => (m + 1) % MESSAGES.length), 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card">
      <div className="section">
        {inputText && (
          <div style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, lineHeight: 1.5 }}>{inputText}</div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '26px 0 22px' }}>
          <div className="tj-loader-orb" aria-hidden="true">
            <span className="ko">한</span>
            <span className="ja">あ</span>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', minHeight: 18 }} aria-live="polite">
            {MESSAGES[mi]}<span className="tj-loader-dots"><i /><i /><i /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
