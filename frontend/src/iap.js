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
export async function purchase(productId) {
  if (!isApp()) return { success: false, error: 'web' }
  try {
    if (!_ready) await initIAP()
    const P = await load()
    const { products } = await P.getProducts({ productIdentifiers: [productId] })
    if (!products?.length) return { success: false, error: 'no_product' }
    const { customerInfo } = await P.purchaseStoreProduct({ product: products[0] })
    const active = customerInfo?.entitlements?.active || {}
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
    const P = await load()
    const { customerInfo } = await P.restorePurchases()
    const active = customerInfo?.entitlements?.active || {}
    const plus = !!active['plus'], pro = !!active['pro']
    return { plus, pro, anyActive: plus || pro }
  } catch { return none }
}
