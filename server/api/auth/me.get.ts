import { defineEventHandler, getCookie, createError } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    event.context.user = decoded
    return decoded
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
