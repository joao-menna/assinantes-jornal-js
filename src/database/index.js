import mysql from 'mysql2/promise'

/**
 * Funcao para adquirir a conexao com o banco
 * @returns {Promise<mysql.Connection>} Conexao conectada com o banco de dados
 */
export default async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'assinantesjornal'
  })

  await connection.connect()

  return connection
}