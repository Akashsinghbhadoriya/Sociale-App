import React, { useState } from 'react'
import "./rightbar.css"
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Rightbar({user}) {

  const [friends,setFriends]=useState([]);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:Loginuser , accessToken}=useContext(AuthContext);
  const [followed,setFollowed]= useState(Loginuser.following.includes(user?._id));


  useEffect(()=>{
    const fetchFriends= async ()=>{
      try{
        const res= await axios.get("/users/friends/" + (user._id || Loginuser._id),{headers:{authorization:`${accessToken}`}});
        setFriends(res.data);
      } catch(err){
        
      }
    }
    fetchFriends();
  },[user,Loginuser, accessToken]);

  const handleFollow= async()=>{
    try{
      if(followed){
        await axios.put("/users/" + user._id + "/unfollow", {userId:Loginuser._id},{headers:{authorization:`${accessToken}`}});
      }
      else{
        await axios.put("/users/" + user._id + "/follow", {userId:Loginuser._id},{headers:{authorization:`${accessToken}`}});
      }
    } catch(err){
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomePageRightbar=()=>{
    return (
      <>
      <div className="birthdayContainer">
          <img src={PF + "/gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText"> <b>Ayush</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img src={PF + "/ad.png"} className='rightbarAd' alt="" />
        <h4 className="rightbarTitle">online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user)=>(
            <Online key={user.id} user={user}/>
          ))}
        </ul>
      </>
    )
  }

  const ProfilePageRightbar=()=>{
    return (
      <>
      {user.username !== Loginuser.username && (
        <button className="rightbarFollowbutton" onClick={handleFollow}>
          {followed ? "Unfollow":"Follow"}
          {followed ? <RemoveIcon/>:<AddIcon/>}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className="rightbarfollowings">
          {friends.map((friend)=>(
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
            <div className="rightbarfollowing">
            <img src={PF + ( friend.profilePicture || "person/noAvatar.png")} alt="" className="rightbarfollowingImg" />
            <span className="rightbarfollowingName">{friend.username}</span>
            </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfilePageRightbar/> : <HomePageRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar