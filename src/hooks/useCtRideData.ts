import { useStaticQuery, graphql } from 'gatsby'

export const useCtRideData = () => {
  // TODO: type
  const ridesQuery = graphql`
    query ctRidesQuery {
      allRides(filter: { route: { eq: "ct" } }) {
        nodes {
          id
          route
          time
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
              ele
            }
          }
        }
      }
    }
  `

  // eslint-disable-next-line no-undef
  const data: Queries.ctRidesQueryQuery = useStaticQuery(ridesQuery)

  data.allRides.nodes.sort(
    (n1, n2) => new Date(n1.time).getTime() - new Date(n2.time).getTime()
  )

  return data
}
