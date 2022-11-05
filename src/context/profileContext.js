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
}

export default function ProfileContextProvider({ children }) {
  const {
    user: { uid },
  } = useAuth()
  const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE)

  useEffect(() => {
    const q = query(
      collection(db, `users/${uid}/posts`),
      orderBy('timestamp', 'desc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      console.log(snapshot, uid)
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
  }, [])

  return (
    <ProfileContext.Provider value={{ ...state }}>
      {children}
    </ProfileContext.Provider>
  )
}
