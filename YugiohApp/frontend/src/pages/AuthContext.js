import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      // Check if token is expired
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(decodedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);
   

    const login = async (username, password) => {
      try {
        const response = await axios.post('/api/auth/login', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
    
        // Decode the token to extract user details
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); 
        setUser(decodedToken); 
    
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to login', error);
        throw new Error(error.response ? error.response.data.error : 'Login failed');
      }
    };
    

  const register = async (username, password) => {
    try {
      const response = await axios.post('api/auth/register', {
        username,
        password,
      });
      
      const { token } = response.data;
      //setUser({ username, token });
      navigate('/login');
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const getUserId = () =>{
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    console.log("this is the decoded token",decodedToken)
    return decodedToken.userId;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

//localStorage.removeItem('token');


