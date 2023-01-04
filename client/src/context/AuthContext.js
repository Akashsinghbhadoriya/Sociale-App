import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const res=JSON.parse(window.localStorage.getItem("LoggedInData"));

const INITIAL_STATE ={
    user:(res? res.data.user : null),
    accessToken: (res? res.data.accessToken : null),
    refreshToken: (res? res.data.refreshToken : null),
    isFetching:false,
    error: false
};

export const AuthContext= createContext(INITIAL_STATE);

export const AuthContextProvider= ({children})=>{
    const [state, dispatch]= useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider 
            value={{
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
                }}>
                    {children}
        </AuthContext.Provider>
    )
}