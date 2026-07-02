/* 쇼츠 100 제작 체크리스트 — 관리자(is_admin) 전용, /lab/shorts100 (noindex·비링크).
 * "일본 사업가들이 밥 먹듯이 쓰는 표현" 쇼츠 100편 제작 관리:
 * 완료 체크(localStorage) + 항목별 장면 수(쉐도잉 DB 실시간) + [장면] 버튼으로
 * 표현 학습(/lab/expression)에 바로 진입해 클립 위치(영상·타임스탬프)를 찾는다. */
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useUser } from '../context/UserContext'
import { SHORTS100 } from '../data/shorts100'
import { STUDY_DATA } from '../data/studyData'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'
import { sceneCount, stripSp } from '../utils/expressions'

const PRIMARY = '#5CA9CE'
const GREEN = '#1D9E75'
const LS_KEY = 'tickjapan_shorts100_done'
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] } }

export default function Shorts100() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [done, setDone] = useState(() => new Set(load()))
  const [filter, setFilter] = useState('all')   // all | todo | done

  // 항목별 장면 수 — 시그니처는 sceneCount, 나머지는 원문 부분일치(1자 한자도 허용)
  const counts = useMemo(() => {
    const lines = []
    for (const v of Object.values(STUDY_DATA)) for (const ln of (v.lines || [])) lines.push(stripSp(ln.jp))
    const m = new Map()
    for (const it of SHORTS100) {
      if (it.p) { m.set(it.no, sceneCount(it.p)); continue }
      let c = 0
      for (const jp of lines) if (jp.includes(it.q)) c++
      m.set(it.no, c)
    }
    return m
  }, [])

  if (!user?.is_admin) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-3)' }}>
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        관리자 전용 페이지예요.
      </div>
    )
  }

  const toggle = (no) => setDone((prev) => {
    const next = new Set(prev)
    next.has(no) ? next.delete(no) : next.add(no)
    try { localStorage.setItem(LS_KEY, JSON.stringify([...next])) } catch {}
    return next
  })
  const goScenes = (it) => navigate(it.p ? `/lab/expression?p=${it.p}` : `/lab/expression?q=${encodeURIComponent(it.q)}`)

  const cats = [...new Set(SHORTS100.map((i) => i.cat))]
  const visible = (it) => filter === 'all' || (filter === 'done' ? done.has(it.no) : !done.has(it.no))
  const doneCount = done.size
  const chip = (on) => ({ fontSize: 12.5, fontWeight: 700, padding: '7px 14px', borderRadius: 999, border: `1px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? `${PRIMARY}1a` : 'var(--surface)', color: on ? PRIMARY : 'var(--text-3)', cursor: 'pointer', fontFamily: 'inherit' })

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '18px 16px 40px', color: 'var(--text-1)' }}>
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>쇼츠 100 체크리스트 | 틱재팬</title></Helmet>

      <h1 style={{ fontSize: 21, fontWeight: 800, color: 'var(--text-strong)', margin: '0 0 4px' }}>쇼츠 100 체크리스트</h1>
      <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px' }}>일본 사업가들이 밥 먹듯이 쓰는 표현 — [장면]을 누르면 클립 위치를 바로 찾을 수 있어요.</p>

      {/* 진행 현황 */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-strong)' }}>{doneCount} / 100 완료</span>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{Math.round(doneCount)}%</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: 'var(--surface-2)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${doneCount}%`, background: GREEN, borderRadius: 4, transition: 'width .2s' }} />
        </div>
      </div>

      {/* 필터 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <button onClick={() => setFilter('all')} style={chip(filter === 'all')}>전체</button>
        <button onClick={() => setFilter('todo')} style={chip(filter === 'todo')}>미완료 {100 - doneCount}</button>
        <button onClick={() => setFilter('done')} style={chip(filter === 'done')}>완료 {doneCount}</button>
      </div>

      {/* 카테고리별 목록 */}
      {cats.map((cat) => {
        const items = SHORTS100.filter((i) => i.cat === cat && visible(i))
        if (!items.length) return null
        return (
          <div key={cat} style={{ marginBottom: 18 }}>
            <p style={{ margin: '0 2px 8px', fontSize: 13, fontWeight: 800, color: 'var(--text-2)' }}>{cat}</p>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, overflow: 'hidden' }}>
              {items.map((it, i) => {
                const isDone = done.has(it.no)
                const n = counts.get(it.no) || 0
                return (
                  <div key={it.no} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--bd)', opacity: isDone ? 0.55 : 1 }}>
                    {/* 체크 */}
                    <button onClick={() => toggle(it.no)} aria-label="완료 체크"
                      style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 8, border: `2px solid ${isDone ? GREEN : 'var(--bd-2)'}`, background: isDone ? GREEN : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      {isDone && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                    </button>
                    {/* 번호 + 표현 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif", textDecoration: isDone ? 'line-through' : 'none' }}>
                        <span style={{ fontSize: 11, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums', marginRight: 7, fontFamily: 'inherit' }}>{it.no}</span>
                        {it.jp}
                        <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-2)', marginLeft: 8 }}>{it.kr}</span>
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.why}</p>
                    </div>
                    {/* 장면 수 + 이동 */}
                    <button onClick={() => goScenes(it)}
                      style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, padding: '6px 11px', borderRadius: 10, border: `1px solid ${PRIMARY}55`, background: `${PRIMARY}0d`, color: PRIMARY, cursor: 'pointer', fontFamily: 'inherit' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 800 }}>장면</span>
                      <span style={{ fontSize: 10.5, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
