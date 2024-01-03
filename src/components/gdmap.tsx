import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax,
import mapboxgl, { Map } from 'mapbox-gl'
import { useRideData } from '../hooks/useRideData'
import 'mapbox-gl/dist/mapbox-gl.css'

export const MAP_WIDTH = 200
export const MAP_HEIGHT = 510
export const MAP_OFFSET_TOP = 30
export const MAP_OFFSET_LEFT = 20

const TRACK_COLOR = '#89CFF0'

const INIT_ZOOM = 2.2
const INIT_LNG = -109.9
const INIT_LAT = 42.2

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2VwYW5zbSIsImEiOiJjbHE3MDYwcnoweHpzMmpxbGR1dmFiand0In0.57Pw_8KBRchh14a5yBWgeA'

export const GdMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>()
  const map = useRef<Map>()
  const [lng, setLng] = useState(INIT_LNG)
  const [lat, setLat] = useState(INIT_LAT)
  // const [lng, setLng] = useState(-73.952) // -109.9)
  // const [lat, setLat] = useState(40.749) // 42.2)
  const [zoom, setZoom] = useState(INIT_ZOOM)

  const [rideSegIndex, setRideSegIndex] = useState(-1)

  const rideData = useRideData()
  // console.log('ride', rideData)

  const tracks = rideData.allRides.nodes.map((ride) =>
    ride.track.points?.map((point) => [
      parseFloat(point.lon),
      parseFloat(point.lat)
    ])
  )
  // console.log(tracks)
  const bounds = rideData.allRides.nodes.map((ride) => [
    parseFloat(ride.track.startingPoint.lon),
    parseFloat(ride.track.startingPoint.lat),
    parseFloat(ride.track.endPoint.lon),
    parseFloat(ride.track.endPoint.lat)
  ])

  const zoomOut = () => {
    console.log(
      bounds[0][0],
      bounds[0][1],
      bounds[bounds.length - 1][0],
      bounds[bounds.length - 1][1]
    )
    map.current.fitBounds(
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
    map.current.setFilter('route-layer', null)
    setRideSegIndex(-1)
  }

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
    setRideSegIndex(index)
  }

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom,
      pitch: 20
      // bearing: -180,
    })
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    map.current.on('load', () => {
      const trackSource = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          // 'properties': {},
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

      map.current.addLayer({
        id: 'route-gray-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
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

  const hasPrevSeg = () => rideSegIndex >= 0
  const hasNextSeg = () => rideSegIndex !== tracks.length - 1

  return (
    <MapCrop>
      <div
        className="map-container"
        style={{ height: '60vh', width: '100%' }}
        ref={mapContainer}
      />
      <NavButton
        disabled={!hasPrevSeg()}
        type="button"
        onClick={() => zoomToSegIndex(rideSegIndex - 1)}
      >
        {hasPrevSeg() ? `< Day ${rideSegIndex + 1}` : '<'}
      </NavButton>
      <NavButton
        disabled={rideSegIndex === -1}
        type="button"
        onClick={() => zoomOut()}
      >
        Entire route
      </NavButton>
      <NavButton
        disabled={!hasNextSeg()}
        type="button"
        onClick={() => zoomToSegIndex(rideSegIndex + 1)}
      >
        {hasNextSeg() ? `Day ${rideSegIndex + 2} >` : '>'}
      </NavButton>
    </MapCrop>
  )
}

const NavButton = styled.button`
  border: 1px solid #aaa;
  background-color: #fff;
  font-size: 1em;
  font-family: arial open-sans;
  margin-right: 0px;
  width: 33.3%;
  cursor: pointer;
  margin-top: 5px;
`

const MapCrop = styled.div`
  height: 900px;
`
