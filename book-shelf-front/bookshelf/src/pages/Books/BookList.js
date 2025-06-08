import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Alert,
  Chip
} from '@mui/material';
import { Add, Edit, Delete, ThumbUp, Comment, BookmarkAdd } from '@mui/icons-material';
import api from '../../api/auth';
import { useAuth } from '../../utils/auth';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [reactions, setReactions] = useState({});
  const [personalBooks, setPersonalBooks] = useState([]);
  const [openPersonalModal, setOpenPersonalModal] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [notes, setNotes] = useState('');
  const [readingStatus, setReadingStatus] = useState('en_progreso');

  // Form state
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    genero: '',
    descripcion: '',
    anioPublicacion: '',
    imagen: 'imagen.jpg'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Obtener libros
        const booksResponse = await api.get('/book');
        setBooks(booksResponse.data);
        
        // Obtener reacciones
        const reactionsData = {};
        for (const book of booksResponse.data) {
          const res = await api.get(`/book/reacciones/${book.id}`);
          reactionsData[book.id] = res.data;
        }
        setReactions(reactionsData);
        
        // Obtener lista personal del usuario
        if (user) {
          const personalResponse = await api.get('/personal-librery/get-personal-by-user');
          setPersonalBooks(personalResponse.data?.librosIds || []);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    return books.filter(book => 
      book.titulo.toLowerCase().includes(lowerTerm) ||
      book.autor.toLowerCase().includes(lowerTerm) ||
      book.genero.toLowerCase().includes(lowerTerm)
    );
  };

  const filteredBooks = searchTerm ? handleSearch(searchTerm) : books;

  const handleOpenPersonalModal = (bookId) => {
    setSelectedBooks([bookId]);
    if (personalBooks.length === 0) {
      setOpenPersonalModal(true);
    } else {
      handleAddToPersonalList([bookId]);
    }
  };

  const handleAddToPersonalList = async (bookIds) => {
    try {
      setLoading(true);
      
      if (personalBooks.length === 0) {
        // Primera vez que agrega libros
        await api.post('/personal-librery', {
          librosIds: bookIds,
          estadoLectura: readingStatus,
          notas: notes
        });
        setSuccess('Libro(s) agregado(s) a tu lista personal con notas');
      } else {
        // Ya tiene libros, hacer PATCH
        const allBooks = [...personalBooks, ...bookIds];
        await api.patch('/personal-librery', {
          librosIds: allBooks
        });
        setSuccess('Libro(s) agregado(s) a tu lista personal');
      }
      
      // Actualizar lista personal
      const response = await api.get('/personal-librery/get-personal-by-user');
      setPersonalBooks(response.data?.librosIds || []);
      setOpenPersonalModal(false);
      setNotes('');
      
    } catch (error) {
      console.error('Error adding to personal list:', error);
      setError('Error al agregar a lista personal');
    } finally {
      setLoading(false);
    }
  };

  // Resto de las funciones permanecen igual...
  const handleOpenCreateModal = () => {
    setCurrentBook(null);
    setFormData({
      titulo: '',
      autor: '',
      genero: '',
      descripcion: '',
      anioPublicacion: '',
      imagen: 'imagen.jpg'
    });
    setOpenModal(true);
  };

  const handleOpenEditModal = (book) => {
    setCurrentBook(book);
    setFormData({
      titulo: book.titulo,
      autor: book.autor,
      genero: book.genero,
      descripcion: book.descripcion,
      anioPublicacion: book.anioPublicacion,
      imagen: book.imagen || 'imagen.jpg'
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setError('');
  };

  const handleOpenCommentModal = (book) => {
    setCurrentBook(book);
    setCommentText('');
    setOpenCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
    setError('');
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    
    try {
      setCommentLoading(true);
      await api.post(`/book/comentario/${currentBook.id}`, {
        comentario: commentText
      });
      setSuccess('Comentario agregado correctamente');
      setOpenCommentModal(false);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Error al agregar comentario');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLike = async (bookId) => {
    try {
      await api.post(`/book/reaccion/${bookId}`);
      setSuccess('Like agregado correctamente');
      const res = await api.get(`/book/reacciones/${bookId}`);
      setReactions(prev => ({
        ...prev,
        [bookId]: res.data.total
      }));
    } catch (error) {
      console.error('Error adding like:', error);
      setError('Error al agregar like');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBook) {
        await api.put(`/book/${currentBook.id}`, formData);
        setSuccess('Libro actualizado correctamente');
      } else {
        await api.post('/book', formData);
        setSuccess('Libro creado correctamente');
      }
      
      // Refrescar datos
      const booksResponse = await api.get('/book');
      setBooks(booksResponse.data);
      
      setOpenModal(false);
    } catch (error) {
      console.error('Error saving book:', error);
      setError(error.response?.data?.message || 'Error al guardar el libro');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      try {
        await api.delete(`/book/${id}`);
        setSuccess('Libro eliminado correctamente');
        
        // Refrescar datos
        const booksResponse = await api.get('/book');
        setBooks(booksResponse.data);
        
      } catch (error) {
        console.error('Error deleting book:', error);
        setError('Error al eliminar el libro');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Catálogo de Libros
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Buscar por título, autor o género"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenCreateModal}
          >
            Nuevo Libro
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Año Publicación</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.titulo}</TableCell>
                  <TableCell>{book.autor}</TableCell>
                  <TableCell>{book.genero}</TableCell>
                  <TableCell>{book.anioPublicacion}</TableCell>
                  <TableCell>
                    <Chip 
                      icon={<ThumbUp />} 
                      label={reactions[book.id] || 0} 
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/books/${book.id}`}
                      state={{ bookData: book }}
                      sx={{ mr: 1 }}
                    >
                      Ver Detalle
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditModal(book)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleLike(book.id)}
                    >
                      <ThumbUp />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => handleOpenCommentModal(book)}
                    >
                      <Comment />
                    </IconButton>
                    <IconButton
                      color="success"
                      onClick={() => handleOpenPersonalModal(book.id)}
                      disabled={personalBooks.includes(book.id)}
                    >
                      <BookmarkAdd />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal para crear/editar libros */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentBook ? 'Editar Libro' : 'Crear Nuevo Libro'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Título"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Autor"
                  name="autor"
                  value={formData.autor}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Género"
                  name="genero"
                  value={formData.genero}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Año de Publicación"
                  name="anioPublicacion"
                  type="number"
                  value={formData.anioPublicacion}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Grid>
              <input type="hidden" name="imagen" value={formData.imagen} />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
          >
            {currentBook ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para comentarios */}
      <Dialog open={openCommentModal} onClose={handleCloseCommentModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          Añadir Comentario
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Escribe tu comentario"
            multiline
            rows={4}
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCommentModal}>Cancelar</Button>
          <Button 
            onClick={handleAddComment} 
            color="primary" 
            variant="contained"
            disabled={!commentText || commentLoading}
          >
            {commentLoading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para lista personal (solo se muestra si no tiene libros agregados) */}
      <Dialog open={openPersonalModal} onClose={() => setOpenPersonalModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Agregar a Mi Lista de Lectura
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              label="Estado de lectura"
              value={readingStatus}
              onChange={(e) => setReadingStatus(e.target.value)}
              fullWidth
              SelectProps={{
                native: true,
              }}
            >
              <option value="en_progreso">En progreso</option>
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
            </TextField>
            
            <TextField
              label="Notas"
              multiline
              rows={4}
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPersonalModal(false)}>Cancelar</Button>
          <Button 
            onClick={() => handleAddToPersonalList(selectedBooks)} 
            color="primary" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookList;