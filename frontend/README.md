# 일본어 악센트 분석기

한국어 문장을 입력하면 일본어 번역 + 피치 악센트 그래프를 보여주는 웹앱입니다.

## 구성

```
백엔드  FastAPI   → main.py        (포트 8000)
프론트  React     → frontend/      (포트 5173)
```

## 실행 방법

### 1. 백엔드 실행

```bash
# 프로젝트 루트에서
pip3 install fastapi uvicorn anthropic requests beautifulsoup4

export ANTHROPIC_API_KEY=sk-ant-...

python3 -m uvicorn main:app --reload --port 8000
```

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /health | 서버 상태 확인 |
| POST | /analyze | 한국어 → 일본어 번역 + 악센트 분석 |

## 파일 구조

```
src/
  App.jsx                  # 메인 앱 (상태 관리, API 호출)
  App.css                  # 전역 스타일
  components/
    SearchBar.jsx           # 입력창 + 분석 버튼
    ResultCard.jsx          # 결과 카드 (3개 섹션)
    PitchGraph.jsx          # SVG 피치 악센트 그래프
    CopyButton.jsx          # 복사 버튼 (체크 피드백)
```
