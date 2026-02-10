import { defineEventHandler, createError } from 'h3'
import { pool } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  const today = new Date().toLocaleDateString('en-CA')

  const [journals]: any = await pool.query(
    'SELECT * FROM journals WHERE user_id = ? AND created_at = ? LIMIT 1',
    [user.id, today]
  )

  if (!journals.length) {
    return null
  }

  const journal = journals[0]

  const [images]: any = await pool.query(
    'SELECT id, image_url FROM journal_images WHERE journal_id = ?',
    [journal.id]
  )

  journal.images = images
  return journal
})
