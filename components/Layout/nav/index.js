import Link from 'next/link'
import s from './nav.module.css'
import { IoMdLogOut } from 'react-icons/io'
import useLogout from '../../../hooks/useLogout'
import { usePathname } from 'next/navigation'
import { RiUserSearchFill, RiUserSearchLine } from 'react-icons/ri'

export default function Nav({ uid }) {
  const { logout } = useLogout()
  const path = usePathname()
  return (
    <nav>
      <div
        className={`wrapper ${s.wrapper} ${path === '/search' ? 'search' : ''}`}
      >
        {path === '/search' ? (
          <div className={s.searchBar}>
            <input autoFocus type="search" placeholder="Type to search user" />
            {/* <RiUserSearchFill /> */}
            <RiUserSearchLine />
          </div>
        ) : (
          <>
            <Link href="/">DailoSocial</Link>
            {uid ? (
              <div className={s.logoutBtn} onClick={logout}>
                Logout <IoMdLogOut />
              </div>
            ) : null}
          </>
        )}
      </div>
    </nav>
  )
}
