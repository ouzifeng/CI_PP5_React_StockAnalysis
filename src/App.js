// App.js
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

function App() {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:primary_ticker" element={<StockDetail />} /> {/* Just use the parameter name */}
            <Route path="/login" element={<SignIn />} /> {/* Add this line */}
            <Route path="/signup" element={<SignUp />} /> {/* Add this line */}
          </Routes>
        </BaseLayout>
      </Router>
    </>
  );
}

export default App;
