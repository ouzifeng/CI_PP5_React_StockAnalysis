import React, { useState, useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setShowLoginSuccessAlert, setUserAvatarUrl } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Activate loading state
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post(
        'https://django-stocks-ecbc6bc5e208.herokuapp.com/api/user/login/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', response.data.key);
      setIsAuthenticated(true); // Update the global authentication state
      setShowLoginSuccessAlert(true); // Trigger the global login success alert
      navigate('/'); // Redirect user to the homepage or another appropriate route
      console.log('Logged in successfully!'); // Console log for successful login
    } catch (error) {
      console.error('Login Error: ', error);
      setLoginError('Invalid login credentials.');
      console.log('Login failed: ', error); // Console log for login failure
    }
    setLoading(false); // Deactivate loading state
  };

const handleLoginSuccess = (token, avatarUrl) => {
  localStorage.setItem('token', token);
  setIsAuthenticated(true);
  setShowLoginSuccessAlert(true);
  setUserAvatarUrl(avatarUrl); // Assuming you've added this setter to your context
  navigate('/'); // Redirect user to the homepage or another appropriate route
};

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://django-stocks-ecbc6bc5e208.herokuapp.com/api/user/google/login/',
        { token: credentialResponse.credential },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Now call handleLoginSuccess with the token and avatar URL
      handleLoginSuccess(response.data.token, response.data.avatar_url);
    } catch (error) {
      console.error('Google Sign In Error: ', error);
      setLoginError('There was an error with Google Sign In.');
    }
    setLoading(false);
  };
  const handleGoogleFailure = (error) => {
    console.error('Google Sign In Error: ', error);
    setLoginError('Google Sign In was unsuccessful.');
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loginError && (
              <Alert severity="error" onClose={() => setLoginError('')}>
                {loginError}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Box sx={{ mt: 3, mb: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  fullWidth // Make the button full width
                  variant="contained"
                  startIcon={<img src="path_to_google_icon" alt="Google sign-in" />} // Add the correct path to your Google icon here
                  sx={{ 
                    justifyContent: "flex-start", // Align the icon and text to the left
                    textTransform: "none", // Prevent uppercase styling
                    backgroundColor: "white", // Set the background color you want for the button
                    color: "black", // Set the text color you want for the button
                    '&:hover': {
                      backgroundColor: "whitesmoke", // Color of the button when hovered
                    },
                  }}
                >
                  Sign in with Google
                </Button>
              )}
            />
            </Box>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
