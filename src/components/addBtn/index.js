import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import './addBtn.style.css'

export default function AddBtn({ handleChangeOpen }) {
  const [isMenu, setIsMenu] = useState(false)

  // Custom function
  const handlePhoto = () => {
    setIsMenu(false)
    handleChangeOpen(true)
  }
  return (
    <div className="addBtnDiv">
      <button
        onClick={() => setIsMenu((prev) => !prev)}
        className={`addBtn ${isMenu ? 'active' : ''}`}
      >
        <MdAdd />
      </button>
      {isMenu ? (
        <div className="menu">
          <button onClick={handlePhoto}>Upload Photo</button>
          <button>Upload Blog</button>
        </div>
      ) : null}
    </div>
  )
}
