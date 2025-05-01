import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      
        <img width={60} src={assets.logo} alt="Mutare City Council Logo" />
      <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Mutare City Council |All rights reserved</p>
      <div className='flex gap-2.5 cursor-pointer'>
        <a href="https://www.facebook.com/MutareCityCouncil" target="_blank" rel="noopener noreferrer">
          <img width={38} src={assets.facebook_icon} alt="Facebook" />
        </a>
        <a href="https://x.com/CityofMutare" target="_blank" rel="noopener noreferrer">
          <img width={38} src={assets.twitter_icon} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/mutarecitycouncil/" target="_blank" rel="noopener noreferrer">
          <img width={38} src={assets.instagram_icon} alt="Instagram" />
        </a>
        <a href="https://mutarecity.org/" target="_blank" rel="noopener noreferrer">
        <img width={38} src={assets.logo} alt="Mutare City Council Logo" />
      </a>
      </div>
    </div>
  );
}

export default Footer;