import {createContext, useContext, useState, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

function isTokenExpired(token){
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
}


export function AuthProvider({children}) {
    const [token, setToken] = useState(()=>{const storesdToken = localStorage.getItem("token");
        if(storesdToken && !isTokenExpired(storesdToken)){
            return storesdToken;
        }else{
            localStorage.removeItem("token");
            return null;
        }
    })

    useEffect(()=>{
        if(token){
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token])


    return(
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}   