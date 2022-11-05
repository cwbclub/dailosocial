import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../lib/firebase'

// Adding User
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

// Update Profile
export const updateProfile = async (uid, data) => {
  const docRef = doc(db, `users/${uid}`)
  await updateDoc(docRef, data)
}

// Adding Posts
export const addPost = async (uid, displayName, data) => {
  const colRef = collection(db, `users/${uid}/posts`)
  await addDoc(colRef, {
    ...data,
    uid,
    displayName,
    timestamp: serverTimestamp(),
  })
}

// Storing files
export const uploadFile = async (loc, file, handleProgress, handleUrl) => {
  const storageRef = ref(storage, loc)

  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      handleProgress(p)
    },
    (error) => {
      // Handle unsuccessful uploads
      throw new Error(error.message)
    },
    async () => {
      const res = await getDownloadURL(uploadTask.snapshot.ref)
      return res
    }
  )
}
