import Link from 'next/link'
import { useState } from 'react'
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
  // States
  const [editMode, setEditMode] = useState(false)

  // Sort by Date
  const sortedData = blogSort === 'latest' ? blogs : [...blogs].reverse()

  return loading ? (
    <p className="loading">Getting Blogs List..</p>
  ) : blogs?.length ? (
    <div className="wrapper">
      <div className={s.blogTopMenu}>
        <select
          value={blogSort}
          onChange={(e) => setSort('blog', e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        {isOwn ? (
          <button
            className={editMode ? s.normalMode : ''}
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? 'Normal Mode' : 'Edit Mode'}
          </button>
        ) : null}
      </div>
      <div className={s.blogsList}>
        {sortedData.map((blog, i) => (
          <BlogCard key={i} data={blog} editMode={editMode} uid={uid} />
        ))}
      </div>
    </div>
  ) : (
    <p className="noinfo">No Blogs found, Add some blogs here! </p>
  )
}
