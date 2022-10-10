import { createContext, useEffect, useState, useContext  } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => { 

    const userStorage = localStorage.getItem("user");
    
    const [token, setToken] = useState();
    
    useEffect(() => {
        
         
          
        if (userStorage) {

            setToken(JSON.parse(userStorage));
        }
         

    }, []);
    
    return(
        <AuthContext.Provider value ={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);