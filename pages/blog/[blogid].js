import parse from 'html-react-parser'
import { getBlog } from '../../utils/firebase'
import s from '../../styles/Blog.module.css'
import moment from 'moment/moment'
import Link from 'next/link'
import { useAuth } from '../../context/authContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import 'highlight.js/styles/monokai-sublime.css'
import { toast } from 'react-hot-toast'
import Loader from '../../components/loader'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { RiShareFill } from 'react-icons/ri'
import LikeBtn from '../../components/likeBtn'
const Custom404 = dynamic(() => import('../404'))

export default function BlogPage() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { content, title, displayName, timestamp, uid, privacy } = data
  const { user } = useAuth()

  const router = useRouter()
  const { blogid } = router.query

  useEffect(() => {
    const handleData = async () => {
      setIsLoading(true)
      try {
        const res = await getBlog(blogid)
        if (res?.title) {
          setData(res)
        }
        setIsLoading(false)
      } catch (error) {
        toast.error(<b>{error.message}</b>)
        console.error(error.message)
        setIsLoading(false)
      }
    }
    handleData()
  }, [blogid])

  useEffect(() => {
    if (user?.uid !== uid && privacy === 'onlyme') {
      router.push('/u/' + uid + '?menu=blogs')
    }
  }, [user?.uid, privacy, uid, router])

  const share = () => {
    const shareData = {
      title: 'Read this Blog only at DailoSocial',
      text: data?.title || 'My Blog',
      url: 'https://dailosocial.vercel.app' + router.asPath,
    }
    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    } else {
      alert('Not shareable')
    }
  }

  if (!data?.title && !isLoading) {
    return <Custom404 />
  }

  return (
    <>
      <Head>
        <title>{data?.title || 'Blog'} | DailoSocial</title>
        <meta
          property="og:image"
          content={
            'https://dailosocialogimg.vercel.app/api/param?title=' + title
          }
        />
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`wrapper ${s.blogWrapper}`}>
          <h1 className={s.title}>{title}</h1>
          <div className={s.namedateDiv}>
            <p className={s.name}>
              By <Link href={'/u/' + uid}>{displayName}</Link> ,
            </p>
            <p>{moment(timestamp).format('dddd, Do MMM YY')}</p>
            <button className={s.shareBtn} onClick={share}>
              <RiShareFill /> share
            </button>
            <LikeBtn
              userId={user?.uid}
              postId={blogid}
              isOwn={user?.uid === uid}
            />
          </div>

          <div id="post-content">{parse(content)}</div>
        </div>
      )}
    </>
  )
}
