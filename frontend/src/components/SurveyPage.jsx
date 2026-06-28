import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

/* 사용자 설문 — 토스식 동적 진행(프로그래스바 + 문항 순차 노출).
 * 제출 시 보상 플러스 7일(1인 1회, 로그인 필수). 기존 구독자는 7일 연장. */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

const QUESTIONS = [
  { id: 'purpose', q: '틱재팬을 쓰는 가장 주된 목적은?', type: 'single', otherOpt: '기타',
    options: ['시험·자격 (JLPT 등)', '취업·업무·비즈니스', '유학·워홀·이민 등 일본 체류', '여행', '연인·친구·가족과 소통', '덕질·취미·자기계발', '기타'] },
  { id: 'level', q: '현재 일본어 수준은?', type: 'single',
    options: ['입문', '기초 (N5~N4)', '일상회화 (N3)', '상급 (N2 이상)'] },
  { id: 'frequency', q: '최근 1주일간 며칠 쓰셨나요?', type: 'single',
    options: ['거의 매일 (5~7일)', '주 3~4일', '주 1~2일', '이번 주는 안 씀'] },
  { id: 'pmf', q: '내일부터 틱재팬을 못 쓰게 된다면?', type: 'single',
    options: ['매우 아쉽다', '조금 아쉽다', '별로 아쉽지 않다'] },
  { id: 'value', q: '가장 가치 있다고 느끼는(돈 낼 만한) 기능은?', sub: '최대 2개', type: 'multi', max: 2, otherOpt: '그 외',
    options: ['선택 번역 (자연스럽게·비즈니스 등)', '억양 그래프', '사진 번역', '문장 분해', '그 외'] },
  { id: 'spend', q: '매달 일본어 학습·번역에 따로 쓰는 돈은?', sub: '구독·강의·교재·앱 합산', type: 'single',
    options: ['0원', '1만 원 미만', '1~3만 원', '3~5만 원', '5만 원 이상'] },
  { id: 'nps', q: '친구·지인에게 추천할 가능성은?', sub: '0 = 전혀 없음 · 10 = 매우 높음', type: 'nps' },
  { id: 'channel', q: '틱재팬을 처음 어떻게 알게 되셨나요?', type: 'single', otherOpt: '기타',
    options: ['SNS', '추천', '검색', '커뮤니티', '기타'] },
]
const REQUIRED = QUESTIONS.filter(q => !q.optional).map(q => q.id)
const filled = (v) => Array.isArray(v) ? v.length > 0 : (v !== undefined && v !== '')

export default function SurveyPage({ onLogin, onSubRefresh }) {
  const navigate = useNavigate()
  const { user } = useUser()
  const [ans, setAns] = useState({})
  const [other, setOther] = useState({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)   // 'new' | 'extended' | 'already'
  const [err, setErr] = useState('')
  const endRef = useRef(null)

  const total = QUESTIONS.length
  const answeredReq = REQUIRED.filter(id => filled(ans[id])).length
  const allRequired = answeredReq === REQUIRED.length
  // '기타/그 외'를 골랐다면 직접입력 텍스트도 채워야 완료(빈 응답 방지)
  const otherComplete = QUESTIONS.every(q => {
    if (!q.otherOpt) return true
    const v = ans[q.id]
    const chose = Array.isArray(v) ? v.includes(q.otherOpt) : v === q.otherOpt
    return !chose || !!other[q.id]?.trim()
  })
  const canSubmit = allRequired && otherComplete
  const progress = Math.round((answeredReq / REQUIRED.length) * 100)

  // 노출 문항 수 = 위에서부터 '연속으로' 답한 문항 + 1 → 한 번에 하나씩만 등장/제거
  const revealed = useMemo(() => {
    let r = 1
    for (let i = 0; i < total; i++) { if (filled(ans[QUESTIONS[i].id])) r = i + 2; else break }
    return Math.min(r, total)
  }, [ans, total])

  // 새 문항이 나타날 때만 부드럽게 스크롤
  const prevRevealed = useRef(1)
  useEffect(() => {
    if (revealed > prevRevealed.current) setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 90)
    prevRevealed.current = revealed
  }, [revealed])

  // idx 이후 문항들의 답변 제거(해제 시 뒤따라 생겼던 문항도 다시 사라지게)
  function clearFrom(obj, idx) {
    for (let i = idx + 1; i < total; i++) { delete obj[QUESTIONS[i].id] }
  }
  function pickSingle(q, idx, opt) {           // 같은 보기 재클릭 = 해제
    setAns(a => {
      const next = { ...a }
      if (a[q.id] === opt) { delete next[q.id]; clearFrom(next, idx) }
      else next[q.id] = opt
      return next
    })
  }
  function pickMulti(q, idx, opt) {
    setAns(a => {
      const cur = a[q.id] || []
      let arr
      if (cur.includes(opt)) arr = cur.filter(x => x !== opt)
      else if (cur.length >= q.max) return a
      else arr = [...cur, opt]
      const next = { ...a, [q.id]: arr }
      if (arr.length === 0) { delete next[q.id]; clearFrom(next, idx) }   // 전부 해제 시 이후 문항도 사라지게
      return next
    })
  }

  async function submit() {
    if (sending || !allRequired) return
    if (!otherComplete) { setErr('‘기타’를 선택하셨다면 내용을 입력해 주세요.'); return }
    if (!user?.user_id) { onLogin?.(); return }
    setSending(true); setErr('')
    const payload = { ...ans }
    for (const q of QUESTIONS) {                       // 기타 직접입력 병합
      if (!q.otherOpt) continue
      const v = ans[q.id]
      const chose = Array.isArray(v) ? v.includes(q.otherOpt) : v === q.otherOpt
      if (chose && other[q.id]?.trim()) payload[q.id + '_other'] = other[q.id].trim()
    }
    try {
      const res = await fetch(`${API_URL}/survey/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id, answers: payload }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok && d.ok) { setResult(d.granted || 'new'); onSubRefresh?.(); try { localStorage.setItem('tickjapan_survey_done', '1') } catch {} }
      else if (res.status === 409) { setResult('already'); try { localStorage.setItem('tickjapan_survey_done', '1') } catch {} }
      else { setErr(d.detail || '제출에 실패했어요. 잠시 후 다시 시도해 주세요.'); setSending(false) }
    } catch { setErr('네트워크 오류예요. 잠시 후 다시 시도해 주세요.'); setSending(false) }
  }

  if (result) {
    const msg = result === 'extended' ? '플러스가 7일 연장됐어요!'
      : result === 'already' ? '이미 참여하셨어요. 감사합니다!'
      : '플러스 7일 이용권이 적용됐어요!'
    return (
      <>
        <PageSEO title="설문 완료 - 틱재팬" description="설문 참여 감사합니다" path="/survey" />
        <div style={{ textAlign: 'center', padding: '64px 20px' }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>{result === 'already' ? '🙏' : '🎉'}</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 8px' }}>{msg}</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: '0 0 24px' }}>
            소중한 의견 감사해요.<br />틱재팬을 더 좋게 만드는 데 쓸게요.
          </p>
          <button onClick={() => navigate('/')} style={{ height: 48, padding: '0 28px', borderRadius: 13, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            홈으로
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageSEO title="틱재팬을 도와주세요 - 사용자 설문" description="틱재팬을 어떻게 쓰시는지 알려주시면 플러스 7일 이용권을 즉시 드려요" path="/survey" />

      {/* 진행 프로그래스바(상단 고정) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5, padding: '8px 0 10px', background: 'var(--bg)' }}>
        <div style={{ height: 6, borderRadius: 99, background: 'var(--bd)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: PRIMARY, borderRadius: 99, transition: 'width 0.35s ease' }} />
        </div>
        <p style={{ margin: '6px 2px 0', fontSize: 11, color: 'var(--text-3)', textAlign: 'right' }}>{answeredReq} / {REQUIRED.length}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 30 }}>
        <div>
          <h2 style={{ fontSize: 21, fontWeight: 800, margin: '2px 2px 6px', color: 'var(--text-strong)' }}>틱재팬을 도와주세요! 🙏</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '0 2px', lineHeight: 1.6 }}>
            틱재팬을 어떻게 쓰시는지 알려주시면 <b style={{ color: PRIMARY }}>플러스 7일 이용권</b>을 즉시 적용해 드릴게요!
          </p>
        </div>

        {QUESTIONS.slice(0, revealed).map((Q, i) => {
          const v = ans[Q.id]
          const showOther = Q.otherOpt && (Array.isArray(v) ? v.includes(Q.otherOpt) : v === Q.otherOpt)
          return (
            <div key={Q.id} style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 14, background: 'var(--surface)', animation: 'fadeUp 0.3s ease' }}>
              <p style={{ margin: '0 0 2px', fontSize: 14.5, fontWeight: 700, color: 'var(--text-strong)' }}>
                <span style={{ color: PRIMARY }}>Q{i + 1}.</span> {Q.q}
                {!Q.optional && <span style={{ color: 'var(--danger)', marginLeft: 4 }}>*</span>}
              </p>
              {Q.sub ? <p style={{ margin: '0 0 10px', fontSize: 11.5, color: 'var(--text-3)' }}>{Q.sub}</p> : <div style={{ height: 8 }} />}

              {Q.type === 'nps' ? (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {Array.from({ length: 11 }, (_, n) => {
                    const on = v === n
                    return (
                      <button key={n} onClick={() => pickSingle(Q, i, n)}
                        style={{ width: 32, height: 38, borderRadius: 8, border: `1.5px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? PRIMARY : 'var(--surface)', color: on ? 'var(--on-primary)' : 'var(--text-2)', fontSize: 13, fontWeight: on ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                        {n}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {Q.options.map(opt => {
                    const on = Q.type === 'multi' ? (v || []).includes(opt) : v === opt
                    const onClick = Q.type === 'multi' ? () => pickMulti(Q, i, opt) : () => pickSingle(Q, i, opt)
                    return (
                      <button key={opt} onClick={onClick}
                        style={{ display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left', padding: '11px 13px', borderRadius: 10, border: `1.5px solid ${on ? PRIMARY : 'var(--bd)'}`, background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--primary-strong)' : 'var(--text-1)', fontSize: 13.5, fontWeight: on ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
                        <span style={{ width: 18, height: 18, flexShrink: 0, borderRadius: Q.type === 'multi' ? 5 : '50%', border: `1.5px solid ${on ? PRIMARY : 'var(--text-3)'}`, background: on ? PRIMARY : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {on && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                        </span>
                        {opt}
                      </button>
                    )
                  })}
                  {showOther && (
                    <input
                      value={other[Q.id] || ''}
                      onChange={e => setOther(o => ({ ...o, [Q.id]: e.target.value }))}
                      placeholder="직접 입력해 주세요"
                      maxLength={60}
                      style={{ marginTop: 2, height: 42, borderRadius: 10, border: `1.5px solid ${PRIMARY}`, background: 'var(--surface)', color: 'var(--text-strong)', fontSize: 13.5, padding: '0 13px', fontFamily: 'inherit' }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* 제출 — 모든 필수 응답 후 노출 */}
        {allRequired && (
          <div style={{ animation: 'fadeUp 0.3s ease' }}>
            {!user?.user_id && (
              <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>
                플러스 7일은 로그인 후 적용돼요.
              </p>
            )}
            {!otherComplete && <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>‘기타’를 선택하셨다면 내용을 입력해 주세요.</p>}
            {err && <p style={{ margin: '0 0 8px', fontSize: 12.5, color: 'var(--danger)', textAlign: 'center', fontWeight: 500 }}>{err}</p>}
            <button onClick={submit} disabled={sending || !otherComplete}
              style={{ width: '100%', height: 52, borderRadius: 14, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 15.5, fontWeight: 700, cursor: (sending || !otherComplete) ? 'default' : 'pointer', fontFamily: 'inherit', opacity: (sending || !otherComplete) ? 0.6 : 1 }}>
              {sending ? '적용 중…' : user?.user_id ? '제출하고 플러스 7일 받기' : '로그인하고 7일 받기'}
            </button>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </>
  )
}
