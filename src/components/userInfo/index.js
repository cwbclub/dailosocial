import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import EditSection from '../editSection'
import './userInfo.style.css'

export default function UserInfo({ photoURL, displayName, info, myuid, uid }) {
  // Checking own profile'
  const isOwn = myuid === uid

  // States
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = (value) => {
    setIsEdit(value)
  }

  return isEdit ? (
    <EditSection
      displayName={displayName}
      info={info}
      uid={uid}
      photoURL={photoURL}
      handleEdit={handleEdit}
    />
  ) : (
    <div className="userInfoDiv">
      <img src={photoURL || '/user.webp'} alt="User Avatar" />
      <p className="name">{displayName}</p>
      <div className="content">
        {info ? (
          <p className="info">{info}</p>
        ) : (
          <p className="noInfo">No info Found edit your info now</p>
        )}
        {isOwn ? (
          <button className="editBtn" onClick={() => handleEdit(true)}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button>Follow</button>
        )}
      </div>
    </div>
  )
}
