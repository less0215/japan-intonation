# 틱재팬 (TickJapan) — 프로젝트 가이드

## 프로젝트 개요
한국어 → 일본어 번역 + 피치 악센트 학습 웹앱.
번역기, 품사별(동사/い형/な형/명사/조사) 단어 라이브러리, 단어·예문 저장 기능을 제공한다.

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프론트엔드 | React 18 + Vite SPA, React Router DOM v7 |
| 백엔드 | FastAPI (Python), 단일 `main.py` |
| DB | PostgreSQL (SQLAlchemy ORM) |
| AI | Google Gemini `gemini-2.5-flash-lite` |
| 배포 | Vercel (프론트), Railway (백엔드) |

---

## 디렉터리 구조

```
tickjapan/
├── main.py                          # FastAPI 백엔드 (단일 파일 유지 필수)
└── frontend/
    ├── src/
    │   ├── App.jsx                  # 라우터, 전역 레이아웃, 번역 로직
    │   ├── App.css                  # 전역 스타일
    │   ├── main.jsx                 # React 진입점 (UserProvider 감싸기)
    │   ├── context/
    │   │   └── UserContext.jsx      # 전역 상태 (유저, 저장 단어, 저장 예문)
    │   ├── components/
    │   │   ├── ResultCard.jsx       # 번역 결과 카드 (피치 그래프, 문장 분해)
    │   │   ├── BreakdownPanel.jsx   # 문장 분해 테이블·카드·토글 버튼
    │   │   ├── SearchBar.jsx        # 번역 입력창
    │   │   ├── SkeletonCard.jsx     # 번역 로딩 스켈레톤
    │   │   ├── PitchGraph.jsx       # 피치 악센트 그래프
    │   │   ├── HistoryDrawer.jsx    # 저장 목록 드로어 (번역/단어/예문 3탭)
    │   │   ├── WordBookmarkButton.jsx   # 단어 저장 버튼 (default/small 사이즈)
    │   │   ├── ExampleBookmarkButton.jsx # 예문 저장 버튼
    │   │   ├── SignupModal.jsx       # 회원가입/로그인 모달
    │   │   ├── PageSEO.jsx          # react-helmet 기반 SEO
    │   │   ├── CopyButton.jsx       # 클립보드 복사 버튼
    │   │   ├── CategoryBars.jsx     # 홈 화면 품사 바
    │   │   ├── VerbDetail.jsx       # 동사 상세 (활용표 + 예문)
    │   │   ├── VerbDetailPage.jsx   # 동사 상세 페이지 래퍼 (SEO + 데이터)
    │   │   ├── VerbLibrary.jsx      # 동사 목록 (순위탭 + 정렬 + 북마크)
    │   │   ├── WordDetail.jsx       # い형/な형/명사 상세 (활용표 + 예문)
    │   │   ├── WordDetailPage.jsx   # 위의 페이지 래퍼
    │   │   ├── WordLibrary.jsx      # い형/な형/명사 목록
    │   │   ├── ParticleDetail.jsx   # 조사 상세 (용법 + 예문)
    │   │   ├── ParticleDetailPage.jsx
    │   │   └── ParticleLibrary.jsx  # 조사 목록
    │   └── data/
    │       ├── verbs.js             # 동사 TOP100 (BCCWJ 빈도순, 300개 예문 패턴)
    │       ├── adjI.js              # い형용사 TOP100
    │       ├── adjNa.js             # な형용사 TOP100
    │       ├── nouns.js             # 명사 TOP100
    │       └── particles.js         # 조사 TOP10
    └── vercel.json                  # SPA 리라이트 설정
```

---

## 라우팅 구조

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | App.jsx (translate tab) | 번역기 |
| `/verbs` | VerbLibrary | 동사 TOP100 목록 |
| `/verbs/:id` | VerbDetailPage → VerbDetail | 동사 상세 |
| `/adj-i` | WordLibrary | い형용사 목록 |
| `/adj-i/:id` | WordDetailPage → WordDetail | い형용사 상세 |
| `/adj-na` | WordLibrary | な형용사 목록 |
| `/adj-na/:id` | WordDetailPage → WordDetail | な형용사 상세 |
| `/noun` | WordLibrary | 명사 목록 |
| `/noun/:id` | WordDetailPage → WordDetail | 명사 상세 |
| `/particles` | ParticleLibrary | 조사 TOP10 목록 |
| `/particles/:id` | ParticleDetailPage → ParticleDetail | 조사 상세 |

---

## 백엔드 API (main.py)

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/health` | GET | 헬스 체크 |
| `/analyze` | POST | 한→일 번역 + 피치 악센트 |
| `/breakdown` | POST | 문장 분해 (Gemini) |
| `/accent` | POST | 악센트 데이터 |
| `/tts` | POST | 텍스트 → 음성 |
| `/auth/signup` | POST | 회원가입 (전화번호) |
| `/saves` | POST | 번역 저장 |
| `/saves/{user_id}` | GET | 저장 목록 조회 |
| `/saves/{save_id}` | DELETE | 저장 항목 삭제 |

### DB 스키마 (변경 시 반드시 먼저 확인)
```python
class User(Base):
    id, name, phone, created_at

class SavedResult(Base):
    id, user_id, anonymous_id, input_text, result_json, created_at
```

---

## UserContext — 전역 상태

`/frontend/src/context/UserContext.jsx`

| 상태/함수 | 설명 |
|----------|------|
| `user` | 로그인 유저 정보 (localStorage: `tickjapan_user`) |
| `savedWords` | 저장 단어 배열 (localStorage: `tickjapan_saved_words`) |
| `isWordSaved(wordId)` | 단어 저장 여부 확인 |
| `toggleSaveWord(wordInfo)` | 단어 저장/취소 토글 |
| `savedExamples` | 저장 예문 배열 (localStorage: `tickjapan_saved_examples`) |
| `isExampleSaved(exampleId)` | 예문 저장 여부 확인 |
| `toggleSaveExample(exampleInfo)` | 예문 저장/취소 토글 |
| `saveResult(user, text, result)` | 번역 결과 서버 저장 |

### wordInfo 스펙
```js
{ id, category, word, reading, meaning }
// category: 'verb' | 'adj-i' | 'adj-na' | 'noun' | 'particle'
```

### exampleInfo 스펙
```js
{ id, wordId, wordText, wordReading, wordCategory, exampleJp, exampleKr }
// id 형식: `${wordCategory}_${wordId}_${index}`
```

---

## 저장 기능 구조

### 단어 저장 (WordBookmarkButton)
- **사용 위치**: VerbDetail, WordDetail, ParticleDetail 헤더 → `size="default"` (텍스트+아이콘)
- **사용 위치**: VerbLibrary, WordLibrary, ParticleLibrary 카드 → `size="small"` (아이콘만)
- 저장 상태: 초록색 (#1D9E75), 미저장: PRIMARY (#5CA9CE)

### 예문 저장 (ExampleBookmarkButton)
- **사용 위치**: WordDetail의 ExampleCard, VerbDetail 예문 섹션, ParticleDetail의 ExampleBox
- 각 예문 카드 우측에 "저장 / 저장됨" 버튼

### 저장 목록 (HistoryDrawer)
- 헤더 "저장 목록" 버튼 클릭 시 오픈 (로그인/비로그인 모두)
- **PC**: 화면 중앙 모달 (max-width 480px)
- **모바일 (≤480px)**: 하단 시트
- 3개 탭: 번역 저장 (서버) / 저장 단어 (localStorage) / 저장 예문 (localStorage)
- 각 탭에 저장 개수 뱃지 표시 (99개 이상은 `99+`)
- 예문 클릭 시 해당 단어 상세 페이지로 이동 + `#examples-section` 스크롤

---

## 데이터 파일 구조

`/frontend/src/data/*.js` — BCCWJ 빈도순 정적 데이터

```js
// 동사/형용사/명사 공통 필드
{
  id, rank, verb (일본어), reading, meaning,
  hiragana, accentType,
  conjugations: { ... },   // 활용형
  examples: [
    {
      korean, japanese, plain, reading, furigana, accentData,
      pattern: { name, meaning, note }  // 문법 포인트 (상세 설명 포함)
    }
  ]
}

// 조사
{
  id, particle, reading, meanings: [],
  usages: [{ type: 'basic'|'응용', meaning, example, note }]
}
```

`pattern.note` 형식: `'문법 포인트: 설명.\n예문 속 단어 인용.\n응용/주의 포인트.'`  
렌더링: `whiteSpace: 'pre-line'` 적용

---

## 헤더 UI

### 비로그인
```
[저장 목록] [로그인]
```

### 로그인
```
정봉준님  [저장 목록]  [로그아웃]
```

---

## 개발 규칙

- **백엔드**: `main.py` 단일 파일 유지. 분리 필요 시 먼저 확인
- **프론트 컴포넌트**: `/components` 안에만 추가
- **주석**: 한국어
- **DB 스키마 (User, SavedResult) 변경 시 반드시 먼저 확인**
- **환경변수(.env) 절대 수정 금지**
- 빌드 확인 후 push: `cd frontend && npm run build`

## 배포 흐름
1. `git push` → GitHub
2. Vercel 자동 감지 → 프론트엔드 빌드·배포 (1~3분)
3. Railway는 백엔드 자동 배포 (main.py 변경 시)
