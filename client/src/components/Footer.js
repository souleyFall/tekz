import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {year} Tekz - Le blog informatique</p>
        <div className="social-links">
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="GitHub">GitHub</a>
          <a href="#" aria-label="LinkedIn">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;