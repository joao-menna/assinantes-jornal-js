import assinanteRoutes from '../routes/assinante.js'
import e from 'express'

/**
 * Carrega os controllers no servidor express
 * @param {e.Application} express Servidor Express
 */
export default function loadRoutes(express) {
  assinanteRoutes(express)
}