import PrivacyGroup from '../privacyGroup'
import s from './photoUpload.module.css'

export default function PhotoInfoForm({ privacy, handleRadio, captionRef }) {
  return (
    <form className={s.photoForm}>
      <textarea
        ref={captionRef}
        rows={2}
        maxLength={80}
        placeholder="Your Caption (max: 80)"
      />
      <PrivacyGroup privacy={privacy} handleRadio={handleRadio} />
    </form>
  )
}
