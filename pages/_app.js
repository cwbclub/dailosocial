import '../styles/globals.css'
import '../styles/nprogress.css'
import { Dosis } from '@next/font/google'
import AuthContextProvider from '../context/authContext'
import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import AuthWrapper from '../components/authRoutes'
import nProgress from 'nprogress'
import { useEffect } from 'react'
import { Router } from 'next/router'
import Layout from '../components/Layout'
import LayoutContextProvider from '../context/layoutContext'
import FriendsContextProvider from '../context/friendsContext'
import PostsContextProvider from '../context/postsContext'

const edu_Font = Dosis({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  // For Navigation
  const pathname = usePathname()

  const isPublic = pathname === '/welcome'

  // Configuration of NProgress
  nProgress.configure({ showSpinner: false })

  // UseEffect for nprogress
  useEffect(() => {
    const handleStart = () => nProgress.start()
    const handleStop = () => nProgress.done()
    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [])

  useEffect(() => {
    console.log(
      '%cCan%cWeBe!',
      'color: #e47e24; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;',
      'color: #fff; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
    )
    console.log(
      '%cHey explorer!, Are you lost?? Because this is not the right place for you. If you want to work with us at CanWeBe contact us now.',
      'color: #e1e1e1; font-size: 1.5em;'
    )
  }, [])

  return (
    <>
      <Head>
        <title>DailoSocial</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <main className={`${edu_Font.className} ${isPublic ? 'public' : ''}`}>
        <AuthContextProvider>
          {isPublic ? (
            <Component {...pageProps} />
          ) : (
            <AuthWrapper>
              <Layout>
                <LayoutContextProvider>
                  <FriendsContextProvider>
                    <PostsContextProvider>
                      <Component {...pageProps} />
                    </PostsContextProvider>
                  </FriendsContextProvider>
                </LayoutContextProvider>
              </Layout>
            </AuthWrapper>
          )}
        </AuthContextProvider>
      </main>
      <Toaster />
    </>
  )
}

export default MyApp
