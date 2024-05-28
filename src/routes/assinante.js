import e from 'express'
import {
  getAssinante,
  postAssinante,
  putAssinante,
  deleteAssinante
} from '../controllers/assinante.js'

/**
 * Controller dos assinantes
 * @param {e.Application} express Servidor Express
 */
export default function assinanteRoutes(express) {
  express.get('/api/assinante', (req, res) => {
    getAssinante(req, res)
  })

  express.get('/api/assinante/:id', (req, res) => {
    getAssinante(req, res)
  })

  express.post('/api/assinante', (req, res) => {
    postAssinante(req, res)
  })

  express.put('/api/assinante/:id', (req, res) => {
    putAssinante(req, res)
  })

  express.delete('/api/assinante/:id', (req, res) => {
    deleteAssinante(req, res)
  })
}