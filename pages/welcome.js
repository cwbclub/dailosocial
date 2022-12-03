import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext'
import useLogin from '../hooks/useLogin'
import { FaGoogle } from 'react-icons/fa'
import s from '../styles/Welcome.module.css'
import { useEffect } from 'react'

export default function Login() {
  // For navigation
  const router = useRouter()

  // Getting AUth info

  const { user, isAuthReady } = useAuth()

  const { login, isLoading } = useLogin()

  // Custom Function

  useEffect(() => {
    if (user && !isLoading && isAuthReady) {
      router.push('/')
    }
  }, [isLoading, user?.uid, isAuthReady])

  return (
    <div className="wrapper">
      <div className={s.loginPage}>
        <div className={s.loginBox}>
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
        <p>
          Powered by{' '}
          <a
            href="https://canwebe.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            CanWeBe!
          </a>
        </p>
      </div>
    </div>
  )
}
