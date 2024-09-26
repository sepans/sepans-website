import React from 'react'
import styled from 'styled-components'
import { sum, mean } from 'd3-array'
import { useGdmbrActivities } from '../hooks/useGdmbrActivities'
import { GdParallelChart } from './gdparallelchart'

export interface GdStatsProps {
  rideSegIndex: number
}

const toMiles = (m) => m * 0.000621371
const toFeet = (m) => m * 3.28084
const toHrs = (minutes) => minutes * 0.000277778

const format = (num: number, decimal: number = 0) =>
  num.toLocaleString('en-US', {
    maximumFractionDigits: decimal || 0
  })

export const toFormattedFeet = (m: number) => format(toFeet(m))

const sumStats = (activities) => ({
  Moving_Time: sum(activities, (d) => parseFloat(d.Moving_Time)),
  Average_Watts: mean(activities, (d) => parseFloat(d.Average_Watts)),
  Distance: sum(activities, (d) => parseFloat(d.Distance)),
  Elevation_Gain: sum(activities, (d) => parseFloat(d.Elevation_Gain)),
  Calories: sum(activities, (d) => parseFloat(d.Calories))
})

export const GdStats: React.FC<GdStatsProps> = (props) => {
  const { rideSegIndex } = props
  const activities = useGdmbrActivities()
  const activityStats =
    rideSegIndex > -1 ? activities[rideSegIndex] : sumStats(activities)
  return (
    <Container>
      <Stats>
        <div>
          <Label>Distance (miles)</Label>
          <Value>{format(toMiles(activityStats.Distance), 1)}</Value>
        </div>
        <div>
          <Label>Climb (ft)</Label>
          <Value>{toFormattedFeet(activityStats.Elevation_Gain)}</Value>
        </div>

        <div>
          <Label>Ride time (hrs)</Label>
          <Value>{format(toHrs(activityStats.Moving_Time), 1)}</Value>
        </div>
        <div>
          <Label>Energy (cal)</Label>
          <Value>{format(parseFloat(activityStats.Calories))}</Value>
        </div>
      </Stats>
      {rideSegIndex > -1 && (
        <GdParallelChart activities={activities} rideSegIndex={rideSegIndex} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: arial;
  margin-top: 10px;
`

const Label = styled.label`
  font-size: 0.7em;
  display: block;
`

const Value = styled.span`
  font-size: 1.2em;
  font-weight: 600;
  padding: 5px 0;
  display: inline-block;
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    width: 25%;
    font-size: 0.9em;
    line-height: 1.2em;
    text-align: center;

    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(4) {
      text-align: right;
    }
  }
`
