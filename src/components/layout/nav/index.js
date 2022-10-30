import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div className="wrapper">
      <nav>
        <Link className="logo" to="/">
          DailoSocial
        </Link>
        <Link className="navBtn" to="/login">
          Login
        </Link>
      </nav>
    </div>
  )
}
