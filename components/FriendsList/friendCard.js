import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProfile } from '../../utils/firebase'
import s from './friendList.module.css'

export default function FriendCard({ uid }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    const handleData = async () => {
      try {
        const res = await getProfile(uid)
        setData(res)
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    handleData()
  }, [uid])

  const handleClick = () => {}
  console.log(data)
  return !isLoading && !data ? null : (
    <div className={s.userCard}>
      {isLoading ? (
        <p>Getting info</p>
      ) : (
        <>
          <div className={s.img}>
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              src={data?.photoURL}
              alt={data?.displayName}
              fill
              sizes="33vw"
            />
          </div>
          <Link href={`/u/${data?.uid}`}>{data?.displayName}</Link>
          {/* <button onClick={handleClick}>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button> */}
        </>
      )}
    </div>
  )
}
