import React from "react"
import styled from "styled-components"
import { groupBy } from "lodash"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
  albumName: string
}

const PHOTO_WIDTH = 100

export const Album: React.FC<Props> = () => {
  const albumQuery = graphql`
    query PhotoQuery {
      allFlickrPhoto(limit: 100) {
        edges {
          node {
            id
            title
            description
            tags
            datetaken
            url_o
            width_s
            height_s
            url_sq
            width_o
            height_o
          }
        }
      }
    }
  `
  const data = useStaticQuery(albumQuery)

  const photos = data.allFlickrPhoto.edges.map((edge) => {
    const { node } = edge
    const rawLabel = node.description
    const labelRegex = /label:([\w-]+)/g
    const matches = rawLabel.match(labelRegex)
    const label =
      matches?.length && matches[0]?.replace("label:", "")?.replace(/-/g, " ")
    const description = rawLabel?.replace(labelRegex, "")
    return {
      imageSrc: node.url_sq,
      ratio: node.width_s / node.height_s,
      link: node.url_o,
      description,
      label,
    }
  })

  const groups = groupBy(
    photos.filter((photo) => photo.label),
    (photo) => photo.label
  )
  const photosWithoutGroup = photos.filter((photo) => !photo.label)

  const renderPhotos = (photo: ImageProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkedImage imageWidth={PHOTO_WIDTH} {...photo} />
  )

  return (
    <>
      <h3>A photostream of some random projects</h3>
      <AlbumWrapper>
        {Object.keys(groups).map((label) => (
          <ImageGroup key={`group-${label}`} title={label}>
            {groups[label].map(renderPhotos)}
          </ImageGroup>
        ))}
        <ImageGroup title="more">
          {photosWithoutGroup.map(renderPhotos)}
        </ImageGroup>
      </AlbumWrapper>
    </>
  )
}

interface ImageGroupProps {
  title: string
}

const ImageGroup: React.FC<ImageGroupProps> = (props) => {
  const { title, children } = props
  return (
    <GroupWrapper>
      <GroupTitle>{title}</GroupTitle>
      <GroupPhotos>{children}</GroupPhotos>
    </GroupWrapper>
  )
}

type ImageProps = {
  imageSrc: string
  ratio: number
  link: string
  description: string
  label: string
}

interface LinkedImageProps extends ImageProps {
  imageWidth: number
}

const LinkedImage: React.FC<LinkedImageProps> = (props) => {
  const { imageSrc, link, imageWidth, description } = props
  return (
    <PhotoWrapper>
      <a href={link}>
        <img alt={description} width={imageWidth} src={imageSrc} />
      </a>
      {description && <PhotoDescription>{description}</PhotoDescription>}
    </PhotoWrapper>
  )
}

const AlbumWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const GroupTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
`

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const GroupPhotos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`

const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  img {
    margin: 0;
  }
`

const PhotoDescription = styled.div`
  font-size: 12px;
  max-width: ${PHOTO_WIDTH}px;
  text-align: center;
  line-height: 1.5em;
  font-family: arial, sans;
`
