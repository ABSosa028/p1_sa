import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../utils/auth';

const Home = () => {
  const { loading, verifyToken } = useAuth();
  const navigate = useNavigate();

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyToken();
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [verifyToken, navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        textAlign: 'center', 
        mt: 8,
        p: 4,
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a la Biblioteca
        </Typography>
        <Typography variant="h5" paragraph>
          Sistema de gestión de libros y colecciones
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/login')}
            sx={{ px: 4 }}
          >
            Iniciar Sesión
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ px: 4 }}
          >
            Registrarse
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button 
            variant="text" 
            onClick={() => navigate('/books')}
          >
            Ver catálogo de libros
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;