import { min, max } from 'd3-array'

// FIXME:
// eslint-disable-next-line no-undef
type RideData = Queries.ctRidesQueryQuery | Queries.gdmbrRidesQueryQuery

export type DataSourceType = () => RideData

export const useRideTracks = (dataSource: DataSourceType) => {
  const rideData = dataSource()

  const tracks = rideData.allRides.nodes.map((ride) =>
    ride.track.points?.map((point) => [
      parseFloat(point.lon),
      parseFloat(point.lat),
      point.ele
    ])
  )
  const bounds: [number, number, number, number][] =
    rideData.allRides.nodes.map((ride) => [
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
