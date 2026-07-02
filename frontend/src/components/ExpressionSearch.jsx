/* 표현 검색 (YouGlish식) — 한국어/일본어 표현을 입력하면 우리 쉐도잉 DB에서
 * 그 표현이 실제로 쓰인 대사들을 찾아, 같은 표현이 다른 맥락·억양으로 쓰이는 예시를
 * 여러 영상에서 보고/들을 수 있게 한다.
 * ⚠️ P1 프로토타입 — 숨김 라우트(/lab/expression). 정규식 시그니처 기반, 클라이언트 전용(백엔드 무관).
 * 매칭 로직: expressionSignatures.js. 자막 데이터: studyVideos.js(이미 번들에 존재). */
import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { STUDY_VIDEOS } from '../data/studyVideos'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'

const thumb = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`
const norm = (s) => (s || '').replace(/\s+/g, '').toLowerCase()
const hasJapanese = (s) => /[぀-ヿ㐀-鿿]/.test(s) // 가나 + CJK 한자
const fmtTime = (sec) => {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
const EXAMPLES = ['하려고 해', '할 거야', '하고 싶어', '해 가다', '해야 해', '할지도 몰라', 'ていく', '思う']
const MAX_RESULTS = 60

// 자막 전체를 평평한 라인 인덱스로(한 번만 계산). 20,000여 개라도 즉시.
function buildLineIndex() {
  const out = []
  for (const v of Object.values(STUDY_VIDEOS)) {
    const lines = v.lines || []
    for (let i = 0; i < lines.length; i++) {
      out.push({ videoId: v.videoId, title: v.title, titleKr: v.titleKr, idx: i, t: lines[i].t, jp: lines[i].jp, kr: lines[i].kr })
    }
  }
  return out
}

// 입력 → 후보 패턴들. 일본어면 시그니처 정규식이 걸리는 것, 한국어면 ko 별칭이 겹치는 것.
function matchCandidates(query) {
  const q = norm(query)
  if (!q) return []
  if (hasJapanese(query)) return EXPRESSION_SIGNATURES.filter((s) => s.jpRe.test(query))
  return EXPRESSION_SIGNATURES.filter((s) => s.ko.some((a) => { const na = norm(a); return na.includes(q) || q.includes(na) }))
}

// 한 대사에서 매칭 부분을 잘라 하이라이트용 세그먼트로.
function splitHighlight(jp, matcher) {
  let start = -1, len = 0
  if (matcher.jpRe) { const m = jp.match(matcher.jpRe); if (m) { start = m.index; len = m[0].length } }
  else if (matcher.raw) { const i = jp.indexOf(matcher.raw); if (i >= 0) { start = i; len = matcher.raw.length } }
  if (start < 0) return [{ t: jp }]
  return [{ t: jp.slice(0, start) }, { t: jp.slice(start, start + len), hl: true }, { t: jp.slice(start + len) }]
}

export default function ExpressionSearch() {
  const allLines = useMemo(buildLineIndex, [])
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState('idle') // idle | disambig | results | empty
  const [candidates, setCandidates] = useState([])
  const [matcher, setMatcher] = useState(null) // 확정된 시그니처 or {raw}
  const [hits, setHits] = useState([])
  const [featured, setFeatured] = useState(0)

  const runSearch = (m) => {
    const test = m.jpRe ? (jp) => m.jpRe.test(jp) : (jp) => jp.includes(m.raw)
    const found = allLines.filter((l) => test(l.jp)).slice(0, MAX_RESULTS)
    setMatcher(m); setHits(found); setFeatured(0)
    setStage(found.length ? 'results' : 'empty')
  }

  const onSearch = (raw) => {
    const q = (raw ?? query).trim()
    setQuery(q)
    if (!q) return
    const cands = matchCandidates(q)
    if (cands.length > 1) { setCandidates(cands); setStage('disambig'); return }
    if (cands.length === 1) { runSearch(cands[0]); return }
    // 후보 없음: 일본어면 원문 그대로 부분검색(YouGlish식), 한국어면 미지원 표현
    if (hasJapanese(q)) runSearch({ raw: q, label: `"${q}"`, note: '입력한 일본어가 그대로 나오는 대사' })
    else { setCandidates([]); setMatcher(null); setHits([]); setStage('empty') }
  }

  const videoCount = useMemo(() => new Set(hits.map((h) => h.videoId)).size, [hits])
  const cur = hits[featured]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 60px', color: 'var(--text-1)' }}>
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>표현 검색 (내부 프로토타입) | 틱재팬</title></Helmet>

      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--on-primary)', background: 'var(--primary)', padding: '2px 8px', borderRadius: 6 }}>내부 프로토타입 · 비공개</span>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px', color: 'var(--text-strong)' }}>표현 검색</h1>
      <p style={{ fontSize: 13.5, color: 'var(--text-2)', margin: '0 0 16px', lineHeight: 1.5 }}>
        한국어("하려고 해") 또는 일본어("ていく")를 입력하면, 쉐도잉 영상 속에서 그 표현이 실제로 쓰인 장면을
        여러 개 찾아 줘요. 같은 표현이 맥락·억양에 따라 어떻게 다른지 보고 들어 보세요.
      </p>

      {/* 검색바 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSearch() }}
          placeholder="표현을 입력하세요 (예: 하려고 해 / ていく)"
          style={{ flex: 1, padding: '11px 14px', fontSize: 15, borderRadius: 10, border: '1px solid var(--bd-2, #ccc)', background: 'var(--surface, #fff)', color: 'var(--text-1)', fontFamily: 'inherit', outline: 'none' }}
        />
        <button onClick={() => onSearch()} style={{ padding: '0 20px', fontSize: 15, fontWeight: 700, borderRadius: 10, border: 'none', background: 'var(--primary)', color: 'var(--on-primary)', cursor: 'pointer', fontFamily: 'inherit' }}>검색</button>
      </div>

      {/* 예시 칩 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {EXAMPLES.map((ex) => (
          <button key={ex} onClick={() => onSearch(ex)} style={{ fontSize: 12.5, padding: '5px 11px', borderRadius: 999, border: '1px solid var(--bd, #ddd)', background: 'var(--surface-2, #f3f4f6)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'inherit' }}>{ex}</button>
        ))}
      </div>

      {/* 선택칩(같은 한국어가 여러 패턴을 가리킬 때) */}
      {stage === 'disambig' && (
        <div style={{ background: 'var(--primary-tint, #eef6fb)', border: '1px solid var(--primary-tint-bd, #cfe4f0)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 10px', fontSize: 13.5, fontWeight: 700, color: 'var(--text-1)' }}>"{query}"은(는) 여러 표현으로 쓰여요. 어떤 걸 찾을까요?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {candidates.map((s) => (
              <button key={s.id} onClick={() => runSearch(s)} style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--bd, #ddd)', background: 'var(--surface, #fff)', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{s.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 8 }}>{s.reading}</span>
                <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-2)', marginTop: 3 }}>{s.note}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 결과 없음 */}
      {stage === 'empty' && (
        <p style={{ fontSize: 14, color: 'var(--text-2)', padding: '20px 0' }}>
          "{query}"에 대한 예시를 못 찾았어요. {hasJapanese(query) ? 'DB에 이 표현이 없는 것 같아요.' : '아직 등록되지 않은 표현이에요(프로토타입은 흔한 표현 위주).'} 예시 칩을 눌러 보세요.
        </p>
      )}

      {/* 결과 */}
      {stage === 'results' && cur && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif" }}>{matcher.label}</span>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{videoCount}개 영상에서 {hits.length}개 예시{hits.length >= MAX_RESULTS ? '+' : ''}</span>
          </div>
          {matcher.note && <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 14px' }}>💡 {matcher.note}</p>}

          {/* 자동재생 플레이어(선택된 예시 지점부터) */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 12, overflow: 'hidden', background: '#000', marginBottom: 8 }}>
            <iframe
              key={`${cur.videoId}-${cur.t}`}
              src={`https://www.youtube.com/embed/${cur.videoId}?start=${Math.max(0, Math.floor(cur.t))}&autoplay=1&rel=0&modestbranding=1`}
              title="example"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <div style={{ background: 'var(--surface-2, #f3f4f6)', borderRadius: 10, padding: '12px 14px', marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--text-1)', fontFamily: "'Noto Sans JP', sans-serif" }}>
              {splitHighlight(cur.jp, matcher).map((seg, i) => seg.hl
                ? <mark key={i} style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '0 2px', borderRadius: 3 }}>{seg.t}</mark>
                : <span key={i}>{seg.t}</span>)}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text-2)' }}>{cur.kr}</p>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-3)' }}>{cur.titleKr || cur.title} · {fmtTime(cur.t)}</p>
          </div>

          {/* 다른 예시들 */}
          <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-2)', margin: '0 0 10px' }}>다른 예시 — 클릭하면 그 지점부터 재생</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {hits.map((h, i) => (
              <button
                key={`${h.videoId}-${h.idx}`}
                onClick={() => setFeatured(i)}
                style={{ display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', padding: 8, borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  border: i === featured ? '2px solid var(--primary)' : '1px solid var(--bd, #e5e7eb)',
                  background: i === featured ? 'var(--primary-tint, #eef6fb)' : 'var(--surface, #fff)' }}>
                <div style={{ position: 'relative', flex: '0 0 108px', width: 108, aspectRatio: '16/9', borderRadius: 7, overflow: 'hidden', background: '#000' }}>
                  <img src={thumb(h.videoId)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: 4, right: 4, fontSize: 10, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.65)', padding: '1px 5px', borderRadius: 4 }}>{fmtTime(h.t)}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-1)', fontFamily: "'Noto Sans JP', sans-serif" }}>
                    {splitHighlight(h.jp, matcher).map((seg, k) => seg.hl
                      ? <mark key={k} style={{ background: 'var(--primary-tint, #dceff8)', color: 'var(--primary-strong, #2b7aa3)', fontWeight: 700, padding: '0 1px', borderRadius: 2 }}>{seg.t}</mark>
                      : <span key={k}>{seg.t}</span>)}
                  </p>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.kr}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
