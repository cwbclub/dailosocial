import { collection, doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useLiveData(
  ref, //Reference of the Doc
  col // True if collection
) {
  const [data, setData] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      col ? collection(db, ref) : doc(db, ref),
      (snapshot) => {
        if (col) {
          if (!snapshot.empty) {
            setData([...snapshot.docs.map((item) => item.data())])
          }
        } else {
          if (snapshot.exists()) {
            setData({ ...snapshot.data(), id: snapshot.id })
          }
        }

        setloading(false)
      }
    )
    return () => unsub()
  }, [ref])

  return { data, loading }
}
