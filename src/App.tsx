import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Login from './pages/Login';
import Product from './pages/Product';
import Maintenance from './pages/Maintenance';
import PrivateRoute from './pages/privateRoutes';
import Profile from './pages/Profile';
import Location from './pages/Location';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} />,
    },
    {
      path: '/user',
      element: <PrivateRoute element={<User />} />,
    },
    {
      path: '/product',
      element: <PrivateRoute element={<Product />} />,
    },
    {
      path: '/maintenance',
      element: <PrivateRoute element={<Maintenance />} />,
    },
    {
      path: '/location',
      element: <PrivateRoute element={<Location />} />,
    },
    {
      path: '/profile',
      element: <PrivateRoute element={<Profile />} />,
    },
    {
      path: '*',
      element: <p className='text-center text-4xl mt-15'>Not found</p>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
