import Link from 'next/link'
import BlogCard from '../blogCard'
import s from './blogList.module.css'

export default function BlogsList({
  uid,
  blogs,
  loading,
  isOwn,
  blogSort,
  setSort,
}) {
  const sortedData = blogSort === 'latest' ? blogs : [...blogs].reverse()

  return (
    <>
      <select
        value={blogSort}
        onChange={(e) => setSort('blog', e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
      {loading ? (
        <p className="noinfo">Loading Data....</p>
      ) : blogs?.length ? (
        <div className={`wrapper ${s.blogsList}`}>
          {sortedData.map((blog, i) => (
            <BlogCard key={i} data={blog} />
          ))}
        </div>
      ) : (
        <p className="noinfo">No Blogs found, Add some blogs here! </p>
      )}
    </>
  )
}
