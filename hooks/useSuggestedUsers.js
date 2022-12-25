import { useEffect, useState } from 'react'
import { getSuggestedUsers } from '../utils/firebase'

export default function useSuggestedUsers(followings, loading, uid) {
  const [dataList, setDataList] = useState([])
  const [suggestLoading, setSuggestLoading] = useState(true)

  useEffect(() => {
    if (!loading && uid) {
      const handleData = async () => {
        try {
          const res = await getSuggestedUsers(followings, uid)
          if (res) {
            setDataList(res)
          }
        } catch (error) {
          console.error(error.message)
        }
        setSuggestLoading(false)
      }
      handleData()
    }
  }, [loading, uid, followings])
  return { dataList, suggestLoading }
}
