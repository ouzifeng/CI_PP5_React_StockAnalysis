import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function EmailVerified() {
  const { uidb64, token } = useParams();
  const [loading, setLoading] = useState(true);
  const [verificationError, setVerificationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/verify-email/${uidb64}/${token}/`
        );
        console.log('Email verified successfully!', response.data);
        // Navigate to login with a success message or set state to show the message here
        navigate('/login', { state: { emailVerified: true } });
      } catch (error) {
        console.error('Email Verification Error: ', error.response);
        setVerificationError('There was a problem verifying your email. Please try again or contact support.');
      } finally {
        setLoading(false);
      }
    };
    verifyEmail();
  }, [uidb64, token, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      {loading && <CircularProgress />}
      {!loading && verificationError && (
        <Alert severity="error">{verificationError}</Alert>
      )}
    </Container>
  );
}

export default EmailVerified;
