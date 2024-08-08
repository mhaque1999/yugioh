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
        setUser({ username });
        navigate('/dashboard');
        } catch (error) {
        console.error('Failed to login', error);
        }
    };

  const register = async (username, password) => {
    try {
      const response = await axios.post('api/auth/register', {
        username,
        password,
      });
      
      const { token } = response.data;
      setUser({ username, token });
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Failed to signup');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
