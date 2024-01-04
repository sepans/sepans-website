import { min, max } from 'd3-array'
import { useRideData } from './useRideData'

export const useRideTracks = () => {
  const rideData = useRideData()

  const tracks = rideData.allRides.nodes.map((ride) =>
    ride.track.points?.map((point) => [
      parseFloat(point.lon),
      parseFloat(point.lat)
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
