import { useStaticQuery, graphql } from 'gatsby'
import { processFlickrImageData } from './shared/ProcessFlickrImageData'

export const useGreatDivideImages = () => {
  const generalAlbumQuery = graphql`
    query DividePhotoQuery {
      allFlickrPhoto(limit: 200, filter: { tags: { eq: "gdmbr" } }) {
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
