import { useState } from 'react'
import { useFriends } from '../../context/friendsContext'
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
  const { followings: ownFollowings } = useFriends()
  console.log(ownFollowings)
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
        ? renderLists(followings, loading1, myuid, ownFollowings)
        : renderLists(followers, loading2, myuid, ownFollowings)}
    </div>
  )
}

const renderLists = (data, loading, myuid, ownFollowings) => {
  return loading ? (
    <ContentLoader title="Getting Friends Data" />
  ) : data?.length ? (
    <div className={s.userLists}>
      {data.map((user) => (
        <UserCard
          key={user?.uid}
          data={user}
          myuid={myuid}
          followed={ownFollowings.some((item) => item === user?.uid)}
        />
      ))}
    </div>
  ) : (
    <ErrorImg type="three" title="No friends data found!" />
  )
}
