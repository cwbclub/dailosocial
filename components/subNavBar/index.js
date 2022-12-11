import s from './subNavBar.module.css'
import {
  MdArticle,
  MdGroups,
  MdOutlineArticle,
  MdOutlineGroups,
  MdOutlinePermMedia,
  MdPermMedia,
} from 'react-icons/md'
import Link from 'next/link'

export default function SubNavBar({ uid, menu }) {
  return (
    <div className={s.subNavBar}>
      <Link
        replace={true}
        href={`/u/${uid}`}
        className={!menu ? s.active : ''}
        scroll={false}
      >
        {!menu ? <MdPermMedia /> : <MdOutlinePermMedia />} Images
      </Link>
      <Link
        href={{
          pathname: '/u/' + uid,
          query: { menu: 'blogs' },
        }}
        className={menu === 'blogs' ? s.active : ''}
        scroll={false}
        replace={true}
      >
        {menu === 'blogs' ? <MdArticle /> : <MdOutlineArticle />} Blogs
      </Link>
      <Link
        href={{
          pathname: '/u/' + uid,
          query: { menu: 'friends' },
        }}
        className={menu === 'friends' ? s.active : ''}
        scroll={false}
        replace={true}
      >
        {menu === 'friends' ? <MdGroups /> : <MdOutlineGroups />} Friends
      </Link>
    </div>
  )
}
