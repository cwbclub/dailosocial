import s from './blogUpload.module.css'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p className="noinfo">Loading ...</p>,
})
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/monokai-sublime.css'
import PrivacyGroup from '../privacyGroup'
import Button from '../Button'
import toast from 'react-hot-toast'
import { addBlog, addPost } from '../../utils/firebase'
import { useRouter } from 'next/navigation'

const modules = {
  toolbar: [
    [
      { header: [1, 2, false] },

      'bold',
      'italic',
      'strike',
      'blockquote',
      'code-block',
      { color: [] },
      { list: 'ordered' },
      { list: 'bullet' },

      'link',
      'image',
      'clean',
    ],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
}

export default function BlogUpload({ uid, displayName, loading }) {
  const [content, setContent] = useState('')
  const [blogInfo, setBlogInfo] = useState({
    privacy: 'onlyme',
    title: '',
    shortinfo: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  // Ref for cancelation
  const isCancel = useRef()

  isCancel.current = false

  // Router
  const router = useRouter()

  const { title, privacy, shortinfo } = blogInfo

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadio = (value) => {
    setBlogInfo((prev) => ({
      ...prev,
      privacy: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      toast.error(<b>Title should not be empty!</b>)
      return
    }
    if (shortinfo.trim() === '') {
      toast.error(<b>Type some short info</b>)
      return
    }
    if (content.trim() === '') {
      toast.error(<b>Write some content</b>)
      return
    }
    const toastId = toast.loading(<b>Please wait saving your post!</b>)
    setIsLoading(true)
    try {
      const res = await addBlog(uid, displayName, {
        title,
        shortinfo,
        content,
      })
      toast.success(<b>Blog uploaded successfully</b>, { id: toastId })
      if (res) {
        router.push('/blog/' + res)
      }
      if (!isCancel.current) {
        setBlogInfo({
          privacy: 'onlyme',
          title: '',
          shortinfo: '',
        })
        setContent('')
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(<b>{error.message}</b>, { id: toastId })
      if (!isCancel.current) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    return () => (isCancel.current = true)
  }, [])
  return (
    <>
      {console.log(content)}
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formDiv}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Title of The Blog"
            value={title}
            onChange={handleChange}
            name="title"
            maxLength={80}
          />
        </div>
        <div className={s.formDiv}>
          <label>Short Info</label>
          <textarea
            name="shortinfo"
            placeholder="Enter short info about blog"
            value={shortinfo}
            onChange={handleChange}
            maxLength={120}
          />
        </div>

        <ReactQuill
          id="editor-content"
          modules={modules}
          theme="snow"
          value={content}
          placeholder="Type your main content here..."
          onChange={setContent}
        />
        <PrivacyGroup privacy={privacy} handleRadio={handleRadio} />
        <Button disabled={isLoading || loading} type="submit" types="blue">
          {isLoading ? 'Loading..' : privacy === 'onlyme' ? 'Save' : 'Post'}
        </Button>
      </form>
    </>
  )
}
