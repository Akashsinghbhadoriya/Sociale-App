import React from 'react'
import "./online.css";

function Online({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <li className="rightbarFriend">
            <div className="rightbarFriendContainer">
              <img src={PF+user.profilePicture} alt="" className="rightbarFriendImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
          </li>
    </div>
  )
}

export default Online