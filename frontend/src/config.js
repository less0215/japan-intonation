// 앱 동작 설정 — 백엔드 /config 에서 받아옴(광고 빈도 등).
// 못 받으면 DEFAULTS 사용. 백엔드(/admin/config)에서 값만 바꾸면 앱 재빌드 없이 다음 실행부터 반영.
const API_URL = 'https://japan-intonation-production.up.railway.app'
const DEFAULTS = { enabled: true, first: 3, every: 6, min_gap_sec: 45, photo: true }
let _ads = { ...DEFAULTS }

// 광고 빈도 설정 읽기 — { enabled, first, every, min_gap_sec, photo }
export function adsCfg() { return _ads }

// 앱 시작 1회 호출(main.jsx). 실패해도 DEFAULTS 유지 → 항상 안전.
export async function loadConfig() {
  try {
    const r = await fetch(`${API_URL}/config`)
    if (!r.ok) return
    const j = await r.json()
    const a = j?.ads
    if (a && typeof a === 'object') {
      _ads = {
        enabled:     a.enabled !== false,
        first:       Number(a.first)  > 0 ? Number(a.first)  : DEFAULTS.first,
        every:       Number(a.every)  > 0 ? Number(a.every)  : DEFAULTS.every,
        min_gap_sec: Number(a.min_gap_sec) >= 0 ? Number(a.min_gap_sec) : DEFAULTS.min_gap_sec,
        photo:       a.photo !== false,
      }
    }
  } catch {}
}
