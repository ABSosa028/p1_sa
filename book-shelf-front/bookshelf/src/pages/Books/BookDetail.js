import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box,
  CircularProgress,
  Alert,
  Avatar,
  List,
  Grid,
  ListItemText,
  Button,
  Divider,
  Chip
} from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowBack as ArrowBackIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
  Book as BookIcon
} from '@mui/icons-material';
import api from '../../api/auth';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // <-- Para acceder al estado de navegación
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  
  // Obtener los datos del libro del estado de navegación
  const book = location.state?.bookData || {
    titulo: 'Libro no encontrado',
    autor: 'Desconocido',
    genero: 'Sin género',
    anioPublicacion: 'N/A',
    descripcion: 'No hay descripción disponible',
    imagen: ''
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/book/get-coments/${id}`);
        setComments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los comentarios');
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/books')}
          sx={{ mt: 2 }}
        >
          Volver al listado
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/books')}
        sx={{ mb: 3 }}
      >
        Volver al listado
      </Button>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Información del libro */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                src={book.imagen} 
                variant="rounded"
                sx={{ 
                  width: 250, 
                  height: 350,
                  fontSize: 100,
                  bgcolor: 'primary.main'
                }}
              >
                {!book.imagen && <BookIcon fontSize="inherit" />}
              </Avatar>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {book.titulo}
            </Typography>
            
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {book.autor}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Chip label={book.genero} icon={<CategoryIcon />} />
              <Chip label={book.anioPublicacion} icon={<CalendarIcon />} />
            </Box>
            
            <Typography variant="body1" paragraph>
              {book.descripcion}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Comentarios */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Comentarios ({comments.length})
          </Typography>
          
          {comments.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No hay comentarios para este libro.
            </Typography>
          ) : (
            <List>
              {comments.map((comment, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2 }}>
                      {comment.usuarioNombre?.charAt(0) || 'U'}
                    </Avatar>
                    <ListItemText
                      primary={comment.usuarioNombre || 'Usuario anónimo'}
                      secondary={new Date(comment.createdAt || new Date()).toLocaleDateString()}
                    />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {comment.comentario}
                  </Typography>
                </Paper>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookDetail;