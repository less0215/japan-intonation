import { useState, useEffect } from 'react'
import { loadTravelProducts, matchTravelProducts, openTravelProduct } from '../travel'

/* 라이브캠 맥락 여행 추천 팝업 — 지금 보고 있는 '도시'에 맞춰 마이리얼트립 상품 추천.
 * - 기존 파이프라인 재사용: /travel/products 카탈로그 → 도시/키워드 매칭 → 추적 링크.
 * - 영상 진입 4초 뒤(시청 몰입 후), 매칭 상품이 있을 때만, 세션당 '도시별 1회'만 노출(스팸 방지).
 * - 매칭 상품 없으면 아무것도 안 띄움(돗토리 등 상품 없는 도시는 자연히 비노출). */
const PRIMARY = '#5CA9CE'
const SEEN_KEY = 'tickjapan_livecam_travel_seen'   // 이 세션에서 팝업 본 도시 목록

export default function LiveCamTravelPopup({ city, keywords = [] }) {
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => { loadTravelProducts().then(setProducts) }, [])
  useEffect(() => { setOpen(false) }, [city])   // 도시 바뀌면 닫기(다른 도시로 hop 시)

  // 도시명 + 라이브캠 키워드를 맥락으로 상품 매칭(최대 2개)
  const items = matchTravelProducts(products, city, ...(keywords || []))

  useEffect(() => {
    if (!city || items.length === 0) return
    let seen = []
    try { seen = JSON.parse(sessionStorage.getItem(SEEN_KEY) || '[]') } catch {}
    if (seen.includes(city)) return            // 이번 세션에 이미 본 도시 → 스킵
    const t = setTimeout(() => {
      setOpen(true)
      try { seen.push(city); sessionStorage.setItem(SEEN_KEY, JSON.stringify(seen)) } catch {}
      try { window.gtag?.('event', 'travel_popup_shown', { placement: 'livecam_popup', city, item_id: items[0]?.gid }) } catch {}
    }, 4000)
    return () => clearTimeout(t)
  }, [items.length, city])

  if (!open || items.length === 0) return null

  return (
    <div onClick={() => setOpen(false)} style={ov}>
      <div onClick={(e) => e.stopPropagation()} style={sheet}>
        <button onClick={() => setOpen(false)} aria-label="닫기" style={closeBtn}>✕</button>
        <p style={head}>{city} 여행도 준비 중이세요?</p>
        <p style={sub}>지금 보고 계신 {city}에 어울리는 추천이에요</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
          {items.map((item) => (
            <button key={item.id} onClick={() => openTravelProduct(item, 'livecam_popup')} style={card}>
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
