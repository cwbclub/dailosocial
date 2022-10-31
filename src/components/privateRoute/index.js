import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import Loading from '../loading'

export default function PrivateRoute({ children }) {
  const { user, isAuthReady } = useAuth()
  const location = useLocation()

  return isAuthReady ? (
    user ? (
      location.pathname === '/' ? (
        <Navigate to={`/u/${user?.uid}`} replace={true} />
      ) : (
        children
      )
    ) : (
      <Navigate to="/login" replace={true} />
    )
  ) : (
    <Loading />
  )
}
