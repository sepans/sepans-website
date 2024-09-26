import { min, max } from 'd3-array'
import { useGdmbrRideData } from './useGdmbrRideData'

export const useRideTracks = () => {
  const rideData = useGdmbrRideData()

  const tracks = rideData.allRides.nodes.map((ride) =>
    ride.track.points?.map((point) => [
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
