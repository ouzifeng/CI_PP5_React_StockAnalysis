import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import StockDetail from './pages/StockDetailPage';
import EmailVerified from './pages/EmailVerified';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { AuthProvider } from './context/AuthContext';
import Follow from './pages/Following';
import DividendScreener from './pages/DividendScreener';
import ContactForm from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';  
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import RestrictedRoute from './components/common/RestrictedRoute';
import './assets/styles/custom.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  },
});

const googleClientId = "937907568797-kn78ea93kbq4puisnsqpagdtua1jtnvc.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider theme={theme}>
      <AuthProvider> {/* AuthProvider wraps all components that need access to AuthContext */}
        <Helmet>
        </Helmet>
        <Router>
          <BaseLayout>
            <Routes>
              {/* Accessible to all */}
              <Route path="/" element={<DividendScreener />} />
              <Route path="/stocks/:uid" element={<StockDetail />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/verify-email/:uidb64/:token" element={<EmailVerified />} />
              
              {/* Accessible only when not logged in */}
              <Route path="/login" element={<RestrictedRoute component={SignIn} />} />
              <Route path="/signup" element={<RestrictedRoute component={SignUp} />} />
              <Route path="/forgot-password" element={<RestrictedRoute component={ForgotPassword} />} />
              <Route path="/reset-password/:uidb64/:token" element={<RestrictedRoute component={ResetPassword} />} />

              {/* Accessible only when logged in */}
              <Route path="/following" element={<ProtectedRoute component={Follow} />} />
              
              {/* Redirect any unknown routes to the homepage */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BaseLayout>
        </Router>
      </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
