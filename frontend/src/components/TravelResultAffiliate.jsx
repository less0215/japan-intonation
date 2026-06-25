import { useState, useEffect } from 'react'
import { loadTravelProducts, matchTravelProducts, openTravelProduct } from '../travel'

/* 번역 결과 맥락 제휴 — 방금 번역한 문장이 여행 맥락(적합도 충족)이면 결과 아래 인라인으로 추천.
 * - 웹·앱 공통. 매칭(적합도) 없으면 아무것도 렌더 안 함(엉뚱한 노출 방지).
 * - 팝업이 아니라 결과 페이지에 자연스럽게 붙는 인라인 카드(덜 거슬림). placement='result_inline'(전환 추적). */
const PRIMARY = '#5CA9CE'

export default function TravelResultAffiliate({ input, japanese }) {
  const [products, setProducts] = useState([])
  useEffect(() => { loadTravelProducts().then(setProducts) }, [])

  const items = matchTravelProducts(products, input, japanese)
  if (items.length === 0) return null

  return (
    <div style={{ marginTop: 16 }} className="tra-fadein">
      <style>{`@keyframes trafade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}.tra-fadein{animation:trafade .3s ease both}@media (prefers-reduced-motion:reduce){.tra-fadein{animation:none}}`}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 2px 8px' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>일본 여행 준비 중이세요?</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>· 방금 번역과 어울리는 추천</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map((item) => (
          <button key={item.id} onClick={() => openTravelProduct(item, 'result_inline')} style={row}>
            <div style={{ width: 92, height: 69, flexShrink: 0, borderRadius: 10, backgroundColor: 'var(--surface-2)', backgroundImage: `url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ flex: 1, minWidth: 0, padding: '1px 2px' }}>
              <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-3)' }}>{item.city} · 일본</p>
              <p style={{ margin: '0 0 5px', fontSize: 13, color: 'var(--text-1)', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
              {item.price > 0 && <span style={{ fontSize: 13.5, fontWeight: 700, color: PRIMARY }}>₩{item.price.toLocaleString()}~</span>}
            </div>
            <span style={{ flexShrink: 0, alignSelf: 'center', fontSize: 12, fontWeight: 600, color: PRIMARY }}>보러가기 →</span>
          </button>
        ))}
      </div>

      <p style={{ margin: '8px 2px 0', fontSize: 10.5, color: 'var(--text-3)' }}>제휴 링크 · 구매 시 틱재팬에 수수료가 지급됩니다</p>
    </div>
  )
}

const row = {
  display: 'flex', alignItems: 'flex-start', gap: 11, width: '100%', textAlign: 'left',
  background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: 10,
  cursor: 'pointer', fontFamily: 'inherit',
}
