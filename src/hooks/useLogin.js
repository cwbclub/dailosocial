import { signInWithPopup } from 'firebase/auth'
import { useReducer, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { auth, googleProvider } from '../lib/firebase'
import { AuthReducer } from '../reducers/authReducer'
import { addUser } from '../utlis/firebase'

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuth()

  const navigate = useNavigate()

  const login = async () => {
    setIsLoading(true)
    const id = toast.loading(<b>Logging In...</b>)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        const { displayName, uid, photoURL } = res?.user

        await addUser(uid, displayName, photoURL)
        dispatch({ type: 'LOGIN', payload: res.user })
        toast.success(<b>{`Welcome ${displayName}`}</b>, { id })
        setIsLoading(false)
        navigate(`/u/${uid}`)
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
