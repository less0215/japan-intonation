import { useState, useEffect } from 'react'

/* 관리자 전용 — 발음 연습(베타) 통계
 * - 시도수·평균점수·👍/👎·아쉬운 이유 분포·아쉬운 피드백 많은 단어
 * - AdminRevenue와 동일 관리자 키 공유(localStorage) → 재입력 불필요 */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'

const REASON_LABEL = {
  false_negative: '정답대로 말했는데 틀렸대요',
  not_heard: '내 발음을 잘 못 알아들어요',
  too_harsh: '점수가 너무 짜요',
  bad_coach: '설명이 안 맞아요',
}

export default function AdminPronunciation() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

  function load() {
    if (!adminKey) return
    setLoading(true); setErr(false)
    fetch(`${API_URL}/admin/pronunciation-stats?key=${encodeURIComponent(adminKey)}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then(setData).catch(() => setErr(true)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const wrap = { border: '1px solid var(--bd)', borderRadius: 14, padding: 16, marginBottom: 14, background: 'var(--surface)' }
  if (!adminKey) return null

  const fb = data?.feedback || {}
  const reasons = data?.down_reasons || {}
  const hardest = data?.hardest || []

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-2)' }}>🎤 발음 연습 통계</p>
        <button onClick={load} disabled={loading} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{loading ? '불러오는 중…' : '새로고침'}</button>
      </div>
      {err && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--danger)' }}>불러오지 못했어요.</p>}

      {/* 핵심 지표 — 토스식 큰 숫자 */}
      <div style={{ display: 'flex', gap: 8, margin: '10px 0 14px' }}>
        {[
          { label: '시도', value: (data?.total_attempts || 0).toLocaleString() },
          { label: '평균 점수', value: data?.avg_score ?? '—' },
          { label: '👍', value: fb.up || 0 },
          { label: '👎', value: fb.down || 0 },
        ].map((m, i) => (
          <div key={i} style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-strong)' }}>{m.value}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* 아쉬운 이유 분포 */}
      {Object.keys(reasons).length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)' }}>아쉬운 이유</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {Object.entries(reasons).sort((a, b) => b[1] - a[1]).map(([r, n]) => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{REASON_LABEL[r] || r}</span>
                <span style={{ fontWeight: 700, color: PRIMARY }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 아쉬운 피드백 많은 단어 = 알고리즘 개선 우선순위 */}
      {hardest.length > 0 && (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)' }}>개선 우선 단어 (👎 많은 순)</p>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {hardest.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: 'var(--surface-2)', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.japanese}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)', flexShrink: 0 }}>👎 {h.down_count}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {!loading && (data?.total_attempts || 0) === 0 && (
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-3)' }}>아직 발음 연습 데이터가 없어요.</p>
      )}
    </div>
  )
}
