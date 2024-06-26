import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { API_URL, AUTHORIZATION_TOKEN } from '../config'; // Use config file for URL and Token

function EmailVerified() {
  const { uidb64, token } = useParams(); // Get URL parameters
  const navigate = useNavigate(); // Navigate to different routes
  const [loading, setLoading] = useState(true); // Loading state
  const [verificationStatus, setVerificationStatus] = useState(''); // Verification status

  useEffect(() => {
    // Function to verify email
    const verifyEmail = async () => {
      try {
        // Make GET request to verify email
        await axios.get(
          `${API_URL}/api/user/verify-email/${uidb64}/${token}/`,
          {
            headers: {
              'Authorization': `Token ${AUTHORIZATION_TOKEN}`,
            },
          }
        );
        setVerificationStatus('success'); // Set status to success
      } catch (error) {
        console.error('Email Verification Error: ', error.response || error);
        setVerificationStatus('error'); // Set status to error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    verifyEmail(); // Call the verification function
  }, [uidb64, token]); // Dependencies

  // Handle redirect to login page
  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      {loading && <CircularProgress />} {/* Show loading spinner */}
      {!loading && verificationStatus === 'success' && (
        <>
          <Alert severity="success">Your email has been successfully verified. You can now log in.</Alert>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleRedirect}>Sign In</Button>
        </>
      )}
      {!loading && verificationStatus === 'error' && (
        <Alert severity="error">There was a problem verifying your email. Please try again or contact support.</Alert>
      )}
    </Container>
  );
}

export default EmailVerified;
