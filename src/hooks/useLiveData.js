import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useLiveData(uid) {
  const [data, setData] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, `users/${uid}`), (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.data(), id: snapshot.id })
      }
      setloading(false)
    })
  }, [])

  return { data, loading }
}
