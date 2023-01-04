const AuthReducer =(state, action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                accessToken:null,
                refreshToken:null,
                error:false
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload.user,
                accessToken:action.payload.accessToken,
                refreshToken:action.payload.refreshToken,
                isFetching:false,
                error:false
            };
        case "LOGIN_FAILURE":
            return{
                user:null,
                accessToken:null,
                refreshToken:null,
                isFetching:false,
                error:action.payload
            };
        case "LOGOUT":
            return{
                user:null,
                accessToken:null,
                refreshToken:null,
                isFetching:false,
                error:false
            }
        case "REFRESH_ACCESS_TOKEN":
            return{
                user:action.payload.user,
                accessToken:action.payload.accessToken,
                refreshToken:action.payload.refreshToken,
                isFetching:false,
                error:false
            }
        default:
            return state
    }
}

export default AuthReducer;