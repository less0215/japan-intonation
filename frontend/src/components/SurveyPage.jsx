import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import PageSEO from './PageSEO'

/* 사용자 설문 — 사용 목적·수준·빈도·PMF·핵심기능·지출·NPS (+선택: 유입경로)
 * 응답은 /survey/submit 으로 적재(세그먼트 분석·IR용). 1~2분 모바일 친화. */
const API_URL = 'https://japan-intonation-production.up.railway.app'
const PRIMARY = '#5CA9CE'

const QUESTIONS = [
  { id: 'purpose', q: '틱재팬을 쓰는 가장 주된 목적은?', type: 'single',
    options: ['시험·자격 (JLPT 등)', '취업·업무·비즈니스', '유학·워홀·이민 등 일본 체류', '여행', '연인·친구·가족과 소통', '덕질·취미·자기계발', '기타'] },
  { id: 'level', q: '현재 일본어 수준은?', type: 'single',
    options: ['입문 (가나 떼는 중)', '기초 (N5~N4)', '일상회화 (N3)', '상급 (N2 이상)'] },
  { id: 'frequency', q: '최근 1주일간 며칠 쓰셨나요?', type: 'single',
    options: ['거의 매일 (5~7일)', '주 3~4일', '주 1~2일', '이번 주는 안 씀'] },
  { id: 'pmf', q: '내일부터 틱재팬을 못 쓰게 된다면?', type: 'single',
    options: ['매우 아쉽다', '조금 아쉽다', '별로 아쉽지 않다'] },
  { id: 'value', q: '가장 가치 있다고 느끼는(돈 낼 만한) 기능은?', sub: '최대 2개', type: 'multi', max: 2,
    options: ['선택 번역 (자연스럽게·비즈니스 등)', '억양 그래프', '사진 번역', '문장 분해', '그 외'] },
  { id: 'spend', q: '매달 일본어 학습·번역에 따로 쓰는 돈은?', sub: '구독·강의·교재·앱 합산', type: 'single',
    options: ['0원', '1만 원 미만', '1~3만 원', '3~5만 원', '5만 원 이상'] },
  { id: 'nps', q: '친구·지인에게 추천할 가능성은?', sub: '0 = 전혀 없음 · 10 = 매우 높음', type: 'nps' },
  { id: 'channel', q: '틱재팬을 처음 어떻게 알게 되셨나요?', sub: '선택', type: 'single', optional: true,
    options: ['SNS', '추천', '검색', '커뮤니티', '기타'] },
]
const REQUIRED = QUESTIONS.filter(q => !q.optional).map(q => q.id)

export default function SurveyPage() {
  const navigate = useNavigate()
  const { user } = useUser()
  const [ans, setAns] = useState({})
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  function pickSingle(qid, v) { setAns(a => ({ ...a, [qid]: v })) }
  function pickMulti(qid, v, max) {
    setAns(a => {
      const cur = a[qid] || []
      if (cur.includes(v)) return { ...a, [qid]: cur.filter(x => x !== v) }
      if (cur.length >= max) return a
      return { ...a, [qid]: [...cur, v] }
    })
  }
  const answeredCount = REQUIRED.filter(id => {
    const v = ans[id]; return Array.isArray(v) ? v.length > 0 : v !== undefined
  }).length
  const allRequired = answeredCount === REQUIRED.length

  async function submit() {
    if (!allRequired || sending) return
    setSending(true)
    let anon = null
    try { anon = localStorage.getItem('tickjapan_anon_id') } catch {}
    try {
      await fetch(`${API_URL}/survey/submit`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.user_id ?? null, anonymous_id: anon, answers: ans }),
      })
    } catch {}
    try { localStorage.setItem('tickjapan_survey_done', '1') } catch {}
    setDone(true)
  }

  if (done) {
    return (
      <>
        <PageSEO title="설문 완료 - 틱재팬" description="설문 참여 감사합니다" path="/survey" />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🙏</div>
          <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-strong)', margin: '0 0 8px' }}>응답 감사합니다!</h2>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, margin: '0 0 22px' }}>
            보내주신 의견은 틱재팬을 더 좋게 만드는 데<br />소중히 쓰일게요.
          </p>
          <button onClick={() => navigate('/')} style={{ height: 46, padding: '0 26px', borderRadius: 12, background: PRIMARY, color: 'var(--on-primary)', border: 'none', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            홈으로
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageSEO title="사용자 설문 - 틱재팬" description="틱재팬을 어떻게 쓰시는지 알려주세요 (1분)" path="/survey" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 90 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 4px', color: 'var(--text-strong)' }}>잠깐, 1분만! 🙌</h2>
          <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 2px', lineHeight: 1.6 }}>
            틱재팬을 어떻게 쓰시는지 알려주시면, 더 필요한 기능을 채워갈게요.
          </p>
        </div>

        {QUESTIONS.map((Q, i) => {
          const v = ans[Q.id]
          return (
            <div key={Q.id} style={{ border: '1px solid var(--bd)', borderRadius: 14, padding: 14, background: 'var(--surface)' }}>
              <p style={{ margin: '0 0 2px', fontSize: 14.5, fontWeight: 700, color: 'var(--text-strong)' }}>
                <span style={{ color: PRIMARY }}>Q{i + 1}.</span> {Q.q}
                {!Q.optional && <span style={{ color: 'var(--danger)', marginLeft: 4 }}>*</span>}
              </p>
              {Q.sub && <p style={{ margin: '0 0 10px', fontSize: 11.5, color: 'var(--text-3)' }}>{Q.sub}</p>}
              {!Q.sub && <div style={{ height: 8 }} />}

              {Q.type === 'nps' ? (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {Array.from({ length: 11 }, (_, n) => {
                    const on = v === n
                    return (
                      <button key={n} onClick={() => pickSingle(Q.id, n)}
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
                    const onClick = Q.type === 'multi' ? () => pickMulti(Q.id, opt, Q.max) : () => pickSingle(Q.id, opt)
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
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 하단 고정 제출 바 */}
      <div style={{ position: 'sticky', bottom: 0, padding: '10px 0 14px', background: 'linear-gradient(to top, var(--bg) 70%, transparent)' }}>
        <button onClick={submit} disabled={!allRequired || sending}
          style={{ width: '100%', height: 50, borderRadius: 13, background: allRequired ? PRIMARY : 'var(--bd)', color: allRequired ? 'var(--on-primary)' : 'var(--text-3)', border: 'none', fontSize: 15, fontWeight: 700, cursor: allRequired ? 'pointer' : 'default', fontFamily: 'inherit', transition: 'all 0.15s' }}>
          {sending ? '제출 중…' : allRequired ? '제출하기' : `응답 ${answeredCount}/${REQUIRED.length}`}
        </button>
      </div>
    </>
  )
}
