import React, { useState, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContext'; // Make sure the path is correct

function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post(
        'https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/login/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', response.data.key);
      setIsAuthenticated(true); // Update the global authentication state
      setShowLoginAlert(true); // Show login alert
      navigate('/'); // Redirect user to the dashboard or another appropriate route
      console.log('Logged in successfully!'); // Console log for successful login

    } catch (error) {
      console.error('Login Error: ', error);
      setLoginError('Invalid login credentials.');
      console.log('Login failed: ', error); // Console log for login failure
    }
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
            {showLoginAlert && (
              <Alert severity="success" onClose={() => setShowLoginAlert(false)}>
                Logged in successfully!
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
