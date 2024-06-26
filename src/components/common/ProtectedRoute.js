import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MessageAndRedirect from './MessageAndRedirect';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, display a message and redirect to the login page
  if (!isAuthenticated) {
    return (
      <MessageAndRedirect
        message="Please log in to view this page."
        redirectTo="/login"
      />
    );
  }

  // If the user is authenticated, render the protected component
  return <Component />;
};

export default ProtectedRoute;
