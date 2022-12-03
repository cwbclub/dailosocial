import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import Loader from '../loader'

export default function AuthWrapper({ children }) {
  const { user, isAuthReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && isAuthReady) {
      router.push('/welcome')
    }
  }, [user?.uid, isAuthReady])

  // return isAuthReady ? <Loader /> : user ? children : null

  return isAuthReady ? user ? children : null : <Loader />
}
