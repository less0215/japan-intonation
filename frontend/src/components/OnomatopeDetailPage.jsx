import { useParams, useNavigate, Navigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import OnomatopeIcon from './OnomatopeIcon'
import JlptBadge from './JlptBadge'
import { ONOMATOPE } from '../data/onomatope'

const PRIMARY = '#5CA9CE'

export default function OnomatopeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const o = ONOMATOPE.find(x => x.id === id)
  if (!o) return <Navigate to="/onomatope" replace />

  return (
    <>
      <PageSEO
        title={`${o.word} (${o.reading}) — 뜻·예문 | 일본어 오노마토페`}
        description={`${o.word}(${o.reading}): ${o.meaning}. ${o.sub}. 예문·발음·JLPT 레벨과 함께 배우세요.`}
        path={`/onomatope/${o.id}`}
      />

      <button onClick={() => navigate('/onomatope')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#8a9197', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 10px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        의성어·의태어
      </button>

      {/* 헤더 */}
      <div style={{ background: '#fff', border: '1px solid #eaecef', borderRadius: 16, padding: '16px 18px 14px' }}>
        <div style={{ display: 'flex', gap: 7, marginBottom: 12 }}>
          <JlptBadge level={o.jlpt} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#5f6b73', background: '#eef1f3', borderRadius: 6, padding: '3px 9px' }}>{o.category}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <OnomatopeIcon icon={o.icon} size={72} radius={18} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 30, fontWeight: 700, color: '#111', letterSpacing: '-0.5px' }}>{o.word}</span>
              <span style={{ fontSize: 14, color: PRIMARY, fontWeight: 600 }}>{o.kana} · {o.reading}</span>
            </div>
            <p style={{ margin: '5px 0 0', fontSize: 14.5, color: '#333' }}>{o.meaning} {o.sub && <span style={{ color: '#9aa0a6', fontSize: 12.5 }}>— {o.sub}</span>}</p>
          </div>
        </div>

        {o.usage && (
          <div style={{ marginTop: 12, background: '#f4fafd', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ margin: 0, fontSize: 12.5, color: '#3a6f8a' }}><b style={{ fontWeight: 600 }}>활용</b> · <span style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>{o.usage}</span></p>
          </div>
        )}
      </div>

      {/* 예문 */}
      <p style={{ margin: '16px 2px 8px', fontSize: 13, fontWeight: 600, color: '#8a9197' }}>예문</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {o.examples.map((ex, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #eaecef', borderRadius: 14, padding: '13px 14px' }}>
            <p style={{ margin: '0 0 4px', fontSize: 12.5, color: PRIMARY, fontWeight: 700 }}>{ex.korean}</p>
            <p style={{ margin: '0 0 3px', fontFamily: "'Noto Sans JP', sans-serif", fontSize: 15, color: '#111' }}>{ex.japanese}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#9aa0a6' }}>{ex.reading}</p>
          </div>
        ))}
      </div>

      <p style={{ margin: '14px 2px 0', fontSize: 10.5, color: '#c2c7cc' }}>JLPT 레벨은 Tanos(비공식 표준, CC BY) 기준 참고값이며, 리스트에 없는 단어는 표시되지 않습니다.</p>
    </>
  )
}
