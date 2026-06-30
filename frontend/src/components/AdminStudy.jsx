import { useState, useEffect } from 'react'
import { STUDY_DATA } from '../data/studyData'
import { STUDY_CATALOG } from '../data/studyCatalog'

/* 관리자 전용 — 쉐도잉 행동 분석(해자): 어디서 막히고 무엇을 반복·저장하는가.
 * 문장 인덱스를 번들된 학습데이터로 실제 문장(일/한)으로 해석해 보여준다. */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'
const KEY_STORE = 'tickjapan_admin_key'

const titleOf = id => { const v = STUDY_CATALOG.find(x => x.id === id); return v ? v.kr : id }
const lineOf = (id, i) => { const d = STUDY_DATA[id]; const ln = d && d.lines && d.lines[i]; return ln ? { jp: ln.jp, kr: ln.kr } : null }

function Card({ label, val }) {
  return (
    <div style={{ background: 'var(--surface)', borderRadius: 10, padding: '9px 11px' }}>
      <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)' }}>{val}</div>
    </div>
  )
}
function Section({ title, sub, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ margin: '0 0 2px', fontSize: 12.5, fontWeight: 700, color: 'var(--text-strong)' }}>{title}</p>
      {sub && <p style={{ margin: '0 0 8px', fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{sub}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>
    </div>
  )
}
function Row({ rank, score, unit, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--surface)', borderRadius: 9 }}>
      <span style={{ flexShrink: 0, width: 16, fontSize: 12, fontWeight: 800, color: 'var(--text-3)', textAlign: 'center' }}>{rank}</span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <span style={{ flexShrink: 0, fontSize: 12.5, fontWeight: 800, color: PRIMARY, whiteSpace: 'nowrap' }}>{score}<span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)' }}> {unit}</span></span>
    </div>
  )
}
function Empty() { return <p style={{ fontSize: 11.5, color: 'var(--text-3)', margin: 0 }}>아직 데이터가 없어요. 학습이 쌓이면 표시돼요.</p> }

export default function AdminStudy() {
  const [adminKey] = useState(() => { try { return localStorage.getItem(KEY_STORE) || '' } catch { return '' } })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  function load() {
    if (!adminKey) return
    setLoading(true); setErr('')
    fetch(`${API_URL}/admin/study-stats?key=${encodeURIComponent(adminKey)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setData).catch(() => setErr('불러오지 못했어요.')).finally(() => setLoading(false))
  }
  useEffect(() => { if (adminKey) load() }, [])

  if (!adminKey) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>위 ‘제휴 수익’에서 관리자 키를 먼저 입력하면 함께 열려요.</p>
  if (!data) return <p style={{ fontSize: 12, color: 'var(--text-3)', margin: 0 }}>{loading ? '불러오는 중…' : (err || '데이터 없음')}</p>

  const o = data.overview || {}
  return (
    <div style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 14, background: 'var(--surface-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>한국 학습자 난이도 데이터 · 이벤트 <b style={{ color: 'var(--text-strong)' }}>{o.events ?? 0}</b></span>
        <button onClick={load} style={{ fontSize: 11.5, color: PRIMARY, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>새로고침</button>
      </div>
      {err && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--danger)' }}>{err}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(86px, 1fr))', gap: 8, marginBottom: 16 }}>
        <Card label="학습자" val={o.learners ?? 0} />
        <Card label="학습 세션" val={o.sessions ?? 0} />
        <Card label="완료율" val={(o.completion_rate ?? 0) + '%'} />
        <Card label="반복" val={o.loops ?? 0} />
        <Card label="다시" val={o.replays ?? 0} />
        <Card label="문장 분해" val={o.breakdowns ?? 0} />
        <Card label="저장 단어" val={o.saved_words ?? 0} />
        <Card label="저장 문장" val={o.saved_lines ?? 0} />
      </div>

      <Section title="가장 어려워한 문장 TOP" sub="반복·다시·문장분해가 몰린 문장 = 한국 학습자가 막히는 지점(자사 난이도 데이터)">
        {(data.hard_lines || []).slice(0, 12).map((h, i) => {
          const ln = lineOf(h.video_id, h.line_idx)
          return (
            <Row key={i} rank={i + 1} score={h.score} unit="막힘">
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ln ? ln.jp : `${h.video_id} #${h.line_idx}`}</div>
              {ln && <div style={{ fontSize: 11, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ln.kr} · {titleOf(h.video_id)}</div>}
            </Row>
          )
        })}
        {(!data.hard_lines || !data.hard_lines.length) && <Empty />}
      </Section>

      <Section title="영상 랭킹" sub="학습 세션·완료율·참여(반복+다시+분해)">
        {(data.top_videos || []).slice(0, 10).map((v, i) => (
          <Row key={i} rank={i + 1} score={v.sessions} unit="세션">
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{titleOf(v.video_id)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>완료율 {v.completion_rate}% · 참여 {v.engage}</div>
          </Row>
        ))}
        {(!data.top_videos || !data.top_videos.length) && <Empty />}
      </Section>

      <Section title="가장 많이 저장한 단어">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {(data.top_words || []).slice(0, 24).map((w, i) => (
            <span key={i} style={{ fontSize: 12, color: 'var(--text-1)', background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 8, padding: '4px 9px' }}>{w.word} <b style={{ color: PRIMARY }}>{w.n}</b></span>
          ))}
          {(!data.top_words || !data.top_words.length) && <Empty />}
        </div>
      </Section>
    </div>
  )
}
