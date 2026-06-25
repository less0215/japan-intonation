import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import JapanMiniMap from './JapanMiniMap'
import { LIVECAMS } from '../data/livecams'
import LiveCamHopPopup from './LiveCamHopPopup'
import { isAdFreeMember } from '../ads'

const PRIMARY = '#5CA9CE'
const isApp = window.Capacitor?.isNativePlatform?.() ?? false

/* /live/:city — 라이브캠 상세
 * 첫 도시 진입은 바로 영상. '다른 도시도 둘러보기'에서 다른 도시 탭 시,
 * 광고제거 회원이 아니면 '이동할 도시' 마이리얼트립 추천 팝업(웹·앱 공통, 애드몹 없음) 후 이동. */
export default function LiveCamDetailPage() {
  const { city } = useParams()
  const navigate = useNavigate()
  const cam = LIVECAMS.find(c => c.id === city)

  const [pendingCity, setPendingCity] = useState(null)   // 광고 후 이동할 도시 id

  if (!cam) return <Navigate to="/live" replace />

  const others = LIVECAMS.filter(c => c.id !== city)

  // 해당 도시로 이동 (애드몹 광고 없음)
  function goToCity(id) {
    if (!id) return
    setPendingCity(null)
    try { window.gtag?.('event', 'livecam_hop', { to: id }) } catch {}
    navigate(`/live/${id}`)
    window.scrollTo(0, 0)
  }
  // 다른 도시 탭 — 광고제거 회원이 아니면(웹·앱 공통) '이동할 도시 관련 추천' 팝업 거쳐 이동
  // (매칭 상품 없으면 팝업이 알아서 바로 이동). 구독(광고제거) 회원은 모달 없이 바로 이동.
  function handleHop(targetId) {
    if (!isAdFreeMember()) setPendingCity(targetId)
    else goToCity(targetId)
  }

  // mute=1 + playsinline 으로 인앱 자동재생(소리는 사용자가 켬)
  // 앱(Capacitor)에서는 capacitor:// 출처가 유튜브 임베드에 막혀(오류 153) 재생이 안 됨 →
  // tickjapan.com의 영상 전용 프록시 페이지를 통해 https 출처로 로드한다(웹은 직접 임베드).
  const ytEmbed = `https://www.youtube-nocookie.com/embed/${cam.videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
  const embed = isApp ? `https://tickjapan.com/live-embed.html?v=${cam.videoId}` : ytEmbed

  return (
    <>
      <PageSEO
        title={`${cam.city} 실시간 라이브캠 — ${cam.spot} | 지금 일본 날씨는?`}
        description={`${cam.city}(${cam.cityJp}) ${cam.spot}의 실시간 라이브캠. 현지 날씨와 거리 풍경을 인앱에서 바로 확인하세요. 출처 ${cam.channel}.`}
        path={`/live/${cam.id}`}
      />
      {/* 구조화 데이터(VideoObject) — SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'VideoObject',
        name: `${cam.city} ${cam.spot} 실시간 라이브캠`,
        description: cam.desc,
        thumbnailUrl: [`https://i.ytimg.com/vi/${cam.videoId}/hqdefault.jpg`],
        embedUrl: `https://www.youtube.com/embed/${cam.videoId}`,
        uploadDate: '2024-01-01', publisher: { '@type': 'Organization', name: cam.channel },
      }) }} />

      <button onClick={() => navigate('/live')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: '2px 0 10px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        지금 일본 날씨는?
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>{cam.city}</span>
        <span style={{ fontSize: 11, color: '#0F6E56', background: '#E1F5EE', borderRadius: 999, padding: '2px 8px' }}>{cam.region}</span>
        <span style={{ fontSize: 11, color: '#e24b4a', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e24b4a', display: 'inline-block' }} /> LIVE
        </span>
      </div>

      {/* 출처 — 영상 캡션(영상에 바로 붙임) */}
      <p style={{ margin: '0 2px 4px', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.4 }}>
        출처: {cam.channel} · YouTube 공개 라이브 · 자동재생은 음소거 상태
      </p>

      {/* ① 영상 (16:9) */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#11161b', borderRadius: 12, overflow: 'hidden' }}>
        <iframe
          title={`${cam.city} 라이브캠`}
          src={embed}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
        />
      </div>
      {/* ① 영상 설명 카드 — 영상에 바로 붙임 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: '13px 14px', marginTop: 5 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{cam.spot}</p>
        <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{cam.desc}</p>
      </div>

      {/* ② 지도 (크게) — 영상과 같은 블록 구조로 반복 */}
      {cam.where && (
        <>
          <div style={{ position: 'relative', width: '100%', background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 12, marginTop: 22, padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 188, height: 238 }}>
              <JapanMiniMap marker={cam.marker} label={cam.city} region={cam.regionId} />
            </div>
            {/* 범례 — 우측 하단(5시 방향) */}
            <div style={{ position: 'absolute', right: 14, bottom: 13 }}>
              <p style={{ margin: '0 0 6px', fontSize: 11.5, fontWeight: 700, color: 'var(--text-1)' }}>{cam.region}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: 3, background: '#5CA9CE', display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{cam.city}가 속한 지방</span>
              </div>
            </div>
          </div>
          {/* ② 위치 설명 카드 — 지도에 바로 붙임 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: '13px 14px', marginTop: 5 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
              {cam.where}
              <span style={{ color: 'var(--text-3)', fontWeight: 400 }}> · {cam.cityJp}</span>
              <span style={{ color: 'var(--text-3)', fontWeight: 400, fontSize: 10.5 }}> {cam.cityKana} · {cam.city}</span>
            </p>
            <p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{cam.whereSub}</p>
          </div>
        </>
      )}

      {/* ③ 다른 도시도 둘러보기 — 도시 이동 시 맥락 제휴가 자연스럽게 이어 노출됨 */}
      {others.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ margin: '0 2px 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-3)' }}>다른 도시도 둘러보기</p>
          <div style={{ display: 'flex', gap: 9, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2, margin: '0 -2px' }}>
            {others.map(o => (
              <button key={o.id} onClick={() => handleHop(o.id)} style={{ flex: '0 0 116px', textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 13, padding: 9, cursor: 'pointer', fontFamily: 'inherit' }}>
                <div style={{ width: '100%', height: 64, borderRadius: 9, backgroundColor: '#11161b', backgroundImage: `url('https://i.ytimg.com/vi/${o.videoId}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: 4, left: 5, fontSize: 7.5, fontWeight: 700, color: '#fff', background: '#e24b4a', borderRadius: 3, padding: '0 3px' }}>LIVE</span>
                </div>
                <p style={{ margin: '7px 0 0', fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{o.city}</p>
                <p style={{ margin: '1px 0 0', fontSize: 10.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.spot}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 다른 도시 이동 — '이동할 도시' 맥락 여행 추천 팝업(애드몹 광고 없음). 매칭 없으면 바로 이동 */}
      {pendingCity && (
        <LiveCamHopPopup
          cam={LIVECAMS.find(c => c.id === pendingCity)}
          onGo={() => goToCity(pendingCity)}
          onClose={() => { setPendingCity(null); try { window.gtag?.('event', 'livecam_hop_dismissed') } catch {} }}
        />
      )}
    </>
  )
}
