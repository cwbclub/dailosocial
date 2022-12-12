import { createContext, useContext, useMemo } from 'react'
import useLiveData from '../hooks/useLiveData'
import { useAuth } from './authContext'

const FriendsContext = createContext()

export const useFriends = () => useContext(FriendsContext)

export default function FriendsContextProvider({ children }) {
  const { user } = useAuth()
  const { data, loading } = useLiveData(`friends/${user?.uid}`)
  const followings = useMemo(() => data?.followings || [], [data?.followings])
  const followers = useMemo(() => data?.followers || [], [data?.followers])
  return (
    <FriendsContext.Provider value={{ followings, followers, loading }}>
      {children}
    </FriendsContext.Provider>
  )
}
