"""
모든 data/*.js 파일의 pattern.note를 Gemini로 상세하게 재생성하는 스크립트.

실행:
    GEMINI_API_KEY=... python regen_notes.py

각 note는 두 줄 포맷으로 생성:
  1줄: 핵심 문법 규칙 (간결하게)
  2줄: 이 예문에 어떻게 적용됐는지 (plain 문장 참고)
"""

import os
import re
import sys
import time
from google import genai

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("GEMINI_API_KEY 환경변수를 설정해주세요.", file=sys.stderr)
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

PROMPT_TEMPLATE = """일본어 학습 앱의 예문 문법 설명을 작성해줘.

예문 정보:
- 일본어 문장: {plain}
- 한국어 뜻: {korean}
- 패턴 이름: {pattern_name}
- 패턴 의미: {pattern_meaning}
- 현재 설명: {current_note}

다음 형식으로 정확히 두 줄만 출력해 (다른 말 일절 없이):
1줄: 핵심 문법 규칙 (한 문장, 조사/활용 원리 설명)
2줄: 위 일본어 문장에서 어떻게 쓰였는지 (문장의 실제 단어를 괄호 안에 인용하며 설명)

예시 출력:
な형용사+に: 동사(구)를 꾸밀 때 쓰는 부사형.
確かに가 そう言った(그렇게 말했다) 전체를 꾸며 '확실히 그렇게 말했다'는 뜻이 됨.

주의: 두 줄 외 아무것도 출력하지 말 것."""

DATA_FILES = [
    "frontend/src/data/adjNa.js",
    "frontend/src/data/adjI.js",
    "frontend/src/data/verbs.js",
    "frontend/src/data/nouns.js",
    "frontend/src/data/particles.js",
]

# note: '...' 또는 note: "..." 패턴 매칭 (여러 줄 포함 가능성 고려)
NOTE_PATTERN = re.compile(r"(note:\s*')((?:[^'\\]|\\.)*)(')")


def call_gemini(plain: str, korean: str, pattern_name: str, pattern_meaning: str, current_note: str) -> str:
    prompt = PROMPT_TEMPLATE.format(
        plain=plain,
        korean=korean,
        pattern_name=pattern_name,
        pattern_meaning=pattern_meaning,
        current_note=current_note,
    )
    for attempt in range(3):
        try:
            resp = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt,
                config=genai.types.GenerateContentConfig(
                    thinking_config=genai.types.ThinkingConfig(thinking_budget=0),
                ),
            )
            text = resp.text.strip()
            # 두 줄 초과면 첫 두 줄만 사용
            lines = [l for l in text.splitlines() if l.strip()]
            return "\n".join(lines[:2])
        except Exception as e:
            err = str(e)
            if "429" in err or "RESOURCE_EXHAUSTED" in err:
                print(f"  Rate limit, {30}초 대기...", file=sys.stderr)
                time.sleep(30)
            else:
                print(f"  Gemini 오류 (시도 {attempt+1}/3): {err[:80]}", file=sys.stderr)
                time.sleep(2)
    return current_note  # 실패 시 원본 유지


def process_file(filepath: str):
    with open(filepath, encoding="utf-8") as f:
        content = f.read()

    # 각 예문 블록 추출: korean, plain, pattern { name, meaning, note } 를 함께 찾기
    # 예문 블록 단위로 파싱
    example_pattern = re.compile(
        r"(\{[^{}]*?korean:\s*'([^']*)'[^{}]*?plain:\s*'([^']*)'[^{}]*?pattern:\s*\{[^{}]*?name:\s*'([^']*)'[^{}]*?meaning:\s*'([^']*)'[^{}]*?note:\s*'([^']*)'[^{}]*?\}[^{}]*?\})",
        re.DOTALL,
    )

    total = len(NOTE_PATTERN.findall(content))
    print(f"\n{'='*50}")
    print(f"파일: {filepath}  (note {total}개)")
    print(f"{'='*50}")

    new_content = content
    matches = list(example_pattern.finditer(content))
    processed = 0

    for m in matches:
        full_block = m.group(1)
        korean = m.group(2)
        plain = m.group(3)
        pattern_name = m.group(4)
        pattern_meaning = m.group(5)
        current_note = m.group(6)

        print(f"  [{processed+1}/{len(matches)}] {pattern_name} / {plain[:30]}...")

        new_note = call_gemini(plain, korean, pattern_name, pattern_meaning, current_note)
        print(f"    → {new_note[:80]}")

        # 해당 블록 내의 note만 교체 (이스케이프 처리)
        escaped_note = current_note.replace("\\", "\\\\").replace("'", "\\'")
        new_escaped = new_note.replace("\\", "\\\\").replace("'", "\\'")

        # 해당 블록에서만 note 교체
        new_block = full_block.replace(
            f"note: '{current_note}'",
            f"note: '{new_note}'",
            1,
        )
        new_content = new_content.replace(full_block, new_block, 1)
        processed += 1

        # Rate limit 방지
        time.sleep(0.3)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  ✓ {processed}개 처리 완료 → {filepath}")


if __name__ == "__main__":
    base = os.path.dirname(os.path.abspath(__file__))

    target_files = sys.argv[1:] if len(sys.argv) > 1 else DATA_FILES

    for rel_path in target_files:
        filepath = os.path.join(base, rel_path)
        if not os.path.exists(filepath):
            print(f"파일 없음: {filepath}", file=sys.stderr)
            continue
        process_file(filepath)

    print("\n✅ 전체 완료")
