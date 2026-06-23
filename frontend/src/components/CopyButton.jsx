import { useState } from 'react'

/* 복사 버튼: 클릭 시 체크 아이콘으로 전환, 1.5초 후 복구 */
export default function CopyButton({ getText, onCopy }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (copied) return
    try {
      await navigator.clipboard.writeText(getText())
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 클립보드 API 미지원 환경 무시
    }
  }

  return (
    <button
      onClick={handleCopy}
      title="복사"
      className="copy-btn"
      style={{
        borderColor: copied ? '#5CA9CE' : '#e2e8f0',
        color: copied ? '#5CA9CE' : '#aaaaaa',
      }}
    >
      {copied ? <IconCheck /> : <IconCopy />}
    </button>
  )
}

function IconCopy() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
