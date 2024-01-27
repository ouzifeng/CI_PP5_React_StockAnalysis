import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Ticker from '../components/stockpage/Ticker';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header /> {/* Header stays outside the max-width restriction */}
      
    <div className="content-container">
      <Ticker />
    <main>{children}</main>
    <Footer />
    </div>

    </>
  );
};

export default BaseLayout;