import { min, max } from 'd3-array'
import { useRideData } from './useRideData'

const POINT_RESOLUTION = 20

export const useRideTracks = () => {
  const rideData = useRideData()

  const tracks = rideData.allRides.nodes.map((ride) =>
    ride.track.points
      ?.filter((_, i) => i % POINT_RESOLUTION === 0)
      ?.map((point) => [
        parseFloat(point.lon),
        parseFloat(point.lat),
        parseFloat(point.ele)
      ])
  )
  const bounds = rideData.allRides.nodes.map((ride) => [
    min(ride.track.points, (point) => parseFloat(point.lon)),
    min(ride.track.points, (point) => parseFloat(point.lat)),
    max(ride.track.points, (point) => parseFloat(point.lon)),
    max(ride.track.points, (point) => parseFloat(point.lat))
  ])

  return {
    tracks,
    bounds
  }
}
