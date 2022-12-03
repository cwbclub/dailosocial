import Link from 'next/link'
import s from './nav.module.css'

export default function Nav() {
  return (
    <nav>
      <div className={`wrapper ${s.wrapper}`}>
        <Link href="/">DailoSocial</Link>
      </div>
    </nav>
  )
}
