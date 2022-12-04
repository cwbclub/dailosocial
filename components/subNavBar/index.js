import s from './subNavBar.module.css'
import {
  MdArticle,
  MdGroups,
  MdOutlineArticle,
  MdOutlineGroups,
  MdOutlinePermMedia,
  MdPermMedia,
} from 'react-icons/md'

export default function SubNavBar() {
  return (
    <div className={s.subNavBar}>
      <div className={s.active}>
        <MdOutlinePermMedia /> Images
      </div>
      <div>
        <MdOutlineArticle /> Blogs
      </div>
      <div>
        <MdOutlineGroups /> Friends
      </div>
    </div>
  )
}
