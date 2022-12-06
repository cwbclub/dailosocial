import Image from 'next/image'
import s from './imageGallery.module.css'

export default function Photo({ src, grid, aRatio, caption }) {
  if (grid) {
    return (
      <div className={s.img}>
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
      <div className={s.img} style={{ aspectRatio: aRatio || 1 }}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoKAAoAAUAiJZwCdADdJb1kxgAA/v6Ev5if5l57vTvYitx8I542rfC1x7hSCeVAAAA="
          src={src}
          alt="Post"
          fill
          sizes="100vw"
        />
      </div>
      <p>{caption}</p>
    </div>
  )
}
