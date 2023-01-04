import React,{useContext} from 'react'
import Centerbar from '../../components/centerbar/Centerbar'
import Leftbar from '../../components/leftbar/Leftbar'
import Topbar from "../../components/topbar/Topbar"
import Rightbar from "../../components/rightbar/Rightbar"
import "./home.css";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext'
import jwt_decode from "jwt-decode";

function Home() {

  const {user, accessToken, refreshToken,dispatch} =useContext(AuthContext);

  const refreshtoken=async ()=>{
      try{
          const res=await axios.post("/auth/refresh",{token:refreshToken});
          const refreshData=({ user:user,
              accessToken:res.data.accessToken,
              refreshToken:res.data.refreshToken});
          dispatch({type:"REFRESH_ACCESS_TOKEN",payload:refreshData});
      } catch(err){
          console.log(err);
      }
  }
  const axiosJWT=axios.create();

  axiosJWT.interceptors.request.use(async ()=>{
    let currentDate=new Date();
    const decodedToken=jwt_decode(accessToken);
    if(decodedToken.exp *1000 < currentDate.getTime()){
      await refreshtoken();
    }
  },(error)=>{
    return Promise.reject(error);
  });

  return (
    <div>
      <Topbar/>
      <div className="homeContainer">
        <Leftbar/>
        <Centerbar/>
        <Rightbar/>
      </div>
    </div>
  )
}

export default Home