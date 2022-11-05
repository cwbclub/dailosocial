import { useState } from 'react'
import ImageLists from '../../components/ImageLists'
import ImageCard from '../../components/ImageLists'
import { useProfile } from '../../context/profileContext'
import './imagesPage.style.css'

export default function Images(props) {
  const { photos, loading } = useProfile()
  const [mode, setMode] = useState('grid')

  const handleMode = (value) => {
    setMode(value)
  }
  return (
    <div className="imageBody">
      <div className="imageBar">
        <span onClick={() => handleMode('grid')}>Grid</span>
        <span onClick={() => handleMode('list')}>List</span>
      </div>
      {loading ? (
        <p className="loading">Loading Please Wait..</p>
      ) : photos.length > 0 ? (
        <ImageLists photos={photos} mode={mode} handleMode={handleMode} />
      ) : (
        <p>Add some photo here</p>
      )}
    </div>
  )
}
