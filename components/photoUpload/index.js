import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button'
import PhotoInfoForm from './photoInfoForm'
import s from './photoUpload.module.css'
import ShortUniqueId from 'short-unique-id'
import { useAuth } from '../../context/authContext'
import { useRouter } from 'next/navigation'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import { addPost } from '../../utils/firebase'

export default function PhotoUpload({
  handleRadio,
  img,
  file,
  privacy,
  setFile,
  setImg,
  uid,
  displayName,
  loading,
}) {
  // UUID Gen
  const suid = new ShortUniqueId({ length: 10 })
  // Router
  const router = useRouter()
  // Refs
  const fileRef = useRef()
  const cancelRef = useRef()
  const taskRef = useRef()
  const imgRef = useRef()
  const captionRef = useRef()

  // States
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Variables
  cancelRef.current = false
  let uploadTask = null

  // Accepted files
  const acceptedFiles = ['image/png', 'image/jpeg']

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (!acceptedFiles.includes(selected.type)) {
      toast.error(<b>Please select only JPEG or PNG format</b>)
      return
    }
    if (selected) {
      setFile(selected)
      setImg(URL.createObjectURL(selected))
    }
  }

  const handleCancel = () => {
    taskRef.current.cancel()
    setProgress(0)
    setIsLoading(false)
  }

  // Function to upload photo
  const handleSubmit = async () => {
    if (!file) return
    setProgress(10)
    setIsLoading(true)
    const fileName = suid() + file.name
    const storageRef = ref(storage, `${uid}/photos/${fileName}`)
    uploadTask = uploadBytesResumable(storageRef, file)
    taskRef.current = uploadTask
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        if (!cancelRef.current) {
          setProgress(p)
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)

        if (!error.code === 'storage/canceled') {
          toast.error(<b>{error.message}</b>)
        }
        if (!cancelRef.current) {
          setIsLoading(false)
          setProgress(0)
        }
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)

        const aspectRatio = (
          imgRef.current?.naturalWidth / imgRef.current?.naturalHeight
        )?.toFixed(4)
        const postData = {
          type: 'photo',
          imgSrc: url,
          privacy,
          aspectRatio,
          caption: captionRef.current?.value || '',
        }
        await addPost(uid, displayName, postData)
        if (!cancelRef.current) {
          setIsLoading(false)
          setProgress(0)
          setImg('')
          setFile()
        }
        console.log(url)
        toast.success(<b>Upload done</b>)
        router.push('/u/' + uid)
      }
    )
  }

  useEffect(() => {
    return () => {
      cancelRef.current = true
    }
  }, [])

  return (
    <>
      {img ? (
        <>
          <div className={s.imgContainer}>
            <img ref={imgRef} src={img} alt="Uploaded Asset" />
          </div>
          <PhotoInfoForm
            privacy={privacy}
            handleRadio={handleRadio}
            captionRef={captionRef}
          />
        </>
      ) : null}
      {/* File */}
      <input
        className={s.fileInput}
        type="file"
        onChange={handleChange}
        ref={fileRef}
      />

      <div className={s.bottomDivWrapper}>
        <div className={`wrapper ${s.bottomDiv}`}>
          {progress > 0 ? (
            <div className={s.progressBar}>
              <div style={{ width: progress + '%' }} className={s.progress} />
            </div>
          ) : null}
          <div className={s.bottomBtnDiv}>
            {img ? (
              <>
                <Button
                  disabled={isLoading}
                  onClick={() => fileRef.current.click()}
                  types="blue-light"
                >
                  Choose another
                </Button>
                {isLoading ? (
                  <Button onClick={handleCancel} types="red">
                    Cancel
                  </Button>
                ) : (
                  <Button
                    disabled={loading}
                    onClick={handleSubmit}
                    types="blue"
                  >
                    Upload
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => fileRef.current.click()}
                types="blue-border"
              >
                Choose to upload
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
