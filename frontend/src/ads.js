// AdMob 보상형 광고 헬퍼 (앱 전용)
// 웹(브라우저)에서는 모든 함수가 no-op. 광고는 네이티브 앱에서만 동작한다.
//
// ⚠️ 현재는 Google '테스트 광고 ID' 사용 중.
//    AdMob 계정 승인 + app-ads.txt 크롤 완료 후 아래 실제 광고 단위 ID로 교체할 것.
//    (App ID는 iOS만 실제 등록됨. Android는 아직 미등록이라 테스트 App ID 사용)

import { adsCfg } from './config'   // 전면광고 최소 간격(min_gap_sec) 백엔드 제어

const isApp = window.Capacitor?.isNativePlatform?.() ?? false

// 광고 제거 회원 여부 — App.jsx가 /subscription 응답(ad_free)을 localStorage에 기록.
// 구독 상태에 직접 접근 못 하는 컴포넌트(라이브캠 등)에서 광고를 건너뛰는 데 사용.
export function isAdFreeMember() {
  try { return localStorage.getItem('tickjapan_ad_free') === '1' } catch { return false }
}

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

// Google 공식 테스트 배너 광고 단위 ID
const TEST_BANNER = {
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
}
// 실제 배너 광고 단위 ID (AdMob에서 '배너' 단위 생성 후 채울 것. 미입력이면 테스트 ID 폴백)
const REAL_BANNER = {
  ios: '',    // TODO: AdMob 배너 단위 생성 후 채우기
  android: '',
}

// Google 공식 테스트 전면(interstitial) 광고 단위 ID
const TEST_INTERSTITIAL = {
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
}
// 실제 전면 광고 단위 ID (AdMob에서 '전면 광고' 단위 생성 후 채울 것)
const REAL_INTERSTITIAL = {
  ios: 'ca-app-pub-8958373483224358/7604183495',
  android: '',    // 안드로이드 단위 미생성 — 미입력이면 테스트 ID 폴백
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

function bannerAdId() {
  // 배너 실제 단위 미생성 → 테스트 ID 폴백
  return REAL_BANNER[platform()] || TEST_BANNER[platform()]
}

// 앱 시작 시 1회 호출 (main.jsx)
export async function initAds() {
  if (!isApp || _ready) return
  try {
    const mod = await import('@capacitor-community/admob')
    _admob = mod.AdMob
    await _admob.initialize({
      initializeForTesting: USE_TEST,    // 프로덕션(USE_TEST=false)에서는 실제 광고
      testingDevices: [],
    })
    _ready = true
    preloadInterstitial()   // 첫 전면 광고 미리 준비 → 표시 시 즉시·확실하게(no-fill/지연 최소화)
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

// 전면 광고 상태 — 미리 로드(준비)해 두면 표시가 즉시·확실해진다(매번 즉석 load 시 no-fill/지연↑).
let _interReady = false           // 다음 전면 광고가 로드 완료되어 바로 표시 가능한지
let _interLoading = false         // 중복 prepare 방지
let _lastInterAt = 0              // 마지막 전면 광고 표시 시각(ms) — 최소 간격 가드용
// 전면 광고 최소 간격(초)은 백엔드 설정(min_gap_sec, 기본 45)에서 제어 — showInterstitialAd 참조

// 다음 전면 광고를 미리 로드. initAds 직후 + 매 표시 후 호출 → 항상 '장전' 상태 유지.
export async function preloadInterstitial() {
  if (!isApp || _interLoading || _interReady) return
  _interLoading = true
  try {
    if (!_ready) await initAds()
    if (!_admob) return
    await _admob.prepareInterstitial({ adId: interstitialAdId(), isTesting: USE_TEST })
    _interReady = true
  } catch (e) {
    _interReady = false
    console.warn('[ads] interstitial preload 실패', e)
  } finally {
    _interLoading = false
  }
}

// 전면(interstitial) 광고 1회 표시. 미리 로드된 광고를 즉시 표시하고, 끝나면 다음 광고를 다시 장전.
// minGapMs: 직전 표시와의 최소 간격(중복 노출 방지). 닫힘/실패 시 항상 resolve.
export async function showInterstitialAd({ minGapMs } = {}) {
  if (!isApp) return false
  const gap = minGapMs ?? (adsCfg().min_gap_sec || 45) * 1000   // 백엔드 제어(초)
  if (gap && _lastInterAt && Date.now() - _lastInterAt < gap) return false   // 너무 이르면 건너뜀
  try {
    if (!_ready) await initAds()
    if (!_admob) return false
    if (!_interReady) await preloadInterstitial()    // 아직 장전 안 됐으면 즉석 로드
    if (!_interReady) return false                   // 로드 실패(no-fill) → 광고 없이 통과
    const { InterstitialAdPluginEvents } = await import('@capacitor-community/admob')
    return await new Promise((resolve) => {
      let done = false
      const handles = []
      const cleanup = () => handles.forEach(h => { try { h.remove() } catch {} })
      const finish = (val) => {
        if (done) return
        done = true; cleanup()
        _interReady = false
        if (val) _lastInterAt = Date.now()
        preloadInterstitial()      // 다음 광고 미리 장전
        resolve(val)
      }
      const add = async (evt, cb) => { handles.push(await _admob.addListener(evt, cb)) }
      ;(async () => {
        await add(InterstitialAdPluginEvents.Dismissed, () => finish(true))
        await add(InterstitialAdPluginEvents.FailedToShow, () => finish(false))
        try {
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

// ── 하단 고정 배너 (앱 전용) — 목록·상세·라이브캠 등 '브라우징/학습' 화면에 노출.
// 네이티브 오버레이라 콘텐츠 흐름을 밀어내지 않고, 화면 하단(탭바 위)에 떠 있다.
// ⚠️ margin: 하단 탭바(BottomNav, position:fixed bottom:0 + safe-area)를 가리지 않도록 그 위로 띄우는 값.
//    기기마다 탭바 높이·safe-area가 달라 실기기에서 미세조정 필요(아래 기본값은 추정치).
let _bannerShown = false
const BANNER_MARGIN = 58   // TODO: 실기기에서 하단 탭바 위에 정확히 오도록 조정

export async function showAppBanner() {
  if (!isApp || isAdFreeMember() || _bannerShown) return
  try {
    if (!_ready) await initAds()
    if (!_admob) return
    const { BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob')
    await _admob.showBanner({
      adId: bannerAdId(),
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: BANNER_MARGIN,
      isTesting: USE_TEST,
    })
    _bannerShown = true
  } catch (e) { console.warn('[ads] banner 표시 실패', e) }
}

export async function hideAppBanner() {
  if (!isApp || !_bannerShown) return
  try { if (_admob) await _admob.removeBanner() } catch {}
  _bannerShown = false
}
