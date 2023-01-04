import React, { useState, useEffect } from 'react'
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import {format} from "timeago.js";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {

    const [like,setlike]=useState(post.likes.length);
    const [isliked,setisliked]=useState(false);
    const [user,setUser]=useState({})
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser, accessToken}=useContext(AuthContext);

    const likehandler= ()=>{
        try{
            axios.put(`/posts/${post._id}/like`,{userId:currentUser._id},{headers:{authorization:`${accessToken}`}});
        } catch(err){
        }
        setlike(isliked? like-1:like+1);
        setisliked(!isliked);
    }

    useEffect(()=>{
        const fetchUser= async ()=>{
          const res = await axios.get(`/users?userId=${post.userId}`,{headers:{authorization:`${accessToken}`}});
          setUser(res.data);
        }
        fetchUser();
      },[post.userId, accessToken])

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <img src={PF+(user.profilePicture || "person/noAvatar.png")} alt="" className="postUserPic" />
                    </Link>
                    <span className='postUserName'>{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon className='postTopMoreIcon'/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className='postImg' src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className='LikeIcon' src={`${PF}heart.png`} onClick={likehandler} alt="" />
                    <img className='LikeIcon' src={`${PF}like.png`} onClick={likehandler} alt="" />
                    <span className="postLikeCounter">{like} people liked this post</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentsCounter">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post