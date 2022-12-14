import { createContext, useEffect, useState, useContext  } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => { 

    const userTokenStorage = localStorage.getItem("userToken");
    
    const [token, setToken] = useState();
    
    useEffect(() => {
        
         
          

         

    }, []);
    
    return(
        <AuthContext.Provider value ={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);