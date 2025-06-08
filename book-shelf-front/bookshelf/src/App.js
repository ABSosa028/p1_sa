import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import BookList from './pages/Books/BookList';
import CollectionList from './pages/Collections/CollectionList';
import PersonalLibrary from './pages/PersonalLibrary/PersonalLibrary';
import BookDetail from './pages/Books/BookDetail';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/books" element={
            <PrivateRoute>
              <BookList />
            </PrivateRoute>
          } />

          <Route path="/collections" element={
            <PrivateRoute>
              <CollectionList />
            </PrivateRoute>
          } />

          <Route path="/my-library" element={
            <PrivateRoute>
              <PersonalLibrary />
            </PrivateRoute>
          } />

          <Route path="/books/:id" element={
            <PrivateRoute>
              <BookDetail />
            </PrivateRoute>
          } />
        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;