import Link from 'next/link'
import s from './nav.module.css'
import { IoMdLogOut } from 'react-icons/io'
import useLogout from '../../../hooks/useLogout'
import { usePathname } from 'next/navigation'
import { RiUserSearchFill, RiUserSearchLine } from 'react-icons/ri'
import { useRouter } from 'next/router'
import Button from '../../Button'

export default function Nav({ uid }) {
  const { logout } = useLogout()

  const router = useRouter()
  const { pathname } = router

  return (
    <nav>
      <div
        className={`wrapper ${s.wrapper} ${
          pathname === '/search' ? 'search' : ''
        }`}
      >
        {pathname === '/search' ? (
          <div className={s.searchBar}>
            <input autoFocus type="search" placeholder="Type to search user" />
            {/* <RiUserSearchFill /> */}
            <RiUserSearchLine />
          </div>
        ) : (
          <>
            {pathname === '/blog/[blogid]' ? (
              <button onClick={() => router.back()} className={s.backBtn}>
                Back
              </button>
            ) : (
              <Link href="/">DailoSocial</Link>
            )}

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
