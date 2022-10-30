import { useAuth } from '../../context/authContext'
import useSeo from '../../hooks/useSeo'
import './home.style.css'

export default function Home() {
  useSeo('Home')

  const value = useAuth()

  console.log(value)

  return (
    <div className="wrapper">
      <h1>Home</h1>
    </div>
  )
}
