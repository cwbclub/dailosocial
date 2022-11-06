import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import AddBtn from '../../components/addBtn'
import PhotoUploader from '../../components/photoUploader'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'
import { useAuth } from '../../context/authContext'
import ProfileContextProvider, {
  useProfile,
} from '../../context/profileContext'
import useLiveData from '../../hooks/useLiveData'
import useMainData from '../../hooks/useMainData'
import useSeo from '../../hooks/useSeo'
import './home.style.css'

export default function Home() {
  // States
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  //  Custom Function
  const handleChangeOpen = (value) => setIsUploadOpen(value)

  // For SEO
  useSeo('Home')

  // From Params
  const { uid } = useParams()

  const { user } = useAuth()
  const { uid: myuid, displayName } = user
  const { data, loading } = useLiveData(`users/${uid}`)
  const state = useMainData(uid)

  return (
    <>
      <div className="homeBodyWrapper">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserInfo
            photoURL={data?.photoURL}
            displayName={data?.displayName}
            info={data?.info}
            myuid={myuid}
            uid={uid}
          />
        )}
        <SubNavBar />
        <ProfileContextProvider data={state}>
          <div className="homeContent wrapper">
            <Outlet />
          </div>
        </ProfileContextProvider>
      </div>
      <AddBtn handleChangeOpen={handleChangeOpen} />
      {isUploadOpen ? (
        <PhotoUploader
          handleChangeOpen={handleChangeOpen}
          uid={myuid}
          displayName={displayName}
        />
      ) : null}
    </>
  )
}
