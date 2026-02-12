import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST,                 
  port: Number(process.env.DB_PORT), 
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
   connectTimeout: 10000,
  ssl: {
    rejectUnauthorized: false
  }
})
