import moment from 'moment'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { usePosts } from '../context/postsContext'
import s from '../styles/Home.module.css'

const BlogCard = dynamic(() => import('../components/blogCard'))
const ContentLoader = dynamic(() => import('../components/contentLoader'))
const ErrorImg = dynamic(() => import('../components/errorImg'))
const ImgModal = dynamic(() => import('../components/imgModal'))
const Photo = dynamic(() => import('../components/photo/photo'))

export default function Home() {
  const { user } = useAuth()
  const [modalImg, setModalImg] = useState('')

  const handleModal = (value) => {
    setModalImg(value)
  }

  const { posts, postsLoading, handleData, isEmpty } = usePosts()

  // if (!postsLoading && posts?.length) {
  //   return <ContentLoader title="Getting Posts Data" />
  // }

  return (
    <div className={s.homeBody}>
      <div className="wrapper">
        <div className={s.greetDiv}>
          <p>{moment().format('ddd DD MMMM, YY')}</p>
          <h1>{getGreet(user?.displayName || 'user')}</h1>
        </div>
      </div>
      {postsLoading && !posts?.length ? (
        <ContentLoader title="Getting Posts Data" />
      ) : !posts?.length ? (
        <ErrorImg type="high" title="No Posts Found Follow some users!" />
      ) : (
        <>
          <div className={s.postsList}>
            {posts.map((item, i) =>
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
          {isEmpty ? (
            <p className={s.emptyLists}>Nothing more here</p>
          ) : postsLoading ? (
            <p className={s.loading}>Getting Posts..</p>
          ) : (
            <button className={s.loadMore} onClick={() => handleData(true)}>
              Load More
            </button>
          )}
        </>
      )}

      {modalImg ? (
        <ImgModal modalImg={modalImg} handleModal={handleModal} />
      ) : null}
    </div>
  )
}

const getGreet = (name) => {
  const hour = new Date().getHours()
  if (hour < 12) {
    return `Hey ${name}, Good Morning`
  } else if (hour < 18) {
    return `Hello ${name}, Good Afternoon`
  } else {
    return `Hi ${name}, Good Evening`
  }
}
