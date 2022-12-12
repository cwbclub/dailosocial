import { useState } from 'react'
import BlogCard from '../components/blogCard'
import ImgModal from '../components/imgModal'
import Loader from '../components/loader'
import Photo from '../components/photo/photo'
import { useAuth } from '../context/authContext'
import { useFriends } from '../context/friendsContext'
import useGetPosts from '../hooks/useGetPosts'
import s from '../styles/Home.module.css'

export default function Home() {
  const { followings, loading } = useFriends()
  const { user } = useAuth()
  const { data, isLoading } = useGetPosts(followings, user?.uid, loading)
  const [modalImg, setModalImg] = useState('')

  const handleModal = (value) => {
    setModalImg(value)
  }

  return (
    <div className={s.homeBody}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.postsList}>
          {data.map((item, i) =>
            item?.type === 'photo' ? (
              <Photo
                key={i}
                src={item?.imgSrc}
                aRatio={item?.aspectRatio}
                caption={item?.caption}
                timestamp={item?.timestamp}
                displayName={item?.displayName}
                uid={item?.uid}
                handleModal={handleModal}
              />
            ) : (
              <BlogCard key={i} data={item} displayName={item?.displayName} />
            )
          )}
        </div>
      )}
      {modalImg ? (
        <ImgModal modalImg={modalImg} handleModal={handleModal} />
      ) : null}
    </div>
  )
}
