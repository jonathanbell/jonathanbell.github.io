import React from 'react';

import '../css/footer.css';

const printDocument = e => {
  e.preventDefault();
  window.print();
};

const Footer = ({ siteTitle }) => (
  <footer>
    <h2>Contact</h2>

    <p>
      <a href="tel:+17789772825">(778) 977-2825</a> |{' '}
      <a href="mailto:jonathanbell.ca@gmail.com">jonathanbell.ca@gmail.com</a>
    </p>

    <address>
      <a href="https://maps.google.ca/maps?q=1015+redfern+street+victoria+bc">
        1015 Redfern Street, Victoria BC
      </a>
    </address>

    <button onClick={printDocument} className="print">
      Print
    </button>
  </footer>
);

export default Footer;
