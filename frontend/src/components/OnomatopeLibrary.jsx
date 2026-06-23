import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import OnomatopeIcon from './OnomatopeIcon'
import JlptBadge from './JlptBadge'
import { ONOMATOPE, ONOMATOPE_CATEGORIES } from '../data/onomatope'

const PRIMARY = '#5CA9CE'

export default function OnomatopeLibrary() {
  const navigate = useNavigate()
  const [cat, setCat] = useState('전체')
  const items = cat === '전체' ? ONOMATOPE : ONOMATOPE.filter(o => o.category === cat)

  return (
    <>
      <PageSEO
        title="일본어 오노마토페(의성어·의태어) 자주 쓰는 표현"
        description="ドキドキ·キラキラ·ふわふわ 등 일본인이 자주 쓰는 오노마토페(의성어·의태어)를 뜻·예문·발음·JLPT 레벨과 함께 정리했습니다."
        path="/onomatope"
      />

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 4px' }}>오노마토페</h2>
      <p style={{ margin: '0 2px 12px', fontSize: 12.5, color: '#9aa0a6' }}>일본인이 자주 쓰는 의성어·의태어</p>

      {/* 카테고리 필터 */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, margin: '0 -2px 12px' }}>
        {ONOMATOPE_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            flex: '0 0 auto', fontFamily: 'inherit', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
            padding: '6px 13px', borderRadius: 999,
            border: `1px solid ${cat === c ? PRIMARY : '#e3e7ea'}`,
            background: cat === c ? PRIMARY : '#fff', color: cat === c ? '#fff' : '#6b7177',
          }}>{c}</button>
        ))}
      </div>

      {/* 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map(o => (
          <button key={o.id} onClick={() => navigate(`/onomatope/${o.id}`)} style={{
            display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left',
            background: '#fff', border: '1px solid #eaecef', borderRadius: 14, padding: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <OnomatopeIcon icon={o.icon} size={50} radius={14} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 19, fontWeight: 600, color: '#111' }}>{o.word}</span>
                <span style={{ fontSize: 12.5, color: PRIMARY, fontWeight: 600 }}>{o.reading}</span>
                <JlptBadge level={o.jlpt} style={{ fontSize: 10, padding: '1px 6px' }} />
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: '#555' }}>{o.meaning} <span style={{ color: '#b6bcc1', fontSize: 11 }}>· {o.category}</span></p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2c7cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        ))}
      </div>
    </>
  )
}
