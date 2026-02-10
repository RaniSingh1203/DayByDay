import { defineEventHandler, createError } from 'h3'
import { pool } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) throw createError({ statusCode: 401 })
const { id } = event.context.params || {}
const journalId = Number(id)

if (!id || isNaN(journalId)) {
  throw createError({ statusCode: 400, statusMessage: 'Invalid journal id' })
}
console.log("from api",journalId)
const [journals]: any = await pool.query(
  'SELECT * FROM journals WHERE id = ? AND user_id = ?',
  [journalId, user.id]
)

if (!journals || journals.length === 0) {
  throw createError({ statusCode: 404, statusMessage: 'Journal not found' })
}

const journal = journals[0]

const [images]: any = await pool.query(
  'SELECT id, image_url FROM journal_images WHERE journal_id = ?',
  [journal.id]
)

journal.images = images || []

return journal

})
