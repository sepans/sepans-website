import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { groupBy } from "lodash"

type Props = {
    albumName: string
}

const PHOTO_WIDTH = 300

export const Album: React.FC<Props> = (props) => {
  // TODO: use albumname in query
  // const { albumName } = props
  const albumQuery = graphql`
  query albumsQuery {
      allGooglePhotosAlbum(filter: {title: {eq: "diy"}}) {
          totalCount
          edges {
              node {
                  id
                  title
                  internal {
                      content
                      description
                      ignoreType
                      mediaType
                  }
                  photos {
                      productUrl
                      mediaMetadata {
                          width
                          height
                      }
                      photo {
                          publicURL
                          name
                      }
                      description
                  }
              }
          }
      }
  }
`
  const data = useStaticQuery(albumQuery)
    const photos: [ImageProps] = data.allGooglePhotosAlbum.edges[0].node.photos.map((photo: any) => {
        const regex = /label:(?<label>[a-z\-]+)/
        const labelMatcher = photo.description?.match(regex)
        const label = labelMatcher?.groups?.label?.replace('-',' ')
        const description = photo.description && photo.description.replace(/label:(?<label>[a-z\-]+)/gm, "")
        return {
            imageSrc: photo.photo?.publicURL,
            link: photo.productUrl,
            ratio: photo.mediaMetadata.height / photo.mediaMetadata.width,
            description: description,
            label: label
        }
    })

    const groups = groupBy(photos.filter(photo => photo.label), (photo) => photo.label)
    const photosWithoutGroup = photos.filter(photo => !photo.label)

    const renderPhotos = (photo: ImageProps) => <LinkedImage imageWidth={PHOTO_WIDTH} {...photo} />

    return (
        <>
            <h2>A photostream of some random projects</h2>
            <AlbumWrapper>
                {Object.keys(groups).map(label => {
                    return (
                        <ImageGroup title={label}>{groups[label].map(renderPhotos)}</ImageGroup>
                    )
                })}
                <ImageGroup title="more">{photosWithoutGroup.map(renderPhotos)}</ImageGroup>
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
        <GroupPhotos>
            {children}
        </GroupPhotos>
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

interface LinkedImageProps extends ImageProps  {
    imageWidth: number
}

const LinkedImage: React.FC<LinkedImageProps> = (props) => {
    const { imageSrc, ratio, link, imageWidth, description } = props
    return (
        <PhotoWrapper>
            <a href={link}>
                <img width={imageWidth}  src={imageSrc} />
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