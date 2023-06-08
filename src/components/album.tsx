/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import { shuffle } from 'lodash'
import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'yet-another-react-lightbox'
import { useFlickrImages } from '../hooks/useFlickrImages'
import 'yet-another-react-lightbox/styles.css'

type Props = {}

const PHOTO_WIDTH = 100

export const Album: React.FC<Props> = () => {
  const { photoGroups, photosWithoutGroup } = useFlickrImages()
  const shuffledGroups = shuffle(Object.entries(photoGroups))

  return (
    <>
      <h4>A photostream of some random projects</h4>
      <AlbumWrapper>
        {shuffledGroups.map(([label, group]) => {
          const year = new Date(group.at(0)?.dateTaken || '2022').getFullYear()
          const labelDate = `${label} (${year})`
          return (
            <ImageGroup
              key={`group-${label}`}
              group={group}
              title={labelDate}
            />
          )
        })}
        <ImageGroup title="misc" group={photosWithoutGroup} />
      </AlbumWrapper>
    </>
  )
}

type ImageGroupsType = ReturnType<typeof useFlickrImages>
type ImageGroupsPhotosType = ImageGroupsType['photoGroups']

type ValueOf<T> = T[keyof T]
interface ImageGroupProps {
  title: string
  group: ValueOf<ImageGroupsPhotosType>
}

const ImageGroup: React.FC<ImageGroupProps> = (props) => {
  const { title, group } = props
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  return (
    <GroupWrapper>
      <GroupTitle>{title}</GroupTitle>
      <GroupPhotos>
        {group.map((photo, i) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <LinkedImage
            key={`image-${photo.thumbnailSrc}`}
            imageWidth={PHOTO_WIDTH}
            {...photo}
            albumIndex={i}
            click={setLightboxIndex}
          />
        ))}
      </GroupPhotos>
      <Lightbox
        open={lightboxIndex > -1}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={group.map((photo) => ({ src: photo.imageSrc }))}
      />
    </GroupWrapper>
  )
}

type ImageProps = {
  thumbnailSrc: string
  ratio: number
  link: string
  description?: string
  label?: string
}

interface LinkedImageProps extends ImageProps {
  imageWidth: number
  click: (index: any) => void
  albumIndex?: number
}

const LinkedImage: React.FC<LinkedImageProps> = (props) => {
  const { thumbnailSrc, albumIndex, click, imageWidth, description } = props
  const openLighbox = () => click(albumIndex)
  return (
    <PhotoWrapper>
      <ImageButton type="button" onKeyDown={openLighbox} onClick={openLighbox}>
        <img alt={description} width={imageWidth} src={thumbnailSrc} />
      </ImageButton>
      {description && <PhotoDescription>{description}</PhotoDescription>}
    </PhotoWrapper>
  )
}

const AlbumWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
`

const GroupTitle = styled.h4`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  margin-left: 10px;
  font-weight: normal;
`

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
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

const ImageButton = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
  background-color: inherit;
  cursor: pointer;
`

const PhotoDescription = styled.div`
  font-size: 12px;
  max-width: ${PHOTO_WIDTH}px;
  text-align: center;
  line-height: 1.5em;
  font-family: arial, sans;
`
