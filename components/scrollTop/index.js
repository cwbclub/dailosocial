import s from './scrollTop.module.css'
import { IoIosArrowUp } from 'react-icons/io'

export default function ScrollTop() {
  return (
    <div className={s.topBtn}>
      <IoIosArrowUp />
    </div>
  )
}
