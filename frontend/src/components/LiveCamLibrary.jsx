import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSEO from './PageSEO'
import { LIVECAMS, LIVECAM_REGIONS } from '../data/livecams'
import AdSenseUnit from './AdSenseUnit'
import { isAdFreeMember } from '../ads'

const PRIMARY = '#5CA9CE'

/* /live — 지금 일본 날씨는? (라이브캠 목록, 지역 칩 그룹) */
export default function LiveCamLibrary() {
  const navigate = useNavigate()
  // 데이터에 존재하는 지역만, 정의된 순서대로
  const regions = LIVECAM_REGIONS.filter(r => LIVECAMS.some(c => c.region === r))

  return (
    <>
      <PageSEO
        title="지금 일본 날씨는? 일본 도시별 실시간 라이브캠"
        description="후쿠오카·하카타역 등 일본 주요 도시의 실시간 라이브캠으로 현지 날씨와 거리 풍경을 인앱에서 바로 확인하세요."
        path="/live"
      />

      <div style={{ margin: '4px 2px 20px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>지금 일본 날씨는?</h2>
        <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.45 }}>
          일본 도시별 실시간 라이브캠으로 현지 날씨·거리를 바로 확인
        </p>
        <p style={{ margin: '3px 0 0', fontSize: 10.5, color: 'var(--text-3)', lineHeight: 1.45 }}>
          각 원본 YouTube 채널의 공개 라이브 스트림을 출처와 함께 보여드리며, 스트림 상황에 따라 재생이 잠시 끊길 수 있어요.
        </p>
      </div>

      {regions.map((region, index) => (
        <Fragment key={region}>
        <div style={{ marginBottom: 18 }}>
          <p style={{ margin: '0 2px 6px', fontSize: 12, fontWeight: 600, color: '#0F6E56' }}>{region}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LIVECAMS.filter(c => c.region === region).map(c => (
              <button key={c.id} onClick={() => navigate(`/live/${c.id}`)} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
                background: 'var(--surface)', border: '1px solid var(--bd)', borderRadius: 14, padding: '12px', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <div style={{ flexShrink: 0, width: 56, height: 42, borderRadius: 9, backgroundColor: '#11161b', backgroundImage: `url('https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><polygon points="9 7 9 17 17 12" /></svg>
                  </span>
                  <span style={{ position: 'absolute', top: 3, left: 4, fontSize: 7.5, fontWeight: 700, color: '#fff', background: '#e24b4a', borderRadius: 3, padding: '0 3px', letterSpacing: '0.3px' }}>LIVE</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{c.city}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.cityJp}</span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-2)' }}>{c.spot} <span style={{ color: 'var(--text-3)' }}>· 24시간</span></p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2c7cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            ))}
          </div>
        </div>
        {/* 첫 번째 지역 그룹 뒤에 인피드 광고 1개 */}
        {index === 0 && !isAdFreeMember() && (
          // TODO: 전용 in-feed 슬롯 생성 후 교체
          <AdSenseUnit slot="2450758307" style={{ margin: '12px 0' }} />
        )}
        </Fragment>
      ))}
    </>
  )
}
