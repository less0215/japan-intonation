import { useState, useEffect, useRef } from 'react'
import { loadTravelProducts, matchTravelProducts, openTravelProduct } from '../travel'

/* 맥락 여행 추천 팝업 (모달, 가운데)
 * - '문장 분해 결과 보기' 클릭(armed) 즉시 오픈 (여행 문장 한정, 결과당 1회)
 * - 사용자가 팝업을 읽는 동안 뒤에서 분해 결과가 로딩됨
 * - 마이리얼트립 카탈로그(/travel/products) 기반, 모달이라 이미지 16:9 풀사이즈 */
const PRIMARY = '#5CA9CE'

export default function TravelPopup({ input, japanese, armed }) {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const firedRef = useRef(false)

  useEffect(() => { loadTravelProducts().then(setProducts) }, [])
  useEffect(() => { firedRef.current = false; setOpen(false) }, [japanese])

  const items = matchTravelProducts(products, input, japanese)

  // 분해 보기 클릭(armed) 즉시 오픈 (매칭 상품 있을 때만, 1회)
  useEffect(() => {
    if (!armed || items.length === 0 || firedRef.current) return
    firedRef.current = true
    setOpen(true)
    try { window.gtag?.('event', 'travel_popup_shown', { item_id: items[0]?.gid }) } catch {}
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
            <button key={item.id} onClick={() => openTravelProduct(item, 'result_popup')} style={card}>
              <div style={{ ...cardImg, backgroundImage: `url('${item.image}')` }} />
              <div style={{ padding: '11px 13px 13px' }}>
                <p style={{ margin: '0 0 3px', fontSize: 11, color: 'var(--text-3)' }}>{item.city} · 일본</p>
                <p style={{ margin: '0 0 7px', fontSize: 14, color: 'var(--text-1)', lineHeight: 1.35 }}>{item.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {item.price > 0
                    ? <span style={{ fontSize: 15, fontWeight: 700, color: PRIMARY }}>₩{item.price.toLocaleString()}~</span>
                    : <span />}
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
  position: 'fixed', inset: 0, zIndex: 5000, background: 'var(--overlay)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
}
const sheet = {
  position: 'relative', width: '100%', maxWidth: 400, background: 'var(--surface)',
  borderRadius: 'var(--radius-sheet)', padding: '22px 18px 18px',
  boxShadow: 'var(--shadow-strong)', maxHeight: '85vh', overflowY: 'auto',
}
const closeBtn = {
  position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%',
  border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 14, cursor: 'pointer',
}
const head = { margin: '0 0 3px', fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', letterSpacing: '-0.3px' }
const sub = { margin: 0, fontSize: 12.5, color: 'var(--text-3)' }
const card = {
  display: 'block', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer',
  background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden', fontFamily: 'inherit',
}
const cardImg = {
  width: '100%', aspectRatio: '16 / 9', backgroundColor: 'var(--surface-2)',
  backgroundSize: 'cover', backgroundPosition: 'center',
}
const disclosure = { margin: '12px 0 0', fontSize: 10.5, color: 'var(--text-3)', textAlign: 'center' }
