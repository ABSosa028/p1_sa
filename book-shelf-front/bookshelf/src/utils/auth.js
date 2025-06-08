import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const token = response.data.token
      setToken(token);
      setUser(response.data)
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      throw error;
    } finally{
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      setToken(response.data.token);
      setUser(response.data)
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  const requestPasswordReset = async (emailOrUsername) => {
    try {
      await api.post('/auth/recover-password', { emailOrUsername });
      navigate('/reset-password');
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (data) => {
    try {
      await api.post('/auth/change-password', data);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      register: registerUser,
      requestPasswordReset,
      resetPassword,
      verifyToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);