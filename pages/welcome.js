import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext'
import useLogin from '../hooks/useLogin'
import { FaGoogle } from 'react-icons/fa'
import s from '../styles/Welcome.module.css'
import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import thumb from '../public/thumbnail.webp'

export default function Login() {
  // For navigation
  const router = useRouter()

  // Getting AUth info
  const { user, isAuthReady } = useAuth()
  const { login, isLoading } = useLogin()

  // State
  const [isReady, setIsReady] = useState(false)

  // Custom Function
  const handleVideo = useCallback(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (user && !isLoading && isAuthReady) {
      router.push('/')
    }
  }, [isLoading, user?.uid, isAuthReady])

  return (
    <>
      <Head>
        <title>Welcome | DailoSocial</title>
      </Head>
      <div className={`${s.loginPageWrapper} fullHeight`}>
        <div className={s.loginPage}>
          <div className={s.videoDiv}>
            <div className={s.videooverlay} />
            <Image
              style={{ opacity: !isReady ? 1 : 0 }}
              src={thumb}
              alt={'Thumbnail'}
              fill
              priority
            />
            <video
              onLoadedData={handleVideo}
              style={{ opacity: isReady ? 1 : 0 }}
              className={s.video}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/welcome.mp4" type="video/mp4" />
            </video>
          </div>

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
      </div>
    </>
  )
}

{
  /* <div className={styles.videooverlay} />
          <div
            style={{ opacity: !isReady ? 1 : 0 }}
            className={styles.thumbnail}
          >
            <Image src={thumb} alt={'Thumbnail'} layout="fill" priority />
          </div>
          <video
            onLoadedData={handleVideo}
            className={styles.video}
            style={{ opacity: isReady ? 1 : 0 }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/bgvideo.mp4" type="video/mp4" />
          </video> */
}
