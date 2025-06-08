import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  Button, 
  TextField, 
  Grid, 
  Typography,
  Paper,
  Container,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const initialValues = {
    username: '',
    password: '',
    newPassword: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Nombre de usuario es requerido'),
    password: Yup.string().required('Contraseña actual es requerida'),
    newPassword: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .notOneOf([Yup.ref('password'), null], 'La nueva contraseña debe ser diferente a la actual')
      .required('Nueva contraseña es requerida')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);
      await resetPassword(values);
      setSuccess('Contraseña actualizada correctamente');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar la contraseña');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Cambiar Contraseña
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
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
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Nombre de usuario"
                    type="text"
                    fullWidth
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Contraseña actual"
                    type="password"
                    fullWidth
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="newPassword"
                    label="Nueva contraseña"
                    type="password"
                    fullWidth
                    error={touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      type="button" 
                      variant="outlined" 
                      onClick={() => navigate('/')}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ResetPassword;