require('dotenv').config({
  path: '.env' // `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'sepans.com',
    description: 'Sepand Ansari',
    author: '@s3pans'
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    // "gatsby-transformer-sharp",
    // "gatsby-plugin-sharp",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'sepans.com',
        short_name: 'sepans',
        start_url: '/',
        background_color: '#AAAAAA',
        theme_color: '#555555',
        display: 'minimal-ui',
        icon: 'src/images/sepans-logo.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/pages/content`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.tsx')
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Inter:400,700']
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-11178641-1'
      }
    },
    {
      resolve: 'gatsby-source-flickr',
      options: {
        api_key: process.env.FLICKR_API_KEY,
        user_id: process.env.FLICKR_USER_ID
        // method: 'flickr.photosets.getPhotos',
        // photoset_id: 72157721253330801,
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {}
    }
  ]
}
