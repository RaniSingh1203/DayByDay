import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '~~/server/db'
import { defineEventHandler, readBody, createError, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password)
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' })

  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email])

  if (rows.length === 0)
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  const user = rows[0]

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })


  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )

 
  setCookie(event, 'token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: 'lax'
  })

  return { message: 'Login successful' }
})
