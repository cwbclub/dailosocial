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
import Custom404 from '../404'

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
        console.log(error.message)
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

  if (!data?.title && !isLoading) {
    return <Custom404 />
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`wrapper ${s.blogWrapper}`}>
      <h1 className={s.title}>{title}</h1>
      <div className={s.namedateDiv}>
        <p className={s.name}>
          By <Link href={'/u/' + uid}>{displayName}</Link> ,
        </p>
        <p>{moment(timestamp).format('dddd, Do MMM YY')}</p>
      </div>
      <div id="post-content">{parse(content)}</div>
    </div>
  )
}
