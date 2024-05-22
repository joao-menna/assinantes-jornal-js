import mysql from 'mysql2'

/**
 * @typedef Filter
 * @property {string} key
 * @property {(string|number)} value
 */

export class AssinanteModel {
  /**
   * @constructor
   * @param {mysql.Connection} connection 
   */
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Funcao para requisitar os dados do banco
   * @param {Filter[]} filters Filtros para a requisicao GET
   */
  async get(filters) {
    let sql = `
      SELECT *
      FROM assinantes
    `

    const values = []

    if (filters.length > 0) {
        sql += ' WHERE '
    }

    this.connection.query(sql, values)
  }
}
