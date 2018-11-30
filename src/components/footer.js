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
      <a
        rel="noreferrer"
        href="https://maps.google.ca/maps?q=1015+redfern+street+victoria+bc"
      >
        1015 Redfern Street, Victoria BC
      </a>
    </address>
    <div className="no-print">
      <h2>Links</h2>
      <a
        title="View résumé source code on GitHub"
        href="https://github.com/jonathanbell/jonathanbell.github.io"
        rel="noreferrer"
      >
        GitHub
      </a>{' '}
      |{' '}
      <a href="https://projects.jonathanbell.ca" rel="noreferrer">
        Projects
      </a>
    </div>
    <button onClick={printDocument} className="print no-print">
      Print
    </button>
  </footer>
);

export default Footer;
