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


function App() {
  return (
    <>
    <AuthProvider>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:primary_ticker" element={<StockDetail />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/following" element={<Follow />} />
            <Route path="/dividend-screener" element={<DividendScreener />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
          </Routes>
        </BaseLayout>
      </Router>
      </AuthProvider>
    </>
  );
}

export default App;
