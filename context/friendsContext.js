import { createContext, useContext, useMemo } from 'react'
import useFollowings from '../hooks/useFollowings'
import useLiveData from '../hooks/useLiveData'
import { useAuth } from './authContext'

const FriendsContext = createContext()

export const useFriends = () => useContext(FriendsContext)

export default function FriendsContextProvider({ children }) {
  const { user } = useAuth()
  const { data: followings, loading } = useFollowings(user?.uid, 'followings')
  console.log(followings)
  return (
    <FriendsContext.Provider value={{ followings, loading }}>
      {children}
    </FriendsContext.Provider>
  )
}
