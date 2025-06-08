import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box 
} from '@mui/material';
import { useAuth } from '../utils/auth';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Shelf
          </Typography>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Inicio
              </Button>
              <Button color="inherit" component={Link} to="/books">
                Libros
              </Button>
              <Button color="inherit" component={Link} to="/my-library">
                Mi Biblioteca
              </Button>
              <Button color="inherit" component={Link} to="/collections">
                Colecciones
              </Button>
              <Button color="inherit" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ py: 3, flex: 1 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Book Shelf
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;