/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react'
import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import styled from 'styled-components'
import { GdStatsProps } from './gdstats'

interface Props extends GdStatsProps {
  // ts-ignore
  activities: any // FIXME: something like ActivitiesCsv[]
}

const distance = (d) => parseFloat(d.Distance)
const elevation = (d) => parseFloat(d.Elevation_Gain)
const moving = (d) => parseFloat(d.Moving_Time)
const calories = (d) => parseFloat(d.Calories)

const dims = [distance, elevation, moving, calories]

export const GdParallelChart: React.FC<Props> = (props) => {
  const { activities, rideSegIndex } = props

  const container = useRef<HTMLDivElement>()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // console.log(container.current)

  // TODO: cleanup and merge with gdelevation
  useEffect(() => {
    const rect = container?.current?.getBoundingClientRect()
    setWidth(rect?.width)
    setHeight(rect?.height)
  }, [container.current])

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('resize')
      const rect = container?.current?.getBoundingClientRect()
      // console.log(rect, rect.width)
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

  const scales = dims.map((dim) =>
    scaleLinear().domain(extent(activities, dim)).range([height, 0])
  )

  const horScale = scaleLinear()
    .domain([0, dims.length - 1])
    .range([2, width - 5])

  const currentActivity = rideSegIndex > -1 && activities[rideSegIndex]

  // eslint-disable-next-line consistent-return
  return (
    <Container ref={container}>
      <svg width={width} height={height}>
        {activities.map((activity, j) =>
          // const d = distanceScale(distance(activity))
          // const e = elevationScale(elevation(activity))
          dims.map(
            (_, i) => {
              if (i === dims.length - 1) {
                return
              }
              const x1 = horScale(i) // i * lineWidth
              const x2 = horScale(i + 1) // (i + 1) * lineWidth
              const y1 = scales[i](dims[i](activity))
              const y2 = scales[i + 1](dims[i + 1](activity))

              // eslint-disable-next-line consistent-return
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Line
                  key={`line${i}${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#DDD"
                />
              )
            }
            // console.log(distance(activity),  distanceScale(92000), distanceScale(distance(activity)))
          )
        )}
        {dims.map((_, i) => {
          if (i === dims.length - 1) {
            return
          }
          // const x1 = i * lineWidth
          // const x2 = (i + 1) * lineWidth
          const x1 = horScale(i) // i * lineWidth
          const x2 = horScale(i + 1) // (i + 1) * lineWidth
          const y1 = scales[i](dims[i](currentActivity))
          const y2 = scales[i + 1](dims[i + 1](currentActivity))

          // eslint-disable-next-line consistent-return
          return (
            <>
              <line
                key={`ver-1-${i}`}
                x1={x1}
                x2={x1}
                y1={0}
                y2={height}
                stroke="#333"
              />
              <line
                key={`ver-2-${i}`}
                x1={x2}
                x2={x2}
                y1={0}
                y2={height}
                stroke="#333"
              />
              <circle
                key={`point-1-${i}`}
                r="2"
                stroke="#000"
                cx={x1}
                cy={y1}
              />
              <circle
                key={`point-2-${i}`}
                r="2"
                stroke="#000"
                cx={x2}
                cy={y2}
              />
              <Line
                key={`highlight${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#000"
              />
            </>
          )
        })}
        {/* <line x1={0} y1={distanceScale(distance(activities[rideSegIndex]))} 
             x2={width} y2={elevationScale(elevation(activities[rideSegIndex]))}  stroke='#000' />) */}
      </svg>
    </Container>
  )
}

const Line = styled.line`
  stroke-width: 0.5;
`

const Container = styled.div`
  height: 50px;
  margin-bottom: 15px;
  width: 100%;
`
