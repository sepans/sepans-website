// TODO: change xml parser
import parseXml, { Node } from 'xml-parser'

// const RESOLUTION = 1

const xmlNameMatch = (element: Node, name: string): boolean =>
  element.name.indexOf(name) > -1

function parseTrack(trk: Node) {
  const track: any = {}
  trk.children.forEach((child) => {
    if (xmlNameMatch(child, 'name')) {
      track.name = child.content
    } else if (xmlNameMatch(child, 'trkseg')) {
      const points = child.children.map(
        (trkpt) => /* i % RESOLUTION === 0 && */ ({
          lat: trkpt.attributes.lat,
          lon: trkpt.attributes.lon,
          ele: trkpt.children
            .filter((ptChild) => xmlNameMatch(ptChild, 'ele'))
            .at(0)?.content,
          time: trkpt.children
            .filter((ptChild) => xmlNameMatch(ptChild, 'time'))
            .at(0)?.content
        })
      )
      track.points = points
      track.startTime = points.at(0).time
      track.endTime = points.at(points.length - 1).time
      track.startingPoint = points.at(0)
      track.endPoint = points.at(points.length - 1)
    }
  })
  return track
}

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  // createNodeId,
  createContentDigest
}) {
  const { createNode } = actions

  const rawXml = await loadNodeContent(node)
  const parsedXml = parseXml(rawXml)
  console.log('id', node.name)
  const dirName = node.dir.split('/').slice(-1)[0]

  let nodeData: any = {
    id: node.name, // createNodeId(node.name),
    parent: node.id,
    name: node.name,
    route: dirName
    // children: [],
  }
  parsedXml.root.children.forEach((child) => {
    if (xmlNameMatch(child, 'metadata')) {
      const time = child.children
        .filter((metadataChild) => xmlNameMatch(metadataChild, 'time'))
        .at(0)?.content
      nodeData.time = time
    }
    if (xmlNameMatch(child, 'trk')) {
      const track = parseTrack(child)
      nodeData = { ...nodeData, track }
    }
    nodeData.internal = {
      contentDigest: createContentDigest(node.name),
      type: 'Rides'
    }
  })
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
