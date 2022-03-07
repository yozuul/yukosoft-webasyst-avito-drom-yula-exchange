import * as Yup from 'yup';
import { useState, useEffect } from 'react';

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
  Checkbox,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import { ProductsActionsCreators } from '../store/actions'
// ----------------------------------------------------------------------

export default function ProductDetail() {

   const dispatch = useDispatch()
   const productID = window.location.href.split('/id:')[1]

   const { current, error, message } = useSelector(state => state.products)
   let defaultData = {
      text: '',
      avito: true,
      drom: true,
      yula: true,
   }
   if((current) && (current.text)) {
      defaultData.text = prepareText(current.text)
      defaultData.avito = current.avito
      defaultData.drom = current.drom
      defaultData.yula = current.yula
   }

   const [avito, setAvito] = useState(defaultData.avito);
   const [drom, setDrom] = useState(defaultData.drom);
   const [yula, setYula] = useState(defaultData.yula);
   const [text, setText] = useState(defaultData.text);
   const [hasProduct, setHasProduct] = useState(false);


   useEffect(() => {
      // dispatch(ProductsActionsCreators.getProductByID(productID))
   },[])

   // if(current) {
   //    if(!hasProduct) {
   //       setAvito(current.avito)
   //       setDrom(current.drom)
   //       setYula(current.yula)
   //       setYula(current.yula)
   //       setText(prepareText(current.text))
   //       setHasProduct(true)
   //    }
   // }

   const formik = useFormik({
      initialValues: {
         productText: text,
      },
      onSubmit: (userData) => {
         const desks = {
            avito: avito, drom: drom, yula: yula
         }
         const update = { ...userData, ...desks, id: parseInt(productID) }
         dispatch(ProductsActionsCreators.updateProduct(update))
      }
   })

   const { errors, touched, handleSubmit, getFieldProps } = formik;

   const toggleAvito = () => {
      avito ? setAvito(false) : setAvito(true)
   }
   const toggleDrom = () => {
      drom ? setDrom(false) : setDrom(true)
   }
   const toggleYula = () => {
      yula ? setYula(false) : setYula(true)
   }


   return (
      <Page title="Редактирование профиля пользователя">
         <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                  Редактировать объявление
                  </Typography>
                  <Button
                     variant="contained"
                     component={RouterLink}
                     to="/dashboard/products"
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
                                    <TableCell colSpan={3}>
                                       <TextField
                                          fullWidth
                                          multiline
                                          minRows={8}
                                          type="productText"
                                          label="Текст объявления"
                                          {...getFieldProps('productText')}
                                          error={Boolean(touched.productText && errors.productText)}
                                          helperText={touched.productText && errors.productText}
                                       />
                                    </TableCell>
                                 </TableRow>
                                 <TableRow>
                                    <TableCell>
                                       <FormGroup>
                                          <FormControlLabel
                                             control={
                                                <Checkbox
                                                   onChange={toggleAvito}
                                                   checked={avito}
                                                />
                                             }
                                             label="Публиковать на Avito"
                                          />
                                       </FormGroup>
                                    </TableCell>
                                    <TableCell>
                                       <FormGroup>
                                          <FormControlLabel
                                             control={
                                                <Checkbox
                                                   onChange={toggleDrom}
                                                   checked={drom}
                                                />
                                             }
                                             label="Публиковать на Drom"
                                          />
                                       </FormGroup>
                                    </TableCell>
                                    <TableCell>
                                       <FormGroup>
                                          <FormControlLabel
                                             control={
                                                <Checkbox
                                                   onChange={toggleYula}
                                                   checked={yula}
                                                />
                                             }
                                             label="Публиковать на Юле"
                                          />
                                       </FormGroup>
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

function prepareText(text) {
   const textReplaceBr = text.replace(/<br \/>/g, '\n')
   const textReplaceP = textReplaceBr.replace(/<p>/g, '')
   const textReplacePP = textReplaceP.replace(/<\/p>/g, '')
   return textReplacePP
}
