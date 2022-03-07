import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { UsersActionCreators } from '../store/actions'
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
  Box, Grid
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function UserProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const { error, message } = useSelector(state => state.auth)

  const avitoMinPrice = localStorage.getItem('avitoMinPrice')
  const defaultText = localStorage.getItem('defaultText')
  const companyAdress = localStorage.getItem('companyAdress')
  const companyPhone = localStorage.getItem('companyPhone')

   const LoginSchema = Yup.object().shape({
      avitoMinPrice: Yup.number('Должно быть число').required('Укажите минимальную сумму').positive('Нельзя указывать отрицательную сумму'),
      defaultText: Yup.string('Должна быть строка').required('Укажите текст по умолчанию'),
      companyAdress: Yup.string('Должна быть строка').required('Укажите адрес'),
      companyPhone: Yup.number('Должно быть число').required('Укажите телефон')
   })

   const formik = useFormik({
      initialValues: {
         avitoMinPrice: avitoMinPrice,
         defaultText: defaultText,
         companyAdress: companyAdress,
         companyPhone: parseInt(companyPhone)
      },
      validationSchema: LoginSchema,
      onSubmit: (settingsData) => {
         localStorage.setItem('avitoMinPrice', settingsData.avitoMinPrice)
         localStorage.setItem('defaultText', settingsData.defaultText)
         localStorage.setItem('companyAdress', settingsData.companyAdress)
         localStorage.setItem('companyPhone', settingsData.companyPhone)
         dispatch(UsersActionCreators.updateSettings(settingsData))
      }
   })

   const { errors, touched, handleSubmit, getFieldProps } = formik;

   return (
      <Page title="Общие настройки показов">
      <Container maxWidth="xl">
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
               Общие настройки показов
            </Typography>
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
                                    type="avitoMinPrice"
                                    label="Минимальная стоимость запчасти для выгрузки на Avito"
                                    {...getFieldProps('avitoMinPrice')}
                                    error={Boolean(touched.avitoMinPrice && errors.avitoMinPrice)}
                                    helperText={touched.avitoMinPrice && errors.avitoMinPrice}
                                 />
                              </TableCell>
                              <TableCell>
                                 <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="companyPhone"
                                    label="Телефон"
                                    {...getFieldProps('companyPhone')}
                                    error={Boolean(touched.companyPhone && errors.companyPhone)}
                                    helperText={touched.companyPhone && errors.companyPhone}
                                 />
                              </TableCell>
                           </TableRow>
                           <TableRow>
                              <TableCell colSpan={2}>
                                 <TextField
                                    fullWidth
                                    autoComplete="off"
                                    type="companyAdress"
                                    label="Адрес"
                                    {...getFieldProps('companyAdress')}
                                    error={Boolean(touched.companyAdress && errors.companyAdress)}
                                    helperText={touched.companyAdress && errors.companyAdress}
                                 />
                              </TableCell>
                           </TableRow>
                           <TableRow>
                              <TableCell colSpan={2}>
                                 <TextField
                                    fullWidth
                                    multiline
                                    minRows={12}
                                    type="defaultText"
                                    {...getFieldProps('defaultText')}
                                    label="Общий текст для всех объявлений"
                                    error={Boolean(touched.defaultText && errors.defaultText)}
                                    helperText={touched.defaultText && errors.defaultText}
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
