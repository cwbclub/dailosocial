import { createContext, useContext } from 'react'
import useLiveData from '../hooks/useLiveData'
import { useAuth } from './authContext'

const FriendsContext = createContext()

export const useFriends = () => useContext(FriendsContext)

export default function FriendsContextProvider({ children }) {
  const { user } = useAuth()
  const { data, loading } = useLiveData(`users/${user?.uid}/friends`, true)
  let followings = []
  let followers = []
  if (data?.length) {
    followings = data[0].followings
    followers = data[0].followers
  }
  return (
    <FriendsContext.Provider value={{ followings, followers, loading }}>
      {children}
    </FriendsContext.Provider>
  )
}
