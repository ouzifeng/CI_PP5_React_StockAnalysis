// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import StockDetail from './pages/StockDetailPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/custom.css';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stocks/:primary_ticker" element={<StockDetail />} /> {/* Just use the parameter name */}
          </Routes>
        </BaseLayout>
      </Router>
    </>
  );
}

export default App;
