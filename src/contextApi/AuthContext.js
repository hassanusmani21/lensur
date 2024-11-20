import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import "core-js/stable/atob";



const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const setToken = (token) => {
    if (typeof token === 'string' && token.trim() !== '') {
      try {
        const decodedToken = jwtDecode(token);
        setAuthState(decodedToken);
      } catch (error) {
        console.error("Invalid token format", error);
      }
    } else {
      console.error("Token must be a valid non-empty string");
    }
  };

  const getTokenFromCookie = () => {
    return Cookies.get('access_token');
  };
  

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setToken(token);
    }
  }, []);


  const logout = () => {
    // Clear the access_token cookie and reset authState
    Cookies.remove('access_token');
    setAuthState(null);
  };

  return (
    <AuthContext.Provider value={{ authState, setToken, getTokenFromCookie, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
