import s from './imageGallery.module.css'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'
import { useState } from 'react'
import Link from 'next/link'
import Photo from './photo'
import { useLayoutData } from '../../context/layoutContext'
export default function ImageGallery({ view, uid, photos, loading }) {
  // States
  // const [grid, setGrid] = useState(true)
  const { grid, setGrid } = useLayoutData()
  console.log(grid)
  return (
    <div className={s.mainWrapper}>
      <div className={s.imageTopMenuWrapper}>
        <div className={`wrapper ${s.imageTopMenu}`}>
          <div onClick={() => setGrid(true)} className={grid ? 'active' : ''}>
            <HiOutlineViewGrid /> Grid
          </div>
          <div onClick={() => setGrid(false)} className={grid ? '' : 'active'}>
            <HiOutlineViewList /> List
          </div>
          <select>
            <option value="">Latest</option>
            <option value="">Oldest</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : photos?.length ? (
        <div className={`${s.imagesList} ${grid ? 'grid' : 'list'}`}>
          {photos.map((photo, i) => (
            <Photo
              key={i}
              src={photo.imgSrc}
              grid={grid}
              aRatio={photo?.aspectRatio}
              caption={photo?.caption}
            />
          ))}
        </div>
      ) : (
        <p>Gallery is empty add some photos here!!</p>
      )}
    </div>
  )
}

{
  /*  */
}

{
  /* <Link
            href={{
              pathname: '/u/' + uid,
              // query: { view: false },
            }}
            replace
            className={view ? '' : 'active'}
          >
            <HiOutlineViewGrid /> Grid
          </Link>
          <Link
            href={{
              pathname: '/u/' + uid,
              query: { view: 'list' },
            }}
            replace
            className={view === 'list' ? 'active' : ''}
          >
            <HiOutlineViewList /> List
          </Link> */
}
