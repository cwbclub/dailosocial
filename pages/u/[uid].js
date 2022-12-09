import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'
import { useAuth } from '../../context/authContext'
import useMainData from '../../hooks/useMainData'
import useLiveData from '../../hooks/useLiveData'
import { useState } from 'react'
import ImageGallery from '../../components/imageGallery'
import BlogsList from '../../components/BlogsList'
import FriendsList from '../../components/FriendsList'
import s from '../../styles/Profile.module.css'
import ScrollTop from '../../components/scrollTop'

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
        <p>Loading</p>
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
