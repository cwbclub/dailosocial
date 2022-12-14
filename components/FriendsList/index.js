import { useState } from 'react'
import ContentLoader from '../contentLoader'
import ErrorImg from '../errorImg'
import UserCard from '../userCard'
import s from './friendList.module.css'

export default function FriendsList({
  followings,
  followers,
  loading1,
  loading2,
  myuid,
  isOwn,
}) {
  const [followingMenu, setFollowingMenu] = useState(true)

  return (
    <div className="wrapper">
      <div className={s.subNavBar}>
        <div
          onClick={() => setFollowingMenu(true)}
          className={followingMenu ? s.active : null}
        >
          {isOwn ? 'Followings' : 'Follows'} ({followings?.length})
        </div>
        <div
          onClick={() => setFollowingMenu(false)}
          className={followingMenu ? null : s.active}
        >
          Followers ({followers?.length})
        </div>
      </div>
      {followingMenu
        ? renderLists(followings, loading1, myuid, followings)
        : renderLists(followers, loading2, myuid, followings)}
    </div>
  )
}

const renderLists = (data, loading, myuid, followings) => {
  return loading ? (
    <ContentLoader title="Getting Friends Data" />
  ) : data?.length ? (
    <div className={s.userLists}>
      {data.map((user) => (
        <UserCard
          key={user?.uid}
          data={user}
          myuid={myuid}
          followed={followings.some((item) => item.uid === user?.uid)}
        />
      ))}
    </div>
  ) : (
    <ErrorImg type="three" title="No friends data found!" />
  )
}
