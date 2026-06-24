import { useState, useEffect } from 'react'

/* 관리자 전용 — 집단 지성 대시보드
 * - is_admin 계정에서만 노출(ProfilePage). 데이터는 관리자 키로만 로드.
 * - 키는 AdminRevenue와 동일한 localStorage(tickjapan_admin_key)를 공유 → 재입력 불필요.
 * - "한국인이 일본어에서 무엇을 자주 헷갈리나"를 단어/문법/의도 단위로 랭킹 표시. */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'

// 이벤트 종류 → 사람이 읽는 라벨/아이콘
const TYPES = [
  { key: '',                 label: '전체',     icon: '✦' },
  { key: 'tts_replay',       label: '발음 재생', icon: '🔊' },
  { key: 'pitch_expand',     label: '악센트',   icon: '📈' },
  { key: 'nuance_choice',    label: '뜻 선택',  icon: '💡' },
  { key: 'breakdown_expand', label: '문장분해', icon: '🔎' },
  { key: 'pattern_expand',   label: '문법',     icon: '📖' },
  { key: 'pitch_feedback',   label: '발음피드백', icon: '🎤' },
]
const TYPE_LABEL = {
  tts_replay: '🔊 자주 다시 듣는 발음',
  pitch_expand: '📈 자주 확인하는 악센트',
  nuance_choice: '💡 자주 고른 의미',
  breakdown_expand: '🔎 자주 분해한 문장',
  pattern_expand: '📖 자주 펼친 문법',
  pitch_feedback: '🎤 발음 연습 피드백',
}

export default function AdminLearning() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)
  const [type, setType] = useState('')

  function load(t = type) {
    if (!adminKey) return
    setLoading(true); setErr(false)
    fetch(`${API_URL}/admin/learning-summary?key=${encodeURIComponent(adminKey)}${t ? `&event_type=${t}` : ''}&limit=40`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((d) => setData(d))
      .catch(() => setErr(true))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load('') }, [])   // 최초 1회

  const wrap = { border: '1px solid var(--bd)', borderRadius: 14, padding: 16, marginBottom: 14, background: 'var(--surface)' }

  // 관리자 키 미설정(수익 대시보드에서 먼저 입력해야 함)
  if (!adminKey) {
    return (
      <div style={wrap}>
        <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: 'var(--text-2)' }}>집단 지성 (관리자)</p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 여기도 함께 열려요.</p>
      </div>
    )
  }

  const byType = data?.by_type || {}
  const top = data?.top || []

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-2)' }}>집단 지성 (관리자)</p>
        <button onClick={() => load()} disabled={loading} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>{loading ? '불러오는 중…' : '새로고침'}</button>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 11.5, color: 'var(--text-3)', lineHeight: 1.5 }}>
        한국인이 일본어에서 무엇을 자주 막히는지 — 누적 <b style={{ color: 'var(--text-2)' }}>{(data?.total_events || 0).toLocaleString()}</b>건
      </p>

      {err && <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--danger)' }}>불러오지 못했어요. 새로고침을 눌러보세요.</p>}

      {/* 종류별 요약 칩 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {TYPES.filter(t => t.key).map(t => (
          <span key={t.key} style={{ fontSize: 11, color: 'var(--text-2)', background: 'var(--surface-2)', borderRadius: 8, padding: '4px 9px' }}>
            {t.icon} {t.label} <b style={{ color: PRIMARY }}>{(byType[t.key] || 0).toLocaleString()}</b>
          </span>
        ))}
      </div>

      {/* 종류 필터 탭 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
        {TYPES.map(t => {
          const on = type === t.key
          return (
            <button key={t.key || 'all'} onClick={() => { setType(t.key); load(t.key) }} style={{
              fontSize: 11.5, fontWeight: on ? 600 : 500, padding: '5px 10px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'transparent', color: on ? '#fff' : 'var(--text-3)',
            }}>{t.icon} {t.label}</button>
          )
        })}
      </div>

      {/* 랭킹 */}
      {top.length === 0 && !loading ? (
        <p style={{ margin: '6px 0', fontSize: 12.5, color: 'var(--text-3)' }}>아직 쌓인 데이터가 없어요. 사용자가 발음 듣기·뜻 고르기·문법 펼치기를 하면 여기 모입니다.</p>
      ) : (
        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {top.map((r, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface-2)', borderRadius: 9 }}>
              <span style={{ flexShrink: 0, width: 20, textAlign: 'right', fontSize: 12, fontWeight: 700, color: i < 3 ? PRIMARY : 'var(--text-3)' }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.key}</div>
                {!type && <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{TYPE_LABEL[r.event_type] || r.event_type}</div>}
              </div>
              <span style={{ flexShrink: 0, fontSize: 12.5, fontWeight: 700, color: PRIMARY }}>{r.count.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
