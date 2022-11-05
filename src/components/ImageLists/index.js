import moment from 'moment/moment'
import { useRef } from 'react'
import './imageLists.style.css'

export default function ImageLists({ photos, mode, handleMode }) {
  const isGrid = mode === 'grid'

  return (
    <div className={`imageList ${isGrid ? 'grid' : 'list'}`}>
      {photos.map((item, i) => (
        <div key={i} className="imageCard">
          <img src={item?.imgSrc} alt="Assets" />
          {!isGrid && (
            <div className="details">
              <p className="time">
                Posted {moment.unix(item.timestamp.seconds).fromNow()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
