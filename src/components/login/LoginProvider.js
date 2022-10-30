import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/auth/AuthService';
import { authHeader } from '../..';
import axios from 'axios';
import { properties } from '../../properties/properties.js'

const LoginContext = createContext({
    authenticated: false,
    setAuthenticated: () => {},
    user: null,
});

export const useMenuLoginHook = () => useContext(LoginContext);

const LoginProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const isAuth = async () => {
        try {
           const res = await axios.get(
                properties.baseUrl + "user/current", authHeader
           );
           setLoading(false);
           setAuthenticated(true);

        //   axios.get(URL_BASE + "user/current", authHeader)
          
          setUser(res.data);
        } catch(error) {
          setUser(null);
        };
      };
  
      isAuth();
    }, [authenticated]);
  
    return (
      <LoginContext.Provider value={{ authenticated, setAuthenticated, user }}>
        {children}
      </LoginContext.Provider>
    );
  };

export default LoginProvider;