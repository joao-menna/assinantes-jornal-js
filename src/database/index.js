import mysql from 'mysql2/promise'

export default async function getDatabase() {
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