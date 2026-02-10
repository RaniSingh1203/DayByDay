import jwt from 'jsonwebtoken'
import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const url = event.req.url || ''

 
  const protectedRoutes = ['/api/journals', '/api/auth/me']
  const shouldProtect = protectedRoutes.some((route) => url.startsWith(route))
  if (!shouldProtect) return


  const token = getCookie(event, 'token')
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Token missing'
    })
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  
    event.context.user = decoded
  } catch (err) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid token'
    })
  }
})
