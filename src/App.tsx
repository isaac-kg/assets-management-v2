import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Login from './pages/Login';
import Product from './pages/Product';
import Maintenance from './pages/Maintenance';
import axios from 'axios';
import { useEffect } from 'react';
import PrivateRoute from './pages/privateRoutes';

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
      path: '*',
      element: <p className='text-center text-4xl mt-15'>Not found</p>,
    },
  ]);


  return <RouterProvider router={router} />;
}

export default App;
