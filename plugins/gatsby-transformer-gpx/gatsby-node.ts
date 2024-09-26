import { XMLParser } from 'fast-xml-parser'

const POINT_RESOLUTION = 20

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  // createNodeId,
  createContentDigest
}) {
  const { createNode } = actions

  const rawXml = await loadNodeContent(node)

  console.log('id', node.name)
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    attributesGroupName: ''
  })
  const parsedXml = parser.parse(rawXml)

  const dirName = node.dir.split('/').slice(-1)[0]

  const points = parsedXml.gpx.trk.trkseg.trkpt

  const track = {
    name: parsedXml.gpx.trk.name,
    startTime: points.at(0).time,
    endTime: points.at(points.length - 1).time,
    startingPoint: points.at(0),
    endPoint: points.at(points.length - 1),
    points: points
      .filter((_, i) => i % POINT_RESOLUTION === 0)
      .map((trkpt) => {
        const { ele, lon, lat, time } = trkpt
        return {
          ele,
          lon: parseFloat(lon),
          lat: parseFloat(lat),
          time
        }
      })
  }

  const time = parsedXml.gpx?.metadata?.time || points[0].time

  const nodeData: any = {
    id: node.name, // createNodeId(node.name),
    parent: node.id,
    name: node.name,
    route: dirName,
    time,
    track,
    internal: {
      contentDigest: createContentDigest(node.name),
      type: 'Rides'
    }
  }

  if (nodeData.id) {
    try {
      createNode(nodeData)
    } catch (e) {
      console.log('failed !!!!', nodeData.name, nodeData.time)
    }
  }
}

function shouldOnCreateNode({ node }) {
  return (
    [`application/gpx+xml`].includes(node.internal.mediaType) &&
    node.extension === 'gpx'
  )
}

exports.onCreateNode = onCreateNode

exports.shouldOnCreateNode = shouldOnCreateNode
