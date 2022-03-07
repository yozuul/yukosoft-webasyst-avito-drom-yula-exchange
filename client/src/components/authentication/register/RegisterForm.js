import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Navigate } from 'react-router-dom';
import { AuthActionCreators } from '../../../store/actions'
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch()
  const { error, message } = useSelector(state => state.auth)
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    login: Yup.string()
      .min(2, 'Минимальная длина 2 символа')
      .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string().email('Неверный формат email').required('Укажите email'),
    password: Yup.string().required('Укажите пароль')
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      name: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (userData) => {
      dispatch(AuthActionCreators.register(userData))
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  if((!error) && (message)) {
    return (<Navigate to='/validate' replace />)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              label="Логин"
              {...getFieldProps('login')}
              error={Boolean(touched.login && errors.login)}
              helperText={touched.login && errors.login}
            />
            <TextField
              fullWidth
              autoComplete="username"
              label="Имя"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Регистрация
          </LoadingButton>
        </Stack>
      </Form>
      { message && <div className="confirmMessage">{message}</div> }
      { error && <div className="erroMessage">{error}</div> }
    </FormikProvider>
  );
}
