import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  return (
    <footer className="footer">
      &copy; Cobblestone Cafe
      <a href="https://www.facebook.com/people/Cobblestone-Cafe/100042647630381/" target="_blank" rel="noopener noreferrer" className="footer-icon">
      <FacebookIcon style={{ color: 'blue' }} />
      </a>
    </footer>
  );
}

export default Footer;
