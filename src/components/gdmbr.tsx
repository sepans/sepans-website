/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'yet-another-react-lightbox'
// import { geoAlbersUsa } from 'd3-geo'
import { useGreatDivideImages } from '../hooks/useGreatDivideImages'

import 'yet-another-react-lightbox/styles.css'
import { GdMap } from './gdmap'
import { useRideTracks } from '../hooks/useRideTracks'

const PHOTO_WIDTH = 50

export const Gdmbr: React.FC = () => {
  const photos = useGreatDivideImages()

  const [rideSegIndex, setRideSegIndex] = useState(-1)

  return (
    <>
      <h4>Great Divide Route 2023</h4>
      <PageWrapper>
        <MapWrapper>
          <GdMap
            rideSegIndex={rideSegIndex}
            setRideSegIndex={setRideSegIndex}
          />
        </MapWrapper>
        <ImageGroup group={photos} rideSegIndex={rideSegIndex} />
      </PageWrapper>
    </>
  )
}

type ImageGroupsType = ReturnType<typeof useGreatDivideImages>

const GEO_THRESH = 0.0001

interface ImageGroupProps {
  group: ImageGroupsType
  rideSegIndex: number
}

const ImageGroup: React.FC<ImageGroupProps> = (props) => {
  const { rideSegIndex, group } = props
  const { bounds } = useRideTracks()
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  const displayPhotos =
    rideSegIndex === -1
      ? group.filter((photo, i) => i > Math.random() * 100)
      : group.filter((photo) => {
          const bound = bounds[rideSegIndex]
          const lat = Math.abs(parseFloat(photo.latitude))
          const lon = Math.abs(parseFloat(photo.longitude))

          return (
            lon < Math.abs(bound[0]) * (1 + GEO_THRESH) &&
            lat < Math.abs(bound[3]) * (1 + GEO_THRESH) &&
            lon > Math.abs(bound[2]) * (1 - GEO_THRESH) &&
            lat > Math.abs(bound[1]) * (1 - GEO_THRESH)
          )
        })

  const lightboxStyles = {
    container: { backgroundColor: 'rgba(0, 0, 0, .8)' }
  }

  return (
    <>
      <ImageWrapper>
        {displayPhotos.map((photo, i) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <LinkedImage
            key={`image-${photo.thumbnailSrc}`}
            imageWidth={PHOTO_WIDTH}
            {...photo}
            albumIndex={i}
            click={setLightboxIndex}
          />
        ))}
      </ImageWrapper>
      <Lightbox
        open={lightboxIndex > -1}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        styles={lightboxStyles}
        slides={displayPhotos.map((photo) => ({ src: photo.imageSrc }))}
      />
    </>
  )
}

/*



const ImagePointer: React.FC<LinkedImageProps> = (props) => {
  const { albumIndex, click, latitude, longitude } = props
  const openLighbox = () => click(albumIndex)
  const projection = geoAlbersUsa() // .scale(1300)// .translate([487.5, 305]) // .scale(2500).translate([487.5, 305])
  const point = projection([parseFloat(longitude!), parseFloat(latitude!)])

  return (
    <>
      <PhotoDot
        onKeyDown={openLighbox}
        onClick={openLighbox}
        style={{
          left: point?.[0] - MAP_OFFSET_LEFT,
          top: point?.[1] - MAP_OFFSET_TOP
        }}
      />
    </>
  )
}

*/

type ImageProps = ImageGroupsType[0]

interface LinkedImageProps extends ImageProps {
  imageWidth?: number
  click: (index: any) => void
  albumIndex?: number
}

const LinkedImage: React.FC<LinkedImageProps> = (props) => {
  const {
    thumbnailSrc,
    albumIndex,
    click,
    imageWidth,
    description
    // latitude,
    // longitude
  } = props
  const openLighbox = () => click(albumIndex)
  // const projection = geoAlbersUsa().scale(1300) // .translate([487.5, 305]) // .scale(2500).translate([487.5, 305])
  // const point = projection([parseFloat(longitude!), parseFloat(latitude!)])

  return (
    <>
      <PhotoWrapper>
        <ImageButton
          type="button"
          onKeyDown={openLighbox}
          onClick={openLighbox}
        >
          <img alt={description} width={`${imageWidth}px`} src={thumbnailSrc} />
        </ImageButton>
      </PhotoWrapper>
    </>
  )
}

const PageWrapper = styled.div`
  width: 100%;
`

const MapWrapper = styled.div`
  width: 100%;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 50px;
  overflow-x: scroll;
  overlow-y: hidden;
  width: 100%;
  margin: 5px 0;
`

const PhotoWrapper = styled.div`
  flex: none;
  img {
    margin: 0;
    margin-right: 3px;
  }
`

const ImageButton = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
  background-color: inherit;
  cursor: pointer;
`
