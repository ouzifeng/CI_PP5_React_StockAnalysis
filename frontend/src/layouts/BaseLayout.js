import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />  
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default BaseLayout;
