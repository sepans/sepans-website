import { useStaticQuery, graphql } from 'gatsby'
import { processFlickrImageData } from './shared/ProcessFlickrImageData'

export const useCTImages = () => {
  const generalAlbumQuery = graphql`
    query CTPhotoQuery {
      allFlickrPhoto(limit: 200, filter: { tags: { eq: "ct" } }) {
        ...FlickrImageFragment
      }
    }
  `

  // TODO: fix type
  // eslint-disable-next-line no-undef
  const data: Queries.PhotoQueryQuery = useStaticQuery(generalAlbumQuery)

  const photos = processFlickrImageData(data)

  return photos
}
