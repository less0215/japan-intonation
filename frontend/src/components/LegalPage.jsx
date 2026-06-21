/* 개인정보처리방침 / 이용약관 페이지 */

const PRIMARY = '#5CA9CE'

const UPDATED_DATE = '2026년 6월 1일'
const COMPANY_NAME = '틱재팬'
const CONTACT_EMAIL = 'mgz.less@gmail.com'

/* ── 섹션 컴포넌트 */
function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{
        fontSize: 15,
        fontWeight: 700,
        color: '#111',
        margin: '0 0 12px',
        paddingBottom: 10,
        borderBottom: '1.5px solid #f0f0f0',
      }}>
        {title}
      </h2>
      <div style={{ fontSize: 13.5, color: '#444', lineHeight: 1.9 }}>
        {children}
      </div>
    </section>
  )
}

/* ── 항목 리스트 */
function List({ items }) {
  return (
    <ul style={{ margin: '8px 0', paddingLeft: 18 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 4 }}>{item}</li>
      ))}
    </ul>
  )
}

/* ── 테이블 */
function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '9px 12px', textAlign: 'left',
                border: '1px solid #e8e8e8', fontWeight: 700, color: '#333',
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '9px 12px', border: '1px solid #e8e8e8',
                  color: '#444', lineHeight: 1.6,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── 강조 박스 */
function InfoBox({ children }) {
  return (
    <div style={{
      background: `${PRIMARY}0D`,
      border: `1px solid ${PRIMARY}33`,
      borderRadius: 10,
      padding: '12px 16px',
      fontSize: 13,
      color: '#333',
      lineHeight: 1.8,
      margin: '12px 0',
    }}>
      {children}
    </div>
  )
}

/* ── 개인정보처리방침 */
function PrivacyPolicy() {
  return (
    <article>
      <Section title="계정 및 데이터 삭제 방법">
        <p><strong>틱재팬(TickJapan)</strong> 회원은 다음 방법으로 계정과 데이터를 삭제할 수 있습니다.</p>
        <p style={{ fontWeight: 600, margin: '14px 0 6px' }}>▸ 삭제 방법</p>
        <List items={[
          '앱/웹에서 [프로필] 탭 → 하단 [회원탈퇴] 선택',
          `또는 이메일(${CONTACT_EMAIL})로 탈퇴 요청`,
        ]} />
        <p style={{ fontWeight: 600, margin: '14px 0 6px' }}>▸ 삭제되는 데이터 및 보관 기간</p>
        <List items={[
          '삭제 항목: 이름, 휴대폰 번호, 번역 저장 기록 등 계정과 연결된 모든 개인정보',
          '보관 기간: 탈퇴 즉시 삭제 (관련 법령상 보존 의무가 있는 항목은 해당 기간 동안만 보관 후 파기)',
        ]} />
        <InfoBox>
          비로그인 상태에서 기기에만 저장된 단어·예문은 앱 삭제 또는 브라우저 저장소 삭제로 제거됩니다.
        </InfoBox>
      </Section>

      <Section title="제1조 수집하는 개인정보 항목">
        <p>틱재팬은 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집합니다.</p>

        <p style={{ fontWeight: 600, margin: '14px 0 6px' }}>▸ 회원가입 시</p>
        <List items={['이름 (필수)', '전화번호 (필수, 계정 식별자)']} />

        <p style={{ fontWeight: 600, margin: '14px 0 6px' }}>▸ 서비스 이용 중 자동 수집</p>
        <List items={[
          '번역 입력 및 결과 (저장 기능 이용 시에 한함)',
          '서비스 이용 통계 (Google Analytics)',
          '접속 IP, 브라우저, 운영체제 (보안 및 서비스 개선 목적)',
        ]} />

        <InfoBox>
          비로그인 상태의 단어·예문 저장 데이터는 이용자의 기기(브라우저 localStorage)에만 저장되며, 서버로 전송되지 않습니다.
        </InfoBox>
      </Section>

      <Section title="제2조 개인정보 수집 및 이용 목적">
        <Table
          headers={['수집 항목', '이용 목적']}
          rows={[
            ['이름, 전화번호', '회원 식별 및 저장 기록 관리'],
            ['번역 기록', '저장 목록 서비스 제공'],
            ['이용 통계', '서비스 개선 및 기능 분석'],
          ]}
        />
      </Section>

      <Section title="제3조 개인정보 보유 및 이용 기간">
        <List items={[
          '회원 탈퇴 시 즉시 삭제 (이름, 전화번호, 번역 저장 기록)',
          '관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관',
        ]} />

        <p style={{ margin: '12px 0 6px', fontWeight: 600 }}>▸ 법령에 따른 보존 기간</p>
        <Table
          headers={['보존 항목', '근거 법령', '보존 기간']}
          rows={[
            ['서비스 이용 기록', '통신비밀보호법', '3개월'],
            ['소비자 불만 기록', '전자상거래법', '3년'],
          ]}
        />
      </Section>

      <Section title="제4조 개인정보의 제3자 제공">
        <p>틱재팬은 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 서비스 제공을 위해 아래 외부 서비스를 활용하며 해당 서비스의 개인정보 처리방침이 적용됩니다.</p>
        <Table
          headers={['서비스', '활용 목적']}
          rows={[
            ['Google Analytics', '이용 통계 분석'],
            ['Google Cloud TTS', '일본어 음성 생성'],
            ['Google Gemini AI', '번역 및 문장 분석'],
          ]}
        />
      </Section>

      <Section title="제5조 이용자의 권리">
        <p>이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
        <List items={[
          '개인정보 열람 요청',
          '개인정보 수정·삭제 요청',
          '개인정보 처리 정지 요청',
        ]} />
        <InfoBox>
          권리 행사 및 회원 탈퇴는 앱 내 저장 목록 → 하단 탈퇴 링크, 또는 이메일({CONTACT_EMAIL})로 요청하실 수 있습니다. 요청 접수 후 <strong>10일 이내</strong> 처리합니다.
        </InfoBox>
      </Section>

      <Section title="제6조 개인정보 보호 조치">
        <List items={[
          'HTTPS 암호화 통신 적용',
          '데이터베이스 접근 권한 최소화',
          '개인정보 취급 인원 최소화',
        ]} />
      </Section>

      <Section title="제7조 쿠키 및 유사 기술">
        <List items={[
          'localStorage: 단어·예문 저장 등 서비스 기능 제공 (기기 내 저장)',
          'Google Analytics: 이용 행동 분석 (쿠키 기반)',
        ]} />
        <p>브라우저 설정에서 쿠키 및 localStorage 사용을 제한할 수 있으나, 일부 서비스 기능이 제한될 수 있습니다.</p>
      </Section>

      <Section title="제8조 개인정보 보호 문의">
        <InfoBox>
          개인정보 관련 문의 및 불만 사항은 아래로 연락 주세요.<br />
          이메일: <strong>{CONTACT_EMAIL}</strong>
        </InfoBox>
        <p>이 외에도 아래 기관에 도움을 요청하실 수 있습니다.</p>
        <List items={[
          '개인정보 침해신고센터: privacy.kisa.or.kr / 118',
          '개인정보 분쟁조정위원회: www.kopico.go.kr / 1833-6972',
        ]} />
      </Section>

      <Section title="제9조 개인정보처리방침 변경">
        <p>이 방침은 <strong>{UPDATED_DATE}</strong>부터 적용됩니다. 내용 변경 시 서비스 내 공지를 통해 사전 안내합니다.</p>
      </Section>
    </article>
  )
}

/* ── 이용약관 */
function TermsOfService() {
  return (
    <article>
      <Section title="제1조 목적">
        <p>이 약관은 틱재팬(이하 "서비스")이 제공하는 일본어 학습 서비스의 이용 조건과 이용자·서비스 간의 권리·의무를 규정합니다.</p>
      </Section>

      <Section title="제2조 서비스 내용">
        <p>틱재팬은 다음 서비스를 제공합니다.</p>
        <List items={[
          '한국어 → 일본어 번역 (피치 악센트 포함)',
          '일본어 동사·형용사·명사·조사·문법 학습 라이브러리',
          '번역 결과 및 단어·예문 저장 기능',
          '일본어 TTS(텍스트 음성 변환)',
          '문장 구조 및 문법 패턴 해설',
        ]} />
      </Section>

      <Section title="제3조 회원 가입">
        <List items={[
          '이름과 전화번호를 입력해 간편하게 가입할 수 있습니다.',
          '타인의 정보를 도용하거나 허위 정보를 입력할 수 없습니다.',
          '만 14세 미만은 법정 대리인의 동의 없이 가입할 수 없습니다.',
          '1인 1계정을 원칙으로 합니다.',
        ]} />
      </Section>

      <Section title="제4조 서비스 이용">
        <p>비로그인 이용자는 번역 기능을 제한적으로 이용할 수 있으며, 회원 가입 후 저장 기능 등 전체 서비스를 이용할 수 있습니다.</p>
        <InfoBox>
          서비스는 학습 보조 목적으로 제공됩니다. AI 번역 결과의 정확성을 보장하지 않으며, 공식·법적 문서 번역에 활용하지 마세요.
        </InfoBox>
      </Section>

      <Section title="제5조 이용자의 의무">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <List items={[
          '서비스 콘텐츠의 무단 복제·배포·상업적 이용',
          '서비스 운영을 방해하는 행위 (자동화 봇, 과도한 요청 등)',
          '타인의 개인정보 침해 또는 명예 훼손',
          '서비스의 소스코드 역분석, 수정, 파생 서비스 제작',
        ]} />
      </Section>

      <Section title="제6조 서비스 변경 및 중단">
        <p>서비스는 운영상·기술상 이유로 내용을 변경하거나 일시 중단할 수 있습니다. 불가피한 경우 사전 공지 없이 중단될 수 있으며, 이로 인한 손해에 대해 책임을 지지 않습니다.</p>
      </Section>

      <Section title="제7조 지식재산권">
        <p>서비스 내 콘텐츠(텍스트, 그래픽, 데이터, 소프트웨어 등)의 지식재산권은 틱재팬에 귀속됩니다. 이용자는 서비스 이용 목적 외에 콘텐츠를 사용할 수 없습니다.</p>
      </Section>

      <Section title="제8조 면책 조항">
        <List items={[
          'AI 번역 결과의 오류·누락으로 인한 손해에 대해 책임을 지지 않습니다.',
          '이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.',
          '천재지변, 통신 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.',
        ]} />
      </Section>

      <Section title="제9조 회원 탈퇴">
        <p>이용자는 언제든지 앱 내 탈퇴 기능을 통해 탈퇴할 수 있습니다. 탈퇴 즉시 이름, 전화번호, 번역 저장 기록이 삭제됩니다. 관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 후 삭제됩니다.</p>
      </Section>

      <Section title="제10조 분쟁 해결">
        <p>서비스 이용 관련 분쟁은 상호 협의를 통해 해결합니다. 협의가 이루어지지 않을 경우 대한민국 법률을 준거법으로 하며, 관할 법원은 민사소송법에 따릅니다.</p>
      </Section>

      <Section title="제11조 약관의 효력 및 변경">
        <p>이 약관은 <strong>{UPDATED_DATE}</strong>부터 적용됩니다. 약관 변경 시 서비스 내 공지를 통해 7일 전 사전 안내합니다.</p>
      </Section>

      <Section title="제12조 문의">
        <InfoBox>
          문의 이메일: <strong>{CONTACT_EMAIL}</strong>
        </InfoBox>
      </Section>
    </article>
  )
}

/* ── 메인 페이지 컴포넌트 */
export default function LegalPage({ type = 'privacy' }) {
  const isPrivacy = type === 'privacy'

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fafafa',
    }}>
      {/* 헤더 */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '16px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
            <img src="/favicon.svg" alt="틱재팬" width={22} height={22} onError={e => e.target.style.display='none'} />
            <span style={{ fontSize: 14, fontWeight: 700, color: PRIMARY }}>틱재팬</span>
          </a>
          <span style={{ color: '#ddd' }}>›</span>
          <span style={{ fontSize: 13, color: '#666' }}>
            {isPrivacy ? '개인정보처리방침' : '이용약관'}
          </span>
        </div>
      </div>

      {/* 본문 */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* 탭 전환 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 32, background: '#f0f0f0', borderRadius: 10, padding: 4 }}>
          {[
            { label: '개인정보처리방침', href: '/privacy' },
            { label: '이용약관', href: '/terms' },
          ].map(tab => {
            const active = (tab.href === '/privacy') === isPrivacy
            return (
              <a
                key={tab.href}
                href={tab.href}
                style={{
                  flex: 1, textAlign: 'center',
                  padding: '9px 0',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? '#111' : '#888',
                  background: active ? '#fff' : 'transparent',
                  textDecoration: 'none',
                  boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </a>
            )
          })}
        </div>

        {/* 제목 + 시행일 */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111', margin: '0 0 8px' }}>
            {isPrivacy ? '개인정보처리방침' : '이용약관'}
          </h1>
          <p style={{ fontSize: 12.5, color: '#aaa', margin: 0 }}>
            시행일: {UPDATED_DATE} · 운영: {COMPANY_NAME}
          </p>
        </div>

        {/* 내용 */}
        {isPrivacy ? <PrivacyPolicy /> : <TermsOfService />}

        {/* 푸터 */}
        <div style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{ fontSize: 12, color: '#bbb' }}>© 2026 {COMPANY_NAME}. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="/privacy" style={{ fontSize: 12, color: isPrivacy ? PRIMARY : '#aaa', textDecoration: 'none', fontWeight: isPrivacy ? 600 : 400 }}>개인정보처리방침</a>
            <a href="/terms" style={{ fontSize: 12, color: !isPrivacy ? PRIMARY : '#aaa', textDecoration: 'none', fontWeight: !isPrivacy ? 600 : 400 }}>이용약관</a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 12, color: '#aaa', textDecoration: 'none' }}>문의하기</a>
          </div>
        </div>
      </div>
    </div>
  )
}
