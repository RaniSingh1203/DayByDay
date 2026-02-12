import mysql from 'mysql2/promise'
import { useRuntimeConfig } from '#imports'

export const pool = () => {
  const config = useRuntimeConfig()

  return mysql.createPool({
    host: config.dbHost,
    port: Number(config.dbPort),
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    ssl: {
      rejectUnauthorized: false
    }
  })
}
