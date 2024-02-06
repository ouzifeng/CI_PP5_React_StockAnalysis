import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const MessageAndRedirect = ({ message, redirectTo }) => {
  const [redirect, setRedirect] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000); // Redirect after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {message}
    </div>
  );
};

export default MessageAndRedirect;
