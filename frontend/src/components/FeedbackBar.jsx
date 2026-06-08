import { useState } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'

export default function FeedbackBar({ inputText, japanese, userId, anonymousId }) {
  const [rating, setRating]   = useState(null)  // null | 'good' | 'bad'
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  async function sendFeedback(selectedRating, commentText) {
    setSending(true)
    try {
      await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId || null,
          anonymous_id: anonymousId || null,
          input_text: inputText,
          japanese,
          rating: selectedRating,
          comment: commentText || null,
        }),
      })
    } catch {}
    setSending(false)
    setSubmitted(true)
  }

  function handleRating(value) {
    setRating(value)
  }

  function handleSubmit() {
    if (!rating) return
    sendFeedback(rating, comment)
  }

  function handleSkip() {
    sendFeedback(rating, null)
  }

  if (submitted) {
    return (
      <div className="feedback-bar feedback-bar--done">
        피드백 감사합니다 🙏
      </div>
    )
  }

  return (
    <div className="feedback-bar">
      <div className="feedback-bar-row">
        <span className="feedback-bar-label">번역 품질이 어떤가요?</span>
        <div className="feedback-bar-btns">
          <button
            className={`feedback-bar-btn ${rating === 'good' ? 'feedback-bar-btn--selected' : ''}`}
            onClick={() => handleRating('good')}
            disabled={sending}
          >
            👍 좋아요
          </button>
          <button
            className={`feedback-bar-btn ${rating === 'bad' ? 'feedback-bar-btn--selected' : ''}`}
            onClick={() => handleRating('bad')}
            disabled={sending}
          >
            👎 별로예요
          </button>
        </div>
      </div>

      {rating && (
        <div className="feedback-bar-comment">
          <textarea
            className="feedback-textarea"
            placeholder="어떤 점이 아쉬웠나요? (선택)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={2}
            maxLength={300}
          />
          <div className="feedback-comment-actions">
            <button className="feedback-skip" onClick={handleSkip} disabled={sending}>건너뛰기</button>
            <button className="feedback-submit" onClick={handleSubmit} disabled={sending}>
              {sending
                ? <span className="spinner" style={{ width: 12, height: 12, borderColor: 'rgba(255,255,255,0.4)', borderTopColor: '#fff' }} />
                : '제출'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
