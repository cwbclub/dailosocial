import { FaImages, FaRegImages } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
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
    <div className="subNavBarWrapper">
      <div className="subNavBar wrapper">
        <NavLink to="" end>
          {({ isActive }) =>
            isActive ? (
              <>
                <MdPermMedia /> Images
              </>
            ) : (
              <>
                <MdOutlinePermMedia />
                Images
              </>
            )
          }
        </NavLink>
        <NavLink to="blogs">
          {({ isActive }) =>
            isActive ? (
              <>
                <MdArticle /> Blogs
              </>
            ) : (
              <>
                <MdOutlineArticle />
                Blogs
              </>
            )
          }
        </NavLink>
        <NavLink to="friends">
          {({ isActive }) =>
            isActive ? (
              <>
                <MdGroups /> Friends
              </>
            ) : (
              <>
                <MdOutlineGroups />
                Friends
              </>
            )
          }
        </NavLink>
      </div>
    </div>
  )
}
