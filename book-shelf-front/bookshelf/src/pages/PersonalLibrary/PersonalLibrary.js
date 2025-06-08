import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  Box,
  CircularProgress
} from '@mui/material';
import api from '../../api/auth';
import BookList from '../../components/BookList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PersonalLibrary = () => {
  const [value, setValue] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/personal-librery/get-personal-by-user');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching personal library:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const readingBooks = books.length > 0 ? books.filter(book => book.estadoLectura === 'en_progreso') : [];
  const toReadBooks = books.length > 0  ? books.filter(book => book.estadoLectura === 'pendiente') : [];
  const readBooks = books.length > 0 ? books.filter(book => book.estadoLectura === 'completado') : [];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Mi Biblioteca Personal
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Leyendo" />
          <Tab label="Por Leer" />
          <Tab label="Leídos" />
        </Tabs>
      </Box>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TabPanel value={value} index={0}>
            <BookList books={readingBooks.libros} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BookList books={toReadBooks.libros} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BookList books={readBooks.libros} />
          </TabPanel>
        </>
      )}
    </Container>
  );
};

export default PersonalLibrary;