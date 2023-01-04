import React, { useContext, useEffect, useState } from 'react'
import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Searchbar from "../searchbar/Searchbar";

function Topbar() {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user, dispatch, accessToken} =useContext(AuthContext);
  const [userlist, setUserlist]=useState([]);
  const [filterusers, setFilterusers]=useState([]);

  useEffect(()=>{
    const fetchUsers= async ()=>{
      const res=await axios.get("/users/allUsers",{headers:{authorization:`${accessToken}`}});
      setUserlist(res.data);
    }
    fetchUsers();
  },[accessToken])

  const handleLogout=()=>{
    window.localStorage.removeItem("LoggedInData");
    dispatch({type:"LOGOUT"});
    window.location.reload();
  }

  const handleSearch=(e)=>{
    if(e.target.value.length>0){
      const filteredusers=userlist.filter((user)=>{
        return user.username.toLowerCase().includes(e.target.value.toLowerCase());
      })
      setFilterusers(filteredusers);
    }
    else{
      setFilterusers([]);
    }
  }

  const handleSearchbar=()=>{
    document.getElementById("searchInputvalue").value= "";
    setFilterusers([]);
  }

  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Sociale</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon"/>
            <input type="text" placeholder='search for user' className="searchInput" id="searchInputvalue" onChange={handleSearch}/>
          </div>
          <div className="searchBarResults">
            {filterusers.length>0 ?
            (filterusers.map((filteruser)=>(
              <Link to={"/profile/" + filteruser.username} style={{textDecoration:"none"}} onClick={handleSearchbar}>
                <Searchbar filteruser={filteruser}/>
              </Link>
            )))  
            : <></>}
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link to="/" style={{textDecoration:"none"}}>
              <span className="topbarlink">Homepage</span>
            </Link>
            <button className="logoutButton" onClick={handleLogout}>Logout</button>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon/>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon/>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon/>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img 
            src={PF + (user.profilePicture || "person/noAvatar.png")} 
            alt="" className="topbarImg" />
          </Link>
        </div>
    </div>
  )
}

export default Topbar