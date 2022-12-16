import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useFollowings(uid, type) {
  const [data, setData] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    // setData([])
    const unsub = onSnapshot(
      collection(db, 'friends', uid, type),
      (snapshot) => {
        console.count('useFriends snapshot')
        if (!snapshot.empty) {
          const res = snapshot.docs.map((item) => item.id)
          setData(res)
        } else {
          setData([])
        }
        setloading(false)
      }
    )
    return () => unsub()
  }, [uid, type])
  console.count('useFriends')
  return { data, loading }
}
