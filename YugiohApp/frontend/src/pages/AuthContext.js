import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    
    return storedUser && storedUser.token ? storedUser : null;
  });

  const navigate = useNavigate();

  
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token } = response.data;

      const decodedToken = jwtDecode(token);
      const currentUser = { userId: decodedToken.userId, username: decodedToken.username, token };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setUser(currentUser);

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login', error);
      throw new Error(error.response ? error.response.data.error : 'Login failed');
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/register', { username, password });
      console.log("reguster response is ", response.status)
      if (response.status === 201) {
          //const { token } = response.data;
          //const decodedToken = jwtDecode(token);
          //const currentUser = { userId: decodedToken.userId, username: decodedToken.username, token };

          //localStorage.setItem('currentUser', JSON.stringify(currentUser));
          //setUser(currentUser);
          navigate('/login');
      } else {
          throw new Error('Signup failed');
      }
  } catch (error) {
      throw new Error(error.response?.data?.error || 'Signup failed!'); //this line
  }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  const getUserId = () => {
    if (user && user.token) {
      const decodedToken = jwtDecode(user.token);
      return decodedToken.userId;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
