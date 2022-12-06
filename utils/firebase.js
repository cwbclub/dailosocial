import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
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
      uid,
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

// Delete Post
export const deletePost = async (uid, id, fileRef) => {
  const docRef = doc(db, 'users', uid, 'posts', id)
  await deleteDoc(docRef)
  if (fileRef) {
    const fileLoc = ref(storage, fileRef)
    await deleteObject(fileLoc)
  }
}

// Adding Posts
export const updatePost = async (uid, id, value) => {
  const docRef = doc(db, `users/${uid}/posts/${id}`)
  await updateDoc(docRef, {
    privacy: value,
  })
}
