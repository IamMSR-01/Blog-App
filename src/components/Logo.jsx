import React from 'react';
import logo from '../assets/Blog-Logo.jpg'; // Adjust path as needed

function Logo({ width = "100px" }) {
  return (
    <div>
      <img className='rounded-full w-24' src={logo} alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
