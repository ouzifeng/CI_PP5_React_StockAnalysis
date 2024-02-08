import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function EmailVerified() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Use axios.get instead of axios.post
        await axios.get(
          `https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/verify-email/${uidb64}/${token}/`,
          {
            headers: {
              'Authorization': 'Token 13502af70a55d1fcddf7c094e4418c65904ef6eb',
            },
          }
        );
        setVerificationStatus('success');
      } catch (error) {
        console.error('Email Verification Error: ', error.response || error);
        setVerificationStatus('error');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [uidb64, token]); // Removed `navigate` from dependencies as it's not used directly

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      {loading && <CircularProgress />}
      {!loading && verificationStatus === 'success' && (
        <>
          <Alert severity="success">Your email has been successfully verified. You can now log in.</Alert>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleRedirect}>Go to Login</Button>
        </>
      )}
      {!loading && verificationStatus === 'error' && (
        <Alert severity="error">There was a problem verifying your email. Please try again or contact support.</Alert>
      )}
    </Container>
  );
}

export default EmailVerified;
