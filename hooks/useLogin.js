import { signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/authContext'
import { auth, googleProvider } from '../lib/firebase'
import { addUser } from '../utils/firebase'

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuth()

  const router = useRouter()

  const login = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Logging In...</b>)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        const { displayName, uid, photoURL } = res?.user

        await addUser(uid, displayName?.toLowerCase(), photoURL)
        dispatch({ type: 'LOGIN', payload: res.user })
        toast.success(<b>{`Welcome Back ${displayName}`}</b>, { id })
        setIsLoading(false)
        router.push(`/u/${uid}`)
      } else {
        throw new Error('Something went wrong, Try Again!')
      }
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
