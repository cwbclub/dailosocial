import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useReducer } from 'react'
import { db } from '../lib/firebase'
import ProfileReducer from '../reducers/profileReducer'

const INITIAL_STATE = {
  photos: [],
  blogs: [],
  loading: true,
}

export default function useMainData(uid) {
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE)

  useEffect(() => {
    if (uid) {
      const q = query(
        collection(db, `users/${uid}/posts`),
        orderBy('timestamp', 'desc')
      )
      const unsub = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const newData = snapshot.docs.map((item) => item.data())

          dispatch({
            type: 'ADD',
            photos: newData.filter((item) => item.type === 'photo'),
            blogs: newData.filter((item) => item.type === 'blog'),
          })
        }
        dispatch({ type: 'DONE' })
      })
      return () => unsub()
    }
  }, [uid])

  return state
}
