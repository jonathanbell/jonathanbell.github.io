import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Summary from './summary';
import Education from './education';
import Footer from './footer';
import '../css/layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={`${data.site.siteMetadata.title}, Web Developer`}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description
            },
            {
              name: 'keywords',
              content: 'Jonathan, Bell, online, resume, decaf, coffee'
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <article>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div id="main-content" className="main-content">
            <Summary />
            {children}
            <Education />
            <Footer siteTitle={data.site.siteMetadata.title} />
          </div>
        </article>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
