// 표현 매칭 공용 유틸 — '표현으로 배우기'(/lab/expression)와 그 진입점들
// (쉐도잉 검색·번역 결과 CTA·문법 상세)이 같은 로직을 쓴다.
import { STUDY_DATA } from '../data/studyData'
import { EXPRESSION_SIGNATURES } from '../data/expressionSignatures'

export const hasJapanese = (s) => /[぀-ヿ㐀-鿿]/.test(s || '')
const norm = (s) => (s || '').replace(/\s+/g, '').toLowerCase()
// ⚠️ 자막의 jp/furigana_html은 어절 공백이 서로 다를 수 있어(패턴이 공백을 사이에 두고 걸치면
//    누락·강조 밀림 발생) — 정규식 매칭은 항상 공백 제거본에 대해 수행한다.
export const stripSp = (s) => (s || '').replace(/\s+/g, '')

// 입력(한국어·영어 별칭 / 일본어 원문) → 매칭되는 시그니처들
export function matchExpressions(query) {
  const q = norm(query)
  if (!q) return []
  if (hasJapanese(query)) return EXPRESSION_SIGNATURES.filter((s) => s.jpRe.test(stripSp(query)))
  return EXPRESSION_SIGNATURES.filter((s) => {
    const aliases = [...(s.ko || []), ...(s.en || [])]
    return aliases.some((a) => { const na = norm(a); return na.includes(q) || q.includes(na) })
  })
}

// 시그니처별 장면 수 — 최초 호출 때 한 번만 전체 스캔(이후 캐시)
let _counts = null
export function sceneCount(sigId) {
  if (!_counts) {
    _counts = new Map()
    const vids = Object.values(STUDY_DATA)
    for (const s of EXPRESSION_SIGNATURES) {
      let c = 0
      for (const v of vids) for (const ln of (v.lines || [])) if (s.jpRe.test(stripSp(ln.jp))) c++
      _counts.set(s.id, c)
    }
  }
  return _counts.get(sigId) || 0
}

// 시그니처의 장면 샘플 n개(문법 상세 미리보기용)
export function sceneSamples(sig, n = 3) {
  const out = []
  for (const v of Object.values(STUDY_DATA)) {
    for (let i = 0; i < (v.lines || []).length; i++) {
      const ln = v.lines[i]
      if (!sig.jpRe.test(stripSp(ln.jp))) continue
      out.push({ vid: v.videoId, titleKr: v.titleKr || v.title, idx: i, t: ln.t, jp: ln.jp, furigana_html: ln.furigana_html, kr: ln.kr })
      if (out.length >= n) return out
    }
  }
  return out
}

// 원문 부분일치 기반 장면 수+샘플 — 시그니처가 없는 문법·단어를 쉐도잉과 연결할 때 사용
export function querySceneStats(q, n = 3) {
  const qq = stripSp(q)
  if (!qq || qq.length < 2) return { total: 0, samples: [] }   // 1자 검색은 오탐이 많아 차단
  let total = 0
  const samples = []
  for (const v of Object.values(STUDY_DATA)) {
    const lines = v.lines || []
    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i]
      if (!stripSp(ln.jp).includes(qq)) continue
      total++
      if (samples.length < n) samples.push({ vid: v.videoId, titleKr: v.titleKr || v.title, idx: i, t: ln.t, jp: ln.jp, furigana_html: ln.furigana_html, kr: ln.kr })
    }
  }
  return { total, samples }
}

// 단어(동사·형용사·명사) → 원문 검색용 문자열. 동사·い형용사는 활용 어미 1자를 떼서
// 활용형까지 잡는다(어간이 2자 이상일 때만 — 1자 어간은 오탐이 많아 원형 그대로).
export function wordQuery(word, type) {
  const w = (word || '').trim()
  if ((type === 'verbs' || type === 'adj-i') && w.length >= 3) return w.slice(0, -1)
  return w
}

// 문법 패턴 표기('〜(よ)うと思う' 등) → 원문 검색용 문자열 자동 유도.
// 유도 결과가 나쁘면(장면 0~1개) 섹션이 알아서 숨으므로 페일세이프.
export function grammarQuery(pattern) {
  let q = (pattern || '').replace(/[〜～]/g, '')
  q = q.split(/[・/／]/)[0]                       // 복수 표기는 첫 항목만
  q = q.replace(/（[^）]*）|\([^)]*\)/g, '')      // 괄호 삽입부 제거
  q = q.replace(/(だ|です)$/, '')                 // 종결 だ/です 제거(예: 予定だ→予定)
  return q.trim()
}
