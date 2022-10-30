import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import { auth } from '../lib/firebase'

export default function useLogout() {
  const logout = async () => {
    try {
      await signOut(auth)
      toast.success(<b>Logout done</b>)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>)
    }
  }

  return { logout }
}
