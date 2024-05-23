import express from 'express'
import cors from 'cors'
import e from 'express'

/**
 * Esta função inicia o servidor Express e retorna o mesmo
 * @returns {e.Application} Servidor em Express
 */
export default function getServer() {
  const server = express()

  server.use(express.json())
  server.use(cors({
    origin: '*'
  }))

  return server
}