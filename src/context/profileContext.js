import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { createContext, useContext, useEffect, useReducer } from 'react'
import useLiveData from '../hooks/useLiveData'
import { db } from '../lib/firebase'
import ProfileReducer from '../reducers/profileReducer'
import { useAuth } from './authContext'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

const INITIAL_STATE = {
  photos: [],
  blogs: [],
  loading: true,
  uid: '',
}

export default function ProfileContextProvider({ children }) {
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE)
  const { uid } = state

  useEffect(() => {
    if (uid) {
      const q = query(
        collection(db, `users/${state?.uid}/posts`),
        orderBy('timestamp', 'desc')
      )
      const unsub = onSnapshot(q, (snapshot) => {
        console.log(snapshot, state?.uid)
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

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}
