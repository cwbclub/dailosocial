import parse from 'html-react-parser'
import { getBlog } from '../../utils/firebase'
import s from '../../styles/Blog.module.css'
import moment from 'moment/moment'
import Link from 'next/link'

export default function BlogPage({ data }) {
  const { content, title, displayName, timestamp, uid } = data
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
