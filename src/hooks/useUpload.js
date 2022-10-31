import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../lib/firebase'

export default function useUpload() {
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState()

  const upload = async (loc, file) => {
    const storageRef = ref(storage, loc)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(p)
      },
      (error) => {
        // Handle unsuccessful uploads
        throw new Error(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
        })
      }
    )
  }

  return { upload, progress, url }
}
