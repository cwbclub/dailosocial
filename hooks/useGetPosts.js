import {
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useGetPosts(followings, myuid, loading) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collectionGroup(db, 'posts'),
        where('privacy', '==', 'feed'),
        orderBy('timestamp', 'desc')
      ),

      (snapshot) => {
        if (!snapshot.empty) {
          const res = snapshot.docs.map((item) => {
            if (followings.includes(item?.uid) || myuid) {
              return { ...item.data(), id: item.id }
            }
          })
          setData(res)
        }
        console.log('run inside useGetPosts')
        setIsLoading(false)
      }
    )

    return () => unsub()
  }, [followings, loading, myuid])

  return { data, isLoading }
}
