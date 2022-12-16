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
  const pathname = usePathname()

  // Active link check
  const isHome = pathname === '/'
  const isSearch = pathname === '/search'
  const isAdd = pathname === '/add'
  const isProfile = pathname === '/u/' + uid

  return (
    <div className={s.bottomBarWrapper}>
      <div className={`${s.bottomBar}`}>
        <Link href="/" className={`${isHome ? 'active' : ''}`}>
          {isHome ? <RiHome3Fill /> : <RiHome3Line />}
          <span className={s.desktop}>Home</span>
        </Link>

        <Link href="/search" className={`${isSearch ? 'active' : ''}`}>
          {isSearch ? <RiSearch2Fill /> : <RiSearch2Line />}
          <span className={s.desktop}>Search</span>
        </Link>
        <Link href="/add" className={`${isAdd ? 'active' : ''}`}>
          {isAdd ? <RiAddCircleFill /> : <RiAddCircleLine />}
          <span className={s.desktop}>Add</span>
        </Link>
        <Link href={`/u/${uid}`} className={`${isProfile ? 'active' : ''}`}>
          {isProfile ? <RiUserFill /> : <RiUserLine />}
          <span className={s.desktop}>Profile</span>
        </Link>
      </div>
    </div>
  )
}
