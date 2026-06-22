import { useState, useEffect } from 'react'

/* 관리자 전용 — 마이리얼트립 제휴 수익 대시보드
 * - 관리자 계정(is_admin)에서만 프로필에 노출
 * - /admin/revenue?user_id= 로 요약을 받아 직관적으로 표시 */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const won = (n) => '₩' + (n || 0).toLocaleString()

const PLACE_LABEL = { home_banner: '홈 배너', result_popup: '번역 팝업' }

export default function AdminRevenue({ userId }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  function load() {
    setLoading(true); setErr(false)
    fetch(`${API_URL}/admin/revenue?user_id=${userId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setErr(true))
      .finally(() => setLoading(false))
  }
  useEffect(() => { if (userId) load() }, [userId])

  const places = data ? Object.entries(data.by_placement || {}) : []

  return (
    <div style={{ border: '1px solid #e6ecf0', borderRadius: 14, padding: 16, marginBottom: 14, background: '#fbfdfe' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#2a5a72' }}>제휴 수익 (관리자)</span>
        <button onClick={load} style={{ background: 'none', border: '1px solid #d8e7f0', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: PRIMARY, cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>

      {loading ? (
        <p style={{ fontSize: 12.5, color: '#9aa0a6', margin: '8px 0' }}>불러오는 중…</p>
      ) : err ? (
        <p style={{ fontSize: 12.5, color: '#d05050', margin: '8px 0' }}>불러오지 못했어요. 새로고침 해주세요.</p>
      ) : (
        <>
          {/* 총 수수료 큰 숫자 */}
          <div style={{ background: 'linear-gradient(135deg,#eef7fc,#e2f0fa)', borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 11.5, color: '#5a8499' }}>총 수수료</p>
            <p style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 700, color: '#1f4d63', letterSpacing: '-0.5px' }}>{won(data.total_commission)}</p>
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#7a9cae' }}>
              예약 {data.total_reservations}건 · 판매액 {won(data.total_sales)}
            </p>
          </div>

          {/* 배치별 */}
          <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: '#8a9197' }}>배치별</p>
          {places.length === 0 ? (
            <p style={{ fontSize: 12, color: '#aab2b8', margin: '0 0 12px' }}>아직 데이터가 없어요. 예약이 생기면 채워집니다.</p>
          ) : (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {places.map(([k, v]) => (
                <div key={k} style={{ flex: '1 1 45%', minWidth: 120, border: '1px solid #eaecef', borderRadius: 10, padding: '10px 12px', background: '#fff' }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#4b5563' }}>{PLACE_LABEL[k] || k}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 16, fontWeight: 700, color: PRIMARY }}>{won(v.commission)}</p>
                  <p style={{ margin: '1px 0 0', fontSize: 10.5, color: '#9aa0a6' }}>예약 {v.reservations}건</p>
                </div>
              ))}
            </div>
          )}

          {/* 상품 TOP */}
          {data.top_products?.length > 0 && (
            <>
              <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: '#8a9197' }}>상품별 TOP</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {data.top_products.slice(0, 8).map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: PRIMARY, flexShrink: 0 }}>{won(p.commission)} · {p.reservations}건</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
