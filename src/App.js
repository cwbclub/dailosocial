import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import PrivateRoute from './components/privateRoute'
import Home from './pages/Home'
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

          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  )
}
