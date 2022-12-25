import { collection, onSnapshot } from 'firebase/firestore'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import { handleLike } from '../../utils/firebase'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import s from './likeBtn.module.css'

export default function LikeBtn({ userId, postId, isOwn }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let unsub
    try {
      unsub = onSnapshot(
        collection(db, 'posts', postId, 'likes'),
        (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs.map((item) => item.id)
            setLiked(data.includes(userId))
            setCount(data.length)
          } else {
            setLiked(false)
            setCount(0)
          }
          setIsLoading(false)
        }
      )
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  const handleClick = async () => {
    setLiked((prev) => !prev)
    debounceClick(!liked)
  }

  const debounceClick = useCallback(
    debounce(
      async (value) => {
        setIsLoading(true)
        try {
          await handleLike(value, postId, userId)
          setIsLoading(false)
        } catch (error) {
          console.error(error.message)
          setIsLoading(false)
        }
      },
      700,
      { leading: true }
    ),
    []
  )

  if (isLoading) {
    return <p>getting likes</p>
  }
  return isOwn ? (
    <span className={s.btn} disabled>
      Likes {count}
    </span>
  ) : (
    <button
      className={`${s.btn} ${liked ? 'liked' : ''}`}
      disabled={isLoading}
      onClick={handleClick}
    >
      {count || null}{' '}
      {liked ? (
        <span>
          <AiFillLike /> unlike
        </span>
      ) : (
        <span>
          <AiOutlineLike /> Like
        </span>
      )}
    </button>
  )
}
