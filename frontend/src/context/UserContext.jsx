import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

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

  /* 단어 북마크 상태 — 로그인 시 서버 동기화, 비로그인은 localStorage */
  const [savedWords, setSavedWords] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_WORDS_KEY)) ?? [] } catch { return [] }
  })

  /* 예문 저장 상태 — 로그인 시 서버 동기화, 비로그인은 localStorage */
  const [savedExamples, setSavedExamples] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SAVED_EXAMPLES_KEY)) ?? [] } catch { return [] }
  })

  /* 번역 기록 — localStorage 기반, 번역할 때마다 자동 누적 (능동 저장과 별개) */
  const [translationHistory, setTranslationHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) ?? [] } catch { return [] }
  })

  /* 콜백 재생성 없이 최신값을 읽기 위한 ref (렌더 중 동기 갱신) */
  const userRef     = useRef(user);          userRef.current = user
  const wordsRef    = useRef(savedWords);     wordsRef.current = savedWords
  const examplesRef = useRef(savedExamples);  examplesRef.current = savedExamples

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

  /* ── 북마크 서버 동기화 헬퍼 ── (실패는 조용히 무시: 로컬은 이미 반영됨) */
  const bmAdd = useCallback((kind, item) => {
    const u = userRef.current
    if (!u?.user_id) return
    fetch(`${API_URL}/bookmarks/add`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: u.user_id, kind, item_id: String(item.id ?? ''), payload: item }),
    }).catch(() => {})
  }, [])

  const bmRemove = useCallback((kind, ids) => {
    const u = userRef.current
    if (!u?.user_id) return
    fetch(`${API_URL}/bookmarks/remove`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: u.user_id, kind, item_ids: (ids || []).map(String) }),
    }).catch(() => {})
  }, [])

  /* 로그인 시(또는 로그인 상태로 앱 진입 시) — 로컬 북마크를 서버에 합치고(merge) 합쳐진 전체를 받아온다.
     서버는 add-only(삭제 없음)라 한쪽에만 있던 저장분도 보존되어 유실이 없다. */
  useEffect(() => {
    const uid = user?.user_id
    if (!uid) return
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(`${API_URL}/bookmarks/sync`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: uid, words: wordsRef.current, examples: examplesRef.current }),
        })
        if (!res.ok || !alive) return
        const d = await res.json()
        if (!alive) return
        if (Array.isArray(d.words))    setSavedWords(d.words)
        if (Array.isArray(d.examples)) setSavedExamples(d.examples)
      } catch { /* 오프라인 등 — 로컬 유지 */ }
    })()
    return () => { alive = false }
  }, [user?.user_id])

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
    const exists = wordsRef.current.some(w => w.id === wordInfo.id)
    if (exists) {
      setSavedWords(prev => prev.filter(w => w.id !== wordInfo.id))
      bmRemove('word', [wordInfo.id])
    } else {
      const item = { ...wordInfo, savedAt: new Date().toISOString() }
      setSavedWords(prev => [item, ...prev])
      bmAdd('word', item)
    }
  }, [bmAdd, bmRemove])

  /* 예문 저장 여부 확인 */
  const isExampleSaved = useCallback((exampleId) => {
    return savedExamples.some(e => e.id === exampleId)
  }, [savedExamples])

  /* 예문 저장 토글 — { id, wordId, wordText, wordReading, wordCategory, exampleJp, exampleKr } */
  const toggleSaveExample = useCallback((exampleInfo) => {
    const exists = examplesRef.current.some(e => e.id === exampleInfo.id)
    if (exists) {
      setSavedExamples(prev => prev.filter(e => e.id !== exampleInfo.id))
      bmRemove('example', [exampleInfo.id])
    } else {
      const item = { ...exampleInfo, savedAt: new Date().toISOString() }
      setSavedExamples(prev => [item, ...prev])
      bmAdd('example', item)
    }
  }, [bmAdd, bmRemove])

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

  /* 저장 단어 다중/전체 삭제 (ids 미지정 시 전체) */
  const removeWords = useCallback((ids) => {
    setSavedWords(prev => ids ? prev.filter(w => !ids.includes(w.id)) : [])
    bmRemove('word', ids || [])   // ids 없으면 [] → 서버 해당 kind 전체 삭제
  }, [bmRemove])

  /* 저장 예문 다중/전체 삭제 (ids 미지정 시 전체) */
  const removeExamples = useCallback((ids) => {
    setSavedExamples(prev => ids ? prev.filter(e => !ids.includes(e.id)) : [])
    bmRemove('example', ids || [])
  }, [bmRemove])

  /* 번역 기록 다중 삭제 */
  const removeHistoryItems = useCallback((ids) => {
    setTranslationHistory(prev => ids ? prev.filter(h => !ids.includes(h.id)) : [])
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, saveResult, savedWords, isWordSaved, toggleSaveWord, savedExamples, isExampleSaved, toggleSaveExample, translationHistory, addToHistory, removeHistoryItem, removeHistoryItems, clearHistory, removeWords, removeExamples }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
