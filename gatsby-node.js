/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode
    });
    createNodeField({
      node,
      name: 'slug',
      value: `${slug}`
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                minimal
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.fields.slug !== '/default/') {
          if (!node.frontmatter.minimal) {
            createPage({
              path: node.fields.slug,
              component: path.resolve('./src/components/employerContent.js'),
              context: {
                slug: node.fields.slug
              }
            });
          } else {
            createPage({
              path: node.fields.slug,
              component: path.resolve(
                './src/components/employerContentMinimal.js'
              ),
              context: {
                slug: node.fields.slug
              }
            });
          }
        }
      });
      resolve();
    });
  });
};
