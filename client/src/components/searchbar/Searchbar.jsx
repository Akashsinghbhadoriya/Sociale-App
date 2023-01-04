import React from 'react'
import "./searchbar.css";

function Searchbar({filteruser}) {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='searchbarContainer'>
      <div className="searchbaruser">
        <img src={PF + (filteruser.profilePicture || "person/noAvatar.png")} className="searchbaruserImg" alt="" />
        <span className="username">{filteruser.username}</span>
        <hr/>
      </div>
    </div>
  )
}

export default Searchbar