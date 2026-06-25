// 인앱 결제(IAP) — RevenueCat. 앱 전용(웹은 no-op, 웹은 앱 설치 유도).
//   · configure(앱 시작) → login(로그인 시 user_id 연결) → purchase / restore / getEntitlements
//   · 권한(entitlement) 'plus' | 'pro' 가 활성이면 광고제거·무제한.
const isApp = () => window.Capacitor?.isNativePlatform?.() ?? false
const APPLE_KEY = 'appl_zXXxXLQqknvZBGoYwVPXqmAkeww'   // RevenueCat Public SDK key(공개키, 앱 박혀도 안전)

// 플랜+주기 → App Store 제품 ID
export const IAP_PRODUCTS = {
  'plus-monthly': 'com.tickjapan.app.plus.monthly',
  'plus-yearly':  'com.tickjapan.app.plus.yearly',
  'pro-monthly':  'com.tickjapan.app.pro.monthly',
  'pro-yearly':   'com.tickjapan.app.pro.yearly',
}

let _P = null, _ready = false
async function load() {
  if (_P) return _P
  const mod = await import('@revenuecat/purchases-capacitor')
  _P = mod.Purchases
  return _P
}

// 프로미스 타임아웃 — 결제 시트/제품 조회가 끝내 응답 없을 때 '처리 중' 무한로딩을 막는다.
// 성공 { ok:true, v } / 초과 { ok:false, timeout:true }. 원프로미스가 reject되면 그대로 throw(취소 등).
function withTimeout(promise, ms) {
  let t
  const timeout = new Promise((res) => { t = setTimeout(() => res({ ok: false, timeout: true }), ms) })
  return Promise.race([promise.then((v) => ({ ok: true, v })), timeout]).finally(() => clearTimeout(t))
}

// 앱 시작 1회 (main.jsx)
export async function initIAP(appUserID) {
  if (!isApp() || _ready) return
  try {
    const P = await load()
    await P.configure({ apiKey: APPLE_KEY, appUserID: appUserID ? String(appUserID) : undefined })
    _ready = true
  } catch (e) { console.warn('[iap] init 실패', e) }
}

// 로그인/로그아웃 시 RevenueCat 사용자 연결(웹훅이 user_id로 매핑하도록)
export async function iapLogin(userId) {
  if (!isApp() || !userId) return
  try { if (!_ready) await initIAP(userId); const P = await load(); await P.logIn({ appUserID: String(userId) }) } catch {}
}
export async function iapLogout() {
  if (!isApp()) return
  try { const P = await load(); await P.logOut() } catch {}
}

// 현재 활성 권한 { plus, pro, anyActive }
export async function getEntitlements() {
  const none = { plus: false, pro: false, anyActive: false }
  if (!isApp()) return none
  try {
    if (!_ready) await initIAP()
    const P = await load()
    const { customerInfo } = await P.getCustomerInfo()
    const active = customerInfo?.entitlements?.active || {}
    const plus = !!active['plus'], pro = !!active['pro']
    return { plus, pro, anyActive: plus || pro }
  } catch { return none }
}

// 구매. 성공 시 { success, plus, pro }, 취소 { cancelled }, 실패 { error }
// 결제 SDK 미초기화·제품 조회 지연·결제 시트 무응답에도 '처리 중'에서 무한 대기하지 않도록 가드/타임아웃을 둔다.
export async function purchase(productId) {
  if (!isApp()) return { success: false, error: 'web' }
  try {
    if (!_ready) await initIAP()
    if (!_ready) return { success: false, error: 'not_ready' }   // configure 실패 → 무한로딩 대신 즉시 오류
    const P = await load()

    // ① 제품 조회 — 20초 내 미응답 시 오류(결제 전이라 과금 위험 없음)
    const pr = await withTimeout(P.getProducts({ productIdentifiers: [productId] }), 20000)
    if (!pr.ok) return { success: false, error: 'product_timeout' }
    const products = pr.v?.products
    if (!products?.length) return { success: false, error: 'no_product' }

    // ② 실제 결제 — 60초 last-resort 타임아웃. 시트가 끝내 무응답이면 권한을 재확인해
    //    (혹시 백그라운드에서 완료·과금됐는지) 활성 권한 있으면 success, 없으면 오류로 정리(유령 과금 방지).
    const buy = await withTimeout(P.purchaseStoreProduct({ product: products[0] }), 60000)
    if (!buy.ok) {
      try {
        const { customerInfo } = await P.getCustomerInfo()
        const a = customerInfo?.entitlements?.active || {}
        if (a['plus'] || a['pro']) return { success: true, plus: !!a['plus'], pro: !!a['pro'] }
      } catch {}
      return { success: false, error: 'purchase_timeout' }
    }
    const active = buy.v?.customerInfo?.entitlements?.active || {}
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
    const P = await load()
    const r = await withTimeout(P.restorePurchases(), 30000)   // 30초 내 미응답 시 '복원 중' 무한로딩 방지
    if (!r.ok) return none
    const active = r.v?.customerInfo?.entitlements?.active || {}
    const plus = !!active['plus'], pro = !!active['pro']
    return { plus, pro, anyActive: plus || pro }
  } catch { return none }
}
