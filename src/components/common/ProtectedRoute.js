import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MessageAndRedirect from './MessageAndRedirect';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <MessageAndRedirect
        message="Please log in to view this page."
        redirectTo="/login"
      />
    );
  }

  return <Component />;
};

export default ProtectedRoute;