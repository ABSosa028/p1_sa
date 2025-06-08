import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambiar por tu URL de API
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Funciones específicas de autenticación
export const login = async (credentials) => {
  return api.post('/auth/login', credentials);
};

export const register = async (userData) => {
  return api.post('/auth/register', userData);
};

export const forgotPassword = async (emailOrUsername) => {
  return api.post('/auth/recover-password', { emailOrUsername });
};

export const resetPassword = async (data) => {
  return api.post('/auth/change-password', data);
};


export default api;