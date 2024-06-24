import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('token'); // Example of checking authentication

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
