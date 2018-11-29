import React from 'react';
import { Link } from 'gatsby';

import '../css/header.css';

const Header = ({ siteTitle }) => (
  <header>
    <h1>
      <Link
        to="/"
        dangerouslySetInnerHTML={{
          __html: siteTitle
            .split(' ')
            .map((word, index) => {
              if (index === 0) {
                return `<span>${word}</span>`;
              }
              return ` ${word}`;
            })
            .join('')
        }}
      />
    </h1>
    <a className="visually-hidden" href="#main-content">
      Skip to main content
    </a>
  </header>
);

export default Header;
