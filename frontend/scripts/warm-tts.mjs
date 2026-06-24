#!/usr/bin/env node
/*
 * 라이브러리 음성 워밍업 — TTS 비용 0원 만들기
 * ───────────────────────────────────────────────────────────
 * 데이터 파일(verbs/adjI/adjNa/nouns/particles)에서 프론트가 /tts로 보낼
 * 일본어 문자열을 "그대로" 추출해, 백엔드 /admin/warm-tts에 배치 전송한다.
 * 백엔드(Railway)는 Google TTS 키를 갖고 있으므로, 받은 문자열을 합성해
 * 영구 캐시(CacheEntry)에 저장한다. 한 번 실행해두면 이후 라이브러리 재생은
 * 전부 캐시 적중 → TTS 비용 0원. (캐시 키는 /tts와 동일한 '{text}_{gender}')
 *
 * 이 스크립트 자체는 인증정보가 필요 없다(백엔드가 가짐). 그냥 네트워크로 호출만.
 *
 * 사용법:
 *   node frontend/scripts/warm-tts.mjs              # female(기본)만 굽기
 *   DRY=1 node frontend/scripts/warm-tts.mjs        # 전송 없이 추출 개수만 확인
 *   WARM_MALE=1 node frontend/scripts/warm-tts.mjs  # 활용형 male 음성도 굽기
 *   ADMIN_KEY=... API_BASE=... node ...             # 토큰/주소 오버라이드
 *
 * 멱등: 이미 캐시에 있는 항목은 백엔드가 건너뛴다. 몇 번 돌려도 안전.
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA = join(__dirname, '..', 'src', 'data')

const API_BASE  = process.env.API_BASE  || 'https://japan-intonation-production.up.railway.app'
const ADMIN_KEY = process.env.ADMIN_KEY || 'tickjapan-admin-9f3a2b'
const WARM_MALE = process.env.WARM_MALE === '1'
const DRY       = process.env.DRY === '1'
const BATCH     = 50   // 배치당 합성 수 — 게이트웨이 타임아웃 여유 (50 × ~0.25s ≈ 12s)

/* ESM(export const ...) 데이터 파일을 Node(CJS 환경)에서 읽기:
 * 신뢰된 로컬 데이터이므로 export 키워드만 제거하고 평가해 명명 export를 회수한다. */
function loadExports(file) {
  const raw = readFileSync(join(DATA, file), 'utf8')
  const names = [...raw.matchAll(/export\s+const\s+([A-Za-z0-9_]+)/g)].map((m) => m[1])
  const body = raw
    .replace(/export\s+default\s+/g, 'const __default = ')
    .replace(/export\s+(const|let|var|function|class)\b/g, '$1')
  // eslint-disable-next-line no-new-func
  const fn = new Function(`${body}\nreturn { ${names.join(', ')} };`)
  return fn()
}

/* 프론트 stripFurigana(WordDetail/Particle/Grammar 변형)와 동일 — 한자(후리가나) 괄호 제거 */
const stripFurigana = (t) => String(t || '').replace(/[（(][^）)]+[）)]/g, '').replace(/[（(）)]/g, '')

const { VERBS }     = loadExports('verbs.js')
const { ADJ_I }     = loadExports('adjI.js')
const { ADJ_NA }    = loadExports('adjNa.js')
const { NOUNS }     = loadExports('nouns.js')
const { PARTICLES } = loadExports('particles.js')

const female = new Set()  // ExampleCard·라이브러리·조사 = 항상 female 재생
const male   = new Set()  // 활용형(FormRow) gender 토글의 male

/* 동사/형용사/명사: 활용형 .text(후리가나 제거) + 예문 .plain */
function addWordList(list) {
  for (const w of list || []) {
    const c = w.conjugations || {}
    for (const arr of [c.formal, c.casual, c.plain]) {     // verbs=formal/casual, adj·noun=formal/plain
      if (!Array.isArray(arr)) continue
      for (const row of arr) {
        const s = stripFurigana(row.text).trim()           // FormRow → stripFurigana(row.text)
        if (s) { female.add(s); male.add(s) }              // 기본 female, 토글 시 male
      }
    }
    for (const ex of (w.examples || [])) {                 // ExampleCard → example.plain (female 고정)
      const s = (ex.plain ? String(ex.plain) : stripFurigana(ex.japanese)).trim()
      if (s) female.add(s)
    }
  }
}

addWordList(VERBS)
addWordList(ADJ_I)
addWordList(ADJ_NA)
addWordList(NOUNS)

/* 동사 라이브러리 카드 헤드워드 (VerbLibrary → verb.hiragana ?? verb.verb, female) */
for (const v of VERBS) {
  const s = String(v.hiragana ?? v.verb ?? '').trim()
  if (s) female.add(s)
}

/* 조사 예문 (ParticleDetail → stripFurigana(example.jp), female) */
for (const p of PARTICLES) {
  for (const u of (p.usages || [])) {
    const jp = u.example && u.example.jp
    if (jp) { const s = stripFurigana(jp).trim(); if (s) female.add(s) }
  }
}

const femaleArr = [...female]
const maleArr   = WARM_MALE ? [...male] : []

console.log(`[warm-tts] 대상  female: ${femaleArr.length}개`)
console.log(`[warm-tts] 대상  male:   ${maleArr.length}개${WARM_MALE ? '' : '  (생략 — WARM_MALE=1 로 켜기)'}`)
console.log(`[warm-tts] 백엔드: ${API_BASE}`)

if (DRY) {
  console.log('[warm-tts] DRY 모드 — 전송 안 함. 샘플 10개:')
  femaleArr.slice(0, 10).forEach((s) => console.log('   •', s))
  process.exit(0)
}

async function warm(gender, texts) {
  let gen = 0, cached = 0, err = 0
  for (let i = 0; i < texts.length; i += BATCH) {
    const chunk = texts.slice(i, i + BATCH)
    let res
    try {
      res = await fetch(`${API_BASE}/admin/warm-tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: ADMIN_KEY, gender, texts: chunk }),
      })
    } catch (e) {
      console.error(`  네트워크 오류 ${i}-${i + chunk.length}:`, e.message); err += chunk.length; continue
    }
    if (!res.ok) {
      console.error(`  배치 ${i}-${i + chunk.length} HTTP ${res.status}:`, (await res.text()).slice(0, 200))
      err += chunk.length; continue
    }
    const j = await res.json()
    gen += j.generated; cached += j.already_cached; err += j.errors
    console.log(`  ${gender} ${Math.min(i + BATCH, texts.length)}/${texts.length} → +${j.generated} 생성, ${j.already_cached} 기존, ${j.errors} 오류`)
  }
  console.log(`[warm-tts] ${gender} 완료: ${gen} 생성, ${cached} 기존, ${err} 오류`)
}

await warm('female', femaleArr)
if (WARM_MALE) await warm('male', maleArr)
console.log('[warm-tts] 전체 완료 — 라이브러리 음성이 영구 캐시에 채워졌습니다.')
