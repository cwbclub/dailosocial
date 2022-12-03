import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { createContext, useContext, useEffect, useReducer } from 'react'
import useLiveData from '../hooks/useLiveData'
import { db } from '../lib/firebase'
import ProfileReducer from '../reducers/profileReducer'
import { useAuth } from './authContext'

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export default function ProfileContextProvider({ children, data }) {
  return (
    <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
  )
}
