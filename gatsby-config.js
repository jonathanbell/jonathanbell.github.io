module.exports = {
  siteMetadata: {
    title: 'Jonathan Bell',
    description: "Jonathan Bell's online resume",
    siteUrl: `https://jonathanbell.github.io`
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages/employers/`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        background_color: '#FFFFFF',
        description: 'The curriculum vitae of Jonathan Bell',
        dir: 'ltr',
        name: "Jonathan Bell's online resume",
        orientation: 'portrait-primary',
        lang: 'en-CA',
        short_name: 'Jonathan Bell',
        start_url: '/',
        theme_color: '#B7BF10',
        // https://developer.mozilla.org/en-US/docs/Web/Manifest#display
        display: 'minimal-ui',
        // This path is relative to the root of the site.
        icon: 'src/images/jb-icon.png'
      }
    },
    'gatsby-transformer-remark',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline'
  ]
};
