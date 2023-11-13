import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { useStaticQuery, graphql } from 'gatsby'
import { processFlickrImageData } from './shared/ProcessFlickrImageData'

export const useFlickrImages = () => {
  const generalAlbumQuery = graphql`
    query PhotoQuery {
      allFlickrPhoto(limit: 150, filter: { tags: { ne: "gdmbr" } }) {
        ...FlickrImageFragment
      }
    }
  `

  // TODO: fix type
  // eslint-disable-next-line no-undef
  const data: Queries.PhotoQueryQuery = useStaticQuery(generalAlbumQuery)

  const photos = processFlickrImageData(data)

  const photosWithLabel = sortBy(
    photos.filter((photo) => photo.label),
    (photo) => photo.dateTaken
  )

  const photoGroups = groupBy(photosWithLabel, (photo) => photo.label)

  // const photoGroups2 = flow(
  //   filter<PhotoType>(photo => photo.label),
  //   sortBy<PhotoType>(photo => photo.dateTaken),
  //   groupBy(photo => photo.label)
  // )(photos)

  const photosWithoutGroup = photos.filter((photo) => !photo.label)
  return {
    photoGroups,
    photosWithoutGroup
  }
}
