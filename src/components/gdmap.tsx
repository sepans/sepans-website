import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax,
import mapboxgl, { Map } from 'mapbox-gl'

export const MAP_WIDTH = 200
export const MAP_HEIGHT = 510
export const MAP_OFFSET_TOP = 30
export const MAP_OFFSET_LEFT = 20

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2VwYW5zbSIsImEiOiJjbHE3MDYwcnoweHpzMmpxbGR1dmFiand0In0.57Pw_8KBRchh14a5yBWgeA'

export const GdMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>()
  const map = useRef<Map>()
  const [lng, setLng] = useState(-109.9)
  const [lat, setLat] = useState(42.2)
  const [zoom, setZoom] = useState(1.8)

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom
    })
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <MapCrop>
      <div className="map-container" ref={mapContainer} />
    </MapCrop>
  )
}

const MapCrop = styled.div``
