import { useState, useRef, useEffect } from 'react'
import { track } from '../App'
import { sttSupported, sttStart, sttStop, sttCancel } from '../stt'

const PRIMARY = '#5CA9CE'

/* 남은 초 → "오후 5:50" 형태의 초기화 시각 */
function resetClock(sec) {
  const d = new Date(Date.now() + Math.max(0, sec) * 1000)
  let h = d.getHours()
  const m = d.getMinutes()
  const ap = h < 12 ? '오전' : '오후'
  h = h % 12 || 12
  return `${ap} ${h}:${String(m).padStart(2, '0')}`
}

/* 빠른 번역 스위치 + 사용량 (입력창 내부 하단 한 줄) */
function FastToolbar({ active, locked, usedPct = 0, unlimited, resetSec = 0, onToggle, onUnlock, unlimitedLabel }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', width: '100%' }}>
      {/* 좌측: 사용량 소진 + 광고 해제 가능(앱) → '제한 풀기' 칩 버튼 (자동 팝업 X) */}
      {active && !unlimited && locked && onUnlock && (
        <button
          type="button"
          onClick={onUnlock}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, background: 'var(--warning-tint)', border: '1px solid var(--warning)', borderRadius: 999, padding: '5px 11px 5px 9px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--warning)"><polygon points="8 6 8 18 18 12" /></svg>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--warning)' }}>무료 사용량 제한 풀기</span>
        </button>
      )}
      {/* 좌측: 사용량 표시 (활성 + 일반 회원, 제한 풀기 칩이 없을 때) */}
      {active && !unlimited && !(locked && onUnlock) && (
        <>
          <span style={{ width: 48, height: 5, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden', flexShrink: 0 }}>
            <span style={{ display: 'block', height: '100%', width: `${usedPct}%`, background: locked ? 'var(--warning)' : PRIMARY, borderRadius: 3 }} />
          </span>
          <span style={{ fontSize: 10.5, color: locked ? 'var(--warning)' : 'var(--text-3)' }}>
            {resetClock(resetSec)} 초기화 · <b style={{ fontWeight: 600, color: locked ? 'var(--warning)' : PRIMARY }}>{usedPct}%</b>
          </span>
        </>
      )}
      {active && unlimited && (
        <span style={{ fontSize: 10.5, color: PRIMARY, fontWeight: 600 }}>{unlimitedLabel || '무제한 이용 중'}</span>
      )}
      {/* 우측: ⚡ 빠른 번역 + 스위치 */}
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={active}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: active ? PRIMARY : 'var(--text-2)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? PRIMARY : 'none'} stroke={active ? 'none' : 'var(--text-3)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        빠른 번역
        <span style={{ width: 44, height: 26, borderRadius: 13, background: active ? PRIMARY : 'var(--bd-2)', position: 'relative', transition: 'background .15s' }}>
          <span style={{ position: 'absolute', top: 3, left: active ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: 'var(--surface)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .15s' }} />
        </span>
      </button>
    </div>
  )
}

/* 한국어 입력창 + 번역 버튼
 * - 큰 textarea (여러 줄 입력)
 * - 디바운스 자동 번역: 입력을 멈추면 자동으로 번역 시작 (Papago 방식)
 * - Enter = 즉시 번역 / Shift+Enter = 줄바꿈
 */
const DEBOUNCE_MS = 850

export default function SearchBar({ onAnalyze, loading, onTyping, onClear, fast, showCamera, onCamera }) {
  const [text, setText] = useState('')
  const timerRef = useRef(null)
  const lastSubmittedRef = useRef('')
  const galleryRef = useRef(null)
  const cameraRef = useRef(null)
  const [showPicker, setShowPicker] = useState(false)
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  // 음성 입력(STT) — 지원될 때만 마이크 버튼 노출(웹: Web Speech API / 앱: 네이티브 음성인식)
  const [listening, setListening]       = useState(false)   // 듣는 중(녹음/실시간 인식)
  const [transcribing, setTranscribing] = useState(false)   // 앱: 녹음 종료 후 백엔드 변환 중
  const [voiceText, setVoiceText]       = useState('')       // 웹: 실시간 받아쓰기 미리보기
  const [voiceOk, setVoiceOk]           = useState(false)
  const [voiceErr, setVoiceErr]         = useState('')
  useEffect(() => { let alive = true; sttSupported().then(ok => { if (alive) setVoiceOk(ok) }); return () => { alive = false } }, [])

  // 받아쓰기 확정 → 입력창에 채우고 바로 번역(수정 가능)
  function finishVoice(finalText) {
    setListening(false); setTranscribing(false)
    const v = (finalText || '').trim()
    setVoiceText('')
    if (v) {
      setText(v)
      lastSubmittedRef.current = ''
      onTyping?.(false)
      onAnalyze(v)
      track('voice_input_done', { len: v.length })
    }
  }
  async function startVoice() {
    if (listening) return
    setVoiceErr(''); setVoiceText(''); setTranscribing(false); setListening(true)
    track('voice_input_start')
    await sttStart({
      onPartial: (t) => setVoiceText(t),
      onTranscribing: () => { setListening(false); setTranscribing(true) },
      onFinal: (t) => finishVoice(t),
      onError: (code) => {
        setListening(false); setTranscribing(false); setVoiceText('')
        setVoiceErr(code === 'denied' ? '마이크 권한을 허용해 주세요.' : '음성 인식에 실패했어요. 다시 시도해 주세요.')
        track('voice_input_error', { code })
      },
      onEnd: () => { setListening(false) },
    })
  }
  function stopVoice() { sttStop() }      // '완료' → (웹)즉시 확정 / (앱)변환 시작
  function cancelVoice() { sttCancel(); setListening(false); setTranscribing(false); setVoiceText('') }

  // 사진 선택 → 부모(handlePhoto)로 전달. 같은 파일 재선택도 되도록 value 초기화
  function handleFile(e) {
    const f = e.target.files?.[0]
    e.target.value = ''
    setShowPicker(false)
    if (f) onCamera?.(f)
  }
  // 카메라 버튼: 모바일은 갤러리/카메라 선택 팝업, PC(카메라 없음)는 바로 파일창
  function openPhoto() {
    if (isMobile) setShowPicker(true)
    else galleryRef.current?.click()
  }

  // 언마운트 시 타이머 정리
  useEffect(() => () => clearTimeout(timerRef.current), [])

  function submit(value) {
    const trimmed = value.trim()
    clearTimeout(timerRef.current)
    onTyping?.(false)
    if (!trimmed || trimmed === lastSubmittedRef.current) return
    lastSubmittedRef.current = trimmed
    onAnalyze(trimmed)
  }

  function handleChange(e) {
    const value = e.target.value
    setText(value)
    clearTimeout(timerRef.current)
    const trimmed = value.trim()
    if (!trimmed) {
      // 입력을 모두 지우면 이전 결과도 함께 제거
      onTyping?.(false)
      lastSubmittedRef.current = ''
      onClear?.()
      return
    }
    // 입력 즉시 "번역 중" 신호 → 디바운스 후 자동 번역
    onTyping?.(true)
    timerRef.current = setTimeout(() => submit(value), DEBOUNCE_MS)
  }

  function handleKeyDown(e) {
    // Enter(줄바꿈 아님) = 즉시 번역
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit(text)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    submit(text)
  }

  const disabled = loading || !text.trim()
  const focusedRef = useRef(false)

  function handleFocus() {
    // 세션 첫 입력창 포커스만 기록 (번역 깔때기 시작점)
    if (focusedRef.current) return
    focusedRef.current = true
    track('search_focus')
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* 입력창 + 하단 툴바(빠른 번역 칩)를 한 박스로 */}
      <div className="search-box" style={{ position: 'relative' }}>
        <textarea
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="번역할 내용을 입력하세요"
          className="search-input"
          rows={6}
          style={{ minHeight: '42vh', fontSize: 18 }}
        />
        {/* 사진 번역 버튼 — 입력칸이 비어 있을 때만 노출. 타이핑하면 자연스럽게 사라짐 */}
        {showCamera && !text.trim() && !loading && (
          <>
            <input ref={galleryRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />
            <button
              type="button"
              onClick={openPhoto}
              aria-label="사진으로 번역"
              style={{ position: 'absolute', top: 11, right: 11, width: 48, height: 48, borderRadius: 14, border: `1.5px solid ${PRIMARY}`, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, overflow: 'visible' }}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3.2" />
              </svg>
            </button>
          </>
        )}
        {/* 음성 입력 버튼 — 입력칸이 비어 있고 지원될 때만(사진 버튼 왼쪽). 탭하면 받아쓰기 시작 */}
        {voiceOk && !text.trim() && !loading && !listening && !transcribing && (
          <button
            type="button"
            onClick={startVoice}
            aria-label="음성으로 입력"
            style={{ position: 'absolute', top: 11, right: showCamera ? 67 : 11, width: 48, height: 48, borderRadius: 14, border: `1.5px solid ${PRIMARY}`, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
            </svg>
          </button>
        )}
        {/* 음성 입력 오버레이 — 듣는 중(펄스 마이크 + 실시간/안내 + 취소/완료) / 받아쓰는 중(스피너) */}
        {(listening || transcribing) && (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--surface)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, zIndex: 5 }}>
            {transcribing ? (
              <>
                <span className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
                <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600, color: 'var(--text-2)' }}>받아쓰는 중…</p>
              </>
            ) : (
              <>
                <div style={{ position: 'relative', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="tj-voice-ring" />
                  <span className="tj-voice-ring d2" />
                  <span className="tj-voice-ring d3" />
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(92,169,206,0.45)' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                    </svg>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: voiceText ? 'var(--text-strong)' : 'var(--text-2)', textAlign: 'center', minHeight: 24, lineHeight: 1.5, maxWidth: 420 }}>
                  {voiceText || '듣고 있어요…'}
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <button type="button" onClick={cancelVoice} style={{ padding: '11px 20px', borderRadius: 12, border: '1px solid var(--bd)', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>취소</button>
                  <button type="button" onClick={stopVoice} style={{ padding: '11px 24px', borderRadius: 12, border: 'none', background: PRIMARY, color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>완료</button>
                </div>
              </>
            )}
          </div>
        )}
        {fast && (
          <div className="search-box-toolbar">
            <FastToolbar {...fast} />
          </div>
        )}
      </div>
      {voiceErr && (
        <p style={{ margin: '8px 2px 0', fontSize: 12.5, color: 'var(--warning)', textAlign: 'center' }}>{voiceErr}</p>
      )}
      <button
        type="submit"
        disabled={disabled}
        className="search-btn"
        style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 17, padding: '17px 0' }}
      >
        {loading ? <span className="spinner" /> : '번역'}
      </button>

      {/* 모바일 사진 선택 — 갤러리/카메라 바텀시트 (PC는 안 뜸, 바로 파일창) */}
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--overlay)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '20px 16px calc(18px + env(safe-area-inset-bottom, 0px))', boxShadow: '0 -8px 30px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', textAlign: 'center', marginBottom: 16 }}>사진 가져오기</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button type="button" onClick={() => cameraRef.current?.click()} style={pickerBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3.2" /></svg>
                카메라로 촬영
              </button>
              <button type="button" onClick={() => galleryRef.current?.click()} style={pickerBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.5" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                갤러리에서 선택
              </button>
            </div>
            <button type="button" onClick={() => setShowPicker(false)} style={{ width: '100%', marginTop: 12, padding: '13px', borderRadius: 12, border: 'none', background: 'transparent', color: 'var(--text-3)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>취소</button>
          </div>
        </div>
      )}
    </form>
  )
}

const pickerBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, width: '100%', padding: '15px', borderRadius: 14, border: '1.5px solid var(--bd)', background: 'var(--surface-2)', color: 'var(--text-strong)', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }
