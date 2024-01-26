import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BaseLayout>
    </Router>
  );
}

export default App;