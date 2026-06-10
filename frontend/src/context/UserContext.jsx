import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'

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

  useEffect(() => {
    if (user) localStorage.setItem('tickjapan_user', JSON.stringify(user))
    else      localStorage.removeItem('tickjapan_user')
  }, [user])

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

  return (
    <UserContext.Provider value={{ user, setUser, saveResult }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
