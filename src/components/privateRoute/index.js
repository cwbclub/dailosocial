import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import Loading from '../loading'

export default function PrivateRoute({ children }) {
  const { user, isAuthReady } = useAuth()

  return isAuthReady ? (
    user ? (
      children
    ) : (
      <Navigate to="/login" replace={true} />
    )
  ) : (
    <Loading />
  )
}
