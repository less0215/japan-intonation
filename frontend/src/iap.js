// 인앱 결제(IAP) — RevenueCat. 앱 전용(웹은 no-op, 웹은 앱 설치 유도).
//   · configure(앱 시작) → login(로그인 시 user_id 연결) → purchase / restore / getEntitlements
//   · 권한(entitlement) 'plus' | 'pro' 가 활성이면 광고제거·무제한.
// ⚠️ Purchases 프록시를 절대 await/return 하지 말 것 — Capacitor 플러그인 프록시는 thenable 로
//    취급돼, 프록시를 반환하던 옛 load()의 `await load()` 가 네이티브 'then' 호출로 빠져 영영 멈췄다
//    (initIAP 가 'load() 완료' 전에 행 → _ready 영영 false → 결제 무한로딩의 진짜 원인).
//    아래는 Purchases 를 직접 쓰고 '메서드 호출 결과'만 await 한다.
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor'

console.log('[iap] 모듈 로드 v4 (정적 import + load() 제거)')

const isApp = () => window.Capacitor?.isNativePlatform?.() ?? false
const APPLE_KEY = 'appl_zXXxXLQqknvZBGoYwVPXqmAkeww'   // RevenueCat Public SDK key(공개키, 앱 박혀도 안전)

// 플랜+주기 → App Store 제품 ID
export const IAP_PRODUCTS = {
  'plus-monthly': 'com.tickjapan.app.plus.monthly',
  'plus-yearly':  'com.tickjapan.app.plus.yearly',
  'pro-monthly':  'com.tickjapan.app.pro.monthly',
  'pro-yearly':   'com.tickjapan.app.pro.yearly',
}

let _ready = false

// 프로미스 타임아웃 — 결제 시트/조회가 끝내 응답 없을 때 '처리 중' 무한로딩을 막는다.
// 성공 { ok:true, v } / 초과 { ok:false, timeout:true }. 원프로미스가 reject되면 그대로 throw(취소 등).
function withTimeout(promise, ms) {
  let t
  const timeout = new Promise((res) => { t = setTimeout(() => res({ ok: false, timeout: true }), ms) })
  return Promise.race([promise.then((v) => ({ ok: true, v })), timeout]).finally(() => clearTimeout(t))
}

// 앱 시작 1회 (main.jsx)
export async function initIAP(appUserID) {
  if (!isApp() || _ready) return
  console.log('[iap] initIAP 진입')
  try {
    // setLogLevel 은 비차단(fire-and-forget) — 멈춰도 configure 를 막지 않게. (메서드 결과만 다룸)
    try { Promise.resolve(Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG })).catch(() => {}) } catch {}
    console.log('[iap] configure 시작')
    // configure 에 타임아웃 — 네이티브 초기화가 끝내 무응답이면 무한대기 대신 not_ready 로 정리
    const cfg = await withTimeout(Purchases.configure({ apiKey: APPLE_KEY, appUserID: appUserID ? String(appUserID) : undefined }), 15000)
    _ready = cfg.ok
    console.log('[iap] configure 완료', { ready: _ready })
  } catch (e) { console.warn('[iap] init 실패', e) }
}

// 로그인/로그아웃 시 RevenueCat 사용자 연결(웹훅이 user_id로 매핑하도록)
export async function iapLogin(userId) {
  if (!isApp() || !userId) return
  try { if (!_ready) await initIAP(userId); await Purchases.logIn({ appUserID: String(userId) }) } catch {}
}
export async function iapLogout() {
  if (!isApp()) return
  try { await Purchases.logOut() } catch {}
}

// 현재 활성 권한 { plus, pro, anyActive }
export async function getEntitlements() {
  const none = { plus: false, pro: false, anyActive: false }
  if (!isApp()) return none
  try {
    if (!_ready) await initIAP()
    const { customerInfo } = await Purchases.getCustomerInfo()
    const active = customerInfo?.entitlements?.active || {}
    const plus = !!active['plus'], pro = !!active['pro']
    return { plus, pro, anyActive: plus || pro }
  } catch { return none }
}

// 오퍼링(현재+전체)에서 productId 와 일치하는 패키지를 '제품ID'로 찾는다.
// 패키지 식별자($rc_monthly/$rc_annual vs 커스텀 pro_monthly/pro_yearly)가 섞여 있어도 안전.
function findPackage(offerings, productId) {
  if (!offerings) return null
  const hit = (o) => (o?.availablePackages || []).find((p) => p?.product?.identifier === productId)
  let pkg = hit(offerings.current)
  if (pkg) return pkg
  for (const o of Object.values(offerings.all || {})) { pkg = hit(o); if (pkg) return pkg }
  return null
}

// 구매. 성공 시 { success, plus, pro }, 취소 { cancelled }, 실패 { error }
// 오퍼링의 purchasePackage 우선(대시보드 구성과 일치). 패키지를 못 찾으면 getProducts 폴백.
// 미초기화·조회 지연·시트 무응답 모든 구간에 타임아웃 → '처리 중'에서 무한 대기하지 않는다.
export async function purchase(productId) {
  console.log('[iap] purchase() 호출 — productId:', productId, '/ isApp:', isApp(), '/ _ready:', _ready)
  if (!isApp()) return { success: false, error: 'web' }
  try {
    if (!_ready) await initIAP()
    if (!_ready) { console.warn('[iap] not_ready — configure 미완료(네이티브 미도달)'); return { success: false, error: 'not_ready' } }

    // ① 오퍼링 조회 → 제품ID로 패키지 매칭 (식별자 불일치 무관)
    const off = await withTimeout(Purchases.getOfferings(), 20000)
    if (!off.ok) { console.warn('[iap] getOfferings 타임아웃'); return { success: false, error: 'product_timeout' } }
    const pkg = findPackage(off.v, productId)
    console.log('[iap] 오퍼링 매칭 — found:', !!pkg, '/ pkgId:', pkg?.identifier, '/ product:', pkg?.product?.identifier)

    let buy
    if (pkg) {
      // ②a 권장 경로 — 패키지 구매
      buy = await withTimeout(Purchases.purchasePackage({ aPackage: pkg }), 60000)
    } else {
      // ②b 폴백 — 오퍼링에 없으면 제품ID로 직접 조회·구매
      console.warn('[iap] 오퍼링에 패키지 없음 → getProducts 폴백', productId)
      const pr = await withTimeout(Purchases.getProducts({ productIdentifiers: [productId] }), 20000)
      if (!pr.ok) return { success: false, error: 'product_timeout' }
      const products = pr.v?.products
      if (!products?.length) { console.warn('[iap] no_product — StoreKit 미반환', productId); return { success: false, error: 'no_product' } }
      buy = await withTimeout(Purchases.purchaseStoreProduct({ product: products[0] }), 60000)
    }

    // 60초 last-resort 타임아웃. 시트 무응답이면 권한 재확인(백그라운드 완료·과금 여부) → 없으면 오류 정리.
    if (!buy.ok) {
      try {
        const { customerInfo } = await Purchases.getCustomerInfo()
        const a = customerInfo?.entitlements?.active || {}
        if (a['plus'] || a['pro']) return { success: true, plus: !!a['plus'], pro: !!a['pro'] }
      } catch {}
      return { success: false, error: 'purchase_timeout' }
    }
    const active = buy.v?.customerInfo?.entitlements?.active || {}
    console.log('[iap] 구매 성공 — active:', Object.keys(active))
    return { success: true, plus: !!active['plus'], pro: !!active['pro'] }
  } catch (e) {
    if (e?.userCancelled || e?.code === 'PURCHASE_CANCELLED' || e?.code === 1) return { success: false, cancelled: true }
    console.warn('[iap] purchase 실패', e)
    return { success: false, error: e?.message || 'purchase_failed' }
  }
}

// 구매 복원
export async function restore() {
  const none = { plus: false, pro: false, anyActive: false }
  if (!isApp()) return none
  try {
    if (!_ready) await initIAP()
    const r = await withTimeout(Purchases.restorePurchases(), 30000)   // 30초 내 미응답 시 '복원 중' 무한로딩 방지
    if (!r.ok) return none
    const active = r.v?.customerInfo?.entitlements?.active || {}
    const plus = !!active['plus'], pro = !!active['pro']
    return { plus, pro, anyActive: plus || pro }
  } catch { return none }
}
