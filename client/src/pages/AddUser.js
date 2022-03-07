import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Navigate } from 'react-router-dom';
import { AuthActionCreators, UsersActionCreators } from '../store/actions'
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

// ----------------------------------------------------------------------


export default function AddUser() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()
    const { error, message } = useSelector(state => state.auth)

    const LoginSchema = Yup.object().shape({
        login: Yup.string()
          .min(2, 'Минимальная длина 2 символа')
          .max(50, 'Максимальная длина 50 символов'),
        email: Yup.string().email('Неверный формат email').required('Укажите email'),
        password: Yup.string().required('Укажите пароль')
    })

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            name: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (userData) => {
            dispatch(UsersActionCreators.addAccount(userData))
        }
    })

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    }

    if(message === 'Аккаунт успешно зарегистрирован') {
        return (<Navigate to='/dashboard/users' replace />)
    }
    return (
        <Page title="Добавить пользователя">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Новый пользователь
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
                                    Добавить
                            </LoadingButton>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                            { message && <div className="confirmMessage">{message}</div> }
                            { error && <div className="erroMessage">{error}</div> }
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Card>
            </Container>
        </Page>
    );
}
