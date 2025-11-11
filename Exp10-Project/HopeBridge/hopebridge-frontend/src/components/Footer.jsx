import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/hopebridge.png" alt="logo" />
          <h3>HopeBridge</h3>
        </div>
        <p>Building bridges of hope through compassion and community support.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
        <p className="copyright">© 2025 HopeBridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;