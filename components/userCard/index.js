import Image from 'next/image'
import Link from 'next/link'
import s from './userCard.module.css'

export default function UserCard({ data }) {
  const { photoURL, displayName, uid } = data
  return (
    <div className={s.userCard}>
      <div className={s.img}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoKAAoAAUAiJZwCdADdJb1kxgAA/v6Ev5if5l57vTvYitx8I542rfC1x7hSCeVAAAA="
          src={photoURL}
          alt={displayName}
          fill
          sizes="33vw"
        />
      </div>
      <Link href={`/u/${uid}`}>{displayName}</Link>
      <button>Follow</button>
    </div>
  )
}
