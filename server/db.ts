import mysql from 'mysql2/promise'
import { useRuntimeConfig } from '#imports'

let pool: mysql.Pool

function createPool() {
  const config = useRuntimeConfig()

  return mysql.createPool({
    host: config.dbHost,
    port: Number(config.dbPort),
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
      rejectUnauthorized: false
    }
  })
}

export const pool = {
  execute: async (query: string, params?: any[]) => {
    if (!poolInstance) {
      poolInstance = createPool()
    }
    return poolInstance.execute(query, params)
  }
}

let poolInstance: mysql.Pool
