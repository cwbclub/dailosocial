import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button'
import PhotoInfoForm from './photoInfoForm'
import s from './photoUpload.module.css'
import ShortUniqueId from 'short-unique-id'
import { useAuth } from '../../context/authContext'

export default function PhotoUpload() {
  // uid

  const { user } = useAuth()
  // UUID Gen
  const suid = new ShortUniqueId({ length: 10 })

  // Refs
  const fileRef = useRef()
  const cancelRef = useRef()
  const taskRef = useRef()

  // States
  const [file, setFile] = useState(null)
  const [img, setImg] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [privacy, setPrivacy] = useState('onlyme')

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
    setProgress(1)
    setIsLoading(true)
    const fileName = suid() + file.name
    const storageRef = ref(storage, `${user?.uid}/photos/${fileName}`)
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
        const postData = {
          type: 'photo',
          imgSrc: url,
          privacy,
        }
        await addPost(uid, displayName, postData)
        if (!cancelRef.current) {
          setIsLoading(false)
          setProgress(0)
        }
        console.log(url)
        toast.success(<b>Upload done</b>)
      }
    )
  }
  // Handle radio btn
  const handleRadio = (e) => setPrivacy(e.target.value)

  useEffect(() => {
    return () => {
      cancelRef.current = true
    }
  }, [])
  console.log('file', file)
  return (
    <>
      <div className={s.imgContainer}>
        {img ? <img src={img} alt="Uploaded Asset" /> : null}
      </div>

      <PhotoInfoForm
        privacy={privacy}
        handleRadio={handleRadio}
        handleChange={handleChange}
        fileRef={fileRef}
      />
      <div className={s.bottomDivWrapper}>
        <div className={`wrapper ${s.bottomDiv}`}>
          {/* <Button types="blue-border">Choose to upload</Button> */}
          <Button onClick={() => fileRef.current.click()} types="blue-light">
            Choose another
          </Button>
          <Button onClick={handleSubmit} types="blue">
            Upload
          </Button>
          <Button onClick={handleCancel} types="red">
            Cancel
          </Button>
        </div>
      </div>
    </>
  )
}
