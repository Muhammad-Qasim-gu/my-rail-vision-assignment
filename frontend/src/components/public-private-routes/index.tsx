import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  
  return isAuthenticated === 'true' ? <Outlet /> : <Navigate to="/login" />;
};


export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

 
  return isAuthenticated === 'true' ? <Navigate to="/home" /> : <Outlet />;
};