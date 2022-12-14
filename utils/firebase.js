import {
  addDoc,
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
  writeBatch,
} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../lib/firebase'

// Adding User
export const addUser = async (uid, displayName, photoURL) => {
  const docRef = doc(db, `users/${uid}`)

  // For checking existing user
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
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
  if (data?.displayName) {
    const blogRef = query(collection(db, 'blogs'), where('uid', '==', uid))
    const postsRef = collection(db, 'users', uid, 'posts')
    await updateUsername(data?.displayName, blogRef)
    await updateUsername(data?.displayName, postsRef)
  }
}

// updating username
const updateUsername = async (displayName, ref) => {
  const snapshot = await getDocs(ref)
  if (!snapshot.empty) {
    snapshot.docs.map((item) => {
      updateDoc(item.ref, {
        displayName,
      })
    })
  }
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
export const getSuggestedUsers = async (followings, uid) => {
  let q = query(collection(db, 'users'))

  const chunks = getChunks([...followings, uid])

  for (const chunk of chunks) {
    q = query(q, where('uid', 'not-in', chunk))
  }

  q = query(q, limit(7))
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}

// Update Following list
export const toggleFollowing = async (myuid, targetUid, followed) => {
  const followingsRef = doc(db, 'friends', myuid, 'followings', targetUid)
  const followersRef = doc(db, 'friends', targetUid, 'followers', myuid)

  // If Already followed
  if (followed) {
    await deleteDoc(followingsRef) // Deleting target user uid from own followings
    await deleteDoc(followersRef) // Deleting own uid from target user's followers
  } else {
    await setDoc(followingsRef, {}) // Setting target user's uid to own followings list as {}
    await setDoc(followersRef, {}) // Setting own user's uid to target user's followers list as {}
  }
}

// Get All Posts
export const getAllPosts = async (followings, myuid, index) => {
  // Starting query and privacy===feed data type
  let q = query(collectionGroup(db, 'posts'), where('privacy', '==', 'feed'))

  // Get the followings list chunks including own
  const chunks = getChunks([...followings, myuid])

  // loop over chunks and add query
  for (const chunk of chunks) {
    q = query(q, where('uid', 'in', chunk))
  }

  // order by timestamps and limit the user to get pagination
  q = query(q, orderBy('timestamp', 'desc'), limit(7))

  // If last index was given
  if (index) {
    q = query(q, startAfter(index))
  }

  // Getting the snapshot
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    const res = snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
    const [last] = snapshot.docs.slice(-1)

    return { res, last }
  }
}

// Get chunk arrays
export const getChunks = (data) => {
  const chunks = []
  let i = 0

  while (i < data?.length) {
    chunks.push(data.slice(i, i + 10))
    i += 10
  }

  return chunks
}

// Get Friends user info
export const getFriendsList = async (data) => {
  if (!data?.length) {
    return
  }
  let q = query(collection(db, 'users'))
  const chunks = getChunks(data)

  for (const chunk of chunks) {
    q = query(q, where('uid', 'in', chunk))
  }
  const snapshot = await getDocs(q)
  if (!snapshot.empty) {
    return snapshot.docs.map((item) => item.data())
  }
}

// Delete Account
export const deleteAccount = async (uid) => {
  // Batch
  const batch = writeBatch(db)

  // Col REf
  const blogsRef = query(collection(db, 'blogs'), where('uid', '==', uid))
  const followingsRef = collection(db, 'friends', uid, 'followings')
  const followersRef = collection(db, 'friends', uid, 'followers')
  const postsRef = collection(db, 'users', uid, 'posts')

  // Doc Ref
  const friendsRef = doc(db, 'friends', uid)
  const userRef = doc(db, 'users', uid)

  // Delete Operation
  const deleteData = async (loc) => {
    const snapshot = await getDocs(loc)
    if (!snapshot.empty) {
      snapshot.docs.forEach((item) => {
        batch.delete(item.ref)
      })
    }
  }

  // First delete all images
  const postsSnapshot = await getDocs(postsRef)
  if (!postsSnapshot.empty) {
    postsSnapshot.docs.forEach((item) => {
      if (item.data()?.fileRef) {
        const fileLoc = ref(storage, item.data().fileRef)
        deleteObject(fileLoc)
      }
      batch.delete(item.ref)
    })
  }
  await deleteData(blogsRef) //blogs data
  await deleteData(followingsRef) //followings data
  await deleteData(followersRef) //followers data
  batch.delete(friendsRef)
  batch.delete(userRef)
  await batch.commit()
}

// Handle Like Function
export const handleLike = async (liked, postId, userId) => {
  const docRef = doc(db, 'posts', postId, 'likes', userId)

  if (liked) {
    await setDoc(docRef, {})
  } else {
    await deleteDoc(docRef)
  }
}
