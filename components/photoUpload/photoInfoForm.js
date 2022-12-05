import s from './photoUpload.module.css'

export default function PhotoInfoForm({
  privacy,
  handleRadio,
  handleChange,
  fileRef,
}) {
  return (
    <form className={s.photoForm}>
      <input type="file" onChange={handleChange} ref={fileRef} />
      <textarea rows={2} maxLength={80} placeholder="Your Caption (max: 80)" />
      <div className={s.privacyDiv}>
        <label>Privacy :</label>
        <div>
          <input
            type="radio"
            value="onlyme"
            name="privacy"
            checked={privacy === 'onlyme'}
            onChange={handleRadio}
          />
          Only me
        </div>
        <div>
          <input
            type="radio"
            value="friends"
            name="privacy"
            checked={privacy === 'friends'}
            onChange={handleRadio}
          />
          Friends
        </div>
        <div>
          <input
            type="radio"
            value="all"
            name="privacy"
            checked={privacy === 'all'}
            onChange={handleRadio}
          />
          All
        </div>
      </div>
    </form>
  )
}
