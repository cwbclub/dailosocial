import { useState } from 'react'
import UserCard from '../userCard'
import FriendCard from './friendCard'
import s from './friendList.module.css'

export default function FriendsList({
  followings,
  followers,
  loading1,
  loading2,
  myuid,
}) {
  const [followingMenu, setFollowingMenu] = useState(true)

  const listData = followingMenu ? followings : followers
  return (
    <div className="wrapper">
      <div className={s.subNavBar}>
        <div
          onClick={() => setFollowingMenu(true)}
          className={followingMenu ? s.active : null}
        >
          Followings
        </div>
        <div
          onClick={() => setFollowingMenu(false)}
          className={followingMenu ? null : s.active}
        >
          Followers
        </div>
      </div>
      {followingMenu
        ? renderLists(followings, loading1, myuid)
        : renderLists(followers, loading2, myuid)}
    </div>
  )
}

const renderLists = (data, loading, myuid) => {
  return loading ? (
    <p>Loading....</p>
  ) : (
    <div>
      {data.map((user) => (
        <>
          <UserCard
            key={user?.uid}
            data={user}
            myuid={myuid}
            followed={data.some((item) => item.uid === user?.uid)}
          />
        </>
      ))}
    </div>
  )
}
