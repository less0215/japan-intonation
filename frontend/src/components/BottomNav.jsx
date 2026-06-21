import { useLocation, useNavigate } from 'react-router-dom'
import { track } from '../App'

/* 하단 탭 네비게이션 (모바일/앱) ↔ 상단 바(데스크톱)
 * 번역 / 학습 / 저장 / 프로필 — 화면 폭으로 위치 분기(App.css)
 * 학습 하위(/verbs 등)는 '학습' 탭 활성으로 처리해 SEO URL 유지
 */
const PRIMARY = '#5CA9CE'
const STUDY_PATHS = ['/study', '/verbs', '/adj-i', '/adj-na', '/noun', '/particles', '/grammar']

const TABS = [
  { key: 'translate', path: '/',        label: '번역',   icon: 'M5 8h14M5 8l3-3M5 8l3 3M19 16H5m14 0l-3-3m3 3l-3 3' },
  { key: 'study',     path: '/study',   label: '학습',   icon: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z M19 3v18' },
  { key: 'saves',     path: '/saves',   label: '저장',   icon: 'M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z' },
  { key: 'profile',   path: '/profile', label: '프로필', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const p = location.pathname

  function activeKey() {
    if (p === '/') return 'translate'
    if (STUDY_PATHS.some(sp => p === sp || p.startsWith(sp + '/'))) return 'study'
    if (p.startsWith('/saves')) return 'saves'
    if (p.startsWith('/profile')) return 'profile'
    return 'translate'
  }
  const active = activeKey()

  return (
    <nav className="bottom-nav">
      {TABS.map(t => {
        const on = active === t.key
        return (
          <button
            key={t.key}
            className="bottom-nav-item"
            onClick={() => { if (!on) track('tab_nav', { tab: t.key }); navigate(t.path) }}
            style={{ color: on ? PRIMARY : '#b3b8bd' }}
          >
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.icon} />
            </svg>
            <span>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
