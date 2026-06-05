import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ADJ_I, CONJ_LABELS as ADJ_I_LABELS } from '../data/adjI'
import { ADJ_NA, CONJ_LABELS as ADJ_NA_LABELS } from '../data/adjNa'
import { NOUNS } from '../data/nouns'
import PitchGraph from './PitchGraph'

const PRIMARY = '#5CA9CE'

const DATA_MAP = {
  'adj-i':  { items: ADJ_I,  labels: ADJ_I_LABELS,  partOfSpeech: 'い형용사' },
  'adj-na': { items: ADJ_NA, labels: ADJ_NA_LABELS,  partOfSpeech: 'な형용사' },
  'noun':   { items: NOUNS,  labels: null,           partOfSpeech: '명사' },
}

export default function WordDetailPage({ wordType }) {
  const { id }   = useParams()
  const navigate = useNavigate()
  const config   = DATA_MAP[wordType]
  const word     = config?.items.find(v => v.id === id)

  if (!word) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        단어를 찾을 수 없어요.
      </div>
    )
  }

  return (
    <WordDetail
      word={word}
      wordType={wordType}
      partOfSpeech={config.partOfSpeech}
      conjLabels={config.labels}
      onBack={() => navigate(`/${wordType}`)}
    />
  )
}

function WordDetail({ word, wordType, partOfSpeech, conjLabels, onBack }) {
  const [style, setStyle] = useState('formal')

  const hasContent = word.conjugations !== null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 뒤로 가기 */}
      <button
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
          height: 32, padding: '0 12px', borderRadius: 8,
          fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          cursor: 'pointer',
          border: '1.5px solid #e8e8e8',
          backgroundColor: '#ffffff',
          color: '#666',
          display: 'flex', alignItems: 'center', gap: 4,
        }}
      >
        ← 목록으로
      </button>

      {/* 헤더 카드 */}
      <div style={{
        background: `linear-gradient(135deg, ${PRIMARY}18 0%, ${PRIMARY}08 100%)`,
        border: `1.5px solid ${PRIMARY}33`,
        borderRadius: 14,
        padding: '18px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: PRIMARY,
            background: `${PRIMARY}18`, borderRadius: 8, padding: '2px 8px',
          }}>
            {partOfSpeech} #{word.rank}위
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: 36, fontWeight: 500, fontFamily: "'Noto Sans JP', sans-serif" }}>
            {word.verb}
          </span>
          <span style={{ fontSize: 16, color: PRIMARY, fontWeight: 600 }}>
            {word.reading}
          </span>
        </div>
        <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>
          {word.meaning}
        </div>
      </div>

      {/* 데이터 없음 (rank 11+) */}
      {!hasContent && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '48px 20px',
          background: '#fafafa',
          borderRadius: 14,
          border: '1.5px dashed #e0e0e0',
        }}>
          <span style={{ fontSize: 32, marginBottom: 12 }}>🚧</span>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#555', margin: '0 0 6px' }}>
            곧 업데이트 됩니다
          </p>
          <p style={{ fontSize: 13, color: '#aaa', margin: 0 }}>
            이 단어의 활용 데이터를 준비 중이에요.
          </p>
        </div>
      )}

      {/* 활용형 테이블 */}
      {hasContent && conjLabels && (
        <div style={{ background: '#fff', border: '1.5px solid #e8e8e8', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 0', display: 'flex', gap: 8 }}>
            {['formal', 'plain'].map(s => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                style={{
                  height: 30, padding: '0 12px', borderRadius: 15,
                  fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
                  cursor: 'pointer',
                  border: style === s ? 'none' : '1.5px solid #e8e8e8',
                  backgroundColor: style === s ? PRIMARY : '#fff',
                  color: style === s ? '#fff' : '#888',
                }}
              >
                {s === 'formal' ? '정중체 (です·ます)' : '보통체'}
              </button>
            ))}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <tbody>
              {conjLabels.map((label, i) => {
                const row = word.conjugations[style]?.[i]
                return (
                  <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 16px', fontSize: 11, color: '#aaa', width: '36%' }}>
                      {label}
                    </td>
                    <td style={{ padding: '10px 8px', fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14 }}>
                      {row?.text ?? '—'}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: PRIMARY }}>
                      {row?.ruby ?? ''}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 명사: 패턴 테이블 */}
      {hasContent && !conjLabels && word.conjugations && (
        <div style={{ background: '#fff', border: '1.5px solid #e8e8e8', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', fontWeight: 700, fontSize: 13, borderBottom: '1px solid #f0f0f0' }}>
            자주 쓰는 표현
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[...word.conjugations.formal, ...word.conjugations.plain].slice(0, 8).map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 16px', fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, width: '50%' }}>
                    {row.text}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: 12, color: PRIMARY }}>
                    {row.ruby}
                  </td>
                  <td style={{ padding: '10px 16px', fontSize: 12, color: '#888' }}>
                    {row.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 예문 */}
      {hasContent && word.examples?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#444' }}>예문</div>
          {word.examples.map((ex, i) => (
            <ExampleCard key={i} ex={ex} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function ExampleCard({ ex, index }) {
  const [showPitch, setShowPitch] = useState(false)

  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #e8e8e8',
      borderRadius: 14,
      padding: '14px 16px',
    }}>
      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>예문 {index + 1}</div>

      {/* 한국어 */}
      <div style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>🇰🇷 {ex.korean}</div>

      {/* 일본어 */}
      <div style={{ fontSize: 17, fontFamily: "'Noto Sans JP', sans-serif", marginBottom: 4 }}>
        🇯🇵 {ex.japanese}
      </div>

      {/* 읽기 */}
      <div style={{ fontSize: 12, color: PRIMARY, marginBottom: 10 }}>
        {ex.reading}
      </div>

      {/* 패턴 */}
      {ex.pattern && (
        <div style={{
          background: `${PRIMARY}0d`,
          border: `1px solid ${PRIMARY}33`,
          borderRadius: 8,
          padding: '8px 12px',
          marginBottom: 10,
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: PRIMARY }}>{ex.pattern.name}</span>
          <span style={{ fontSize: 12, color: '#666', marginLeft: 8 }}>— {ex.pattern.meaning}</span>
          {ex.pattern.note && (
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 3 }}>{ex.pattern.note}</div>
          )}
        </div>
      )}

      {/* 피치 그래프 토글 */}
      {ex.accentData && ex.accentData.length > 0 && (
        <>
          <button
            onClick={() => setShowPitch(v => !v)}
            style={{
              height: 26, padding: '0 10px', borderRadius: 13,
              fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
              cursor: 'pointer',
              border: `1.5px solid ${PRIMARY}55`,
              backgroundColor: showPitch ? `${PRIMARY}20` : '#fff',
              color: PRIMARY,
            }}
          >
            {showPitch ? '▲ 피치 숨기기' : '▼ 피치 보기'}
          </button>
          {showPitch && (
            <div style={{ marginTop: 10 }}>
              <PitchGraph
                phrases={ex.accentData}
                furigana={ex.furigana}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
