import React, { useEffect, useRef, useState } from 'react'
import { extent, sum, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'

import styled from 'styled-components'
import { SegmentProps } from './gdmbr'
import { toFormattedFeet } from './gdstats'

interface ElevationProps extends SegmentProps {
  tracks: any
}

const DAY_CHART_WITH_RATIO = 0.6
const HEIGHT = 60
const LABEL_MARGIN = 30

export const GdElevation: React.FC<ElevationProps> = (props) => {
  const { rideSegIndex, tracks } = props

  const container = useRef<HTMLDivElement>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // console.log(container.current)

  useEffect(() => {
    const rect = container.current.getBoundingClientRect()
    setWidth(rect.width)
    setHeight(rect.height)
  }, [container.current])

  useEffect(() => {
    window.addEventListener('resize', () => {
      const rect = container?.current?.getBoundingClientRect()
      setWidth(rect?.width)
      setHeight(rect?.height)
    })
    return () => {
      window.removeEventListener('resize', () => {
        // console.log('what')
        // const rect = container?.current?.getBoundingClientRect()
        // setWidth(rect?.width)
        // setHeight(rect?.height)
      })
    }
  }, [])

  const hasDayChart = rideSegIndex > -1

  const track = hasDayChart ? tracks[rideSegIndex] : []

  const allElevations = tracks.reduce(
    (acc, t) => acc.concat(t.map((point) => point[2])),
    []
  )

  const pointsBefore = sum(tracks.slice(0, rideSegIndex), (t) => t.length)
  // console.log('before', pointsBefore)

  const allTracksExtent = extent(allElevations)

  // scales for full lenght elevation
  const yScale = scaleLinear()
    .domain([0, allElevations.length])
    .range([LABEL_MARGIN, width])
  const fullElevExtent = extent(allTracksExtent)
  const eleScale = scaleLinear()
    .domain(fullElevExtent)
    .range([rideSegIndex === -1 ? height * 0.7 : height / 2 - 5, 0])

  const dayChartWidth = width * DAY_CHART_WITH_RATIO

  // scales for single day elevation
  const dayYScale = scaleLinear()
    .domain([0, track.length])
    .range([0, dayChartWidth])
  const dayMin = min(track, (d) => d[2])
  const dayMax = dayMin + 1100 // came up with 1100 with try an error. largest max-min elev. can be calculated from strava?
  const dayEleScale = scaleLinear()
    // .domain(extent(track, d => d[2]))
    .domain([dayMin, dayMax])
    .range([height / 2 - 5, 0])

  const path = line()
    .x((d, i) => yScale(i))
    .y((d) => eleScale(d))

  const highlightPath = line()
    .x((d, i) => yScale(i + pointsBefore))
    .y((d) => eleScale(d[2]))

  const dayPath = line()
    .x((d, i) => dayYScale(i))
    .y((d) => dayEleScale(d[2]))

  // console.log(path(track))
  const offsetScale = scaleLinear()
    .domain([0, tracks.length])
    .range([0, width * (1 - DAY_CHART_WITH_RATIO)])

  const dayLabelOnLeft = rideSegIndex > tracks.length * 0.5

  return (
    <ElContainer ref={container}>
      {width && (
        <svg height={height} width={width}>
          <Label
            x={LABEL_MARGIN - 2}
            textAnchor="end"
            y={hasDayChart ? height / 2 : height - 10}
          >
            {toFormattedFeet(fullElevExtent[0])}
          </Label>
          <Label x={LABEL_MARGIN - 2} textAnchor="end" y={10}>
            {toFormattedFeet(fullElevExtent[1])}
          </Label>
          <HorLine x1={LABEL_MARGIN} x2={width} y1={6} y2={6} />
          <HorLine
            x1={LABEL_MARGIN}
            x2={width}
            y1={hasDayChart ? height / 2 : height - 4}
            y2={hasDayChart ? height / 2 : height - 4}
          />
          <path
            strokeWidth={1}
            fill="none"
            stroke="#555"
            d={path(allElevations)}
          />
          {hasDayChart && (
            <path
              strokeWidth={1.1}
              fill="none"
              stroke="#000"
              d={highlightPath(track)}
            />
          )}

          {hasDayChart && (
            <>
              <line
                stroke="#AAA"
                strokeWidth={0.5}
                x1={yScale(pointsBefore)}
                x2={yScale(pointsBefore)}
                y1={eleScale(track[0][2])}
                y2={0}
              />
              <line
                stroke="#AAA"
                strokeWidth={0.5}
                x1={yScale(pointsBefore + track.length)}
                x2={yScale(pointsBefore + track.length)}
                y1={eleScale(track[track.length - 1][2])}
                y2={0}
              />
              <line
                stroke="#AAA"
                strokeWidth={0.5}
                x1={yScale(pointsBefore)}
                x2={yScale(pointsBefore + track.length)}
                y1={0}
                y2={0}
              />

              <line
                stroke="#AAA"
                strokeWidth={0.5}
                x1={yScale(pointsBefore)}
                x2={offsetScale(rideSegIndex)}
                y1={eleScale(track[0][2])}
                y2={height / 2}
              />
              <line
                stroke="#AAA"
                strokeWidth={0.5}
                x1={yScale(pointsBefore + track.length)}
                x2={offsetScale(rideSegIndex) + dayChartWidth}
                y1={eleScale(track[track.length - 1][2])}
                y2={height / 2}
              />
            </>
          )}

          <g
            transform={`translate(${offsetScale(rideSegIndex)}, ${height / 2})`}
          >
            {hasDayChart && (
              <>
                <rect
                  stroke="#D5D5D5"
                  strokeWidth={0.5}
                  fill="none"
                  strokeDasharray={`0,${dayChartWidth},${dayChartWidth * 3}`}
                  x1="0"
                  y1="0"
                  width={dayChartWidth}
                  height={height / 2}
                />
                <Label
                  x={dayLabelOnLeft ? -2 : dayChartWidth + 2}
                  y={height / 2}
                  textAnchor={dayLabelOnLeft ? 'end' : 'start'}
                >
                  {toFormattedFeet(dayMin)}
                </Label>
                <Label
                  x={dayLabelOnLeft ? -2 : dayChartWidth + 2}
                  y={7}
                  textAnchor={dayLabelOnLeft ? 'end' : 'start'}
                >
                  {toFormattedFeet(dayMax)}
                </Label>

                <path
                  strokeWidth={1.5}
                  fill="none"
                  stroke="black"
                  d={dayPath(track)}
                />
              </>
            )}
          </g>
        </svg>
      )}
    </ElContainer>
  )
}

const ElContainer = styled.div`
  width: 100%;
  height: ${HEIGHT}px;
  overflow: hidden;
  margin: 5px 0;
`

const Label = styled.text`
  fill: black;
  font-family: arial;
  font-size: 10px;
`

const HorLine = styled.line`
  stroke: #888;
  fill: none;
  stroke-dasharray: 4 6;
  stroke-width: 0.5;
`
