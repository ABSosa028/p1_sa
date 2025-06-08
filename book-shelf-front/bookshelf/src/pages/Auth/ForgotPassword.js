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

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const initialValues = {
    emailOrUsername: ''
  };

  const validationSchema = Yup.object().shape({
    emailOrUsername: Yup.string().required('Correo o nombre de usuario es requerido')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);
      await requestPasswordReset(values.emailOrUsername);
      setSuccess('Se ha enviado un correo con instrucciones para restablecer tu contraseña');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al solicitar recuperación de contraseña');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Recuperar Contraseña
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
                <Grid  >
                  <Field
                    as={TextField}
                    name="emailOrUsername"
                    label="Correo o nombre de usuario"
                    fullWidth
                    error={touched.emailOrUsername && !!errors.emailOrUsername}
                    helperText={touched.emailOrUsername && errors.emailOrUsername}
                  />
                </Grid>
                <Grid  >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      type="button" 
                      variant="outlined" 
                      onClick={() => navigate('/login')}
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
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
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

export default ForgotPassword;