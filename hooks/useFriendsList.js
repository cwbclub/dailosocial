import { useEffect, useState } from 'react'
import { getFriendsList } from '../utils/firebase'
import useFollowings from './useFollowings'

export default function useFriendsList(uid, type) {
  const [dataList, setDataList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { data, loading } = useFollowings(uid, type)

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true)
      setDataList([])
      try {
        const res = await getFriendsList(data)
        if (res) {
          setDataList(res)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
        setIsLoading(false)
      }
    }
    !loading && handleData()
  }, [data, loading, uid, type])

  return { dataList, isLoading }
}
