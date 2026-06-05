import { useParams, useNavigate } from 'react-router-dom'
import { ADJ_I, CONJ_LABELS as ADJ_I_LABELS } from '../data/adjI'
import { ADJ_NA, CONJ_LABELS as ADJ_NA_LABELS } from '../data/adjNa'
import { NOUNS } from '../data/nouns'
import WordDetail from './WordDetail'

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
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
        단어를 찾을 수 없어요.
      </div>
    )
  }

  // WordDetail.jsx는 item.word 필드를 사용하지만 데이터는 item.verb 사용 → 정규화
  const item = { ...word, word: word.verb }

  return (
    <WordDetail
      item={item}
      wordType={wordType}
      conjLabels={config.labels}
      onBack={() => navigate(`/${wordType}`)}
    />
  )
}
