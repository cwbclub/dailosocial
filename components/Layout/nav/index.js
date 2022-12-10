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
  const {
    pathname,
    query: { uid: paramsUid },
  } = router
  const isOwn = paramsUid === uid
  console.log(isOwn)
  return (
    <nav className={pathname === '/search' ? s.search : null}>
      <div className={`wrapper ${s.wrapper}`}>
        {pathname === '/blog/[blogid]' || !isOwn ? (
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
      </div>
    </nav>
  )
}
