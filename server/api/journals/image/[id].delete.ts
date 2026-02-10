import { defineEventHandler, createError } from 'h3'
import { pool } from '~~/server/db'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401 })
  }

  const imageId = event.context.params?.id

  const [rows]: any = await pool.query(
    `
    SELECT ji.image_url
    FROM journal_images ji
    JOIN journals j ON ji.journal_id = j.id
    WHERE ji.id = ? AND j.user_id = ?
    `,
    [imageId, user.id]
  )

  if (!rows.length) {
    throw createError({ statusCode: 404 })
  }

  const imagePath = path.join(process.cwd(), 'public', rows[0].image_url)

  if (fs.existsSync(imagePath)) {
    await fs.promises.unlink(imagePath)
  }

  await pool.query(
    'DELETE FROM journal_images WHERE id = ?',
    [imageId]
  )

  return { success: true }
})
