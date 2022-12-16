import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useFollowings(uid, type) {
  const [data, setData] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    setData([])
    const unsub = onSnapshot(
      collection(db, 'friends', uid, type),
      (snapshot) => {
        if (!snapshot.empty) {
          const res = snapshot.docs.map((item) => item.id)

          console.log('Not empty for', uid, type, res)

          setData(res)
        }
        console.log('empty bahar for', uid, type, data)
        setloading(false)
      }
    )
    return () => unsub()
  }, [uid, type])
  console.count('useFriends')
  console.log(type, uid, data)
  return { data, loading }
}
