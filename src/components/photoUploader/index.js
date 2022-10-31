import { useRef, useState } from 'react'
import SampleImage from './image'
import './photoUploader.style.css'

export default function PhotoUploader({ handleChangeOpen }) {
  const fileRef = useRef()
  // States
  const [file, setFile] = useState(null)
  const [img, setImg] = useState()

  const handleChange = (e) => {
    const selected = e.target.files[0]
    if (selected) {
      setFile(selected)
      setImg(URL.createObjectURL(selected))
    }
  }

  const handleClick = (e) => {
    if (e.target.classList.contains('photoUploaderWrapper')) {
      console.log('trye')
      handleChangeOpen(false)
    }
  }

  return (
    <div className="photoUploaderWrapper" onClick={handleClick}>
      <div className="photoUploader">
        <div className="flexWrapper">
          <div className="imgDiv">
            {img ? (
              <img src={img} alt="Uploaded File" />
            ) : (
              <div className="sampleImg">
                <SampleImage />
              </div>
            )}
          </div>
          <input onChange={handleChange} ref={fileRef} type="file" />
          <button onClick={() => fileRef.current.click()} className="chooseBtn">
            Choose Image to Upload
          </button>
        </div>
      </div>
    </div>
  )
}
