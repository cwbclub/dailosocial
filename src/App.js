import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import PrivateRoute from './components/privateRoute'
import ProfileContextProvider from './context/profileContext'
import Blogs from './pages/Blogs'
import Friends from './pages/Friends'
import Home from './pages/Home'
import Images from './pages/Images'
import Login from './pages/Login'

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/u/:uid"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Images />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="friends" element={<Friends />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  )
}
