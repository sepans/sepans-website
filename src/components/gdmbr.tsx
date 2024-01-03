/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import styled from 'styled-components'
// import Lightbox from 'yet-another-react-lightbox'
// import { geoAlbersUsa } from 'd3-geo'
import { useGreatDivideImages } from '../hooks/useGreatDivideImages'

import 'yet-another-react-lightbox/styles.css'
import { GdMap } from './gdmap'

// const PHOTO_WIDTH = 100

export const Gdmbr: React.FC = () => {
  const photos = useGreatDivideImages()

  return (
    <>
      <h4>Great divide route 2023</h4>
      <PageWrapper>
        <ImageGroup group={photos} />
      </PageWrapper>
    </>
  )
}

type ImageGroupsType = ReturnType<typeof useGreatDivideImages>

interface ImageGroupProps {
  group: ImageGroupsType
}

const ImageGroup: React.FC<ImageGroupProps> = () => (
  // const { group } = props
  // const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  <>
    <MapWrapper>
      {/* <PointerWrapper>
          {group.map((photo, i) => (
            // eslint-disable-next-line react/jsx-props-no-spreading

            <ImagePointer
              key={`image-${photo.thumbnailSrc}`}
              {...photo}
              albumIndex={i}
              click={setLightboxIndex}
              {...photo}
            />
          ))}
        </PointerWrapper> */}
      <GdMap />
    </MapWrapper>

    {/* <ImageWrapper>
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
      </ImageWrapper>
      <Lightbox
        open={lightboxIndex > -1}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={group.map((photo) => ({ src: photo.imageSrc }))}
      /> */}
  </>
)

/*

type ImageProps = ImageGroupsType[0]

interface LinkedImageProps extends ImageProps {
  imageWidth?: number
  click: (index: any) => void
  albumIndex?: number
}


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


const LinkedImage: React.FC<LinkedImageProps> = (props) => {
  const {
    thumbnailSrc,
    albumIndex,
    click,
    imageWidth,
    description,
    latitude,
    longitude
  } = props
  const openLighbox = () => click(albumIndex)
  const projection = geoAlbersUsa().scale(1300) // .translate([487.5, 305]) // .scale(2500).translate([487.5, 305])
  const point = projection([parseFloat(longitude!), parseFloat(latitude!)])

  return (
    <>
      <PhotoWrapper>
        <ImageButton
          type="button"
          onKeyDown={openLighbox}
          onClick={openLighbox}
          style={{ left: 0, top: point ? point?.[1] - MAP_OFFSET_TOP : -500 }}
        >
          <img alt={description} width={imageWidth} src={thumbnailSrc} />
        </ImageButton>
        </PhotoWrapper>
        </>
        )
      }
*/
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
`

const MapWrapper = styled.div`
  width: 100%;
`
/*
const ImageWrapper = styled.div`
  border: 1px solid red;
  width: 100px;
  display: flex;
  flex-direction: column-reverse;
  flex-flow: wrap;
  position: relative;
`

const PhotoWrapper = styled.div`
  img {
    margin: 0;
  }
`


const PointerWrapper = styled.div`
  position: absolute;
  border: 1px solid blue;
`

const PhotoDot = styled.div`
  position: absolute;
  width: 5px; 
  height: 5px;
  border-radius: 50%;
  background-color: black;
`

const ImageButton = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
  background-color: inherit;
  cursor: pointer;
  position: absolute;
`
*/
