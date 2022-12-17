import { FaEdit } from 'react-icons/fa'
import Image from 'next/image'
import s from './userInfo.module.css'
import Button from '../Button'
import { useMemo, useState } from 'react'
import userImg from '../../public/user.webp'
import dynamic from 'next/dynamic'
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri'
import { toggleFollowing } from '../../utils/firebase'
import { useFriends } from '../../context/friendsContext'
import { debounce } from 'lodash'

const EditSection = dynamic(() => import('./editSection'), {
  loading: () => <p className="loading">Loading..</p>,
})

export default function UserInfo({ photoURL, displayName, info, myuid, uid }) {
  // Checking own profile'
  const isOwn = myuid === uid
  const { followings, loading } = useFriends()

  // States
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = (value) => {
    setIsEdit(value)
  }

  const [followed, setFollowed] = useState(followings.includes(uid) || false)
  // Handle Following
  const handleFollowing = async () => {
    setFollowed((prev) => !prev)
    try {
      await toggleFollowing(myuid, uid, followed)
    } catch (error) {
      console.log(error.message)
    }
  }

  const debounceHandleFollowing = useMemo(
    () => debounce(handleFollowing, 1000, { leading: true }),
    []
  )

  return (
    <div className={`${s.userInfoWrapper} wrapper`}>
      {isEdit ? (
        <EditSection
          displayName={displayName}
          info={info}
          uid={uid}
          photoURL={photoURL}
          handleEdit={handleEdit}
        />
      ) : (
        <div className={s.userInfoDiv}>
          <div className={s.img}>
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              src={photoURL || userImg}
              alt="User Avatar"
              fill
            />
          </div>

          <p className={s.name}>{displayName}</p>
          <div className={s.content}>
            {info ? (
              <p>{info}</p>
            ) : isOwn ? (
              <p className={s.noInfo}>
                {isOwn}No info Found edit your info now
              </p>
            ) : null}
            {isOwn ? (
              <Button types="xs primary" onClick={() => handleEdit(true)}>
                <FaEdit /> Edit Profile
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={debounceHandleFollowing}
                types={`xs ${followed ? 'secondary' : 'primary'}`}
              >
                {loading ? (
                  'loading'
                ) : followed ? (
                  <>
                    <RiUserUnfollowFill /> Unfollow
                  </>
                ) : (
                  <>
                    <RiUserFollowFill /> Follow
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
