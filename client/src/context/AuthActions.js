export const LoginStart= (userCredential)=>({
    type:"LOGIN_START"
})

export const LoginSuccess= (user)=>({
    type:"LOGIN_SUCCESS",
    payload: user
})

export const LoginFailure= (error)=>({
    type:"LOGIN_FAILURE",
    payload: error,
})

export const RefreshAccessToken=(user)=>({
    type:"REFRESH_ACCESS_TOKEN",
    payload:user,
})

export const Logout=()=>({
    type:"LOGOUT"
})