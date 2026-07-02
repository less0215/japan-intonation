// 빌드타임 프리렌더 — 정적 콘텐츠 페이지(동사/형용사/명사/조사/문법/의성어 목록·상세)를
// Playwright로 렌더링해 실제 HTML로 prerendered/에 저장한다(git 커밋 대상).
// ⚠️ dist/에 직접 쓰면 안 됨 — Vercel이 배포 시 npm run build를 자체 실행해 dist/를 새로 만들어
//    덮어써버림. 대신 prerendered/에 저장해두면 build 스크립트가 매 빌드마다 dist/로 자동 병합함
//    (package.json "build": "vite build && node merge-prerendered.mjs").
// 목적: 크롤러(AdSense 심사봇 포함)가 JS 실행 없이도 콘텐츠를 보게 하기 위함(SPA 빈 화면 문제 해결).
// 실행(데이터 바뀔 때만 수동): npm run prerender  (= vite build → 이 스크립트 → merge --force)
//   생성된 prerendered/를 git 커밋하면 Vercel 빌드(VERCEL=1) 때 merge가 dist/에 병합함.
//   이후 데이터만 바뀌어 해시가 어긋나도 merge가 이번 빌드의 진짜 엔트리 자산으로 교체·검증하므로
//   안전(과거 "옛 해시 참조 → 사이트 전체 먹통" 사고 방지 로직 — 상세는 merge-prerendered.mjs 참고).
import { chromium } from 'playwright'
import { createServer, preview } from 'vite'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'

const { VERBS } = await import('./src/data/verbs.js')
const { ADJ_I } = await import('./src/data/adjI.js')
const { ADJ_NA } = await import('./src/data/adjNa.js')
const { NOUNS } = await import('./src/data/nouns.js')
const { PARTICLES } = await import('./src/data/particles.js')
const { GRAMMAR } = await import('./src/data/grammar.js')
const { ONOMATOPE } = await import('./src/data/onomatope.js')

const routes = [
  '/',
  '/shadowing', // 영상 카탈로그 목록(정적 카탈로그 데이터 기반 — 크롤러에 콘텐츠 노출)
  '/verbs', ...VERBS.map(v => `/verbs/${v.id}`),
  '/adj-i', ...ADJ_I.map(v => `/adj-i/${v.id}`),
  '/adj-na', ...ADJ_NA.map(v => `/adj-na/${v.id}`),
  '/noun', ...NOUNS.map(v => `/noun/${v.id}`),
  '/particles', ...PARTICLES.map(v => `/particles/${v.id}`),
  '/grammar', ...GRAMMAR.map(v => `/grammar/${v.id}`),
  '/onomatope', ...ONOMATOPE.map(v => `/onomatope/${v.id}`),
]
const LIMIT = process.env.PRERENDER_LIMIT ? Number(process.env.PRERENDER_LIMIT) : null
const targetRoutes = LIMIT ? routes.slice(0, LIMIT) : routes
console.log(`총 ${routes.length}개 라우트 중 ${targetRoutes.length}개 프리렌더 예정`)

const previewServer = await preview({ preview: { port: 4173, strictPort: true } })
const base = `http://localhost:4173`
await new Promise(r => setTimeout(r, 500))

const browser = await chromium.launch()
const CONCURRENCY = 6
let done = 0, failed = []

// 캡처 위생: page.content()는 "런타임에 주입된" 서드파티 태그까지 직렬화한다.
// 이걸 그대로 배포하면 (a) GTM 컨테이너 이중 로드(인라인 부트스트랩이 또 주입),
// (b) FB 픽셀 설정이 캡처 시점의 domain=localhost로 박제, (c) AdSense 로더가
// data-checked-head 등 런타임 상태를 문서에 박은 채 재실행되는 문제가 생긴다.
// 원본 index.html에 정적으로 있는 태그(gtag/js 등)는 남기고, 런타임 주입분만 걷어낸다.
// data-theme(캡처 시점 라이트 모드)도 박제 방지를 위해 제거 — React가 마운트 시 다시 정한다.
function cleanCapturedHtml(html) {
  return html
    .replace(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtm\.js[^"]*"[^>]*><\/script>/g, '')
    // GTM이 주입한 gtag/js 사본(&gtm=·cx=c 파라미터로 식별) — 템플릿의 정적 gtag/js는 파라미터가 없어 보존됨
    .replace(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?[^"]*(?:gtm=|cx=c)[^"]*"[^>]*><\/script>/g, '')
    .replace(/<script[^>]*src="https:\/\/connect\.facebook\.net[^"]*"[^>]*><\/script>/g, '')
    .replace(/<script[^>]*src="https:\/\/pagead2\.googlesyndication\.com[^"]*"[^>]*><\/script>/g, '')
    .replace(/(<html[^>]*?)\s+data-theme="[^"]*"/, '$1')
}

async function renderOne(ctx, route) {
  const page = await ctx.newPage()
  try {
    await page.goto(base + route, { waitUntil: 'load', timeout: 20000 })
    await page.waitForFunction(() => document.getElementById('root')?.children.length > 0, { timeout: 10000 })
    await page.waitForTimeout(150)
    const html = cleanCapturedHtml(await page.content())
    // createRoot(교체 렌더, 하이드레이션 아님)라 index.html을 덮어써도 안전 —
    // 클라이언트에서 어떤 경로든 React Router가 현재 URL 기준으로 #root를 새로 그림.
    const outPath = route === '/' ? 'prerendered/index.html' : `prerendered${route}/index.html`
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    done++
    if (done % 50 === 0) console.log(`  ${done}/${routes.length}`)
  } catch (e) {
    failed.push(route)
    console.log(`  ⚠️ 실패: ${route} (${e.message.slice(0, 80)})`)
  } finally {
    await page.close()
  }
}

async function worker(ctx, queue) {
  while (queue.length) {
    const route = queue.shift()
    await renderOne(ctx, route)
  }
}

const queue = [...targetRoutes]
const contexts = await Promise.all(Array.from({ length: CONCURRENCY }, () => browser.newContext()))
await Promise.all(contexts.map(ctx => worker(ctx, queue)))

await browser.close()
await previewServer.close()

console.log(`\n완료: ${done - failed.length}/${targetRoutes.length} 성공, ${failed.length}건 실패`)
if (failed.length) console.log('실패 목록:', failed.slice(0, 20))
