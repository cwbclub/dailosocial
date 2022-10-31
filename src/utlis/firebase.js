import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
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

export const updateProfile = async (uid, data) => {
  const docRef = doc(db, `users/${uid}`)
  await updateDoc(docRef, data)
}
