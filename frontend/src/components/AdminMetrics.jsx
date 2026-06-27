import { useState, useEffect } from 'react'

/* 관리자 전용 — 구독·회원 핵심 지표 + 활성 구독 목록(테스트 정리용)
 * - is_admin 계정에서만 노출(UI), 데이터는 관리자 키 필요(AdminRevenue와 동일 키 공유) */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'
const KIND = {
  paying: { label: '플랜구독', c: '#1D9E75' },
  trial: { label: '설문체험', c: '#5CA9CE' },
  referral: { label: '추천', c: '#7F77DD' },
  review: { label: '리뷰·관리자', c: '#BA7517' },
  etc: { label: '기타', c: '#9aa3ad' },
}

export default function AdminMetrics() {
  const [adminKey, setAdminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [keyInput, setKeyInput] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authErr, setAuthErr] = useState(false)
  const [busyId, setBusyId] = useState(null)
  const [tab, setTab] = useState('all')   // 구독 목록 유형 필터

  function load(k) {
    if (!k) return
    setLoading(true); setAuthErr(false)
    fetch(`${API_URL}/admin/metrics?key=${encodeURIComponent(k)}`)
      .then((r) => { if (r.status === 403) throw new Error('forbidden'); if (!r.ok) throw new Error('err'); return r.json() })
      .then((d) => { setData(d); try { localStorage.setItem(KEY_STORE, k) } catch {} })
      .catch((e) => {
        if (e.message === 'forbidden') { setAuthErr(true); setData(null); setAdminKey(''); try { localStorage.removeItem(KEY_STORE) } catch {} }
        else setAuthErr('load')
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load(adminKey) }, [])

  async function cancelSub(s) {
    if (!window.confirm(`${s.name} 님의 ${s.plan.toUpperCase()} 구독을 취소할까요?\n(status=canceled, 활성 카운트에서 제외)`)) return
    setBusyId(s.id)
    try {
      const r = await fetch(`${API_URL}/admin/cancel-sub`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: adminKey, user_id: s.user_id }),
      })
      if (r.ok) load(adminKey)
    } finally { setBusyId(null) }
  }

  const wrap = { border: '1px solid var(--bd)', borderRadius: 14, padding: 16, marginBottom: 14, background: 'var(--surface)' }

  // 키 미입력/실패 → 입력 폼
  if (!data) {
    return (
      <div style={wrap}>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--text-3)' }}>관리자 키를 입력하면 지표가 표시됩니다.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder="관리자 키"
            onKeyDown={(e) => { if (e.key === 'Enter') { setAdminKey(keyInput); load(keyInput) } }}
            style={{ flex: 1, height: 38, borderRadius: 10, border: '1px solid var(--bd-2)', padding: '0 12px', fontSize: 13, fontFamily: 'inherit', background: 'var(--surface)', color: 'var(--text-1)' }}
          />
          <button onClick={() => { setAdminKey(keyInput); load(keyInput) }} disabled={loading || !keyInput}
            style={{ height: 38, padding: '0 14px', borderRadius: 10, border: 'none', background: PRIMARY, color: 'var(--on-primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {loading ? '확인 중…' : '확인'}
          </button>
        </div>
        {authErr === true && <p style={{ margin: '8px 0 0', fontSize: 11.5, color: 'var(--danger)' }}>키가 올바르지 않아요.</p>}
        {authErr === 'load' && <p style={{ margin: '8px 0 0', fontSize: 11.5, color: 'var(--danger)' }}>불러오지 못했어요. 다시 시도해주세요.</p>}
      </div>
    )
  }

  const sb = data.subscribers || {}, us = data.users || {}
  const subs = data.subs || []
  const fmt = (v) => (v === null || v === undefined ? '–' : v.toLocaleString())
  const stat = (label, value, sub) => (
    <div style={{ flex: '1 1 45%', minWidth: 130, background: 'var(--surface-2)', borderRadius: 12, padding: '12px 14px' }}>
      <p style={{ margin: 0, fontSize: 11.5, color: 'var(--text-3)' }}>{label}</p>
      <p style={{ margin: '3px 0 0', fontSize: 20, fontWeight: 700, color: 'var(--text-strong)' }}>{fmt(value)}</p>
      {sub && <p style={{ margin: '2px 0 0', fontSize: 10.5, color: 'var(--text-3)' }}>{sub}</p>}
    </div>
  )

  const reviewList = data.review_event || []
  const surveyList = data.survey_event || []
  const TABS = [
    { key: 'all', label: '전체', n: subs.length },
    { key: 'paying', label: '플랜구독', n: sb.paying || 0 },
    { key: 'referral', label: '추천', n: sb.referral || 0 },
    ...(sb.etc ? [{ key: 'etc', label: '기타', n: sb.etc }] : []),
    { key: 'review', label: '리뷰이벤트', n: sb.review || 0 },
    { key: 'survey', label: '설문참여', n: sb.survey || 0 },
  ]
  const activeTab = TABS.some(t => t.key === tab) ? tab : 'all'
  const filtered = activeTab === 'review' ? reviewList
    : activeTab === 'survey' ? surveyList
    : activeTab === 'all' ? subs
    : subs.filter((s) => s.kind === activeTab)

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button onClick={() => load(adminKey)} style={{ background: 'none', border: '1px solid var(--primary-tint-bd)', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: PRIMARY, cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>

      {/* 헤드라인 — 순수 구독자 */}
      <div style={{ background: 'var(--primary-tint)', borderRadius: 12, padding: '16px 18px', marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-2)' }}>플랜 구독 (능동) <span style={{ fontSize: 10.5, color: 'var(--text-3)' }}>· 플랜 페이지 결제·Apple 체험</span></p>
        <p style={{ margin: '2px 0 0', fontSize: 34, fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-1px', lineHeight: 1.1 }}>
          {fmt(sb.paying)}<span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-2)', marginLeft: 4 }}>명</span>
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-2)' }}>Plus {fmt(sb.paying_plus)} · Pro {fmt(sb.paying_pro)}</p>
      </div>

      {/* 스탯 그리드 */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {stat('설문 참여', sb.survey, `신규체험 ${fmt(sb.trial)}`)}
        {stat('추천', sb.referral)}
        {stat('리뷰이벤트', sb.review, `활성 ${fmt(sb.review_active)} · 만료 포함`)}
        {stat('총 회원', us.total)}
        {stat('오늘 가입', us.new_today)}
        {stat('최근 7일 가입', us.new_7d)}
      </div>

      {/* 활성 구독 목록 — 유형별 탭 + 테스트 정리용 */}
      <p style={{ margin: '0 0 8px', fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)' }}>
        {activeTab === 'review'
          ? <>리뷰이벤트 {reviewList.length}명 <span style={{ fontWeight: 400 }}>· 활성 {fmt(sb.review_active)} (만료 포함)</span></>
          : activeTab === 'survey'
          ? <>설문 참여자 {surveyList.length}명 <span style={{ fontWeight: 400 }}>· 기존 구독자 포함</span></>
          : <>활성 구독 {subs.length}건 <span style={{ fontWeight: 400 }}>· 취소하면 활성 카운트에서 빠집니다</span></>}
      </p>

      {/* 유형 탭 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
        {TABS.map((t) => {
          const on = activeTab === t.key
          return (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              fontSize: 11.5, fontWeight: on ? 700 : 500, padding: '5px 11px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'transparent', color: on ? '#fff' : 'var(--text-2)',
            }}>
              {t.label} <span style={{ color: on ? 'rgba(255,255,255,0.8)' : 'var(--text-3)' }}>{t.n}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>해당 유형의 구독이 없습니다.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((s) => {
            const isSurvey = s.status !== undefined          // 설문참여 코호트 행
            const isRev = !isSurvey && s.active !== undefined // 리뷰이벤트 코호트 행
            let tag, meta, cancellable
            if (isSurvey) {
              const c = s.status === '구독중' ? '#1D9E75' : s.status === '신규체험' ? '#5CA9CE' : s.status === '무제한' ? '#7F77DD' : '#9aa3ad'
              tag = { label: s.status, c }
              meta = `${s.expires_at ? '만료 ' + s.expires_at.slice(0, 10) : '무료'} · 응답 ${s.responded_at ? s.responded_at.slice(0, 10) : ''}`
              cancellable = false
            } else if (isRev) {
              tag = s.grant === '무제한'
                ? { label: '화이트리스트', c: '#7F77DD' }
                : { label: s.active ? '기간제·활성' : '만료', c: s.active ? '#1D9E75' : '#9aa3ad' }
              meta = s.grant === '무제한'
                ? `PLUS · 만료 ${s.expires_at ? s.expires_at.slice(0, 10) : ''} (화이트리스트)`
                : `${(s.plan || '').toUpperCase()} · 만료 ${s.expires_at ? s.expires_at.slice(0, 10) : '미정'}`
              cancellable = s.grant === '기간제' && s.active
            } else {
              tag = KIND[s.kind] || KIND.etc
              meta = `${(s.plan || '').toUpperCase()} · ${s.period === 'trial' ? '체험' : s.period === 'yearly' ? '연' : '월'} · 만료 ${s.expires_at ? s.expires_at.slice(0, 10) : '무기한'}`
              cancellable = true
            }
            return (
              <div key={(isSurvey ? 'q' : isRev ? 'r' : 's') + (s.id ?? s.user_id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1px solid var(--bd)', borderRadius: 10, background: 'var(--surface)' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: 'var(--text-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.name}{s.phone_tail ? <span style={{ color: 'var(--text-3)', fontWeight: 400 }}> ··{s.phone_tail}</span> : null}
                    <span style={{ marginLeft: 6, fontSize: 10, color: tag.c, border: `1px solid ${tag.c}55`, borderRadius: 5, padding: '1px 5px' }}>{tag.label}</span>
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 10.5, color: 'var(--text-3)' }}>{meta}</p>
                </div>
                {cancellable ? (
                  <button onClick={() => cancelSub(s)} disabled={busyId === s.id}
                    style={{ flexShrink: 0, height: 30, padding: '0 12px', borderRadius: 8, border: '1px solid var(--danger)', background: 'transparent', color: 'var(--danger)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {busyId === s.id ? '취소 중…' : '취소'}
                  </button>
                ) : isSurvey ? null : (
                  <span style={{ flexShrink: 0, fontSize: 11, color: 'var(--text-3)' }}>{isRev && s.grant === '무제한' ? '화이트리스트' : '만료됨'}</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
