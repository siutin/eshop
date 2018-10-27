const server = require('./server')
const dataSources = server.dataSources

const dataSource = dataSources['eshopDevelopment']

if (!dataSource) {
  throw new Error('dataSource not found')
}
dataSource.autoupdate(['Product', 'ACL'], function (error) {
    if (error) {
      console.error(`Aup Update Failed, MSG: ${error}`)
    } else {
      console.log('Auto Update SUCCESS')
    }
})
