import { useNavigate } from 'react-router-dom'
import { track } from '../App'
import PageSEO from './PageSEO'

/* 학습 허브 — 문법·품사 학습 자료 모음 (개별 URL은 기존 그대로 유지: SEO 보존) */
const PRIMARY = '#5CA9CE'
const ITEMS = [
  { jp: '法', label: '핵심 문법', sub: '패턴 모아보기', path: '/grammar', key: 'grammar' },
  { jp: '動', label: '동사',      sub: 'TOP 100',     path: '/verbs',  key: 'verbs' },
  { jp: 'い', label: 'い형용사',  sub: 'TOP 100',     path: '/adj-i',  key: 'adj-i' },
  { jp: 'な', label: 'な형용사',  sub: 'TOP 100',     path: '/adj-na', key: 'adj-na' },
  { jp: '名', label: '명사',      sub: 'TOP 100',     path: '/noun',   key: 'noun' },
  { jp: '助', label: '조사',      sub: 'TOP 10',      path: '/particles', key: 'particles' },
]

export default function StudyPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageSEO
        title="일본어 학습 자료 - 핵심 문법·동사·형용사·명사·조사"
        description="일본인이 자주 쓰는 핵심 문법과 품사별 TOP100 단어를 활용표·예문과 함께 학습하세요."
        path="/study"
      />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 4px' }}>학습</h2>
      <p style={{ fontSize: 13, color: '#9aa0a6', margin: '0 2px 16px' }}>문법과 단어를 골라 학습하세요</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
        {ITEMS.map(it => (
          <button
            key={it.key}
            onClick={() => { track('tab_view', { tab: it.key }); navigate(it.path) }}
            style={{
              textAlign: 'left', background: '#fff', border: '1px solid #eaecef',
              borderRadius: 14, padding: 14, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 11, background: '#eaf4fa', color: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 500 }}>{it.jp}</div>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, fontWeight: 600, color: '#1f2937' }}>{it.label}</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9aa0a6' }}>{it.sub}</p>
          </button>
        ))}
      </div>
    </>
  )
}
