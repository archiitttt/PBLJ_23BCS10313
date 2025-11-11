import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/images/hopebridge.png" alt="img" />
        <p>HopeBridge</p>
      </div>
      <div className="nav-options">
        <ul>
          <li><Link to="/">Home</Link></li>
          
          <li><Link to="/#featured">Campaigns</Link></li>
          
          <li><Link to="/fundraiser">Fundraiser</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;