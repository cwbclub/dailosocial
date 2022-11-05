import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useUpload from '../../hooks/useUpload'
import { updateProfile, uploadFile } from '../../utlis/firebase'
import './editSection.style.css'
import ShortUniqueId from 'short-unique-id'
import { FaHourglassStart, FaSync, FaTimes } from 'react-icons/fa'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../lib/firebase'

export default function EditSection({
  displayName,
  photoURL,
  info,
  uid,
  handleEdit,
}) {
  // States
  const [name, setName] = useState(displayName)
  const [img, setImg] = useState(photoURL)
  const [file, setFile] = useState(null)
  const [myinfo, setMyinfo] = useState(info)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Ref
  const fileref = useRef()

  // Refs for cancelation
  const cancelRef = useRef()
  cancelRef.current = false

  // Custome Function
  const handleCancel = (e) => {
    e.preventDefault()
    handleEdit(false)
  }

  const handlePic = (e) => {
    e.preventDefault()
    fileref.current.click()
  }
  //
  const handleFile = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    if (selected) {
      const url = URL.createObjectURL(selected)
      setImg(url)
    }
  }

  // Checking what changes done
  const checkchanges = () => {
    if (name !== displayName && myinfo === info) {
      return { displayName: name }
    }
    if (myinfo !== info && name === displayName) {
      return { info: myinfo }
    } else {
      return { displayName: name, info: myinfo }
    }
  }

  // Firesbase upload to storage
  const uploadFile = async (id) => {
    const storageRef = ref(storage, `${uid}/avatar`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        // Update when in mount
        if (!cancelRef.current) {
          setProgress(p)
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        throw new Error(error.message)
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        const res = checkchanges()
        await updateProfile(uid, { ...res, photoURL: url })
        toast.success(<b>Update Done</b>, { id })

        // Update when in mount
        if (!cancelRef.current) {
          handleEdit(false)
          setIsLoading(false)
        }
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const id = toast.loading(<b>Updating Please Wait..</b>)

    try {
      if (img === photoURL && name === displayName && info === myinfo) {
        toast.success(<b>No changes, please make some changes</b>, { id })
        setIsLoading(false)
        return
      }

      if (img !== photoURL) {
        await uploadFile(id)
      } else {
        const res = checkchanges()
        await updateProfile(uid, res)

        // Update when in mount
        if (!cancelRef.current) {
          handleEdit(false)
          setIsLoading(false)
        }

        toast.success(<b>Update Done</b>, { id })
      }
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })

      // Update when in mount
      if (!cancelRef.current) {
        setIsLoading(false)
      }
    }
  }

  // Cleanup function

  useEffect(() => {
    return () => (cancelRef.current = true)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="editSection wrapper">
      <img src={img} alt="User Avatar" />
      <input
        ref={fileref}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
      />

      <button disabled={isLoading} className="changePic" onClick={handlePic}>
        Change Profile Pic
      </button>

      <input
        type="text"
        value={name}
        required
        placeholder="Enter your Display Name"
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Write about yourself"
        rows={4}
        value={myinfo}
        onChange={(e) => setMyinfo(e.target.value)}
      />

      <div className="btnDiv">
        <button onClick={handleCancel}>
          <FaTimes />
          Cancel
        </button>

        {isLoading ? (
          <button className="updatingBtn" disabled>
            <FaHourglassStart />
            Updating
            <span style={{ width: progress + '%' }} className="progress"></span>
          </button>
        ) : (
          <button className="updateBtn" type="submit">
            <FaSync /> Update
          </button>
        )}
      </div>
    </form>
  )
}
