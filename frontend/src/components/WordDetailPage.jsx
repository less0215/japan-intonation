import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { track } from '../App'
import { ADJ_I, CONJ_LABELS as ADJ_I_LABELS } from '../data/adjI'
import { ADJ_NA, CONJ_LABELS as ADJ_NA_LABELS } from '../data/adjNa'
import { NOUNS } from '../data/nouns'
import WordDetail from './WordDetail'
import PageSEO from './PageSEO'

const DATA_MAP = {
  'adj-i':  { items: ADJ_I,  labels: ADJ_I_LABELS,  partOfSpeech: 'い형용사' },
  'adj-na': { items: ADJ_NA, labels: ADJ_NA_LABELS,  partOfSpeech: 'な형용사' },
  'noun':   { items: NOUNS,  labels: null,           partOfSpeech: '명사' },
}

export default function WordDetailPage({ wordType }) {
  const { id }   = useParams()
  const navigate = useNavigate()
  const config   = DATA_MAP[wordType]
  const word     = config?.items.find(v => v.id === id)

  if (!word) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
        단어를 찾을 수 없어요.
      </div>
    )
  }

  // WordDetail.jsx는 item.word 필드를 사용하지만 데이터는 item.verb 사용 → 정규화
  const item = { ...word, word: word.verb }

  useEffect(() => {
    track('word_detail_view', { category: wordType, word_id: word.id, word: word.verb, rank: word.rank })
  }, [word, wordType])

  const posLabel = config.partOfSpeech
  const pathPrefix = wordType === 'noun' ? '/noun' : `/${wordType}`

  return (
    <>
      <PageSEO
        title={`${word.verb} (${word.reading}·${word.meaning}) - ${posLabel} ${word.rank}위`}
        description={`${word.verb}(${word.meaning})의 활용표와 예문을 무료로 확인하세요. 일본인이 많이 쓰는 ${posLabel} ${word.rank}위.`}
        path={`${pathPrefix}/${word.id}`}
      />
      <WordDetail
        item={item}
        wordType={wordType}
        conjLabels={config.labels}
        onBack={() => navigate(`/${wordType}`)}
      />
    </>
  )
}
