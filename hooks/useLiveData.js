import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useLiveData(ref) {
  const [data, setData] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    const unsub = onSnapshot(doc(db, ref), (snapshot) => {
      if (snapshot.exists()) {
        setData({ ...snapshot.data(), id: snapshot.id })
      }
      setloading(false)
    })
    return () => unsub()
  }, [ref])

  return { data, loading }
}
