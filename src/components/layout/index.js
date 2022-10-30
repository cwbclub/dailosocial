import Nav from './nav'
import Footer from './footer'
import './layout.style.css'

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
