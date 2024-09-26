import { useStaticQuery, graphql } from 'gatsby'

export const useGdmbrActivities = () => {
  // TODO: type
  const activitiesQuery = graphql`
    query activitiesQuery {
      allActivitiesCsv(limit: 49, skip: 244) {
        nodes {
          Activity_ID
          Activity_Name
          Activity_Date
          Moving_Time
          Distance
          Average_Speed
          Average_Watts
          Weighted_Average_Power
          Weather_Condition
          Elevation_Gain
          Max_Grade
          Calories
          Average_Temperature
        }
      }
    }
  `

  // eslint-disable-next-line no-undef
  const data: Queries.activitiesQueryQuery = useStaticQuery(activitiesQuery)
  const formattedData = data.allActivitiesCsv.nodes
    .map((node) => {
      const date = new Date(node.Activity_Date)
      return { ...node, Activity_Date: date }
    })
    .sort((a, b) => a.Activity_Date.getTime() - b.Activity_Date.getTime())
    .filter((a) => a.Activity_Name.toLowerCase().indexOf('gdmbr') > -1)
  return formattedData
}
