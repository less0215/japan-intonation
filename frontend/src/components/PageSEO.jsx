import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://www.tickjapan.com'

export default function PageSEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | 틱재팬` : '일본어 번역기 - 파파고 대신 쓰는 무료 번역기 | 틱재팬'
  const fullDesc  = description ?? '파파고 대신 써보세요. 틱재팬은 무료 한국어-일본어 번역기로 히라가나 독음과 피치악센트를 한 번에 확인할 수 있습니다.'
  const canonical = `${BASE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  )
}
