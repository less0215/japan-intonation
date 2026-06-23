import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import OnomatopeIcon from './OnomatopeIcon'
import JlptBadge from './JlptBadge'
import { ONOMATOPE } from '../data/onomatope'

const PRIMARY = '#5CA9CE'
const LEVEL_ORDER = ['N5', 'N4', 'N3', 'N2', 'N1']
// 데이터에 존재하는 레벨만 탭으로 (없으면 제외)
const LEVELS = LEVEL_ORDER.filter(l => ONOMATOPE.some(o => o.jlpt === l))
const TABS = ['전체', ...LEVELS]

export default function OnomatopeLibrary() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('전체')
  const items = tab === '전체' ? ONOMATOPE : ONOMATOPE.filter(o => o.jlpt === tab)

  return (
    <>
      <PageSEO
        title="일본어 의성어·의태어 자주 쓰는 표현 (JLPT별)"
        description="ドキドキ·キラキラ·ふわふわ 등 일본인이 자주 쓰는 의성어·의태어를 뜻·예문·발음·JLPT 레벨과 함께 정리했습니다."
        path="/onomatope"
      />

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 3px' }}>의성어·의태어</h2>
      <p style={{ margin: '0 2px 2px', fontSize: 12.5, color: '#9aa0a6' }}>일본인이 자주 쓰는 의성어·의태어</p>
      <p style={{ margin: '0 2px 12px', fontSize: 10.5, color: '#c2c7cc' }}>
        학습 빈도 참고 · JLPT 레벨은 Tanos(CC BY) 기준이며 일부는 근접 추정값입니다.
      </p>

      {/* JLPT 탭 */}
      <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4, margin: '0 -2px 12px' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: '0 0 auto', fontFamily: 'inherit', cursor: 'pointer', fontSize: 12.5, fontWeight: 600,
            padding: '6px 14px', borderRadius: 999,
            border: `1px solid ${tab === t ? PRIMARY : '#e3e7ea'}`,
            background: tab === t ? PRIMARY : '#fff', color: tab === t ? '#fff' : '#6b7177',
          }}>{t}</button>
        ))}
      </div>

      {/* 목록 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(o => (
          <button key={o.id} onClick={() => navigate(`/onomatope/${o.id}`)} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
            background: '#fff', border: '1px solid #eaecef', borderRadius: 14, padding: '11px 12px', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <OnomatopeIcon icon={o.icon} size={48} radius={13} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 18, fontWeight: 600, color: '#111' }}>{o.word}</span>
                <span style={{ fontSize: 12, color: PRIMARY, fontWeight: 600 }}>{o.reading}</span>
                <JlptBadge level={o.jlpt} style={{ fontSize: 10, padding: '1px 6px' }} />
              </div>
              <p style={{ margin: '3px 0 0', fontSize: 12.5, color: '#555' }}>{o.meaning} <span style={{ color: '#b6bcc1', fontSize: 11 }}>· {o.category}</span></p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2c7cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        ))}
      </div>
    </>
  )
}
