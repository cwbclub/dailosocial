import Image from 'next/image'
import s from '../styles/error404.module.css'
import img from '../components/errorImg/img3.svg'

export default function Offline() {
  return (
    <div className={s.wrapper}>
      <div className={s.img}>
        <Image src={img} alt="Offline" sizes="100vw" fill />
      </div>
      <p>Ohh oh something went wrong or you are offline</p>
    </div>
  )
}
