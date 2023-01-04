import React from 'react'
import { useRef } from 'react';
import "./login.css"
import { LoginCall } from '../../apiCall';
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext"
import {Link} from "react-router-dom";

function Login() {

    const email=useRef();
    const password=useRef();

    const {isFetching, dispatch}= useContext(AuthContext)
    const handleLogin= (e)=>{
        e.preventDefault();
        try{
            LoginCall({email:email.current.value ,password: password.current.value}, dispatch);
        } catch(err){
            console.log(err);
        }
    };
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Sociale</h3>
                <span className="logindesc">
                    Connect with friends and world around you!!
                </span>
            </div>
            <div className="loginRight">
                <form className="loginbox" onSubmit={handleLogin}>
                    <input 
                        placeholder='Email' 
                        type="email" 
                        required 
                        ref={email} 
                        className='loginInput' />
                    <input 
                        placeholder='Password' 
                        type="password" 
                        required 
                        minLength="8"
                        ref={password} 
                        className='loginInput' />
                    <button className="loginButton" type='submit' disabled={isFetching}>
                        {isFetching ? "Loading" : "Log In"}
                    </button>
                    <span className="loginforgot">Forgot Password</span>
                    <Link to="/register" className='registerLink'>
                        <button className="loginRegisterButton">
                            {isFetching ? "Loading" : "Create a New Account"}
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login