export default function PrivacyGroup({ handleRadio, privacy }) {
  return (
    <div className="privacyDiv">
      <label>Privacy :</label>
      <div className="privacyBtn">
        <input
          type="radio"
          value="onlyme"
          name="privacy"
          checked={privacy === 'onlyme'}
          onChange={handleRadio}
        />
        Only me
      </div>
      <div className="privacyBtn">
        <input
          type="radio"
          value="friends"
          name="privacy"
          checked={privacy === 'friends'}
          onChange={handleRadio}
        />
        Friends
      </div>
      <div className="privacyBtn">
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
  )
}
