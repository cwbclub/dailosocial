import parse from 'html-react-parser'
import { getBlog } from '../../utils/firebase'
import s from '../../styles/Blog.module.css'
import moment from 'moment/moment'
import Link from 'next/link'
import { useAuth } from '../../context/authContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import 'highlight.js/styles/monokai-sublime.css'

export default function BlogPage({ data }) {
  const { content, title, displayName, timestamp, uid, privacy } = data
  const { user } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (user?.uid !== uid && privacy === 'onlyme') {
      router.push('/u/' + uid + '?menu=blogs')
    }
  }, [user?.uid, privacy, uid, router])

  return (
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

export async function getServerSideProps({ params: { blogid } }) {
  const data = await getBlog(blogid)

  if (!data?.title) {
    return {
      notFound: true,
    }
  }
  return { props: { data } }
}
