import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import UserProfile from './pages/UserProfile';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Settings from './pages/Settings';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const latestRole = localStorage.getItem('role')
  const { user } = useSelector(state => state.auth)

  const routesData = []
  const userMenu = {
    main: {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'settings', element: <Settings /> },
      ]
    },
    products: {
      path: '/dashboard/products',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard/products', element: <Products /> },
        { path: 'id:id', element: <ProductDetail /> },
      ]
    },
    login: {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    }
  }
  if((latestRole === '1') || (user?.role_id === 1)) {
      userMenu.users = {
        path: '/dashboard/users',
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard/users', element: <Users /> },
          { path: 'id:id', element: <UserProfile /> },
          { path: 'add', element: <AddUser /> },
        ]
      }
  }

  for (let item in userMenu) {
    routesData.push(userMenu[item])
  }

  return useRoutes(routesData);
}
