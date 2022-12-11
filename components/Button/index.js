import s from './button.module.css'

export default function Button(props) {
  const { children, types, ...otherProps } = props
  return (
    <button {...otherProps} className={`${s.btn} ${types}`}>
      {children}
    </button>
  )
}
