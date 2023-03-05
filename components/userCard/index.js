import { debounce } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri'
import { toggleFollowing } from '../../utils/firebase'
import s from './userCard.module.css'

export default function UserCard({ data, followed, myuid }) {
  const { photoURL, displayName, uid } = data
  const [isFollowed, setIsFollowed] = useState(followed || false)

  const handleClick = async () => {
    setIsFollowed((prev) => !prev)
    try {
      debounceHandleClick(myuid, uid, isFollowed)
    } catch (error) {
      console.log('Handle Following Error:', error.message)
      toast.error(<b>{error.message}</b>)
    }
  }

  const debounceHandleClick = useCallback(
    debounce(
      (myuid, uid, isFollowed) => toggleFollowing(myuid, uid, isFollowed),
      1000,
      { leading: true }
    ),
    []
  )
  const isOwn = uid === myuid

  return (
    <div className={s.userCard}>
      <div className={s.img}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          src={photoURL}
          alt={displayName}
          fill
          sizes="33vw"
        />
      </div>
      <Link href={`/u/${uid}`}>{displayName}</Link>
      {isOwn ? null : (
        <button
          className={isFollowed ? s.unfollow : null}
          onClick={handleClick}
        >
          {isFollowed ? (
            <>
              <RiUserUnfollowFill />
              Unfollow
            </>
          ) : (
            <>
              <RiUserFollowFill />
              Follow
            </>
          )}
        </button>
      )}
    </div>
  )
}
