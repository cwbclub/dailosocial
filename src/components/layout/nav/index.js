import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import useLogout from '../../../hooks/useLogout'

export default function Nav() {
  const { user } = useAuth()
  const { logout } = useLogout()

  return (
    <div className="wrapper">
      <nav>
        <Link className="logo" to="/">
          DailoSocial
        </Link>
        {user ? (
          <button onClick={logout} className="navBtnLogout">
            Logout <FaSignOutAlt />
          </button>
        ) : (
          <Link className="navBtnLogin" to="/login">
            Login <FaSignInAlt />
          </Link>
        )}
      </nav>
    </div>
  )
}
