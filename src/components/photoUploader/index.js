import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ShortUniqueId from 'short-unique-id'
import { storage } from '../../lib/firebase'
import { addPost } from '../../utlis/firebase'
import SampleImage from './image'
import './photoUploader.style.css'
import PrivacyGroup from './privacyGroup'

export default function PhotoUploader({ handleChangeOpen, uid, displayName }) {
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

  const handleClick = (e) => {
    if (e.target.classList.contains('photoUploaderWrapper')) {
      handleChangeOpen(false)
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
        const postData = {
          type: 'photo',
          imgSrc: url,
          privacy,
        }
        await addPost(uid, displayName, postData)
        if (!cancelRef.current) {
          setIsLoading(false)
          setProgress(0)
          handleChangeOpen(false)
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

  return (
    <div className="photoUploaderWrapper" onClick={handleClick}>
      {console.count('Run Uploader')}
      <div className="photoUploader">
        {img ? (
          <div className="imgDiv">
            <img src={img} alt="Selected Asset" />
          </div>
        ) : null}
        <input
          onChange={handleChange}
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
        />
        <div className="bottomDiv">
          {progress > 0 ? (
            <div className="progressBar">
              <div style={{ width: progress + '%' }} className="progress"></div>
            </div>
          ) : null}

          {file && <PrivacyGroup handleRadio={handleRadio} privacy={privacy} />}
          {img ? (
            <div className="btnDiv">
              <button
                disabled={isLoading}
                onClick={() => fileRef.current.click()}
                className="changeBtn"
              >
                Choose other
              </button>
              {isLoading ? (
                <button onClick={handleCancel} className="cancelBtn">
                  Cancel
                </button>
              ) : (
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="uploadBtn"
                >
                  Upload
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => fileRef.current.click()}
              className="chooseBtn"
            >
              Choose Image to Upload
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
