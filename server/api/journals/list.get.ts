import { defineEventHandler, createError } from 'h3'
import { pool } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  const [journals]: any = await pool.query(
    'SELECT * FROM journals WHERE user_id = ? ORDER BY created_at DESC',
    [user.id]
  )

  for (const journal of journals) {
    const [images]: any = await pool.query(
      'SELECT id, image_url FROM journal_images WHERE journal_id = ?',
      [journal.id]
    )
    journal.images = images
  }

  return journals
})
