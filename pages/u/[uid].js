import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import useLiveData from '../../hooks/useLiveData'
import useMainData from '../../hooks/useMainData'
import s from '../../styles/Profile.module.css'
import dynamic from 'next/dynamic'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'
import useFriendsList from '../../hooks/useFriendsList'
import Head from 'next/head'
const Custom404 = dynamic(() => import('../404'))
const ScrollTop = dynamic(() => import('../../components/scrollTop'))
const Loader = dynamic(() => import('../../components/loader'))
const ImageGallery = dynamic(() => import('../../components/imageGallery'))
const BlogsList = dynamic(() => import('../../components/BlogsList'))
const FriendsList = dynamic(() => import('../../components/FriendsList'))

export default function Profile() {
  // For Params
  const router = useRouter()
  const {
    query: { uid, menu },
  } = router
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
  const isOwn = uid === myuid // To check own profile
  const { data, loading } = useLiveData(`users/${uid}`) //Getting Profile Data like username, photo etc
  const { photos, blogs, loading: dataLoading } = useMainData(uid, isOwn) //Getting Data Photos, Blogs

  const { dataList: followingsList, isLoading: followingsLoading } =
    useFriendsList(uid, 'followings') // Get followings list
  const { dataList: followersList, isLoading: followersLoading } =
    useFriendsList(uid, 'followers') // Get followers list

  if (!data?.displayName && !loading) {
    return <Custom404 />
  }

  return (
    <>
      <Head>
        <title>
          {data?.displayName?.toUpperCase() || 'Profile'} | DailoSocial
        </title>
      </Head>

      {loading ? (
        <Loader subpage={true} />
      ) : (
        <UserInfo
          photoURL={data?.photoURL}
          displayName={data?.displayName}
          info={data?.info}
          myuid={myuid}
          uid={uid}
        />
      )}
      <SubNavBar uid={uid} menu={menu} />
      <div className={s.subPage}>
        {!menu ? (
          <ImageGallery
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
        {menu === 'friends' ? (
          <FriendsList
            followings={followingsList}
            followers={followersList}
            loading1={followingsLoading}
            loading2={followersLoading}
            myuid={myuid}
          />
        ) : null}
      </div>
      <ScrollTop />
    </>
  )
}
