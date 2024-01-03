// TODO: fix type
// eslint-disable-next-line no-undef
export const processFlickrImageData = (data: Queries.PhotoQueryQuery) =>
  data.allFlickrPhoto.edges
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
        label,
        media: node.media,
        longitude: node.longitude,
        latitude: node.latitude,
        videoUrl: `https://www.flickr.com/apps/video/stewart.swf?v=2968162862&photo_id=${node.photo_id}&photo_secret=${node.secret}`
      }
    })
    .filter((photo) => photo.thumbnailSrc && photo.link)
