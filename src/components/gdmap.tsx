import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax,
import mapboxgl, { Map } from 'mapbox-gl'
import { useRideTracks } from '../hooks/useRideTracks'
import 'mapbox-gl/dist/mapbox-gl.css'

export const MAP_WIDTH = 200
export const MAP_HEIGHT = 510
export const MAP_OFFSET_TOP = 30
export const MAP_OFFSET_LEFT = 20

const TRACK_COLOR = '#89CFF0'

const INIT_ZOOM = 2.2
const INIT_LNG = -109.9
const INIT_LAT = 42.2
const INIT_PITCH = 20

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2VwYW5zbSIsImEiOiJjbHE3MDYwcnoweHpzMmpxbGR1dmFiand0In0.57Pw_8KBRchh14a5yBWgeA'

interface GdMapProps {
  rideSegIndex: number
  setRideSegIndex: (index: number) => void
}

export const GdMap: React.FC<GdMapProps> = (props) => {
  const mapContainer = useRef<HTMLDivElement>()
  const map = useRef<Map>()

  const { rideSegIndex } = props

  // we don't need to keep track of map location/zoom state
  // const [lng, setLng] = useState(INIT_LNG)
  // const [lat, setLat] = useState(INIT_LAT)
  // const [zoom, setZoom] = useState(INIT_ZOOM)

  const { tracks, bounds } = useRideTracks()

  const zoomOut = () => {
    map?.current?.fitBounds(
      [
        bounds[0][0],
        bounds[0][1],
        bounds[bounds.length - 1][0],
        bounds[bounds.length - 1][1]
      ],
      {
        padding: 100,
        pitch: 20,
        duration: 2000
      }
    )
    // map.current.setPitch(80)
    map?.current?.setFilter('route-layer', null)
    // setRideSegIndex(-1)
  }

  useEffect(() => {
    if (rideSegIndex === -1) {
      zoomOut()
    } else {
      zoomToSegIndex(rideSegIndex)
    }
  }, [rideSegIndex])

  const zoomToSegIndex = (index: number) => {
    map.current.fitBounds(bounds[index], {
      padding: 20,
      pitch: 50,
      duration: 2000
    })
    // map.current.setPitch(80)
    map.current.setFilter('route-layer', [
      '==',
      'name',
      `track-${index}`
      // true,
      // false
    ])
    // setRideSegIndex(index)
  }

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [INIT_LNG, INIT_LAT],
      zoom: INIT_ZOOM,
      pitch: INIT_PITCH
    })
    // map.current.on('move', () => {
    //   setLng(map.current.getCenter().lng.toFixed(4))
    //   setLat(map.current.getCenter().lat.toFixed(4))
    //   setZoom(map.current.getZoom().toFixed(2))
    // })

    map.current.on('load', () => {
      const trackSource = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: tracks.map((track, i) => ({
            geometry: {
              type: 'LineString',
              coordinates: track
            },
            properties: {
              name: `track-${i}`
            }
          }))
        }
      }
      // console.log(trackSource)
      map.current.addSource(`route`, trackSource)

      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      })
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 2 })

      // to have the non-highlighted part of map visible
      map.current.addLayer({
        id: 'route-gray-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#AAA',
          'line-width': 3
        }
      })

      map.current.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': TRACK_COLOR,
          'line-width': 3
        }
      })
    })
  })

  return (
    <MapCrop>
      <div
        className="map-container"
        style={{ height: '40vh', width: '100%' }}
        ref={mapContainer}
      />
    </MapCrop>
  )
}

const MapCrop = styled.div``
