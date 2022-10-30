import { signInWithPopup } from 'firebase/auth'
import { useReducer, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { auth, googleProvider } from '../lib/firebase'
import { AuthReducer } from '../reducers/authReducer'

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuth()

  const navigate = useNavigate()

  const login = async () => {
    setIsLoading(true)
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        dispatch({ type: 'LOGIN', payload: res.user })
        setIsLoading(false)
        navigate('/')
      } else {
        throw new Error('Something went wrong, Try Again!')
      }
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
    }
  }

  return { login, isLoading }
}
