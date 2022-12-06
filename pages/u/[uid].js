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
  // From Params
  const {
    query: { uid, menu, view },
  } = useRouter()

  // States
  // const [menu, setIsMenu] = useState()
  const { user } = useAuth()
  const { uid: myuid } = user
  const { data, loading } = useLiveData(`users/${uid}`)
  const { photos, blogs, loading: dataLoading } = useMainData(uid)
  const isOwn = uid === myuid
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
          />
        ) : null}
        {menu === 'blogs' ? <BlogsList /> : null}
        {menu === 'friends' ? <FriendsList /> : null}
      </div>
      <ScrollTop />
    </>
  )
}
