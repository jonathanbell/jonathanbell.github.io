import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import '../css/layout.css';

const MinimalLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleMinimalQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={`${data.site.siteMetadata.title}: Curriculum Vitae`}
          meta={[
            {
              name: 'description',
              content: 'The online curriculum vitae of Jonathan Bell'
            },
            {
              name: 'keywords',
              content:
                'Jonathan, Bell, online, resume, curriculum vitae, decaf, coffee'
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <article>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div id="main-content" className="main-content">
            <h2>Summary</h2>
            <p>
              Web developer/student located in Victoria BC looking to augment
              working hours with part-time retail postion.
            </p>
            {children}
            <h2>Education</h2>
            <h3>Dogwood Diploma</h3>
            <h4>June 2000, Oak Bay Secondary School, Victoria BC</h4>
            <p>Graduated with diploma.</p>
            <Footer siteTitle={data.site.siteMetadata.title} />
          </div>
        </article>
      </>
    )}
  />
);

MinimalLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MinimalLayout;
