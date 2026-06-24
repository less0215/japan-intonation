import { useState } from 'react'

/* 복사 버튼
 * - getText만 주면: 한 번 탭으로 즉시 복사 (기존 동작)
 * - options(=[{ label, hint, getText, onCopy }])를 주면: 탭 시 선택 팝오버 (후리가나 포함 / 원문만 등)
 * 복사 후 1.5초간 체크 아이콘으로 전환 */
export default function CopyButton({ getText, onCopy, options }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  async function copy(text, cb) {
    try {
      await navigator.clipboard.writeText(text || '')
      setCopied(true)
      setOpen(false)
      cb?.()
      onCopy?.()
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setOpen(false)   // 클립보드 API 미지원 환경 무시
    }
  }

  function handleClick() {
    if (copied) return
    if (options?.length) { setOpen(o => !o); return }   // 선택지가 있으면 팝오버
    copy(getText())                                      // 단일이면 바로 복사
  }

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={handleClick}
        title="복사"
        aria-haspopup={options?.length ? 'menu' : undefined}
        className="copy-btn"
        style={{
          borderColor: copied || open ? '#5CA9CE' : '#e2e8f0',
          color: copied || open ? '#5CA9CE' : '#aaaaaa',
        }}
      >
        {copied ? <IconCheck /> : <IconCopy />}
      </button>

      {open && options?.length > 0 && (
        <>
          {/* 바깥 탭하면 닫힘 */}
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 60 }} />
          <div
            role="menu"
            style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 61,
              minWidth: 184, background: 'var(--surface)', border: '1px solid var(--bd)',
              borderRadius: 12, boxShadow: '0 10px 28px rgba(0,0,0,0.14)', padding: 5,
              display: 'flex', flexDirection: 'column',
            }}
          >
            {options.map((opt, i) => (
              <button
                key={i}
                role="menuitem"
                onClick={() => copy(opt.getText(), opt.onCopy)}
                className="copy-menu-item"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  textAlign: 'left', width: '100%', padding: '10px 11px', border: 'none',
                  background: 'transparent', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-1)', whiteSpace: 'nowrap' }}>{opt.label}</span>
                {opt.hint && <span style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{opt.hint}</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
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
