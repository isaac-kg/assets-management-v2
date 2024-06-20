import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Login from './pages/Login';
import Product from './pages/Product';
import Maintenance from './pages/Maintenance';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  const baseUrl = "https://pwy-consulting-backend.vercel.app/" 
  useEffect(() => {
    axios.get(`${baseUrl}todos/1`).then((response) => {
      console.log("Response. data")
    }).catch((error) => {
      console.log("Error")
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/user',
      element: <User />,
    },
    {
      path: '/product',
      element: <Product />,
    },
    {
      path: '/maintenance',
      element: <Maintenance />,
    },
    { path: '*', element: <p className='text-center text-4xl mt-15'>Not found</p> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
