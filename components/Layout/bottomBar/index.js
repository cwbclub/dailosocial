import Link from 'next/link'
import s from './bottomBar.module.css'

import {
  RiAddCircleFill,
  RiAddCircleLine,
  RiAddLine,
  RiHome3Fill,
  RiHome3Line,
  RiSearch2Fill,
  RiSearch2Line,
  RiUserFill,
  RiUserLine,
} from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

export default function BottomBar({ uid }) {
  // Pathname
  const { pathname } = useRouter()

  // Active link check
  const isHome = pathname === '/'
  const isSearch = pathname === '/search'
  const isAdd = pathname === '/add'
  const isProfile = pathname === '/u/[uid]'

  return (
    <div className={s.bottomBarWrapper}>
      <div className={`${s.bottomBar}`}>
        <Link href="/">
          {isHome ? <RiHome3Fill className="active" /> : <RiHome3Line />}
        </Link>

        <div>
          {isSearch ? <RiSearch2Fill className="active" /> : <RiSearch2Line />}
        </div>
        <div>
          {isAdd ? <RiAddCircleFill className="active" /> : <RiAddCircleLine />}
        </div>
        <Link href={`/u/${uid}`}>
          {isProfile ? <RiUserFill className="active" /> : <RiUserLine />}
        </Link>
      </div>
    </div>
  )
}
