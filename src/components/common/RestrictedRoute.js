import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import MessageAndRedirect from './MessageAndRedirect';

const RestrictedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <MessageAndRedirect
        message="You are already logged in. Redirecting to the home page."
        redirectTo="/"
      />
    );
  }

  return <Component />;
};

export default RestrictedRoute