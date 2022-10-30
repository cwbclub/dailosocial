import UserInfo from '../../components/userInfo'
import { useAuth } from '../../context/authContext'
import useLiveData from '../../hooks/useLiveData'
import useSeo from '../../hooks/useSeo'
import './home.style.css'

export default function Home() {
  useSeo('Home')

  const { user } = useAuth()
  const { uid } = user
  const { data, loading } = useLiveData(uid)

  return (
    <div className="wrapper">
      <div className="homeBodyWrapper">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserInfo
            imgSrc={data?.photoURL}
            displayName={data?.displayName}
            info={data?.info}
          />
        )}
      </div>
    </div>
  )
}
