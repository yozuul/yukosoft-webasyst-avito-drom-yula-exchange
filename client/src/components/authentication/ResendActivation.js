import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActionCreators } from '@actions'
// material
import {
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../../hooks/use-auth'
// ----------------------------------------------------------------------

export default function ResendActivation() {
  const dispatch = useDispatch()
  const { error, message } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const currentURL = window.location.href
  const activationLink = currentURL.split('/url:')[1]

  if(activationLink) {
    dispatch(AuthActionCreators.activate(activationLink))
    navigate('/login', { replace: true })
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Неверный формат email').required('Укажите email'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (userData) => {
      dispatch(AuthActionCreators.resendActivationLink(userData))
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Ваш почтовый ящик"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>
      <br />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Выслать повторно
        </LoadingButton>
      </Form>
      { error && <div className="erroMessage">{error}</div> }
      { message && <div className="confirmMessage">{message}</div> }
    </FormikProvider>
  );
}
