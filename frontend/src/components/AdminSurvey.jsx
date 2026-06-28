import { useState, useEffect } from 'react'

/* 관리자 전용 — 설문 결과 집계 (제목은 AdminSection이 제공) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'
const QLABEL = { purpose: '주 사용 목적', level: '일본어 수준', frequency: '주간 사용일', pmf: '없으면 아쉬움(PMF)', spend: '월 학습 지출', channel: '유입 경로' }
const QORDER = ['purpose', 'level', 'frequency', 'pmf', 'spend', 'channel']

export default function AdminSurvey() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

  function load() {
    if (!adminKey) return
    setLoading(true); setErr(false)
    fetch(`${API_URL}/admin/survey-results?key=${encodeURIComponent(adminKey)}`)
      .then(r => r.ok ? r.json() : Promise.reject()).then(setData).catch(() => setErr(true)).finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load() }, [])

  if (!adminKey) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 함께 열려요.</p>
  if (!data) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{loading ? '불러오는 중…' : (err ? '불러오지 못했어요.' : '데이터 없음')}</p>

  const bars = (entries) => {
    const sum = entries.reduce((a, [, n]) => a + n, 0) || 1
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {entries.map(([label, n]) => {
          const pct = Math.round(n / sum * 100)
          return (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-2)', marginBottom: 2 }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>{label}</span>
                <span style={{ flexShrink: 0, color: 'var(--text-3)' }}>{n} · {pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: 'var(--surface-2)' }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: PRIMARY }} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  const Block = ({ title, entries }) => (!entries || !entries.length) ? null : (
    <div style={{ marginBottom: 14 }}>
      <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{title}</p>
      {bars(entries)}
    </div>
  )

  const n = data.nps
  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 16, background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>유효 응답 <b style={{ color: 'var(--text-strong)', fontSize: 15 }}>{(data.valid ?? data.total ?? 0).toLocaleString()}</b>건{data.empty ? ` · 빈 응답 ${data.empty}건 제외` : ''}</span>
        <button onClick={load} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>

      {n && (
        <div style={{ background: 'var(--primary-tint)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
          <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-2)' }}>NPS (추천 의향)</p>
          <p style={{ margin: '2px 0 0', fontSize: 24, fontWeight: 800, color: 'var(--text-strong)' }}>{n.score}<span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginLeft: 4 }}>점</span></p>
          <p style={{ margin: '3px 0 0', fontSize: 11, color: 'var(--text-3)' }}>평균 {n.avg} · 추천 {n.promoters} / 중립 {n.passives} / 비추 {n.detractors} (n={n.count})</p>
        </div>
      )}

      <Block title="가장 가치 있는 기능 (복수)" entries={data.value} />
      {QORDER.map(k => <Block key={k} title={QLABEL[k]} entries={data.questions?.[k]} />)}
    </div>
  )
}
