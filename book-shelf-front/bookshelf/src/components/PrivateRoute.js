import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  const { verifyToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const verified = await verifyToken();
      setIsAuthenticated(verified);
      setLoading(false);
    };
    checkAuth();
  }, [verifyToken]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;