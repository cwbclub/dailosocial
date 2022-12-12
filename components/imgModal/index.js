import Image from 'next/image'
import s from './imgModal.module.css'
import { RiCloseFill } from 'react-icons/ri'
import { createPortal } from 'react-dom'

export default function ImgModal({ modalImg, handleModal }) {
  return createPortal(
    <div className={s.wrapper}>
      <button onClick={() => handleModal('')}>
        <RiCloseFill />
      </button>
      <div className={s.img}>
        <Image
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoKAAoAAUAiJZwCdADdJb1kxgAA/v6Ev5if5l57vTvYitx8I542rfC1x7hSCeVAAAA="
          src={modalImg}
          alt="Post"
          fill
          sizes="100vw"
        />
      </div>
    </div>,
    document.body
  )
}
