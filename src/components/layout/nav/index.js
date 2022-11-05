import { useState } from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { MdAccountCircle, MdCancel } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import useLogout from '../../../hooks/useLogout'

export default function Nav() {
  const [isMenu, setIsMenu] = useState(false)
  const { user } = useAuth()
  const { logout } = useLogout()

  return (
    <nav>
      <div className="wrapper">
        <div className="nav">
          <Link className="logo" to="/">
            DailoSocial
          </Link>
          {user ? (
            !isMenu ? (
              <MdAccountCircle
                className="profileIcon"
                onClick={() => setIsMenu(true)}
              />
            ) : (
              <MdCancel
                className="profileIcon"
                onClick={() => setIsMenu(false)}
              />
            )
          ) : (
            <Link className="navBtnLogin" to="/login">
              Login <FaSignInAlt />
            </Link>
          )}
        </div>
      </div>
      {isMenu ? (
        <div className="navSubMenu">
          <NavLink to={'/u/' + user?.uid}>
            <FaSignInAlt />
            View Profile
          </NavLink>
          <NavLink to="/settings">
            <FaSignInAlt />
            Settings
          </NavLink>
          <button onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  )
}
// ;<button onClick={logout} className="navBtnLogout">
//   Logout <FaSignOutAlt />
// </button>
