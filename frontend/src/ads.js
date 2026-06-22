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
  ios: '',
  android: '',
}

const USE_TEST = true

let _admob = null      // 플러그인 모듈 캐시
let _ready = false     // initialize 완료 여부

function platform() {
  return window.Capacitor?.getPlatform?.() === 'android' ? 'android' : 'ios'
}

function rewardedAdId() {
  const set = USE_TEST ? TEST_REWARDED : REAL_REWARDED
  return set[platform()] || TEST_REWARDED[platform()]
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
export async function showRewardedAd() {
  if (!isApp) return false
  try {
    if (!_ready) await initAds()
    if (!_admob) return false

    const { RewardAdPluginEvents } = await import('@capacitor-community/admob')
    let rewarded = false
    const handle = await _admob.addListener(RewardAdPluginEvents.Rewarded, () => {
      rewarded = true
    })

    await _admob.prepareRewardVideoAd({
      adId: rewardedAdId(),
      isTesting: USE_TEST,
    })
    await _admob.showRewardVideoAd()   // 닫힐 때까지 대기

    try { await handle.remove() } catch {}
    return rewarded
  } catch (e) {
    console.warn('[ads] rewarded 실패', e)
    return false
  }
}
