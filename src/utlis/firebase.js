import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const addUser = async (uid, displayName, photoURL) => {
  const docRef = doc(db, `users/${uid}`)

  // For checking existing user
  const res = await getDoc(docRef)

  if (!res.exists()) {
    await setDoc(docRef, {
      displayName,
      photoURL,
    })
  }
}
