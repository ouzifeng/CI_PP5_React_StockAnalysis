import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function EmailVerified() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    // Directly define the async function inside useEffect
    const verifyEmail = async () => {
      try {
        await axios.post(
          `https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/verify-email/${uidb64}/${token}/`,
          {}, // Assuming no body is needed, send an empty object
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
  }, [uidb64, token, navigate]); // Adding `navigate` to useEffect dependencies is safe but unnecessary unless you use it inside the effect

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
