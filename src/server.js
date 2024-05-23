import loadRoutes from './functions/loadRoutes.js'
import getServer from './functions/getServer.js'

const server = getServer()

loadRoutes(server)

server.listen(8080)

console.log('Servidor rodando no http://localhost:8080')
