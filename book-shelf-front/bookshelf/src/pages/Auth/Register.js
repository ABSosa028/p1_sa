import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid,
  Typography,
  Paper,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { GENDER_OPTIONS } from '../../utils/constants';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const initialValues = {
    username: '',
    email: '',
    nombre: '',
    apellido: '',
    ciudad: '',
    direccion: '',
    departamento: '',
    telefono: '',
    sexo: '1',
    password: '',
    confirmPassword: '',
    foto: "profile.jpg"
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Nombre de usuario es requerido')
      .min(3, 'Mínimo 3 caracteres'),
    email: Yup.string()
      .email('Correo inválido')
      .required('Correo es requerido'),
    nombre: Yup.string()
      .required('Nombre es requerido')
      .min(2, 'Mínimo 2 caracteres'),
    apellido: Yup.string()
      .required('Apellido es requerido')
      .min(2, 'Mínimo 2 caracteres'),
    ciudad: Yup.string()
      .required('Ciudad es requerida'),
    departamento: Yup.string()
      .required('Departamento es requerido'),
    direccion: Yup.string()
      .required('Dirección es requerida'),
    telefono: Yup.string()
      .matches(/^[0-9]+$/, "Solo números")
      .required('Teléfono es requerido')
      .min(8, 'Mínimo 8 dígitos'),
    sexo: Yup.string()
      .required('Sexo es requerido'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Contraseña es requerida')
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await register(values);
      navigate('/user'); // Redirigir al dashboard de usuario
    } catch (err) {
      console.error('Error en registro:', err);
      setError(err.response?.data?.message || 'Error al registrar usuario. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro de Usuario
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
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="username"
                    label="Nombre de usuario"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Correo electrónico"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nombre"
                    label="Nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.nombre && !!errors.nombre}
                    helperText={touched.nombre && errors.nombre}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="apellido"
                    label="Apellido"
                    value={values.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.apellido && !!errors.apellido}
                    helperText={touched.apellido && errors.apellido}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="telefono"
                    label="Teléfono"
                    value={values.telefono}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.telefono && !!errors.telefono}
                    helperText={touched.telefono && errors.telefono}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Sexo</InputLabel>
                    <Select
                      name="sexo"
                      label="Sexo"
                      value={values.sexo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.sexo && !!errors.sexo}
                      disabled={isSubmitting}
                    >
                      {GENDER_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="ciudad"
                    label="Ciudad"
                    value={values.ciudad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.ciudad && !!errors.ciudad}
                    helperText={touched.ciudad && errors.ciudad}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="departamento"
                    label="Departamento"
                    value={values.departamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.departamento && !!errors.departamento}
                    helperText={touched.departamento && errors.departamento}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="direccion"
                    label="Dirección"
                    value={values.direccion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.direccion && !!errors.direccion}
                    helperText={touched.direccion && errors.direccion}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    fullWidth
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="space-between">
                  <Button 
                    type="button" 
                    variant="outlined" 
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                    sx={{ width: '120px' }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ width: '120px' }}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                  >
                    {isSubmitting ? 'Registrando' : 'Registrarse'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;