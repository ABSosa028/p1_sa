import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  Button, 
  TextField, 
  Grid, 
  Link, 
  Typography,
  Paper,
  Container,
  Alert
} from '@mui/material';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Usuario o correo es requerido'),
    password: Yup.string().required('Contraseña es requerida')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      await login(values);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid  >
                  <Field
                    as={TextField}
                    name="username"
                    label="Usuario o correo"
                    fullWidth
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid  >
                  <Field
                    as={TextField}
                    name="password"
                    label="Contraseña"
                    type="password"
                    fullWidth
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid  >
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                  </Button>
                </Grid>
                <Grid   textAlign="center">
                  <Link 
                    component="button" 
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    underline="hover"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;