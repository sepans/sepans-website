import React from 'react'
import styled from 'styled-components'
import { sum, mean } from 'd3-array'
import { useActivities } from '../hooks/useActivities'

interface GdStatsProps {
  rideSegIndex: number
}

const toMiles = (m) => m * 0.000621371
const toFeet = (m) => m * 3.28084
const toHrs = (minutes) => minutes * 0.000277778

const sumStats = (activities) => ({
  Moving_Time: sum(activities, (d) => parseFloat(d.Moving_Time)),
  Average_Watts: mean(activities, (d) => parseFloat(d.Average_Watts)),
  Distance: sum(activities, (d) => parseFloat(d.Distance)),
  Elevation_Gain: sum(activities, (d) => parseFloat(d.Elevation_Gain)),
  Calories: sum(activities, (d) => parseFloat(d.Calories))
})

export const GdStats: React.FC<GdStatsProps> = (props) => {
  const { rideSegIndex } = props
  const activities = useActivities()
  const activityStats =
    rideSegIndex > -1 ? activities[rideSegIndex] : sumStats(activities)
  return (
    <Container>
      <Title>
        {rideSegIndex === -1
          ? 'Great Divide Tour (2023)'
          : `Day ${rideSegIndex + 1}`}
      </Title>
      <Stats>
        <div>
          {toMiles(activityStats.Distance).toLocaleString('en-US', {
            maximumFractionDigits: 1
          })}{' '}
          miles
        </div>
        <div>
          {toFeet(activityStats.Elevation_Gain).toLocaleString('en-US', {
            maximumFractionDigits: 0
          })}{' '}
          ft climb
        </div>

        <div>
          {toHrs(activityStats.Moving_Time).toLocaleString('en-US', {
            maximumFractionDigits: 1
          })}{' '}
          hrs
        </div>
        <div>
          {parseFloat(activityStats.Calories).toLocaleString('en-US', {
            maximumFractionDigits: 0
          })}{' '}
          calories{' '}
        </div>
      </Stats>
    </Container>
  )
}

const Title = styled.h1`
  margin: 8px 0;
  font-size: 1em;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: arial;
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    width: 50%;
    font-size: 0.9em;
    line-height: 1.2em;
  }
`
