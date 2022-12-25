import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { useAuth } from '../context/authContext'
import { auth } from '../lib/firebase'

export default function useLogout() {
  const { dispatch } = useAuth()

  const logout = async () => {
    try {
      await signOut(auth)
      dispatch({ type: 'LOGOUT' })
      toast.success(<b>Logout done</b>)
    } catch (error) {
      console.error(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }

  return { logout }
}
