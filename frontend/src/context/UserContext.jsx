import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const API_URL = 'https://japan-intonation-production.up.railway.app'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tickjapan_user')) } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem('tickjapan_user', JSON.stringify(user))
    else      localStorage.removeItem('tickjapan_user')
  }, [user])

  const saveResult = useCallback(async (currentUser, inputText, result) => {
    const res = await fetch(`${API_URL}/saves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.user_id, input_text: inputText, result }),
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
