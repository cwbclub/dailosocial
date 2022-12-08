import Link from 'next/link'
import BlogCard from '../blogCard'
import s from './blogList.module.css'

export default function BlogsList({ uid, blogs, loading, isOwn }) {
  console.log(blogs)
  return loading ? (
    <p className="noinfo">Loading Data....</p>
  ) : blogs?.length ? (
    <div className={`wrapper ${s.blogsList}`}>
      {blogs.map((blog, i) => (
        <BlogCard key={i} data={blog} />
      ))}
    </div>
  ) : (
    <p className="noinfo">No Blogs found, Add some blogs here! </p>
  )
}
