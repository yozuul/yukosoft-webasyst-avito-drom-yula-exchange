import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { TableHeadNoCheckbox, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import USERLIST from '../_mocks_/user';
import { ProductsActionsCreators } from '../store/actions'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ID', label: 'Артикул', alignRight: false },
  { id: 'ItemName', label: 'Наименование', alignRight: false },
  { id: 'Price', label: 'Цена', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.ItemName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Products() {
    const [currentID, setCurrentID] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('ID');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(20);


    const { error, message, products, current } = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
      const getProducts = async () => {
        try {
          dispatch(ProductsActionsCreators.fetchProducts())
        } catch (err) {
          console.log(err)
        }
      }
      if(products.length === 0) getProducts()
    },[])

    let USERLIST = products

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;
  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

  const navigate = useNavigate()
  // const productID = window.location.href.split('/id:')[1]

  const openProductDetail = (ID) => {
    dispatch(ProductsActionsCreators.getProductByID(ID))
    navigate(`/dashboard/products/id:${ID}`, { replace: true })
  }
  const findCurrentProduct = (ID) => {
    dispatch(ProductsActionsCreators.getProductByID(ID))
    console.log(current)
    // navigate(`/dashboard/products/id:${currentID}`, { replace: true })
  }

  return (
    <Page title="Товары">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Товары
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeadNoCheckbox
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody className='tableRowLink'>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { ID, ItemName, Price } = row;
                      // const openProduct = () => setCurrentID(ID)
                      return (
                        <TableRow
                          hover
                          key={ID}
                          tabIndex={-1}
                          onClick={() => openProductDetail(ID)}
                          onMouseEnter={() => findCurrentProduct(ID)}
                        >
                          <TableCell component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={4}>
                              <Typography variant="subtitle2">
                              {ID}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{ItemName}</TableCell>
                          <TableCell>{Price}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
