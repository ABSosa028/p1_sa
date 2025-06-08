import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 4 }}>
        Panel Principal
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Libros
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Explora nuestro catálogo de libros
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/books')}
              >
                Ver Libros
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mi Biblioteca
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Gestiona tus libros personales
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/my-library')}
              >
                Ver Biblioteca
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Colecciones
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Organiza tus libros en colecciones
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/collections')}
              >
                Ver Colecciones
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;