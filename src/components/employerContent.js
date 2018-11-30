import React, { Component } from 'react';
import Layout from './layout';
import { graphql } from 'gatsby';

export default class EmployerContent extends Component {
  render() {
    return (
      <Layout>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.data.markdownRemark.html,
          }}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query EmployerContentQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;
