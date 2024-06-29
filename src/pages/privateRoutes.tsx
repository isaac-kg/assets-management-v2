import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PrivateRoute = ({ element: Component }) => {
  const {token} = useAppSelector((state) => state.auth)
  const isAuthenticated = token;

  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
