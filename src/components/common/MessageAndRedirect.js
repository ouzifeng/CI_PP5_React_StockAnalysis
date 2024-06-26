import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const MessageAndRedirect = ({ message, redirectTo }) => {
  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    // Set a timer to update the redirect state after 3 seconds
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000); // Redirect after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  // If redirect state is true, navigate to the specified path
  if (redirect) {
    return <Navigate to={redirectTo} replace />;
  }

  // Display the message while waiting to redirect
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {message}
    </div>
  );
};

export default MessageAndRedirect;
