import {
  collection,
  endAt,
  onSnapshot,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

export default function useSearchData(search) {
  const [searchData, setSearchData] = useState()
  const [searchLoading, setSearchLoading] = useState(false)
  // .where('name', '>=', queryText)
  // .where('name', '<=', queryText + '\uf8ff')
  useEffect(() => {
    let unsub
    if (search.length > 3) {
      setSearchLoading(true)
      setSearchData()
      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          orderBy('displayName'),
          startAt(search.toLowerCase().trim()),
          endAt(search.toLowerCase().trim() + '~')
        ),
        (snapshot) => {
          console.log(snapshot.empty, search)
          if (!snapshot.empty) {
            setSearchData(snapshot.docs.map((item) => item.data()))
          }
          setSearchLoading(false)
        }
      )
    }

    return () => unsub && unsub()
  }, [search])

  return { searchData, searchLoading }
}
