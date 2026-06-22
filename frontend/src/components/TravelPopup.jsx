import { useState, useEffect, useRef } from 'react'
import { detectTravelProducts } from '../data/travelContext'

/* 맥락 여행 추천 팝업 (모달)
 * - 번역 직후가 아니라, 문장 분해를 펼친 뒤(armed) 사용자가 아래로 스크롤하면 1회 노출
 * - 여행 관련 문장이 아니면 아예 동작 안 함
 * - 모달이라 이미지/레이아웃을 크게·반응형으로 자유롭게 표현 (인라인 잘림 해결) */
const PRIMARY = '#5CA9CE'

function openProduct(item) {
  const url = item.url.replace('aff_label1=home_section', 'aff_label1=result_popup')
  try { window.gtag?.('event', 'affiliate_click', { partner: 'klook', item_id: item.id, price: item.price, placement: 'result_popup' }) } catch {}
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function TravelPopup({ input, japanese, armed }) {
  const items = detectTravelProducts(input, japanese)
  const [open, setOpen] = useState(false)
  const firedRef = useRef(false)

  // 새 번역이 오면 초기화
  useEffect(() => { firedRef.current = false; setOpen(false) }, [japanese])

  // '문장 분해 결과 보기' 클릭(armed) 즉시 팝업 오픈 (여행 문장 한정, 결과당 1회)
  // → 사용자가 팝업을 읽는 동안 뒤에서 분해 결과가 로딩됨
  useEffect(() => {
    if (!armed || items.length === 0 || firedRef.current) return
    firedRef.current = true
    setOpen(true)
    try { window.gtag?.('event', 'travel_popup_shown', { item_id: items[0]?.id }) } catch {}
  }, [armed, japanese, items.length])

  if (!open || items.length === 0) return null

  return (
    <div onClick={() => setOpen(false)} style={ov}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <button onClick={() => setOpen(false)} aria-label="닫기" style={closeBtn}>✕</button>
        <p style={head}>일본 여행 준비 중이세요?</p>
        <p style={sub}>방금 번역한 내용과 어울리는 추천이에요</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
          {items.map((item) => (
            <button key={item.id} onClick={() => openProduct(item)} style={card}>
              <div style={{ ...cardImg, backgroundImage: `url('${item.image}')` }} />
              <div style={{ padding: '11px 13px 13px' }}>
                <p style={{ margin: '0 0 3px', fontSize: 11, color: '#aeb4b9' }}>{item.city} · 일본</p>
                <p style={{ margin: '0 0 7px', fontSize: 14, color: '#2b2f33', lineHeight: 1.35 }}>{item.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: PRIMARY }}>₩{item.price.toLocaleString()}~</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: PRIMARY }}>보러가기 →</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p style={disclosure}>제휴 링크 · 구매 시 틱재팬에 수수료가 지급됩니다</p>
      </div>
    </div>
  )
}

const ov = {
  position: 'fixed', inset: 0, zIndex: 5000, background: 'rgba(20,30,40,0.5)',
  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
}
const sheet = {
  position: 'relative', width: '100%', maxWidth: 460, background: '#fff',
  borderRadius: '20px 20px 0 0', padding: '22px 18px calc(20px + env(safe-area-inset-bottom))',
  boxShadow: '0 -8px 40px rgba(0,0,0,0.2)', maxHeight: '85vh', overflowY: 'auto',
}
const closeBtn = {
  position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%',
  border: 'none', background: '#f1f3f5', color: '#888', fontSize: 14, cursor: 'pointer',
}
const head = { margin: '0 0 3px', fontSize: 18, fontWeight: 700, color: '#1f2937', letterSpacing: '-0.3px' }
const sub = { margin: 0, fontSize: 12.5, color: '#9aa0a6' }
const card = {
  display: 'block', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer',
  background: '#fff', border: '1px solid #e6ecf0', borderRadius: 14, overflow: 'hidden', fontFamily: 'inherit',
}
const cardImg = {
  width: '100%', aspectRatio: '16 / 9', backgroundColor: '#e8edf0',
  backgroundSize: 'cover', backgroundPosition: 'center',
}
const disclosure = { margin: '12px 0 0', fontSize: 10.5, color: '#b6bcc1', textAlign: 'center' }
