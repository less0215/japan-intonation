// AdMob 보상형 광고 헬퍼 (앱 전용)
// 웹(브라우저)에서는 모든 함수가 no-op. 광고는 네이티브 앱에서만 동작한다.
//
// ⚠️ 현재는 Google '테스트 광고 ID' 사용 중.
//    AdMob 계정 승인 + app-ads.txt 크롤 완료 후 아래 실제 광고 단위 ID로 교체할 것.
//    (App ID는 iOS만 실제 등록됨. Android는 아직 미등록이라 테스트 App ID 사용)

const isApp = window.Capacitor?.isNativePlatform?.() ?? false

// Google 공식 테스트 보상형 광고 단위 ID (수익 없음 · 정책 위반 아님)
const TEST_REWARDED = {
  ios: 'ca-app-pub-3940256099942544/1712485313',
  android: 'ca-app-pub-3940256099942544/5224354917',
}

// 실제 광고 단위 ID (AdMob 승인 후 채워서 USE_TEST=false 로 전환)
const REAL_REWARDED = {
  ios: 'ca-app-pub-8958373483224358/7070252488',
  android: '',   // 안드로이드 단위 미생성 — 생성 시 채울 것(미입력이면 테스트 ID 폴백)
}

// Google 공식 테스트 전면(interstitial) 광고 단위 ID
const TEST_INTERSTITIAL = {
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
}
// 실제 전면 광고 단위 ID (AdMob에서 '전면 광고' 단위 생성 후 채울 것)
const REAL_INTERSTITIAL = {
  ios: '',    // 미입력이면 테스트 ID 폴백
  android: '',
}

const USE_TEST = false

let _admob = null      // 플러그인 모듈 캐시
let _ready = false     // initialize 완료 여부

function platform() {
  return window.Capacitor?.getPlatform?.() === 'android' ? 'android' : 'ios'
}

function rewardedAdId() {
  const set = USE_TEST ? TEST_REWARDED : REAL_REWARDED
  return set[platform()] || TEST_REWARDED[platform()]
}

function interstitialAdId() {
  // 전면 실제 단위 미생성 → 테스트 ID 폴백
  return REAL_INTERSTITIAL[platform()] || TEST_INTERSTITIAL[platform()]
}

// 앱 시작 시 1회 호출 (main.jsx)
export async function initAds() {
  if (!isApp || _ready) return
  try {
    const mod = await import('@capacitor-community/admob')
    _admob = mod.AdMob
    await _admob.initialize({
      initializeForTesting: true,        // 테스트 모드
      testingDevices: [],
    })
    _ready = true
  } catch (e) {
    console.warn('[ads] init 실패', e)
  }
}

// 보상형 광고 1회 표시. 보상 지급 시 true, 닫힘/실패 시 false 반환.
// 보상(Rewarded)·닫힘(Dismissed) 이벤트 도착 순서가 보장되지 않으므로,
// Dismissed/실패 시점에 그동안 보상 여부 플래그를 읽어 판정한다(레이스 방지).
export async function showRewardedAd() {
  if (!isApp) return false
  try {
    if (!_ready) await initAds()
    if (!_admob) return false
    const { RewardAdPluginEvents } = await import('@capacitor-community/admob')

    return await new Promise((resolve) => {
      let rewarded = false
      let done = false
      const handles = []
      const cleanup = () => handles.forEach(h => { try { h.remove() } catch {} })
      const finish = (val) => { if (!done) { done = true; cleanup(); resolve(val) } }

      const add = async (evt, cb) => { handles.push(await _admob.addListener(evt, cb)) }

      ;(async () => {
        await add(RewardAdPluginEvents.Rewarded, () => { rewarded = true })
        await add(RewardAdPluginEvents.Dismissed, () => finish(rewarded))
        await add(RewardAdPluginEvents.FailedToShow, () => finish(false))
        await add(RewardAdPluginEvents.FailedToLoad, () => finish(false))
        try {
          await _admob.prepareRewardVideoAd({ adId: rewardedAdId(), isTesting: USE_TEST })
          await _admob.showRewardVideoAd()
        } catch (e) {
          console.warn('[ads] rewarded 표시 실패', e)
          finish(false)
        }
      })()
    })
  } catch (e) {
    console.warn('[ads] rewarded 실패', e)
    return false
  }
}

// 전면(interstitial) 광고 1회 표시. 일반 번역 N회마다 호출. 항상 닫힘 시 resolve.
export async function showInterstitialAd() {
  if (!isApp) return false
  try {
    if (!_ready) await initAds()
    if (!_admob) return false
    const { InterstitialAdPluginEvents } = await import('@capacitor-community/admob')
    return await new Promise((resolve) => {
      let done = false
      const handles = []
      const cleanup = () => handles.forEach(h => { try { h.remove() } catch {} })
      const finish = (val) => { if (!done) { done = true; cleanup(); resolve(val) } }
      const add = async (evt, cb) => { handles.push(await _admob.addListener(evt, cb)) }
      ;(async () => {
        await add(InterstitialAdPluginEvents.Dismissed, () => finish(true))
        await add(InterstitialAdPluginEvents.FailedToShow, () => finish(false))
        await add(InterstitialAdPluginEvents.FailedToLoad, () => finish(false))
        try {
          await _admob.prepareInterstitial({ adId: interstitialAdId(), isTesting: USE_TEST })
          await _admob.showInterstitial()
        } catch (e) {
          console.warn('[ads] interstitial 표시 실패', e)
          finish(false)
        }
      })()
    })
  } catch (e) {
    console.warn('[ads] interstitial 실패', e)
    return false
  }
}
