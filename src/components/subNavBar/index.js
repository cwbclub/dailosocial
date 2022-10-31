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
    <div className="subNavBar">
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
      <NavLink to="followings">
        {({ isActive }) =>
          isActive ? (
            <>
              <MdGroups /> Followings
            </>
          ) : (
            <>
              <MdOutlineGroups />
              Followings
            </>
          )
        }
      </NavLink>
    </div>
  )
}
