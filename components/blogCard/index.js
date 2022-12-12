import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteBlog, deletePost } from '../../utils/firebase'
import s from './blogCard.module.css'

export default function BlogCard({ data, editMode, uid, displayName }) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // Custom Functions
  const handleDelete = async () => {
    const isConfirm = window.confirm(
      'Are you sure you want to delete this blog?'
    )

    if (isConfirm) {
      setIsLoading(true)
      const toastId = toast.loading(<b>Deleting this post, Please Wait!!</b>)
      try {
        await deletePost(uid, data?.id)
        toast.success(<b>Deleted Successfully</b>, { id: toastId })
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
        toast.error(<b>{error.message}</b>, { id: toastId })
        setIsLoading(false)
      }
    }
  }
  const handleEdit = () => {
    router.push({
      pathname: '/add',
      query: { menu: 'blog', edit: data?.id },
    })
  }
  return (
    <div className={`${s.blogCard} ${displayName ? s.post : null}`}>
      {displayName ? (
        <Link className={s.userName} href={'/u/' + data?.uid}>
          @ {displayName}
        </Link>
      ) : null}
      <p className={s.date}>
        {displayName ? (
          <>Posted {moment.unix(data?.timestamp?.seconds).fromNow()}</>
        ) : (
          moment.unix(data?.timestamp?.seconds).format('dddd, Do MMM YY')
        )}
      </p>
      <Link className={s.title} href={'/blog/' + data?.id}>
        {data?.title}
      </Link>
      <p className={s.shortInfo}>{data?.shortinfo}</p>
      <div className={s.editBar}>
        <Link className={s.readNow} href={'/blog/' + data?.id}>
          Read now
        </Link>
        {editMode ? (
          <div className={s.editBtnDiv}>
            <button disabled={isLoading} onClick={handleEdit}>
              Edit
            </button>
            <button disabled={isLoading} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
