import { graphql } from 'gatsby'

export const flickrImageFragment = graphql`
  fragment FlickrImageFragment on FlickrPhotoConnection {
    edges {
      node {
        id
        title
        description
        tags
        datetaken
        url_o
        width_q
        height_q
        url_q
        width_o
        height_o
        datetaken
        media
        media_status
        url_m
        url_c
        url_z
        farm
        server
        secret
        originalsecret
        photo_id
      }
    }
  }
`
