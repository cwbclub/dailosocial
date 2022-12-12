import Image from 'next/image'
import s from '../styles/error404.module.css'
import img from '../components/errorImg/error404.svg'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    const tracker = setTimeout(() => {
      router.push('/')
    }, 7000)

    return () => clearTimeout(tracker)
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.img}>
        <Image src={img} alt="Error 404 Not found" sizes="100vw" fill />
      </div>
      <p>You are in wrong place go back to Home</p>
    </div>
  )
}
