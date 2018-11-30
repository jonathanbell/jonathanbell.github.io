import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
// import Image from '../components/image';

const IndexPage = ({ data }) => (
  <Layout>
    <div
      dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html
      }}
    />
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexContentQuery {
    markdownRemark(fields: { slug: { eq: "/default/" } }) {
      html
    }
  }
`;
