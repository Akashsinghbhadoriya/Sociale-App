import React, { useContext } from 'react'
import "./profile.css";
import Centerbar from '../../components/centerbar/Centerbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Topbar from "../../components/topbar/Topbar"
import Rightbar from "../../components/rightbar/Rightbar"
import {useState, useEffect} from "react";
import axios from "axios"
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

function Profile() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]= useState({});
  const username = useParams().username;
  const {accessToken}=useContext(AuthContext);

  useEffect(()=>{
    const fetchUser= async ()=>{
      const res = await axios.get("/users?username="+ username,{headers:{authorization:`${accessToken}`}});
      setUser(res.data);
    }
    fetchUser();
  },[username, accessToken])

  return (
    <div>
      <Topbar/>
      <div className="profileContainer">
        <Leftbar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img className='profileCoverImg' src={PF + (user.coverPicture || "person/noCover.png")} alt="" />
                    <img className='profileUserImg' src={PF + (user.profilePicture || "person/noAvatar.png")} alt="" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoUsername">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc || "No Description"}</span>
                </div>
            </div>
            <div className="profileRightBottom">
            <Centerbar username={username}/>
            <Rightbar user={user}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile