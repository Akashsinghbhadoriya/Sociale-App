import React, { useContext, useEffect, useState } from 'react'
import "./centerbar.css";
import Share from "../share/Share"
import Post from '../post/Post';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Centerbar({username}) {
  const [posts,setPosts]=useState([]);
  const {user, accessToken} =useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts= async ()=>{
      const res = username ? await axios.get(`/posts/profile/${username}`,{headers:{authorization:`${accessToken}`}}) 
      : await axios.get(`/posts/timeline/${user._id}`,{headers:{authorization:`${accessToken}`}});
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[username,user._id, accessToken])
  return (
    <div className='centerbar'>
      <div className="centerbarWrapper">
        {(username==null || user.username===username) ? <Share /> : <></>}
        {posts.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

export default Centerbar