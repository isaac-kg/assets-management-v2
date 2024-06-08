import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Login from './pages/Login';
import Product from './pages/Product';
import Maintenance from './pages/Maintenance';

function App() {
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
    { path: '*', element: <p>Not found</p> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
