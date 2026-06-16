/* 개인정보처리방침 / 이용약관 페이지 */

const PRIMARY = '#5CA9CE'

const UPDATED_DATE = '2025년 7월 1일'
const COMPANY_NAME = '틱재팬'
const CONTACT_EMAIL = 'mgz.less@gmail.com'

/* ── 섹션 컴포넌트 */
function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
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
      <Section title="제1조 개인정보의 수집 항목 및 수집 방법">
        <p>틱재팬은 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>

        <p style={{ fontWeight: 600, margin: '16px 0 6px' }}>▸ 회원가입 시 수집 항목</p>
        <List items={['이름 (필수)', '전화번호 (필수, 계정 식별자로 사용)']} />

        <p style={{ fontWeight: 600, margin: '16px 0 6px' }}>▸ 서비스 이용 중 자동 수집</p>
        <List items={[
          '번역 입력 텍스트 및 결과 (저장 기능 이용 시)',
          '서비스 이용 기록 (Google Analytics를 통한 행동 데이터)',
          '기기 식별자 (비로그인 사용자의 이용 횟수 관리용, 기기 내 저장)',
          '접속 IP, 브라우저 종류, 운영체제 (보안 및 서비스 개선 목적)',
        ]} />

        <InfoBox>
          💡 비로그인 상태의 단어·예문 저장 데이터는 이용자의 기기(브라우저 localStorage)에만 저장되며, 서버로 전송되지 않습니다.
        </InfoBox>
      </Section>

      <Section title="제2조 개인정보의 수집 및 이용 목적">
        <Table
          headers={['수집 항목', '이용 목적']}
          rows={[
            ['이름, 전화번호', '회원 식별, 로그인, 번역 저장 기록 관리'],
            ['번역 기록', '저장 목록 서비스 제공, 재열람 기능'],
            ['행동 데이터 (GA)', '서비스 개선, 기능 사용 통계 분석'],
            ['기기 식별자', '비로그인 번역 이용 횟수 관리'],
          ]}
        />
      </Section>

      <Section title="제3조 개인정보의 보유 및 이용 기간">
        <List items={[
          '회원 탈퇴 시 즉시 삭제 (이름, 전화번호, 번역 저장 기록)',
          '단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관',
          '비로그인 기기 데이터: 이용자가 브라우저 데이터를 삭제할 때까지',
        ]} />

        <p style={{ margin: '12px 0 6px', fontWeight: 600 }}>▸ 관련 법령에 따른 보존 기간</p>
        <Table
          headers={['보존 항목', '근거 법령', '보존 기간']}
          rows={[
            ['서비스 이용 기록', '통신비밀보호법', '3개월'],
            ['소비자 불만 기록', '전자상거래법', '3년'],
          ]}
        />
      </Section>

      <Section title="제4조 개인정보의 제3자 제공">
        <p>틱재팬은 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 단, 서비스 제공을 위해 아래 외부 서비스를 이용하며, 해당 서비스의 처리 방침이 적용됩니다.</p>
        <Table
          headers={['서비스', '제공 목적', '처리 국가']}
          rows={[
            ['Google Analytics', '서비스 이용 통계 분석', '미국'],
            ['Google Cloud TTS', '일본어 음성 생성', '미국'],
            ['Google Gemini AI', '번역 및 문장 분석', '미국'],
            ['Railway (서버 호스팅)', '데이터 저장 및 서버 운영', '미국'],
          ]}
        />
        <p style={{ marginTop: 10 }}>각 서비스의 개인정보 처리방침은 해당 서비스 공식 사이트에서 확인하실 수 있습니다.</p>
      </Section>

      <Section title="제5조 개인정보 처리의 위탁">
        <p>현재 틱재팬은 개인정보 처리 업무를 외부에 위탁하지 않습니다. 향후 위탁 시 이 방침을 통해 사전 공지합니다.</p>
      </Section>

      <Section title="제6조 이용자의 권리와 행사 방법">
        <p>이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
        <List items={[
          '개인정보 열람 요청',
          '개인정보 수정·정정 요청',
          '개인정보 삭제 요청 (회원 탈퇴)',
          '개인정보 처리 정지 요청',
        ]} />
        <InfoBox>
          권리 행사는 앱 내 <strong>마이페이지 → 회원 탈퇴</strong> 또는 이메일({CONTACT_EMAIL})로 요청하실 수 있으며, 요청 접수 후 <strong>10일 이내</strong>에 처리합니다.
        </InfoBox>
      </Section>

      <Section title="제7조 개인정보의 안전성 확보 조치">
        <List items={[
          '비밀번호 미사용 구조 (전화번호만으로 식별, 별도 암호화 저장 불필요)',
          '데이터베이스 접근 권한 최소화',
          '서버 통신 HTTPS 암호화 적용',
          '개인정보 처리 시스템 접근 기록 보관',
        ]} />
      </Section>

      <Section title="제8조 쿠키 및 유사 기술 사용">
        <p>틱재팬은 서비스 개선 및 이용자 경험 향상을 위해 아래 기술을 사용합니다.</p>
        <List items={[
          'localStorage: 비로그인 이용자의 번역 횟수, 저장 단어·예문 관리 (기기 내 저장)',
          'Google Analytics: 이용자 행동 분석 (쿠키 기반)',
        ]} />
        <p>브라우저 설정에서 쿠키 및 localStorage 사용을 제한할 수 있으나, 일부 서비스 기능이 제한될 수 있습니다.</p>
      </Section>

      <Section title="제9조 개인정보 보호책임자">
        <Table
          headers={['항목', '내용']}
          rows={[
            ['성명', '정봉준'],
            ['이메일', CONTACT_EMAIL],
            ['서비스명', COMPANY_NAME],
          ]}
        />
        <p>개인정보 관련 문의, 불만, 피해 구제 등에 관한 사항은 위 담당자에게 문의해 주세요.</p>
        <p style={{ marginTop: 8 }}>또한 아래 기관에 도움을 요청하실 수 있습니다.</p>
        <List items={[
          '개인정보 침해신고센터: privacy.kisa.or.kr / 118',
          '개인정보 분쟁조정위원회: www.kopico.go.kr / 1833-6972',
          '대검찰청 사이버범죄수사단: www.spo.go.kr / 1301',
          '경찰청 사이버안전국: cyberbureau.police.go.kr / 182',
        ]} />
      </Section>

      <Section title="제10조 개인정보처리방침의 변경">
        <p>이 방침은 <strong>{UPDATED_DATE}</strong>부터 적용됩니다. 내용 변경 시 앱 내 공지 및 이 페이지를 통해 사전 안내합니다.</p>
      </Section>
    </article>
  )
}

/* ── 이용약관 */
function TermsOfService() {
  return (
    <article>
      <Section title="제1조 목적">
        <p>이 약관은 틱재팬(이하 "서비스")이 제공하는 일본어 학습 서비스의 이용 조건 및 절차, 이용자와 서비스 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
      </Section>

      <Section title="제2조 서비스 내용">
        <p>틱재팬은 다음 서비스를 제공합니다.</p>
        <List items={[
          '한국어 → 일본어 번역 (피치 악센트 포함)',
          '일본어 동사·형용사·명사·조사 학습 라이브러리',
          '번역 결과 및 단어·예문 저장 기능',
          '일본어 TTS(텍스트 음성 변환) 서비스',
          '문장 구조 및 문법 패턴 해설',
        ]} />
      </Section>

      <Section title="제3조 회원 가입 및 자격">
        <List items={[
          '이름과 전화번호를 입력하여 간편하게 가입할 수 있습니다.',
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
          '서비스를 통해 얻은 콘텐츠의 무단 복제·배포·상업적 이용',
          '서비스 운영을 방해하는 행위 (과도한 API 호출, 자동화 봇 등)',
          '타인의 개인정보 침해 또는 명예 훼손',
          '불법 정보의 번역·학습 목적 활용',
          '서비스의 소스코드 역분석, 수정, 파생 서비스 제작',
        ]} />
      </Section>

      <Section title="제6조 서비스의 변경 및 중단">
        <p>서비스는 운영상·기술상 이유로 사전 공지 후 내용을 변경하거나 일시 중단할 수 있습니다. 불가피한 경우 사전 공지 없이 중단될 수 있으며, 이로 인한 손해에 대해 책임을 지지 않습니다.</p>
      </Section>

      <Section title="제7조 지식재산권">
        <p>서비스 내 콘텐츠(텍스트, 그래픽, 데이터, 소프트웨어 등)의 지식재산권은 틱재팬에 귀속됩니다. 이용자는 서비스 이용 목적 외에 콘텐츠를 사용할 수 없습니다.</p>
      </Section>

      <Section title="제8조 면책 조항">
        <List items={[
          'AI 번역 결과의 오류, 누락으로 인한 손해에 대해 책임을 지지 않습니다.',
          '이용자의 귀책 사유로 발생한 서비스 이용 장애에 대해 책임을 지지 않습니다.',
          '천재지변, 통신 장애 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.',
          '이용자 간 또는 이용자와 제3자 간 분쟁에 개입하지 않습니다.',
        ]} />
      </Section>

      <Section title="제9조 회원 탈퇴 및 계정 삭제">
        <p>이용자는 언제든지 앱 내 <strong>마이페이지 → 회원 탈퇴</strong>를 통해 탈퇴할 수 있습니다. 탈퇴 즉시 이름, 전화번호, 번역 저장 기록이 삭제됩니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 후 삭제됩니다.</p>
      </Section>

      <Section title="제10조 분쟁 해결">
        <p>서비스 이용과 관련한 분쟁은 상호 협의를 통해 해결합니다. 협의가 이루어지지 않을 경우 대한민국 법률을 준거법으로 하며, 관할 법원은 민사소송법에 따릅니다.</p>
      </Section>

      <Section title="제11조 약관의 효력 및 변경">
        <p>이 약관은 <strong>{UPDATED_DATE}</strong>부터 적용됩니다. 약관 변경 시 앱 내 공지 또는 이 페이지를 통해 7일 전 사전 공지합니다.</p>
      </Section>

      <Section title="제12조 문의">
        <InfoBox>
          문의 이메일: <strong>{CONTACT_EMAIL}</strong><br />
          운영자: 정봉준 / 서비스명: {COMPANY_NAME}
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
          <span style={{ fontSize: 12, color: '#bbb' }}>© 2025 {COMPANY_NAME}. All rights reserved.</span>
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
