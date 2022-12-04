import EditSection from './editSection'
import { FaEdit } from 'react-icons/fa'
import Image from 'next/image'
import s from './userInfo.module.css'
import Button from '../Button'
import { useState } from 'react'
import userImg from '../../public/user.webp'

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
    <div className={s.userInfoDiv}>
      <div className={s.img}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
          src={photoURL || userImg}
          alt="User Avatar"
          fill
        />
      </div>

      <p className={s.name}>{displayName}</p>
      <div className={s.content}>
        {info ? (
          <p>{info}</p>
        ) : (
          <p className={s.noInfo}>No info Found edit your info now</p>
        )}
        {isOwn ? (
          <Button types="xs primary" onClick={() => handleEdit(true)}>
            <FaEdit /> Edit Profile
          </Button>
        ) : (
          <Button>Follow</Button>
        )}
      </div>
    </div>
  )
}
