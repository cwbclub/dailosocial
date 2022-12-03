import s from './loader.module.css'

export default function Loader() {
  return (
    <div className={s.wrapper}>
      <p>DailoSocial</p>
      <span>Loading...</span>
    </div>
  )
}
