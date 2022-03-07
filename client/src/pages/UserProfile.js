import * as Yup from 'yup';
import { useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Card,
  Table,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import { UsersActionCreators } from '../store/actions'
// ----------------------------------------------------------------------

export default function UserProfile() {
//   const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const userID = window.location.href.split('/id:')[1]
  const { error, message } = useSelector(state => state.users)

  const LoginSchema = Yup.object().shape({
    login: Yup.string()
      .min(2, 'Минимальная длина 2 символа')
      .max(50, 'Максимальная длина 50 символов'),
    email: Yup.string().email('Неверный формат email').required('Укажите email'),
})
const login = localStorage.getItem('currentUserLogin')
const email = localStorage.getItem('currentUserEmail')
const name = localStorage.getItem('currentUserName')
// console.log(current)
// const { status, login, email, name } = current
const formik = useFormik({
    initialValues: {
      login: login,
      email: email,
      name: name,
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (userData) => {
        const update = { id: userID, ...userData }
        console.log(update)
        dispatch(UsersActionCreators.updateUserProfile({ userProfile: update, rootOwner: true }))
    }
})

const { errors, touched, handleSubmit, getFieldProps } = formik;

const handleShowPassword = () => {
    setShowPassword((show) => !show);
}

  return (
    <Page title="Редактирование профиля пользователя">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                Редактировать профиль
                </Typography>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/dashboard/users"
                    >
                    Назад
                </Button>
            </Stack>
            <Card>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                autoComplete="off"
                                                type="login"
                                                label="Логин"
                                                {...getFieldProps('login')}
                                                error={Boolean(touched.login && errors.login)}
                                                helperText={touched.login && errors.login}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                autoComplete="off"
                                                type="email"
                                                label="Email"
                                                {...getFieldProps('email')}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                autoComplete="off"
                                                type="name"
                                                label="Имя"
                                                {...getFieldProps('name')}
                                                helperText={touched.name && errors.name}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                autoComplete="off"
                                                type={showPassword ? 'text' : 'password'}
                                                label="Сменить пароль"
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
                                                {...getFieldProps('password')}
                                                error={Boolean(touched.password && errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </TableContainer>

                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                        <LoadingButton
                                size="large"
                                type="submit"
                                variant="contained"
                                >
                                Изменить
                        </LoadingButton>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                        { error && <div className="erroMessage">{error}</div> }
                        { message && <div className="confirmMessage">{message}</div> }
                        </Stack>
                    </Form>
                </FormikProvider>
            </Card>
        </Container>
    </Page>
  );
}
