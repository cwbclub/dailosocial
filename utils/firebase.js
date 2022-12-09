import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
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
  const res = await addDoc(colRef, {
    ...data,
    uid,
    displayName,
    timestamp: serverTimestamp(),
  })
  return res
}

// Delete Post
export const deletePost = async (uid, id, fileRef) => {
  const docRef = doc(db, 'users', uid, 'posts', id)
  await deleteDoc(docRef)
  if (fileRef) {
    const fileLoc = ref(storage, fileRef)
    await deleteObject(fileLoc)
  } else {
    await deleteDoc(doc(db, 'blogs', id))
  }
}

// Adding Posts
export const updatePost = async (uid, id, value) => {
  const docRef = doc(db, `users/${uid}/posts/${id}`)
  await updateDoc(docRef, {
    privacy: value,
  })
}

// Adding Blog
export const addBlog = async (uid, displayName, data) => {
  const { content, title, shortinfo, privacy } = data
  const res = await addPost(uid, displayName, {
    type: 'blog',
    shortinfo,
    title,
    privacy,
  })
  if (res?.id) {
    await setDoc(doc(db, 'blogs', res.id), {
      uid,
      displayName,
      timestamp: serverTimestamp(),
      content,
      title,
      privacy,
    })
  }
  return res?.id
}

// get blog
export const getBlog = async (id) => {
  const docRef = doc(db, 'blogs', id)
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    return {
      ...snapshot.data(),
      timestamp: snapshot.data()?.timestamp?.toDate()?.getTime(),
    }
  } else {
    return {}
  }
}

// get doc data
export const getDocData = async (loc) => {
  const snapshot = await getDoc(doc(db, loc))
  if (snapshot.exists()) {
    return snapshot.data()
  }
}

// Update blog
export const updateBlog = async (uid, id, data) => {
  const docRef1 = doc(db, 'users', uid, 'posts', id)
  const docRef2 = doc(db, 'blogs', id)
  await updateDoc(docRef1, data)
  await updateDoc(docRef2, data)
}

// Get Recomended Users
export const getRecomendedUsers = async (uid) => {
  const q = query(collection(db, 'users'), limit(7))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}
