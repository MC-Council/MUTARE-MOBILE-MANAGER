import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DeviceListing from '../components/DeviceListing';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <DeviceListing/>
      <AppDownload/>
      <Footer/>
    </div>
  );
}

export default Home;
