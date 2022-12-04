import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import SubNavBar from '../../components/subNavBar'
import UserInfo from '../../components/userInfo'
import { useAuth } from '../../context/authContext'
import useMainData from '../../hooks/useMainData'
import useLiveData from '../../hooks/useLiveData'

export default function Profile() {
  // From Params
  const {
    query: { uid },
  } = useRouter()

  const { user } = useAuth()
  const { uid: myuid, displayName } = user
  const { data, loading } = useLiveData(`users/${uid}`)
  const state = useMainData(uid)

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

      <SubNavBar />
    </>
  )
}
