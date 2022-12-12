import Image from 'next/image'
import s from './errorImg.module.css'
import img1 from './img1.svg'
import img2 from './img2.svg'
import img3 from './img3.svg'

export default function ErrorImg({ title, type }) {
  const getImg = () => {
    switch (type) {
      case 'one':
        return img1
      case 'two':
        return img2
      case 'three':
        return img3
      default:
        return img1
    }
  }

  return (
    <div className={`${s.wrapper} ${type === 'three' ? s.big : null}`}>
      <div className={s.img}>
        <Image src={getImg(type)} alt={title} fill />
      </div>
      <p>{title}</p>
    </div>
  )
}
