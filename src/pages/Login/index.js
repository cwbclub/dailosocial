import './login.style.css'
import { FaGoogle } from 'react-icons/fa'
import useSeo from '../../hooks/useSeo'
import { useEffect, useState } from 'react'
import useLogin from '../../hooks/useLogin'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  // For navigation
  const navigate = useNavigate()

  // For SEO
  useSeo('Login')
  // Getting AUth info

  const { user } = useAuth()

  const { login, isLoading } = useLogin()

  // Custom Function

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="loginPage">
        <div className="loginBox">
          <h1>Welcome to DailoSocial</h1>

          {isLoading ? (
            <button disabled>Loading...</button>
          ) : (
            <button onClick={login}>
              <FaGoogle />
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
