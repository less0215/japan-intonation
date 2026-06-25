#!/bin/bash
# 아카이브 전 iOS 웹 번들 동기화 + 검증.  사용:  bash frontend/sync-ios.sh
set -e
cd "$(dirname "$0")"
echo "▶ 웹 빌드..."; npm run build
echo "▶ iOS 동기화..."; npx cap copy ios
if grep -rq "출시 할인" ios/App/App/public/assets/*.js 2>/dev/null; then
  echo "✅ 최신 번들 OK(베타 제거 포함). Xcode에서 아카이브하세요."
else
  echo "❌ 번들이 최신이 아님 — 아카이브 금지. 알려주세요."; exit 1
fi
