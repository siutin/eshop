const server = require('./server')
const dataSources = server.dataSources

const dataSource = dataSources['eshopDevelopment']

if (!dataSource) {
  throw new Error('dataSource not found')
}
dataSource.automigrate('Product', function (error) {
    if (error) {
      console.error(`Auto Migrate, MSG: ${error}`)
    } else {
      console.error(`Auto Migrate SUCCESS`)
    }
})
