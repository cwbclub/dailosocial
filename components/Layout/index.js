import { useAuth } from '../../context/authContext'
import BottomBar from './bottomBar'
import Nav from './nav'

export default function Layout({ children }) {
  const { user } = useAuth()

  return (
    <>
      <Nav uid={user?.uid} />
      {children}
      <BottomBar uid={user?.uid} />
    </>
  )
}
