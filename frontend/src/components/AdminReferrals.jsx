import { useState, useEffect } from 'react'

/* 관리자 전용 — 추천 코드별 사용 집계 + 최근 내역 (제목은 AdminSection이 제공) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'

export default function AdminReferrals() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

  function load() {
    if (!adminKey) return
    setLoading(true); setErr(false)
    fetch(`${API_URL}/admin/referrals?key=${encodeURIComponent(adminKey)}`)
      .then(r => r.ok ? r.json() : Promise.reject()).then(setData).catch(() => setErr(true)).finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load() }, [])

  if (!adminKey) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 함께 열려요.</p>
  if (!data) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{loading ? '불러오는 중…' : (err ? '불러오지 못했어요.' : '데이터 없음')}</p>

  const fmt = (iso) => { try { return new Date(iso).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) } catch { return '' } }

  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 16, background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>총 추천 가입 <b style={{ color: 'var(--text-strong)', fontSize: 15 }}>{(data.total ?? 0).toLocaleString()}</b>건</span>
        <button onClick={load} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>

      {/* 코드별 집계 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {(data.codes || []).map(c => (
          <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, border: '1px solid var(--bd)', borderRadius: 10, padding: '10px 12px', background: 'var(--surface-2)' }}>
            <span style={{ minWidth: 0 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)', fontFamily: 'monospace' }}>{c.code}</span>
              <span style={{ fontSize: 11.5, color: 'var(--text-3)', marginLeft: 8 }}>{c.label}</span>
            </span>
            <span style={{ flexShrink: 0, fontSize: 15, fontWeight: 800, color: PRIMARY }}>{c.count}<span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginLeft: 2 }}>명</span></span>
          </div>
        ))}
      </div>

      {/* 최근 사용 내역 */}
      {(data.recent || []).length > 0 && (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>최근 사용 내역</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.recent.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', padding: '3px 2px' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                  <b style={{ color: 'var(--text-1)' }}>{r.name}</b>
                  <span style={{ color: 'var(--text-3)', fontFamily: 'monospace', marginLeft: 6 }}>{r.code}</span>
                </span>
                <span style={{ flexShrink: 0, color: 'var(--text-3)' }}>{fmt(r.redeemed_at)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
