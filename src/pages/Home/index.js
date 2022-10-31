import { Outlet, useParams } from 'react-router-dom'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'
import { useAuth } from '../../context/authContext'
import useLiveData from '../../hooks/useLiveData'
import useSeo from '../../hooks/useSeo'
import './home.style.css'

export default function Home() {
  // For SEO
  useSeo('Home')

  // From Params
  const { uid } = useParams()

  const { user } = useAuth()
  const { uid: myuid } = user
  const { data, loading } = useLiveData(uid)

  return (
    <div className="wrapper">
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
        <Outlet />
      </div>
    </div>
  )
}
