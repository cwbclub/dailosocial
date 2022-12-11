import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { getSuggestedUsers } from '../utils/firebase'

export default function useSuggestedUsers(followings, loading, uid) {
  const [dataList, setDataList] = useState([])
  const [suggestLoading, setSuggestLoading] = useState(true)

  useEffect(() => {
    if (!loading && uid) {
      const handleData = async () => {
        try {
          const res = await getSuggestedUsers(uid)

          if (res) {
            setDataList(res.filter((item) => !followings.includes(item?.uid)))
          }
        } catch (error) {
          console.log(error.message)
        }
        setSuggestLoading(false)
      }
      handleData()
    }
  }, [loading, uid, followings])
  return { dataList, suggestLoading }
}
