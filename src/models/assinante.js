import mysql from 'mysql2/promise'

/**
 * @typedef Assinante
 * @property {number?} id
 * @property {string} cpf
 * @property {string} nome
 * @property {string} email
 */

/**
 * @typedef AssinanteOpcional
 * @property {number?} id
 * @property {string?} cpf
 * @property {string?} nome
 * @property {string?} email
 */

/**
 * @typedef Filter
 * @property {string} key
 * @property {(string|number)} value
 */

const TABLE = 'assinante'

export class AssinanteModel {
  /**
   * @constructor
   * @param {mysql.Connection} connection 
   */
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Funcao para requisitar os dados do banco de dados
   * @param {Filter[]} filters Filtros para a requisicao GET
   * @returns {Promise<mysql.QueryResult>} Retorno da query
   */
  async getFiltered(filters) {
    let sql = `
      SELECT *
      FROM ${TABLE}
    `

    const values = []

    if (filters.filter(f => !!f.value).length > 0) {
      sql += ' WHERE '
      
      let filterString = []
      for (const filter of filters) {
        if (!filter.value) {
          continue
        }

        if (filter.key === 'id') {
          filterString.push('id = ?')
          values.push(filter.value)
          continue
        }

        if (filter.key === 'cpf') {
          filterString.push('cpf = ?')
          values.push(filter.value)
          continue
        }

        if (filter.key === 'nome') {
          filterString.push('nome = ?')
          values.push(filter.value)
          continue
        }

        if (filter.key === 'email') {
          filterString.push('email = ?')
          values.push(filter.value)
        }
      }

      sql += filterString.join(' AND ')
    }

    return await this.connection.query(sql, values)
  }

  /**
   * Funcao para inserir um assinante no banco de dados
   * @param {Assinante} assinante Assinante para inserir
   * @returns {Promise<mysql.QueryResult>} Retorno da query
   */
  async insertOne(assinante) {
    const sql = `
      INSERT INTO ${TABLE} (
        cpf,
        nome,
        email
      ) VALUES (
        ?,
        ?,
        ?
      )
    `

    const values = [
      assinante.cpf,
      assinante.nome,
      assinante.email
    ]

    return await this.connection.query(sql, values)
  }

  /**
   * Funcao para alterar um assinante no banco de dados
   * @param {number} id ID do assinante para alterar
   * @param {Assinante} assinante Propriedades do assinante para alterar
   * @returns {Promise<mysql.QueryResult>} Retorno da query
   */
  async updateOne(id, assinante) {
    const sql = `
      UPDATE ${TABLE}
      SET
        cpf = ?,
        nome = ?,
        email = ?
      WHERE id = ?
    `

    const values = [
      assinante.cpf,
      assinante.nome,
      assinante.email,
      id
    ]

    return await this.connection.query(sql, values)
  }

  /**
   * Funcao para deletar um assinante no banco de dados
   * @param {number} id ID do assinante para deletar
   * @returns {Promise<mysql.QueryResult>} Retorno da query
   */
  async deleteOne(id) {
    const sql = `
      DELETE FROM ${TABLE}
      WHERE id = ?
    `

    const values = [
      id
    ]

    return await this.connection.query(sql, values)
  }
}
