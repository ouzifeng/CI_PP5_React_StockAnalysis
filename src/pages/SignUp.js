import * as React from 'react';
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
import { useState } from 'react';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.firstName = formData.firstName ? "" : "First name is required.";
    tempErrors.lastName = formData.lastName ? "" : "Last name is required.";
    tempErrors.email = (/^$|.+@.+..+/).test(formData.email) ? "" : "Email is not valid.";
    tempErrors.password = formData.password.length > 5 ? "" : "Password must be at least 6 characters long.";
    tempErrors.confirmPassword = formData.password === formData.confirmPassword ? "" : "Passwords do not match.";
    setErrors({
      ...tempErrors
    });

    return Object.values(tempErrors).every(x => x === "");
  }

  // Function to handle sign up
  const handleSignUp = async (email, password, firstName, lastName) => {
      try {
          const endpoint = 'https://django-stocks-ecbc6bc5e208.herokuapp.com/auth/register/';
          const response = await axios.post(endpoint, { email, password, first_name: firstName, last_name: lastName });
          // Consider adding response status check here
          console.log('Sign up successful', response.data);
          // Redirect to login page or dashboard here
      } catch (error) {
          console.error('Sign Up Error: ', error.response);
          // Display error message to the user
      }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateForm()) {
          console.log('Validation failed');
          return; // Stop submission if validation fails
      }

      const email = formData.email;
      const password = formData.password;
      const firstName = formData.firstName;
      const lastName = formData.lastName;

      try {
          const signUpResponse = await handleSignUp(email, password, firstName, lastName);
          console.log('Sign up successful', signUpResponse);
          // Navigate to your dashboard or home page upon successful sign up
          // history.push('/dashboard'); // if you're using react-router-dom
      } catch (error) {
          // Handle and display sign up error
          console.error('Sign up failed: ', error);
          // Optionally, set an error state and display it in your UI
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
