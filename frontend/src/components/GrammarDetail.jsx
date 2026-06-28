import { useNavigate } from 'react-router-dom'
import { GRAMMAR } from '../data/grammar'
import WordBookmarkButton from './WordBookmarkButton'
import RubyText from './RubyText'
import RichExampleBox from './RichExampleBox'
import HiraganaTable from './HiraganaTable'
import VerbConjugationTable from './VerbConjugationTable'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'

const PRIMARY  = '#5CA9CE'

/* ── 메인 컴포넌트 ── */
export default function GrammarDetail({ pattern }) {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 헤더 카드 */}
      <div className="card" style={{ padding: '24px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: '#5CA9CE', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.1 }}>
              {pattern.pattern}
            </span>
            <span style={{ fontSize: 16, color: 'var(--text-3)' }}>({pattern.reading})</span>
          </div>
          <WordBookmarkButton wordInfo={{ id: pattern.id, category: 'grammar', word: pattern.pattern, reading: pattern.reading, meaning: pattern.meanings[0] ?? '' }} saveLabel="이 문법 저장" savedLabel="문법 저장됨" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {pattern.meanings.map((m, i) => (
            <span key={i} className="particle-meaning-tag">{m}</span>
          ))}
        </div>
      </div>

      {/* 접속·설명 카드 */}
      <div className="card">
        <div className="section">
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: PRIMARY, letterSpacing: 0.3 }}>접속</p>
            <div style={{ margin: '6px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {pattern.connection.split(/\s*\/\s*/).filter(Boolean).map((c, i) => (
                <p key={i} style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', fontFamily: "'Noto Sans JP', sans-serif", lineHeight: 1.55 }}>
                  {c.trim()}
                </p>
              ))}
            </div>
          </div>
          {pattern.explanation && (
            <div style={{ margin: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {pattern.explanation.split(/\n+|(?<=[.!?。])\s+/).map(s => s.trim()).filter(Boolean).map((s, i) => (
                <p key={i} style={{ margin: 0, fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.7 }}>
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 용법 카드들 */}
      {pattern.usages.map((usage, i) => (
        <div key={i} className="card" id={i === 0 ? 'examples-section' : undefined}>
          <div className="section">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
              <span className={`particle-section-badge particle-section-badge--${usage.type}`}>
                {usage.type === 'basic' ? '기본' : '응용'}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.5 }}>
                {usage.meaning}
              </span>
            </div>
            <RichExampleBox
              example={usage.example}
              exampleInfo={{
                id: `grammar_${pattern.id}_${i}`,
                wordId: pattern.id,
                wordText: pattern.pattern,
                wordReading: pattern.reading,
                wordCategory: 'grammar',
                exampleJp: usage.example.jp?.replace(/[（(][^）)]+[）)]/g, '') ?? '',
                exampleKr: usage.example.kr ?? '',
              }}
            />
            <p className="particle-note">
              <RubyText text={usage.note} fontSize={13} />
            </p>
          </div>
        </div>
      ))}

      {/* 예문 박스 묶음 하단 인피드 광고 */}
      {/* TODO: 전용 in-feed 슬롯 생성 후 교체 */}
      {!isAdFreeMember() && <AdSenseUnit slot="2450758307" style={{ margin: '12px 0' }} />}

      {/* 참고자료 — 오십음도 + 동사 그룹별 활용표 */}
      <HiraganaTable defaultOpen={true} />
      <VerbConjugationTable defaultOpen={false} />

      {/* 문법 목록으로 — 부모 gap(16)로 위 간격 통일, 아래만 살짝 여유 */}
      <button
        onClick={() => navigate('/grammar')}
        className="particle-nav-btn"
        style={{ width: '100%', height: 52, marginBottom: 8 }}
      >
        다른 문법 보기 →
      </button>

    </div>
  )
}
