import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
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
export const getSuggestedUsers = async (uid) => {
  const q = query(collection(db, 'users'), where('uid', '!=', uid), limit(20))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}

// Update Following list
export const toggleFollowing = async (myuid, targetUid, followed) => {
  const followingsRef = doc(db, 'friends', myuid)
  const followersRef = doc(db, 'friends', targetUid)

  // Update Following List
  await setDoc(
    followingsRef,
    {
      followings: followed ? arrayRemove(targetUid) : arrayUnion(targetUid),
    },
    { merge: true }
  )

  // Update Followers List
  await setDoc(
    followersRef,
    {
      followers: followed ? arrayRemove(myuid) : arrayUnion(myuid),
    },
    { merge: true }
  )
}

// get profile

export const getProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, 'users', uid))
  if (snapshot.exists) {
    return snapshot.data()
  }
}

// Get All Posts
export const getAllPosts = async (followings, myuid, index) => {
  const colRef = index
    ? query(
        collectionGroup(db, 'posts'),
        where('privacy', '==', 'feed'),
        orderBy('timestamp', 'desc'),
        limit(10),
        startAfter(index)
      )
    : query(
        collectionGroup(db, 'posts'),
        where('privacy', '==', 'feed'),
        orderBy('timestamp', 'desc'),
        limit(20)
      )
  const snapshot = await getDocs(colRef)
  console.count('Get Posts')
  if (!snapshot.empty) {
    let res = []
    snapshot.docs.forEach((item) => {
      if (followings.includes(item.data()?.uid) || item.data()?.uid === myuid) {
        res.push({ ...item.data(), id: item.id })
      }
    })
    const [last] = snapshot.docs.slice(-1)
    return { res, last }
  }
}
