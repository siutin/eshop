const server = require('./server')
const dataSources = server.dataSources

const dataSource = dataSources['eshopDevelopment']

if (!dataSource) {
  throw new Error('dataSource not found')
}

const modelNames = Object.keys(server.models)

console.log(`modelNames: ${modelNames.join(", ")}`)
dataSource.autoupdate(modelNames, function (error) {
    if (error) {
      console.error(`Aup Update Failed, MSG: ${error}`)
    } else {
      console.log('Auto Update SUCCESS')
    }
})
