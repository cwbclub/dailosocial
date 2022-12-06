import { RiLock2Fill } from 'react-icons/ri'
import { MdPublic } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi'
import s from './privacyGroup.module.css'

export default function PrivacyGroup({ privacy, handleRadio }) {
  return (
    <div className={s.privacyDiv}>
      <label>Privacy :</label>
      <div className={s.optionWrapper}>
        <div
          onClick={() => handleRadio('onlyme')}
          className={privacy === 'onlyme' ? s.active : ''}
        >
          <RiLock2Fill />
          Only me
        </div>
        <div
          onClick={() => handleRadio('friends')}
          className={privacy === 'friends' ? s.active : ''}
        >
          <HiUsers />
          Friends
        </div>
        <div
          onClick={() => handleRadio('all')}
          className={privacy === 'all' ? s.active : ''}
        >
          <MdPublic />
          All
        </div>
      </div>
    </div>
  )
}
