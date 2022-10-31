import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import useUpload from '../../hooks/useUpload'
import { updateProfile } from '../../utlis/firebase'
import './editSection.style.css'
import ShortUniqueId from 'short-unique-id'

export default function EditSection({
  displayName,
  photoURL,
  info,
  uid,
  handleEdit,
}) {
  // UUID Gen
  const suid = new ShortUniqueId({ length: 10 })

  // States
  const [name, setName] = useState(displayName)
  const [img, setImg] = useState(photoURL)
  const [file, setFile] = useState(null)
  const [myinfo, setMyinfo] = useState(info)
  const [isLoading, setIsLoading] = useState(false)

  // Ref
  const fileref = useRef()

  // Custom Hooks for Uploading

  const { progress, url, upload } = useUpload()

  // Custome Function
  const handleCancel = (e) => {
    e.preventDefault()
    handleEdit(false)
  }

  const handlePic = (e) => {
    e.preventDefault()
    fileref.current.click()
  }

  const handleFile = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    if (selected) {
      const url = URL.createObjectURL(selected)
      setImg(url)
    }
  }

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
        console.log('New Phot')
        const newFileName = suid() + file.name
        const loc = `${uid}/${newFileName}`
        await upload(loc, file)
        if (url) {
          const res = checkchanges()
          await updateProfile(uid, { ...res, photoURL: url })
        }
      } else {
        const res = checkchanges()
        await updateProfile(uid, res)
      }
      toast.success(<b>Update Done</b>, { id })
      handleEdit(false)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id })
      setIsLoading(false)
    }
  }

  console.log(progress, url)
  return (
    <form onSubmit={handleSubmit} className="editSection">
      <img src={img} alt="User Avatar" />
      <input
        ref={fileref}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
      />
      <button className="changePic" onClick={handlePic}>
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
        <button onClick={handleCancel}>Cancel</button>
        <button disabled={isLoading} type="submit">
          {isLoading ? 'Updating' : 'Update'}
        </button>
      </div>
    </form>
  )
}
