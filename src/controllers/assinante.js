import { AssinanteModel } from '../models/assinante'
import getConnection from '../database'
import mysql from 'mysql2'
import e from 'express'

/**
 * @typedef {import('../models/assinante').Assinante} Assinante
 * @typedef {import('../models/assinante').AssinanteOpcional} AssinanteOpcional
 */

/**
 * Get Assinante
 * @param {e.Request} req Requisicao
 * @param {e.Response} res Resposta
 */
export async function getAssinante(req, res) {
  const connection = await getConnection()
  const assinanteModel = new AssinanteModel(connection)

  const { cpf, nome, email } = req.query
  const { id } = req.params

  let hasId = false
  const idInt = parseInt(id)
  hasId = !isNaN(idInt)

  const filters = [
    { key: 'id', value: hasId && idInt },
    { key: 'cpf', value: cpf },
    { key: 'nome', value: nome },
    { key: 'email', value: email }
  ]

  /**
   * @type {mysql.QueryResult}
   */
  let result

  try {
    const [queryResult] = await assinanteModel.getFiltered(filters)

    result = queryResult
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar assinantes',
      data: err
    })
    return
  }

  res.json({
    success: true,
    message: 'Sucesso ao buscar assinantes',
    data: result
  })
}

/**
 * Post Assinante
 * @param {e.Request} req Requisicao
 * @param {e.Response} res Resposta
 */
export async function postAssinante(req, res) {
  const { cpf, nome, email } = req.body

  if (!cpf || !nome || !email) {
    res.status(422).json({
      success: false,
      message: 'Body invalido',
      data: {
        body: {
          cpf: 'string',
          nome: 'string',
          email: 'string'
        }
      }
    })
    return
  }

  const connection = await getConnection()
  const assinanteModel = new AssinanteModel(connection)

  let id = 0
  try {
    const [result] = await assinanteModel.insertOne(req.body)

    id = result.insertId
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao inserir assinante',
      data: err
    })
    return
  }

  res.json({
    success: true,
    message: 'Inserido assinante com sucesso',
    data: {
      id,
      ...req.body
    }
  })
}

/**
 * Put Assinante
 * @param {e.Request} req Requisicao
 * @param {e.Response} res Resposta
 */
export async function putAssinante(req, res) {
}

/**
 * Delete Assinante
 * @param {e.Request} req Requisicao
 * @param {e.Response} res Resposta
 */
export async function deleteAssinante(req, res) {
}
