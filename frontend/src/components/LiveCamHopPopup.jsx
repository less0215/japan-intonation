import { useEffect, useState } from 'react'
import { loadTravelProducts, matchTravelProducts, openTravelProduct } from '../travel'

/* 다른 도시로 이동 시 — '이동할 도시'에 맞는 마이리얼트립 추천 + '날씨 보러가기'.
 * - 애드몹 광고 없음(보상형 광고 제거).
 * - 이동할 도시에 매칭 상품이 없으면 팝업 없이 바로 이동(onGo).
 * - 상품 탭 → 외부 마이리얼트립(placement='livecam_hop'), '닫기'/바깥 → 이동 취소(onClose). */
const PRIMARY = '#5CA9CE'

export default function LiveCamHopPopup({ cam, onGo, onClose }) {
  const [products, setProducts] = useState(null)   // null = 로딩 중
  useEffect(() => { loadTravelProducts().then(setProducts) }, [])

  const items = (cam && products) ? matchTravelProducts(products, cam.city, ...(cam.matchKeywords || [])) : []
  // 로드 완료 + 매칭 0 → 추천 없으니 팝업 없이 바로 이동
  useEffect(() => {
    if (cam && products !== null && items.length === 0) onGo()
  }, [products, items.length, cam])

  if (!cam || products === null || items.length === 0) return null

  return (
    <div style={ov} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        <button style={closeBtn} onClick={onClose} aria-label="닫기">✕</button>
        <p style={head}>{cam.city} 가는 길이라면</p>
        <p style={sub}>{cam.city} 여행에 어울리는 추천이에요</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          {items.map((item) => (
            <button key={item.id} onClick={() => openTravelProduct(item, 'livecam_hop')} style={card}>
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

        <button style={goBtn} onClick={onGo}>{cam.city} 날씨 보러가기 →</button>
        <p style={disclosure}>제휴 링크 · 구매 시 틱재팬에 수수료가 지급됩니다</p>
      </div>
    </div>
  )
}

const ov = { position: 'fixed', inset: 0, zIndex: 5000, background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }
const sheet = { position: 'relative', width: '100%', maxWidth: 400, background: 'var(--surface)', borderRadius: 'var(--radius-sheet)', padding: '22px 18px 16px', boxShadow: 'var(--shadow-strong)', maxHeight: '85vh', overflowY: 'auto' }
const closeBtn = { position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 14, cursor: 'pointer' }
const head = { margin: '0 0 3px', fontSize: 18, fontWeight: 700, color: 'var(--text-strong)', letterSpacing: '-0.3px' }
const sub = { margin: 0, fontSize: 12.5, color: 'var(--text-3)' }
const card = { display: 'block', width: '100%', textAlign: 'left', padding: 0, cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden', fontFamily: 'inherit' }
const cardImg = { width: '100%', aspectRatio: '16 / 9', backgroundColor: 'var(--surface-2)', backgroundSize: 'cover', backgroundPosition: 'center' }
const goBtn = { width: '100%', height: 46, marginTop: 14, border: 'none', borderRadius: 13, background: PRIMARY, color: '#fff', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }
const disclosure = { margin: '10px 0 0', fontSize: 10.5, color: 'var(--text-3)', textAlign: 'center' }
