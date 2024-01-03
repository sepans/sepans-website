// @ts-ignore
// import  * as fit  from '@garmin/fitsdk'

import { Stream, Decoder } from './node_modules/@garmin/fitsdk'
// import('@garmin/fitsdk').then(fit => {
//     // console.log('import fit', fit)
// }).catch(e => console.log('import FAILED', e))

// import { createRequire } from 'module';

// console.log('fit', fit)

function shouldOnCreateNode({ node }) {
  // We only care about XML content.
  // console.log('PLUGIN!!! should node', node.internal.mediaType, node.name)
  return (
    [`application/octet-stream`].includes(node.internal.mediaType) &&
    node.extension === 'fit'
  )
}

async function onCreateNode({
  node,
  // actions,
  loadNodeContent
  // createNodeId,
  // createContentDigest
}) {
  // const fitParser = new FitParser({
  //    force: true,
  //   // speedUnit: 'km/h',
  //   // lengthUnit: 'km',
  //   // temperatureUnit: 'kelvin',
  //   // elapsedRecordField: true,
  //   // mode: 'cascade',
  // })
  // const content = await loadNodeContent(node)
  // console.log('content in string .... \n', typeof content)// content.slice(0,100))
  // const contentBuffer = Buffer.from(content)
  // fitParser.parse(contentBuffer,  (error, data) => {

  //   // Handle result of parse method
  //   if (error) {
  //     console.log('error fit', error, JSON.stringify(data));
  //   } else {
  //     console.log(JSON.stringify(data));
  //   }

  // });
  console.log(' loading fit file...', node)
  const content = await loadNodeContent(node)
  console.log('file loaded', content.slice(0, 15))
  const encoder = new TextEncoder()
  const contentBuffer = encoder.encode(content)
  // console.log(contentBuffer)

  // console.log(TextEncoder)
  // console.log(contentBuffer.buffer)
  // console.log('FIT', Decoder)
  const stream = Stream.fromArrayBuffer(contentBuffer.buffer)
  const decoder = new Decoder(stream)
  // console.log(decoder.isFIT())

  console.log(`isFIT (instance method): ${decoder.isFIT()}`)
  console.log(`checkIntegrity: ${decoder.checkIntegrity()}`)

  const { messages, errors } = decoder.read()

  console.log('errors', errors)
  console.log('messages', messages)
}

exports.onCreateNode = onCreateNode

exports.shouldOnCreateNode = shouldOnCreateNode
