// 빌드타임 프리렌더 — 정적 콘텐츠 페이지(동사/형용사/명사/조사/문법/의성어 목록·상세)를
// Playwright로 렌더링해 실제 HTML로 prerendered/에 저장한다(git 커밋 대상).
// ⚠️ dist/에 직접 쓰면 안 됨 — Vercel이 배포 시 npm run build를 자체 실행해 dist/를 새로 만들어
//    덮어써버림. 대신 prerendered/에 저장해두면 build 스크립트가 매 빌드마다 dist/로 자동 병합함
//    (package.json "build": "vite build && node merge-prerendered.mjs").
// 목적: 크롤러(AdSense 심사봇 포함)가 JS 실행 없이도 콘텐츠를 보게 하기 위함(SPA 빈 화면 문제 해결).
// 실행(데이터 바뀔 때만 수동): npm run build && node prerender.mjs && node merge-prerendered.mjs && npm run build
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

async function renderOne(ctx, route) {
  const page = await ctx.newPage()
  try {
    await page.goto(base + route, { waitUntil: 'load', timeout: 20000 })
    await page.waitForFunction(() => document.getElementById('root')?.children.length > 0, { timeout: 10000 })
    await page.waitForTimeout(150)
    const html = await page.content()
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
