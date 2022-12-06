import Link from 'next/link'
import s from './nav.module.css'
import { IoMdLogOut } from 'react-icons/io'
import useLogout from '../../../hooks/useLogout'

export default function Nav({ uid }) {
  const { logout } = useLogout()
  return (
    <nav>
      <div className={`wrapper ${s.wrapper}`}>
        <Link href="/">DailoSocial</Link>
        {uid ? (
          <div onClick={logout}>
            Logout <IoMdLogOut />
          </div>
        ) : null}
      </div>
    </nav>
  )
}
