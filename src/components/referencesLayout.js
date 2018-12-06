import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, Link } from 'gatsby';

import Header from './header';
import '../css/layout.css';

const ReferencesLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleReferencesQuery {
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
          title={`${data.site.siteMetadata.title}: References`}
          meta={[
            {
              name: 'description',
              content: 'References for Jonathan Bell'
            }
          ]}
        >
          <html lang="en" />
        </Helmet>
        <article>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div id="main-content" className="main-content">
            {children}

            <hr />

            <footer>
              <Link
                to="/"
                style={{ color: '#b7bf10', textDecoration: 'underline' }}
              >
                Back to Résumé
              </Link>
            </footer>
          </div>
        </article>
      </>
    )}
  />
);

ReferencesLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default ReferencesLayout;
