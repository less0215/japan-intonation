import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'
const SAVED_WORDS_KEY = 'tickjapan_saved_words'

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

  useEffect(() => {
    if (user) localStorage.setItem('tickjapan_user', JSON.stringify(user))
    else      localStorage.removeItem('tickjapan_user')
  }, [user])

  useEffect(() => {
    localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(savedWords))
  }, [savedWords])

  const saveResult = useCallback(async (currentUser, inputText, result) => {
    const body = currentUser
      ? { user_id: currentUser.user_id, input_text: inputText, result }
      : { anonymous_id: getAnonymousId(), input_text: inputText, result }
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

  return (
    <UserContext.Provider value={{ user, setUser, saveResult, savedWords, isWordSaved, toggleSaveWord }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
