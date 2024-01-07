/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import styled from 'styled-components'
import Lightbox from 'yet-another-react-lightbox'
// import { geoAlbersUsa } from 'd3-geo'
import { random } from 'lodash'
import { useGreatDivideImages } from '../hooks/useGreatDivideImages'

import 'yet-another-react-lightbox/styles.css'
import { GdMap } from './gdmap'
import { GdNav } from './gdnav'
import { useRideTracks } from '../hooks/useRideTracks'
import { GdElevation } from './gdelevation'

const PHOTO_WIDTH = 80

export interface SegmentProps {
  rideSegIndex: number
  setRideSegIndex: (index: number) => void
}

export const Gdmbr: React.FC = () => {
  const photos = useGreatDivideImages()

  const [rideSegIndex, setRideSegIndex] = useState(-1)
  const [zoomToPhoto, setZoomToPhoto] = useState(null)

  const { tracks } = useRideTracks()

  return (
    <>
      <PageWrapper>
        <MapWrapper>
          <GdMap
            rideSegIndex={rideSegIndex}
            setRideSegIndex={setRideSegIndex}
            photos={photos}
            zoomToPhoto={zoomToPhoto}
          />
        </MapWrapper>
        <GdElevation
          tracks={tracks}
          rideSegIndex={rideSegIndex}
          setRideSegIndex={setRideSegIndex}
        />
        <GdNav
          rideSegIndex={rideSegIndex}
          setRideSegIndex={setRideSegIndex}
          numberOfTracks={tracks.length}
        />
        <ImageGroup
          group={photos}
          setZoomToPhoto={setZoomToPhoto}
          rideSegIndex={rideSegIndex}
        />
      </PageWrapper>
    </>
  )
}

type ImageGroupsType = ReturnType<typeof useGreatDivideImages>

const GEO_THRESH = 0.0001

interface ImageGroupProps {
  group: ImageGroupsType
  rideSegIndex: number
  setZoomToPhoto: (object) => void
}

// This is a memoized component: it only re-renders when rideSegIndex changes.
// reason for that: because Lightbox doesn't have a callback for when carosel
// changes so lightboxIndex cannot be updated accordingly so when setZoomToPhoto is
// called it updates zoomToPhoto state and the parent re-renders, re-rendering this
// which sets back the open image to initial lightboxIndex
const ImageGroup: React.FC<ImageGroupProps> = React.memo(
  (props) => {
    const { rideSegIndex, group, setZoomToPhoto } = props
    const { bounds } = useRideTracks()
    const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

    const randomGroupIndex = random(0, group.length - 30)
    const displayPhotos =
      rideSegIndex === -1
        ? group.slice(randomGroupIndex, randomGroupIndex + 30)
        : group
            .filter((photo) => {
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
            .sort(
              (a, b) =>
                new Date(a.dateTaken).getTime() -
                new Date(b.dateTaken).getTime()
            )

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
          className="gd-lightbox-styles"
          on={{
            view: ({ index }) => {
              setZoomToPhoto(displayPhotos[index])
            },
            exiting: () => {
              setZoomToPhoto(null)
            }
          }}
          slides={displayPhotos.map((photo) => ({ src: photo.imageSrc }))}
        />
      </>
    )
  },
  (prevProps, nextProps) => prevProps.rideSegIndex === nextProps.rideSegIndex
)

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
          <img
            style={{ filter: 'grayscale(80%)' }}
            alt={description}
            width={`${imageWidth}px`}
            src={thumbnailSrc}
          />
        </ImageButton>
      </PhotoWrapper>
    </>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const MapWrapper = styled.div`
  width: 100%;
`

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: ${PHOTO_WIDTH}px;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  margin: 5px 0;
  max-width: 85vmin; /* for entire route page there should be a better way  */
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
