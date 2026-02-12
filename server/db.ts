import mysql from 'mysql2/promise'
import { useRuntimeConfig } from '#imports'

let pool: mysql.Pool

export const getPool = () => {
  if (!pool) {
    const config = useRuntimeConfig()

    pool = mysql.createPool({
      host: config.dbHost,
      port: Number(config.dbPort),
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      ssl: {
        rejectUnauthorized: false
      },
      connectionLimit: 10
    })
  }

  return pool
}
