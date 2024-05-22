import loadRoutes from './functions/loadRoutes'
import getServer from './functions/getServer'

const server = getServer()

loadRoutes(server)

server.listen(8080)

console.log('Servidor rodando no http://localhost:8080')
