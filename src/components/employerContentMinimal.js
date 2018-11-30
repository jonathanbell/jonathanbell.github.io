import React, { Component } from 'react';
import MinimalLayout from './minimalLayout';
import { graphql } from 'gatsby';

export default class EmployerContentMinimal extends Component {
  render() {
    return (
      <MinimalLayout>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.data.markdownRemark.html
          }}
        />
      </MinimalLayout>
    );
  }
}

export const query = graphql`
  query EmployerContentMinimalQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;
