import { useRouter } from 'next/router'
import { useAuth } from '../../context/authContext'
import useMainData from '../../hooks/useMainData'
import useLiveData from '../../hooks/useLiveData'
import { useState } from 'react'
import s from '../../styles/Profile.module.css'
import dynamic from 'next/dynamic'
// import ScrollTop from '../../components/scrollTop'
// import Loader from '../../components/loader'
// import ImageGallery from '../../components/imageGallery'
// import BlogsList from '../../components/BlogsList'
// import FriendsList from '../../components/FriendsList'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'

// const SubNavBar = dynamic(() => import('../../components/subNavBar'))
// const UserInfo = dynamic(() => import('../../components/userInfo'))
const ScrollTop = dynamic(() => import('../../components/scrollTop'))
const Loader = dynamic(() => import('../../components/loader'))
const ImageGallery = dynamic(() => import('../../components/imageGallery'))
const BlogsList = dynamic(() => import('../../components/BlogsList'))
const FriendsList = dynamic(() => import('../../components/FriendsList'))

export default function Profile() {
  // For Params
  const {
    query: { uid, menu, view },
  } = useRouter()

  // States
  // Sorting States
  const [imgSort, setImgSort] = useState('latest')
  const [blogSort, setBlogSort] = useState('latest')

  // Callback Function to pass to child
  const setSort = (name, value) => {
    name === 'blog' ? setBlogSort(value) : setImgSort(value)
  }

  const { user } = useAuth() // Chceking Auth User
  const { uid: myuid } = user
  const { data, loading } = useLiveData(`users/${uid}`) //Getting Profile Data like username, photo etc
  const { photos, blogs, loading: dataLoading } = useMainData(uid) //Getting Data Photos, Blogs
  const isOwn = uid === myuid // To check own profile
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <UserInfo
            photoURL={data?.photoURL}
            displayName={data?.displayName}
            info={data?.info}
            myuid={myuid}
            uid={uid}
          />
        </div>
      )}
      <SubNavBar uid={uid} menu={menu} />
      <div className={s.subPage}>
        {!menu ? (
          <ImageGallery
            view={view}
            uid={uid}
            photos={photos}
            loading={dataLoading}
            isOwn={isOwn}
            imgSort={imgSort}
            setSort={setSort}
          />
        ) : null}
        {menu === 'blogs' ? (
          <BlogsList
            uid={uid}
            blogs={blogs}
            loading={dataLoading}
            isOwn={isOwn}
            blogSort={blogSort}
            setSort={setSort}
          />
        ) : null}
        {menu === 'friends' ? <FriendsList /> : null}
      </div>
      <ScrollTop />
    </>
  )
}
