// vite build 직후 실행 — prerendered/(git 커밋된 정적 스냅샷)를 dist/ 위에 병합.
// prerendered/가 없으면(아직 한 번도 생성 안 했으면) 조용히 스킵.
import { cpSync, existsSync } from 'fs'

if (existsSync('prerendered')) {
  cpSync('prerendered', 'dist', { recursive: true })
  console.log('✅ prerendered/ → dist/ 병합 완료')
} else {
  console.log('ℹ️ prerendered/ 없음(스킵) — node prerender.mjs로 먼저 생성하세요.')
}
