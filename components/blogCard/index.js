import moment from 'moment'
import Link from 'next/link'
import s from './blogCard.module.css'

export default function BlogCard({ data }) {
  return (
    <div className={s.blogCard}>
      <p className={s.date}>
        {moment.unix(data.timestamp.seconds).format('dddd, Do MMM YY')}
      </p>
      <Link className={s.title} href={'/blog/' + data?.id}>
        {data?.title}
      </Link>
      <p className={s.shortInfo}>{data?.shortinfo}</p>
      <Link className={s.readNow} href={'/blog/' + data?.id}>
        read now
      </Link>
    </div>
  )
}
