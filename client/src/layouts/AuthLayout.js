import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
//
import { MHidden } from '../components/@material-extend';
import { AuthActionCreators } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {

  const dispatch = useDispatch()
  const { error, isAuth, message } = useSelector(state => state.auth)

  const cleanMessages = () => {
    if(error) dispatch(AuthActionCreators.setError(''))
    if(message) dispatch(AuthActionCreators.setMessage(''))
  }

  setTimeout(cleanMessages, 2000);

  return (
    <HeaderStyle>
      {isAuth && <Navigate to="/dashboard/app" replace />}
      <MHidden width="smDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}
        >
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
}
