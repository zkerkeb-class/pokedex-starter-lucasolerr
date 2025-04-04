import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/auth';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
