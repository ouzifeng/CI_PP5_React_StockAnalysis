import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MessageAndRedirect from './MessageAndRedirect';

const RestrictedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is authenticated, display a message and redirect to the home page
  if (isAuthenticated) {
    return (
      <MessageAndRedirect
        message="You are already logged in. Redirecting to the home page."
        redirectTo="/"
      />
    );
  }

  // If the user is not authenticated, render the restricted component
  return <Component />;
};

export default RestrictedRoute;
