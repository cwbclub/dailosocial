import s from './scrollTop.module.css'
import { IoIosArrowUp } from 'react-icons/io'
import { useEffect, useState } from 'react'

export default function ScrollTop({ scrollRef }) {
  const [showBtn, setShowBtn] = useState(false)

  const scrollTop = () => {
    const nav = document.querySelector('nav')
    console.log(nav)
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log(window)
      if (window.pageYOffset > 200) {
        setShowBtn(true)
      }
    }
    console.log('running', window)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      onClick={scrollTop}
      className={`${s.topBtn} ${showBtn ? '' : 'hidden'}`}
    >
      <IoIosArrowUp />
    </div>
  )
}
