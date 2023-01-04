import axios from "axios";

export const LoginCall= async (userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res= await axios.post("/auth/login", userCredential);
        window.localStorage.setItem("LoggedInData",JSON.stringify(res));
        dispatch({type:"LOGIN_SUCCESS",payload: res.data});
    } catch(err){
        dispatch({type:"LOGIN_FAILURE",payload: err});
    }
}
