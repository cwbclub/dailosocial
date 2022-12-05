import Link from 'next/link'
import { useRouter } from 'next/router'
import PhotoUpload from '../components/photoUpload'
import s from '../styles/Add.module.css'

export default function Add() {
  const {
    query: { menu },
  } = useRouter()
  return (
    <div className={`wrapper ${s.addPage}`}>
      <div className={s.topMenu}>
        <Link className={menu ? '' : s.active} href="/add">
          Image
        </Link>
        <Link
          className={menu ? s.active : ''}
          href={{
            pathname: '/add',
            query: { menu: 'blog' },
          }}
        >
          Blog
        </Link>
      </div>
      <div className={s.subpage}>
        {menu === 'blog' ? <p>Blog</p> : <PhotoUpload />}
      </div>
    </div>
  )
}
