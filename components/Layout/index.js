import BottomBar from './bottomBar'
import Nav from './nav'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <BottomBar />
    </>
  )
}
