import s from './imageGallery.module.css'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'
import { useState } from 'react'
import { useLayoutData } from '../../context/layoutContext'
import Photo from '../photo/photo'
import ImgModal from '../imgModal'
export default function ImageGallery({ uid, photos, loading, isOwn }) {
  const { grid, setGrid } = useLayoutData()

  const [modalImg, setModalImg] = useState('')
  const [sort, setSort] = useState('latest')

  const handleModal = (value) => {
    setModalImg(value)
  }

  const handleChange = (e) => {
    setSort(e.target.value)
  }

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
          <select onChange={handleChange} value={sort}>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
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
              timestamp={photo?.timestamp}
              id={photo?.id}
              fileRef={photo?.fileRef}
              uid={uid}
              privacy={photo?.privacy}
              isOwn={isOwn}
              handleModal={handleModal}
            />
          ))}
        </div>
      ) : (
        <p className="noinfo">Gallery is empty add some photos here!!</p>
      )}
      {modalImg ? (
        <ImgModal modalImg={modalImg} handleModal={handleModal} />
      ) : null}
    </div>
  )
}
