# 틱재팬(TickJapan) 디자인 시스템 — UIUX 핸드오프 문서

> 대상: 웹/앱 UIUX를 잘 아는 디자이너(또는 Claude 디자인 에이전트)
> 목적: 현재 디자인 시스템을 정확히 이해하고, 일관성 개선·리디자인을 진행할 수 있도록 하는 단일 기준 문서
> 출처: 실제 코드(`frontend/src/App.css`, `frontend/src/components/*`)에서 추출한 값. 추정 아님.
> 최종 업데이트: 2026-06-24

---

## 0. 제품 컨텍스트

| 항목 | 내용 |
|------|------|
| 한 줄 정의 | 한국어 → 일본어 **AI 번역 + 일본어 학습**(피치 악센트·발음 연습·품사별 라이브러리) 앱 |
| 플랫폼 | iOS 앱(App Store), 웹(tickjapan.com), 안드로이드(비공개 테스트). **하나의 React 코드베이스를 Capacitor로 앱 패키징** |
| 사용자 | 일본어를 배우는 한국인. "파파고 대신 쓰는, 학습까지 되는 번역기" 포지셔닝 |
| 기술 | React 18 + Vite SPA, React Router v7, Capacitor(iOS). 스타일은 **전역 `App.css` + 컴포넌트 인라인 스타일** 혼용 |
| 백엔드 | FastAPI 단일 `main.py`, Gemini 번역, Google TTS 음성 |
| 화면 폭 | **모바일 우선**. 최대 콘텐츠 폭 `680px`, 중앙 정렬. 데스크톱도 같은 680px 컬럼 유지 |

**핵심: 이 앱은 "번역기 UI"가 아니라 "학습 도구 UI"다.** 번역 결과 카드 안에 피치 그래프·문장 분해·발음 연습이 겹겹이 들어가고, 품사별(동사/형용사/명사/조사/문법) 상세 페이지가 별도로 존재한다. 정보 밀도가 높은 화면을 **카드 + 섹션 + 토큰화된 색**으로 정리하는 게 디자인의 본질이다.

---

## 1. 디자인 원칙 (현재 지향점)

1. **토스(Toss)풍 미니멀** — 큰 숫자/굵은 한 줄 헤드라인, 여백, 부드러운 곡률, 절제된 색. 장식 최소.
2. **차분한 단색 액센트** — 브랜드 블루 `#5CA9CE` 하나로 거의 모든 인터랙션을 표현. (보조 액센트는 발음/경고용으로만)
3. **라이트/다크 완전 대응** — 모든 색은 CSS 변수 토큰. 하드코딩 색은 의도된 브랜드 블루 정도만 예외.
4. **모바일 네이티브 감각** — 하단 탭바, safe-area 대응, 0.15s 스냅 트랜지션, prefers-reduced-motion 가드.
5. **학습 가독성 우선** — 일본어 본문은 크게(22px), 후리가나/독음은 작고 약하게, 의미 위계를 4단계 텍스트 색으로.

---

## 2. 컬러 토큰 (단일 진실 공급원)

> 정의 위치: `App.css` `:root`(라이트, 1324–1354) / `html[data-theme="dark"]`(다크, 1355–1410)
> **컴포넌트는 항상 `var(--token)`을 써야 한다.** 아래 hex를 직접 박지 말 것(브랜드 블루 제외).

### 2.1 서피스 / 배경
| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--bg` | `#f8f9fa` | `#14161b` | 페이지 루트 배경 |
| `--surface` | `#ffffff` | `#1f232b` | 카드·입력창·내비 등 떠 있는 면 |
| `--surface-2` | `#f4f6f8` | `#272c35` | 칩·테이블 헤더·예문 박스 등 2차 면 |

다크모드는 `bg → surface → surface-2`로 갈수록 한 단계씩 **밝아지며** 입체감을 만든다(그림자 대신 명도 단차로 elevation 표현).

### 2.2 보더
| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--bd` | `#eef1f3` | `#30353f` | 일반 보더(카드·구분선) |
| `--bd-2` | `#e2e8f0` | `#3a404b` | 강조 보더(입력 포커스 전·버튼 외곽) |

### 2.3 텍스트 (위계 4단계)
| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--text-strong` | `#1a1f26` | `#f3f5f7` | 제목·일본어 본문·큰 숫자 |
| `--text-1` | `#3a4250` | `#dfe3e8` | 본문 |
| `--text-2` | `#5f6b73` | `#aab2bc` | 보조 텍스트·라벨 |
| `--text-3` | `#9aa0a6` | `#7f8893` | 캡션·플레이스홀더·독음·단위 |

⚠️ `--text-3`는 다크에서 오히려 **더 어둡다**(밝은 `surface-2` 위 가독성 유지 의도). 의도된 비대칭임을 알아둘 것.

### 2.4 브랜드 / 프라이머리
| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--primary` | `#5CA9CE` | `#5CA9CE` | **브랜드 블루. 라이트/다크 동일.** CTA·링크·활성·선택 |
| `--primary-strong` | `#2b7aa0` | `#7cc4e6` | tint 배경 위 파란 텍스트(대비 확보) |
| `--primary-tint` | `#eef6fb` | `#1b2730` | 프라이머리 약배경(칩·배지·카테고리바) |
| `--primary-tint-bd` | `#cfe6f3` | `#2f4351` | tint 박스 보더 |
| `--on-primary` | `#ffffff` | `#ffffff` | `#5CA9CE` 위 글자/아이콘(양쪽 흰색) |

### 2.5 시맨틱 (위험/경고/성공 + 약배경)
| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--danger` / `--danger-tint` | `#d64545` / `#fff5f5` | `#f08a8a` / `#3a2526` | 에러·삭제 |
| `--warning` / `--warning-tint` | `#c98a00` / `#fdf3e1` | `#e6b450` / `#33291a` | 한도 초과·'응용'·베타 배지 |
| `--success` / `--success-tint` | `#1d9e75` / `#e8f7ef` | `#46c79a` / `#1b322a` | 저장됨·완료 |

### 2.6 그림자 / 오버레이 / 곡률
| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--shadow` | `0 2px 8px rgba(0,0,0,.08)` | `0 2px 8px rgba(0,0,0,.4)` |
| `--shadow-strong` | `0 12px 40px rgba(0,0,0,.18)` | `0 12px 40px rgba(0,0,0,.5)` |
| `--overlay` | `rgba(20,30,40,.45)` | `rgba(0,0,0,.6)` |
| `--radius-card` | `16px` | (동일) |
| `--radius-sheet` | `20px` | (동일) |

호환용 별칭: `--accent-soft`→`--primary-tint`, `--card-bg`→`--surface`, `--card-bd`→`--bd`.

### 2.7 토큰화 안 된 "사실상의" 색 (정리 대상)
디자이너가 알아야 할, 코드에 박혀 있는 비공식 색:
- **유저 피치(발음 연습) 오렌지** `#F0A046` — 사실상의 **보조 액센트**. 토큰 없음.
- **문장 분해 CTA 골드 그라데이션** `#ffb648 → #f0a500 → #e08e00`.
- **저장됨 상태** `border #1D9E75 / bg #E1F5EE / text #085041` (`--success` 계열인데 별도 hex로 박힘).
- 섹션 라벨/후리가나 회색 `#aaa`(=`--text-3`와 유사하나 별도).

---

## 3. 타이포그래피

**폰트 스택**: `'Noto Sans KR', 'Noto Sans JP', sans-serif` (`App.css:13`)
- 일본어 표시 요소(`.japanese-text`, 활용형, 조사 글자, 피치 그래프 모라 라벨)는 `'Noto Sans JP'` 명시.

| 역할 | 크기 | 굵기 | 비고 |
|------|------|------|------|
| 앱 타이틀 | 22px (모바일 18) | 700 | letter-spacing -0.3px |
| 일본어 본문 `.japanese-text` | 22px (모바일 19) | 500 | line-height 1.7, `word-break: break-all` |
| 조사 타이틀 | 48px | 800 | 색 `#5CA9CE`, lh 1 |
| 문법 패턴 타이틀 | 34px | 800 | 색 `#5CA9CE` |
| 본문 | 14px | 400 | lh 1.5–1.8 |
| 입력/검색 | 17–18px | — | **≥16px 필수**(iOS 자동 줌 방지) |
| 버튼/링크 | 13–16px | 500–700 | |
| 섹션 라벨 | 11px | 700 | UPPERCASE, letter-spacing 0.8px, 색 `#aaa` |
| 캡션/배지 | 9.5–13px | 600–700 | 베타 배지 9.5px, 품사 배지 11px |
| 후리가나 | 0.72em(부모 상대) | 400 | 색 `#aaa` |
| 피치 모라(가나/한글) | 12px / 10.5px | — | 한글 독음은 `--text-3` |

**줄간격은 현재 1.0/1.5/1.55/1.6/1.7/1.8로 분산** → 의미 기반 스케일(헤딩 1.2 / 본문 1.5 / 장문 1.8)로 정리 권장.

---

## 4. 레이아웃 & 반응형

| 항목 | 값 |
|------|-----|
| 최대 콘텐츠 폭 | **680px** (`.container`, `.bottom-nav`) 중앙 정렬 |
| 페이지 패딩(데스크톱) | `32px 20px 92px` (하단 92 = 고정 내비 여백) |
| 페이지 패딩(모바일 ≤480) | `20px 14px 88px` |
| 섹션 내부 패딩 | `22px`(데스크톱) → `14px 12px`(모바일), 내부 gap 16 → 12 |
| 컨테이너 섹션 간 gap | 18px → 12px(모바일) |
| **모바일 브레이크포인트** | `@media (max-width: 480px)` — 패딩 축소, 표→카드 전환, 폰트 축소 |
| **데스크톱 브레이크포인트** | `@media (min-width: 769px)` — 하단 내비가 **고정→정적(static)** 으로 바뀌고 라운드 14px 바가 됨 |
| 하단 내비 높이 | ~60px + `env(safe-area-inset-bottom)` |
| **앱(네이티브) 보정** | `isApp`일 때 페이지 상단 `padding-top: 56px`(상태바). `isApp = window.Capacitor?.isNativePlatform?.() ?? false` |
| 라우팅 | 앱=HashRouter, 웹=BrowserRouter (`isApp`로 분기) |

**디자인 시 주의**: 같은 화면이 ① 모바일 웹 ② 네이티브 앱(상단 56px 추가) ③ 데스크톱(내비가 상단/정적) 3가지로 렌더된다. 목업은 **375–390px 폭 모바일 기준**으로 그리되 위 3변형을 명시할 것.

### 곡률(border-radius) — 현재 사용 값
`8px`(소형 버튼·토글) · `10px`(플레이/입력/예문) · `12–13px`(보조 버튼) · `14px`(카테고리바·particle 카드) · `16px`(카드·검색박스) · `20px`(모달/바텀시트).
→ **3단계(sm 8 / md 12 / lg 16)로 통합 권장.**

---

## 5. 테마(다크/라이트) 동작 방식

- 적용: `<html data-theme="dark">` 속성. 모든 토큰이 이 셀렉터에서 재정의됨.
- 결정: `document.documentElement.setAttribute('data-theme', …)` (`App.jsx`). 초기값 = `localStorage('tickjapan_theme')` → 없으면 OS `prefers-color-scheme`.
- 토글: 헤더 우상단 **해/달 SVG 아이콘 36×36**. 누르면 localStorage 저장 + GA4 이벤트.
- 즉, **수동 토글 + OS 기본값 폴백** 둘 다 지원. 디자인은 라이트/다크 둘 다 필수로 제공.

---

## 6. 코어 컴포넌트 스펙

> 값은 "이대로 다시 그리면 동일"하도록 추출. 색은 토큰 우선.

### 검색/입력
- **SearchBar** (`SearchBar.jsx`): textarea(min-height 42vh, font 18px) + 툴바를 감싼 `.search-box`(border `1.5px var(--bd-2)`, radius 16, bg `--surface`). **focus-within 시 보더 `#5CA9CE`**. 입력 디바운스 850ms.
- **search-btn**: 풀폭, height **52px**, bg `#5CA9CE`, 흰 글자, radius 12, 16px/700. disabled opacity .6.
- **FastToolbar**(빠른 번역 사용량): 사용량 바(48×5px, PRIMARY→warning 그라데이션) + 스위치 토글(44×26, radius 13, 활성 PRIMARY / 비활성 `--bd-2`) + 'unlock' 칩(border `--warning`).

### 버튼/칩
- **play-btn**(TTS): 36×36, radius 10, bg `#5CA9CE`, 흰 아이콘. 로딩 시 14px 스피너.
- **copy-btn**: 36×36, radius 8, border 1.5px 투명배경. 복사 후 보더/아이콘 `#5CA9CE`.
- **gender-toggle**(여성/남성): 2버튼 flex, 컨테이너 radius 8 gap 1, 각 버튼 height 32 padding 0 14, 12px/600. 비활성 회색, **활성 `#5CA9CE`/흰글자**.
- **WordBookmarkButton**: default(텍스트+아이콘, padding 7×13, radius 8) / small(아이콘만, 원형 radius 50%). 미저장=프라이머리 반투명 보더, **저장=`#1D9E75`/`#E1F5EE`/`#085041`**.
- **ExampleBookmarkButton**: 컴팩트(padding 4×9, 11px/600), 색 로직 동일.
- **tone chip**(자연스럽게/비즈니스/직역): padding 5×12, radius 999, 11.5px. 활성 = bg+border `#5CA9CE`, 흰 글자. 로딩 시 9×9 스피너.

### 카드/표면
- **.card**: border `1.5px var(--bd)`, radius 16, bg `--surface`, `overflow: visible`(그래프 클리핑 방지). 패딩은 내부 `.section`이 담당.
- **.section**: padding 22, gap 16(모바일 14/12, gap 12).
- **.section-label**: 11px/700, `#aaa`, UPPERCASE, ls 0.8.
- **.particle-card**: `.card`와 거의 동일하나 radius 14 + `overflow: hidden`. (→ 통합 후보)
- **.divider**: `border-top 1px var(--bd)`.

### 내비게이션
- **bottom-nav**: position fixed, max-width 680 중앙, bg `--surface`, border-top `#eef1f3`, shadow `0 -3px 16px rgba(20,40,55,.05)`, padding `6px 8px + safe-area`. 데스크톱(≥769)에서 정적 바 + radius 14.
- **bottom-nav-item**: flex 1, 아이콘+라벨 세로, gap 5, 11px. 비활성 `#b3b8bd` / 활성 `#5CA9CE`. SVG 23×23 stroke 1.9. 라벨: 번역/학습/저장(+요금/프로필).
- **CategoryBars**(홈 품사 진입): 세로 스택, 각 `.cat-bar` padding 16×18, radius 14, border 1.5px. 비활성 `#5CA9CE10`/보더 `#5CA9CE33`/라벨 `#2b7aa0`. **활성 bg `#5CA9CE` 풀 + 흰 라벨**. label 15px bold + chevron.

### 모달/시트
- **modal-backdrop**: fixed inset 0, bg `rgba(0,0,0,.45)`, flex center, z 100, padding 24.
- **modal-sheet**: bg `--surface`, radius 20, padding `26 24 24`, max-width **360**, shadow `0 12px 40px rgba(0,0,0,.18)`. 모바일 ≤480에서 **풀폭 바텀시트**(상단만 라운드).
- **modal-input**: height 50, radius 10, border 1.5px → 포커스 `#5CA9CE`.
- **modal-submit**: height 50, **블루 그라데이션** `linear-gradient(145deg,#6fb6d6,#5CA9CE 55%,#4f96bb)`, radius 13, hover brightness 1.04, active scale .99.
- **drawer-sheet**(저장 목록): 데스크톱 중앙 모달(max-width 480, 70vh) / 모바일 바텀시트(75vh, 상단 radius 20).
- **SavesPage 세그먼트 탭**(번역 기록/단어/예문): flex 1, radius 9, 12.5px. 활성 bg PRIMARY/흰글자. 체크박스: 20×20 원형, 활성 PRIMARY+흰 체크.

### 로딩
- **SkeletonCard**: `.card` 안에 `.skel`(radius 6, 그라데이션 shimmer 1.2s) 플레이스홀더. 입력 텍스트는 헤더에 PRIMARY 13px로 즉시 표시.
- 3점 'translating' 인디케이터(dot-bounce 1.2s).

---

## 7. 시그니처 / 도메인 UI (이 앱의 정체성)

### 7.1 PitchGraph (피치 악센트 그래프) — `PitchGraph.jsx`
SVG. 일본어 고저 악센트를 곡선으로 표현.
- 좌표: HIGH y `18`, LOW y `68`, 모라 간격 `34px`, 전체 높이 `130`.
- 곡선: stroke `2.5px`(round cap/join), 하단 fill `--primary` 8% opacity.
- 라벨: 가나 모라 `12px`(y100, Noto Sans JP), 한글 독음 `10.5px`(y116, `--text-3`).
- ⚠️ 모라 폭 고정(34px) → 아주 긴 단어는 모바일에서 가로 넘침. **반응형 스케일 검토 필요.**

### 7.2 PronunciationPractice (발음 연습) — `PronunciationPractice.jsx` *★ 가장 독창적 UI*
마이크로 녹음 → 온디바이스 피치 분석 → 정답 곡선과 비교. **전체화면 다크 오버레이.**
- 배경: `radial-gradient(circle at 50% 35%, #1a2730, #0b1116 70%)`, z 9500.
- **정답 곡선 = `#5CA9CE`(2.6px)**, **유저 실시간 곡선 = `#F0A046`(2.4px, 끝점 4px 원형 마커)**. → 이 두 색이 "기준 vs 나"의 핵심 메타포.
- 듣는 중 오브: `radial-gradient(35% 30%, #7cc4e6, #5CA9CE)`, 64px(컨테이너 92px), RMS에 따라 1–1.5x 스케일 + 글로우.
- 점수 배지: bg `#aee4c4` / 글자 `#0f3b22`, radius 999, 13px/700.
- 피드백: 👍 버튼(36px pill, `rgba(255,255,255,.1)`) + 이유 칩(32px, `rgba(255,255,255,.08)`). **베타 배지 = `--warning`.**
- 닫기 버튼 38px 원형. ⚠️ **스와이프 다운 닫기 없음**(네이티브 제스처 패리티 개선 여지).
- 상태: 닫힘(칩) → 듣는중 → 분석중 → 결과. 닫힘 칩: height 12, 12px, padding 6×11, radius 999, border 1px PRIMARY + '베타'.

### 7.3 ResultCard (번역 결과) — `ResultCard.jsx`
일본어 본문 + 후리가나 + 한글 독음 + TTS(성별 토글) + 피치 그래프 펼침 + 문장 분해 펼침 + **뉘앙스 카드('이런 뜻일 수도')**.
- 입력 한국어: `#5CA9CE` 13px/700.
- 톤 칩 3종(자연스럽게=기본/비즈니스=경어체/직역=학습용).
- **뉘앙스 카드**: bg `--surface-2`, border `--bd`, radius 12, 라벨 `#5CA9CE` 11.5px. (⚠️ 요청 실패 시 에러 상태 UI 없음)

### 7.4 BreakdownPanel (문장 분해) — `BreakdownPanel.jsx`
- 데스크톱: grid `1.2fr 1.2fr 1.2fr 0.8fr`(단위·히라가나·한글발음·품사), radius 10.
- 모바일 ≤480: 카드 레이아웃(단위 20px).
- 펼침 CTA: **골드 그라데이션** `linear-gradient(145deg,#ffb648,#f0a500 55%,#e08e00)`, shadow `0 8px 20px rgba(240,165,0,.34)`. (블루 CTA와 구분되는 유일한 큰 골드 요소)
- 활용 단계 원형: 18px, bg `#5CA9CE`, 흰 숫자 10px/700.

### 7.5 배지 패턴
- 기본/응용: `기본`=`--primary-tint`/`--primary`, `응용`=`--warning-tint`/`--warning`. padding 2×8, radius 20, 11px/700.
- 일일 카드 헤더: `✦ 오늘의 단어` / `✦ 오늘의 문법`(유니코드 별, 이모지 아님).

---

## 8. 모션

| 애니메이션 | 스펙 | 용도 |
|------------|------|------|
| `spin` | 0.7s linear infinite | 스피너(16px, border 2px) |
| `skeleton-shimmer` | 1.2s ease-in-out | 스켈레톤 |
| `dot-bounce` | 1.2s, 스태거 -0.32/-0.16s | 'translating' 3점 |
| 일반 트랜지션 | **0.15s ease** | 버튼/입력/카테고리바 색·보더 |
| 누름 피드백 | transform 0.05s, scale 0.99 | `:active` |
| `tjspin` | 0.6s linear | 톤 칩 로딩(9×9) |

**접근성 가드**: `@media (prefers-reduced-motion: reduce)` → 모든 애니메이션/트랜지션 0.01ms (`App.css:1413`).
모션 위계가 들쭉날쭉(0.05/0.15/0.6/0.7/1.2s)하므로 **idle 0.05 / feedback 0.15 / reveal 0.3 / load 0.7+** 식으로 정의 권장.

---

## 9. 보이스 & 톤 (콘텐츠 디자인)

- **언어**: 전부 한국어. **정중·친근**(-요/-세요/-습니다). 혼내는 말투·강매 금지.
  - 예: "번역할 내용을 입력하세요", "이름을 입력해 주세요.", "빠른 번역은 앱에서 만나요".
- **이모지 정책**: **최소·전략적.** 일반 UI 텍스트·버튼·라벨엔 이모지 금지. 허용은 알림/특정 강조에 한정 — `⚡`(빠른 번역), `✦`(오늘의), `✓`(저장됨). (메시지 발송 시 깨짐 우려로 이모지 배제하는 게 팀 합의)
- **핵심 용어(고정)**:
  - **빠른 번역** = 프리미엄 AI 티어(앱 전용). "더 빠르고 똑똑한".
  - **플러스** = 구독 등급명("플러스 이용 중").
  - **번역 톤** = 자연스럽게 / 비즈니스 / 직역.
- **포지셔닝 카피**: "파파고 대신 쓰는 무료 한국어-일본어 번역기"(SEO). 가격은 "하루 244원부터" 식 투명 표기.
- **로고**: `frontend/public/logo.svg`, 헤더 30×30 + "틱재팬" + 회색 서브타이틀 "일본어 번역기".

---

## 10. 접근성 / 기술 제약

- **CSS 변수가 테마의 전부.** 색 변경은 토큰만 고치면 라이트/다크 동시 반영.
- **px 기반**(rem 아님) → 전역 스케일 조정이 어려움. 타이포 토큰화 시 고려.
- **포커스 링 부재**: `:focus-visible`/outline 미정의 → 키보드 접근성 보강 필요.
- 입력 폰트 ≥16px 유지(iOS 줌 방지).
- 일부 컴포넌트가 인라인 스타일/하드코딩 hex(저장됨 `#1D9E75`, 성별 토글 활성, SavesPage 탭, SignupModal 인포박스) → 토큰/클래스로 이관 권장.

---

## 11. 알려진 비일관성 & 개선 백로그 (디자이너용 우선 작업 목록)

> 리디자인 시 "정리하면 좋은" 실제 코드 근거가 있는 항목들. 우선순위 순.

1. **인터랙션 상태 토큰화** — hover/active/selected가 곳곳에 하드코딩 인라인. `--primary-hover`, `--surface-hover`, 포커스 토큰을 신설해 일관화. (+ `:focus-visible` 도입)
2. **곡률 3단계 통합** — 8/10/12/13/14/16/20 난립 → sm 8 / md 12 / lg 16(+sheet 20)로.
3. **줄간격·간격 스케일 정의** — line-height 1.0~1.8, gap 5~18 난립 → 의미 기반 토큰화.
4. **보조 액센트 공식화** — `#5CA9CE`가 인터랙션의 ~90%. 발음 오렌지 `#F0A046`·분해 골드 `#f0a500`를 **보조 액센트 토큰**으로 승격해 위계/구분에 활용.
5. **하드코딩 색 → 토큰 이관** — 저장됨(`#1D9E75/#E1F5EE/#085041`)을 `--success` 계열로, 성별 토글 활성/SavesPage 탭/SignupModal 인포박스를 클래스화.
6. **스피너 사이즈 통일** — 9/14/16px 혼재 → 1~2종으로.
7. **오버레이/백드롭 일관성** — 모달 0.45 vs 드로어 0.4 통일(또는 위계 명문화).
8. **피치 그래프 반응형** — 모라 34px 고정 → 긴 단어 가로 넘침. 폭 적응 스케일.
9. **발음 연습 제스처** — 스와이프 다운 닫기 등 네이티브 제스처.
10. **다크 대비 검증** — `--primary-strong`(다크 `#7cc4e6`)가 `surface-2`(`#272c35`) 위에서 WCAG AA 경계(~4.2:1). 실측 보정.
11. **빈/에러 상태** — 뉘앙스 카드 등 서버 의존 UI의 실패 상태 디자인 부재.
12. **컴포넌트 통합** — `.card` vs `.particle-card` 거의 동일 → 베이스 공유.

---

## 12. 참고: 화면 인벤토리 (어디에 뭐가 있나)

| 경로 | 화면 |
|------|------|
| `/` | 번역기(SearchBar + ResultCard) + 홈 CategoryBars + 오늘의 단어/문법 |
| `/verbs`,`/adj-i`,`/adj-na`,`/noun` | 품사 라이브러리 목록 + 상세(활용표·예문·피치·발음) |
| `/particles`,`/grammar` | 조사/문법 목록 + 상세 |
| (시트) | 저장 목록 드로어(번역/단어/예문 3탭) |
| (모달) | 로그인/회원가입, 광고동의, 빠른번역 안내, 리뷰 이벤트 |
| (탭) | 하단 내비: 번역 · 학습 · 저장 · 요금(광고제거) · 프로필 |
| (전체화면) | 발음 연습 오버레이 |

핵심 파일: 전역 스타일 `frontend/src/App.css`, 토큰은 그 안 `:root`/`[data-theme="dark"]`. 컴포넌트는 `frontend/src/components/`.

---

*이 문서는 코드에서 추출한 현재 상태(as-is) 기준이다. 리디자인 제안(to-be)은 11장 백로그를 출발점으로 삼되, 2장 토큰 구조는 유지·확장하는 방향을 권장한다.*
