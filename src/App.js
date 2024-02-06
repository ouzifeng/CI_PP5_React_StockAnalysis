import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import SignIn from './pages/Login';
import SignUp from './pages/SignUp';
import StockDetail from './pages/StockDetailPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import './assets/styles/custom.css';
import { AuthProvider } from './context/AuthContext';
import Follow from './pages/Following';
import DividendScreener from './pages/DividendScreener';
import ContactForm from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';  
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import RestrictedRoute from './components/common/RestrictedRoute';


function App() {
  return (
    <AuthProvider> {/* AuthProvider wraps all components that need access to AuthContext */}
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <BaseLayout>
          <Routes>
            {/* Accessible to all */}
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:primary_ticker" element={<StockDetail />} />
            <Route path="/dividend-screener" element={<DividendScreener />} />
            <Route path="/contact" element={<ContactForm />} />

            {/* Accessible only when not logged in */}
            <Route path="/login" element={<RestrictedRoute component={SignIn} />} />
            <Route path="/signup" element={<RestrictedRoute component={SignUp} />} />
            <Route path="/forgot-password" element={<RestrictedRoute component={ForgotPassword} />} />
            <Route path="/reset-password/:uidb64/:token" element={<RestrictedRoute component={ResetPassword} />} />

            {/* Accessible only when logged in */}
            <Route path="/following" element={<ProtectedRoute component={Follow} />} />
          </Routes>
        </BaseLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
