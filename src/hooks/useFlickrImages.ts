import { groupBy } from 'lodash'
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
        imageSrc: node.url_q || '',
        ratio: (node.width_o || 1) / (node.height_o || 1),
        link: node.url_o || '',
        description,
        label
      }
    })
    .filter((photo) => photo.imageSrc && photo.link)

  const photoGroups = groupBy(
    photos.filter((photo) => photo.label),
    (photo) => photo.label
  )

  const photosWithoutGroup = photos.filter((photo) => !photo.label)
  return {
    photoGroups,
    photosWithoutGroup
  }
}
