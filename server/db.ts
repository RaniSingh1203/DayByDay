import mysql from 'mysql2/promise'
import { useRuntimeConfig } from '#imports'

let poolInstance: mysql.Pool | null = null

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
  async execute(query: string, params?: any[]) {
    if (!poolInstance) {
      poolInstance = createPool()
    }
    return poolInstance.execute(query, params)
  }
}
