import { useState } from 'react'
import ResultCard from './ResultCard'
import { logLearning } from '../App'

/* 사진 학습 — 전체화면 모드
 * 올린 사진 + (정보성 글이면) 한눈에 요약 + 의미 단위 구간 아코디언.
 * 구간을 펼치면 기존 ResultCard를 그대로 렌더 → 번역·후리가나·피치·TTS·문장분해·발음연습·저장 전부 재사용. */

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

const DOC_LABELS = {
  book: '도서 · 세로쓰기', manga: '웹툰 · 만화', menu: '메뉴판', sign: '간판 · 표지', general: '일반',
}

// 전체 사진 위 번호 핀 — 글자를 가리지 않게 bbox '바깥 여백'에 둔다.
// 기본은 강조 영역 위쪽(읽기 시작점) 여백으로 띄우고, 위 공간이 부족하면(상단 근접) 아래로 자동 전환.
// 범위를 주장하지 않는 '점'이라 위치만 가리키며, 아코디언 구간 번호(①②③)와 1:1로 연결.
function PinMarker({ bbox, n }) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return null
  const [bx, by, bw, bh] = bbox
  const cx = clamp01(bx + bw / 2) * 100
  const above = by > 0.10                                   // 기본: 강조 영역 시작점(위) 바깥 여백 — 문서 상단 여백은 거의 항상 비어 있음
  const top = clamp01(above ? by : by + bh) * 100
  const ty = above ? '-135%' : '35%'                        // 영역 경계 바깥으로 충분히 밀어 글자와 안 겹치게
  return (
    <div style={{
      position: 'absolute', left: `${cx}%`, top: `${top}%`, transform: `translate(-50%, ${ty})`,
      width: 24, height: 24, borderRadius: '50%', background: PRIMARY, color: '#fff',
      fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid #fff', boxShadow: '0 1px 5px rgba(0,0,0,0.5)',
    }}>{n}</div>
  )
}
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// 소프트 스포트라이트 — 딱딱한 사각 테두리 대신 bbox 주변을 부드럽게 번지게(feather) 밝히고 나머지를 어둡게.
// 날카로운 1px 경계가 주는 '여기서 정확히 끝난다'는 거짓 정밀감을 없애고, radial-gradient 깃털로
// bbox의 위치·범위 오차를 시각적으로 흡수한다(filter:blur는 자식 이미지까지 흐리니 쓰지 않음).
function SoftSpotlight({ bbox }) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return null
  const [bx, by, bw, bh] = bbox
  const cx = clamp01(bx + bw / 2) * 100, cy = clamp01(by + bh / 2) * 100
  const rx = Math.max(bw * 50 + 11, 15)   // 타원 가로 반경(%) — bbox 절반 + 깃털 여유, 최소 15%
  const ry = Math.max(bh * 50 + 9, 11)    // 타원 세로 반경(%)
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background .2s',
      background: `radial-gradient(ellipse ${rx}% ${ry}% at ${cx}% ${cy}%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.55) 100%)`,
    }} />
  )
}

export default function PhotoStudy({ result, imageUrl, onSaveChunk, onClose }) {
  // 구간별 분해(breakdown)는 펼친 뒤 온디맨드로 받아 해당 구간에 병합
  const [chunks, setChunks] = useState(() => (result?.chunks || []).map(c => ({ ...c, breakdown: c.breakdown || [] })))
  const [open, setOpen] = useState(0)          // 펼친 구간 index (-1=모두 접힘)
  const [bdLoading, setBdLoading] = useState(-1)
  const [savedSet, setSavedSet] = useState(() => new Set())
  // 원본 사진 표시 on/off (세로로 긴 사진은 매번 스크롤이 번거로워서). 선호 기억.
  const [showImage, setShowImage] = useState(() => {
    try { return localStorage.getItem('tickjapan_photostudy_img') !== '0' } catch { return true }
  })
  function toggleImage() {
    setShowImage(v => {
      const nv = !v
      try { localStorage.setItem('tickjapan_photostudy_img', nv ? '1' : '0') } catch {}
      return nv
    })
  }

  async function requestBreakdown(i) {
    const jp = chunks[i]?.japanese
    if (!jp) return
    setBdLoading(i)
    try {
      const res = await fetch(`${API_URL}/breakdown`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ japanese: jp }),
      })
      if (!res.ok) throw new Error()
      const { breakdown } = await res.json()
      setChunks(prev => prev.map((c, k) => (k === i ? { ...c, breakdown } : c)))
    } catch { /* 분해 실패해도 번역은 유지 */ } finally {
      setBdLoading(-1)
    }
  }

  function handleSave(i) {
    onSaveChunk?.(chunks[i])
    setSavedSet(prev => new Set(prev).add(i))
    logLearning('photo_save', chunks[i]?.japanese)   // 집단지성: 무엇이 중요한가
  }

  const label = DOC_LABELS[result?.doc_type] || result?.doc_type || ''

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9400, background: 'var(--bg)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* 헤더 */}
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'var(--surface)', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))' }}>
        <button onClick={onClose} aria-label="닫기" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'var(--text-2)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>사진 학습</span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '14px 16px 90px' }}>
        {/* 사진 썸네일 + 유형 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          {imageUrl && <img src={imageUrl} alt="올린 사진" style={{ width: 54, height: 68, objectFit: 'cover', borderRadius: 10, border: '1px solid var(--bd)', flexShrink: 0 }} />}
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
              {result?.summary ? '정보성 글 · ' : ''}<b style={{ color: PRIMARY, fontWeight: 600 }}>{chunks.length}개 구간</b>
            </div>
          </div>
        </div>

        {/* 한눈에 요약 — 정보성 글(도서 등)일 때만 */}
        {result?.summary && (
          <div style={{ border: '1.5px solid var(--primary-tint-bd)', background: 'var(--primary-tint)', borderRadius: 14, padding: '13px 14px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.5.5 1 1.3 1 2h6c0-.7.5-1.5 1-2a7 7 0 0 0-4-12z" /></svg>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--primary-strong)' }}>한눈에</span>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--text-strong)' }}>{result.summary}</div>
          </div>
        )}

        {result?.summary && (
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.5px', color: 'var(--text-3)', textTransform: 'uppercase', margin: '0 2px 8px' }}>구간별 자세히</div>
        )}

        {/* 구간 아코디언 — 펼치면 ResultCard 그대로 */}
        {chunks.map((c, i) => {
          const isOpen = open === i
          return (
            <div key={i} style={{ marginBottom: 8 }}>
              <button
                onClick={() => { const opening = !isOpen; setOpen(opening ? i : -1); if (opening) logLearning('photo_expand', c.japanese) }}
                aria-expanded={isOpen}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: 12, borderRadius: 12, cursor: 'pointer', textAlign: 'left', background: isOpen ? 'var(--primary-tint)' : 'var(--surface)', border: `1.5px solid ${isOpen ? PRIMARY : 'var(--bd)'}`, fontFamily: 'inherit' }}
              >
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: isOpen ? PRIMARY : 'var(--surface-2)', color: isOpen ? '#fff' : 'var(--text-2)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 16, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP','Noto Sans KR',sans-serif", lineHeight: 1.4 }}>{c.japanese}</span>
                  {/* 접힌 상태에선 한국어 뜻을 바로 보여주고(스캔용), 펼치면 아래 ResultCard가 상세 표시 */}
                  {!isOpen && c.korean_meaning && (
                    <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-2)', marginTop: 3, lineHeight: 1.45 }}>{c.korean_meaning}</span>
                  )}
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s', flexShrink: 0, marginTop: 1 }}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {isOpen && (
                <div style={{ marginTop: 8 }}>
                  {/* 원본 사진 — 토글 ON일 때만. 전 사용자·전 유형 동일.
                      bbox가 있으면 소프트 스포트라이트로 위치 강조 + 글자 안 가리는 번호 핀,
                      없으면(빽빽한 세로쓰기에서 Gemini가 box 생략 등) 원본만 보여주고 헤더 문장과 직접 대조. */}
                  {imageUrl && showImage && (() => {
                    const hasBox = Array.isArray(c.bbox) && c.bbox.length === 4
                    return (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '0 2px 5px' }}>
                          {hasBox ? '전체에서 위치' : '원본 사진 — 위 문장을 사진에서 찾아보세요'}
                        </div>
                        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--bd)', lineHeight: 0 }}>
                          <img src={imageUrl} alt="올린 사진 원본" style={{ width: '100%', display: 'block' }} />
                          {hasBox && <SoftSpotlight bbox={c.bbox} />}
                          {hasBox && <PinMarker bbox={c.bbox} n={i + 1} />}
                        </div>
                      </div>
                    )
                  })()}
                  <ResultCard
                    data={c}
                    inputText={c.korean_meaning}
                    saved={savedSet.has(i)}
                    onSave={() => handleSave(i)}
                    breakdownLoading={bdLoading === i}
                    onRequestBreakdown={() => requestBreakdown(i)}
                    onBreakdownExpanded={() => {}}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 원본 사진 on/off — 좌하단 떠 있는 토글 (세로로 긴 사진 스크롤 번거로움 해소) */}
      {imageUrl && (
        <button
          type="button"
          onClick={toggleImage}
          aria-label={showImage ? '원본 사진 숨기기' : '원본 사진 보기'}
          style={{
            position: 'fixed', left: 16, bottom: 'calc(18px + env(safe-area-inset-bottom, 0px))', zIndex: 5,
            display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
            fontSize: 13, fontWeight: 600,
            border: `1.5px solid ${showImage ? PRIMARY : 'var(--bd-2)'}`,
            background: showImage ? 'var(--primary-tint)' : 'var(--surface)',
            color: showImage ? 'var(--primary-strong)' : 'var(--text-2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2.5" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
            {!showImage && <line x1="3" y1="3" x2="21" y2="21" />}
          </svg>
          {showImage ? '사진 표시' : '사진 숨김'}
        </button>
      )}
    </div>
  )
}
