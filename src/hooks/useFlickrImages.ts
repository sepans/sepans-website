import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { useStaticQuery, graphql } from 'gatsby'

export const useFlickrImages = () => {
  const albumQuery = graphql`
    query PhotoQuery {
      allFlickrPhoto(limit: 150) {
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
          }
        }
      }
    }
  `
  // eslint cannot find gatsby-types
  // eslint-disable-next-line no-undef
  const data: Queries.PhotoQueryQuery = useStaticQuery(albumQuery)

  const photos = data.allFlickrPhoto.edges
    .map((edge) => {
      const { node } = edge
      const rawLabel = node.description
      const labelRegex = /label:([\w-]+)/g
      const matches = rawLabel?.match(labelRegex)
      const label =
        (matches?.length &&
          matches[0]?.replace('label:', '')?.replace(/-/g, ' ')) ||
        ''
      const description = rawLabel?.replace(labelRegex, '')
      return {
        thumbnailSrc: node.url_q || '',
        imageSrc: node.url_o || '',
        ratio: (node.width_o || 1) / (node.height_o || 1),
        link: node.url_o || '',
        description,
        dateTaken: node.datetaken,
        label
      }
    })
    .filter((photo) => photo.thumbnailSrc && photo.link)

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
