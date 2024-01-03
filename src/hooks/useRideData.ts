import { useStaticQuery, graphql } from 'gatsby'

export const useRideData = () => {
  // TODO: type
  const ridesQuery = graphql`
    query ridesQuery {
      allRides {
        nodes {
          id
          track {
            name
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

  // eslint-disable-next-line no-undef
  const data: Queries.ridesQueryQuery = useStaticQuery(ridesQuery)

  // sort doesn't work because the convereted fit data doesn't have time
  // data.allRides.nodes.sort((n1, n2) =>
  //     new Date(n1.track.startTime).getTime() - new Date(n2.track.startTime).getTime())
  // but since the path is soutbound it works with latitude
  data.allRides.nodes.sort(
    (n1, n2) => n2.track.endPoint.lat - n1.track.endPoint.lat
  )

  return data
}
