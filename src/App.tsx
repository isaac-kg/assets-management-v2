import { useEffect, useState } from 'react';
import { Route, RouterProvider, Routes, createBrowserRouter, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { ConfigProvider } from "antd";
import Login from './pages/Login';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  
    {
      element: <ECommerce />,
      children: [
        {
          path: "dashboard",
          element: <Tables />,
        },
        {
          path: "tables",
          element: <Tables/>,
        },
        {
          path: "portfolio",
          element: <h1 className="text-center m-auto">Portfolio</h1>,
        },
        {
          path: "reports",
          element: <h1 className="text-center m-auto">Report</h1>,
        },
      ],
    },
  ]);
  

  return  (
   <RouterProvider router={router} />
  );
}

export default App;
