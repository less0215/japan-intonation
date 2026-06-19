import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const SAVED_WORDS_KEY    = 'tickjapan_saved_words'
const SAVED_EXAMPLES_KEY = 'tickjapan_saved_examples'
const HISTORY_KEY        = 'tickjapan_translation_history'
const HISTORY_LIMIT      = 50  // 번역 기록 최대 보관 개수

const UserContext = createContext(null)

function getAnonymousId() {
  let id = localStorage.getItem('tickjapan_anon_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('tickjapan_anon_id', id)
  }
  return id
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tickjapan_user')) } catch { return null }
  })

  /* 단어 북마크 상태 — localStorage 기반 */
  const [savedWords, setSavedWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_WORDS_KEY)) ?? [] } catch { return [] }
  })

  /* 예문 저장 상태 — localStorage 기반 */
  const [savedExamples, setSavedExamples] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_EXAMPLES_KEY)) ?? [] } catch { return [] }
  })

  /* 번역 기록 — localStorage 기반, 번역할 때마다 자동 누적 (능동 저장과 별개) */
  const [translationHistory, setTranslationHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) ?? [] } catch { return [] }
  })

  useEffect(() => {
    if (user) localStorage.setItem('tickjapan_user', JSON.stringify(user))
    else      localStorage.removeItem('tickjapan_user')
  }, [user])

  useEffect(() => {
    localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(savedWords))
  }, [savedWords])

  useEffect(() => {
    localStorage.setItem(SAVED_EXAMPLES_KEY, JSON.stringify(savedExamples))
  }, [savedExamples])

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(translationHistory))
  }, [translationHistory])

  const saveResult = useCallback(async (currentUser, inputText, result) => {
    const platform = (window.Capacitor?.isNativePlatform?.() ?? false) ? 'app' : 'web'
    const body = currentUser
      ? { user_id: currentUser.user_id, input_text: inputText, result, platform }
      : { anonymous_id: getAnonymousId(), input_text: inputText, result, platform }
    const res = await fetch(`${API_URL}/saves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('저장 실패')
  }, [])

  /* wordId 기준으로 저장 여부 확인 */
  const isWordSaved = useCallback((wordId) => {
    return savedWords.some(w => w.id === wordId)
  }, [savedWords])

  /* 저장 토글 — { id, category, word, reading, meaning } */
  const toggleSaveWord = useCallback((wordInfo) => {
    setSavedWords(prev => {
      const exists = prev.some(w => w.id === wordInfo.id)
      if (exists) return prev.filter(w => w.id !== wordInfo.id)
      return [{ ...wordInfo, savedAt: new Date().toISOString() }, ...prev]
    })
  }, [])

  /* 예문 저장 여부 확인 */
  const isExampleSaved = useCallback((exampleId) => {
    return savedExamples.some(e => e.id === exampleId)
  }, [savedExamples])

  /* 예문 저장 토글 — { id, wordId, wordText, wordReading, wordCategory, exampleJp, exampleKr } */
  const toggleSaveExample = useCallback((exampleInfo) => {
    setSavedExamples(prev => {
      const exists = prev.some(e => e.id === exampleInfo.id)
      if (exists) return prev.filter(e => e.id !== exampleInfo.id)
      return [{ ...exampleInfo, savedAt: new Date().toISOString() }, ...prev]
    })
  }, [])

  /* 번역 기록 추가 — 같은 입력은 최신으로 끌어올리고, 최대 HISTORY_LIMIT개 유지 */
  const addToHistory = useCallback((inputText, result) => {
    if (!inputText || !result) return
    setTranslationHistory(prev => {
      const filtered = prev.filter(h => h.input_text !== inputText)
      const entry = {
        id: crypto.randomUUID(),
        input_text: inputText,
        japanese: result.japanese ?? '',
        result,
        savedAt: new Date().toISOString(),
      }
      return [entry, ...filtered].slice(0, HISTORY_LIMIT)
    })
  }, [])

  /* 번역 기록 개별 삭제 */
  const removeHistoryItem = useCallback((id) => {
    setTranslationHistory(prev => prev.filter(h => h.id !== id))
  }, [])

  /* 번역 기록 전체 삭제 */
  const clearHistory = useCallback(() => {
    setTranslationHistory([])
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, saveResult, savedWords, isWordSaved, toggleSaveWord, savedExamples, isExampleSaved, toggleSaveExample, translationHistory, addToHistory, removeHistoryItem, clearHistory }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
