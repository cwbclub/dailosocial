import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useLayoutEffect, useReducer } from 'react'
import { db } from '../lib/firebase'
import ProfileReducer from '../reducers/profileReducer'

const INITIAL_STATE = {
  photos: [],
  blogs: [],
  loading: true,
}

export default function useMainData(uid, isOwn) {
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE)

  useLayoutEffect(() => {
    dispatch({ type: 'RESET' })
    if (uid) {
      const q = isOwn
        ? query(
            collection(db, `users/${uid}/posts`),
            orderBy('timestamp', 'desc')
          )
        : query(
            collection(db, `users/${uid}/posts`),
            where('privacy', 'in', ['feed', 'friends']),
            orderBy('timestamp', 'desc')
          )
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const newData = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
          }))

          dispatch({
            type: 'ADD',
            photos: newData.filter((item) => item.type === 'photo'),
            blogs: newData.filter((item) => item.type === 'blog'),
          })
        }
        dispatch({ type: 'DONE' })
        console.count('photos')
      })
      return () => unsub()
    }
  }, [uid, isOwn])

  return state
}
