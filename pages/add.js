import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import useLiveData from '../hooks/useLiveData'
import s from '../styles/Add.module.css'

const BlogUpload = dynamic(() => import('../components/blogUpload'), {
  loading: () => <p className="loading">Loading...</p>,
})
const PhotoUpload = dynamic(() => import('../components/photoUpload'), {
  loading: () => <p className="loading">Loading...</p>,
})

export default function Add() {
  const {
    query: { menu },
  } = useRouter()
  // States
  const [file, setFile] = useState(null)
  const [img, setImg] = useState()
  const [privacy, setPrivacy] = useState('onlyme')

  // Callback Function
  // Handle radio btn
  const handleRadio = (value) => setPrivacy(value)

  // Change img
  const handleChnageImg = (value) => {
    setImg(value)
  }
  // Change file
  const handleChnageFile = (value) => {
    setFile(value)
  }

  // Data of Users
  const { user } = useAuth()
  const { data, loading } = useLiveData(`users/${user?.uid}`)

  return (
    <>
      <Head>
        <title>Add | DailoSocial</title>
      </Head>
      <div className={`wrapper ${s.addPage}`}>
        <div className={s.topMenu}>
          <Link className={menu ? '' : s.active} href="/add">
            Image
          </Link>
          <Link
            className={menu ? s.active : ''}
            href={{
              pathname: '/add',
              query: { menu: 'blog' },
            }}
          >
            Blog
          </Link>
        </div>
        <>
          {menu === 'blog' ? (
            <BlogUpload
              displayName={data?.displayName}
              uid={user?.uid}
              loading={loading}
            />
          ) : (
            <PhotoUpload
              handleRadio={handleRadio}
              img={img}
              file={file}
              privacy={privacy}
              setImg={handleChnageImg}
              setFile={handleChnageFile}
              loading={loading}
              displayName={data?.displayName}
              uid={user?.uid}
            />
          )}
        </>
      </div>
    </>
  )
}
