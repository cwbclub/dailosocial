import { useEffect, useMemo, useState } from 'react'
import { getProfile } from '../utils/firebase'
import useLiveData from './useLiveData'

export default function useFriendsList(uid) {
  const [followersList, setFollowersList] = useState([])
  const [followingsList, setFollowingsList] = useState([])
  const [followersLoading, setFollowersLoading] = useState(true)
  const [followingsLoading, setFollowingsLoading] = useState(true)

  const { data, loading } = useLiveData(`friends/${uid}`)
  const followings = useMemo(() => data?.followings || [], [data?.followings])
  const followers = useMemo(() => data?.followers || [], [data?.followers])

  useEffect(() => {
    const handleData = async () => {
      let list = []
      for (const user of followings) {
        const res = await getProfile(user)
        console.count('run get profile')
        list.push(res)
      }
      console.log('inside useffect', list)

      setFollowingsList(list)
      setFollowingsLoading(false)
    }
    !loading && handleData()
  }, [loading, followings])

  useEffect(() => {
    const handleData = async () => {
      let list = []
      for (const user of followers) {
        const res = await getProfile(user)
        console.count('run get profile')
        list.push(res)
      }
      console.log('inside useffect', list)

      setFollowersList(list)
      setFollowersLoading(false)
    }
    !loading && handleData()
  }, [loading, followers])

  console.count('useFriends')
  return {
    followingsList,
    followersList,
    followersLoading,
    followingsLoading,
  }
}
