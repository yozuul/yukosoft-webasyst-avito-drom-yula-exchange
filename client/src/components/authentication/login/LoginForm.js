import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthActionCreators } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch()
  const { error, message, user, isAuth } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    login: Yup.string().required('Укажите логин или email'),
    password: Yup.string().required('Укажите пароль')
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (authData) => {
      dispatch(AuthActionCreators.login(authData))
    }
  });


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="username"
            type="login"
            label="Логин или email"
            {...getFieldProps('login')}
            error={Boolean(touched.login && errors.login)}
            helperText={touched.login && errors.login}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Пароль"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Вход
        </LoadingButton>
      </Form>
      { error && <div className="erroMessage">{error}</div> }
      { message && <div className="confirmMessage">{message}</div>}
    </FormikProvider>
  );
}
