import { useState } from 'react'
import ResultCard from './ResultCard'

/* 사진 학습 — 전체화면 모드 (관리자 베타)
 * 올린 사진 + (정보성 글이면) 한눈에 요약 + 의미 단위 구간 아코디언.
 * 구간을 펼치면 기존 ResultCard를 그대로 렌더 → 번역·후리가나·피치·TTS·문장분해·발음연습·저장 전부 재사용. */

const PRIMARY = '#5CA9CE'
const API_URL = 'https://japan-intonation-production.up.railway.app'

const DOC_LABELS = {
  book: '도서 · 세로쓰기', manga: '웹툰 · 만화', menu: '메뉴판', sign: '간판 · 표지', general: '일반',
}

export default function PhotoStudy({ result, imageUrl, onSaveChunk, onClose }) {
  // 구간별 분해(breakdown)는 펼친 뒤 온디맨드로 받아 해당 구간에 병합
  const [chunks, setChunks] = useState(() => (result?.chunks || []).map(c => ({ ...c, breakdown: c.breakdown || [] })))
  const [open, setOpen] = useState(0)          // 펼친 구간 index (-1=모두 접힘)
  const [bdLoading, setBdLoading] = useState(-1)
  const [savedSet, setSavedSet] = useState(() => new Set())

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
        <span style={{ fontSize: 9.5, background: 'var(--warning-tint)', color: 'var(--warning)', padding: '1px 6px', borderRadius: 5, fontWeight: 600 }}>베타</span>
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
                onClick={() => setOpen(isOpen ? -1 : i)}
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
                  {/* 사진 속 위치 — 이 문장이 어디에 있는지 스포트라이트로 강조(오 여기 있구나) */}
                  {imageUrl && c.bbox && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '0 2px 5px' }}>사진 속 위치</div>
                      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--bd)', lineHeight: 0 }}>
                        <img src={imageUrl} alt="이 문장이 사진에서 인식된 위치" style={{ width: '100%', display: 'block' }} />
                        <div style={{
                          position: 'absolute',
                          left: `${c.bbox[0] * 100}%`, top: `${c.bbox[1] * 100}%`,
                          width: `${c.bbox[2] * 100}%`, height: `${c.bbox[3] * 100}%`,
                          border: `2.5px solid ${PRIMARY}`, borderRadius: 3,
                          boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)', transition: 'all .2s',
                        }} />
                      </div>
                    </div>
                  )}
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
    </div>
  )
}
