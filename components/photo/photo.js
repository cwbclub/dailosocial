import moment from 'moment/moment'
import Image from 'next/image'
import s from './photo.module.css'
import toast from 'react-hot-toast'
import { deletePost, updatePost } from '../../utils/firebase'
import Link from 'next/link'

export default function Photo({
  src,
  grid,
  aRatio,
  caption,
  timestamp,
  fileRef,
  id,
  uid,
  privacy,
  isOwn,
  handleModal,
  displayName,
}) {
  const handleDelete = async () => {
    const isConfirm = window.confirm('Are you confirm to delete the post?')
    if (isConfirm) {
      const toastid = toast.loading(<b>Deleting Please Wait!..</b>)
      try {
        await deletePost(uid, id, fileRef)
        toast.success(<b>Deleted Succesfully</b>, { id: toastid })
      } catch (error) {
        console.error(error.message)
        toast.error(<b>{error.message}</b>, { id: toastid })
      }
    }
  }

  const handleChange = async (e) => {
    const toastid = toast.loading(<b>Updating Please Wait!..</b>)
    try {
      await updatePost(uid, id, e.target.value)
      toast.success(<b>Updated Succesfully</b>, { id: toastid })
    } catch (error) {
      console.error(error.message)
      toast.error(<b>{error.message}</b>, { id: toastid })
    }
  }

  if (grid) {
    return (
      <div onClick={() => handleModal(src)} className={`${s.img} grid`}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoKAAoAAUAiJZwCdADdJb1kxgAA/v6Ev5if5l57vTvYitx8I542rfC1x7hSCeVAAAA="
          src={src}
          alt="Post"
          fill
          sizes="33vw"
        />
      </div>
    )
  }
  return (
    <div className={s.photoWrapper}>
      {displayName ? (
        <Link className={s.userName} href={'/u/' + uid}>
          @ {displayName}
        </Link>
      ) : (
        <div className={s.whiteSpace} />
      )}
      <div className={`${s.img} list`} style={{ aspectRatio: aRatio || 1 }}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoKAAoAAUAiJZwCdADdJb1kxgAA/v6Ev5if5l57vTvYitx8I542rfC1x7hSCeVAAAA="
          src={src}
          alt="Post"
          fill
          sizes="100vw"
        />
      </div>
      <div className={s.imgInfoDiv}>
        <p className={s.time}>
          Posted {moment.unix(timestamp.seconds).fromNow()}
        </p>
        <p className={s.caption}>{caption}</p>
        <div className={s.imgBottomDiv}>
          <div onClick={() => handleModal(src)} className={s.viewBtn}>
            View Original
          </div>
          {isOwn ? (
            <>
              <select onChange={handleChange} value={privacy}>
                <option value="onlyme">Onlyme</option>
                <option value="friends">Friends</option>
                <option value="feed">Feed</option>
              </select>
              <div onClick={handleDelete} className={s.dltBtn}>
                Delete Post
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
