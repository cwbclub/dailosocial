import './userInfo.style.css'

export default function UserInfo({ imgSrc, displayName, info }) {
  return (
    <div className="userInfoDiv">
      <img src={imgSrc} alt="User Avatar" />
      <p className="name">{displayName}</p>
      {info ? (
        <p className="info">{info}</p>
      ) : (
        <p className="noInfo">No info Found</p>
      )}
      {/* <button className="followBtn">Follow</button> */}
    </div>
  )
}
