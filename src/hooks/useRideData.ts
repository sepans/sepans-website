import { useStaticQuery, graphql } from 'gatsby'

export const useRideData = () => {
  // TODO: type
  const ridesQuery = graphql`
    query ridesQuery {
      allRides {
        nodes {
          id
          time
          track {
            name
            startTime
            endPoint {
              lat
              lon
            }
            startingPoint {
              lat
              lon
            }
            points {
              lat
              lon
            }
          }
        }
      }
    }
  `
  const data = useStaticQuery(ridesQuery)

  // sort doesn't work because the convereted fit data doesn't have time
  // data.allRides.nodes.sort((n1, n2) =>
  //     new Date(n1.track.startTime).getTime() - new Date(n2.track.startTime).getTime())

  data.allRides.nodes.sort(
    (n1, n2) => n2.track.startingPoint.lat - n1.track.startingPoint.lat
  )

  return data
}
