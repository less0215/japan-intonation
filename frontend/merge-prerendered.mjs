// vite build 직후 실행 — prerendered/(git 커밋된 정적 스냅샷)를 dist/ 위에 병합.
//
// ⚠️ 왜 "그냥 복사"가 아닌가 (사고 이력, 2026-07):
//   Vite는 매 빌드마다 JS/CSS 파일명에 새 해시를 붙인다(예: index-CsRgrRtJ.js).
//   prerendered/의 스냅샷은 Playwright로 캡처했던 "그 시점"의 해시를 <script src>/<link href>에
//   그대로 박아둔 정적 HTML이다. 데이터만 바꾸고 프리렌더를 다시 안 돌린 채 "vite build"만
//   재실행하면 dist/assets/의 실제 해시는 바뀌는데 prerendered/의 HTML은 옛 해시를 계속 참조한다.
//   과거엔 이걸 그대로 dist/에 덮어써서, 존재하지도 않는 JS 파일을 요청 → Vercel의 SPA
//   캐치올 리라이트가 index.html(HTML)을 대신 응답 → 브라우저가 그걸 JS 모듈로 실행 시도 →
//   조용히 실패 → React가 아예 마운트되지 않음(전 페이지 클릭·다크모드 등 100% 먹통,
//   그런데도 HTTP 200이라 감지도 안 됨). 절대 재발하면 안 되는 P0.
//
// ⚠️ 1차 수정본의 버그(적대적 검증에서 발견, 재발 방지 위해 기록):
//   "파일명 접두사 패턴 매칭"(예: index-*.js → dist/assets/에서 그 패턴에 맞는 파일 찾기) 방식은
//   위험하다. 이 앱은 라우트별 동적 import로 인해 dist/assets/에 index-*.js·web-*.js가 여러 개
//   동시에 존재한다(엔트리 번들 1개 + 여러 라우트 청크). 오래된 참조가 우연히 "패턴상 후보 1개"로
//   좁혀지면, 그게 진짜 엔트리 파일이 아니라 전혀 무관한 라우트 청크일 수 있는데도 "안전하게 치환
//   했다"고 착각하고 그 잘못된 파일을 끼워 넣을 수 있다 — 파일이 실제로 존재하니 사후 검증도
//   통과해버려서, 조용히 잘못된 JS를 배포하는 정확히 같은 부류의 사고로 이어질 뻔했다.
//   → 그래서 "패턴 추측"을 전부 버리고, 아래처럼 "이번 빌드가 방금 만든 진짜 dist/index.html
//   자체"에서 엔트리 스크립트·스타일시트를 역할(태그 종류) 기준으로 그대로 읽어와 쓴다. 후보가
//   여럿이라 고민할 필요가 없다 — dist/index.html에는 항상 정확히 1개의
//   <script type="module">과 1개의 <link rel="stylesheet">만 있다.
//
// 이 스크립트의 설계 원칙 (수정 시에도 반드시 유지):
//   1) 엔트리 자산(앱을 부팅하는 메인 JS·CSS)은 "패턴 추측"이 아니라 "이번 빌드가 실제로 만든
//      dist/index.html"에서 역할 기준(script[type=module], link[rel=stylesheet])으로 정답을
//      그대로 읽어와(ground truth) 모든 프리렌더 페이지의 해당 태그에 그대로 주입한다.
//   2) 그 외의 /assets/* 참조(라우트 청크 프리로드 힌트 등)는 패턴 추측 없이 "정확히 그 파일명이
//      dist/assets/에 실존하는가"만 확인한다 — 존재하면 그대로 두고, 없으면 그 페이지 전체를
//      "누락"으로 처리한다. 절대 다른 파일로 추측 치환하지 않는다.
//   3) 페일-클로즈드 안전망 — 치환 후에도 그 페이지가 참조하는 모든 /assets/* 가 dist/assets/에
//      실제로 존재하는지 다시 검증한다. 단 하나라도 없으면 그 페이지는 "절대" dist/에 쓰지
//      않는다 → Vercel 캐치올 리라이트가 dist/index.html(순정 SPA 셸)을 대신 서빙하게 둔다.
//      최악의 경우에도 "그 페이지 하나가 SEO 프리렌더 혜택만 못 받고 정상 SPA로 뜬다"에서
//      끝나야 한다 — "JS 로드 실패로 사이트 전체가 죽는다"는 절대 금지. 이 불변식이 이 파일에서
//      가장 중요한 부분이다. 나중에 리팩터링하더라도 "검증 실패 시 쓰지 않는다"는 절대
//      제거/우회하지 말 것.
//   4) dist/index.html(SPA 폴백 셸) 자체도 예외 없이 동일 검증을 거친다 — 다른 모든 페이지가
//      결국 이 파일에 기대므로, 깨진 스냅샷이 이걸 대체하는 일은 더더욱 있으면 안 된다.
//   5) 예상치 못한 에러(권한 문제, prerendered/가 파일인 경우 등)로 스크립트 자체가 죽더라도
//      "vite build && node merge-prerendered.mjs"의 && 때문에 Vercel 배포 전체가 실패하면 안
//      된다 — 그러면 오늘 사고보다 더 나쁘다(아무것도 배포 안 됨). 그래서 전체를 try/catch로
//      감싸고, 무슨 일이 있어도 exit 0으로 끝낸다. 최악의 경우 "프리렌더 미적용, 순정 vite
//      build 결과 그대로 배포"로 안전하게 후퇴한다.
//   6) 병합은 Vercel 빌드(VERCEL=1, Vercel이 자동 설정)에서만 실행 — 로컬 "npm run build" 후
//      "cap sync ios"를 하는 iOS 앱 빌드 경로에서 프리렌더 HTML 539개(~26MB)가 앱 번들에
//      딸려 들어가는 것을 막는다. 앱은 SPA 셸만 있으면 되고, 프리렌더는 순전히 웹
//      크롤러(SEO·AdSense)용이다. 로컬에서 병합 결과를 테스트할 땐 --force를 붙인다.
//
// 사용법:
//   Vercel 프로덕션(자동, package.json "build"가 호출 — VERCEL=1이라 병합 실행됨):
//     node merge-prerendered.mjs
//   로컬 병합 테스트(게이트 무시):
//     node merge-prerendered.mjs --force
//   테스트/디버깅(소스·타겟 디렉터리 커스텀 지정):
//     node merge-prerendered.mjs --force --src <prerenderedDir> --dist <distDir>
//
// prerendered/가 없으면(아직 한 번도 생성 안 했으면) 조용히 스킵 — 기존 동작 유지.

import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { dirname, join, relative } from 'path'

function main() {
  const { src: SRC_DIR, dist: DIST_DIR, force: FORCE } = parseArgs(process.argv.slice(2))

  // 설계 원칙 6: Vercel 빌드에서만 병합(iOS 앱 번들 26MB 오염 방지). 로컬 테스트는 --force.
  if (!process.env.VERCEL && !FORCE) {
    console.log('ℹ️ Vercel 빌드가 아니라 프리렌더 병합 스킵(dist/는 순정 SPA — iOS cap sync에 안전). 로컬 테스트는 --force.')
    return
  }

  if (!existsSync(SRC_DIR)) {
    console.log(`ℹ️ ${SRC_DIR}/ 없음(스킵) — node prerender.mjs로 먼저 생성하세요.`)
    return
  }
  if (!statSync(SRC_DIR).isDirectory()) {
    console.warn(`⚠️ ${SRC_DIR}가 디렉터리가 아님(스킵) — 프리렌더 미적용, 순정 빌드 결과 유지.`)
    return
  }

  const indexPath = join(DIST_DIR, 'index.html')
  if (!existsSync(indexPath)) {
    console.warn(`⚠️ ${indexPath} 없음(vite build 결과 확인 필요) — 프리렌더 병합 스킵.`)
    return
  }

  // ── 1) "이번 빌드"의 정답(엔트리 자산) 확보 ──────────────────────────────
  // dist/index.html은 방금 "vite build"가 만든, 지금 이 순간 100% 올바른 파일이다.
  // 여기서 역할(태그 종류) 기준으로 엔트리 스크립트·스타일시트 경로를 그대로 뽑아온다.
  // 패턴 추측이 전혀 없으므로 "후보가 여러 개라 헷갈리는" 상황 자체가 발생하지 않는다.
  // href/src를 "/assets/..."로 명시 제한 — index.html에는 구글 폰트 같은 외부
  // rel="stylesheet" 링크도 함께 있어서(예: fonts.googleapis.com), 이 제약이 없으면
  // 속성 순서(rel이 href보다 먼저 오는지)에 우연히 기대는 취약한 매칭이 되어버린다.
  // Vite가 만드는 엔트리 자산은 항상 /assets/ 아래에 있으므로 이 조건이 곧 "진짜 엔트리"의
  // 명확한 식별 기준이다.
  const freshIndexHtml = readFileSync(indexPath, 'utf-8')
  const entryScriptMatch = freshIndexHtml.match(/<script[^>]*\btype=["']module["'][^>]*\bsrc=["'](\/assets\/[^"']+)["'][^>]*>/i)
  const entryStyleMatch = freshIndexHtml.match(/<link[^>]*\brel=["']stylesheet["'][^>]*\bhref=["'](\/assets\/[^"']+)["'][^>]*>/i)

  if (!entryScriptMatch) {
    console.warn(`⚠️ dist/index.html에서 엔트리 <script type="module"> 을 못 찾음 — 프리렌더 병합 전체 스킵(안전 후퇴).`)
    return
  }
  const entryScriptSrc = entryScriptMatch[1]
  const entryStyleHref = entryStyleMatch ? entryStyleMatch[1] : null

  const DIST_ASSETS_DIR = join(DIST_DIR, 'assets')
  const realAssetFiles = new Set(existsSync(DIST_ASSETS_DIR) ? readdirSync(DIST_ASSETS_DIR) : [])
  const existsInDist = (assetRefPath) => {
    // "/assets/foo.js" 형태 참조가 dist/assets/foo.js로 실존하는지(정확히, 패턴 추측 없이)
    const base = assetRefPath.split('/').pop()
    return realAssetFiles.has(base)
  }

  // ── 2) 프리렌더 HTML 하나를 처리 ─────────────────────────────────────────
  // @returns {{ ok: boolean, html?: string, missing?: string[] }}
  //   ok=false면 절대 dist/에 쓰지 말 것 — 호출부는 스킵하고 SPA 폴백에 맡긴다.
  function processHtml(html) {
    let out = html

    // 2-a) 엔트리 스크립트 태그: 역할 기준으로 통째로 정답 값 주입(패턴 추측 없음).
    //      src가 /assets/로 시작하는 module 스크립트만 대상 — Vite 엔트리 스크립트는 항상
    //      /assets/ 아래이므로, 외부 스크립트(구글 태그매니저 등)와 절대 혼동되지 않는다.
    let scriptReplaced = 0
    out = out.replace(
      /(<script[^>]*\btype=["']module["'][^>]*\bsrc=["'])(\/assets\/[^"']+)(["'][^>]*>)/i,
      (full, pre, _old, post) => { scriptReplaced++; return `${pre}${entryScriptSrc}${post}` }
    )
    // 하드닝(적대적 검증 권고): 치환이 정확히 1회여야 한다. 0회면 엔트리 스크립트가 없는
    // 스냅샷(캡처 파손 — 병합하면 React가 영원히 안 뜨는 죽은 페이지가 됨)이거나 속성
    // 순서/형태가 예상과 다른 것이므로, 그대로 페일클로즈드로 스킵한다.
    if (scriptReplaced !== 1) {
      return { ok: false, missing: [`엔트리 module script 치환 ${scriptReplaced}회(정확히 1회여야 함 — 스냅샷 캡처 파손 의심)`] }
    }
    // 2-b) 엔트리 스타일시트: 동일하게 역할 기준 주입(빌드에 CSS가 없으면 건드리지 않음).
    //      href가 /assets/로 시작하는 stylesheet 링크만 대상 — 구글 폰트 등 외부
    //      rel="stylesheet" 링크(속성 순서가 rel/href 어느 쪽이든)와 절대 혼동되지 않는다.
    if (entryStyleHref) {
      let styleReplaced = 0
      out = out.replace(
        /(<link[^>]*\brel=["']stylesheet["'][^>]*\bhref=["'])(\/assets\/[^"']+)(["'][^>]*>)/i,
        (full, pre, _old, post) => { styleReplaced++; return `${pre}${entryStyleHref}${post}` }
      )
      // 빌드에 CSS가 있는데 스냅샷에서 못 찾았으면 무스타일 페이지가 되므로 동일하게 스킵.
      if (styleReplaced !== 1) {
        return { ok: false, missing: [`엔트리 stylesheet 치환 ${styleReplaced}회(정확히 1회여야 함 — 스냅샷 캡처 파손 의심)`] }
      }
    }

    // 2-c) 그 외 /assets/* 참조(라우트 청크 프리로드 힌트 등) — 패턴 추측 없이 "정확히 실존하는가"만.
    //      존재하지 않으면 missing에 기록(추측 치환 금지) → 아래에서 페이지 전체 스킵으로 이어짐.
    const missing = []
    const ASSET_REF_RE = /(["'(])(\/assets\/[^"')\s]+)(["')])/g
    for (const m of out.matchAll(ASSET_REF_RE)) {
      const ref = m[2]
      if (!existsInDist(ref)) missing.push(ref)
    }

    if (missing.length > 0) return { ok: false, missing }
    return { ok: true, html: out }
  }

  // ── 3) prerendered/ 트리를 재귀 순회 ─────────────────────────────────────
  function collectHtmlFiles(dir) {
    const results = []
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      const st = statSync(full)
      if (st.isDirectory()) results.push(...collectHtmlFiles(full))
      else if (entry === 'index.html') results.push(full)
    }
    return results
  }

  const htmlFiles = collectHtmlFiles(SRC_DIR)
  let mergedCount = 0
  let skippedCount = 0

  for (const srcPath of htmlFiles) {
    const relPath = relative(SRC_DIR, srcPath) // 예: "verbs/aru/index.html" 또는 "index.html"
    const destPath = join(DIST_DIR, relPath)

    const html = readFileSync(srcPath, 'utf-8')
    const result = processHtml(html)

    if (!result.ok) {
      skippedCount++
      console.warn(
        `⚠️ 스킵: ${relPath} — 누락된 자산 [${result.missing.join(', ')}] (dist/assets/에 실존하지 않음). ` +
        `Vercel SPA 폴백(dist/index.html)이 대신 서빙됨.`
      )
      // dist/index.html 자신이 대상인 경우: 절대 덮어쓰지 않으므로 "vite build"가 이미 만들어둔
      // 정상 셸이 그대로 유지된다 — 요구사항 4의 핵심(홈페이지 스냅샷이 깨졌으면 셸을 보존).
      continue
    }

    mkdirSync(dirname(destPath), { recursive: true })
    writeFileSync(destPath, result.html)
    mergedCount++
  }

  console.log(`\n${mergedCount}/${htmlFiles.length} 페이지 안전 병합, ${skippedCount}건 스킵(오래되었거나 누락된 자산)`)
}

function parseArgs(argv) {
  const args = { src: 'prerendered', dist: 'dist', force: false }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--src' && argv[i + 1]) args.src = argv[++i]
    else if (argv[i] === '--dist' && argv[i + 1]) args.dist = argv[++i]
    else if (argv[i] === '--force') args.force = true
  }
  return args
}

// 요구사항 5: 무슨 일이 있어도 Vercel 빌드 전체를 실패시키지 않는다(안전 후퇴 = exit 0).
try {
  main()
} catch (e) {
  console.warn(`⚠️ merge-prerendered 처리 중 예상치 못한 오류(프리렌더 미적용, 순정 빌드로 안전 후퇴): ${e.message}`)
}
