/* 오노마토페 연상 아이콘 — 자체 제작 SVG(저작권 0). 키별 색 + 심플 도형.
 * 데이터의 icon 필드로 선택. 흰색 도형 + 부드러운 그라데이션 배경. */
const SET = {
  heart:    { bg: 'linear-gradient(135deg,#ffe3ea,#ffc4d2)', el: <path d="M12 21C5 16 3 12 5 8.5 6.4 6 9 6 12 9c3-3 5.6-3 7 -0.5C21 12 19 16 12 21z" fill="#ff6b89"/> },
  star:     { bg: 'linear-gradient(135deg,#fff0d6,#ffe0a8)', el: <path d="M12 3l2.4 6L21 9.6l-4.8 4 1.5 6.4L12 16.8 6.3 20l1.5-6.4L3 9.6 9.6 9z" fill="#f0a500"/> },
  smile:    { bg: 'linear-gradient(135deg,#fff6d6,#ffe79e)', el: <g fill="none" stroke="#e8a200" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.6 6.8 1.6 8 0"/><circle cx="9" cy="10" r="0.6" fill="#e8a200"/><circle cx="15" cy="10" r="0.6" fill="#e8a200"/></g> },
  anger:    { bg: 'linear-gradient(135deg,#ffe0df,#ffc1c0)', el: <g fill="#e24b4a"><path d="M5 5l4 3-4 1zM19 5l-4 3 4 1z"/><path d="M6 18c2-3 10-3 12 0" fill="none" stroke="#e24b4a" stroke-width="2" stroke-linecap="round"/></g> },
  surprise: { bg: 'linear-gradient(135deg,#ffe9d6,#ffd0a8)', el: <g fill="#e07b1f"><rect x="10.5" y="4" width="3" height="10" rx="1.5"/><circle cx="12" cy="19" r="2"/></g> },
  sparkle:  { bg: 'linear-gradient(135deg,#efeafa,#dccff5)', el: <g fill="#7a55c8"><path d="M11 3l1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6z"/><path d="M17 13l.9 2.4L20 16l-2.1.6L17 19l-.9-2.4L14 16l2.1-.6z"/></g> },
  cloud:    { bg: 'linear-gradient(135deg,#e3f1fb,#c4e0f4)', el: <path d="M7 17a4 4 0 0 1 .5-8 5 5 0 0 1 9.5 1.5 3.5 3.5 0 0 1 -.5 6.5z" fill="#5aa9d8"/> },
  shine:    { bg: 'linear-gradient(135deg,#dff5ef,#b6e6d6)', el: <g fill="#1aa888"><path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></g> },
  food:     { bg: 'linear-gradient(135deg,#f3e7d6,#e7cfa8)', el: <g fill="#c08a3e"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.3" fill="#7a531f"/><circle cx="14" cy="9" r="1.1" fill="#7a531f"/><circle cx="13" cy="14" r="1.3" fill="#7a531f"/><circle cx="9" cy="15" r="1" fill="#7a531f"/></g> },
  sleep:    { bg: 'linear-gradient(135deg,#e6e3fa,#cdc7f3)', el: <g fill="none" stroke="#6a5acd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h-5l5 6h-5"/><path d="M11 13h-3l3 4h-3"/></g> },
  clear:    { bg: 'linear-gradient(135deg,#eaf3de,#cfe6a8)', el: <g fill="none" stroke="#639922" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M3 12c3-5 15-5 18 0-3 5-15 5-18 0z"/></g> },
  check:    { bg: 'linear-gradient(135deg,#dff5ef,#b6e6d6)', el: <path d="M5 13l4 4 10-11" fill="none" stroke="#1aa888" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/> },
  gradual:  { bg: 'linear-gradient(135deg,#dff0fa,#b8d8ee)', el: <g fill="#2a8fb8"><rect x="4" y="15" width="3.5" height="5" rx="1"/><rect x="10" y="11" width="3.5" height="9" rx="1"/><rect x="16" y="6" width="3.5" height="14" rx="1"/></g> },
  sound:    { bg: 'linear-gradient(135deg,#eef1f3,#d6dbe0)', el: <g fill="none" stroke="#5f6b73" stroke-width="2" stroke-linecap="round"><path d="M5 12h2M17 12h2"/><path d="M8 8v8M12 5v14M16 8v8"/></g> },
  dog:      { bg: 'linear-gradient(135deg,#f3e7d6,#e7cfa8)', el: <g fill="#a06a35"><circle cx="12" cy="15" r="4"/><circle cx="6.5" cy="10" r="2"/><circle cx="17.5" cy="10" r="2"/><circle cx="9" cy="6.5" r="1.8"/><circle cx="15" cy="6.5" r="1.8"/></g> },
}

export default function OnomatopeIcon({ icon, size = 56, radius = 16 }) {
  const it = SET[icon] || SET.star
  return (
    <div style={{ flexShrink: 0, width: size, height: size, borderRadius: radius, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={Math.round(size * 0.56)} height={Math.round(size * 0.56)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">{it.el}</svg>
    </div>
  )
}
