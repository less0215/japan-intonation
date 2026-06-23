import { useState, useEffect } from 'react'

/* 관리자 전용 — 마이리얼트립 제휴 수익 대시보드
 * - 카드는 is_admin 계정에서만 노출(UI)
 * - 데이터는 '관리자 키'가 있어야만 로드(보안): 본인이 1회 입력 → 이 브라우저 localStorage에만 저장
 *   → 앱 번들에 키가 없고, user_id 추측으로도 접근 불가 */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'
const won = (n) => '₩' + (n || 0).toLocaleString()
const PLACE_LABEL = { home_banner: '홈 배너', result_popup: '번역 팝업' }

export default function AdminRevenue() {
  const [adminKey, setAdminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [keyInput, setKeyInput] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authErr, setAuthErr] = useState(false)

  function load(k) {
    if (!k) return
    setLoading(true); setAuthErr(false)
    fetch(`${API_URL}/mrt/revenue-summary?key=${encodeURIComponent(k)}`)
      .then((r) => { if (r.status === 403) throw new Error('forbidden'); if (!r.ok) throw new Error('err'); return r.json() })
      .then((d) => { setData(d); try { localStorage.setItem(KEY_STORE, k) } catch {} })
      .catch((e) => {
        if (e.message === 'forbidden') { setAuthErr(true); setData(null); setAdminKey(''); try { localStorage.removeItem(KEY_STORE) } catch {} }
        else setAuthErr('load')
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load(adminKey) }, [])

  const wrap = { border: '1px solid #e6ecf0', borderRadius: 14, padding: 16, marginBottom: 14, background: '#fbfdfe' }

  // 키 미입력/인증 실패 → 키 입력 폼
  if (!data) {
    return (
      <div style={wrap}>
        <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: 'var(--text-2)' }}>제휴 수익 (관리자)</p>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--text-3)' }}>관리자 키를 입력하면 수익을 볼 수 있어요.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)}
            placeholder="관리자 키"
            onKeyDown={(e) => { if (e.key === 'Enter') { setAdminKey(keyInput); load(keyInput) } }}
            style={{ flex: 1, height: 38, borderRadius: 10, border: '1px solid #dbe3e8', padding: '0 12px', fontSize: 13, fontFamily: 'inherit' }}
          />
          <button onClick={() => { setAdminKey(keyInput); load(keyInput) }} disabled={loading || !keyInput}
            style={{ height: 38, padding: '0 14px', borderRadius: 10, border: 'none', background: PRIMARY, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {loading ? '확인 중…' : '확인'}
          </button>
        </div>
        {authErr === true && <p style={{ margin: '8px 0 0', fontSize: 11.5, color: '#d05050' }}>키가 올바르지 않아요.</p>}
        {authErr === 'load' && <p style={{ margin: '8px 0 0', fontSize: 11.5, color: '#d05050' }}>불러오지 못했어요. 다시 시도해주세요.</p>}
      </div>
    )
  }

  const places = Object.entries(data.by_placement || {})
  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)' }}>제휴 수익 (관리자)</span>
        <button onClick={() => load(adminKey)} style={{ background: 'none', border: '1px solid #d8e7f0', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: PRIMARY, cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>

      <div style={{ background: 'linear-gradient(135deg,#eef7fc,#e2f0fa)', borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-2)' }}>총 수수료</p>
        <p style={{ margin: '2px 0 0', fontSize: 26, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '-0.5px' }}>{won(data.total_commission)}</p>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--text-2)' }}>예약 {data.total_reservations}건 · 판매액 {won(data.total_sales)}</p>
      </div>

      <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)' }}>배치별</p>
      {places.length === 0 ? (
        <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '0 0 12px' }}>아직 데이터가 없어요. 예약이 생기면 채워집니다.</p>
      ) : (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {places.map(([k, v]) => (
            <div key={k} style={{ flex: '1 1 45%', minWidth: 120, border: '1px solid var(--bd)', borderRadius: 10, padding: '10px 12px', background: 'var(--surface)' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#4b5563' }}>{PLACE_LABEL[k] || k}</p>
              <p style={{ margin: '3px 0 0', fontSize: 16, fontWeight: 700, color: PRIMARY }}>{won(v.commission)}</p>
              <p style={{ margin: '1px 0 0', fontSize: 10.5, color: 'var(--text-3)' }}>예약 {v.reservations}건</p>
            </div>
          ))}
        </div>
      )}

      {data.top_products?.length > 0 && (
        <>
          <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)' }}>상품별 TOP</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {data.top_products.slice(0, 8).map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 11.5, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: PRIMARY, flexShrink: 0 }}>{won(p.commission)} · {p.reservations}건</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
