import { useNavigate } from 'react-router-dom'
import { track } from '../App'
import PageSEO from './PageSEO'
import CategoryBars from './CategoryBars'

/* 학습 허브 — 문법·품사 학습 자료를 전체폭 바로 펼쳐서 표시 (개별 URL 유지: SEO 보존) */
export default function StudyPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageSEO
        title="일본어 학습 자료 - 핵심 문법·동사·형용사·명사·조사"
        description="일본인이 자주 쓰는 핵심 문법과 품사별 TOP100 단어를 활용표·예문과 함께 학습하세요."
        path="/study"
      />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '4px 2px 2px' }}>학습</h2>
      <p style={{ fontSize: 13, color: '#9aa0a6', margin: '0 2px 14px' }}>문법과 단어를 골라 학습하세요</p>
      <CategoryBars current={null} onNavigate={(path) => { track('tab_view', { from: 'study' }); navigate(path) }} />
    </>
  )
}
