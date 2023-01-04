import React, {useRef} from 'react'
import "./register.css"
import axios from "axios";
import {useNavigate} from "react-router"
import { Link } from 'react-router-dom';

function Register() {

    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordagain=useRef();
    const navigate=useNavigate();

    const handleRegister= async (e)=>{
        e.preventDefault();
        if(passwordagain.current.value !== password.current.value){
            password.current.setCustomValidity("password's don't match");
        }
        else{
            const user={
                username:username.current.value,
                email: email.current.value,
                password: password.current.value
            }

            try{
               await axios.post("/auth/register",user);
               navigate("/login");
            } catch(err){

            }
        }
    }
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
                <form className="loginbox" onSubmit={handleRegister}>
                    <input 
                        placeholder='Username' 
                        className='loginInput' 
                        ref={username} 
                        required
                    />
                    <input 
                        placeholder='Email' 
                        type="email"
                        className='loginInput' 
                        ref={email} 
                        required/>
                    <input 
                        placeholder='Password' 
                        type="password" 
                        className='loginInput' 
                        ref={password} 
                        required minLength="8"/>
                    <input 
                        placeholder='Password Again' 
                        type="password" 
                        className='loginInput' 
                        ref={passwordagain} 
                        required 
                        minLength="8"/>
                    <button className="loginButton" type='submit'>Sign Up</button>
                    <Link to="/login" className='loginLink'>
                        <button className="loginRegisterButton">Login to your Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register