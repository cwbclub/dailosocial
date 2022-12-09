import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useSearchData(search) {
  const [data, setData] = useState()
  // .where('name', '>=', queryText)
  // .where('name', '<=', queryText + '\uf8ff')
  console.count('search hooks baahar')
  useEffect(() => {
    let unsub
    if (search.length > 4) {
      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          where('displayName', '>=', search.trim().toLowerCase()),
          where('displayName', '<=', search.trim().toLowerCase() + '\uf8ff')
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            setData(snapshot.docs.map((item) => item.data()))
          }
        }
      )
      console.count('search hooks andaaar')
    } else {
      setData()
    }

    return () => unsub && unsub()
  }, [search])

  return data
}
